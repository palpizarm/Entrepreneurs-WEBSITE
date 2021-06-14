import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './components/add-item/add-item.component';
import { AdminPortalComponent } from './components/admin-portal/admin-portal.component';
import { CategorieViewComponent } from './components/categorie-view/categorie-view.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { HomeComponent } from './components/home/home.component';
import { InformationComponent } from './components/information/information.component';
import { ItemViewComponent } from './components/item-view/item-view.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';
import { ShopViewComponent } from './components/shop-view/shop-view.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ShopsComponent } from './components/shops/shops.component';
import { SiginCustomerComponent } from './components/sigin-customer/sigin-customer.component';
import { SiginSellerComponent } from './components/sigin-seller/sigin-seller.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'shops', component: ShopsComponent},
  { path: 'categories', component: CategoriesComponent},
  { path: 'information', component: InformationComponent},
  { path: 'shop/:id', component: ShopViewComponent},
  { path: 'addItem/:id', component: AddItemComponent},
  { path: 'itemView/:id', component: ItemViewComponent},
  { path: 'registerUser', component: SiginCustomerComponent},
  { path: 'registerSeller', component: SiginSellerComponent},
  { path: 'profileInformation', component: ProfileComponent},
  { path: 'shopping-cart', component: ShoppingCartComponent},
  { path: 'search/:q', component: SearchComponent },
  { path: 'admin-portal', component: AdminPortalComponent },
  { path: 'categoryView/:id', component: CategorieViewComponent},
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
