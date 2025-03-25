import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServerService {
  http = inject(HttpClient);
  private apiUrl:string = "http://localhost:3000";


  getProducts(): Observable<any>{
    return this.http.get(`${this.apiUrl}/products`)
  }
  getBestSellingProducts(): Observable<any>{
    return this.http.get(`${this.apiUrl}/bestSellingProducts`)
  }
  getOurProducts(): Observable<any>{
    return this.http.get(`${this.apiUrl}/ourProducts`)
  }


    // Update existing user data
    updateUser(id: string, userData: any): Observable<any> {
      return this.http.patch(`${this.apiUrl}/users/${id}`, userData);
    }

      // Fetch cart by ID
  getCartById(id: number): Observable<any> {
    if(id <= 4){
      return this.http.get(`${this.apiUrl}/products/${id}`);
    }else if(id <= 8){
      return this.http.get(`${this.apiUrl}/bestSellingProducts/${id}`);
    }else{
      return this.http.get(`${this.apiUrl}/ourProducts/${id}`);
    }

  }
}
