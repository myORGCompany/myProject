$(document).ready(function() {
    
    $("#keyword").autocomplete(ABSOLUTE_URL+'/JsHomePages/autocomplete_designation_list/',{
        autoFill: false,
        minChars: 1,
        mustMatch:false,
        selectFirst: true,
        dataType: "json",
        scrollHeight: 150,
        multiple: true,
        width: $("#keyword").css('width'),
        multipleSeparator: ", ",
        parse: function(data) {
            if(data!=null) {
                var rows = new Array();
                for (var i = 0; i < data.length; i++) {
                    rows[i] = { data: data[i], value: data[i].Name, result: data[i].Name };
                }
            }
            return rows;
        },
        formatItem: function(row, i, max, term) {
            return term;
        },
        formatResult: function(row) {
            return row;
        }
    }).result(function (evt,row,formatted) {

    });
    
    $("#location").autocomplete(ABSOLUTE_URL + '/JsHomePages/master_city_list', {
        autoFill: false,
        minChars: 1,
        mustMatch: false,
        selectFirst: true,
        dataType: "json",
        scrollHeight: 150,
        width: $("#location").css('width'),
        multiple: true,
        multipleSeparator: ", ",
        parse: function(data) {
            var rows = new Array();
            for (var i = 0; i < data.length; i++) {
                rows[i] = {data: data[i], value: data[i].Name, result: data[i].Name};
            }
            return rows;
        },
        formatItem: function(row, i, max, term) {
            return term;
        },
        formatResult: function(row) {
            return row;
        }
    }).result(function(evt, row, formatted) {

    });
});

function changeMaxSalary (selectedElementVal,loc) {
    selectedElementVal = parseInt(selectedElementVal);
    if (selectedElementVal == 0) {
        selectedElementVal = 10;
    }

    if (loc == 'home') {
        var elementHtml = '<select class="form-control no-border margin-top-7" id="max-salary" name="max-salary"><option selected="selected" value="0">-Max-</option>';
    } else {
        var elementHtml = '<select class="form-control no-border" id="max-salary" name="max-salary"><option selected="selected" value="0">-Max-</option>';
    }

    for (i=selectedElementVal+5; i<=100; i=i+5) {
        elementHtml += '<option value="'+i+'">'+i+' Lakh</option>';
    }

    elementHtml += '</select>'
    $('#max_salary').html(elementHtml);
}

function validateForm () {
    keyword = $('#keyword').val();
    ignoreMandatoryKeyword = 0;
    
    if ($('#ignoreMandatoryKeyword')) {
        ignoreMandatoryKeyword = $('#ignoreMandatoryKeyword').val();
    }
    
    if ($.trim(keyword) != '' || ignoreMandatoryKeyword==1) {
        $('#keyword').removeClass('alert alert-danger');
        return true;
    } else {
        $('#keyword').focus();
        $('#keyword').addClass('alert alert-danger');
        return false;
    }
}