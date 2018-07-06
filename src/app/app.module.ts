// ANGULAR"s modules
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

// COMPONENTS

// SERVICES

import { ROUTES } from "./app.routes";

import { ROUTES as  SMALL_WORKSITE_ROUTES } from "./application-name/application-name-application.module";
import { AppComponent } from "./app.component";
import { ApplicationNameModule } from "./application-name/application-name.module";

import { SharedModule } from "./application-name/shared/shared.module";
import { ORGANIZATION_SERVICES_CONFIGURATION } from "../environments/configs/configuration";

import { SmallWorksiteRoutingModule } from "./application-name/application-name-application.module";
import { TranslatePoHttpLoader } from "app/application-name/shared/services/common/ngx-translate-po-http-loader";

// AoT requires an exported function for factories
export function HttpPoLoaderFactory(http: HttpClient) {
  return new TranslatePoHttpLoader(http, "assets/i18n", ".po");
}

export const IMPORTS: any[] = [
  BrowserModule,
  BrowserAnimationsModule,

  // HttpModule,
  FormsModule,
  HttpClientModule,

  TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpPoLoaderFactory,
          deps: [HttpClient],
      },
  }),

  SharedModule,
  ApplicationNameModule,
  SmallWorksiteRoutingModule,

   RouterModule.forRoot([...SMALL_WORKSITE_ROUTES, ...ROUTES], { useHash: true }),
  // , enableTracing: true   for route debugging
];

@NgModule({
  imports: [
      ...IMPORTS,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
// ,
// ...AppInitializerProvider.forRoot()

export class AppModule {
 }
