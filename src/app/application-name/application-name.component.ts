
import {
    AfterViewInit,
    Component,
} from "@angular/core";
import { ApplicationService } from "./shared/services/common/application.service";
import { ApplicationComponentBase } from "./shared/components/application-component.base";

@Component({
  selector: "app-application-name-root",
  templateUrl: "./application-name.component.html",
})
export class ApplicationNameComponent extends ApplicationComponentBase implements AfterViewInit {

  constructor(public appService: ApplicationService) {
    super(appService);
    // set default
  }

  public ngAfterViewInit(): void {
    // this.applicationService.initUiService(this.alertComponent,
    //   this.confirmComponent
    // );
  }

}
