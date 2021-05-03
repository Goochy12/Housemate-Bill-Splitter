import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RetrievalService } from '../retrieval.service';

import { User } from '../types/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User;

  constructor(private route: ActivatedRoute, private retrievalService: RetrievalService, private router: Router) { }

  ngOnInit(): void {

    this.user = this.retrievalService.getUser();

    if (this.user == null) {
      this.router.navigate([""]);
    }

    this.retrievalService.getUserDetails(this.user.id).subscribe(res => {
      if (res) {
        console.log(res);
      }
    });
  }

}
