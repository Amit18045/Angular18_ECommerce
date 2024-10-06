import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { CartModel, IAPIResponse } from '../../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  https= inject(HttpClient);
  baseUrl=environment.API_URL;
  onCartAdded :Subject<boolean> =new Subject<boolean>();

  getAllProduct():Observable<IAPIResponse>{
    return this.https.get<IAPIResponse>(`${this.baseUrl}GetAllProducts`);
  }

  getAllCategory():Observable<IAPIResponse>{
    return this.https.get<IAPIResponse>(`${this.baseUrl}GetAllCategory`);
  }
  

  getAllProductsByCategoryId(categoryID :number):Observable<IAPIResponse>{
   return this.https.get<IAPIResponse>(`${this.baseUrl}GetAllProductsByCategoryId?id=${categoryID}`)
  }

  addToCart(cartModelObj :CartModel):Observable<IAPIResponse>{
    return this.https.post<IAPIResponse>(`${this.baseUrl}AddToCart`,cartModelObj);
  }

  
  deleteProductFromCartById(cartId:number):Observable<IAPIResponse>{
    const url=`${this.baseUrl}DeleteProductFromCartById?id=${cartId}`
    return this.https.get<IAPIResponse>(url);
  }
  
}