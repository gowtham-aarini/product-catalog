sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";

  return Controller.extend("productcatalog.controller.Cart", {

    onRemove: function (oEvent) {

      var oContext = oEvent.getSource().getBindingContext("cart");
      var oCartModel = this.getOwnerComponent().getModel("cart");

      var aItems = oCartModel.getProperty("/items");
      var index = oContext.getPath().split("/").pop();

      aItems.splice(index, 1);

      oCartModel.setProperty("/items", aItems);
      this._updateTotal();
    },

    onQuantityChange: function () {
      this._updateTotal();
    },

   _updateTotal: function () {

  var oCartModel = this.getOwnerComponent().getModel("cart");
  var aItems = oCartModel.getProperty("/items");

  var total = 0;
  var count = 0;

  aItems.forEach(function (item) {
    total += item.price * item.quantity;
    count += item.quantity;   
  });

  oCartModel.setProperty("/total", total);
  oCartModel.setProperty("/count", count);  
  oCartModel.refresh(true);
}

  });
});