import { OnInit, EventEmitter } from '@angular/core';
import { GanttService } from '../../shared/services/gantt.service';
import * as ɵngcc0 from '@angular/core';
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<GanttActivityBarsComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<GanttActivityBarsComponent, "activity-bars", never, { "timeScale": "timeScale"; "dimensions": "dimensions"; "tasks": "tasks"; }, { "onGridRowClick": "onGridRowClick"; "onPopoverOpen": "onPopoverOpen"; }, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHktYmFycy5jb21wb25lbnQuZC50cyIsInNvdXJjZXMiOlsiYWN0aXZpdHktYmFycy5jb21wb25lbnQuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPbkluaXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBHYW50dFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvZ2FudHQuc2VydmljZSc7XHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIEdhbnR0QWN0aXZpdHlCYXJzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIGdhbnR0U2VydmljZTogR2FudHRTZXJ2aWNlO1xyXG4gICAgdGltZVNjYWxlOiBhbnk7XHJcbiAgICBkaW1lbnNpb25zOiBhbnk7XHJcbiAgICB0YXNrczogYW55O1xyXG4gICAgb25HcmlkUm93Q2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+O1xyXG4gICAgb25Qb3BvdmVyT3BlbjogRXZlbnRFbWl0dGVyPGFueT47XHJcbiAgICBjb250YWluZXJIZWlnaHQ6IG51bWJlcjtcclxuICAgIGNvbnRhaW5lcldpZHRoOiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW50dFNlcnZpY2U6IEdhbnR0U2VydmljZSk7XHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkO1xyXG4gICAgZHJhd0Jhcih0YXNrOiBhbnksIGluZGV4OiBudW1iZXIpOiB7fTtcclxuICAgIGdyaWRSb3dDbGlja2VkKHRhc2s6IGFueSk6IHZvaWQ7XHJcbiAgICBwb3BvdmVyT3BlbmVkKHRhc2s6IGFueSk6IHZvaWQ7XHJcbiAgICBwcml2YXRlIGFkZE1vdXNlRXZlbnRMaXN0ZW5lcnM7XHJcbn1cclxuIl19