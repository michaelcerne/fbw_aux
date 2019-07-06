import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.scss']
})
export class StartupComponent implements OnInit {

  selectedPort = new FormControl(this.dataService.lastPort);
  code = 'XXXX';
  codes = ['1312'];

  constructor(public dataService: DataService, public router: Router) { }

  ngOnInit() {
    this.dataService.updatePorts();
  }

  portChange(event) {
    this.dataService.lastPort = event.target.value;
  }

  codeInteracted(event) {
    if (event.target.dataset.id) {
      this.code = this.code.substring(1);
      this.code += event.target.dataset.id;
    }
  }

  start() {
    if (this.dataService.state) {
      this.router.navigate(['main']);
    } else {
      this.dataService.connect(this.selectedPort.value);
    }
  }

}
