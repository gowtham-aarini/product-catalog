sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator"
], function (Controller, Filter, FilterOperator) {
  "use strict";

  return Controller.extend("productcatalog.controller.ProductList", {

    onFilterSelect: function (oEvent) {
      var sKey = oEvent.getParameter("key");
      var oTable = this.byId("productsTable");
      var oBinding = oTable.getBinding("items");

      var aFilters = [];

      if (sKey !== "All") {
        aFilters.push(new Filter("category", FilterOperator.EQ, sKey));
      }

      oBinding.filter(aFilters);
    },onSearch: function (oEvent) {
  var sValue = oEvent.getParameter("newValue");
  var oTable = this.byId("productsTable");
  var oBinding = oTable.getBinding("items");

  var aFilters = [];

  if (sValue) {
    aFilters.push(
      new sap.ui.model.Filter({
        filters: [
          new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains, sValue),
          new sap.ui.model.Filter("category", sap.ui.model.FilterOperator.Contains, sValue)
        ],
        and: false
      })
    );
  }

  oBinding.filter(aFilters);
},onAddToCart: function (oEvent) {

  var oProduct = oEvent.getSource().getBindingContext("products").getObject();

  var oCartModel = this.getOwnerComponent().getModel("cart");
  var aItems = oCartModel.getProperty("/items");

  // Check if already exists
  var found = aItems.find(item => item.id === oProduct.id);

  if (found) {
    found.quantity += 1;
  } else {
    var newItem = Object.assign({}, oProduct);
    newItem.quantity = 1;
    aItems.push(newItem);
  }

  oCartModel.setProperty("/items", aItems);

  // Update total
  this._updateTotal();

  sap.m.MessageToast.show("Added to cart");
},_updateTotal: function () {

  var oCartModel = this.getOwnerComponent().getModel("cart");
  var aItems = oCartModel.getProperty("/items");

  var total = aItems.reduce(function (sum, item) {
    return sum + (item.price * item.quantity);
  }, 0);

  oCartModel.setProperty("/total", total);
},
onGoToCart: function () {
  this.getOwnerComponent().getRouter().navTo("cart");
}

  });
});