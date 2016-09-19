var verisign_var = '<table width="135" border="0" cellpadding="2" cellspacing="0" title="Click to Verify - This site chose VeriSign SSL for secure e-commerce and confidential communications."> <tr><td width="135" align="center" valign="top"><script type="text/javascript" language="javascript"><!--dn="headhonchos.com";lang="en";tpt="opaque";vrsn_style="WW";splash_url="https://sealinfo.verisign.com";seal_url="https://seal.verisign.com";u1=splash_url+"/splash?form_file=fdf/splash.fdf&dn="+dn+"&lang="+lang;u2=seal_url+"/getseal?at=0&sealid=1&dn="+dn+"&lang="+lang;var sopener;function vrsn_splash(){if(sopener&&!sopener.closed){sopener.focus();}else{tbar="location=yes,status=yes,resizable=yes,scrollbars=yes,width=560,height=500";var sw=window.open(u1,\'VRSN_Splash\',tbar);if(sw){sw.focus();sopener=sw;}}}var ver=-1;var v_ua=navigator.userAgent.toLowerCase();var re=new RegExp("msie ([0-9]{1,}[\.0-9]{0,})");if(re.exec(v_ua)!==null){ver=parseFloat(RegExp.$1);}var v_old_ie=(v_ua.indexOf("msie")!=-1);if(v_old_ie){v_old_ie=ver<5;}function v_mact(e){var s;if(document.addEventListener){s=(e.target.name=="seal");if(s){vrsn_splash();return false;}}else if(document.captureEvents){var tgt=e.target.toString();s=(tgt.indexOf("splash")!=-1);if(s){vrsn_splash();return false;}}return true;}function v_mDown(event){if(document.addEventListener){return true;}event=event||window.event;if(event){if(event.button==1){if(v_old_ie){return true;}else{vrsn_splash();return false;}}else if(event.button==2){vrsn_splash();return false;}}else{return true;}}document.write("<a HREF=\"javascript:vrsn_splash()\" tabindex=\"-1\" width=\"115\" height=\"82\"><IMG NAME=\"seal\" BORDER=\"true\" SRC=\""+u2+"\" width=\"115\" height=\"82\"  oncontextmenu=\"return false;\" alt=\"Click to Verify - This site has chosen a VeriSign SSL Certificate to improve Web site security\"></A>");if((v_ua.indexOf("msie")!=-1)&&(ver>=7)){var plat=-1;var re=new RegExp("windows nt ([0-9]{1,}[\.0-9]{0,})");if(re.exec(v_ua)!==null){plat=parseFloat(RegExp.$1);}if((plat>=5.1)&&(plat!=5.2)){document.write("<div style=\'display:none\'>");document.write("<img src=\'https://extended-validation-ssl.verisign.com/dot_clear.gif\'/>");document.write("</div>");}}if(document.addEventListener){document.addEventListener(\'mouseup\',v_mact,true);}else{if(document.layers){document.captureEvents(Event.MOUSEDOWN);document.onmousedown=v_mact;}}function v_resized(){if(pageWidth!=innerWidth||pageHeight!=innerHeight){self.history.go(0);}}if(document.layers){pageWidth=innerWidth;pageHeight=innerHeight;window.onresize=v_resized;}--></script><br /><a href="http://www.verisign.com/ssl-certificate/" target="_blank"  style="color:#000000; text-decoration:none; font:bold 7px verdana,sans-serif; letter-spacing:.5px; text-align:center; margin:0px; padding:0px;">ABOUT SSL CERTIFICATES</a></td></tr></table>';

function db_fail() {
    var contents = $('db_fail').innerHTML;
    showPopup(contents);
}


function recordOutboundLink(link, category, action, label) {
    ga('send', 'event', category, action, label);
    setTimeout('document.location = "' + link.href + '"', 100);
}

function check_not_relevant(id)
{

    new Ajax.Request(ABSOLUTE_URL + '/js_mypages/notrelevant/' + id, {
        onSuccess: function(transport) {
            $('hhRecommendsDataDiv').update(transport.responseText);
        },
        onFailure: function() {
            alert('Something went wrong...')
        }
    });




    //alert(id);
    //$('jobid'+id).style.display = 'none';
}



var $j = jQuery.noConflict();
var $jq = jQuery.noConflict();
/*to calculate the pointer height dynamically starts */
var tempY = 0;
var IE = document.all ? true : false;
if (!IE)
    document.captureEvents(Event.click);
document.onclick = getMouseXY;
window.onscroll = getMouseXY;

function getMouseXY(e) {
    var scroll = parseInt(getScrollY());
    var asize = parseInt(alertSizeY());


    if (scroll > 0) {
        tempY = scroll + asize / 2 - 220;   //alert('t'+tempY);
    } else {
        tempY = 100;
    }

    if (clicked_jobcode_link != '') {
        //clicked on link for opening job code
        clicked_jobcode_link = '';
    } else {
        if (inside_jobcode == 1) {
            inside_jobcode = 0;
        } else {
            if (document.getElementById('email_now'))
                document.getElementById('email_now').style.display = 'none';
            if (document.getElementById('featured_email_now'))
                document.getElementById('featured_email_now').style.display = 'none';

        }
    }

    hide_tag_div();
}
/*to calculate the pointer height dynamically ends */

var opened_tag_div = "";
var status = 0;
var spinner_dontshow = 0;
function getScrollY() {
    var scrOfY = 0;
    if (typeof(window.pageYOffset) == 'number') {
        //Netscape compliant
        scrOfY = window.pageYOffset;

    } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
        //DOM compliant
        scrOfY = document.body.scrollTop;

    } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
        //IE6 standards compliant mode
        scrOfY = document.documentElement.scrollTop;

    }
    return scrOfY;
}


function alertSizeY() {
    var myWidth = 0, myHeight = 0;
    if (typeof(window.innerWidth) == 'number') {
        //Non-IE
        myHeight = window.innerHeight;
    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        //IE 6+ in 'standards compliant mode'
        myHeight = document.documentElement.clientHeight;
    } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        //IE 4 compatible
        myHeight = document.body.clientHeight;
    }

    return myHeight;
}


