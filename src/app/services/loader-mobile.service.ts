import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderMobileService {
  loading: any = null;

  constructor(public loadingController: LoadingController) { }

  async show(msg) {
    this.loading = await this.loadingController.create({
      spinner: "bubbles",
      duration: 6000,
      message: msg,
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await this.loading.present();
  }

  hide() {
    if (this.loading) {
      this.loading.dismiss();
    } else {
    console.log("Hiii");
    }
  }

}
