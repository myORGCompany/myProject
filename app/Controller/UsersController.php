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
class UsersController extends AppController {

/**
 * This controller does not use a model
 *
 * @var array
 */
	public $uses = array('User');

/**
 * Displays a view
 * @return void
 * @throws NotFoundException When the view file could not be found
 *	or MissingViewException in debug mode.
 */
	function isRegisteredEmail() {
		//Configure::write('debug', 02);
		$this->autoRender = false;
		$this->layout = "";
		$email = $this->User->find('first', array( 'conditions' => array('email' =>$this->data['email'],'status' =>1),'fields' =>array('email')));
		if($email['User']['email']){
			return true;
		} else {
			return false;
		}	
	}
}