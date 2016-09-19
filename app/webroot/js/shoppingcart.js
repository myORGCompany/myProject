function show_cart() {
    $('#cart-modal').html('');

    $.ajax({
        type: "POST",
        url: ABSOLUTE_URL + '/shopping_carts/showCart/',
        success: function(data) {
            var data = $.trim(data);
            if(data == "hide") {
                window.location= ABSOLUTE_URL + '/js_services/index';
                //
            } else 
            {
                $('#cart-modal').html(data);
                jQuery('#cart-modal').modal('show');
                $("#cart_section").html('<a href="javascript:void(0)" onclick="show_cart()" id="shop_icon"><i class="fa fa-shopping-cart font-20 line-height-24"><h6 class="badge" id="cart_count"></h6></i></a>');
                $("#shop_icon").show();
                $("#cart_count").html( $("#cartcnt").val());




            }
        },
        error: function() {
            alert('Something went wrong...')
        }
    });
    
 }




function replacePromo(promotionId,val_no){
   
    var prom_del = document.getElementById('tenure'+val_no).value;
    
   
    document.getElementById('tenure'+val_no).value = promotionId;
   
    $.ajax({
        url: ABSOLUTE_URL+'/shopping_carts/replacePromo/'+prom_del+'/'+promotionId,
        type: 'POST',
        success: function(transport){
            if(transport == 'fail'){
                                                         
                alert('Item could not be added into the cart');
            }else if(transport == 'already'){ 
                                                         
                //alert('Service has already been added to your cart!'); 
                show_cart();
            }

            var arr = JSON.parse(transport);
                                                     
            if(arr[0] == 'expensive'){
                                                        
                replaceCartItem(arr[1],arr[2],1);
                                                         
            }else if(arr[0] == 'removal'){
                                                            
                replaceCartItem(arr[1],arr[2],1);
            } else if(arr[0] == 'complimentary'){
                                                            
                alert('you can not add this item in your cart as you are getting it as complimentary');
                                                            
                                                            
            }else if(arr[0] == 'show'){
                                                            
                show_cart();
            }
        },
        error: function(obj){
            //alert(obj.status + "\n" + obj.statusText);
        }
    });
   
  
   
    }
    
  
  function deleteCart(promotionId){
   
    $.ajax({
        url: ABSOLUTE_URL+'/shopping_carts/deleteCart/'+promotionId,
        type: 'POST',
        success: function(transport){
            if(transport == 'no_item'){
                hideCart('0');
                $("#cart_section").html(' ');
            }
            else
            {
            show_cart();
        }
        },
        error: function(obj){
           // alert(obj.status + "\n" + obj.statusText);
        }
    });

  
   
    }
    
 function addCart(promotionId,type,item_number){
       
 
    $.ajax({
        url: ABSOLUTE_URL+'/shopping_carts/addCart/'+promotionId+'/'+type+'/'+item_number,
        type: 'POST',
        success: function(transport){  
            if(transport == 'fail'){
                                                         
                alert('Item could not be added into the cart');
            }else if(transport == 'already'){ 
                                                         
               // alert('Service has already been added to your cart!'); 
                show_cart();
            }else if(transport == 'status5'){
                                                        
                                                         
            } else if (transport == 'already_premium') {
                                                         
                alert('You already have this Membership'); 
                $('#sp_rad').find('input[type=checkbox]:checked').removeAttr('checked');
                                                         
            } else if (transport == 'not_eligible_upgrade') {
                                                         
                alert('You cannot add this membership'); 
                $('#sp_rad').find('input[type=checkbox]:checked').removeAttr('checked');
                                                         
            }
                         
            var arr = JSON.parse(transport);
                                                    
            if(arr[0] == 'expensive'){
                                                        
                if(confirm('This service belongs to the same category as an item that you had earlier added to your cart. Do you want to replace it?')){
                    replaceCartItem(arr[1],arr[2],1);
                                                            
                }else{ 
                    show_cart();
                }
            }else if(arr[0] == 'removal'){
                alert('Since you are trying to buy a premium product, it includes the features of the other product which is already there in your shopping cart.');
                replaceCartItem(arr[1],arr[2],1);
                                                           
            } else if(arr[0] == 'complimentary'){
                                                            
                alert('This item cannot be added along with already selected item lying in your cart');
                                                            
                                                            
            }else if(arr[0] == 'show'){
                                                            
                show_cart();
            }
        },
        error: function(obj){
             alert(obj.status + "\n" + obj.statusText);
        }
    });
  
                               
          
    }
 
 
   function buyMembershipPopup(){
      
    $.ajax({
        url: ABSOLUTE_URL+'/shopping_carts/buyMembershipPopup',
        type: 'POST',
        success: function(transport){
            showPopUpContainerData(transport);
        },
        error: function(obj){
            //alert(obj.status + "\n" + obj.statusText);
        }
    });

     
 }
 
 
 function renewMembership(promotionId , promotionCode){
    $.ajax({
        url: ABSOLUTE_URL+'/shopping_carts/renewMembership/'+promotionId+'/'+promotionCode,
        type: 'POST',
        success: function(transport){
            if(transport == 'already'){
                //alert('Service has already been added to your cart!');
                show_cart();
            }else if(transport == 'fail'){
                alert('Item could not be added into the cart');
            }
             else if(transport== 'not_eligible_upgrade'){
                                                            
                alert('You cannot buy this plan as you are already a premium member');
                                                            
                                                            
            }
           
            var promotionIds = promotionId.split(',');
            // below RESUME_IDS is comming from constant varaible 
            var arr =     JSON.parse(transport);
            // alert(arr[2]); alert(arr[1]);                                   
                                                    
            if(arr[0] == 'expensive'){
                                                        
                if(confirm('This service belongs to the same category as an item that you had earlier added to your cart. Do you want to replace it?')){
                    // deleteCart(arr[2]); 
                    // addCart(arr[1],'0','1');
                    //addWithoutShowCart(arr[1],'0',item_number);
                    deleteWithoutShowCart(arr[2]);
                    addCart(arr[1],'0','1');
                  
                                                            
                }else{ 
                    show_cart();
                }
            }else if(arr[0] == 'removal'){
                alert('Since you are trying to buy a premium product, it includes the features of the other product which is already there in your shopping cart.');
                //deleteCart(arr[2]);
                deleteWithoutShowCart(arr[2]);
                //addCart(arr[1],'0','1');
                //addWithoutShowCart(arr[1],'0',item_number);
   
                     
                    addCart(arr[1],'0','1');
         
            } else if(arr[0] == 'complimentary'){
                                                            
                alert('This item cannot be added along with already selected item lying in your cart');
                                                            
                                                            
            }
           else if(arr[0] == 'show'){
                                                        
                 
                     
                    show_cart();
                                                       
                                                           
            }
        },
        error: function(obj){
            //alert(obj.status + "\n" + obj.statusText);
        }
    });
     
      
  }
  function showCartVsResumePopup(promotionId){
         
    popup('popUpDiv');
    $('#popUpDivRenewal').html(''); 
    showResumePopup(promotionId);
                                                      
  }
  
  function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(typeof haystack[i] == 'object') {
            if(arrayCompare(haystack[i], needle)) return true;
        } else {
            if(haystack[i] == needle) return true;
        }
    }
    return false;
}

