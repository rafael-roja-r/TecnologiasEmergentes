import React from 'react';
import * as request from 'superagent';

const cardImg  = {
  objectFit:'scaleDown',
  width: '242px',
  height: '200px'
}

const quantityInput = {
  width:'40px',
  marginLeft:'2%'
}

const showMoreButton = {
  float:'left'
}

const catalogListDiv = {
  overflowY: 'auto',
  height: '75vh'
}

const body = {
  backgroundColor: 'white',
  padding: '2%'
}

class ProductList extends React.Component{

    constructor(){
     super();
    }

    render(){

        return(
        <div style={body}>
          <div className="row text-center">
            <div className="col-sm-12">
              <div className="col-sm-12 col-md-6 text-left">
                <h1>Catálogo de Productos</h1>
              </div>
              <div className="col-sm-12 col-md-push-3 col-md-3 text-right">
                <div className="col-sm-12 text-left">
                  <h5>Que estas buscando?</h5>
                </div>
                <div className="col-sm-12">
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Buscar Producto" onChange={this.props.handleChange.bind(this)}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row text-center" style={catalogListDiv}>
            {this.props.productosFiltrados.map((producto, i) =>
              <div className="col-lg-3 col-md-6" key={i}>
                <div className="thumbnail">
                  <img style={cardImg} src={producto.img} alt=""/>
                  <div className="caption text-left">
                    <h3>{producto.nombre}</h3>
                    <p><strong>Precio:</strong> $ {producto.precio}</p>
                    <p><strong>Unidades Disponibles:</strong> {producto.stock}</p>
                    <div className="text-right">
                      <a className="btn btn-primary" role="button" onClick={this.props.showProduct.bind(this, producto.index)} style={showMoreButton}>Ver Mas</a>
                      <a className="btn btn-warning" role="button" onClick={this.props.addProduct.bind(this, producto.index)}>Añadir</a>
                      <input id={"producto"+producto.index} style={quantityInput} type="number" defaultValue="1"/>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
            );
        }
      }

export default ProductList;
