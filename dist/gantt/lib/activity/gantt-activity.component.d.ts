import { OnInit, EventEmitter, ElementRef, DoCheck } from '@angular/core';
import { GanttService } from '../shared/services/gantt.service';
export declare class GanttActivityComponent implements OnInit, DoCheck {
    elem: ElementRef;
    ganttService: GanttService;
    project: any;
    options: any;
    onGridRowClick: EventEmitter<any>;
    private upTriangle;
    private downTriangle;
    zoom: EventEmitter<string>;
    activityActions: {
        expanded: boolean;
        expandedIcon: string;
    };
    private timeScale;
    private start;
    private end;
    containerHeight: any;
    containerWidth: any;
    private activityContainerSizes;
    ganttActivityHeight: any;
    ganttActivityWidth: any;
    zoomLevel: string;
    treeExpanded: boolean;
    private scale;
    dimensions: {
        height: number;
        width: number;
    };
    private data;
    gridColumns: any[];
    constructor(elem: ElementRef, ganttService: GanttService);
    ngOnInit(): void;
    /** Custom model check */
    ngDoCheck(): void;
    /** On vertical scroll set the scroll top of grid and activity  */
    onVerticalScroll(verticalScroll: any, ganttGrid: any, ganttActivityArea: any): void;
    /** Removes or adds children for given parent tasks back into DOM by updating TASK_CACHE */
    toggleChildren(rowElem: any, task: any): void;
    /** Removes or adds children tasks back into DOM by updating TASK_CACHE */
    toggleAllChildren(): void;
    /** On resize of browser window dynamically adjust gantt activity height and width */
    onResize(event: any): void;
    setScale(): void;
    setDimensions(): void;
    setGridRowStyle(isParent: boolean): any;
    /** Set the zoom level e.g hours, days */
    zoomTasks(level: string): void;
    /** Expand the gantt grid and activity area height */
    expand(force?: boolean): void;
    /** Get the status icon unicode string */
    getStatusIcon(status: string, percentComplete: number): string;
    /** Get the status icon color */
    getStatusIconColor(status: string, percentComplete: number): string;
    setGridScaleStyle(): {
        'height': string;
        'line-height': string;
        'width': string;
    };
    private calculateContainerHeight;
    private calculateContainerWidth;
    private setSizes;
}
