import React from 'react';
import * as request from 'superagent';
import { NavItem, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import ProductList from './productList.jsx';
// import ProductShow from './productShow.jsx';
import ShoppingCart from './shoppingCart.jsx';
import BodyComponent from './bodyComponent.jsx';
import ReactDOM from 'react-dom';

const badgeColor = {
  backgroundColor : 'red'
}

const imageMain = {
  backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(\'/assets/img/main-fondo.jpg\')',
  height: '100vh'
}

class HeaderComponent extends React.Component{

    constructor(){
       super();
       this.state = {
         page:'list',
         productos : [],
         showProductId:-1,
         shoppingCart : [],
         shoppingCartTotal: 0,
         productosFiltrados: []
       }
    }

    componentWillMount(){
      request.get('https://tienda-online-e05ec.firebaseio.com/productos.json')
              .end((err, res)=>{
                if(err || !res.ok){
                  console.log("Error en la peticion: "+err);
                }else{
                  this.setState({ productos : JSON.parse(res.text)});
                  this.setState({ productosFiltrados : JSON.parse(res.text)});
                }
              })
    }

    updateProducts(){

      let promise = new Promise((resolve, reject)=>{
        (function loop(i, shoppingCart, productosFiltrados) {
            if (i < shoppingCart.length){
                new Promise(resolve => {
                    let index = shoppingCart[i].producto.index;
                    let unidadDisponible = shoppingCart[i].producto.stock - Number(shoppingCart[i].quantity);
                    let data = {
                      stock : unidadDisponible
                    }
                    request.patch(`https://tienda-online-e05ec.firebaseio.com/productos/${ index }.json`,JSON.stringify(data)).end((err,res)=>{
                        productosFiltrados[shoppingCart[i].producto.index].stock = unidadDisponible;
                        resolve();
                    });
                }).then(loop.bind(null, i+1, shoppingCart, productosFiltrados));
            }else{
              resolve();
            }
        })(0, this.state.shoppingCart, this.state.productosFiltrados);
      });

      return promise;
    }

    checkoutShoppingCart(){
      this.updateProducts().then(()=>{
        document.getElementById("shoppingCartBadge").innerHTML = "";
        this.setState({ shoppingCartTotal : 0});
        this.setState({ shoppingCart : []});
        this.showCatalogList();
      });
    }

    showShoppingCart(){
      this.setState({page:'shoppingCart'});
    }

    showCatalogList(){
      this.setState({page:'list'});
    }

    showProduct(i, event){
      this.setState({page:'showProduct', showProductId:i});
    }

    addProduct(i, event){
      let idProductInput = document.getElementById("producto"+i);
      let inputValue = ReactDOM.findDOMNode(idProductInput).value;
      let shoppingCartItem = {
        producto: this.state.productos[i],
        quantity: inputValue,
        subTotal: (Number(inputValue) * this.state.productos[i].precio)
      }
      var shoppingCart = this.state.shoppingCart;
      shoppingCart.push(shoppingCartItem);
      // this.setState({shoppingCart:shoppingCart});
      document.getElementById("shoppingCartBadge").innerHTML = shoppingCart.length;
      let shoppingCartTotal = this.state.shoppingCartTotal;
      shoppingCartTotal = shoppingCartTotal + shoppingCartItem.subTotal;
      this.setState({shoppingCartTotal:shoppingCartTotal, shoppingCart:shoppingCart});
    }

    handleChange(event) {
      let filterValue = event.target.value;
      let productos_search = [];
      filterValue.toLowerCase();

      this.state.productos.map( (producto,i) => {
          let precioString = String(producto.precio);
          let stockString = String(producto.stock);

          if(producto.nombre.toLowerCase().indexOf(filterValue)>=0
            || precioString.indexOf(filterValue)>=0
            || stockString.indexOf(filterValue)>=0){
            productos_search.push(producto);
          }
      })

      this.setState({ productosFiltrados : productos_search});

    }

    render(){
        return(
            <div style={imageMain}>
              <div className="container">
                <nav className="navbar navbar-default">
                  <div className="container-fluid">
                    <div className="navbar-header">
                      <a className="navbar-brand" href="#/home">
                        La Bodega
                      </a>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                      <ul className="nav navbar-nav navbar-right">
                        <NavItem href="#" onClick={this.showCatalogList.bind(this)}>
                          <Glyphicon glyph="th" />
                        </NavItem>
                        <NavItem href="#" onClick={this.showShoppingCart.bind(this)}>
                          <Glyphicon glyph="shopping-cart" /><span style={badgeColor} className="badge" id="shoppingCartBadge"></span>
                        </NavItem>
                        <NavItem href="#">
                          <Glyphicon glyph="inbox" />
                        </NavItem>
                        <NavItem href="#/login">
                          <Glyphicon glyph="log-out" />
                        </NavItem>
                      </ul>
                    </div>
                  </div>
                </nav>
                <BodyComponent page={this.state.page}
                              shoppingCart={this.state.shoppingCart}
                              shoppingCartTotal={this.state.shoppingCartTotal}
                              showProduct={this.showProduct.bind(this)}
                              productosFiltrados={this.state.productosFiltrados}
                              showProductId={this.state.showProductId}
                              showCatalogList={this.showCatalogList.bind(this)}
                              addProduct={this.addProduct.bind(this)}
                              handleChange={this.handleChange.bind(this)}
                              checkoutShoppingCart={this.checkoutShoppingCart.bind(this)}/>
              </div>
            </div>
            );
        }
      }

export default HeaderComponent;
