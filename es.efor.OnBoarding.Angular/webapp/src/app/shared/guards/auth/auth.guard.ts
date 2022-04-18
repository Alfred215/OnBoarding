import { Injectable } from '@angular/core';
import {
  CanActivateChild, CanLoad, Route,
  UrlSegment, ActivatedRouteSnapshot,
  RouterStateSnapshot, UrlTree, Router, CanActivate, Data
} from '@angular/router';
import { Observable } from 'rxjs';

import { AppPolicy, PolicyJoinMode, RouteDataWithPolicy } from '../../models/routing/app-routing-models';
import { AuthService } from '../../services/auth/auth.service';


interface ActivatedRouteSnapshotWithPolicy extends ActivatedRouteSnapshot {
  data: RouteDataWithPolicy;
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    public router: Router,
    public authSV: AuthService
  ) { }
  canActivate(
    route: ActivatedRouteSnapshotWithPolicy,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivateChild(route, state, true);
  }

  canActivateChild(
    next: ActivatedRouteSnapshotWithPolicy,
    state: RouterStateSnapshot,
    fromInner = false): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const policy: AppPolicy | undefined | null | AppPolicy[] = next.data && next.data.policy;

    let policyJoinMode = PolicyJoinMode.And;
    if (next.data != null && next.data.policyJoinMode != null) {
      policyJoinMode = next.data.policyJoinMode;
    }
    return this.checkAccess(next.toString(), policy, policyJoinMode);
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    const policy: AppPolicy = route.data && route.data.policy;

    let policyJoinMode = PolicyJoinMode.And;
    if (route.data != null && route.data.policyJoinMode != null) {
      policyJoinMode = route.data.policyJoinMode;
    }
    return this.checkAccess(([''].concat(segments.map(s => s.path))).join('/'), policy, policyJoinMode);
  }

  private async checkAccess(
    path: string, policy?: AppPolicy | undefined | null | AppPolicy[],
    policyJoinMode = PolicyJoinMode.And): Promise<boolean> {

    const token = await this.authSV.tokenSV.getStoredToken();
    if(token == null){ this.router.navigate(['/auth'], { queryParams: { ReturnUrl: path } }); }
    
    let pPermission: Promise<boolean>;
    if (policy == null) {
      pPermission = this.checkAccessByPolicy(null).catch(() => false);
    } else {
      const appPoliciesParam: AppPolicy[] = [];
      if (policy instanceof Array) {
        appPoliciesParam.push(...policy);
      } else if (policy != null) {
        appPoliciesParam.push(policy);
      }
      pPermission = Promise.all(
        appPoliciesParam.map((p) => this.checkAccessByPolicy(p)),
      ).then(r => {
        if (policyJoinMode === PolicyJoinMode.And) {
          return Promise.resolve(r.every(result => result === true));
        } else {
          return Promise.resolve(r.find(result => result === true) != null);
        }
      });
    }
    const results = await Promise.all([pPermission]);
    const canAccess = results.every((success) => success && true);
    if (!canAccess) { this.router.navigate(['/auth'], { queryParams: { ReturnUrl: path } }); }
    return canAccess;
  }

  private async checkAccessByPolicy(policy: AppPolicy | undefined | null): Promise<boolean> {
    const token = await this.authSV.tokenSV.getStoredToken();
    if (policy == null || token == null) {
        return false;
      } else {
        const userRoles = await this.authSV.getUserRol();
        return await this.authSV
          .isInPolicy(policy, userRoles)
          .catch(() => false);
      }

  }
}