function arrayCompare(a1, a2) {
    if (a1.length != a2.length) return false;
    var length = a2.length;
    for (var i = 0; i < length; i++) {
        if (a1[i] !== a2[i]) return false;
    }
    return true;
}
   function hideCart(type){
     
     if(type == 0){
     jQuery('#cart-modal').html('');
     jQuery('#cart-modal').modal('hide');
     }
      
     
  }
  
  
    function renewMembershipReady(){
     
       renewMembership(document.getElementById('cart2').value,document.getElementById('cart1').value);
       
    }
    
    
    
    function upgradeMembership(promotionId){
    $.ajax({
        url: ABSOLUTE_URL+'/shopping_carts/upgradeProduct/'+promotionId,
        type: 'POST',
        success: function(transport){
            if(transport == 'fail'){
                                                         
                alert('Item could not be added into the cart');
            }else if(transport == 'already'){ 
                                                         
               //alert('Service has already been added to your cart!'); 
                show_cart();
            }
                                                     
                                                   
            var arr =     JSON.parse(transport);
                                                     
                                                    
            if(arr[0] == 'expensive'){
                                                        
                if(confirm('This service belongs to the same category as an item that you had earlier added to your cart. Do you want to replace it?')){
                    deleteCart(arr[2]); 
                    addCart(arr[1],'0','1');
                                                            
                }else{ 
                    show_cart();
                }
            }else if(arr[0] == 'removal'){
                alert('Since you are trying to buy a premium product, it includes the features of the other product which is already there in your shopping cart.');
                deleteCart(arr[2]);
                addCart(arr[1],'0','1');
            } else if(arr[0] == 'complimentary'){
                                                            
                alert('This item cannot be added along with already selected item lying in your cart');
                                                            
                                                            
            }else if(arr[0] == 'show'){
                                                            
                show_cart();
            }
        },
        error: function(obj){
           // alert(obj.status + "\n" + obj.statusText);
        }
    });
     
      
  }
  
  function checkOnlyOneClick(check_val){
       
         document.getElementById('2').checked = false;
         document.getElementById('103').checked = false;
         document.getElementById('104').checked = false;
         document.getElementById('85').checked = false;
         document.getElementById('15').checked = false;
         document.getElementById('76').checked = false;
         document.getElementById('105').checked = false;
         
         document.getElementById(check_val).checked = true;
         
         
    }
    
     
   function putValueInHidden(Promo_val){ 
        
      if(Promo_val == '85'){
        document.getElementById('cart2').value = '103,85'; 
      }else if(Promo_val == '15'){
          document.getElementById('cart2').value = '104,15'; 
     }else if(Promo_val == '2'){
          document.getElementById('cart2').value = '2';
     }else  if(Promo_val == '3'){
          document.getElementById('cart2').value = '103';
     }else  if(Promo_val == '103'){
          document.getElementById('cart2').value = '103';
     }else  if(Promo_val == '104'){
          document.getElementById('cart2').value = '104';
     }else  if(Promo_val == '105'){
          document.getElementById('cart2').value = '105';
     }else if(Promo_val == '76'){
          document.getElementById('cart2').value = '2,311';
     }else if(Promo_val == '4'){
          document.getElementById('cart2').value = '104';
  }
  
    document.getElementById('cart1').value = document.getElementById(Promo_val).value;
      
    }
  




