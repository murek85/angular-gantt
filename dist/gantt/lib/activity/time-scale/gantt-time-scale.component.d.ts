import { OnInit } from '@angular/core';
import { GanttService } from '../../shared/services/gantt.service';
import { IScale } from '../../shared/interfaces';
import * as ɵngcc0 from '@angular/core';
export declare class GanttTimeScaleComponent implements OnInit {
    ganttService: GanttService;
    timeScaleMonth: any;
    timeScaleWeekend: any;
    dimensions: any;
    scale: IScale;
    constructor(ganttService: GanttService);
    ngOnInit(): void;
    setTimescaleStyle(): {
        width: string;
    };
    setTimescaleMonthLineStyle(borderTop: string): {
        height: string;
        'line-height': string;
        position: string;
        'border-top': string;
    };
    setTimescaleMonthCellStyle(): {
        width: string;
    };
    setTimescaleWeekendLineStyle(borderTop: string): {
        height: string;
        'line-height': string;
        position: string;
        'border-top': string;
    };
    setTimescaleWeekendCellStyle(): {
        width: string;
    };
    isDayWeekend(date: Date): boolean;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<GanttTimeScaleComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<GanttTimeScaleComponent, "time-scale", never, { "timeScaleMonth": "timeScaleMonth"; "timeScaleWeekend": "timeScaleWeekend"; "dimensions": "dimensions"; "scale": "scale"; }, {}, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQtdGltZS1zY2FsZS5jb21wb25lbnQuZC50cyIsInNvdXJjZXMiOlsiZ2FudHQtdGltZS1zY2FsZS5jb21wb25lbnQuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBHYW50dFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvZ2FudHQuc2VydmljZSc7XHJcbmltcG9ydCB7IElTY2FsZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgR2FudHRUaW1lU2NhbGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgZ2FudHRTZXJ2aWNlOiBHYW50dFNlcnZpY2U7XHJcbiAgICB0aW1lU2NhbGVNb250aDogYW55O1xyXG4gICAgdGltZVNjYWxlV2Vla2VuZDogYW55O1xyXG4gICAgZGltZW5zaW9uczogYW55O1xyXG4gICAgc2NhbGU6IElTY2FsZTtcclxuICAgIGNvbnN0cnVjdG9yKGdhbnR0U2VydmljZTogR2FudHRTZXJ2aWNlKTtcclxuICAgIG5nT25Jbml0KCk6IHZvaWQ7XHJcbiAgICBzZXRUaW1lc2NhbGVTdHlsZSgpOiB7XHJcbiAgICAgICAgd2lkdGg6IHN0cmluZztcclxuICAgIH07XHJcbiAgICBzZXRUaW1lc2NhbGVNb250aExpbmVTdHlsZShib3JkZXJUb3A6IHN0cmluZyk6IHtcclxuICAgICAgICBoZWlnaHQ6IHN0cmluZztcclxuICAgICAgICAnbGluZS1oZWlnaHQnOiBzdHJpbmc7XHJcbiAgICAgICAgcG9zaXRpb246IHN0cmluZztcclxuICAgICAgICAnYm9yZGVyLXRvcCc6IHN0cmluZztcclxuICAgIH07XHJcbiAgICBzZXRUaW1lc2NhbGVNb250aENlbGxTdHlsZSgpOiB7XHJcbiAgICAgICAgd2lkdGg6IHN0cmluZztcclxuICAgIH07XHJcbiAgICBzZXRUaW1lc2NhbGVXZWVrZW5kTGluZVN0eWxlKGJvcmRlclRvcDogc3RyaW5nKToge1xyXG4gICAgICAgIGhlaWdodDogc3RyaW5nO1xyXG4gICAgICAgICdsaW5lLWhlaWdodCc6IHN0cmluZztcclxuICAgICAgICBwb3NpdGlvbjogc3RyaW5nO1xyXG4gICAgICAgICdib3JkZXItdG9wJzogc3RyaW5nO1xyXG4gICAgfTtcclxuICAgIHNldFRpbWVzY2FsZVdlZWtlbmRDZWxsU3R5bGUoKToge1xyXG4gICAgICAgIHdpZHRoOiBzdHJpbmc7XHJcbiAgICB9O1xyXG4gICAgaXNEYXlXZWVrZW5kKGRhdGU6IERhdGUpOiBib29sZWFuO1xyXG59XHJcbiJdfQ==