function hide_tag_div(opened_tag_div) {

    if (document.getElementById(opened_tag_div)) {
        if (opened_tag_div != "" && status == 0) {
            document.getElementById(opened_tag_div).style.display = 'none';
            opened_tag_div = "";
        }
        status = 0;
    }
}












//dump javascript object
function so(obj) {
    str = '';
    for (prop in obj)
    {
        str += prop + " value :" + obj[prop] + "\n";
    }
    return(str);
}

function getheight() {
    var d = document.documentElement;
    var b = document.body;
    var who = d.offsetHeight ? d : b;
    return Math.max(who.scrollHeight, who.offsetHeight);
}

function toggle(div_id) {
    var el = document.getElementById(div_id);
    if (el.style.display == 'none') {
        el.style.display = 'block';
    }
    else {
        el.style.display = 'none';
    }
}
function blanket_size(popUpDivVar) {
    if (typeof window.innerWidth != 'undefined') {
        viewportheight = window.innerHeight;
    } else {
        viewportheight = document.documentElement.clientHeight;
    }
    if ((viewportheight > document.body.parentNode.scrollHeight) && (viewportheight > document.body.parentNode.clientHeight)) {
        blanket_height = viewportheight;
    } else {
        if (document.body.parentNode.clientHeight > document.body.parentNode.scrollHeight) {
            blanket_height = document.body.parentNode.clientHeight;
        } else {
            blanket_height = document.body.parentNode.scrollHeight;
        }
    }
    var blanket = document.getElementById('blanket');
    blanket.style.height = getheight() + 'px';
    var popUpDiv = document.getElementById(popUpDivVar);
    //popUpDiv_height=blanket_height/2-150;//150 is half popup's height
    //popUpDiv.style.top = popUpDiv_height + 'px';
    popUpDiv.style.top = 50 + 'px';
    popUpDiv.style.left = 30 + '%';
}
function window_pos(popUpDivVar) {
    if (typeof window.innerWidth != 'undefined') {
        viewportwidth = window.innerHeight;
    } else {
        viewportwidth = document.documentElement.clientHeight;
    }
    if ((viewportwidth > document.body.parentNode.scrollWidth) && (viewportwidth > document.body.parentNode.clientWidth)) {
        window_width = viewportwidth;
    } else {
        if (document.body.parentNode.clientWidth > document.body.parentNode.scrollWidth) {
            window_width = document.body.parentNode.clientWidth;
        } else {
            window_width = document.body.parentNode.scrollWidth;
        }
    }
    var popUpDiv = document.getElementById(popUpDivVar);
    //window_width=window_width/2-150;//150 is half popup's width
    //window_width=window_width/2-349;//150 is half popup's width
    //popUpDiv.style.left = window_width + 'px';

}

function popup1(windowname) {
    blanket_size(windowname);
    window_pos(windowname);
    toggle('blanket');
    toggle(windowname);
}

function popup(windowname) {
    blanket_size(windowname);
    window_pos(windowname);
    toggle('blanket');
    toggle(windowname);
}

function setPopUpPosition(popUpDivVar) {
    PopupObj = document.getElementById(popUpDivVar);
    marLeftPopUp = (window_width - PopupObj.offsetWidth) / 2;
    PopupObj.style.left = marLeftPopUp + 'px';
    if (tempY == 0)
        tempY = 100;
    PopupObj.style.top = tempY + 'px';     //alert('y'+tempY)   ; alert('x'+marLeftPopUp);
}





/*   
 @Created By      :   Avesh Srivastava
 @Created On      :   19-12-2009
 @Params          :   obj
 @Disc            :   Function is use for showing pop up box on seacrh
 @Return          :   -  
 */

function showPopUpContainer(transport) {
    if (transport.responseText != 'logout') {
        popup('popUpDiv');
        var param = transport.responseText;
        if ((typeof transport) == 'string') {
            param = transport;
        }
        $('popUpDiv').update(param);

    } else {
        new Ajax.Request(ABSOLUTE_URL + '/js_logins/logout_alert', {
            method: 'get',
            onSuccess: function(transport) {
                popup('popUpDiv');
                $('popUpDiv').update(transport.responseText);
            },
            onFailure: function() {
                alert('Something went wrong...')
            }
        });
    }
    setPopUpPosition('popUpDiv');
    $('blanket').style.height = getheight() + 'px';
}

function showPopUpContainerData(data) {
    if (data != 'logout') {
        popup('popUpDiv');
        $('popUpDiv').update(data);
    } else {
        new Ajax.Request(ABSOLUTE_URL + '/js_logins/logout_alert', {
            method: 'get',
            onSuccess: function(transport) {
                popup('popUpDiv');
                $('popUpDiv').update(transport.responseText);
            },
            onFailure: function() {
                alert('Something went wrong...')
            }
        });
    }
    setPopUpPosition('popUpDiv');
    $('blanket').style.height = getheight() + 'px';
}

function showPopUpContainerCustom(transport) {
    if (transport.responseText != 'logout') {
        popup('popUpDiv');
        $('popUpDiv').update(transport.responseText);
    } else {
        new Ajax.Request(ABSOLUTE_URL + '/js_logins/logout_alert', {
            method: 'get',
            onSuccess: function(transport) {
                popup('popUpDiv');
                $('popUpDiv').update(transport.responseText);
            },
            onFailure: function() {
                alert('Something went wrong...')
            }
        });
    }
    setPopUpPositionCustom('popUpDiv');
    $('blanket').style.height = getheight() + 'px';
}

function showPopUpContainerCustom_jquery(transport) {
    if (transport != 'logout') {
        popup('popUpDiv');
        $j('#popUpDiv').html(transport);
    } else {

        $j.ajax({
            type: "GET",
            url: ABSOLUTE_URL + '/js_logins/logout_alert',
            success: function(transport) {
                popup('popUpDiv');
                $j('#popUpDiv').html(transport);
            },
            error: function() {
                alert('Something went wrong...')
            }
        });


    }
    setPopUpPositionCustom('popUpDiv');
    $j('#blanket').css("height", getheight() + 'px');
}

function showPopupCustom(content) {
    popup('popUpDiv');
    $('popUpDiv').update(content);
    setPopUpPositionCustom('popUpDiv');
    $('blanket').style.height = getheight() + 'px';
}

