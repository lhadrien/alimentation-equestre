import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'alimentation-equestre'
  shouldRun = true

  ngOnInit() {
    console.log('[AppInit]')
  }
}
