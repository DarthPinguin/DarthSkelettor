
import {map} from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { TranslateService } from "@ngx-translate/core";
import * as lodash from "lodash";
import { SessionStorageService, LANG_SESSION } from "app/application-name/shared/services/utils/session-storage.service";

@Injectable({providedIn: "root"})
export class MyLanguageService  {

      public defaultLanguage = "fr";

      public supportedLanguages = {
        FR: "fr",
        NL: "nl",
      };

      public currentLanguage$: Observable<string>;

      constructor(private translateService: TranslateService,
                  private sessionStorageService: SessionStorageService) {
          // constructor
          this.useLocalLang();
          this.currentLanguage$ = this.translateService.onLangChange.pipe(map((event) => event.lang));
      }

      public useLocalLang() {
          this.use(this.sessionStorageService.get(LANG_SESSION) ?
                  this.sessionStorageService.get(LANG_SESSION) :
                  this.defaultLanguage );
      }

      public use(lang: string): Observable<any> {
         let useLang = this.supportedLanguages[lang] ? this.supportedLanguages[lang] : lang;

         if (useLang === undefined || useLang === null) {
            useLang = this.defaultLanguage;
         }
         this.sessionStorageService.set(LANG_SESSION, lang);
         return this.translateService.use(useLang);
      }

      public get currentLangKey() {
        return lodash.findKey(this.supportedLanguages, this.translateService.currentLang);
      }

      public get currentLang() {
        return this.translateService.currentLang ? this.translateService.currentLang : this.defaultLanguage;
      }

      public instant(key: string | string[], interpolateParams?: {}): any {
        return this.translateService.instant(key, interpolateParams);
      }

      public get(key: string | string[], interpolateParams?: {}): Observable<any> {
        return this.translateService.get(key, interpolateParams);
      }

    //  public persist(lang: string, session: boolean = false): Observable<any> {
    //    if (session) {
    //        this.storage.set(LANG_SESSION, lang);
    //    }
    //    return this.use(lang);
    // }
}
