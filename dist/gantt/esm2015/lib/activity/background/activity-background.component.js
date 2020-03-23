/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { GanttService } from '../../shared/services/gantt.service';
import { Zooming } from '../../shared/interfaces';
export class GanttActivityBackgroundComponent {
    /**
     * @param {?} ganttService
     */
    constructor(ganttService) {
        this.ganttService = ganttService;
        this.rows = [];
        this.cells = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.drawGrid();
        this.zoom.subscribe((zoomLevel) => {
            this.zoomLevel = zoomLevel;
            this.drawGrid();
        });
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
    setRowStyle() {
        return {
            'height': this.ganttService.rowHeight + 'px'
        };
    }
    /**
     * @return {?}
     */
    setCellStyle() {
        /** @type {?} */
        var width = this.ganttService.cellWidth;
        if (this.zoomLevel === Zooming[Zooming.hours]) {
            width = this.ganttService.hourCellWidth;
        }
        return {
            'width': width + 'px'
        };
    }
    /**
     * @private
     * @return {?}
     */
    drawGrid() {
        if (this.zoomLevel === Zooming[Zooming.hours]) {
            this.cells = [];
            this.timeScale.forEach((date) => {
                for (var i = 0; i <= 23; i++) {
                    this.cells.push(date);
                }
            });
        }
        else {
            this.cells = this.timeScale;
        }
    }
}
GanttActivityBackgroundComponent.decorators = [
    { type: Component, args: [{
                selector: 'activity-background',
                template: `
    <div #bg class="gantt-activity-bg">
        <div class="gantt-activity-row"
            [ngStyle]="setRowStyle()"
            *ngFor="let row of ganttService.groupData(tasks)">

            <div class="gantt-activity-cell"
                [ngStyle]="setCellStyle()"
                *ngFor="let cell of cells; let l = last"
                [ngClass]="[(isDayWeekend(cell)) ? 'weekend' : '', l ? 'last-column-cell' : '']"></div>
        </div>
    </div>
    `,
                styles: [`
        .gantt-activity-bg {
            overflow: hidden;
        }
        .gantt-activity-row {
            border-bottom: 1px solid #ebebeb;
            background-color: #fff;
            box-sizing: border-box;
        }
        .gantt-activity-cell {
            display: inline-block;
            height: 100%;
            border-right: 1px solid #ebebeb;
        }
        .weekend {
            background-color: whitesmoke;
        }
    `]
            }] }
];
/** @nocollapse */
GanttActivityBackgroundComponent.ctorParameters = () => [
    { type: GanttService }
];
GanttActivityBackgroundComponent.propDecorators = {
    tasks: [{ type: Input }],
    timeScale: [{ type: Input }],
    zoom: [{ type: Input }],
    zoomLevel: [{ type: Input }],
    bg: [{ type: ViewChild, args: ['bg',] }]
};
if (false) {
    /** @type {?} */
    GanttActivityBackgroundComponent.prototype.tasks;
    /** @type {?} */
    GanttActivityBackgroundComponent.prototype.timeScale;
    /** @type {?} */
    GanttActivityBackgroundComponent.prototype.zoom;
    /** @type {?} */
    GanttActivityBackgroundComponent.prototype.zoomLevel;
    /** @type {?} */
    GanttActivityBackgroundComponent.prototype.bg;
    /** @type {?} */
    GanttActivityBackgroundComponent.prototype.rows;
    /** @type {?} */
    GanttActivityBackgroundComponent.prototype.cells;
    /** @type {?} */
    GanttActivityBackgroundComponent.prototype.ganttService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHktYmFja2dyb3VuZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWdhbnR0LyIsInNvdXJjZXMiOlsibGliL2FjdGl2aXR5L2JhY2tncm91bmQvYWN0aXZpdHktYmFja2dyb3VuZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQW9DbEQsTUFBTSxPQUFPLGdDQUFnQzs7OztJQVd6QyxZQUFtQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUg3QyxTQUFJLEdBQVUsRUFBRSxDQUFDO1FBQ2pCLFVBQUssR0FBVSxFQUFFLENBQUM7SUFFK0IsQ0FBQzs7OztJQUVsRCxRQUFRO1FBQ0osSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRWhCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBaUIsRUFBRSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1lBQzNCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Ozs7O0lBRUQsWUFBWSxDQUFDLElBQVU7UUFDbkIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoRCxDQUFDOzs7O0lBRUQsV0FBVztRQUNQLE9BQU87WUFDSCxRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSTtTQUMvQyxDQUFDO0lBQ04sQ0FBQzs7OztJQUVELFlBQVk7O1lBQ0osS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUztRQUV2QyxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMzQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUM7U0FDM0M7UUFFRCxPQUFPO1lBQ0gsT0FBTyxFQUFFLEtBQUssR0FBRyxJQUFJO1NBQ3hCLENBQUM7SUFDTixDQUFDOzs7OztJQUVPLFFBQVE7UUFDWixJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMzQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUVoQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFO2dCQUNqQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDekI7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNOO2FBQU07WUFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDL0I7SUFDTCxDQUFDOzs7WUExRkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7O0tBWVQ7eUJBQ1E7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBaUJSO2FBQ0o7Ozs7WUFwQ1EsWUFBWTs7O29CQXNDaEIsS0FBSzt3QkFDTCxLQUFLO21CQUNMLEtBQUs7d0JBQ0wsS0FBSztpQkFFTCxTQUFTLFNBQUMsSUFBSTs7OztJQUxmLGlEQUFvQjs7SUFDcEIscURBQXdCOztJQUN4QixnREFBbUI7O0lBQ25CLHFEQUEyQjs7SUFFM0IsOENBQWdDOztJQUVoQyxnREFBaUI7O0lBQ2pCLGlEQUFrQjs7SUFFTix3REFBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBHYW50dFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvZ2FudHQuc2VydmljZSc7XHJcbmltcG9ydCB7IFpvb21pbmcgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnYWN0aXZpdHktYmFja2dyb3VuZCcsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiAjYmcgY2xhc3M9XCJnYW50dC1hY3Rpdml0eS1iZ1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1hY3Rpdml0eS1yb3dcIlxyXG4gICAgICAgICAgICBbbmdTdHlsZV09XCJzZXRSb3dTdHlsZSgpXCJcclxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IHJvdyBvZiBnYW50dFNlcnZpY2UuZ3JvdXBEYXRhKHRhc2tzKVwiPlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbnR0LWFjdGl2aXR5LWNlbGxcIlxyXG4gICAgICAgICAgICAgICAgW25nU3R5bGVdPVwic2V0Q2VsbFN0eWxlKClcIlxyXG4gICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IGNlbGwgb2YgY2VsbHM7IGxldCBsID0gbGFzdFwiXHJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJbKGlzRGF5V2Vla2VuZChjZWxsKSkgPyAnd2Vla2VuZCcgOiAnJywgbCA/ICdsYXN0LWNvbHVtbi1jZWxsJyA6ICcnXVwiPjwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgc3R5bGVzOiBbYFxyXG4gICAgICAgIC5nYW50dC1hY3Rpdml0eS1iZyB7XHJcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5nYW50dC1hY3Rpdml0eS1yb3cge1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2ViZWJlYjtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdhbnR0LWFjdGl2aXR5LWNlbGwge1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2ViZWJlYjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLndlZWtlbmQge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZXNtb2tlO1xyXG4gICAgICAgIH1cclxuICAgIGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHYW50dEFjdGl2aXR5QmFja2dyb3VuZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBASW5wdXQoKSB0YXNrczogYW55O1xyXG4gICAgQElucHV0KCkgdGltZVNjYWxlOiBhbnk7XHJcbiAgICBASW5wdXQoKSB6b29tOiBhbnk7XHJcbiAgICBASW5wdXQoKSB6b29tTGV2ZWw6IHN0cmluZztcclxuXHJcbiAgICBAVmlld0NoaWxkKCdiZycpIGJnOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIHJvd3M6IGFueVtdID0gW107XHJcbiAgICBjZWxsczogYW55W10gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZ2FudHRTZXJ2aWNlOiBHYW50dFNlcnZpY2UpIHsgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuZHJhd0dyaWQoKTtcclxuXHJcbiAgICAgICAgdGhpcy56b29tLnN1YnNjcmliZSgoem9vbUxldmVsOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgdGhpcy56b29tTGV2ZWwgPSB6b29tTGV2ZWw7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0dyaWQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpc0RheVdlZWtlbmQoZGF0ZTogRGF0ZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdhbnR0U2VydmljZS5pc0RheVdlZWtlbmQoZGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Um93U3R5bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ2hlaWdodCc6IHRoaXMuZ2FudHRTZXJ2aWNlLnJvd0hlaWdodCArICdweCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHNldENlbGxTdHlsZSgpIHtcclxuICAgICAgICB2YXIgd2lkdGggPSB0aGlzLmdhbnR0U2VydmljZS5jZWxsV2lkdGg7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnpvb21MZXZlbCA9PT0gWm9vbWluZ1tab29taW5nLmhvdXJzXSkge1xyXG4gICAgICAgICAgICB3aWR0aCA9IHRoaXMuZ2FudHRTZXJ2aWNlLmhvdXJDZWxsV2lkdGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAnd2lkdGgnOiB3aWR0aCArICdweCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0dyaWQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuem9vbUxldmVsID09PSBab29taW5nW1pvb21pbmcuaG91cnNdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2VsbHMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudGltZVNjYWxlLmZvckVhY2goKGRhdGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gMjM7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2VsbHMucHVzaChkYXRlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jZWxscyA9IHRoaXMudGltZVNjYWxlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=