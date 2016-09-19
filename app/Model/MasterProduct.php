 <?php

App::uses('AppModel', 'Model');

class MasterProduct extends AppModel {

    var $name = 'MasterProduct';
    var $useDbConfig = 'stock';
    var $assocs = array();
}
