 <script type="text/javascript" src="<?php echo ABSOLUTE_URL;?>/js/jquery.min.js"></script>
 
  <script type="text/javascript" src="<?php echo ABSOLUTE_URL;?>/js/moment.min.js"></script>
 <script type="text/javascript" src="<?php echo ABSOLUTE_URL;?>/js/bootstrap-datetimepicker.min.js"></script>
 <script type="text/javascript" src="<?php echo ABSOLUTE_URL;?>/js/jquery.validate.js"></script>
  <link rel="stylesheet" href="<?php echo ABSOLUTE_URL;?>/css/bootstrap-datetimepicker.min.css" />
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery.devbridge-autocomplete/1.2.26/jquery.autocomplete.min.js"></script>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
    <script src="//code.jquery.com/jquery-1.10.2.js"></script>
    <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
   <script>
$(function() {
    $('.selector').autocomplete({
        source: '<?php echo ABSOLUTE_URL;?>/desh_board/seachAutoComplete',
        select: function (event, ui) {
            var id = this.id;
            $("#" + id).val(ui.item.label); // display the selected text
            SubmitAndDetails(ui.item.id, id);
        }
    });
});
</script>
<body>
	<div class="container col-lg-12 well">
		<div class="row">
		<div class="clearfix"></div> 
		<div class="col-md-3 col-md-offset-5 margin-bottom-20"><h3 class="text-info" ><strong>sales</strong></h3></div>
		<div class="clearfix"></div>
			<div class=" border-2">
				<div class="">
					<form class="form-inline" action="javascript:void(0);" id="productForm">
					<div class="row" id="formDiv">
					<div class="form-group control-group controls col-sm-12 col-md-12 padding-right-15" id="productRow">
							<div class="col-sm-2 col-md-2">
								<label for="input1" class="control-label">Name of product</label>
							</div>
							<div class="col-sm-2 col-md-2">
						      	<label for="input1" class="control-label">Quantity</label>
						    </div>
						    <div class="col-sm-2 col-md-2">
						      	<label for="input1" class="control-label">Brand</label>
						    </div>
						    
						    <div class="col-sm-2 col-md-2">
						      	<label for="input1" class="control-label">Price</label>
						    </div>
						    <div class="col-sm-2 col-md-2">
						      	<label for="input1" class="control-label">Discount</label>
						    </div>
						    <div class="col-sm-2 col-md-2">
						      	<label for="input1" class="control-label">Totel</label>
						    </div>
					    </div>
					    <div class="clearfix"></div> 
						<div class="form-group control-group controls col-sm-12 col-md-12 " id="productRow">
						    <div class="col-sm-2" id="div<?php echo $newRow;?>name">
						        <input  type="text" class="form-control selector required padding-right-0" title="Please Enter the name of product" value="" name="name<?php echo $newRow;?>" id="<?php echo $newRow;?>" >

						    </div>
						    <div class="col-sm-2" id="div<?php echo $newRow;?>quanity">
						        <input name="quanity<?php echo $newRow;?>"  class="form-control  padding-right-0" id="quanity<?php echo $newRow;?>" onchange="quantity(this.value,$('#<?php echo $newRow;?>').attr('id'));">
						    </div>
						    <div class="col-sm-2" id="div<?php echo $newRow;?>brand">
						        <input name="brand<?php echo $newRow;?>" readonly class=" form-control input-group-addon padding-right-0" id="brand<?php echo $newRow;?>">
						    </div>
						    
						    <div class="col-sm-2" id="div<?php echo $newRow;?>price">
						        <input name="price<?php echo $newRow;?>" readonly class=" form-control input-group-addon padding-right-0" id="price<?php echo $newRow;?>">
						    </div>
						    <div class="col-sm-2" id="div<?php echo $newRow;?>discount">
						        <input name="discount<?php echo $newRow;?>" class=" form-control  padding-right-0" id="discount<?php echo $newRow;?>" onchange="getDiscount(this.value,$('#<?php echo $newRow;?>').attr('id'));">
						    </div>
						    <div class="col-sm-2" id="div<?php echo $newRow;?>productGroup">
						        <input name="totel<?php echo $newRow;?>" readonly class=" form-control input-group-addon padding-right-0" id="totel<?php echo $newRow;?>">
						    </div>
						</div>
					    <div class="clearfix"></div> 
					</div>
				       <div class="clearfix"></div> 
				       <br />
						<div class="form-group control-group controls col-sm-12">
						</div>
					</form>
				</div>
			</div>
			<div class="clearfix"></div>

			<div class="row pull-right margin-right-40">
					<button type="submit" class="btn btn-default btn-lg" onclick="javascript:saleList();" >Submit</button>
			</div>
      <div class="row pull-left margin-left-40">
          <button type="submit" class="btn btn-default btn-lg" onclick="javascript:resetForm();" >Reset</button>
      </div>	
		</div>
	</div>
