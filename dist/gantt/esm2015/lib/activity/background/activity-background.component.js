/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { GanttService } from '../../shared/services/gantt.service';
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
        return {
            'width': this.ganttService.cellWidth + 'px'
        };
    }
    /**
     * @private
     * @return {?}
     */
    drawGrid() {
        this.cells = this.timeScale;
    }
}
GanttActivityBackgroundComponent.decorators = [
    { type: Component, args: [{
                selector: 'activity-background',
                template: `
    <div #bg class="gantt-activity-bg">
        <div class="gantt-activity-row"
            [ngStyle]="setRowStyle()"
            *ngFor="let row of tasks">

            <div class="gantt-activity-cell"
                [ngStyle]="setCellStyle()"
                *ngFor="let cell of cells; let i = index; let l = last" [ngClass]="(i % 2) ? 'weekend' : ''" ></div>
        </div>
    </div>
    `,
                styles: [`
        .weekend {
            background-color: whitesmoke;
        }
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
    bg: [{ type: ViewChild, args: ['bg',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHktYmFja2dyb3VuZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWdhbnR0LyIsInNvdXJjZXMiOlsibGliL2FjdGl2aXR5L2JhY2tncm91bmQvYWN0aXZpdHktYmFja2dyb3VuZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBbUNuRSxNQUFNLE9BQU8sZ0NBQWdDOzs7O0lBU3pDLFlBQW1CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBSDdDLFNBQUksR0FBVSxFQUFFLENBQUM7UUFDakIsVUFBSyxHQUFVLEVBQUUsQ0FBQztJQUUrQixDQUFDOzs7O0lBRWxELFFBQVE7UUFDSixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQzs7Ozs7SUFFRCxZQUFZLENBQUMsSUFBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hELENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1AsT0FBTztZQUNILFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJO1NBQy9DLENBQUM7SUFDTixDQUFDOzs7O0lBRUQsWUFBWTtRQUNSLE9BQU87WUFDSCxPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSTtTQUM5QyxDQUFDO0lBQ04sQ0FBQzs7Ozs7SUFFTyxRQUFRO1FBQ1osSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ2hDLENBQUM7OztZQWxFSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsUUFBUSxFQUFFOzs7Ozs7Ozs7OztLQVdUO3lCQUNROzs7Ozs7Ozs7Ozs7Ozs7OztLQWlCUjthQUNKOzs7O1lBbENRLFlBQVk7OztvQkFvQ2hCLEtBQUs7d0JBQ0wsS0FBSztpQkFFTCxTQUFTLFNBQUMsSUFBSTs7OztJQUhmLGlEQUFvQjs7SUFDcEIscURBQXdCOztJQUV4Qiw4Q0FBZ0M7O0lBRWhDLGdEQUFpQjs7SUFDakIsaURBQWtCOztJQUVOLHdEQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEdhbnR0U2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9nYW50dC5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdhY3Rpdml0eS1iYWNrZ3JvdW5kJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2ICNiZyBjbGFzcz1cImdhbnR0LWFjdGl2aXR5LWJnXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImdhbnR0LWFjdGl2aXR5LXJvd1wiXHJcbiAgICAgICAgICAgIFtuZ1N0eWxlXT1cInNldFJvd1N0eWxlKClcIlxyXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgcm93IG9mIHRhc2tzXCI+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtYWN0aXZpdHktY2VsbFwiXHJcbiAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJzZXRDZWxsU3R5bGUoKVwiXHJcbiAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgY2VsbCBvZiBjZWxsczsgbGV0IGkgPSBpbmRleDsgbGV0IGwgPSBsYXN0XCIgW25nQ2xhc3NdPVwiKGkgJSAyKSA/ICd3ZWVrZW5kJyA6ICcnXCIgPjwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgc3R5bGVzOiBbYFxyXG4gICAgICAgIC53ZWVrZW5kIHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGVzbW9rZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdhbnR0LWFjdGl2aXR5LWJnIHtcclxuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdhbnR0LWFjdGl2aXR5LXJvdyB7XHJcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWJlYmViO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ2FudHQtYWN0aXZpdHktY2VsbCB7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgICAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZWJlYmViO1xyXG4gICAgICAgIH1cclxuICAgIGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHYW50dEFjdGl2aXR5QmFja2dyb3VuZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBASW5wdXQoKSB0YXNrczogYW55O1xyXG4gICAgQElucHV0KCkgdGltZVNjYWxlOiBhbnk7XHJcblxyXG4gICAgQFZpZXdDaGlsZCgnYmcnKSBiZzogRWxlbWVudFJlZjtcclxuXHJcbiAgICByb3dzOiBhbnlbXSA9IFtdO1xyXG4gICAgY2VsbHM6IGFueVtdID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGdhbnR0U2VydmljZTogR2FudHRTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmRyYXdHcmlkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNEYXlXZWVrZW5kKGRhdGU6IERhdGUpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nYW50dFNlcnZpY2UuaXNEYXlXZWVrZW5kKGRhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFJvd1N0eWxlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICdoZWlnaHQnOiB0aGlzLmdhbnR0U2VydmljZS5yb3dIZWlnaHQgKyAncHgnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDZWxsU3R5bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ3dpZHRoJzogdGhpcy5nYW50dFNlcnZpY2UuY2VsbFdpZHRoICsgJ3B4J1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3R3JpZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNlbGxzID0gdGhpcy50aW1lU2NhbGU7XHJcbiAgICB9XHJcbn1cclxuIl19