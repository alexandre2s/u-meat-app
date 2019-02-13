import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms'
import { Router } from '@angular/router'
import { tap } from 'rxjs/operators'

import { RadioOption } from '../shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from '../restaurants-detail/shopping-cart/cart-item.model';
import { Order, OrdemItem } from './order.model';
import { LoginService } from '../security/login/login.service'




@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  numeroPattern = /^[0-9]*$/;

  orderForm: FormGroup;
  delivery: number = 8;
  orderId: string

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Débito', value: 'DEB'},
    {label: 'Cartão de Refeição', value: 'REF'}
  ]

  constructor(
    private orderService: OrderService,
    private router: Router, 
    private formBuilder: FormBuilder,
    private loginService: LoginService
    ) { }

  ngOnInit() {
    this.orderForm = new FormGroup({
      name: new FormControl(
        this.loginService.isLoggedIn  ? this.loginService.user.name : '', {
          validators: [Validators.required, Validators.minLength(5)]
          
        }
      ),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numeroPattern)]),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('')
    }, {validators: [OrderComponent.equalsTo], updateOn: 'blur'}
  )
  }

  static equalsTo(gruop: AbstractControl): {[key: string]: boolean}{
    const email = gruop.get('email');
    const emailConfirmation = gruop.get('emailConfirmation');

    if (!email || !emailConfirmation) {
      return undefined;
    }

    if (email.value !== emailConfirmation.value) {
      return {emailsNotMatch: true}
    }

    return undefined;

  }

  itemsValue(): number{
    return this.orderService.itemsValue();

  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems();
  }

  increaseQty(item: CartItem){
    return this.orderService.increaseQty(item)
  }
  
  decreaseQty(item: CartItem){
    return this.orderService.decreaseQty(item)
  }
  
  remove(item: CartItem){
    return this.orderService.remove(item);
  }

  isOrderCompleted(): boolean{
    return this.orderId !== undefined
  }

  checkOrder(order: Order){
    console.log('order');
    console.log(order);
    order.orderItems = this.cartItems()
      .map((item:CartItem)=>new OrdemItem(item.quantity, item.menuItem.id))



    this.orderService.checkOrder(order)
      .pipe(
        tap((orderId: string )=>{
          this.orderId = orderId
        })
      )
      .subscribe( (orderId: string)=>{

        this.router.navigate(['/order-summary'])
        //console.log(`Compra concluída: ${orderId}`)
        this.orderService.clear();

      })
    console.log(order);

  }
}
