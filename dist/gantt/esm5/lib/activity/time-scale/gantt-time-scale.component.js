/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { GanttService } from '../../shared/services/gantt.service';
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
    };
    /**
     * @return {?}
     */
    GanttTimeScaleComponent.prototype.setTimescaleStyle = /**
     * @return {?}
     */
    function () {
        return {
            'width': (this.dimensions.width + 36) + 'px'
        };
    };
    /**
     * @param {?} borderTop
     * @return {?}
     */
    GanttTimeScaleComponent.prototype.setTimescaleMonthLineStyle = /**
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
    GanttTimeScaleComponent.prototype.setTimescaleMonthCellStyle = /**
     * @return {?}
     */
    function () {
        return {
            'width': this.ganttService.cellWidth + 'px'
        };
    };
    /**
     * @param {?} borderTop
     * @return {?}
     */
    GanttTimeScaleComponent.prototype.setTimescaleWeekendLineStyle = /**
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
    GanttTimeScaleComponent.prototype.setTimescaleWeekendCellStyle = /**
     * @return {?}
     */
    function () {
        return {
            'width': this.ganttService.cellWidth + 'px'
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
    GanttTimeScaleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'time-scale',
                    template: "\n        <div class=\"time-scale\" [ngStyle]=\"setTimescaleStyle()\">\n            <!--<div class=\"time-scale-line\" [ngStyle]=\"setTimescaleMonthLineStyle('none')\">\n                <div class=\"time-scale-cell\" *ngFor=\"let scale of timeScaleMonth; let i = index\"\n                    [ngClass]=\"(i % 2) ? 'weekend' : ''\" [style.width.px]=\"scale.width\">{{scale.start | date: 'dd-MM'}}</div>\n            </div>-->\n            <div class=\"time-scale-line\" [ngStyle]=\"setTimescaleWeekendLineStyle('none')\">\n                <div class=\"time-scale-cell\" *ngFor=\"let date of timeScaleWeekend; let i = index\"\n                    [ngClass]=\"(i % 2) ? 'weekend' : ''\" [ngStyle]=\"setTimescaleWeekendCellStyle()\">{{date | date: 'dd-MM'}}</div>\n            </div>\n            <div class=\"time-scale-line\" [ngStyle]=\"setTimescaleWeekendLineStyle('none')\">\n                <div class=\"time-scale-cell\" *ngFor=\"let date of timeScaleWeekend; let i = index\"\n                [ngClass]=\"(i % 2) ? 'weekend' : ''\" [ngStyle]=\"setTimescaleWeekendCellStyle()\">{{i + 1}}</div>\n            </div>\n        </div>",
                    providers: [
                        GanttService
                    ],
                    styles: ["\n        .weekend {\n            background-color: whitesmoke;\n        }\n        .time-scale {\n            font-size: 12px;\n            background-color: #fff;\n            border-bottom: 1px solid #cecece;\n        }\n        .time-scale-line {\n            box-sizing: border-box;\n            border-bottom: 1px solid #cecece;\n        }\n        .time-scale-line:first-child {\n            border-top: none;\n        }\n        .time-scale-cell {\n            display: inline-block;\n            white-space: nowrap;\n            overflow: hidden;\n            border-right: 1px solid #cecece;\n            text-align: center;\n            height: 100%;\n        }"]
                }] }
    ];
    /** @nocollapse */
    GanttTimeScaleComponent.ctorParameters = function () { return [
        { type: GanttService }
    ]; };
    GanttTimeScaleComponent.propDecorators = {
        timeScaleMonth: [{ type: Input }],
        timeScaleWeekend: [{ type: Input }],
        dimensions: [{ type: Input }],
        scale: [{ type: Input }]
    };
    return GanttTimeScaleComponent;
}());
export { GanttTimeScaleComponent };
if (false) {
    /** @type {?} */
    GanttTimeScaleComponent.prototype.timeScaleMonth;
    /** @type {?} */
    GanttTimeScaleComponent.prototype.timeScaleWeekend;
    /** @type {?} */
    GanttTimeScaleComponent.prototype.dimensions;
    /** @type {?} */
    GanttTimeScaleComponent.prototype.scale;
    /** @type {?} */
    GanttTimeScaleComponent.prototype.ganttService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQtdGltZS1zY2FsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWdhbnR0LyIsInNvdXJjZXMiOlsibGliL2FjdGl2aXR5L3RpbWUtc2NhbGUvZ2FudHQtdGltZS1zY2FsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUduRTtJQW9ESSxpQ0FBbUIsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7SUFBSSxDQUFDOzs7O0lBRWxELDBDQUFROzs7SUFBUjtJQUNBLENBQUM7Ozs7SUFFRCxtREFBaUI7OztJQUFqQjtRQUNJLE9BQU87WUFDSCxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsR0FBRyxJQUFJO1NBQy9DLENBQUM7SUFDTixDQUFDOzs7OztJQUVELDREQUEwQjs7OztJQUExQixVQUEyQixTQUFpQjtRQUN4QyxPQUFPO1lBQ0gsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLElBQUk7WUFDNUMsYUFBYSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLElBQUk7WUFDakQsVUFBVSxFQUFFLFVBQVU7WUFDdEIsWUFBWSxFQUFFLFNBQVM7U0FDMUIsQ0FBQztJQUNOLENBQUM7Ozs7SUFFRCw0REFBMEI7OztJQUExQjtRQUNJLE9BQU87WUFDSCxPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSTtTQUM5QyxDQUFDO0lBQ04sQ0FBQzs7Ozs7SUFFRCw4REFBNEI7Ozs7SUFBNUIsVUFBNkIsU0FBaUI7UUFDMUMsT0FBTztZQUNILFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJO1lBQzVDLGFBQWEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJO1lBQ2pELFVBQVUsRUFBRSxVQUFVO1lBQ3RCLFlBQVksRUFBRSxTQUFTO1NBQzFCLENBQUM7SUFDTixDQUFDOzs7O0lBRUQsOERBQTRCOzs7SUFBNUI7UUFDSSxPQUFPO1lBQ0gsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLElBQUk7U0FDOUMsQ0FBQztJQUNOLENBQUM7Ozs7O0lBRUQsOENBQVk7Ozs7SUFBWixVQUFhLElBQVU7UUFDbkIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoRCxDQUFDOztnQkEvRkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxZQUFZO29CQUN0QixRQUFRLEVBQUUsNm1DQWNDO29CQTBCWCxTQUFTLEVBQUU7d0JBQ1AsWUFBWTtxQkFDZjs2QkEzQlEsbXFCQXVCSDtpQkFLVDs7OztnQkFoRFEsWUFBWTs7O2lDQWtEaEIsS0FBSzttQ0FDTCxLQUFLOzZCQUNMLEtBQUs7d0JBQ0wsS0FBSzs7SUE4Q1YsOEJBQUM7Q0FBQSxBQWhHRCxJQWdHQztTQWxEWSx1QkFBdUI7OztJQUNoQyxpREFBNkI7O0lBQzdCLG1EQUErQjs7SUFDL0IsNkNBQXlCOztJQUN6Qix3Q0FBdUI7O0lBRVgsK0NBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEdhbnR0U2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9nYW50dC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSVNjYWxlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3RpbWUtc2NhbGUnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwidGltZS1zY2FsZVwiIFtuZ1N0eWxlXT1cInNldFRpbWVzY2FsZVN0eWxlKClcIj5cclxuICAgICAgICAgICAgPCEtLTxkaXYgY2xhc3M9XCJ0aW1lLXNjYWxlLWxpbmVcIiBbbmdTdHlsZV09XCJzZXRUaW1lc2NhbGVNb250aExpbmVTdHlsZSgnbm9uZScpXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGltZS1zY2FsZS1jZWxsXCIgKm5nRm9yPVwibGV0IHNjYWxlIG9mIHRpbWVTY2FsZU1vbnRoOyBsZXQgaSA9IGluZGV4XCJcclxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCIoaSAlIDIpID8gJ3dlZWtlbmQnIDogJydcIiBbc3R5bGUud2lkdGgucHhdPVwic2NhbGUud2lkdGhcIj57e3NjYWxlLnN0YXJ0IHwgZGF0ZTogJ2RkLU1NJ319PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2Pi0tPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGltZS1zY2FsZS1saW5lXCIgW25nU3R5bGVdPVwic2V0VGltZXNjYWxlV2Vla2VuZExpbmVTdHlsZSgnbm9uZScpXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGltZS1zY2FsZS1jZWxsXCIgKm5nRm9yPVwibGV0IGRhdGUgb2YgdGltZVNjYWxlV2Vla2VuZDsgbGV0IGkgPSBpbmRleFwiXHJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiKGkgJSAyKSA/ICd3ZWVrZW5kJyA6ICcnXCIgW25nU3R5bGVdPVwic2V0VGltZXNjYWxlV2Vla2VuZENlbGxTdHlsZSgpXCI+e3tkYXRlIHwgZGF0ZTogJ2RkLU1NJ319PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGltZS1zY2FsZS1saW5lXCIgW25nU3R5bGVdPVwic2V0VGltZXNjYWxlV2Vla2VuZExpbmVTdHlsZSgnbm9uZScpXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGltZS1zY2FsZS1jZWxsXCIgKm5nRm9yPVwibGV0IGRhdGUgb2YgdGltZVNjYWxlV2Vla2VuZDsgbGV0IGkgPSBpbmRleFwiXHJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCIoaSAlIDIpID8gJ3dlZWtlbmQnIDogJydcIiBbbmdTdHlsZV09XCJzZXRUaW1lc2NhbGVXZWVrZW5kQ2VsbFN0eWxlKClcIj57e2kgKyAxfX08L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+YCxcclxuICAgIHN0eWxlczogW2BcclxuICAgICAgICAud2Vla2VuZCB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlc21va2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC50aW1lLXNjYWxlIHtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NlY2VjZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLnRpbWUtc2NhbGUtbGluZSB7XHJcbiAgICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2VjZWNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAudGltZS1zY2FsZS1saW5lOmZpcnN0LWNoaWxkIHtcclxuICAgICAgICAgICAgYm9yZGVyLXRvcDogbm9uZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLnRpbWUtc2NhbGUtY2VsbCB7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2NlY2VjZTtcclxuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAgICAgfWBcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBHYW50dFNlcnZpY2VcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEdhbnR0VGltZVNjYWxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIEBJbnB1dCgpIHRpbWVTY2FsZU1vbnRoOiBhbnk7XHJcbiAgICBASW5wdXQoKSB0aW1lU2NhbGVXZWVrZW5kOiBhbnk7XHJcbiAgICBASW5wdXQoKSBkaW1lbnNpb25zOiBhbnk7XHJcbiAgICBASW5wdXQoKSBzY2FsZTogSVNjYWxlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBnYW50dFNlcnZpY2U6IEdhbnR0U2VydmljZSkgeyB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZXNjYWxlU3R5bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ3dpZHRoJzogKHRoaXMuZGltZW5zaW9ucy53aWR0aCArIDM2KSArICdweCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVzY2FsZU1vbnRoTGluZVN0eWxlKGJvcmRlclRvcDogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ2hlaWdodCc6IHRoaXMuZ2FudHRTZXJ2aWNlLnJvd0hlaWdodCArICdweCcsXHJcbiAgICAgICAgICAgICdsaW5lLWhlaWdodCc6IHRoaXMuZ2FudHRTZXJ2aWNlLnJvd0hlaWdodCArICdweCcsXHJcbiAgICAgICAgICAgICdwb3NpdGlvbic6ICdyZWxhdGl2ZScsXHJcbiAgICAgICAgICAgICdib3JkZXItdG9wJzogYm9yZGVyVG9wXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lc2NhbGVNb250aENlbGxTdHlsZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAnd2lkdGgnOiB0aGlzLmdhbnR0U2VydmljZS5jZWxsV2lkdGggKyAncHgnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lc2NhbGVXZWVrZW5kTGluZVN0eWxlKGJvcmRlclRvcDogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ2hlaWdodCc6IHRoaXMuZ2FudHRTZXJ2aWNlLnJvd0hlaWdodCArICdweCcsXHJcbiAgICAgICAgICAgICdsaW5lLWhlaWdodCc6IHRoaXMuZ2FudHRTZXJ2aWNlLnJvd0hlaWdodCArICdweCcsXHJcbiAgICAgICAgICAgICdwb3NpdGlvbic6ICdyZWxhdGl2ZScsXHJcbiAgICAgICAgICAgICdib3JkZXItdG9wJzogYm9yZGVyVG9wXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lc2NhbGVXZWVrZW5kQ2VsbFN0eWxlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICd3aWR0aCc6IHRoaXMuZ2FudHRTZXJ2aWNlLmNlbGxXaWR0aCArICdweCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGlzRGF5V2Vla2VuZChkYXRlOiBEYXRlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FudHRTZXJ2aWNlLmlzRGF5V2Vla2VuZChkYXRlKTtcclxuICAgIH1cclxufVxyXG4iXX0=