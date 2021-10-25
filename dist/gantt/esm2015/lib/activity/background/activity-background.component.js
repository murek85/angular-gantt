/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { GanttService } from '../../shared/services/gantt.service';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';

const _c0 = ["bg"];
function GanttActivityBackgroundComponent_div_2_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "div", 5);
} if (rf & 2) {
    const i_r5 = ctx.index;
    const ctx_r3 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("ngStyle", ctx_r3.setCellStyle())("ngClass", i_r5 % 2 ? "weekend" : "");
} }
function GanttActivityBackgroundComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 3);
    ɵngcc0.ɵɵtemplate(1, GanttActivityBackgroundComponent_div_2_div_1_Template, 1, 2, "div", 4);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngStyle", ctx_r1.setRowStyle());
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngForOf", ctx_r1.cells);
} }
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
GanttActivityBackgroundComponent.ɵfac = function GanttActivityBackgroundComponent_Factory(t) { return new (t || GanttActivityBackgroundComponent)(ɵngcc0.ɵɵdirectiveInject(GanttService)); };
GanttActivityBackgroundComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: GanttActivityBackgroundComponent, selectors: [["activity-background"]], viewQuery: function GanttActivityBackgroundComponent_Query(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵviewQuery(_c0, true);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.bg = _t.first);
    } }, inputs: { tasks: "tasks", timeScale: "timeScale" }, decls: 3, vars: 1, consts: [[1, "gantt-activity-bg"], ["bg", ""], ["class", "gantt-activity-row", 3, "ngStyle", 4, "ngFor", "ngForOf"], [1, "gantt-activity-row", 3, "ngStyle"], ["class", "gantt-activity-cell", 3, "ngStyle", "ngClass", 4, "ngFor", "ngForOf"], [1, "gantt-activity-cell", 3, "ngStyle", "ngClass"]], template: function GanttActivityBackgroundComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0, 1);
        ɵngcc0.ɵɵtemplate(2, GanttActivityBackgroundComponent_div_2_Template, 2, 2, "div", 2);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.tasks);
    } }, directives: [ɵngcc1.NgForOf, ɵngcc1.NgStyle, ɵngcc1.NgClass], styles: [".weekend[_ngcontent-%COMP%] {\n            background-color: whitesmoke;\n        }\n        .gantt-activity-bg[_ngcontent-%COMP%] {\n            overflow: hidden;\n        }\n        .gantt-activity-row[_ngcontent-%COMP%] {\n            border-bottom: 1px solid #ebebeb;\n            background-color: #fff;\n            box-sizing: border-box;\n        }\n        .gantt-activity-cell[_ngcontent-%COMP%] {\n            display: inline-block;\n            height: 100%;\n            border-right: 1px solid #ebebeb;\n        }"] });
