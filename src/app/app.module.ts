import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule, Injector } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ShareModule } from './share/share.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserModule } from './user/user.module';
import { JwtModule } from '@auth0/angular-jwt';
import { StartupService } from './services/startup.service';
import { UtilsService } from './services/utils.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects/user.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/reducers/user.reducer';
const JWT_CONFIG = {
  config: {
    tokenGetter: () => localStorage.getItem('access_token')
  },
  // whitelistedDomains: ['localhost:3000']
  whitelistedDomains: ['princend.herokuapp.com']
};

type VoidFuntion = () => void;
export function startupServiceFactory(startupService: StartupService): VoidFuntion { return () => startupService.load(); }

export function createInstrumentOptions() {
  return {
    maxAge: 50,
  };
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ShareModule,
    UserModule,
    JwtModule.forRoot(JWT_CONFIG),
    EffectsModule.forRoot([UserEffects]),
    StoreModule.forRoot(reducer),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument(createInstrumentOptions())
  ],
  providers: [UtilsService, StartupService, {
    provide: APP_INITIALIZER,
    useFactory: startupServiceFactory,
    deps: [StartupService, Injector],
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
