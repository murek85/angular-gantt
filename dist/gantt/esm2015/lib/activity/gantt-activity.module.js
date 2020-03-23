/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GanttActivityComponent } from './gantt-activity.component';
import { GanttTimeScaleComponent } from './time-scale/gantt-time-scale.component';
import { GanttActivityBackgroundComponent } from './background/activity-background.component';
import { GanttActivityBarsComponent } from './bars/activity-bars.component';
export class GanttActivityModule {
}
GanttActivityModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                ],
                exports: [
                    GanttActivityComponent,
                    GanttTimeScaleComponent,
                    GanttActivityBackgroundComponent,
                    GanttActivityBarsComponent
                ],
                declarations: [
                    GanttActivityComponent,
                    GanttTimeScaleComponent,
                    GanttActivityBackgroundComponent,
                    GanttActivityBarsComponent
                ],
                providers: [],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQtYWN0aXZpdHkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1nYW50dC8iLCJzb3VyY2VzIjpbImxpYi9hY3Rpdml0eS9nYW50dC1hY3Rpdml0eS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQzlGLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBb0I1RSxNQUFNLE9BQU8sbUJBQW1COzs7WUFsQi9CLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsWUFBWTtpQkFDZjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsc0JBQXNCO29CQUN0Qix1QkFBdUI7b0JBQ3ZCLGdDQUFnQztvQkFDaEMsMEJBQTBCO2lCQUM3QjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1Ysc0JBQXNCO29CQUN0Qix1QkFBdUI7b0JBQ3ZCLGdDQUFnQztvQkFDaEMsMEJBQTBCO2lCQUM3QjtnQkFDRCxTQUFTLEVBQUUsRUFBRTthQUNoQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBHYW50dEFjdGl2aXR5Q29tcG9uZW50IH0gZnJvbSAnLi9nYW50dC1hY3Rpdml0eS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBHYW50dFRpbWVTY2FsZUNvbXBvbmVudCB9IGZyb20gJy4vdGltZS1zY2FsZS9nYW50dC10aW1lLXNjYWxlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEdhbnR0QWN0aXZpdHlCYWNrZ3JvdW5kQ29tcG9uZW50IH0gZnJvbSAnLi9iYWNrZ3JvdW5kL2FjdGl2aXR5LWJhY2tncm91bmQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgR2FudHRBY3Rpdml0eUJhcnNDb21wb25lbnQgfSBmcm9tICcuL2JhcnMvYWN0aXZpdHktYmFycy5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBdLFxyXG4gICAgZXhwb3J0czogW1xyXG4gICAgICAgIEdhbnR0QWN0aXZpdHlDb21wb25lbnQsXHJcbiAgICAgICAgR2FudHRUaW1lU2NhbGVDb21wb25lbnQsXHJcbiAgICAgICAgR2FudHRBY3Rpdml0eUJhY2tncm91bmRDb21wb25lbnQsXHJcbiAgICAgICAgR2FudHRBY3Rpdml0eUJhcnNDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBHYW50dEFjdGl2aXR5Q29tcG9uZW50LFxyXG4gICAgICAgIEdhbnR0VGltZVNjYWxlQ29tcG9uZW50LFxyXG4gICAgICAgIEdhbnR0QWN0aXZpdHlCYWNrZ3JvdW5kQ29tcG9uZW50LFxyXG4gICAgICAgIEdhbnR0QWN0aXZpdHlCYXJzQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgcHJvdmlkZXJzOiBbXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIEdhbnR0QWN0aXZpdHlNb2R1bGUgeyB9XHJcbiJdfQ==