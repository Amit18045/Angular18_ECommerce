import { Component, DestroyRef, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { CartModel, category, Customer, IAPIResponse, Products } from '../../model/product';
import { map, Observable, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Constant } from '../../constant/constant';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnDestroy {

  productSrv = inject(ProductService);
  productList = signal<Products[]>([]);
  categoryList$: Observable<category[]> = new Observable<category[]>();
  subscription: Subscription[] = [];
  loggedInUserData: Customer = new Customer();

  constructor() {
    const isUser = localStorage.getItem(Constant.LOCAL_KEY);
    if (isUser != null) {
      const parseData = JSON.parse(isUser);
      this.loggedInUserData = parseData;
    }
  }

  ngOnInit(): void {
    this.getProduct();
    this.categoryList$ = this.productSrv.getAllCategory().pipe(map(item => item.data));
  }

  getProduct() {
    this.subscription.push(this.productSrv.getAllProduct().subscribe({
      next: result => this.productList.set(result.data),
    }))
      ;
  }

  ngOnDestroy(): void {
    this.subscription.forEach(element => {
      element.unsubscribe();
    });
  }

  getProductByCategoryId(categoryId: number) {
    debugger
    this.productSrv.getAllProductsByCategoryId(categoryId).subscribe({

      next: result => this.productList.set(result.data)
    })
  }

  onAddToCart(productId: number) {
    debugger;
    const cartObj: CartModel = new CartModel();
    cartObj.ProductId = productId;
    cartObj.CustId = this.loggedInUserData.custId;
    this.productSrv.addToCart(cartObj).subscribe((res: IAPIResponse) => {
      if (res.result) {
        alert("product added to card");
        this.productSrv.onCartAdded.next(true);
      }
    })
  }

  

}
