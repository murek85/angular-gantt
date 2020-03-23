/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { GanttService } from '../../shared/services/gantt.service';
import { Zooming } from '../../shared/interfaces';
var GanttTimeScaleComponent = /** @class */ (function () {
    function GanttTimeScaleComponent(ganttService) {
        this.ganttService = ganttService;
    }
    /**
     * @return {?}
     */
    GanttTimeScaleComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.zoom.subscribe(function (zoomLevel) {
            _this.zoomLevel = zoomLevel;
        });
    };
    /**
     * @return {?}
     */
    GanttTimeScaleComponent.prototype.setTimescaleStyle = /**
     * @return {?}
     */
    function () {
        return {
            'width': this.dimensions.width + 'px'
        };
    };
    /**
     * @param {?} borderTop
     * @return {?}
     */
    GanttTimeScaleComponent.prototype.setTimescaleLineStyle = /**
     * @param {?} borderTop
     * @return {?}
     */
    function (borderTop) {
        return {
            'height': this.ganttService.rowHeight + 'px',
            'line-height': this.ganttService.rowHeight + 'px',
            'position': 'relative',
            'border-top': borderTop
        };
    };
    /**
     * @return {?}
     */
    GanttTimeScaleComponent.prototype.setTimescaleCellStyle = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var width = this.ganttService.cellWidth;
        /** @type {?} */
        var hoursInDay = 24;
        /** @type {?} */
        var hourSeperatorPixels = 23;
        if (this.zoomLevel === Zooming[Zooming.hours]) {
            width = this.ganttService.hourCellWidth * hoursInDay + hourSeperatorPixels;
        }
        return {
            'width': width + 'px'
        };
    };
    /**
     * @param {?} date
     * @return {?}
     */
    GanttTimeScaleComponent.prototype.isDayWeekend = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.ganttService.isDayWeekend(date);
    };
    /**
     * @return {?}
     */
    GanttTimeScaleComponent.prototype.getHours = /**
     * @return {?}
     */
    function () {
        return this.ganttService.getHours(this.timeScale.length);
    };
    GanttTimeScaleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'time-scale',
                    template: "\n        <div class=\"time-scale\" [ngStyle]=\"setTimescaleStyle()\">\n            <div class=\"time-scale-line\" [ngStyle]=\"setTimescaleLineStyle('none')\">\n                <div class=\"time-scale-cell\" *ngFor=\"let date of timeScale\" \n                    [ngStyle]=\"setTimescaleCellStyle()\"\n                    [ngClass]=\"(isDayWeekend(date)) ? 'weekend' : ''\">{{date | date: 'dd-MM-yyyy'}}</div>\n            </div>\n            <div *ngIf=\"zoomLevel === 'hours'\" class=\"time-scale-line\" [ngStyle]=\"setTimescaleLineStyle('1px solid #cecece')\">\n                <div class=\"time-scale-cell\"\n                    *ngFor=\"let hour of getHours()\"\n                    [ngStyle]=\"{ 'width': ganttService.hourCellWidth + 'px' }\">{{hour}}</div>\n            </div>\n        </div>",
                    providers: [
                        GanttService
                    ],
                    styles: ["\n        .weekend {\n            background-color: whitesmoke;\n        }\n        .time-scale {\n            font-size: 12px;\n            border-bottom: 1px solid #cecece;\n            background-color: #fff;\n        }\n        .time-scale-line {\n            box-sizing: border-box;\n        }\n        .time-scale-line:first-child {\n            border-top: none;\n        }\n        .time-scale-cell {\n            display: inline-block;\n            white-space: nowrap;\n            overflow: hidden;\n            border-right: 1px solid #cecece;\n            text-align: center;\n            height: 100%;\n        }"]
                }] }
    ];
    /** @nocollapse */
    GanttTimeScaleComponent.ctorParameters = function () { return [
        { type: GanttService }
    ]; };
    GanttTimeScaleComponent.propDecorators = {
        timeScale: [{ type: Input }],
        dimensions: [{ type: Input }],
        zoom: [{ type: Input }],
        zoomLevel: [{ type: Input }]
    };
    return GanttTimeScaleComponent;
}());
export { GanttTimeScaleComponent };
if (false) {
    /** @type {?} */
    GanttTimeScaleComponent.prototype.timeScale;
    /** @type {?} */
    GanttTimeScaleComponent.prototype.dimensions;
    /** @type {?} */
    GanttTimeScaleComponent.prototype.zoom;
    /** @type {?} */
    GanttTimeScaleComponent.prototype.zoomLevel;
    /** @type {?} */
    GanttTimeScaleComponent.prototype.ganttService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQtdGltZS1zY2FsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9nYW50dC8iLCJzb3VyY2VzIjpbImxpYi9hY3Rpdml0eS90aW1lLXNjYWxlL2dhbnR0LXRpbWUtc2NhbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBMkIsTUFBTSxlQUFlLENBQUM7QUFDbEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUVsRDtJQWlESSxpQ0FBbUIsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7SUFBSSxDQUFDOzs7O0lBRWxELDBDQUFROzs7SUFBUjtRQUFBLGlCQUlDO1FBSEcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBQyxTQUFpQjtZQUNsQyxLQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Ozs7SUFFRCxtREFBaUI7OztJQUFqQjtRQUNJLE9BQU87WUFDSCxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsSUFBSTtTQUN4QyxDQUFDO0lBQ04sQ0FBQzs7Ozs7SUFFRCx1REFBcUI7Ozs7SUFBckIsVUFBc0IsU0FBaUI7UUFDbkMsT0FBTztZQUNILFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJO1lBQzVDLGFBQWEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJO1lBQ2pELFVBQVUsRUFBRSxVQUFVO1lBQ3RCLFlBQVksRUFBRSxTQUFTO1NBQzFCLENBQUM7SUFDTixDQUFDOzs7O0lBRUQsdURBQXFCOzs7SUFBckI7O1lBQ1EsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUzs7WUFDbkMsVUFBVSxHQUFHLEVBQUU7O1lBQ2YsbUJBQW1CLEdBQUcsRUFBRTtRQUU1QixJQUFJLElBQUksQ0FBQyxTQUFTLEtBQU0sT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM1QyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEdBQUcsVUFBVSxHQUFHLG1CQUFtQixDQUFDO1NBQzlFO1FBRUQsT0FBTztZQUNILE9BQU8sRUFBRSxLQUFLLEdBQUcsSUFBSTtTQUN4QixDQUFDO0lBQ04sQ0FBQzs7Ozs7SUFFRCw4Q0FBWTs7OztJQUFaLFVBQWEsSUFBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hELENBQUM7Ozs7SUFFRCwwQ0FBUTs7O0lBQVI7UUFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0QsQ0FBQzs7Z0JBNUZKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsWUFBWTtvQkFDdEIsUUFBUSxFQUFFLGl5QkFZQztvQkF5QlgsU0FBUyxFQUFFO3dCQUNQLFlBQVk7cUJBQ2Y7NkJBMUJRLG9uQkFzQkg7aUJBS1Q7Ozs7Z0JBN0NRLFlBQVk7Ozs0QkErQ2hCLEtBQUs7NkJBQ0wsS0FBSzt1QkFDTCxLQUFLOzRCQUNMLEtBQUs7O0lBOENWLDhCQUFDO0NBQUEsQUE3RkQsSUE2RkM7U0FsRFksdUJBQXVCOzs7SUFDaEMsNENBQXdCOztJQUN4Qiw2Q0FBeUI7O0lBQ3pCLHVDQUFtQjs7SUFDbkIsNENBQXdCOztJQUVaLCtDQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgRXZlbnRFbWl0dGVyLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgR2FudHRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2dhbnR0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBab29taW5nIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3RpbWUtc2NhbGUnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwidGltZS1zY2FsZVwiIFtuZ1N0eWxlXT1cInNldFRpbWVzY2FsZVN0eWxlKClcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpbWUtc2NhbGUtbGluZVwiIFtuZ1N0eWxlXT1cInNldFRpbWVzY2FsZUxpbmVTdHlsZSgnbm9uZScpXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGltZS1zY2FsZS1jZWxsXCIgKm5nRm9yPVwibGV0IGRhdGUgb2YgdGltZVNjYWxlXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgW25nU3R5bGVdPVwic2V0VGltZXNjYWxlQ2VsbFN0eWxlKClcIlxyXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIihpc0RheVdlZWtlbmQoZGF0ZSkpID8gJ3dlZWtlbmQnIDogJydcIj57e2RhdGUgfCBkYXRlOiAnZGQtTU0teXl5eSd9fTwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cInpvb21MZXZlbCA9PT0gJ2hvdXJzJ1wiIGNsYXNzPVwidGltZS1zY2FsZS1saW5lXCIgW25nU3R5bGVdPVwic2V0VGltZXNjYWxlTGluZVN0eWxlKCcxcHggc29saWQgI2NlY2VjZScpXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGltZS1zY2FsZS1jZWxsXCJcclxuICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgaG91ciBvZiBnZXRIb3VycygpXCJcclxuICAgICAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJ7ICd3aWR0aCc6IGdhbnR0U2VydmljZS5ob3VyQ2VsbFdpZHRoICsgJ3B4JyB9XCI+e3tob3VyfX08L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+YCxcclxuICAgIHN0eWxlczogW2BcclxuICAgICAgICAud2Vla2VuZCB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlc21va2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC50aW1lLXNjYWxlIHtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NlY2VjZTtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLnRpbWUtc2NhbGUtbGluZSB7XHJcbiAgICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC50aW1lLXNjYWxlLWxpbmU6Zmlyc3QtY2hpbGQge1xyXG4gICAgICAgICAgICBib3JkZXItdG9wOiBub25lO1xyXG4gICAgICAgIH1cclxuICAgICAgICAudGltZS1zY2FsZS1jZWxsIHtcclxuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICAgICAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjY2VjZWNlO1xyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgICB9YFxyXG4gICAgXSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIEdhbnR0U2VydmljZVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR2FudHRUaW1lU2NhbGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgQElucHV0KCkgdGltZVNjYWxlOiBhbnk7XHJcbiAgICBASW5wdXQoKSBkaW1lbnNpb25zOiBhbnk7XHJcbiAgICBASW5wdXQoKSB6b29tOiBhbnk7XHJcbiAgICBASW5wdXQoKSB6b29tTGV2ZWw6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZ2FudHRTZXJ2aWNlOiBHYW50dFNlcnZpY2UpIHsgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuem9vbS5zdWJzY3JpYmUoKHpvb21MZXZlbDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuem9vbUxldmVsID0gem9vbUxldmVsO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVzY2FsZVN0eWxlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICd3aWR0aCc6IHRoaXMuZGltZW5zaW9ucy53aWR0aCArICdweCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVzY2FsZUxpbmVTdHlsZShib3JkZXJUb3A6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICdoZWlnaHQnOiB0aGlzLmdhbnR0U2VydmljZS5yb3dIZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAnbGluZS1oZWlnaHQnOiB0aGlzLmdhbnR0U2VydmljZS5yb3dIZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAncG9zaXRpb24nOiAncmVsYXRpdmUnLFxyXG4gICAgICAgICAgICAnYm9yZGVyLXRvcCc6IGJvcmRlclRvcFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZXNjYWxlQ2VsbFN0eWxlKCkge1xyXG4gICAgICAgIHZhciB3aWR0aCA9IHRoaXMuZ2FudHRTZXJ2aWNlLmNlbGxXaWR0aDtcclxuICAgICAgICB2YXIgaG91cnNJbkRheSA9IDI0O1xyXG4gICAgICAgIHZhciBob3VyU2VwZXJhdG9yUGl4ZWxzID0gMjM7IC8vIHdlIGRvbid0IGluY2x1ZGUgdGhlIGZpcnN0IFxyXG5cclxuICAgICAgICBpZiAodGhpcy56b29tTGV2ZWwgPT09ICBab29taW5nW1pvb21pbmcuaG91cnNdKSB7XHJcbiAgICAgICAgICAgIHdpZHRoID0gdGhpcy5nYW50dFNlcnZpY2UuaG91ckNlbGxXaWR0aCAqIGhvdXJzSW5EYXkgKyBob3VyU2VwZXJhdG9yUGl4ZWxzOyBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICd3aWR0aCc6IHdpZHRoICsgJ3B4J1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaXNEYXlXZWVrZW5kKGRhdGU6IERhdGUpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nYW50dFNlcnZpY2UuaXNEYXlXZWVrZW5kKGRhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEhvdXJzKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nYW50dFNlcnZpY2UuZ2V0SG91cnModGhpcy50aW1lU2NhbGUubGVuZ3RoKTtcclxuICAgIH1cclxufSJdfQ==