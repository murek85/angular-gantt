import { Injectable, EventEmitter, Component, Input, Output, ChangeDetectionStrategy, ElementRef, ViewChild, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MdePopoverModule } from '@material-extended/mde';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from '@material-extended/mde';
import * as ɵngcc3 from '@angular/material/card';

const _c0 = function () { return { "width": "100%" }; };
function GanttActivityComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 14);
    ɵngcc0.ɵɵelementStart(1, "label");
    ɵngcc0.ɵɵtext(2);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const column_r6 = ctx.$implicit;
    ɵngcc0.ɵɵstyleProp("width", column_r6.width + "px")("left", column_r6.left + "px");
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate1(" ", column_r6.name, " ");
} }
const _c1 = function (a0) { return { "width": a0, "padding-left": 0 }; };
const _c2 = function (a0, a1, a3) { return { borderLeftColor: a0, borderLeftWidth: a1, borderLeftStyle: "solid", paddingRight: a3 }; };
function GanttActivityComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 15, 16);
    ɵngcc0.ɵɵelementStart(2, "mde-popover", 17, 18);
    ɵngcc0.ɵɵelementStart(4, "mat-card", 19);
    ɵngcc0.ɵɵelementStart(5, "span", 20);
    ɵngcc0.ɵɵtext(6);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(7, "div", 21);
    ɵngcc0.ɵɵelementStart(8, "div", 22);
    ɵngcc0.ɵɵelement(9, "span", 23);
    ɵngcc0.ɵɵelementStart(10, "span");
    ɵngcc0.ɵɵtext(11);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const data_r7 = ctx.$implicit;
    const _r9 = ɵngcc0.ɵɵreference(3);
    const ctx_r3 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngStyle", ctx_r3.setGridRowStyle());
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("mdePopoverEnterDelay", 100)("mdePopoverLeaveDelay", 0)("mdePopoverPositionY", "above")("mdePopoverOverlapTrigger", false)("mdePopoverDisableAnimation", false)("mdePopoverArrowWidth", 8)("mdePopoverArrowColor", "black");
    ɵngcc0.ɵɵadvance(4);
    ɵngcc0.ɵɵtextInterpolate(data_r7.name);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("mdePopoverTriggerFor", _r9)("mdePopoverBackdropCloseOnClick", false)("ngStyle", ɵngcc0.ɵɵpureFunction1(14, _c1, ctx_r3.gridColumns[1].width + "px"));
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngStyle", ɵngcc0.ɵɵpureFunction3(16, _c2, data_r7.color.primary, 0.35 + "em", 0.5 + "em"));
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate(data_r7.name);
} }
const _c3 = function (a0) { return { "height": a0 }; };
const _c4 = function (a0, a1) { return { "height": a0, "width": a1 }; };
function GanttTimeScaleComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 3);
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵpipe(2, "date");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const date_r2 = ctx.$implicit;
    const i_r3 = ctx.index;
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", i_r3 % 2 ? "weekend" : "")("ngStyle", ctx_r0.setTimescaleWeekendCellStyle());
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(ɵngcc0.ɵɵpipeBind2(2, 3, date_r2, "dd-MM"));
} }
function GanttTimeScaleComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 3);
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const i_r5 = ctx.index;
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", i_r5 % 2 ? "weekend" : "")("ngStyle", ctx_r1.setTimescaleWeekendCellStyle());
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(i_r5 + 1);
} }
const _c5 = ["bg"];
function GanttActivityBackgroundComponent_div_2_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "div", 5);
} if (rf & 2) {
    const i_r5 = ctx.index;
    const ctx_r3 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("ngStyle", ctx_r3.setCellStyle())("ngClass", i_r5 % 2 ? "weekend" : "");
} }
function GanttActivityBackgroundComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 3);
    ɵngcc0.ɵɵtemplate(1, GanttActivityBackgroundComponent_div_2_div_1_Template, 1, 2, "div", 4);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngStyle", ctx_r1.setRowStyle());
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngForOf", ctx_r1.cells);
} }
function GanttActivityBarsComponent_div_1_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
const _c6 = function (a0) { return { task: a0 }; };
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
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", _r1)("ngTemplateOutletContext", ɵngcc0.ɵɵpureFunction1(13, _c6, task_r3));
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
const _c7 = function (a0) { return { borderBottomColor: a0, borderBottomWidth: ".25em", borderBottomStyle: "solid" }; };
const _c8 = function (a0) { return { borderColor: a0 }; };
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
    ɵngcc0.ɵɵproperty("ngStyle", ɵngcc0.ɵɵpureFunction1(13, _c7, data_r12.color == null ? null : data_r12.color.primary));
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngStyle", ɵngcc0.ɵɵpureFunction1(15, _c8, data_r12.color == null ? null : data_r12.color.primary));
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
function Project() { }
if (false) {
    /** @type {?} */
    Project.prototype.name;
    /** @type {?|undefined} */
    Project.prototype.startDate;
    /** @type {?} */
    Project.prototype.tasks;
}
/**
 * @record
 */
function Task() { }
if (false) {
    /** @type {?} */
    Task.prototype.name;
    /** @type {?|undefined} */
    Task.prototype.resource;
    /** @type {?|undefined} */
    Task.prototype.description;
    /** @type {?} */
    Task.prototype.start;
    /** @type {?|undefined} */
    Task.prototype.end;
    /** @type {?|undefined} */
    Task.prototype.color;
}
/**
 * @record
 */
function IGanttOptions() { }
if (false) {
    /** @type {?|undefined} */
    IGanttOptions.prototype.scale;
    /** @type {?|undefined} */
    IGanttOptions.prototype.gridColumns;
}
/**
 * @record
 */
function IScale() { }
if (false) {
    /** @type {?|undefined} */
    IScale.prototype.start;
    /** @type {?|undefined} */
    IScale.prototype.end;
}
/**
 * @record
 */
function IGridColumn() { }
if (false) {
    /** @type {?|undefined} */
    IGridColumn.prototype.name;
    /** @type {?} */
    IGridColumn.prototype.left;
    /** @type {?} */
    IGridColumn.prototype.width;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GanttConfig {
    constructor() {
        this.cellWidth = 38;
        this.rowHeight = 30;
        this.activityHeight = 420;
        this.barHeight = 25;
        this.barLineHeight = 35;
        this.barMoveable = false;
    }
}
GanttConfig.ɵfac = function GanttConfig_Factory(t) { return new (t || GanttConfig)(); };
GanttConfig.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: GanttConfig, factory: GanttConfig.ɵfac });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(GanttConfig, [{
        type: Injectable
    }], function () { return []; }, null); })();
