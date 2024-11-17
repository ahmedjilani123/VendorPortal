sap.ui.define([], function () {
    return {
        GeneralVisible: function (Value) {
            if (Value.includes("General")) {
                if (Value.includes("Rejected")) {
                    return true
                }
                if (Value.includes("Approved")) {
                    return true
                }
                if (Value.includes("Re-Route")) {
                    return true
                }
                if(Value.includes("Initialize")){
                    return true;
                }
            }
            return false
        },
        FinanceVisible: function (Value) {
            if (Value.includes("Finance")) {
                if (Value.includes("Rejected")) {
                    return true
                }
                if (Value.includes("Approved")) {
                    return true
                }
                if (Value.includes("Re-Route")) {
                    return true
                }
                if(Value.includes("Initialize")){
                    return true;
                }
            }
            return false
        },
        LegalVisible: function (Value) {
            if (Value.includes("Legal")) {
                if (Value.includes("Rejected")) {
                    return true
                }
                if (Value.includes("Approved")) {
                    return true
                }
                if (Value.includes("Re-Route")) {
                    return true
                }
                if(Value.includes("Initialize")){
                    return true;
                }
            }
            return false
        },
        GeneralStatus: function (Value) {
            if (Value.includes("General")) {
                if (Value.includes("Rejected")) {
                    return 3;
                }
                if (Value.includes("Approved")) {
                    return 7;
                }
                if (Value.includes("Re-Route")) {
                    return 4;
                }
                if(Value.includes("Initialize")){
                    return 1
                }
            }

        },
        FinanceStatus: function (Value) {
            if (Value.includes("Finance")) {
                if (Value.includes("Rejected")) {
                    return 3;
                }
                if (Value.includes("Approved")) {
                    return 7;
                }
                if (Value.includes("Re-Route")) {
                    return 4;
                }
                if(Value.includes("Initialize")){
                    return 1;
                }
            }

        },
        LegalStatus: function (Value) {
            if (Value.includes("Legal")) {
                if (Value.includes("Rejected")) {
                    return 3;
                }
                if (Value.includes("Approved")) {
                    return 7;
                }
                if (Value.includes("Re-Route")) {
                    return 4;
                }
                if(Value.includes("Initialize")){
                    return 1;
                }
            }
        },
            GeneralValue: function(Value) {
                if (Value.includes("General")) {
                    if (Value.includes("Rejected")) {
                        return Value;
                    }
                    if (Value.includes("Approved")) {
                        return Value;
                    }
                    if (Value.includes("Re-Route")) {
                        return Value;
                    }
                    if(Value.includes("Initialize")){
                        return "None";
                    }
                }

            },
            FinanceValue: function(Value) {
                debugger;
                if (Value.includes("Finance")) {
                    if (Value.includes("Rejected")) {
                        return Value;
                    }
                    if (Value.includes("Approved")) {
                        return Value;
                    }
                    if (Value.includes("Re-Route")) {
                        return Value;
                    }
                    if(Value.includes("Initialize")){
                        return "None";
                    }
                }

            },
            LegalValue: function(Value) {
                if (Value.includes("Legal")) {
                    if (Value.includes("Rejected")) {
                        return Value;
                    }
                    if (Value.includes("Approved")) {
                        return Value;
                    }
                    if (Value.includes("Re-Route")) {
                        return Value;
                    }
                    if(Value.includes("Initialize")){
                        return "None";
                    }
                }

            }
        }
    })