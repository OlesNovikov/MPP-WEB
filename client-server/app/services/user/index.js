import { RegistrationService } from "./registration.js";
import { LoginService } from "./login.js";

export const userServices = {
    registration: new RegistrationService(),
    login: new LoginService()
};