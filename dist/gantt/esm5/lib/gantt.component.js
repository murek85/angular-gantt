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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1nYW50dC8iLCJzb3VyY2VzIjpbImxpYi9nYW50dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFL0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRy9EO0lBb0RJLHdCQUFtQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUxuQyxtQkFBYyxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzVELGtCQUFhLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7SUFJcEIsQ0FBQztJQXpCbEQsc0JBQ0ksbUNBQU87Ozs7UUFPWCxjQUFnQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzs7OztRQVJ2QyxVQUNZLE9BQVk7WUFDcEIsSUFBSSxPQUFPLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7YUFDM0I7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7YUFDNUI7UUFDTCxDQUFDOzs7T0FBQTtJQUdELHNCQUNJLG1DQUFPOzs7O1FBT1gsY0FBZ0IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7Ozs7UUFSdkMsVUFDWSxPQUFZO1lBQ3BCLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtnQkFDZixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQzthQUMzQjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzthQUM1QjtRQUNMLENBQUM7OztPQUFBOzs7O0lBVUQsaUNBQVE7OztJQUFSO0lBQ0EsQ0FBQzs7OztJQUVELGlDQUFROzs7SUFBUjtRQUNJLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLHVCQUF1QixFQUFFLENBQUM7SUFDM0UsQ0FBQzs7OztJQUVELDBDQUFpQjs7O0lBQWpCOztZQUNVLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxRQUFRLEdBQUc7WUFDWixLQUFLLE9BQUE7U0FDUixDQUFDO0lBQ04sQ0FBQzs7OztJQUVELDBDQUFpQjs7O0lBQWpCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRztZQUNaLElBQUksRUFBRSxFQUFFO1lBQ1IsU0FBUyxFQUFFLElBQUk7WUFDZixLQUFLLEVBQUUsRUFBRTtTQUNaLENBQUM7SUFDTixDQUFDOzs7OztJQUVELHVDQUFjOzs7O0lBQWQsVUFBZSxJQUFTO1FBQ3BCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7Ozs7O0lBRUQsc0NBQWE7Ozs7SUFBYixVQUFjLElBQVM7UUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7Ozs7SUFFRCxpQ0FBUTs7OztJQUFSLFVBQVMsTUFBVztRQUNoQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQzs7Z0JBdEZKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsT0FBTztvQkFDakIsUUFBUSxFQUFFLHFpQkFRVDtvQkFXRCxTQUFTLEVBQUUsRUFBRTs2QkFWSix1UEFTUjtpQkFFSjs7OztnQkF6QlEsWUFBWTs7OzBCQThCaEIsS0FBSzswQkFVTCxLQUFLO2lDQVVMLE1BQU07Z0NBQ04sTUFBTTs7SUF1Q1gscUJBQUM7Q0FBQSxBQXZGRCxJQXVGQztTQWhFWSxjQUFjOzs7SUFDdkIsa0NBQWtCOztJQUNsQixrQ0FBd0I7O0lBc0J4Qix3Q0FBc0U7O0lBQ3RFLHVDQUFxRTs7SUFFckUsNkNBQTRCOztJQUVoQixzQ0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5nU3R5bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBHYW50dFNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC9zZXJ2aWNlcy9nYW50dC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSUdhbnR0T3B0aW9ucywgUHJvamVjdCB9IGZyb20gJy4vc2hhcmVkL2ludGVyZmFjZXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2dhbnR0JyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBbbmdTdHlsZV09XCJ7ICd3aWR0aCc6ICcxMDAlJyB9XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1jb250YWluZXJcIiAod2luZG93OnJlc2l6ZSk9XCJvblJlc2l6ZSgkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgICAgICA8IS0tPGdhbnR0LWhlYWRlciBbbmFtZV09XCJfcHJvamVjdC5uYW1lXCIgW3N0YXJ0RGF0ZV09XCJfcHJvamVjdC5zdGFydERhdGVcIj48L2dhbnR0LWhlYWRlcj4tLT5cclxuICAgICAgICAgICAgICAgIDxnYW50dC1hY3Rpdml0eSBbcHJvamVjdF09XCJfcHJvamVjdFwiIFtvcHRpb25zXT1cIl9vcHRpb25zXCIgKG9uR3JpZFJvd0NsaWNrKT1cImdyaWRSb3dDbGlja2VkKCRldmVudClcIiAob25Qb3BvdmVyT3Blbik9XCJwb3BvdmVyT3BlbmVkKCRldmVudClcIj48L2dhbnR0LWFjdGl2aXR5PlxyXG4gICAgICAgICAgICAgICAgPCEtLTxnYW50dC1mb290ZXIgW3Byb2plY3RdPVwiX3Byb2plY3RcIj48L2dhbnR0LWZvb3Rlcj4tLT5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgc3R5bGVzOiBbYFxyXG4gICAgICAgIC5nYW50dC1jb250YWluZXIge1xyXG4gICAgICAgICAgICBmb250LWZhbWlseTogQXJpYWw7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2NlY2VjZTtcclxuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAwcHg7XHJcbiAgICAgICAgfVxyXG4gICAgYF0sXHJcbiAgICBwcm92aWRlcnM6IFtdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHYW50dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBfcHJvamVjdDogUHJvamVjdDtcclxuICAgIF9vcHRpb25zOiBJR2FudHRPcHRpb25zO1xyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBzZXQgcHJvamVjdChwcm9qZWN0OiBhbnkpIHtcclxuICAgICAgICBpZiAocHJvamVjdCkge1xyXG4gICAgICAgICAgICB0aGlzLl9wcm9qZWN0ID0gcHJvamVjdDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldERlZmF1bHRQcm9qZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0IHByb2plY3QoKSB7IHJldHVybiB0aGlzLl9wcm9qZWN0OyB9XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHNldCBvcHRpb25zKG9wdGlvbnM6IGFueSkge1xyXG4gICAgICAgIGlmIChvcHRpb25zLnNjYWxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGVmYXVsdE9wdGlvbnMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXQgb3B0aW9ucygpIHsgcmV0dXJuIHRoaXMuX29wdGlvbnM7IH1cclxuXHJcbiAgICBAT3V0cHV0KCkgb25HcmlkUm93Q2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgICBAT3V0cHV0KCkgb25Qb3BvdmVyT3BlbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgICBnYW50dENvbnRhaW5lcldpZHRoOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGdhbnR0U2VydmljZTogR2FudHRTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTaXplcygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmdhbnR0Q29udGFpbmVyV2lkdGggPSB0aGlzLmdhbnR0U2VydmljZS5jYWxjdWxhdGVDb250YWluZXJXaWR0aCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldERlZmF1bHRPcHRpb25zKCkge1xyXG4gICAgICAgIGNvbnN0IHNjYWxlID0gdGhpcy5nYW50dFNlcnZpY2UuY2FsY3VsYXRlR3JpZFNjYWxlKHRoaXMuX3Byb2plY3QudGFza3MpO1xyXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHNjYWxlXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzZXREZWZhdWx0UHJvamVjdCgpIHtcclxuICAgICAgICB0aGlzLl9wcm9qZWN0ID0ge1xyXG4gICAgICAgICAgICBuYW1lOiAnJyxcclxuICAgICAgICAgICAgc3RhcnREYXRlOiBudWxsLFxyXG4gICAgICAgICAgICB0YXNrczogW11cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGdyaWRSb3dDbGlja2VkKHRhc2s6IGFueSkge1xyXG4gICAgICAgIHRoaXMub25HcmlkUm93Q2xpY2suZW1pdCh0YXNrKTtcclxuICAgIH1cclxuXHJcbiAgICBwb3BvdmVyT3BlbmVkKHRhc2s6IGFueSkge1xyXG4gICAgICAgIHRoaXMub25Qb3BvdmVyT3Blbi5lbWl0KHRhc2spO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUmVzaXplKCRldmVudDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXRTaXplcygpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==