if (false) {
    /** @type {?} */
    GanttConfig.prototype.cellWidth;
    /** @type {?} */
    GanttConfig.prototype.rowHeight;
    /** @type {?} */
    GanttConfig.prototype.activityHeight;
    /** @type {?} */
    GanttConfig.prototype.barHeight;
    /** @type {?} */
    GanttConfig.prototype.barLineHeight;
    /** @type {?} */
    GanttConfig.prototype.barMoveable;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GanttService {
    constructor() {
        this.rowHeight = 0;
        this.hourCellWidth = 60; // change to 60 so minutes can been seen more easily
        // change to 60 so minutes can been seen more easily
        this.hoursCellWidth = this.hourCellWidth * 25;
        this.cellWidth = 0;
        this.windowInnerWidth = 0;
        this.activityHeight = 0;
        this.barHeight = 0;
        this.barLineHeight = 0;
        this.barTop = 0;
        this.barMoveable = false;
        this.gridWidth = 0; //188
        //188
        this.gridHeight = 332;
        /** @type {?} */
        const ganttConfig = new GanttConfig();
        this.rowHeight = ganttConfig.rowHeight;
        this.cellWidth = ganttConfig.cellWidth;
        this.activityHeight = ganttConfig.activityHeight;
        this.barHeight = ganttConfig.barHeight;
        this.barLineHeight = ganttConfig.barLineHeight;
        this.barTop = ganttConfig.rowHeight;
        this.barMoveable = ganttConfig.barMoveable;
    }
    /**
     * @private
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    calculateBarWidth(start, end) {
        if (typeof start === 'string') {
            start = new Date(start);
        }
        if (typeof end === 'string') {
            end = new Date(end);
        }
        /** @type {?} */
        const days = this.calculateDiffDays(start, end);
        /** @type {?} */
        const width = (days * this.cellWidth + days) / 7;
        return width;
    }
    /**
     * @private
     * @param {?} start
     * @param {?} scale
     * @return {?}
     */
    calculateBarLeft(start, scale) {
        /** @type {?} */
        let left = 0;
        if (start != null) {
            if (typeof start === 'string') {
                start = new Date();
            }
            for (let i = 0; i < scale.length; i++) {
                if (start.getTime() >= scale[i].getTime() && start.getTime() < scale[i + 1].getTime()) {
                    // left = i * this.cellWidth + i + this.calculateBarLeftDelta(start) +
                    //    ((7 / (scale[i + 1].getDate() - start.getDate()) / 7) * this.cellWidth) - this.cellWidth / 7;
                    left = i * this.cellWidth + ((this.cellWidth) * this.calculateDiffDays(scale[i], start) / 7) +
                        i + this.calculateBarLeftDelta(start);
                    break;
                }
            }
        }
        return left;
    }
    /**
     * Calculates the height of the gantt grid, activity and vertical scroll
     * @return {?}
     */
    calculateGanttHeight() {
        return `${this.TASK_CACHE.length * this.rowHeight}px`;
    }
    /**
     * @private
     * @param {?} start
     * @return {?}
     */
    calculateBarLeftDelta(start) {
        /** @type {?} */
        let offset = 0;
        /** @type {?} */
        const hoursInDay = 24;
        /** @type {?} */
        const minutesInHour = 60;
        /** @type {?} */
        const secondsInHour = 3600;
        /** @type {?} */
        const startHours = (start.getHours() + start.getMinutes() / minutesInHour + start.getSeconds() / secondsInHour);
        offset = this.cellWidth / hoursInDay * startHours;
        return offset;
    }
    /**
     * Calculate the bar styles
     * @param {?} task
     * @param {?} index
     * @param {?} scale
     * @return {?}
     */
    calculateBar(task, index, scale) {
        /** @type {?} */
        const barStyle = this.getBarStyle(task.color);
        return {
            'top': this.barTop * index + 2 + 'px',
            'left': this.calculateBarLeft(task.start, scale) + 'px',
            'height': this.barHeight + 'px',
            'line-height': this.barLineHeight + 'px',
            'width': this.calculateBarWidth(task.start, task.end) + 'px',
            'background-color': barStyle["background-color"],
            'border-left': barStyle["border-left"]
        };
    }
    /**
     * Get the bar style based on task status
     * @private
     * @param {?} color
     * @return {?}
     */
    getBarStyle(color) {
        /** @type {?} */
        const style = {};
        style["background-color"] = color.secondary;
        style["border-left"] = `5px solid ${color.primary}`;
        return style;
    }
    /**
     * Calculates the difference in two dates and returns number of days
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    calculateDiffDays(start, end) {
        try {
            /** @type {?} */
            const oneDay = 24 * 60 * 60 * 1000;
            // hours*minutes*seconds*milliseconds /ms
            /** @type {?} */
            const diffDays = Math.abs((start.getTime() - end.getTime()) / (oneDay));
            /** @type {?} */
            const days = diffDays;
            return days;
        }
        catch (err) {
            return 0;
        }
    }
    /**
     * Calculate the gantt scale range given the start and end date of tasks
     * @param {?=} start
     * @param {?=} end
     * @return {?}
     */
    calculateScale(start = new Date(), end = this.addDays(start, 7)) {
        /** @type {?} */
        const scale = [];
        try {
            while (start.getTime() <= end.getTime()) {
                scale.push(start);
                start = this.addDays(start, 7);
            }
            return scale;
        }
        catch (err) {
            return scale;
        }
    }
    /**
     * @param {?=} start
     * @param {?=} end
     * @return {?}
     */
    calculateMonthScale(start = new Date(), end = this.addDays(start, 7)) {
        /** @type {?} */
        let scale = [];
        try {
            // while (start.getTime() <= end.getTime()) {
            //     scale.push({ start: start, width: this.calculateCellMonthWidth(start, end) });
            //     start = this.addDays(start, new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate());
            // }
            scale = this.calculateCellMonthWidth(start, end);
            return scale;
        }
        catch (err) {
            return scale;
        }
    }
    /**
     * Determines whether given date is a weekend
     * @param {?} date
     * @return {?}
     */
    isDayWeekend(date) {
        /** @type {?} */
        const day = date.getDay();
        if (day === 6 || day === 0) {
            return true;
        }
        return false;
    }
    /**
     * Add x number of days to a date object
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    addDays(date, days) {
        /** @type {?} */
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
    //** Remove x number of days from a date object */
    /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    removeDays(date, days) {
        /** @type {?} */
        const result = new Date(date);
        result.setDate(result.getDate() - days);
        return result;
    }
    /**
     * Calculates the grid scale for gantt based on tasks start and end dates
     * @param {?} tasks
     * @return {?}
     */
    calculateGridScale(tasks) {
        /** @type {?} */
        let start;
        /** @type {?} */
        let end;
        /** @type {?} */
        const dates = tasks.map((task) => {
            return {
                start: new Date(task.start),
                end: new Date(task.end)
            };
        });
        start = new Date(Math.min.apply(null, dates.map((t) => {
            return t.start;
        })));
        end = new Date(Math.max.apply(null, dates.map((t) => {
            return t.end;
        })));
        return {
            start: start,
            end: end
        };
    }
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    getComputedStyle(element, attribute) {
        return parseInt(document.defaultView.getComputedStyle(element)[attribute], 10);
    }
    //TODO(dale): determine whether this is needed
    /**
     * @return {?}
     */
    calculateContainerWidth() {
        this.windowInnerWidth = window.innerWidth;
        /** @type {?} */
        const containerWidth = this.gridWidth - 18;
        return containerWidth;
    }
    /**
     * @return {?}
     */
    calculateContainerHeight() {
        /** @type {?} */
        const containerHeight = (innerHeight - 18);
        return containerHeight;
    }
    /**
     * @return {?}
     */
    calculateActivityContainerDimensions() {
        /** @type {?} */
        const scrollWidth = 18;
        this.windowInnerWidth = window.innerWidth;
        /** @type {?} */
        const width = window.innerWidth - this.gridWidth - scrollWidth;
        return { height: this.activityHeight, width: width };
    }
    /**
     * @param {?} elem
     * @return {?}
     */
    calculateGanttActivityWidth(elem) {
        return `calc(100% - ${(elem.offsetWidth + 1)}px)`;
    }
    /**
     * @param {?} elem
     * @return {?}
     */
    calculateGanttActivityHeight(elem) {
        return `${elem.offsetHeight}px`;
    }
    /**
     * @param {?} minDate
     * @param {?} maxDate
     * @return {?}
     */
    calculateCellMonthWidth(minDate, maxDate) {
        /** @type {?} */
        var i;
        /** @type {?} */
        var result = [];
        /** @type {?} */
        var startDate = minDate;
        /** @type {?} */
        var endDate = maxDate;
        /** @type {?} */
        var monthDiff = this.calculateDiffMonths(startDate, endDate);
        /** @type {?} */
        var dayDiff = this.calculateDiffDays(startDate, endDate);
        for (i = 0; i < monthDiff; i++) {
            /** @type {?} */
            var startOfMonth = i === 0 ? startDate : new Date(startDate.getFullYear(), i, 1);
            /** @type {?} */
            var endOfMonth = i === monthDiff - 1 ? endDate : new Date(startDate.getFullYear(), i + 1, 0);
            /** @type {?} */
            var dayInMonth = this.calculateDiffDays(startOfMonth, endOfMonth) + (i !== monthDiff - 1 && 1);
            /** @type {?} */
            var width = Math.floor(dayInMonth / dayDiff * 2E3) * 1.025;
            result.push({ start: startOfMonth, end: endOfMonth, width: width });
        }
        return result;
    }
    /**
     * @private
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    calculateDiffMonths(start, end) {
        /** @type {?} */
        var months = end.getMonth() - start.getMonth() + (12 * (end.getFullYear() - start.getFullYear()));
        if (end.getDate() < start.getDate()) {
            /** @type {?} */
            var newFrom = new Date(end.getFullYear(), end.getMonth(), start.getDate());
            if (end < newFrom && end.getMonth() == newFrom.getMonth() && end.getYear() % 4 != 0) {
                months--;
            }
        }
        return months + 1;
    }
    /**
     * Set the vertical scroll top positions for gantt
     * @param {?} verticalScrollElem
     * @param {?} ganttGridElem
     * @param {?} ganttActivityAreaElem
     * @return {?}
     */
    scrollTop(verticalScrollElem, ganttGridElem, ganttActivityAreaElem) {
        /** @type {?} */
        const verticalScrollTop = verticalScrollElem.scrollTop;
        /** @type {?} */
        const scroll = this.setScrollTop;
        // debounce
        if (verticalScrollTop !== null && verticalScrollTop !== undefined) {
            scroll(verticalScrollTop, ganttActivityAreaElem);
            scroll(ganttActivityAreaElem.scrollTop, ganttGridElem);
        }
    }
    /**
     * Group data by id , only supports one level
     * @param {?} tasks
     * @return {?}
     */
    groupData(tasks) {
        return tasks;
    }
    /**
     * Checks whether any new data needs to be added to task cache
     * @param {?} tasks
     * @param {?} scale
     * @return {?}
     */
    doTaskCheck(tasks, scale) {
        // const cachedTaskIds = this.TASK_CACHE.map((task: any) => { return task.id });
        // const itemsToCache: any[] = [];
        // only look at tasks that are not cached
        // tasks.filter((task: any) => {
        //     return cachedTaskIds.indexOf(task.id) === -1;
        // }).forEach((task: any) => {
        //     itemsToCache.push(task);
        // });
        // itemsToCache.forEach((item: any) => {
        //     this.TASK_CACHE.push(item);
        // });
        // if (itemsToCache.length > 0) {
        //     return true;
        // }
        this.TASK_CACHE = tasks;
        this.TIME_SCALE = this.calculateScale(scale.start, scale.end);
        this.MONTH_SCALE = this.calculateMonthScale(scale.start, scale.end);
        return true;
    }
    /**
     * Set a id prefix so CSS3 query selector can work with ids that contain numbers
     * @param {?} id
     * @return {?}
     */
    setIdPrefix(id) {
        return `_${id}`;
    }
    // /** Remove the id prefix to allow querying of data */
    // public removeIdPrefix(id: string): string {
    //     return id.substring(1, id.length - 1);
    // }
    /**
     * Set the scroll top property of a native DOM element
     * @param {?} scrollTop
     * @param {?} element
     * @return {?}
     */
    setScrollTop(scrollTop, element) {
        if (element !== null && element !== undefined) {
            element.scrollTop = scrollTop;
        }
    }
}
GanttService.ɵfac = function GanttService_Factory(t) { return new (t || GanttService)(); };
GanttService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: GanttService, factory: GanttService.ɵfac });
/** @nocollapse */
GanttService.ctorParameters = () => [];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(GanttService, [{
        type: Injectable
    }], function () { return []; }, null); })();