function select_buy_option_membership(type, pageId, buttonName){        
        if(type ==1){
            
 
                addCart('2','0','1',pageId,buttonName);
             
        }else if(type == 2){
            
             
                addCart('103','0','1',pageId,buttonName);
            
            
            
        }else if(type ==3){
            
             
                 addCart('104','0','1',pageId,buttonName);
           
        }
        
    }
    
  

    
    function addWithoutShowCart(promotionId,type,item_number, pageId, buttonName){
       
 
    $.ajax({
        url: ABSOLUTE_URL+'/shopping_carts/addCart/'+promotionId+'/'+type+'/'+item_number+'?pageURL='+pageId+'&buttonName='+buttonName,
        type: 'POST',
        success: function(transport){
            if(transport == 'fail'){
                                                         
                alert('Item could not be added into the cart');
            }else if(transport == 'already'){ 
                                                         
                //alert('Service has already been added to your cart!'); 
                show_cart();
            }
                                                     
                                                   
            var arr =     JSON.parse(transport);
                                                     
                                                    
            if(arr[0] == 'expensive'){
                                                        
                if(confirm('This service belongs to the same category as an item that you had earlier added to your cart. Do you want to replace it?')){
                    deleteCart(arr[2]); 
                    addWithoutShowCart(arr[1],'0',item_number);
                                                            
                }
            }else if(arr[0] == 'removal'){
                alert('Since you are trying to buy a premium product, it includes the features of the other product which is already there in your shopping cart.');
                replaceCartItem(arr[1],arr[2],2);
            //   deleteWithoutShowCart(arr[2]);
            //  addWithoutShowCart(arr[1],'0',item_number);
            } else if(arr[0] == 'complimentary'){
                                                            
                alert('This item cannot be added along with already selected item lying in your cart');
                                                            
                                                            
            }else if(arr[0] == 'show'){
                                                            
            // show_cart();
            }
        },
        error: function(obj){
          //  alert(obj.status + "\n" + obj.statusText);
        }
    });
   
}
    
    function deleteWithoutShowCart(promotionId){
   
    $.ajax({
        url: ABSOLUTE_URL+'/shopping_carts/deleteCart/'+promotionId,
        type: 'POST',
        success: function(transport){
           
        },
        error: function(obj){
           // alert(obj.status + "\n" + obj.statusText);
        }
    });
  
    }

function closeRenewPopupButton(){
 popup('popUpDiv');
 $('#popUpDivRenewal').html(''); 
      
}

