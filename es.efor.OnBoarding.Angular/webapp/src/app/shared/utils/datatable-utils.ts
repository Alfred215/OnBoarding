import { faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { DtActionButton, DtActionColumnButton } from 'ax-toolbox';

export type DtActionButtonTooltipPlacement = 'left' | 'right' | 'top' | 'bottom' | undefined;
export class DatatableUtils {
    static createActionBtnNewEntity<TEntity = unknown>(
        urlNewEntityForm: string, urlTarget = 'blank',
        tooltip?: string, tooltipPlacement?: DtActionButtonTooltipPlacement
    ) {
        return new DtActionButton<TEntity>().setData({
            url: urlNewEntityForm,
            urlTarget: urlTarget,
            btnClass: 'btn btn-sm btn-primary',
            iconName: faPlus.iconName,
            iconPreffix: faPlus.prefix,
            tooltip: tooltip,
            tooltipPlacement: tooltipPlacement,
        });
    }

    static createColumnButtonGoTo<TEntity = unknown, TCellData = unknown>(
        urlEntityForm: string, urlTarget = 'blank',
        tooltip?: string, tooltipPlacement?: DtActionButtonTooltipPlacement, text?: string
    ) {
        return new DtActionColumnButton<TEntity, TCellData>().setData({
            iconName: text != null ? undefined : faEye.iconName,
            iconPreffix: text != null ? undefined : faEye.prefix,
            url: urlEntityForm,
            urlTarget: urlTarget,
            text: text,
            tooltip: tooltip,
            tooltipPlacement: tooltipPlacement,
            btnClass: 'btn btn-secondary rounded-pill btn-lg minwidth'
        });
    }
}
