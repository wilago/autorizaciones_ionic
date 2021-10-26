import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DatosjsonService } from '../../services/datosjson.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

   urlPage: string;
   email: string;
   pass: string;
   token: string;
   user: string;
   key = 'L@iKn1aZUEg&';
   datoUser: any[] = [];
   public usuario = {
    email: '',
    password: ''
  };

  constructor(
                private navCtrl: NavController,
                private datosJsonUser: DatosjsonService
                ) { }

  ngOnInit() {

  }

  onSubmitTemplate() {

    this.datosJsonUser.getDataUser(this.usuario.email, this.usuario.password )
    .subscribe((resp: any[]) => {

      this.datoUser = resp;

      console.log('Data', resp);
      // console.log(this.usuario.password);
      // console.log(this.datoUser[0].keyToken);
      this.token = this.datoUser[0].keyToken;
      this.user = this.datoUser[0].user;
      if (this.token === this.key){

        // this.urlPage = '/view-pdf/' + this.user;
    // this.router.navigate(['/view-pdf']);
       // this.router.navigate([this.urlPage]);
        this.navCtrl.navigateRoot(`/inicio/${this.user}`);
      }
    },
    error => {
        console.log('error');
        alert('No eres un Usuario Kinesis');
    }
      );
    // this.navCtrl.navigateRoot('/inicio');

}
}
