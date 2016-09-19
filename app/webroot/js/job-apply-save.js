jQuery(document).ready(function() {
    function jsonToArray( object ) {
        return jQuery.map( object, function(el) { return el });
    }
    function roRequestBtnChange( btn ) {
        jQuery( '.' + btn ).removeClass( "roGetReferred" ).addClass( 'btn-success' ).html( 'Request Sent' ).attr('href', ABSOLUTE_URL + '/roundOne');
    }
    function setRoStatus() {
        jQuery.ajax({
        url: ABSOLUTE_URL + "/roundOne/requestedJobs.json",
        type: 'GET',
        success: function (data, status) {
            if( data.length === 0 ) return true;
            var requestedJobs = jsonToArray( data.jobs );
            var jobStatus = data.status;
            jQuery(requestedJobs).each( function( key, value ) {
                roRequestBtnChange( 'roId' + value );
            });
        },
        error: function (xhr, desc, err) {
            console.log(xhr);
            console.log("Details: " + desc + "\nError:" + err);
        }
        });
    }
    setRoStatus();
    jQuery(document).on( 'click', '.roGetReferred', function(){
        var jobId = jQuery(this).attr( 'data-id' );
        var btnId = jQuery(this).attr( 'id' );
        jQuery( '.error-msg-' + jobId ).addClass( 'hide' ).html( '' );
        var setUrl = ABSOLUTE_URL + '/roundOne/getReferred';
        jQuery.ajax({
            url: setUrl,
            type: 'POST',
            data: { 'jobId': jobId },
            success: function (data, status) {
                data = jQuery.parseJSON(data);
                if( data.status === '-1' ) {
                    console.log(data);    
                } else if( data.status === '0' ) {
                    jQuery( '.error-msg-' + jobId ).removeClass( 'hide' ).html( data.msg );
                } else if( data === -2 ) {
                    jQuery( '.error-msg-' + jobId ).removeClass( 'hide' ).html( "You have not availed for this service." );
                    window.open( ABSOLUTE_URL + '/roundOne/service', '_blank'); 
                } else {
                    roRequestBtnChange(btnId);
                }
            },
            error: function (xhr, desc, err) {
                console.log(xhr);
                console.log("Details: " + desc + "\nError:" + err);
            }
        });
    });
});

function applyAll(){
    $('#apply-modal').html('');
    var numApps = 0
    var ids = $('.applyAllBox:checked').map(function() {return this.value;}).get();
    numApps = ids.length;
    ids = ids.join('-');
    var urgentJob =0;
    var emailId = '';
    $.ajax({
        type: "POST",
        url: ABSOLUTE_URL + '/js_logins/checkEmailVerify/' + ids + '/' + urgentJob + '/' + emailId,
        success: function (transport) {
            if (transport != 1) {
                $('#apply-modal').html(transport);
            } else {
                $.ajax({
                    type: "POST",
                    url: ABSOLUTE_URL + '/JobApplications/r2CompleteCheck',
                    success: function (transport) {
                        if (transport == 9999) {
                            window.location.href = ABSOLUTE_URL + "/js_my_pages/myPager2/r2/" + ids;
                        } else {
                            $.ajax({
                                type: "POST",
                                url: ABSOLUTE_URL + '/JobApplications/leftApplications/'+numApps,
                                success: function (transport) {
                                    if (transport != 1) {
                                        $('#apply-modal').html(transport);
                                    } else {
                                        $.ajax({
                                            type: "POST",
                                            url: ABSOLUTE_URL + '/JobApplications/checkAppliedJobMultiple/' + ids,
                                            success: function (transport) {
                                                if (transport.trim() != '') {
                                                    ids = transport
                                                    $.ajax({
                                                        type: "POST",
                                                        url: ABSOLUTE_URL + '/JobApplications/applyForJobPopup/' + ids + '/' + urgentJob,
                                                        success: function (data) {
                                                            $('#apply-modal').html(data);
                                                            show_hide_apply_fields();
                                                        },
                                                        error: function () {
                                                            alert('Something went wrong...');
                                                        }
                                                    });
                                                } else {
                                                    window.location.reload();
                                                }
                                            },
                                            error: function () {
                                                alert('Something went wrong...');
                                            }
                                        });
                                    }
                                },
                                error: function () {
                                    alert('Something went wrong...');
                                }
                            });
                        }  
                    },
                    error: function () {
                        alert('Something went wrong...');
                    }
                });
            }
        },
        error: function () {
            alert('Something went wrong...');
        }
    });

    $('#currentApplyId').val(ids);
    $('#apply-modal').modal('show');
}

