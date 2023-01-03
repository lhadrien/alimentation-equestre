import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { MenusComponent } from "./pages/menus/menus.component";
import { SignedinGuard } from "./signedin.guard";
import { AddMenuComponent } from "./pages/menus/add-menu/add-menu.component";
import { FeedsComponent } from "./pages/feeds/feeds.component";
import { FeedComponent } from "./pages/feeds/feed/feed.component";
import { MenuComponent } from "./pages/menus/menu/menu.component";
import { AddFeedComponent } from "./pages/feeds/add-feed/add-feed.component";
import { HorsesComponent } from "./pages/horses/horses.component";
import { HorseComponent } from "./pages/horses/horse/horse.component";
import { AddHorseComponent } from "./pages/horses/add-horse/add-horse.component";
import { LoginComponent } from "./pages/login/login.component";
import { SignupComponent } from "./pages/signup/signup.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: '',
    canActivate:[SignedinGuard],
    children: [
      {
        path: 'menus',
        component: MenusComponent,
        children: [
          {
            path: ':id',
            component: MenuComponent,
          },
          {
            path: 'add',
            component: AddMenuComponent,
          },
        ]
      },
      {
        path: 'feeds',
        component: FeedsComponent,
        children: [
          {
            path: ':id',
            component: FeedComponent,
          },
          {
            path: 'add',
            component: AddFeedComponent,
          },
        ]
      },
      {
        path: 'horses',
        component: HorsesComponent,
        children: [
          {
            path: ':id',
            component: HorseComponent,
          },
          {
            path: 'add',
            component: AddHorseComponent,
          },
        ]
      },
      {
        path: 'dashboard',
        component: DashboardComponent },
      {
        path: '**',
        redirectTo: 'dashboard'
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
