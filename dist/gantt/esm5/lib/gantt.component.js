/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { GanttService } from './shared/services/gantt.service';
var GanttComponent = /** @class */ (function () {
    function GanttComponent(ganttService) {
        this.ganttService = ganttService;
        this.onGridRowClick = new EventEmitter();
        this.onPopoverOpen = new EventEmitter();
    }
    Object.defineProperty(GanttComponent.prototype, "project", {
        get: /**
         * @return {?}
         */
        function () { return this._project; },
        set: /**
         * @param {?} project
         * @return {?}
         */
        function (project) {
            if (project) {
                this._project = project;
            }
            else {
                this.setDefaultProject();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GanttComponent.prototype, "options", {
        get: /**
         * @return {?}
         */
        function () { return this._options; },
        set: /**
         * @param {?} options
         * @return {?}
         */
        function (options) {
            if (options.scale) {
                this._options = options;
            }
            else {
                this.setDefaultOptions();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    GanttComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    GanttComponent.prototype.setSizes = /**
     * @return {?}
     */
    function () {
        this.ganttContainerWidth = this.ganttService.calculateContainerWidth();
    };
    /**
     * @return {?}
     */
    GanttComponent.prototype.setDefaultOptions = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var scale = this.ganttService.calculateGridScale(this._project.tasks);
        this._options = {
            scale: scale
        };
    };
    /**
     * @return {?}
     */
    GanttComponent.prototype.setDefaultProject = /**
     * @return {?}
     */
    function () {
        this._project = {
            id: '',
            name: '',
            startDate: null,
            tasks: []
        };
    };
    /**
     * @param {?} task
     * @return {?}
     */
    GanttComponent.prototype.gridRowClicked = /**
     * @param {?} task
     * @return {?}
     */
    function (task) {
        this.onGridRowClick.emit(task);
    };
    /**
     * @param {?} task
     * @return {?}
     */
    GanttComponent.prototype.popoverOpened = /**
     * @param {?} task
     * @return {?}
     */
    function (task) {
        this.onPopoverOpen.emit(task);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    GanttComponent.prototype.onResize = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.setSizes();
    };
    GanttComponent.decorators = [
        { type: Component, args: [{
                    selector: 'gantt',
                    template: "\n        <div [ngStyle]=\"{ 'width': '100%' }\">\n            <div class=\"gantt-container\" (window:resize)=\"onResize($event)\">\n                <!--<gantt-header [name]=\"_project.name\" [startDate]=\"_project.startDate\"></gantt-header>-->\n                <gantt-activity [project]=\"_project\" [options]=\"_options\" (onGridRowClick)=\"gridRowClicked($event)\" (onPopoverOpen)=\"popoverOpened($event)\"></gantt-activity>\n                <!--<gantt-footer [project]=\"_project\"></gantt-footer>-->\n            </div>\n        </div>\n    ",
                    providers: [],
                    styles: ["\n        .gantt-container {\n            font-family: Arial;\n            font-size: 13px;\n            border: 1px solid #cecece;\n            position: relative;\n            white-space: nowrap;\n            margin-top: 0px;\n        }\n    "]
                }] }
    ];
    /** @nocollapse */
    GanttComponent.ctorParameters = function () { return [
        { type: GanttService }
    ]; };
    GanttComponent.propDecorators = {
        project: [{ type: Input }],
        options: [{ type: Input }],
        onGridRowClick: [{ type: Output }],
        onPopoverOpen: [{ type: Output }]
    };
    return GanttComponent;
}());
export { GanttComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1nYW50dC8iLCJzb3VyY2VzIjpbImxpYi9nYW50dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFL0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRy9EO0lBb0RJLHdCQUFtQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUxuQyxtQkFBYyxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzVELGtCQUFhLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7SUFJcEIsQ0FBQztJQXpCbEQsc0JBQ0ksbUNBQU87Ozs7UUFPWCxjQUFnQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzs7OztRQVJ2QyxVQUNZLE9BQVk7WUFDcEIsSUFBSSxPQUFPLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7YUFDM0I7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7YUFDNUI7UUFDTCxDQUFDOzs7T0FBQTtJQUdELHNCQUNJLG1DQUFPOzs7O1FBT1gsY0FBZ0IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7Ozs7UUFSdkMsVUFDWSxPQUFZO1lBQ3BCLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtnQkFDZixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQzthQUMzQjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzthQUM1QjtRQUNMLENBQUM7OztPQUFBOzs7O0lBVUQsaUNBQVE7OztJQUFSO0lBQ0EsQ0FBQzs7OztJQUVELGlDQUFROzs7SUFBUjtRQUNJLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLHVCQUF1QixFQUFFLENBQUM7SUFDM0UsQ0FBQzs7OztJQUVELDBDQUFpQjs7O0lBQWpCOztZQUNVLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxRQUFRLEdBQUc7WUFDWixLQUFLLE9BQUE7U0FDUixDQUFDO0lBQ04sQ0FBQzs7OztJQUVELDBDQUFpQjs7O0lBQWpCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRztZQUNaLEVBQUUsRUFBRSxFQUFFO1lBQ04sSUFBSSxFQUFFLEVBQUU7WUFDUixTQUFTLEVBQUUsSUFBSTtZQUNmLEtBQUssRUFBRSxFQUFFO1NBQ1osQ0FBQztJQUNOLENBQUM7Ozs7O0lBRUQsdUNBQWM7Ozs7SUFBZCxVQUFlLElBQVM7UUFDcEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7Ozs7SUFFRCxzQ0FBYTs7OztJQUFiLFVBQWMsSUFBUztRQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs7OztJQUVELGlDQUFROzs7O0lBQVIsVUFBUyxNQUFXO1FBQ2hCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDOztnQkF2RkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxPQUFPO29CQUNqQixRQUFRLEVBQUUscWlCQVFUO29CQVdELFNBQVMsRUFBRSxFQUFFOzZCQVZKLHVQQVNSO2lCQUVKOzs7O2dCQXpCUSxZQUFZOzs7MEJBOEJoQixLQUFLOzBCQVVMLEtBQUs7aUNBVUwsTUFBTTtnQ0FDTixNQUFNOztJQXdDWCxxQkFBQztDQUFBLEFBeEZELElBd0ZDO1NBakVZLGNBQWM7OztJQUN2QixrQ0FBa0I7O0lBQ2xCLGtDQUF3Qjs7SUFzQnhCLHdDQUFzRTs7SUFDdEUsdUNBQXFFOztJQUVyRSw2Q0FBNEI7O0lBRWhCLHNDQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmdTdHlsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEdhbnR0U2VydmljZSB9IGZyb20gJy4vc2hhcmVkL3NlcnZpY2VzL2dhbnR0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJR2FudHRPcHRpb25zLCBQcm9qZWN0IH0gZnJvbSAnLi9zaGFyZWQvaW50ZXJmYWNlcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnZ2FudHQnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IFtuZ1N0eWxlXT1cInsgJ3dpZHRoJzogJzEwMCUnIH1cIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbnR0LWNvbnRhaW5lclwiICh3aW5kb3c6cmVzaXplKT1cIm9uUmVzaXplKCRldmVudClcIj5cclxuICAgICAgICAgICAgICAgIDwhLS08Z2FudHQtaGVhZGVyIFtuYW1lXT1cIl9wcm9qZWN0Lm5hbWVcIiBbc3RhcnREYXRlXT1cIl9wcm9qZWN0LnN0YXJ0RGF0ZVwiPjwvZ2FudHQtaGVhZGVyPi0tPlxyXG4gICAgICAgICAgICAgICAgPGdhbnR0LWFjdGl2aXR5IFtwcm9qZWN0XT1cIl9wcm9qZWN0XCIgW29wdGlvbnNdPVwiX29wdGlvbnNcIiAob25HcmlkUm93Q2xpY2spPVwiZ3JpZFJvd0NsaWNrZWQoJGV2ZW50KVwiIChvblBvcG92ZXJPcGVuKT1cInBvcG92ZXJPcGVuZWQoJGV2ZW50KVwiPjwvZ2FudHQtYWN0aXZpdHk+XHJcbiAgICAgICAgICAgICAgICA8IS0tPGdhbnR0LWZvb3RlciBbcHJvamVjdF09XCJfcHJvamVjdFwiPjwvZ2FudHQtZm9vdGVyPi0tPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBzdHlsZXM6IFtgXHJcbiAgICAgICAgLmdhbnR0LWNvbnRhaW5lciB7XHJcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiBBcmlhbDtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjY2VjZWNlO1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDBweDtcclxuICAgICAgICB9XHJcbiAgICBgXSxcclxuICAgIHByb3ZpZGVyczogW11cclxufSlcclxuZXhwb3J0IGNsYXNzIEdhbnR0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIF9wcm9qZWN0OiBQcm9qZWN0O1xyXG4gICAgX29wdGlvbnM6IElHYW50dE9wdGlvbnM7XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHNldCBwcm9qZWN0KHByb2plY3Q6IGFueSkge1xyXG4gICAgICAgIGlmIChwcm9qZWN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Byb2plY3QgPSBwcm9qZWN0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGVmYXVsdFByb2plY3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXQgcHJvamVjdCgpIHsgcmV0dXJuIHRoaXMuX3Byb2plY3Q7IH1cclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2V0IG9wdGlvbnMob3B0aW9uczogYW55KSB7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMuc2NhbGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREZWZhdWx0T3B0aW9ucygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldCBvcHRpb25zKCkgeyByZXR1cm4gdGhpcy5fb3B0aW9uczsgfVxyXG5cclxuICAgIEBPdXRwdXQoKSBvbkdyaWRSb3dDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAgIEBPdXRwdXQoKSBvblBvcG92ZXJPcGVuOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICAgIGdhbnR0Q29udGFpbmVyV2lkdGg6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZ2FudHRTZXJ2aWNlOiBHYW50dFNlcnZpY2UpIHsgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgfVxyXG5cclxuICAgIHNldFNpemVzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZ2FudHRDb250YWluZXJXaWR0aCA9IHRoaXMuZ2FudHRTZXJ2aWNlLmNhbGN1bGF0ZUNvbnRhaW5lcldpZHRoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGVmYXVsdE9wdGlvbnMoKSB7XHJcbiAgICAgICAgY29uc3Qgc2NhbGUgPSB0aGlzLmdhbnR0U2VydmljZS5jYWxjdWxhdGVHcmlkU2NhbGUodGhpcy5fcHJvamVjdC50YXNrcyk7XHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgc2NhbGVcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHNldERlZmF1bHRQcm9qZWN0KCkge1xyXG4gICAgICAgIHRoaXMuX3Byb2plY3QgPSB7XHJcbiAgICAgICAgICAgIGlkOiAnJyxcclxuICAgICAgICAgICAgbmFtZTogJycsXHJcbiAgICAgICAgICAgIHN0YXJ0RGF0ZTogbnVsbCxcclxuICAgICAgICAgICAgdGFza3M6IFtdXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBncmlkUm93Q2xpY2tlZCh0YXNrOiBhbnkpIHtcclxuICAgICAgICB0aGlzLm9uR3JpZFJvd0NsaWNrLmVtaXQodGFzayk7XHJcbiAgICB9XHJcblxyXG4gICAgcG9wb3Zlck9wZW5lZCh0YXNrOiBhbnkpIHtcclxuICAgICAgICB0aGlzLm9uUG9wb3Zlck9wZW4uZW1pdCh0YXNrKTtcclxuICAgIH1cclxuXHJcbiAgICBvblJlc2l6ZSgkZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2V0U2l6ZXMoKTtcclxuICAgIH1cclxufVxyXG4iXX0=