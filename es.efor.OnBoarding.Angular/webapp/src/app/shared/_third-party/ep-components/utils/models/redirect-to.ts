import { SetData } from 'src/app/shared/models/_basic/set-data';

export class RedirectTo extends SetData<RedirectTo> {
    /**
     * The formattable URL where the user will be redirected to.
     *
     * You may use the following identifiers:
     * @example
     * {value}
     * {disabled}
     * {label}
     */
    url = '';
    newTab = true;

    constructor(url: string, openOnNewTab = true) {
        super();
        this.setData({ url: url, newTab: openOnNewTab});
    }
}