function showPopup(content) {
    popup('popUpDiv');
    $('popUpDiv').update(content);
    setPopUpPosition('popUpDiv');
    $('blanket').style.height = getheight() + 'px';

}

function setPopUpPositionCustom(popUpDivVar) {
    PopupObj = document.getElementById(popUpDivVar);
    marLeftPopUp = (window_width - PopupObj.offsetWidth) / 2;
    PopupObj.style.left = marLeftPopUp + 'px';
    PopupObj.style.top = 100 + 'px';

}


/*   
 @Created By      :   Sharad
 @Created On      :   19-12-2009
 @Params          :   obj
 @Disc            :   Function is use showing multi dimensional array
 @Return          :   -  
 */

function dump(arr, level) {
    var dumped_text = "";
    if (!level)
        level = 0;

    //The padding given at the beginning of the line.
    var level_padding = "";
    for (var j = 0; j < level + 1; j++)
        level_padding += "    ";

    if (typeof(arr) == 'object') { //Array/Hashes/Objects 
        for (var item in arr) {
            var value = arr[item];

            if (typeof(value) == 'object') { //If it is an array,
                dumped_text += level_padding + "'" + item + "' ...\n";
                dumped_text += dump(value, level + 1);
            } else {
                dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
            }
        }
    } else { //Stings/Chars/Numbers etc.
        dumped_text = "===>" + arr + "<===(" + typeof(arr) + ")";
    }
    return dumped_text;
}

function check_appliedjob(id) {
    var search = '/js_searches';
    if (USE_SOLR == 1)
        search = '/searchs';
    new Ajax.Updater('save_job_response' + id, ABSOLUTE_URL + search + '/check_appliedjob/' + id, {
        method: 'post', onSuccess: function(transport) {
            if (transport.responseText == 'Applied')
            {
                $('apply' + id).innerHTML = '<span class="inactive">&nbsp;Applied</span>';
                if ($('save_msg' + id)) {
                    $('apply_msg' + id).style.display = 'block';
                }
                //return transport.responseText;
            }
            // if($('hhRecommends_msg'+id)){$('hhRecommends_msg'+id).style.display='block';}

        },
        parameters: $('JsSearchSearchForm').serialize(true)

    });

}


function check_appliedjob_ondetail(id) {
    var search = '/js_searches';
    if (USE_SOLR == 1)
        search = '/searchs';
    new Ajax.Updater('save_job_response' + id, ABSOLUTE_URL + search + '/check_appliedjob_ondetail/' + id, {
        method: 'post', onSuccess: function() {
            $('apply' + id).innerHTML = '';
            // if($('hhRecommends_msg'+id)){$('hhRecommends_msg'+id).style.display='block';}
            if ($('save_msg' + id)) {
                $('apply_msg' + id).style.display = 'block';
            }
        },
        parameters: $('JsSearchSearchForm').serialize(true)

    });

}


//sharad : to handle job application/detail of basic/premium
//06 jan 2012 remove ajax apply handling and popup showing.
/*
 function check_job_apply(jobid,from,wheretogo){
 
 $j.ajax({
 type: "POST",
 url: ABSOLUTE_URL+'/js_logins/checkEmailVerify/',
 success: function(transport){
 
 if(transport != 1){
 
 popup('popUpDiv');
 $jq('#popUpDiv').html(transport);
 pObj =  document.getElementById('popUpDiv');
 window_width = $jq(window).width();
 marLeftspinUp  = (window_width-pObj.offsetWidth)/2;
 var scroll1 = getScrollY();
 var asize1 = alertSizeY();
 tempY1 = scroll1+ asize1/2 - 250;  
 pObj.style.left = marLeftspinUp + 'px';
 pObj.style.top = tempY1 + 'px';
 
 }else {
 if(!check_limited_access_user()) return;
 //check_appliedjob(jobid);
 
 if(wheretogo == 'applyForJob'){var link = '/job_applications/applyForJob/';}
 
 var search = '/js_searches';if(USE_SOLR == 1) search = '/searchs';
 
 if(wheretogo == 'job_detail'){var link = search+'/job_detail/';}
 var choose_function=wheretogo; 
 var ff = '';
 
 if(from != "no" ) {ff = '/'+from;}
 var form = document.createElement('form');
 form.action = ABSOLUTE_URL+link+jobid+ff+'?type=individual';
 form.target = '_blank';
 document.getElementById('hidden_div_apply_job_9999999999999').appendChild(form);
 form.submit();
 }
 
 },
 error: function(){
 //alert('Something went wrong...')
 }
 });
 
 
 
 }
 */
