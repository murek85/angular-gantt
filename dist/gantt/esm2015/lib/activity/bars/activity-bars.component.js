/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { GanttService } from '../../shared/services/gantt.service';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from '@material-extended/mde';
import * as ɵngcc3 from '@angular/material/card';

function GanttActivityBarsComponent_div_1_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
const _c0 = function (a0) { return { task: a0 }; };
function GanttActivityBarsComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r10 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 3, 4);
    ɵngcc0.ɵɵlistener("click", function GanttActivityBarsComponent_div_1_Template_div_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r10); const task_r3 = ctx.$implicit; const ctx_r9 = ɵngcc0.ɵɵnextContext(); return ctx_r9.gridRowClicked(task_r3); });
    ɵngcc0.ɵɵelementStart(2, "div", 5, 6);
    ɵngcc0.ɵɵlistener("opened", function GanttActivityBarsComponent_div_1_Template_div_opened_2_listener() { ɵngcc0.ɵɵrestoreView(_r10); const task_r3 = ctx.$implicit; const ctx_r11 = ɵngcc0.ɵɵnextContext(); return ctx_r11.popoverOpened(task_r3); });
    ɵngcc0.ɵɵelementStart(4, "mde-popover", 7, 8);
    ɵngcc0.ɵɵtemplate(6, GanttActivityBarsComponent_div_1_ng_container_6_Template, 1, 0, "ng-container", 9);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelement(7, "div", 10);
    ɵngcc0.ɵɵelementStart(8, "div", 11);
    ɵngcc0.ɵɵelement(9, "div", 12);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(10, "div", 13);
    ɵngcc0.ɵɵelement(11, "div", 12);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const task_r3 = ctx.$implicit;
    const i_r4 = ctx.index;
    const _r7 = ɵngcc0.ɵɵreference(5);
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    const _r1 = ɵngcc0.ɵɵreference(3);
    ɵngcc0.ɵɵproperty("ngStyle", ctx_r0.drawBar(task_r3, i_r4));
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("mdePopoverTriggerFor", _r7)("mdePopoverBackdropCloseOnClick", false);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("mdePopoverEnterDelay", 100)("mdePopoverLeaveDelay", 0)("mdePopoverPositionY", "above")("mdePopoverOverlapTrigger", false)("mdePopoverDisableAnimation", false)("mdeFocusTrapEnabled", false)("mdePopoverArrowWidth", 12)("mdePopoverArrowColor", task_r3.color == null ? null : task_r3.color.primary);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", _r1)("ngTemplateOutletContext", ɵngcc0.ɵɵpureFunction1(13, _c0, task_r3));
} }
function GanttActivityBarsComponent_ng_template_2_mat_card_0_footer_17_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "footer");
    ɵngcc0.ɵɵelement(1, "span", 20);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const data_r12 = ɵngcc0.ɵɵnextContext(2).task;
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("innerHTML", data_r12.description, ɵngcc0.ɵɵsanitizeHtml);
} }
const _c1 = function (a0) { return { borderBottomColor: a0, borderBottomWidth: ".25em", borderBottomStyle: "solid" }; };
const _c2 = function (a0) { return { borderColor: a0 }; };
function GanttActivityBarsComponent_ng_template_2_mat_card_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "mat-card", 15);
    ɵngcc0.ɵɵelementStart(1, "mat-card-header");
    ɵngcc0.ɵɵelement(2, "div", 16);
    ɵngcc0.ɵɵelementStart(3, "mat-card-title");
    ɵngcc0.ɵɵelementStart(4, "span", 17);
    ɵngcc0.ɵɵtext(5);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(6, "mat-card-subtitle");
    ɵngcc0.ɵɵelementStart(7, "span");
    ɵngcc0.ɵɵtext(8);
    ɵngcc0.ɵɵpipe(9, "date");
    ɵngcc0.ɵɵpipe(10, "date");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(11, "mat-card-subtitle");
    ɵngcc0.ɵɵelementStart(12, "span", 18);
    ɵngcc0.ɵɵtext(13, "\u0336");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(14, "span");
    ɵngcc0.ɵɵtext(15);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(16, "mat-card-content");
    ɵngcc0.ɵɵtemplate(17, GanttActivityBarsComponent_ng_template_2_mat_card_0_footer_17_Template, 2, 1, "footer", 19);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const data_r12 = ɵngcc0.ɵɵnextContext().task;
    ɵngcc0.ɵɵproperty("ngStyle", ɵngcc0.ɵɵpureFunction1(13, _c1, data_r12.color == null ? null : data_r12.color.primary));
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngStyle", ɵngcc0.ɵɵpureFunction1(15, _c2, data_r12.color == null ? null : data_r12.color.primary));
    ɵngcc0.ɵɵadvance(3);
    ɵngcc0.ɵɵtextInterpolate(data_r12.name);
    ɵngcc0.ɵɵadvance(3);
    ɵngcc0.ɵɵtextInterpolate2("", ɵngcc0.ɵɵpipeBind2(9, 7, data_r12.start, "yyyy-MM-dd"), " - ", ɵngcc0.ɵɵpipeBind2(10, 10, data_r12.end, "yyyy-MM-dd"), "");
    ɵngcc0.ɵɵadvance(7);
    ɵngcc0.ɵɵtextInterpolate(data_r12.resource);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngIf", data_r12.description);
} }
function GanttActivityBarsComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵtemplate(0, GanttActivityBarsComponent_ng_template_2_mat_card_0_Template, 18, 17, "mat-card", 14);
} if (rf & 2) {
    const data_r12 = ctx.task;
    ɵngcc0.ɵɵproperty("ngIf", data_r12);
} }
const _c3 = function (a0, a1) { return { "height": a0, "width": a1 }; };
export class GanttActivityBarsComponent {
    /**
     * @param {?} ganttService
     */
    constructor(ganttService) {
        this.ganttService = ganttService;
        this.onGridRowClick = new EventEmitter();
        this.onPopoverOpen = new EventEmitter();
        this.containerHeight = 0;
        this.containerWidth = 0;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.containerHeight = this.dimensions.height;
        this.containerWidth = this.dimensions.width;
    }
    /**
     * @param {?} task
     * @param {?} index
     * @return {?}
     */
    drawBar(task, index) {
        /** @type {?} */
        let style = {};
        style = this.ganttService.calculateBar(task, index, this.timeScale);
        return style;
    }
    /**
     * @param {?} task
     * @return {?}
     */
    gridRowClicked(task) {
        try {
            this.onGridRowClick.emit(task);
        }
        catch (err) { }
    }
    /**
     * @param {?} task
     * @return {?}
     */
    popoverOpened(task) {
        try {
            this.onPopoverOpen.emit(task);
        }
        catch (err) { }
    }
    /**
     * @private
     * @param {?} dragFn
     * @return {?}
     */
    addMouseEventListeners(dragFn) {
        /**
         * @return {?}
         */
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
GanttActivityBarsComponent.ɵfac = function GanttActivityBarsComponent_Factory(t) { return new (t || GanttActivityBarsComponent)(ɵngcc0.ɵɵdirectiveInject(GanttService)); };
GanttActivityBarsComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: GanttActivityBarsComponent, selectors: [["activity-bars"]], inputs: { timeScale: "timeScale", dimensions: "dimensions", tasks: "tasks" }, outputs: { onGridRowClick: "onGridRowClick", onPopoverOpen: "onPopoverOpen" }, features: [ɵngcc0.ɵɵProvidersFeature([
            GanttService
        ])], decls: 4, vars: 5, consts: [[1, "gantt-activity-bars-area", 3, "ngStyle"], ["class", "gantt-activity-line", 3, "ngStyle", "click", 4, "ngFor", "ngForOf"], ["templatePopoverTask", ""], [1, "gantt-activity-line", 3, "ngStyle", "click"], ["bar", ""], ["mdePopoverOffsetX", "-15", "mdePopoverOffsetY", "0", 3, "mdePopoverTriggerFor", "mdePopoverBackdropCloseOnClick", "opened"], ["popoverTrigger", "mdePopoverTrigger"], ["mdePopoverPlacement", "bottom", 3, "mdePopoverEnterDelay", "mdePopoverLeaveDelay", "mdePopoverPositionY", "mdePopoverOverlapTrigger", "mdePopoverDisableAnimation", "mdeFocusTrapEnabled", "mdePopoverArrowWidth", "mdePopoverArrowColor"], ["taskPopover", "mdePopover"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "gantt-activity-content"], [1, "gantt-activity-link-control", "gantt-activity-right", 2, "height", "26px", "line-height", "30px"], [1, "gantt-link-point"], [1, "gantt-activity-link-control", "gantt-activity-left", 2, "height", "26px", "line-height", "30px"], ["class", "mat-elevation-z6", "style", "width: 320px; max-width: 320px;", 3, "ngStyle", 4, "ngIf"], [1, "mat-elevation-z6", 2, "width", "320px", "max-width", "320px", 3, "ngStyle"], ["mat-card-avatar", "", 2, "width", "0", "height", "unset", "margin-bottom", ".7em", "border-radius", "0", "border-style", "solid", 3, "ngStyle"], [2, "font-size", "80%"], [2, "padding-left", ".75em", "padding-right", "1em", "font-stretch", "condensed"], [4, "ngIf"], [3, "innerHTML"]], template: function GanttActivityBarsComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵtemplate(1, GanttActivityBarsComponent_div_1_Template, 12, 15, "div", 1);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵtemplate(2, GanttActivityBarsComponent_ng_template_2_Template, 1, 1, "ng-template", null, 2, ɵngcc0.ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngStyle", ɵngcc0.ɵɵpureFunction2(2, _c3, ctx.containerHeight + "px", ctx.containerWidth + "px"));
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.tasks);
    } }, directives: [ɵngcc1.NgStyle, ɵngcc1.NgForOf, ɵngcc2.MdePopoverTrigger, ɵngcc2.MdePopover, ɵngcc1.NgTemplateOutlet, ɵngcc1.NgIf, ɵngcc3.MatCard, ɵngcc3.MatCardHeader, ɵngcc3.MatCardAvatar, ɵngcc3.MatCardTitle, ɵngcc3.MatCardSubtitle, ɵngcc3.MatCardContent], pipes: [ɵngcc1.DatePipe], styles: [".gantt-activity-line[_ngcontent-%COMP%] {\n        \n        position: absolute;\n        box-sizing: border-box;\n        -webkit-user-select: none;\n    }\n    .gantt-activity-line[_ngcontent-%COMP%]:hover {\n        cursor: pointer;\n    }\n    .gantt-activity-content[_ngcontent-%COMP%] {\n        font-size: 12px;\n        color: #fff;\n        width: 100%;\n        top: 0;\n        position: absolute;\n        white-space: nowrap;\n        text-align: center;\n        line-height: inherit;\n        overflow: hidden;\n        height: 100%;\n    }\n    .gantt-activity-link-control[_ngcontent-%COMP%] {\n        position: absolute;\n        width: 13px;\n        top: 0;\n    }\n    .gantt-activity-right[_ngcontent-%COMP%] {\n        right: 0;\n    }\n    .gantt-activity-left[_ngcontent-%COMP%] {\n        left: 0;\n    }\n    .gantt-activity-right[_ngcontent-%COMP%]:hover {\n        \n    }\n    .gantt-activity-left[_ngcontent-%COMP%]:hover {\n        \n    }"] });
