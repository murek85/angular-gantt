/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { GanttService } from './shared/services/gantt.service';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from './activity/gantt-activity.component';

var _c0 = function () { return { "width": "100%" }; };
var GanttComponent = /** @class */ (function () {
    function GanttComponent(ganttService) {
        this.ganttService = ganttService;
        this.onGridRowClick = new EventEmitter();
        this.onPopoverOpen = new EventEmitter();
    }
    Object.defineProperty(GanttComponent.prototype, "project", {
        get: /**
         * @return {?}
         */
        function () { return this._project; },
        set: /**
         * @param {?} project
         * @return {?}
         */
        function (project) {
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
        get: /**
         * @return {?}
         */
        function () { return this._options; },
        set: /**
         * @param {?} options
         * @return {?}
         */
        function (options) {
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
    /**
     * @return {?}
     */
    GanttComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    GanttComponent.prototype.setSizes = /**
     * @return {?}
     */
    function () {
        this.ganttContainerWidth = this.ganttService.calculateContainerWidth();
    };
    /**
     * @return {?}
     */
    GanttComponent.prototype.setDefaultOptions = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var scale = this.ganttService.calculateGridScale(this._project.tasks);
        /** @type {?} */
        var gridColumns = [
            { name: '', left: 0, width: 16 },
            { name: 'Zadanie', left: 0, width: 330 }
        ];
        this._options = {
            scale: scale,
            gridColumns: gridColumns
        };
    };
    /**
     * @return {?}
     */
    GanttComponent.prototype.setDefaultProject = /**
     * @return {?}
     */
    function () {
        this._project = {
            name: '',
            startDate: null,
            tasks: []
        };
    };
    /**
     * @param {?} task
     * @return {?}
     */
    GanttComponent.prototype.gridRowClicked = /**
     * @param {?} task
     * @return {?}
     */
    function (task) {
        this.onGridRowClick.emit(task);
    };
    /**
     * @param {?} task
     * @return {?}
     */
    GanttComponent.prototype.popoverOpened = /**
     * @param {?} task
     * @return {?}
     */
    function (task) {
        this.onPopoverOpen.emit(task);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    GanttComponent.prototype.onResize = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.setSizes();
    };
    /** @nocollapse */
    GanttComponent.ctorParameters = function () { return [
        { type: GanttService }
    ]; };
    GanttComponent.propDecorators = {
        project: [{ type: Input }],
        options: [{ type: Input }],
        onGridRowClick: [{ type: Output }],
        onPopoverOpen: [{ type: Output }]
    };
GanttComponent.ɵfac = function GanttComponent_Factory(t) { return new (t || GanttComponent)(ɵngcc0.ɵɵdirectiveInject(GanttService)); };
GanttComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: GanttComponent, selectors: [["gantt"]], inputs: { project: "project", options: "options" }, outputs: { onGridRowClick: "onGridRowClick", onPopoverOpen: "onPopoverOpen" }, features: [ɵngcc0.ɵɵProvidersFeature([])], decls: 3, vars: 4, consts: [[3, "ngStyle"], [1, "gantt-container", 3, "resize"], [3, "project", "options", "onGridRowClick", "onPopoverOpen"]], template: function GanttComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵelementStart(1, "div", 1);
        ɵngcc0.ɵɵlistener("resize", function GanttComponent_Template_div_resize_1_listener($event) { return ctx.onResize($event); }, false, ɵngcc0.ɵɵresolveWindow);
        ɵngcc0.ɵɵelementStart(2, "gantt-activity", 2);
        ɵngcc0.ɵɵlistener("onGridRowClick", function GanttComponent_Template_gantt_activity_onGridRowClick_2_listener($event) { return ctx.gridRowClicked($event); })("onPopoverOpen", function GanttComponent_Template_gantt_activity_onPopoverOpen_2_listener($event) { return ctx.popoverOpened($event); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngStyle", ɵngcc0.ɵɵpureFunction0(3, _c0));
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("project", ctx._project)("options", ctx._options);
    } }, directives: [ɵngcc1.NgStyle, ɵngcc2.GanttActivityComponent], styles: [".gantt-container[_ngcontent-%COMP%] {\n            font-family: Arial;\n            font-size: 13px;\n            border: 1px solid #cecece;\n            position: relative;\n            white-space: nowrap;\n            margin-top: 0px;\n        }"] });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(GanttComponent, [{
        type: Component,
        args: [{
                selector: 'gantt',
                template: "\n        <div [ngStyle]=\"{ 'width': '100%' }\">\n            <div class=\"gantt-container\" (window:resize)=\"onResize($event)\">\n                <!--<gantt-header [name]=\"_project.name\" [startDate]=\"_project.startDate\"></gantt-header>-->\n                <gantt-activity [project]=\"_project\" [options]=\"_options\" (onGridRowClick)=\"gridRowClicked($event)\" (onPopoverOpen)=\"popoverOpened($event)\"></gantt-activity>\n                <!--<gantt-footer [project]=\"_project\"></gantt-footer>-->\n            </div>\n        </div>\n    ",
                providers: [],
                styles: ["\n        .gantt-container {\n            font-family: Arial;\n            font-size: 13px;\n            border: 1px solid #cecece;\n            position: relative;\n            white-space: nowrap;\n            margin-top: 0px;\n        }\n    "]
            }]
    }], function () { return [{ type: GanttService }]; }, { onGridRowClick: [{
            type: Output
        }], onPopoverOpen: [{
            type: Output
        }], project: [{
            type: Input
        }], options: [{
            type: Input
        }] }); })();
    return GanttComponent;
}());
export { GanttComponent };
if (false) {
    /** @type {?} */
    GanttComponent.prototype._project;
    /** @type {?} */
    GanttComponent.prototype._options;
    /** @type {?} */
    GanttComponent.prototype.onGridRowClick;
    /** @type {?} */
    GanttComponent.prototype.onPopoverOpen;
    /** @type {?} */
    GanttComponent.prototype.ganttContainerWidth;
    /** @type {?} */
    GanttComponent.prototype.ganttService;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQuY29tcG9uZW50LmpzIiwic291cmNlcyI6WyJuZzovYW5ndWxhci1nYW50dC9saWIvZ2FudHQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRS9FLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7Ozs7O0FBRy9EO0FBRWMsSUFrRFYsd0JBQW1CLFlBQTBCO0FBQUksUUFBOUIsaUJBQVksR0FBWixZQUFZLENBQWM7QUFBQyxRQUxwQyxtQkFBYyxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO0FBQzFFLFFBQWMsa0JBQWEsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztBQUN6RSxJQUdxRCxDQUFDO0FBQ3RELElBMUJJLHNCQUNJLG1DQUFPO0FBQUk7QUFDZjtBQUNBO0FBQVksUUFLWixjQUFnQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBRTNDO0FBQ0k7QUFDRjtBQUF1QjtBQUNqQixRQWJKLFVBQ1ksT0FBWTtBQUM1QixZQUFRLElBQUksT0FBTyxFQUFFO0FBQ3JCLGdCQUFZLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0FBQ3BDLGFBQVM7QUFBQyxpQkFBSztBQUNmLGdCQUFZLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0FBQ3JDLGFBQVM7QUFDVCxRQUFJLENBQUM7QUFDSjtBQUEwQjtBQUVsQixPQUhKO0FBQ0wsSUFFSSxzQkFDSSxtQ0FBTztBQUFJO0FBQ2Y7QUFBdUI7QUFDakIsUUFLTixjQUFnQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBRTNDO0FBQWlCO0FBQThCO0FBQXVCO0FBQy9ELFFBWEgsVUFDWSxPQUFZO0FBQzVCLFlBQVEsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO0FBQzNCLGdCQUFZLElB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Q0FBcUU7QUFDekU7QUFDb0IsSUFBaEIsNkNBQTRCO0FBQ2hDO0FBQ29CLElBQUosc0NBQWlDOztBQXpEQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBRUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUdBLEFBb0RBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFMQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBSUEsQUFBQSxBQXpCQSxBQUNBLEFBQUEsQUFPQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFSQSxBQUNBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQ0EsQUFBQSxBQUFBLEFBR0EsQUFDQSxBQUFBLEFBT0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBUkEsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFDQSxBQUFBLEFBQUEsQUFVQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBRUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUVBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFFQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUNBLEFBQUEsQUFFQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUNBLEFBQUEsQUFFQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBRUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUVBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBNUZBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBUUEsQUFXQSxBQUFBLEFBQUEsQUFBQSxBQVZBLEFBU0EsQUFFQSxBQXpCQSxBQUFBLEFBOEJBLEFBQUEsQUFVQSxBQUFBLEFBVUEsQUFBQSxBQUNBLEFBQUEsQUE2Q0EsQUFBQSxBQUFBLEFBN0ZBLEFBNkZBLEFBdEVBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQXNCQSxBQUFBLEFBQ0EsQUFBQSxBQUVBLEFBQUEsQUFFQSxBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ1N0eWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgR2FudHRTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvc2VydmljZXMvZ2FudHQuc2VydmljZSc7XHJcbmltcG9ydCB7IElHYW50dE9wdGlvbnMsIFByb2plY3QgfSBmcm9tICcuL3NoYXJlZC9pbnRlcmZhY2VzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdnYW50dCcsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgW25nU3R5bGVdPVwieyAnd2lkdGgnOiAnMTAwJScgfVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtY29udGFpbmVyXCIgKHdpbmRvdzpyZXNpemUpPVwib25SZXNpemUoJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICAgICAgPCEtLTxnYW50dC1oZWFkZXIgW25hbWVdPVwiX3Byb2plY3QubmFtZVwiIFtzdGFydERhdGVdPVwiX3Byb2plY3Quc3RhcnREYXRlXCI+PC9nYW50dC1oZWFkZXI+LS0+XHJcbiAgICAgICAgICAgICAgICA8Z2FudHQtYWN0aXZpdHkgW3Byb2plY3RdPVwiX3Byb2plY3RcIiBbb3B0aW9uc109XCJfb3B0aW9uc1wiIChvbkdyaWRSb3dDbGljayk9XCJncmlkUm93Q2xpY2tlZCgkZXZlbnQpXCIgKG9uUG9wb3Zlck9wZW4pPVwicG9wb3Zlck9wZW5lZCgkZXZlbnQpXCI+PC9nYW50dC1hY3Rpdml0eT5cclxuICAgICAgICAgICAgICAgIDwhLS08Z2FudHQtZm9vdGVyIFtwcm9qZWN0XT1cIl9wcm9qZWN0XCI+PC9nYW50dC1mb290ZXI+LS0+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICAgIHN0eWxlczogW2BcclxuICAgICAgICAuZ2FudHQtY29udGFpbmVyIHtcclxuICAgICAgICAgICAgZm9udC1mYW1pbHk6IEFyaWFsO1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNjZWNlY2U7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgICAgICAgICAgbWFyZ2luLXRvcDogMHB4O1xyXG4gICAgICAgIH1cclxuICAgIGBdLFxyXG4gICAgcHJvdmlkZXJzOiBbXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR2FudHRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgX3Byb2plY3Q6IFByb2plY3Q7XHJcbiAgICBfb3B0aW9uczogSUdhbnR0T3B0aW9ucztcclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2V0IHByb2plY3QocHJvamVjdDogYW55KSB7XHJcbiAgICAgICAgaWYgKHByb2plY3QpIHtcclxuICAgICAgICAgICAgdGhpcy5fcHJvamVjdCA9IHByb2plY3Q7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREZWZhdWx0UHJvamVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldCBwcm9qZWN0KCkgeyByZXR1cm4gdGhpcy5fcHJvamVjdDsgfVxyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBzZXQgb3B0aW9ucyhvcHRpb25zOiBhbnkpIHtcclxuICAgICAgICBpZiAob3B0aW9ucy5zY2FsZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldERlZmF1bHRPcHRpb25zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0IG9wdGlvbnMoKSB7IHJldHVybiB0aGlzLl9vcHRpb25zOyB9XHJcblxyXG4gICAgQE91dHB1dCgpIG9uR3JpZFJvd0NsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gICAgQE91dHB1dCgpIG9uUG9wb3Zlck9wZW46IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gICAgZ2FudHRDb250YWluZXJXaWR0aDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBnYW50dFNlcnZpY2U6IEdhbnR0U2VydmljZSkgeyB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2l6ZXMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5nYW50dENvbnRhaW5lcldpZHRoID0gdGhpcy5nYW50dFNlcnZpY2UuY2FsY3VsYXRlQ29udGFpbmVyV2lkdGgoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXREZWZhdWx0T3B0aW9ucygpIHtcclxuICAgICAgICBjb25zdCBzY2FsZSA9IHRoaXMuZ2FudHRTZXJ2aWNlLmNhbGN1bGF0ZUdyaWRTY2FsZSh0aGlzLl9wcm9qZWN0LnRhc2tzKTtcclxuICAgICAgICBjb25zdCBncmlkQ29sdW1ucyA9IFtcclxuICAgICAgICAgICAgeyBuYW1lOiAnJywgbGVmdDogMCwgd2lkdGg6IDE2IH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ1phZGFuaWUnLCBsZWZ0OiAwLCB3aWR0aDogMzMwIH1cclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICB0aGlzLl9vcHRpb25zID0ge1xyXG4gICAgICAgICAgICBzY2FsZSxcclxuICAgICAgICAgICAgZ3JpZENvbHVtbnNcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHNldERlZmF1bHRQcm9qZWN0KCkge1xyXG4gICAgICAgIHRoaXMuX3Byb2plY3QgPSB7XHJcbiAgICAgICAgICAgIG5hbWU6ICcnLFxyXG4gICAgICAgICAgICBzdGFydERhdGU6IG51bGwsXHJcbiAgICAgICAgICAgIHRhc2tzOiBbXVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZ3JpZFJvd0NsaWNrZWQodGFzazogYW55KSB7XHJcbiAgICAgICAgdGhpcy5vbkdyaWRSb3dDbGljay5lbWl0KHRhc2spO1xyXG4gICAgfVxyXG5cclxuICAgIHBvcG92ZXJPcGVuZWQodGFzazogYW55KSB7XHJcbiAgICAgICAgdGhpcy5vblBvcG92ZXJPcGVuLmVtaXQodGFzayk7XHJcbiAgICB9XHJcblxyXG4gICAgb25SZXNpemUoJGV2ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNldFNpemVzKCk7XHJcbiAgICB9XHJcbn1cclxuIl19