function check_job_apply(jobid, from, wheretogo) {
    check_job_apply_samepage(jobid, from, wheretogo, '');
}
// durgesh handle same page redirection 
function check_job_apply_samepage(jobid, from, wheretogo, samepage) {
    $j.ajax({
        type: "POST",
        url: ABSOLUTE_URL + '/jobs/employerJobRedirect/' + jobid,
        success: function(data) {
            data = trim(data);
            if(data != null && data !='')
                window.location = data;
        },
        error: function() {
            alert('Something went wrong...')
        }
    });
    $j.ajax({
        type: "POST",
        url: ABSOLUTE_URL + '/js_logins/checkEmailVerify/',
        success: function(transport) {
            if (transport != 1) {
                popup('popUpDiv');
                $jq('#popUpDiv').html(transport);
                pObj = document.getElementById('popUpDiv');
                window_width = $jq(window).width();
                marLeftspinUp = (window_width - pObj.offsetWidth) / 2;
                var scroll1 = getScrollY();
                var asize1 = alertSizeY();
                tempY1 = scroll1 + asize1 / 2 - 250;
                pObj.style.left = marLeftspinUp + 'px';
                pObj.style.top = tempY1 + 'px';
            } else {
                // email is already verified
                if (!check_limited_access_user())
                    return;

                if (wheretogo == 'applyForJob') {
                    var link = '/job_applications/applyForJob/';
                }

                var search = '/js_searches';
                if (USE_SOLR == 1)
                    search = '/searchs';

                if (wheretogo == 'job_detail') {
                    var link = search + '/job_detail/';
                }
                var choose_function = wheretogo;
                var ff = '';

                if (from != "no") {
                    ff = '/' + from;
                }

                $j.ajax({
                    type: "POST",
                    url: ABSOLUTE_URL + '/js_logins/check_access/' + wheretogo + '/neworpriority/'+jobid,
                    success: function(transport) {
                        if(typeof String.prototype.trim !== 'function') {
                          String.prototype.trim = function() {
                            transport = transport.replace(/^\s+|\s+$/g, ''); 
                          }
                        }else{
                            transport = trim(transport);
                        }
                        if (transport == 'popup') {
                            window.location.href =  ABSOLUTE_URL +"/js_mypages/myPage/r2/"+jobid
//                            popup('popUpDiv');
//                            $jq('#popup_go').show();
                        }
                        else if (transport == 1) {
                            var pst_status;
                            $j.ajax({
                                type: "POST",
                                url: ABSOLUTE_URL + '/job_applications/check_pst/' + jobid,
                                success: function(data) {
                                    pst_status = data;
                                    if (samepage == 'jobdetail')
                                    {
                                        var search = '/js_searches';
                                        if (USE_SOLR == 1)
                                            search = '/searchs';

                                        $j.ajax({
                                            type: "POST",
                                            url: ABSOLUTE_URL + search + '/check_appliedjob/' + jobid,
                                            success: function(transport) {
                                                $j('#save_job_response' + jobid).html(transport);
                                                if (transport == 'Applied')
                                                {
                                                    document.getElementById('apply_msg').style.display = 'block';
                                                } else {
                                                    //window.location.href = ABSOLUTE_URL + link + jobid + ff;
                                                    if (wheretogo == 'applyForJob' && pst_status == 0) {
                                                        $j.ajax({
                                                            type: "POST",
                                                            url: ABSOLUTE_URL + '/job_applications/applyForJobPopup/' + jobid + '/other',
                                                            success: function(data) {
                                                                popup('popUpDiv');
                                                                $j('#popUpDiv').html(data);
                                                                setPopUpPosition('popUpDiv');
                                                            },
                                                            error: function() {
                                                                alert('Something went wrong...')
                                                            }
                                                        });
                                                    } else {
                                                        window.location.href = ABSOLUTE_URL + link + jobid + ff + '?type=individual';
                                                    }
                                                }
                                            },
                                            error: function() {
                                                // alert('Something went wrong...')
                                            }
                                        });
                                    } else {

                                        var search = '/js_searches';
                                        if (USE_SOLR == 1)
                                            search = '/searchs';

                                        $j.ajax({
                                            type: "POST",
                                            url: ABSOLUTE_URL + search + '/check_appliedjob/' + jobid,
                                            success: function(transport) {

                                                $j('#save_job_response' + jobid).html(transport);
                                                if (transport == 'Applied')
                                                {
                                                    document.getElementById('apply_msg').style.display = 'block';
                                                } else {
                                                    // window.open(ABSOLUTE_URL+link+jobid+ff+'?type=individual', '_blank');
                                                    if (wheretogo == 'applyForJob' && pst_status == 0) {
                                                        $j.ajax({
                                                            type: "POST",
                                                            url: ABSOLUTE_URL + '/job_applications/applyForJobPopup/' + jobid + '/other',
                                                            success: function(data) {
                                                                popup('popUpDiv');
                                                                $j('#popUpDiv').html(data);
                                                                setPopUpPosition('popUpDiv');
                                                            },
                                                            error: function() {
                                                                alert('Something went wrong...')
                                                            }
                                                        });
                                                    } else {
                                                        window.location.href = ABSOLUTE_URL + link + jobid + ff + '?type=individual';
                                                    }
                                                }

                                            },
                                            error: function() {
                                                //  alert('Something went wrong...')
                                            }
                                        });

                                    }
                                },
                                error: function() {
                                    alert('Something went wrong...');
                                }
                            });
                        } else {
                            if (choose_function == 'first_time_popup') {
                                showPopUpContainerCustom_jquery(transport);

                            } else {
                                //showPopUpContainer(transport);
                                showPopUpContainer_jquery(transport);
                            }

                        }

                    },
                    error: function() {
                        //  alert('Something went wrong...')
                    }
                });
            }

        },
        error: function() {
            // alert('Something went wrong...')
        }
    });
}




//Durgesh : to handle job Re-apply application/detail of basic/premium

function check_job_reapply(jobid, from, wheretogo) {

    if (!check_limited_access_user())
        return;

    if (wheretogo == 'applyForJob') {
        var link = '/job_applications/applyForJob/';
    }

    var search = '/js_searches';
    if (USE_SOLR == 1)
        search = '/searchs';

    if (wheretogo == 'job_detail') {
        var link = search + '/job_detail/';
    }
    var choose_function = wheretogo;
    var ff = '';

    if (from != "no") {
        ff = '/' + from;
    }

    // if($('screening').value != 3){

    new Ajax.Request(ABSOLUTE_URL + '/js_logins/check_access/' + wheretogo + '/0/0/0/reapply', {
        method: 'post',
        onSuccess: function(transport) {
            if (transport.responseText == 'popup') {
                popup('popUpDiv');
                $('popup_go').style.display = 'block';
            }
            else if (transport.responseText == 1) {
                new Ajax.Request(ABSOLUTE_URL + '/js_logins/check_employer_blocking/' + jobid, {
                    method: 'post',
                    onSuccess: function(transport) {

                        if (transport.responseText != 1) {

                            showPopUpContainerCustom(transport);

                        }
                        else {
                            // window.open(ABSOLUTE_URL+link+jobid+ff+'?type=individual', '_blank');
                            $j.ajax({
                                type: "POST",
                                url: ABSOLUTE_URL + '/job_applications/check_pst/' + jobid,
                                success: function(data) {
                                    pst_status = data;
                                    if (wheretogo == 'applyForJob' && pst_status == 0) {
                                        $j.ajax({
                                            type: "POST",
                                            url: ABSOLUTE_URL + '/job_applications/applyForJobPopup/' + jobid + '/other',
                                            success: function(data) {
                                                $j('#reapplyChk').val('1');
                                                popup('popUpDiv');
                                                $j('#popUpDiv').html(data);
                                                setPopUpPosition('popUpDiv');
                                            },
                                            error: function() {
                                                alert('Something went wrong...')
                                            }
                                        });
                                    } else { 
                                        window.location.href = ABSOLUTE_URL + link + jobid + ff + '?type=individual';
                                    }
                                },
                                error: function() {
                                    alert('Something went wrong...');
                                }
                            });
                            // window.location.href = ABSOLUTE_URL+link+jobid+ff;
                            //window.open(ABSOLUTE_URL+link+jobid+ff);
                        }
                    }
                });
                /*} else if(transport.responseText in {'editProfessional':'', 'editEducation':'','editResume':''}){
                 
                 location.href = ABSOLUTE_URL+'/js_profiles/'+transport.responseText+'/popup';      */

            } else {
                if (choose_function == 'first_time_popup') {
                    showPopUpContainerCustom(transport);

                } else {
                    showPopUpContainer(transport);

                }

            }
        },
        onFailure: function() {
            alert('Something went wrong...')
        }
    });

    /* } else {
     
     new Ajax.Request(ABSOLUTE_URL+'/js_logins/screening', {
     method: 'post',
     onSuccess:function(transport){  
     
     showPopUpContainer(transport);
     
     },
     onFailure: function(){ alert('Something went wrong...') }
     });       
     
     } */

}



