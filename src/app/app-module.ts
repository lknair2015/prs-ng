import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Menu } from './core/menu/menu/menu';
import { UserList } from './feature/user/user-list/user-list';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserCreate } from './feature/user/user-create/user-create';
import { UserDetail } from './feature/user/user-detail/user-detail';
import { UserEdit } from './feature/user/user-edit/user-edit';
import { VendorList } from './feature/vendor/vendor-list/vendor-list';
import { VendorCreate } from './feature/vendor/vendor-create/vendor-create';
import { VendorEdit } from './feature/vendor/vendor-edit/vendor-edit';
import { VendorDetail } from './feature/vendor/vendor-detail/vendor-detail';
import { ProductList } from './feature/product/product-list/product-list';
import { ProductCreate } from './feature/product/product-create/product-create';
import { ProductEdit } from './feature/product/product-edit/product-edit';
import { ProductDetail } from './feature/product/product-detail/product-detail';
import { Login } from './feature/login/login/login';
import { RequestList } from './feature/request/request-list/request-list';
import { RequestCreate } from './feature/request/request-create/request-create';
import { RequestEdit } from './feature/request/request-edit/request-edit';
import { RequestDetail } from './feature/request/request-detail/request-detail';
import { LineItemList } from './feature/line-item/line-item-list/line-item-list';
import { LineItemEdit } from './feature/line-item/line-item-edit/line-item-edit';
import { LineItemDetail } from './feature/line-item/line-item-detail/line-item-detail';
import { LineItemCreate } from './feature/line-item/line-item-create/line-item-create';
import { RequestReview } from './feature/request/request-review/request-review';
import { LineItemReview } from './feature/line-item/line-item-review/line-item-review';
import { Logout } from './feature/login/logout/logout';

@NgModule({
  declarations: [
    App,
    Menu,
    UserList,
    UserCreate,
    UserDetail,
    UserEdit,
    VendorList,
    VendorCreate,
    VendorEdit,
    VendorDetail,
    ProductList,
    ProductCreate,
    ProductEdit,
    ProductDetail,
    Login,
    RequestList,
    RequestCreate,
    RequestEdit,
    RequestDetail,
    LineItemList,
    LineItemEdit,
    LineItemDetail,
    LineItemCreate,
    RequestReview,
    LineItemReview,
    Logout
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
    
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [App]
})
export class AppModule { }
