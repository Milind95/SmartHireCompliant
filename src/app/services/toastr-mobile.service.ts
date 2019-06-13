import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastrMobileService {

  constructor(public toastController: ToastController) { }

  async toasterNotification(message) {
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: true,
      duration: 1500,
      position: 'bottom',
      closeButtonText: 'Close'
    });
    toast.present();
  }
}
