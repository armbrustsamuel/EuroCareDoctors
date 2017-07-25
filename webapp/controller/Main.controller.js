sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("EuroCareDoctor.controller.Main", {
		
		onInit : function (evt) {
			// set mock model
			var sPath = jQuery.sap.getModulePath("com.sap.EuroCareDoctor","/model/tiles.json");
			var oModel = new JSONModel(sPath);
			this.getView().setModel(oModel);
		},
		
		onChatBotClicked: function () {
			sap.ui.getCore().byId("app").to("idChatBot");
		},
		
		handlePatientListPress: function () {
			sap.ui.getCore().byId("app").to("idPatientList"); 
		}
		
	});
});