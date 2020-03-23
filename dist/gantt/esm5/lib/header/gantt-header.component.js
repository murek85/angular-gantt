/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
var GanttHeaderComponent = /** @class */ (function () {
    function GanttHeaderComponent() {
    }
    GanttHeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'gantt-header',
                    template: "\n        <div class=\"gantt-header\">\n            <div class=\"gantt-header-title\">\n                <div style=\"flex:1\">{{ name }}</div>\n                <div>Started: {{ startDate | date: 'medium'}}</div>\n            </div>\n        </div>\n    ",
                    styles: ["\n        .gantt-header {\n            background-color: whitesmoke;\n            height: 40px;\n            border-bottom: 1px solid #e0e0e0;\n        }\n\n        .gantt-header-title {\n            padding: 12px;   \n            display: flex;\n            flex-wrap:wrap;\n            font-family: Arial, Helvetica, sans-serif;\n            font-size: 16px;\n        }\n\n        .gantt-header-actions {\n            display: inline;\n            float: right;\n            padding: 6px;\n        }\n    "]
                }] }
    ];
    GanttHeaderComponent.propDecorators = {
        name: [{ type: Input }],
        startDate: [{ type: Input }]
    };
    return GanttHeaderComponent;
}());
export { GanttHeaderComponent };
if (false) {
    /** @type {?} */
    GanttHeaderComponent.prototype.name;
    /** @type {?} */
    GanttHeaderComponent.prototype.startDate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQtaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2dhbnR0LyIsInNvdXJjZXMiOlsibGliL2hlYWRlci9nYW50dC1oZWFkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVqRDtJQUFBO0lBbUNBLENBQUM7O2dCQW5DQSxTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLFFBQVEsRUFBRSwrUEFPVDs2QkFDUSw2ZkFvQlI7aUJBQ0o7Ozt1QkFFSSxLQUFLOzRCQUNMLEtBQUs7O0lBQ1YsMkJBQUM7Q0FBQSxBQW5DRCxJQW1DQztTQUhZLG9CQUFvQjs7O0lBQzdCLG9DQUFtQjs7SUFDbkIseUNBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2dhbnR0LWhlYWRlcicsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbnR0LWhlYWRlci10aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImZsZXg6MVwiPnt7IG5hbWUgfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXY+U3RhcnRlZDoge3sgc3RhcnREYXRlIHwgZGF0ZTogJ21lZGl1bSd9fTwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBzdHlsZXM6IFtgXHJcbiAgICAgICAgLmdhbnR0LWhlYWRlciB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlc21va2U7XHJcbiAgICAgICAgICAgIGhlaWdodDogNDBweDtcclxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlMGUwZTA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuZ2FudHQtaGVhZGVyLXRpdGxlIHtcclxuICAgICAgICAgICAgcGFkZGluZzogMTJweDsgICBcclxuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAgICAgZmxleC13cmFwOndyYXA7XHJcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuZ2FudHQtaGVhZGVyLWFjdGlvbnMge1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmU7XHJcbiAgICAgICAgICAgIGZsb2F0OiByaWdodDtcclxuICAgICAgICAgICAgcGFkZGluZzogNnB4O1xyXG4gICAgICAgIH1cclxuICAgIGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHYW50dEhlYWRlckNvbXBvbmVudCB7XHJcbiAgICBASW5wdXQoKSBuYW1lOiBhbnk7XHJcbiAgICBASW5wdXQoKSBzdGFydERhdGU6IERhdGU7XHJcbn1cclxuIl19