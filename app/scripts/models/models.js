var Backbone = require('backbone');
Backbone.LocalStorage = require('backbone.localstorage');



var OrderItem = Backbone.Model.extend({
  defaults: {
    'qty': 1
  }
});

// this is individually ordered items (these are the t-shirts)

var OrderItemCollection = Backbone.Collection.extend({
  model: OrderItem
  });



// feeds localstorage collection

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
  urlRoot: 'https://tiny-lasagna-server.herokuapp.com/collections/koolkatshop',
  parse: function(data){
    data.shirts = new OrderItemCollection(data.shirts);
    return data;
  },
  localStorage: new Backbone.LocalStorage("shirtOrder")
});


//
var OrderCollection = Backbone.Collection.extend({
  model: Order
});

module.exports = {
  OrderItem,
  OrderItemCollection,
  Order,
  OrderCollection
};
