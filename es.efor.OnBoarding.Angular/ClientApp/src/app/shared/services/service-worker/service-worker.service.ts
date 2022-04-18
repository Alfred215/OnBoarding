import { Injectable, ApplicationRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject, interval, concat } from 'rxjs';
import { first } from 'rxjs/operators';
import { DestroySubscriptionsDirective } from '../../models/_basic/destroy-subscriptions';

@Injectable({
  providedIn: 'root'
})
export class ServiceWorkerService extends DestroySubscriptionsDirective {
  private updateAvailable = false;

  onUpdateAvailable = new BehaviorSubject<boolean>(this.updateAvailable);

  private swUpdate: SwUpdate;
  constructor(
    appRef: ApplicationRef,
    updates: SwUpdate
  ) {
    super();
    this.swUpdate = updates;

    const appIsStableListener = appRef.isStable.pipe(first(isStable => isStable === true));
    const intervalListener = interval(5 * 60 * 1000);
    const fullListener = concat(appIsStableListener, intervalListener);

    fullListener.subscribe(() => updates.checkForUpdate().finally(() => { }));

    const s = updates.available.subscribe(() => {
      this.updateAvailable = true;
      this.onUpdateAvailable.next(this.updateAvailable);
    });
    this.subs.push(s);
  }

  updateApp() {
    const p = this.swUpdate.activateUpdate();
    p.then(() => {
      setTimeout(() => {
        document.location.reload();
      }, 1000);
    });
    return p;
  }
}
