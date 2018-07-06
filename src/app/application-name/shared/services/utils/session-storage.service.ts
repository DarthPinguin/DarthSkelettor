import { Injectable } from "@angular/core";

/** Property key for all session data */
export const SESSION = "SESSION";
/** Property key for user data */
export const USER_SESSION = "user";
/** Property key for used lang */
export const LANG_SESSION = "lang";
/** Property key for token */
export const TOKEN = "token";

@Injectable({providedIn: "root"})
export class SessionStorageService {

  protected storage: Storage;
  protected session: { [key: string]: any[] };
  protected keys: string[];

  constructor() {
      this.init();
  }

  /**
   * Retrieve data from current session by given property key.
   * Please use exported constant from session.service.
   * @param {string} property - constant session used to retrieve data from current session
   */
  public get(property: string): any {
      const data: any = this.session[property];
      return data ? data : null;
  }

  /**
   * Store given value into current session by given property key.
   * @param {string} property - property constant session used to store data into current session
   * @param {any} value - data to store
   */
  public set(property: string, value: any): SessionStorageService {
      if (this.keys.every((key) => key !== property)) {
          this.keys.push(property);
      }
      this.session[property] = value;
      this.persist(property, value);
      return this;
  }

  public remove(key: string): any {
    this.session[key] = null;
    this.keys.splice(this.keys.indexOf(key), 1);
    this.storage.removeItem(key);
  }

  /**
   * Persist the whole current session data into browser SessionStorage.
   * Be aware that data is stored/retrieved as JSON Plain Object. After retrieval, objects from
   * SessionStorage must be constructed back into their original class.
   */
  public persist(property: string, value: any) {
      this.storage.setItem(SESSION, JSON.stringify(this.keys));
      this.storage.setItem(property, JSON.stringify(value));
  }

  public clear() {
      this.keys = [];
      this.session = {};
      this.storage.clear();
  }

  /**
   * Initialize current session by :
   * - retrieving data from browser SessionStorage.
   */
  private init() {
      if (!this.storage) {
        this.storage = sessionStorage;
      }
      this.keys = JSON.parse(this.storage.getItem(SESSION));

      if (!this.keys) {
          this.keys = [];
      }
      this.session = {};
      // this.keys.forEach((key) => this.session[key] = this.storage.retrieve(key));
      this.keys.forEach((key) =>  {
        try {
          this.session[key] = JSON.parse(this.storage.getItem(key));
        } catch (error) {
          // the object correctly save in session with this osiris storage service will be carrectly retrieve on init
          // otherwise no
        }
      });
  }
}
