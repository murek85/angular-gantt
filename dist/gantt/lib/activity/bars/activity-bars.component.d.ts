import { OnInit, EventEmitter } from '@angular/core';
import { GanttService } from '../../shared/services/gantt.service';
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
}
