import { OnInit, ElementRef } from '@angular/core';
import { GanttService } from '../../shared/services/gantt.service';
import * as i0 from "@angular/core";
export declare class GanttActivityBackgroundComponent implements OnInit {
    ganttService: GanttService;
    tasks: any;
    timeScale: any;
    bg: ElementRef;
    rows: any[];
    cells: any[];
    constructor(ganttService: GanttService);
    ngOnInit(): void;
    isDayWeekend(date: Date): boolean;
    setRowStyle(): {
        height: string;
    };
    setCellStyle(): {
        width: string;
    };
    private drawGrid;
    static ɵfac: i0.ɵɵFactoryDef<GanttActivityBackgroundComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<GanttActivityBackgroundComponent, "activity-background", never, { "tasks": "tasks"; "timeScale": "timeScale"; }, {}, never, never>;
}
