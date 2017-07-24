sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("EuroCareDoctor.controller.ChatBotAnswer", {
		
		handleNavButtonPress: function () {
			sap.ui.getCore().byId("app").back();
		}

	});

});