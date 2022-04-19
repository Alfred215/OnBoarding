import { ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import { INavData } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { freeSet } from '@coreui/icons';
import { DestroySubscriptions } from 'ax-toolbox';
import { navByRoles } from 'src/app/shared/models/routing/nav-routing';




@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [IconSetService]
})
export class MainComponent extends DestroySubscriptions implements OnInit, OnDestroy {
  constructor(
    public cdRef: ChangeDetectorRef,
    public router: Router,
    public translateSv: TranslateService,
    public bsLocaleService: BsLocaleService,
    public iconSet: IconSetService
  ) {

    super();
    this._copyrightYear = (new Date()).getFullYear();
    iconSet.icons = { ...freeSet };

    this.fillNav();
  }

  public sidebarMinimized = false;

  _menuOpenned = false;
  _faSignOutAlt = faPowerOff;
  _faUser = faUser;
  _copyrightYear: number;
  _userName: string;
  _faInfo = faInfoCircle;

 // Ejemplo de como montar la navegación para coreUI
  navMenuItems: INavData[] = [];

  

  

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      distinctUntilChanged(),
    ).subscribe(() => {
    });
    this.initRouterListeners();
    this.initLangListeners();

    const s = this.translateSv.onLangChange.subscribe(() => {
      this.fillNav();
    });
    this.subs.push(s);


  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  // Genera navegación respecto al Rol del Usuario
  async fillNav() {
    this.navMenuItems = [];
    navByRoles.sort((a, b) => a.order - b.order);
    for (const navItem of navByRoles) {
      const newItem: INavData = {};
      if (navItem.roles.length === 0 ) {
        newItem.name = this.translateSv.instant(navItem.name);
        newItem.url = navItem.url;
        newItem.icon = navItem.icon;
        if (navItem.childsWithRole != null) {
          newItem.children = [];
          navItem.childsWithRole.sort((a, b) => a.order - b.order);
          for (const navChildItem of navItem.childsWithRole) {
            const newChildItem: INavData = {};
            newChildItem.name = this.translateSv.instant(navChildItem.name);
            newChildItem.url = navChildItem.url;
            newChildItem.icon = navChildItem.icon;
            if (navChildItem.roles.length === 0 ) {
              newItem.children.push(newChildItem);
            }
          }
        }
        this.navMenuItems.push(newItem);
      }
    }
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  /*
  logout() {
    this.authSV.logout().then(() => {
      this.router.navigate(['/auth']);
    });
  }*/

  private initRouterListeners() {
    const s = this.router.events
      .pipe(filter(e => e instanceof NavigationStart), debounceTime(100))
      .subscribe((data) => {
        this._menuOpenned = false;
      });
    this.subs.push(s);
  }

  private initLangListeners() {
    this.bsLocaleService.use('es');
    const s = this.translateSv.onLangChange
      .subscribe((data: LangChangeEvent) => {
        this.bsLocaleService.use(data.lang);
      });
    this.subs.push(s);
  }
}
