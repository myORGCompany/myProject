<?php
/**
 * Application level Controller
 *
 * This file is application-wide controller file. You can put all
 * application-wide controller-related methods here.
 *
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @package       app.Controller
 * @since         CakePHP(tm) v 0.2.9
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */

App::uses('Controller', 'Controller');

/**
 * Application Controller
 *
 * Add your application-wide methods in the class below, your controllers
 * will inherit them.
 *
 * @package		app.Controller
 * @link		http://book.cakephp.org/2.0/en/controllers.html#the-app-controller
 */
class AppController extends Controller {
	//public $components = array('DebugKit.Toolbar');
  var $isLogin = null;

  function setUserData() {

      $isLogintemp = $this->Session->read('User');
      $this->isLogin = $isLogintemp;
      $this->set('isLogin', $this->isLogin);
      
    }
	function _import($model, $constructor = null) {
      try {
        if (!$this->loadModel($model)) {
          throw new Exception();
        }
      } catch (Exception $e) {
        return $this->cakeError('missingModel', array(array('className' => $model, 'webroot' => '', 'base' => $this->base)));
        exit;
      }

      if ($constructor == null) {
        return new $model;
      } else {
        $constructor = implode(',', $constructor);
        return new $model($constructor);
      }
    }
    function _checkLogin() {
        if( $this->Session->read('User') ) {
           $Login =1;
           $this->Session->write('Login' , 1);
           $user = $this->Session->read('User');
           $user_id =$user['user_id'];
           return $user_id;
        } else {
            $this->redirect( array( 'controller' => 'home_pages', 'action' => 'index?status=5' ) );
        }
    }
   
    function setProductPrice(){
        $Product = $this->_import('Product');
        $productData = $Product->find('list', array(
            'conditions' => array('is_expaire' =>0 ,'is_saled' =>0,'status' =>1),
            'fields' => 'price'
        ));
        $this->set('productsPrice' , $productData);
    }
}
