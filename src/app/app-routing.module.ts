import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';

const routes: Routes = [
  // blank layout
  { path: '', canActivate: [authGuard], loadComponent:()=>import('./layouts/blank-layout/blank-layout.component').then((m)=>m.BlankLayoutComponent) ,
  children: [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', loadComponent:()=>import('./components/home/home.component').then((m)=>m.HomeComponent), title:"Home" },
    { path: 'cart', loadComponent:()=>import('./components/cart/cart.component').then((m)=>m.CartComponent), title:"Cart" },
    { path: 'products', loadComponent:()=>import('./components/products/products.component').then((m)=>m.ProductsComponent), title:"Products" },
    { path: 'details/:id', loadComponent:()=>import('./components/details/details.component').then((m)=>m.DetailsComponent), title:"Products" },
    { path: 'brands', loadComponent:()=>import('./components/brands/brands.component').then((m)=>m.BrandsComponent), title:"Brands" },
    { path: 'brandsDetails/:id', loadComponent:()=>import('./components/brands-details/brands-details.component').then((m)=>m.BrandsDetailsComponent), title:"Brands Details" },
    { path: 'categories', loadComponent:()=>import('./components/categories/categories.component').then((m)=>m.CategoriesComponent), title:"Categories" },
    { path: 'categoriesDetails/:id', loadComponent:()=>import('./components/categories-details/categories-details.component').then((m)=>m.CategoriesDetailsComponent), title:"Categories Details" },
    { path: 'payment/:id', loadComponent:()=>import('./components/payment/payment.component').then((m)=>m.PaymentComponent), title:"Payment" },
    { path: 'wishlist', loadComponent:()=>import('./components/wishlist/wishlist.component').then((m)=>m.WishlistComponent), title:"Wish List" },
    { path: 'allorders', loadComponent:()=>import('./components/allorders/allorders.component').then((m)=>m.AllordersComponent), title:"All Orders" },
    { path: 'update-password', loadComponent:()=>import('./components/update-password/update-password.component').then((m)=>m.UpdatePasswordComponent), title:"Update Password" },

  ]},
  // auth layout
  {path: '',loadComponent:()=>import('./layouts/auth-layout/auth-layout.component').then((m)=>m.AuthLayoutComponent) ,
  children:[
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', loadComponent:()=>import('./components/login/login.component').then((m)=>m.LoginComponent), title:"Login" },
    { path: 'register', loadComponent:()=>import('./components/register/register.component').then((m)=>m.RegisterComponent), title:"Register" },
    { path: 'forget', loadComponent:()=>import('./components/forget-password/forget-password.component').then((m)=>m.ForgetPasswordComponent), title:"Forget Password" },
  ]},
  // not found
  {path: '**',loadComponent:()=>import('./components/not-found-page/not-found-page.component').then((m)=>m.NotFoundPageComponent) , title:"Page Not Found"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