//sharad : to handle contact and search page of basic/premium
function check_job_contact(popup) {

    var ret = 'ok';
    if ($('screening').value == 3) {

        new Ajax.Request(ABSOLUTE_URL + '/js_logins/screening', {
            method: 'post',
            onSuccess: function(transport) {

                showPopUpContainer(transport);

            },
            onFailure: function() {
                alert('Something went wrong...')
            }
        });
    }

}





//sharad : to handle search modify on saved searches of basic/premium

function check_search_modify(searchid, pagelimit, other) {
    var search = '/js_searches';
    if (USE_SOLR == 1)
        search = '/searchs';
    var link = search + '/search/' + searchid + '/' + pagelimit + '/' + other + '/modify_search';

    new Ajax.Request(ABSOLUTE_URL + '/js_logins/check_access/' + HH_SEARCH_SERVICE, {
        method: 'post',
        onSuccess: function(transport) {

            if (transport.responseText == 1) {

                window.location.href = ABSOLUTE_URL + link;

            } else {

                showPopUpContainer(transport);

            }
        },
        onFailure: function() {
            alert('Something went wrong...')
        }
    });

}


//88888888888888888888  report a problem script

/*   
 @Created By      :   Saurav Gairola
 @Created On      :   13-05-2010
 */
function on_focous_report(field_id, def_text) {
    if (document.getElementById(field_id).value == def_text) {
        document.getElementById(field_id).value = '';
        document.getElementById(field_id).style.color = '#000000';
    }
    if (document.getElementById(field_id).value != '' && document.getElementById(field_id).value != def_text) {

        document.getElementById(field_id).style.color = '#000000';
    }

}


function char_count_report(total_char, id, up_id, max_c) {
    if ((total_char.length) > max_c)
    {
        document.getElementById(id).value = document.getElementById(id).value.substr(0, max_c);
    }
    else
    {
        document.getElementById(up_id).innerHTML = max_c - (total_char.length);
    }
}




function submit_report_problem_validation() {
    var return_value_1 = name_validation_report('page_reference', 'all', 1, 80);
    var return_value_2 = combo_name_validation('subject');
    var return_value_3 = name_validation_report('details', 'all', 1, 1000);
    var return_value_4 = name_pair_validation_with_combo_report("person_name", "all", 2, 80, "all", 2, 80, "First Name", "Last Name");
    var return_value_5 = email_validation_report('email_id');
    var return_value_6 = mobile_number_validation_report('mobile_no');
    var hei = 0;
    var names = [return_value_1, return_value_2, return_value_3, return_value_4, return_value_5, return_value_6];
    for (var i in names) {
        if (names[i] == false)
            return false;
    }

    new Ajax.Request(ABSOLUTE_URL + '/../Client/report_problems/send_report/', {
        method: 'post',
        parameters: $('open_report_problem').serialize(true),
        onSuccess: function(transport) {
            $('fmessage').update(transport.responseText);
            $('open_report_problem').reset();
        },
        onFailure: function() {
            alert('Something went wrong...')
        }
    });
    return false;
}


function name_validation_report(field_id, format, len_min, len_max) {

    var inpfield = document.getElementById(field_id).value;
    var ele_value = document.getElementById(field_id).value;
    str = '';
    length_validation = validate_length_report(field_id, len_min, len_max);
    format_validation = true;

    if (!(length_validation && format_validation)) {
        //str='Between 2-80 characters.';
        error_style_report(field_id, "set");
        return  false;
    }
    else {
        //str='';
        error_style_report(field_id, "unset");
        return  true;
    }

}


function validate_page_reference() {
    if (document.getElementById("page_reference").value == 'Please enter a page reference') {
        error_style_report('page_reference', "set");
        return false;
    } else {
        error_style_report('page_reference', "unset");
        return true;
    }
}



function name_pair_validation_with_combo_report(field_id, format_1, len_min_1, len_max_1, format_2, len_min_2, len_max_2, def_txt_first_field, def_txt_second_field) {

    str = '';
    var field_id_1 = field_id + '_1';
    var field_id_2 = field_id + '_2';

    var ele_value_1 = document.getElementById(field_id_1).value;
    var ele_value_2 = document.getElementById(field_id_2).value;
    var ele_value_3 = document.getElementById("master_salutation").value;

    length_validation_1 = validate_length_report(field_id_1, len_min_1, len_max_1);
    format_validation_1 = pair_validate_format_report(field_id_1, format_1, def_txt_first_field);

    length_validation_2 = validate_length_report(field_id_2, len_min_2, len_max_2);
    format_validation_2 = pair_validate_format_report(field_id_2, format_2, def_txt_second_field);



    if ((ele_value_3 == "") || (!(length_validation_1 && format_validation_1 && length_validation_2 && format_validation_2))) {
        error_style_report(field_id, "set");
        return  false;
    }
    else {
        error_style_report(field_id, "unset");
        return  true;
    }

}


