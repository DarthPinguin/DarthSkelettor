import { OnInit, HostBinding } from "@angular/core";
import { Subject } from "rxjs";
import { SharedApplicationService } from "app/application-name/shared/services/common/application.service";

export class ApplicationComponentBase implements OnInit {

  public pheaderTitle;

  public headerTitleSubject: Subject<string> = new Subject();

  public get headerTitle(): string {
    return this.pheaderTitle;
  }

  public set headerTitle(title: string) {
    Promise.resolve().then(() => {
            this.pheaderTitle = title;
            this.headerTitleSubject.next(this.pheaderTitle);
        },
    );
  }

  @HostBinding("class") private bodyClasses = "";
  private commonBodyClasses = ["common-page"]; // no common-page class for now

  constructor(public applicationService: SharedApplicationService) {
    this.applicationService.useSessionLang();
  }

  public ngOnInit(): void {
      //  init
  }

  public setClasses(...classes: string[]) {
    const specificBodyClasses = {};
    classes.forEach((clazz) => specificBodyClasses[clazz] = true);
    Promise.resolve().then(() => this.bodyClasses = this.commonBodyClasses.concat(classes).join(" "));
  }

  public switchLang() {
      this.applicationService.switchLang();
  }

}
