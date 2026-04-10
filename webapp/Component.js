sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/model/json/JSONModel"
], function (UIComponent, JSONModel) {
  "use strict";

  return UIComponent.extend("productcatalog.Component", {
    metadata: {
      manifest: "json"
    },

    init: function () {
      UIComponent.prototype.init.apply(this, arguments);

      //  Product model
      var oModel = new JSONModel("model/products.json");
      this.setModel(oModel, "products");

      //  Cart model
      var oCartModel = new JSONModel({
        items: [],
        total: 0,
        count: 0
      });
      this.setModel(oCartModel, "cart");

      //  NEW: Product Switch Model (ADD THIS)
      var oSwitchModel = new JSONModel({
        items: [
          {
            title: "Products",
            subTitle: "Go to Product List",
            target: "productList"
          },
          {
            title: "Cart",
            subTitle: "Go to Cart",
            target: "cart"
          }
        ]
      });

      //  Set as default model (important)
     this.setModel(oSwitchModel, "switch");

      //  Initialize router
      this.getRouter().initialize();
    }
  });
});