if (false) {
    /** @type {?} */
    GanttService.prototype.rowHeight;
    /** @type {?} */
    GanttService.prototype.hourCellWidth;
    /** @type {?} */
    GanttService.prototype.hoursCellWidth;
    /** @type {?} */
    GanttService.prototype.cellWidth;
    /** @type {?} */
    GanttService.prototype.windowInnerWidth;
    /** @type {?} */
    GanttService.prototype.activityHeight;
    /** @type {?} */
    GanttService.prototype.barHeight;
    /** @type {?} */
    GanttService.prototype.barLineHeight;
    /** @type {?} */
    GanttService.prototype.barTop;
    /** @type {?} */
    GanttService.prototype.barMoveable;
    /** @type {?} */
    GanttService.prototype.gridWidth;
    /** @type {?} */
    GanttService.prototype.gridHeight;
    /** @type {?} */
    GanttService.prototype.TASK_CACHE;
    /** @type {?} */
    GanttService.prototype.TIME_SCALE;
    /** @type {?} */
    GanttService.prototype.MONTH_SCALE;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GanttComponent {
    /**
     * @param {?} ganttService
     */
    constructor(ganttService) {
        this.ganttService = ganttService;
        this.onGridRowClick = new EventEmitter();
        this.onPopoverOpen = new EventEmitter();
    }
    /**
     * @param {?} project
     * @return {?}
     */
    set project(project) {
        if (project) {
            this._project = project;
        }
        else {
            this.setDefaultProject();
        }
    }
    /**
     * @return {?}
     */
    get project() { return this._project; }
    /**
     * @param {?} options
     * @return {?}
     */
    set options(options) {
        if (options.scale) {
            this._options = options;
        }
        else {
            this.setDefaultOptions();
        }
    }
    /**
     * @return {?}
     */
    get options() { return this._options; }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    setSizes() {
        this.ganttContainerWidth = this.ganttService.calculateContainerWidth();
    }
    /**
     * @return {?}
     */
    setDefaultOptions() {
        /** @type {?} */
        const scale = this.ganttService.calculateGridScale(this._project.tasks);
        /** @type {?} */
        const gridColumns = [
            { name: '', left: 0, width: 16 },
            { name: 'Zadanie', left: 0, width: 330 }
        ];
        this._options = {
            scale,
            gridColumns
        };
    }
    /**
     * @return {?}
     */
    setDefaultProject() {
        this._project = {
            name: '',
            startDate: null,
            tasks: []
        };
    }
    /**
     * @param {?} task
     * @return {?}
     */
    gridRowClicked(task) {
        this.onGridRowClick.emit(task);
    }
    /**
     * @param {?} task
     * @return {?}
     */
    popoverOpened(task) {
        this.onPopoverOpen.emit(task);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onResize($event) {
        this.setSizes();
    }
}
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
    } }, directives: function () { return [ɵngcc1.NgStyle, GanttActivityComponent]; }, styles: [".gantt-container[_ngcontent-%COMP%] {\n            font-family: Arial;\n            font-size: 13px;\n            border: 1px solid #cecece;\n            position: relative;\n            white-space: nowrap;\n            margin-top: 0px;\n        }"] });
