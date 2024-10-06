import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Customer, IAPIResponse, Login, OrderModel } from '../../model/product';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private http=inject(HttpClient);
  baseUrl =environment.API_URL;
  
  registerNewCustomer(customerObj :Customer):Observable<IAPIResponse>{
    return this.http.post<IAPIResponse>(`${this.baseUrl}RegisterCustomer`,customerObj);
  }
   

  userLogin(userLogin:Login){
    return this.http.post<IAPIResponse>(`${this.baseUrl}Login`,userLogin);
  }
  getCartProductsByCustomerId(loggedUserId : number):Observable<IAPIResponse>{
    return this.http.get<IAPIResponse>(`${this.baseUrl}GetCartProductsByCustomerId?id=${loggedUserId}`);
  }


  placeOrder(orderData:OrderModel):Observable<IAPIResponse>{
    return this.http.post<IAPIResponse>(`${this.baseUrl}PlaceOrder`,orderData);
  }
}
