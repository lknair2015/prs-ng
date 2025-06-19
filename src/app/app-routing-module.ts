import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserList } from './feature/user/user-list/user-list';
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
import { RequestDetail } from './feature/request/request-detail/request-detail';
import { RequestEdit } from './feature/request/request-edit/request-edit';
import { LineItemList } from './feature/line-item/line-item-list/line-item-list';
import { LineItemCreate } from './feature/line-item/line-item-create/line-item-create';
import { LineItemDetail } from './feature/line-item/line-item-detail/line-item-detail';
import { LineItemEdit } from './feature/line-item/line-item-edit/line-item-edit';
import { RequestReview } from './feature/request/request-review/request-review';
import { LineItemReview } from './feature/line-item/line-item-review/line-item-review';
import { Logout } from './feature/login/logout/logout';

const routes: Routes = [
  {path: '', redirectTo: '/user-list', pathMatch: 'full'},
  {path: 'user-list', component: UserList},
  {path: 'user-create', component: UserCreate},
  {path: 'user-detail/:id', component: UserDetail},
  {path: 'user-edit/:id', component: UserEdit},
  {path: 'vendor-list', component: VendorList},
  {path: 'vendor-create', component: VendorCreate},
  {path: 'vendor-edit/:id', component: VendorEdit},
  {path: 'vendor-detail/:id', component: VendorDetail},
  {path: 'product-list', component: ProductList},
  {path: 'product-create', component: ProductCreate},
  {path: 'product-edit/:id', component: ProductEdit},
  {path: 'product-detail/:id', component: ProductDetail},
  {path: 'request-list', component: RequestList},
  {path: 'request-create', component: RequestCreate},
  {path: 'request-detail/:id', component: RequestDetail},
  {path: 'request-edit/:id', component: RequestEdit},
  {path: 'request-review', component: RequestReview},
  {path: 'line-item-list/:id', component: LineItemList},
  {path: 'line-item-create/:id', component: LineItemCreate},
  {path: 'line-item-detail/:id', component: LineItemDetail},
  {path: 'line-item-edit/:id/:anotherId', component: LineItemEdit},
  {path: 'line-item-review/:id', component: LineItemReview},
  {path: 'login', component: Login},
  {path: 'logout', component: Logout}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
