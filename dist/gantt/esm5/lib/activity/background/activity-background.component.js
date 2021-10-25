import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { GanttService } from '../../shared/services/gantt.service';
import * as i0 from "@angular/core";
import * as i1 from "../../shared/services/gantt.service";
import * as i2 from "@angular/common";
var _c0 = ["bg"];
function GanttActivityBackgroundComponent_div_2_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 5);
} if (rf & 2) {
    var i_r5 = ctx.index;
    var ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngStyle", ctx_r3.setCellStyle())("ngClass", i_r5 % 2 ? "weekend" : "");
} }
function GanttActivityBackgroundComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵtemplate(1, GanttActivityBackgroundComponent_div_2_div_1_Template, 1, 2, "div", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngStyle", ctx_r1.setRowStyle());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r1.cells);
} }
var GanttActivityBackgroundComponent = /** @class */ (function () {
    function GanttActivityBackgroundComponent(ganttService) {
        this.ganttService = ganttService;
        this.rows = [];
        this.cells = [];
    }
    GanttActivityBackgroundComponent.prototype.ngOnInit = function () {
        this.drawGrid();
    };
    GanttActivityBackgroundComponent.prototype.isDayWeekend = function (date) {
        return this.ganttService.isDayWeekend(date);
    };
    GanttActivityBackgroundComponent.prototype.setRowStyle = function () {
        return {
            'height': this.ganttService.rowHeight + 'px'
        };
    };
    GanttActivityBackgroundComponent.prototype.setCellStyle = function () {
        return {
            'width': this.ganttService.cellWidth + 'px'
        };
    };
    GanttActivityBackgroundComponent.prototype.drawGrid = function () {
        this.cells = this.timeScale;
    };
    /** @nocollapse */ GanttActivityBackgroundComponent.ɵfac = function GanttActivityBackgroundComponent_Factory(t) { return new (t || GanttActivityBackgroundComponent)(i0.ɵɵdirectiveInject(i1.GanttService)); };
    /** @nocollapse */ GanttActivityBackgroundComponent.ɵcmp = i0.ɵɵdefineComponent({ type: GanttActivityBackgroundComponent, selectors: [["activity-background"]], viewQuery: function GanttActivityBackgroundComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, true);
        } if (rf & 2) {
            var _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.bg = _t.first);
        } }, inputs: { tasks: "tasks", timeScale: "timeScale" }, decls: 3, vars: 1, consts: [[1, "gantt-activity-bg"], ["bg", ""], ["class", "gantt-activity-row", 3, "ngStyle", 4, "ngFor", "ngForOf"], [1, "gantt-activity-row", 3, "ngStyle"], ["class", "gantt-activity-cell", 3, "ngStyle", "ngClass", 4, "ngFor", "ngForOf"], [1, "gantt-activity-cell", 3, "ngStyle", "ngClass"]], template: function GanttActivityBackgroundComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0, 1);
            i0.ɵɵtemplate(2, GanttActivityBackgroundComponent_div_2_Template, 2, 2, "div", 2);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.tasks);
        } }, directives: [i2.NgForOf, i2.NgStyle, i2.NgClass], styles: [".weekend[_ngcontent-%COMP%] {\n            background-color: whitesmoke;\n        }\n        .gantt-activity-bg[_ngcontent-%COMP%] {\n            overflow: hidden;\n        }\n        .gantt-activity-row[_ngcontent-%COMP%] {\n            border-bottom: 1px solid #ebebeb;\n            background-color: #fff;\n            box-sizing: border-box;\n        }\n        .gantt-activity-cell[_ngcontent-%COMP%] {\n            display: inline-block;\n            height: 100%;\n            border-right: 1px solid #ebebeb;\n        }"] });
    return GanttActivityBackgroundComponent;
}());
export { GanttActivityBackgroundComponent };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(GanttActivityBackgroundComponent, [{
        type: Component,
        args: [{
                selector: 'activity-background',
                template: "\n    <div #bg class=\"gantt-activity-bg\">\n        <div class=\"gantt-activity-row\"\n            [ngStyle]=\"setRowStyle()\"\n            *ngFor=\"let row of tasks\">\n\n            <div class=\"gantt-activity-cell\"\n                [ngStyle]=\"setCellStyle()\"\n                *ngFor=\"let cell of cells; let i = index; let l = last\" [ngClass]=\"(i % 2) ? 'weekend' : ''\" ></div>\n        </div>\n    </div>\n    ",
                styles: ["\n        .weekend {\n            background-color: whitesmoke;\n        }\n        .gantt-activity-bg {\n            overflow: hidden;\n        }\n        .gantt-activity-row {\n            border-bottom: 1px solid #ebebeb;\n            background-color: #fff;\n            box-sizing: border-box;\n        }\n        .gantt-activity-cell {\n            display: inline-block;\n            height: 100%;\n            border-right: 1px solid #ebebeb;\n        }\n    "]
            }]
    }], function () { return [{ type: i1.GanttService }]; }, { tasks: [{
            type: Input
        }], timeScale: [{
            type: Input
        }], bg: [{
            type: ViewChild,
            args: ['bg']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHktYmFja2dyb3VuZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWdhbnR0LyIsInNvdXJjZXMiOlsibGliL2FjdGl2aXR5L2JhY2tncm91bmQvYWN0aXZpdHktYmFja2dyb3VuZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUNBQXFDLENBQUM7Ozs7OztJQVV2RCx5QkFFd0c7Ozs7SUFEcEcsK0NBQTBCLHNDQUFBOzs7SUFMbEMsOEJBSUk7SUFBQSx1RkFFa0c7SUFDdEcsaUJBQU07OztJQU5GLDhDQUF5QjtJQUtyQixlQUF1RDtJQUF2RCxzQ0FBdUQ7O0FBVnZFO0lBMENJLDBDQUFtQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUg3QyxTQUFJLEdBQVUsRUFBRSxDQUFDO1FBQ2pCLFVBQUssR0FBVSxFQUFFLENBQUM7SUFFK0IsQ0FBQztJQUVsRCxtREFBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCx1REFBWSxHQUFaLFVBQWEsSUFBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxzREFBVyxHQUFYO1FBQ0ksT0FBTztZQUNILFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJO1NBQy9DLENBQUM7SUFDTixDQUFDO0lBRUQsdURBQVksR0FBWjtRQUNJLE9BQU87WUFDSCxPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSTtTQUM5QyxDQUFDO0lBQ04sQ0FBQztJQUVPLG1EQUFRLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ2hDLENBQUM7dUlBakNRLGdDQUFnQzs0RkFBaEMsZ0NBQWdDOzs7Ozs7WUE5QnpDLGlDQUNJO1lBQUEsaUZBSUk7WUFJUixpQkFBTTs7WUFORSxlQUF5QjtZQUF6QixtQ0FBeUI7OzJDQVRyQztDQXNFQyxBQW5FRCxJQW1FQztTQWxDWSxnQ0FBZ0M7a0RBQWhDLGdDQUFnQztjQWpDNUMsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLFFBQVEsRUFBRSx1YUFXVDtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxxZEFpQlIsQ0FBQzthQUNMOztrQkFFSSxLQUFLOztrQkFDTCxLQUFLOztrQkFFTCxTQUFTO21CQUFDLElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBHYW50dFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvZ2FudHQuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnYWN0aXZpdHktYmFja2dyb3VuZCcsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiAjYmcgY2xhc3M9XCJnYW50dC1hY3Rpdml0eS1iZ1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1hY3Rpdml0eS1yb3dcIlxyXG4gICAgICAgICAgICBbbmdTdHlsZV09XCJzZXRSb3dTdHlsZSgpXCJcclxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IHJvdyBvZiB0YXNrc1wiPlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbnR0LWFjdGl2aXR5LWNlbGxcIlxyXG4gICAgICAgICAgICAgICAgW25nU3R5bGVdPVwic2V0Q2VsbFN0eWxlKClcIlxyXG4gICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IGNlbGwgb2YgY2VsbHM7IGxldCBpID0gaW5kZXg7IGxldCBsID0gbGFzdFwiIFtuZ0NsYXNzXT1cIihpICUgMikgPyAnd2Vla2VuZCcgOiAnJ1wiID48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICAgIHN0eWxlczogW2BcclxuICAgICAgICAud2Vla2VuZCB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlc21va2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5nYW50dC1hY3Rpdml0eS1iZyB7XHJcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5nYW50dC1hY3Rpdml0eS1yb3cge1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2ViZWJlYjtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdhbnR0LWFjdGl2aXR5LWNlbGwge1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2ViZWJlYjtcclxuICAgICAgICB9XHJcbiAgICBgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR2FudHRBY3Rpdml0eUJhY2tncm91bmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgQElucHV0KCkgdGFza3M6IGFueTtcclxuICAgIEBJbnB1dCgpIHRpbWVTY2FsZTogYW55O1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ2JnJykgYmc6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgcm93czogYW55W10gPSBbXTtcclxuICAgIGNlbGxzOiBhbnlbXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBnYW50dFNlcnZpY2U6IEdhbnR0U2VydmljZSkgeyB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5kcmF3R3JpZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzRGF5V2Vla2VuZChkYXRlOiBEYXRlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FudHRTZXJ2aWNlLmlzRGF5V2Vla2VuZChkYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRSb3dTdHlsZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAnaGVpZ2h0JzogdGhpcy5nYW50dFNlcnZpY2Uucm93SGVpZ2h0ICsgJ3B4J1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q2VsbFN0eWxlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICd3aWR0aCc6IHRoaXMuZ2FudHRTZXJ2aWNlLmNlbGxXaWR0aCArICdweCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0dyaWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jZWxscyA9IHRoaXMudGltZVNjYWxlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==