
import { Injectable } from "@angular/core";
import { SessionStorageService } from "./session-storage.service";

@Injectable({providedIn: "root"})
export class RedirectService {

  constructor(private  SessionStorage: SessionStorageService) {
    // constructor
  }

  // forn now, only used in 401 case add params if you wanna change this.
  public redirect(dontClearStorage?: boolean) {
    // here we coud clear sessions
    // for now i"ll clear session and redirect
    if (!dontClearStorage) {
      this. SessionStorage.clear();
    }

    window.location.href = "/";
  }

}