function closeComboPopupButton(){
 popup('popUpDiv');
 $('#popUpDivCombo').html(''); 
      
}

  
    function replaceCartItem(itemToAdd,itemToRem,isShowCart){
        
    itemToRem = itemToRem.toString();
    $.ajax({
        url: ABSOLUTE_URL+'/shopping_carts/deleteCart/'+itemToRem+'/'+1,
        type: 'POST',
        success: function(transport){
            if(isShowCart == 1)
                addCart(itemToAdd,'0','1');
            else
                addWithoutShowCart(itemToAdd,'0','1')   ;
        },
        error: function(obj){
           // alert(obj.status + "\n" + obj.statusText);
        }
    });
       
        
}
    
    
    function addResumeProductCart(promotionId,type,item_number){
       
    $.ajax({
        url: ABSOLUTE_URL+'/shopping_carts/addCart/'+promotionId+'/'+type+'/'+item_number,
        type: 'POST',
        success: function(transport){
            if(transport == 'fail'){
                                                         
                alert('Item could not be added into the cart');
            }else if(transport == 'already'){ 
                                                         
               // alert('Service has already been added to your cart!'); 
                show_cart();
            }else if(transport == 'status5'){
                alert('You cannot buy a premium membership as your salary is below 10 lakh');
                                                         
            }
                                                     
                                                    
                                                   
            var arr=JSON.parse(transport);
                                                     
            if(typeof arr =='object'){  
                if(arr[0] == 'expensive'){
                                                        
                    if(confirm('This service belongs to the same category as an item that you had earlier added to your cart. Do you want to replace it? ')){
                        replaceResumeCartItem(arr[1],arr[2]);
                                                            
                    }else{ 
                        show_cart();
                    //show resume popup
                                                             
                    }
                }else if(arr[0] == 'removal'){
                    alert('Since you are trying to buy a premium product, it includes the features of the other product which is already there in your shopping cart.');
                    replaceResumeCartItem(arr[1],arr[2]);
                                                           
                } else if(arr[0] == 'complimentary'){
                                                            
                    alert('This item cannot be added along with already selected item lying in your cart');
                                                            
                                                            
                }else if(arr[0] == 'show'){
                                                            
                    showResumePopup(promotionId);
                                                          
                //show resume popup 
                }
                                                         
            }
        },
        error: function(obj){
           // alert(obj.status + "\n" + obj.statusText);
        }
    });  
 

  
}
    
        function replaceResumeCartItem(itemToAdd,itemToRem){
        $.ajax({
            url: ABSOLUTE_URL+'/shopping_carts/deleteCart/'+itemToRem,
            type: 'POST',
            success: function(transport){
                addOneTimeProduct(itemToAdd,'0','1');
            },
            error: function(obj){
               // alert(obj.status + "\n" + obj.statusText);
            }
        });

        
    }
    function addOneTimeProduct(promotionId,type,item_number){
        
    $.ajax({
        url: ABSOLUTE_URL+'/shopping_carts/addCart/'+promotionId+'/'+type+'/'+item_number,
        type: 'POST',
        success: function(transport){
            if(transport == 'fail'){
                                                         
                alert('Item could not be added into the cart');
            }else if(transport == 'already'){ 
                                                         
                //alert('Service has already been added to your cart!'); 
                show_cart();
            }else if(transport == 'status5'){
                alert('You cannot buy a premium membership as your salary is below 10 lakh');
                                                         
            }else {
                showResumePopup(promotionId);
            }
                                                     
                                                   

                                                     
        },
        error: function(obj){
           // alert(obj.status + "\n" + obj.statusText);
        }
    });
         
    }
    
    function showResumePopup(promotionId){
        
    switch(promotionId){
        case 76 :
        addrSilverValuePackToCart('0',promotionId);
        break;
        case 75:
        addrResumeCritiqueToCart('0',promotionId); 
        break;    
        default:
        executiveResumeBuynow(promotionId,promotionId);
        break;
    }
}

 


function executiveResumeBuynow(proid,pmid){
       
    $.ajax({
        url: ABSOLUTE_URL+'/shopping_carts/showExecutiveResumePopUp/'+proid+'/'+pmid,
        type: 'POST',
        success: function(transport){
            servicesShowPopUpContainerJquery(transport);
        },
        error: function(obj){
            //alert(obj.status + "\n" + obj.statusText);
        }
    });
     
   }
   

function closeExecutiveResumePopup(prod, pmid){


popup('popUpDiv');
$('#popUpDiv').html('');
  show_cart();
//addCart(prod,'0','1');
}

function executiveRresumePopupValidation(prod, pmid) {
    var radios = document.getElementsByTagName('input');
    var value1;
    var resume_seleted=0;
    /*
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].type === 'radio' && radios[i].checked) {
            // get value, set checked flag or do whatever you need to
            value1 = radios[i].value;
            resume_seleted=1;
        //isResumeUploaded=true;
        }

    }
    */
       if($('.resume').is(':checked')){
        resume_seleted = 1;
        real_name = $('.resume:checked').val();
       
        
    }  
    
  
   
    var resume_upload=document.getElementById('upload_resume_name').value;
        
        
    if(resume_upload=="" || resume_seleted==0)   {
           
    }
        
    if(resume_upload!="")   {
        document.getElementById('upload_resume_val').value = 1;

    }
    if(resume_upload!="" || resume_seleted==1)   {

        document.getElementById("submit_val").value=1;
               
        if(resume_upload!="")
        {
            ajaxFileUploadEr(prod, pmid);
            return false;
        }
        else {
            //Ajax request to submit the form
            $.ajax({
                url: ABSOLUTE_URL+'/js_services/er_writing_popup',
                type: 'POST',
                data: $('#executive_resume').serialize(true),
                success: function(transport){
                  
                    if(transport == 1)
                    {
                        isResumeUploaded=true;
                        popup('popUpDiv');
                        $('#popUpDiv').html('');
                        $('#blanket').hide();
                        // new shopping cart add to cart
                        show_cart();
                                                                                       
                    }else {
                        //alert('Please upload resume first.');
                        $('#errorResume').text('Please upload resume first.');
                        $('#errorResume').show();
                    }
                },
                error: function(obj){
                   // alert(obj.status + "\n" + obj.statusText);
                }
            }); 

            return false;
        }
    }
    else {
        $('#errorResume').text('Please upload resume first.');
        $('#errorResume').show();
    //closeErPopup();
        
    }
    
       
}
 function ajaxFileUploadEr(prod, pmid)
    { 
        $.ajaxFileUpload
        (
            {
                url:ABSOLUTE_URL+'/js_services/uploadErWritingResume/',
                secureuri:false,
                fileElementId:'upload_resume_name',
                dataType: 'json',
               success: function (data, status)
                {
                   
                  if(data == '1') {
                    isResumeUploaded=true;
                                    popup('popUpDiv');
                                    $('#popUpDiv').html('');
                                 
                                    show_cart();
                   } else if(data == '0'){
                                       // alert('Resume should be .doc, .docx files; upto 500 KB each.');
                                       $('#errorResume').text('Resume should be .doc, .docx files; upto 500 KB each.');
                                                 $('#errorResume').show();
                    return false;
                                       
                }
            },
                error: function (data, status, e)
                {
                    alert(e);
                },
                complete: function(){
                    
                }
            }
        )

        return false;

    }
