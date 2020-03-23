import { OnInit } from '@angular/core';
import { GanttService } from '../../shared/services/gantt.service';
export declare class GanttActivityBarsComponent implements OnInit {
    ganttService: GanttService;
    timeScale: any;
    dimensions: any;
    tasks: any;
    zoom: any;
    zoomLevel: any;
    containerHeight: number;
    containerWidth: number;
    constructor(ganttService: GanttService);
    ngOnInit(): void;
    expandLeft($event: any, bar: any): boolean;
    expandRight($event: any, bar: any): boolean;
    move($event: any, bar: any): boolean;
    drawBar(task: any, index: number): {};
    drawProgress(task: any, bar: any): any;
    private addMouseEventListeners;
}