function email_validation_report(field_id) {

    var ele_value_1 = (document.getElementById(field_id).value);



    if (!ele_value_1.match(/^([a-zA-Z0-9_\-\.])+[a-zA-Z0-9]{1}@(([0-2]?[0-5]?[0-5]\.[0-2]?[0-5]?[0-5]\.[0-2]?[0-5]?[0-5]\.[0-2]?[0-5]?[0-5])|((([a-zA-Z0-9\-])+\.)+([a-zA-Z\-])+))$/)) {

        error_style_report(field_id, "set");

        return false;

    } else {

        error_style_report(field_id, "unset");

        return  true;
    }

}



function mobile_number_validation_report(field_id) {
    var ele_value_1 = document.getElementById(field_id).value;
    if (ele_value_1 == "") {
        error_style_report(field_id, "set");
        return  false;
    }

    if (!ele_value_1.match(/^[0-9]{1}[0-9]{9}$/)) {

        error_style_report(field_id, "set");

        return false;

    } else {

        error_style_report(field_id, "unset");

        return  true;
    }

}


function validate_length_report(field_id, len_min, len_max) {
    //alert('Minimum lenght is : '+len_max);
    //alert('Mximum length is : '+len_max);
    len_is = trimAll_report(document.getElementById(field_id).value).length;
    if (len_is > len_max || len_is < len_min)
        return false;
    else
        return true;

}


function trimAll_report(sString) {
    while (sString.substring(0, 1) == ' ') {
        sString = sString.substring(1, sString.length);
    }
    while (sString.substring(sString.length - 1, sString.length) == ' ') {
        sString = sString.substring(0, sString.length - 1);
    }
    return sString;
}


function pair_validate_format_report(field_id, format_is, def_txt) {
    //alert('Format is : '+format_is);
    var returns = 'false';
    switch (format_is)
    {

        case "all":
            returns = all_pair_report(field_id, def_txt);
            break;

    }


    return(returns);

}


function all_pair_report(field_id, def_text) {
    if (document.getElementById(field_id).value == '' || document.getElementById(field_id).value == def_text) {
        document.getElementById(field_id).value = def_text;
        document.getElementById(field_id).style.color = '#9C9B9A';
        return false;
    }
    else
        return true;
}


function error_style_report(field_id, to_do) {

    if (to_do == "set") {
        document.getElementById((field_id + '_div_img_msg')).style.display = 'block';
        document.getElementById(field_id + '_div').style.background = '#ffffcc';
        document.getElementById(field_id + '_div').style.paddingTop = "7px";
        document.getElementById(field_id + '_div').style.paddingBottom = "7px";

    }
    else if (to_do == "unset") {
        document.getElementById((field_id + '_div_img_msg')).style.display = 'none';
        document.getElementById(field_id + '_div').style.background = 'none';
        document.getElementById(field_id + '_div').style.paddingTop = "0px";
        document.getElementById(field_id + '_div').style.paddingBottom = "0px";

    }

}

// ajax file upload

jQuery.extend({
    createUploadIframe: function(id, uri)
    {
        //create frame
        var frameId = 'jUploadFrame' + id;
        var iframeHtml = '<iframe id="' + frameId + '" name="' + frameId + '" style="position:absolute; top:-9999px; left:-9999px"';
        if (window.ActiveXObject)
        {
            if (typeof uri == 'boolean') {
                iframeHtml += ' src="' + 'javascript:false' + '"';

            }
            else if (typeof uri == 'string') {
                iframeHtml += ' src="' + uri + '"';

            }
        }
        iframeHtml += ' />';
        jQuery(iframeHtml).appendTo(document.body);

        return jQuery('#' + frameId).get(0);
    },
    createUploadForm: function(id, fileElementId, data)
    {
        //create form    
        var formId = 'jUploadForm' + id;
        var fileId = 'jUploadFile' + id;
        var form = jQuery('<form  action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data"></form>');
        if (data)
        {
            for (var i in data)
            {
                jQuery('<input type="hidden" name="' + i + '" value="' + data[i] + '" />').appendTo(form);
            }
        }
        var oldElement = jQuery('#' + fileElementId);
        var newElement = jQuery(oldElement).clone();
        jQuery(oldElement).attr('id', fileId);
        jQuery(oldElement).before(newElement);
        jQuery(oldElement).appendTo(form);



        //set attributes
        jQuery(form).css('position', 'absolute');
        jQuery(form).css('top', '-1200px');
        jQuery(form).css('left', '-1200px');
        jQuery(form).appendTo('body');
        return form;
    },
    ajaxFileUpload: function(s) {
        // TODO introduce global settings, allowing the client to modify them for all requests, not only timeout        
        s = jQuery.extend({}, jQuery.ajaxSettings, s);
        var id = new Date().getTime()
        var form = jQuery.createUploadForm(id, s.fileElementId, (typeof(s.data) == 'undefined' ? false : s.data));
        var io = jQuery.createUploadIframe(id, s.secureuri);
        var frameId = 'jUploadFrame' + id;
        var formId = 'jUploadForm' + id;
        // Watch for a new set of requests
        if (s.global && !jQuery.active++)
        {
            jQuery.event.trigger("ajaxStart");
        }
        var requestDone = false;
        // Create the request object
        var xml = {}
        if (s.global)
            jQuery.event.trigger("ajaxSend", [xml, s]);
        // Wait for a response to come back
        var uploadCallback = function(isTimeout)
        {
            var io = document.getElementById(frameId);
            try
            {
                if (io.contentWindow)
                {
                    xml.responseText = io.contentWindow.document.body ? io.contentWindow.document.body.innerHTML : null;
                    xml.responseXML = io.contentWindow.document.XMLDocument ? io.contentWindow.document.XMLDocument : io.contentWindow.document;

                } else if (io.contentDocument)
                {
                    xml.responseText = io.contentDocument.document.body ? io.contentDocument.document.body.innerHTML : null;
                    xml.responseXML = io.contentDocument.document.XMLDocument ? io.contentDocument.document.XMLDocument : io.contentDocument.document;
                }
            } catch (e)
            {
                jQuery.handleError(s, xml, null, e);
            }
            if (xml || isTimeout == "timeout")
            {
                requestDone = true;
                var status;
                try {
                    status = isTimeout != "timeout" ? "success" : "error";
                    // Make sure that the request was successful or notmodified
                    if (status != "error")
                    {
                        // process the data (runs the xml through httpData regardless of callback)
                        var data = jQuery.uploadHttpData(xml, s.dataType);
                        // If a local callback was specified, fire it and pass it the data
                        if (s.success)
                            s.success(data, status);

                        // Fire the global callback
                        if (s.global)
                            jQuery.event.trigger("ajaxSuccess", [xml, s]);
                    } else
                        jQuery.handleError(s, xml, status);
                } catch (e)
                {
                    status = "error";
                    jQuery.handleError(s, xml, status, e);
                }

                // The request was completed
                if (s.global)
                    jQuery.event.trigger("ajaxComplete", [xml, s]);

                // Handle the global AJAX counter
                if (s.global && !--jQuery.active)
                    jQuery.event.trigger("ajaxStop");

                // Process result
                if (s.complete)
                    s.complete(xml, status);

                jQuery(io).unbind()

                setTimeout(function()
                {
                    try
                    {
                        jQuery(io).remove();
                        jQuery(form).remove();

                    } catch (e)
                    {
                        jQuery.handleError(s, xml, null, e);
                    }

                }, 100)

                xml = null

            }
        }
        // Timeout checker
        if (s.timeout > 0)
        {
            setTimeout(function() {
                // Check to see if the request is still happening
                if (!requestDone)
                    uploadCallback("timeout");
            }, s.timeout);
        }
        try
        {

            var form = jQuery('#' + formId);
            jQuery(form).attr('action', s.url);
            jQuery(form).attr('method', 'POST');
            jQuery(form).attr('target', frameId);
            if (form.encoding)
            {
                jQuery(form).attr('encoding', 'multipart/form-data');
            }
            else
            {
                jQuery(form).attr('enctype', 'multipart/form-data');
            }
            jQuery(form).submit();

        } catch (e)
        {
            jQuery.handleError(s, xml, null, e);
        }

        jQuery('#' + frameId).load(uploadCallback);
        return {abort: function() {
            }};

    },
    uploadHttpData: function(r, type) {
        var data = !type;
        data = type == "xml" || data ? r.responseXML : r.responseText;
        // If the type is "script", eval it in global context
        if (type == "script")
            jQuery.globalEval(data);
        // Get the JavaScript object, if JSON is used.
        if (type == "json")
            eval("data = " + data);
        // evaluate scripts within html
        if (type == "html")
            jQuery("<div>").html(data).evalScripts();

        return data;
    }
})

