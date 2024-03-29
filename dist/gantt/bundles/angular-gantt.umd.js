(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('@angular/core'),require('@angular/common'),require('@material-extended/mde'),require('@angular/material/card'),require('@angular/forms'),exports, require('@angular/core'), require('@angular/common'), require('@angular/forms'), require('@angular/material/card'), require('@material-extended/mde')) :
    typeof define === 'function' && define.amd ? define('angular-gantt', ['@angular/core','@angular/common','@material-extended/mde','@angular/material/card','@angular/forms','exports', '@angular/core', '@angular/common', '@angular/forms', '@angular/material/card', '@material-extended/mde'], factory) :
    (global = global || self, factory(global.ng.core,global.ng.common,global.materialExtended.mde,global.ng.material.card,global.ng.forms,global['angular-gantt'] = {}, global.ng.core, global.ng.common, global.ng.forms, global.ng.material.card, global.mde));
}(this, (function (ɵngcc0,ɵngcc1,ɵngcc2,ɵngcc3,ɵngcc4,exports, core, common, forms, card, mde) { 
var _c0 = function () { return { "width": "100%" }; };
function GanttActivityComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 14);
    ɵngcc0.ɵɵelementStart(1, "label");
    ɵngcc0.ɵɵtext(2);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var column_r6 = ctx.$implicit;
    ɵngcc0.ɵɵstyleProp("width", column_r6.width + "px")("left", column_r6.left + "px");
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate1(" ", column_r6.name, " ");
} }
var _c1 = function (a0) { return { "width": a0, "padding-left": 0 }; };
var _c2 = function (a0, a1, a3) { return { borderLeftColor: a0, borderLeftWidth: a1, borderLeftStyle: "solid", paddingRight: a3 }; };
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
    var data_r7 = ctx.$implicit;
    var _r9 = ɵngcc0.ɵɵreference(3);
    var ctx_r3 = ɵngcc0.ɵɵnextContext();
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
var _c3 = function (a0) { return { "height": a0 }; };
var _c4 = function (a0, a1) { return { "height": a0, "width": a1 }; };
function GanttTimeScaleComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 3);
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵpipe(2, "date");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var date_r2 = ctx.$implicit;
    var i_r3 = ctx.index;
    var ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", i_r3 % 2 ? "weekend" : "")("ngStyle", ctx_r0.setTimescaleWeekendCellStyle());
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(ɵngcc0.ɵɵpipeBind2(2, 3, date_r2, "dd-MM"));
} }
function GanttTimeScaleComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 3);
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var i_r5 = ctx.index;
    var ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", i_r5 % 2 ? "weekend" : "")("ngStyle", ctx_r1.setTimescaleWeekendCellStyle());
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(i_r5 + 1);
} }
var _c5 = ["bg"];
function GanttActivityBackgroundComponent_div_2_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "div", 5);
} if (rf & 2) {
    var i_r5 = ctx.index;
    var ctx_r3 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("ngStyle", ctx_r3.setCellStyle())("ngClass", i_r5 % 2 ? "weekend" : "");
} }
function GanttActivityBackgroundComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 3);
    ɵngcc0.ɵɵtemplate(1, GanttActivityBackgroundComponent_div_2_div_1_Template, 1, 2, "div", 4);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngStyle", ctx_r1.setRowStyle());
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngForOf", ctx_r1.cells);
} }
function GanttActivityBarsComponent_div_1_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
var _c6 = function (a0) { return { task: a0 }; };
function GanttActivityBarsComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    var _r10 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 3, 4);
    ɵngcc0.ɵɵlistener("click", function GanttActivityBarsComponent_div_1_Template_div_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r10); var task_r3 = ctx.$implicit; var ctx_r9 = ɵngcc0.ɵɵnextContext(); return ctx_r9.gridRowClicked(task_r3); });
    ɵngcc0.ɵɵelementStart(2, "div", 5, 6);
    ɵngcc0.ɵɵlistener("opened", function GanttActivityBarsComponent_div_1_Template_div_opened_2_listener() { ɵngcc0.ɵɵrestoreView(_r10); var task_r3 = ctx.$implicit; var ctx_r11 = ɵngcc0.ɵɵnextContext(); return ctx_r11.popoverOpened(task_r3); });
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
    var task_r3 = ctx.$implicit;
    var i_r4 = ctx.index;
    var _r7 = ɵngcc0.ɵɵreference(5);
    var ctx_r0 = ɵngcc0.ɵɵnextContext();
    var _r1 = ɵngcc0.ɵɵreference(3);
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
    var data_r12 = ɵngcc0.ɵɵnextContext(2).task;
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("innerHTML", data_r12.description, ɵngcc0.ɵɵsanitizeHtml);
} }
var _c7 = function (a0) { return { borderBottomColor: a0, borderBottomWidth: ".25em", borderBottomStyle: "solid" }; };
var _c8 = function (a0) { return { borderColor: a0 }; };
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
    var data_r12 = ɵngcc0.ɵɵnextContext().task;
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
    var data_r12 = ctx.task;
    ɵngcc0.ɵɵproperty("ngIf", data_r12);
} }
'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
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
    var GanttConfig = /** @class */ (function () {
        function GanttConfig() {
            this.cellWidth = 38;
            this.rowHeight = 30;
            this.activityHeight = 420;
            this.barHeight = 25;
            this.barLineHeight = 35;
            this.barMoveable = false;
        }
GanttConfig.ɵfac = function GanttConfig_Factory(t) { return new (t || GanttConfig)(); };
GanttConfig.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: GanttConfig, factory: function (t) { return GanttConfig.ɵfac(t); } });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(GanttConfig, [{
        type: core.Injectable
    }], function () { return []; }, null); })();
        return GanttConfig;
    }());
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
    var GanttService = /** @class */ (function () {
        function GanttService() {
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
            var ganttConfig = new GanttConfig();
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
        GanttService.prototype.calculateBarWidth = /**
         * @private
         * @param {?} start
         * @param {?} end
         * @return {?}
         */
        function (start, end) {
            if (typeof start === 'string') {
                start = new Date(start);
            }
            if (typeof end === 'string') {
                end = new Date(end);
            }
            /** @type {?} */
            var days = this.calculateDiffDays(start, end);
            /** @type {?} */
            var width = (days * this.cellWidth + days) / 7;
            return width;
        };
        /**
         * @private
         * @param {?} start
         * @param {?} scale
         * @return {?}
         */
        GanttService.prototype.calculateBarLeft = /**
         * @private
         * @param {?} start
         * @param {?} scale
         * @return {?}
         */
        function (start, scale) {
            /** @type {?} */
            var left = 0;
            if (start != null) {
                if (typeof start === 'string') {
                    start = new Date();
                }
                for (var i = 0; i < scale.length; i++) {
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
        };
        /** Calculates the height of the gantt grid, activity and vertical scroll */
        /**
         * Calculates the height of the gantt grid, activity and vertical scroll
         * @return {?}
         */
        GanttService.prototype.calculateGanttHeight = /**
         * Calculates the height of the gantt grid, activity and vertical scroll
         * @return {?}
         */
        function () {
            return this.TASK_CACHE.length * this.rowHeight + "px";
        };
        /**
         * @private
         * @param {?} start
         * @return {?}
         */
        GanttService.prototype.calculateBarLeftDelta = /**
         * @private
         * @param {?} start
         * @return {?}
         */
        function (start) {
            /** @type {?} */
            var offset = 0;
            /** @type {?} */
            var hoursInDay = 24;
            /** @type {?} */
            var minutesInHour = 60;
            /** @type {?} */
            var secondsInHour = 3600;
            /** @type {?} */
            var startHours = (start.getHours() + start.getMinutes() / minutesInHour + start.getSeconds() / secondsInHour);
            offset = this.cellWidth / hoursInDay * startHours;
            return offset;
        };
        /** Calculate the bar styles */
        /**
         * Calculate the bar styles
         * @param {?} task
         * @param {?} index
         * @param {?} scale
         * @return {?}
         */
        GanttService.prototype.calculateBar = /**
         * Calculate the bar styles
         * @param {?} task
         * @param {?} index
         * @param {?} scale
         * @return {?}
         */
        function (task, index, scale) {
            /** @type {?} */
            var barStyle = this.getBarStyle(task.color);
            return {
                'top': this.barTop * index + 2 + 'px',
                'left': this.calculateBarLeft(task.start, scale) + 'px',
                'height': this.barHeight + 'px',
                'line-height': this.barLineHeight + 'px',
                'width': this.calculateBarWidth(task.start, task.end) + 'px',
                'background-color': barStyle["background-color"],
                'border-left': barStyle["border-left"]
            };
        };
        /** Get the bar style based on task status */
        /**
         * Get the bar style based on task status
         * @private
         * @param {?} color
         * @return {?}
         */
        GanttService.prototype.getBarStyle = /**
         * Get the bar style based on task status
         * @private
         * @param {?} color
         * @return {?}
         */
        function (color) {
            /** @type {?} */
            var style = {};
            style["background-color"] = color.secondary;
            style["border-left"] = "5px solid " + color.primary;
            return style;
        };
        /** Calculates the difference in two dates and returns number of days */
        /**
         * Calculates the difference in two dates and returns number of days
         * @param {?} start
         * @param {?} end
         * @return {?}
         */
        GanttService.prototype.calculateDiffDays = /**
         * Calculates the difference in two dates and returns number of days
         * @param {?} start
         * @param {?} end
         * @return {?}
         */
        function (start, end) {
            try {
                /** @type {?} */
                var oneDay = 24 * 60 * 60 * 1000;
                // hours*minutes*seconds*milliseconds /ms
                /** @type {?} */
                var diffDays = Math.abs((start.getTime() - end.getTime()) / (oneDay));
                /** @type {?} */
                var days = diffDays;
                return days;
            }
            catch (err) {
                return 0;
            }
        };
        /** Calculate the gantt scale range given the start and end date of tasks*/
        /**
         * Calculate the gantt scale range given the start and end date of tasks
         * @param {?=} start
         * @param {?=} end
         * @return {?}
         */
        GanttService.prototype.calculateScale = /**
         * Calculate the gantt scale range given the start and end date of tasks
         * @param {?=} start
         * @param {?=} end
         * @return {?}
         */
        function (start, end) {
            if (start === void 0) { start = new Date(); }
            if (end === void 0) { end = this.addDays(start, 7); }
            /** @type {?} */
            var scale = [];
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
        };
        /**
         * @param {?=} start
         * @param {?=} end
         * @return {?}
         */
        GanttService.prototype.calculateMonthScale = /**
         * @param {?=} start
         * @param {?=} end
         * @return {?}
         */
        function (start, end) {
            if (start === void 0) { start = new Date(); }
            if (end === void 0) { end = this.addDays(start, 7); }
            /** @type {?} */
            var scale = [];
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
        };
        /** Determines whether given date is a weekend */
        /**
         * Determines whether given date is a weekend
         * @param {?} date
         * @return {?}
         */
        GanttService.prototype.isDayWeekend = /**
         * Determines whether given date is a weekend
         * @param {?} date
         * @return {?}
         */
        function (date) {
            /** @type {?} */
            var day = date.getDay();
            if (day === 6 || day === 0) {
                return true;
            }
            return false;
        };
        /** Add x number of days to a date object */
        /**
         * Add x number of days to a date object
         * @param {?} date
         * @param {?} days
         * @return {?}
         */
        GanttService.prototype.addDays = /**
         * Add x number of days to a date object
         * @param {?} date
         * @param {?} days
         * @return {?}
         */
        function (date, days) {
            /** @type {?} */
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        };
        //** Remove x number of days from a date object */
        //** Remove x number of days from a date object */
        /**
         * @param {?} date
         * @param {?} days
         * @return {?}
         */
        GanttService.prototype.removeDays = 
        //** Remove x number of days from a date object */
        /**
         * @param {?} date
         * @param {?} days
         * @return {?}
         */
        function (date, days) {
            /** @type {?} */
            var result = new Date(date);
            result.setDate(result.getDate() - days);
            return result;
        };
        /** Calculates the grid scale for gantt based on tasks start and end dates */
        /**
         * Calculates the grid scale for gantt based on tasks start and end dates
         * @param {?} tasks
         * @return {?}
         */
        GanttService.prototype.calculateGridScale = /**
         * Calculates the grid scale for gantt based on tasks start and end dates
         * @param {?} tasks
         * @return {?}
         */
        function (tasks) {
            /** @type {?} */
            var start;
            /** @type {?} */
            var end;
            /** @type {?} */
            var dates = tasks.map(function (task) {
                return {
                    start: new Date(task.start),
                    end: new Date(task.end)
                };
            });
            start = new Date(Math.min.apply(null, dates.map(function (t) {
                return t.start;
            })));
            end = new Date(Math.max.apply(null, dates.map(function (t) {
                return t.end;
            })));
            return {
                start: start,
                end: end
            };
        };
        /**
         * @param {?} element
         * @param {?} attribute
         * @return {?}
         */
        GanttService.prototype.getComputedStyle = /**
         * @param {?} element
         * @param {?} attribute
         * @return {?}
         */
        function (element, attribute) {
            return parseInt(document.defaultView.getComputedStyle(element)[attribute], 10);
        };
        //TODO(dale): determine whether this is needed
        //TODO(dale): determine whether this is needed
        /**
         * @return {?}
         */
        GanttService.prototype.calculateContainerWidth = 
        //TODO(dale): determine whether this is needed
        /**
         * @return {?}
         */
        function () {
            this.windowInnerWidth = window.innerWidth;
            /** @type {?} */
            var containerWidth = this.gridWidth - 18;
            return containerWidth;
        };
        /**
         * @return {?}
         */
        GanttService.prototype.calculateContainerHeight = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var containerHeight = (innerHeight - 18);
            return containerHeight;
        };
        /**
         * @return {?}
         */
        GanttService.prototype.calculateActivityContainerDimensions = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var scrollWidth = 18;
            this.windowInnerWidth = window.innerWidth;
            /** @type {?} */
            var width = window.innerWidth - this.gridWidth - scrollWidth;
            return { height: this.activityHeight, width: width };
        };
        /**
         * @param {?} elem
         * @return {?}
         */
        GanttService.prototype.calculateGanttActivityWidth = /**
         * @param {?} elem
         * @return {?}
         */
        function (elem) {
            return "calc(100% - " + (elem.offsetWidth + 1) + "px)";
        };
        /**
         * @param {?} elem
         * @return {?}
         */
        GanttService.prototype.calculateGanttActivityHeight = /**
         * @param {?} elem
         * @return {?}
         */
        function (elem) {
            return elem.offsetHeight + "px";
        };
        /**
         * @param {?} minDate
         * @param {?} maxDate
         * @return {?}
         */
        GanttService.prototype.calculateCellMonthWidth = /**
         * @param {?} minDate
         * @param {?} maxDate
         * @return {?}
         */
        function (minDate, maxDate) {
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
        };
        /**
         * @private
         * @param {?} start
         * @param {?} end
         * @return {?}
         */
        GanttService.prototype.calculateDiffMonths = /**
         * @private
         * @param {?} start
         * @param {?} end
         * @return {?}
         */
        function (start, end) {
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
        };
        /** Set the vertical scroll top positions for gantt */
        /**
         * Set the vertical scroll top positions for gantt
         * @param {?} verticalScrollElem
         * @param {?} ganttGridElem
         * @param {?} ganttActivityAreaElem
         * @return {?}
         */
        GanttService.prototype.scrollTop = /**
         * Set the vertical scroll top positions for gantt
         * @param {?} verticalScrollElem
         * @param {?} ganttGridElem
         * @param {?} ganttActivityAreaElem
         * @return {?}
         */
        function (verticalScrollElem, ganttGridElem, ganttActivityAreaElem) {
            /** @type {?} */
            var verticalScrollTop = verticalScrollElem.scrollTop;
            /** @type {?} */
            var scroll = this.setScrollTop;
            // debounce
            if (verticalScrollTop !== null && verticalScrollTop !== undefined) {
                scroll(verticalScrollTop, ganttActivityAreaElem);
                scroll(ganttActivityAreaElem.scrollTop, ganttGridElem);
            }
        };
        /** Group data by id , only supports one level*/
        /**
         * Group data by id , only supports one level
         * @param {?} tasks
         * @return {?}
         */
        GanttService.prototype.groupData = /**
         * Group data by id , only supports one level
         * @param {?} tasks
         * @return {?}
         */
        function (tasks) {
            return tasks;
        };
        /** Checks whether any new data needs to be added to task cache  */
        /**
         * Checks whether any new data needs to be added to task cache
         * @param {?} tasks
         * @param {?} scale
         * @return {?}
         */
        GanttService.prototype.doTaskCheck = /**
         * Checks whether any new data needs to be added to task cache
         * @param {?} tasks
         * @param {?} scale
         * @return {?}
         */
        function (tasks, scale) {
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
        };
        /** Set a id prefix so CSS3 query selector can work with ids that contain numbers */
        /**
         * Set a id prefix so CSS3 query selector can work with ids that contain numbers
         * @param {?} id
         * @return {?}
         */
        GanttService.prototype.setIdPrefix = /**
         * Set a id prefix so CSS3 query selector can work with ids that contain numbers
         * @param {?} id
         * @return {?}
         */
        function (id) {
            return "_" + id;
        };
        // /** Remove the id prefix to allow querying of data */
        // public removeIdPrefix(id: string): string {
        //     return id.substring(1, id.length - 1);
        // }
        /** Set the scroll top property of a native DOM element */
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
        GanttService.prototype.setScrollTop = 
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
        function (scrollTop, element) {
            if (element !== null && element !== undefined) {
                element.scrollTop = scrollTop;
            }
        };
        /** @nocollapse */
        GanttService.ctorParameters = function () { return []; };
GanttService.ɵfac = function GanttService_Factory(t) { return new (t || GanttService)(); };
GanttService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: GanttService, factory: function (t) { return GanttService.ɵfac(t); } });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(GanttService, [{
        type: core.Injectable
    }], function () { return []; }, null); })();
        return GanttService;
    }());
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
    var GanttComponent = /** @class */ (function () {
        function GanttComponent(ganttService) {
            this.ganttService = ganttService;
            this.onGridRowClick = new core.EventEmitter();
            this.onPopoverOpen = new core.EventEmitter();
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
            project: [{ type: core.Input }],
            options: [{ type: core.Input }],
            onGridRowClick: [{ type: core.Output }],
            onPopoverOpen: [{ type: core.Output }]
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
    } }, directives: function () { return [ɵngcc1.NgStyle, GanttActivityComponent]; }, styles: [".gantt-container[_ngcontent-%COMP%] {\n            font-family: Arial;\n            font-size: 13px;\n            border: 1px solid #cecece;\n            position: relative;\n            white-space: nowrap;\n            margin-top: 0px;\n        }"] });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(GanttComponent, [{
        type: core.Component,
        args: [{
                selector: 'gantt',
                template: "\n        <div [ngStyle]=\"{ 'width': '100%' }\">\n            <div class=\"gantt-container\" (window:resize)=\"onResize($event)\">\n                <!--<gantt-header [name]=\"_project.name\" [startDate]=\"_project.startDate\"></gantt-header>-->\n                <gantt-activity [project]=\"_project\" [options]=\"_options\" (onGridRowClick)=\"gridRowClicked($event)\" (onPopoverOpen)=\"popoverOpened($event)\"></gantt-activity>\n                <!--<gantt-footer [project]=\"_project\"></gantt-footer>-->\n            </div>\n        </div>\n    ",
                providers: [],
                styles: ["\n        .gantt-container {\n            font-family: Arial;\n            font-size: 13px;\n            border: 1px solid #cecece;\n            position: relative;\n            white-space: nowrap;\n            margin-top: 0px;\n        }\n    "]
            }]
    }], function () { return [{ type: GanttService }]; }, { onGridRowClick: [{
            type: core.Output
        }], onPopoverOpen: [{
            type: core.Output
        }], project: [{
            type: core.Input
        }], options: [{
            type: core.Input
        }] }); })();
        return GanttComponent;
    }());
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
    var GanttHeaderComponent = /** @class */ (function () {
        function GanttHeaderComponent() {
        }
        GanttHeaderComponent.propDecorators = {
            name: [{ type: core.Input }],
            startDate: [{ type: core.Input }]
        };
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
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(GanttHeaderComponent, [{
        type: core.Component,
        args: [{
                selector: 'gantt-header',
                template: "\n        <div class=\"gantt-header\">\n            <div class=\"gantt-header-title\">\n                <div style=\"flex:1\">{{ name }}</div>\n                <div>Started: {{ startDate | date: 'medium'}}</div>\n            </div>\n        </div>\n    ",
                styles: ["\n        .gantt-header {\n            background-color: whitesmoke;\n            height: 40px;\n            border-bottom: 1px solid #e0e0e0;\n        }\n        .gantt-header-title {\n            padding: 12px;\n            display: flex;\n            flex-wrap:wrap;\n            font-family: Arial, Helvetica, sans-serif;\n            font-size: 16px;\n        }\n        .gantt-header-actions {\n            display: inline;\n            float: right;\n            padding: 6px;\n        }\n    "]
            }]
    }], function () { return []; }, { name: [{
            type: core.Input
        }], startDate: [{
            type: core.Input
        }] }); })();
        return GanttHeaderComponent;
    }());
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
    var GanttFooterComponent = /** @class */ (function () {
        function GanttFooterComponent() {
        }
        /** @nocollapse */
        GanttFooterComponent.ctorParameters = function () { return []; };
        GanttFooterComponent.propDecorators = {
            project: [{ type: core.Input }]
        };
GanttFooterComponent.ɵfac = function GanttFooterComponent_Factory(t) { return new (t || GanttFooterComponent)(); };
GanttFooterComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: GanttFooterComponent, selectors: [["gantt-footer"]], inputs: { project: "project" }, decls: 1, vars: 0, consts: [[1, "gantt-footer"]], template: function GanttFooterComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelement(0, "div", 0);
    } }, styles: [".gantt-footer[_ngcontent-%COMP%] {\n            background-color: whitesmoke;\n            height: 36px;\n            border-top: 1px solid #e0e0e0;\n        }\n        .gantt-footer-actions[_ngcontent-%COMP%] {\n            float: right;\n        }"] });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(GanttFooterComponent, [{
        type: core.Component,
        args: [{
                selector: 'gantt-footer',
                template: "<div class=\"gantt-footer\"></div>",
                styles: ["\n        .gantt-footer {\n            background-color: whitesmoke;\n            height: 36px;\n            border-top: 1px solid #e0e0e0;\n        }\n        .gantt-footer-actions {\n            float: right;\n        }\n    "]
            }]
    }], function () { return []; }, { project: [{
            type: core.Input
        }] }); })();
        return GanttFooterComponent;
    }());
    if (false) {
        /** @type {?} */
        GanttFooterComponent.prototype.project;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var GanttActivityComponent = /** @class */ (function () {
        function GanttActivityComponent(elem, ganttService) {
            this.elem = elem;
            this.ganttService = ganttService;
            this.onGridRowClick = new core.EventEmitter();
            this.onPopoverOpen = new core.EventEmitter();
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
        GanttActivityComponent.prototype.doWheel = /**
         * @param {?} event
         * @param {?} elem
         * @return {?}
         */
        function (event, elem) {
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
        };
        /**
         * @return {?}
         */
        GanttActivityComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
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
        };
        /** Custom model check */
        /**
         * Custom model check
         * @return {?}
         */
        GanttActivityComponent.prototype.ngDoCheck = /**
         * Custom model check
         * @return {?}
         */
        function () {
            // do a check to see whether any new tasks have been added. If the task is a child then push into array if tree expanded?
            this.ganttService.doTaskCheck(this.project.tasks, this.options.scale);
        };
        /** On vertical scroll set the scroll top of grid and activity  */
        /**
         * On vertical scroll set the scroll top of grid and activity
         * @param {?} verticalScroll
         * @param {?} ganttGrid
         * @param {?} ganttActivityArea
         * @return {?}
         */
        GanttActivityComponent.prototype.onVerticalScroll = /**
         * On vertical scroll set the scroll top of grid and activity
         * @param {?} verticalScroll
         * @param {?} ganttGrid
         * @param {?} ganttActivityArea
         * @return {?}
         */
        function (verticalScroll, ganttGrid, ganttActivityArea) {
            this.ganttService.scrollTop(verticalScroll, ganttGrid, ganttActivityArea);
        };
        /**
         * @param {?} task
         * @return {?}
         */
        GanttActivityComponent.prototype.gridRowClick = /**
         * @param {?} task
         * @return {?}
         */
        function (task) {
            try {
                this.onGridRowClick.emit(task);
            }
            catch (err) { }
        };
        /**
         * @param {?} task
         * @return {?}
         */
        GanttActivityComponent.prototype.popoverOpen = /**
         * @param {?} task
         * @return {?}
         */
        function (task) {
            try {
                this.onPopoverOpen.emit(task);
            }
            catch (err) { }
        };
        /** On resize of browser window dynamically adjust gantt activity height and width */
        /**
         * On resize of browser window dynamically adjust gantt activity height and width
         * @param {?} event
         * @return {?}
         */
        GanttActivityComponent.prototype.onResize = /**
         * On resize of browser window dynamically adjust gantt activity height and width
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var activityContainerSizes = this.ganttService.calculateActivityContainerDimensions();
            this.ganttActivityHeight = activityContainerSizes.height + 'px';
            this.ganttActivityWidth = activityContainerSizes.width;
        };
        /**
         * @return {?}
         */
        GanttActivityComponent.prototype.setScale = /**
         * @return {?}
         */
        function () {
            this.scale.start = this.start;
            this.scale.end = this.end;
        };
        /**
         * @return {?}
         */
        GanttActivityComponent.prototype.setDimensions = /**
         * @return {?}
         */
        function () {
            this.dimensions.height = this.containerHeight;
            this.dimensions.width = this.containerWidth;
        };
        /**
         * @return {?}
         */
        GanttActivityComponent.prototype.setGridRowStyle = /**
         * @return {?}
         */
        function () {
            return {
                'height': this.ganttService.rowHeight + 'px',
                'line-height': this.ganttService.rowHeight + 'px'
            };
        };
        /**
         * @return {?}
         */
        GanttActivityComponent.prototype.setGridScaleStyle = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var height = this.ganttService.rowHeight + 30;
            return {
                'height': height + 'px',
                'line-height': height + 'px'
            };
        };
        /**
         * @return {?}
         */
        GanttActivityComponent.prototype.calculateColumnsWidth = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var ganttActivityWidth = this.gridColumns.map(function (column) { return column.width; }).reduce(function (pv, cv) { return pv + cv; }, 0) + 1;
            return "calc(100% - " + (ganttActivityWidth) + "px)";
        };
        /**
         * @private
         * @return {?}
         */
        GanttActivityComponent.prototype.calculateContainerHeight = /**
         * @private
         * @return {?}
         */
        function () {
            return this.ganttService.TASK_CACHE.length * this.ganttService.rowHeight;
        };
        /**
         * @private
         * @return {?}
         */
        GanttActivityComponent.prototype.calculateContainerWidth = /**
         * @private
         * @return {?}
         */
        function () {
            return this.ganttService.TIME_SCALE.length * this.ganttService.cellWidth + this.ganttService.cellWidth;
        };
        /**
         * @private
         * @return {?}
         */
        GanttActivityComponent.prototype.setSizes = /**
         * @private
         * @return {?}
         */
        function () {
            this.ganttActivityHeight = this.activityContainerSizes.height + 'px';
            this.ganttActivityWidth = this.activityContainerSizes.width;
        };
        /** @nocollapse */
        GanttActivityComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: GanttService }
        ]; };
        GanttActivityComponent.propDecorators = {
            project: [{ type: core.Input }],
            options: [{ type: core.Input }],
            onGridRowClick: [{ type: core.Output }],
            onPopoverOpen: [{ type: core.Output }]
        };
