/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
export class GanttHeaderComponent {
}
GanttHeaderComponent.ɵfac = function GanttHeaderComponent_Factory(t) { return new (t || GanttHeaderComponent)(); };
GanttHeaderComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: GanttHeaderComponent, selectors: [["gantt-header"]], inputs: { name: "name", startDate: "startDate" }, decls: 7, vars: 5, consts: [[1, "gantt-header"], [1, "gantt-header-title"], [2, "flex", "1"]], template: function GanttHeaderComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵelementStart(1, "div", 1);
        ɵngcc0.ɵɵelementStart(2, "div", 2);
        ɵngcc0.ɵɵtext(3);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(4, "div");
        ɵngcc0.ɵɵtext(5);
        ɵngcc0.ɵɵpipe(6, "date");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(3);
        ɵngcc0.ɵɵtextInterpolate(ctx.name);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵtextInterpolate1("Started: ", ɵngcc0.ɵɵpipeBind2(6, 2, ctx.startDate, "medium"), "");
    } }, pipes: [ɵngcc1.DatePipe], styles: [".gantt-header[_ngcontent-%COMP%] {\n            background-color: whitesmoke;\n            height: 40px;\n            border-bottom: 1px solid #e0e0e0;\n        }\n        .gantt-header-title[_ngcontent-%COMP%] {\n            padding: 12px;\n            display: flex;\n            flex-wrap:wrap;\n            font-family: Arial, Helvetica, sans-serif;\n            font-size: 16px;\n        }\n        .gantt-header-actions[_ngcontent-%COMP%] {\n            display: inline;\n            float: right;\n            padding: 6px;\n        }"] });
GanttHeaderComponent.propDecorators = {
    name: [{ type: Input }],
    startDate: [{ type: Input }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(GanttHeaderComponent, [{
        type: Component,
        args: [{
                selector: 'gantt-header',
                template: `
        <div class="gantt-header">
            <div class="gantt-header-title">
                <div style="flex:1">{{ name }}</div>
                <div>Started: {{ startDate | date: 'medium'}}</div>
            </div>
        </div>
    `,
                styles: [`
        .gantt-header {
            background-color: whitesmoke;
            height: 40px;
            border-bottom: 1px solid #e0e0e0;
        }
        .gantt-header-title {
            padding: 12px;
            display: flex;
            flex-wrap:wrap;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 16px;
        }
        .gantt-header-actions {
            display: inline;
            float: right;
            padding: 6px;
        }
    `]
            }]
    }], null, { name: [{
            type: Input
        }], startDate: [{
            type: Input
        }] }); })();
if (false) {
    /** @type {?} */
    GanttHeaderComponent.prototype.name;
    /** @type {?} */
    GanttHeaderComponent.prototype.startDate;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQtaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZXMiOlsibmc6L2FuZ3VsYXItZ2FudHQvbGliL2hlYWRlci9nYW50dC1oZWFkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBZ0NqRCxNQUFNLE9BQU8sb0JBQW9CO0FBQ2pDO2dEQS9CQyxTQUFTLFNBQUMsa0JBQ1AsUUFBUSxFQUFFLGNBQWM7VUFDeEIsUUFBUSxFQUFFLGtQQU9ULDJCQUNROzs7Ozs7Ozs7Ozs7OztRQWtCUixlQUNKOzs7Z2xCQUNHO0FBQUM7QUFDSSxtQkFBSixLQUFLO0FBQUssd0JBQ1YsS0FBSztBQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQUFFO0FBQUM7QUFDakI7QUFDbUIsSUFIZixvQ0FBbUI7QUFDdkI7QUFBcUIsSUFBakIseUNBQXlCOztBQWxDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQWdDQSxBQUFBLEFBQUEsQUFBQSxBQTlCQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQU9BLEFBQ0EsQUFrQkEsQUFDQSxBQUVBLEFBQUEsQUFDQSxBQUFBLEFBREEsQUFBQSxBQUNBLEFBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnZ2FudHQtaGVhZGVyJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImdhbnR0LWhlYWRlclwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtaGVhZGVyLXRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZmxleDoxXCI+e3sgbmFtZSB9fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdj5TdGFydGVkOiB7eyBzdGFydERhdGUgfCBkYXRlOiAnbWVkaXVtJ319PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICAgIHN0eWxlczogW2BcclxuICAgICAgICAuZ2FudHQtaGVhZGVyIHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGVzbW9rZTtcclxuICAgICAgICAgICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2UwZTBlMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdhbnR0LWhlYWRlci10aXRsZSB7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDEycHg7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgICAgIGZsZXgtd3JhcDp3cmFwO1xyXG4gICAgICAgICAgICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxNnB4O1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ2FudHQtaGVhZGVyLWFjdGlvbnMge1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmU7XHJcbiAgICAgICAgICAgIGZsb2F0OiByaWdodDtcclxuICAgICAgICAgICAgcGFkZGluZzogNnB4O1xyXG4gICAgICAgIH1cclxuICAgIGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHYW50dEhlYWRlckNvbXBvbmVudCB7XHJcbiAgICBASW5wdXQoKSBuYW1lOiBhbnk7XHJcbiAgICBASW5wdXQoKSBzdGFydERhdGU6IERhdGU7XHJcbn1cclxuIl19