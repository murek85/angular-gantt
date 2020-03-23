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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQtdGltZS1zY2FsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWdhbnR0LyIsInNvdXJjZXMiOlsibGliL2FjdGl2aXR5L3RpbWUtc2NhbGUvZ2FudHQtdGltZS1zY2FsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUEyQixNQUFNLGVBQWUsQ0FBQztBQUNsRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDbkUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRWxEO0lBaURJLGlDQUFtQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUFJLENBQUM7Ozs7SUFFbEQsMENBQVE7OztJQUFSO1FBQUEsaUJBSUM7UUFIRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFDLFNBQWlCO1lBQ2xDLEtBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7OztJQUVELG1EQUFpQjs7O0lBQWpCO1FBQ0ksT0FBTztZQUNILE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJO1NBQ3hDLENBQUM7SUFDTixDQUFDOzs7OztJQUVELHVEQUFxQjs7OztJQUFyQixVQUFzQixTQUFpQjtRQUNuQyxPQUFPO1lBQ0gsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLElBQUk7WUFDNUMsYUFBYSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLElBQUk7WUFDakQsVUFBVSxFQUFFLFVBQVU7WUFDdEIsWUFBWSxFQUFFLFNBQVM7U0FDMUIsQ0FBQztJQUNOLENBQUM7Ozs7SUFFRCx1REFBcUI7OztJQUFyQjs7WUFDUSxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTOztZQUNuQyxVQUFVLEdBQUcsRUFBRTs7WUFDZixtQkFBbUIsR0FBRyxFQUFFO1FBRTVCLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBTSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzVDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsR0FBRyxVQUFVLEdBQUcsbUJBQW1CLENBQUM7U0FDOUU7UUFFRCxPQUFPO1lBQ0gsT0FBTyxFQUFFLEtBQUssR0FBRyxJQUFJO1NBQ3hCLENBQUM7SUFDTixDQUFDOzs7OztJQUVELDhDQUFZOzs7O0lBQVosVUFBYSxJQUFVO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7OztJQUVELDBDQUFROzs7SUFBUjtRQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3RCxDQUFDOztnQkE1RkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxZQUFZO29CQUN0QixRQUFRLEVBQUUsaXlCQVlDO29CQXlCWCxTQUFTLEVBQUU7d0JBQ1AsWUFBWTtxQkFDZjs2QkExQlEsb25CQXNCSDtpQkFLVDs7OztnQkE3Q1EsWUFBWTs7OzRCQStDaEIsS0FBSzs2QkFDTCxLQUFLO3VCQUNMLEtBQUs7NEJBQ0wsS0FBSzs7SUE4Q1YsOEJBQUM7Q0FBQSxBQTdGRCxJQTZGQztTQWxEWSx1QkFBdUI7OztJQUNoQyw0Q0FBd0I7O0lBQ3hCLDZDQUF5Qjs7SUFDekIsdUNBQW1COztJQUNuQiw0Q0FBd0I7O0lBRVosK0NBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBFdmVudEVtaXR0ZXIsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBHYW50dFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvZ2FudHQuc2VydmljZSc7XHJcbmltcG9ydCB7IFpvb21pbmcgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndGltZS1zY2FsZScsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lLXNjYWxlXCIgW25nU3R5bGVdPVwic2V0VGltZXNjYWxlU3R5bGUoKVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGltZS1zY2FsZS1saW5lXCIgW25nU3R5bGVdPVwic2V0VGltZXNjYWxlTGluZVN0eWxlKCdub25lJylcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lLXNjYWxlLWNlbGxcIiAqbmdGb3I9XCJsZXQgZGF0ZSBvZiB0aW1lU2NhbGVcIiBcclxuICAgICAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJzZXRUaW1lc2NhbGVDZWxsU3R5bGUoKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiKGlzRGF5V2Vla2VuZChkYXRlKSkgPyAnd2Vla2VuZCcgOiAnJ1wiPnt7ZGF0ZSB8IGRhdGU6ICdkZC1NTS15eXl5J319PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiem9vbUxldmVsID09PSAnaG91cnMnXCIgY2xhc3M9XCJ0aW1lLXNjYWxlLWxpbmVcIiBbbmdTdHlsZV09XCJzZXRUaW1lc2NhbGVMaW5lU3R5bGUoJzFweCBzb2xpZCAjY2VjZWNlJylcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lLXNjYWxlLWNlbGxcIlxyXG4gICAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBob3VyIG9mIGdldEhvdXJzKClcIlxyXG4gICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsgJ3dpZHRoJzogZ2FudHRTZXJ2aWNlLmhvdXJDZWxsV2lkdGggKyAncHgnIH1cIj57e2hvdXJ9fTwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5gLFxyXG4gICAgc3R5bGVzOiBbYFxyXG4gICAgICAgIC53ZWVrZW5kIHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGVzbW9rZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLnRpbWUtc2NhbGUge1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2VjZWNlO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgICAgIH1cclxuICAgICAgICAudGltZS1zY2FsZS1saW5lIHtcclxuICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLnRpbWUtc2NhbGUtbGluZTpmaXJzdC1jaGlsZCB7XHJcbiAgICAgICAgICAgIGJvcmRlci10b3A6IG5vbmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC50aW1lLXNjYWxlLWNlbGwge1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNjZWNlY2U7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgIH1gXHJcbiAgICBdLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgR2FudHRTZXJ2aWNlXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHYW50dFRpbWVTY2FsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBASW5wdXQoKSB0aW1lU2NhbGU6IGFueTtcclxuICAgIEBJbnB1dCgpIGRpbWVuc2lvbnM6IGFueTtcclxuICAgIEBJbnB1dCgpIHpvb206IGFueTtcclxuICAgIEBJbnB1dCgpIHpvb21MZXZlbDogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBnYW50dFNlcnZpY2U6IEdhbnR0U2VydmljZSkgeyB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy56b29tLnN1YnNjcmliZSgoem9vbUxldmVsOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgdGhpcy56b29tTGV2ZWwgPSB6b29tTGV2ZWw7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZXNjYWxlU3R5bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ3dpZHRoJzogdGhpcy5kaW1lbnNpb25zLndpZHRoICsgJ3B4J1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZXNjYWxlTGluZVN0eWxlKGJvcmRlclRvcDogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ2hlaWdodCc6IHRoaXMuZ2FudHRTZXJ2aWNlLnJvd0hlaWdodCArICdweCcsXHJcbiAgICAgICAgICAgICdsaW5lLWhlaWdodCc6IHRoaXMuZ2FudHRTZXJ2aWNlLnJvd0hlaWdodCArICdweCcsXHJcbiAgICAgICAgICAgICdwb3NpdGlvbic6ICdyZWxhdGl2ZScsXHJcbiAgICAgICAgICAgICdib3JkZXItdG9wJzogYm9yZGVyVG9wXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lc2NhbGVDZWxsU3R5bGUoKSB7XHJcbiAgICAgICAgdmFyIHdpZHRoID0gdGhpcy5nYW50dFNlcnZpY2UuY2VsbFdpZHRoO1xyXG4gICAgICAgIHZhciBob3Vyc0luRGF5ID0gMjQ7XHJcbiAgICAgICAgdmFyIGhvdXJTZXBlcmF0b3JQaXhlbHMgPSAyMzsgLy8gd2UgZG9uJ3QgaW5jbHVkZSB0aGUgZmlyc3QgXHJcblxyXG4gICAgICAgIGlmICh0aGlzLnpvb21MZXZlbCA9PT0gIFpvb21pbmdbWm9vbWluZy5ob3Vyc10pIHtcclxuICAgICAgICAgICAgd2lkdGggPSB0aGlzLmdhbnR0U2VydmljZS5ob3VyQ2VsbFdpZHRoICogaG91cnNJbkRheSArIGhvdXJTZXBlcmF0b3JQaXhlbHM7IFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ3dpZHRoJzogd2lkdGggKyAncHgnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpc0RheVdlZWtlbmQoZGF0ZTogRGF0ZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdhbnR0U2VydmljZS5pc0RheVdlZWtlbmQoZGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SG91cnMoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdhbnR0U2VydmljZS5nZXRIb3Vycyh0aGlzLnRpbWVTY2FsZS5sZW5ndGgpO1xyXG4gICAgfVxyXG59Il19