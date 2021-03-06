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
                    styles: ["\n        .gantt-header {\n            background-color: whitesmoke;\n            height: 40px;\n            border-bottom: 1px solid #e0e0e0;\n        }\n        .gantt-header-title {\n            padding: 12px;\n            display: flex;\n            flex-wrap:wrap;\n            font-family: Arial, Helvetica, sans-serif;\n            font-size: 16px;\n        }\n        .gantt-header-actions {\n            display: inline;\n            float: right;\n            padding: 6px;\n        }\n    "]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQtaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZ2FudHQvIiwic291cmNlcyI6WyJsaWIvaGVhZGVyL2dhbnR0LWhlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpEO0lBQUE7SUFpQ0EsQ0FBQzs7Z0JBakNBLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsUUFBUSxFQUFFLCtQQU9UOzZCQUNRLHNmQWtCUjtpQkFDSjs7O3VCQUVJLEtBQUs7NEJBQ0wsS0FBSzs7SUFDViwyQkFBQztDQUFBLEFBakNELElBaUNDO1NBSFksb0JBQW9COzs7SUFDN0Isb0NBQW1COztJQUNuQix5Q0FBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnZ2FudHQtaGVhZGVyJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImdhbnR0LWhlYWRlclwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtaGVhZGVyLXRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZmxleDoxXCI+e3sgbmFtZSB9fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdj5TdGFydGVkOiB7eyBzdGFydERhdGUgfCBkYXRlOiAnbWVkaXVtJ319PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICAgIHN0eWxlczogW2BcclxuICAgICAgICAuZ2FudHQtaGVhZGVyIHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGVzbW9rZTtcclxuICAgICAgICAgICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2UwZTBlMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdhbnR0LWhlYWRlci10aXRsZSB7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDEycHg7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgICAgIGZsZXgtd3JhcDp3cmFwO1xyXG4gICAgICAgICAgICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxNnB4O1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ2FudHQtaGVhZGVyLWFjdGlvbnMge1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmU7XHJcbiAgICAgICAgICAgIGZsb2F0OiByaWdodDtcclxuICAgICAgICAgICAgcGFkZGluZzogNnB4O1xyXG4gICAgICAgIH1cclxuICAgIGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHYW50dEhlYWRlckNvbXBvbmVudCB7XHJcbiAgICBASW5wdXQoKSBuYW1lOiBhbnk7XHJcbiAgICBASW5wdXQoKSBzdGFydERhdGU6IERhdGU7XHJcbn1cclxuIl19