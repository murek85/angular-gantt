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
const _c0 = function (a0) { return { task: a0 }; };
function GanttActivityBarsComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 3, 4);
    i0.ɵɵlistener("click", function GanttActivityBarsComponent_div_1_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r10); const task_r3 = ctx.$implicit; const ctx_r9 = i0.ɵɵnextContext(); return ctx_r9.gridRowClicked(task_r3); });
    i0.ɵɵelementStart(2, "div", 5, 6);
    i0.ɵɵlistener("opened", function GanttActivityBarsComponent_div_1_Template_div_opened_2_listener() { i0.ɵɵrestoreView(_r10); const task_r3 = ctx.$implicit; const ctx_r11 = i0.ɵɵnextContext(); return ctx_r11.popoverOpened(task_r3); });
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
    const task_r3 = ctx.$implicit;
    const i_r4 = ctx.index;
    const _r7 = i0.ɵɵreference(5);
    const ctx_r0 = i0.ɵɵnextContext();
    const _r1 = i0.ɵɵreference(3);
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
    const data_r12 = i0.ɵɵnextContext(2).task;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("innerHTML", data_r12.description, i0.ɵɵsanitizeHtml);
} }
const _c1 = function (a0) { return { borderBottomColor: a0, borderBottomWidth: ".25em", borderBottomStyle: "solid" }; };
const _c2 = function (a0) { return { borderColor: a0 }; };
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
    const data_r12 = i0.ɵɵnextContext().task;
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
    const data_r12 = ctx.task;
    i0.ɵɵproperty("ngIf", data_r12);
} }
const _c3 = function (a0, a1) { return { "height": a0, "width": a1 }; };
export class GanttActivityBarsComponent {
    constructor(ganttService) {
        this.ganttService = ganttService;
        this.onGridRowClick = new EventEmitter();
        this.onPopoverOpen = new EventEmitter();
        this.containerHeight = 0;
        this.containerWidth = 0;
    }
    ngOnInit() {
        this.containerHeight = this.dimensions.height;
        this.containerWidth = this.dimensions.width;
    }
    drawBar(task, index) {
        let style = {};
        style = this.ganttService.calculateBar(task, index, this.timeScale);
        return style;
    }
    gridRowClicked(task) {
        try {
            this.onGridRowClick.emit(task);
        }
        catch (err) { }
    }
    popoverOpened(task) {
        try {
            this.onPopoverOpen.emit(task);
        }
        catch (err) { }
    }
    addMouseEventListeners(dragFn) {
        function stopFn() {
            document.documentElement.removeEventListener('mousemove', dragFn, false);
            document.documentElement.removeEventListener('mouseup', stopFn, false);
            document.documentElement.removeEventListener('mouseleave', stopFn, false);
        }
        document.documentElement.addEventListener('mousemove', dragFn, false);
        document.documentElement.addEventListener('mouseup', stopFn, false);
        document.documentElement.addEventListener('mouseleave', stopFn, false);
    }
}
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
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(GanttActivityBarsComponent, [{
        type: Component,
        args: [{
                selector: 'activity-bars',
                template: `
    <div class="gantt-activity-bars-area"
        [ngStyle]="{ 'height': containerHeight + 'px', 'width': containerWidth + 'px' }">

        <div #bar class="gantt-activity-line"
            *ngFor="let task of tasks; let i = index" (click)="gridRowClicked(task)"
            [ngStyle]="drawBar(task, i)">

            <div #popoverTrigger="mdePopoverTrigger"
                [mdePopoverTriggerFor]="taskPopover"
                [mdePopoverBackdropCloseOnClick]="false"
                mdePopoverOffsetX="-15"
                mdePopoverOffsetY="0"
                (opened)="popoverOpened(task)">

                <mde-popover #taskPopover="mdePopover"
                    [mdePopoverEnterDelay]="100"
                    [mdePopoverLeaveDelay]="0"
                    [mdePopoverPositionY]="'above'"
                    [mdePopoverOverlapTrigger]="false"
                    [mdePopoverDisableAnimation]="false"
                    [mdeFocusTrapEnabled]="false"
                    [mdePopoverArrowWidth]="12"
                    [mdePopoverArrowColor]="task.color?.primary"
                    mdePopoverPlacement="bottom">

                    <ng-container *ngTemplateOutlet="templatePopoverTask; context: {task: task}"></ng-container>
                </mde-popover>

                <div class="gantt-activity-content"></div>
                <div class="gantt-activity-link-control gantt-activity-right" style="height: 26px; line-height: 30px">
                    <div class="gantt-link-point"></div>
                </div>
                <div class="gantt-activity-link-control gantt-activity-left" style="height: 26px; line-height: 30px">
                    <div class="gantt-link-point"></div>
                </div>
            </div>
        </div>
    </div>

    <ng-template #templatePopoverTask let-data="task">
        <mat-card *ngIf="data" class="mat-elevation-z6" 
            [ngStyle]="{ 
                borderBottomColor: data.color?.primary,
                borderBottomWidth: '.25em',
                borderBottomStyle: 'solid' 
            }" style="width: 320px; max-width: 320px;">

            <mat-card-header>
                <div mat-card-avatar [ngStyle]="{ borderColor: data.color?.primary }" style="width: 0; height: unset; margin-bottom: .7em; border-radius: 0; border-style: solid;"></div>
                <mat-card-title>
                    <span style="font-size: 80%;">{{data.name}}</span>
                </mat-card-title>
                <mat-card-subtitle>
                    <span>{{data.start | date:'yyyy-MM-dd'}} - {{data.end | date:'yyyy-MM-dd'}}</span>
                </mat-card-subtitle>
                <mat-card-subtitle>
                    <span style="padding-left: .75em; padding-right: 1em; font-stretch: condensed;">&#x336;</span>
                    <span>{{data.resource}}</span>
                </mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
                <footer *ngIf="data.description">
                    <span [innerHTML]="data.description"></span>
                </footer>
            </mat-card-content>
        </mat-card>
    </ng-template>
    `,
                styles: [`
    .gantt-activity-line {
        /*border-radius: 2px;*/
        position: absolute;
        box-sizing: border-box;
        -webkit-user-select: none;
    }
    .gantt-activity-line:hover {
        cursor: pointer;
    }
    .gantt-activity-content {
        font-size: 12px;
        color: #fff;
        width: 100%;
        top: 0;
        position: absolute;
        white-space: nowrap;
        text-align: center;
        line-height: inherit;
        overflow: hidden;
        height: 100%;
    }
    .gantt-activity-link-control {
        position: absolute;
        width: 13px;
        top: 0;
    }
    .gantt-activity-right {
        right: 0;
    }
    .gantt-activity-left {
        left: 0;
    }
    .gantt-activity-right:hover {
        /*cursor:w-resize;*/
    }
    .gantt-activity-left:hover {
        /*cursor:w-resize;*/
    }
    `],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHktYmFycy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWdhbnR0LyIsInNvdXJjZXMiOlsibGliL2FjdGl2aXR5L2JhcnMvYWN0aXZpdHktYmFycy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQWMsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUNBQXFDLENBQUM7Ozs7Ozs7SUE4Qi9DLHdCQUE0Rjs7Ozs7SUF0QnhHLGlDQUlJO0lBSDBDLHNPQUE4QjtJQUd4RSxpQ0FPSTtJQUZBLHlPQUE4QjtJQUU5Qix5Q0FXSTtJQUFBLG1HQUE2RTtJQUNqRixpQkFBYztJQUVkLDBCQUEwQztJQUMxQywrQkFDSTtJQUFBLDBCQUFvQztJQUN4QyxpQkFBTTtJQUNOLGdDQUNJO0lBQUEsMkJBQW9DO0lBQ3hDLGlCQUFNO0lBQ1YsaUJBQU07SUFDVixpQkFBTTs7Ozs7OztJQS9CRix1REFBNEI7SUFHeEIsZUFBb0M7SUFBcEMsMENBQW9DLHlDQUFBO0lBT2hDLGVBQTRCO0lBQTVCLDBDQUE0QiwyQkFBQSxnQ0FBQSxtQ0FBQSxxQ0FBQSw4QkFBQSw0QkFBQSw4RUFBQTtJQVVkLGVBQThEO0lBQTlELHNDQUE4RCxpRUFBQTs7O0lBb0NoRiw4QkFDSTtJQUFBLDJCQUE0QztJQUNoRCxpQkFBUzs7O0lBREMsZUFBOEI7SUFBOUIsbUVBQThCOzs7OztJQXRCaEQsb0NBT0k7SUFBQSx1Q0FDSTtJQUFBLDBCQUF5SztJQUN6SyxzQ0FDSTtJQUFBLGdDQUE4QjtJQUFBLFlBQWE7SUFBQSxpQkFBTztJQUN0RCxpQkFBaUI7SUFDakIseUNBQ0k7SUFBQSw0QkFBTTtJQUFBLFlBQXFFOzs7SUFBQSxpQkFBTztJQUN0RixpQkFBb0I7SUFDcEIsMENBQ0k7SUFBQSxpQ0FBZ0Y7SUFBQSx1QkFBTztJQUFBLGlCQUFPO0lBQzlGLDZCQUFNO0lBQUEsYUFBaUI7SUFBQSxpQkFBTztJQUNsQyxpQkFBb0I7SUFDeEIsaUJBQWtCO0lBQ2xCLHlDQUNJO0lBQUEsNkdBQ0k7SUFFUixpQkFBbUI7SUFDdkIsaUJBQVc7OztJQXhCUCw2R0FJRTtJQUd1QixlQUFnRDtJQUFoRCw2R0FBZ0Q7SUFFbkMsZUFBYTtJQUFiLG1DQUFhO0lBR3JDLGVBQXFFO0lBQXJFLDRJQUFxRTtJQUlyRSxlQUFpQjtJQUFqQix1Q0FBaUI7SUFJbkIsZUFBd0I7SUFBeEIsMkNBQXdCOzs7SUFyQnhDLHNHQU9JOzs7SUFQTSwrQkFBWTs7O0FBd0U5QixNQUFNLE9BQU8sMEJBQTBCO0lBV25DLFlBQW1CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBTm5DLG1CQUFjLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFDNUQsa0JBQWEsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUVyRSxvQkFBZSxHQUFHLENBQUMsQ0FBQztRQUNwQixtQkFBYyxHQUFHLENBQUMsQ0FBQztJQUU4QixDQUFDO0lBRWxELFFBQVE7UUFDSixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQzlDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7SUFDaEQsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFTLEVBQUUsS0FBYTtRQUM1QixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDZixLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFcEUsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELGNBQWMsQ0FBQyxJQUFTO1FBQ3BCLElBQUk7WUFDQSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNsQztRQUFDLE9BQU8sR0FBRyxFQUFFLEdBQUc7SUFDckIsQ0FBQztJQUVELGFBQWEsQ0FBQyxJQUFTO1FBQ25CLElBQUk7WUFDQSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQztRQUFDLE9BQU8sR0FBRyxFQUFFLEdBQUc7SUFDckIsQ0FBQztJQUVPLHNCQUFzQixDQUFDLE1BQVc7UUFDdEMsU0FBUyxNQUFNO1lBQ1gsUUFBUSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3pFLFFBQVEsQ0FBQyxlQUFlLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN2RSxRQUFRLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDOUUsQ0FBQztRQUVELFFBQVEsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN0RSxRQUFRLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDcEUsUUFBUSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzNFLENBQUM7O3VIQS9DUSwwQkFBMEI7a0ZBQTFCLDBCQUEwQixnT0FKeEI7WUFDUCxZQUFZO1NBQ2Y7UUE5R0QsOEJBR0k7UUFBQSw2RUFJSTtRQThCUixpQkFBTTtRQUVOLDRIQUNJOztRQXZDQSwyR0FBZ0Y7UUFHNUUsZUFBeUM7UUFBekMsbUNBQXlDOztrREE0R3hDLDBCQUEwQjtjQW5IdEMsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxlQUFlO2dCQUN6QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBb0VUO2dCQUNELE1BQU0sRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0F1Q1IsQ0FBQztnQkFDRixTQUFTLEVBQUU7b0JBQ1AsWUFBWTtpQkFDZjthQUNKOztrQkFFSSxLQUFLOztrQkFDTCxLQUFLOztrQkFDTCxLQUFLOztrQkFFTCxNQUFNOztrQkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBHYW50dFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvZ2FudHQuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnYWN0aXZpdHktYmFycycsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBjbGFzcz1cImdhbnR0LWFjdGl2aXR5LWJhcnMtYXJlYVwiXHJcbiAgICAgICAgW25nU3R5bGVdPVwieyAnaGVpZ2h0JzogY29udGFpbmVySGVpZ2h0ICsgJ3B4JywgJ3dpZHRoJzogY29udGFpbmVyV2lkdGggKyAncHgnIH1cIj5cclxuXHJcbiAgICAgICAgPGRpdiAjYmFyIGNsYXNzPVwiZ2FudHQtYWN0aXZpdHktbGluZVwiXHJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCB0YXNrIG9mIHRhc2tzOyBsZXQgaSA9IGluZGV4XCIgKGNsaWNrKT1cImdyaWRSb3dDbGlja2VkKHRhc2spXCJcclxuICAgICAgICAgICAgW25nU3R5bGVdPVwiZHJhd0Jhcih0YXNrLCBpKVwiPlxyXG5cclxuICAgICAgICAgICAgPGRpdiAjcG9wb3ZlclRyaWdnZXI9XCJtZGVQb3BvdmVyVHJpZ2dlclwiXHJcbiAgICAgICAgICAgICAgICBbbWRlUG9wb3ZlclRyaWdnZXJGb3JdPVwidGFza1BvcG92ZXJcIlxyXG4gICAgICAgICAgICAgICAgW21kZVBvcG92ZXJCYWNrZHJvcENsb3NlT25DbGlja109XCJmYWxzZVwiXHJcbiAgICAgICAgICAgICAgICBtZGVQb3BvdmVyT2Zmc2V0WD1cIi0xNVwiXHJcbiAgICAgICAgICAgICAgICBtZGVQb3BvdmVyT2Zmc2V0WT1cIjBcIlxyXG4gICAgICAgICAgICAgICAgKG9wZW5lZCk9XCJwb3BvdmVyT3BlbmVkKHRhc2spXCI+XHJcblxyXG4gICAgICAgICAgICAgICAgPG1kZS1wb3BvdmVyICN0YXNrUG9wb3Zlcj1cIm1kZVBvcG92ZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgIFttZGVQb3BvdmVyRW50ZXJEZWxheV09XCIxMDBcIlxyXG4gICAgICAgICAgICAgICAgICAgIFttZGVQb3BvdmVyTGVhdmVEZWxheV09XCIwXCJcclxuICAgICAgICAgICAgICAgICAgICBbbWRlUG9wb3ZlclBvc2l0aW9uWV09XCInYWJvdmUnXCJcclxuICAgICAgICAgICAgICAgICAgICBbbWRlUG9wb3Zlck92ZXJsYXBUcmlnZ2VyXT1cImZhbHNlXCJcclxuICAgICAgICAgICAgICAgICAgICBbbWRlUG9wb3ZlckRpc2FibGVBbmltYXRpb25dPVwiZmFsc2VcIlxyXG4gICAgICAgICAgICAgICAgICAgIFttZGVGb2N1c1RyYXBFbmFibGVkXT1cImZhbHNlXCJcclxuICAgICAgICAgICAgICAgICAgICBbbWRlUG9wb3ZlckFycm93V2lkdGhdPVwiMTJcIlxyXG4gICAgICAgICAgICAgICAgICAgIFttZGVQb3BvdmVyQXJyb3dDb2xvcl09XCJ0YXNrLmNvbG9yPy5wcmltYXJ5XCJcclxuICAgICAgICAgICAgICAgICAgICBtZGVQb3BvdmVyUGxhY2VtZW50PVwiYm90dG9tXCI+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0ZW1wbGF0ZVBvcG92ZXJUYXNrOyBjb250ZXh0OiB7dGFzazogdGFza31cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgIDwvbWRlLXBvcG92ZXI+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbnR0LWFjdGl2aXR5LWNvbnRlbnRcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1hY3Rpdml0eS1saW5rLWNvbnRyb2wgZ2FudHQtYWN0aXZpdHktcmlnaHRcIiBzdHlsZT1cImhlaWdodDogMjZweDsgbGluZS1oZWlnaHQ6IDMwcHhcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtbGluay1wb2ludFwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtYWN0aXZpdHktbGluay1jb250cm9sIGdhbnR0LWFjdGl2aXR5LWxlZnRcIiBzdHlsZT1cImhlaWdodDogMjZweDsgbGluZS1oZWlnaHQ6IDMwcHhcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtbGluay1wb2ludFwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPG5nLXRlbXBsYXRlICN0ZW1wbGF0ZVBvcG92ZXJUYXNrIGxldC1kYXRhPVwidGFza1wiPlxyXG4gICAgICAgIDxtYXQtY2FyZCAqbmdJZj1cImRhdGFcIiBjbGFzcz1cIm1hdC1lbGV2YXRpb24tejZcIiBcclxuICAgICAgICAgICAgW25nU3R5bGVdPVwieyBcclxuICAgICAgICAgICAgICAgIGJvcmRlckJvdHRvbUNvbG9yOiBkYXRhLmNvbG9yPy5wcmltYXJ5LFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyQm90dG9tV2lkdGg6ICcuMjVlbScsXHJcbiAgICAgICAgICAgICAgICBib3JkZXJCb3R0b21TdHlsZTogJ3NvbGlkJyBcclxuICAgICAgICAgICAgfVwiIHN0eWxlPVwid2lkdGg6IDMyMHB4OyBtYXgtd2lkdGg6IDMyMHB4O1wiPlxyXG5cclxuICAgICAgICAgICAgPG1hdC1jYXJkLWhlYWRlcj5cclxuICAgICAgICAgICAgICAgIDxkaXYgbWF0LWNhcmQtYXZhdGFyIFtuZ1N0eWxlXT1cInsgYm9yZGVyQ29sb3I6IGRhdGEuY29sb3I/LnByaW1hcnkgfVwiIHN0eWxlPVwid2lkdGg6IDA7IGhlaWdodDogdW5zZXQ7IG1hcmdpbi1ib3R0b206IC43ZW07IGJvcmRlci1yYWRpdXM6IDA7IGJvcmRlci1zdHlsZTogc29saWQ7XCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8bWF0LWNhcmQtdGl0bGU+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9XCJmb250LXNpemU6IDgwJTtcIj57e2RhdGEubmFtZX19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9tYXQtY2FyZC10aXRsZT5cclxuICAgICAgICAgICAgICAgIDxtYXQtY2FyZC1zdWJ0aXRsZT5cclxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj57e2RhdGEuc3RhcnQgfCBkYXRlOid5eXl5LU1NLWRkJ319IC0ge3tkYXRhLmVuZCB8IGRhdGU6J3l5eXktTU0tZGQnfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L21hdC1jYXJkLXN1YnRpdGxlPlxyXG4gICAgICAgICAgICAgICAgPG1hdC1jYXJkLXN1YnRpdGxlPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPVwicGFkZGluZy1sZWZ0OiAuNzVlbTsgcGFkZGluZy1yaWdodDogMWVtOyBmb250LXN0cmV0Y2g6IGNvbmRlbnNlZDtcIj4mI3gzMzY7PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7ZGF0YS5yZXNvdXJjZX19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9tYXQtY2FyZC1zdWJ0aXRsZT5cclxuICAgICAgICAgICAgPC9tYXQtY2FyZC1oZWFkZXI+XHJcbiAgICAgICAgICAgIDxtYXQtY2FyZC1jb250ZW50PlxyXG4gICAgICAgICAgICAgICAgPGZvb3RlciAqbmdJZj1cImRhdGEuZGVzY3JpcHRpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBbaW5uZXJIVE1MXT1cImRhdGEuZGVzY3JpcHRpb25cIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Zvb3Rlcj5cclxuICAgICAgICAgICAgPC9tYXQtY2FyZC1jb250ZW50PlxyXG4gICAgICAgIDwvbWF0LWNhcmQ+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgYCxcclxuICAgIHN0eWxlczogW2BcclxuICAgIC5nYW50dC1hY3Rpdml0eS1saW5lIHtcclxuICAgICAgICAvKmJvcmRlci1yYWRpdXM6IDJweDsqL1xyXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgICB9XHJcbiAgICAuZ2FudHQtYWN0aXZpdHktbGluZTpob3ZlciB7XHJcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgfVxyXG4gICAgLmdhbnR0LWFjdGl2aXR5LWNvbnRlbnQge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgICAgICBjb2xvcjogI2ZmZjtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICB0b3A6IDA7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xyXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgfVxyXG4gICAgLmdhbnR0LWFjdGl2aXR5LWxpbmstY29udHJvbCB7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIHdpZHRoOiAxM3B4O1xyXG4gICAgICAgIHRvcDogMDtcclxuICAgIH1cclxuICAgIC5nYW50dC1hY3Rpdml0eS1yaWdodCB7XHJcbiAgICAgICAgcmlnaHQ6IDA7XHJcbiAgICB9XHJcbiAgICAuZ2FudHQtYWN0aXZpdHktbGVmdCB7XHJcbiAgICAgICAgbGVmdDogMDtcclxuICAgIH1cclxuICAgIC5nYW50dC1hY3Rpdml0eS1yaWdodDpob3ZlciB7XHJcbiAgICAgICAgLypjdXJzb3I6dy1yZXNpemU7Ki9cclxuICAgIH1cclxuICAgIC5nYW50dC1hY3Rpdml0eS1sZWZ0OmhvdmVyIHtcclxuICAgICAgICAvKmN1cnNvcjp3LXJlc2l6ZTsqL1xyXG4gICAgfVxyXG4gICAgYF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBHYW50dFNlcnZpY2VcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEdhbnR0QWN0aXZpdHlCYXJzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIEBJbnB1dCgpIHRpbWVTY2FsZTogYW55O1xyXG4gICAgQElucHV0KCkgZGltZW5zaW9uczogYW55O1xyXG4gICAgQElucHV0KCkgdGFza3M6IGFueTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25HcmlkUm93Q2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgICBAT3V0cHV0KCkgb25Qb3BvdmVyT3BlbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgICBjb250YWluZXJIZWlnaHQgPSAwO1xyXG4gICAgY29udGFpbmVyV2lkdGggPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBnYW50dFNlcnZpY2U6IEdhbnR0U2VydmljZSkgeyB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXJIZWlnaHQgPSB0aGlzLmRpbWVuc2lvbnMuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyV2lkdGggPSB0aGlzLmRpbWVuc2lvbnMud2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd0Jhcih0YXNrOiBhbnksIGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgc3R5bGUgPSB7fTtcclxuICAgICAgICBzdHlsZSA9IHRoaXMuZ2FudHRTZXJ2aWNlLmNhbGN1bGF0ZUJhcih0YXNrLCBpbmRleCwgdGhpcy50aW1lU2NhbGUpO1xyXG5cclxuICAgICAgICByZXR1cm4gc3R5bGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ3JpZFJvd0NsaWNrZWQodGFzazogYW55KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5vbkdyaWRSb3dDbGljay5lbWl0KHRhc2spO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikgeyB9XHJcbiAgICB9XHJcblxyXG4gICAgcG9wb3Zlck9wZW5lZCh0YXNrOiBhbnkpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLm9uUG9wb3Zlck9wZW4uZW1pdCh0YXNrKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHsgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRkTW91c2VFdmVudExpc3RlbmVycyhkcmFnRm46IGFueSkge1xyXG4gICAgICAgIGZ1bmN0aW9uIHN0b3BGbigpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGRyYWdGbiwgZmFsc2UpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHN0b3BGbiwgZmFsc2UpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHN0b3BGbiwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGRyYWdGbiwgZmFsc2UpO1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgc3RvcEZuLCBmYWxzZSk7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBzdG9wRm4sIGZhbHNlKTtcclxuICAgIH1cclxufVxyXG4iXX0=