/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';
import { MdePopoverModule } from '@material-extended/mde';
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
                    MatCardModule,
                    MdePopoverModule
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQtYWN0aXZpdHkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1nYW50dC8iLCJzb3VyY2VzIjpbImxpYi9hY3Rpdml0eS9nYW50dC1hY3Rpdml0eS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUUxRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNsRixPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUM5RixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQXNCNUUsTUFBTSxPQUFPLG1CQUFtQjs7O1lBcEIvQixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osYUFBYTtvQkFDYixnQkFBZ0I7aUJBQ25CO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxzQkFBc0I7b0JBQ3RCLHVCQUF1QjtvQkFDdkIsZ0NBQWdDO29CQUNoQywwQkFBMEI7aUJBQzdCO2dCQUNELFlBQVksRUFBRTtvQkFDVixzQkFBc0I7b0JBQ3RCLHVCQUF1QjtvQkFDdkIsZ0NBQWdDO29CQUNoQywwQkFBMEI7aUJBQzdCO2dCQUNELFNBQVMsRUFBRSxFQUFFO2FBQ2hCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IE1hdENhcmRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbmltcG9ydCB7IE1kZVBvcG92ZXJNb2R1bGUgfSBmcm9tICdAbWF0ZXJpYWwtZXh0ZW5kZWQvbWRlJztcclxuXHJcbmltcG9ydCB7IEdhbnR0QWN0aXZpdHlDb21wb25lbnQgfSBmcm9tICcuL2dhbnR0LWFjdGl2aXR5LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEdhbnR0VGltZVNjYWxlQ29tcG9uZW50IH0gZnJvbSAnLi90aW1lLXNjYWxlL2dhbnR0LXRpbWUtc2NhbGUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgR2FudHRBY3Rpdml0eUJhY2tncm91bmRDb21wb25lbnQgfSBmcm9tICcuL2JhY2tncm91bmQvYWN0aXZpdHktYmFja2dyb3VuZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBHYW50dEFjdGl2aXR5QmFyc0NvbXBvbmVudCB9IGZyb20gJy4vYmFycy9hY3Rpdml0eS1iYXJzLmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIENvbW1vbk1vZHVsZSxcclxuICAgICAgICBNYXRDYXJkTW9kdWxlLFxyXG4gICAgICAgIE1kZVBvcG92ZXJNb2R1bGVcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgR2FudHRBY3Rpdml0eUNvbXBvbmVudCxcclxuICAgICAgICBHYW50dFRpbWVTY2FsZUNvbXBvbmVudCxcclxuICAgICAgICBHYW50dEFjdGl2aXR5QmFja2dyb3VuZENvbXBvbmVudCxcclxuICAgICAgICBHYW50dEFjdGl2aXR5QmFyc0NvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIEdhbnR0QWN0aXZpdHlDb21wb25lbnQsXHJcbiAgICAgICAgR2FudHRUaW1lU2NhbGVDb21wb25lbnQsXHJcbiAgICAgICAgR2FudHRBY3Rpdml0eUJhY2tncm91bmRDb21wb25lbnQsXHJcbiAgICAgICAgR2FudHRBY3Rpdml0eUJhcnNDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgR2FudHRBY3Rpdml0eU1vZHVsZSB7IH1cclxuIl19