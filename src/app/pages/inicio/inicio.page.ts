import { Component, OnInit } from '@angular/core';
import { Autoriza } from '../../interfaces/interfaces';
import { DatosjsonService } from '../../services/datosjson.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

    usr: string;
    urlPage: string;
    docUrl: string;
    aprobaciones: Autoriza[] = [];
    public Token: string;
    public varUndefine: boolean;


  constructor(
              public datoservice: DatosjsonService,
              private route: ActivatedRoute,
              private router: Router,
              private iab: InAppBrowser,
              private navCtrl: NavController,
              private alertController: AlertController
              ) { }


  ngOnInit() {

        // console.log('antes data', this.aprobaciones);
          this.route.params.subscribe((params: Params) => {
            this.usr = params.usr;
            // console.log('Epaaa', this.usr);
          });

          this.datoservice.getDataJson(this.usr)
          .subscribe(resp => {

            this.aprobaciones = resp.autorizaciones;
            // console.log('data', this.aprobaciones);
            this.Token = this.aprobaciones[0].id;

            if (this.Token === undefined){
              // console.log('id no reconosido', this.Token);
              this.varUndefine = false;

            }
            else {
              // console.log('id reconocidoo', this.Token);
              this.varUndefine = true;

            }


          });

  }

  ionViewWillLeave() {
  // console.log("Va a Salir");
  }

  ionViewDidLeave(){
  //   console.log("Va Saliooooo");
  }

  reloadPage() {

    this.datoservice.getDataJson(this.usr)
    .subscribe(resp => {

      this.aprobaciones = resp.autorizaciones;



      this.Token = this.aprobaciones[0].id;
      if (this.Token === undefined) {
      // console.log("id no reconosido", this.Token);
        this.varUndefine = false;
            }
          else {
        // console.log("id reconocidoo", this.Token);
          this.varUndefine = true;

            }


      this.urlPage = '/inicio/' + this.usr;
      // this.urlPage = '/inicio/${this.usr}';
      // console.log('data', this.aprobaciones);
      this.router.navigate([this.urlPage]);
     // this.navCtrl.navigateRoot(`/inicio/${this.usr}`);
    });


    }

  onClickPdf(namePdf: string) {
        console.log(namePdf);
        // this.pdfDoc = this.navParams.get('pdfDoc');
        this.docUrl = `http://190.145.163.74:8282/agricolasoft/_lib/file/docautorizaciones/${namePdf}`;
        // console.log(this.pdfDoc);
        const url = encodeURIComponent(this.docUrl);
        this.iab.create('https://docs.google.com/viewer?url=' + url);

                }



  async onClickAprobar(id: number, slidingItem) {

    const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Confirmación Aprobación!',
        message: 'Esta <strong>Seguro</strong> que aprobara?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              // console.log('Confirm Cancel: blah');
            }
          },
           {
            text: 'Si',
            handler: () => {
              // console.log('Confirm Okay',id);
              // console.log('data', this.aprobaciones);

        this.datoservice.getDataToken(this.usr, id )
              .subscribe((resp: any[]) => {
             // console.log('Correo Enviado', resp[0].token);
              });
              // console.log('token capture', this.urlPag);

              // this.router.navigate([`/token/${id}`]);
        slidingItem.close();
        this.navCtrl.navigateRoot(`/token/${id}`);

            }
          }
        ]
      });

    await alert.present();

    }
    async onClickNoAprobar(id: number, slidingItem) {

      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Cancelación Aprobación!',
        message: 'Esta <strong>Seguro</strong> que No aprobara?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
             // console.log('Confirm Cancel: blah');
            }
          },
          {
            text: 'Si',
            handler: () => {
              // console.log('Confirm Okay');

               this.datoservice.getNoAprobado( id, this.usr )
               .subscribe((resp: any[]) => {
              // console.log('Correo Enviado', resp[0].token);
           });
              // console.log('token capture', this.urlPag);

              // this.router.navigate([`/token/${id}`]);

               this.reloadPage();
               slidingItem.close();
              // this.navCtrl.navigateRoot(`/token/${id}`);





            }
          }
        ]
      });

      await alert.present();

    }

}
