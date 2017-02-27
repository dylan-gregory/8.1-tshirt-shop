var React = require ('react');

var OrderCollection = require('../models/models.js').OrderCollection;

var SiteContainer = require('./catalog.jsx').SiteContainer;

class CartContainer extends React.Component {
  constructor(props) {
    super(props);


    var orderData = JSON.parse(localStorage.getItem('order'));

    var order = new Order(orderData);

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
              </div>
          </div>
        </nav>
        <div className="container">


        </div>
      </div>
    )
  }
}

module.exports = {
  CartContainer
};
