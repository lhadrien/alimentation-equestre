import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { environment } from '../environments/environment'
import { provideAnalytics, getAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics'
import { provideAuth, getAuth } from '@angular/fire/auth'
import { provideFirestore, getFirestore } from '@angular/fire/firestore'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatSidenavModule } from '@angular/material/sidenav'
import { NavigationComponent } from './layout/navigation/navigation.component'
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { LoginComponent } from './pages/login/login.component'
import { SignupComponent } from './pages/signup/signup.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { MealsComponent } from './pages/meals/meals.component'
import { FeedsComponent } from './pages/feeds/feeds.component'
import { HorsesComponent } from './pages/horses/horses.component'
import { FormMealComponent } from './pages/meals/form-meal/form-meal.component'
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { MatToolbarModule } from '@angular/material/toolbar'
import { ReactiveFormsModule } from '@angular/forms'
import { CookieService } from 'ngx-cookie-service'
import { ErrorComponent } from './layout/error/error.component'
import { FormHorseComponent } from './pages/horses/form-horse/form-horse.component'
import { MatSliderModule } from '@angular/material/slider'
import { HeaderComponent } from './layout/header/header.component'
import { FormFeedComponent } from './pages/feeds/form-feed/form-feed.component'
import { MatTableModule } from '@angular/material/table'
import { MatSelectModule } from '@angular/material/select'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { HttpClient, HttpClientModule } from '@angular/common/http'

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    MealsComponent,
    FeedsComponent,
    HorsesComponent,
    FormMealComponent,
    ErrorComponent,
    FormHorseComponent,
    HeaderComponent,
    FormFeedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatTableModule,
    MatSelectModule,
  ],
  providers: [ScreenTrackingService, UserTrackingService, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
