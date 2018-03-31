import { Component } from '@angular/core';

@Component({
  selector: 'custom-toast-demo',
  templateUrl: './toast-demo-custom.component.html',
  styleUrls: ['./toast-demo-custom.component.scss']
})
export class SkyToastDemoCustomComponent {
    public message: string = 'Custom Toast';
}