function closeRcPopup(promotionId,type){
popup('popUpDiv');
$('#popUpDiv').html('');
show_cart();
} 

function close_executive_resume_popup(prod, pmid){
popup('popUpDiv');
$('#popUpDiv').html('');
show_cart();

}
function ajaxFileUpload(promotionId,type)
    {
        $.ajaxFileUpload
        (
            {
                url:ABSOLUTE_URL+'/js_services/uploadRcResume/',
                secureuri:false,
                fileElementId:'upload_resume_name',
                dataType: 'json',
               success: function (data, status)
                {
                  
                   if(data == '1') {
                        popup('popUpDiv');
                        $('#popUpDiv').html('');
                        show_cart();
                      
                   } else {
                        document.getElementById('rc_errorDiv2').style.display="block";
                    return false;
                }
             },
                error: function (data, status, e)
                {
                    alert(e);
                }
            }
        )

        return false;

    }

function hhresumeCritiqueValidation(promotionId,type)
{
    var debug1=0;
    //var radios = document.getElementsByTagName('input');
    var value1;
    var real_name;
    var resume_seleted=0; 

      if($('.resume').is(':checked')){
        resume_seleted = 1;
        real_name = $('.resume:checked').val();
       
        
    }  
    var resume_upload=document.getElementById('upload_resume_name').value;
    
    if($('#rc_availed_resume').val()!= "" && ($('#rc_availed_resume').val() == resume_upload || $('#rc_availed_resume').val() == real_name)){
        document.getElementById('rc_errorDiv1').style.display="block";
        return false;        
    }
    
    if(resume_upload!="")    {
        if(debug1 == 1) alert('4');
        document.getElementById('upload_resume_val').value=1;

    }
    if(resume_upload!="" || resume_seleted==1)     {

        document.getElementById("submit_val").value=1;
        if(resume_upload!="")
        {
           
            ajaxFileUpload(promotionId,type);
                        
            return false;
        }
        else {
            $.ajax({
                url: ABSOLUTE_URL+'/js_services/resume_critique_popup',
                type: 'POST',
                data: $('#hh_resume_critique').serialize(true),
                success: function(transport){
                    if(transport == 1)
                    {
                        popup('popUpDiv');
                        show_cart();
                                                                                                                                    
                                           
                    }
                },
                error: function(obj){
                    alert(obj.status + "\n" + obj.statusText);
                }
            });    


            return false;
        }
    }
    else {
        if(debug1 == 1) alert('11');
        document.getElementById('rc_errorDiv').style.display="block";
        return false;
    }
}


function select_buy_option(type){
        
        if(type ==1){
            
            if(document.getElementById('silver_combo').checked){
                
                addWithoutShowCart('2','0','1');
                setTimeout(function() {addResumeProductCart(311,'0','1')},1000);
                
            } else {
                
                addCart('2','0','1');
                
            }
        }else if(type == 2){
            
            if(document.getElementById('gold_combo').checked){
                
               
                addWithoutShowCart('103','0','1');
                setTimeout(function() {addResumeProductCart(85,'0','1')},1000);
              
                
            } else {
                
                addCart('103','0','1');
            }
            
            
        }else if(type ==3){
            
             if(document.getElementById('platinum_combo').checked){
                
                addResumeProductCart('15','0','1');
                setTimeout(function() {addWithoutShowCart('104','0','1')},2000);
             
            } else {
                
                addCart('104','0','1');
                
            }
        }
        
    }


function checkMemProm(chkId){
        /*
        if(JS_STATUS==5){
            membershipPurchaseBlockAlert();
            return false;
        }else */
            if($('#'+chkId).is(':checked')){
            if(chkId == 'offer15'){
                 if($('#salaryCheck').val()=='inSalaryScale'){
                  addWithoutShowCart('104','0','1');
                  addResumeProductCart('15','0','1');
                 }
                 else if($('#salaryCheck').val()=='underSalaryScale'){
                     confirmBoxCombo(chkId);
                     }
            }else if(chkId == 'offer85'){
               if($('#salaryCheck').val()=='inSalaryScale'){
                 addWithoutShowCart('103','0','1');
                 addResumeProductCart('85','0','1');
                  }
                 else if($('#salaryCheck').val()=='underSalaryScale'){
                     confirmBoxCombo(chkId);
                     }
            }
                
            //window.location.href = url;
        }else {
              if(chkId == 'offer15'){
                
                 addResumeProductCart('15','0','1');
                
            }else if(chkId == 'offer85'){
          
                addResumeProductCart('85','0','1');
                
            }
            
        }
    }
    
