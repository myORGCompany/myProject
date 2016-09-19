 <?php

App::uses('AppModel', 'Model');

class MasterCategory extends AppModel {

    var $name = 'MasterCategory';
    var $useDbConfig = 'stock';
    var $assocs = array();
}
