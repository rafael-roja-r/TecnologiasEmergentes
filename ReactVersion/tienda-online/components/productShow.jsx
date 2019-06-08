import React from 'react';
import * as request from 'superagent';


const productImage = {
  height:'450px'
}

const body = {
  backgroundColor: 'white',
  padding: '2%'
}


class ProductShow extends React.Component{

    constructor(){
     super();
     this.state = {
        producto : {}
     };
    }

    componentWillMount(){
      //console.log(this.props.showProductId);
      let productIndex = this.props.showProductId;//this.props.match.params.index;
      request.get('https://tienda-online-e05ec.firebaseio.com/productos/'+productIndex+'.json')
              .end((err, res)=>{
                if(err || !res.ok){
                  console.log("Error en la peticion: "+err);
                }else{
                  this.setState({ producto : JSON.parse(res.text)});
                }
              })
    }

    render(){

        return(
        <div style={body} className="row">
          <div className="col-sm-12">
            <div className="col-sm-12 col-md-6 text-left">
              <h1>{this.state.producto.nombre}</h1>
            </div>
          </div>
          <div className="col-sm-12">
            <div className="col-sm-8 thumbnail">
              <img src={this.state.producto.img} alt={this.state.producto.nombre} style={productImage}/>
            </div>
            <div className="col-sm-4">
              <p><strong>Precio:</strong> $ {this.state.producto.precio}</p>
              <p><strong>Unidades Disponibles:</strong> {this.state.producto.stock}</p>
            </div>
            <div className="col-sm-12">
              <p>
                <a className="btn btn-primary" role="button" onClick={this.props.showCatalogList.bind(this)}>Atras</a>
              </p>
            </div>
          </div>
        </div>

            );
        }
      }

export default ProductShow;
