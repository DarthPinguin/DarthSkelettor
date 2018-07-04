import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ApplicationNameComponent } from "./application-name.component";
import { ConstantsRouting } from "app/application-name/shared/services/utils/routing.config";

export const ROUTES: Routes = [

  {
    path: "",
    component: ApplicationNameComponent,
    children: [
      {
        path: ConstantsRouting.LOGIN,
        loadChildren: "app/application-name/dashboard/dashboard.module#DashboardModule",
      },
      {
        path: ConstantsRouting.HOME,
        loadChildren: "app/application-name/board/board.module#BoardModule",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class SmallWorksiteRoutingModule { }
