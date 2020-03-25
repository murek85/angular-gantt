/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { GanttService } from '../../shared/services/gantt.service';
var GanttActivityBackgroundComponent = /** @class */ (function () {
    function GanttActivityBackgroundComponent(ganttService) {
        this.ganttService = ganttService;
        this.rows = [];
        this.cells = [];
    }
    /**
     * @return {?}
     */
    GanttActivityBackgroundComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.drawGrid();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    GanttActivityBackgroundComponent.prototype.isDayWeekend = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.ganttService.isDayWeekend(date);
    };
    /**
     * @return {?}
     */
    GanttActivityBackgroundComponent.prototype.setRowStyle = /**
     * @return {?}
     */
    function () {
        return {
            'height': this.ganttService.rowHeight + 'px'
        };
    };
    /**
     * @return {?}
     */
    GanttActivityBackgroundComponent.prototype.setCellStyle = /**
     * @return {?}
     */
    function () {
        return {
            'width': this.ganttService.cellWidth + 'px'
        };
    };
    /**
     * @private
     * @return {?}
     */
    GanttActivityBackgroundComponent.prototype.drawGrid = /**
     * @private
     * @return {?}
     */
    function () {
        this.cells = this.timeScale;
    };
    GanttActivityBackgroundComponent.decorators = [
        { type: Component, args: [{
                    selector: 'activity-background',
                    template: "\n    <div #bg class=\"gantt-activity-bg\">\n        <div class=\"gantt-activity-row\"\n            [ngStyle]=\"setRowStyle()\"\n            *ngFor=\"let row of tasks\">\n\n            <div class=\"gantt-activity-cell\"\n                [ngStyle]=\"setCellStyle()\"\n                *ngFor=\"let cell of cells; let i = index; let l = last\" [ngClass]=\"(i % 2) ? 'weekend' : ''\" ></div>\n        </div>\n    </div>\n    ",
                    styles: ["\n        .weekend {\n            background-color: whitesmoke;\n        }\n        .gantt-activity-bg {\n            overflow: hidden;\n        }\n        .gantt-activity-row {\n            border-bottom: 1px solid #ebebeb;\n            background-color: #fff;\n            box-sizing: border-box;\n        }\n        .gantt-activity-cell {\n            display: inline-block;\n            height: 100%;\n            border-right: 1px solid #ebebeb;\n        }\n    "]
                }] }
    ];
    /** @nocollapse */
    GanttActivityBackgroundComponent.ctorParameters = function () { return [
        { type: GanttService }
    ]; };
    GanttActivityBackgroundComponent.propDecorators = {
        tasks: [{ type: Input }],
        timeScale: [{ type: Input }],
        bg: [{ type: ViewChild, args: ['bg',] }]
    };
    return GanttActivityBackgroundComponent;
}());
export { GanttActivityBackgroundComponent };
if (false) {
    /** @type {?} */
    GanttActivityBackgroundComponent.prototype.tasks;
    /** @type {?} */
    GanttActivityBackgroundComponent.prototype.timeScale;
    /** @type {?} */
    GanttActivityBackgroundComponent.prototype.bg;
    /** @type {?} */
    GanttActivityBackgroundComponent.prototype.rows;
    /** @type {?} */
    GanttActivityBackgroundComponent.prototype.cells;
    /** @type {?} */
    GanttActivityBackgroundComponent.prototype.ganttService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHktYmFja2dyb3VuZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWdhbnR0LyIsInNvdXJjZXMiOlsibGliL2FjdGl2aXR5L2JhY2tncm91bmQvYWN0aXZpdHktYmFja2dyb3VuZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBRW5FO0lBMENJLDBDQUFtQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUg3QyxTQUFJLEdBQVUsRUFBRSxDQUFDO1FBQ2pCLFVBQUssR0FBVSxFQUFFLENBQUM7SUFFK0IsQ0FBQzs7OztJQUVsRCxtREFBUTs7O0lBQVI7UUFDSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQzs7Ozs7SUFFRCx1REFBWTs7OztJQUFaLFVBQWEsSUFBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hELENBQUM7Ozs7SUFFRCxzREFBVzs7O0lBQVg7UUFDSSxPQUFPO1lBQ0gsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLElBQUk7U0FDL0MsQ0FBQztJQUNOLENBQUM7Ozs7SUFFRCx1REFBWTs7O0lBQVo7UUFDSSxPQUFPO1lBQ0gsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLElBQUk7U0FDOUMsQ0FBQztJQUNOLENBQUM7Ozs7O0lBRU8sbURBQVE7Ozs7SUFBaEI7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDaEMsQ0FBQzs7Z0JBbEVKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixRQUFRLEVBQUUsdWFBV1Q7NkJBQ1EscWRBaUJSO2lCQUNKOzs7O2dCQWxDUSxZQUFZOzs7d0JBb0NoQixLQUFLOzRCQUNMLEtBQUs7cUJBRUwsU0FBUyxTQUFDLElBQUk7O0lBOEJuQix1Q0FBQztDQUFBLEFBbkVELElBbUVDO1NBbENZLGdDQUFnQzs7O0lBQ3pDLGlEQUFvQjs7SUFDcEIscURBQXdCOztJQUV4Qiw4Q0FBZ0M7O0lBRWhDLGdEQUFpQjs7SUFDakIsaURBQWtCOztJQUVOLHdEQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEdhbnR0U2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9nYW50dC5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdhY3Rpdml0eS1iYWNrZ3JvdW5kJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2ICNiZyBjbGFzcz1cImdhbnR0LWFjdGl2aXR5LWJnXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImdhbnR0LWFjdGl2aXR5LXJvd1wiXHJcbiAgICAgICAgICAgIFtuZ1N0eWxlXT1cInNldFJvd1N0eWxlKClcIlxyXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgcm93IG9mIHRhc2tzXCI+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtYWN0aXZpdHktY2VsbFwiXHJcbiAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJzZXRDZWxsU3R5bGUoKVwiXHJcbiAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgY2VsbCBvZiBjZWxsczsgbGV0IGkgPSBpbmRleDsgbGV0IGwgPSBsYXN0XCIgW25nQ2xhc3NdPVwiKGkgJSAyKSA/ICd3ZWVrZW5kJyA6ICcnXCIgPjwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgc3R5bGVzOiBbYFxyXG4gICAgICAgIC53ZWVrZW5kIHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGVzbW9rZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdhbnR0LWFjdGl2aXR5LWJnIHtcclxuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdhbnR0LWFjdGl2aXR5LXJvdyB7XHJcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWJlYmViO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ2FudHQtYWN0aXZpdHktY2VsbCB7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgICAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZWJlYmViO1xyXG4gICAgICAgIH1cclxuICAgIGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHYW50dEFjdGl2aXR5QmFja2dyb3VuZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBASW5wdXQoKSB0YXNrczogYW55O1xyXG4gICAgQElucHV0KCkgdGltZVNjYWxlOiBhbnk7XHJcblxyXG4gICAgQFZpZXdDaGlsZCgnYmcnKSBiZzogRWxlbWVudFJlZjtcclxuXHJcbiAgICByb3dzOiBhbnlbXSA9IFtdO1xyXG4gICAgY2VsbHM6IGFueVtdID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGdhbnR0U2VydmljZTogR2FudHRTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmRyYXdHcmlkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNEYXlXZWVrZW5kKGRhdGU6IERhdGUpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nYW50dFNlcnZpY2UuaXNEYXlXZWVrZW5kKGRhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFJvd1N0eWxlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICdoZWlnaHQnOiB0aGlzLmdhbnR0U2VydmljZS5yb3dIZWlnaHQgKyAncHgnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDZWxsU3R5bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ3dpZHRoJzogdGhpcy5nYW50dFNlcnZpY2UuY2VsbFdpZHRoICsgJ3B4J1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3R3JpZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNlbGxzID0gdGhpcy50aW1lU2NhbGU7XHJcbiAgICB9XHJcbn1cclxuIl19