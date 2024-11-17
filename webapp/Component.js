/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "sap/aj/vendorpro/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("sap.aj.vendorpro.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);
                // enable routing
                this.getRouter().initialize();
                // set the device model
                this.setModel(models.createDeviceModel(), "device");
                //Role Base model is define 
                //"Identification":false,
                // "Additional":false,
                // "Status":false,
                var data ={
                    "General":false,
                    "Payment":true,
                    "Technical":false
                }
                this.getModel("RoleBase").setData(data);
                this.getModel("RoleBase").refresh(true);
            }
        });
    }
);