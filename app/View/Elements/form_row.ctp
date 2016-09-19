<script>
$(function() {
    $('.selector').autocomplete({
        autoFocus: true,
        source: '<?php echo ABSOLUTE_URL;?>/desh_board/seachAutoComplete',
        change: function(event, ui) {
            arrengeData(ui.item,this.id);
        }
    });
});
</script>
<div class="form-group control-group controls col-sm-12 col-md-12 " id="productRow">
    <div class="col-sm-2 controls" id="div<?php echo $newRow;?>name">
        <input  type="text" class="form-control selector padding-right-0" title="Please Enter the name of product" value="" name="name<?php echo $newRow;?>" id="<?php echo $newRow;?>">
        <input  type="text" class="form-control hidden padding-right-0" title="Please Enter the name of product" value="" name="id<?php echo $newRow;?>" id="id<?php echo $newRow;?>" >
    </div>
    <div class="col-sm-2 controls" id="div<?php echo $newRow;?>quantity">
        <input name="quantity<?php echo $newRow;?>"  class="form-control  padding-right-0" id="quantity<?php echo $newRow;?>" onchange="quantity(this.value,$('#<?php echo $newRow;?>').attr('id'));">
    </div>
    <div class="col-sm-2" id="div<?php echo $newRow;?>brand">
        <input name="brand<?php echo $newRow;?>" readonly class=" form-control input-group-addon padding-right-0" id="brand<?php echo $newRow;?>">
    </div>
    
    <div class="col-sm-2" id="div<?php echo $newRow;?>price">
        <input name="price<?php echo $newRow;?>" readonly class=" form-control input-group-addon padding-right-0" id="price<?php echo $newRow;?>">
    </div>
    <div class="col-sm-2 controls" id="div<?php echo $newRow;?>discount">
        <input name="discount<?php echo $newRow;?>" class=" form-control  padding-right-0" id="discount<?php echo $newRow;?>" onchange="getDiscount(this.value,$('#<?php echo $newRow;?>').attr('id'));">
    </div>
     <div class="col-sm-2" id="div<?php echo $newRow;?>totel">
        <input name="totel<?php echo $newRow;?>" readonly class=" form-control input-group-addon padding-right-0" id="totel<?php echo $newRow;?>">
    </div>
</div>
<div class="clearfix"></div> 