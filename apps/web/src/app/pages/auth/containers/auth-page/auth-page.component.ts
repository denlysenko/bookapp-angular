import { Component } from '@angular/core';

@Component({
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {
  submit($event: any) {
    console.log($event);
  }
}
