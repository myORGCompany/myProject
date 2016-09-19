<style type="text/css">
	.cards{
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 7px !important;
    display: block;
    margin-bottom: 0.75rem;
    position: relative;
}
.c-table{
    max-width: 97%;
    padding: 10px!important;
    margin-left: 4px!important;
}
</style>
<script type="text/javascript" src="<?php echo ABSOLUTE_URL;?>/js/jquery.min.js"></script>
 
  <script type="text/javascript" src="<?php echo ABSOLUTE_URL;?>/js/moment.min.js"></script>
 <script type="text/javascript" src="<?php echo ABSOLUTE_URL;?>/js/jquery.validate.js"></script>
<body>	
<div class="container">
<div class="row well">
<div class="col-md-6 pull-left">
	<div class=" cards ">
		<div class=" padding-left-10 card card-block margin-bottom-10">
			<h3 class="card-title">Add Product Category</h3>
			<form action="javascript: submitData('category');"  id="categoryTag">
			<div class="row">
				<table class="table table-bordered c-table">
					<tr class="form-group control-group ">
						<td class="">
							Name
						</td>
						<td class="controls card-text">
							<input type="text" class="form-control required" class="form-control required" id="category" name="category">
						</td>
					</tr>
				</table>
			</div>
			<button class="btn btn-primary" type="submit">Submit</button>
			</form>
		</div>
	</div>
	<div class="clearfix margin-bottom-10"></div>
	<div class=" cards ">
		<div class="padding-left-10 card card-block margin-bottom-10">
			<h3 class="card-title">Add Product Group</h3>
			<form action="javascript: submitData('group');"  id="groupTag">
			<div class="row">
				<table class="table table-bordered c-table">
					<tr class="form-group control-group">
						<td class="">
							Name
						</td>
						<td class="card-text controls">
							<input type="text" class="form-control required" id="group" name="group">
						</td>
					</tr>
				</table>
			</div>
			<button class="btn btn-primary" type="submit">Submit</button>
			</form>
		</div>
	</div>
</div>

<div class="col-sm-6 pull-right">
	<div class=" cards ">
		<div class="padding-left-10 card card-block margin-bottom-10">
			<h3 class="card-title">Add Product Brand</h3>
			<form action="javascript: submitData('brand');"  id="brandTag">
			<div class="row">
				<table class="table table-bordered c-table">
					<tr class="form-group control-group ">
						<td class="">
							Name
						</td>
						<td class="card-text controls">
							<input type="text" class="form-control required" id="brand" name="brand">
						</td>
					</tr>
				</table>
			</div>
			<button class="btn btn-primary" type="submit">Submit</button>
			</form>
		</div>
	</div>
	<div class="clearfix margin-bottom-10"></div>
	<div class="cards ">
		<div class=" padding-left-10 card card-block margin-bottom-10">
			<h3 class="card-title">Add New Client</h3>
			<form action="javascript: submitData('client');"  id="clientTag">
			<div class="row">
				<table class="table table-bordered c-table">
					<tr class="form-group control-group">
						<td class="">
							Name
						</td>
						<td class="card-text controls">
							<input type="text" class="form-control required" onchange="getFields('cntclass');" id="clientName" name="clientName">
						</td>
					</tr>
					<tr class="hidden cntclass form-group control-group">
						<td class="">
							Address
						</td>
						<td class="card-text controls">
							<input type="text" class="form-control required" id="clientAdd" name="clientAdd">
						</td>
					</tr>
					<tr class="hidden cntclass form-group control-group">
						<td class="">
							Phone No
						</td>
						<td class="card-text controls">
							<input type="text" class="form-control required" id="clientPh" name="clientPh">
						</td>
					</tr>
					<tr class="hidden cntclass form-group control-group">
						<td class="">
							Email
						</td>
						<td class="card-text controls">
							<input type="text" class="form-control required" id="clientEmail" name="clientEmail">
						</td>
					</tr>
				</table>
			</div>
			<button class="btn btn-primary" type="submit">Submit</button>
			</form>
		</div>
	</div>