/** @nocollapse */
GanttActivityBackgroundComponent.ctorParameters = () => [
    { type: GanttService }
];
GanttActivityBackgroundComponent.propDecorators = {
    tasks: [{ type: Input }],
    timeScale: [{ type: Input }],
    bg: [{ type: ViewChild, args: ['bg',] }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(GanttActivityBackgroundComponent, [{
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
    }], function () { return [{ type: GanttService }]; }, { tasks: [{
            type: Input
        }], timeScale: [{
            type: Input
        }], bg: [{
            type: ViewChild,
            args: ['bg']
        }] }); })();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHktYmFja2dyb3VuZC5jb21wb25lbnQuanMiLCJzb3VyY2VzIjpbIm5nOi9hbmd1bGFyLWdhbnR0L2xpYi9hY3Rpdml0eS9iYWNrZ3JvdW5kL2FjdGl2aXR5LWJhY2tncm91bmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1DbkUsTUFBTSxPQUFPLGdDQUFnQztBQUFHO0FBQVE7QUFDbkM7QUFDakIsSUFPQSxZQUFtQixZQUEwQjtBQUFJLFFBQTlCLGlCQUFZLEdBQVosWUFBWSxDQUFjO0FBQUMsUUFIOUMsU0FBSSxHQUFVLEVBQUUsQ0FBQztBQUNyQixRQUFJLFVBQUssR0FBVSxFQUFFLENBQUM7QUFDdEIsSUFDcUQsQ0FBQztBQUN0RDtBQUNPO0FBQ0U7QUFBUSxJQURiLFFBQVE7QUFDWixRQUFRLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUN4QixJQUFJLENBQUM7QUFDTDtBQUNPO0FBQXVCO0FBQ3JCO0FBQVEsSUFEYixZQUFZLENBQUMsSUFBVTtBQUFJLFFBQ3ZCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEQsSUFBSSxDQUFDO0FBQ0w7QUFDTztBQUNEO0FBQVEsSUFEVixXQUFXO0FBQ2YsUUFBUSxPQUFPO0FBQ2YsWUFBWSxRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSTtBQUN4RCxTQUFTLENBQUM7QUFDVixJQUFJLENBQUM7QUFDTDtBQUNPO0FBQ0Y7QUFBUSxJQURULFlBQVk7QUFDaEIsUUFBUSxPQUFPO0FBQ2YsWUFBWSxPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSTtBQUN2RCxTQUFTLENBQUM7QUFDVixJQUFJLENBQUM7QUFDTDtBQUNPO0FBQWdCO0FBQ1o7QUFBUSxJQURQLFFBQVE7QUFBSyxRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7QUFDcEMsSUFBSSxDQUFDO0FBQ0w7NERBbkVDLFNBQVMsU0FBQyxrQkFDUCxRQUFRLEVBQUUscUJBQXFCLGtCQUMvQixRQUFRLEVBQUU7Ozs7O3lEQVdUO0dBQ1Esb2NBaUJSO1VBQ0o7Ozs7OztzbUJBQ0c7QUFBQztBQUFtQjtBQUNSLFlBcENQLFlBQVk7QUFBRztBQUFHO0FBRWpCLG9CQWtDTCxLQUFLO0FBQUssd0JBQ1YsS0FBSztBQUFLLGlCQUVWLFNBQVMsU0FBQyxJQUFJO0FBQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JBQUU7QUFBQztBQUV6QjtBQUNELElBTkUsaURBQW9CO0FBQ3hCO0FBQXFCLElBQWpCLHFEQUF3QjtBQUM1QjtBQUNvQixJQUFoQiw4Q0FBZ0M7QUFDcEM7QUFDb0IsSUFBaEIsZ0RBQWlCO0FBQ3JCO0FBQXFCLElBQWpCLGlEQUFrQjtBQUN0QjtBQUNvQixJQUFKLHdEQUFpQzs7QUE3Q0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFtQ0EsQUFBQSxBQUFBLEFBQUEsQUFTQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBSEEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFFQSxBQUFBLEFBRUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFFQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBRUEsQUFBQSxBQUNBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFDQSxBQUFBLEFBRUEsQUFBQSxBQUNBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFDQSxBQUFBLEFBRUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFsRUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFXQSxBQUNBLEFBaUJBLEFBQ0EsQUFsQ0EsQUFBQSxBQW9DQSxBQUFBLEFBQ0EsQUFBQSxBQUVBLEFBQUEsQUFBQSxBQUFBLEFBSEEsQUFBQSxBQUNBLEFBQUEsQUFFQSxBQUFBLEFBRUEsQUFBQSxBQUNBLEFBQUEsQUFFQSxBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgR2FudHRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2dhbnR0LnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2FjdGl2aXR5LWJhY2tncm91bmQnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgI2JnIGNsYXNzPVwiZ2FudHQtYWN0aXZpdHktYmdcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtYWN0aXZpdHktcm93XCJcclxuICAgICAgICAgICAgW25nU3R5bGVdPVwic2V0Um93U3R5bGUoKVwiXHJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCByb3cgb2YgdGFza3NcIj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1hY3Rpdml0eS1jZWxsXCJcclxuICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInNldENlbGxTdHlsZSgpXCJcclxuICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBjZWxsIG9mIGNlbGxzOyBsZXQgaSA9IGluZGV4OyBsZXQgbCA9IGxhc3RcIiBbbmdDbGFzc109XCIoaSAlIDIpID8gJ3dlZWtlbmQnIDogJydcIiA+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBzdHlsZXM6IFtgXHJcbiAgICAgICAgLndlZWtlbmQge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZXNtb2tlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ2FudHQtYWN0aXZpdHktYmcge1xyXG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ2FudHQtYWN0aXZpdHktcm93IHtcclxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlYmViZWI7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5nYW50dC1hY3Rpdml0eS1jZWxsIHtcclxuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNlYmViZWI7XHJcbiAgICAgICAgfVxyXG4gICAgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEdhbnR0QWN0aXZpdHlCYWNrZ3JvdW5kQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIEBJbnB1dCgpIHRhc2tzOiBhbnk7XHJcbiAgICBASW5wdXQoKSB0aW1lU2NhbGU6IGFueTtcclxuXHJcbiAgICBAVmlld0NoaWxkKCdiZycpIGJnOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIHJvd3M6IGFueVtdID0gW107XHJcbiAgICBjZWxsczogYW55W10gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZ2FudHRTZXJ2aWNlOiBHYW50dFNlcnZpY2UpIHsgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuZHJhd0dyaWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0RheVdlZWtlbmQoZGF0ZTogRGF0ZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdhbnR0U2VydmljZS5pc0RheVdlZWtlbmQoZGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Um93U3R5bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ2hlaWdodCc6IHRoaXMuZ2FudHRTZXJ2aWNlLnJvd0hlaWdodCArICdweCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHNldENlbGxTdHlsZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAnd2lkdGgnOiB0aGlzLmdhbnR0U2VydmljZS5jZWxsV2lkdGggKyAncHgnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdHcmlkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2VsbHMgPSB0aGlzLnRpbWVTY2FsZTtcclxuICAgIH1cclxufVxyXG4iXX0=