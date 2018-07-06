
import {tap,  catchError, map, share} from "rxjs/operators";
import { Inject } from "@angular/core";
import {
    HttpClient,
    HttpErrorResponse,
    HttpEvent,
    HttpHeaders,
    HttpParams,
    HttpResponse,
} from "@angular/common/http";

export const CONTENT_TYPE_HEADER = "Content-Type";
export const CONTENT_TYPE_VALUE = "application/json";
export const CLIENT_TIMESTAMP = "Client-Timestamp";
export const CLIENT_AUTH = "authorization";
export const CLIENT_TANSACTION_ID = "transactionId";
export const CLIENT_AUTHENTICATION = "Authorization";
export const CLIENT_LANGUAGE = "language";

import { Observable } from "rxjs";
import { of } from "rxjs/internal/observable/of";

import { MyLanguageService } from "../../utils/my-language.service";
import { SessionStorageService, TOKEN } from "../../utils/session-storage.service";
import { RedirectService } from "app/application-name/shared/services/utils/redirect.service";

export class MyRequestOptions {
  public headers?: HttpHeaders | {
              [header: string]: string | string[];
            };
  public params: HttpParams;
}

export class BaseWebService {
  protected baseUrl: string;
  protected noContentType: boolean;
  constructor(
    @Inject(HttpClient) protected http: HttpClient,
    @Inject(MyLanguageService) protected langService: MyLanguageService,
    @Inject(RedirectService) protected redirectService: RedirectService,
    // @Inject(UIService) protected uiService: UIService,
    @Inject(SessionStorageService) protected sessionStorage: SessionStorageService,
  ) {
    // here you coud set your global baseUrl, if you don't have any global one, just set the baseurl in each class extending baseWebService
    // this.baseUrl = this.config.basePath;
  }

  /**  @description Build the complete url for the webservice.
   *   @param {string} urlService : The url of the webservice
   *   @return {string} The complete URL to call webservice
   */
  public buildUrl(serviceUrl: string): string {
    return this.baseUrl + serviceUrl;
  }

  /**
   * Get http method
   * @param serviceUrl  Observable<HttpEvent<T>>
   * @param options
   */
  public get<T>(serviceUrl: string, options?: any): Observable<HttpResponse<T>> {
    return this.http.get<T>(this.buildUrl(serviceUrl), this.buildOptions(options))
    .pipe(
        share(),
      //  retry(3), // coud wif your backend doesn't use interaction ID
        map((event) => event as HttpResponse<T>),
       //  catchError(this.errorHandler)  // FIXME WHY this.uiservice isn"t define when i catch error
    ).pipe(catchError((error: HttpErrorResponse) => {
      return this.errorHandler(error);
     }));
  }
  /**
   * Post http service
   * @param serviceUrl
   * @param data
   * @param options
   */
  public post<T>(serviceUrl: string, data?: T, options?: any): Observable<HttpEvent<T>> {
    return this.http.post<T>(this.buildUrl(serviceUrl), data, this.buildOptions(options))
    .pipe(
        share(),
        // retry(3),
        map((event) => event as HttpResponse<T>),
        // catchError(this.errorHandler)
    ).pipe(catchError((error: HttpErrorResponse) => {
      return this.errorHandler(error);
     }));
  }
  /**
   * Put http service
   * @param serviceUrl
   * @param data
   * @param options
   */
  public put<T>(serviceUrl: string, data?: T, options?: any): Observable<HttpEvent<T>> {
    return this.http.put<T>(this.buildUrl(serviceUrl), data, this.buildOptions(options)).pipe(
        share(),
       // retry(3),
        map((event) => event as HttpResponse<T>),
        // catchError(this.errorHandler)
    ).pipe(catchError((error: HttpErrorResponse) => {
      return this.errorHandler(error);
     }));
  }
  /**
   * Delete http service
   * @param serviceUrl
   * @param data
   * @param options
   */
  public delete<T>(serviceUrl: string, options?: any): Observable<HttpEvent<T>> {
    return this.http.delete<T>(this.buildUrl(serviceUrl), this.buildOptions(options)).pipe(
        share(),
      //  retry(3),
        map((event) => event as HttpResponse<T>),
      //  catchError(this.errorHandler)
    ).pipe(catchError((error: HttpErrorResponse) => {
      return this.errorHandler(error);
     }));
  }
  /**
   * @description build the options
   * @param headers
   */
  protected buildOptions(options?: any): any {
    options = this.fillOptionsWithHeaders(options);

    // options.observer = "response";

    // set headers
    const debug = options.headers.get(CONTENT_TYPE_HEADER);
    if (!this.noContentType) {
      if (!options.headers.has(CONTENT_TYPE_HEADER)) {
        options.headers = options.headers.append(CONTENT_TYPE_HEADER, CONTENT_TYPE_VALUE);
      }
    } else {
      options.headers.set(CONTENT_TYPE_HEADER, undefined);
    }
    this.noContentType = false;

    if (!options.headers.has(CLIENT_TIMESTAMP)) {
      options.headers = options.headers.append(CLIENT_TIMESTAMP, this.getDateNow());
    }
    if (!options.headers.has(CLIENT_TANSACTION_ID)) {
      options.headers = options.headers.append(CLIENT_TANSACTION_ID, this.newGuid());
      options.headers.transactionId = "sdqdq";
    }
    if (!options.headers.has(CLIENT_LANGUAGE)) {
      options.headers = options.headers.append(CLIENT_LANGUAGE, this.langService.currentLang);
    }

    let auto = null;

    if (this.sessionStorage.get(TOKEN)) {
      const token = this.sessionStorage.get(TOKEN);
      auto = "bearer " + token.access_token;
    }
    if (auto) {
      // always refresh the token
      options.headers = options.headers.set(CLIENT_AUTHENTICATION, auto);
    }

    return options;
  }

