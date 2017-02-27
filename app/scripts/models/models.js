var Backbone = require('backbone');
Backbone.LocalStorage = require('backbone.localstorage');


var MenuItem = Backbone.Model.extend({

});

var MenuItemCollection = Backbone.Collection.extend({
 model: MenuItem
});




// model of ordered item
var OrderItem = Backbone.Model.extend({
 defaults: {
   'qty': 1
 }
});

// order items that get stored to local storage
var OrderItemCollection = Backbone.Collection.extend({
 model: OrderItem
 });

// model for server stuff
var Order = Backbone.Model.extend({

 defaults: function(){
   return {
     username: '',
     deliveryAddress: 'Somewhere, SC',
     shirts: new OrderItemCollection()
   }
 },

 initialize: function(config){
   var config = config || {};
   console.log('null here', config);
   this.set('shirts', new OrderItemCollection(config.shirts));
 },

 parse: function(data){
   data.shirts = new OrderItemCollection(data.shirts);
   return data;
 },
});

// server stuff
var OrderCollection = Backbone.Collection.extend({
 localStorage: new Backbone.LocalStorage("shirt-order"),
 model: Order
});

var SentCollection = Backbone.Collection.extend({
 url: 'https://tiny-lasagna-server.herokuapp.com/collections/koolkatshop',
 model: Order
});


module.exports = {
 MenuItem,
 MenuItemCollection,
 OrderItem,
 OrderItemCollection,
 Order,
 OrderCollection,
 SentCollection
};
