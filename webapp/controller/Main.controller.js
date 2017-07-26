sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("EuroCareDoctor.controller.Main", {
		
		oTilesModel : new JSONModel(),
		
		onInit : function () {
			// set mock model
			// var sPath = jQuery.sap.getModulePath("com.sap.EuroCareDoctor","/webapp/model/tiles.json");
			// var oModel = new JSONModel();
			// oModel.tileList = new JSONModel(sPath);
			
			this.oTilesModel.setData({
				tileList: [{
					"name":"Chatbot",
					"detail":"4 new questions",
					"status":"Success",
					"press":"onChatBotClicked"
				},{
					"name":"Patient",
					"detail":"3 patient to review",
					"status":"Error",
					"press":"handlePatientListPress"
				}]
			});
			
			this.getView().setModel(this.oTilesModel, "Tiles");
		},
		
		onChatBotClicked: function () {
			sap.ui.getCore().byId("app").to("idChatBot");
		},
		
		handlePatientListPress: function () {
			sap.ui.getCore().byId("app").to("idPatientList"); 
		}
		
	});
});