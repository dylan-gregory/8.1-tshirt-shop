var React = require ('react');

var MenuItem = require('../models/models.js').MenuItem;
var MenuItemCollection = require('../models/models.js').MenuItemCollection;

var OrderItem = require('../models/models.js').OrderItem;
var OrderItemCollection = require('../models/models.js').OrderItemCollection;

var Order = require('../models/models.js').Order;
var OrderCollection = require('../models/models.js').OrderCollection;


class SiteContainer extends React.Component {
  constructor(props) {
    super(props);

    this.addToCart = this.addToCart.bind(this);
    // these are the t-shirts
    var menuItemCollection = new MenuItemCollection();

    menuItemCollection.add([
      {name: 'DJ Space Kat', url: 'https://i1.wp.com/memecollection.net/wp-content/uploads/2013/12/space-cats-13.jpg?resize=540%2C535', description: 'D-d-d-d DJ KITTY'},
      {name: 'Burrito Kat', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDxp0chrSvvFqlhmP2F1oejXO67WqurEn4oKrzWO3tC9vzBL_flQ', description: 'Burritos and cats just go together'},
      {name: 'Laser Beams', url: 'https://f4.bcbits.com/img/a3034896636_10.jpg', description: 'One kat to rule the world'}
    ]);

    var orderData = JSON.parse(localStorage.getItem('shirt-order'));
    // order is a model instance
    var order = new Order(orderData);


    this.state = {
      menuItemCollection,
      order
    };
  }

  addToCart(shirt) {
    var order = this.state.order;
    var orderItem = shirt.toJSON();
    order.get('shirts').add(orderItem);

    localStorage.setItem('order', JSON.stringify(order.toJSON()));

    this.setState({order});

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
                    <li className="active" ><a href="#">Shirts<span className="sr-only">(current)</span></a></li>
                    <li><a href="#cart"> Your Cart</a></li>
                  </ul>
                </div>
            </div>
          </nav>
          <div className="container">
            <ShirtList
              menuItemCollection={this.state.menuItemCollection}
              addToCart={this.addToCart}
            />
          </div>
        </div>
      )
  }

}

class ShirtList extends React.Component {
  render() {

    var shirtList = this.props.menuItemCollection.map(shirtItem =>{
      return (
        <div className="col-sm-6 col-md-4" key={shirtItem.cid}>
          <div className="thumbnail">
            <img src={shirtItem.get('url')} alt="" />
            <div className="caption">
              <h3>{shirtItem.get('name')}</h3>
              <p>{shirtItem.get('description')}</p>
                <input className="form-control" type="text" placeholder="Qty"></input>
                <div className="btn-group">
                  <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Shirt Size<span className="caret"></span>
                  </button>
                  <ul className="dropdown-menu">
                    <li><a href="#">sm</a></li>
                    <li><a href="#">md</a></li>
                    <li><a href="#">lg</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="#">xl</a></li>
                  </ul>
                </div>
                 <a onClick={(e) => {e.preventDefault(); this.props.addToCart(shirtItem);}}
                   href="#" className="btn btn-default" role="button">Add to cart</a>
            </div>
          </div>
        </div>
      )
    });

    return (
      <div className="row">
        {shirtList}
      </div>
    )
  }
}



module.exports = {
  SiteContainer
};
