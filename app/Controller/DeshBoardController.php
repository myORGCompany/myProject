<?php
App::uses('AppController', 'Controller');
App::import('Vendor','TCPDF',array('file' => 'dompdf/autoload.inc.php'));
        use Dompdf\Dompdf;
/**
 * Static content controller
 *
 * Override this controller by placing a copy in controllers directory of an application
 *
 * @package       app.Controller
 * @link http://book.cakephp.org/2.0/en/controllers/pages-controller.html
 */
class DeshBoardController extends AppController {

/**
 * This controller does not use a model
 *
 * @var array
 */
	public $uses = array('User','Product','MasterProduct','MasterCategory','ProductGroup','Client','MasterBrand','Salse','Transaction','Shoper','Stok');

/**
 * Displays a view
 *
 * @return void
 * @throws NotFoundException When the view file could not be found
 *	or MissingViewException in debug mode.
 */
	function products(){
        $user_id = $this->_checkLogin();
		$data['category'] = $this->MasterCategory->find('all',array('fields' => array('id','name') ));
        $data['group'] = $this->ProductGroup->find('all', array('fields' => array('id','name') ));
        $data['brand'] = $this->MasterBrand->find('all', array('fields' => array('id','name') ));
        $data['client'] = $this->Client->find('all', array('fields' => array('id','name') ));
        $this->set('data',$data);
	}
	function addProduct(){
        if($userData =$this->Session->read('User')) {
            $user_id = $userData['user_id'];
        }
		$this->autoRender = false;
	    $this->layout = "";
	    if($this->data){
	    	$stock['Product']['user_id'] = $user_id;
	    	foreach ($this->data as $key => $value) {
	    		$stock['Product'][$key] = $value;
	    	}
	    	$stock['Product']['expairy_date'] = date('Y-m-d', strtotime(str_replace('/', '-', $stock['Product']['expairy_date'])));
	    	$stock['Product']['perchese_date'] = date('Y-m-d', strtotime(str_replace('/','-',  $stock['Product']['perchese_date'])));
	    	$productData = $this->Product->find('first', array(
            'fields' => array('id','quantity'),
            'conditions' => array('name' => trim($stock['Product']['name']),'user_id'=> $stock['Product']['user_id'],'packing' => $stock['Product']['packing'] ,'unit' => $stock['Product']['unit'],'brand' => $stock['Product']['brand'],'master_category_id' => $stock['Product']['master_category_id'],'product_group_id' => $stock['Product']['product_group_id'],'client_id' =>$stock['Product']['client_id'] )
        	));
	    	if(empty($productData)){
	    	   $this->Product->save($stock);
               $stock['Stok']['product_id'] = $this->Product->getLastInsertID();
	    	} else {
                $stock['Stok']['product_id'] = $productData['Product']['id'];
                $qant = $productData['Product']['quantity'] + $stock['Product']['quantity'] ;
                $this->Product->updateALL(array('quantity' => $qant),array('id' => $productData['Product']['id']));
            }
            $stock['Stok']['user_id'] = $user_id;
	    	$stock['Stok']['expairy_date'] = $stock['Product']['expairy_date'];
            $stock['Stok']['perchese_date'] = $stock['Product']['perchese_date'];
            $stock['Stok']['quantity_added'] = $stock['Product']['quantity'];
	    	$out = $this->Stok->save($stock);
	    	return "saved Successfully";
	    } else {
	    	//echo "Something went wrong";
	    	return "Something went wrong";
	    }
	}
	function checkMemberShipByEmail($emailId = '') {
        $isAvailbale = true;
        $message = false;
        $this->autoRender = false;
        $this->layout = null;
        if (trim($emailId) == '')
            $emailId = $this->data['email'];
        //check if email exists on some mail server
        $isMember = false;
        $loginData = $this->User->find('first', array(
            'fields' => array("User.id"),
            'conditions' => array('User.email' => $emailId)
        ));
        if (isset($loginData['User']['id']) && (int) $loginData['User']['id']) {
            $isMember = (int) $loginData['User']['id'];
        }
        if ($isMember) {
	        $message = 'This email is already registered.';
	        $isAvailbale = false;
            
        } 
        echo json_encode(array('valid' => $isAvailbale, 'message' => $message));
        exit;
    }
    function checkMemberShipByMobile($mobile = '') {
        $isAvailbale = true;
        $message = false;
        $this->autoRender = false;
        $this->layout = null;

        if (trim($mobile) == '')
            $mobile = $this->data['User']['mobile'];

        // condition added if mobile number is changed from profile page
        if ($mobile == "") {
            $mobile = $this->data['mobile'];
        }
        $replace_str = array(" ", "(", ")", "-", "+");
        $mobile = str_replace($replace_str, "", $mobile);

        //check if already registered
        $UserId = $this->User->checkMemberShipByMobile($mobile);
        if ((int) $UserId) {
            $isAvailbale = false;
            $message = 'This mobile number is already registered';
        }
        echo json_encode(array('valid' => $isAvailbale, 'message' => $message));
        exit;
    }

