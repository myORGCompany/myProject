
  <script type="text/javascript" src="<?php echo ABSOLUTE_URL;?>/js/moment.min.js"></script>
 <script type="text/javascript" src="<?php echo ABSOLUTE_URL;?>/js/bootstrap-datetimepicker.min.js"></script>
 <script type="text/javascript" src="<?php echo ABSOLUTE_URL;?>/js/jquery.validate.js"></script>
  <link rel="stylesheet" href="<?php echo ABSOLUTE_URL;?>/css/bootstrap-datetimepicker.min.css" />

<div id="editPerticular"  class="modal fade" role="dialog">
      <div class="modal-content modal-dialog">
          <div class="modal-header">
              <button id="close" type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
              <h4 class="modal-title" id="myModalLabel">Edit Product</h4>
          </div>
          <div class="modal-body well col-xs-12">
                          <form id="editForm" class="form-horizontal" action="javascript:SubmitEditGetAck();">
                              <div class="form-group control-group controls">
                                <label for="input1" class="col-sm-2 control-label " style="min-width:26.6% !important; margin-right:40px !important;">Name of product</label>
                                <div class="col-sm-7">
                                  <input type="text" class="form-control required" title="Please Enter the name of product" name="name" id="input1" >
                                  <input type="text" name="id" class="form-control hidden required" id="id" >
                                </div>
                              </div>
                              <div class="form-group control-group controls " >
                                <label for="input2" class="col-sm-2 control-label margin-right-100">Quantity</label>
                                <div class="col-sm-7" >
                                  <input type="text" class="form-control required col-sm-6" title="Please mention the quantity" name="quantity" id="input2"  >
                                </div> 
                                </div>
                                <div class="form-group control-group controls " >
                                <label for="input13" class="col-sm-2 control-label" style="min-width:18.667% !important; margin-right:89px !important;">Packing&nbsp;<span class="glyphicon glyphicon-scale" ></span></label>
                                <div class="col-sm-7">
                                  <input type="text" class="form-control required col-sm-6" title="Please mention the packing" name="packing" id="input13"  >
                                </div>
                                </div>
                                <div class="form-group control-group controls " >
                                <label for="input2" class="col-sm-2 control-label margin-right-100">Unit&nbsp;<span class="glyphicon glyphicon-scale " ></span></label>
                                
                                <div class="col-sm-7">
                                  <select class="form-control required" title="Please select product packing unit" name="unit" id="input3">
                                    <option value='0'>Select Unit</option>
                                      <option value='number'>Number</option>
                                      <option value='kilogram'>Weight in Kilo Gram</option>
                                      <option value='gram'>Weight in Gram</option>
                                      <option value='liter'>Liters</option>
                                  </select>
                                </div>
                              </div>
                            
                              <div class="form-group control-group controls">
                                <label for="input4" class="col-sm-2 control-label margin-right-100">Brand</label>
                                <div class="col-sm-7">
                                  <select class="form-control required" title="Please mention the brand" name="brand" id="input4">
                                  <option value="0" >Select Brand</option>
                                      <?php foreach ($data['brand']  as $key => $value) {
                                      echo '<option value="'.$value['MasterBrand']['id'].'">'.$value['MasterBrand']['name'].'</option>';
                                    } ?>
                                  </select>
                                </div>
                              </div>
                              <div class="form-group control-group controls">
                                <label for="input5" class="col-sm-2 control-label margin-right-100">Category</label>
                                <div class="col-sm-7">
                                  <select class="form-control required" title="Please select product category" name="master_category_id" id="input5">
                                  <option value="0" >Select Category</option>
                                      <?php foreach ($data['category']  as $key => $value) {
                                      echo '<option value="'.$value['MasterCategory']['id'].'">'.$value['MasterCategory']['name'].'</option>';
                                    } ?>
                                  </select>
                                </div>
                              </div>
                              <div class="form-group control-group controls">
                                <label for="input6" class="col-sm-2 control-label" style="min-width:24.1% !important; margin-right:55px !important;">Product Group</label>
                                <div class="col-sm-7">
                                  <select class="form-control required" title="Please select product group" name="product_group_id" id="input6">
                                  <option value="0" >Select Product Group</option>
                                  <?php foreach ($data['group']  as $key => $value) {
                                    echo '<option value="'.$value['ProductGroup']['id'].'">'.$value['ProductGroup']['name'].'</option>';
                                  } ?>
                                  </select>
                                </div>
                              </div>
                              <div class="form-group control-group controls">
                                <label for="input7" class="col-sm-2 control-label " style="min-width:26.6% !important; margin-right:40px !important;">Price per peice</label>
                                <div class="col-sm-7">
                                  <input type="text" class="form-control required" title="Please Enter the price of each unit" name="price" id="input7" >
                                </div>
                              </div>
                              <div class="form-group control-group controls">
                                <label for="input8" class="col-sm-2 control-label" style="min-width:26.6% !important; margin-right:40px !important;">Perches Date</label>
                                        <div class='input-group date col-sm-7' id='input8'>
                                            <input type='text' class="form-control required" id="inputDate" name="perchese_date" title="Please select Perchesing date of product" />
                                            <span class="input-group-addon">
                                                <span class="glyphicon glyphicon-calendar"></span>
                                            </span>
                                        </div>
                              </div>
                              <div class="form-group control-group controls">
                                <label for="input9" class="col-sm-2 control-label " style="min-width:26.6% !important; margin-right:40px !important;">Bill number</label>
                                <div class="col-sm-7">
                                  <input type="text" class="form-control required" title="Please Enter the Bll number" name="bill_number" id="input9" >
                                </div>
                              </div>
                              <div class="form-group control-group controls">
                                <label for="input10" class="col-sm-2 control-label margin-right-100">Client</label>
                                <div class="col-sm-7">
                                  <select class="form-control required" title="Please select a client" name="client_id" id="input10">
                                  <option value="0" >Select Client</option>
                                      <?php foreach ($data['client']  as $key => $value) {
                                    echo '<option value="'.$value['Client']['id'].'">'.$value['Client']['name'].'</option>';
                                    } ?>
                                  </select>
                                </div>
                              </div>
                              <div class="form-group control-group controls">
                                <label for="input11" class="col-sm-2 control-label " style="min-width:26.6% !important; margin-right:40px !important;">Max Discount</label>
                                <div class="col-sm-7">
                                  <input type="text" class="form-control digits" title="Please Enter the maximum discount" name="max_discount" id="input11" >
                                </div>
                              </div>
                              
                                    <div class="form-group control-group controls">
                                    <label for="input12" class="col-sm-2 control-label margin-right-100">ExpairyDate</label>
                                        <div class='input-group date col-sm-7' id='input12'>
                                            <input id="expairy_date" type='text' class="form-control required" name="expairy_date" title="Expairy date should be greaer than perches date" />
                                            <span class="input-group-addon">
                                                <span class="glyphicon glyphicon-calendar"></span>
                                            </span>
                                        </div>
                                    </div>
                                 <div class="clearfix"></div> 
                              <div class="form-group control-group controls padding-0 margin-top-10">
                                <div class="pull-right" style="margin-right:53px;">
                                  <button type="submit" class="btn btn-default btn-lg ">Submit</button>
                                </div>
                              </div>
                            </form>
                     
          </div>
      </div>
  </div>

