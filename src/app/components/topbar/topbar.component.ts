import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { faLink, faSlash, faClock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  dateNow: Date;
  faLink = faLink;
  faSlash = faSlash;
  faClock = faClock;

  constructor(public dataService: DataService) { }

  ngOnInit() {
    setInterval(() => {
      this.dateNow = new Date;
    }, 1000);
  }

}