function jobApply(jobId, urgentJob, emailId) {
    $('#apply-modal').html('');
    $('#currentApplyId').val(jobId);


    $.ajax({
        type: "POST",
        url: ABSOLUTE_URL + '/JobApplications/externalJobCheck/' + jobId,
        success: function (data) {
            var data = $.trim(data);
            if (data != null && data != '') {
                window.location = data;
            } else {
                $.ajax({
                    type: "POST",
                    url: ABSOLUTE_URL + '/js_logins/checkEmailVerify/' + jobId + '/' + urgentJob + '/' + emailId,
                    success: function (transport) {
                        if (transport != 1) {
                            $('#apply-modal').html(transport);
                        } else {
                            $.ajax({
                                type: "POST",
                                url: ABSOLUTE_URL + '/JobApplications/r2CompleteCheck',
                                success: function (transport) {
                                    if (transport == 9999) {
                                        window.location.href = ABSOLUTE_URL + "/js_my_pages/myPager2/r2/" + jobId;
                                    } else {
                                        $.ajax({
                                            type: "POST",
                                            url: ABSOLUTE_URL + '/JobApplications/leftApplications',
                                            success: function (transport) {
                                                if (transport != 1) {
                                                    $('#apply-modal').html(transport);
                                                } else {
                                                    $.ajax({
                                                        type: "POST",
                                                        url: ABSOLUTE_URL + '/JobApplications/checkAppliedJob/' + jobId,
                                                        success: function (transport) {
                                                            if (transport.trim() != 'Applied') {
                                                                $.ajax({
                                                                    type: "POST",
                                                                    url: ABSOLUTE_URL + '/JobApplications/applyForJobPopup/' + jobId + '/' + urgentJob,
                                                                    success: function (data) {
                                                                        $('#apply-modal').html(data);
                                                                        show_hide_apply_fields();
                                                                    },
                                                                    error: function () {
                                                                        alert('Something went wrong...');
                                                                    }
                                                                });
                                                            } else {
                                                                window.location.reload();
                                                            }
                                                        },
                                                        error: function () {
                                                            alert('Something went wrong...');
                                                        }
                                                    });
                                                }
                                            },
                                            error: function () {
                                                alert('Something went wrong...');
                                            }
                                        });
                                    }
                                },
                                error: function () {
                                    alert('Something went wrong...');
                                }
                            });
                        }
                    },
                    error: function () {
                        alert('Something went wrong...');
                    }
                });
            }
        },
        error: function () {
            alert('Something went wrong...')
        }
    });
    $('#apply-modal').modal('show');
}

function guestApply(jobId, isUrgent) {

    $.ajax({
        type: "POST",
        url: ABSOLUTE_URL + '/JobApplications/applyWithoutLogin/' + jobId + '/' + isUrgent,
        success: function (data) {
            $('#apply-modal').html(data);
            $('#apply-modal').modal('show');
        },
        error: function () {
            alert('Something went wrong...');
        }
    });

}

function show_hide_apply_fields() {
    //$('#profile_updation_msg2').toggleClass('hidden');

    $('.country-list').width('670%');
//    var mobVal = $('#mob_edit').val();
$('#experienceDisp').toggleClass('hidden');
$('#experienceEdit').toggleClass('hidden');

$('#salaryDisp').toggleClass('hidden');
$('#salaryEdit').toggleClass('hidden');

$('#locationDisp').toggleClass('hidden');
$('#locationEdit').toggleClass('hidden');

$('#mobdisp').toggleClass('hidden');
$('#mobEdit').toggleClass('hidden');

$('#edit_details_link').toggleClass('hidden');
$('#save_details_link').toggleClass('hidden');
}

function get_profile_city_popup(city) {
    $.ajax({
        type: 'get',
        url: ABSOLUTE_URL + '/js_profiles/populateCity/' + city + '/1',
        success: function (transport) {
            $('#div_city').html(transport);
        },
        error: function () {
            alert('Something went wrong...')
        }
    });
}   

function save_or_cancel_fields(option) {
    if (option == 1) {
    	ret = save_num();
       return(ret);
   } else {

   // $('#exp_blank_alert').addClass('hidden');

  //  $('#sal_blank_alert').addClass('hidden');

   // $('#mobile_error_alert').addClass('hidden');

   show_hide_apply_fields();
   return false;
}

}

