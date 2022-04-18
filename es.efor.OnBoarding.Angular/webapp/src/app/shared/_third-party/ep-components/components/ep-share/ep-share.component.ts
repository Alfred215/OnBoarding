import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ep-share',
  templateUrl: './ep-share.component.html',
  styleUrls: ['./ep-share.component.scss']
})
export class EpShareComponent implements OnInit {
  @Input() labelShare = '';
  @Input() cssClassBtn = 'btn btn-link';

  @Input() shareTitle = document.title;
  @Input() shareText = document.title;
  @Input() shareUrl = document.location.href;

  @Output() onButtonShareClick = new EventEmitter<void>();
  /** 
   * Wether the share callback was successfully executed.
   * True if .share() was used.
   * False if coppied to clipboard
   * */
  @Output() onShareSuccess = new EventEmitter<boolean>();
  /** 
   * Wether the share callback could not be successfully executed.
   * True if .share() was used.
   * False if coppied to clipboard
   * */
  @Output() onShareError = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }
  onBtnShareClick() {
    this.onButtonShareClick.next();
    this.share();
  }

  private share(): Promise<void> {
    if (navigator['share']) {
      return (<Promise<unknown>>navigator['share']({
        title: this.shareTitle,
        text: this.shareText,
        url: this.shareUrl
      })).then(() => {
        this.onShareSuccess.next(true);
      }, () => {
          this.onShareError.next(true);
      }).catch(() => {
        this.onShareError.next(true);
      });
    } else {
      return this.copyToClipboard()
        .then(() => {
          this.onShareSuccess.next(false);
        }, () => {
          this.onShareError.next(false);
        }).catch(() => {
          this.onShareError.next(false);
        });
    }
  }
  private copyToClipboard() {
    const copyText = `${this.shareTitle ? `${this.shareText}\n` : ''}${this.shareUrl}`;

    return new Promise<void>((resolve, reject) => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(copyText)
          .then(() => { resolve(); }, () => { reject() })
          .catch(() => { reject(); });
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = copyText;
        textarea.style.top = '0';
        textarea.style.left = '0';
        textarea.style.position = 'fixed';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        try {
          const success = document.execCommand('copy');
          if (success) resolve();
          else reject();
        } catch (e) {
          reject();
        } finally {
          try { textarea.blur(); }
          catch (e) { }
        }
      }
    });
  }
}
