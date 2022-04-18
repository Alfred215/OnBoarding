import { SetData } from 'src/app/shared/models/_basic/set-data';
import { RedirectTo } from './redirect-to';

export class LabelAndValue<TValue = any> extends SetData<LabelAndValue<TValue>> {
    /**
     * Displayed text in the dopdown selector.
     */
    label: string = null;
    /**
     * The actual value that will be used for operations
     */
    value: TValue = null;
    /**
     * The CSS classes to be applied to the icon.
     */
    iconClass?: string = null;
    /**
     * Whether the options should be disabled by default.
     */
    disabled?: boolean = null;
    /**
     * Whether the option should be selected by default.
     */
    selected?: boolean = null;
    /**
     * @todo Currently only works on Dataselect.
     * The action to be performed when the user clicks the option.
     *
     * The returned boolean indicates whether the Datatselect onSelect action should be fired
     * @param value The actual value of the selected option.
     */
    onSelect?: (value: TValue | LabelAndValue<TValue>) => boolean;
    /**
     * @todo Currently only works on Dataselect.
     * Represents the URL where the user will be redirected on click.
     *
     * *THIS WILL INVALIDATE onSelect PROPERTY*
     */
    redirectionLink?: RedirectTo = null;
    constructor(label?: string, value?: any, disabled?: boolean, selected?: boolean) {
        super();

        if (label != null) { this.label = label; }
        if (value != null) { this.value = value; }
        this.disabled = disabled === true;
        this.selected = selected === true;
    }
    setLabel(newLabel: string) {
        this.label = newLabel;
        return this;
    }
    setValue(newValue: any) {
        this.value = newValue;
        return this;
    }
    setIconClass(newClass: string) {
        this.iconClass = newClass;
        return this;
    }
    setDisabled(asDisabled: boolean) {
        this.disabled = asDisabled;
        return this;
    }
    setSelected(asSelected: boolean) {
        this.selected = asSelected;
        return this;
    }
    setOnSelect(callback: (value: any) => boolean) {
        this.onSelect = callback;
        return this;
    }
    setRedirectionLink(link: RedirectTo) {
        this.redirectionLink = link;
        return this;
    }
    convertToKaV() {
        const kav = new KeyAndValue();
        kav.key = <any>this.value;
        kav.value = this.label;
        kav.disabled = this.disabled;
        kav.iconClass = this.iconClass;
        kav.selected = this.selected;
        kav.onSelect = this.onSelect;
        kav.redirectionLink = this.redirectionLink;
        return kav;
    }
}
export class KeyAndValue {
    key: string = null;
    value: any = null;
    iconClass?: string = null;
    disabled?: boolean = null;
    selected?: boolean = null;
    onSelect?: (value: any) => boolean;
    redirectionLink?: RedirectTo = null;

    constructor() { }
    convertToLaV() {
        const lav = new LabelAndValue();
        lav.label = this.value;
        lav.value = this.key;
        lav.disabled = this.disabled;
        lav.iconClass = this.iconClass;
        lav.selected = this.selected;
        lav.onSelect = this.onSelect;
        lav.redirectionLink = this.redirectionLink;
        return lav;
    }
}