/** @nocollapse */
GanttActivityBarsComponent.ctorParameters = () => [
    { type: GanttService }
];
GanttActivityBarsComponent.propDecorators = {
    timeScale: [{ type: Input }],
    dimensions: [{ type: Input }],
    tasks: [{ type: Input }],
    onGridRowClick: [{ type: Output }],
    onPopoverOpen: [{ type: Output }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(GanttActivityBarsComponent, [{
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
                providers: [
                    GanttService
                ],
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
    `]
            }]
    }], function () { return [{ type: GanttService }]; }, { onGridRowClick: [{
            type: Output
        }], onPopoverOpen: [{
            type: Output
        }], timeScale: [{
            type: Input
        }], dimensions: [{
            type: Input
        }], tasks: [{
            type: Input
        }] }); })();
if (false) {
    /** @type {?} */
    GanttActivityBarsComponent.prototype.timeScale;
    /** @type {?} */
    GanttActivityBarsComponent.prototype.dimensions;
    /** @type {?} */
    GanttActivityBarsComponent.prototype.tasks;
    /** @type {?} */
    GanttActivityBarsComponent.prototype.onGridRowClick;
    /** @type {?} */
    GanttActivityBarsComponent.prototype.onPopoverOpen;
    /** @type {?} */
    GanttActivityBarsComponent.prototype.containerHeight;
    /** @type {?} */
    GanttActivityBarsComponent.prototype.containerWidth;
    /** @type {?} */
    GanttActivityBarsComponent.prototype.ganttService;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHktYmFycy5jb21wb25lbnQuanMiLCJzb3VyY2VzIjpbIm5nOi9hbmd1bGFyLWdhbnR0L2xpYi9hY3Rpdml0eS9iYXJzL2FjdGl2aXR5LWJhcnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBYyxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFIbkUsTUFBTSxPQUFPLDBCQUEwQjtBQUFHO0FBQVE7QUFDN0I7QUFDckIsSUFTSSxZQUFtQixZQUEwQjtBQUFJLFFBQTlCLGlCQUFZLEdBQVosWUFBWSxDQUFjO0FBQUMsUUFOcEMsbUJBQWMsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztBQUMxRSxRQUFjLGtCQUFhLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7QUFDekUsUUFDSSxvQkFBZSxHQUFHLENBQUMsQ0FBQztBQUN4QixRQUFJLG1CQUFjLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLElBQ3FELENBQUM7QUFDdEQ7QUFDTztBQUNFO0FBQVEsSUFEYixRQUFRO0FBQ1osUUFBUSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO0FBQ3RELFFBQVEsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztBQUNwRCxJQUFJLENBQUM7QUFDTDtBQUNPO0FBQXVCO0FBQ2hCO0FBQ0w7QUFBUSxJQUZiLE9BQU8sQ0FBQyxJQUFTLEVBQUUsS0FBYTtBQUNwQztBQUNDLFlBRFcsS0FBSyxHQUFHLEVBQUU7QUFDdEIsUUFB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QUFXQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBTkEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUVBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBRUEsQUFBQSxBQUVBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFFQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUVBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUVBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUVBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUVBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUVBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFsS0EsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFvRUEsQUF5Q0EsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUNBLEFBMUNBLEFBdUNBLEFBSUEsQUFwSEEsQUFBQSxBQXNIQSxBQUFBLEFBQ0EsQUFBQSxBQUNBLEFBQUEsQUFFQSxBQUFBLEFBQ0EsQUFBQSxBQUxBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQUVBLEFBQUEsQUFDQSxBQUFBLEFBRUEsQUFBQSxBQUNBLEFBQUEsQUFFQSxBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBHYW50dFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvZ2FudHQuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnYWN0aXZpdHktYmFycycsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBjbGFzcz1cImdhbnR0LWFjdGl2aXR5LWJhcnMtYXJlYVwiXHJcbiAgICAgICAgW25nU3R5bGVdPVwieyAnaGVpZ2h0JzogY29udGFpbmVySGVpZ2h0ICsgJ3B4JywgJ3dpZHRoJzogY29udGFpbmVyV2lkdGggKyAncHgnIH1cIj5cclxuXHJcbiAgICAgICAgPGRpdiAjYmFyIGNsYXNzPVwiZ2FudHQtYWN0aXZpdHktbGluZVwiXHJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCB0YXNrIG9mIHRhc2tzOyBsZXQgaSA9IGluZGV4XCIgKGNsaWNrKT1cImdyaWRSb3dDbGlja2VkKHRhc2spXCJcclxuICAgICAgICAgICAgW25nU3R5bGVdPVwiZHJhd0Jhcih0YXNrLCBpKVwiPlxyXG5cclxuICAgICAgICAgICAgPGRpdiAjcG9wb3ZlclRyaWdnZXI9XCJtZGVQb3BvdmVyVHJpZ2dlclwiXHJcbiAgICAgICAgICAgICAgICBbbWRlUG9wb3ZlclRyaWdnZXJGb3JdPVwidGFza1BvcG92ZXJcIlxyXG4gICAgICAgICAgICAgICAgW21kZVBvcG92ZXJCYWNrZHJvcENsb3NlT25DbGlja109XCJmYWxzZVwiXHJcbiAgICAgICAgICAgICAgICBtZGVQb3BvdmVyT2Zmc2V0WD1cIi0xNVwiXHJcbiAgICAgICAgICAgICAgICBtZGVQb3BvdmVyT2Zmc2V0WT1cIjBcIlxyXG4gICAgICAgICAgICAgICAgKG9wZW5lZCk9XCJwb3BvdmVyT3BlbmVkKHRhc2spXCI+XHJcblxyXG4gICAgICAgICAgICAgICAgPG1kZS1wb3BvdmVyICN0YXNrUG9wb3Zlcj1cIm1kZVBvcG92ZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgIFttZGVQb3BvdmVyRW50ZXJEZWxheV09XCIxMDBcIlxyXG4gICAgICAgICAgICAgICAgICAgIFttZGVQb3BvdmVyTGVhdmVEZWxheV09XCIwXCJcclxuICAgICAgICAgICAgICAgICAgICBbbWRlUG9wb3ZlclBvc2l0aW9uWV09XCInYWJvdmUnXCJcclxuICAgICAgICAgICAgICAgICAgICBbbWRlUG9wb3Zlck92ZXJsYXBUcmlnZ2VyXT1cImZhbHNlXCJcclxuICAgICAgICAgICAgICAgICAgICBbbWRlUG9wb3ZlckRpc2FibGVBbmltYXRpb25dPVwiZmFsc2VcIlxyXG4gICAgICAgICAgICAgICAgICAgIFttZGVGb2N1c1RyYXBFbmFibGVkXT1cImZhbHNlXCJcclxuICAgICAgICAgICAgICAgICAgICBbbWRlUG9wb3ZlckFycm93V2lkdGhdPVwiMTJcIlxyXG4gICAgICAgICAgICAgICAgICAgIFttZGVQb3BvdmVyQXJyb3dDb2xvcl09XCJ0YXNrLmNvbG9yPy5wcmltYXJ5XCJcclxuICAgICAgICAgICAgICAgICAgICBtZGVQb3BvdmVyUGxhY2VtZW50PVwiYm90dG9tXCI+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0ZW1wbGF0ZVBvcG92ZXJUYXNrOyBjb250ZXh0OiB7dGFzazogdGFza31cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgIDwvbWRlLXBvcG92ZXI+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbnR0LWFjdGl2aXR5LWNvbnRlbnRcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1hY3Rpdml0eS1saW5rLWNvbnRyb2wgZ2FudHQtYWN0aXZpdHktcmlnaHRcIiBzdHlsZT1cImhlaWdodDogMjZweDsgbGluZS1oZWlnaHQ6IDMwcHhcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtbGluay1wb2ludFwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtYWN0aXZpdHktbGluay1jb250cm9sIGdhbnR0LWFjdGl2aXR5LWxlZnRcIiBzdHlsZT1cImhlaWdodDogMjZweDsgbGluZS1oZWlnaHQ6IDMwcHhcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtbGluay1wb2ludFwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPG5nLXRlbXBsYXRlICN0ZW1wbGF0ZVBvcG92ZXJUYXNrIGxldC1kYXRhPVwidGFza1wiPlxyXG4gICAgICAgIDxtYXQtY2FyZCAqbmdJZj1cImRhdGFcIiBjbGFzcz1cIm1hdC1lbGV2YXRpb24tejZcIiBcclxuICAgICAgICAgICAgW25nU3R5bGVdPVwieyBcclxuICAgICAgICAgICAgICAgIGJvcmRlckJvdHRvbUNvbG9yOiBkYXRhLmNvbG9yPy5wcmltYXJ5LFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyQm90dG9tV2lkdGg6ICcuMjVlbScsXHJcbiAgICAgICAgICAgICAgICBib3JkZXJCb3R0b21TdHlsZTogJ3NvbGlkJyBcclxuICAgICAgICAgICAgfVwiIHN0eWxlPVwid2lkdGg6IDMyMHB4OyBtYXgtd2lkdGg6IDMyMHB4O1wiPlxyXG5cclxuICAgICAgICAgICAgPG1hdC1jYXJkLWhlYWRlcj5cclxuICAgICAgICAgICAgICAgIDxkaXYgbWF0LWNhcmQtYXZhdGFyIFtuZ1N0eWxlXT1cInsgYm9yZGVyQ29sb3I6IGRhdGEuY29sb3I/LnByaW1hcnkgfVwiIHN0eWxlPVwid2lkdGg6IDA7IGhlaWdodDogdW5zZXQ7IG1hcmdpbi1ib3R0b206IC43ZW07IGJvcmRlci1yYWRpdXM6IDA7IGJvcmRlci1zdHlsZTogc29saWQ7XCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8bWF0LWNhcmQtdGl0bGU+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9XCJmb250LXNpemU6IDgwJTtcIj57e2RhdGEubmFtZX19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9tYXQtY2FyZC10aXRsZT5cclxuICAgICAgICAgICAgICAgIDxtYXQtY2FyZC1zdWJ0aXRsZT5cclxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj57e2RhdGEuc3RhcnQgfCBkYXRlOid5eXl5LU1NLWRkJ319IC0ge3tkYXRhLmVuZCB8IGRhdGU6J3l5eXktTU0tZGQnfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L21hdC1jYXJkLXN1YnRpdGxlPlxyXG4gICAgICAgICAgICAgICAgPG1hdC1jYXJkLXN1YnRpdGxlPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPVwicGFkZGluZy1sZWZ0OiAuNzVlbTsgcGFkZGluZy1yaWdodDogMWVtOyBmb250LXN0cmV0Y2g6IGNvbmRlbnNlZDtcIj4mI3gzMzY7PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7ZGF0YS5yZXNvdXJjZX19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9tYXQtY2FyZC1zdWJ0aXRsZT5cclxuICAgICAgICAgICAgPC9tYXQtY2FyZC1oZWFkZXI+XHJcbiAgICAgICAgICAgIDxtYXQtY2FyZC1jb250ZW50PlxyXG4gICAgICAgICAgICAgICAgPGZvb3RlciAqbmdJZj1cImRhdGEuZGVzY3JpcHRpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBbaW5uZXJIVE1MXT1cImRhdGEuZGVzY3JpcHRpb25cIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Zvb3Rlcj5cclxuICAgICAgICAgICAgPC9tYXQtY2FyZC1jb250ZW50PlxyXG4gICAgICAgIDwvbWF0LWNhcmQ+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgYCxcclxuICAgIHN0eWxlczogW2BcclxuICAgIC5nYW50dC1hY3Rpdml0eS1saW5lIHtcclxuICAgICAgICAvKmJvcmRlci1yYWRpdXM6IDJweDsqL1xyXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgICB9XHJcbiAgICAuZ2FudHQtYWN0aXZpdHktbGluZTpob3ZlciB7XHJcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgfVxyXG4gICAgLmdhbnR0LWFjdGl2aXR5LWNvbnRlbnQge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgICAgICBjb2xvcjogI2ZmZjtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICB0b3A6IDA7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xyXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgfVxyXG4gICAgLmdhbnR0LWFjdGl2aXR5LWxpbmstY29udHJvbCB7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIHdpZHRoOiAxM3B4O1xyXG4gICAgICAgIHRvcDogMDtcclxuICAgIH1cclxuICAgIC5nYW50dC1hY3Rpdml0eS1yaWdodCB7XHJcbiAgICAgICAgcmlnaHQ6IDA7XHJcbiAgICB9XHJcbiAgICAuZ2FudHQtYWN0aXZpdHktbGVmdCB7XHJcbiAgICAgICAgbGVmdDogMDtcclxuICAgIH1cclxuICAgIC5nYW50dC1hY3Rpdml0eS1yaWdodDpob3ZlciB7XHJcbiAgICAgICAgLypjdXJzb3I6dy1yZXNpemU7Ki9cclxuICAgIH1cclxuICAgIC5nYW50dC1hY3Rpdml0eS1sZWZ0OmhvdmVyIHtcclxuICAgICAgICAvKmN1cnNvcjp3LXJlc2l6ZTsqL1xyXG4gICAgfVxyXG4gICAgYF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBHYW50dFNlcnZpY2VcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEdhbnR0QWN0aXZpdHlCYXJzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIEBJbnB1dCgpIHRpbWVTY2FsZTogYW55O1xyXG4gICAgQElucHV0KCkgZGltZW5zaW9uczogYW55O1xyXG4gICAgQElucHV0KCkgdGFza3M6IGFueTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25HcmlkUm93Q2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgICBAT3V0cHV0KCkgb25Qb3BvdmVyT3BlbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgICBjb250YWluZXJIZWlnaHQgPSAwO1xyXG4gICAgY29udGFpbmVyV2lkdGggPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBnYW50dFNlcnZpY2U6IEdhbnR0U2VydmljZSkgeyB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXJIZWlnaHQgPSB0aGlzLmRpbWVuc2lvbnMuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyV2lkdGggPSB0aGlzLmRpbWVuc2lvbnMud2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd0Jhcih0YXNrOiBhbnksIGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgc3R5bGUgPSB7fTtcclxuICAgICAgICBzdHlsZSA9IHRoaXMuZ2FudHRTZXJ2aWNlLmNhbGN1bGF0ZUJhcih0YXNrLCBpbmRleCwgdGhpcy50aW1lU2NhbGUpO1xyXG5cclxuICAgICAgICByZXR1cm4gc3R5bGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ3JpZFJvd0NsaWNrZWQodGFzazogYW55KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5vbkdyaWRSb3dDbGljay5lbWl0KHRhc2spO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikgeyB9XHJcbiAgICB9XHJcblxyXG4gICAgcG9wb3Zlck9wZW5lZCh0YXNrOiBhbnkpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLm9uUG9wb3Zlck9wZW4uZW1pdCh0YXNrKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHsgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRkTW91c2VFdmVudExpc3RlbmVycyhkcmFnRm46IGFueSkge1xyXG4gICAgICAgIGZ1bmN0aW9uIHN0b3BGbigpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGRyYWdGbiwgZmFsc2UpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHN0b3BGbiwgZmFsc2UpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHN0b3BGbiwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGRyYWdGbiwgZmFsc2UpO1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgc3RvcEZuLCBmYWxzZSk7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBzdG9wRm4sIGZhbHNlKTtcclxuICAgIH1cclxufVxyXG4iXX0=