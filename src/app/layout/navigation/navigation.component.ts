import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  links: { link: string, label: string, icon: string }[] = [
    {
      link: 'dashboard',
      label: 'Dashboard',
      icon: 'home'
    },
    {
      link: 'menus',
      label: 'Menus',
      icon: 'event note'
    },
    {
      link: 'horses',
      label: 'Mes chevaux',
      icon: 'gite'
    },
    {
      link: 'feeds',
      label: 'Aliments',
      icon: 'cookie'
    }
  ];
}
