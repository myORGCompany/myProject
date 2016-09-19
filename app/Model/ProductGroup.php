 <?php

App::uses('AppModel', 'Model');

class ProductGroup extends AppModel {

    var $name = 'ProductGroup';
    var $useDbConfig = 'stock';
    var $assocs = array();
}
