import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

const SHARED_MODULE_SERVICES: any[] = [
  // SERVICE

  // HTTP

  // Externals

  // Business
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