/*
 @Created By      :   Abhishek kumar
 @Created On      :   14-09-2011
 @Params          :   jobId
 @Disc            :   This function invokes for sending mail to friend
 @Return          :   ----
 */
function send_email_friend(jobId) {

    new Ajax.Request(ABSOLUTE_URL + '/js_settings/send_mail_friend/' + jobId, {
        onSuccess: function(transport) {
            showPopUpContainer(transport);
        },
        onFailure: function() {
            alert('Something went wrong...')
        }
    });

}


/*   
 @Created By      :   Abhishek kumar
 @Created On      :   14-09-2011
 @Params          :   NA
 @Disc            :   return the this.data 
 @Return          :   N/A
 */

function send_mail_submit() {
    var your_name = $('your_name').value;
    var your_email = $('your_email').value;
    var friend_name = $('friend_name').value;
    var friend_email = $('friend_email').value;
    var subject = $('subject').value;
    var msg = $('msg').value;
    if (your_email == '') {
        $('old_password_div_msg').style.display = 'block';
        $('old_password_div').update("Please enter your email.");
        return false;

    }
    if (your_email != '') {
        if (!your_email.match(/^([a-zA-Z0-9_\-\.])+@(([0-2]?[0-5]?[0-5]\.[0-2]?[0-5]?[0-5]\.[0-2]?[0-5]?[0-5]\.[0-2]?[0-5]?[0-5])|((([a-zA-Z0-9\-])+\.)+([a-zA-Z\-])+))$/)) {
            $('old_password_div_msg').style.display = 'block';
            $('old_password_div').update("Please enter your valid email.");
            return false;
        }

    }
    if (your_name == '') {
        $('old_password_div_msg').style.display = 'block';
        $('old_password_div').update("Please enter your Name.");
        return false;

    }
    if (friend_email == '') {
        $('old_password_div_msg').style.display = 'block';
        $('old_password_div').update("Please enter your friend email.");
        return false;

    }
    if (friend_email != '') {
        if (!friend_email.match(/^([a-zA-Z0-9_\-\.])+@(([0-2]?[0-5]?[0-5]\.[0-2]?[0-5]?[0-5]\.[0-2]?[0-5]?[0-5]\.[0-2]?[0-5]?[0-5])|((([a-zA-Z0-9\-])+\.)+([a-zA-Z\-])+))$/)) {
            $('old_password_div_msg').style.display = 'block';
            $('old_password_div').update("Please enter valid email of your friend.");
            return false;
        }

    }

    if (friend_name == '') {
        $('old_password_div_msg').style.display = 'block';
        $('old_password_div').update("Please enter your friend Name.");
        return false;

    }
    if (subject == '') {
        $('old_password_div_msg').style.display = 'block';
        $('old_password_div').update("Please enter subject.");
        return false;

    }
    /*if(msg==''){
     $('old_password_div_msg').style.display = 'block';    
     $('old_password_div').update("Please enter message."); 
     return false;
     
     }*/

    new Ajax.Request(ABSOLUTE_URL + '/js_settings/send_mail_to_friend', {
        parameters: $('send_mail_friend_form').serialize(true),
        onSuccess: function(transport) {
            $('old_password_div_msg').style.display = 'block';
            $('old_password_div').update("Mail sent successfuly.");

        }

    });

}

function combo_name_validation(field_id) {
    var ele_value_1 = document.getElementById(field_id).value;

    if (ele_value_1 == '') {
        error_style_report(field_id, "set");
        return false;
    }
    else {
        error_style_report(field_id, "unset");
        return  true;
    }

}

/*
 @Created By      :   Nikhil Keswani
 @Created On      :   17-04-2012
 Renders  popup on all service peges.
 */
function popup_services()
{
    new Ajax.Request(ABSOLUTE_URL + '/js_services/popup_for_services_page/', {
        onSuccess: function(transport) {
            showPopUpContainer(transport);

        },
        onFailure: function() {
            alert('Something went wrong...')
        }
    });


}

