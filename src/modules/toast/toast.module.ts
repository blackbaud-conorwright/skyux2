import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { SkyToast } from './toast';

@NgModule({
  declarations: [
    SkyToast
  ],
  imports: [
    CommonModule,
    ToastrService
  ],
  providers: [
    ToastrService
  ],
  exports: [
    SkyToast
  ]
})
export class SkyToastModule { }
