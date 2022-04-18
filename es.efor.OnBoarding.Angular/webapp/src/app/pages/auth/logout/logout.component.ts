import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private authSV: AuthService,
  ) { }

  ngOnInit(): void {
    this.authSV.logout().then(() => {
      this.router.navigate(['/']);
    });
  }

}
