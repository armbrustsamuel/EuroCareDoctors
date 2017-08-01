sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function(Controller, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("EuroCareDoctor.controller.PatientList", {
		
		oPatientModel: new JSONModel(),
		oNotificationModel: new JSONModel(),
		oPatientList: new JSONModel(),
		sDestinationUrl : "eurocarebackend",
		
		onInit: function () {
			
			var that = this;
			
			this.oPatientModel.setData({ 
	            patientList : []
	        });
	       
	    	this.oNotificationModel.setData({
	    		notificationList: []
	    	});
	        
	        this.getView().setModel(this.oNotificationModel, "Notification");
	        this.getView().setModel(this.oPatientModel, "Patient");
	        
	        this.getView().addEventDelegate({
			        onBeforeShow: function () {
			            that.fnLoadPatientFromServer(that);
			            that.fnLoadNotificationFromServer(that);
			        }
			});
		},
		
		fnLoadNotificationFromServer: function (that) {
			jQuery.ajax(this.sDestinationUrl + "/notification", {
		        dataType: "json",
		        method: "GET",
				contentType: "application/json; charset=UTF-8",
				success: that.fnSuccessNotificationCallback(that),
				error: that.fnErrorCallback
		    });
		},
		
		fnSuccessNotificationCallback: function (controller) {
			return function(data){
		        var oModelData = controller.oNotificationModel.getData();  
		        oModelData.notificationList = data;
		        controller.oNotificationModel.setData(oModelData);
		        controller.getView().setBusy(false);
		        // MessageToast.show("Backend Notification Ok");
		    };
		},
		
		onAfterRendering: function() {
		    this.getView().setBusy(true);
	        this.fnLoadPatientFromServer(this);
		},
		
		fnLoadPatientFromServer: function(that){
		    jQuery.ajax(this.sDestinationUrl + "/patient", {
		        dataType: "json",
		        method: "GET",
				contentType: "application/json; charset=UTF-8",
				success: that.fnSuccessCallback(that),
				error: that.fnErrorCallback
		    });
		},
		
		fnSuccessCallback : function(controller){
		    return function(data){
		        var oModelData = controller.oPatientModel.getData();  
		        oModelData.patientList = data;
		        controller.oPatientModel.setData(oModelData);
		        controller.getView().setBusy(false);
		        // MessageToast.show("Backend Ok");
		    };
		},
		
		fnErrorCallback: function(){
		    // console.log("Error!!!");
		    MessageToast.show("Retrieving local data");
		    this.oPatientModel.setData({ 
	            patientList : [
					{
						"userId":1,
						"name":"Maria Joana",
						"gender":"female",
						"birthDate":"1987-04-04",
						"diagnosalDate":"2001-03-02"
					},
					{
						"userId":2,
						"name":"João Carlos",
						"gender":"male",
						"birthDate":"1967-04-30",
						"diagnosalDate":"2001-03-02"
					},
					{
						"userId":3,
						"name":"Marcos Aurélio",
						"gender":"male",
						"birthDate":"1977-09-03",
						"diagnosalDate":"2001-03-02"
					}
				]
	        });
		},
		
		fnReloadPatientFromServer: function(that){
		    return function(){
		        that.fnLoadPatientFromServer(that);
		    };
		},
	
		handlePatientReport: function () {
			sap.ui.getCore().byId("app").to("idPatientReport"); 
		},
		
		handleNavButtonPress: function () {
			sap.ui.getCore().byId("app").back();
		},
		
		handlePerson_4Pressed: function () {
			sap.ui.getCore().byId("app").to("idPatientOverview");
		},
		
		handlePatientPressed: function (evt) {
			MessageToast.show(evt.getSource().getBindingContext("Patient").getPath());
		},
		
		onItemClose: function (oEvent) {
			var oItem = oEvent.getSource(),
				oList = oItem.getParent();
 
			oList.removeItem(oItem);
		},
		
		onAcceptPress: function (evt) {
			// MessageToast.show('Accept Button Pressed');
			var sPath = evt.getSource().getBindingContext("Notification").getPath();
			var notification = this.getView().getModel("Notification").getProperty(sPath);
			
			var updatedNotification = {
				id: notification.id,
				seen: true,
				time: notification.time,
				date: notification.date,
				message: notification.message
			};
			
			this.getView().getModel("Notification").getProperty(sPath).seen = true;
			
			jQuery.ajax(this.sDestinationUrl + "/notification/" + notification.id, {
				dataType: "json",
				data: JSON.stringify(updatedNotification),
				method: "PUT",
				contentType: "application/json; charset=UTF-8",
				success: MessageToast.show("Ok") 
			}); 
			
			this.oNotificationModel.refresh();
		}
	
	});

});