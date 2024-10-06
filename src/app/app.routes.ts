import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { CreateOrdersComponent } from './pages/create-orders/create-orders.component';
import { MyOrderComponent } from './pages/my-order/my-order.component';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:ProductsComponent},
    {path:'create-order',component:CreateOrdersComponent},
    {path:'myOrder',component:MyOrderComponent},
];
