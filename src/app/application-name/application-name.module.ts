// Angular"s components
import { RouterModule } from "@angular/router";
import { registerLocaleData, CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import localeNl from "@angular/common/locales/nl";
import localeFr from "@angular/common/locales/fr";

// HttpModule,
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

// Module"s components

// Externals"s module

// ENVIRONMENT IMPORT

// SERVICES

// COMPONENTS
import { ApplicationNameComponent } from "./application-name.component";

import { SmallWorksiteRoutingModule } from "./application-name-application.module";
import { SharedModule } from "app/application-name/shared/shared.module";

// ISSUE CLI https://github.com/angular/angular/issues/21809
// https://angular.io/guide/i18n
// the second parameter "fr" is optional
registerLocaleData(localeFr, "fr");
registerLocaleData(localeNl, "nl");

const APPLICATION_NAME_SERVICES: any[] = [
    // SERVICE

    // HTTP

    // Externals

    // Business
];

const APPLICATION_NAME_INJECTED_COMPONENT: any[] = [
  // MODAL

  // SIDEBAR
];

const APPLICATION_NAME_IMPORTS: any[] = [

  // Angular modules
  CommonModule,
  FormsModule, ReactiveFormsModule,
  SmallWorksiteRoutingModule,
  RouterModule,
  HttpClientModule,

  // Application modules

  // Application shared module
  SharedModule,

];

const ORGA_COMPONENTS: any[] = [
  ApplicationNameComponent,

];

const ORGA_PIPES: any[] = [
];

const APPLICATION_NAME_DECLARATIONS: any[] = [
  ...ORGA_COMPONENTS,
  ...ORGA_PIPES,
];

const APPLICATION_NAME_EXPORTS = [
  ...APPLICATION_NAME_DECLARATIONS,
  // SharedModule,
];

const APPLICATION_NAME_PROVIDERS: any[] = [
      ...APPLICATION_NAME_SERVICES,
];

@NgModule({
  declarations: [...APPLICATION_NAME_DECLARATIONS],
  entryComponents: [...APPLICATION_NAME_INJECTED_COMPONENT],
  imports: [...APPLICATION_NAME_IMPORTS],
  exports: [...APPLICATION_NAME_EXPORTS],
  providers: [...APPLICATION_NAME_PROVIDERS],
})
export class ApplicationNameModule {
}
