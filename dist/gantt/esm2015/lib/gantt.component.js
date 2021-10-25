import { Component, Input, EventEmitter, Output } from '@angular/core';
import { GanttService } from './shared/services/gantt.service';
import * as i0 from "@angular/core";
import * as i1 from "./shared/services/gantt.service";
import * as i2 from "@angular/common";
import * as i3 from "./activity/gantt-activity.component";
const _c0 = function () { return { "width": "100%" }; };
export class GanttComponent {
    constructor(ganttService) {
        this.ganttService = ganttService;
        this.onGridRowClick = new EventEmitter();
        this.onPopoverOpen = new EventEmitter();
    }
    set project(project) {
        if (project) {
            this._project = project;
        }
        else {
            this.setDefaultProject();
        }
    }
    get project() { return this._project; }
    set options(options) {
        if (options.scale) {
            this._options = options;
        }
        else {
            this.setDefaultOptions();
        }
    }
    get options() { return this._options; }
    ngOnInit() {
    }
    setSizes() {
        this.ganttContainerWidth = this.ganttService.calculateContainerWidth();
    }
    setDefaultOptions() {
        const scale = this.ganttService.calculateGridScale(this._project.tasks);
        const gridColumns = [
            { name: '', left: 0, width: 16 },
            { name: 'Zadanie', left: 0, width: 330 }
        ];
        this._options = {
            scale,
            gridColumns
        };
    }
    setDefaultProject() {
        this._project = {
            name: '',
            startDate: null,
            tasks: []
        };
    }
    gridRowClicked(task) {
        this.onGridRowClick.emit(task);
    }
    popoverOpened(task) {
        this.onPopoverOpen.emit(task);
    }
    onResize($event) {
        this.setSizes();
    }
}
/** @nocollapse */ GanttComponent.ɵfac = function GanttComponent_Factory(t) { return new (t || GanttComponent)(i0.ɵɵdirectiveInject(i1.GanttService)); };
/** @nocollapse */ GanttComponent.ɵcmp = i0.ɵɵdefineComponent({ type: GanttComponent, selectors: [["gantt"]], inputs: { project: "project", options: "options" }, outputs: { onGridRowClick: "onGridRowClick", onPopoverOpen: "onPopoverOpen" }, features: [i0.ɵɵProvidersFeature([])], decls: 3, vars: 4, consts: [[3, "ngStyle"], [1, "gantt-container", 3, "resize"], [3, "project", "options", "onGridRowClick", "onPopoverOpen"]], template: function GanttComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵlistener("resize", function GanttComponent_Template_div_resize_1_listener($event) { return ctx.onResize($event); }, false, i0.ɵɵresolveWindow);
        i0.ɵɵelementStart(2, "gantt-activity", 2);
        i0.ɵɵlistener("onGridRowClick", function GanttComponent_Template_gantt_activity_onGridRowClick_2_listener($event) { return ctx.gridRowClicked($event); })("onPopoverOpen", function GanttComponent_Template_gantt_activity_onPopoverOpen_2_listener($event) { return ctx.popoverOpened($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction0(3, _c0));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("project", ctx._project)("options", ctx._options);
    } }, directives: [i2.NgStyle, i3.GanttActivityComponent], styles: [".gantt-container[_ngcontent-%COMP%] {\n            font-family: Arial;\n            font-size: 13px;\n            border: 1px solid #cecece;\n            position: relative;\n            white-space: nowrap;\n            margin-top: 0px;\n        }"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(GanttComponent, [{
        type: Component,
        args: [{
                selector: 'gantt',
                template: `
        <div [ngStyle]="{ 'width': '100%' }">
            <div class="gantt-container" (window:resize)="onResize($event)">
                <!--<gantt-header [name]="_project.name" [startDate]="_project.startDate"></gantt-header>-->
                <gantt-activity [project]="_project" [options]="_options" (onGridRowClick)="gridRowClicked($event)" (onPopoverOpen)="popoverOpened($event)"></gantt-activity>
                <!--<gantt-footer [project]="_project"></gantt-footer>-->
            </div>
        </div>
    `,
                styles: [`
        .gantt-container {
            font-family: Arial;
            font-size: 13px;
            border: 1px solid #cecece;
            position: relative;
            white-space: nowrap;
            margin-top: 0px;
        }
    `],
                providers: []
            }]
    }], function () { return [{ type: i1.GanttService }]; }, { project: [{
            type: Input
        }], options: [{
            type: Input
        }], onGridRowClick: [{
            type: Output
        }], onPopoverOpen: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1nYW50dC8iLCJzb3VyY2VzIjpbImxpYi9nYW50dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUvRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUNBQWlDLENBQUM7Ozs7OztBQTBCL0QsTUFBTSxPQUFPLGNBQWM7SUE2QnZCLFlBQW1CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBTG5DLG1CQUFjLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFDNUQsa0JBQWEsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztJQUlwQixDQUFDO0lBekJsRCxJQUNJLE9BQU8sQ0FBQyxPQUFZO1FBQ3BCLElBQUksT0FBTyxFQUFFO1lBQ1QsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7U0FDM0I7YUFBTTtZQUNILElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzVCO0lBQ0wsQ0FBQztJQUNELElBQUksT0FBTyxLQUFLLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFFdkMsSUFDSSxPQUFPLENBQUMsT0FBWTtRQUNwQixJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDZixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztTQUMzQjthQUFNO1lBQ0gsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBQ0QsSUFBSSxPQUFPLEtBQUssT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQVN2QyxRQUFRO0lBQ1IsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBQzNFLENBQUM7SUFFRCxpQkFBaUI7UUFDYixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEUsTUFBTSxXQUFXLEdBQUc7WUFDaEIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRTtZQUNoQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO1NBQzNDLENBQUM7UUFFRixJQUFJLENBQUMsUUFBUSxHQUFHO1lBQ1osS0FBSztZQUNMLFdBQVc7U0FDZCxDQUFDO0lBQ04sQ0FBQztJQUVELGlCQUFpQjtRQUNiLElBQUksQ0FBQyxRQUFRLEdBQUc7WUFDWixJQUFJLEVBQUUsRUFBRTtZQUNSLFNBQVMsRUFBRSxJQUFJO1lBQ2YsS0FBSyxFQUFFLEVBQUU7U0FDWixDQUFDO0lBQ04sQ0FBQztJQUVELGNBQWMsQ0FBQyxJQUFTO1FBQ3BCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxhQUFhLENBQUMsSUFBUztRQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsUUFBUSxDQUFDLE1BQVc7UUFDaEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7OytGQXJFUSxjQUFjO3NFQUFkLGNBQWMsOExBRlosRUFBRTtRQWxCVCw4QkFDSTtRQUFBLDhCQUNJO1FBRHlCLGdHQUFpQixvQkFBZ0IsK0JBQUM7UUFFM0QseUNBQTZKO1FBQW5HLDJIQUFrQiwwQkFBc0IsSUFBQyw0R0FBa0IseUJBQXFCLElBQXZDO1FBQXlDLGlCQUFpQjtRQUVqSyxpQkFBTTtRQUNWLGlCQUFNOztRQU5ELG9EQUErQjtRQUdaLGVBQW9CO1FBQXBCLHNDQUFvQix5QkFBQTs7a0RBaUJ2QyxjQUFjO2NBdkIxQixTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLE9BQU87Z0JBQ2pCLFFBQVEsRUFBRTs7Ozs7Ozs7S0FRVDtnQkFDRCxNQUFNLEVBQUUsQ0FBQzs7Ozs7Ozs7O0tBU1IsQ0FBQztnQkFDRixTQUFTLEVBQUUsRUFBRTthQUNoQjs7a0JBS0ksS0FBSzs7a0JBVUwsS0FBSzs7a0JBVUwsTUFBTTs7a0JBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmdTdHlsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEdhbnR0U2VydmljZSB9IGZyb20gJy4vc2hhcmVkL3NlcnZpY2VzL2dhbnR0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJR2FudHRPcHRpb25zLCBQcm9qZWN0IH0gZnJvbSAnLi9zaGFyZWQvaW50ZXJmYWNlcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnZ2FudHQnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IFtuZ1N0eWxlXT1cInsgJ3dpZHRoJzogJzEwMCUnIH1cIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbnR0LWNvbnRhaW5lclwiICh3aW5kb3c6cmVzaXplKT1cIm9uUmVzaXplKCRldmVudClcIj5cclxuICAgICAgICAgICAgICAgIDwhLS08Z2FudHQtaGVhZGVyIFtuYW1lXT1cIl9wcm9qZWN0Lm5hbWVcIiBbc3RhcnREYXRlXT1cIl9wcm9qZWN0LnN0YXJ0RGF0ZVwiPjwvZ2FudHQtaGVhZGVyPi0tPlxyXG4gICAgICAgICAgICAgICAgPGdhbnR0LWFjdGl2aXR5IFtwcm9qZWN0XT1cIl9wcm9qZWN0XCIgW29wdGlvbnNdPVwiX29wdGlvbnNcIiAob25HcmlkUm93Q2xpY2spPVwiZ3JpZFJvd0NsaWNrZWQoJGV2ZW50KVwiIChvblBvcG92ZXJPcGVuKT1cInBvcG92ZXJPcGVuZWQoJGV2ZW50KVwiPjwvZ2FudHQtYWN0aXZpdHk+XHJcbiAgICAgICAgICAgICAgICA8IS0tPGdhbnR0LWZvb3RlciBbcHJvamVjdF09XCJfcHJvamVjdFwiPjwvZ2FudHQtZm9vdGVyPi0tPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBzdHlsZXM6IFtgXHJcbiAgICAgICAgLmdhbnR0LWNvbnRhaW5lciB7XHJcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiBBcmlhbDtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjY2VjZWNlO1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDBweDtcclxuICAgICAgICB9XHJcbiAgICBgXSxcclxuICAgIHByb3ZpZGVyczogW11cclxufSlcclxuZXhwb3J0IGNsYXNzIEdhbnR0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIF9wcm9qZWN0OiBQcm9qZWN0O1xyXG4gICAgX29wdGlvbnM6IElHYW50dE9wdGlvbnM7XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHNldCBwcm9qZWN0KHByb2plY3Q6IGFueSkge1xyXG4gICAgICAgIGlmIChwcm9qZWN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Byb2plY3QgPSBwcm9qZWN0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGVmYXVsdFByb2plY3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXQgcHJvamVjdCgpIHsgcmV0dXJuIHRoaXMuX3Byb2plY3Q7IH1cclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2V0IG9wdGlvbnMob3B0aW9uczogYW55KSB7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMuc2NhbGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREZWZhdWx0T3B0aW9ucygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldCBvcHRpb25zKCkgeyByZXR1cm4gdGhpcy5fb3B0aW9uczsgfVxyXG5cclxuICAgIEBPdXRwdXQoKSBvbkdyaWRSb3dDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAgIEBPdXRwdXQoKSBvblBvcG92ZXJPcGVuOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICAgIGdhbnR0Q29udGFpbmVyV2lkdGg6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZ2FudHRTZXJ2aWNlOiBHYW50dFNlcnZpY2UpIHsgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgfVxyXG5cclxuICAgIHNldFNpemVzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZ2FudHRDb250YWluZXJXaWR0aCA9IHRoaXMuZ2FudHRTZXJ2aWNlLmNhbGN1bGF0ZUNvbnRhaW5lcldpZHRoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGVmYXVsdE9wdGlvbnMoKSB7XHJcbiAgICAgICAgY29uc3Qgc2NhbGUgPSB0aGlzLmdhbnR0U2VydmljZS5jYWxjdWxhdGVHcmlkU2NhbGUodGhpcy5fcHJvamVjdC50YXNrcyk7XHJcbiAgICAgICAgY29uc3QgZ3JpZENvbHVtbnMgPSBbXHJcbiAgICAgICAgICAgIHsgbmFtZTogJycsIGxlZnQ6IDAsIHdpZHRoOiAxNiB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdaYWRhbmllJywgbGVmdDogMCwgd2lkdGg6IDMzMCB9XHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgc2NhbGUsXHJcbiAgICAgICAgICAgIGdyaWRDb2x1bW5zXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzZXREZWZhdWx0UHJvamVjdCgpIHtcclxuICAgICAgICB0aGlzLl9wcm9qZWN0ID0ge1xyXG4gICAgICAgICAgICBuYW1lOiAnJyxcclxuICAgICAgICAgICAgc3RhcnREYXRlOiBudWxsLFxyXG4gICAgICAgICAgICB0YXNrczogW11cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGdyaWRSb3dDbGlja2VkKHRhc2s6IGFueSkge1xyXG4gICAgICAgIHRoaXMub25HcmlkUm93Q2xpY2suZW1pdCh0YXNrKTtcclxuICAgIH1cclxuXHJcbiAgICBwb3BvdmVyT3BlbmVkKHRhc2s6IGFueSkge1xyXG4gICAgICAgIHRoaXMub25Qb3BvdmVyT3Blbi5lbWl0KHRhc2spO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUmVzaXplKCRldmVudDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXRTaXplcygpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==