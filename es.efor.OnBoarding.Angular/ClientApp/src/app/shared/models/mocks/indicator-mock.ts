import { AmbitMock, ambitMocked } from './ambit-mock';
import { SheetMock, sheetMocked } from './sheet-mock';

export interface IndicatorMock{
    id?: number;
    sheet: SheetMock;
    ambit: AmbitMock;
    type: IndicatorTypeMock;
    title: string;
    description: string;
    status: boolean;
}

export enum IndicatorTypeMock{
    text = 'Texto',
    number = 'Numérico'
}

export let indicatorsMocked: IndicatorMock[] = [
{id: 1, sheet: sheetMocked.find(f => f.id === 1), ambit: ambitMocked.find( f => f.id === 1), type: IndicatorTypeMock.text, title: 'Indicador 1 Hoja 1', description: 'Descripción 1', status: true},
{id: 2, sheet: sheetMocked.find(f => f.id === 1), ambit: ambitMocked.find( f => f.id === 1), type: IndicatorTypeMock.text, title: 'Indicador 2 Hoja 1', description: 'Descripción 2', status: true},
{id: 3, sheet: sheetMocked.find(f => f.id === 1), ambit: ambitMocked.find( f => f.id === 1), type: IndicatorTypeMock.text, title: 'Indicador 3 Hoja 1', description: 'Descripción 3', status: true},
{id: 4, sheet: sheetMocked.find(f => f.id === 1), ambit: ambitMocked.find( f => f.id === 1), type: IndicatorTypeMock.text, title: 'Indicador 4 Hoja 1', description: 'Descripción 4', status: true},
{id: 5, sheet: sheetMocked.find(f => f.id === 1), ambit: ambitMocked.find( f => f.id === 1), type: IndicatorTypeMock.text, title: 'Indicador 5 Hoja 1', description: 'Descripción 5', status: true},
{id: 6, sheet: sheetMocked.find(f => f.id === 2), ambit: ambitMocked.find( f => f.id === 2), type: IndicatorTypeMock.text, title: 'Indicador 1 Hoja 2', description: 'Descripción 1', status: true},
{id: 7, sheet: sheetMocked.find(f => f.id === 2), ambit: ambitMocked.find( f => f.id === 2), type: IndicatorTypeMock.text, title: 'Indicador 2 Hoja 2', description: 'Descripción 2', status: true},
{id: 8, sheet: sheetMocked.find(f => f.id === 2), ambit: ambitMocked.find( f => f.id === 2), type: IndicatorTypeMock.text, title: 'Indicador 3 Hoja 2', description: 'Descripción 3', status: true},
{id: 9, sheet: sheetMocked.find(f => f.id === 2), ambit: ambitMocked.find( f => f.id === 2), type: IndicatorTypeMock.text, title: 'Indicador 4 Hoja 2', description: 'Descripción 4', status: true},
{id: 10, sheet: sheetMocked.find(f => f.id === 3), ambit: ambitMocked.find( f => f.id === 3), type: IndicatorTypeMock.text, title: 'Indicador 1 Hoja 3', description: 'Descripción 1', status: true},
{id: 12, sheet: sheetMocked.find(f => f.id === 3), ambit: ambitMocked.find( f => f.id === 3), type: IndicatorTypeMock.text, title: 'Indicador 2 Hoja 3', description: 'Descripción 2', status: true},
{id: 13, sheet: sheetMocked.find(f => f.id === 3), ambit: ambitMocked.find( f => f.id === 3), type: IndicatorTypeMock.text, title: 'Indicador 3 Hoja 3', description: 'Descripción 3', status: true},
{id: 14, sheet: sheetMocked.find(f => f.id === 3), ambit: ambitMocked.find( f => f.id === 3), type: IndicatorTypeMock.text, title: 'Indicador 4 Hoja 3', description: 'Descripción 4', status: true},
{id: 15, sheet: sheetMocked.find(f => f.id === 3), ambit: ambitMocked.find( f => f.id === 3), type: IndicatorTypeMock.text, title: 'Indicador 5 Hoja 3', description: 'Descripción 5', status: true},
{id: 16, sheet: sheetMocked.find(f => f.id === 4), ambit: ambitMocked.find( f => f.id === 4), type: IndicatorTypeMock.text, title: 'Indicador 1 Hoja 4', description: 'Descripción 1', status: true},
{id: 17, sheet: sheetMocked.find(f => f.id === 4), ambit: ambitMocked.find( f => f.id === 4), type: IndicatorTypeMock.text, title: 'Indicador 2 Hoja 4', description: 'Descripción 2', status: true},
{id: 18, sheet: sheetMocked.find(f => f.id === 4), ambit: ambitMocked.find( f => f.id === 4), type: IndicatorTypeMock.text, title: 'Indicador 3 Hoja 4', description: 'Descripción 3', status: true},
{id: 19, sheet: sheetMocked.find(f => f.id === 4), ambit: ambitMocked.find( f => f.id === 4), type: IndicatorTypeMock.text, title: 'Indicador 4 Hoja 4', description: 'Descripción 4', status: true},
];

