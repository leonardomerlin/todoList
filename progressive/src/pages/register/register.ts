import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LoginService } from '../../providers/login-service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  user: any = {
    name: 'Demoiselle',
    email: 'admin@demoiselle.org',
    pass: '12345678'
  };

  constructor(
    protected loginService: LoginService,
    public navCtrl: NavController,
    public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onSubmit($event, form) {
    console.log('TODO: create new user', form);
    console.log('TODO: signin new user', form);
    this.register();
  }

  navToLoginPage() {
    this.navCtrl.push(LoginPage, {});
  }

  register() {
    this.loginService.register(this.user).subscribe(res => console.log('res', res));
  }
}
