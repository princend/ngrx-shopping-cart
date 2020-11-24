import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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
import { StoreModule } from '@ngrx/store';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store/';
import { StoreDevtoolsModule } from '@ngrx/store-devtools/';
import { reducers } from './store';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReportEffects } from './store/effects/report.effects';
import { RouterEffects } from './store/effects/router.effects';
import { CustomeSerializer } from './store/reducers/router.reducer';

const JWT_CONFIG = {
  config: {
    tokenGetter: () => localStorage.getItem('access_token')
  },
  // whitelistedDomains: ['localhost:3000']
  whitelistedDomains: ['princend.herokuapp.com']
};

type VoidFuntion = () => void;
export function startupServiceFactory(startupService: StartupService): VoidFuntion { return () => startupService.load(); }

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
    NgxSpinnerModule,
    JwtModule.forRoot(JWT_CONFIG),
    EffectsModule.forRoot([UserEffects]),
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 50 }),
    EffectsModule.forFeature([ReportEffects, RouterEffects])
  ],
  providers: [UtilsService, StartupService, {
    provide: APP_INITIALIZER,
    useFactory: startupServiceFactory,
    deps: [StartupService, Injector],
    multi: true
  },
    { provide: RouterStateSerializer, useClass: CustomeSerializer },
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
