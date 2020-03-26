/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { GanttService } from './shared/services/gantt.service';
export class GanttComponent {
    /**
     * @param {?} ganttService
     */
    constructor(ganttService) {
        this.ganttService = ganttService;
        this.onGridRowClick = new EventEmitter();
        this.onPopoverOpen = new EventEmitter();
    }
    /**
     * @param {?} project
     * @return {?}
     */
    set project(project) {
        if (project) {
            this._project = project;
        }
        else {
            this.setDefaultProject();
        }
    }
    /**
     * @return {?}
     */
    get project() { return this._project; }
    /**
     * @param {?} options
     * @return {?}
     */
    set options(options) {
        if (options.scale) {
            this._options = options;
        }
        else {
            this.setDefaultOptions();
        }
    }
    /**
     * @return {?}
     */
    get options() { return this._options; }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    setSizes() {
        this.ganttContainerWidth = this.ganttService.calculateContainerWidth();
    }
    /**
     * @return {?}
     */
    setDefaultOptions() {
        /** @type {?} */
        const scale = this.ganttService.calculateGridScale(this._project.tasks);
        /** @type {?} */
        const gridColumns = [
            { name: '', left: 0, width: 16 },
            { name: 'Zadanie', left: 0, width: 330 }
        ];
        this._options = {
            scale,
            gridColumns
        };
    }
    /**
     * @return {?}
     */
    setDefaultProject() {
        this._project = {
            name: '',
            startDate: null,
            tasks: []
        };
    }
    /**
     * @param {?} task
     * @return {?}
     */
    gridRowClicked(task) {
        this.onGridRowClick.emit(task);
    }
    /**
     * @param {?} task
     * @return {?}
     */
    popoverOpened(task) {
        this.onPopoverOpen.emit(task);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onResize($event) {
        this.setSizes();
    }
}
GanttComponent.decorators = [
    { type: Component, args: [{
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
                providers: [],
                styles: [`
        .gantt-container {
            font-family: Arial;
            font-size: 13px;
            border: 1px solid #cecece;
            position: relative;
            white-space: nowrap;
            margin-top: 0px;
        }
    `]
            }] }
];
/** @nocollapse */
GanttComponent.ctorParameters = () => [
    { type: GanttService }
];
GanttComponent.propDecorators = {
    project: [{ type: Input }],
    options: [{ type: Input }],
    onGridRowClick: [{ type: Output }],
    onPopoverOpen: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    GanttComponent.prototype._project;
    /** @type {?} */
    GanttComponent.prototype._options;
    /** @type {?} */
    GanttComponent.prototype.onGridRowClick;
    /** @type {?} */
    GanttComponent.prototype.onPopoverOpen;
    /** @type {?} */
    GanttComponent.prototype.ganttContainerWidth;
    /** @type {?} */
    GanttComponent.prototype.ganttService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1nYW50dC8iLCJzb3VyY2VzIjpbImxpYi9nYW50dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFL0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBMEIvRCxNQUFNLE9BQU8sY0FBYzs7OztJQTZCdkIsWUFBbUIsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFMbkMsbUJBQWMsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUM1RCxrQkFBYSxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO0lBSXBCLENBQUM7Ozs7O0lBekJsRCxJQUNJLE9BQU8sQ0FBQyxPQUFZO1FBQ3BCLElBQUksT0FBTyxFQUFFO1lBQ1QsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7U0FDM0I7YUFBTTtZQUNILElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzVCO0lBQ0wsQ0FBQzs7OztJQUNELElBQUksT0FBTyxLQUFLLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBRXZDLElBQ0ksT0FBTyxDQUFDLE9BQVk7UUFDcEIsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQ2YsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7U0FDM0I7YUFBTTtZQUNILElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzVCO0lBQ0wsQ0FBQzs7OztJQUNELElBQUksT0FBTyxLQUFLLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Ozs7SUFTdkMsUUFBUTtJQUNSLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztJQUMzRSxDQUFDOzs7O0lBRUQsaUJBQWlCOztjQUNQLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDOztjQUNqRSxXQUFXLEdBQUc7WUFDaEIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRTtZQUNoQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO1NBQzNDO1FBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRztZQUNaLEtBQUs7WUFDTCxXQUFXO1NBQ2QsQ0FBQztJQUNOLENBQUM7Ozs7SUFFRCxpQkFBaUI7UUFDYixJQUFJLENBQUMsUUFBUSxHQUFHO1lBQ1osSUFBSSxFQUFFLEVBQUU7WUFDUixTQUFTLEVBQUUsSUFBSTtZQUNmLEtBQUssRUFBRSxFQUFFO1NBQ1osQ0FBQztJQUNOLENBQUM7Ozs7O0lBRUQsY0FBYyxDQUFDLElBQVM7UUFDcEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7Ozs7SUFFRCxhQUFhLENBQUMsSUFBUztRQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs7OztJQUVELFFBQVEsQ0FBQyxNQUFXO1FBQ2hCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDOzs7WUE1RkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixRQUFRLEVBQUU7Ozs7Ozs7O0tBUVQ7Z0JBV0QsU0FBUyxFQUFFLEVBQUU7eUJBVko7Ozs7Ozs7OztLQVNSO2FBRUo7Ozs7WUF6QlEsWUFBWTs7O3NCQThCaEIsS0FBSztzQkFVTCxLQUFLOzZCQVVMLE1BQU07NEJBQ04sTUFBTTs7OztJQXhCUCxrQ0FBa0I7O0lBQ2xCLGtDQUF3Qjs7SUFzQnhCLHdDQUFzRTs7SUFDdEUsdUNBQXFFOztJQUVyRSw2Q0FBNEI7O0lBRWhCLHNDQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmdTdHlsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEdhbnR0U2VydmljZSB9IGZyb20gJy4vc2hhcmVkL3NlcnZpY2VzL2dhbnR0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJR2FudHRPcHRpb25zLCBQcm9qZWN0IH0gZnJvbSAnLi9zaGFyZWQvaW50ZXJmYWNlcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnZ2FudHQnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IFtuZ1N0eWxlXT1cInsgJ3dpZHRoJzogJzEwMCUnIH1cIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbnR0LWNvbnRhaW5lclwiICh3aW5kb3c6cmVzaXplKT1cIm9uUmVzaXplKCRldmVudClcIj5cclxuICAgICAgICAgICAgICAgIDwhLS08Z2FudHQtaGVhZGVyIFtuYW1lXT1cIl9wcm9qZWN0Lm5hbWVcIiBbc3RhcnREYXRlXT1cIl9wcm9qZWN0LnN0YXJ0RGF0ZVwiPjwvZ2FudHQtaGVhZGVyPi0tPlxyXG4gICAgICAgICAgICAgICAgPGdhbnR0LWFjdGl2aXR5IFtwcm9qZWN0XT1cIl9wcm9qZWN0XCIgW29wdGlvbnNdPVwiX29wdGlvbnNcIiAob25HcmlkUm93Q2xpY2spPVwiZ3JpZFJvd0NsaWNrZWQoJGV2ZW50KVwiIChvblBvcG92ZXJPcGVuKT1cInBvcG92ZXJPcGVuZWQoJGV2ZW50KVwiPjwvZ2FudHQtYWN0aXZpdHk+XHJcbiAgICAgICAgICAgICAgICA8IS0tPGdhbnR0LWZvb3RlciBbcHJvamVjdF09XCJfcHJvamVjdFwiPjwvZ2FudHQtZm9vdGVyPi0tPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBzdHlsZXM6IFtgXHJcbiAgICAgICAgLmdhbnR0LWNvbnRhaW5lciB7XHJcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiBBcmlhbDtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjY2VjZWNlO1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDBweDtcclxuICAgICAgICB9XHJcbiAgICBgXSxcclxuICAgIHByb3ZpZGVyczogW11cclxufSlcclxuZXhwb3J0IGNsYXNzIEdhbnR0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIF9wcm9qZWN0OiBQcm9qZWN0O1xyXG4gICAgX29wdGlvbnM6IElHYW50dE9wdGlvbnM7XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHNldCBwcm9qZWN0KHByb2plY3Q6IGFueSkge1xyXG4gICAgICAgIGlmIChwcm9qZWN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Byb2plY3QgPSBwcm9qZWN0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGVmYXVsdFByb2plY3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXQgcHJvamVjdCgpIHsgcmV0dXJuIHRoaXMuX3Byb2plY3Q7IH1cclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2V0IG9wdGlvbnMob3B0aW9uczogYW55KSB7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMuc2NhbGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREZWZhdWx0T3B0aW9ucygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldCBvcHRpb25zKCkgeyByZXR1cm4gdGhpcy5fb3B0aW9uczsgfVxyXG5cclxuICAgIEBPdXRwdXQoKSBvbkdyaWRSb3dDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAgIEBPdXRwdXQoKSBvblBvcG92ZXJPcGVuOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICAgIGdhbnR0Q29udGFpbmVyV2lkdGg6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZ2FudHRTZXJ2aWNlOiBHYW50dFNlcnZpY2UpIHsgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgfVxyXG5cclxuICAgIHNldFNpemVzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZ2FudHRDb250YWluZXJXaWR0aCA9IHRoaXMuZ2FudHRTZXJ2aWNlLmNhbGN1bGF0ZUNvbnRhaW5lcldpZHRoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGVmYXVsdE9wdGlvbnMoKSB7XHJcbiAgICAgICAgY29uc3Qgc2NhbGUgPSB0aGlzLmdhbnR0U2VydmljZS5jYWxjdWxhdGVHcmlkU2NhbGUodGhpcy5fcHJvamVjdC50YXNrcyk7XHJcbiAgICAgICAgY29uc3QgZ3JpZENvbHVtbnMgPSBbXHJcbiAgICAgICAgICAgIHsgbmFtZTogJycsIGxlZnQ6IDAsIHdpZHRoOiAxNiB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdaYWRhbmllJywgbGVmdDogMCwgd2lkdGg6IDMzMCB9XHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgc2NhbGUsXHJcbiAgICAgICAgICAgIGdyaWRDb2x1bW5zXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzZXREZWZhdWx0UHJvamVjdCgpIHtcclxuICAgICAgICB0aGlzLl9wcm9qZWN0ID0ge1xyXG4gICAgICAgICAgICBuYW1lOiAnJyxcclxuICAgICAgICAgICAgc3RhcnREYXRlOiBudWxsLFxyXG4gICAgICAgICAgICB0YXNrczogW11cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGdyaWRSb3dDbGlja2VkKHRhc2s6IGFueSkge1xyXG4gICAgICAgIHRoaXMub25HcmlkUm93Q2xpY2suZW1pdCh0YXNrKTtcclxuICAgIH1cclxuXHJcbiAgICBwb3BvdmVyT3BlbmVkKHRhc2s6IGFueSkge1xyXG4gICAgICAgIHRoaXMub25Qb3BvdmVyT3Blbi5lbWl0KHRhc2spO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUmVzaXplKCRldmVudDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXRTaXplcygpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==