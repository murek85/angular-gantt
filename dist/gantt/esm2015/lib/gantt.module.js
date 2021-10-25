import { NgModule, CUSTOM_ELEMENTS_SCHEMA, } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { GanttComponent } from "./gantt.component";
import { GanttHeaderComponent } from "./header/gantt-header.component";
import { GanttFooterComponent } from "./footer/gantt-footer.component";
import { GanttService } from "./shared/services/gantt.service";
import { GanttActivityModule } from "./activity/gantt-activity.module";
import * as i0 from "@angular/core";
export class GanttModule {
    static forRoot() {
        return {
            ngModule: GanttModule,
        };
    }
}
/** @nocollapse */ GanttModule.ɵmod = i0.ɵɵdefineNgModule({ type: GanttModule });
/** @nocollapse */ GanttModule.ɵinj = i0.ɵɵdefineInjector({ factory: function GanttModule_Factory(t) { return new (t || GanttModule)(); }, providers: [GanttService], imports: [[CommonModule, FormsModule, GanttActivityModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(GanttModule, { declarations: [GanttComponent, GanttHeaderComponent, GanttFooterComponent], imports: [CommonModule, FormsModule, GanttActivityModule], exports: [GanttComponent] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(GanttModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, FormsModule, GanttActivityModule],
                exports: [GanttComponent],
                declarations: [GanttComponent, GanttHeaderComponent, GanttFooterComponent],
                providers: [GanttService],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1nYW50dC8iLCJzb3VyY2VzIjpbImxpYi9nYW50dC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFFBQVEsRUFDUixzQkFBc0IsR0FFdkIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDdkUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDdkUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDOztBQVN2RSxNQUFNLE9BQU8sV0FBVztJQUN0QixNQUFNLENBQUMsT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUsV0FBVztTQUN0QixDQUFDO0lBQ0osQ0FBQzs7a0VBTFUsV0FBVzt3SEFBWCxXQUFXLG1CQUhYLENBQUMsWUFBWSxDQUFDLFlBSGhCLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsQ0FBQzt3RkFNOUMsV0FBVyxtQkFKUCxjQUFjLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLGFBRi9ELFlBQVksRUFBRSxXQUFXLEVBQUUsbUJBQW1CLGFBQzlDLGNBQWM7a0RBS2IsV0FBVztjQVB2QixRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsQ0FBQztnQkFDekQsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDO2dCQUN6QixZQUFZLEVBQUUsQ0FBQyxjQUFjLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLENBQUM7Z0JBQzFFLFNBQVMsRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDekIsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUM7YUFDbEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIE5nTW9kdWxlLFxyXG4gIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEsXHJcbiAgTW9kdWxlV2l0aFByb3ZpZGVycyxcclxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XHJcblxyXG5pbXBvcnQgeyBHYW50dENvbXBvbmVudCB9IGZyb20gXCIuL2dhbnR0LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBHYW50dEhlYWRlckNvbXBvbmVudCB9IGZyb20gXCIuL2hlYWRlci9nYW50dC1oZWFkZXIuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEdhbnR0Rm9vdGVyQ29tcG9uZW50IH0gZnJvbSBcIi4vZm9vdGVyL2dhbnR0LWZvb3Rlci5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgR2FudHRTZXJ2aWNlIH0gZnJvbSBcIi4vc2hhcmVkL3NlcnZpY2VzL2dhbnR0LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgR2FudHRBY3Rpdml0eU1vZHVsZSB9IGZyb20gXCIuL2FjdGl2aXR5L2dhbnR0LWFjdGl2aXR5Lm1vZHVsZVwiO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgR2FudHRBY3Rpdml0eU1vZHVsZV0sXHJcbiAgZXhwb3J0czogW0dhbnR0Q29tcG9uZW50XSxcclxuICBkZWNsYXJhdGlvbnM6IFtHYW50dENvbXBvbmVudCwgR2FudHRIZWFkZXJDb21wb25lbnQsIEdhbnR0Rm9vdGVyQ29tcG9uZW50XSxcclxuICBwcm92aWRlcnM6IFtHYW50dFNlcnZpY2VdLFxyXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIEdhbnR0TW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEdhbnR0TW9kdWxlPiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogR2FudHRNb2R1bGUsXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=