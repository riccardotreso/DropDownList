<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="DropDownList.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>


</head>

<body>

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="jquery.dropdown.js"></script>
    <link href="jquery.dropdown.css" rel="stylesheet" />

    <script>
        DoSearch = function () {
            $.getJSON("http://pectp.apiary.io/Fornitore", function (responseData) {
                alert("ee");
            });


            $.get("http://pectp.apiary.io/Fornitore", function (data) {
                alert("test");
            });


            $.ajax({
                type: "GET",
                url: "http://pectp.apiary.io/Fornitore",
                crossDomain: false,
                success: function (data) {
                    alert("success");
                },
                error: function (a, b, c) {
                    alert("error");
                }
            
            });
        }
    </script>

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
        }];

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
                    title: "nome",
                    filter: true
                },
                {
                    field: "cognome",
                    width: 166,
                    hidden: false,
                    title: "cognome",
                    filter: true
                }]
            });

            $('#Text1').dropdown({
                popUpWidth: 700,
                popUpHeight: "auto",
                width: 300,
                dataSource: {
                    transport: {
                        url: "http://pectp.apiary.io/WBE",
                        type: "GET",
                        crossDomain: true,
                        dataType: "json"
                    }
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
                    transport: {
                        url: "http://pectp.apiary.io/Fornitore",
                        type: "GET",
                        crossDomain: true,
                        dataType: "json"
                    }
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

            <a onclick="DoSearch();">do search</a>



        </div>
    </form>
</body>
</html>
