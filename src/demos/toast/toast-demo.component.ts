import { Component } from '@angular/core';
import { SkyToast, ToastOptions } from '../../modules/toast';

@Component({
  selector: 'sky-toast-demo',
  templateUrl: './toast-demo.component.html'
})
export class SkyToastDemoComponent {
    constructor(private toast: SkyToast) {
    }

    public openMessage(type?: string) {
        let options: ToastOptions = {
            toastType: type
        };

        this.toast.openMessage('Simple message', options);
    }

    public openTemplate() {
        this.toast.openCustom();
    }

    public openMessageInfinite() {
        let options: ToastOptions = {
            disableTimeout: true
        };
        this.toast.openMessage('Infinite message', options);
    }
}