function availResumeCritique(type,promotionId){
    $.ajax({
        url: ABSOLUTE_URL+'/shopping_carts/showAvailRcPopUp/'+type+'/'+promotionId,
        type: 'POST',
        success: function(transport){
            showPopUpContainerData(transport);
        },
        error: function(obj){
            //alert(obj.status + "\n" + obj.statusText);
        }
    });    

}    
    function closeAvailRcPopup(promotionId,type){
popup('popUpDiv');
$('#popUpDiv').html('');

} 


function availResumeCritiqueValidation(promotionId,type){
    var debug1=0;
    
    var value1;
    var real_name;
    var resume_seleted=0; 

    if($('#resume').is(':checked')){
        resume_seleted = 1;
        real_name = $('#resume').val();
        
    }
    var resume_upload=document.getElementById('upload_resume_name').value;
    
    if($('#rc_availed_resume').val()!= "" && ($('#rc_availed_resume').val() == resume_upload || $('#rc_availed_resume').val() == real_name)){
        document.getElementById('rc_errorDiv1').style.display="block";
        return false;        
    }
    
    if(resume_upload!="")    {
        if(debug1 == 1) alert('4');
        document.getElementById('upload_resume_val').value=1;

    }
    if(resume_upload!="" || resume_seleted==1)     {

        document.getElementById("submit_val").value=1;
        if(resume_upload!="")
        {
           
            availAjaxFileUpload(promotionId,type);
                        
            return false;
        }
        else {

            //Ajax request to submit the form
            $.ajax({
                url: ABSOLUTE_URL+'/js_services/resume_critique_popup',
                type: 'POST',
                data: $('#hh_resume_critique').serialize(true),
                success: function(transport){
                    if(transport == 1)
                    {
                        popup('popUpDiv');
                        document.location.href = ABSOLUTE_URL+'/career-services/hh-resume-critique';
                                                                                                                                    
                                           
                    }
                },
                error: function(obj){
                    //alert(obj.status + "\n" + obj.statusText);
                }
            });
     

            return false;
        }
    }
    else {
        if(debug1 == 1) alert('11');
        document.getElementById('rc_errorDiv').style.display="block";
        return false;
    }
}

function availAjaxFileUpload(promotionId,type)
    {
        $.ajaxFileUpload
        (
            {
                url:ABSOLUTE_URL+'/js_services/uploadRcResume/',
                secureuri:false,
                fileElementId:'upload_resume_name',
                dataType: 'json',
               success: function (data, status)
                {
                  
                   if(data == '1') {
                        popup('popUpDiv');
                        $('#popUpDiv').html('');
                       document.location.href = ABSOLUTE_URL+'/career-services/hh-resume-critique';
                      
                   } else {
                        document.getElementById('rc_errorDiv2').style.display="block";
                    return false;
                }
             },
                error: function (data, status, e)
                {
                    alert(e);
                }
            }
        )

        return false;

    }
//addResumeProductCart(76,'0','1');
//addResumeProductCart(310,'0','1');
//addResumeProductCart(75,'0','1');
function SetSel(elem)

