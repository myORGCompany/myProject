$(document).ready(function() {

    $("#industry").autocomplete(industries, {
        autoFill: true,
        mustMatch:false,
        selectFirst: true,
        width: ($("#keyword").css('width')), //As industry id gives it 100% width
        multiple: true
    });

    $("#function").autocomplete(functionalarea,{
        autoFill: true,
        mustMatch:false,
        selectFirst: true,
        multiple: true,
        width: ($("#keyword").css('width')) //As function id gives it 100% width
    });

});

$(function () {
    $("#experience-slider").slider().on('slideStop', expChange);
    $("#salary-slider").slider().on('slideStop', salChange);
});

function expChange () {
    expSel = $('#experience-slider').val();
    $('#exp_slider').val(expSel);
    
    selArr = expSel.split(",");
    
    $("#expSelectedMinView").html(selArr[0]);
    $("#expSelectedMaxView").html(selArr[1]);
}

function salChange () {
    salSel = $('#salary-slider').val();
    $('#sal_slider').val(salSel);
    
    selArr = salSel.split(",");
    
    $("#salSelectedMinView").html(selArr[0]);
    $("#salSelectedMaxView").html(selArr[1]);
}

function collapseSearchOrRefine(from) {
    if (from=='search') {
        $('#searchKeyword').collapse('toggle');
        if ($('#refineSearch').hasClass('in')) {
            $('#refineSearch').collapse('hide');
        }
    } else if (from=='refine') {
        $('#refineSearch').collapse('toggle');
        if ($('#searchKeyword').hasClass('in')) {
            $('#searchKeyword').collapse('hide');
        }
        
    }
}

function changeSearch() {
    check = $('#advancedSearch').hasClass('in');
    $('#advancedSearch').collapse('toggle');
    if (check==false) {
        showAdvancedSearch();
    } else {
        hideAdvancedSearch();
    }
}

function showAdvancedSearch () {
    $("#searchMore").addClass('hidden');
    $("#searchLess").removeClass('hidden');
    $('.page-heading').css('height','180px');
}

function hideAdvancedSearch () {
    $("#searchMore").removeClass('hidden');
    $("#searchLess").addClass('hidden');
    $('.page-heading').css('height','87px');
}

function changeMaxExperience (selectedElementVal,loc) {
    selectedElementVal = parseInt(selectedElementVal);

    var elementHtml = '<select class="form-control no-border" id="max-experience" name="max-experience"><option selected="selected" value="0">-Max-</option>';

    for (i=selectedElementVal+1; i<=40; i++) {
        elementHtml += '<option value="'+i+'">'+i+' Years</option>';
    }

    elementHtml += '</select>'
    $('#max_experience').html(elementHtml);
}