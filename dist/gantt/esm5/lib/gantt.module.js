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
var GanttModule = /** @class */ (function () {
    function GanttModule() {
    }
    /**
     * @return {?}
     */
    GanttModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: GanttModule,
        };
    };
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
    }], function () { return []; }, null); })();
    return GanttModule;
}());
export { GanttModule };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQubW9kdWxlLmpzIiwic291cmNlcyI6WyJuZzovYW5ndWxhci1nYW50dC9saWIvZ2FudHQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsUUFBUSxFQUNSLHNCQUFzQixHQUV2QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDL0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7O0FBRXZFO0FBQ21DLElBRG5DO0FBQ2EsSUFZYixDQUFDO0FBQ0Q7QUFBUTtBQUFtQjtBQUFRLElBTjFCLG1CQUFPO0FBQU87QUFBbUI7QUFBUSxJQUFoRDtBQUFjLFFBQ1osT0FBTztBQUNYLFlBQU0sUUFBUSxFQUFFLFdBQVc7QUFDM0IsU0FBSyxDQUFDO0FBQ04sSUFBRSxDQUFDOytDQVpGLFFBQVEsU0FBQzttQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixDQUFDLHNCQUN6RCxPQUFPLEVBQUUsQ0FBQyxjQUFjLENBQUMsc0JBQ3pCLFlBQVksRUFBRSxDQUFDLGNBQWMsRUFBRSxvQkFBb0IsRUFBRTtHQUFvQixDQUFDLHNCQUMxRSxTQUFTLEVBQUUsQ0FBQyxZQUFZLENBQUMsc0JBQ3pCLE9BQU8sRUFBRSxDQUFDLHNCQUFzQixDQUFDLG1CQUNsQzs7Ozs7Ozs7OztnREFDUTtBQUFDLElBTVYsa0JBQUM7QUFDQSxDQURBLEFBYkQsSUFhQzs7QUEzQkEsQUFBQSxBQUNBLEFBQUEsQUFDQSxBQUFBLEFBRUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUVBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBRUEsQUFBQSxBQWFBLEFBQUEsQUFMQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQVpBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQU9BLEFBQUEsQUFBQSxBQWJBLEFBYUEsQUFOQSxBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBOZ01vZHVsZSxcclxuICBDVVNUT01fRUxFTUVOVFNfU0NIRU1BLFxyXG4gIE1vZHVsZVdpdGhQcm92aWRlcnMsXHJcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xyXG5cclxuaW1wb3J0IHsgR2FudHRDb21wb25lbnQgfSBmcm9tIFwiLi9nYW50dC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgR2FudHRIZWFkZXJDb21wb25lbnQgfSBmcm9tIFwiLi9oZWFkZXIvZ2FudHQtaGVhZGVyLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBHYW50dEZvb3RlckNvbXBvbmVudCB9IGZyb20gXCIuL2Zvb3Rlci9nYW50dC1mb290ZXIuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEdhbnR0U2VydmljZSB9IGZyb20gXCIuL3NoYXJlZC9zZXJ2aWNlcy9nYW50dC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEdhbnR0QWN0aXZpdHlNb2R1bGUgfSBmcm9tIFwiLi9hY3Rpdml0eS9nYW50dC1hY3Rpdml0eS5tb2R1bGVcIjtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIEdhbnR0QWN0aXZpdHlNb2R1bGVdLFxyXG4gIGV4cG9ydHM6IFtHYW50dENvbXBvbmVudF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbR2FudHRDb21wb25lbnQsIEdhbnR0SGVhZGVyQ29tcG9uZW50LCBHYW50dEZvb3RlckNvbXBvbmVudF0sXHJcbiAgcHJvdmlkZXJzOiBbR2FudHRTZXJ2aWNlXSxcclxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQV0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHYW50dE1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxHYW50dE1vZHVsZT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IEdhbnR0TW9kdWxlLFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19