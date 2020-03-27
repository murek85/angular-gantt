/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { GanttService } from '../../shared/services/gantt.service';
export class GanttTimeScaleComponent {
    /**
     * @param {?} ganttService
     */
    constructor(ganttService) {
        this.ganttService = ganttService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    setTimescaleStyle() {
        return {
            'width': (this.dimensions.width + 36) + 'px'
        };
    }
    /**
     * @param {?} borderTop
     * @return {?}
     */
    setTimescaleMonthLineStyle(borderTop) {
        return {
            'height': this.ganttService.rowHeight + 'px',
            'line-height': this.ganttService.rowHeight + 'px',
            'position': 'relative',
            'border-top': borderTop
        };
    }
    /**
     * @return {?}
     */
    setTimescaleMonthCellStyle() {
        return {
            'width': this.ganttService.cellWidth + 'px'
        };
    }
    /**
     * @param {?} borderTop
     * @return {?}
     */
    setTimescaleWeekendLineStyle(borderTop) {
        return {
            'height': this.ganttService.rowHeight + 'px',
            'line-height': this.ganttService.rowHeight + 'px',
            'position': 'relative',
            'border-top': borderTop
        };
    }
    /**
     * @return {?}
     */
    setTimescaleWeekendCellStyle() {
        return {
            'width': this.ganttService.cellWidth + 'px'
        };
    }
    /**
     * @param {?} date
     * @return {?}
     */
    isDayWeekend(date) {
        return this.ganttService.isDayWeekend(date);
    }
}
GanttTimeScaleComponent.decorators = [
    { type: Component, args: [{
                selector: 'time-scale',
                template: `
        <div class="time-scale" [ngStyle]="setTimescaleStyle()">
            <!--<div class="time-scale-line" [ngStyle]="setTimescaleMonthLineStyle('none')">
                <div class="time-scale-cell" *ngFor="let scale of timeScaleMonth; let i = index"
                    [ngClass]="(i % 2) ? 'weekend' : ''" [style.width.px]="scale.width">{{scale.start | date: 'dd-MM'}}</div>
            </div>-->
            <div class="time-scale-line" [ngStyle]="setTimescaleWeekendLineStyle('none')">
                <div class="time-scale-cell" *ngFor="let date of timeScaleWeekend; let i = index"
                    [ngClass]="(i % 2) ? 'weekend' : ''" [ngStyle]="setTimescaleWeekendCellStyle()">{{date | date: 'dd-MM'}}</div>
            </div>
            <div class="time-scale-line" [ngStyle]="setTimescaleWeekendLineStyle('none')">
                <div class="time-scale-cell" *ngFor="let date of timeScaleWeekend; let i = index"
                [ngClass]="(i % 2) ? 'weekend' : ''" [ngStyle]="setTimescaleWeekendCellStyle()">{{i + 1}}</div>
            </div>
        </div>`,
                providers: [
                    GanttService
                ],
                styles: [`
        .weekend {
            background-color: whitesmoke;
        }
        .time-scale {
            font-size: 12px;
            background-color: #fff;
            border-bottom: 1px solid #cecece;
        }
        .time-scale-line {
            box-sizing: border-box;
            border-bottom: 1px solid #cecece;
        }
        .time-scale-line:first-child {
            border-top: none;
        }
        .time-scale-cell {
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            border-right: 1px solid #cecece;
            text-align: center;
            height: 100%;
        }`]
            }] }
];
/** @nocollapse */
GanttTimeScaleComponent.ctorParameters = () => [
    { type: GanttService }
];
GanttTimeScaleComponent.propDecorators = {
    timeScaleMonth: [{ type: Input }],
    timeScaleWeekend: [{ type: Input }],
    dimensions: [{ type: Input }],
    scale: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQtdGltZS1zY2FsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWdhbnR0LyIsInNvdXJjZXMiOlsibGliL2FjdGl2aXR5L3RpbWUtc2NhbGUvZ2FudHQtdGltZS1zY2FsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQWlEbkUsTUFBTSxPQUFPLHVCQUF1Qjs7OztJQU1oQyxZQUFtQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUFJLENBQUM7Ozs7SUFFbEQsUUFBUTtJQUNSLENBQUM7Ozs7SUFFRCxpQkFBaUI7UUFDYixPQUFPO1lBQ0gsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEdBQUcsSUFBSTtTQUMvQyxDQUFDO0lBQ04sQ0FBQzs7Ozs7SUFFRCwwQkFBMEIsQ0FBQyxTQUFpQjtRQUN4QyxPQUFPO1lBQ0gsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLElBQUk7WUFDNUMsYUFBYSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLElBQUk7WUFDakQsVUFBVSxFQUFFLFVBQVU7WUFDdEIsWUFBWSxFQUFFLFNBQVM7U0FDMUIsQ0FBQztJQUNOLENBQUM7Ozs7SUFFRCwwQkFBMEI7UUFDdEIsT0FBTztZQUNILE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJO1NBQzlDLENBQUM7SUFDTixDQUFDOzs7OztJQUVELDRCQUE0QixDQUFDLFNBQWlCO1FBQzFDLE9BQU87WUFDSCxRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSTtZQUM1QyxhQUFhLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSTtZQUNqRCxVQUFVLEVBQUUsVUFBVTtZQUN0QixZQUFZLEVBQUUsU0FBUztTQUMxQixDQUFDO0lBQ04sQ0FBQzs7OztJQUVELDRCQUE0QjtRQUN4QixPQUFPO1lBQ0gsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLElBQUk7U0FDOUMsQ0FBQztJQUNOLENBQUM7Ozs7O0lBRUQsWUFBWSxDQUFDLElBQVU7UUFDbkIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoRCxDQUFDOzs7WUEvRkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxZQUFZO2dCQUN0QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7O2VBY0M7Z0JBMEJYLFNBQVMsRUFBRTtvQkFDUCxZQUFZO2lCQUNmO3lCQTNCUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUF1Qkg7YUFLVDs7OztZQWhEUSxZQUFZOzs7NkJBa0RoQixLQUFLOytCQUNMLEtBQUs7eUJBQ0wsS0FBSztvQkFDTCxLQUFLOzs7O0lBSE4saURBQTZCOztJQUM3QixtREFBK0I7O0lBQy9CLDZDQUF5Qjs7SUFDekIsd0NBQXVCOztJQUVYLCtDQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBHYW50dFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvZ2FudHQuc2VydmljZSc7XHJcbmltcG9ydCB7IElTY2FsZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICd0aW1lLXNjYWxlJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRpbWUtc2NhbGVcIiBbbmdTdHlsZV09XCJzZXRUaW1lc2NhbGVTdHlsZSgpXCI+XHJcbiAgICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVwidGltZS1zY2FsZS1saW5lXCIgW25nU3R5bGVdPVwic2V0VGltZXNjYWxlTW9udGhMaW5lU3R5bGUoJ25vbmUnKVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpbWUtc2NhbGUtY2VsbFwiICpuZ0Zvcj1cImxldCBzY2FsZSBvZiB0aW1lU2NhbGVNb250aDsgbGV0IGkgPSBpbmRleFwiXHJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiKGkgJSAyKSA/ICd3ZWVrZW5kJyA6ICcnXCIgW3N0eWxlLndpZHRoLnB4XT1cInNjYWxlLndpZHRoXCI+e3tzY2FsZS5zdGFydCB8IGRhdGU6ICdkZC1NTSd9fTwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj4tLT5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpbWUtc2NhbGUtbGluZVwiIFtuZ1N0eWxlXT1cInNldFRpbWVzY2FsZVdlZWtlbmRMaW5lU3R5bGUoJ25vbmUnKVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpbWUtc2NhbGUtY2VsbFwiICpuZ0Zvcj1cImxldCBkYXRlIG9mIHRpbWVTY2FsZVdlZWtlbmQ7IGxldCBpID0gaW5kZXhcIlxyXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIihpICUgMikgPyAnd2Vla2VuZCcgOiAnJ1wiIFtuZ1N0eWxlXT1cInNldFRpbWVzY2FsZVdlZWtlbmRDZWxsU3R5bGUoKVwiPnt7ZGF0ZSB8IGRhdGU6ICdkZC1NTSd9fTwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpbWUtc2NhbGUtbGluZVwiIFtuZ1N0eWxlXT1cInNldFRpbWVzY2FsZVdlZWtlbmRMaW5lU3R5bGUoJ25vbmUnKVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpbWUtc2NhbGUtY2VsbFwiICpuZ0Zvcj1cImxldCBkYXRlIG9mIHRpbWVTY2FsZVdlZWtlbmQ7IGxldCBpID0gaW5kZXhcIlxyXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiKGkgJSAyKSA/ICd3ZWVrZW5kJyA6ICcnXCIgW25nU3R5bGVdPVwic2V0VGltZXNjYWxlV2Vla2VuZENlbGxTdHlsZSgpXCI+e3tpICsgMX19PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PmAsXHJcbiAgICBzdHlsZXM6IFtgXHJcbiAgICAgICAgLndlZWtlbmQge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZXNtb2tlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAudGltZS1zY2FsZSB7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjZWNlY2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC50aW1lLXNjYWxlLWxpbmUge1xyXG4gICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NlY2VjZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLnRpbWUtc2NhbGUtbGluZTpmaXJzdC1jaGlsZCB7XHJcbiAgICAgICAgICAgIGJvcmRlci10b3A6IG5vbmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC50aW1lLXNjYWxlLWNlbGwge1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNjZWNlY2U7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgIH1gXHJcbiAgICBdLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgR2FudHRTZXJ2aWNlXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHYW50dFRpbWVTY2FsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBASW5wdXQoKSB0aW1lU2NhbGVNb250aDogYW55O1xyXG4gICAgQElucHV0KCkgdGltZVNjYWxlV2Vla2VuZDogYW55O1xyXG4gICAgQElucHV0KCkgZGltZW5zaW9uczogYW55O1xyXG4gICAgQElucHV0KCkgc2NhbGU6IElTY2FsZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZ2FudHRTZXJ2aWNlOiBHYW50dFNlcnZpY2UpIHsgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVzY2FsZVN0eWxlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICd3aWR0aCc6ICh0aGlzLmRpbWVuc2lvbnMud2lkdGggKyAzNikgKyAncHgnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lc2NhbGVNb250aExpbmVTdHlsZShib3JkZXJUb3A6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICdoZWlnaHQnOiB0aGlzLmdhbnR0U2VydmljZS5yb3dIZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAnbGluZS1oZWlnaHQnOiB0aGlzLmdhbnR0U2VydmljZS5yb3dIZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAncG9zaXRpb24nOiAncmVsYXRpdmUnLFxyXG4gICAgICAgICAgICAnYm9yZGVyLXRvcCc6IGJvcmRlclRvcFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZXNjYWxlTW9udGhDZWxsU3R5bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ3dpZHRoJzogdGhpcy5nYW50dFNlcnZpY2UuY2VsbFdpZHRoICsgJ3B4J1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZXNjYWxlV2Vla2VuZExpbmVTdHlsZShib3JkZXJUb3A6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICdoZWlnaHQnOiB0aGlzLmdhbnR0U2VydmljZS5yb3dIZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAnbGluZS1oZWlnaHQnOiB0aGlzLmdhbnR0U2VydmljZS5yb3dIZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAncG9zaXRpb24nOiAncmVsYXRpdmUnLFxyXG4gICAgICAgICAgICAnYm9yZGVyLXRvcCc6IGJvcmRlclRvcFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZXNjYWxlV2Vla2VuZENlbGxTdHlsZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAnd2lkdGgnOiB0aGlzLmdhbnR0U2VydmljZS5jZWxsV2lkdGggKyAncHgnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpc0RheVdlZWtlbmQoZGF0ZTogRGF0ZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdhbnR0U2VydmljZS5pc0RheVdlZWtlbmQoZGF0ZSk7XHJcbiAgICB9XHJcbn1cclxuIl19