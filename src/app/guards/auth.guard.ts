import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AccountService)
  const router = inject(Router)
  const isUserLogin = auth.isLoggedIn()
  if(isUserLogin){
    return true;
  }else{
    router.navigate(['/signin']);
    return false;
  }


};
