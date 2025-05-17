import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front-TechAid';

  donors = [
    {
    id: 'donor-12345',
    email: 'carolmkaysmamba14@gmail.com',
    firstName: 'Carol',
    lastName: 'Mutemi',
    phone: '0712345678',
    organization: 'TechAid',
    organizationId: 'org-12345',
    organizationType: 'NGO',
  },
  {
    id: 'donor-67890',
    email: 'alice@example.com',
    firstName: 'Alice',
    lastName: 'Smith',
    phone: '0723456789',
    organization: 'TechForAll',
    organizationId: 'org-67890',
    organizationType: 'NGO',
  }
]

schools = [
  {
    id: 'school-12345',
    name: 'Greenwood High School',
    location: 'Nairobi, Kenya',
    contactPerson: 'John Doe',
    contactEmail: 'mutemithomas0@gmail.com'
  }
]
}
