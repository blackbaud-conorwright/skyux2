import { Component } from '@angular/core';
import { SkyToastDemoCustomComponent } from './toast-demo-custom.component';
import {
  SkyToastService
} from '../../core';

@Component({
  selector: 'sky-toast-demo',
  templateUrl: './toast-demo.component.html'
})
export class SkyToastDemoComponent {
    constructor(private toast: SkyToastService) {
    }

    public openMessage(type?: string) {
        let options = {
            toastType: type
        };

        this.toast.openMessage('Simple message', options);
    }

    public openTemplate() {
        this.toast.openCustom(SkyToastDemoCustomComponent);
    }

    public openMessageInfinite() {
        let options = {
            disableTimeout: true
        };
        this.toast.openMessage('Infinite message', options);
    }
}
