import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header-admin',
	templateUrl: './header-admin.component.html',
	styleUrls: [ './header-admin.component.css' ]
})
export class HeaderAdminComponent implements OnInit {
	constructor() {}

	ngOnInit() {}

}