function is_mobile(num) {
    if (!num.match(/^[1-9]{1}[0-9]{2}[0-9]*$/) || ($('#master_country_id').val() == 11 && num.length != 10)) {
        return false;
    }

    return true;
}

function trim(stringToTrim) {

    return stringToTrim.replace(/^\s+|\s+$/g, "");

}

// function altered by garima gupta to check if mobile number is already registered
function save_num() {


var alert_num = 0;
   
   var mobVal = $('#mob_number').val();
   mobVal = mobVal.replace(/\s/g, '');
   mobVal = mobVal.replace('+', '');

   var country_code = $('#mob_country_code').val();
   country_code = country_code.replace(/\s/g, '');

   if ( mobVal.length < 1 || country_code.length < 1 || isNaN(country_code)) {

    $('#mobile_error_alert').removeClass('hidden');
    $('#mobile_error_alert').html('Please enter valid mobile number.');
    alert_num = 1;
    return(false);
}
country_code = country_code.replace('+', '');
$("#mob_country_code").val("+" + country_code);
if(country_code=="91" && mobVal.length!=10){
 $('#mobile_error_alert').removeClass('hidden');
 $('#mobile_error_alert').html('Please enter valid mobile number.');
 alert_num = 1;
 return(false);
}
if(alert_num==0)
   $('#mobile_error_alert').addClass('hidden');
alert_exp_sal = 0;
year = $('#master_year_sid').val();
lakh = $('#master_lakh_id').val();
thousand = $('#master_thousand_id').val();
country_id = $('#master_country_id').val();
city_id = $('#master_city_id').val();

if (lakh == 100)
    $('#master_thousand_id').val(0);

if ((lakh == 0) || (thousand == -1)) {
    $('#sal_blank_alert').removeClass('hidden');
    alert_exp_sal = 1;
} else {
    $('#sal_blank_alert').addClass('hidden');
}

if (year == 0) {
    $('#exp_blank_alert').removeClass('hidden');
    alert_exp_sal = 1;
} else {
    $('#exp_blank_alert').addClass('hidden');
}

if (country_id == 0 || city_id == 0) {
    $('#country_city_blank_alert').removeClass('hidden');
    alert_exp_sal = 1;
} else {
    $('#country_city_blank_alert').addClass('hidden');
}

if(alert_exp_sal==1)
    return false;

/* *************R2 Fields validation **************** */

designation_company_alert=false;
var designation = $('#auto_designation').val();
var company   = $('#company_name').val();
var industry  =  $("#master_industry").val();
var functional_area = $("#master_functional_area_id").val();

if(document.getElementById('master_industry')){

if(typeof(industry) == 'undefined' || industry==""){
   $('#industry_error_alert').removeClass('hidden');
     designation_company_alert=true;
}
else
  $('#industry_error_alert').addClass('hidden');
}

if(document.getElementById('master_functional_area_id')){
if(typeof(functional_area) == 'undefined' || functional_area==""){
   $('#functional_error_alert').removeClass('hidden');
    designation_company_alert=true;
}
else
   $('#functional_error_alert').addClass('hidden');
}
if(designation==""){
  designation_company_alert=true;
 $('#designation_error_alert').removeClass('hidden');
}
else
    $('#designation_error_alert').addClass('hidden');

if(company==""){
  designation_company_alert=true;

  $('#company_error_alert').removeClass('hidden');
}
else
 $('#company_error_alert').addClass('hidden');

if(designation_company_alert)
	return false;

$.ajax({
    type: 'POST',
    data: {MobileNum: mobVal, CountryCode: country_code},
    dataType: 'json',
    async: false,
    url: ABSOLUTE_URL + "/js_logins/checkMemberShipByMobile",
    success: function (data) {
        if (data.valid == true) {
        	alert_num_exist=0;
            if (((mobVal.length >= 10) && (country_code == "91")) || (country_code != "91")) {
                $('#mobile_error_alert').addClass('hidden');
                $.ajax({
                    type: 'POST',
                    data: {MobileNum: mobVal, CountryCode: country_code},
                    url: ABSOLUTE_URL + '/JobApplications/updateMobileNumber',
                    success: function (data) {
                        $('#mobdisp').html('+' + country_code + '-' + mobVal);
                    },
                    error: function () {
                        alert('Something went wrong...');
                    }
                });
                save_exp_location_sal(alert_num);
            } else {
                $('#mobile_error_alert').removeClass('hidden');
                $('#mobile_error_alert').html('Please enter valid mobile number.');
                alert_num = 1;

                return false;
            }
        } else {
            $('#mobile_error_alert').removeClass('hidden');
            $('#mobile_error_alert').html(data.message);
            alert_num_exist=1;
            return false;

        }

    },
    error: function () {
        return false;
    }
});


if(alert_num_exist===undefined || alert_num_exist==1)
	return false

else
	return true
}

