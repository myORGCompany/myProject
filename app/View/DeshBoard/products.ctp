 <script type="text/javascript" src="<?php echo ABSOLUTE_URL;?>/js/jquery.min.js"></script>
 
  <script type="text/javascript" src="<?php echo ABSOLUTE_URL;?>/js/moment.min.js"></script>
 <script type="text/javascript" src="<?php echo ABSOLUTE_URL;?>/js/bootstrap-datetimepicker.min.js"></script>
 <script type="text/javascript" src="<?php echo ABSOLUTE_URL;?>/js/jquery.validate.js"></script>
  <link rel="stylesheet" href="<?php echo ABSOLUTE_URL;?>/css/bootstrap-datetimepicker.min.css" />
   <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery.devbridge-autocomplete/1.2.26/jquery.autocomplete.min.js"></script>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
   
    <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
   <script>
$(function() {
    $('#input1').autocomplete({
    	autoFocus: true,
        source: '<?php echo ABSOLUTE_URL;?>/desh_board/seachAutoComplete?add=1',
        select: function (event, ui) {
            var id = this.id;
            $("#" + id).val(ui.item.label); // display the selected text
            putValue(ui.item);
        }
    });
});
</script>
<body>
	<div class="container well">
		<div class="row">
		<div class="clearfix"></div> 
		<div class="col-md-3 col-md-offset-5 margin-bottom-20"><h3 class="text-info" ><strong>Add New Product</strong></h3></div>
		<div class="clearfix"></div> 
		
			<div class="table-responsive border-2">
				<div class="">
					<form class="form-horizontal" action="javascript:SubmitAndGetAck();" id="productForm">
						<div class="form-group control-group controls">
							<label for="input1" class="col-sm-2 control-label margin-right-100">Name of product</label>
							<div class="col-sm-7">
								<input type="text" class="form-control required" title="Please Enter the name of product" name="name" id="input1">
							</div>
						</div>
						<div class="form-group control-group controls " >
							<label for="input2" class="col-sm-2 control-label margin-right-100">Quantity</label>
							<div class="col-sm-2" style="max-width:13%;">
								<input type="text" class="form-control required col-sm-6" title="Please mention the quantity" name="quantity" id="input2"  >
							</div> 
							<label for="input13" class="control-label pull-left "><span class="glyphicon glyphicon-scale " >&nbsp;Packing</span></label>
							<div class="col-sm-2 ">
								<input type="text" class="form-control required col-sm-6" title="Please mention the packing" name="packing" id="input13"  >
							</div>
							<label for="input2" class="control-label pull-left padding-right-0 padding-left-0"><span class="glyphicon glyphicon-scale " >&nbsp;Unit</span></label>
							
							<div class="col-sm-2 pull-left ">
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
							<a  rel="nofollow" onclick="getForm('brandTag','Add Product Brand');" class="external-link" data-toggle="modal" data-target="#element"> Add New Brand</a>
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
							<a  rel="nofollow" onclick="getForm('categoryTag' ,'Add Product Category');" class="external-link" data-toggle="modal" data-target="#element"> Add New Category</a>
						</div>
						<div class="form-group control-group controls">
							<label for="input6" class="col-sm-2 control-label margin-right-100">Product Group</label>
							<div class="col-sm-7">
								<select class="form-control required" title="Please select product group" name="product_group_id" id="input6">
								<option value="0" >Select Product Group</option>
								<?php foreach ($data['group']  as $key => $value) {
									echo '<option value="'.$value['ProductGroup']['id'].'">'.$value['ProductGroup']['name'].'</option>';
								} ?>
								</select>
							</div>
							<a  rel="nofollow" onclick="getForm('groupTag' , 'Add Product Group');" class="external-link" data-toggle="modal" data-target="#element"> Add New Product Group</a>
						</div>
						<div class="form-group control-group controls">
							<label for="input7" class="col-sm-2 control-label margin-right-100">Price per peice</label>
							<div class="col-sm-7">
								<input type="text" class="form-control required" title="Please Enter the price of each unit" name="price" id="input7" >
							</div>
						</div>
						<div class="form-group control-group controls">
							<label for="input8" class="col-sm-2 control-label margin-right-100">Perches Date</label>
			                <div class='input-group date col-sm-7' id='input8'>
			                    <input type='text' class="form-control required" id="inputDate" name="perchese_date" title="Please select Perchesing date of product" />
			                    <span class="input-group-addon">
			                        <span class="glyphicon glyphicon-calendar"></span>
			                    </span>
			                </div>
						</div>
						<div class="form-group control-group controls">
							<label for="input9" class="col-sm-2 control-label margin-right-100">Bill number</label>
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
							<a  rel="nofollow" onclick="getForm('clientTag' , 'Add New Client');" class="external-link" data-toggle="modal" data-target="#element"> Add New Client</a>
						</div>
						<div class="form-group control-group controls">
							<label for="input11" class="col-sm-2 control-label margin-right-100">Max Discount</label>
							<div class="col-sm-7">
								<input type="text" class="form-control digits" title="Please Enter the maximum discount" name="max_discount" id="input11" >
							</div>
						</div>
						
			            <div class="form-group control-group controls">
			            <label for="input12" class="col-sm-2 control-label margin-right-100">ExpairyDate</label>
			                <div class='input-group date col-sm-7' id='input12'>
			                    <input type='text' class="form-control required" name="expairy_date" title="Expairy date should be greaer than perches date" />
			                    <span class="input-group-addon">
			                        <span class="glyphicon glyphicon-calendar"></span>
			                    </span>
			                </div>
			            </div>
				       <div class="clearfix"></div> 
						<div class="form-group control-group controls col-sm-11">
							<div class="pull-right margin-right-70">
								<button type="submit" class="btn btn-default btn-lg ">Submit</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
