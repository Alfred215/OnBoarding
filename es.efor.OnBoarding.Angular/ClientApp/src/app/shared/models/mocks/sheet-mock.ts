import { AreaMock, areasMocked } from './area-mock';

export interface SheetMock{
    id?: number;
    area: AreaMock;
    title: string;
}

export const sheetMocked: SheetMock[] = [
    {id: 1, area: areasMocked.find(a => a.id === 1), title: 'Hoja 1'},
    {id: 2, area: areasMocked.find(a => a.id === 2), title: 'Hoja 2'},
    {id: 3, area: areasMocked.find(a => a.id === 1), title: 'Hoja 3'},
    {id: 4, area: areasMocked.find(a => a.id === 3), title: 'Hoja 4'},
    {id: 5, area: areasMocked.find(a => a.id === 2), title: 'Hoja 5'},
    {id: 6, area: areasMocked.find(a => a.id === 4), title: 'Hoja 6'},

];