function membershipPurchaseBlockAlert(promClicked) {
    if (promClicked == undefined)
        promClicked = 1;
    new Ajax.Request(ABSOLUTE_URL + '/promotions_views/showPremiumBlockAlert/' + promClicked, {
        onSuccess: function(transport) {
            showPopUpContainer(transport);
        },
        onFailure: function() {
            alert('Something went wrong...')
        }
    });
}

function membershipBasicBlockAlert(param) {
     
}

function check_limited_access_user() {

    if (JS_STATUS == 5) {
        new Ajax.Request(ABSOLUTE_URL + '/promotions_views/showApplyContactAlert', {
            onSuccess: function(transport) {
                showPopUpContainer(transport);
            },
            onFailure: function() {
                alert('Something went wrong...')
            }
        });
        return false;
    } else {
        return true;
    }
}

function showRegApplyAlert() {
    new Ajax.Request(ABSOLUTE_URL + '/promotions_views/showRegApplyAlert', {
        onSuccess: function(transport) {
            showPopUpContainer(transport);
        },
        onFailure: function() {
            alert('Something went wrong...')
        }
    });
    return false;
}

function sub_form() {
    if ($jq('#registration_form').length > 0) {
        $jq('#registration_form').submit();
    } else if ($jq('#confirm_details').length > 0) {
        $jq('#confirm_details').submit();
    }
}


/*   
 @Created By      :   Ankit Garg
 @Created On      :   05-Nov-2012
 @Modified By     :   -----
 @Modified On     :   -----
 @No. of Params	 :	 1
 @Params          :   salary of JS, string containing register Page Info
 @Desc            :   To show Limited Access popup(<10 lakh Salary) while registration
 
 @Return          :   -----
 @Special Note	 :	 N/A
 */
function showLimitedAccessPopup(salary, registerPageInfo) {

    return;

    var value = salary.options[salary.selectedIndex].value;
    if (value == 1 || value == 4 || value == 7) {
        if (registerPageInfo == 'mainregisteration') {
            //var basicPlan=document.getElementById("free_basic").checked;
            if ($jq('#free_basic').length > 0) {
                if (document.getElementById("free_basic").checked == true) {
                    membershipBasicBlockAlert();
                }
                else
                    membershipPurchaseBlockAlert();
            }
            else
                membershipBasicBlockAlert();
        }
        else if (registerPageInfo == 'erCampaignPage') {
            membershipBasicBlockAlert();
            return;
        }
        else if ($jq('#FreeBasic0').length > 0 && document.getElementById("FreeBasic0").checked == false)
            membershipPurchaseBlockAlert();
        else if ($jq('#hire_type').length > 0 && document.getElementById('hire_type').checked == false) {
            return;
        }
        else
            membershipBasicBlockAlert();
    }
}
/*   
 @Created By      :   Ankit Garg
 @Created On      :   05-Nov-2012
 @Modified By     :   -----
 @Modified On     :   -----
 @No. of Params	 :	 0
 @Params          :      N/A 
 @Desc            :   To hide Limited Access popup(<10 lakh Salary) while registration
 
 @Return          :   -----
 @Special Note	 :	 N/A
 */
function closepopup() {
    popup('popUpDiv');
    $jq('#popUpDiv').html('');

}

function showPopUpContainer_jquery(transport) {
    if (transport != 'logout') {
        popup('popUpDiv');
        $j('#popUpDiv').html(transport);
    } else {

        $j.ajax({
            type: "GET",
            url: ABSOLUTE_URL + '/js_logins/logout_alert',
            success: function(transport) {
                popup('popUpDiv');
                $j('#popUpDiv').html(transport);
            },
            error: function() {
                alert('Something went wrong...');
            }
        });

    }

    setPopUpPosition('popUpDiv');
    $j('#blanket').css("height", getheight() + 500 + 'px');
}

function communication(id, show)
{
    if (!check_limited_access_user())
        return;

    if (show == 'true') {
        var formname = 'JsSearchSearchForm';
    } else
    {
        var formname = 'CommunicationForm';
    }

    $j.ajax({
        type: "POST",
        url: ABSOLUTE_URL + '/js_logins/check_access/contact/' + id,
        success: function(transport) {
            transport = $j.trim(transport);
            if (transport == 'popup') {
                popup('popUpDiv');
                document.getElementById('popup_go').style.display = 'block';
            }
            else if (transport == '1') {

                var search = '/js_searches';
                if (USE_SOLR == 1)
                    search = '/searchs';

                $j.ajax({
                    type: "POST",
                    data: $j('#' + formname).serialize(),
                    url: ABSOLUTE_URL + search + '/communicate/' + id,
                    success: function(transport) {

                        if (show == 'true') {
                            showPopUpContainer_jquery(transport);
                        } else {
                            $j('#popUpDiv').html(transport);
                        }
                    },
                    error: function() {
                        alert('Something went wrong...')
                    }
                });

            } else {

                showPopUpContainer_jquery(transport);
            }

        },
        error: function() {
            alert('Something went wrong...')
        }
    });

}
function markRelevantNotrelevant(jobId, divId, flag, cameFrom, jobVisitedBy, mailerSentOn)
{ //alert('ssssssssss');
    jQuery(document).ready(function($) {
        var t = $("#" + divId).html();
        // alert(t);
        $("#" + divId).html('<img src="http://static.headhonchos.com/img/ajax-loader-4.gif" width="15" height="15" alt=""  />');
        $.post(ABSOLUTE_URL + '/js_mypages/RelevantNotrelevant/' + t + '/' + jobId + '/' + flag + '/' + cameFrom + '/' + jobVisitedBy + '/' + mailerSentOn, function(data) {
            // alert(data);
            $("#" + divId).html(t);
        });
    });
}

function save_job(id) {

    var search = '/js_searches';
    if (USE_SOLR == 1)
        search = '/searchs';

    $j.ajax({
        type: "GET",
        url: ABSOLUTE_URL + search + '/save_job/' + id,
        data: $j('#JsSearchSearchForm').serialize(),
        success: function(transport) {
            $j('#saves' + id).html(transport);
            window.location.reload();
        },
        error: function() {
            alert('Something went wrong...')
        }
    });

}