<?php echo $this->element('pop_element'); ?>
</body>
<script type="text/javascript">
	function putValue(data){
		$("#input4").val(data.brandId);
		$("#input5").val(data.categoryId);
        $("#input6").val(data.groupId);
        $("#input7").val(data.price);
        $("#input10").val(data.clientId);
	}
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

$(document).ready(function () {
			$(document).on('change', 'input:radio', function (event) {
			    var redio = $( "input:checked" ).val();
			    if (redio == 'weight') {
			    	$('#quantity').addClass('hidden');
			    	$('#liter').addClass('hidden');
			    }else if (redio == 'quantity') {
			    	$('#weight').addClass('hidden');
			    	$('#liter').addClass('hidden');
			    }else if (redio == 'liter') {
			    	$('#weight').addClass('hidden');
			    	$('#quantity').addClass('hidden');
			    }
			    $('#'+redio).removeClass('hidden'); 
			});
            $('#productForm').validate({
                rules: {
                     name: {
                        minlength: 2,
                        required: true
                    },
                    quantity: {
                        required: true,
                        number:true
                    },
                    packing: {
                        required: true,
                        number:true
                    },
                    unit: {
                        required: {
			                depends: function(element){
			                    if('0' == $('#input3').val()){
			                      $('#input3').val('');
			                    }
			                    return true;    
			                }
			            }
                    },
					brand:{
			            required: {
			                depends: function(element){
			                    if('0' == $('#input4').val()){
			                      $('#input4').val('');
			                    }
			                    return true;    
			                }
			            }
			        },
                    master_category_id: {
                        required: {
			                depends: function(element){
			                    if('0' == $('#input5').val()){
			                      $('#input5').val('');
			                    }
			                    return true;    
			                }
			            }
                    },
                    product_group_id: {
                        required: {
			                depends: function(element){
			                    if('0' == $('#input6').val()){
			                      $('#input6').val('');
			                    }
			                    return true;    
			                }
			            }
                    },
                     price: {
                        required: true,
                        number : true
                    },
                    perchese_date: {
                    	required: {
			                depends: function(element){
			                	startDate = this.value;
			                }
			            }
                    },
                    expairy_date: {
                        required: {
			                depends: function(element){
			                	var endDate = this.value;
			                	if((new Date(startDate).getTime() > new Date(endDate).getTime())){
			                		this.value = '';

			                	} 
			                	return true;
			                }
			            } 
                    },
                    max_discount:{
                    	required: {
			                depends: function(element){
			                	var rs = this.value;
			                	var pr = $("#input7").val();
			                    if(Number(rs) > Number(pr)){
			                      this.value = '';
			                    }
			                    return true;    
			                }
			            }
                    }
                },
                highlight: function (element) {
                    $(element).closest('.controls').removeClass('success').addClass('text-danger');
                },
                success: function (element) {
                    element.addClass('valid')
                        .closest('.controls').removeClass('error').addClass('success').removeClass('text-danger');
                }
            });
        });
        /*
         * @Function : ajax post request to post the data to backend php code and get responce
         * @param : array Form data
         * @Return : successMessage as responce
         * @Author : Vikrant Agrawal
         * @creted on : 2016-08-27
         */
        function SubmitAndGetAck(){
            $.ajax({
                    type: "POST",
                    url: "<?php echo ABSOLUTE_URL;?>/desh_board/addProduct",
                    data: $('#productForm').serialize(true),
                    success: function(data){
                        if (typeof data !== 'undefined' && data !== null) {
                             //$('#productForm').reset();
                             $('#productForm')[0].reset();
                            // $("#responce").removeClass('hidden');
                            // $('#successMessage').html(data);
                            alert(data);
                        } else {
                            alert("Something went wrong");
                        }
                    }, error: function (request, status, error) {
                        alert("Something went wrong");
                    }
                });
        }
        function getForm( id ,string ){
            $('.tags').addClass('hidden');
            $("#" + id).removeClass('hidden').addClass('show');
            $("#heading").replaceWith('<h4 class="modal-title" id="heading">'+string+'</h4>')
      	}
</script>