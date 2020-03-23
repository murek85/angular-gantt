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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHktYmFja2dyb3VuZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9nYW50dC8iLCJzb3VyY2VzIjpbImxpYi9hY3Rpdml0eS9iYWNrZ3JvdW5kL2FjdGl2aXR5LWJhY2tncm91bmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNuRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFbEQ7SUE2Q0ksMENBQW1CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBSDdDLFNBQUksR0FBVSxFQUFFLENBQUM7UUFDakIsVUFBSyxHQUFVLEVBQUUsQ0FBQztJQUUrQixDQUFDOzs7O0lBRWxELG1EQUFROzs7SUFBUjtRQUFBLGlCQU9DO1FBTkcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRWhCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQUMsU0FBaUI7WUFDbEMsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDM0IsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFFRCx1REFBWTs7OztJQUFaLFVBQWEsSUFBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hELENBQUM7Ozs7SUFFRCxzREFBVzs7O0lBQVg7UUFDSSxPQUFPO1lBQ0gsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLElBQUk7U0FDL0MsQ0FBQztJQUNOLENBQUM7Ozs7SUFFRCx1REFBWTs7O0lBQVo7O1lBQ1EsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUztRQUV2QyxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMzQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUM7U0FDM0M7UUFFRCxPQUFPO1lBQ0gsT0FBTyxFQUFFLEtBQUssR0FBRyxJQUFJO1NBQ3hCLENBQUM7SUFDTixDQUFDOzs7OztJQUVPLG1EQUFROzs7O0lBQWhCO1FBQUEsaUJBWUM7UUFYRyxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMzQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUVoQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQVM7Z0JBQzdCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzFCLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUN6QjtZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ047YUFBTTtZQUNILElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUMvQjtJQUNMLENBQUM7O2dCQTFGSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsUUFBUSxFQUFFLDRlQVlUOzZCQUNRLHFkQWlCUjtpQkFDSjs7OztnQkFwQ1EsWUFBWTs7O3dCQXNDaEIsS0FBSzs0QkFDTCxLQUFLO3VCQUNMLEtBQUs7NEJBQ0wsS0FBSztxQkFFTCxTQUFTLFNBQUMsSUFBSTs7SUFtRG5CLHVDQUFDO0NBQUEsQUEzRkQsSUEyRkM7U0F6RFksZ0NBQWdDOzs7SUFDekMsaURBQW9COztJQUNwQixxREFBd0I7O0lBQ3hCLGdEQUFtQjs7SUFDbkIscURBQTJCOztJQUUzQiw4Q0FBZ0M7O0lBRWhDLGdEQUFpQjs7SUFDakIsaURBQWtCOztJQUVOLHdEQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEdhbnR0U2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9nYW50dC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgWm9vbWluZyB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdhY3Rpdml0eS1iYWNrZ3JvdW5kJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2ICNiZyBjbGFzcz1cImdhbnR0LWFjdGl2aXR5LWJnXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImdhbnR0LWFjdGl2aXR5LXJvd1wiXHJcbiAgICAgICAgICAgIFtuZ1N0eWxlXT1cInNldFJvd1N0eWxlKClcIlxyXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgcm93IG9mIGdhbnR0U2VydmljZS5ncm91cERhdGEodGFza3MpXCI+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtYWN0aXZpdHktY2VsbFwiXHJcbiAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJzZXRDZWxsU3R5bGUoKVwiXHJcbiAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgY2VsbCBvZiBjZWxsczsgbGV0IGwgPSBsYXN0XCJcclxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIlsoaXNEYXlXZWVrZW5kKGNlbGwpKSA/ICd3ZWVrZW5kJyA6ICcnLCBsID8gJ2xhc3QtY29sdW1uLWNlbGwnIDogJyddXCI+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBzdHlsZXM6IFtgXHJcbiAgICAgICAgLmdhbnR0LWFjdGl2aXR5LWJnIHtcclxuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdhbnR0LWFjdGl2aXR5LXJvdyB7XHJcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWJlYmViO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ2FudHQtYWN0aXZpdHktY2VsbCB7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgICAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZWJlYmViO1xyXG4gICAgICAgIH1cclxuICAgICAgICAud2Vla2VuZCB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlc21va2U7XHJcbiAgICAgICAgfVxyXG4gICAgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEdhbnR0QWN0aXZpdHlCYWNrZ3JvdW5kQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIEBJbnB1dCgpIHRhc2tzOiBhbnk7XHJcbiAgICBASW5wdXQoKSB0aW1lU2NhbGU6IGFueTtcclxuICAgIEBJbnB1dCgpIHpvb206IGFueTtcclxuICAgIEBJbnB1dCgpIHpvb21MZXZlbDogc3RyaW5nO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ2JnJykgYmc6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgcm93czogYW55W10gPSBbXTtcclxuICAgIGNlbGxzOiBhbnlbXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBnYW50dFNlcnZpY2U6IEdhbnR0U2VydmljZSkgeyB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5kcmF3R3JpZCgpO1xyXG5cclxuICAgICAgICB0aGlzLnpvb20uc3Vic2NyaWJlKCh6b29tTGV2ZWw6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnpvb21MZXZlbCA9IHpvb21MZXZlbDtcclxuICAgICAgICAgICAgdGhpcy5kcmF3R3JpZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlzRGF5V2Vla2VuZChkYXRlOiBEYXRlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FudHRTZXJ2aWNlLmlzRGF5V2Vla2VuZChkYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRSb3dTdHlsZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAnaGVpZ2h0JzogdGhpcy5nYW50dFNlcnZpY2Uucm93SGVpZ2h0ICsgJ3B4J1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q2VsbFN0eWxlKCkge1xyXG4gICAgICAgIHZhciB3aWR0aCA9IHRoaXMuZ2FudHRTZXJ2aWNlLmNlbGxXaWR0aDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuem9vbUxldmVsID09PSBab29taW5nW1pvb21pbmcuaG91cnNdKSB7XHJcbiAgICAgICAgICAgIHdpZHRoID0gdGhpcy5nYW50dFNlcnZpY2UuaG91ckNlbGxXaWR0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICd3aWR0aCc6IHdpZHRoICsgJ3B4J1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3R3JpZCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy56b29tTGV2ZWwgPT09IFpvb21pbmdbWm9vbWluZy5ob3Vyc10pIHtcclxuICAgICAgICAgICAgdGhpcy5jZWxscyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50aW1lU2NhbGUuZm9yRWFjaCgoZGF0ZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSAyMzsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxscy5wdXNoKGRhdGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNlbGxzID0gdGhpcy50aW1lU2NhbGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==