import { Component } from '@angular/core'

class Food {}

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss'],
})
export class FeedsComponent {
  selectedFood: Food | undefined
}
