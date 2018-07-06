
import { Observable } from "rxjs";
import { Injectable, Type } from "@angular/core";

import { User } from "app/application-name/shared/models/view_models/user.model";
import { MyLanguageService } from "app/application-name/shared/services/utils/my-language.service";
import { SessionStorageService, USER_SESSION } from "../utils/session-storage.service";
import { UserWebService } from "app/application-name/shared/services/api/user-web.service";

export abstract class ApplicationService {
      public readonly user: User;
      public readonly currentLang: string;

      public abstract logout(): void;
      public abstract useSessionLang(): void;
      public abstract switchLang(): void;
      // public abstract initUiService(alertComponent: AlertDialogComponent, confirmComponent: ConfirmDialogComponent): void;
      // public abstract showMsg(type: AlertType, msg: string, title?: string): Promise<void>;
      // public abstract showConfirmMsg(type: ConfirmType, msg: string, title?: string): Promise<boolean>;
      // public abstract showNotification(severity: Severity, summary: string, detail: string): void;
}

@Injectable({providedIn: "root"})
export class SharedApplicationService implements ApplicationService {

  public get user(): User {
      return this.storageService.get(USER_SESSION);
  }

  public get currentLang() {
      return this.myLanguageService.currentLang;
  }

  public get currentLanguage$() {
    return this.myLanguageService.currentLanguage$;
  }

  constructor(
      protected myLanguageService: MyLanguageService,
      protected usersWebService: UserWebService,
      protected storageService: SessionStorageService,
      // protected uiService: UIService,
  ) { /* constructor */ }

  public logout(): void {
    this.usersWebService.userDisconnect();
  }

  public switchLang() {
    this.myLanguageService.use(this.myLanguageService.currentLang === "fr" ? "fr" : "nl");
  }

  public useSessionLang() {
    this.myLanguageService.useLocalLang();
  }

//  public initUiService(alertComponent: AlertDialogComponent, confirmComponent: ConfirmDialogComponent): void {
//     this.uiService.alertDialogComponent = alertComponent;
//     this.uiService.confirmDialogComponent = confirmComponent;
//  }

//  public get uiMessages(): Message[] {
//    return this.uiService.messages;
//  }

//  public showNotification(severity: Severity, summary: string, detail: string): void {
//    return this.uiService.showNotification(severity, summary, detail);
// }

//  public showMsg(type: AlertType, msg: string, title?: string): Promise<void> {
//    return this.uiService.showMsg(type, msg, title);
//  }

//  public showConfirmMsg(type: ConfirmType, msg: string,
//                        title?: string,
//                        // tslint:disable-next-line:ban-types
//                        rejectCallBack?: Function): Promise<boolean> {
//    return this.uiService.showConfirmMsg(type, msg, title);
//  }

 public instant(key: string | string[], interpolateParams?: {}): any {
   return this.myLanguageService.instant(key, interpolateParams);
 }

 public get(key: string | string[], interpolateParams?: {}): Observable<any> {
   return this.myLanguageService.get(key, Object);
 }
}
