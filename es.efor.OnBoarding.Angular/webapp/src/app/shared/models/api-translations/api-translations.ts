import { marker } from '@biesbjerg/ngx-translate-extract-marker';

/**
 * This function does nothing by itself, it is only used
 * to keep track of the errors the API returns and make sure
 * translations files are updated.
 */
export function markApiStrings() {
    markApiErrorStrings();
    markApiResponseStrings();
}
export function markApiErrorStrings() {
    marker('API.ERROR.AUTH.PASS.FAIL');
    marker('API.ERROR.AUTH.PASS.EMPTY');
    marker('API.ERROR.AUTH.USERNAME.FAIL');
}
export function markApiResponseStrings() {
    marker('MENU.PAGES.HOME');
}
