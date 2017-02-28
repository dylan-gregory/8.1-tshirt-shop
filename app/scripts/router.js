var $ = window.$ = window.jQuery = require('jquery');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
require('bootstrap-sass');

var SiteContainer = require('./components/catalog.jsx').SiteContainer;

var CartContainer = require('./components/cart.jsx').CartContainer;


var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'cart': 'cartView'

  },
  index: function(){
    ReactDOM.render(
      React.createElement(SiteContainer),
      document.getElementById('app')
    );
  },
  cartView: function(){
    ReactDOM.render(
      React.createElement(CartContainer),
      document.getElementById('app')
    );
  }
});

var appRouter = new AppRouter();

module.exports = {
  appRouter
};
