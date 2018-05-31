import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";
import { LoginComponent } from '../login/login.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }