import { Injectable } from '@angular/core';
import { AppPolicy } from '../../models/routing/app-routing-models';
import { AuthService } from '../auth/auth.service';

/** @deprecated Use AuthService instead */
@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  /** Wether the account profile has been recovered at least once */
  _isInitialized = false;

  constructor(
    public authSV: AuthService,
  ) {
  }

  isInPolicy(policy: AppPolicy, rol: any) {
    return this.authSV.isInPolicy(policy, rol);
  }
  isInPolicyInstant(policy: AppPolicy, rol: any) {
    return this.isInPolicyInstant(policy, rol);
  }
}