function save_exp_location_sal(alert_num) {


//if($('#myJobApplication').find(('form')[0])!==undefined)

if(document.getElementById('myJobApplication')){
  var formData = new FormData($('#myJobApplication').find('form')[0]);

  $.ajax({
    url: ABSOLUTE_URL + '/JobApplications/updateQuickEdit',
    type: 'POST',
    processData: false,
    contentType: false,
    cache: false,
    data: formData,
    success: function (data) {
        if (lakh == 100)
            var salaryTxt = "1 Crore or more";
        else
            var salaryTxt = $('#master_lakh_id').val() + ' Lakh ' + $('#master_thousand_id').val() + ' Thousand';
        var expTxt = $('#master_year_sid').val() + ' Years ';
        var locationTxt = $('#master_city_id :selected').text() + ', ' + $('#master_country_id :selected').text();

        $('#salaryDisp').html(salaryTxt);
        $('#experienceDisp').html(expTxt);
        $('#locationDisp').html(locationTxt);
                lastUpdatedAgo();  // Update JS profile last_update_date
            },
            error: function () {
                alert('Something went wrong...');
            }
        });
}
else{

   formData = $("#application_form").serialize();
   $.ajax({
    url: ABSOLUTE_URL + '/JobApplications/updateQuickEdit',
    type: 'POST',
    data: formData,
    success: function (data) {
        if (lakh == 100)
            var salaryTxt = "1 Crore or more";
        else
            var salaryTxt = $('#master_lakh_id').val() + ' Lakh ' + $('#master_thousand_id').val() + ' Thousand';
        var expTxt = $('#master_year_sid').val() + ' Years ';
        var locationTxt = $('#master_city_id :selected').text() + ', ' + $('#master_country_id :selected').text();

        $('#salaryDisp').html(salaryTxt);
        $('#experienceDisp').html(expTxt);
        $('#locationDisp').html(locationTxt);
                lastUpdatedAgo();  // Update JS profile last_update_date
            },
            error: function () {
                alert('Something went wrong...');
            }
        });
}



show_view_edit(alert_num, alert_exp_sal);
}

function show_view_edit(alert_num, alert_exp_sal) {
    if (alert_num == 0 && alert_exp_sal == 0) {
        $('#profile_updation_msg2').removeClass('hidden');
        save_or_cancel_fields('0');
    }
}

function get_profile_city_popup(city) {
    $.ajax({
        type: 'get',
        url: ABSOLUTE_URL + '/js_profiles/populateCity/' + city + '/1',
        success: function (transport) {
            $('#div_city').html(transport);
        },
        error: function () {
            alert('Something went wrong...')
        }
    });
}

function finalApplyMultiple() {

    var ret = save_or_cancel_fields(1);

    if(ret==true){
        $('#finalApplyButton').addClass('disabled');
        orgId = $('#currentApplyId').val();
        $.ajax({
            url: ABSOLUTE_URL + '/job_applications/jobApplicationMultiple/' + orgId,
            type: 'POST',
            data: $('#application_form').serialize(),
            success: function (data) {
                if (data.trim() == 'Applied') {
                    var jobIds = orgId.split('-');
                    for(var i in jobIds){
                        $('.apply' + jobIds[i]).html('Applied');
                        $('#applyAll'+jobIds[i]).remove();
                        // $('#applyAll'+jobIds[i]).hide();
                        $('.apply' + jobIds[i]).addClass('disabled');
                        $('.apply' + jobIds[i]).removeClass('btn-primary');
                        $('.apply' + jobIds[i]).addClass('btn-success');
                        if ($('.save' + jobIds[i])) {
                            $('.save' + jobIds[i]).addClass('hide');
                        }
                    }
                    $('#applyAll').hide();

                    //Temporarily commented Lucy form after successfully apply.
                    if ($('#similarJobsAvailable').val() >= 0) {
                        $.ajax({
                            url: ABSOLUTE_URL + '/job_applications/postApplyAd/' + jobIds[0],
                            type: 'POST',
                            success: function (data) {
                                $('#apply-modal').html(data);
                            },
                            error: function () {
                                alert('Something went wrong ..');
                            }
                        });
                    } else {
                        $('#apply-modal').modal('hide');
                    }
                    $.ajax({
                        url: ABSOLUTE_URL + '/job_applications/createJobSeekerBullhorn/' + orgId ,
                        type: 'GET',
                        success: function () {
                             
                        },
                        error: function () {
                            alert('Something went wrong ..');
                        }
                    });
                }
            },
            error: function () {
                alert('Something went wrong ..');
            }
        });
    }

}

