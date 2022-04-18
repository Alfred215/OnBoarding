import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService as AccountService } from '../../api/services';
import { AppPolicy } from '../../models/routing/app-routing-models';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /** Wether the account profile has been recovered at least once */
  _isInitialized = false;


  constructor(
    public accSV: AccountService,
    public tokenSV: TokenService,
  ) { }




  async logout() {
    // JWT does not need to call to server. Instead, just
    // delete the JWT token.

    //await this.accSV.apiAccountLogoutPost().pipe(first()).toPromise();

    // // JWT
    this.tokenSV.setStoredToken(null);
    
  }

  async getUserRol(): Promise<string[]> {
    try{
      const data = await this.tokenSV.getStoredToken();
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(data.token);
      const roles = [];
      const rolesTemp = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      if (!Array.isArray(rolesTemp)){
        roles.push(rolesTemp);
      }else{
        for ( const d of rolesTemp){
          roles.push(d);
        }
      }
      return roles;
    } catch {
      return [];
    }
   
  }

  async isInPolicy(policy: AppPolicy, roles: string[]) {
    const isInPolicy = this.isInPolicyInstant(policy, roles);
    return isInPolicy;
  }

  isInPolicyInstant(policy: AppPolicy, roles: string[]) {
    return roles.some(r => r.toString() === policy.toString());
  }
}
