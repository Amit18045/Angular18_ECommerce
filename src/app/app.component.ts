import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CartData, Customer, IAPIResponse, Login } from './model/product';
import { FormsModule } from '@angular/forms';
import { RegisterService } from './services/register/register.service';
import { ToastrService } from 'ngx-toastr';
import { JsonpInterceptor } from '@angular/common/http';
import { Constant } from './constant/constant';
import { ProductService } from './services/product/product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Angular18_ECommerce';

  @ViewChild('registerModel') registerModel: ElementRef | undefined;
  @ViewChild('LoginModel') LoginModel: ElementRef | undefined;

  customerObj: Customer = new Customer();
  LoginObj: Login = new Login();
  registersrv = inject(RegisterService);
  toastr = inject(ToastrService);
  loggedInUserData: Customer = new Customer();
  isCartPopupOpen: boolean = false;
  cartData: CartData[] = [];
  productSev = inject(ProductService);

  ngOnInit(): void {
    const isUser = localStorage.getItem(Constant.LOCAL_KEY);
    if (isUser != null) {
      const parseData = JSON.parse(isUser);
      this.loggedInUserData = parseData;
      this.getCartItem();
    }
    this.productSev.onCartAdded.subscribe((res: boolean) => {
      if (res) {
        this.getCartItem();
      }
    })
  }

  OpenRegisterModel() {
    debugger

    if (this.registerModel) {
      this.registerModel.nativeElement.style.display = 'block';
    }
  }

  closeRegisterModel() {

    if (this.registerModel) {
      this.registerModel.nativeElement.style.display = 'none';
    }
  }

  onRegister() {
    debugger
    this.registersrv.registerNewCustomer(this.customerObj).subscribe({
      next: response => {
        alert("datasaved"); this.closeRegisterModel();
        this.toastr.show("hsajd", "data saved");
      },
    })
  }




  closeLoginModel() {
    if (this.LoginModel) {
      this.LoginModel.nativeElement.style.display = 'none';

    }
  }
  openLoginModel() {
    if (this.LoginModel) {
      this.LoginModel.nativeElement.style.display = 'block';

    }
  }

  onLogin() {
    debugger
    this.registersrv.userLogin(this.LoginObj).subscribe((res: IAPIResponse) => {
      if (res.result) {
        alert("Login successfully");
        this.loggedInUserData = res.data;
        localStorage.setItem(Constant.LOCAL_KEY, JSON.stringify(res.data));
        this.closeLoginModel();
      }
    })
  }


  logOFF() {
    localStorage.removeItem(Constant.LOCAL_KEY);
    this.loggedInUserData = new Customer();
  }

  showCartPopUp() {
    debugger
    this.isCartPopupOpen = !this.isCartPopupOpen;
  }

  getCartItem() {
    this.registersrv.getCartProductsByCustomerId(this.loggedInUserData.custId).subscribe((res: IAPIResponse) => {
      this.cartData = res.data;
    })
  }

  onRemoveProduct(cartId: number) {
    const isDeleted = confirm("Are you want to remove this product");
    if (isDeleted) {
      debugger
      this.productSev.deleteProductFromCartById(cartId).subscribe((res: IAPIResponse) => {
        if (res.result) {
          alert("Delete product");
          this. getCartItem();
        }
      })
    }
  }




}