<script>
    $(function () {
        $('#input8').datetimepicker({
            viewMode: 'years',
      format: 'DD/MM/YYYY'
        });
        $('#input12').datetimepicker({
            viewMode: 'years',
      format: 'DD/MM/YYYY'
        });
    });
   function editPerticular(id){
    $.ajax({
        url: "<?php echo ABSOLUTE_URL;?>/desh_board/seachAutoComplete?productId=" + id ,
        type : "post",
        success: function(data){
            var jsonData = JSON.parse(data);
            for (var i = 0; i < jsonData.length; i++) {
                var counter = jsonData[i];
                $("#input1").val(counter.label);
                $("#input2").val(counter.quantity);
                $("#input11").val(counter.max_discount);
                $("#input4").val(counter.brandId);
                $("#input5").val(counter.categoryId);
                $("#input6").val(counter.groupId);
                $("#input7").val(counter.price);
                $("#input9").val(counter.bill);
                $("#input10").val(counter.clientId);
                $("#inputDate").val(counter.perchese_date);
                $("#expairy_date").val(counter.expairy);
                $("#input13").val(counter.packing);
                $("#input3").val(counter.unit);
                $("#id").val(id);
            }
        }
    });
}
function SubmitEditGetAck(){
    $.ajax({
            type: "POST",
            url: "<?php echo ABSOLUTE_URL;?>/desh_board/editSave",
            data: $('#editForm').serialize(true),
            success: function(data){
                if (typeof data !== 'undefined' && data !== null) {
                    alert(data);
                    $("#editPerticular .close").click();
                } else {
                    alert("Something went wrong");
                }
            }, error: function (request, status, error) {
                alert("Something went wrong");
            }
        });
}
</script>