</body>
<script type="text/javascript">
var row =0;
$(document).ready(function () {
	product = [];
	discount = [];
	quant = [];
	});
        /*
         * @Function : ajax post request to post the data to backend php code and get responce
         * @param : array Form data
         * @Return : successMessage as responce
         * @Author : Vikrant Agrawal
         * @creted on : 2016-08-27
         */
        function SubmitAndDetails(val,id){
            $.ajax({
                    type: "POST",
                    url: "<?php echo ABSOLUTE_URL;?>/desh_board/getProductDetails",
                    data: {productId : val},
                    success: function(result){
                    	var data = $.trim(result);
                            if(data === 'There is no data for this product Please add first'){
                								//$( "#name"+ id).html(' ').addClass('has-error');
                								$( "#brand"+ id).attr('value','N/A');
                								$( "#price"+ id).attr('value','N/A');
                								$( "#div"+ id + "brand").removeClass('has-success').addClass('has-error');
                								$( "#div"+ id + "price").removeClass('has-success').addClass('has-error');
                            } else {
                            	product[id] = JSON.parse(data);
                            	window.txt = JSON.parse(data);
                            	for (var index in txt) {
                									$( "#" +index + id).attr('value',txt[index]);
                									if($("#div"+id+"quanity").val()){
                  										var totle = ($("#div"+id+"quanity").val())*txt['price'];
                  										$( "#totel" + id).attr('value',totle);
                									} else {
                										$( "#totel" + id).attr('value',txt['price']);
                									}
                									
                									$( "#div" + id +index).removeClass('has-error').addClass('has-success');
                								}
                							$.ajax({
                				                    type: "POST",
                				                    url: "<?php echo ABSOLUTE_URL;?>/desh_board/createRow",
                				                    data: {newrow : id},
                				                    success: function(data){
                				                    	$('#formDiv').append(data);
                				                    }, error: function (request, status, error) {
                				                        alert("Something went wrong");
                				                    }
                				                });
                            }
                            
                    }, error: function (request, status, error) {
                        alert("Something went wrong");
                    }
                });
        }
        function saleList(){
        	$.ajax({
                    type: "POST",
                    url: "<?php echo ABSOLUTE_URL;?>/desh_board/saleList",
                    data: $('#productForm').serialize(true),
                    success: function(data){
                    }, error: function (request, status, error) {
                        alert("Something went wrong");
                    }
                });
        }
        function getDiscount(dis,id){
        	if(!$.trim(quant[id])){
        		quant[id] = 1;
        	}
        	var verifie = dis/quant[id];
        	if(verifie <=  product[id]['max_discount']) {
        		var newVal = (product[id]['price']*quant[id]) - dis;
        		$( "#totel" + id).attr('value',newVal);
        		discount[id] = dis;
        	} else {
            $( "#discount" + id).val(0);
        		alert("Discount not possible maximum discount per piece is =" + product[id]['max_discount']);
        	}
        }
        function quantity(val,id){
        	if(!$.trim(discount[id])){
        		discount[id] = 0;
        	}
        	if(val){
				var totle = (val*product[id]['price'])-discount[id];
				$( "#totel" + id).attr('value',totle);
				quant[id] = val;
			}
        }
        function resetForm(){
            //$('#productForm')[0].reset();
            $('#productForm').trigger("reset");
            $('input[readonly]').val("");
            $('div').removeClass('has-success');
        }
</script>
