sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("EuroCareDoctor.controller.PatientList", {
		
		oPatientList: new JSONModel(),
		sDestinationUrl : "eurocarebackend",
		
		onInit: function () {
			
			this.oPatientList.setData({ 
	            patientList : []
	        });
	        
	        this.getView().setModel(this.oPatientList, "Patient");
	        
	        // TEST PURPOSE
	        
	        var oModelData = this.oPatientList.getData();
	        oModelData.patientList = new JSONModel("/webapp/model/patient.json");
	        this.oPatientList.setData(oModelData);
		        
		    // TEST PURPOSE
	        
	        this.getView().addEventDelegate({
			        onBeforeShow: function () {
			            // that.fnLoadPatientFromServer(that);
			        }
			});
		},
		
		handleNavButtonPress: function () {
			sap.ui.getCore().byId("app").back();
		},
		
		handlePerson_4Pressed: function () {
			sap.ui.getCore().byId("app").to("idPatientOverview");
		}
	
	});

});