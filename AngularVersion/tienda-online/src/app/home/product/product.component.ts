import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product:any = undefined;
  index:any = undefined;
  constructor(private route:ActivatedRoute,
              private dataService:DataService) {
      route.params.subscribe( parametros => {
        dataService.getProducto( parametros['index'])
        .subscribe( res => {
          this.product = res.json();
        })
      })
  }

  ngOnInit() {
  }

}
