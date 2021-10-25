import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MdePopoverModule } from "@material-extended/mde";
import { GanttActivityComponent } from "./gantt-activity.component";
import { GanttTimeScaleComponent } from "./time-scale/gantt-time-scale.component";
import { GanttActivityBackgroundComponent } from "./background/activity-background.component";
import { GanttActivityBarsComponent } from "./bars/activity-bars.component";
import * as i0 from "@angular/core";
export class GanttActivityModule {
}
/** @nocollapse */ GanttActivityModule.ɵmod = i0.ɵɵdefineNgModule({ type: GanttActivityModule });
/** @nocollapse */ GanttActivityModule.ɵinj = i0.ɵɵdefineInjector({ factory: function GanttActivityModule_Factory(t) { return new (t || GanttActivityModule)(); }, providers: [], imports: [[CommonModule, MatCardModule, MdePopoverModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(GanttActivityModule, { declarations: [GanttActivityComponent,
        GanttTimeScaleComponent,
        GanttActivityBackgroundComponent,
        GanttActivityBarsComponent], imports: [CommonModule, MatCardModule, MdePopoverModule], exports: [GanttActivityComponent,
        GanttTimeScaleComponent,
        GanttActivityBackgroundComponent,
        GanttActivityBarsComponent] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(GanttActivityModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, MatCardModule, MdePopoverModule],
                exports: [
                    GanttActivityComponent,
                    GanttTimeScaleComponent,
                    GanttActivityBackgroundComponent,
                    GanttActivityBarsComponent,
                ],
                declarations: [
                    GanttActivityComponent,
                    GanttTimeScaleComponent,
                    GanttActivityBackgroundComponent,
                    GanttActivityBarsComponent,
                ],
                providers: [],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQtYWN0aXZpdHkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1nYW50dC8iLCJzb3VyY2VzIjpbImxpYi9hY3Rpdml0eS9nYW50dC1hY3Rpdml0eS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTFELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQzlGLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOztBQWtCNUUsTUFBTSxPQUFPLG1CQUFtQjs7MEVBQW5CLG1CQUFtQjt3SUFBbkIsbUJBQW1CLG1CQUZuQixFQUFFLFlBYkosQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixDQUFDO3dGQWU3QyxtQkFBbUIsbUJBUDVCLHNCQUFzQjtRQUN0Qix1QkFBdUI7UUFDdkIsZ0NBQWdDO1FBQ2hDLDBCQUEwQixhQVhsQixZQUFZLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixhQUVyRCxzQkFBc0I7UUFDdEIsdUJBQXVCO1FBQ3ZCLGdDQUFnQztRQUNoQywwQkFBMEI7a0RBVWpCLG1CQUFtQjtjQWhCL0IsUUFBUTtlQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLENBQUM7Z0JBQ3hELE9BQU8sRUFBRTtvQkFDUCxzQkFBc0I7b0JBQ3RCLHVCQUF1QjtvQkFDdkIsZ0NBQWdDO29CQUNoQywwQkFBMEI7aUJBQzNCO2dCQUNELFlBQVksRUFBRTtvQkFDWixzQkFBc0I7b0JBQ3RCLHVCQUF1QjtvQkFDdkIsZ0NBQWdDO29CQUNoQywwQkFBMEI7aUJBQzNCO2dCQUNELFNBQVMsRUFBRSxFQUFFO2FBQ2QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcclxuXHJcbmltcG9ydCB7IE1hdENhcmRNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvbWF0ZXJpYWwvY2FyZFwiO1xyXG5pbXBvcnQgeyBNZGVQb3BvdmVyTW9kdWxlIH0gZnJvbSBcIkBtYXRlcmlhbC1leHRlbmRlZC9tZGVcIjtcclxuXHJcbmltcG9ydCB7IEdhbnR0QWN0aXZpdHlDb21wb25lbnQgfSBmcm9tIFwiLi9nYW50dC1hY3Rpdml0eS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgR2FudHRUaW1lU2NhbGVDb21wb25lbnQgfSBmcm9tIFwiLi90aW1lLXNjYWxlL2dhbnR0LXRpbWUtc2NhbGUuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEdhbnR0QWN0aXZpdHlCYWNrZ3JvdW5kQ29tcG9uZW50IH0gZnJvbSBcIi4vYmFja2dyb3VuZC9hY3Rpdml0eS1iYWNrZ3JvdW5kLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBHYW50dEFjdGl2aXR5QmFyc0NvbXBvbmVudCB9IGZyb20gXCIuL2JhcnMvYWN0aXZpdHktYmFycy5jb21wb25lbnRcIjtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTWF0Q2FyZE1vZHVsZSwgTWRlUG9wb3Zlck1vZHVsZV0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgR2FudHRBY3Rpdml0eUNvbXBvbmVudCxcclxuICAgIEdhbnR0VGltZVNjYWxlQ29tcG9uZW50LFxyXG4gICAgR2FudHRBY3Rpdml0eUJhY2tncm91bmRDb21wb25lbnQsXHJcbiAgICBHYW50dEFjdGl2aXR5QmFyc0NvbXBvbmVudCxcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgR2FudHRBY3Rpdml0eUNvbXBvbmVudCxcclxuICAgIEdhbnR0VGltZVNjYWxlQ29tcG9uZW50LFxyXG4gICAgR2FudHRBY3Rpdml0eUJhY2tncm91bmRDb21wb25lbnQsXHJcbiAgICBHYW50dEFjdGl2aXR5QmFyc0NvbXBvbmVudCxcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHYW50dEFjdGl2aXR5TW9kdWxlIHt9XHJcbiJdfQ==