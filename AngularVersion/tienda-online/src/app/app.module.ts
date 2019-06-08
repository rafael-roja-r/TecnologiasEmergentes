import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

//FIREBASE
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';

//Services
import { DataService } from './data.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';


//Routes
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { ProductsCatalogComponent } from './home/products-catalog/products-catalog.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { ProductComponent } from './home/product/product.component';
import { ShoppingCartComponent } from './home/shopping-cart/shopping-cart.component';


export const firebaseConfig = {
  apiKey: "AIzaSyCul20riEsI6NEE2Ogr93H8TWv019s3BV4",
  authDomain: "tienda-online-e05ec.firebaseapp.com",
  databaseURL: "https://tienda-online-e05ec.firebaseio.com",
  storageBucket: "tienda-online-e05ec.appspot.com",
  messagingSenderId: "945224586886"
};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    ProductsCatalogComponent,
    SearchFilterPipe,
    ProductComponent,
    ShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [AngularFireDatabase,AngularFireAuth, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
