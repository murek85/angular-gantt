/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GanttComponent } from './gantt.component';
import { GanttHeaderComponent } from './header/gantt-header.component';
import { GanttFooterComponent } from './footer/gantt-footer.component';
import { GanttService } from './shared/services/gantt.service';
import { GanttActivityModule } from './activity/gantt-activity.module';
export class GanttModule {
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
                    GanttFooterComponent
                ],
                providers: [GanttService],
                schemas: [
                    CUSTOM_ELEMENTS_SCHEMA
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1nYW50dC8iLCJzb3VyY2VzIjpbImxpYi9nYW50dC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDdkUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDdkUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBcUJ2RSxNQUFNLE9BQU8sV0FBVzs7O1lBbkJ2QixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osV0FBVztvQkFDWCxtQkFBbUI7aUJBQ3RCO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxjQUFjO2lCQUNqQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1YsY0FBYztvQkFDZCxvQkFBb0I7b0JBQ3BCLG9CQUFvQjtpQkFDdkI7Z0JBQ0QsU0FBUyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUN6QixPQUFPLEVBQUU7b0JBQ0wsc0JBQXNCO2lCQUN6QjthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBHYW50dENvbXBvbmVudCB9IGZyb20gJy4vZ2FudHQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgR2FudHRIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL2hlYWRlci9nYW50dC1oZWFkZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgR2FudHRGb290ZXJDb21wb25lbnQgfSBmcm9tICcuL2Zvb3Rlci9nYW50dC1mb290ZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgR2FudHRTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvc2VydmljZXMvZ2FudHQuc2VydmljZSc7XHJcbmltcG9ydCB7IEdhbnR0QWN0aXZpdHlNb2R1bGUgfSBmcm9tICcuL2FjdGl2aXR5L2dhbnR0LWFjdGl2aXR5Lm1vZHVsZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIENvbW1vbk1vZHVsZSxcclxuICAgICAgICBGb3Jtc01vZHVsZSxcclxuICAgICAgICBHYW50dEFjdGl2aXR5TW9kdWxlLFxyXG4gICAgXSxcclxuICAgIGV4cG9ydHM6IFtcclxuICAgICAgICBHYW50dENvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIEdhbnR0Q29tcG9uZW50LFxyXG4gICAgICAgIEdhbnR0SGVhZGVyQ29tcG9uZW50LFxyXG4gICAgICAgIEdhbnR0Rm9vdGVyQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgcHJvdmlkZXJzOiBbR2FudHRTZXJ2aWNlXSxcclxuICAgIHNjaGVtYXM6IFtcclxuICAgICAgICBDVVNUT01fRUxFTUVOVFNfU0NIRU1BXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHYW50dE1vZHVsZSB7IH1cclxuIl19