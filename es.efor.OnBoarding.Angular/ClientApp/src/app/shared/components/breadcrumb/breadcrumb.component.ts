import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DestroySubscriptions } from 'ax-toolbox';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter, first, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent
  extends DestroySubscriptions
  implements OnInit {
  breadcrumbs = new BehaviorSubject<any[]>([]);

  constructor(
    public router: Router,
    public aRoute: ActivatedRoute,
  ) {
    super();
    this.initRouteListenerAsync();
  }

  ngOnInit(): void {
  }

  private async initRouteListenerAsync() {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(e => {
      const breadcrumbs = [];
      let breadcrumbIndex = 0;

      let currentRoute = this.aRoute.root;
      let url = '';
      do {
        const childrenRoutes = currentRoute.children;
        currentRoute = null;
        childrenRoutes.forEach((route, rIndex) => {
          if (route.outlet === 'primary') {
            const routeSnapshot = route.snapshot;
            url += '/' + routeSnapshot.url.map(segment => segment.path).join('/');
            const bc = {
              label: route.snapshot.data || {},
              url
            };

            if (breadcrumbs.length === 0) {
              breadcrumbs.push(bc);
              breadcrumbIndex++;
            } else {
              const previous = breadcrumbs[breadcrumbIndex - 1];
              if (previous.label.title === bc.label.title){
                // previous.url = bc.url;
              } else {
                breadcrumbs.push(bc);
                breadcrumbIndex++;
              }
            }
            currentRoute = route;
          }
        });
      } while (currentRoute);

      this.breadcrumbs.next(breadcrumbs);
    });
  }
}