/** @nocollapse */
GanttComponent.ctorParameters = () => [
    { type: GanttService }
];
GanttComponent.propDecorators = {
    project: [{ type: Input }],
    options: [{ type: Input }],
    onGridRowClick: [{ type: Output }],
    onPopoverOpen: [{ type: Output }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(GanttComponent, [{
        type: Component,
        args: [{
                selector: 'gantt',
                template: `
        <div [ngStyle]="{ 'width': '100%' }">
            <div class="gantt-container" (window:resize)="onResize($event)">
                <!--<gantt-header [name]="_project.name" [startDate]="_project.startDate"></gantt-header>-->
                <gantt-activity [project]="_project" [options]="_options" (onGridRowClick)="gridRowClicked($event)" (onPopoverOpen)="popoverOpened($event)"></gantt-activity>
                <!--<gantt-footer [project]="_project"></gantt-footer>-->
            </div>
        </div>
    `,
                providers: [],
                styles: [`
        .gantt-container {
            font-family: Arial;
            font-size: 13px;
            border: 1px solid #cecece;
            position: relative;
            white-space: nowrap;
            margin-top: 0px;
        }
    `]
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GanttHeaderComponent {
}
GanttHeaderComponent.ɵfac = function GanttHeaderComponent_Factory(t) { return new (t || GanttHeaderComponent)(); };
GanttHeaderComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: GanttHeaderComponent, selectors: [["gantt-header"]], inputs: { name: "name", startDate: "startDate" }, decls: 7, vars: 5, consts: [[1, "gantt-header"], [1, "gantt-header-title"], [2, "flex", "1"]], template: function GanttHeaderComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵelementStart(1, "div", 1);
        ɵngcc0.ɵɵelementStart(2, "div", 2);
        ɵngcc0.ɵɵtext(3);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(4, "div");
        ɵngcc0.ɵɵtext(5);
        ɵngcc0.ɵɵpipe(6, "date");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(3);
        ɵngcc0.ɵɵtextInterpolate(ctx.name);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵtextInterpolate1("Started: ", ɵngcc0.ɵɵpipeBind2(6, 2, ctx.startDate, "medium"), "");
    } }, pipes: [ɵngcc1.DatePipe], styles: [".gantt-header[_ngcontent-%COMP%] {\n            background-color: whitesmoke;\n            height: 40px;\n            border-bottom: 1px solid #e0e0e0;\n        }\n        .gantt-header-title[_ngcontent-%COMP%] {\n            padding: 12px;\n            display: flex;\n            flex-wrap:wrap;\n            font-family: Arial, Helvetica, sans-serif;\n            font-size: 16px;\n        }\n        .gantt-header-actions[_ngcontent-%COMP%] {\n            display: inline;\n            float: right;\n            padding: 6px;\n        }"] });
GanttHeaderComponent.propDecorators = {
    name: [{ type: Input }],
    startDate: [{ type: Input }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(GanttHeaderComponent, [{
        type: Component,
        args: [{
                selector: 'gantt-header',
                template: `
        <div class="gantt-header">
            <div class="gantt-header-title">
                <div style="flex:1">{{ name }}</div>
                <div>Started: {{ startDate | date: 'medium'}}</div>
            </div>
        </div>
    `,
                styles: [`
        .gantt-header {
            background-color: whitesmoke;
            height: 40px;
            border-bottom: 1px solid #e0e0e0;
        }
        .gantt-header-title {
            padding: 12px;
            display: flex;
            flex-wrap:wrap;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 16px;
        }
        .gantt-header-actions {
            display: inline;
            float: right;
            padding: 6px;
        }
    `]
            }]
    }], null, { name: [{
            type: Input
        }], startDate: [{
            type: Input
        }] }); })();
if (false) {
    /** @type {?} */
    GanttHeaderComponent.prototype.name;
    /** @type {?} */
    GanttHeaderComponent.prototype.startDate;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GanttFooterComponent {
    constructor() { }
}
GanttFooterComponent.ɵfac = function GanttFooterComponent_Factory(t) { return new (t || GanttFooterComponent)(); };
GanttFooterComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: GanttFooterComponent, selectors: [["gantt-footer"]], inputs: { project: "project" }, decls: 1, vars: 0, consts: [[1, "gantt-footer"]], template: function GanttFooterComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelement(0, "div", 0);
    } }, styles: [".gantt-footer[_ngcontent-%COMP%] {\n            background-color: whitesmoke;\n            height: 36px;\n            border-top: 1px solid #e0e0e0;\n        }\n        .gantt-footer-actions[_ngcontent-%COMP%] {\n            float: right;\n        }"] });
/** @nocollapse */
GanttFooterComponent.ctorParameters = () => [];
GanttFooterComponent.propDecorators = {
    project: [{ type: Input }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(GanttFooterComponent, [{
        type: Component,
        args: [{
                selector: 'gantt-footer',
                template: `<div class="gantt-footer"></div>`,
                styles: [`
        .gantt-footer {
            background-color: whitesmoke;
            height: 36px;
            border-top: 1px solid #e0e0e0;
        }
        .gantt-footer-actions {
            float: right;
        }
    `]
            }]
    }], function () { return []; }, { project: [{
            type: Input
        }] }); })();
