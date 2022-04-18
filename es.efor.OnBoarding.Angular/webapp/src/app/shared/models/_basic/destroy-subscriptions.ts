import { Directive, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DestroySubscriptions as OriginalDestroySubscriptions } from 'ax-toolbox';

/**
 * @deprecated use `DestroySubscriptions` from `ax-toolbox` instead
 */
@Directive()
export class DestroySubscriptionsDirective extends OriginalDestroySubscriptions implements OnDestroy {
    ngOnDestroy() {
        super.ngOnDestroy();
        this.subs.forEach((s) => s.unsubscribe());
    }
}
