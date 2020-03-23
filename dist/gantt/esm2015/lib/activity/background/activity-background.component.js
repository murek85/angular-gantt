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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHktYmFja2dyb3VuZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9nYW50dC8iLCJzb3VyY2VzIjpbImxpYi9hY3Rpdml0eS9iYWNrZ3JvdW5kL2FjdGl2aXR5LWJhY2tncm91bmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNuRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFvQ2xELE1BQU0sT0FBTyxnQ0FBZ0M7Ozs7SUFXekMsWUFBbUIsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFIN0MsU0FBSSxHQUFVLEVBQUUsQ0FBQztRQUNqQixVQUFLLEdBQVUsRUFBRSxDQUFDO0lBRStCLENBQUM7Ozs7SUFFbEQsUUFBUTtRQUNKLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVoQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQWlCLEVBQUUsRUFBRTtZQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUMzQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOzs7OztJQUVELFlBQVksQ0FBQyxJQUFVO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7OztJQUVELFdBQVc7UUFDUCxPQUFPO1lBQ0gsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLElBQUk7U0FDL0MsQ0FBQztJQUNOLENBQUM7Ozs7SUFFRCxZQUFZOztZQUNKLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVM7UUFFdkMsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDM0MsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDO1NBQzNDO1FBRUQsT0FBTztZQUNILE9BQU8sRUFBRSxLQUFLLEdBQUcsSUFBSTtTQUN4QixDQUFDO0lBQ04sQ0FBQzs7Ozs7SUFFTyxRQUFRO1FBQ1osSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDM0MsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7WUFFaEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRTtnQkFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3pCO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDTjthQUFNO1lBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQy9CO0lBQ0wsQ0FBQzs7O1lBMUZKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7OztLQVlUO3lCQUNROzs7Ozs7Ozs7Ozs7Ozs7OztLQWlCUjthQUNKOzs7O1lBcENRLFlBQVk7OztvQkFzQ2hCLEtBQUs7d0JBQ0wsS0FBSzttQkFDTCxLQUFLO3dCQUNMLEtBQUs7aUJBRUwsU0FBUyxTQUFDLElBQUk7Ozs7SUFMZixpREFBb0I7O0lBQ3BCLHFEQUF3Qjs7SUFDeEIsZ0RBQW1COztJQUNuQixxREFBMkI7O0lBRTNCLDhDQUFnQzs7SUFFaEMsZ0RBQWlCOztJQUNqQixpREFBa0I7O0lBRU4sd0RBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgR2FudHRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2dhbnR0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBab29taW5nIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2FjdGl2aXR5LWJhY2tncm91bmQnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgI2JnIGNsYXNzPVwiZ2FudHQtYWN0aXZpdHktYmdcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtYWN0aXZpdHktcm93XCJcclxuICAgICAgICAgICAgW25nU3R5bGVdPVwic2V0Um93U3R5bGUoKVwiXHJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCByb3cgb2YgZ2FudHRTZXJ2aWNlLmdyb3VwRGF0YSh0YXNrcylcIj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1hY3Rpdml0eS1jZWxsXCJcclxuICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInNldENlbGxTdHlsZSgpXCJcclxuICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBjZWxsIG9mIGNlbGxzOyBsZXQgbCA9IGxhc3RcIlxyXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiWyhpc0RheVdlZWtlbmQoY2VsbCkpID8gJ3dlZWtlbmQnIDogJycsIGwgPyAnbGFzdC1jb2x1bW4tY2VsbCcgOiAnJ11cIj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICAgIHN0eWxlczogW2BcclxuICAgICAgICAuZ2FudHQtYWN0aXZpdHktYmcge1xyXG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ2FudHQtYWN0aXZpdHktcm93IHtcclxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlYmViZWI7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5nYW50dC1hY3Rpdml0eS1jZWxsIHtcclxuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNlYmViZWI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC53ZWVrZW5kIHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGVzbW9rZTtcclxuICAgICAgICB9XHJcbiAgICBgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR2FudHRBY3Rpdml0eUJhY2tncm91bmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgQElucHV0KCkgdGFza3M6IGFueTtcclxuICAgIEBJbnB1dCgpIHRpbWVTY2FsZTogYW55O1xyXG4gICAgQElucHV0KCkgem9vbTogYW55O1xyXG4gICAgQElucHV0KCkgem9vbUxldmVsOiBzdHJpbmc7XHJcblxyXG4gICAgQFZpZXdDaGlsZCgnYmcnKSBiZzogRWxlbWVudFJlZjtcclxuXHJcbiAgICByb3dzOiBhbnlbXSA9IFtdO1xyXG4gICAgY2VsbHM6IGFueVtdID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGdhbnR0U2VydmljZTogR2FudHRTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmRyYXdHcmlkKCk7XHJcblxyXG4gICAgICAgIHRoaXMuem9vbS5zdWJzY3JpYmUoKHpvb21MZXZlbDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuem9vbUxldmVsID0gem9vbUxldmVsO1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdHcmlkKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNEYXlXZWVrZW5kKGRhdGU6IERhdGUpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nYW50dFNlcnZpY2UuaXNEYXlXZWVrZW5kKGRhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFJvd1N0eWxlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICdoZWlnaHQnOiB0aGlzLmdhbnR0U2VydmljZS5yb3dIZWlnaHQgKyAncHgnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDZWxsU3R5bGUoKSB7XHJcbiAgICAgICAgdmFyIHdpZHRoID0gdGhpcy5nYW50dFNlcnZpY2UuY2VsbFdpZHRoO1xyXG5cclxuICAgICAgICBpZiAodGhpcy56b29tTGV2ZWwgPT09IFpvb21pbmdbWm9vbWluZy5ob3Vyc10pIHtcclxuICAgICAgICAgICAgd2lkdGggPSB0aGlzLmdhbnR0U2VydmljZS5ob3VyQ2VsbFdpZHRoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ3dpZHRoJzogd2lkdGggKyAncHgnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdHcmlkKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnpvb21MZXZlbCA9PT0gWm9vbWluZ1tab29taW5nLmhvdXJzXSkge1xyXG4gICAgICAgICAgICB0aGlzLmNlbGxzID0gW107XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRpbWVTY2FsZS5mb3JFYWNoKChkYXRlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IDIzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzLnB1c2goZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2VsbHMgPSB0aGlzLnRpbWVTY2FsZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19