if (false) {
    /** @type {?} */
    GanttFooterComponent.prototype.project;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GanttActivityComponent {
    /**
     * @param {?} elem
     * @param {?} ganttService
     */
    constructor(elem, ganttService) {
        this.elem = elem;
        this.ganttService = ganttService;
        this.onGridRowClick = new EventEmitter();
        this.onPopoverOpen = new EventEmitter();
        this.scale = {
            start: null,
            end: null
        };
        this.dimensions = {
            height: 0,
            width: 0
        };
        this.gridColumns = [
            { name: '', left: 0, width: 16 },
            { name: 'Zadanie', left: 0, width: 330 }
        ];
    }
    /**
     * @param {?} event
     * @param {?} elem
     * @return {?}
     */
    doWheel(event, elem) {
        event.preventDefault();
        event.stopPropagation();
        // chome
        if (event.wheelDelta) {
            if ((event.wheelDelta || event.detail) > 0) {
                elem.scrollLeft -= 100;
            }
            else {
                elem.scrollLeft += 100;
            }
            // firefox
        }
        else {
            if (event.deltaY > 0) {
                elem.scrollLeft += 100;
            }
            else {
                elem.scrollLeft -= 100;
            }
        }
        return false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Cache the project data and only work with that. Only show parent tasks by default
        this.ganttService.TASK_CACHE = this.project.tasks;
        this.ganttService.TIME_SCALE = this.ganttService.calculateScale(this.options.scale.start, this.options.scale.end);
        this.start = this.options.scale.start;
        this.end = this.options.scale.end;
        this.containerWidth = this.calculateContainerWidth();
        this.containerHeight = this.calculateContainerHeight();
        this.activityContainerSizes = this.ganttService.calculateActivityContainerDimensions();
        this.gridColumns = this.options.gridColumns ? this.options.gridColumns : this.gridColumns;
        // important that these are called last as it relies on values calculated above.
        this.setScale();
        this.setDimensions();
        this.setSizes();
    }
    /**
     * Custom model check
     * @return {?}
     */
    ngDoCheck() {
        // do a check to see whether any new tasks have been added. If the task is a child then push into array if tree expanded?
        this.ganttService.doTaskCheck(this.project.tasks, this.options.scale);
    }
    /**
     * On vertical scroll set the scroll top of grid and activity
     * @param {?} verticalScroll
     * @param {?} ganttGrid
     * @param {?} ganttActivityArea
     * @return {?}
     */
    onVerticalScroll(verticalScroll, ganttGrid, ganttActivityArea) {
        this.ganttService.scrollTop(verticalScroll, ganttGrid, ganttActivityArea);
    }
    /**
     * @param {?} task
     * @return {?}
     */
    gridRowClick(task) {
        try {
            this.onGridRowClick.emit(task);
        }
        catch (err) { }
    }
    /**
     * @param {?} task
     * @return {?}
     */
    popoverOpen(task) {
        try {
            this.onPopoverOpen.emit(task);
        }
        catch (err) { }
    }
    /**
     * On resize of browser window dynamically adjust gantt activity height and width
     * @param {?} event
     * @return {?}
     */
    onResize(event) {
        /** @type {?} */
        const activityContainerSizes = this.ganttService.calculateActivityContainerDimensions();
        this.ganttActivityHeight = activityContainerSizes.height + 'px';
        this.ganttActivityWidth = activityContainerSizes.width;
    }
    /**
     * @return {?}
     */
    setScale() {
        this.scale.start = this.start;
        this.scale.end = this.end;
    }
    /**
     * @return {?}
     */
    setDimensions() {
        this.dimensions.height = this.containerHeight;
        this.dimensions.width = this.containerWidth;
    }
    /**
     * @return {?}
     */
    setGridRowStyle() {
        return {
            'height': this.ganttService.rowHeight + 'px',
            'line-height': this.ganttService.rowHeight + 'px'
        };
    }
    /**
     * @return {?}
     */
    setGridScaleStyle() {
        /** @type {?} */
        const height = this.ganttService.rowHeight + 30;
        return {
            'height': height + 'px',
            'line-height': height + 'px'
        };
    }
    /**
     * @return {?}
     */
    calculateColumnsWidth() {
        /** @type {?} */
        const ganttActivityWidth = this.gridColumns.map(column => { return column.width; }).reduce((pv, cv) => pv + cv, 0) + 1;
        return `calc(100% - ${(ganttActivityWidth)}px)`;
    }
    /**
     * @private
     * @return {?}
     */
    calculateContainerHeight() {
        return this.ganttService.TASK_CACHE.length * this.ganttService.rowHeight;
    }
    /**
     * @private
     * @return {?}
     */
    calculateContainerWidth() {
        return this.ganttService.TIME_SCALE.length * this.ganttService.cellWidth + this.ganttService.cellWidth;
    }
    /**
     * @private
     * @return {?}
     */
    setSizes() {
        this.ganttActivityHeight = this.activityContainerSizes.height + 'px';
        this.ganttActivityWidth = this.activityContainerSizes.width;
    }
}
GanttActivityComponent.ɵfac = function GanttActivityComponent_Factory(t) { return new (t || GanttActivityComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(GanttService)); };
GanttActivityComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: GanttActivityComponent, selectors: [["gantt-activity"]], inputs: { project: "project", options: "options" }, outputs: { onGridRowClick: "onGridRowClick", onPopoverOpen: "onPopoverOpen" }, decls: 14, vars: 23, consts: [[1, "grid"], ["ganttGrid", ""], [1, "grid-scale", 3, "ngStyle"], ["class", "grid-head-cell", 3, "width", "left", 4, "ngFor", "ngForOf"], [1, "grid-data", 3, "ngStyle"], ["ganttGridData", ""], ["class", "grid-row", 3, "ngStyle", 4, "ngFor", "ngForOf"], [1, "gantt-activity", 3, "ngStyle", "wheel", "resize"], ["ganttActivity", ""], [3, "timeScaleMonth", "timeScaleWeekend", "dimensions", "scale"], [1, "gantt-activity-area", 3, "ngStyle"], ["ganttActivityArea", ""], [3, "timeScale", "tasks"], [3, "timeScale", "dimensions", "tasks", "onGridRowClick", "onPopoverOpen"], [1, "grid-head-cell"], [1, "grid-row", 3, "ngStyle"], ["row", ""], ["mdePopoverPlacement", "bottom", 3, "mdePopoverEnterDelay", "mdePopoverLeaveDelay", "mdePopoverPositionY", "mdePopoverOverlapTrigger", "mdePopoverDisableAnimation", "mdePopoverArrowWidth", "mdePopoverArrowColor"], ["appPopover", "mdePopover"], [2, "max-width", "340px", "padding", "3px 8px", "color", "#ffffff", "text-align", "center", "background-color", "#000000", "border-radius", "4px"], [2, "z-index", "1070", "display", "block", "font-family", "'Lato','Helvetica Neue',Helvetica,Arial,sans-serif", "font-style", "normal", "font-weight", "normal", "letter-spacing", "normal", "line-break", "auto", "line-height", "1.42857143", "text-align", "left", "text-align", "start", "text-decoration", "none", "text-shadow", "none", "text-transform", "none", "white-space", "normal", "word-break", "normal", "word-spacing", "normal", "word-wrap", "normal", "font-size", "13px"], ["mdePopoverOffsetX", "25", "mdePopoverOffsetY", "0", 1, "grid-cell", 3, "mdePopoverTriggerFor", "mdePopoverBackdropCloseOnClick", "ngStyle"], [1, "gantt-tree-content"], [3, "ngStyle"]], template: function GanttActivityComponent_Template(rf, ctx) { if (rf & 1) {
        const _r10 = ɵngcc0.ɵɵgetCurrentView();
        ɵngcc0.ɵɵelementStart(0, "div", 0, 1);
        ɵngcc0.ɵɵelementStart(2, "div", 2);
        ɵngcc0.ɵɵtemplate(3, GanttActivityComponent_div_3_Template, 3, 5, "div", 3);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(4, "div", 4, 5);
        ɵngcc0.ɵɵtemplate(6, GanttActivityComponent_div_6_Template, 12, 20, "div", 6);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(7, "div", 7, 8);
        ɵngcc0.ɵɵlistener("wheel", function GanttActivityComponent_Template_div_wheel_7_listener($event) { ɵngcc0.ɵɵrestoreView(_r10); const _r4 = ɵngcc0.ɵɵreference(8); return ctx.doWheel($event, _r4); })("resize", function GanttActivityComponent_Template_div_resize_7_listener($event) { return ctx.onResize($event); }, false, ɵngcc0.ɵɵresolveWindow);
        ɵngcc0.ɵɵelement(9, "time-scale", 9);
        ɵngcc0.ɵɵelementStart(10, "div", 10, 11);
        ɵngcc0.ɵɵelement(12, "activity-background", 12);
        ɵngcc0.ɵɵelementStart(13, "activity-bars", 13);
        ɵngcc0.ɵɵlistener("onGridRowClick", function GanttActivityComponent_Template_activity_bars_onGridRowClick_13_listener($event) { return ctx.gridRowClick($event); })("onPopoverOpen", function GanttActivityComponent_Template_activity_bars_onPopoverOpen_13_listener($event) { return ctx.popoverOpen($event); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngStyle", ctx.setGridScaleStyle());
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.gridColumns);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngStyle", ɵngcc0.ɵɵpureFunction1(15, _c3, ctx.ganttService.calculateGanttHeight()));
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.ganttService.TASK_CACHE);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngStyle", ɵngcc0.ɵɵpureFunction2(17, _c4, ctx.ganttService.calculateGanttHeight() + 60, ctx.calculateColumnsWidth()));
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("timeScaleMonth", ctx.ganttService.MONTH_SCALE)("timeScaleWeekend", ctx.ganttService.TIME_SCALE)("dimensions", ctx.dimensions)("scale", ctx.options.scale);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngStyle", ɵngcc0.ɵɵpureFunction2(20, _c4, ctx.ganttService.calculateGanttHeight(), ctx.containerWidth + 36 + "px"));
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("timeScale", ctx.ganttService.TIME_SCALE)("tasks", ctx.ganttService.TASK_CACHE);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("timeScale", ctx.ganttService.TIME_SCALE)("dimensions", ctx.dimensions)("tasks", ctx.ganttService.TASK_CACHE);
    } }, directives: function () { return [ɵngcc1.NgStyle, ɵngcc1.NgForOf, GanttTimeScaleComponent,
        GanttActivityBackgroundComponent,
        GanttActivityBarsComponent, ɵngcc2.MdePopover, ɵngcc3.MatCard, ɵngcc2.MdePopoverTrigger]; }, styles: [".gantt-activity[_ngcontent-%COMP%] {\n            overflow-y: hidden;\n            overflow-x: scroll;\n            display: inline-block;\n            vertical-align: top;\n            position: relative;\n        }\n        .gantt-activity-area[_ngcontent-%COMP%] {\n            position: relative;\n            overflow-x: hidden;\n            overflow-y: hidden;\n            -webkit-user-select: none;\n        }\n        .gantt-vertical-scroll[_ngcontent-%COMP%] {\n            background-color: transparent;\n            overflow-x: hidden;\n            overflow-y: scroll;\n            position: absolute;\n            right: -10px;\n            display: block;\n            top: -1px;\n            border: 1px solid #cecece;\n        }\n        .grid[_ngcontent-%COMP%] {\n            overflow-x: hidden;\n            overflow-y: hidden;\n            display: inline-block;\n            vertical-align: top;\n            border-right: 1px solid #cecece;\n        }\n        .grid-scale[_ngcontent-%COMP%] {\n            color: #6b6b6b;\n            font-size: 12px;\n            border-bottom: 1px solid #e0e0e0;\n            background-color: whitesmoke;\n        }\n        .grid-head-cell[_ngcontent-%COMP%] {\n            \n            border-top: none !important;\n            border-right: none !important;\n            line-height: inherit;\n            box-sizing: border-box;\n            display: inline-block;\n            vertical-align: top;\n            border-right: 1px solid #cecece;\n            \n            position: relative;\n            cursor: default;\n            height: 100%;\n            -moz-user-select: -moz-none;\n            -webkit-user-select: none;\n            overflow: hidden;\n        }\n        .grid-data[_ngcontent-%COMP%] {\n            overflow: hidden;\n        }\n        .grid-row[_ngcontent-%COMP%] {\n            box-sizing: border-box;\n            border-bottom: 1px solid #e0e0e0;\n            background-color: #fff;\n            position: relative;\n            -webkit-user-select: none;\n        }\n        .grid-row[_ngcontent-%COMP%]:hover {\n            background-color: #eeeeee;\n            cursor: pointer;\n        }\n        .grid-cell[_ngcontent-%COMP%] {\n            border-right: none;\n            color: #454545;\n            display: inline-block;\n            vertical-align: top;\n            padding-left: 6px;\n            padding-right: 6px;\n            height: 100%;\n            overflow: hidden;\n            white-space: nowrap;\n            font-size: 13px;\n            box-sizing: border-box;\n        }\n        .actions-bar[_ngcontent-%COMP%] {\n            \n            border-bottom: 1px solid #e0e0e0;\n            clear: both;\n            \n            height: 28px;\n            background: whitesmoke;\n            color: #494949;\n            font-family: Arial, sans-serif;\n            font-size: 13px;\n            padding-left: 15px;\n            line-height: 25px;\n        }\n        .gantt-tree-content[_ngcontent-%COMP%] {\n            padding-left: 15px;\n        }"] });
