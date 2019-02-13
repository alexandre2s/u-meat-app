import { Component, OnInit } from '@angular/core';

import { LoginService } from '../../security/login/login.service'
import { User } from '../../security/login/user.model'

@Component({
  selector: 'mt-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  user(user: User){
    return this.loginService.user
  }

  isLoggedIn(): boolean{
    return this.loginService.isLoggedIn()
  }

  login(){
    return this.loginService.handleLogin()
  }

  logout(){
    return this.loginService.logout()

  }

}
