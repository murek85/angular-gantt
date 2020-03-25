import { OnInit } from '@angular/core';
import { GanttService } from '../../shared/services/gantt.service';
export declare class GanttTimeScaleComponent implements OnInit {
    ganttService: GanttService;
    timeScale: any;
    dimensions: any;
    constructor(ganttService: GanttService);
    ngOnInit(): void;
    setTimescaleStyle(): {
        'width': string;
    };
    setTimescaleLineStyle(borderTop: string): {
        'height': string;
        'line-height': string;
        'position': string;
        'border-top': string;
    };
    setTimescaleCellStyle(): {
        'width': string;
    };
    isDayWeekend(date: Date): boolean;
}
