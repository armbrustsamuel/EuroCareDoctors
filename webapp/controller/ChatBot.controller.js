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
						"id": 5,
					    "question": "Também terei Alzheimer?",
					    "answer": "Se há casos em sua família, você possui uma pré disposição para ter a doença também.",
					    "answered": true
					},{
						"id":1,
						"question":"Como faço para aliviar a dor?",
						"answer":"",
						"answered": false
					},{
						"id":2,
						"question":"Qual a melhor forma de cuidar?",
						"answer":"",
						"answered": false
					},{
						"id":3,
						"question":"Como devo tratar meu familiar agora?",
						"answer":"",
						"answered": false
					},{
						"id":4,
						"question":"Também terei Alzheimer?",
						"answer":"",
						"answered": false
					},{
						"id":6,
						"question":"Para o que servem os remédios?",
						"answer":"",
						"answered": false
					}
				]
	        });
		},
		
		fnReloadQuestionFromServer: function(that){
		    return function(){
		        that.fnLoadFeedFromServer(that);
		        that.oFeedMessage.refresh();
		    };
		},
		
		handleNavButtonPress: function () {
			sap.ui.getCore().byId("app").back();
		},
		
		ondeletePressed: function(evt) {
			var that = this;
			var sPath = evt.getSource().getBindingContext("Feed").getPath();
			var question = this.getView().getModel("Feed").getProperty(sPath);
			
			jQuery.ajax(this.sDestinationUrl + "/question/" + question.id, {
				dataType: "json",
				method: "DELETE",
				contentType: "application/json; charset=UTF-8",
				success: that.fnReloadQuestionFromServer(that) 
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
		}

	});

});