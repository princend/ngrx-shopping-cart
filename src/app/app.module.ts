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
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store';
import { CustomeSerializer } from './store/reducers/router.reducer';
import { RouterEffects } from './store/effects/router.effects';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { EntityStoreModule } from './store/entity-store.module';
const JWT_CONFIG = {
  config: {
    tokenGetter: () => localStorage.getItem('access_token')
  },
  // whitelistedDomains: ['localhost:3000']
  whitelistedDomains: ['princend.herokuapp.com','localhost:3000']
};

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  // root: 'https://princend.herokuapp.com/api',
  root: 'http://localhost:3000/api',
  entityHttpResourceUrls:{
    Report:{
      // entityResourceUrl: `reports`,
      entityResourceUrl: `http://localhost:3000/api/reports`,
      // collectionResourceUrl:`https://princend.herokuapp.com/api/reports`
      collectionResourceUrl:`http://localhost:3000/api/reports`
    }
  },
  timeout: 3000, // request timeout
}

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
    JwtModule.forRoot(JWT_CONFIG),
    EffectsModule.forRoot([UserEffects]),
    EffectsModule.forFeature([RouterEffects]),
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 50 }),
    NgxSpinnerModule,
    EntityDataModule.forRoot(entityConfig),
    EntityStoreModule
  ],
  providers: [UtilsService, StartupService, {
    provide: APP_INITIALIZER,
    useFactory: startupServiceFactory,
    deps: [StartupService, Injector],
    multi: true
  },
    { provide: RouterStateSerializer, useClass: CustomeSerializer },
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
