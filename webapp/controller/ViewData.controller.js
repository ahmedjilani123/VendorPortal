sap.ui.define([
    "./BaseController",
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    '../model/formatter'
],
    function (BaseController, Filter, FilterOperator,formatter) {
        "use strict";
        return BaseController.extend("sap.aj.vendorpro.controller.ViewData", {
            formatter:formatter,
            onInit: function () {
               
                var Router = this.getOwnerComponent().getRouter();
                Router.getRoute("ViewDataSupplier").attachPatternMatched(this.ObjectRouterViewData, this);
            },
            onAfterRendering:function(){
                var userData=JSON.stringify(this.getOwnerComponent().getModel("RoleBase").getData());
                var role =JSON.parse(userData);
                
                this.getView().getModel("getRole").setData(role);
                this.getView().getModel("getRole").refresh(true);

                if($.sap.mainDataAll){
                    var Datas=this.getView().getModel("ProcureDatas");
                    Datas.setData($.sap.mainDataAll);
                    Datas.refresh(true);
                }else{
                this.getData();
                }
              
            },
            ObjectRouterViewData: function (oEvent) {
                $.sap.SupplierID = oEvent.getParameter("arguments").SupplierID;
                var Oview = this.getView();
                Oview.bindElement({
                    path: 'ProcureDatas>/columns/' + $.sap.SupplierID,
                    
                })
                $.sap.mainDataObject= this.getView().getModel("ProcureDatas").getData().columns[parseInt($.sap.SupplierID)].AllStatus;
                this.getView().getModel("RoleMessageForPanel").setData($.sap.mainDataObject);
                this.getView().getModel("RoleMessageForPanel").refresh(true)
                var role=this.getOwnerComponent().getModel("RoleBase").getData();
            $.sap.MainRole=[];
                for(var x in role){
                    if(role[x]){
                        $.sap.MainRole.push(x);
                    }
                }
            },
            RoleUserBase:function(){
                var role=this.getOwnerComponent().getModel("RoleBase").getData();
                var MainRole=[];
                for(var x in role){
                    if(role[x]){
                        MainRole.push(x);
                    }
                }
                return MainRole;
            },
            EditablePress:function(oEvent){
                var that = this;
               var role = this.RoleUserBase();
                var Content =oEvent.getSource().getParent().getParent().getContent();
                if( oEvent.getSource().getProperty("text")=="Edit"){
                    Content.forEach(function(ele){
                        if(!(ele.sId.includes("bar"))){
                            ele.getContent().forEach(function(con1){
                                con1.getContent().forEach(function(con){
                                    for(var i=0;i<role.length;i++){
                                        if(ele.getProperty("fieldGroupIds")[0] == role[i]){
                                            if(!(con.sId.includes("title")) && !(con.sId.includes("label"))){
                                                con.setEditable(true);
                                        }
                                        }
                                    }
                                })
                            })
                        }
                    })
                    $.sap.Property=oEvent.getSource()
                    $.sap.Property.setProperty("text","Save")
                }else{
                    Content.forEach(function(ele){
                        if(!(ele.sId.includes("bar"))){
                            ele.getContent().forEach(function(con1){
                                con1.getContent().forEach(function(con){
                                    for(var i=0;i<role.length;i++){
                                        if(ele.getProperty("fieldGroupIds")[0] == role[i]){
                                            if(!(con.sId.includes("title")) && !(con.sId.includes("label"))){
                                                con.setEditable(false);
                                        }
                                       }
                                    }
                                    
                                  
                                })
                               
    
                            })
                        }
                       
                    })
                    oEvent.getSource().setProperty("text","Edit")
                }

            },
            EditableCanPress:function(oEvent){
                var role = this.RoleUserBase();
                var Content =oEvent.getSource().getParent().getParent().getContent();
                Content.forEach(function(ele){
                    if(!(ele.sId.includes("bar"))){
                        ele.getContent().forEach(function(con1){
                            con1.getContent().forEach(function(con){
                                for(var i=0;i<role.length;i++){
                                    if(ele.getProperty("fieldGroupIds")[0] == role[i]){
                                    if(!(con.sId.includes("title")) && !(con.sId.includes("label"))){
                                        con.setEditable(false);
                                }
                                }
                            }
                              
                            })
                           

                        })
                    }
                   
                })
                $.sap.Property.setProperty("text","Edit");
            },
            FirstDataSet: function (Obj) {
                var mainData;
                if (Obj.ID == "CountryId") {
                    if (Obj.MIndex >= 0) {
                        this.getView().byId("StateId").setValue("");
                        this.getView().byId("CityId").setValue("");
                        mainData = this.getView().getModel("GeneralDatas").getData()[Obj.MIndex].states;
                    } else {
                        mainData = this.getView().getModel("GeneralDatas").getData();
                    }
                } else if (Obj.ID == "StateId") {
                    if (Obj.MIndex >= 0) {  
                        if (Obj.SIndex >= 0) {
                            this.getView().byId("CityId").setValue("");
                            mainData = this.getView().getModel("GeneralDatas").getData()[Obj.MIndex].states[Obj.SIndex].cities;
                        } else {
                            mainData = this.getView().getModel("GeneralDatas").getData()[Obj.MIndex].states;
                        }
                    }
                }else{
                   mainData={};
                }
                this.getView().getModel("CSCData").setData(mainData);
                this.getView().getModel("CSCData").refresh(true);
            },
            OpenInputFieldPress: function (oEvent) {
                $.sap.GetSource = oEvent.getSource()
                $.sap.FieldName = oEvent.getParameter("id").split("container-sap.aj.vendorpro---ViewData--").join("");
                if ($.sap.FieldName == "CountryId") {
                    this.FirstDataSet({ ID: $.sap.FieldName });
                } else if ($.sap.FieldName == "StateId") {
                    this.FirstDataSet({ ID: $.sap.FieldName,MIndex:$.sap.MainIn });
                }else{ 
                    var boll=($.sap.SecondIn>=0);
                    if(!boll){
                        this.FirstDataSet({ ID: $.sap.FieldName});
                    }
                }
                this.DialogOPenFunction();
            },
            onDialogSelectFieldClose: function (oEvent) {
                var Value = oEvent.getParameters("selectedItem").selectedItem.getProperty("title");
                var Index = parseInt(oEvent.getParameter("selectedContexts")[0].getPath().split("/").join(""));
                if ($.sap.FieldName == "CountryId") {
                    $.sap.MainIn = Index;
                    $.sap.SecondIn = undefined;
                    this.FirstDataSet({ ID: $.sap.FieldName, MIndex: Index, SIndex: Index });
                } else if ($.sap.FieldName == "StateId") {
                    $.sap.SecondIn = Index;
                    this.FirstDataSet({ ID: $.sap.FieldName, MIndex: $.sap.MainIn, SIndex: Index });
                }
                this.Dialog = undefined;
                oEvent.getSource().destroy();
                $.sap.GetSource.setValue(Value);
            },
            NavToHomePress: function () {
                var Router = this.getOwnerComponent().getRouter();
                Router.navTo("RouteVendorFirst");
                this.getData();
            },
            onButtonActionSheetPress:function(oEvent){
                debugger;
                var oButton = oEvent.getSource();
                this.byId("actionSheet").openBy(oButton);
            },
            ActionPress:function(oEvent){
                $.sap.statusAction = oEvent.getSource().getProperty("fieldGroupIds")[0];
                var count=0;
                var getUserdata = $.sap.MainRole[0] == "Payment" ? "Finance": $.sap.MainRole[0];
                $.sap.mainDataObject.forEach(ele=>{
                    if($.sap.MainRole[0] ==ele.mainStatus.split(" ")[0]){
                        count++;
                    }
                })
                 if(count ==0){
                    if(!this._MDialog){
                        this._MDialog = new sap.ui.xmlfragment(`sap.aj.vendorpro.Dialogs.DialogMessage`, this);
                        this.getView().addDependent(this._MDialog);
                    }
                    this._MDialog.open();
                 }
               
            },
            NoMessageActionPress:function(oEvent){
              
                oEvent.getSource().getParent().destroy();
                this._MDialog = undefined;
            },
            YesMessageActionPress:function(oEvent){
                
                var getId =this.getView().getModel("ProcureDatas").getData().columns[$.sap.SupplierID];
               var Remark = oEvent.getSource().getParent().getContent()[0].getContent()[1].getValue();
               var data={
                    Status:$.sap.statusAction,
                    Supplier_ID:getId.Supplier_ID,
                    NameM: $.sap.MainRole[0],
                    remark:Remark
                   };
                this.StatusData(data);
                oEvent.getSource().getParent().destroy();
                this._MDialog = undefined;
            }
        })
    })