/** @nocollapse */
GanttActivityComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: GanttService }
];
GanttActivityComponent.propDecorators = {
    project: [{ type: Input }],
    options: [{ type: Input }],
    onGridRowClick: [{ type: Output }],
    onPopoverOpen: [{ type: Output }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(GanttActivityComponent, [{
        type: Component,
        args: [{
                selector: 'gantt-activity',
                template: `

    <div class="grid" #ganttGrid>
        <div class="grid-scale" [ngStyle]="setGridScaleStyle()">
            <div class="grid-head-cell"
                *ngFor="let column of gridColumns" [style.width]="column.width + 'px'"
                [style.left]="column.left + 'px'">

                <label>
                    {{column.name}}
                </label>
            </div>
        </div>
        <div class="grid-data"
            #ganttGridData
            [ngStyle]="{ 'height': ganttService.calculateGanttHeight() }">

            <div #row
                *ngFor="let data of ganttService.TASK_CACHE" class="grid-row"
                [ngStyle]="setGridRowStyle()">

                <mde-popover #appPopover="mdePopover"
                    [mdePopoverEnterDelay]="100"
                    [mdePopoverLeaveDelay]="0"
                    [mdePopoverPositionY]="'above'"
                    [mdePopoverOverlapTrigger]="false"
                    [mdePopoverDisableAnimation]="false"
                    [mdePopoverArrowWidth]="8"
                    [mdePopoverArrowColor]="'black'"
                    mdePopoverPlacement="bottom">

                    <mat-card style="max-width: 340px; padding: 3px 8px;
                        color: #ffffff;
                        text-align: center;
                        background-color: #000000;
                        border-radius: 4px;">
                        <span style="z-index: 1070;
                            display: block;
                            font-family: 'Lato','Helvetica Neue',Helvetica,Arial,sans-serif;
                            font-style: normal;
                            font-weight: normal;
                            letter-spacing: normal;
                            line-break: auto;
                            line-height: 1.42857143;
                            text-align: left;
                            text-align: start;
                            text-decoration: none;
                            text-shadow: none;
                            text-transform: none;
                            white-space: normal;
                            word-break: normal;
                            word-spacing: normal;
                            word-wrap: normal;
                            font-size: 13px;">{{data.name}}</span>
                    </mat-card>
                </mde-popover>

                <div class="grid-cell"
                    [mdePopoverTriggerFor]="appPopover"
                    [mdePopoverBackdropCloseOnClick]="false"
                    mdePopoverOffsetX="25"
                    mdePopoverOffsetY="0"
                    [ngStyle]="{ 'width': gridColumns[1].width + 'px', 'padding-left': 0 }">

                    <div class="gantt-tree-content">
                        <span [ngStyle]="{ borderLeftColor: data.color.primary, borderLeftWidth: .35 + 'em', 
                            borderLeftStyle: 'solid', paddingRight: .5 + 'em'}"></span>
                        <span>{{data.name}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="gantt-activity" #ganttActivity
        (wheel)="doWheel($event, ganttActivity)"
        (window:resize)="onResize($event)"
        [ngStyle]="{ 'height': ganttService.calculateGanttHeight() + 60, 'width': calculateColumnsWidth() }">

        <time-scale [timeScaleMonth]="ganttService.MONTH_SCALE"
            [timeScaleWeekend]="ganttService.TIME_SCALE"
            [dimensions]="dimensions"
            [scale]="options.scale"></time-scale>
        <div class="gantt-activity-area"
            #ganttActivityArea
            [ngStyle]="{ 'height': ganttService.calculateGanttHeight(), 'width': containerWidth + 36 + 'px' }">

            <activity-background [timeScale]="ganttService.TIME_SCALE"
                [tasks]="ganttService.TASK_CACHE"></activity-background>
            <activity-bars [timeScale]="ganttService.TIME_SCALE"
                [dimensions]="dimensions"
                [tasks]="ganttService.TASK_CACHE"
                (onGridRowClick)="gridRowClick($event)"
                (onPopoverOpen)="popoverOpen($event)"></activity-bars>
        </div>
    </div>
    `,
                changeDetection: ChangeDetectionStrategy.Default,
                styles: [`
        .gantt-activity {
            overflow-y: hidden;
            overflow-x: scroll;
            display: inline-block;
            vertical-align: top;
            position: relative;
        }
        .gantt-activity-area {
            position: relative;
            overflow-x: hidden;
            overflow-y: hidden;
            -webkit-user-select: none;
        }
        .gantt-vertical-scroll {
            background-color: transparent;
            overflow-x: hidden;
            overflow-y: scroll;
            position: absolute;
            right: -10px;
            display: block;
            top: -1px;
            border: 1px solid #cecece;
        }
        .grid {
            overflow-x: hidden;
            overflow-y: hidden;
            display: inline-block;
            vertical-align: top;
            border-right: 1px solid #cecece;
        }
        .grid-scale {
            color: #6b6b6b;
            font-size: 12px;
            border-bottom: 1px solid #e0e0e0;
            background-color: whitesmoke;
        }
        .grid-head-cell {
            /*color: #a6a6a6;*/
            border-top: none !important;
            border-right: none !important;
            line-height: inherit;
            box-sizing: border-box;
            display: inline-block;
            vertical-align: top;
            border-right: 1px solid #cecece;
            /*text-align: center;*/
            position: relative;
            cursor: default;
            height: 100%;
            -moz-user-select: -moz-none;
            -webkit-user-select: none;
            overflow: hidden;
        }
        .grid-data {
            overflow: hidden;
        }
        .grid-row {
            box-sizing: border-box;
            border-bottom: 1px solid #e0e0e0;
            background-color: #fff;
            position: relative;
            -webkit-user-select: none;
        }
        .grid-row:hover {
            background-color: #eeeeee;
            cursor: pointer;
        }
        .grid-cell {
            border-right: none;
            color: #454545;
            display: inline-block;
            vertical-align: top;
            padding-left: 6px;
            padding-right: 6px;
            height: 100%;
            overflow: hidden;
            white-space: nowrap;
            font-size: 13px;
            box-sizing: border-box;
        }
        .actions-bar {
            /*border-top: 1px solid #cecece;*/
            border-bottom: 1px solid #e0e0e0;
            clear: both;
            /*margin-top: 90px;*/
            height: 28px;
            background: whitesmoke;
            color: #494949;
            font-family: Arial, sans-serif;
            font-size: 13px;
            padding-left: 15px;
            line-height: 25px;
        }
        .gantt-tree-content {
            padding-left: 15px;
        }
    `]
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: GanttService }]; }, { onGridRowClick: [{
            type: Output
        }], onPopoverOpen: [{
            type: Output
        }], project: [{
            type: Input
        }], options: [{
            type: Input
        }] }); })();
if (false) {
    /** @type {?} */
    GanttActivityComponent.prototype.project;
    /** @type {?} */
    GanttActivityComponent.prototype.options;
    /** @type {?} */
    GanttActivityComponent.prototype.onGridRowClick;
    /** @type {?} */
    GanttActivityComponent.prototype.onPopoverOpen;
    /**
     * @type {?}
     * @private
     */
    GanttActivityComponent.prototype.start;
    /**
     * @type {?}
     * @private
     */
    GanttActivityComponent.prototype.end;
    /**
     * @type {?}
     * @private
     */
    GanttActivityComponent.prototype.timeScale;
    /**
     * @type {?}
     * @private
     */
    GanttActivityComponent.prototype.scale;
    /**
     * @type {?}
     * @private
     */
    GanttActivityComponent.prototype.activityContainerSizes;
    /** @type {?} */
    GanttActivityComponent.prototype.containerHeight;
    /** @type {?} */
    GanttActivityComponent.prototype.containerWidth;
    /** @type {?} */
    GanttActivityComponent.prototype.ganttActivityHeight;
    /** @type {?} */
    GanttActivityComponent.prototype.ganttActivityWidth;
    /** @type {?} */
    GanttActivityComponent.prototype.dimensions;
    /** @type {?} */
    GanttActivityComponent.prototype.gridColumns;
    /** @type {?} */
    GanttActivityComponent.prototype.elem;
    /** @type {?} */
    GanttActivityComponent.prototype.ganttService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GanttTimeScaleComponent {
    /**
     * @param {?} ganttService
     */
    constructor(ganttService) {
        this.ganttService = ganttService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    setTimescaleStyle() {
        return {
            'width': (this.dimensions.width + 36) + 'px'
        };
    }
    /**
     * @param {?} borderTop
     * @return {?}
     */
    setTimescaleMonthLineStyle(borderTop) {
        return {
            'height': this.ganttService.rowHeight + 'px',
            'line-height': this.ganttService.rowHeight + 'px',
            'position': 'relative',
            'border-top': borderTop
        };
    }
    /**
     * @return {?}
     */
    setTimescaleMonthCellStyle() {
        return {
            'width': this.ganttService.cellWidth + 'px'
        };
    }
    /**
     * @param {?} borderTop
     * @return {?}
     */
    setTimescaleWeekendLineStyle(borderTop) {
        return {
            'height': this.ganttService.rowHeight + 'px',
            'line-height': this.ganttService.rowHeight + 'px',
            'position': 'relative',
            'border-top': borderTop
        };
    }
    /**
     * @return {?}
     */
    setTimescaleWeekendCellStyle() {
        return {
            'width': this.ganttService.cellWidth + 'px'
        };
    }
    /**
     * @param {?} date
     * @return {?}
     */
    isDayWeekend(date) {
        return this.ganttService.isDayWeekend(date);
    }
}
GanttTimeScaleComponent.ɵfac = function GanttTimeScaleComponent_Factory(t) { return new (t || GanttTimeScaleComponent)(ɵngcc0.ɵɵdirectiveInject(GanttService)); };
GanttTimeScaleComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: GanttTimeScaleComponent, selectors: [["time-scale"]], inputs: { timeScaleMonth: "timeScaleMonth", timeScaleWeekend: "timeScaleWeekend", dimensions: "dimensions", scale: "scale" }, features: [ɵngcc0.ɵɵProvidersFeature([
            GanttService
        ])], decls: 5, vars: 5, consts: [[1, "time-scale", 3, "ngStyle"], [1, "time-scale-line", 3, "ngStyle"], ["class", "time-scale-cell", 3, "ngClass", "ngStyle", 4, "ngFor", "ngForOf"], [1, "time-scale-cell", 3, "ngClass", "ngStyle"]], template: function GanttTimeScaleComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵelementStart(1, "div", 1);
        ɵngcc0.ɵɵtemplate(2, GanttTimeScaleComponent_div_2_Template, 3, 6, "div", 2);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(3, "div", 1);
        ɵngcc0.ɵɵtemplate(4, GanttTimeScaleComponent_div_4_Template, 2, 3, "div", 2);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngStyle", ctx.setTimescaleStyle());
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngStyle", ctx.setTimescaleWeekendLineStyle("none"));
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.timeScaleWeekend);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngStyle", ctx.setTimescaleWeekendLineStyle("none"));
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.timeScaleWeekend);
    } }, directives: [ɵngcc1.NgStyle, ɵngcc1.NgForOf, ɵngcc1.NgClass], pipes: [ɵngcc1.DatePipe], styles: [".weekend[_ngcontent-%COMP%] {\n            background-color: whitesmoke;\n        }\n        .time-scale[_ngcontent-%COMP%] {\n            font-size: 12px;\n            background-color: #fff;\n            border-bottom: 1px solid #cecece;\n        }\n        .time-scale-line[_ngcontent-%COMP%] {\n            box-sizing: border-box;\n            border-bottom: 1px solid #cecece;\n        }\n        .time-scale-line[_ngcontent-%COMP%]:first-child {\n            border-top: none;\n        }\n        .time-scale-cell[_ngcontent-%COMP%] {\n            display: inline-block;\n            white-space: nowrap;\n            overflow: hidden;\n            border-right: 1px solid #cecece;\n            text-align: center;\n            height: 100%;\n        }"] });
