import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user/user-components/user-list/user-list.component';
import { UserUpsertComponent } from './user/user-components/user-upsert/user-upsert.component';

var pre_url = 'user/';
const routes: Routes = [
  {
    path: '',
    redirectTo: pre_url+'user-list',
    pathMatch: 'full',
  },
  {
    path: pre_url+'user-upset',
    component: UserUpsertComponent,
  },
  {
    path: pre_url+'user-list',
    component: UserListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
