<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="DropDownList.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>


</head>

<body>

    <script src="Scripts/jquery-2.1.0.js"></script>
    <script src="jquery.dropdown.js"></script>
    <script>
        var list = [{
            id: 1,
            nome: "mario",
            cognome: "rossi"
        },
        {
            id: 2,
            nome: "giovanni",
            cognome: "bianchi"
        },
        {
            id: 3,
            nome: "maria",
            cognome: "verdi"
        }]
        $(document).ready(function () {


            $('#ddl1').dropdown({
                popUpWidth: 700,
                popUpHeight: "auto",
                width: 200,
                dataSource: {
                    data: list
                },
                dataTextField: "nome",
                dataValueField: "id",
                columns: [{
                    field: "id",
                    width: 166,
                    hidden: true,
                    title: "ID"
                },
                {
                    field: "nome",
                    width: 166,
                    hidden: false,
                    title: "nome"
                },
                {
                    field: "cognome",
                    width: 166,
                    hidden: false,
                    title: "cognome"
                }]
            });

            $('#Text1').dropdown({
                popUpWidth: 700,
                popUpHeight: "auto",
                width: 300,
                dataSource: {
                    type: "json",
                    transport: {
                        read: "http://pectp.apiary.io/WBE"
                    },
                },
                dataTextField: "Descrizione",
                dataValueField: "WBE",
                columns: [{
                    field: "WBE",
                    hidden: false,
                    title: "WBE"
                },
                {
                    field: "Descrizione",
                    hidden: false,
                    title: "Descrizione"
                }]

            });

            $('#Text2').dropdown({
                popUpWidth: 700,
                popUpHeight: 100,
                width: 400,
                dataSource: {
                    type: "json",
                    transport: {
                        read: "http://pectp.apiary.io/Fornitore"
                    },
                },
                dataTextField: "Descrizione",
                dataValueField: "IdFornitore",
                columns: [{
                    field: "IdFornitore",
                    hidden: true,
                    title: "IdFornitore"
                },
                {
                    field: "Descrizione",
                    hidden: false,
                    title: "Descrizione"
                }]

            });

            $('#Text3').dropdown();
        });


        Test = function () {
            var r = $('#ddl1').dropdown("getSelectedItem");
            alert(r);
            return false;
        }

    </script>
    <style>
        table.result
        {
            width: 100%;
            padding: 0;
        }

            table.result thead tr th
            {
                background-image: url(img/ui-bg_highlight-soft_75_cccccc_1x100.png);
                background-repeat: repeat-x;
            }

            table.result tr
            {
                background-color: white;
            }

                table.result tr:hover
                {
                    background-color: silver;
                }

            table.result td
            {
                border-bottom: solid 1px silver;
            }

        .divContainer
        {
            /*float: left;*/
            /*clear: both;*/
            overflow: hidden;
            position: relative;
            display: inline-block;
        }

        .divResult
        {
            border: solid 1px silver;
            background-color: white;
            display: none;
            position: absolute;
            z-index: 100000;
            margin-top: -4px;
            cursor: default;
            overflow-y: auto;
            -moz-box-shadow: 10px 10px 5px #dedede;
            -webkit-box-shadow: 10px 10px 5px #dedede;
            filter: progid:DXImageTransform.Microsoft.Shadow(color='#dedede', Direction=135, Strength=10);
            box-shadow: 10px 10px 5px #dedede;

            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
        }

        .spaninput
        {
            float: left;
            height: 19px;
            width: 150px;
            border: 1px solid silver;
            border-right-style: none;
            overflow: hidden;
            position: relative;
            display: inline-block;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
            -webkit-border-bottom-right-radius: 0px;
            -webkit-border-top-right-radius: 0px;
            -moz-border-bottom-right-radius: 0px;
            -moz-border-top-right-radius: 0px;
            border-bottom-right-radius: 0px;
            border-top-right-radius: 0px;
        }

        .icon
        {
            width: 23px;
            height: 21px;
            background-image: url(img/ui-icons_666666_256x240.png);
            float: left;
            position: relative;
            overflow: hidden;
            display: inline-block;
            border: solid 1px silver;
            border-left-style: none;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
            -webkit-border-bottom-left-radius: 0px;
            -webkit-border-top-left-radius: 0px;
            -moz-border-bottom-left-radius: 0px;
            -moz-border-top-left-radius: 0px;
            border-bottom-left-radius: 0px;
            border-top-left-radius: 0px;
        }

            .icon:hover
            {
                background-color: #EEEEEE;
            }

        .arrow
        {
            background-position: -61px -12px;
        }
    </style>

    <form id="form1" runat="server">
        <div>

            <table>
                <tr>
                    <td>
                        <span>DDL1</span>
                        <input type="text" id="ddl1" />
                        <%--<input type="submit" value="getSelectedItem" onclick="return Test();" />--%>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>DDL2</span>
                        <input type="text" id="Text1" />
                    </td>
                </tr>
            </table>



            <input type="text" id="Text2" />

            <input type="text" id="Text3" />





        </div>
    </form>
</body>
</html>