/** @nocollapse */
GanttTimeScaleComponent.ctorParameters = () => [
    { type: GanttService }
];
GanttTimeScaleComponent.propDecorators = {
    timeScaleMonth: [{ type: Input }],
    timeScaleWeekend: [{ type: Input }],
    dimensions: [{ type: Input }],
    scale: [{ type: Input }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(GanttTimeScaleComponent, [{
        type: Component,
        args: [{
                selector: 'time-scale',
                template: `
        <div class="time-scale" [ngStyle]="setTimescaleStyle()">
            <!--<div class="time-scale-line" [ngStyle]="setTimescaleMonthLineStyle('none')">
                <div class="time-scale-cell" *ngFor="let scale of timeScaleMonth; let i = index"
                    [ngClass]="(i % 2) ? 'weekend' : ''" [style.width.px]="scale.width">{{scale.start | date: 'dd-MM'}}</div>
            </div>-->
            <div class="time-scale-line" [ngStyle]="setTimescaleWeekendLineStyle('none')">
                <div class="time-scale-cell" *ngFor="let date of timeScaleWeekend; let i = index"
                    [ngClass]="(i % 2) ? 'weekend' : ''" [ngStyle]="setTimescaleWeekendCellStyle()">{{date | date: 'dd-MM'}}</div>
            </div>
            <div class="time-scale-line" [ngStyle]="setTimescaleWeekendLineStyle('none')">
                <div class="time-scale-cell" *ngFor="let date of timeScaleWeekend; let i = index"
                [ngClass]="(i % 2) ? 'weekend' : ''" [ngStyle]="setTimescaleWeekendCellStyle()">{{i + 1}}</div>
            </div>
        </div>`,
                providers: [
                    GanttService
                ],
                styles: [`
        .weekend {
            background-color: whitesmoke;
        }
        .time-scale {
            font-size: 12px;
            background-color: #fff;
            border-bottom: 1px solid #cecece;
        }
        .time-scale-line {
            box-sizing: border-box;
            border-bottom: 1px solid #cecece;
        }
        .time-scale-line:first-child {
            border-top: none;
        }
        .time-scale-cell {
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            border-right: 1px solid #cecece;
            text-align: center;
            height: 100%;
        }`]
            }]
    }], function () { return [{ type: GanttService }]; }, { timeScaleMonth: [{
            type: Input
        }], timeScaleWeekend: [{
            type: Input
        }], dimensions: [{
            type: Input
        }], scale: [{
            type: Input
        }] }); })();
