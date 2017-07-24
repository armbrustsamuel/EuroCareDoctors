sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("EuroCareDoctor.controller.ChatBot", {
		
		handleNavButtonPress: function () {
			sap.ui.getCore().byId("app").back();
		},
		
		handleQuestionPressed: function () {
			// sap.ui.getCore().byId("app").to("idChatBotAnswer");
			this.nav.back("idMain");
		}

	});

});