sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function(Controller,JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("EuroCareDoctor.controller.ChatBot", {
		
		oFeedMessage: new JSONModel(),
		sDestinationUrl : "eurocarebackend",
		
		onInit: function () {
			
			var that = this;
			
			this.oFeedMessage.setData({
	        	feedList : []
	        });
	        
	        this.getView().setModel(this.oFeedMessage, "Feed");	
	        
	        this.getView().addEventDelegate({
			        onBeforeShow: function () {
			            that.fnLoadFeedFromServer(that);
			        }
			});
		},
		
		onAfterRendering: function() {
		    this.getView().setBusy(true);
	        this.fnLoadFeedFromServer(this);
		},
		
		fnLoadFeedFromServer: function(that){
		    jQuery.ajax(this.sDestinationUrl + "/question", {
		        dataType: "json",
		        method: "GET",
				contentType: "application/json; charset=UTF-8",
				success: that.fnSuccessCallback(that),
				error: that.fnErrorCallback
		    });
		},
		
		fnSuccessCallback : function(controller){
		    return function(data){
		        var oModelData = controller.oFeedMessage.getData();  
		        oModelData.feedList = data;
		        controller.oFeedMessage.setData(oModelData);
		        controller.getView().setBusy(false);
		        // MessageToast.show("Backend Ok");
		    };
		},
		
		fnErrorCallback: function(){
		    // console.log("Error!!!");
		    MessageToast.show("Retrieving local data");
		    this.oFeedMessage.setData({ 
	            patientList : [
					{
						"id":1,
						"answerId":1,
						"userId":2,
						"message":"Como faço para aliviar a dor?",
						"done":"false"
					},{
						"id":2,
						"answerId":2,
						"userId":2,
						"message":"Qual a melhor forma de cuidar?",
						"done":"false"
					},{
						"id":3,
						"answerId":3,
						"userId":2,
						"message":"Como devo tratar meu familiar agora?",
						"done":"false"
					},{
						"id":4,
						"answerId":4,
						"userId":2,
						"message":"Também terei Alzheimer?",
						"done":"true"
					},{
						"id":5,
						"answerId":5,
						"userId":2,
						"message":"Para o que servem os remédios?",
						"done":"true"
					}
				]
	        });
		},
		
		fnReloadQuestionFromServer: function(that){
		    return function(){
		        that.fnLoadFeedFromServer(that);
		    };
		},
		
		handleNavButtonPress: function () {
			sap.ui.getCore().byId("app").back();
		},
		
		handlePostPressed: function (evt) {
			var that = this;
			var sPath = evt.getSource().getBindingContext("Feed").getPath();
			var question = this.getView().getModel("Feed").getProperty(sPath);
			var updatedQuestion = {
				id: question.id,
				answerId: question.answerId,
				userId: question.userId,
				message: question.message,
				done: true
			};
			
			var doctorAnswer = {
				id: question.id,
				userId: 111,
				questionId: question.id,
				message: evt.getSource()._oTextArea._lastValue
			};
			
			this.getView().getModel("Feed").getProperty(sPath).done = true;
			
			// MessageToast.show(evt.getSource()._oTextArea._lastValue);
			
			jQuery.ajax(this.sDestinationUrl + "/doctorAnswer", {
				dataType: "json",
				data: JSON.stringify(doctorAnswer),
				method: "POST",
				contentType: "application/json; charset=UTF-8",
				success: that.fnSuccessCallback(that)
			});
			
			jQuery.ajax(this.sDestinationUrl + "/question/" + question.id, {
				dataType: "json",
				data: JSON.stringify(updatedQuestion),
				method: "PUT",
				contentType: "application/json; charset=UTF-8",
				success: that.fnReloadQuestionFromServer(that) 
			});   
			
			this.oFeedMessage.refresh();
		},
		
		handleAnsweredQuestionPressed: function (evt) {
			var that = this;
			var sPath = evt.getSource().getBindingContext("Feed").getPath();
			var question = this.getView().getModel("Feed").getProperty(sPath);
			
			sap.ui.getCore().byId("app").to("idChatAnswer");
		}

	});

});