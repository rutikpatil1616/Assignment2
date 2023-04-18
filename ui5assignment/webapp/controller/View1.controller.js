sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/format/DateFormat",
    "sap/m/Dialog",
    "sap/m/Text"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,
        JSONModel,
        DateFormat,
        Dialog,
        Text) {
        "use strict";
        var userData = {
            results: [
                {
                    "Author": "Rutik Patil",
                    "Type": "Reply",
                    "Date": "Jun 12, 2000, 11:02:07 AM",
                    "Text": "Hello World"
                }
            ]
        }

        return Controller.extend("trainingui5project2.controller.View1", {
            onInit: function () {

            },
            onAfterRendering: function () {
                //step 1: Define a Model ->JSON/ODATA/RESOURCE
                var oModel = new JSONModel;
                //step 2: Set the data to the model
                oModel.setData(userData);
                //step 3: Set the model to the view
                this.getView().setModel(oModel);
            },
            onPost: function (oEvent) {
                var oFormat = DateFormat.getDateTimeInstance({ style: "medium" });
                var oDate = new Date();
                var sDate = oFormat.format(oDate);

                // create new entry
                var sValue = oEvent.getParameter("value");
                var oEntry = {
                    Author: "Rutik Patil",
                    Type: "Reply",
                    Date: "" + sDate,
                    Text: sValue
                };

                // update model
                var oModel = this.getView().getModel();
                var aEntries = oModel.getData().results;
                aEntries.unshift(oEntry);
                oModel.setData({
                    results: aEntries
                });
            },
            onMsgPress: function (oEvent) {

                var bindedPath = oEvent.getSource().getBindingContext().getPath();
                var data = this.getView().getModel().getObject(bindedPath);
                if (!this.oDialog) {
                    this.oDialog = new Dialog({
                        id: "idDialog",
                        title: "Message Details",
                        content: new Text({
                            text: "Author Name : {Author} " + "\n" + "Message : {Text}" + "\n" + "Date : {Date}" + "\n" + "Type : {Type}",

                        })
                    });
                }
                this.oDialog.setBindingContext(oEvent.getSource().getBindingContext());
                this.getView().addDependent(this.oDialog);
                this.oDialog.open();
            }
        });
    });
