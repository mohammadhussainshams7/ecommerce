import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../interface/account';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = 'http://localhost:3000/users';
  userKey:string = "user"
  private getAccountChange = new BehaviorSubject<number>(0); // Subject to track Account
  


  constructor(private http: HttpClient, private router: Router) {}
  
  register(user: Account) {
    return this.http.post(this.apiUrl, user);
  }

  login(email: string, password: string) {
    return this.http.get<any[]>(this.apiUrl).subscribe(users => {
      const foundUser = users.find(user => user.email === email && user.password === password);
      if (foundUser) {
        localStorage.setItem(this.userKey, JSON.stringify(foundUser));
        this.updateAccount(1);
        this.router.navigate(['/home']);
      } else {
        alert('Invalid credentials');
      }
    });
  }



  logout() {
    localStorage.removeItem(this.userKey);
    this.router.navigate(['/signin']);
    this.updateAccount(0);
  }


  isLoggedIn() {
    return localStorage.getItem(this.userKey) !== null;
  }
  getUser() {
    const userList = localStorage.getItem(this.userKey);
      return userList ? JSON.parse(userList) : [];
  }


  updateAccount(value:number): void{
    this.getAccountChange.next(value); // Update the count
  } 
  
      // Get the current Account
      getAccountChangeFunction() {
        return this.getAccountChange.asObservable(); // Return as observable
      }
}
