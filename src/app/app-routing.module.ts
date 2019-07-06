import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartupComponent } from './components/startup/startup.component';
import { MainComponent } from './components/main/main.component';
import { ConnectedGuard } from './guards/connected.guard';

const routes: Routes = [
    {
      path: '',
      component: StartupComponent
    },
    {
      path: 'main',
      component: MainComponent,
      canActivate: [ConnectedGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
