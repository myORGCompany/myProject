<?php
App::uses('AppController', 'Controller');

/**
 * Static content controller
 *
 * Override this controller by placing a copy in controllers directory of an application
 *
 * @package       app.Controller
 * @link http://book.cakephp.org/2.0/en/controllers/pages-controller.html
 */
class HomePagesController extends AppController {

/**
 * This controller does not use a model
 *
 * @var array
 */
	public $uses = array('User','Salse','Product','Stok');

/**
 * Displays a view
 *
 * @return void
 * @throws NotFoundException When the view file could not be found
 *	or MissingViewException in debug mode.
 */
	function index() {
		$this->layout="default";
	}
	function deshBoard() {
		$user_id = $this->_checkLogin();
		$userData = $this->Session->read('User');
		$this->layout="default";
		//$Salse = $this->_import('Salse');
		$report['dailyData'] = $this->Salse->find('first', array( 'fields' =>'SUM(actual_price)','conditions' => array('DATE(created)' =>date('y-m-d'))));
		$report['monthlyData'] = $this->Salse->find('first', array( 'fields' =>'SUM(actual_price)','conditions' => array('created >' =>'DATE_SUB(CURDATE(), INTERVAL 1 month)')));
		$report['YearlyData'] = $this->Salse->find('first', array( 'fields' =>'SUM(actual_price)','conditions' => array('created >' =>'DATE_SUB(CURDATE(), INTERVAL 1 year)')));
		$report['dailyDataP'] = $this->Stok->find('first', array( 'fields' =>'Count(id)','conditions' => array('DATE(created)' =>date('y-m-d'))));
		$report['monthlyDataP'] = $this->Stok->find('first', array( 'fields' =>'Count(id)','conditions' => array('created >' =>'DATE_SUB(CURDATE(), INTERVAL 1 month)')));
		$report['YearlyDataP'] = $this->Stok->find('first', array( 'fields' =>'Count(id)','conditions' => array('created >' =>'DATE_SUB(CURDATE(), INTERVAL 1 year)')));
		$report['expairy'] = $this->Product->find('all', array( 'fields' =>array('name','expairy_date'),'conditions' => array('expairy_date <= ' =>'date_add(CURDATE(),interval 1 day)')));
		//print_r($report);die
		$this->set('reports',$report);
	}
	function registration() {
		$this->autoRender = false;
	    $this->layout = "";
		$login_detail = $this->User->find('first', array( 'conditions' => array('email' => $this->data['email'])));
		if(!empty($login_detail)) {
			$this->redirect( array( 'controller' => 'home_pages', 'action' => 'index?status=1' ) );
		} else {
			$data['email'] = $this->data['email'];
			$data['password'] = md5($this->data['password']);
			$data['name'] = $this->data['Name'];
			$data['mobile'] = $this->data['mobile'];
			$data['remember'] = $this->data['remember'];
			$this->Session->write('User',$data);
			$this->setUserData();
			$data1 = $this->User->save($data);
			$data['UserId'] = $data1['User']['id'];
			$this->Session->write('User',$data);
			$this->redirect( array( 'controller' => 'home_pages', 'action' => 'deshBoard' ) );
		}
	}

	function logins() {
		$this->autoRender = false;
	    $this->layout = "";
		$User = $this->_import("User");
		$login_detail = $this->User->find('first', array( 'conditions' => array('email' => $this->data['email'],'status' =>1)));
		if(empty($login_detail)) {
			$this->redirect( array( 'controller' => 'home_pages', 'action' => 'index?status=2' ) );
		} else {
			if($login_detail['User']['email'] == $this->data['email'] && $login_detail['User']['password'] == md5($this->data['password'])) {
				$data['user_id'] = $login_detail['User']['id'];
				$data['email'] = $login_detail['User']['email'];
				$data['password'] = $login_detail['User']['password'];
				$this->Session->write('User',$data);
				if(!empty($login_detail['User']['is_admin']) && $login_detail['User']['is_admin'] ==1) {
					$this->redirect( array( 'controller' => 'desh_board', 'action' => 'adminLogin' ) );
				}
				$this->redirect( array( 'controller' => 'home_pages', 'action' => 'deshBoard' ) );
			} else {
				$this->redirect( array( 'controller' => 'home_pages', 'action' => 'index?status=3' ) );
			}
		}
	}

	function logout(){
		$this->Session->delete('User');
		$this->Session->destroy();
		$this->redirect( array( 'controller' => 'home_pages', 'action' => 'index' ) );
	}
	function seachAutoComplete(){
		$this->autoRender = false;
		$value = $this->params['url']['term'];
		$Shoper = $this->_import('Shoper');
		$cond = array('OR' => array(
                    'Shoper.name LIKE' => '%' . $value . '%',
                    'Shoper.user LIKE' => '%' . $value . '%',
                    ));

		$result = $Shoper->find('all', array('fields' => array('Shoper.id','Shoper.name'),
		 			'conditions' => array('is_deleted' =>0,'AND' => $cond)));
        $send = array();
        $i = 0;
        foreach ($result as $rel) {
            $array[] = array (
                'label' => $rel['Shoper']['name'],
                'shoperId' => $rel['Shoper']['id'],
                'user' =>$rel['Shoper']['user'],
            );
        }
        echo json_encode($array);
        exit();
	}
	function viewSalse(){
		//Configure::write('debug', 2);
		if ($maxPageNumber > $temMax) {
            $maxPageNumber = $temMax + 1;
        }
       
        $this->set('maxPageNumber', $maxPageNumber);
        $this->set('start', $tempSeq);
        $this->set('linkdata', $data);
        if( !empty($this->params['url']['page'] )) {
            $filt = $this->params['url']['page'];
        } 

		 $option = array(array('table' => 'product_groups','alias'=> 'ProductGroup','type'=>'left','conditions'=>array( 'Product.product_group_id = ProductGroup.id')),
            array('table' => 'master_categories','alias'=> 'MasterCategory','type'=>'left','conditions'=>array( 'Product.master_category_id = MasterCategory.id')),
            array('table' => 'master_brands','alias'=> 'MasterBrand','type'=>'left','conditions'=>array( 'Product.brand = MasterBrand.id')),
            array('table' => 'salses','alias'=> 'Salse','type'=>'inner','conditions'=>array( 'Product.id = Salse.product_id')),
             array('table' => 'shopers','alias'=> 'Shoper','type'=>'left','conditions'=>array( 'Salse.shoper_id = Shoper.id')));

        $result = $this->Product->find('all', array('fields' => array('Product.price','Product.name','Product.id','Product.packing','Product.unit','MasterCategory.name','MasterBrand.name','ProductGroup.name','Salse.quantity','Salse.actual_price','Shoper.name'),         
                    'conditions' => array('Salse.created > DATE_SUB(CURDATE(), INTERVAL 1 year)','Product.name LIKE' =>"$filt%"),
                    'joins' =>$option));
        $this->set('NameArray',$result);
	}
}