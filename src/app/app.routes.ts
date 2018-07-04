import { Routes } from "@angular/router";
import { PageNotFoundComponent } from "./osiris-externals/osiris-commons/pages/page-not-found/page-not-found.component";

export const ROUTES: Routes = [
    { path: "**", component: PageNotFoundComponent },
];
