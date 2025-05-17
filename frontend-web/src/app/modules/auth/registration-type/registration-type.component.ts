import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-type',
  templateUrl: './registration-type.component.html',
  styleUrls: ['./registration-type.component.scss']
})
export class RegistrationTypeComponent {
  constructor(private router: Router) { }

  selectRegistrationType(type: 'school' | 'donor') {
    this.router.navigate([`/register/${type}`]);
  }
}