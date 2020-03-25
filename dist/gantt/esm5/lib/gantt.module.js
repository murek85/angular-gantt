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
                        GanttFooterComponent
                    ],
                    providers: [GanttService],
                    schemas: [
                        CUSTOM_ELEMENTS_SCHEMA
                    ]
                },] }
    ];
    return GanttModule;
}());
export { GanttModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1nYW50dC8iLCJzb3VyY2VzIjpbImxpYi9nYW50dC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDdkUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDdkUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRXZFO0lBQUE7SUFtQjJCLENBQUM7O2dCQW5CM0IsUUFBUSxTQUFDO29CQUNOLE9BQU8sRUFBRTt3QkFDTCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsbUJBQW1CO3FCQUN0QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsY0FBYztxQkFDakI7b0JBQ0QsWUFBWSxFQUFFO3dCQUNWLGNBQWM7d0JBQ2Qsb0JBQW9CO3dCQUNwQixvQkFBb0I7cUJBQ3ZCO29CQUNELFNBQVMsRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDekIsT0FBTyxFQUFFO3dCQUNMLHNCQUFzQjtxQkFDekI7aUJBQ0o7O0lBQzBCLGtCQUFDO0NBQUEsQUFuQjVCLElBbUI0QjtTQUFmLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IEdhbnR0Q29tcG9uZW50IH0gZnJvbSAnLi9nYW50dC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBHYW50dEhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vaGVhZGVyL2dhbnR0LWhlYWRlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBHYW50dEZvb3RlckNvbXBvbmVudCB9IGZyb20gJy4vZm9vdGVyL2dhbnR0LWZvb3Rlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBHYW50dFNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC9zZXJ2aWNlcy9nYW50dC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR2FudHRBY3Rpdml0eU1vZHVsZSB9IGZyb20gJy4vYWN0aXZpdHkvZ2FudHQtYWN0aXZpdHkubW9kdWxlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgICAgIEdhbnR0QWN0aXZpdHlNb2R1bGUsXHJcbiAgICBdLFxyXG4gICAgZXhwb3J0czogW1xyXG4gICAgICAgIEdhbnR0Q29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgR2FudHRDb21wb25lbnQsXHJcbiAgICAgICAgR2FudHRIZWFkZXJDb21wb25lbnQsXHJcbiAgICAgICAgR2FudHRGb290ZXJDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtHYW50dFNlcnZpY2VdLFxyXG4gICAgc2NoZW1hczogW1xyXG4gICAgICAgIENVU1RPTV9FTEVNRU5UU19TQ0hFTUFcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEdhbnR0TW9kdWxlIHsgfVxyXG4iXX0=