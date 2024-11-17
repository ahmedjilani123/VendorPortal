sap.ui.define([
    "./BaseController",
    "sap/ui/table/RowAction",
    "sap/ui/table/RowActionItem",
    "sap/ui/table/RowSettings",
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
],
    function (BaseController,RowAction, RowActionItem, Filter, FilterOperator) {
        "use strict";
        return BaseController.extend("sap.aj.vendorpro.controller.VendorFirst", {
            onInit: async function () { 
                
           
            },
            onAfterRendering: function () {
                this.getData();//get Data method 
                var oTable = this.byId("UiTable");
                var data = new RowAction({ items: [new RowActionItem({ type: "Navigation", press: this.NavigationPress.bind(this), visible: true })] });
                oTable.setRowActionTemplate(data);
                oTable.setRowActionCount(1);
            },
            NavigationPress: function (oEvent) {
                var path = parseInt(oEvent.getSource().getBindingContext("ProcureDatas").getPath().split("/columns/").join(""));
                var Router = this.getOwnerComponent().getRouter();
                Router.navTo("ViewDataSupplier", {
                    "SupplierID": path,
                })
                sap.m.MessageToast.show("Item " + path);
            },
            onCreateVendorDialogPress: function () {

                if (!this.Dialog) {
                    this.Dialog = new sap.ui.xmlfragment("sap.aj.vendorpro.Dialogs.VendorSend", this);
                    this.getView().addDependent(this.Dialog);
                    this.Dialog.open();
                }

            },
            onCancelVendorPress: function (oEvent) {
                oEvent.getSource().getParent().destroy();
                this.Dialog = undefined;
            },
            onSubmitVendorPress: function (oEvent) {
                var data = this.getView().getModel("VendorSubmit").getData();
                     data.Supplier_ID =Math.floor((Math.random()*1000000)+1);
                     var parameter =data.Supplier_ID 
                var Validate = this._Validation(data, ["Name", "Email", "Country", "Telephone"]);
                if (Validate) {
                    oEvent.getSource().getParent().destroy();
                    this.Dialog = undefined;
                    this.PostData(data);   //post method
                    var email = data.Email;
                    var mail = document.createElement("a");
                    mail.href = `mailto:${email}&subject=Open Link&body=URL : https://port8082-workspaces-ws-n72hf.eu10.applicationstudio.cloud.sap/index.html?sap-ui-xx-viewCache=false/${parameter}`;
                    mail.click();
                    this.getView().getModel("VendorSubmit").setData({});
                    this.getView().getModel("VendorSubmit").refresh(true);
                    
                }
               
            },
            onClearSearchPress: function (oEvent) {
                this.getView().byId("filterbar").getFilterGroupItems().map(oFilterGroupItem=>{
                    oFilterGroupItem.getControl().removeAllSelectedItems();
                });
            },
            onSearchPress: function (oEvent) {
                var asfilter = [];
                this.getView().byId("filterbar").getFilterGroupItems().reduce(function (aResult, oFilterGroupItem) {
                    var oControl = oFilterGroupItem.getControl();
                    var aSelectedKeys = oControl.getSelectedKeys();
                    aSelectedKeys.map(function (sSelectedKey) {
                        var oFilter = new sap.ui.model.Filter(oFilterGroupItem.getName(), sap.ui.model.FilterOperator.EQ, sSelectedKey);
                        asfilter.push(oFilter);
                    })
                }, []);
                this.getView().byId("UiTable").getBinding("rows").filter(asfilter);
                this.getView().byId("UiTable").setShowOverlay(false);
            },
            ItemSelectionPress: function () {
                var oTable = this.getView().byId("UiTable");
                oTable.setShowOverlay(true);
            }
        });
    });
