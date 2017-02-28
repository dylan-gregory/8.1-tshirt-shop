var React = require ('react');
var Cookies = require('js-cookie');

var Order = require('../models/models.js').Order;
var SentCollection = require('../models/models.js').SentCollection;

var SiteContainer = require('./catalog.jsx').SiteContainer;

class CartContainer extends React.Component {
 constructor(props) {
   super(props);
   var orderData = JSON.parse(localStorage.getItem('order'));
   var order = new Order(orderData);
   console.log('model', order.toJSON());

   this.placeOrder = this.placeOrder.bind(this);

   this.state = {
     order
   }
    console.log('here', this.state.order);
 }
 placeOrder() {

   var sentCollection = new SentCollection();
   sentCollection.create(this.state.order.toJSON());
   localStorage.clear();
   this.forceUpdate();
 }

 render() {
   return (
     <div className="wrapper">
         <nav className="navbar navbar-default">
           <div className="container-fluid">
             <div className="navbar-header">
               <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                 <span className="sr-only">Toggle navigation</span>
                 <span className="icon-bar"></span>
                 <span className="icon-bar"></span>
                 <span className="icon-bar"></span>
               </button>
               <a className="navbar-brand" href="#">
                 <img alt="KoolKat Shirt Shop" src="" />
               </a>
             </div>
             <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
               <ul className="nav navbar-nav">
                 <li><a href="#">Shirts</a></li>
                 <li className="active"><a href="#cart"> Your Cart<span className="sr-only">(current)</span></a></li>
               </ul>
               <span>Hello - you're signed in as {Cookies.get('username')}</span>
             </div>
         </div>
       </nav>
       <div className="container">

         <CartList order={this.state.order} />

         <button onClick={this.placeOrder}>Send my order!</button>
       </div>
     </div>
   )
 }
}

class CartList extends React.Component {
  render() {
    var shirtList = this.props.order.get('shirts');
    console.log(shirtList);

  var cartList = shirtList.map((shirt) => {
    return (

      <div className="col-md-12 order-list" key={shirt.cid}>
        <div className="row">
          <span className="col-md-3">{shirt.get('name')}</span>
          <span className="col-md-3">{shirt.get('size')}</span>
          <span className="col-md-3">time</span>
          <span className="col-md-3"><button className="btn btn-danger">Delete</button></span>

        </div>
      </div>
    )
  });

  return (
    <div className="row">
      <div className="row">
        <span className="col-md-3">Shirt name</span>
        <span className="col-md-3">Shirt size</span>
        <span className="col-md-3">Expiration time</span>
        <span className="col-md-3">Remove them if you dare!</span>
      </div>
      {cartList}
    </div>
  )
  }
}

module.exports = {
 CartContainer
};
