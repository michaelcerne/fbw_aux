import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { faLink, faSlash, faClock, faHourglass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  faLink = faLink;
  faSlash = faSlash;
  faClock = faClock;
  faHourglass = faHourglass;

  constructor(public dataService: DataService) { }

  ngOnInit() {
  }

  roundToTens(N: number) {
    return Math.ceil(N / 10) * 10;
  }
}
