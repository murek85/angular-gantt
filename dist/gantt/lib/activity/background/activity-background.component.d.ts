import { OnInit, ElementRef } from '@angular/core';
import { GanttService } from '../../shared/services/gantt.service';
export declare class GanttActivityBackgroundComponent implements OnInit {
    ganttService: GanttService;
    tasks: any;
    timeScale: any;
    zoom: any;
    zoomLevel: string;
    bg: ElementRef;
    rows: any[];
    cells: any[];
    constructor(ganttService: GanttService);
    ngOnInit(): void;
    isDayWeekend(date: Date): boolean;
    setRowStyle(): {
        'height': string;
    };
    setCellStyle(): {
        'width': string;
    };
    private drawGrid;
}
