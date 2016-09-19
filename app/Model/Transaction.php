 <?php

App::uses('AppModel', 'Model');

class Transaction extends AppModel {

    var $name = 'Transaction';
    var $useDbConfig = 'stock';
    var $assocs = array();
}
