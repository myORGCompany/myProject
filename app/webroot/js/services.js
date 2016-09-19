/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * Search function for Seo Index Pages
 * 
 * @author Sahil 19-09-2014
 * @param login_status (0->loggedout, 1->loggedin) and searchBy
 * @return void
 */
function seoIndexPageSearch(login_status, searchBy) {

    var searched_value = document.getElementById(searchBy).value;

    if (searched_value != "")
    {
        if (searchBy == 'function') {
            url = "function=" + encodeURI(searched_value);
            url = url + "&search-page=home-page";
        }
        else if (searchBy == 'location') {
            url = "location=" + encodeURI(searched_value);
            url = url + "&search-in=0&search-page=home-page";
        }
        else if (searchBy == 'industry') {
            url = "industry=" + encodeURI(searched_value);
            url = url + "&search-page=home-page";
        }
        else if (searchBy == 'designation') {
            url = "designation=" + encodeURI(searched_value);
            url = url + "&search-in=0&search-page=home-page";
        }
        else if (searchBy == 'recruitment') {
            url = "recruitment=" + encodeURI(searched_value);
            url = url + "&search-page=home-page";
        }
        else if (searchBy == 'organization') {
            url = "organization=" + encodeURI(searched_value);
            url = url + "&search-in=0&search-page=home-page";
        }
        else if (searchBy == 'location') {
            url = "location=" + encodeURI(searched_value);
            url = url + "&search-in=0&search-page=home-page";
        }
        else if (searchBy == 'function_location') {
            url = "function=" + encodeURI(searched_value);
            url = url + "&search-page=home-page";
        }
        else if (searchBy == 'industry_location') {
            url = "function=" + encodeURI(searched_value);
            url = url + "&search-page=home-page";
        }

        if (login_status == 1) {
            redirectUrl = ABSOLUTE_URL + "/searchs/search?" + url;
        }
        else {
            redirectUrl = ABSOLUTE_URL + "/jobsregister?" + url;
        }

        $('#JsSearchSearchForm').attr('action', redirectUrl);
        $('#JsSearchSearchForm').submit();

    }

    return false;

}

/*
 * activate membership instently
 * 
 * @garima gupta
 */
function updateMembership() {
    $.ajax({
        url: ABSOLUTE_URL + '/js_services/activateFutureMembership',
        success: function(data) {
            window.location.reload();
        }
    });
}

