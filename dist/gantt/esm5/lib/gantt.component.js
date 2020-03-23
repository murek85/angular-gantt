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
    }
    Object.defineProperty(GanttComponent.prototype, "project", {
        get: /**
         * @return {?}
         */
        function () { return this._project; },
        //TODO(dale): this may be causing an issue in the tree builder?
        set: 
        //TODO(dale): this may be causing an issue in the tree builder?
        /**
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
                    template: "\n        <div style=\"width: 100%\">\n            <div class=\"gantt_container\" (window:resize)=\"onResize($event)\">\n                <gantt-header [name]=\"_project.name\" [startDate]=\"_project.startDate\"></gantt-header>\n                <gantt-activity [project]=\"_project\" [options]=\"_options\" (onGridRowClick)=\"gridRowClicked($event)\"></gantt-activity>\n                <gantt-footer [project]=\"_project\"></gantt-footer>\n            </div>\n        </div>\n    ",
                    providers: [],
                    styles: ["\n        .gantt_container {\n            font-family: Arial;\n            font-size: 13px;\n            border: 1px solid #cecece;\n            position: relative;\n            white-space: nowrap;\n            margin-top: 0px;\n        }\n    "]
                }] }
    ];
    /** @nocollapse */
    GanttComponent.ctorParameters = function () { return [
        { type: GanttService }
    ]; };
    GanttComponent.propDecorators = {
        project: [{ type: Input }],
        options: [{ type: Input }],
        onGridRowClick: [{ type: Output }]
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
    /**
     * @type {?}
     * @private
     */
    GanttComponent.prototype.ganttContainerWidth;
    /**
     * @type {?}
     * @private
     */
    GanttComponent.prototype.ganttService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1nYW50dC8iLCJzb3VyY2VzIjpbImxpYi9nYW50dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFL0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRy9EO0lBb0RJLHdCQUFvQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUpwQyxtQkFBYyxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO0lBSXBCLENBQUM7SUF4Qm5ELHNCQUNJLG1DQUFPOzs7O1FBT1gsY0FBZ0IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQVR2QywrREFBK0Q7Ozs7Ozs7UUFDL0QsVUFDWSxPQUFZO1lBQ3BCLElBQUksT0FBTyxFQUFFO2dCQUNULElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO2FBQzNCO2lCQUFNO2dCQUNILElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQzVCO1FBQ0wsQ0FBQzs7O09BQUE7SUFHRCxzQkFDSSxtQ0FBTzs7OztRQU9YLGNBQWdCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Ozs7O1FBUnZDLFVBQ1ksT0FBWTtZQUNwQixJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7YUFDM0I7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7YUFDNUI7UUFDTCxDQUFDOzs7T0FBQTs7OztJQVNELGlDQUFROzs7SUFBUjtJQUVDLENBQUM7Ozs7SUFFRixpQ0FBUTs7O0lBQVI7UUFDSSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBQzNFLENBQUM7Ozs7SUFFRCwwQ0FBaUI7OztJQUFqQjs7WUFDUSxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUVyRSxJQUFJLENBQUMsUUFBUSxHQUFHO1lBQ1osS0FBSyxFQUFFLEtBQUs7U0FDZixDQUFDO0lBQ04sQ0FBQzs7OztJQUVELDBDQUFpQjs7O0lBQWpCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRztZQUNaLEVBQUUsRUFBRSxFQUFFO1lBQ04sSUFBSSxFQUFFLEVBQUU7WUFDUixTQUFTLEVBQUUsSUFBSTtZQUNmLEtBQUssRUFBRSxFQUFFO1NBQ1osQ0FBQztJQUNOLENBQUM7Ozs7O0lBRUQsdUNBQWM7Ozs7SUFBZCxVQUFlLElBQVM7UUFDcEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7Ozs7SUFFRCxpQ0FBUTs7OztJQUFSLFVBQVMsTUFBVztRQUNoQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQzs7Z0JBckZKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsT0FBTztvQkFDakIsUUFBUSxFQUFFLGllQVFUO29CQVdELFNBQVMsRUFBRSxFQUFFOzZCQVZKLHVQQVNSO2lCQUVKOzs7O2dCQXpCUSxZQUFZOzs7MEJBK0JoQixLQUFLOzBCQVVMLEtBQUs7aUNBVUwsTUFBTTs7SUFzQ1gscUJBQUM7Q0FBQSxBQXRGRCxJQXNGQztTQS9EWSxjQUFjOzs7SUFDdkIsa0NBQWtCOztJQUNsQixrQ0FBd0I7O0lBdUJ4Qix3Q0FBc0U7Ozs7O0lBRXRFLDZDQUFvQzs7Ozs7SUFFeEIsc0NBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ1N0eWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgR2FudHRTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvc2VydmljZXMvZ2FudHQuc2VydmljZSc7XHJcbmltcG9ydCB7IElHYW50dE9wdGlvbnMsIFByb2plY3QgfSBmcm9tICcuL3NoYXJlZC9pbnRlcmZhY2VzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdnYW50dCcsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDogMTAwJVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHRfY29udGFpbmVyXCIgKHdpbmRvdzpyZXNpemUpPVwib25SZXNpemUoJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICAgICAgPGdhbnR0LWhlYWRlciBbbmFtZV09XCJfcHJvamVjdC5uYW1lXCIgW3N0YXJ0RGF0ZV09XCJfcHJvamVjdC5zdGFydERhdGVcIj48L2dhbnR0LWhlYWRlcj5cclxuICAgICAgICAgICAgICAgIDxnYW50dC1hY3Rpdml0eSBbcHJvamVjdF09XCJfcHJvamVjdFwiIFtvcHRpb25zXT1cIl9vcHRpb25zXCIgKG9uR3JpZFJvd0NsaWNrKT1cImdyaWRSb3dDbGlja2VkKCRldmVudClcIj48L2dhbnR0LWFjdGl2aXR5PlxyXG4gICAgICAgICAgICAgICAgPGdhbnR0LWZvb3RlciBbcHJvamVjdF09XCJfcHJvamVjdFwiPjwvZ2FudHQtZm9vdGVyPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBzdHlsZXM6IFtgXHJcbiAgICAgICAgLmdhbnR0X2NvbnRhaW5lciB7XHJcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiBBcmlhbDtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjY2VjZWNlO1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDBweDtcclxuICAgICAgICB9XHJcbiAgICBgXSxcclxuICAgIHByb3ZpZGVyczogW11cclxufSlcclxuZXhwb3J0IGNsYXNzIEdhbnR0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIF9wcm9qZWN0OiBQcm9qZWN0O1xyXG4gICAgX29wdGlvbnM6IElHYW50dE9wdGlvbnM7XHJcblxyXG4gICAgLy9UT0RPKGRhbGUpOiB0aGlzIG1heSBiZSBjYXVzaW5nIGFuIGlzc3VlIGluIHRoZSB0cmVlIGJ1aWxkZXI/XHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2V0IHByb2plY3QocHJvamVjdDogYW55KSB7XHJcbiAgICAgICAgaWYgKHByb2plY3QpIHtcclxuICAgICAgICAgICAgdGhpcy5fcHJvamVjdCA9IHByb2plY3Q7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREZWZhdWx0UHJvamVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldCBwcm9qZWN0KCkgeyByZXR1cm4gdGhpcy5fcHJvamVjdDsgfVxyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBzZXQgb3B0aW9ucyhvcHRpb25zOiBhbnkpIHtcclxuICAgICAgICBpZiAob3B0aW9ucy5zY2FsZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldERlZmF1bHRPcHRpb25zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0IG9wdGlvbnMoKSB7IHJldHVybiB0aGlzLl9vcHRpb25zOyB9XHJcblxyXG4gICAgQE91dHB1dCgpIG9uR3JpZFJvd0NsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICAgIHByaXZhdGUgZ2FudHRDb250YWluZXJXaWR0aDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZ2FudHRTZXJ2aWNlOiBHYW50dFNlcnZpY2UpIHsgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG5cclxuICAgICB9XHJcblxyXG4gICAgc2V0U2l6ZXMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5nYW50dENvbnRhaW5lcldpZHRoID0gdGhpcy5nYW50dFNlcnZpY2UuY2FsY3VsYXRlQ29udGFpbmVyV2lkdGgoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXREZWZhdWx0T3B0aW9ucygpIHtcclxuICAgICAgICB2YXIgc2NhbGUgPSB0aGlzLmdhbnR0U2VydmljZS5jYWxjdWxhdGVHcmlkU2NhbGUodGhpcy5fcHJvamVjdC50YXNrcyk7XHJcblxyXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHNjYWxlOiBzY2FsZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGVmYXVsdFByb2plY3QoKSB7XHJcbiAgICAgICAgdGhpcy5fcHJvamVjdCA9IHtcclxuICAgICAgICAgICAgaWQ6ICcnLFxyXG4gICAgICAgICAgICBuYW1lOiAnJyxcclxuICAgICAgICAgICAgc3RhcnREYXRlOiBudWxsLFxyXG4gICAgICAgICAgICB0YXNrczogW11cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGdyaWRSb3dDbGlja2VkKHRhc2s6IGFueSkge1xyXG4gICAgICAgIHRoaXMub25HcmlkUm93Q2xpY2suZW1pdCh0YXNrKTtcclxuICAgIH1cclxuXHJcbiAgICBvblJlc2l6ZSgkZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2V0U2l6ZXMoKTtcclxuICAgIH1cclxufVxyXG4iXX0=