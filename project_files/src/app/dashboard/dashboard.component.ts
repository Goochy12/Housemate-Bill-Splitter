import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RetrievalService } from '../retrieval.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Input() id: number = 1;

  first_name: string;
  surname: string;
  display_name: string;

  constructor(private route: ActivatedRoute, private retrievalService: RetrievalService, private router: Router) { }

  ngOnInit(): void {
    this.retrievalService.getUserDetails(this.id).subscribe(res => {
      if (res) {
        this.first_name = res["first_name"];
        this.surname = res["surname"];
        this.display_name = res["display_name"];
      }
    });
  }

}
