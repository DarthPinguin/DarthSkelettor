import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MyLanguageService } from "app/application-name/shared/services/utils/my-language.service";
import { SharedApplicationService } from "./services/common/application.service";
import { UserWebService } from "app/application-name/shared/services/api/user-web.service";
import { PageNotFoundComponent } from "app/application-name/shared/pages/page-not-found/page-not-found.component";

const SHARED_MODULE_SERVICES: any[] = [
  // SERVICE

  // HTTP

  // Externals

  // Business

  // utils
  MyLanguageService,
  SharedApplicationService,
  UserWebService,
];

const SHARED_MODULE_INJECTED_COMPONENT: any[] = [
// MODAL

// SIDEBAR
];

const SHARED_MODULE_IMPORTS: any[] = [
  // Angular
  CommonModule,
];

const SHARED_MODULE_COMPONENTS: any[] = [
  PageNotFoundComponent,
];

const SHARED_MODULE_PIPES: any[] = [
];

const SHARED_MODULE_DECLARATIONS: any[] = [
...SHARED_MODULE_COMPONENTS,
...SHARED_MODULE_PIPES,
];

const SHARED_MODULE_EXPORTS = [
...SHARED_MODULE_DECLARATIONS,
];

const SHARED_MODULE_PROVIDERS: any[] = [
    ...SHARED_MODULE_SERVICES,
];

@NgModule({
  imports: [...SHARED_MODULE_IMPORTS],
  entryComponents: [...SHARED_MODULE_INJECTED_COMPONENT],
  declarations: [...SHARED_MODULE_DECLARATIONS],
  exports: [...SHARED_MODULE_EXPORTS],
  providers: [...SHARED_MODULE_PROVIDERS],
})
export class SharedModule { }
