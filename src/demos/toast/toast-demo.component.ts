import { Component } from '@angular/core';
import { SkyToast, ToastOptions } from '../../modules/toast';
import { DemoCustomToastComponent } from './toast-demo-custom-toast/toast-demo-custom-toast.component';

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
        this.toast.openCustom(DemoCustomToastComponent);
    }

    public openMessageInfinite() {
        let options: ToastOptions = {
            disableTimeout: true
        };
        this.toast.openMessage('Infinite message', options);
    }
}
