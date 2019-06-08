import React from 'react';
import ProductList from './productList.jsx';
import ShoppingCart from './shoppingCart.jsx';
import ProductShow from './productShow.jsx';


class BodyComponent extends React.Component{
    constructor(){
     super();
    }

    render(){
      const page = this.props.page;
      if (page=='list') {
        return <ProductList showProduct={this.props.showProduct} addProduct={this.props.addProduct} productosFiltrados={this.props.productosFiltrados} handleChange={this.props.handleChange}/>;
      }else if(page=='shoppingCart'){
        return <ShoppingCart
                  shoppingCart={this.props.shoppingCart}
                  shoppingCartTotal={this.props.shoppingCartTotal}
                  showCatalogList={this.props.showCatalogList}
                  checkoutShoppingCart={this.props.checkoutShoppingCart}/>;
      }else if(page=='showProduct'){
        return <ProductShow showProductId={this.props.showProductId} showCatalogList={this.props.showCatalogList}/>;
      }else{
        return <ProductList />;
      }
    }

}

export default BodyComponent;
