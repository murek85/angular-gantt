import { OnInit, EventEmitter, ElementRef, DoCheck } from '@angular/core';
import { GanttService } from '../shared/services/gantt.service';
import { IGridColumn, IGanttOptions, Project } from '../shared/interfaces';
import * as ɵngcc0 from '@angular/core';
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<GanttActivityComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<GanttActivityComponent, "gantt-activity", never, { "project": "project"; "options": "options"; }, { "onGridRowClick": "onGridRowClick"; "onPopoverOpen": "onPopoverOpen"; }, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQtYWN0aXZpdHkuY29tcG9uZW50LmQudHMiLCJzb3VyY2VzIjpbImdhbnR0LWFjdGl2aXR5LmNvbXBvbmVudC5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPbkluaXQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgRG9DaGVjayB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBHYW50dFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvZ2FudHQuc2VydmljZSc7XHJcbmltcG9ydCB7IElHcmlkQ29sdW1uLCBJR2FudHRPcHRpb25zLCBQcm9qZWN0IH0gZnJvbSAnLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBHYW50dEFjdGl2aXR5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBEb0NoZWNrIHtcclxuICAgIGVsZW06IEVsZW1lbnRSZWY7XHJcbiAgICBnYW50dFNlcnZpY2U6IEdhbnR0U2VydmljZTtcclxuICAgIHByb2plY3Q6IFByb2plY3Q7XHJcbiAgICBvcHRpb25zOiBJR2FudHRPcHRpb25zO1xyXG4gICAgb25HcmlkUm93Q2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+O1xyXG4gICAgb25Qb3BvdmVyT3BlbjogRXZlbnRFbWl0dGVyPGFueT47XHJcbiAgICBwcml2YXRlIHN0YXJ0O1xyXG4gICAgcHJpdmF0ZSBlbmQ7XHJcbiAgICBwcml2YXRlIHRpbWVTY2FsZTtcclxuICAgIHByaXZhdGUgc2NhbGU7XHJcbiAgICBwcml2YXRlIGFjdGl2aXR5Q29udGFpbmVyU2l6ZXM7XHJcbiAgICBjb250YWluZXJIZWlnaHQ6IGFueTtcclxuICAgIGNvbnRhaW5lcldpZHRoOiBhbnk7XHJcbiAgICBnYW50dEFjdGl2aXR5SGVpZ2h0OiBhbnk7XHJcbiAgICBnYW50dEFjdGl2aXR5V2lkdGg6IGFueTtcclxuICAgIGRpbWVuc2lvbnM6IHtcclxuICAgICAgICBoZWlnaHQ6IG51bWJlcjtcclxuICAgICAgICB3aWR0aDogbnVtYmVyO1xyXG4gICAgfTtcclxuICAgIGdyaWRDb2x1bW5zOiBJR3JpZENvbHVtbltdO1xyXG4gICAgY29uc3RydWN0b3IoZWxlbTogRWxlbWVudFJlZiwgZ2FudHRTZXJ2aWNlOiBHYW50dFNlcnZpY2UpO1xyXG4gICAgZG9XaGVlbChldmVudDogYW55LCBlbGVtOiBIVE1MRWxlbWVudCk6IGJvb2xlYW47XHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkO1xyXG4gICAgLyoqIEN1c3RvbSBtb2RlbCBjaGVjayAqL1xyXG4gICAgbmdEb0NoZWNrKCk6IHZvaWQ7XHJcbiAgICAvKiogT24gdmVydGljYWwgc2Nyb2xsIHNldCB0aGUgc2Nyb2xsIHRvcCBvZiBncmlkIGFuZCBhY3Rpdml0eSAgKi9cclxuICAgIG9uVmVydGljYWxTY3JvbGwodmVydGljYWxTY3JvbGw6IGFueSwgZ2FudHRHcmlkOiBhbnksIGdhbnR0QWN0aXZpdHlBcmVhOiBhbnkpOiB2b2lkO1xyXG4gICAgZ3JpZFJvd0NsaWNrKHRhc2s6IGFueSk6IHZvaWQ7XHJcbiAgICBwb3BvdmVyT3Blbih0YXNrOiBhbnkpOiB2b2lkO1xyXG4gICAgLyoqIE9uIHJlc2l6ZSBvZiBicm93c2VyIHdpbmRvdyBkeW5hbWljYWxseSBhZGp1c3QgZ2FudHQgYWN0aXZpdHkgaGVpZ2h0IGFuZCB3aWR0aCAqL1xyXG4gICAgb25SZXNpemUoZXZlbnQ6IGFueSk6IHZvaWQ7XHJcbiAgICBzZXRTY2FsZSgpOiB2b2lkO1xyXG4gICAgc2V0RGltZW5zaW9ucygpOiB2b2lkO1xyXG4gICAgc2V0R3JpZFJvd1N0eWxlKCk6IGFueTtcclxuICAgIHNldEdyaWRTY2FsZVN0eWxlKCk6IHtcclxuICAgICAgICBoZWlnaHQ6IHN0cmluZztcclxuICAgICAgICAnbGluZS1oZWlnaHQnOiBzdHJpbmc7XHJcbiAgICB9O1xyXG4gICAgY2FsY3VsYXRlQ29sdW1uc1dpZHRoKCk6IHN0cmluZztcclxuICAgIHByaXZhdGUgY2FsY3VsYXRlQ29udGFpbmVySGVpZ2h0O1xyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVDb250YWluZXJXaWR0aDtcclxuICAgIHByaXZhdGUgc2V0U2l6ZXM7XHJcbn1cclxuIl19