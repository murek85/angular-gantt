/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
var GanttHeaderComponent = /** @class */ (function () {
    function GanttHeaderComponent() {
    }
    GanttHeaderComponent.propDecorators = {
        name: [{ type: Input }],
        startDate: [{ type: Input }]
    };
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
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(GanttHeaderComponent, [{
        type: Component,
        args: [{
                selector: 'gantt-header',
                template: "\n        <div class=\"gantt-header\">\n            <div class=\"gantt-header-title\">\n                <div style=\"flex:1\">{{ name }}</div>\n                <div>Started: {{ startDate | date: 'medium'}}</div>\n            </div>\n        </div>\n    ",
                styles: ["\n        .gantt-header {\n            background-color: whitesmoke;\n            height: 40px;\n            border-bottom: 1px solid #e0e0e0;\n        }\n        .gantt-header-title {\n            padding: 12px;\n            display: flex;\n            flex-wrap:wrap;\n            font-family: Arial, Helvetica, sans-serif;\n            font-size: 16px;\n        }\n        .gantt-header-actions {\n            display: inline;\n            float: right;\n            padding: 6px;\n        }\n    "]
            }]
    }], function () { return []; }, { name: [{
            type: Input
        }], startDate: [{
            type: Input
        }] }); })();
    return GanttHeaderComponent;
}());
export { GanttHeaderComponent };
if (false) {
    /** @type {?} */
    GanttHeaderComponent.prototype.name;
    /** @type {?} */
    GanttHeaderComponent.prototype.startDate;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQtaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZXMiOlsibmc6L2FuZ3VsYXItZ2FudHQvbGliL2hlYWRlci9nYW50dC1oZWFkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBRWpEO0FBRWEsSUFGYjtBQUNxQixJQWdDckIsQ0FBQyxBQUhPO0FBQUM7WUE5QlIsU0FBUyxTQUFDLDlCQStCTSx1QkFBWixLQUFLO21CQTlCTixRQUFRLEVBQUUsN0JBOEJDLDRCQUNWLEtBQUs7TUEvQmtCLE5BK0JkO3FCQTlCVixRQUFRLEVBQUU7MEtBT1QsK0JBQ1E7Ozs7Ozs7Ozs7O2tCQWtCUjtNQUNKOzs7Ozs7Ozs7Ozs7Ozs7OztvQkFHbUI7QUFBQyxJQUNyQiwyQkFBQztBQUNBLENBREEsQUFqQ0QsSUFpQ0M7QUFDRCxTQUphLG9CQUFvQjtBQUNoQztBQUFhO0FBQ0gsSUFEUCxvQ0FBbUI7QUFDdkI7QUFBcUIsSUFBakIseUNBQXlCOztBQWxDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUVBLEFBQUEsQUFpQ0EsQUFBQSxBQWpDQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQU9BLEFBQ0EsQUFrQkEsQUFDQSxBQUVBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBakNBLEFBaUNBLEFBSEEsQUFBQSxBQUNBLEFBQUEsQUFDQSxBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2dhbnR0LWhlYWRlcicsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbnR0LWhlYWRlci10aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImZsZXg6MVwiPnt7IG5hbWUgfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXY+U3RhcnRlZDoge3sgc3RhcnREYXRlIHwgZGF0ZTogJ21lZGl1bSd9fTwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBzdHlsZXM6IFtgXHJcbiAgICAgICAgLmdhbnR0LWhlYWRlciB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlc21va2U7XHJcbiAgICAgICAgICAgIGhlaWdodDogNDBweDtcclxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlMGUwZTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5nYW50dC1oZWFkZXItdGl0bGUge1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAxMnB4O1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgICBmbGV4LXdyYXA6d3JhcDtcclxuICAgICAgICAgICAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdhbnR0LWhlYWRlci1hY3Rpb25zIHtcclxuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lO1xyXG4gICAgICAgICAgICBmbG9hdDogcmlnaHQ7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDZweDtcclxuICAgICAgICB9XHJcbiAgICBgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR2FudHRIZWFkZXJDb21wb25lbnQge1xyXG4gICAgQElucHV0KCkgbmFtZTogYW55O1xyXG4gICAgQElucHV0KCkgc3RhcnREYXRlOiBEYXRlO1xyXG59XHJcbiJdfQ==