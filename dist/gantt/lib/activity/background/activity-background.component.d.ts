import { OnInit, ElementRef } from '@angular/core';
import { GanttService } from '../../shared/services/gantt.service';
import * as ɵngcc0 from '@angular/core';
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<GanttActivityBackgroundComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<GanttActivityBackgroundComponent, "activity-background", never, { "tasks": "tasks"; "timeScale": "timeScale"; }, {}, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHktYmFja2dyb3VuZC5jb21wb25lbnQuZC50cyIsInNvdXJjZXMiOlsiYWN0aXZpdHktYmFja2dyb3VuZC5jb21wb25lbnQuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT25Jbml0LCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEdhbnR0U2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9nYW50dC5zZXJ2aWNlJztcclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgR2FudHRBY3Rpdml0eUJhY2tncm91bmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgZ2FudHRTZXJ2aWNlOiBHYW50dFNlcnZpY2U7XHJcbiAgICB0YXNrczogYW55O1xyXG4gICAgdGltZVNjYWxlOiBhbnk7XHJcbiAgICBiZzogRWxlbWVudFJlZjtcclxuICAgIHJvd3M6IGFueVtdO1xyXG4gICAgY2VsbHM6IGFueVtdO1xyXG4gICAgY29uc3RydWN0b3IoZ2FudHRTZXJ2aWNlOiBHYW50dFNlcnZpY2UpO1xyXG4gICAgbmdPbkluaXQoKTogdm9pZDtcclxuICAgIGlzRGF5V2Vla2VuZChkYXRlOiBEYXRlKTogYm9vbGVhbjtcclxuICAgIHNldFJvd1N0eWxlKCk6IHtcclxuICAgICAgICBoZWlnaHQ6IHN0cmluZztcclxuICAgIH07XHJcbiAgICBzZXRDZWxsU3R5bGUoKToge1xyXG4gICAgICAgIHdpZHRoOiBzdHJpbmc7XHJcbiAgICB9O1xyXG4gICAgcHJpdmF0ZSBkcmF3R3JpZDtcclxufVxyXG4iXX0=