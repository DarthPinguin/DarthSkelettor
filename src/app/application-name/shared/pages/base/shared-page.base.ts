
import { OnInit } from "@angular/core";
import { ApplicationNameComponent } from "../../../application-name.component";

/**
 * Base class for component pages.
 */
export abstract class SharedPageBase implements OnInit {

  // protected route: ActivatedRoute
    constructor(protected smallWorksiteComponent: ApplicationNameComponent) {

    }

    /**
     * Initializes by subscribing to route data modifications and updating page service data.
     */
    public ngOnInit() {
       // here we can subscribe on data changes or set element like title or userbars with route snapshoot
    }
}
