sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
        

    ], function (Controller) {
        "use strict";
        return Controller.extend("sap.aj.vendorpro.controller.BaseController", {
       
            StatusPanel:function(StatusValue){
                switch(StatusValue){
                    case 'Vendor Rejected':
                        return "Error";
                    case 'Vendor Submitted':
                        return "Success";
                    case "Approved":
                        return "Information";  
                    case "Re-Routed":
                        return "Warning"; 
                    case "None":
                    case "Rejected":
                        return "Error";      
                }
                
            },
            Status:function(Value){
                var data;
                if(Value===null)return;
                if(Value.split(" ")[0] =="Legal" || Value.split(" ")[0] =="Finance"){
                    data=Value.split(" ")[1];
                }else{
                    data = Value.split(" ")[2];
                }
               
                switch(data){
                    case 'Vendor Rejected':
                        return "Error";
                    case 'Vendor Submitted':
                        return "Success";
                    case "Approved":
                        return "Information";  
                    case "Re-Routed":
                        return "Warning"; 
                    case "None":
                    case "Rejected":
                        return "Error";      
                }
                
            },
            Value:function(Value){
              if(Value){
                return Value;
              }else{
                return "None";
              }
            },
            _Validation:function(data,arr){
                debugger;
                var bool = false;
                if(Object.keys(data).length == 0){
                    arr.forEach(function(item){
                            sap.ui.getCore().byId(item).setValueState("Error");
                       });
                    bool=false;
                }else{
                    arr.forEach(function(item){
                        if(data[item]){
                            sap.ui.getCore().byId(item).setValueState("None");
                            bool =true;
                        }else{
                            sap.ui.getCore().byId(item).setValueState("Error");
                            bool=false;
                        }
                       });
                }
              return bool;
            },
            DialogOPenFunction:function(ObjectData){
                if(!this.Dialog){
                    this.Dialog = new sap.ui.xmlfragment(`sap.aj.vendorpro.Dialogs.CountryDialog`, this);
                    this.getView().addDependent(this.Dialog);
                }
                this.Dialog.open();
            },
            onDialogCancel: function (oEvent) {
                this.Dialog = undefined;
                oEvent.getSource().destroy();
            },
            DialogSearchField:function(ObjectData){
                var CountryData=sap.ui.getCore().byId("CSCIdTable");
                var oFilter = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains, ObjectData.getParameter("value"));
                CountryData.getBinding("items").filter(oFilter);
            },
            getData:function(odata){
                //Table Data
                var that=this;
                this.Datas=this.getView().getModel("ProcureDatas")


                fetch("https://new-practice-git-main-ahmed-jilanis-projects.vercel.app/vendorsub").then((res)=>{
                    return res.json();
             
                }).then((data)=>{
                    var datas={
                        "columns":data
                    }
                    that.Datas.setData(datas);
                    that.Datas.refresh(true);
                    $.sap.mainDataAll=datas;
                })
            },
            StatusData:function(data){
                //Status post 
               fetch("https://new-practice-git-main-ahmed-jilanis-projects.vercel.app/moduleStatusChange",data).then((res)=>{
                
                    sap.m.MessageToast.show(res.data)
                }).catch(err=>{
                    sap.m.MessageToast.show(err);
                })
            },
            PostData:function(data){
                //send to vendor url data 
                    fetch("https://new-practice-git-main-ahmed-jilanis-projects.vercel.app/UserSubmit",data).then((res)=>{
                     
                        console.log(res)
                    }).catch(err=>{
                        
                        sap.m.MessageToast.show(err); 
                    })
              
            }
        })
    })