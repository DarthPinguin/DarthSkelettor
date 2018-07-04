import { HttpClient } from "@angular/common/http";
import { TranslateLoader } from "@ngx-translate/core";
import * as gettext from "gettext-parser";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export class TranslatePoHttpLoader implements TranslateLoader {

 /**
	 * Translation domain
	 */
  public domain = "";

  constructor(
    protected phttp: HttpClient,
    protected pprefix: string = "i18n",
    protected psuffix: string = ".po",
  ) {
  }

 /**
	 * Gets the translations from file
	 * @param lang
	 * @returns {any}
	 */
  public getTranslation(lang: string): Observable<any> {
    return this.phttp
      .get(`${this.pprefix}/${lang}${this.psuffix}`, { responseType: "text" })
      .pipe(map((contents: string) => this.parse(contents)));
  }

  public parse(contents: string): any {
    const translations: { [key: string]: string } = {};

    const po = gettext.po.parse(contents, "utf-8");
    if (!po.translations.hasOwnProperty(this.domain)) {
        return translations;
    }

    Object.keys(po.translations[this.domain])
      .forEach((key) => {
        const translation: string = po.translations[this.domain][key].msgstr.pop();
        if (key.length > 0 && translation.length > 0) {
          translations[key] = translation;
        }
      });

    return translations;
    }

}