function finalApply() {

    var ret = save_or_cancel_fields(1);

    if(ret==true){
        $('#finalApplyButton').addClass('disabled');
        orgId = $('#currentApplyId').val();
        $.ajax({
            url: ABSOLUTE_URL + '/job_applications/jobApplication/' + orgId,
            type: 'POST',
            data: $('#application_form').serialize(),
            success: function (data) {
                if (data.trim() == 'Applied') {
                    if(window.location.href.indexOf('/jobInsight') > -1){
                        $('.apply' + orgId).html('<span class="bordered-button text-white apply'+orgId+'">Applied</span>');
                        $('.apply' + orgId).attr('disabled','disabled');
                        $('.apply' + orgId).attr('onclick','');
                    }
                    else{
                        $('.apply' + orgId).html('Applied');
                        $('#applyDropdown' + orgId).hide();
                        $('.apply' + orgId).addClass('disabled');
                        $('#applyAll'+orgId).remove();
                        $('#applyAll').hide();
                        $('.apply' + orgId).removeClass('btn-primary');
                        $('.apply' + orgId).addClass('btn-success');
                        if ($('.save' + orgId)) {
                            $('.save' + orgId).addClass('hide');
                        }
                    }

                //Temporarily commented Lucy form after successfully apply.
                if ($('#similarJobsAvailable').val() >= 0) {
                    $.ajax({
                        url: ABSOLUTE_URL + '/job_applications/postApplyAd/' + orgId,
                        type: 'POST',
                        success: function (data) {
                            $('#apply-modal').html(data);
                        },
                        error: function () {
                            alert('Something went wrong ..');
                        }
                    });
                } else {
                    $('#apply-modal').modal('hide');
                    if(window.location.href.indexOf('/jobs') > -1){
                        window.location.href = ABSOLUTE_URL+'/jobs/jobInsight/'+orgId;
                    }
                }

                $.ajax({
                    url: ABSOLUTE_URL + '/job_applications/createJobSeekerBullhorn/' + orgId ,
                     type: 'GET',
                     success: function () {
                         
                     },
                     error: function () {
                         alert('Something went wrong ..');
                     }
                 });
            }
        },
        error: function () {
            alert('Something went wrong ..');
        }
    });
}

}

function saveJob(jobId) {

    $.ajax({
        type: "GET",
        url: ABSOLUTE_URL + '/Jobs/saveJob/' + jobId,
        success: function (transport) {
            if (transport.trim() == 'Saved') {
                $('.save' + jobId).html('<i title="Saved" class="fa fa-thumbs-up disabled font-20"></i>');
                $('.save' + jobId).addClass('disabled');
                $('#applyDropdown' + jobId).hide();
            }
        },
        error: function () {
            alert('Something went wrong...')
        }
    });

}

function resendActivationMail() {
    $.ajax({
        type: "POST",
        url: ABSOLUTE_URL + '/js_logins/sendEmailVerificationLink/0',
        success: function (transport) {
            $("#resend_content").html(transport);
        },
        error: function () {
            alert('Something went wrong...')
        }
    });

}

/*
 * updates last update in ago
 *
 * @author : Prashant Agarwal 01-12-2014
 */
 function lastUpdatedAgo() {
    $.ajax({
        url: ABSOLUTE_URL + "/JsProfiles/lastUpdatedAgo",
        success: function (data) {
            if (data == "") {
                $('.lastUpdatedAgoClass').addClass('hide');
            } else {
                $('.lastUpdatedAgoClass').removeClass('hide');
                $("#lastUpdatedAgo").html(data);
            }

        }
    });
}

function show_hide_salary() {
    if ($('#master_lakh_id').val() == 100)
        $('#master_thousand_id').addClass('hidden');
    else
        $('#master_thousand_id').removeClass('hidden');
}

function resendActivationMailPopUP() {

    $.ajax({
        type: "POST",
        url: ABSOLUTE_URL + '/js_logins/sendEmailVerificationLink/0',
        success: function (transport) {
            $("#resend_content").html(transport);
            $('#Activation-modal').modal('show');
        },
        error: function () {
            alert('Something went wrong...')
        }
    });

}