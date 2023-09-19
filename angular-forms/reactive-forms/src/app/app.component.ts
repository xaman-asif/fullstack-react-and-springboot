import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  registrationForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),

    address: new FormGroup({
      city: new FormControl(''),
      state: new FormControl(''),
      postalCode: new FormControl(''),
    })
  });

  loadApiData() {
    this.registrationForm.setValue({
      userName: 'John',
      password: '12345',
      confirmPassword: '12345',

      address: {
        city: 'Dhaka',
        state: 'Dhaka',
        postalCode: '0000'
      }
    })
  }
}
