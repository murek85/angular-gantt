import { Component, Input, EventEmitter, Output } from '@angular/core';
import { GanttService } from './shared/services/gantt.service';
import * as i0 from "@angular/core";
import * as i1 from "./shared/services/gantt.service";
import * as i2 from "@angular/common";
import * as i3 from "./activity/gantt-activity.component";
var _c0 = function () { return { "width": "100%" }; };
var GanttComponent = /** @class */ (function () {
    function GanttComponent(ganttService) {
        this.ganttService = ganttService;
        this.onGridRowClick = new EventEmitter();
        this.onPopoverOpen = new EventEmitter();
    }
    Object.defineProperty(GanttComponent.prototype, "project", {
        get: function () { return this._project; },
        set: function (project) {
            if (project) {
                this._project = project;
            }
            else {
                this.setDefaultProject();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GanttComponent.prototype, "options", {
        get: function () { return this._options; },
        set: function (options) {
            if (options.scale) {
                this._options = options;
            }
            else {
                this.setDefaultOptions();
            }
        },
        enumerable: true,
        configurable: true
    });
    GanttComponent.prototype.ngOnInit = function () {
    };
    GanttComponent.prototype.setSizes = function () {
        this.ganttContainerWidth = this.ganttService.calculateContainerWidth();
    };
    GanttComponent.prototype.setDefaultOptions = function () {
        var scale = this.ganttService.calculateGridScale(this._project.tasks);
        var gridColumns = [
            { name: '', left: 0, width: 16 },
            { name: 'Zadanie', left: 0, width: 330 }
        ];
        this._options = {
            scale: scale,
            gridColumns: gridColumns
        };
    };
    GanttComponent.prototype.setDefaultProject = function () {
        this._project = {
            name: '',
            startDate: null,
            tasks: []
        };
    };
    GanttComponent.prototype.gridRowClicked = function (task) {
        this.onGridRowClick.emit(task);
    };
    GanttComponent.prototype.popoverOpened = function (task) {
        this.onPopoverOpen.emit(task);
    };
    GanttComponent.prototype.onResize = function ($event) {
        this.setSizes();
    };
    /** @nocollapse */ GanttComponent.ɵfac = function GanttComponent_Factory(t) { return new (t || GanttComponent)(i0.ɵɵdirectiveInject(i1.GanttService)); };
    /** @nocollapse */ GanttComponent.ɵcmp = i0.ɵɵdefineComponent({ type: GanttComponent, selectors: [["gantt"]], inputs: { project: "project", options: "options" }, outputs: { onGridRowClick: "onGridRowClick", onPopoverOpen: "onPopoverOpen" }, features: [i0.ɵɵProvidersFeature([])], decls: 3, vars: 4, consts: [[3, "ngStyle"], [1, "gantt-container", 3, "resize"], [3, "project", "options", "onGridRowClick", "onPopoverOpen"]], template: function GanttComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelementStart(1, "div", 1);
            i0.ɵɵlistener("resize", function GanttComponent_Template_div_resize_1_listener($event) { return ctx.onResize($event); }, false, i0.ɵɵresolveWindow);
            i0.ɵɵelementStart(2, "gantt-activity", 2);
            i0.ɵɵlistener("onGridRowClick", function GanttComponent_Template_gantt_activity_onGridRowClick_2_listener($event) { return ctx.gridRowClicked($event); })("onPopoverOpen", function GanttComponent_Template_gantt_activity_onPopoverOpen_2_listener($event) { return ctx.popoverOpened($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction0(3, _c0));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("project", ctx._project)("options", ctx._options);
        } }, directives: [i2.NgStyle, i3.GanttActivityComponent], styles: [".gantt-container[_ngcontent-%COMP%] {\n            font-family: Arial;\n            font-size: 13px;\n            border: 1px solid #cecece;\n            position: relative;\n            white-space: nowrap;\n            margin-top: 0px;\n        }"] });
    return GanttComponent;
}());
export { GanttComponent };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(GanttComponent, [{
        type: Component,
        args: [{
                selector: 'gantt',
                template: "\n        <div [ngStyle]=\"{ 'width': '100%' }\">\n            <div class=\"gantt-container\" (window:resize)=\"onResize($event)\">\n                <!--<gantt-header [name]=\"_project.name\" [startDate]=\"_project.startDate\"></gantt-header>-->\n                <gantt-activity [project]=\"_project\" [options]=\"_options\" (onGridRowClick)=\"gridRowClicked($event)\" (onPopoverOpen)=\"popoverOpened($event)\"></gantt-activity>\n                <!--<gantt-footer [project]=\"_project\"></gantt-footer>-->\n            </div>\n        </div>\n    ",
                styles: ["\n        .gantt-container {\n            font-family: Arial;\n            font-size: 13px;\n            border: 1px solid #cecece;\n            position: relative;\n            white-space: nowrap;\n            margin-top: 0px;\n        }\n    "],
                providers: []
            }]
    }], function () { return [{ type: i1.GanttService }]; }, { project: [{
            type: Input
        }], options: [{
            type: Input
        }], onGridRowClick: [{
            type: Output
        }], onPopoverOpen: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1nYW50dC8iLCJzb3VyY2VzIjpbImxpYi9nYW50dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUvRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUNBQWlDLENBQUM7Ozs7OztBQUcvRDtJQW9ESSx3QkFBbUIsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFMbkMsbUJBQWMsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUM1RCxrQkFBYSxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO0lBSXBCLENBQUM7SUF6QmxELHNCQUNJLG1DQUFPO2FBT1gsY0FBZ0IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzthQVJ2QyxVQUNZLE9BQVk7WUFDcEIsSUFBSSxPQUFPLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7YUFDM0I7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7YUFDNUI7UUFDTCxDQUFDOzs7T0FBQTtJQUdELHNCQUNJLG1DQUFPO2FBT1gsY0FBZ0IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzthQVJ2QyxVQUNZLE9BQVk7WUFDcEIsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO2dCQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO2FBQzNCO2lCQUFNO2dCQUNILElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQzVCO1FBQ0wsQ0FBQzs7O09BQUE7SUFVRCxpQ0FBUSxHQUFSO0lBQ0EsQ0FBQztJQUVELGlDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBQzNFLENBQUM7SUFFRCwwQ0FBaUIsR0FBakI7UUFDSSxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEUsSUFBTSxXQUFXLEdBQUc7WUFDaEIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRTtZQUNoQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO1NBQzNDLENBQUM7UUFFRixJQUFJLENBQUMsUUFBUSxHQUFHO1lBQ1osS0FBSyxPQUFBO1lBQ0wsV0FBVyxhQUFBO1NBQ2QsQ0FBQztJQUNOLENBQUM7SUFFRCwwQ0FBaUIsR0FBakI7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHO1lBQ1osSUFBSSxFQUFFLEVBQUU7WUFDUixTQUFTLEVBQUUsSUFBSTtZQUNmLEtBQUssRUFBRSxFQUFFO1NBQ1osQ0FBQztJQUNOLENBQUM7SUFFRCx1Q0FBYyxHQUFkLFVBQWUsSUFBUztRQUNwQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsc0NBQWEsR0FBYixVQUFjLElBQVM7UUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELGlDQUFRLEdBQVIsVUFBUyxNQUFXO1FBQ2hCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO21HQXJFUSxjQUFjOzBFQUFkLGNBQWMsOExBRlosRUFBRTtZQWxCVCw4QkFDSTtZQUFBLDhCQUNJO1lBRHlCLGdHQUFpQixvQkFBZ0IsK0JBQUM7WUFFM0QseUNBQTZKO1lBQW5HLDJIQUFrQiwwQkFBc0IsSUFBQyw0R0FBa0IseUJBQXFCLElBQXZDO1lBQXlDLGlCQUFpQjtZQUVqSyxpQkFBTTtZQUNWLGlCQUFNOztZQU5ELG9EQUErQjtZQUdaLGVBQW9CO1lBQXBCLHNDQUFvQix5QkFBQTs7eUJBWHBEO0NBa0dDLEFBN0ZELElBNkZDO1NBdEVZLGNBQWM7a0RBQWQsY0FBYztjQXZCMUIsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixRQUFRLEVBQUUscWlCQVFUO2dCQUNELE1BQU0sRUFBRSxDQUFDLHVQQVNSLENBQUM7Z0JBQ0YsU0FBUyxFQUFFLEVBQUU7YUFDaEI7O2tCQUtJLEtBQUs7O2tCQVVMLEtBQUs7O2tCQVVMLE1BQU07O2tCQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5nU3R5bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBHYW50dFNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC9zZXJ2aWNlcy9nYW50dC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSUdhbnR0T3B0aW9ucywgUHJvamVjdCB9IGZyb20gJy4vc2hhcmVkL2ludGVyZmFjZXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2dhbnR0JyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBbbmdTdHlsZV09XCJ7ICd3aWR0aCc6ICcxMDAlJyB9XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1jb250YWluZXJcIiAod2luZG93OnJlc2l6ZSk9XCJvblJlc2l6ZSgkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgICAgICA8IS0tPGdhbnR0LWhlYWRlciBbbmFtZV09XCJfcHJvamVjdC5uYW1lXCIgW3N0YXJ0RGF0ZV09XCJfcHJvamVjdC5zdGFydERhdGVcIj48L2dhbnR0LWhlYWRlcj4tLT5cclxuICAgICAgICAgICAgICAgIDxnYW50dC1hY3Rpdml0eSBbcHJvamVjdF09XCJfcHJvamVjdFwiIFtvcHRpb25zXT1cIl9vcHRpb25zXCIgKG9uR3JpZFJvd0NsaWNrKT1cImdyaWRSb3dDbGlja2VkKCRldmVudClcIiAob25Qb3BvdmVyT3Blbik9XCJwb3BvdmVyT3BlbmVkKCRldmVudClcIj48L2dhbnR0LWFjdGl2aXR5PlxyXG4gICAgICAgICAgICAgICAgPCEtLTxnYW50dC1mb290ZXIgW3Byb2plY3RdPVwiX3Byb2plY3RcIj48L2dhbnR0LWZvb3Rlcj4tLT5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgc3R5bGVzOiBbYFxyXG4gICAgICAgIC5nYW50dC1jb250YWluZXIge1xyXG4gICAgICAgICAgICBmb250LWZhbWlseTogQXJpYWw7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2NlY2VjZTtcclxuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAwcHg7XHJcbiAgICAgICAgfVxyXG4gICAgYF0sXHJcbiAgICBwcm92aWRlcnM6IFtdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHYW50dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBfcHJvamVjdDogUHJvamVjdDtcclxuICAgIF9vcHRpb25zOiBJR2FudHRPcHRpb25zO1xyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBzZXQgcHJvamVjdChwcm9qZWN0OiBhbnkpIHtcclxuICAgICAgICBpZiAocHJvamVjdCkge1xyXG4gICAgICAgICAgICB0aGlzLl9wcm9qZWN0ID0gcHJvamVjdDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldERlZmF1bHRQcm9qZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0IHByb2plY3QoKSB7IHJldHVybiB0aGlzLl9wcm9qZWN0OyB9XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHNldCBvcHRpb25zKG9wdGlvbnM6IGFueSkge1xyXG4gICAgICAgIGlmIChvcHRpb25zLnNjYWxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGVmYXVsdE9wdGlvbnMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXQgb3B0aW9ucygpIHsgcmV0dXJuIHRoaXMuX29wdGlvbnM7IH1cclxuXHJcbiAgICBAT3V0cHV0KCkgb25HcmlkUm93Q2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgICBAT3V0cHV0KCkgb25Qb3BvdmVyT3BlbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgICBnYW50dENvbnRhaW5lcldpZHRoOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGdhbnR0U2VydmljZTogR2FudHRTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTaXplcygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmdhbnR0Q29udGFpbmVyV2lkdGggPSB0aGlzLmdhbnR0U2VydmljZS5jYWxjdWxhdGVDb250YWluZXJXaWR0aCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldERlZmF1bHRPcHRpb25zKCkge1xyXG4gICAgICAgIGNvbnN0IHNjYWxlID0gdGhpcy5nYW50dFNlcnZpY2UuY2FsY3VsYXRlR3JpZFNjYWxlKHRoaXMuX3Byb2plY3QudGFza3MpO1xyXG4gICAgICAgIGNvbnN0IGdyaWRDb2x1bW5zID0gW1xyXG4gICAgICAgICAgICB7IG5hbWU6ICcnLCBsZWZ0OiAwLCB3aWR0aDogMTYgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnWmFkYW5pZScsIGxlZnQ6IDAsIHdpZHRoOiAzMzAgfVxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHNjYWxlLFxyXG4gICAgICAgICAgICBncmlkQ29sdW1uc1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGVmYXVsdFByb2plY3QoKSB7XHJcbiAgICAgICAgdGhpcy5fcHJvamVjdCA9IHtcclxuICAgICAgICAgICAgbmFtZTogJycsXHJcbiAgICAgICAgICAgIHN0YXJ0RGF0ZTogbnVsbCxcclxuICAgICAgICAgICAgdGFza3M6IFtdXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBncmlkUm93Q2xpY2tlZCh0YXNrOiBhbnkpIHtcclxuICAgICAgICB0aGlzLm9uR3JpZFJvd0NsaWNrLmVtaXQodGFzayk7XHJcbiAgICB9XHJcblxyXG4gICAgcG9wb3Zlck9wZW5lZCh0YXNrOiBhbnkpIHtcclxuICAgICAgICB0aGlzLm9uUG9wb3Zlck9wZW4uZW1pdCh0YXNrKTtcclxuICAgIH1cclxuXHJcbiAgICBvblJlc2l6ZSgkZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2V0U2l6ZXMoKTtcclxuICAgIH1cclxufVxyXG4iXX0=