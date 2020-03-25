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
        this._options = {
            scale
        };
    }
    /**
     * @return {?}
     */
    setDefaultProject() {
        this._project = {
            id: '',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1nYW50dC8iLCJzb3VyY2VzIjpbImxpYi9nYW50dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFL0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBMEIvRCxNQUFNLE9BQU8sY0FBYzs7OztJQTZCdkIsWUFBbUIsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFMbkMsbUJBQWMsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUM1RCxrQkFBYSxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO0lBSXBCLENBQUM7Ozs7O0lBekJsRCxJQUNJLE9BQU8sQ0FBQyxPQUFZO1FBQ3BCLElBQUksT0FBTyxFQUFFO1lBQ1QsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7U0FDM0I7YUFBTTtZQUNILElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzVCO0lBQ0wsQ0FBQzs7OztJQUNELElBQUksT0FBTyxLQUFLLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBRXZDLElBQ0ksT0FBTyxDQUFDLE9BQVk7UUFDcEIsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQ2YsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7U0FDM0I7YUFBTTtZQUNILElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzVCO0lBQ0wsQ0FBQzs7OztJQUNELElBQUksT0FBTyxLQUFLLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Ozs7SUFTdkMsUUFBUTtJQUNSLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztJQUMzRSxDQUFDOzs7O0lBRUQsaUJBQWlCOztjQUNQLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxRQUFRLEdBQUc7WUFDWixLQUFLO1NBQ1IsQ0FBQztJQUNOLENBQUM7Ozs7SUFFRCxpQkFBaUI7UUFDYixJQUFJLENBQUMsUUFBUSxHQUFHO1lBQ1osRUFBRSxFQUFFLEVBQUU7WUFDTixJQUFJLEVBQUUsRUFBRTtZQUNSLFNBQVMsRUFBRSxJQUFJO1lBQ2YsS0FBSyxFQUFFLEVBQUU7U0FDWixDQUFDO0lBQ04sQ0FBQzs7Ozs7SUFFRCxjQUFjLENBQUMsSUFBUztRQUNwQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs7OztJQUVELGFBQWEsQ0FBQyxJQUFTO1FBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Ozs7O0lBRUQsUUFBUSxDQUFDLE1BQVc7UUFDaEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7OztZQXZGSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLE9BQU87Z0JBQ2pCLFFBQVEsRUFBRTs7Ozs7Ozs7S0FRVDtnQkFXRCxTQUFTLEVBQUUsRUFBRTt5QkFWSjs7Ozs7Ozs7O0tBU1I7YUFFSjs7OztZQXpCUSxZQUFZOzs7c0JBOEJoQixLQUFLO3NCQVVMLEtBQUs7NkJBVUwsTUFBTTs0QkFDTixNQUFNOzs7O0lBeEJQLGtDQUFrQjs7SUFDbEIsa0NBQXdCOztJQXNCeEIsd0NBQXNFOztJQUN0RSx1Q0FBcUU7O0lBRXJFLDZDQUE0Qjs7SUFFaEIsc0NBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ1N0eWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgR2FudHRTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvc2VydmljZXMvZ2FudHQuc2VydmljZSc7XHJcbmltcG9ydCB7IElHYW50dE9wdGlvbnMsIFByb2plY3QgfSBmcm9tICcuL3NoYXJlZC9pbnRlcmZhY2VzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdnYW50dCcsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgW25nU3R5bGVdPVwieyAnd2lkdGgnOiAnMTAwJScgfVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtY29udGFpbmVyXCIgKHdpbmRvdzpyZXNpemUpPVwib25SZXNpemUoJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICAgICAgPCEtLTxnYW50dC1oZWFkZXIgW25hbWVdPVwiX3Byb2plY3QubmFtZVwiIFtzdGFydERhdGVdPVwiX3Byb2plY3Quc3RhcnREYXRlXCI+PC9nYW50dC1oZWFkZXI+LS0+XHJcbiAgICAgICAgICAgICAgICA8Z2FudHQtYWN0aXZpdHkgW3Byb2plY3RdPVwiX3Byb2plY3RcIiBbb3B0aW9uc109XCJfb3B0aW9uc1wiIChvbkdyaWRSb3dDbGljayk9XCJncmlkUm93Q2xpY2tlZCgkZXZlbnQpXCIgKG9uUG9wb3Zlck9wZW4pPVwicG9wb3Zlck9wZW5lZCgkZXZlbnQpXCI+PC9nYW50dC1hY3Rpdml0eT5cclxuICAgICAgICAgICAgICAgIDwhLS08Z2FudHQtZm9vdGVyIFtwcm9qZWN0XT1cIl9wcm9qZWN0XCI+PC9nYW50dC1mb290ZXI+LS0+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICAgIHN0eWxlczogW2BcclxuICAgICAgICAuZ2FudHQtY29udGFpbmVyIHtcclxuICAgICAgICAgICAgZm9udC1mYW1pbHk6IEFyaWFsO1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNjZWNlY2U7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgICAgICAgICAgbWFyZ2luLXRvcDogMHB4O1xyXG4gICAgICAgIH1cclxuICAgIGBdLFxyXG4gICAgcHJvdmlkZXJzOiBbXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR2FudHRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgX3Byb2plY3Q6IFByb2plY3Q7XHJcbiAgICBfb3B0aW9uczogSUdhbnR0T3B0aW9ucztcclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2V0IHByb2plY3QocHJvamVjdDogYW55KSB7XHJcbiAgICAgICAgaWYgKHByb2plY3QpIHtcclxuICAgICAgICAgICAgdGhpcy5fcHJvamVjdCA9IHByb2plY3Q7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREZWZhdWx0UHJvamVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldCBwcm9qZWN0KCkgeyByZXR1cm4gdGhpcy5fcHJvamVjdDsgfVxyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBzZXQgb3B0aW9ucyhvcHRpb25zOiBhbnkpIHtcclxuICAgICAgICBpZiAob3B0aW9ucy5zY2FsZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldERlZmF1bHRPcHRpb25zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0IG9wdGlvbnMoKSB7IHJldHVybiB0aGlzLl9vcHRpb25zOyB9XHJcblxyXG4gICAgQE91dHB1dCgpIG9uR3JpZFJvd0NsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gICAgQE91dHB1dCgpIG9uUG9wb3Zlck9wZW46IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gICAgZ2FudHRDb250YWluZXJXaWR0aDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBnYW50dFNlcnZpY2U6IEdhbnR0U2VydmljZSkgeyB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2l6ZXMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5nYW50dENvbnRhaW5lcldpZHRoID0gdGhpcy5nYW50dFNlcnZpY2UuY2FsY3VsYXRlQ29udGFpbmVyV2lkdGgoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXREZWZhdWx0T3B0aW9ucygpIHtcclxuICAgICAgICBjb25zdCBzY2FsZSA9IHRoaXMuZ2FudHRTZXJ2aWNlLmNhbGN1bGF0ZUdyaWRTY2FsZSh0aGlzLl9wcm9qZWN0LnRhc2tzKTtcclxuICAgICAgICB0aGlzLl9vcHRpb25zID0ge1xyXG4gICAgICAgICAgICBzY2FsZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGVmYXVsdFByb2plY3QoKSB7XHJcbiAgICAgICAgdGhpcy5fcHJvamVjdCA9IHtcclxuICAgICAgICAgICAgaWQ6ICcnLFxyXG4gICAgICAgICAgICBuYW1lOiAnJyxcclxuICAgICAgICAgICAgc3RhcnREYXRlOiBudWxsLFxyXG4gICAgICAgICAgICB0YXNrczogW11cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGdyaWRSb3dDbGlja2VkKHRhc2s6IGFueSkge1xyXG4gICAgICAgIHRoaXMub25HcmlkUm93Q2xpY2suZW1pdCh0YXNrKTtcclxuICAgIH1cclxuXHJcbiAgICBwb3BvdmVyT3BlbmVkKHRhc2s6IGFueSkge1xyXG4gICAgICAgIHRoaXMub25Qb3BvdmVyT3Blbi5lbWl0KHRhc2spO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUmVzaXplKCRldmVudDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXRTaXplcygpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==