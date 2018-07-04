
import { Observable } from "rxjs";
import { Injectable, Type } from "@angular/core";
import { USER_SESSION, StorageService } from "app/osiris-externals/osiris-commons/services/utils/storage.service";
import { OsirisLanguageService } from "app/osiris-externals/osiris-commons/services/utils/language.service";
import { User } from "app/osiris-externals/osiris-commons/models/view/User";

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
export class CommonApplicationService implements ApplicationService {

  public get user(): User {
      return this.storageService.get(USER_SESSION);
  }
  public get currentLang() {
      return this.osiLangService.currentLang;
  }

  public get currentLanguage$() {
    return this.osiLangService.currentLanguage$;
  }

  constructor(
      protected osiLangService: OsirisLanguageService,
      protected usersWebService: UserService,
      protected storageService: StorageService,
      // protected uiService: UIService,
  ) { /* constructor */ }

  public logout(): void {
    this.usersWebService.userDisconnect();
  }

  public switchLang() {
    this.osiLangService.use(this.osiLangService.currentLang === "fr" ? "fr" : "nl");
  }

  public useSessionLang() {
    this.osiLangService.useLocalLang();
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
   return this.osiLangService.instant(key, interpolateParams);
 }

 public get(key: string | string[], interpolateParams?: {}): Observable<any> {
   return this.osiLangService.get(key, Object);
 }
}
