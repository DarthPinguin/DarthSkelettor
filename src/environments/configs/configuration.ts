import { environment } from "../environment";
import { ServicesConfig } from "../../app/osiris-externals/osiris-commons/services/config";

/**
 * See osiris-commons/README.md about its purpose and how to use it.
 */
export const ORGANIZATION_SERVICES_CONFIGURATION: ServicesConfig = {
  accessToken: environment.clientSecret,
  basePath:  environment.USER_API_BASE_PATH,
};