{

  var elems = document.getElementsByTagName("input");

  var currentState = elem.checked;

  var elemsLength = elems.length;

 

  for(i=0; i<elemsLength; i++)

  {

    if(elems[i].type === "checkbox")

    {

       elems[i].checked = false;  

    }

  }

 

  elem.checked = currentState;

}


 function addCombo(firstPromotionId, SecondPromotionId){
    $.ajax({
        url: ABSOLUTE_URL+'/shopping_carts/addCart/'+firstPromotionId+'/'+0+'/'+1,
        type: 'POST',
        success: function(transport){
           
            if(transport == 'fail'){
                                                         
                alert('Item could not be added into the cart');
            }else if(transport == 'already'){ 
                                                         
                //alert('Service has already been added to your cart!'); 
                
                transport = '{"0":"show"}';
                
              //  show_cart();
            }else if(transport == 'status5'){
                                                        
                                                         
            }
            else if(transport== 'not_eligible_upgrade'){
                                                            
                alert('You cannot buy this plan as you are already a premium member');
                                                            
                                                            
            }
            if(transport != 'already')                                                             
                                                                         
                        var arr =     JSON.parse(transport);
                                                                                                       
                                                 
            if(arr[0] == 'expensive'){
                                                        
                if(confirm('This service belongs to the same category as an item that you had earlier added to your cart. Do you want to replace it?')){
                    replaceCartItem(arr[1],arr[2]);
                                                            
                }else{ 
                                                            
                    $.ajax({
                        url: ABSOLUTE_URL+'/shopping_carts/addCart/'+deBriefId+'/'+0+'/'+1,
                        type: 'POST',
                        success: function(transport){
                            if(transport == 'fail'){
                                                         
                                alert('Item could not be added into the cart');
                            }else if(transport == 'already'){ 
                                                         
                                //alert('Service has already been added to your cart!'); 
                            }else if(transport == 'status5'){
                                                        
                                                         
                            }
                            else if(transport== 'not_eligible_upgrade'){
                                                            
                alert('You cannot buy this plan as you are already a premium member');
                                                            
                                                            
            }
                                                     
                                                    
                           if(transport == 'already')                                                             
                            show_cart();
                        else                                                   
                        var arr =     JSON.parse(transport); 
                                                     
                                                    
                            if(arr[0] == 'expensive'){
                                                        
                                if(confirm('This service belongs to the same category as an item that you had earlier added to your cart. Do you want to replace it?')){
                                    replaceCartItem(arr[1],arr[2]);
                                                            
                                }else{ 
                                    show_cart();
                                }
                            }else if(arr[0] == 'removal'){
                                alert('Some Item in cart is included as a complimentary service along with added Membership and comes free to you! ');
                                replaceCartItem(arr[1],arr[2]);
                                                           
                            } else if(arr[0] == 'complimentary'){
                                                            
                                alert('Some Item in cart is included as a complimentary service along with added Membership and comes free to you! ');
                                                            
                                                            
                            }else if(arr[0] == 'show'){
                                                            
                                show_cart();
                            }
                        },
                        error: function(obj){
                            //alert(obj.status + "\n" + obj.statusText);
                        }
                    });
                }
            }else if(arr[0] == 'removal'){
                alert('Some Item in cart is included as a complimentary service along with added Membership and comes free to you! ');
                replaceCartItem(arr[1],arr[2]);
                                                           
            } else if(arr[0] == 'complimentary'){
                                                            
                alert('Some Item in cart is included as a complimentary service along with added Membership and comes free to you! ');
                                                            
                                                            
            }else if(arr[0] == 'show'){
                $.ajax({
                    url: ABSOLUTE_URL+'/shopping_carts/addCart/'+SecondPromotionId+'/'+0+'/'+1,
                    type: 'POST',
                    success: function(transport){
            
                        if(transport == 'fail'){
                                                         
                            alert('Item could not be added into the cart');
                        }else if(transport == 'already'){ 
                                                         
                            //alert('Service has already been added to your cart!'); 
                        }else if(transport  == 'status5'){
                                                        
                                                         
                        }
                        else if(transport== 'not_eligible_upgrade'){
                                                            
                alert('You cannot buy this plan as you are already a premium member');
                                                            
                  }
                                                     
                         if(transport == 'already')                                                             
                            show_cart();
                        else                                                   
                        var arr =     JSON.parse(transport);
                                                     
                                                    
                        if(arr[0] == 'expensive'){
                                                        
                            if(confirm('This service belongs to the same category as an item that you had earlier added to your cart. Do you want to replace it?')){
                                replaceCartItem(arr[1],arr[2]);
                                                            
                            }else{ 
                                show_cart();
                            }
                        }else if(arr[0] == 'removal'){
                            alert('Some Item in cart is included as a complimentary service along with added Membership and comes free to you! ');
                            replaceCartItem(arr[1],arr[2]);
                                                           
                        } else if(arr[0] == 'complimentary'){
                                                            
                            alert('Some Item in cart is included as a complimentary service along with added Membership and comes free to you! ');
                                                            
                                                            
                        }else if(arr[0] == 'show' ){
                                                            
                            show_cart();
                        }
                    },
                    error: function(obj){
                        //alert(obj.status + "\n" + obj.statusText);
                    }
                });
                                                           
            }
        },
        error: function(obj){
            //alert(obj.status + "\n" + obj.statusText);
        }
    });
        
       
    }
