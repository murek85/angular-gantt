/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { GanttService } from '../../shared/services/gantt.service';
import { Zooming } from '../../shared/interfaces';
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
        this.zoom.subscribe((zoomLevel) => {
            this.zoomLevel = zoomLevel;
        });
    }
    /**
     * @return {?}
     */
    setTimescaleStyle() {
        return {
            'width': this.dimensions.width + 'px'
        };
    }
    /**
     * @param {?} borderTop
     * @return {?}
     */
    setTimescaleLineStyle(borderTop) {
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
    setTimescaleCellStyle() {
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
    }
    /**
     * @param {?} date
     * @return {?}
     */
    isDayWeekend(date) {
        return this.ganttService.isDayWeekend(date);
    }
    /**
     * @return {?}
     */
    getHours() {
        return this.ganttService.getHours(this.timeScale.length);
    }
}
GanttTimeScaleComponent.decorators = [
    { type: Component, args: [{
                selector: 'time-scale',
                template: `
        <div class="time-scale" [ngStyle]="setTimescaleStyle()">
            <div class="time-scale-line" [ngStyle]="setTimescaleLineStyle('none')">
                <div class="time-scale-cell" *ngFor="let date of timeScale" 
                    [ngStyle]="setTimescaleCellStyle()"
                    [ngClass]="(isDayWeekend(date)) ? 'weekend' : ''">{{date | date: 'dd-MM-yyyy'}}</div>
            </div>
            <div *ngIf="zoomLevel === 'hours'" class="time-scale-line" [ngStyle]="setTimescaleLineStyle('1px solid #cecece')">
                <div class="time-scale-cell"
                    *ngFor="let hour of getHours()"
                    [ngStyle]="{ 'width': ganttService.hourCellWidth + 'px' }">{{hour}}</div>
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
            border-bottom: 1px solid #cecece;
            background-color: #fff;
        }
        .time-scale-line {
            box-sizing: border-box;
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
    timeScale: [{ type: Input }],
    dimensions: [{ type: Input }],
    zoom: [{ type: Input }],
    zoomLevel: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQtdGltZS1zY2FsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWdhbnR0LyIsInNvdXJjZXMiOlsibGliL2FjdGl2aXR5L3RpbWUtc2NhbGUvZ2FudHQtdGltZS1zY2FsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUEyQixNQUFNLGVBQWUsQ0FBQztBQUNsRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDbkUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBNkNsRCxNQUFNLE9BQU8sdUJBQXVCOzs7O0lBTWhDLFlBQW1CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBQUksQ0FBQzs7OztJQUVsRCxRQUFRO1FBQ0osSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFpQixFQUFFLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOzs7O0lBRUQsaUJBQWlCO1FBQ2IsT0FBTztZQUNILE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJO1NBQ3hDLENBQUM7SUFDTixDQUFDOzs7OztJQUVELHFCQUFxQixDQUFDLFNBQWlCO1FBQ25DLE9BQU87WUFDSCxRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSTtZQUM1QyxhQUFhLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSTtZQUNqRCxVQUFVLEVBQUUsVUFBVTtZQUN0QixZQUFZLEVBQUUsU0FBUztTQUMxQixDQUFDO0lBQ04sQ0FBQzs7OztJQUVELHFCQUFxQjs7WUFDYixLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTOztZQUNuQyxVQUFVLEdBQUcsRUFBRTs7WUFDZixtQkFBbUIsR0FBRyxFQUFFO1FBRTVCLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBTSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzVDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsR0FBRyxVQUFVLEdBQUcsbUJBQW1CLENBQUM7U0FDOUU7UUFFRCxPQUFPO1lBQ0gsT0FBTyxFQUFFLEtBQUssR0FBRyxJQUFJO1NBQ3hCLENBQUM7SUFDTixDQUFDOzs7OztJQUVELFlBQVksQ0FBQyxJQUFVO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7OztJQUVELFFBQVE7UUFDSixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0QsQ0FBQzs7O1lBNUZKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7ZUFZQztnQkF5QlgsU0FBUyxFQUFFO29CQUNQLFlBQVk7aUJBQ2Y7eUJBMUJROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBc0JIO2FBS1Q7Ozs7WUE3Q1EsWUFBWTs7O3dCQStDaEIsS0FBSzt5QkFDTCxLQUFLO21CQUNMLEtBQUs7d0JBQ0wsS0FBSzs7OztJQUhOLDRDQUF3Qjs7SUFDeEIsNkNBQXlCOztJQUN6Qix1Q0FBbUI7O0lBQ25CLDRDQUF3Qjs7SUFFWiwrQ0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEV2ZW50RW1pdHRlciwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEdhbnR0U2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9nYW50dC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgWm9vbWluZyB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICd0aW1lLXNjYWxlJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRpbWUtc2NhbGVcIiBbbmdTdHlsZV09XCJzZXRUaW1lc2NhbGVTdHlsZSgpXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lLXNjYWxlLWxpbmVcIiBbbmdTdHlsZV09XCJzZXRUaW1lc2NhbGVMaW5lU3R5bGUoJ25vbmUnKVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpbWUtc2NhbGUtY2VsbFwiICpuZ0Zvcj1cImxldCBkYXRlIG9mIHRpbWVTY2FsZVwiIFxyXG4gICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInNldFRpbWVzY2FsZUNlbGxTdHlsZSgpXCJcclxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCIoaXNEYXlXZWVrZW5kKGRhdGUpKSA/ICd3ZWVrZW5kJyA6ICcnXCI+e3tkYXRlIHwgZGF0ZTogJ2RkLU1NLXl5eXknfX08L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJ6b29tTGV2ZWwgPT09ICdob3VycydcIiBjbGFzcz1cInRpbWUtc2NhbGUtbGluZVwiIFtuZ1N0eWxlXT1cInNldFRpbWVzY2FsZUxpbmVTdHlsZSgnMXB4IHNvbGlkICNjZWNlY2UnKVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpbWUtc2NhbGUtY2VsbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IGhvdXIgb2YgZ2V0SG91cnMoKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgW25nU3R5bGVdPVwieyAnd2lkdGgnOiBnYW50dFNlcnZpY2UuaG91ckNlbGxXaWR0aCArICdweCcgfVwiPnt7aG91cn19PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PmAsXHJcbiAgICBzdHlsZXM6IFtgXHJcbiAgICAgICAgLndlZWtlbmQge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZXNtb2tlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAudGltZS1zY2FsZSB7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjZWNlY2U7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC50aW1lLXNjYWxlLWxpbmUge1xyXG4gICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICAgIH1cclxuICAgICAgICAudGltZS1zY2FsZS1saW5lOmZpcnN0LWNoaWxkIHtcclxuICAgICAgICAgICAgYm9yZGVyLXRvcDogbm9uZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLnRpbWUtc2NhbGUtY2VsbCB7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2NlY2VjZTtcclxuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAgICAgfWBcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBHYW50dFNlcnZpY2VcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEdhbnR0VGltZVNjYWxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIEBJbnB1dCgpIHRpbWVTY2FsZTogYW55O1xyXG4gICAgQElucHV0KCkgZGltZW5zaW9uczogYW55O1xyXG4gICAgQElucHV0KCkgem9vbTogYW55O1xyXG4gICAgQElucHV0KCkgem9vbUxldmVsOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGdhbnR0U2VydmljZTogR2FudHRTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLnpvb20uc3Vic2NyaWJlKCh6b29tTGV2ZWw6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnpvb21MZXZlbCA9IHpvb21MZXZlbDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lc2NhbGVTdHlsZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAnd2lkdGgnOiB0aGlzLmRpbWVuc2lvbnMud2lkdGggKyAncHgnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lc2NhbGVMaW5lU3R5bGUoYm9yZGVyVG9wOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAnaGVpZ2h0JzogdGhpcy5nYW50dFNlcnZpY2Uucm93SGVpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogdGhpcy5nYW50dFNlcnZpY2Uucm93SGVpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgJ3Bvc2l0aW9uJzogJ3JlbGF0aXZlJyxcclxuICAgICAgICAgICAgJ2JvcmRlci10b3AnOiBib3JkZXJUb3BcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVzY2FsZUNlbGxTdHlsZSgpIHtcclxuICAgICAgICB2YXIgd2lkdGggPSB0aGlzLmdhbnR0U2VydmljZS5jZWxsV2lkdGg7XHJcbiAgICAgICAgdmFyIGhvdXJzSW5EYXkgPSAyNDtcclxuICAgICAgICB2YXIgaG91clNlcGVyYXRvclBpeGVscyA9IDIzOyAvLyB3ZSBkb24ndCBpbmNsdWRlIHRoZSBmaXJzdCBcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuem9vbUxldmVsID09PSAgWm9vbWluZ1tab29taW5nLmhvdXJzXSkge1xyXG4gICAgICAgICAgICB3aWR0aCA9IHRoaXMuZ2FudHRTZXJ2aWNlLmhvdXJDZWxsV2lkdGggKiBob3Vyc0luRGF5ICsgaG91clNlcGVyYXRvclBpeGVsczsgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAnd2lkdGgnOiB3aWR0aCArICdweCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGlzRGF5V2Vla2VuZChkYXRlOiBEYXRlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FudHRTZXJ2aWNlLmlzRGF5V2Vla2VuZChkYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRIb3VycygpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FudHRTZXJ2aWNlLmdldEhvdXJzKHRoaXMudGltZVNjYWxlLmxlbmd0aCk7XHJcbiAgICB9XHJcbn0iXX0=