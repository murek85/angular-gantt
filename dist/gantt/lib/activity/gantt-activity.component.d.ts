import { OnInit, EventEmitter, ElementRef, DoCheck } from '@angular/core';
import { GanttService } from '../shared/services/gantt.service';
export declare class GanttActivityComponent implements OnInit, DoCheck {
    elem: ElementRef;
    ganttService: GanttService;
    project: any;
    options: any;
    onGridRowClick: EventEmitter<any>;
    onPopoverOpen: EventEmitter<any>;
    private start;
    private end;
    private timeScale;
    private activityContainerSizes;
    containerHeight: any;
    containerWidth: any;
    ganttActivityHeight: any;
    ganttActivityWidth: any;
    private scale;
    dimensions: {
        height: number;
        width: number;
    };
    gridColumns: any[];
    constructor(elem: ElementRef, ganttService: GanttService);
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
        'height': string;
        'line-height': string;
    };
    private calculateContainerHeight;
    private calculateContainerWidth;
    private setSizes;
}
