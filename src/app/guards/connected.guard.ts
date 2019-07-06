import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectedGuard implements CanActivate {

  constructor(public dataService: DataService, public router: Router) {}

  canActivate(): boolean {
    if (!this.dataService.state) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

}
