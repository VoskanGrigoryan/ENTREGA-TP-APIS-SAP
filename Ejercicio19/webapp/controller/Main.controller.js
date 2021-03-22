sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "Ejercicio19/Ejercicio19/utils/Services",
        "Ejercicio19/Ejercicio19/utils/Constants",
         "sap/ui/core/routing/History",
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller, JSONModel, Services, Constants, History) {
		"use strict";

		return Controller.extend("Ejercicio19.Ejercicio19.controller.Main", {
			onInit: function () {
                this.getModel()
            },
            
            getModel: async function () {
                let oComponent = this.getOwnerComponent();

                let oResponse = await Services.getOrdenes()
                let oData = oResponse[0]

                let oDetalles = new JSONModel()
                oDetalles.setData(oData)

                oComponent.setModel(oDetalles, Constants.models.MODELS.detalles)
            },

            getSelected: function (event) {

                let oItem = event.getSource();
                let oBindingContext = oItem.getBindingContext(Constants.models.MODELS.detalles)
                let oModel = this.getOwnerComponent().getModel(Constants.models.MODELS.detalles)
                let oItemSelected = oModel.getProperty(oBindingContext.getPath())

                let oItemID = oItemSelected.OrderID
                let oModelItem = new JSONModel(oItemSelected)
                this.getOwnerComponent().setModel(oModelItem, Constants.models.MODELS.itemSelected)

               let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
               oRouter.navTo("RouteSecondView") 

                console.log(oModelItem)
                console.log(oItemID)

                this.getProdSelected(oItemID)

            },

            getProdSelected: async function (oItemID) {
                let oComponent = this.getOwnerComponent();

                let oResponse = await Services.getOrdenDetalle(oItemID)
                let oData = oResponse[0]

                let oProdDetalle = new JSONModel()
                oProdDetalle.setData(oData)

                oComponent.setModel(oProdDetalle, Constants.models.MODELS.producto)

                console.log(oProdDetalle.oData)
            },

            onNavBack: function () {
                const oHistory = History.getInstance();
                const sPreviousHash = oHistory.getPreviousHash();

                if(sPreviousHash !== undefined) {
                    window.history.go(-1)
                } else {
                    let oRoute = sap.ui.core.UIComponent.getRouterFor(this);
                    oRoute.navTo("App")
                }
            },
		});
	});
