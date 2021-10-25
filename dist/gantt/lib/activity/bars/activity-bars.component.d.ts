import { OnInit, EventEmitter } from '@angular/core';
import { GanttService } from '../../shared/services/gantt.service';
import * as i0 from "@angular/core";
export declare class GanttActivityBarsComponent implements OnInit {
    ganttService: GanttService;
    timeScale: any;
    dimensions: any;
    tasks: any;
    onGridRowClick: EventEmitter<any>;
    onPopoverOpen: EventEmitter<any>;
    containerHeight: number;
    containerWidth: number;
    constructor(ganttService: GanttService);
    ngOnInit(): void;
    drawBar(task: any, index: number): {};
    gridRowClicked(task: any): void;
    popoverOpened(task: any): void;
    private addMouseEventListeners;
    static ɵfac: i0.ɵɵFactoryDef<GanttActivityBarsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<GanttActivityBarsComponent, "activity-bars", never, { "timeScale": "timeScale"; "dimensions": "dimensions"; "tasks": "tasks"; }, { "onGridRowClick": "onGridRowClick"; "onPopoverOpen": "onPopoverOpen"; }, never, never>;
}
