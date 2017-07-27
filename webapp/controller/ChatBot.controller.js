sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller,JSONModel) {
	"use strict";

	return Controller.extend("EuroCareDoctor.controller.ChatBot", {
		
		oFeedMessage: new JSONModel(),
		sDestinationUrl : "eurocarebackend",
		
		onInit: function () {
			this.oFeedMessage.setData({
	        	feedList : [{
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
	        	}]	
	        });
	        
	        this.getView().setModel(this.oFeedMessage, "Feed");	
		},
		
		handleNavButtonPress: function () {
			sap.ui.getCore().byId("app").back();
		},
		
		handlePostPressed: function (evt) {
			
		}

	});

});