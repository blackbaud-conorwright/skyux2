import {
  Component
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'sky-radio-demo',
  templateUrl: './radio-demo.component.html'
})
export class SkyRadioDemoComponent {
  public selectedValue = '3';
  public valueGuy = '2';
  public radioForm: FormGroup;
  public options = [
    { name: 'Lillith Corharvest', disabled: false },
    { name: 'Harima Kenji', disabled: false },
    { name: 'Harry Mckenzie', disabled: true }
  ];

  constructor(
    private fb: FormBuilder
  ) {
    this.radioForm = this.fb.group({
      option: new FormControl(this.options[0])
    });
  }
}
