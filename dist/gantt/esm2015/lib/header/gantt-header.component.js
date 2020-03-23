/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
export class GanttHeaderComponent {
}
GanttHeaderComponent.decorators = [
    { type: Component, args: [{
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
            }] }
];
GanttHeaderComponent.propDecorators = {
    name: [{ type: Input }],
    startDate: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    GanttHeaderComponent.prototype.name;
    /** @type {?} */
    GanttHeaderComponent.prototype.startDate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQtaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZ2FudHQvIiwic291cmNlcyI6WyJsaWIvaGVhZGVyL2dhbnR0LWhlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBa0NqRCxNQUFNLE9BQU8sb0JBQW9COzs7WUFoQ2hDLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsUUFBUSxFQUFFOzs7Ozs7O0tBT1Q7eUJBQ1E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBb0JSO2FBQ0o7OzttQkFFSSxLQUFLO3dCQUNMLEtBQUs7Ozs7SUFETixvQ0FBbUI7O0lBQ25CLHlDQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdnYW50dC1oZWFkZXInLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1oZWFkZXItdGl0bGVcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJmbGV4OjFcIj57eyBuYW1lIH19PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2PlN0YXJ0ZWQ6IHt7IHN0YXJ0RGF0ZSB8IGRhdGU6ICdtZWRpdW0nfX08L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgc3R5bGVzOiBbYFxyXG4gICAgICAgIC5nYW50dC1oZWFkZXIge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZXNtb2tlO1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTBlMGUwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmdhbnR0LWhlYWRlci10aXRsZSB7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDEycHg7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgICAgIGZsZXgtd3JhcDp3cmFwO1xyXG4gICAgICAgICAgICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxNnB4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmdhbnR0LWhlYWRlci1hY3Rpb25zIHtcclxuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lO1xyXG4gICAgICAgICAgICBmbG9hdDogcmlnaHQ7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDZweDtcclxuICAgICAgICB9XHJcbiAgICBgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR2FudHRIZWFkZXJDb21wb25lbnQge1xyXG4gICAgQElucHV0KCkgbmFtZTogYW55O1xyXG4gICAgQElucHV0KCkgc3RhcnREYXRlOiBEYXRlO1xyXG59XHJcbiJdfQ==