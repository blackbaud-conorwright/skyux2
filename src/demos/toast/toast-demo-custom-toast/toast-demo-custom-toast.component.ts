import { Component } from '@angular/core';

@Component({
  selector: 'custom-toast-demo',
  templateUrl: './toast-demo-custom-toast.component.html',
  styleUrls: ['./toast-demo-custom-toast.component.scss']
})
export class DemoCustomToastComponent {
    public message: string = 'Custom Toast';
}