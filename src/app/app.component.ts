import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'alimentation-equestre'
  shouldRun = true

  constructor(translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en')
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(translate.getBrowserLang() ?? 'en')
  }

  ngOnInit() {
    console.log('[AppInit]')
  }
}
