sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("EuroCareDoctor.controller.PatientOverview", {
		
		oPatientList: new JSONModel(),
		oFeedMessage: new JSONModel(),
		
		sDestinationUrl : "eurocarebackend",
		
		onInit: function () {
			this.oPatientList.setData({ 
	            patientList : []
	        });
	        
	        this.oFeedMessage.setData({
	        	feedList : []	
	        });
	        
	        this.getView().setModel(this.oFeedMessage, "Feed");
	        this.getView().setModel(this.oPatientList, "Patient");
		},
		
		handleNavButtonPress: function () {
			sap.ui.getCore().byId("app").back();
		}

	});

});