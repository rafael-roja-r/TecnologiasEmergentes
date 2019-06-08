import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './home/product/product.component';
import { ShoppingCartComponent } from './home/shopping-cart/shopping-cart.component';
import { ProductsCatalogComponent } from './home/products-catalog/products-catalog.component';

const routes: Routes = [
   {path: '', component: LoginComponent},
   {path: 'home', component: HomeComponent, children: [
     {path: '', redirectTo: 'products-catalog', pathMatch: 'full'},
     {path: 'products-catalog', component: ProductsCatalogComponent},
     {path: 'shopping-cart', component: ShoppingCartComponent},
     {path: 'product/:index', component: ProductComponent}
   ]}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

export const app_routing = RouterModule.forRoot(routes, {useHash:true});
