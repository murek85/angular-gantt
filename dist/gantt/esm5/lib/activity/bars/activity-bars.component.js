import { Component, Input, EventEmitter, Output } from '@angular/core';
import { GanttService } from '../../shared/services/gantt.service';
import * as i0 from "@angular/core";
import * as i1 from "../../shared/services/gantt.service";
import * as i2 from "@angular/common";
import * as i3 from "@material-extended/mde";
import * as i4 from "@angular/material/card";
function GanttActivityBarsComponent_div_1_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
var _c0 = function (a0) { return { task: a0 }; };
function GanttActivityBarsComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    var _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 3, 4);
    i0.ɵɵlistener("click", function GanttActivityBarsComponent_div_1_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r10); var task_r3 = ctx.$implicit; var ctx_r9 = i0.ɵɵnextContext(); return ctx_r9.gridRowClicked(task_r3); });
    i0.ɵɵelementStart(2, "div", 5, 6);
    i0.ɵɵlistener("opened", function GanttActivityBarsComponent_div_1_Template_div_opened_2_listener() { i0.ɵɵrestoreView(_r10); var task_r3 = ctx.$implicit; var ctx_r11 = i0.ɵɵnextContext(); return ctx_r11.popoverOpened(task_r3); });
    i0.ɵɵelementStart(4, "mde-popover", 7, 8);
    i0.ɵɵtemplate(6, GanttActivityBarsComponent_div_1_ng_container_6_Template, 1, 0, "ng-container", 9);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(7, "div", 10);
    i0.ɵɵelementStart(8, "div", 11);
    i0.ɵɵelement(9, "div", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 13);
    i0.ɵɵelement(11, "div", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var task_r3 = ctx.$implicit;
    var i_r4 = ctx.index;
    var _r7 = i0.ɵɵreference(5);
    var ctx_r0 = i0.ɵɵnextContext();
    var _r1 = i0.ɵɵreference(3);
    i0.ɵɵproperty("ngStyle", ctx_r0.drawBar(task_r3, i_r4));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("mdePopoverTriggerFor", _r7)("mdePopoverBackdropCloseOnClick", false);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("mdePopoverEnterDelay", 100)("mdePopoverLeaveDelay", 0)("mdePopoverPositionY", "above")("mdePopoverOverlapTrigger", false)("mdePopoverDisableAnimation", false)("mdeFocusTrapEnabled", false)("mdePopoverArrowWidth", 12)("mdePopoverArrowColor", task_r3.color == null ? null : task_r3.color.primary);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngTemplateOutlet", _r1)("ngTemplateOutletContext", i0.ɵɵpureFunction1(13, _c0, task_r3));
} }
function GanttActivityBarsComponent_ng_template_2_mat_card_0_footer_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "footer");
    i0.ɵɵelement(1, "span", 20);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var data_r12 = i0.ɵɵnextContext(2).task;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("innerHTML", data_r12.description, i0.ɵɵsanitizeHtml);
} }
var _c1 = function (a0) { return { borderBottomColor: a0, borderBottomWidth: ".25em", borderBottomStyle: "solid" }; };
var _c2 = function (a0) { return { borderColor: a0 }; };
function GanttActivityBarsComponent_ng_template_2_mat_card_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-card", 15);
    i0.ɵɵelementStart(1, "mat-card-header");
    i0.ɵɵelement(2, "div", 16);
    i0.ɵɵelementStart(3, "mat-card-title");
    i0.ɵɵelementStart(4, "span", 17);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "mat-card-subtitle");
    i0.ɵɵelementStart(7, "span");
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "date");
    i0.ɵɵpipe(10, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "mat-card-subtitle");
    i0.ɵɵelementStart(12, "span", 18);
    i0.ɵɵtext(13, "\u0336");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span");
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "mat-card-content");
    i0.ɵɵtemplate(17, GanttActivityBarsComponent_ng_template_2_mat_card_0_footer_17_Template, 2, 1, "footer", 19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var data_r12 = i0.ɵɵnextContext().task;
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(13, _c1, data_r12.color == null ? null : data_r12.color.primary));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(15, _c2, data_r12.color == null ? null : data_r12.color.primary));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(data_r12.name);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind2(9, 7, data_r12.start, "yyyy-MM-dd"), " - ", i0.ɵɵpipeBind2(10, 10, data_r12.end, "yyyy-MM-dd"), "");
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(data_r12.resource);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", data_r12.description);
} }
function GanttActivityBarsComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, GanttActivityBarsComponent_ng_template_2_mat_card_0_Template, 18, 17, "mat-card", 14);
} if (rf & 2) {
    var data_r12 = ctx.task;
    i0.ɵɵproperty("ngIf", data_r12);
} }
var _c3 = function (a0, a1) { return { "height": a0, "width": a1 }; };
var GanttActivityBarsComponent = /** @class */ (function () {
    function GanttActivityBarsComponent(ganttService) {
        this.ganttService = ganttService;
        this.onGridRowClick = new EventEmitter();
        this.onPopoverOpen = new EventEmitter();
        this.containerHeight = 0;
        this.containerWidth = 0;
    }
    GanttActivityBarsComponent.prototype.ngOnInit = function () {
        this.containerHeight = this.dimensions.height;
        this.containerWidth = this.dimensions.width;
    };
    GanttActivityBarsComponent.prototype.drawBar = function (task, index) {
        var style = {};
        style = this.ganttService.calculateBar(task, index, this.timeScale);
        return style;
    };
    GanttActivityBarsComponent.prototype.gridRowClicked = function (task) {
        try {
            this.onGridRowClick.emit(task);
        }
        catch (err) { }
    };
    GanttActivityBarsComponent.prototype.popoverOpened = function (task) {
        try {
            this.onPopoverOpen.emit(task);
        }
        catch (err) { }
    };
    GanttActivityBarsComponent.prototype.addMouseEventListeners = function (dragFn) {
        function stopFn() {
            document.documentElement.removeEventListener('mousemove', dragFn, false);
            document.documentElement.removeEventListener('mouseup', stopFn, false);
            document.documentElement.removeEventListener('mouseleave', stopFn, false);
        }
        document.documentElement.addEventListener('mousemove', dragFn, false);
        document.documentElement.addEventListener('mouseup', stopFn, false);
        document.documentElement.addEventListener('mouseleave', stopFn, false);
    };
    /** @nocollapse */ GanttActivityBarsComponent.ɵfac = function GanttActivityBarsComponent_Factory(t) { return new (t || GanttActivityBarsComponent)(i0.ɵɵdirectiveInject(i1.GanttService)); };
    /** @nocollapse */ GanttActivityBarsComponent.ɵcmp = i0.ɵɵdefineComponent({ type: GanttActivityBarsComponent, selectors: [["activity-bars"]], inputs: { timeScale: "timeScale", dimensions: "dimensions", tasks: "tasks" }, outputs: { onGridRowClick: "onGridRowClick", onPopoverOpen: "onPopoverOpen" }, features: [i0.ɵɵProvidersFeature([
                GanttService
            ])], decls: 4, vars: 5, consts: [[1, "gantt-activity-bars-area", 3, "ngStyle"], ["class", "gantt-activity-line", 3, "ngStyle", "click", 4, "ngFor", "ngForOf"], ["templatePopoverTask", ""], [1, "gantt-activity-line", 3, "ngStyle", "click"], ["bar", ""], ["mdePopoverOffsetX", "-15", "mdePopoverOffsetY", "0", 3, "mdePopoverTriggerFor", "mdePopoverBackdropCloseOnClick", "opened"], ["popoverTrigger", "mdePopoverTrigger"], ["mdePopoverPlacement", "bottom", 3, "mdePopoverEnterDelay", "mdePopoverLeaveDelay", "mdePopoverPositionY", "mdePopoverOverlapTrigger", "mdePopoverDisableAnimation", "mdeFocusTrapEnabled", "mdePopoverArrowWidth", "mdePopoverArrowColor"], ["taskPopover", "mdePopover"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "gantt-activity-content"], [1, "gantt-activity-link-control", "gantt-activity-right", 2, "height", "26px", "line-height", "30px"], [1, "gantt-link-point"], [1, "gantt-activity-link-control", "gantt-activity-left", 2, "height", "26px", "line-height", "30px"], ["class", "mat-elevation-z6", "style", "width: 320px; max-width: 320px;", 3, "ngStyle", 4, "ngIf"], [1, "mat-elevation-z6", 2, "width", "320px", "max-width", "320px", 3, "ngStyle"], ["mat-card-avatar", "", 2, "width", "0", "height", "unset", "margin-bottom", ".7em", "border-radius", "0", "border-style", "solid", 3, "ngStyle"], [2, "font-size", "80%"], [2, "padding-left", ".75em", "padding-right", "1em", "font-stretch", "condensed"], [4, "ngIf"], [3, "innerHTML"]], template: function GanttActivityBarsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵtemplate(1, GanttActivityBarsComponent_div_1_Template, 12, 15, "div", 1);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(2, GanttActivityBarsComponent_ng_template_2_Template, 1, 1, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
        } if (rf & 2) {
            i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction2(2, _c3, ctx.containerHeight + "px", ctx.containerWidth + "px"));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx.tasks);
        } }, directives: [i2.NgStyle, i2.NgForOf, i3.MdePopoverTrigger, i3.MdePopover, i2.NgTemplateOutlet, i2.NgIf, i4.MatCard, i4.MatCardHeader, i4.MatCardAvatar, i4.MatCardTitle, i4.MatCardSubtitle, i4.MatCardContent], pipes: [i2.DatePipe], styles: [".gantt-activity-line[_ngcontent-%COMP%] {\n        \n        position: absolute;\n        box-sizing: border-box;\n        -webkit-user-select: none;\n    }\n    .gantt-activity-line[_ngcontent-%COMP%]:hover {\n        cursor: pointer;\n    }\n    .gantt-activity-content[_ngcontent-%COMP%] {\n        font-size: 12px;\n        color: #fff;\n        width: 100%;\n        top: 0;\n        position: absolute;\n        white-space: nowrap;\n        text-align: center;\n        line-height: inherit;\n        overflow: hidden;\n        height: 100%;\n    }\n    .gantt-activity-link-control[_ngcontent-%COMP%] {\n        position: absolute;\n        width: 13px;\n        top: 0;\n    }\n    .gantt-activity-right[_ngcontent-%COMP%] {\n        right: 0;\n    }\n    .gantt-activity-left[_ngcontent-%COMP%] {\n        left: 0;\n    }\n    .gantt-activity-right[_ngcontent-%COMP%]:hover {\n        \n    }\n    .gantt-activity-left[_ngcontent-%COMP%]:hover {\n        \n    }"] });
    return GanttActivityBarsComponent;
}());
export { GanttActivityBarsComponent };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(GanttActivityBarsComponent, [{
        type: Component,
        args: [{
                selector: 'activity-bars',
                template: "\n    <div class=\"gantt-activity-bars-area\"\n        [ngStyle]=\"{ 'height': containerHeight + 'px', 'width': containerWidth + 'px' }\">\n\n        <div #bar class=\"gantt-activity-line\"\n            *ngFor=\"let task of tasks; let i = index\" (click)=\"gridRowClicked(task)\"\n            [ngStyle]=\"drawBar(task, i)\">\n\n            <div #popoverTrigger=\"mdePopoverTrigger\"\n                [mdePopoverTriggerFor]=\"taskPopover\"\n                [mdePopoverBackdropCloseOnClick]=\"false\"\n                mdePopoverOffsetX=\"-15\"\n                mdePopoverOffsetY=\"0\"\n                (opened)=\"popoverOpened(task)\">\n\n                <mde-popover #taskPopover=\"mdePopover\"\n                    [mdePopoverEnterDelay]=\"100\"\n                    [mdePopoverLeaveDelay]=\"0\"\n                    [mdePopoverPositionY]=\"'above'\"\n                    [mdePopoverOverlapTrigger]=\"false\"\n                    [mdePopoverDisableAnimation]=\"false\"\n                    [mdeFocusTrapEnabled]=\"false\"\n                    [mdePopoverArrowWidth]=\"12\"\n                    [mdePopoverArrowColor]=\"task.color?.primary\"\n                    mdePopoverPlacement=\"bottom\">\n\n                    <ng-container *ngTemplateOutlet=\"templatePopoverTask; context: {task: task}\"></ng-container>\n                </mde-popover>\n\n                <div class=\"gantt-activity-content\"></div>\n                <div class=\"gantt-activity-link-control gantt-activity-right\" style=\"height: 26px; line-height: 30px\">\n                    <div class=\"gantt-link-point\"></div>\n                </div>\n                <div class=\"gantt-activity-link-control gantt-activity-left\" style=\"height: 26px; line-height: 30px\">\n                    <div class=\"gantt-link-point\"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <ng-template #templatePopoverTask let-data=\"task\">\n        <mat-card *ngIf=\"data\" class=\"mat-elevation-z6\" \n            [ngStyle]=\"{ \n                borderBottomColor: data.color?.primary,\n                borderBottomWidth: '.25em',\n                borderBottomStyle: 'solid' \n            }\" style=\"width: 320px; max-width: 320px;\">\n\n            <mat-card-header>\n                <div mat-card-avatar [ngStyle]=\"{ borderColor: data.color?.primary }\" style=\"width: 0; height: unset; margin-bottom: .7em; border-radius: 0; border-style: solid;\"></div>\n                <mat-card-title>\n                    <span style=\"font-size: 80%;\">{{data.name}}</span>\n                </mat-card-title>\n                <mat-card-subtitle>\n                    <span>{{data.start | date:'yyyy-MM-dd'}} - {{data.end | date:'yyyy-MM-dd'}}</span>\n                </mat-card-subtitle>\n                <mat-card-subtitle>\n                    <span style=\"padding-left: .75em; padding-right: 1em; font-stretch: condensed;\">&#x336;</span>\n                    <span>{{data.resource}}</span>\n                </mat-card-subtitle>\n            </mat-card-header>\n            <mat-card-content>\n                <footer *ngIf=\"data.description\">\n                    <span [innerHTML]=\"data.description\"></span>\n                </footer>\n            </mat-card-content>\n        </mat-card>\n    </ng-template>\n    ",
                styles: ["\n    .gantt-activity-line {\n        /*border-radius: 2px;*/\n        position: absolute;\n        box-sizing: border-box;\n        -webkit-user-select: none;\n    }\n    .gantt-activity-line:hover {\n        cursor: pointer;\n    }\n    .gantt-activity-content {\n        font-size: 12px;\n        color: #fff;\n        width: 100%;\n        top: 0;\n        position: absolute;\n        white-space: nowrap;\n        text-align: center;\n        line-height: inherit;\n        overflow: hidden;\n        height: 100%;\n    }\n    .gantt-activity-link-control {\n        position: absolute;\n        width: 13px;\n        top: 0;\n    }\n    .gantt-activity-right {\n        right: 0;\n    }\n    .gantt-activity-left {\n        left: 0;\n    }\n    .gantt-activity-right:hover {\n        /*cursor:w-resize;*/\n    }\n    .gantt-activity-left:hover {\n        /*cursor:w-resize;*/\n    }\n    "],
                providers: [
                    GanttService
                ]
            }]
    }], function () { return [{ type: i1.GanttService }]; }, { timeScale: [{
            type: Input
        }], dimensions: [{
            type: Input
        }], tasks: [{
            type: Input
        }], onGridRowClick: [{
            type: Output
        }], onPopoverOpen: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHktYmFycy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWdhbnR0LyIsInNvdXJjZXMiOlsibGliL2FjdGl2aXR5L2JhcnMvYWN0aXZpdHktYmFycy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQWMsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUNBQXFDLENBQUM7Ozs7Ozs7SUE4Qi9DLHdCQUE0Rjs7Ozs7SUF0QnhHLGlDQUlJO0lBSDBDLGtPQUE4QjtJQUd4RSxpQ0FPSTtJQUZBLHFPQUE4QjtJQUU5Qix5Q0FXSTtJQUFBLG1HQUE2RTtJQUNqRixpQkFBYztJQUVkLDBCQUEwQztJQUMxQywrQkFDSTtJQUFBLDBCQUFvQztJQUN4QyxpQkFBTTtJQUNOLGdDQUNJO0lBQUEsMkJBQW9DO0lBQ3hDLGlCQUFNO0lBQ1YsaUJBQU07SUFDVixpQkFBTTs7Ozs7OztJQS9CRix1REFBNEI7SUFHeEIsZUFBb0M7SUFBcEMsMENBQW9DLHlDQUFBO0lBT2hDLGVBQTRCO0lBQTVCLDBDQUE0QiwyQkFBQSxnQ0FBQSxtQ0FBQSxxQ0FBQSw4QkFBQSw0QkFBQSw4RUFBQTtJQVVkLGVBQThEO0lBQTlELHNDQUE4RCxpRUFBQTs7O0lBb0NoRiw4QkFDSTtJQUFBLDJCQUE0QztJQUNoRCxpQkFBUzs7O0lBREMsZUFBOEI7SUFBOUIsbUVBQThCOzs7OztJQXRCaEQsb0NBT0k7SUFBQSx1Q0FDSTtJQUFBLDBCQUF5SztJQUN6SyxzQ0FDSTtJQUFBLGdDQUE4QjtJQUFBLFlBQWE7SUFBQSxpQkFBTztJQUN0RCxpQkFBaUI7SUFDakIseUNBQ0k7SUFBQSw0QkFBTTtJQUFBLFlBQXFFOzs7SUFBQSxpQkFBTztJQUN0RixpQkFBb0I7SUFDcEIsMENBQ0k7SUFBQSxpQ0FBZ0Y7SUFBQSx1QkFBTztJ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UUFBUSxFQUFFLGd2R0FvRVQ7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsaTRCQXVDUixDQUFDO2dCQUNGLFNBQVMsRUFBRTtvQkFDUCxZQUFZO2lCQUNmO2FBQ0o7O2tCQUVJLEtBQUs7O2tCQUNMLEtBQUs7O2tCQUNMLEtBQUs7O2tCQUVMLE1BQU07O2tCQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEdhbnR0U2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9nYW50dC5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdhY3Rpdml0eS1iYXJzJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtYWN0aXZpdHktYmFycy1hcmVhXCJcclxuICAgICAgICBbbmdTdHlsZV09XCJ7ICdoZWlnaHQnOiBjb250YWluZXJIZWlnaHQgKyAncHgnLCAnd2lkdGgnOiBjb250YWluZXJXaWR0aCArICdweCcgfVwiPlxyXG5cclxuICAgICAgICA8ZGl2ICNiYXIgY2xhc3M9XCJnYW50dC1hY3Rpdml0eS1saW5lXCJcclxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IHRhc2sgb2YgdGFza3M7IGxldCBpID0gaW5kZXhcIiAoY2xpY2spPVwiZ3JpZFJvd0NsaWNrZWQodGFzaylcIlxyXG4gICAgICAgICAgICBbbmdTdHlsZV09XCJkcmF3QmFyKHRhc2ssIGkpXCI+XHJcblxyXG4gICAgICAgICAgICA8ZGl2ICNwb3BvdmVyVHJpZ2dlcj1cIm1kZVBvcG92ZXJUcmlnZ2VyXCJcclxuICAgICAgICAgICAgICAgIFttZGVQb3BvdmVyVHJpZ2dlckZvcl09XCJ0YXNrUG9wb3ZlclwiXHJcbiAgICAgICAgICAgICAgICBbbWRlUG9wb3ZlckJhY2tkcm9wQ2xvc2VPbkNsaWNrXT1cImZhbHNlXCJcclxuICAgICAgICAgICAgICAgIG1kZVBvcG92ZXJPZmZzZXRYPVwiLTE1XCJcclxuICAgICAgICAgICAgICAgIG1kZVBvcG92ZXJPZmZzZXRZPVwiMFwiXHJcbiAgICAgICAgICAgICAgICAob3BlbmVkKT1cInBvcG92ZXJPcGVuZWQodGFzaylcIj5cclxuXHJcbiAgICAgICAgICAgICAgICA8bWRlLXBvcG92ZXIgI3Rhc2tQb3BvdmVyPVwibWRlUG9wb3ZlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgW21kZVBvcG92ZXJFbnRlckRlbGF5XT1cIjEwMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgW21kZVBvcG92ZXJMZWF2ZURlbGF5XT1cIjBcIlxyXG4gICAgICAgICAgICAgICAgICAgIFttZGVQb3BvdmVyUG9zaXRpb25ZXT1cIidhYm92ZSdcIlxyXG4gICAgICAgICAgICAgICAgICAgIFttZGVQb3BvdmVyT3ZlcmxhcFRyaWdnZXJdPVwiZmFsc2VcIlxyXG4gICAgICAgICAgICAgICAgICAgIFttZGVQb3BvdmVyRGlzYWJsZUFuaW1hdGlvbl09XCJmYWxzZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgW21kZUZvY3VzVHJhcEVuYWJsZWRdPVwiZmFsc2VcIlxyXG4gICAgICAgICAgICAgICAgICAgIFttZGVQb3BvdmVyQXJyb3dXaWR0aF09XCIxMlwiXHJcbiAgICAgICAgICAgICAgICAgICAgW21kZVBvcG92ZXJBcnJvd0NvbG9yXT1cInRhc2suY29sb3I/LnByaW1hcnlcIlxyXG4gICAgICAgICAgICAgICAgICAgIG1kZVBvcG92ZXJQbGFjZW1lbnQ9XCJib3R0b21cIj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlUG9wb3ZlclRhc2s7IGNvbnRleHQ6IHt0YXNrOiB0YXNrfVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgPC9tZGUtcG9wb3Zlcj5cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtYWN0aXZpdHktY29udGVudFwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbnR0LWFjdGl2aXR5LWxpbmstY29udHJvbCBnYW50dC1hY3Rpdml0eS1yaWdodFwiIHN0eWxlPVwiaGVpZ2h0OiAyNnB4OyBsaW5lLWhlaWdodDogMzBweFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1saW5rLXBvaW50XCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1hY3Rpdml0eS1saW5rLWNvbnRyb2wgZ2FudHQtYWN0aXZpdHktbGVmdFwiIHN0eWxlPVwiaGVpZ2h0OiAyNnB4OyBsaW5lLWhlaWdodDogMzBweFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1saW5rLXBvaW50XCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8bmctdGVtcGxhdGUgI3RlbXBsYXRlUG9wb3ZlclRhc2sgbGV0LWRhdGE9XCJ0YXNrXCI+XHJcbiAgICAgICAgPG1hdC1jYXJkICpuZ0lmPVwiZGF0YVwiIGNsYXNzPVwibWF0LWVsZXZhdGlvbi16NlwiIFxyXG4gICAgICAgICAgICBbbmdTdHlsZV09XCJ7IFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyQm90dG9tQ29sb3I6IGRhdGEuY29sb3I/LnByaW1hcnksXHJcbiAgICAgICAgICAgICAgICBib3JkZXJCb3R0b21XaWR0aDogJy4yNWVtJyxcclxuICAgICAgICAgICAgICAgIGJvcmRlckJvdHRvbVN0eWxlOiAnc29saWQnIFxyXG4gICAgICAgICAgICB9XCIgc3R5bGU9XCJ3aWR0aDogMzIwcHg7IG1heC13aWR0aDogMzIwcHg7XCI+XHJcblxyXG4gICAgICAgICAgICA8bWF0LWNhcmQtaGVhZGVyPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBtYXQtY2FyZC1hdmF0YXIgW25nU3R5bGVdPVwieyBib3JkZXJDb2xvcjogZGF0YS5jb2xvcj8ucHJpbWFyeSB9XCIgc3R5bGU9XCJ3aWR0aDogMDsgaGVpZ2h0OiB1bnNldDsgbWFyZ2luLWJvdHRvbTogLjdlbTsgYm9yZGVyLXJhZGl1czogMDsgYm9yZGVyLXN0eWxlOiBzb2xpZDtcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxtYXQtY2FyZC10aXRsZT5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT1cImZvbnQtc2l6ZTogODAlO1wiPnt7ZGF0YS5uYW1lfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L21hdC1jYXJkLXRpdGxlPlxyXG4gICAgICAgICAgICAgICAgPG1hdC1jYXJkLXN1YnRpdGxlPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7ZGF0YS5zdGFydCB8IGRhdGU6J3l5eXktTU0tZGQnfX0gLSB7e2RhdGEuZW5kIHwgZGF0ZToneXl5eS1NTS1kZCd9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvbWF0LWNhcmQtc3VidGl0bGU+XHJcbiAgICAgICAgICAgICAgICA8bWF0LWNhcmQtc3VidGl0bGU+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9XCJwYWRkaW5nLWxlZnQ6IC43NWVtOyBwYWRkaW5nLXJpZ2h0OiAxZW07IGZvbnQtc3RyZXRjaDogY29uZGVuc2VkO1wiPiYjeDMzNjs8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3tkYXRhLnJlc291cmNlfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L21hdC1jYXJkLXN1YnRpdGxlPlxyXG4gICAgICAgICAgICA8L21hdC1jYXJkLWhlYWRlcj5cclxuICAgICAgICAgICAgPG1hdC1jYXJkLWNvbnRlbnQ+XHJcbiAgICAgICAgICAgICAgICA8Zm9vdGVyICpuZ0lmPVwiZGF0YS5kZXNjcmlwdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIFtpbm5lckhUTUxdPVwiZGF0YS5kZXNjcmlwdGlvblwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZm9vdGVyPlxyXG4gICAgICAgICAgICA8L21hdC1jYXJkLWNvbnRlbnQ+XHJcbiAgICAgICAgPC9tYXQtY2FyZD5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICBgLFxyXG4gICAgc3R5bGVzOiBbYFxyXG4gICAgLmdhbnR0LWFjdGl2aXR5LWxpbmUge1xyXG4gICAgICAgIC8qYm9yZGVyLXJhZGl1czogMnB4OyovXHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcclxuICAgIH1cclxuICAgIC5nYW50dC1hY3Rpdml0eS1saW5lOmhvdmVyIHtcclxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICB9XHJcbiAgICAuZ2FudHQtYWN0aXZpdHktY29udGVudCB7XHJcbiAgICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIHRvcDogMDtcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7XHJcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICB9XHJcbiAgICAuZ2FudHQtYWN0aXZpdHktbGluay1jb250cm9sIHtcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgd2lkdGg6IDEzcHg7XHJcbiAgICAgICAgdG9wOiAwO1xyXG4gICAgfVxyXG4gICAgLmdhbnR0LWFjdGl2aXR5LXJpZ2h0IHtcclxuICAgICAgICByaWdodDogMDtcclxuICAgIH1cclxuICAgIC5nYW50dC1hY3Rpdml0eS1sZWZ0IHtcclxuICAgICAgICBsZWZ0OiAwO1xyXG4gICAgfVxyXG4gICAgLmdhbnR0LWFjdGl2aXR5LXJpZ2h0OmhvdmVyIHtcclxuICAgICAgICAvKmN1cnNvcjp3LXJlc2l6ZTsqL1xyXG4gICAgfVxyXG4gICAgLmdhbnR0LWFjdGl2aXR5LWxlZnQ6aG92ZXIge1xyXG4gICAgICAgIC8qY3Vyc29yOnctcmVzaXplOyovXHJcbiAgICB9XHJcbiAgICBgXSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIEdhbnR0U2VydmljZVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR2FudHRBY3Rpdml0eUJhcnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgQElucHV0KCkgdGltZVNjYWxlOiBhbnk7XHJcbiAgICBASW5wdXQoKSBkaW1lbnNpb25zOiBhbnk7XHJcbiAgICBASW5wdXQoKSB0YXNrczogYW55O1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbkdyaWRSb3dDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAgIEBPdXRwdXQoKSBvblBvcG92ZXJPcGVuOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICAgIGNvbnRhaW5lckhlaWdodCA9IDA7XHJcbiAgICBjb250YWluZXJXaWR0aCA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGdhbnR0U2VydmljZTogR2FudHRTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lckhlaWdodCA9IHRoaXMuZGltZW5zaW9ucy5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXJXaWR0aCA9IHRoaXMuZGltZW5zaW9ucy53aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3QmFyKHRhc2s6IGFueSwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBzdHlsZSA9IHt9O1xyXG4gICAgICAgIHN0eWxlID0gdGhpcy5nYW50dFNlcnZpY2UuY2FsY3VsYXRlQmFyKHRhc2ssIGluZGV4LCB0aGlzLnRpbWVTY2FsZSk7XHJcblxyXG4gICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgIH1cclxuXHJcbiAgICBncmlkUm93Q2xpY2tlZCh0YXNrOiBhbnkpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLm9uR3JpZFJvd0NsaWNrLmVtaXQodGFzayk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7IH1cclxuICAgIH1cclxuXHJcbiAgICBwb3BvdmVyT3BlbmVkKHRhc2s6IGFueSkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMub25Qb3BvdmVyT3Blbi5lbWl0KHRhc2spO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikgeyB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRNb3VzZUV2ZW50TGlzdGVuZXJzKGRyYWdGbjogYW55KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gc3RvcEZuKCkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZHJhZ0ZuLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgc3RvcEZuLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgc3RvcEZuLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZHJhZ0ZuLCBmYWxzZSk7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBzdG9wRm4sIGZhbHNlKTtcclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHN0b3BGbiwgZmFsc2UpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==