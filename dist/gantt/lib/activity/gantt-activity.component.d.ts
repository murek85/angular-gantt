import { OnInit, EventEmitter, ElementRef, DoCheck } from '@angular/core';
import { GanttService } from '../shared/services/gantt.service';
import { IGridColumn, IGanttOptions, Project } from '../shared/interfaces';
import * as i0 from "@angular/core";
export declare class GanttActivityComponent implements OnInit, DoCheck {
    elem: ElementRef;
    ganttService: GanttService;
    project: Project;
    options: IGanttOptions;
    onGridRowClick: EventEmitter<any>;
    onPopoverOpen: EventEmitter<any>;
    private start;
    private end;
    private timeScale;
    private scale;
    private activityContainerSizes;
    containerHeight: any;
    containerWidth: any;
    ganttActivityHeight: any;
    ganttActivityWidth: any;
    dimensions: {
        height: number;
        width: number;
    };
    gridColumns: IGridColumn[];
    constructor(elem: ElementRef, ganttService: GanttService);
    doWheel(event: any, elem: HTMLElement): boolean;
    ngOnInit(): void;
    /** Custom model check */
    ngDoCheck(): void;
    /** On vertical scroll set the scroll top of grid and activity  */
    onVerticalScroll(verticalScroll: any, ganttGrid: any, ganttActivityArea: any): void;
    gridRowClick(task: any): void;
    popoverOpen(task: any): void;
    /** On resize of browser window dynamically adjust gantt activity height and width */
    onResize(event: any): void;
    setScale(): void;
    setDimensions(): void;
    setGridRowStyle(): any;
    setGridScaleStyle(): {
        height: string;
        'line-height': string;
    };
    calculateColumnsWidth(): string;
    private calculateContainerHeight;
    private calculateContainerWidth;
    private setSizes;
    static ɵfac: i0.ɵɵFactoryDef<GanttActivityComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<GanttActivityComponent, "gantt-activity", never, { "project": "project"; "options": "options"; }, { "onGridRowClick": "onGridRowClick"; "onPopoverOpen": "onPopoverOpen"; }, never, never>;
}
