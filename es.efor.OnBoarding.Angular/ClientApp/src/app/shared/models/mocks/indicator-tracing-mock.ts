import { IndicatorMock, indicatorsMocked } from './indicator-mock';

export interface IndicatorTracingMock {
    id?: number;
    indicator: IndicatorMock;
    year: number;
    january: number;
    february: number;
    march: number;
    april: number;
    may: number;
    june: number;
    july: number;
    august: number;
    september: number;
    october: number;
    november: number;
    december: number;
}

export let indicatorTracingValuesMock: IndicatorTracingMock[] = [
{
    id: 1,
    indicator: indicatorsMocked.find(f => f.id === 1),
    year: new Date().getFullYear(),
    january: 100,
    february: 200,
    march: 300,
    april: 400,
    may: 500,
    june: 600,
    july: 700,
    august: 800,
    september: 900,
    october: 1000,
    november: 1100,
    december: 1200
},
{
    id: 2,
    indicator: indicatorsMocked.find(f => f.id === 2),
    year: new Date().getFullYear(),
    january: 100,
    february: 200,
    march: 300,
    april: 400,
    may: 500,
    june: 600,
    july: 700,
    august: 800,
    september: 900,
    october: 1000,
    november: 1100,
    december: 1200
},
{
    id: 3,
    indicator: indicatorsMocked.find(f => f.id === 3),
    year: new Date().getFullYear(),
    january: 100,
    february: 200,
    march: 300,
    april: 400,
    may: 500,
    june: 600,
    july: 700,
    august: 800,
    september: 900,
    october: 1000,
    november: 1100,
    december: 1200
},
{
    id: 4,
    indicator: indicatorsMocked.find(f => f.id === 4),
    year: new Date().getFullYear(),
    january: 100,
    february: 200,
    march: 300,
    april: 400,
    may: 500,
    june: 600,
    july: 700,
    august: 800,
    september: 900,
    october: 1000,
    november: 1100,
    december: 1200
},
{
    id: 5,
    indicator: indicatorsMocked.find(f => f.id === 5),
    year: new Date().getFullYear(),
    january: 100,
    february: 200,
    march: 300,
    april: 400,
    may: 500,
    june: 600,
    july: 700,
    august: 800,
    september: 900,
    october: 1000,
    november: 1100,
    december: 1200
},
{
    id: 6,
    indicator: indicatorsMocked.find(f => f.id === 6),
    year: new Date().getFullYear(),
    january: 100,
    february: 200,
    march: 300,
    april: 400,
    may: 500,
    june: 600,
    july: 700,
    august: 800,
    september: 900,
    october: 1000,
    november: 1100,
    december: 1200
},
{
    id: 7,
    indicator: indicatorsMocked.find(f => f.id === 7),
    year: new Date().getFullYear(),
    january: 100,
    february: 200,
    march: 300,
    april: 400,
    may: 500,
    june: 600,
    july: 700,
    august: 800,
    september: 900,
    october: 1000,
    november: 1100,
    december: 1200
},
{
    id: 8,
    indicator: indicatorsMocked.find(f => f.id === 8),
    year: new Date().getFullYear(),
    january: 100,
    february: 200,
    march: 300,
    april: 400,
    may: 500,
    june: 600,
    july: 700,
    august: 800,
    september: 900,
    october: 1000,
    november: 1100,
    december: 1200
},
];

