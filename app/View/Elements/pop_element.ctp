<div id="element"  class="modal fade" role="dialog">
      <div class="modal-content modal-dialog">
          <div class="modal-header">
              <button id="close" type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
              <h4 class="modal-title" id="heading">Please fill the details</h4>
          </div>
          <div class="modal-body well margin-bottom-0">
                <form action="javascript: submitData('brand');" class="hidden tags"  id="brandTag">
                  <div class="row">
                    <table class="table table-bordered c-table">
                      <tr class="form-group control-group ">
                        <td class="">
                          Name
                        </td>
                        <td class="controls card-text">
                          <input type="text" class="form-control required" class="form-control required" id="brand" name="brand">
                        </td>
                      </tr>
                    </table>
                  </div>
                <button class="btn btn-primary" type="submit">Submit</button>
              </form>
              <form action="javascript: submitData('group');" class="hidden tags"  id="groupTag">
                  <div class="row">
                    <table class="table table-bordered c-table">
                      <tr class="form-group control-group ">
                        <td class="">
                          Name
                        </td>
                        <td class="controls card-text">
                        
                          <input type="text" class="form-control required" class="form-control required" id="group" name="group">
                        </td>
                      </tr>
                    </table>
                  </div>
                <button class="btn btn-primary" type="submit">Submit</button>
              </form>
              <form action="javascript: submitData('category');" class="hidden tags"  id="categoryTag">
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
            <form action="javascript: submitData('client');" class="hidden tags" id="clientTag">
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
  <style type="text/css">
      .margin-bottom-0{ margin-bottom: 0px !important; }
  </style>
  <script type="text/javascript">
      $(document).ready(function(){
      $('.cntclass').addClass('hidden');
    });

function getFields(classes) {
  $('.' + classes).removeClass('hidden');
}
function submitData(id){
  if(id === 'client') {
    var Name = $("#clientName").val();
    var Add = $("#clientAdd").val();
    var Ph = $("#clientPh").val();
    var Email = $("#clientEmail").val();
  }  else {
    var Name = $("#" + id).val();
  }
  $.ajax({
    type: "POST",
    url: "<?php echo ABSOLUTE_URL;?>/desh_board/addManageData",
    data: {id:id,name:Name,add:Add,phone:Ph,email:Email},
    success: function( data ){
        txt = JSON.parse(data);
        alert(txt['message']);      
      $('.cntclass').addClass('hidden');
      if(id === 'brand'){
          $("#input4").append('<option value="'+txt['id']+'">'+Name+'</option>');
          $("#input4").val(txt['id']);
      } else if(id === 'group'){
          $("#input6").append('<option value="'+txt['id']+'">'+Name+'</option>');
          $("#input6").val(txt['id']);
      } else if(id === 'category'){
          $("#input5").append('<option value="'+txt['id']+'">'+Name+'</option>');
          $("#input5").val(txt['id']);
      } else if(id === 'client'){
          $("#input10").append('<option value="'+txt['id']+'">'+Name+'</option>');
          $("#input10").val(txt['id']);
      } 
      $('#' + id).val(null);
      $("#element .close").click();
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
  <style type="text/css">
       .m-r-10{
    margin-right: 10%;
  }
  </style>