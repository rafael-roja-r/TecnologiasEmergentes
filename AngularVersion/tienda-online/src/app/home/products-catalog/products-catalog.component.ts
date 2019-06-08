import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-products-catalog',
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.css']
})
export class ProductsCatalogComponent implements OnInit {
  private products:any = [];
  private productsQuantity:any = '';
  private productJSON:any;
  private subtotal:number;
  private stock:number;
  constructor(private dataService: DataService) {
    this.dataService.getProducts().then((data)=>{
      this.products = data["products"];
    });
  }

  ngOnInit() {
  }

  addProductToShoppingCart(product, quantity){

    // Se muestra la cantidad de productos anhadidos sobre el icon del carrito
    this.productsQuantity = document.getElementById('badge').textContent;
    document.getElementById("badge").innerHTML  = String(Number(this.productsQuantity) + 1);

    // se envia al servicio los productos anhadidos, se calcula subtotal
    this.subtotal = product.precio * quantity;
    this.stock = product.stock - quantity;
    document.getElementById("unidadDisponible-"+product.index).innerHTML = String(Number(this.stock));

    this.productJSON = {
      product : product,
      quantity : quantity,
      subtotal : this.subtotal
    }

    this.dataService.addProductToShoppingCart(this.productJSON);

  }

}
