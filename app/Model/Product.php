 <?php

App::uses('AppModel', 'Model');

class Product extends AppModel {

    var $name = 'Product';
    var $useDbConfig = 'stock';
    var $assocs = array();
}
