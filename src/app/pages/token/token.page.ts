import { Component, OnInit } from '@angular/core';
import { DatosjsonService } from '../../services/datosjson.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-token',
  templateUrl: './token.page.html',
  styleUrls: ['./token.page.scss'],
})
export class TokenPage implements OnInit {
  id: number;
  usr: string;
  token: string;
  public tokenForm: string;


  constructor(
        public datoservice: DatosjsonService,
        private route: ActivatedRoute,
        private router: Router,
        private navCtrl: NavController,
        public alertController: AlertController

  ) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      // console.log('Epaaa', this.id);
    });

    this.datoservice.getGetToken( this.id )
    .subscribe(resp => {

      // this.aprobaciones = resp.autorizaciones;
       // console.log('token', resp[0].keyToken);
    this.token = resp[0].keyToken;
    this.usr = resp[0].user;
    });

  }






  onClickAprobado() {

   // console.log("Ir Aprobado");
    this.datoservice.getAprobacion( this.id, this.usr )
    .subscribe(resp => {

      // this.aprobaciones = resp.autorizaciones;
      // console.log('token', resp);

    });

  }


  onSubmitToken() {

    // console.log("Token enviado",this.tokenForm);
    // this.router.navigate([`/inicio/${id}`]);
    if ( this.token === this.tokenForm){
     // console.log("Exito!",this.tokenForm);
      this.onClickAprobado();
    // this.router.navigate([`/inicio/${id}`]);
    // this.navCtrl.navigateRoot(`/inicio/${this.usr}`);
      this.router.navigate([`/inicio/${this.usr}`]);
      this.ingresoAlert();

  }
else {

  this.ingresoNoAlert();

}

  }



  async ingresoAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Información',
      subHeader: 'Ingreso de toke',
      message: 'El token ingresado es correcto.',
      buttons: ['OK']
    });

    await alert.present();
  }


  async ingresoNoAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Información',
      subHeader: 'Ingreso de token',
      message: 'Ingrese su token.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
