/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GanttComponent } from './gantt.component';
import { GanttHeaderComponent } from './header/gantt-header.component';
import { GanttFooterComponent } from './footer/gantt-footer.component';
import { GanttService } from './shared/services/gantt.service';
import { GanttActivityModule } from './activity/gantt-activity.module';
import { GroupByPipe } from './shared/pipes/groupBy.pipe';
var GanttModule = /** @class */ (function () {
    function GanttModule() {
    }
    GanttModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        GanttActivityModule,
                    ],
                    exports: [
                        GanttComponent
                    ],
                    declarations: [
                        GanttComponent,
                        GanttHeaderComponent,
                        GanttFooterComponent,
                        GroupByPipe
                    ],
                    providers: [GanttService],
                },] }
    ];
    return GanttModule;
}());
export { GanttModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZ2FudHQvIiwic291cmNlcyI6WyJsaWIvZ2FudHQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMvRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUV2RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFMUQ7SUFBQTtJQWlCMkIsQ0FBQzs7Z0JBakIzQixRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFO3dCQUNMLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxtQkFBbUI7cUJBQ3RCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxjQUFjO3FCQUNqQjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1YsY0FBYzt3QkFDZCxvQkFBb0I7d0JBQ3BCLG9CQUFvQjt3QkFDcEIsV0FBVztxQkFDZDtvQkFDRCxTQUFTLEVBQUUsQ0FBQyxZQUFZLENBQUM7aUJBQzVCOztJQUMwQixrQkFBQztDQUFBLEFBakI1QixJQWlCNEI7U0FBZixXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBHYW50dENvbXBvbmVudCB9IGZyb20gJy4vZ2FudHQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgR2FudHRIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL2hlYWRlci9nYW50dC1oZWFkZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgR2FudHRGb290ZXJDb21wb25lbnQgfSBmcm9tICcuL2Zvb3Rlci9nYW50dC1mb290ZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgR2FudHRTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvc2VydmljZXMvZ2FudHQuc2VydmljZSc7XHJcbmltcG9ydCB7IEdhbnR0QWN0aXZpdHlNb2R1bGUgfSBmcm9tICcuL2FjdGl2aXR5L2dhbnR0LWFjdGl2aXR5Lm1vZHVsZSc7XHJcblxyXG5pbXBvcnQgeyBHcm91cEJ5UGlwZSB9IGZyb20gJy4vc2hhcmVkL3BpcGVzL2dyb3VwQnkucGlwZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIENvbW1vbk1vZHVsZSxcclxuICAgICAgICBGb3Jtc01vZHVsZSxcclxuICAgICAgICBHYW50dEFjdGl2aXR5TW9kdWxlLFxyXG4gICAgXSxcclxuICAgIGV4cG9ydHM6IFtcclxuICAgICAgICBHYW50dENvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIEdhbnR0Q29tcG9uZW50LFxyXG4gICAgICAgIEdhbnR0SGVhZGVyQ29tcG9uZW50LFxyXG4gICAgICAgIEdhbnR0Rm9vdGVyQ29tcG9uZW50LFxyXG4gICAgICAgIEdyb3VwQnlQaXBlXHJcbiAgICBdLFxyXG4gICAgcHJvdmlkZXJzOiBbR2FudHRTZXJ2aWNlXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIEdhbnR0TW9kdWxlIHsgfSJdfQ==