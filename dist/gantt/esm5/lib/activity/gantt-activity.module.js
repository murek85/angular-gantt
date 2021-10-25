import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MdePopoverModule } from "@material-extended/mde";
import { GanttActivityComponent } from "./gantt-activity.component";
import { GanttTimeScaleComponent } from "./time-scale/gantt-time-scale.component";
import { GanttActivityBackgroundComponent } from "./background/activity-background.component";
import { GanttActivityBarsComponent } from "./bars/activity-bars.component";
import * as i0 from "@angular/core";
var GanttActivityModule = /** @class */ (function () {
    function GanttActivityModule() {
    }
    /** @nocollapse */ GanttActivityModule.ɵmod = i0.ɵɵdefineNgModule({ type: GanttActivityModule });
    /** @nocollapse */ GanttActivityModule.ɵinj = i0.ɵɵdefineInjector({ factory: function GanttActivityModule_Factory(t) { return new (t || GanttActivityModule)(); }, providers: [], imports: [[CommonModule, MatCardModule, MdePopoverModule]] });
    return GanttActivityModule;
}());
export { GanttActivityModule };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQtYWN0aXZpdHkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1nYW50dC8iLCJzb3VyY2VzIjpbImxpYi9hY3Rpdml0eS9nYW50dC1hY3Rpdml0eS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTFELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQzlGLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOztBQUU1RTtJQUFBO0tBZ0JtQzs4RUFBdEIsbUJBQW1COzRJQUFuQixtQkFBbUIsbUJBRm5CLEVBQUUsWUFiSixDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLENBQUM7OEJBWjFEO0NBMkJtQyxBQWhCbkMsSUFnQm1DO1NBQXRCLG1CQUFtQjt3RkFBbkIsbUJBQW1CLG1CQVA1QixzQkFBc0I7UUFDdEIsdUJBQXVCO1FBQ3ZCLGdDQUFnQztRQUNoQywwQkFBMEIsYUFYbEIsWUFBWSxFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsYUFFckQsc0JBQXNCO1FBQ3RCLHVCQUF1QjtRQUN2QixnQ0FBZ0M7UUFDaEMsMEJBQTBCO2tEQVVqQixtQkFBbUI7Y0FoQi9CLFFBQVE7ZUFBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixDQUFDO2dCQUN4RCxPQUFPLEVBQUU7b0JBQ1Asc0JBQXNCO29CQUN0Qix1QkFBdUI7b0JBQ3ZCLGdDQUFnQztvQkFDaEMsMEJBQTBCO2lCQUMzQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osc0JBQXNCO29CQUN0Qix1QkFBdUI7b0JBQ3ZCLGdDQUFnQztvQkFDaEMsMEJBQTBCO2lCQUMzQjtnQkFDRCxTQUFTLEVBQUUsRUFBRTthQUNkIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcblxyXG5pbXBvcnQgeyBNYXRDYXJkTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL21hdGVyaWFsL2NhcmRcIjtcclxuaW1wb3J0IHsgTWRlUG9wb3Zlck1vZHVsZSB9IGZyb20gXCJAbWF0ZXJpYWwtZXh0ZW5kZWQvbWRlXCI7XHJcblxyXG5pbXBvcnQgeyBHYW50dEFjdGl2aXR5Q29tcG9uZW50IH0gZnJvbSBcIi4vZ2FudHQtYWN0aXZpdHkuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEdhbnR0VGltZVNjYWxlQ29tcG9uZW50IH0gZnJvbSBcIi4vdGltZS1zY2FsZS9nYW50dC10aW1lLXNjYWxlLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBHYW50dEFjdGl2aXR5QmFja2dyb3VuZENvbXBvbmVudCB9IGZyb20gXCIuL2JhY2tncm91bmQvYWN0aXZpdHktYmFja2dyb3VuZC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgR2FudHRBY3Rpdml0eUJhcnNDb21wb25lbnQgfSBmcm9tIFwiLi9iYXJzL2FjdGl2aXR5LWJhcnMuY29tcG9uZW50XCI7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE1hdENhcmRNb2R1bGUsIE1kZVBvcG92ZXJNb2R1bGVdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIEdhbnR0QWN0aXZpdHlDb21wb25lbnQsXHJcbiAgICBHYW50dFRpbWVTY2FsZUNvbXBvbmVudCxcclxuICAgIEdhbnR0QWN0aXZpdHlCYWNrZ3JvdW5kQ29tcG9uZW50LFxyXG4gICAgR2FudHRBY3Rpdml0eUJhcnNDb21wb25lbnQsXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEdhbnR0QWN0aXZpdHlDb21wb25lbnQsXHJcbiAgICBHYW50dFRpbWVTY2FsZUNvbXBvbmVudCxcclxuICAgIEdhbnR0QWN0aXZpdHlCYWNrZ3JvdW5kQ29tcG9uZW50LFxyXG4gICAgR2FudHRBY3Rpdml0eUJhcnNDb21wb25lbnQsXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgR2FudHRBY3Rpdml0eU1vZHVsZSB7fVxyXG4iXX0=