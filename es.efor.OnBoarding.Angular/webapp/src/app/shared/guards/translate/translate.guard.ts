import { Injectable } from '@angular/core';
import {
  CanActivate, CanActivateChild, ActivatedRouteSnapshot,
  RouterStateSnapshot, UrlTree, CanLoad, Router, ParamMap,
  UrlSegment, Route
} from '@angular/router';
import { Observable } from 'rxjs';
//#region Angular locales
import { registerLocaleData } from '@angular/common';
import localeEN from '@angular/common/locales/en-GB';
import localeES from '@angular/common/locales/es';
//#endregion
//#region Boostrap locales
import { defineLocale } from 'ngx-bootstrap/chronos';
import {
  esLocale,
  enGbLocale
} from 'ngx-bootstrap/locale';
//#endregion

import { TranslateService } from '@ngx-translate/core';
import { SeoService } from '../../services/seo/seo.service';


//#region LANGUAGE DECLARATIONS - KEEP THIS UPDATED
// Every key should be present at FRONTEND_LANG_CODES.
// If missing, LANGUAGES[LANGUAGE_DEFAULT] will be used.
export const LANGUAGES: AppLangBsLang = {
  es: { angular: localeES, bootstrap: esLocale },
  en: { angular: localeEN, bootstrap: enGbLocale },
};
export const LANGUAGE_CODES = Object.keys(LANGUAGES);
export const LANGUAGE_DEFAULT = LANGUAGE_CODES[0];
// npm run translate will pick these values.
// see https://github.com/biesbjerg/ngx-translate-extract for more info.
// Dont't attempt to get the function inside a for loop: it won't work.
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
marker('LANG.ES');
marker('LANG.EN');
marker('LANG.ES_SHORT');
marker('LANG.EN_SHORT');

import { markApiErrorStrings } from '../../models/api-translations/api-translations';
// Keep this function's content updates
markApiErrorStrings();
//#endregion


export const LANG_ROUTE_MARKER = ':navLangCode';

@Injectable({
  providedIn: 'root'
})
export class TranslateGuard implements CanActivate, CanActivateChild, CanLoad {
  private _isLangInitialized = false;
  constructor(
    public translateSV: TranslateService,
    public seoSV: SeoService,
    public router: Router,
  ) {
    this.registerLocales();
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    let segment = segments.find((s) => s.parameterMap.has(LANG_ROUTE_MARKER));
    if (segment == null) {
      segment = new UrlSegment('', {});
    }
    return this.isLangParamMapInitialized(segment.parameterMap);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isLangInitialized(next);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isLangInitialized(next);
  }

  private registerLocales() {
    const defLang = LANGUAGES[LANGUAGE_DEFAULT];
    if (!defLang.angular || !defLang.bootstrap) {
      throw new Error('Default language is missing some definitions.');
    }

    for (const l of Object.keys(LANGUAGES)) {
      const lang = LANGUAGES[l];
      const ang = lang.angular || defLang.angular;
      const bs = lang.bootstrap || defLang.bootstrap;

      registerLocaleData(ang, l);
      defineLocale(l, bs);
    }
  }


  private isLangInitialized(next: ActivatedRouteSnapshot) {
    return this.isLangParamMapInitialized(next.paramMap);
  }
  private isLangParamMapInitialized(paramMap: ParamMap) {
    return new Promise<boolean>((resolve) => {
      if (this._isLangInitialized) {
        resolve(true);
        return;
      }

      let langCode = paramMap.get(LANG_ROUTE_MARKER);
      if (langCode == null) { langCode = LANGUAGE_DEFAULT; }

      const s = this.translateSV.use(langCode)
        .subscribe(() => {
          this.translateSV.addLangs(LANGUAGE_CODES);
          this._isLangInitialized = true;
          this.seoSV.init().then(() => {
            resolve(true);
          });
          setTimeout(() => {
            s.unsubscribe();
          }, 0);
        });
    });
  }
}

export class AppLangBsLang {
  [langCode: string]: {
    angular?: any,
    bootstrap?: any,
    // bootstrap: any,
  }
}

