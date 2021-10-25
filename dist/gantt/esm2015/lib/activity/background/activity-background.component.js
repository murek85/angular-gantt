import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { GanttService } from '../../shared/services/gantt.service';
import * as i0 from "@angular/core";
import * as i1 from "../../shared/services/gantt.service";
import * as i2 from "@angular/common";
const _c0 = ["bg"];
function GanttActivityBackgroundComponent_div_2_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 5);
} if (rf & 2) {
    const i_r5 = ctx.index;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngStyle", ctx_r3.setCellStyle())("ngClass", i_r5 % 2 ? "weekend" : "");
} }
function GanttActivityBackgroundComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵtemplate(1, GanttActivityBackgroundComponent_div_2_div_1_Template, 1, 2, "div", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngStyle", ctx_r1.setRowStyle());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r1.cells);
} }
export class GanttActivityBackgroundComponent {
    constructor(ganttService) {
        this.ganttService = ganttService;
        this.rows = [];
        this.cells = [];
    }
    ngOnInit() {
        this.drawGrid();
    }
    isDayWeekend(date) {
        return this.ganttService.isDayWeekend(date);
    }
    setRowStyle() {
        return {
            'height': this.ganttService.rowHeight + 'px'
        };
    }
    setCellStyle() {
        return {
            'width': this.ganttService.cellWidth + 'px'
        };
    }
    drawGrid() {
        this.cells = this.timeScale;
    }
}
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
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(GanttActivityBackgroundComponent, [{
        type: Component,
        args: [{
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
            }]
    }], function () { return [{ type: i1.GanttService }]; }, { tasks: [{
            type: Input
        }], timeScale: [{
            type: Input
        }], bg: [{
            type: ViewChild,
            args: ['bg']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHktYmFja2dyb3VuZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWdhbnR0LyIsInNvdXJjZXMiOlsibGliL2FjdGl2aXR5L2JhY2tncm91bmQvYWN0aXZpdHktYmFja2dyb3VuZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUNBQXFDLENBQUM7Ozs7OztJQVV2RCx5QkFFd0c7Ozs7SUFEcEcsK0NBQTBCLHNDQUFBOzs7SUFMbEMsOEJBSUk7SUFBQSx1RkFFa0c7SUFDdEcsaUJBQU07OztJQU5GLDhDQUF5QjtJQUtyQixlQUF1RDtJQUF2RCxzQ0FBdUQ7O0FBdUJ2RSxNQUFNLE9BQU8sZ0NBQWdDO0lBU3pDLFlBQW1CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBSDdDLFNBQUksR0FBVSxFQUFFLENBQUM7UUFDakIsVUFBSyxHQUFVLEVBQUUsQ0FBQztJQUUrQixDQUFDO0lBRWxELFFBQVE7UUFDSixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELFlBQVksQ0FBQyxJQUFVO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELFdBQVc7UUFDUCxPQUFPO1lBQ0gsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLElBQUk7U0FDL0MsQ0FBQztJQUNOLENBQUM7SUFFRCxZQUFZO1FBQ1IsT0FBTztZQUNILE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJO1NBQzlDLENBQUM7SUFDTixDQUFDO0lBRU8sUUFBUTtRQUNaLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUNoQyxDQUFDOzttSUFqQ1EsZ0NBQWdDO3dGQUFoQyxnQ0FBZ0M7Ozs7OztRQTlCekMsaUNBQ0k7UUFBQSxpRkFJSTtRQUlSLGlCQUFNOztRQU5FLGVBQXlCO1FBQXpCLG1DQUF5Qjs7a0RBMkJ4QixnQ0FBZ0M7Y0FqQzVDLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7O0tBV1Q7Z0JBQ0QsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBaUJSLENBQUM7YUFDTDs7a0JBRUksS0FBSzs7a0JBQ0wsS0FBSzs7a0JBRUwsU0FBUzttQkFBQyxJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgR2FudHRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2dhbnR0LnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2FjdGl2aXR5LWJhY2tncm91bmQnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgI2JnIGNsYXNzPVwiZ2FudHQtYWN0aXZpdHktYmdcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtYWN0aXZpdHktcm93XCJcclxuICAgICAgICAgICAgW25nU3R5bGVdPVwic2V0Um93U3R5bGUoKVwiXHJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCByb3cgb2YgdGFza3NcIj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1hY3Rpdml0eS1jZWxsXCJcclxuICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInNldENlbGxTdHlsZSgpXCJcclxuICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBjZWxsIG9mIGNlbGxzOyBsZXQgaSA9IGluZGV4OyBsZXQgbCA9IGxhc3RcIiBbbmdDbGFzc109XCIoaSAlIDIpID8gJ3dlZWtlbmQnIDogJydcIiA+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBzdHlsZXM6IFtgXHJcbiAgICAgICAgLndlZWtlbmQge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZXNtb2tlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ2FudHQtYWN0aXZpdHktYmcge1xyXG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ2FudHQtYWN0aXZpdHktcm93IHtcclxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlYmViZWI7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5nYW50dC1hY3Rpdml0eS1jZWxsIHtcclxuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNlYmViZWI7XHJcbiAgICAgICAgfVxyXG4gICAgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEdhbnR0QWN0aXZpdHlCYWNrZ3JvdW5kQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIEBJbnB1dCgpIHRhc2tzOiBhbnk7XHJcbiAgICBASW5wdXQoKSB0aW1lU2NhbGU6IGFueTtcclxuXHJcbiAgICBAVmlld0NoaWxkKCdiZycpIGJnOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIHJvd3M6IGFueVtdID0gW107XHJcbiAgICBjZWxsczogYW55W10gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZ2FudHRTZXJ2aWNlOiBHYW50dFNlcnZpY2UpIHsgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuZHJhd0dyaWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0RheVdlZWtlbmQoZGF0ZTogRGF0ZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdhbnR0U2VydmljZS5pc0RheVdlZWtlbmQoZGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Um93U3R5bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ2hlaWdodCc6IHRoaXMuZ2FudHRTZXJ2aWNlLnJvd0hlaWdodCArICdweCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHNldENlbGxTdHlsZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAnd2lkdGgnOiB0aGlzLmdhbnR0U2VydmljZS5jZWxsV2lkdGggKyAncHgnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdHcmlkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2VsbHMgPSB0aGlzLnRpbWVTY2FsZTtcclxuICAgIH1cclxufVxyXG4iXX0=