GanttActivityComponent.ɵfac = function GanttActivityComponent_Factory(t) { return new (t || GanttActivityComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(GanttService)); };
GanttActivityComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: GanttActivityComponent, selectors: [["gantt-activity"]], inputs: { project: "project", options: "options" }, outputs: { onGridRowClick: "onGridRowClick", onPopoverOpen: "onPopoverOpen" }, decls: 14, vars: 23, consts: [[1, "grid"], ["ganttGrid", ""], [1, "grid-scale", 3, "ngStyle"], ["class", "grid-head-cell", 3, "width", "left", 4, "ngFor", "ngForOf"], [1, "grid-data", 3, "ngStyle"], ["ganttGridData", ""], ["class", "grid-row", 3, "ngStyle", 4, "ngFor", "ngForOf"], [1, "gantt-activity", 3, "ngStyle", "wheel", "resize"], ["ganttActivity", ""], [3, "timeScaleMonth", "timeScaleWeekend", "dimensions", "scale"], [1, "gantt-activity-area", 3, "ngStyle"], ["ganttActivityArea", ""], [3, "timeScale", "tasks"], [3, "timeScale", "dimensions", "tasks", "onGridRowClick", "onPopoverOpen"], [1, "grid-head-cell"], [1, "grid-row", 3, "ngStyle"], ["row", ""], ["mdePopoverPlacement", "bottom", 3, "mdePopoverEnterDelay", "mdePopoverLeaveDelay", "mdePopoverPositionY", "mdePopoverOverlapTrigger", "mdePopoverDisableAnimation", "mdePopoverArrowWidth", "mdePopoverArrowColor"], ["appPopover", "mdePopover"], [2, "max-width", "340px", "padding", "3px 8px", "color", "#ffffff", "text-align", "center", "background-color", "#000000", "border-radius", "4px"], [2, "z-index", "1070", "display", "block", "font-family", "'Lato','Helvetica Neue',Helvetica,Arial,sans-serif", "font-style", "normal", "font-weight", "normal", "letter-spacing", "normal", "line-break", "auto", "line-height", "1.42857143", "text-align", "left", "text-align", "start", "text-decoration", "none", "text-shadow", "none", "text-transform", "none", "white-space", "normal", "word-break", "normal", "word-spacing", "normal", "word-wrap", "normal", "font-size", "13px"], ["mdePopoverOffsetX", "25", "mdePopoverOffsetY", "0", 1, "grid-cell", 3, "mdePopoverTriggerFor", "mdePopoverBackdropCloseOnClick", "ngStyle"], [1, "gantt-tree-content"], [3, "ngStyle"]], template: function GanttActivityComponent_Template(rf, ctx) { if (rf & 1) {
        var _r10 = ɵngcc0.ɵɵgetCurrentView();
        ɵngcc0.ɵɵelementStart(0, "div", 0, 1);
        ɵngcc0.ɵɵelementStart(2, "div", 2);
        ɵngcc0.ɵɵtemplate(3, GanttActivityComponent_div_3_Template, 3, 5, "div", 3);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(4, "div", 4, 5);
        ɵngcc0.ɵɵtemplate(6, GanttActivityComponent_div_6_Template, 12, 20, "div", 6);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(7, "div", 7, 8);
        ɵngcc0.ɵɵlistener("wheel", function GanttActivityComponent_Template_div_wheel_7_listener($event) { ɵngcc0.ɵɵrestoreView(_r10); var _r4 = ɵngcc0.ɵɵreference(8); return ctx.doWheel($event, _r4); })("resize", function GanttActivityComponent_Template_div_resize_7_listener($event) { return ctx.onResize($event); }, false, ɵngcc0.ɵɵresolveWindow);
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
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(GanttActivityComponent, [{
        type: core.Component,
        args: [{
                selector: 'gantt-activity',
                template: "\n\n    <div class=\"grid\" #ganttGrid>\n        <div class=\"grid-scale\" [ngStyle]=\"setGridScaleStyle()\">\n            <div class=\"grid-head-cell\"\n                *ngFor=\"let column of gridColumns\" [style.width]=\"column.width + 'px'\"\n                [style.left]=\"column.left + 'px'\">\n\n                <label>\n                    {{column.name}}\n                </label>\n            </div>\n        </div>\n        <div class=\"grid-data\"\n            #ganttGridData\n            [ngStyle]=\"{ 'height': ganttService.calculateGanttHeight() }\">\n\n            <div #row\n                *ngFor=\"let data of ganttService.TASK_CACHE\" class=\"grid-row\"\n                [ngStyle]=\"setGridRowStyle()\">\n\n                <mde-popover #appPopover=\"mdePopover\"\n                    [mdePopoverEnterDelay]=\"100\"\n                    [mdePopoverLeaveDelay]=\"0\"\n                    [mdePopoverPositionY]=\"'above'\"\n                    [mdePopoverOverlapTrigger]=\"false\"\n                    [mdePopoverDisableAnimation]=\"false\"\n                    [mdePopoverArrowWidth]=\"8\"\n                    [mdePopoverArrowColor]=\"'black'\"\n                    mdePopoverPlacement=\"bottom\">\n\n                    <mat-card style=\"max-width: 340px; padding: 3px 8px;\n                        color: #ffffff;\n                        text-align: center;\n                        background-color: #000000;\n                        border-radius: 4px;\">\n                        <span style=\"z-index: 1070;\n                            display: block;\n                            font-family: 'Lato','Helvetica Neue',Helvetica,Arial,sans-serif;\n                            font-style: normal;\n                            font-weight: normal;\n                            letter-spacing: normal;\n                            line-break: auto;\n                            line-height: 1.42857143;\n                            text-align: left;\n                            text-align: start;\n                            text-decoration: none;\n                            text-shadow: none;\n                            text-transform: none;\n                            white-space: normal;\n                            word-break: normal;\n                            word-spacing: normal;\n                            word-wrap: normal;\n                            font-size: 13px;\">{{data.name}}</span>\n                    </mat-card>\n                </mde-popover>\n\n                <div class=\"grid-cell\"\n                    [mdePopoverTriggerFor]=\"appPopover\"\n                    [mdePopoverBackdropCloseOnClick]=\"false\"\n                    mdePopoverOffsetX=\"25\"\n                    mdePopoverOffsetY=\"0\"\n                    [ngStyle]=\"{ 'width': gridColumns[1].width + 'px', 'padding-left': 0 }\">\n\n                    <div class=\"gantt-tree-content\">\n                        <span [ngStyle]=\"{ borderLeftColor: data.color.primary, borderLeftWidth: .35 + 'em', \n                            borderLeftStyle: 'solid', paddingRight: .5 + 'em'}\"></span>\n                        <span>{{data.name}}</span>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"gantt-activity\" #ganttActivity\n        (wheel)=\"doWheel($event, ganttActivity)\"\n        (window:resize)=\"onResize($event)\"\n        [ngStyle]=\"{ 'height': ganttService.calculateGanttHeight() + 60, 'width': calculateColumnsWidth() }\">\n\n        <time-scale [timeScaleMonth]=\"ganttService.MONTH_SCALE\"\n            [timeScaleWeekend]=\"ganttService.TIME_SCALE\"\n            [dimensions]=\"dimensions\"\n            [scale]=\"options.scale\"></time-scale>\n        <div class=\"gantt-activity-area\"\n            #ganttActivityArea\n            [ngStyle]=\"{ 'height': ganttService.calculateGanttHeight(), 'width': containerWidth + 36 + 'px' }\">\n\n            <activity-background [timeScale]=\"ganttService.TIME_SCALE\"\n                [tasks]=\"ganttService.TASK_CACHE\"></activity-background>\n            <activity-bars [timeScale]=\"ganttService.TIME_SCALE\"\n                [dimensions]=\"dimensions\"\n                [tasks]=\"ganttService.TASK_CACHE\"\n                (onGridRowClick)=\"gridRowClick($event)\"\n                (onPopoverOpen)=\"popoverOpen($event)\"></activity-bars>\n        </div>\n    </div>\n    ",
                changeDetection: core.ChangeDetectionStrategy.Default,
                styles: ["\n        .gantt-activity {\n            overflow-y: hidden;\n            overflow-x: scroll;\n            display: inline-block;\n            vertical-align: top;\n            position: relative;\n        }\n        .gantt-activity-area {\n            position: relative;\n            overflow-x: hidden;\n            overflow-y: hidden;\n            -webkit-user-select: none;\n        }\n        .gantt-vertical-scroll {\n            background-color: transparent;\n            overflow-x: hidden;\n            overflow-y: scroll;\n            position: absolute;\n            right: -10px;\n            display: block;\n            top: -1px;\n            border: 1px solid #cecece;\n        }\n        .grid {\n            overflow-x: hidden;\n            overflow-y: hidden;\n            display: inline-block;\n            vertical-align: top;\n            border-right: 1px solid #cecece;\n        }\n        .grid-scale {\n            color: #6b6b6b;\n            font-size: 12px;\n            border-bottom: 1px solid #e0e0e0;\n            background-color: whitesmoke;\n        }\n        .grid-head-cell {\n            /*color: #a6a6a6;*/\n            border-top: none !important;\n            border-right: none !important;\n            line-height: inherit;\n            box-sizing: border-box;\n            display: inline-block;\n            vertical-align: top;\n            border-right: 1px solid #cecece;\n            /*text-align: center;*/\n            position: relative;\n            cursor: default;\n            height: 100%;\n            -moz-user-select: -moz-none;\n            -webkit-user-select: none;\n            overflow: hidden;\n        }\n        .grid-data {\n            overflow: hidden;\n        }\n        .grid-row {\n            box-sizing: border-box;\n            border-bottom: 1px solid #e0e0e0;\n            background-color: #fff;\n            position: relative;\n            -webkit-user-select: none;\n        }\n        .grid-row:hover {\n            background-color: #eeeeee;\n            cursor: pointer;\n        }\n        .grid-cell {\n            border-right: none;\n            color: #454545;\n            display: inline-block;\n            vertical-align: top;\n            padding-left: 6px;\n            padding-right: 6px;\n            height: 100%;\n            overflow: hidden;\n            white-space: nowrap;\n            font-size: 13px;\n            box-sizing: border-box;\n        }\n        .actions-bar {\n            /*border-top: 1px solid #cecece;*/\n            border-bottom: 1px solid #e0e0e0;\n            clear: both;\n            /*margin-top: 90px;*/\n            height: 28px;\n            background: whitesmoke;\n            color: #494949;\n            font-family: Arial, sans-serif;\n            font-size: 13px;\n            padding-left: 15px;\n            line-height: 25px;\n        }\n        .gantt-tree-content {\n            padding-left: 15px;\n        }\n    "]
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: GanttService }]; }, { onGridRowClick: [{
            type: core.Output
        }], onPopoverOpen: [{
            type: core.Output
        }], project: [{
            type: core.Input
        }], options: [{
            type: core.Input
        }] }); })();
        return GanttActivityComponent;
    }());
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
    var GanttTimeScaleComponent = /** @class */ (function () {
        function GanttTimeScaleComponent(ganttService) {
            this.ganttService = ganttService;
        }
        /**
         * @return {?}
         */
        GanttTimeScaleComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
        };
        /**
         * @return {?}
         */
        GanttTimeScaleComponent.prototype.setTimescaleStyle = /**
         * @return {?}
         */
        function () {
            return {
                'width': (this.dimensions.width + 36) + 'px'
            };
        };
        /**
         * @param {?} borderTop
         * @return {?}
         */
        GanttTimeScaleComponent.prototype.setTimescaleMonthLineStyle = /**
         * @param {?} borderTop
         * @return {?}
         */
        function (borderTop) {
            return {
                'height': this.ganttService.rowHeight + 'px',
                'line-height': this.ganttService.rowHeight + 'px',
                'position': 'relative',
                'border-top': borderTop
            };
        };
        /**
         * @return {?}
         */
        GanttTimeScaleComponent.prototype.setTimescaleMonthCellStyle = /**
         * @return {?}
         */
        function () {
            return {
                'width': this.ganttService.cellWidth + 'px'
            };
        };
        /**
         * @param {?} borderTop
         * @return {?}
         */
        GanttTimeScaleComponent.prototype.setTimescaleWeekendLineStyle = /**
         * @param {?} borderTop
         * @return {?}
         */
        function (borderTop) {
            return {
                'height': this.ganttService.rowHeight + 'px',
                'line-height': this.ganttService.rowHeight + 'px',
                'position': 'relative',
                'border-top': borderTop
            };
        };
        /**
         * @return {?}
         */
        GanttTimeScaleComponent.prototype.setTimescaleWeekendCellStyle = /**
         * @return {?}
         */
        function () {
            return {
                'width': this.ganttService.cellWidth + 'px'
            };
        };
        /**
         * @param {?} date
         * @return {?}
         */
        GanttTimeScaleComponent.prototype.isDayWeekend = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return this.ganttService.isDayWeekend(date);
        };
        /** @nocollapse */
        GanttTimeScaleComponent.ctorParameters = function () { return [
            { type: GanttService }
        ]; };
        GanttTimeScaleComponent.propDecorators = {
            timeScaleMonth: [{ type: core.Input }],
            timeScaleWeekend: [{ type: core.Input }],
            dimensions: [{ type: core.Input }],
            scale: [{ type: core.Input }]
        };
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
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(GanttTimeScaleComponent, [{
        type: core.Component,
        args: [{
                selector: 'time-scale',
                template: "\n        <div class=\"time-scale\" [ngStyle]=\"setTimescaleStyle()\">\n            <!--<div class=\"time-scale-line\" [ngStyle]=\"setTimescaleMonthLineStyle('none')\">\n                <div class=\"time-scale-cell\" *ngFor=\"let scale of timeScaleMonth; let i = index\"\n                    [ngClass]=\"(i % 2) ? 'weekend' : ''\" [style.width.px]=\"scale.width\">{{scale.start | date: 'dd-MM'}}</div>\n            </div>-->\n            <div class=\"time-scale-line\" [ngStyle]=\"setTimescaleWeekendLineStyle('none')\">\n                <div class=\"time-scale-cell\" *ngFor=\"let date of timeScaleWeekend; let i = index\"\n                    [ngClass]=\"(i % 2) ? 'weekend' : ''\" [ngStyle]=\"setTimescaleWeekendCellStyle()\">{{date | date: 'dd-MM'}}</div>\n            </div>\n            <div class=\"time-scale-line\" [ngStyle]=\"setTimescaleWeekendLineStyle('none')\">\n                <div class=\"time-scale-cell\" *ngFor=\"let date of timeScaleWeekend; let i = index\"\n                [ngClass]=\"(i % 2) ? 'weekend' : ''\" [ngStyle]=\"setTimescaleWeekendCellStyle()\">{{i + 1}}</div>\n            </div>\n        </div>",
                providers: [
                    GanttService
                ],
                styles: ["\n        .weekend {\n            background-color: whitesmoke;\n        }\n        .time-scale {\n            font-size: 12px;\n            background-color: #fff;\n            border-bottom: 1px solid #cecece;\n        }\n        .time-scale-line {\n            box-sizing: border-box;\n            border-bottom: 1px solid #cecece;\n        }\n        .time-scale-line:first-child {\n            border-top: none;\n        }\n        .time-scale-cell {\n            display: inline-block;\n            white-space: nowrap;\n            overflow: hidden;\n            border-right: 1px solid #cecece;\n            text-align: center;\n            height: 100%;\n        }"]
            }]
    }], function () { return [{ type: GanttService }]; }, { timeScaleMonth: [{
            type: core.Input
        }], timeScaleWeekend: [{
            type: core.Input
        }], dimensions: [{
            type: core.Input
        }], scale: [{
            type: core.Input
        }] }); })();
        return GanttTimeScaleComponent;
    }());
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
    var GanttActivityBackgroundComponent = /** @class */ (function () {
        function GanttActivityBackgroundComponent(ganttService) {
            this.ganttService = ganttService;
            this.rows = [];
            this.cells = [];
        }
        /**
         * @return {?}
         */
        GanttActivityBackgroundComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.drawGrid();
        };
        /**
         * @param {?} date
         * @return {?}
         */
        GanttActivityBackgroundComponent.prototype.isDayWeekend = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return this.ganttService.isDayWeekend(date);
        };
        /**
         * @return {?}
         */
        GanttActivityBackgroundComponent.prototype.setRowStyle = /**
         * @return {?}
         */
        function () {
            return {
                'height': this.ganttService.rowHeight + 'px'
            };
        };
        /**
         * @return {?}
         */
        GanttActivityBackgroundComponent.prototype.setCellStyle = /**
         * @return {?}
         */
        function () {
            return {
                'width': this.ganttService.cellWidth + 'px'
            };
        };
        /**
         * @private
         * @return {?}
         */
        GanttActivityBackgroundComponent.prototype.drawGrid = /**
         * @private
         * @return {?}
         */
        function () {
            this.cells = this.timeScale;
        };
        /** @nocollapse */
        GanttActivityBackgroundComponent.ctorParameters = function () { return [
            { type: GanttService }
        ]; };
        GanttActivityBackgroundComponent.propDecorators = {
            tasks: [{ type: core.Input }],
            timeScale: [{ type: core.Input }],
            bg: [{ type: core.ViewChild, args: ['bg',] }]
        };
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
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(GanttActivityBackgroundComponent, [{
        type: core.Component,
        args: [{
                selector: 'activity-background',
                template: "\n    <div #bg class=\"gantt-activity-bg\">\n        <div class=\"gantt-activity-row\"\n            [ngStyle]=\"setRowStyle()\"\n            *ngFor=\"let row of tasks\">\n\n            <div class=\"gantt-activity-cell\"\n                [ngStyle]=\"setCellStyle()\"\n                *ngFor=\"let cell of cells; let i = index; let l = last\" [ngClass]=\"(i % 2) ? 'weekend' : ''\" ></div>\n        </div>\n    </div>\n    ",
                styles: ["\n        .weekend {\n            background-color: whitesmoke;\n        }\n        .gantt-activity-bg {\n            overflow: hidden;\n        }\n        .gantt-activity-row {\n            border-bottom: 1px solid #ebebeb;\n            background-color: #fff;\n            box-sizing: border-box;\n        }\n        .gantt-activity-cell {\n            display: inline-block;\n            height: 100%;\n            border-right: 1px solid #ebebeb;\n        }\n    "]
            }]
    }], function () { return [{ type: GanttService }]; }, { tasks: [{
            type: core.Input
        }], timeScale: [{
            type: core.Input
        }], bg: [{
            type: core.ViewChild,
            args: ['bg']
        }] }); })();
        return GanttActivityBackgroundComponent;
    }());
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
    var GanttActivityBarsComponent = /** @class */ (function () {
        function GanttActivityBarsComponent(ganttService) {
            this.ganttService = ganttService;
            this.onGridRowClick = new core.EventEmitter();
            this.onPopoverOpen = new core.EventEmitter();
            this.containerHeight = 0;
            this.containerWidth = 0;
        }
        /**
         * @return {?}
         */
        GanttActivityBarsComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.containerHeight = this.dimensions.height;
            this.containerWidth = this.dimensions.width;
        };
        /**
         * @param {?} task
         * @param {?} index
         * @return {?}
         */
        GanttActivityBarsComponent.prototype.drawBar = /**
         * @param {?} task
         * @param {?} index
         * @return {?}
         */
        function (task, index) {
            /** @type {?} */
            var style = {};
            style = this.ganttService.calculateBar(task, index, this.timeScale);
            return style;
        };
        /**
         * @param {?} task
         * @return {?}
         */
        GanttActivityBarsComponent.prototype.gridRowClicked = /**
         * @param {?} task
         * @return {?}
         */
        function (task) {
            try {
                this.onGridRowClick.emit(task);
            }
            catch (err) { }
        };
        /**
         * @param {?} task
         * @return {?}
         */
        GanttActivityBarsComponent.prototype.popoverOpened = /**
         * @param {?} task
         * @return {?}
         */
        function (task) {
            try {
                this.onPopoverOpen.emit(task);
            }
            catch (err) { }
        };
        /**
         * @private
         * @param {?} dragFn
         * @return {?}
         */
        GanttActivityBarsComponent.prototype.addMouseEventListeners = /**
         * @private
         * @param {?} dragFn
         * @return {?}
         */
        function (dragFn) {
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
        };
        /** @nocollapse */
        GanttActivityBarsComponent.ctorParameters = function () { return [
            { type: GanttService }
        ]; };
        GanttActivityBarsComponent.propDecorators = {
            timeScale: [{ type: core.Input }],
            dimensions: [{ type: core.Input }],
            tasks: [{ type: core.Input }],
            onGridRowClick: [{ type: core.Output }],
            onPopoverOpen: [{ type: core.Output }]
        };
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
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(GanttActivityBarsComponent, [{
        type: core.Component,
        args: [{
                selector: 'activity-bars',
                template: "\n    <div class=\"gantt-activity-bars-area\"\n        [ngStyle]=\"{ 'height': containerHeight + 'px', 'width': containerWidth + 'px' }\">\n\n        <div #bar class=\"gantt-activity-line\"\n            *ngFor=\"let task of tasks; let i = index\" (click)=\"gridRowClicked(task)\"\n            [ngStyle]=\"drawBar(task, i)\">\n\n            <div #popoverTrigger=\"mdePopoverTrigger\"\n                [mdePopoverTriggerFor]=\"taskPopover\"\n                [mdePopoverBackdropCloseOnClick]=\"false\"\n                mdePopoverOffsetX=\"-15\"\n                mdePopoverOffsetY=\"0\"\n                (opened)=\"popoverOpened(task)\">\n\n                <mde-popover #taskPopover=\"mdePopover\"\n                    [mdePopoverEnterDelay]=\"100\"\n                    [mdePopoverLeaveDelay]=\"0\"\n                    [mdePopoverPositionY]=\"'above'\"\n                    [mdePopoverOverlapTrigger]=\"false\"\n                    [mdePopoverDisableAnimation]=\"false\"\n                    [mdeFocusTrapEnabled]=\"false\"\n                    [mdePopoverArrowWidth]=\"12\"\n                    [mdePopoverArrowColor]=\"task.color?.primary\"\n                    mdePopoverPlacement=\"bottom\">\n\n                    <ng-container *ngTemplateOutlet=\"templatePopoverTask; context: {task: task}\"></ng-container>\n                </mde-popover>\n\n                <div class=\"gantt-activity-content\"></div>\n                <div class=\"gantt-activity-link-control gantt-activity-right\" style=\"height: 26px; line-height: 30px\">\n                    <div class=\"gantt-link-point\"></div>\n                </div>\n                <div class=\"gantt-activity-link-control gantt-activity-left\" style=\"height: 26px; line-height: 30px\">\n                    <div class=\"gantt-link-point\"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <ng-template #templatePopoverTask let-data=\"task\">\n        <mat-card *ngIf=\"data\" class=\"mat-elevation-z6\" \n            [ngStyle]=\"{ \n                borderBottomColor: data.color?.primary,\n                borderBottomWidth: '.25em',\n                borderBottomStyle: 'solid' \n            }\" style=\"width: 320px; max-width: 320px;\">\n\n            <mat-card-header>\n                <div mat-card-avatar [ngStyle]=\"{ borderColor: data.color?.primary }\" style=\"width: 0; height: unset; margin-bottom: .7em; border-radius: 0; border-style: solid;\"></div>\n                <mat-card-title>\n                    <span style=\"font-size: 80%;\">{{data.name}}</span>\n                </mat-card-title>\n                <mat-card-subtitle>\n                    <span>{{data.start | date:'yyyy-MM-dd'}} - {{data.end | date:'yyyy-MM-dd'}}</span>\n                </mat-card-subtitle>\n                <mat-card-subtitle>\n                    <span style=\"padding-left: .75em; padding-right: 1em; font-stretch: condensed;\">&#x336;</span>\n                    <span>{{data.resource}}</span>\n                </mat-card-subtitle>\n            </mat-card-header>\n            <mat-card-content>\n                <footer *ngIf=\"data.description\">\n                    <span [innerHTML]=\"data.description\"></span>\n                </footer>\n            </mat-card-content>\n        </mat-card>\n    </ng-template>\n    ",
                providers: [
                    GanttService
                ],
                styles: ["\n    .gantt-activity-line {\n        /*border-radius: 2px;*/\n        position: absolute;\n        box-sizing: border-box;\n        -webkit-user-select: none;\n    }\n    .gantt-activity-line:hover {\n        cursor: pointer;\n    }\n    .gantt-activity-content {\n        font-size: 12px;\n        color: #fff;\n        width: 100%;\n        top: 0;\n        position: absolute;\n        white-space: nowrap;\n        text-align: center;\n        line-height: inherit;\n        overflow: hidden;\n        height: 100%;\n    }\n    .gantt-activity-link-control {\n        position: absolute;\n        width: 13px;\n        top: 0;\n    }\n    .gantt-activity-right {\n        right: 0;\n    }\n    .gantt-activity-left {\n        left: 0;\n    }\n    .gantt-activity-right:hover {\n        /*cursor:w-resize;*/\n    }\n    .gantt-activity-left:hover {\n        /*cursor:w-resize;*/\n    }\n    "]
            }]
    }], function () { return [{ type: GanttService }]; }, { onGridRowClick: [{
            type: core.Output
        }], onPopoverOpen: [{
            type: core.Output
        }], timeScale: [{
            type: core.Input
        }], dimensions: [{
            type: core.Input
        }], tasks: [{
            type: core.Input
        }] }); })();
        return GanttActivityBarsComponent;
    }());
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
    var GanttActivityModule = /** @class */ (function () {
        function GanttActivityModule() {
        }
GanttActivityModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: GanttActivityModule });
GanttActivityModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function GanttActivityModule_Factory(t) { return new (t || GanttActivityModule)(); }, providers: [], imports: [[common.CommonModule, card.MatCardModule, mde.MdePopoverModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(GanttActivityModule, { declarations: [GanttActivityComponent,
        GanttTimeScaleComponent,
        GanttActivityBackgroundComponent,
        GanttActivityBarsComponent], imports: [ɵngcc1.CommonModule, ɵngcc3.MatCardModule, ɵngcc2.MdePopoverModule], exports: [GanttActivityComponent,
        GanttTimeScaleComponent,
        GanttActivityBackgroundComponent,
        GanttActivityBarsComponent] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(GanttActivityModule, [{
        type: core.NgModule,
        args: [{
                imports: [common.CommonModule, card.MatCardModule, mde.MdePopoverModule],
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
    }], function () { return []; }, null); })();
        return GanttActivityModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var GanttModule = /** @class */ (function () {
        function GanttModule() {
        }
        /**
         * @return {?}
         */
        GanttModule.forRoot = /**
         * @return {?}
         */
        function () {
            return {
                ngModule: GanttModule,
            };
        };
GanttModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: GanttModule });
GanttModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function GanttModule_Factory(t) { return new (t || GanttModule)(); }, providers: [GanttService], imports: [[common.CommonModule, forms.FormsModule, GanttActivityModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(GanttModule, { declarations: [GanttComponent,
        GanttHeaderComponent,
        GanttFooterComponent], imports: [ɵngcc1.CommonModule, ɵngcc4.FormsModule, GanttActivityModule], exports: [GanttComponent] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(GanttModule, [{
        type: core.NgModule,
        args: [{
                imports: [common.CommonModule, forms.FormsModule, GanttActivityModule],
                exports: [GanttComponent],
                declarations: [GanttComponent, GanttHeaderComponent, GanttFooterComponent],
                providers: [GanttService],
                schemas: [core.CUSTOM_ELEMENTS_SCHEMA]
            }]
    }], function () { return []; }, null); })();
        return GanttModule;
    }());

    exports.GanttComponent = GanttComponent;
    exports.GanttModule = GanttModule;
    exports.ɵa = GanttService;
    exports.ɵb = GanttActivityModule;
    exports.ɵc = GanttActivityComponent;
    exports.ɵd = GanttTimeScaleComponent;
    exports.ɵe = GanttActivityBackgroundComponent;
    exports.ɵf = GanttActivityBarsComponent;
    exports.ɵg = GanttHeaderComponent;
    exports.ɵh = GanttFooterComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=angular-gantt.umd.js.map