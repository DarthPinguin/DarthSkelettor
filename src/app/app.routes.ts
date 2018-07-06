import { Routes } from "@angular/router";
import { PageNotFoundComponent } from "app/application-name/shared/pages/page-not-found/page-not-found.component";

export const ROUTES: Routes = [
    { path: "**", component: PageNotFoundComponent },
];
