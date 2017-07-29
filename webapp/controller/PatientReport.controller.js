sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("EuroCareDoctor.controller.PatientReport", {
	
		handleNavButtonPress: function () {
			sap.ui.getCore().byId("app").back();
		},
		toggleFooter: function () {
			var oObjectPageLayout = this.getView().byId("ObjectPageLayout");
			oObjectPageLayout.setShowFooter(!oObjectPageLayout.getShowFooter());
		}
	
	});

});