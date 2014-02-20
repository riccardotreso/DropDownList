﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="DropDownList.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>


</head>

<body>

    <script src="Scripts/jquery-2.1.0.js"></script>
    <script src="jquery.dropdown.js"></script>
    <link href="jquery.dropdown.css" rel="stylesheet" />
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
