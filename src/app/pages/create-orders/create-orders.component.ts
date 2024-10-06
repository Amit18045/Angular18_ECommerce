import { Component, inject, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register/register.service';
import { CartData, Customer, IAPIResponse, OrderModel } from '../../model/product';
import { Constant } from '../../constant/constant';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-orders',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-orders.component.html',
  styleUrl: './create-orders.component.css'
})
export class CreateOrdersComponent implements OnInit {

  registerSrc = inject(RegisterService);
  loggedInUserData: Customer = new Customer();
  cardData: CartData[] = [];
  totalAmount: number = 0;
  ordermOdelObj: OrderModel = new OrderModel();

  ngOnInit(): void {
    const isUser = localStorage.getItem(Constant.LOCAL_KEY);
    if (isUser != null) {
      const parseData = JSON.parse(isUser);
      this.loggedInUserData = parseData;
      this.getCartItem();
    }
  }

  getCartItem() {
    this.registerSrc.getCartProductsByCustomerId(this.loggedInUserData.custId).subscribe((res: IAPIResponse) => {
      this.cardData = res.data;

      this.cardData.forEach(element => {
        this.totalAmount = this.totalAmount + element.productPrice;
      });
    })
  }

  placeOrder() {
    debugger
    this.ordermOdelObj.CustId=this.loggedInUserData.custId;
    this.ordermOdelObj.TotalInvoiceAmount=this.totalAmount;

    this.registerSrc.placeOrder(this.ordermOdelObj).subscribe((res: IAPIResponse) => {
      if (res.result) {
        alert("Order Placed");
        this.ordermOdelObj=new OrderModel();
        this.getCartItem();
        this.totalAmount=0;
      }
    })
  }
}
