import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { MenusComponent } from './pages/menus/menus.component'
import { SignedinGuard } from './signedin.guard'
import { AddMenuComponent } from './pages/menus/add-menu/add-menu.component'
import { FeedsComponent } from './pages/feeds/feeds.component'
import { MenuComponent } from './pages/menus/menu/menu.component'
import { HorsesComponent } from './pages/horses/horses.component'
import { LoginComponent } from './pages/login/login.component'
import { SignupComponent } from './pages/signup/signup.component'
import { SignedoutGuard } from './signedout.guard'

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [SignedoutGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: '',
    canActivate: [SignedinGuard],
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
        ],
      },
      {
        path: 'feeds',
        component: FeedsComponent,
      },
      {
        path: 'horses',
        component: HorsesComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
