/*global QUnit*/

sap.ui.define([
	"sapaj/vendorpro/controller/VendorFirst.controller"
], function (Controller) {
	"use strict";

	QUnit.module("VendorFirst Controller");

	QUnit.test("I should test the VendorFirst controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
