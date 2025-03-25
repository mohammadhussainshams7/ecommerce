import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { CartComponent } from './components/cart/cart.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { AccountComponent } from './components/account/account.component';
import { Error404Component } from './components/error404/error404.component';
import { authGuard } from './guards/auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'cart-shopping', component: CartComponent  , canActivate:[authGuard] },
  { path: 'wishlist', component: WishListComponent , canActivate:[authGuard] },
  { path: 'checkout', component: CheckOutComponent , canActivate:[authGuard] },
  { path: 'account', component: AccountComponent  },
  { path: 'contact', component: ContactComponent  },
  { path: 'about', component: AboutComponent  },
  { path: 'details/:id', component: ProductDetailsComponent  },
  { path: '**', component: Error404Component },
 
  
];
