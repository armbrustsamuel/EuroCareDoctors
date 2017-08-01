sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function(Controller, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("EuroCareDoctor.controller.PatientReport", {
		
		sDestinationUrl : "eurocarebackend",
		oPatientModel: new JSONModel(),
		oFeedMessage: new JSONModel(),
		
		onInit: function () {
			
			var that = this;
			
			this.oPatientModel.setData({ 
	            patientList : []
	        });
	        
	        this.oFeedMessage.setData({
	        	feedList : []
	        });
	        
	        this.getView().setModel(this.oFeedMessage, "Feed");	
	        
	        this.getView().setModel(this.oPatientModel, "Patient");
	        
	        this.getView().addEventDelegate({
			        onBeforeShow: function () {
			        	that.fnLoadFeedFromServer(that);
			            // that.fnLoadPatientFromServer(that);
			        }
			});
		},
		
		handlePostPressed: function (evt) {
			var that = this;
			var sPath = evt.getSource().getBindingContext("Feed").getPath();
			var question = this.getView().getModel("Feed").getProperty(sPath);
			var updatedQuestion = {
				id: question.id,
				question: question.question,
				answer: evt.getSource()._oTextArea._lastValue,
				answered: true
			};
			
			this.getView().getModel("Feed").getProperty(sPath).done = true;
			
			jQuery.ajax(this.sDestinationUrl + "/question/" + question.id, {
				dataType: "json",
				data: JSON.stringify(updatedQuestion),
				method: "PUT",
				contentType: "application/json; charset=UTF-8",
				success: that.fnReloadQuestionFromServer(that) 
			});   
			
			this.oFeedMessage.refresh();
		},
		
		onAfterRendering: function() {
		    this.getView().setBusy(true);
		    this.fnLoadPatientFromServer(this);
	        this.fnLoadFeedFromServer(this);
		},
		
		fnLoadFeedFromServer: function(that){
		    jQuery.ajax(this.sDestinationUrl + "/question", {
		        dataType: "json",
		        method: "GET",
				contentType: "application/json; charset=UTF-8",
				success: that.fnSuccessCallbackFeed(that),
				error: that.fnErrorCallback
		    });
		},
		
		fnLoadPatientFromServer: function(that){
		    jQuery.ajax(this.sDestinationUrl + "/patient", {
		        dataType: "json",
		        method: "GET",
				contentType: "application/json; charset=UTF-8",
				success: that.fnSuccessCallbackPatient(that),
				error: that.fnErrorCallback
		    });
		},
		
		fnErrorCallback: function () {
			MessageToast.show("Retrieving local data");
		},
		
		fnSuccessCallbackFeed: function (controller) {
			return function(data){
		        var oModelData = controller.oFeedMessage.getData();  
		        oModelData.feedList = data;
		        controller.oFeedMessage.setData(oModelData);
		        controller.getView().setBusy(false);
		        // MessageToast.show("Backend Ok");
		    };
		},
		
		fnSuccessCallbackPatient: function (controller) {
			return function(data){
		        var oModelData = controller.oPatientModel.getData();  
		        oModelData.patientList = data;
		        controller.oPatientModel.setData(oModelData);
		        controller.getView().setBusy(false);
		        // MessageToast.show("Backend Ok");
		    };
		},
		
		fnReloadQuestionFromServer: function (that) {
			return function(){
		        that.fnLoadFeedFromServer(that);
		        that.oFeedMessage.refresh();
		    };	
		},
	
		handleNavButtonPress: function () {
			sap.ui.getCore().byId("app").back();
		},
		toggleFooter: function () {
			var oObjectPageLayout = this.getView().byId("ObjectPageLayout");
			oObjectPageLayout.setShowFooter(!oObjectPageLayout.getShowFooter());
		}
	
	});

});