  private fillOptionsWithHeaders(options?: MyRequestOptions) {
    if (!options) {
      options = new MyRequestOptions();
      options.headers = new HttpHeaders();
    }
    if (!options.headers) {
      options.headers = new HttpHeaders();
    }
    return options;
  }

  /** @description Return the actual date
   *   @return {string} Today"s date
   */
  private getDateNow(): string {
    return new Date().toUTCString();
  }

  private newGuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      // tslint:disable-next-line:one-variable-per-declaration
      const r = Math.random() * 16 | 0, v = c === "x" ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  private responseHandler<T>(httpRequest: Observable<HttpResponse<T>>, options?: any): Observable<HttpResponse<T>> {
    return httpRequest.pipe(map((res) => {
        return res;
      }),
      tap(
        (data) => { this.successHandler(data); },
        (err) => { this.errorHandler(err); },
      ),
    );
  }

  private successHandler(data: any): void {
    // do nithing, yet
  }

  private errorHandler(error: HttpErrorResponse): Observable<any> {

    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      switch (error.status) {
        // case 0: // service down
        //   this.uiService.showError(this.langService.instant(_("COMMONS.INTERNAL_ERROR")),
        //   this.langService.instant(_("COMMONS.HTTP_ERROR")) + error.status.toString(), true);
        //   break;
        case 401:
        this.redirectService.redirect();
        break;
        // case 403:
        //   this.uiService.showError(this.langService.instant(_("COMMONS.ACCESS_DENIED")),
        //   this.langService.instant(_("COMMONS.HTTP_ERROR")) + error.status.toString());
        //   break;
        // case 404:
        //   this.uiService.showError(this.langService.instant(_("COMMONS.NOT_FOUND")),
        //   this.langService.instant(_("COMMONS.HTTP_ERROR")) + error.status.toString());
        //   break;
        // case 460:
        //   this.uiService.showError(this.langService.instant(_("COMMONS.MISSING_TRANSACTION_ID")),
        //   this.langService.instant(_("COMMONS.HTTP_ERROR")) + error.status.toString());
        //   break;
        // case 461:
        //   this.uiService.showError(this.langService.instant(_("COMMONS.INVALID_DATA")),
        //   this.langService.instant(_("COMMONS.HTTP_ERROR")) + error.status.toString());
        //   break;
        // case 462:
        //   this.uiService.showError(this.langService.instant(_("COMMONS.MISSING_DATA")),
        //   this.langService.instant(_("COMMONS.HTTP_ERROR")) + error.status.toString());
        //   break;
        // case 463:
        //   this.uiService.showError(this.langService.instant(_("COMMONS.TRANSACTION_ID_ALREADY_EXIST")),
        //   this.langService.instant(_("COMMONS.HTTP_ERROR")) + error.status.toString());
        //   break;
        // case 500:
        //   this.uiService.showError(this.langService.instant(_("COMMONS.INTERNAL_ERROR")),
        //   this.langService.instant(_("COMMONS.HTTP_ERROR")) + error.status.toString(), true);
        //   break;
        // case 503:
        //   this.uiService.showError(this.langService.instant(_("COMMONS.INTERNAL_ERROR")),
        //   this.langService.instant(_("COMMONS.HTTP_ERROR")) + error.status.toString(), true);
        //   break;
        // case 464:
        //   this.uiService.showError(this.langService.instant(_("COMMONS.DUPLICATED_DATA")),
        //   this.langService.instant(_("COMMONS.HTTP_ERROR")) + error.status.toString());
        //   break;
        // case 465:
        //   this.uiService.showError(error.error.Message,
        //   this.langService.instant(_("COMMONS.HTTP_ERROR")) + error.status.toString());
        //   break;
        default:
          throw(error);
      }
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
      throw(error);
    }

    // ...optionally return a default fallback value so app can continue (pick one)
    // which could be a default value
    // return Observable.of<any>({my: "default value..."});
    // or simply an empty observable
    return of<any>(false);
  }

}
