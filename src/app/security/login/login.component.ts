import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { Router } from '@angular/router'

import { LoginService } from './login.service';
import { User } from './user.model'
import { NotificationService } from '../../shared/messages/notification.service'

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  navegationTo: string

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required])
    })
    this.navegationTo = this.activatedRoute.snapshot.params['to'] || btoa('/')

  }

  login(){
    this.loginService.login(
      this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        user =>
          this.notificationService.notify(`Bem vindo, ${user.name}`),
        response => // HttpErrorResponde
          this.notificationService.notify(response.error.message),
        () => {
          this.router.navigate([ atob(this.navegationTo) ])
        }
      )
  }

}
