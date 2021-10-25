import { OnInit } from '@angular/core';
import { GanttService } from '../../shared/services/gantt.service';
import { IScale } from '../../shared/interfaces';
import * as i0 from "@angular/core";
export declare class GanttTimeScaleComponent implements OnInit {
    ganttService: GanttService;
    timeScaleMonth: any;
    timeScaleWeekend: any;
    dimensions: any;
    scale: IScale;
    constructor(ganttService: GanttService);
    ngOnInit(): void;
    setTimescaleStyle(): {
        width: string;
    };
    setTimescaleMonthLineStyle(borderTop: string): {
        height: string;
        'line-height': string;
        position: string;
        'border-top': string;
    };
    setTimescaleMonthCellStyle(): {
        width: string;
    };
    setTimescaleWeekendLineStyle(borderTop: string): {
        height: string;
        'line-height': string;
        position: string;
        'border-top': string;
    };
    setTimescaleWeekendCellStyle(): {
        width: string;
    };
    isDayWeekend(date: Date): boolean;
    static ɵfac: i0.ɵɵFactoryDef<GanttTimeScaleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<GanttTimeScaleComponent, "time-scale", never, { "timeScaleMonth": "timeScaleMonth"; "timeScaleWeekend": "timeScaleWeekend"; "dimensions": "dimensions"; "scale": "scale"; }, {}, never, never>;
}
