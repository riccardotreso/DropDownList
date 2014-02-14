/// <reference path="script\jquery-2.1.0.js" />


(function ($) {


    /* Invoke the dropdown functionality.
	   @param  options  string - a command, optionally followed by additional parameters or
						Object - settings for attaching new datepicker functionality
	   @return  jQuery object */
    $.fn.dropdown = function (options) {


        if (!$.dropdown.initialized) {
            $(document).mousedown($.dropdown._checkExternalClick);
            $.dropdown.initialized = true;
        }

        if (typeof options === "string" && (options === "getSelectedItem")) {
            return $.dropdown["_" + options + "DropDownList"].apply($.dropdown, this);
        }

        return this.each(function () {
            $.dropdown._attachDropDown(this, options);
        });
    };




    function DropDownList() {
        this._openDiv = "DDL_DIVOPEN";
        this._instance = "DDL_instance";
        this._selectedItem = "DDL_SelectedItem";
        this.popUpWidth = 400;
        this.popUpHeight = 100;
    };

    $.extend(DropDownList.prototype, {

        

        /* Attach the drop-down list to a jQuery selection.
		 * @param  target	element - the target input field or division or span
		 * @param  settings  object - the new settings to use for this date picker instance (anonymous)
		 */
        _attachDropDown: function (target, settings) {
            var nodeName, inline, inst;
            var divContainer, divOuter, parentTargetNode, imagesArrow;
            nodeName = target.nodeName.toLowerCase();
            

            if (nodeName === "input") {

                parentTargetNode = $(target).parent();
                divContainer = $('<div>');
                divOuter = $('<div>');
                imagesArrow = $('<span>');

                $(target).attr("class", "spaninput");
                divOuter.attr("class", "divOuter");
                divContainer.attr("class", "divContainer");
                imagesArrow.attr("class", "icon arrow");

                divOuter.appendTo(parentTargetNode);
                $(target).appendTo(divContainer);
                imagesArrow.appendTo(divContainer);
                divContainer.appendTo(divOuter);


                var ddl = this._newInst($(target), divOuter, divContainer);
                ddl = $.extend(ddl, settings || {});
                this._insData(target, this._instance, ddl);

                //bind event 
                $(target).keyup(function (event) {
                    if (event.keyCode === 13) {
                        $.dropdown._showResult(target);
                    }
                });

                imagesArrow.click(function (event) {
                    $.dropdown._showResult(target);
                });

            }
        },

        _newInst: function (target, divOuter, divContainer) {
            
            return {
                input: target,
                divOuter: divOuter,
                divContainer: divContainer
            }
        },

        _selectIndexChanged: function (object, target) {

            this._removeData(target, this._selectedItem);
            this._insData(target, this._selectedItem, object);
            var instance = this._getData(target, this._instance);
            target.value = object[instance["dataTextField"]];
        },

        _getSelectedItemDropDownList: function (target) {
            var selectedItem = this._getData(target, this._selectedItem);
            return selectedItem;
        },

        /* 
		 * @param  input  element 
		 */
        _showResult: function (input) {
            input = input.target || input;
            var parent, divResult;
            parent = $(input).parent().parent();



            var instance = this._getData(input, this._instance);

            divResult = parent.find("div.divResult");
            if (divResult.length === 0) {
                divResult = $('<div>');
                divResult.attr("class", "divResult");
                divResult.width(instance.popUpWidth ? instance.popUpWidth : 400);
                divResult.height(instance.popUpHeight ? instance.popUpHeight : 100);
                divResult.appendTo(parent);

                if (instance.dataSource)
                {
                    var data = instance.dataSource.data;
                    var colums = instance.columns;

                    var table, thead, trHead, tbody, trBody;

                    table = $("<table class='result' cellspacing=0 cellpadding=0>");
                    //thead
                    thead = $("<thead>");
                    trHead = $("<tr>");
                    $(colums).each(function (index, object) {
                        if (object["hidden"] === false) {
                            var th = $("<th>");
                            th.html(object["title"]);
                            th.appendTo(trHead);
                        }
                    });
                    trHead.appendTo(thead);
                    thead.appendTo(table);
                   
                    //tbody
                    tbody = $("<tbody>");
                    $(data).each(function (index, objData) {
                        trBody = $("<tr>");
                        
                        $(colums).each(function (index, objColumns) {
                            if (objColumns["hidden"] === false)
                            {
                                var td = $("<td>");
                                td.html(objData[objColumns["field"]]);

                                td.mousedown(function (event) {
                                    $.dropdown._selectIndexChanged(objData, input);
                                });

                                td.appendTo(trBody);

                                
                            }
                        });
                        

                        trBody.appendTo(tbody);
                        
                        
                    });
                    tbody.appendTo(table);

                    table.appendTo(divResult);
                    
                }

            }
            divResult.show();


            this._insData(document, $.dropdown._openDiv, divResult);




        },

        _insData: function (target, key, value) {
            return $.data(target, key, value);
        },

        _getData: function (target, key) {
            return $.data(target, key);
        },

        _removeData: function (target, key, value) {
            return $.removeData(target, key);
        },

        _checkExternalClick: function (event) {
            //if (!$.datepicker._curInst) {
            //	return;
            //}

            //var input = target;
            var objDiv = $.dropdown._getData(document, $.dropdown._openDiv);
            try {
                if (objDiv) {
                    //event.stopPropagation();
                    $(objDiv).hide();
                    $.dropdown._removeData(document, $.dropdown._openDiv);
                }
            }
            catch (e)
            { }

        }

    });

    $.dropdown = new DropDownList();
    $.dropdown.initialized = false;
    $.dropdown.uuid = new Date().getTime();
    $.dropdown.version = "1.0.0";

})(jQuery);