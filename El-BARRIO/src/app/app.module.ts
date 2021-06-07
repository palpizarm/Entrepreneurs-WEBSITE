import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ShopsComponent } from './components/shops/shops.component';
import { InformationComponent } from './components/information/information.component';
import { LoginComponent } from './components/login/login.component';
import { ShopViewComponent } from './components/shop-view/shop-view.component';
import { ItemViewComponent } from './components/item-view/item-view.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { SiginSellerComponent } from './components/sigin-seller/sigin-seller.component';
import { ItemsComponent } from './components/items/items.component';
import { NoimagePipe } from './pipes/noimage.pipe';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CategoriesComponent,
    ShopsComponent,
    InformationComponent,
    LoginComponent,
    ShopViewComponent,
    ItemViewComponent,
    AddItemComponent,
    SiginSellerComponent,
    SiginSellerComponent,
    ItemsComponent,
    NoimagePipe,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
