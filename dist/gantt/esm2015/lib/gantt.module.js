/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { GanttComponent } from "./gantt.component";
import { GanttHeaderComponent } from "./header/gantt-header.component";
import { GanttFooterComponent } from "./footer/gantt-footer.component";
import { GanttService } from "./shared/services/gantt.service";
import { GanttActivityModule } from "./activity/gantt-activity.module";
import * as ɵngcc0 from '@angular/core';
export class GanttModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: GanttModule,
        };
    }
}
GanttModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: GanttModule });
GanttModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function GanttModule_Factory(t) { return new (t || GanttModule)(); }, providers: [GanttService], imports: [[CommonModule, FormsModule, GanttActivityModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(GanttModule, { declarations: function () { return [GanttComponent, GanttHeaderComponent, GanttFooterComponent]; }, imports: function () { return [CommonModule, FormsModule, GanttActivityModule]; }, exports: function () { return [GanttComponent]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(GanttModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, FormsModule, GanttActivityModule],
                exports: [GanttComponent],
                declarations: [GanttComponent, GanttHeaderComponent, GanttFooterComponent],
                providers: [GanttService],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQubW9kdWxlLmpzIiwic291cmNlcyI6WyJuZzovYW5ndWxhci1nYW50dC9saWIvZ2FudHQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsUUFBUSxFQUNSLHNCQUFzQixHQUV2QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDL0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7O0FBU3ZFLE1BQU0sT0FBTyxXQUFXO0FBQ3hCO0FBQVE7QUFBbUI7QUFBUSxJQUFqQyxNQUFNLENBQUMsT0FBTztBQUFLLFFBQ2pCLE9BQU87QUFDWCxZQUFNLFFBQVEsRUFBRSxXQUFXO0FBQzNCLFNBQUssQ0FBQztBQUNOLElBQUUsQ0FBQztBQUNIO3VDQWJDLFFBQVEsU0FBQztPQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsbUJBQW1CLENBQUMsa0JBQ3pELE9BQU8sRUFBRSxDQUFDLGNBQWMsQ0FBQyxrQkFDekIsWUFBWSxFQUFFLENBQUMsY0FBYyxFQUFFLG9CQUFvQixFQUFFLG9CQUFvQixDQUFDO0VBQzFFLFNBQVMsRUFBRSxDQUFDLFlBQVksQ0FBQyxrQkFDekIsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUMsZUFDbEM7Ozs7Ozs7Ozs7O0FBcEJBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQUVBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFFQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQVNBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQVpBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgTmdNb2R1bGUsXHJcbiAgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSxcclxuICBNb2R1bGVXaXRoUHJvdmlkZXJzLFxyXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcclxuXHJcbmltcG9ydCB7IEdhbnR0Q29tcG9uZW50IH0gZnJvbSBcIi4vZ2FudHQuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEdhbnR0SGVhZGVyQ29tcG9uZW50IH0gZnJvbSBcIi4vaGVhZGVyL2dhbnR0LWhlYWRlci5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgR2FudHRGb290ZXJDb21wb25lbnQgfSBmcm9tIFwiLi9mb290ZXIvZ2FudHQtZm9vdGVyLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBHYW50dFNlcnZpY2UgfSBmcm9tIFwiLi9zaGFyZWQvc2VydmljZXMvZ2FudHQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBHYW50dEFjdGl2aXR5TW9kdWxlIH0gZnJvbSBcIi4vYWN0aXZpdHkvZ2FudHQtYWN0aXZpdHkubW9kdWxlXCI7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBHYW50dEFjdGl2aXR5TW9kdWxlXSxcclxuICBleHBvcnRzOiBbR2FudHRDb21wb25lbnRdLFxyXG4gIGRlY2xhcmF0aW9uczogW0dhbnR0Q29tcG9uZW50LCBHYW50dEhlYWRlckNvbXBvbmVudCwgR2FudHRGb290ZXJDb21wb25lbnRdLFxyXG4gIHByb3ZpZGVyczogW0dhbnR0U2VydmljZV0sXHJcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUFdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgR2FudHRNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8R2FudHRNb2R1bGU+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBHYW50dE1vZHVsZSxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==