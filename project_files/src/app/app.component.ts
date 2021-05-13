import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Bill Splitter';

  private userCookie: string;

  constructor(private cookieService: CookieService) {

  }

  ngOnInit(): void {
    this.userCookie = this.cookieService.get("userCookie");
  }
}
