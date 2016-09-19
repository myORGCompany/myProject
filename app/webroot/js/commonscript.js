    function addOption(theSel, theText, theValue) {
        var newOpt = new Option(theText, theValue);
        var selLength = theSel.length;
        theSel.options[selLength] = newOpt;
    }

    function deleteOption(theSel, theIndex) {
        var selLength = theSel.length;
        if (selLength > 0) {
            theSel.options[theIndex] = null;
        }
    }

    function moveOptions(theSelFrom, theSelTo, ty, fieldid) {
        var selLength = theSelFrom.length;
        var selectedText = new Array();
        var selectedValues = new Array();
        var selectedCount = 0;
        var lc = parseInt($("#"+fieldid + 'Count').attr("value"));
        var i;
        var j;
        if (ty == 1) {
            //options selected
            //count length of options selected
            var k = 0;
            for (i = selLength - 1; i >= 0; i--) {
                if (theSelFrom.options[i].selected) {
                    k = k + 1;
                }
            }
            if (parseInt(k) > parseInt(8 - lc)) {
                return false;
            }
        }
        /* Find the selected Options in reverse order
                and delete them from the 'from' Select. */
        for (i = selLength - 1; i >= 0; i--) {
            if (theSelFrom.options[i].selected) {
                selectedText[selectedCount] = theSelFrom.options[i].text;
                selectedValues[selectedCount] = theSelFrom.options[i].value;
                deleteOption(theSelFrom, i);
                selectedCount++;
                if (ty == 2) {
                    $("#"+fieldid + 'Count').attr("value",parseInt($("#"+fieldid + 'Count').attr("value")) - 1);
                }
            }
        }
        // Add the selected text/values in reverse order.
        // This will add the Options to the 'to' Select
        // in the same order as they were in the 'from' Select.
        for (i = selectedCount - 1; i >= 0; i--) {
            addOption(theSelTo, selectedText[i], selectedValues[i]);
            if (ty == 1) {
                $("#"+fieldid + 'Count').attr("value",parseInt($("#"+fieldid + 'Count').attr("value"))+1);
            }
        }
    }