function checkMemPromLoggedOut(chkId){
   
            if($('#'+chkId).is(':checked')){
            if(chkId == 'offer15'){
                 
                  //addWithoutShowCart('4','0','1');
                 // setTimeout(function() {addCart('15','0','1')},1000);
                  addCombo('104', '15');
                  
            }else if(chkId == 'offer85'){
               
                 //addWithoutShowCart('3','0','1');
                 //setTimeout(function() {addCart('85','0','1')},1000);
                  addCombo('103', '85');
              
            }
              
            //window.location.href = url;
        }else {
              if(chkId == 'offer15'){
                
                 addCart('15','0','1');
                
            }else if(chkId == 'offer85'){
          
                addCart('85','0','1');
                
            }
            
        }
    }
    
    
    function select_buy_option_loggedout (type,pageId,buttonName) {
        
        if(type ==1){
            
           if(document.getElementById('silver_combo').checked){
              if(buttonName !=''){ buttonName = buttonName+'-combo'; }            
               addCombo('2', '311', pageId, buttonName);             
            } else {
                
                 addCart('2','0','1', pageId, buttonName);
            }
        }else if(type == 2){
            
            if(document.getElementById('gold_combo').checked){
                
               if(buttonName !=''){ buttonName = buttonName+'-combo'; }  
                //addWithoutShowCart('3','0','1');
                //setTimeout(function() {addCart(85,'0','1')},1000);
                 addCombo('103', '85', pageId, buttonName);
                
            } else {
                
                addCart('103','0','1', pageId, buttonName);
            }
            
            
        }else if(type ==3){
            
             if(document.getElementById('platinum_combo').checked){
                 if(buttonName !=''){ buttonName = buttonName+'-combo'; }  
               // addCart('15','0','1');
               // setTimeout(function() {addWithoutShowCart('4','0','1')},2000);
                 addCombo('104', '15', pageId, buttonName);
              
                
            } else {
                
                addCart('104','0','1', pageId, buttonName);
                
            }
        }
        
    }
    
    function select_buy_option_membership_loggedout(type){
        
        if(type ==1){
           
                addCart('2','0','1');
            
        }else if(type == 2){
            
                addCart('103','0','1');
            
            
            
        }else if(type ==3){
            
              
                 addCart('104','0','1');
           
        }
        
    }
    
    function addrResumeCritiqueToCart(type,promotionId){
        
        $.ajax({
        url: ABSOLUTE_URL+'/shopping_carts/showRcPopUp/'+type+'/'+promotionId,
        type: 'POST',
        success: function(transport){
           showPopUpContainerData(transport);
        },
        error: function(obj){
            //alert(obj.status + "\n" + obj.statusText);
        }
    });
    }

 /*   
    @Created By      :   Praveen Poonia
    @Created On      :   24-May-2013
    @Params          :   "combo" tells which function to call when adding to cart
    @Disc            :   This function is used for showing popup for those user who have less salary, while they buy any premium services.
 */
    
function confirmBoxCombo(combo){
    $.ajax({
        url: ABSOLUTE_URL+'/shopping_carts/confirmBox/'+combo,
        type: 'POST',
        success: function(transport){
            $('#confirmPopup').html(transport);
        },
        error: function(obj){
           // alert(obj.status + "\n" + obj.statusText);
           alert('Something went wrong!');
        }
    });
  }

/*   
    @Created By      :   Praveen Poonia
    @Created On      :   24-May-2013
    @Params          :   "type" tells which function to call when adding to cart,
                         "promotionId" tells which product we are buying
    @Disc            :   This function is used for showing popup for those user who have less salary, while they buy any premium services.
*/
    
function confirmBox(type,promotionId){
    
     if(type == 'offer15' || type == 'offer85'){  proccedToCart('proceed',type,'combo');  } else { proccedToCart('proceed',type,promotionId); }
   /* $.ajax({
        url: ABSOLUTE_URL+'/shopping_carts/confirmBox/'+type+'/'+promotionId,
        type: 'POST',
        success: function(transport){
            $('#confirmPopup').html(transport);
            $("html, body").animate({
                    scrollTop: 0
                }, "slow");
        },
        error: function(obj){
           // alert(obj.status + "\n" + obj.statusText);
           alert('Something went wrong!');
        }
    }); */
  }
  
  function proccedToCart(action,type,promotionId,pageURL,buttonName) {
    if(action=='proceed'){  
        if(type=='1'){
            select_buy_option_membership(promotionId,pageURL,buttonName); }
        else if(type=='2') {
            select_buy_option(promotionId,pageURL,buttonName);
        }
        else if(type=='3') {
            addCart(promotionId,'0','1',pageURL,buttonName);
        }
        else if(type=='offer15') {
            addWithoutShowCart('104','0','1',pageURL,buttonName);
            addResumeProductCart('15','0','1',pageURL,buttonName);
        }
        else if(type=='offer85') {
            addWithoutShowCart('103','0','1',pageURL,buttonName);
            addResumeProductCart('85','0','1',pageURL,buttonName);
        }
        else if(type=='offer311') {
            addWithoutShowCart('2','0','1',pageURL,buttonName);
            addResumeProductCart('311','0','1',pageURL,buttonName);
        }
            document.getElementById('blanket').style.display = 'none';
            document.getElementById('popUpDiv').style.display = 'none';
    }
    else {
        document.getElementById('blanket').style.display = 'none';
        document.getElementById('popUpDiv').style.display = 'none';
    }
}


function membershipPlanPopup(type){
    
    
    $.ajax({
        url: ABSOLUTE_URL+'/js_services/comboMembershipPopup/'+type,
        type: 'POST',
        success: function(transport){
                        
            showPopUpContainerData(transport);
        },
        error: function(obj){
           // alert(obj.status + "\n" + obj.statusText);
           alert('Something went wrong!');
        }
    });
    
}

function comboResumePopup(id,exp) {
 
    $.ajax({
        url: ABSOLUTE_URL+'/js_services/comboResumePopup/'+id+'/'+exp,
        type: 'POST',
        success: function(transport){
                        
            showPopUpContainerData(transport);
        },
        error: function(obj){
           // alert(obj.status + "\n" + obj.statusText);
           alert('Something went wrong!');
        }
    });
    
    
}

function hideModal(modal) {
    jQuery('#'+modal).modal('hide');
}

