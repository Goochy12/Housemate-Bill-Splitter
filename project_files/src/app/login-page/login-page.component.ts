import { Component, OnInit } from '@angular/core';
import { RetrievalService } from '../retrieval.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  username: string = null;
  password: string = null;

  loading: boolean = false;

  hidePassword: boolean = true;

  constructor(private route: ActivatedRoute, private retrievalService: RetrievalService, private router: Router) { }

  ngOnInit(): void {
    var userCookie = localStorage.getItem("userCookie");
    if (userCookie) {
      this.retrievalService.createUser(Number(userCookie));
      this.getUserDetails(Number(userCookie));
      this.router.navigate(['dashboard']);
    }
  }

  buttonOnSelect() {
    this.loading = true;
    this.retrievalService.authenticate(this.username, this.password).subscribe(authRes => {
      if (authRes) {
        if (authRes["exists"]) {
          this.retrievalService.createUser(authRes['id']);
          this.getUserDetails(authRes['id']);
          localStorage.setItem('userCookie', authRes['id']);
          this.router.navigate(['dashboard']);
        }
      } else {
        console.log(false);
      }
    })
  }

  getUserDetails(id: Number) {
    this.retrievalService.getUserDetails(id).subscribe(detailsRes => {
      this.retrievalService.setUserDetails(null, detailsRes[0]['first_name'], detailsRes[0]['surname'], detailsRes[0]['display_name'], detailsRes[0]['group_id']);
    });
  }

}
