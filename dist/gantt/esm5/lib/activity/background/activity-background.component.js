/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { GanttService } from '../../shared/services/gantt.service';
import { Zooming } from '../../shared/interfaces';
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
        var _this = this;
        this.drawGrid();
        this.zoom.subscribe(function (zoomLevel) {
            _this.zoomLevel = zoomLevel;
            _this.drawGrid();
        });
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
        /** @type {?} */
        var width = this.ganttService.cellWidth;
        if (this.zoomLevel === Zooming[Zooming.hours]) {
            width = this.ganttService.hourCellWidth;
        }
        return {
            'width': width + 'px'
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
        var _this = this;
        if (this.zoomLevel === Zooming[Zooming.hours]) {
            this.cells = [];
            this.timeScale.forEach(function (date) {
                for (var i = 0; i <= 23; i++) {
                    _this.cells.push(date);
                }
            });
        }
        else {
            this.cells = this.timeScale;
        }
    };
    GanttActivityBackgroundComponent.decorators = [
        { type: Component, args: [{
                    selector: 'activity-background',
                    template: "\n    <div #bg class=\"gantt-activity-bg\">\n        <div class=\"gantt-activity-row\"\n            [ngStyle]=\"setRowStyle()\"\n            *ngFor=\"let row of ganttService.groupData(tasks)\">\n\n            <div class=\"gantt-activity-cell\"\n                [ngStyle]=\"setCellStyle()\"\n                *ngFor=\"let cell of cells; let l = last\"\n                [ngClass]=\"[(isDayWeekend(cell)) ? 'weekend' : '', l ? 'last-column-cell' : '']\"></div>\n        </div>\n    </div>\n    ",
                    styles: ["\n        .gantt-activity-bg {\n            overflow: hidden;\n        }\n        .gantt-activity-row {\n            border-bottom: 1px solid #ebebeb;\n            background-color: #fff;\n            box-sizing: border-box;\n        }\n        .gantt-activity-cell {\n            display: inline-block;\n            height: 100%;\n            border-right: 1px solid #ebebeb;\n        }\n        .weekend {\n            background-color: whitesmoke;\n        }\n    "]
                }] }
    ];
    /** @nocollapse */
    GanttActivityBackgroundComponent.ctorParameters = function () { return [
        { type: GanttService }
    ]; };
    GanttActivityBackgroundComponent.propDecorators = {
        tasks: [{ type: Input }],
        timeScale: [{ type: Input }],
        zoom: [{ type: Input }],
        zoomLevel: [{ type: Input }],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHktYmFja2dyb3VuZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWdhbnR0LyIsInNvdXJjZXMiOlsibGliL2FjdGl2aXR5L2JhY2tncm91bmQvYWN0aXZpdHktYmFja2dyb3VuZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUVsRDtJQTZDSSwwQ0FBbUIsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFIN0MsU0FBSSxHQUFVLEVBQUUsQ0FBQztRQUNqQixVQUFLLEdBQVUsRUFBRSxDQUFDO0lBRStCLENBQUM7Ozs7SUFFbEQsbURBQVE7OztJQUFSO1FBQUEsaUJBT0M7UUFORyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBQyxTQUFpQjtZQUNsQyxLQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUMzQixLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOzs7OztJQUVELHVEQUFZOzs7O0lBQVosVUFBYSxJQUFVO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7OztJQUVELHNEQUFXOzs7SUFBWDtRQUNJLE9BQU87WUFDSCxRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSTtTQUMvQyxDQUFDO0lBQ04sQ0FBQzs7OztJQUVELHVEQUFZOzs7SUFBWjs7WUFDUSxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTO1FBRXZDLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzNDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQztTQUMzQztRQUVELE9BQU87WUFDSCxPQUFPLEVBQUUsS0FBSyxHQUFHLElBQUk7U0FDeEIsQ0FBQztJQUNOLENBQUM7Ozs7O0lBRU8sbURBQVE7Ozs7SUFBaEI7UUFBQSxpQkFZQztRQVhHLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzNDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBRWhCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBUztnQkFDN0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDMUIsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3pCO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDTjthQUFNO1lBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQy9CO0lBQ0wsQ0FBQzs7Z0JBMUZKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixRQUFRLEVBQUUsNGVBWVQ7NkJBQ1EscWRBaUJSO2lCQUNKOzs7O2dCQXBDUSxZQUFZOzs7d0JBc0NoQixLQUFLOzRCQUNMLEtBQUs7dUJBQ0wsS0FBSzs0QkFDTCxLQUFLO3FCQUVMLFNBQVMsU0FBQyxJQUFJOztJQW1EbkIsdUNBQUM7Q0FBQSxBQTNGRCxJQTJGQztTQXpEWSxnQ0FBZ0M7OztJQUN6QyxpREFBb0I7O0lBQ3BCLHFEQUF3Qjs7SUFDeEIsZ0RBQW1COztJQUNuQixxREFBMkI7O0lBRTNCLDhDQUFnQzs7SUFFaEMsZ0RBQWlCOztJQUNqQixpREFBa0I7O0lBRU4sd0RBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgR2FudHRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2dhbnR0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBab29taW5nIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2FjdGl2aXR5LWJhY2tncm91bmQnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgI2JnIGNsYXNzPVwiZ2FudHQtYWN0aXZpdHktYmdcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtYWN0aXZpdHktcm93XCJcclxuICAgICAgICAgICAgW25nU3R5bGVdPVwic2V0Um93U3R5bGUoKVwiXHJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCByb3cgb2YgZ2FudHRTZXJ2aWNlLmdyb3VwRGF0YSh0YXNrcylcIj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1hY3Rpdml0eS1jZWxsXCJcclxuICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInNldENlbGxTdHlsZSgpXCJcclxuICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBjZWxsIG9mIGNlbGxzOyBsZXQgbCA9IGxhc3RcIlxyXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiWyhpc0RheVdlZWtlbmQoY2VsbCkpID8gJ3dlZWtlbmQnIDogJycsIGwgPyAnbGFzdC1jb2x1bW4tY2VsbCcgOiAnJ11cIj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICAgIHN0eWxlczogW2BcclxuICAgICAgICAuZ2FudHQtYWN0aXZpdHktYmcge1xyXG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ2FudHQtYWN0aXZpdHktcm93IHtcclxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlYmViZWI7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5nYW50dC1hY3Rpdml0eS1jZWxsIHtcclxuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNlYmViZWI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC53ZWVrZW5kIHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGVzbW9rZTtcclxuICAgICAgICB9XHJcbiAgICBgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR2FudHRBY3Rpdml0eUJhY2tncm91bmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgQElucHV0KCkgdGFza3M6IGFueTtcclxuICAgIEBJbnB1dCgpIHRpbWVTY2FsZTogYW55O1xyXG4gICAgQElucHV0KCkgem9vbTogYW55O1xyXG4gICAgQElucHV0KCkgem9vbUxldmVsOiBzdHJpbmc7XHJcblxyXG4gICAgQFZpZXdDaGlsZCgnYmcnKSBiZzogRWxlbWVudFJlZjtcclxuXHJcbiAgICByb3dzOiBhbnlbXSA9IFtdO1xyXG4gICAgY2VsbHM6IGFueVtdID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGdhbnR0U2VydmljZTogR2FudHRTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmRyYXdHcmlkKCk7XHJcblxyXG4gICAgICAgIHRoaXMuem9vbS5zdWJzY3JpYmUoKHpvb21MZXZlbDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuem9vbUxldmVsID0gem9vbUxldmVsO1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdHcmlkKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNEYXlXZWVrZW5kKGRhdGU6IERhdGUpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nYW50dFNlcnZpY2UuaXNEYXlXZWVrZW5kKGRhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFJvd1N0eWxlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICdoZWlnaHQnOiB0aGlzLmdhbnR0U2VydmljZS5yb3dIZWlnaHQgKyAncHgnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDZWxsU3R5bGUoKSB7XHJcbiAgICAgICAgdmFyIHdpZHRoID0gdGhpcy5nYW50dFNlcnZpY2UuY2VsbFdpZHRoO1xyXG5cclxuICAgICAgICBpZiAodGhpcy56b29tTGV2ZWwgPT09IFpvb21pbmdbWm9vbWluZy5ob3Vyc10pIHtcclxuICAgICAgICAgICAgd2lkdGggPSB0aGlzLmdhbnR0U2VydmljZS5ob3VyQ2VsbFdpZHRoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ3dpZHRoJzogd2lkdGggKyAncHgnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdHcmlkKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnpvb21MZXZlbCA9PT0gWm9vbWluZ1tab29taW5nLmhvdXJzXSkge1xyXG4gICAgICAgICAgICB0aGlzLmNlbGxzID0gW107XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRpbWVTY2FsZS5mb3JFYWNoKChkYXRlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IDIzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzLnB1c2goZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2VsbHMgPSB0aGlzLnRpbWVTY2FsZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19