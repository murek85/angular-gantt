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
                    GanttFooterComponent,
                    GroupByPipe
                ],
                providers: [GanttService],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZ2FudHQvIiwic291cmNlcyI6WyJsaWIvZ2FudHQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMvRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUV2RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFtQjFELE1BQU0sT0FBTyxXQUFXOzs7WUFqQnZCLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsWUFBWTtvQkFDWixXQUFXO29CQUNYLG1CQUFtQjtpQkFDdEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLGNBQWM7aUJBQ2pCO2dCQUNELFlBQVksRUFBRTtvQkFDVixjQUFjO29CQUNkLG9CQUFvQjtvQkFDcEIsb0JBQW9CO29CQUNwQixXQUFXO2lCQUNkO2dCQUNELFNBQVMsRUFBRSxDQUFDLFlBQVksQ0FBQzthQUM1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgR2FudHRDb21wb25lbnQgfSBmcm9tICcuL2dhbnR0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEdhbnR0SGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9oZWFkZXIvZ2FudHQtaGVhZGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEdhbnR0Rm9vdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9mb290ZXIvZ2FudHQtZm9vdGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEdhbnR0U2VydmljZSB9IGZyb20gJy4vc2hhcmVkL3NlcnZpY2VzL2dhbnR0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHYW50dEFjdGl2aXR5TW9kdWxlIH0gZnJvbSAnLi9hY3Rpdml0eS9nYW50dC1hY3Rpdml0eS5tb2R1bGUnO1xyXG5cclxuaW1wb3J0IHsgR3JvdXBCeVBpcGUgfSBmcm9tICcuL3NoYXJlZC9waXBlcy9ncm91cEJ5LnBpcGUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBDb21tb25Nb2R1bGUsXHJcbiAgICAgICAgRm9ybXNNb2R1bGUsXHJcbiAgICAgICAgR2FudHRBY3Rpdml0eU1vZHVsZSxcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgR2FudHRDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBHYW50dENvbXBvbmVudCxcclxuICAgICAgICBHYW50dEhlYWRlckNvbXBvbmVudCxcclxuICAgICAgICBHYW50dEZvb3RlckNvbXBvbmVudCxcclxuICAgICAgICBHcm91cEJ5UGlwZVxyXG4gICAgXSxcclxuICAgIHByb3ZpZGVyczogW0dhbnR0U2VydmljZV0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHYW50dE1vZHVsZSB7IH0iXX0=