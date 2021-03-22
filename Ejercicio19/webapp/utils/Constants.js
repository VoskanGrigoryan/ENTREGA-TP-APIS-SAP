sap.ui.define([
], function () {
    "use strict";
    return {
        models: {
            MODELS: {
                detalles: "modelDetalles",
                itemSelected: "itemSelected",
                producto: "modelProducto"
            },
        },
        routes: {
            ENTITYS: {
                orderDetails: "/V3/Northwind/Northwind.svc/Order_Details",
                order: "/V3/Northwind/Northwind.svc/Orders"
            }
        }
    }
}, true)