    function checkMemberShipEmail($emailid){
    	$this->autoRender = false;
        $this->layout = null;
        if (trim($emailId) == '')
            $emailId = $this->data['email'];
        //check if email exists on some mail server
        $isMember = false;
        $loginData = $this->User->find('first', array(
            'fields' => array("User.id"),
            'conditions' => array('User.email' => $emailId)
        ));
        if (isset($loginData['User']['id']) && (int) $loginData['User']['id']) {
            $isMember = (int) $loginData['User']['id'];
        }
        return $isMember;
    }
	public function isRegistered() {
        $isMember = false;
        $this->autoRender = false;
        $this->layout = null;
        $loginId = $this->checkMemberShipEmail($this->data['email']);
        if ((int) $loginId) {
            $isMember = true;
        }
        echo json_encode(array('valid' => $isMember));
        exit;
    }
	 function ajaxLogin() {
        $this->layout = null;
        $this->autoRender = false;
        $response = array(
            'hasError' => true,
            'messages' => "Either email or password is incorrect!",
            'redirect' => false
        );
        if ($this->data) {
            if ($this->data['email']) {
                $returnUrl=false;
                $conditions = array(
                    "User.email" => $this->data['email'],
                    'User.password' => md5($this->data['password'])
                );
                $LoginData = $this->User->find('first', array('conditions' => $conditions));
                if ($LoginData) {
                	$data['user_id'] = $LoginData['User']['id'];
					$data['email'] = $LoginData['User']['email'];
					$data['password'] = $LoginData['User']['password'];
					$this->Session->write('User',$data);
                    $this->setUserData();
                	$response = array('hasError' => false, 'messages' => null); 
                	if(!empty($LoginData['User']['is_admin']) && $LoginData['User']['is_admin'] ==1) {
						$response['redirect'] = Router::url('/adminLogin'); 
					}
					$response['redirect'] = Router::url('/deshBoard'); 
                }
            }
        }
        echo json_encode($response);

        exit;
    }
    function salse(){
        $user_id = $this->_checkLogin();
        $this->setProductPrice();
    	$this->set('newRow',1);
    	$this->Session->write('billFormRow','');
    }
    function getProductDetails(){
    	$this->layout = null;
        $this->autoRender = false;
        $productData = array();
    	$productData = $this->Product->find('first', array(
            'conditions' => array('id' => $this->data['productId'],'is_expaire' =>0 ,'is_saled' =>0,'status' =>1)
        ));
        if(!empty($productData)) {
        	echo json_encode($productData['Product']);
        	exit;
        } else {
        	echo "There is no data for this product Please add first";
        	return false;
        }
    }
    function createRow(){
    	$this->layout = null;
        $this->autoRender = false;
    	$newRow = $this->data['newrow'] +1;
    	$row = $this->Session->read('billFormRow');
    	if (in_array($this->data['newrow'], $row['id'])){
    		exit;
    	} else {
    		$row['id'][] = $this->data['newrow'];
    		$this->Session->write('billFormRow',$row);
    	}
    	$invoice = array();
    	$this->Session->write('billFormRow',$row);
    	//$this->set('preId',$this->data['newrow']);
    	$this->set('newRow',$newRow);
    	$this->render('/Elements/form_row');
    }
    function saleList() {
    	$this->layout = 'blank';
        if($userData =$this->Session->read('User')) {
            $user_id = $userData['user_id'];
        }
    	if(!empty($this->data)){
            $arr = array_chunk($this->data, 8,true);
            foreach ($arr as $key => $value) { 
                $i = $key+1;
                if(!empty($value['name'.$i])){
                    $prSalse[$key]['Salse']['user_id'] = $user_id ;
                    $salseData['productId'][] = trim($value['id'.$i]) ;
                    $salseData['stok_id'][] = trim($value['stok_id'.$i]) ;
                    
                    $salseData['actual_price'][] = trim($value['totel'.$i])/($value['quantity'.$i]);
                    $arr['TotleAm'] = $arr['servicetax'] + trim($value['totel'.$i]);
                    $prSalse[$key]['Salse']['quantity'] = trim($value['quantity'.$i]) ;
                    if($this->data['shoperId']){
                        $prSalse[$key]['Salse']['shoper_id'] = $this->data['shoperId'];
                        $prSalse[$key]['Salse']['to_shoper'] = 1;
                    }
                }
            }
            $result = $this->Product->find('list', array('fields' => array('Product.id','Product.quantity'),
                    'conditions' => array('Product.id'=>$salseData['productId'])));
            $stokResult = $this->Stok->find('list', array('fields' => array('Stok.id','Stok.quantity_added'),
                    'conditions' => array('Stok.id'=>$salseData['stok_id'])));
            foreach ($salseData['productId'] as $key => $prId) {
               $prSalse[$key]['Salse']['product_id'] = $prId;
               $prSalse[$key]['Salse']['actual_price'] = $salseData['actual_price'][$key];
               $prSalse[$key]['Stok']['id'] = $salseData['stok_id'][$key];
            }
            if(!empty($prSalse[0]['Salse']['product_id'])){
                foreach ($prSalse as $key => $value) {
                    try{
                        $this->Salse->create();
                        if($this->Salse->save($value)){
                            $salseData['salse_id'][] = $this->Salse->getLastInsertID();
                            $qant = $result[$value['Salse']['product_id']] - $value['Salse']['quantity'] ;
                            $this->Product->updateALL(array('quantity' => $qant),array('id' => $value['Salse']['product_id']));
                            $qantStok = $stokResult[$value['Stok']['id']] - $value['Salse']['quantity'] ;
                            $this->Stok->updateALL(array('quantity_available' => $qantStok),array('id' => $value['Stok']['id'],'user_id' => $user_id));
                            
                        } else {
                            echo "not saved";
                        }
                    } catch(Exception $e){
                        echo $e->getMessage(); die("not saved");
                    }
                }  
                $txt['salse_ids'] = implode(",", $salseData['salse_id']);
                $txt['product_ids'] = implode(",", $salseData['productId']);
                $txt['is_salse'] = 1;
                $txt['user_id'] = $user_id;
                $txt['invoice_number'] = 'TxS-'.$txt['salse_ids'].'-'.ceil(microtime()*1000);
                $this->Transaction->create();
                $this->Transaction->save($txt);
                $arr['servicetax'] = $arr['TotleAm'] * 0.15;
                $arr['vattax'] = $arr['TotleAm'] * 0.045;
                $arr['otherTax'] = $arr['TotleAm'] * 0.005;
                $this->set('salse',$arr);
                return "Successfully";
            } else {
                return false;
            }
        } else{
            echo ("Nothing saled");
            return false;
        }
    }
    function seachAutoComplete(){  
        $this->autoRender = false;
        $value = $this->params['url']['term'];
        $paramCon = 0 ;
        if (empty($this->params['url']['productId'])){
            $cond = array('OR' => array(
                'Product.name LIKE' => '%' . $value . '%',
                'Product.brand LIKE' => '%' . $value . '%',
                ));
        }
        if ($this->params['url']['add'] == 1){
           $paramCon = '';
        } else if (!empty($this->params['url']['productId'])){
            $paramCon = 'Product.id ='.$this->params['url']['productId'];
        } else {
            $paramCon = 'Product.quantity != 0'; 
        }
          //die($paramCon);
        $option = array(array('table' => 'product_groups','alias'=> 'ProductGroup','type'=>'left','conditions'=>array( 'Product.product_group_id = ProductGroup.id')),
            array('table' => 'master_categories','alias'=> 'MasterCategory','type'=>'left','conditions'=>array( 'Product.master_category_id = MasterCategory.id')),
            array('table' => 'master_brands','alias'=> 'MasterBrand','type'=>'left','conditions'=>array( 'Product.brand = MasterBrand.id')),
            array('table' => 'stoks','alias'=> 'Stok','type'=>'inner','conditions'=>array( 'Product.id = Stok.product_id')),
            array('table' => 'clients','alias'=> 'Client','type'=>'left','conditions'=>array( 'Product.client_id = Client.id')));
        $result = $this->Product->find('all', array('fields' => array('Product.master_category_id','Product.max_discount','Product.price','Product.product_group_id','Product.id', 'Product.name', 'Product.brand','MasterCategory.name','MasterBrand.name','MasterBrand.id','Client.id','Client.name','ProductGroup.id','MasterCategory.id','Product.quantity','Product.bill_number','DATE(Stok.expairy_date)','Stok.id','Product.perchese_date','Product.unit','Product.packing'),         
                    'conditions' => array('Product.is_expaire' =>0, $paramCon ,'Product.is_saled' =>0,'Product.status' =>1, 'AND' => $cond),
                    'joins' =>$option,
                    'group' => 'Stok.id'));
            $send = array();
            $i = 0;
            foreach ($result as $rel) {
                if(!empty($paramCon) && $paramCon == 'Product.quantity != 0'){
                    $exp = 'Going to expaire on - '.$rel['0']['DATE(`Stok`.`expairy_date`)'];
                } else {
                    $exp = '';
                }
                $rel['Product']['perchese_date'] =  str_replace('00:00:00','', $rel['Product']['perchese_date']) ;
                $array[] = array (
                    'label' => $rel['Product']['name'].$exp,
                    'id' => $rel['Product']['id'],
                    'category' => $rel['MasterCategory']['name'],
                    'group' => $rel['ProductGroup']['name'],
                    'groupId' => $rel['ProductGroup']['id'],
                    'categoryId' => $rel['MasterCategory']['id'],
                    'brand' => $rel['MasterBrand']['name'],
                    'brandId' => $rel['MasterBrand']['id'],
                    'client' => $rel['Client']['name'],
                    'clientId' => $rel['Client']['id'],
                    'price' => $rel['Product']['price'],
                    'max_discount' => $rel['Product']['max_discount'],
                    'quantity' => $rel['Product']['quantity'],
                    'expairy' => $rel['0']['DATE(`Stok`.`expairy_date`)'],
                    'stok_id' => $rel['Stok']['id'],
                    'bill' => $rel['Product']['bill_number'],
                    'perchese_date' => $rel['Product']['perchese_date'],
                    'packing' => $rel['Product']['packing'],
                    'unit' => $rel['Product']['unit'],
                );
            }
            echo json_encode($array);
            exit();
    }
    function ManageProducts(){
        $user_id = $this->_checkLogin();
    }
    function addManageData(){
        $user_id = $this->_checkLogin();
        $this->autoRender = false;
        if($this->Session->read('User')) {
            $userData = $this->Session->read('User');
            $data['user_id'] = $userData['user_id'];
        }
        if(!empty($this->data['id'])){
            if($this->data['id'] == 'category' && !empty($this->data['name'])){
                $data['name'] = $this->data['name'];
                $id = $this->MasterCategory->find('first' , array('fields' => 'id' , 'conditions' => array('name' => $data['name'])));
                if(!empty($id)){
                    $ret['message'] = "Already exist please select from menu";
                    $ret['id'] = $id['MasterCategory']['id'] ;
                     echo json_encode($ret);
                    exit();
                } else{
                    if($this->MasterCategory->save($data)){
                    $ret['message'] = "Added Successfully";
                    $ret['id'] =$this->MasterCategory->getLastInsertID();
                    echo json_encode($ret);
                    exit();
                    } else {
                         $ret['message'] = "Nothig saved try again";
                         echo json_encode($ret);
                        exit();
                    }
                } 
            } else if($this->data['id'] == 'group' && !empty($this->data['name'])){
                $data['name'] = $this->data['name'];
                $id = $this->ProductGroup->find('first' , array('fields' => 'id' , 'conditions' => array('name' => $data['name'])));
                if(!empty($id)){
                    $ret['message'] = "Already exist please select from menu";
                    $ret['id'] = $id['ProductGroup']['id'] ;
                     echo json_encode($ret);
                    exit();
                } else{
                    if($this->ProductGroup->save($data)){
                        $ret['message'] = "Added Successfully";
                        $ret['id'] =$this->ProductGroup->getLastInsertID();
                        echo json_encode($ret);
                        exit();
                        
                    } else {
                        $ret['message'] = "Nothig saved please try again";
                        echo json_encode($ret);
                        exit();
                    }
                }
            } else if($this->data['id'] == 'brand' && !empty($this->data['name'])){
                $data['name'] = $this->data['name'];
                $id = $this->MasterBrand->find('first' , array('fields' => 'id' , 'conditions' => array('name' => $data['name'])));
                if(!empty($id)){
                    $ret['message'] = "Already exist please select from menu";
                    $ret['id'] = $id['MasterBrand']['id'] ;
                     echo json_encode($ret);
                    exit();
                } else{
                    if($this->MasterBrand->save($data)){
                        $ret['message'] = "Added Successfully";
                        $ret['id'] =$this->MasterBrand->getLastInsertID();
                        echo json_encode($ret);
                        exit();
                        
                    } else {
                         $ret['message'] = "Nothig saved please try again";
                        echo json_encode($ret);
                        exit();
                    }
                }            
            } else if($this->data['id'] == 'client' && !empty($this->data['name'])){
                $data['name'] = $this->data['name'];
                $data['address'] = $this->data['add'];
                $data['phone'] = $this->data['phone'];
                $data['email'] = $this->data['email'];
                $id = $this->Client->find('first' , array('fields' => 'id' , 'conditions' => array('name' => $data['name'],'email' => $data['email'])));
                if(!empty($id)){
                    $ret['message'] = "Already exist please select from menu";
                    $ret['id'] = $id['Client']['id'] ;
                     echo json_encode($ret);
                    exit();
                } else{
                    if($this->Client->save($data)){
                        $ret['message'] = "Added Successfully";
                        $ret['id'] =$this->Client->getLastInsertID();
                        echo json_encode($ret);
                        exit();
                        
                    } else {
                         $ret['message'] = "Nothig saved please try again";
                        echo json_encode($ret);
                        exit();
                    }
                }
            } else if($this->data['id'] == 'shoper' && !empty($this->data['name'])){
                $data['name'] = $this->data['name'];
                $data['address'] = $this->data['add'];
                if(strlen( $this->data['phone'] ) == 10){
                    $data['mobile'] = $this->data['phone'];
                } else {
                    $data['phone'] = $this->data['phone'];
                }
                $data['email'] = $this->data['email'];
                $id = $this->Shoper->find('first' , array('fields' => 'id' , 'conditions' => array('name' => $data['name'],'email' => $data['email'])));
                if(!empty($id)){
                    $ret['message'] = "Already exist please select from menu";
                    $ret['id'] = $id['Shoper']['id'] ;
                     echo json_encode($ret);
                    exit();
                } else{
                    if($this->Shoper->save($data)){
                        $ret['message'] = "Added Successfully";
                        $ret['id'] =$this->Shoper->getLastInsertID();
                        echo json_encode($ret);
                        exit();
                        
                    } else {
                        $ret['message'] = "Nothig saved please try again";
                        echo json_encode($ret);
                        exit();
                    }
                }
            } else {
                $ret['message'] = "Nothig saved please try again";
                echo json_encode($ret);
                return false;
            }
        }
    }
    function bulkSalse(){
        $user_id = $this->_checkLogin();
        $this->autoRender = false;
        $this->setProductPrice();
        $this->set('newRow',1);
        $this->Session->write('billFormRow','');
        $this->set('bulkSalse',1);
        $this->render('salse');
    }
    function printPdf(){
        $this->autoRender = false;
        $dompdf = new Dompdf();
        $dompdf->setPaper('A4', 'landscape');
        // Render the HTML as PDF
        $dompdf->render(ABSOLUTE_URL.'/desh_board/saleList');
        // Output the generated PDF to Browser
        $dompdf->stream();
    }
    function viewList(){
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
            array('table' => 'stoks','alias'=> 'Stok','type'=>'inner','conditions'=>array( 'Product.id = Stok.product_id')),
            array('table' => 'clients','alias'=> 'Client','type'=>'left','conditions'=>array( 'Product.client_id = Client.id')));
        $result = $this->Product->find('all', array('fields' => array('Product.master_category_id','Product.max_discount','Product.price','Product.id', 'Product.name', 'Product.brand','MasterCategory.name','MasterBrand.name','Client.name','Product.quantity','DATE(Stok.expairy_date)','Product.packing','Product.unit','ProductGroup.name'),         
            'conditions' => array('Product.is_expaire' =>0,'Product.is_saled' =>0,'Product.status' =>1 ,'Product.name LIKE' =>"$filt%"),'joins' =>$option));
        foreach ($result as $rel) {
                if(!empty($paramCon)){
                    $exp = 'Going to expaire on - '.$rel['0']['DATE(`Stok`.`expairy_date`)'];
                } else {
                    $exp = '';
                }
                $array[] = array (
                    'name' => $rel['Product']['name'].$exp,
                    'id' => $rel['Product']['id'],
                    'category' => $rel['MasterCategory']['name'],
                    'group' => $rel['ProductGroup']['name'],
                    'brand' => $rel['MasterBrand']['name'],
                    'client' => $rel['Client']['name'],
                    'price' => $rel['Product']['price'],
                    'max_discount' => $rel['Product']['max_discount'],
                    'quantity' => $rel['Product']['quantity'],
                    'expairy' => $rel['0']['DATE(`Stok`.`expairy_date`)'],
                    'unit' => $rel['Product']['packing'].' - '.$rel['Product']['unit'],
                );
            }
           // print_r($array);die;
        $this->set('NameArray', $array);
        $data['category'] = $this->MasterCategory->find('all',array('fields' => array('id','name') ));
        $data['group'] = $this->ProductGroup->find('all', array('fields' => array('id','name') ));
        $data['brand'] = $this->MasterBrand->find('all', array('fields' => array('id','name') ));
        $data['client'] = $this->Client->find('all', array('fields' => array('id','name') ));
        $this->set('data',$data);
    }
    function editSave(){
        $this->autoRender = false;
        if($this->data){
            if($this->data){
                if($this->Product->save($this->data)){
                    return "Saved Successfully";
                } else {
                    return "Error ocur while saving the data please try again";
                }
            } else {
                return "Nothig saved";
            }
        }
    }
}