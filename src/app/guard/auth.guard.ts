import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { KeycloakService, KeycloakAuthGuard } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(protected router: Router, protected keycloakAngular: KeycloakService) {
    super(router, keycloakAngular);
  }

  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this.authenticated) {
        this.keycloakAngular.login();
        return;
      }
      console.log('user role from keyclokes', this.roles);
      console.log('key clock ', this.keycloakAngular);

      const requiredRoles = route.data.roles;
      let keyCloakRole;
      this.roles.forEach(r => {
        if (r === 'Interviewer' || r === 'Recruiter') {
          keyCloakRole = r;
          return;
        }
      });

      localStorage.setItem("role", keyCloakRole);
      localStorage.setItem("email", this.keycloakAngular['_userProfile'].email);
      localStorage.setItem("accessToken", this.keycloakAngular['_instance'].token);

      console.log('token ', this.keycloakAngular['_instance'].token);

      if (!requiredRoles || requiredRoles.length === 0) {
        return resolve(true);
      } else {
        if (!this.roles || this.roles.length === 0) {
          resolve(false);
        }
        let granted: boolean = false;
        // for (const requiredRole of requiredRoles) {
        //   if (this.roles.indexOf(requiredRole) > -1) {
        //     granted = true;
        //     break;
        //   }
        // }
        if (route.data !== undefined) {
          if (this.roles[0] === requiredRoles) {
            granted = true;
          }
          else granted = false;
        }
        else granted = true;
        resolve(granted);
      }
    });
  }
}