</div>
<div class="col-sm-6 pull-left">
	<div class="clearfix margin-bottom-10"></div>
	<div class="cards ">
		<div class=" padding-left-10 card card-block margin-bottom-10">
			<h3 class="card-title">Add New Shop Holder</h3>
			<form action="javascript:  submitData('shoper');"  id="shoperTag">
			<div class="row">
				<table class="table table-bordered c-table">
					<tr class="form-group control-group">
						<td class="">
							Name
						</td>
						<td class="card-text controls">
							<input type="text" class="form-control required" onchange="getFields('shopclass');" id="shoperName" name="shoperName">
						</td>
					</tr>
					<tr class="hidden shopclass form-group control-group">
						<td class="">
							Address
						</td>
						<td class="card-text controls">
							<input type="text" class="form-control required" id="shoperAdd" name="shoperAdd">
						</td>
					</tr>
					<tr class="hidden shopclass form-group control-group">
						<td class="">
							Phone No
						</td>
						<td class="card-text controls">
							<input type="text" class="form-control required" id="shoperPh" name="shoperPh">
						</td>
					</tr>
					<tr class="hidden shopclass form-group control-group">
						<td class="">
							Email
						</td>
						<td class="card-text controls">
							<input type="text" class="form-control required" id="shoperEmail" name="shoperEmail">
						</td>
					</tr>
				</table>
			</div>
			<button class="btn btn-primary" type="submit">Submit</button>
			</form>
		</div>
	</div>
</div>
</div>
</div>
</body>
<script type="text/javascript">
$(document).ready(function(){
	$('.cntclass').addClass('hidden');
	$('.shopclass').addClass('hidden');
	
});
function getFields(classes) {
	if(classes === 'shopclass'){
		$('.cntclass').addClass('hidden');
	} else if(classes === 'cntclass'){
		$('.shopclass').addClass('hidden');
	}
	$('.' + classes).removeClass('hidden');
}
function submitData(id){
	manageData = [];
	if(id === 'client') {
		var	Name = $("#clientName").val();
		var	Add = $("#clientAdd").val();
		var	Ph = $("#clientPh").val();
		var	Email = $("#clientEmail").val();
	} else if(id === 'shoper') {
		var	Name = $("#shoperName").val();
		var	Add = $("#shoperAdd").val();
		var	Ph = $("#shoperPh").val();
		var	Email = $("#shoperEmail").val();
	} else {
		var	Name = $("#" + id).val();
	}
	$.ajax({
		type: "POST",
		url: "<?php echo ABSOLUTE_URL;?>/desh_board/addManageData",
		data: {id:id,name:Name,add:Add,phone:Ph,email:Email},
		success: function( data ){
			txt = JSON.parse(data);
			alert(txt['message']);
			$('.cntclass').addClass('hidden');
		}, error: function (request, status, error) {
            alert("Something went wrong");
        }
	});
}
$(document).ready(function () {
            $('#clientTag').validate({
                rules: {
                     clientName: {
                        minlength: 3,
                        required: true
                    },
                    clientAdd: {
                        minlength: 3,
                        required: true
                    },
                    clientPh: {
                        minlength: 10,
                        required: true,
                        number:true
                    },
                    clientEmail: {
                        required: true,
                        email: true
                    }
                },
                highlight: function (element) {
                    $(element).closest('.controls').removeClass('success').addClass('text-danger');
                },
                success: function (element) {
                    element.addClass('valid')
                        .closest('.controls').removeClass('error').addClass('success');    
                }
            });
            $('#shoperTag').validate({
                rules: {
                     shoperName: {
                        minlength: 3,
                        required: true
                    },
                    shoperAdd: {
                        minlength: 3,
                        required: true
                    },
                    shoperPh: {
                        minlength: 10,
                        required: true,
                        number:true
                    },
                    shoperEmail: {
                        required: true,
                        email: true
                    }
                },
                highlight: function (element) {
                    $(element).closest('.controls').removeClass('success').addClass('text-danger');
                },
                success: function (element) {
                    element.addClass('valid')
                        .closest('.controls').removeClass('error').addClass('success');    
                }
            });
            $('#categoryTag').validate({
                rules: {
                     category: {
                        minlength: 3,
                        required: true
                    }
                },
                highlight: function (element) {
                    $(element).closest('.controls').removeClass('success').addClass('text-danger');
                },
                success: function (element) {
                    element.addClass('valid')
                        .closest('.controls').removeClass('error').addClass('success');
                }
            });
            $('#groupTag').validate({
                rules: {
                     group: {
                        minlength: 3,
                        required: true
                    }
                },
                highlight: function (element) {
                    $(element).closest('.controls').removeClass('success').addClass('text-danger');
                },
                success: function (element) {
                    element.addClass('valid')
                        .closest('.controls').removeClass('error').addClass('success');
                }
            });
            $('#brandTag').validate({
                rules: {
                     brand: {
                        minlength: 3,
                        required: true
                    }
                },
                highlight: function (element) {
                    $(element).closest('.controls').removeClass('success').addClass('text-danger');
                },
                success: function (element) {
                    element.addClass('valid')
                        .closest('.controls').removeClass('error').addClass('success');
                }
            });
        });
</script>