import { OnInit, EventEmitter } from '@angular/core';
import { GanttService } from './shared/services/gantt.service';
import { IGanttOptions, Project } from './shared/interfaces';
import * as ɵngcc0 from '@angular/core';
export declare class GanttComponent implements OnInit {
    ganttService: GanttService;
    _project: Project;
    _options: IGanttOptions;
    set project(project: any);
    get project(): any;
    set options(options: any);
    get options(): any;
    onGridRowClick: EventEmitter<any>;
    onPopoverOpen: EventEmitter<any>;
    ganttContainerWidth: number;
    constructor(ganttService: GanttService);
    ngOnInit(): void;
    setSizes(): void;
    setDefaultOptions(): void;
    setDefaultProject(): void;
    gridRowClicked(task: any): void;
    popoverOpened(task: any): void;
    onResize($event: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<GanttComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<GanttComponent, "gantt", never, { "project": "project"; "options": "options"; }, { "onGridRowClick": "onGridRowClick"; "onPopoverOpen": "onPopoverOpen"; }, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQuY29tcG9uZW50LmQudHMiLCJzb3VyY2VzIjpbImdhbnR0LmNvbXBvbmVudC5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPbkluaXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBHYW50dFNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC9zZXJ2aWNlcy9nYW50dC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSUdhbnR0T3B0aW9ucywgUHJvamVjdCB9IGZyb20gJy4vc2hhcmVkL2ludGVyZmFjZXMnO1xyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBHYW50dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBnYW50dFNlcnZpY2U6IEdhbnR0U2VydmljZTtcclxuICAgIF9wcm9qZWN0OiBQcm9qZWN0O1xyXG4gICAgX29wdGlvbnM6IElHYW50dE9wdGlvbnM7XHJcbiAgICBzZXQgcHJvamVjdChwcm9qZWN0OiBhbnkpO1xyXG4gICAgZ2V0IHByb2plY3QoKTogYW55O1xyXG4gICAgc2V0IG9wdGlvbnMob3B0aW9uczogYW55KTtcclxuICAgIGdldCBvcHRpb25zKCk6IGFueTtcclxuICAgIG9uR3JpZFJvd0NsaWNrOiBFdmVudEVtaXR0ZXI8YW55PjtcclxuICAgIG9uUG9wb3Zlck9wZW46IEV2ZW50RW1pdHRlcjxhbnk+O1xyXG4gICAgZ2FudHRDb250YWluZXJXaWR0aDogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IoZ2FudHRTZXJ2aWNlOiBHYW50dFNlcnZpY2UpO1xyXG4gICAgbmdPbkluaXQoKTogdm9pZDtcclxuICAgIHNldFNpemVzKCk6IHZvaWQ7XHJcbiAgICBzZXREZWZhdWx0T3B0aW9ucygpOiB2b2lkO1xyXG4gICAgc2V0RGVmYXVsdFByb2plY3QoKTogdm9pZDtcclxuICAgIGdyaWRSb3dDbGlja2VkKHRhc2s6IGFueSk6IHZvaWQ7XHJcbiAgICBwb3BvdmVyT3BlbmVkKHRhc2s6IGFueSk6IHZvaWQ7XHJcbiAgICBvblJlc2l6ZSgkZXZlbnQ6IGFueSk6IHZvaWQ7XHJcbn1cclxuIl19