if (false) {
    /** @type {?} */
    GanttTimeScaleComponent.prototype.timeScaleMonth;
    /** @type {?} */
    GanttTimeScaleComponent.prototype.timeScaleWeekend;
    /** @type {?} */
    GanttTimeScaleComponent.prototype.dimensions;
    /** @type {?} */
    GanttTimeScaleComponent.prototype.scale;
    /** @type {?} */
    GanttTimeScaleComponent.prototype.ganttService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GanttActivityBackgroundComponent {
    /**
     * @param {?} ganttService
     */
    constructor(ganttService) {
        this.ganttService = ganttService;
        this.rows = [];
        this.cells = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.drawGrid();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    isDayWeekend(date) {
        return this.ganttService.isDayWeekend(date);
    }
    /**
     * @return {?}
     */
    setRowStyle() {
        return {
            'height': this.ganttService.rowHeight + 'px'
        };
    }
    /**
     * @return {?}
     */
    setCellStyle() {
        return {
            'width': this.ganttService.cellWidth + 'px'
        };
    }
    /**
     * @private
     * @return {?}
     */
    drawGrid() {
        this.cells = this.timeScale;
    }
}
GanttActivityBackgroundComponent.ɵfac = function GanttActivityBackgroundComponent_Factory(t) { return new (t || GanttActivityBackgroundComponent)(ɵngcc0.ɵɵdirectiveInject(GanttService)); };
GanttActivityBackgroundComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: GanttActivityBackgroundComponent, selectors: [["activity-background"]], viewQuery: function GanttActivityBackgroundComponent_Query(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵviewQuery(_c5, true);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.bg = _t.first);
    } }, inputs: { tasks: "tasks", timeScale: "timeScale" }, decls: 3, vars: 1, consts: [[1, "gantt-activity-bg"], ["bg", ""], ["class", "gantt-activity-row", 3, "ngStyle", 4, "ngFor", "ngForOf"], [1, "gantt-activity-row", 3, "ngStyle"], ["class", "gantt-activity-cell", 3, "ngStyle", "ngClass", 4, "ngFor", "ngForOf"], [1, "gantt-activity-cell", 3, "ngStyle", "ngClass"]], template: function GanttActivityBackgroundComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0, 1);
        ɵngcc0.ɵɵtemplate(2, GanttActivityBackgroundComponent_div_2_Template, 2, 2, "div", 2);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.tasks);
    } }, directives: [ɵngcc1.NgForOf, ɵngcc1.NgStyle, ɵngcc1.NgClass], styles: [".weekend[_ngcontent-%COMP%] {\n            background-color: whitesmoke;\n        }\n        .gantt-activity-bg[_ngcontent-%COMP%] {\n            overflow: hidden;\n        }\n        .gantt-activity-row[_ngcontent-%COMP%] {\n            border-bottom: 1px solid #ebebeb;\n            background-color: #fff;\n            box-sizing: border-box;\n        }\n        .gantt-activity-cell[_ngcontent-%COMP%] {\n            display: inline-block;\n            height: 100%;\n            border-right: 1px solid #ebebeb;\n        }"] });
/** @nocollapse */
GanttActivityBackgroundComponent.ctorParameters = () => [
    { type: GanttService }
];
GanttActivityBackgroundComponent.propDecorators = {
    tasks: [{ type: Input }],
    timeScale: [{ type: Input }],
    bg: [{ type: ViewChild, args: ['bg',] }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(GanttActivityBackgroundComponent, [{
        type: Component,
        args: [{
                selector: 'activity-background',
                template: `
    <div #bg class="gantt-activity-bg">
        <div class="gantt-activity-row"
            [ngStyle]="setRowStyle()"
            *ngFor="let row of tasks">

            <div class="gantt-activity-cell"
                [ngStyle]="setCellStyle()"
                *ngFor="let cell of cells; let i = index; let l = last" [ngClass]="(i % 2) ? 'weekend' : ''" ></div>
        </div>
    </div>
    `,
                styles: [`
        .weekend {
            background-color: whitesmoke;
        }
        .gantt-activity-bg {
            overflow: hidden;
        }
        .gantt-activity-row {
            border-bottom: 1px solid #ebebeb;
            background-color: #fff;
            box-sizing: border-box;
        }
        .gantt-activity-cell {
            display: inline-block;
            height: 100%;
            border-right: 1px solid #ebebeb;
        }
    `]
            }]
    }], function () { return [{ type: GanttService }]; }, { tasks: [{
            type: Input
        }], timeScale: [{
            type: Input
        }], bg: [{
            type: ViewChild,
            args: ['bg']
        }] }); })();
if (false) {
    /** @type {?} */
    GanttActivityBackgroundComponent.prototype.tasks;
    /** @type {?} */
    GanttActivityBackgroundComponent.prototype.timeScale;
    /** @type {?} */
    GanttActivityBackgroundComponent.prototype.bg;
    /** @type {?} */
    GanttActivityBackgroundComponent.prototype.rows;
    /** @type {?} */
    GanttActivityBackgroundComponent.prototype.cells;
    /** @type {?} */
    GanttActivityBackgroundComponent.prototype.ganttService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GanttActivityBarsComponent {
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
        ɵngcc0.ɵɵproperty("ngStyle", ɵngcc0.ɵɵpureFunction2(2, _c4, ctx.containerHeight + "px", ctx.containerWidth + "px"));
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GanttActivityModule {
}
GanttActivityModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: GanttActivityModule });
GanttActivityModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function GanttActivityModule_Factory(t) { return new (t || GanttActivityModule)(); }, providers: [], imports: [[CommonModule, MatCardModule, MdePopoverModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(GanttActivityModule, { declarations: function () { return [GanttActivityComponent,
        GanttTimeScaleComponent,
        GanttActivityBackgroundComponent,
        GanttActivityBarsComponent]; }, imports: function () { return [CommonModule, MatCardModule, MdePopoverModule]; }, exports: function () { return [GanttActivityComponent,
        GanttTimeScaleComponent,
        GanttActivityBackgroundComponent,
        GanttActivityBarsComponent]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(GanttActivityModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, MatCardModule, MdePopoverModule],
                exports: [
                    GanttActivityComponent,
                    GanttTimeScaleComponent,
                    GanttActivityBackgroundComponent,
                    GanttActivityBarsComponent,
                ],
                declarations: [
                    GanttActivityComponent,
                    GanttTimeScaleComponent,
                    GanttActivityBackgroundComponent,
                    GanttActivityBarsComponent,
                ],
                providers: []
            }]
    }], null, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GanttModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: GanttModule,
        };
    }
}
GanttModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: GanttModule });
GanttModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function GanttModule_Factory(t) { return new (t || GanttModule)(); }, providers: [GanttService], imports: [[CommonModule, FormsModule, GanttActivityModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(GanttModule, { declarations: function () { return [GanttComponent,
        GanttHeaderComponent,
        GanttFooterComponent]; }, imports: function () { return [CommonModule, FormsModule,
        GanttActivityModule]; }, exports: function () { return [GanttComponent]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(GanttModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, FormsModule, GanttActivityModule],
                exports: [GanttComponent],
                declarations: [GanttComponent, GanttHeaderComponent, GanttFooterComponent],
                providers: [GanttService],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }]
    }], null, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { GanttComponent, GanttModule, GanttService as ɵa, GanttActivityModule as ɵb, GanttActivityComponent as ɵc, GanttTimeScaleComponent as ɵd, GanttActivityBackgroundComponent as ɵe, GanttActivityBarsComponent as ɵf, GanttHeaderComponent as ɵg, GanttFooterComponent as ɵh };

//# sourceMappingURL=angular-gantt.js.map