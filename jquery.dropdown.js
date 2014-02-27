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

        this._typingTimer;
        this._doneTypingInterval = 300;


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

                if (ddl.width && !isNaN(ddl.width))
                    $(target).width(ddl.width);
                else
                    $(target).width(150);

                //bind event 
                $(target).keyup(function (event) {
                    if (event.keyCode === 13) {
                        $.dropdown._closeDivResult();
                        $.dropdown._showResult(target);
                    }
                    else {
                        clearTimeout($.dropdown._typingTimer);
                        $.dropdown._typingTimer = setTimeout(function () {
                            $.dropdown._closeDivResult();
                            $.dropdown._showResult(target, true);
                        }, $.dropdown._doneTypingInterval);
                    }
                });


                //on keydown, clear the countdown 
                $(target).keydown(function () {
                    clearTimeout($.dropdown._typingTimer);
                });

                imagesArrow.mousedown(function (event) {
                    var parent = $(target).parent().parent();
                    var divResult = parent.find("div.divResult:visible");
                    $.dropdown._closeDivResult();
                    if (divResult.length == 0) {
                        $.dropdown._showResult(target);
                        event.stopPropagation();
                    }
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

        _closeDivResult: function () {
            var objDiv = $.dropdown._getData(document, $.dropdown._openDiv);
            if (objDiv) {
                $(objDiv).hide();
                $.dropdown._removeData(document, $.dropdown._openDiv);
            }
        },

        _buildDivResult: function (data, instance, divResult) {

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
                    if (objColumns["hidden"] === false) {
                        var td = $("<td>");
                        td.html(objData[objColumns["field"]]);

                        td.mousedown(function (event) {
                            $.dropdown._selectIndexChanged(objData, instance.input[0]);
                        });

                        td.appendTo(trBody);
                    }
                });
                trBody.appendTo(tbody);
            });
            tbody.appendTo(table);

            table.appendTo(divResult);

        },

        _getSelectedItemDropDownList: function (target) {
            var selectedItem = this._getData(target, this._selectedItem);
            return selectedItem;
        },

        /* 
		 * @param  input  element 
		 */
        _showResult: function (input, filterResult) {
            input = input.target || input;
            var parent, divResult;
            parent = $(input).parent().parent();
            var instance = this._getData(input, this._instance);




            divResult = parent.find("div.divResult");
            if (divResult.length === 0 || filterResult) {
                if (divResult.length === 0) {
                    divResult = $('<div>');
                    divResult.attr("class", "divResult");
                    divResult.width(instance.popUpWidth ? instance.popUpWidth : 400);
                    if (instance.popUpHeight && !isNaN(instance.popUpHeight))
                        divResult.height(instance.popUpHeight);
                    divResult.appendTo(parent);
                }
                if (instance.dataSource) {
                    var data = instance.dataSource.data;
                    if (!data && instance.dataSource.transport) {
                        if (instance.dataSource.transport.url) {
                            $.ajax({
                                type: instance.dataSource.transport.type ? instance.dataSource.transport.type : "GET",
                                url: instance.dataSource.transport.url,
                                crossDomain: $.dropdown._checkIfCrossDomain(instance.dataSource.transport.url),
                                success: function (responseData) {
                                    $.dropdown._buildDivResult(responseData, instance, divResult);
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                }
                            });
                        }
                    }
                    else {
                        if (filterResult === true) {
                            //filtra i risultati
                            $(divResult).empty();
                            data = $.dropdown._filterData(data, instance, $(input).val());
                        }

                        $.dropdown._buildDivResult(data, instance, divResult);
                    }

                }

            }
            divResult.show();


            this._insData(document, $.dropdown._openDiv, divResult);




        },


        _filterData: function (data, instance, query) {

            if (query === "")
                return data;

            var columns = instance.columns;
            var arrResult = [];
            var arrColumnToFilter = columns.filter(function (obj) { return (obj.filter === true); }); //filter the "filtrable" columns

            $(data).each(function (index, data) {
                $(arrColumnToFilter).each(function (i, obj) {
                    if (data[obj.field].toLowerCase().indexOf(query.toLowerCase()) !== -1)
                        arrResult.push(data);
                });
            });

            return arrResult;
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
            var target = event.target;
            if (!$(target).hasClass("divResult")) {
                $.dropdown._closeDivResult();

            }

        },

        _checkIfCrossDomain: function (url) {
            var urlDomain = url.replace("http://", "").split("/")[0];
            var currentDomain = location.href.replace("http://", "").split("/")[0];
            if (urlDomain === currentDomain)
                return false;

            var ieVersion = $.dropdown._getIEVersion();
            if (ieVersion !== -1 && ieVersion < 9) {
                return false;
            }
            return true;
        },

        _getIEVersion: function ()
            // Returns the version of Internet Explorer or a -1
            // (indicating the use of another browser).
        {
            var rv = -1; // Return value assumes failure.
            if (navigator.appName == 'Microsoft Internet Explorer') {
                var ua = navigator.userAgent;
                var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                if (re.exec(ua) != null)
                    rv = parseFloat(RegExp.$1);
            }
            return rv;
        }

    });

    $.dropdown = new DropDownList();
    $.dropdown.initialized = false;
    $.dropdown.uuid = new Date().getTime();
    $.dropdown.version = "1.0.0";

})(jQuery);