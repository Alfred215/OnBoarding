import { Component, OnInit, Input, HostListener, ElementRef, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import * as Hammer from 'hammerjs';

import { EpFullscreenImgService } from './services/ep-fullscreen-img.service';
import { DestroySubscriptions } from 'ax-toolbox';

@Component({
  selector: 'app-ep-fullscreen-img',
  templateUrl: './ep-fullscreen-img.component.html',
  styleUrls: ['./ep-fullscreen-img.component.scss']
})
export class EpFullscreenImgComponent
  extends DestroySubscriptions
  implements OnInit, OnDestroy {
  @ViewChild('img', { static: false }) set img(el: ElementRef<HTMLImageElement>) {
    if ((this._img == null && (el == null ||
      el.nativeElement == null)) ||
      this._img === (el != null && el.nativeElement)) { return; }

    if (el == null || el.nativeElement == null) {
      this._img = null;
      this.destroyHammerJS();
    } else {
      this._img = el.nativeElement;
      this.initHammerJS();
    }
  }
  constructor(
    private cdref: ChangeDetectorRef,
    public service: EpFullscreenImgService,
    private el: ElementRef<HTMLElement>
  ) {
    super();
    this.initListeners();
  }
  private _img: HTMLImageElement;

  _isShown = false;

  @Input() btnCloseLabel = '';


  private bodyScrollState = null;
  private hammer: HammerManager;
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(evt: KeyboardEvent) {
    this.hide();
  }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    this.hammer.destroy();
  }

  initListeners() {
    const s = this.service._show.subscribe(() => {
      if (this._isShown) { return; }
      this._isShown = true;

      const body = document.getElementsByTagName('body').item(0);
      const bodyStyles = window.getComputedStyle(body);
      this.bodyScrollState = body.style.overflow;

      body.style.overflow = 'hidden';

      // this.cdref.detectChanges();
    });
    const s2 = this.service._hide.subscribe(() => {
      if (!this._isShown) { return; }
      this._isShown = false;

      const body = document.getElementsByTagName('body').item(0);
      body.style.overflow = this.bodyScrollState;
    });
    this.subs.push(s, s2);
  }

  hide() {
    if (!this._isShown) { return; }
    this.service.closeImage();
  }

  private destroyHammerJS() {
    this.hammer.destroy();
  }
  private initHammerJS() {
    const container =  this.el.nativeElement.firstElementChild as HTMLElement;
    let posX = 0;
    let posY = 0;
    let scale = 1;
    let lastScale = 1;
    let lastPosX = 0;
    let lastPosY = 0;
    let maxPosX = 0;
    let maxPosY = 0;
    let transform = '';
    const el = this._img.parentElement;

    this.hammer = new Hammer.Manager(container);
    // this.hammer.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));
    this.hammer.add(new Hammer.Tap({}));
    this.hammer.add(new Hammer.Pan({}));
    this.hammer.add(new Hammer.Pinch({}));

    // doubletap is available aswell
    this.hammer.on('tap pan panstart panend pinch pinchend', (ev) => {
      // switch-case no nos vale en este caso, dado que hay ifs que deben ejecutarse
      // después del escalado
      if (ev.type === 'tap') {
        transform =
          'translate3d(0, 0, 0) ' +
          'scale3d(2, 2, 1) ';
        scale = 2;
        lastScale = 2;
        container.classList.add('scaled');
        try {
          if (window.getComputedStyle(el, null).getPropertyValue('-webkit-transform').toString() !== 'matrix(1, 0, 0, 1, 0, 0)') {
            transform =
              'translate3d(0, 0, 0) ' +
              'scale3d(1, 1, 1) ';
            scale = 1;
            lastScale = 1;
            container.classList.remove('scaled');
          }
        } catch (err) { }
        el.style.webkitTransform = transform;
        transform = '';
      }

      // pan
      if (scale !== 1) {
        posX = lastPosX + ev.deltaX;
        posY = lastPosY + ev.deltaY;
        maxPosX = Math.ceil((scale - 1) * el.clientWidth / 2);
        maxPosY = Math.ceil((scale - 1) * el.clientHeight / 2);
        if (posX > maxPosX) {
          posX = maxPosX;
        }
        if (posX < -maxPosX) {
          posX = -maxPosX;
        }
        if (posY > maxPosY) {
          posY = maxPosY;
        }
        if (posY < -maxPosY) {
          posY = -maxPosY;
        }
      }


      // pinch
      if (ev.type === 'pinch') {
        scale = Math.max(.999, Math.min(lastScale * (ev.scale), 4));
      }
      if (ev.type === 'pinchend') {
        lastScale = scale;
      }

      // panstart - panend
      if (ev.type === 'panstart') {
        container.classList.add('panning');
      } else if (ev.type === 'panend') {
        lastPosX = posX < maxPosX ? posX : maxPosX;
        lastPosY = posY < maxPosY ? posY : maxPosY;
        container.classList.remove('panning');
      }

      if (scale !== 1) {
        transform =
          'translate3d(' + posX + 'px,' + posY + 'px, 0) ' +
          'scale3d(' + scale + ', ' + scale + ', 1)';
      }

      if (transform) {
        el.style.webkitTransform = transform;
      }
    });
  }

  private setImgScale(scale: number) {
    const img = this.getImg();
    img.style.transform = `scale(${scale})`;
  }
  private getImg() {
    return this.el.nativeElement.querySelector('img');
  }
}
