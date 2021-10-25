/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { GanttService } from '../shared/services/gantt.service';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from './time-scale/gantt-time-scale.component';
import * as ɵngcc3 from './background/activity-background.component';
import * as ɵngcc4 from './bars/activity-bars.component';
import * as ɵngcc5 from '@material-extended/mde';
import * as ɵngcc6 from '@angular/material/card';

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
var _c0 = function (a0) { return { "width": a0, "padding-left": 0 }; };
var _c1 = function (a0, a1, a3) { return { borderLeftColor: a0, borderLeftWidth: a1, borderLeftStyle: "solid", paddingRight: a3 }; };
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
    ɵngcc0.ɵɵproperty("mdePopoverTriggerFor", _r9)("mdePopoverBackdropCloseOnClick", false)("ngStyle", ɵngcc0.ɵɵpureFunction1(14, _c0, ctx_r3.gridColumns[1].width + "px"));
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngStyle", ɵngcc0.ɵɵpureFunction3(16, _c1, data_r7.color.primary, 0.35 + "em", 0.5 + "em"));
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate(data_r7.name);
} }
var _c2 = function (a0) { return { "height": a0 }; };
var _c3 = function (a0, a1) { return { "height": a0, "width": a1 }; };
var GanttActivityComponent = /** @class */ (function () {
    function GanttActivityComponent(elem, ganttService) {
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
        { type: ElementRef },
        { type: GanttService }
    ]; };
    GanttActivityComponent.propDecorators = {
        project: [{ type: Input }],
        options: [{ type: Input }],
        onGridRowClick: [{ type: Output }],
        onPopoverOpen: [{ type: Output }]
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
        ɵngcc0.ɵɵproperty("ngStyle", ɵngcc0.ɵɵpureFunction1(15, _c2, ctx.ganttService.calculateGanttHeight()));
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.ganttService.TASK_CACHE);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngStyle", ɵngcc0.ɵɵpureFunction2(17, _c3, ctx.ganttService.calculateGanttHeight() + 60, ctx.calculateColumnsWidth()));
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("timeScaleMonth", ctx.ganttService.MONTH_SCALE)("timeScaleWeekend", ctx.ganttService.TIME_SCALE)("dimensions", ctx.dimensions)("scale", ctx.options.scale);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngStyle", ɵngcc0.ɵɵpureFunction2(20, _c3, ctx.ganttService.calculateGanttHeight(), ctx.containerWidth + 36 + "px"));
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("timeScale", ctx.ganttService.TIME_SCALE)("tasks", ctx.ganttService.TASK_CACHE);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("timeScale", ctx.ganttService.TIME_SCALE)("dimensions", ctx.dimensions)("tasks", ctx.ganttService.TASK_CACHE);
    } }, directives: [ɵngcc1.NgStyle, ɵngcc1.NgForOf, ɵngcc2.GanttTimeScaleComponent, ɵngcc3.GanttActivityBackgroundComponent, ɵngcc4.GanttActivityBarsComponent, ɵngcc5.MdePopover, ɵngcc6.MatCard, ɵngcc5.MdePopoverTrigger], styles: [".gantt-activity[_ngcontent-%COMP%] {\n            overflow-y: hidden;\n            overflow-x: scroll;\n            display: inline-block;\n            vertical-align: top;\n            position: relative;\n        }\n        .gantt-activity-area[_ngcontent-%COMP%] {\n            position: relative;\n            overflow-x: hidden;\n            overflow-y: hidden;\n            -webkit-user-select: none;\n        }\n        .gantt-vertical-scroll[_ngcontent-%COMP%] {\n            background-color: transparent;\n            overflow-x: hidden;\n            overflow-y: scroll;\n            position: absolute;\n            right: -10px;\n            display: block;\n            top: -1px;\n            border: 1px solid #cecece;\n        }\n        .grid[_ngcontent-%COMP%] {\n            overflow-x: hidden;\n            overflow-y: hidden;\n            display: inline-block;\n            vertical-align: top;\n            border-right: 1px solid #cecece;\n        }\n        .grid-scale[_ngcontent-%COMP%] {\n            color: #6b6b6b;\n            font-size: 12px;\n            border-bottom: 1px solid #e0e0e0;\n            background-color: whitesmoke;\n        }\n        .grid-head-cell[_ngcontent-%COMP%] {\n            \n            border-top: none !important;\n            border-right: none !important;\n            line-height: inherit;\n            box-sizing: border-box;\n            display: inline-block;\n            vertical-align: top;\n            border-right: 1px solid #cecece;\n            \n            position: relative;\n            cursor: default;\n            height: 100%;\n            -moz-user-select: -moz-none;\n            -webkit-user-select: none;\n            overflow: hidden;\n        }\n        .grid-data[_ngcontent-%COMP%] {\n            overflow: hidden;\n        }\n        .grid-row[_ngcontent-%COMP%] {\n            box-sizing: border-box;\n            border-bottom: 1px solid #e0e0e0;\n            background-color: #fff;\n            position: relative;\n            -webkit-user-select: none;\n        }\n        .grid-row[_ngcontent-%COMP%]:hover {\n            background-color: #eeeeee;\n            cursor: pointer;\n        }\n        .grid-cell[_ngcontent-%COMP%] {\n            border-right: none;\n            color: #454545;\n            display: inline-block;\n            vertical-align: top;\n            padding-left: 6px;\n            padding-right: 6px;\n            height: 100%;\n            overflow: hidden;\n            white-space: nowrap;\n            font-size: 13px;\n            box-sizing: border-box;\n        }\n        .actions-bar[_ngcontent-%COMP%] {\n            \n            border-bottom: 1px solid #e0e0e0;\n            clear: both;\n            \n            height: 28px;\n            background: whitesmoke;\n            color: #494949;\n            font-family: Arial, sans-serif;\n            font-size: 13px;\n            padding-left: 15px;\n            line-height: 25px;\n        }\n        .gantt-tree-content[_ngcontent-%COMP%] {\n            padding-left: 15px;\n        }"] });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(GanttActivityComponent, [{
        type: Component,
        args: [{
                selector: 'gantt-activity',
                template: "\n\n    <div class=\"grid\" #ganttGrid>\n        <div class=\"grid-scale\" [ngStyle]=\"setGridScaleStyle()\">\n            <div class=\"grid-head-cell\"\n                *ngFor=\"let column of gridColumns\" [style.width]=\"column.width + 'px'\"\n                [style.left]=\"column.left + 'px'\">\n\n                <label>\n                    {{column.name}}\n                </label>\n            </div>\n        </div>\n        <div class=\"grid-data\"\n            #ganttGridData\n            [ngStyle]=\"{ 'height': ganttService.calculateGanttHeight() }\">\n\n            <div #row\n                *ngFor=\"let data of ganttService.TASK_CACHE\" class=\"grid-row\"\n                [ngStyle]=\"setGridRowStyle()\">\n\n                <mde-popover #appPopover=\"mdePopover\"\n                    [mdePopoverEnterDelay]=\"100\"\n                    [mdePopoverLeaveDelay]=\"0\"\n                    [mdePopoverPositionY]=\"'above'\"\n                    [mdePopoverOverlapTrigger]=\"false\"\n                    [mdePopoverDisableAnimation]=\"false\"\n                    [mdePopoverArrowWidth]=\"8\"\n                    [mdePopoverArrowColor]=\"'black'\"\n                    mdePopoverPlacement=\"bottom\">\n\n                    <mat-card style=\"max-width: 340px; padding: 3px 8px;\n                        color: #ffffff;\n                        text-align: center;\n                        background-color: #000000;\n                        border-radius: 4px;\">\n                        <span style=\"z-index: 1070;\n                            display: block;\n                            font-family: 'Lato','Helvetica Neue',Helvetica,Arial,sans-serif;\n                            font-style: normal;\n                            font-weight: normal;\n                            letter-spacing: normal;\n                            line-break: auto;\n                            line-height: 1.42857143;\n                            text-align: left;\n                            text-align: start;\n                            text-decoration: none;\n                            text-shadow: none;\n                            text-transform: none;\n                            white-space: normal;\n                            word-break: normal;\n                            word-spacing: normal;\n                            word-wrap: normal;\n                            font-size: 13px;\">{{data.name}}</span>\n                    </mat-card>\n                </mde-popover>\n\n                <div class=\"grid-cell\"\n                    [mdePopoverTriggerFor]=\"appPopover\"\n                    [mdePopoverBackdropCloseOnClick]=\"false\"\n                    mdePopoverOffsetX=\"25\"\n                    mdePopoverOffsetY=\"0\"\n                    [ngStyle]=\"{ 'width': gridColumns[1].width + 'px', 'padding-left': 0 }\">\n\n                    <div class=\"gantt-tree-content\">\n                        <span [ngStyle]=\"{ borderLeftColor: data.color.primary, borderLeftWidth: .35 + 'em', \n                            borderLeftStyle: 'solid', paddingRight: .5 + 'em'}\"></span>\n                        <span>{{data.name}}</span>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"gantt-activity\" #ganttActivity\n        (wheel)=\"doWheel($event, ganttActivity)\"\n        (window:resize)=\"onResize($event)\"\n        [ngStyle]=\"{ 'height': ganttService.calculateGanttHeight() + 60, 'width': calculateColumnsWidth() }\">\n\n        <time-scale [timeScaleMonth]=\"ganttService.MONTH_SCALE\"\n            [timeScaleWeekend]=\"ganttService.TIME_SCALE\"\n            [dimensions]=\"dimensions\"\n            [scale]=\"options.scale\"></time-scale>\n        <div class=\"gantt-activity-area\"\n            #ganttActivityArea\n            [ngStyle]=\"{ 'height': ganttService.calculateGanttHeight(), 'width': containerWidth + 36 + 'px' }\">\n\n            <activity-background [timeScale]=\"ganttService.TIME_SCALE\"\n                [tasks]=\"ganttService.TASK_CACHE\"></activity-background>\n            <activity-bars [timeScale]=\"ganttService.TIME_SCALE\"\n                [dimensions]=\"dimensions\"\n                [tasks]=\"ganttService.TASK_CACHE\"\n                (onGridRowClick)=\"gridRowClick($event)\"\n                (onPopoverOpen)=\"popoverOpen($event)\"></activity-bars>\n        </div>\n    </div>\n    ",
                changeDetection: ChangeDetectionStrategy.Default,
                styles: ["\n        .gantt-activity {\n            overflow-y: hidden;\n            overflow-x: scroll;\n            display: inline-block;\n            vertical-align: top;\n            position: relative;\n        }\n        .gantt-activity-area {\n            position: relative;\n            overflow-x: hidden;\n            overflow-y: hidden;\n            -webkit-user-select: none;\n        }\n        .gantt-vertical-scroll {\n            background-color: transparent;\n            overflow-x: hidden;\n            overflow-y: scroll;\n            position: absolute;\n            right: -10px;\n            display: block;\n            top: -1px;\n            border: 1px solid #cecece;\n        }\n        .grid {\n            overflow-x: hidden;\n            overflow-y: hidden;\n            display: inline-block;\n            vertical-align: top;\n            border-right: 1px solid #cecece;\n        }\n        .grid-scale {\n            color: #6b6b6b;\n            font-size: 12px;\n            border-bottom: 1px solid #e0e0e0;\n            background-color: whitesmoke;\n        }\n        .grid-head-cell {\n            /*color: #a6a6a6;*/\n            border-top: none !important;\n            border-right: none !important;\n            line-height: inherit;\n            box-sizing: border-box;\n            display: inline-block;\n            vertical-align: top;\n            border-right: 1px solid #cecece;\n            /*text-align: center;*/\n            position: relative;\n            cursor: default;\n            height: 100%;\n            -moz-user-select: -moz-none;\n            -webkit-user-select: none;\n            overflow: hidden;\n        }\n        .grid-data {\n            overflow: hidden;\n        }\n        .grid-row {\n            box-sizing: border-box;\n            border-bottom: 1px solid #e0e0e0;\n            background-color: #fff;\n            position: relative;\n            -webkit-user-select: none;\n        }\n        .grid-row:hover {\n            background-color: #eeeeee;\n            cursor: pointer;\n        }\n        .grid-cell {\n            border-right: none;\n            color: #454545;\n            display: inline-block;\n            vertical-align: top;\n            padding-left: 6px;\n            padding-right: 6px;\n            height: 100%;\n            overflow: hidden;\n            white-space: nowrap;\n            font-size: 13px;\n            box-sizing: border-box;\n        }\n        .actions-bar {\n            /*border-top: 1px solid #cecece;*/\n            border-bottom: 1px solid #e0e0e0;\n            clear: both;\n            /*margin-top: 90px;*/\n            height: 28px;\n            background: whitesmoke;\n            color: #494949;\n            font-family: Arial, sans-serif;\n            font-size: 13px;\n            padding-left: 15px;\n            line-height: 25px;\n        }\n        .gantt-tree-content {\n            padding-left: 15px;\n        }\n    "]
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
    return GanttActivityComponent;
}());
export { GanttActivityComponent };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQtYWN0aXZpdHkuY29tcG9uZW50LmpzIiwic291cmNlcyI6WyJuZzovYW5ndWxhci1nYW50dC9saWIvYWN0aXZpdHkvZ2FudHQtYWN0aXZpdHkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRyx1QkFBdUIsRUFBc0IsTUFBTSxlQUFlLENBQUM7QUFFekksT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtDQUFrQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUloRTtBQUVhLElBc09ULGdDQUNXLElBQWdCLEVBQ2hCLFlBQTBCO0FBQ3pDLFFBRmUsU0FBSSxHQUFKLElBQUksQ0FBWTtBQUFDLFFBQ2pCLGlCQUFZLEdBQVosWUFBWSxDQUFjO0FBQUMsUUFoQzVCLG1CQUFjLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7QUFDMUUsUUFBYyxrQkFBYSxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO0FBQ3pFLFFBS1ksVUFBSyxHQUFXO0FBQzVCLFlBQVEsS0FBSyxFQUFFLElBQUk7QUFDbkIsWUFBUSxHQUFHLEVBQUUsSUFBSTtBQUNqQixTQUFLLENBQUM7QUFDTixRQVNJLGVBQVUsR0FBRztBQUNqQixZQUFRLE1BQU0sRUFBRSxDQUFDO0FBQ2pCLFlBQVEsS0FBSyxFQUFFLENBQUM7QUFDaEIsU0FBSyxDQUFDO0FBQ04sUUFDSSxnQkFBVyxHQUFrQjtBQUNqQyxZQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUU7QUFDeEMsWUFBUSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO0FBQ2hELFNBQUssQ0FB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LEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUVBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFJQSxBQXdPQSxBQUNBLEFBQUEsQUFDQSxBQUFBLEFBREEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFoQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQU1BLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBVUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFFQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFLQSxBQUFBLEFBRUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFFQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQ0EsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFFQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFFQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUVBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBRUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFFQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBRUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBRUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFFQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUVBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFFQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFFQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFFQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFDQSxBQUFBLEFBRUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUNBLEFBQUEsQUFFQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUVBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUVBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUVBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUE3VkEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUErRkEsQUFtR0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBbEdBLEFBaUdBLEFBRUEsQUEzTUEsQUFBQSxBQUVBLEFBQUEsQUEyTUEsQUFBQSxBQUNBLEFBQUEsQUFFQSxBQUFBLEFBQ0EsQUFBQSxBQW1KQSxBQUFBLEFBQUEsQUE5VkEsQUE4VkEsQUF4SkEsQUFBQSxBQUNBLEFBQUEsQUFDQSxBQUFBLEFBRUEsQUFBQSxBQUNBLEFBQUEsQUFFQSxBQUFBLEFBQ0EsQUFBQSxBQUNBLEFBQUEsQUFFQSxBQUdBLEFBRUEsQUFBQSxBQUVBLEFBQUEsQUFDQSxBQUFBLEFBRUEsQUFBQSxBQUNBLEFBQUEsQUFFQSxBQUdBLEFBRUEsQUFHQSxBQUdBLEFBQUEsQUFDQSxBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBPbkNoYW5nZXMsIERvQ2hlY2sgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEdhbnR0U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9nYW50dC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSUdyaWRDb2x1bW4sIElHYW50dE9wdGlvbnMsIFByb2plY3QsIElTY2FsZSB9IGZyb20gJy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgRXZlbnRNYW5hZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnZ2FudHQtYWN0aXZpdHknLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwiZ3JpZFwiICNnYW50dEdyaWQ+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImdyaWQtc2NhbGVcIiBbbmdTdHlsZV09XCJzZXRHcmlkU2NhbGVTdHlsZSgpXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmlkLWhlYWQtY2VsbFwiXHJcbiAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGdyaWRDb2x1bW5zXCIgW3N0eWxlLndpZHRoXT1cImNvbHVtbi53aWR0aCArICdweCdcIlxyXG4gICAgICAgICAgICAgICAgW3N0eWxlLmxlZnRdPVwiY29sdW1uLmxlZnQgKyAncHgnXCI+XHJcblxyXG4gICAgICAgICAgICAgICAgPGxhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIHt7Y29sdW1uLm5hbWV9fVxyXG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImdyaWQtZGF0YVwiXHJcbiAgICAgICAgICAgICNnYW50dEdyaWREYXRhXHJcbiAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsgJ2hlaWdodCc6IGdhbnR0U2VydmljZS5jYWxjdWxhdGVHYW50dEhlaWdodCgpIH1cIj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgI3Jvd1xyXG4gICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IGRhdGEgb2YgZ2FudHRTZXJ2aWNlLlRBU0tfQ0FDSEVcIiBjbGFzcz1cImdyaWQtcm93XCJcclxuICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInNldEdyaWRSb3dTdHlsZSgpXCI+XHJcblxyXG4gICAgICAgICAgICAgICAgPG1kZS1wb3BvdmVyICNhcHBQb3BvdmVyPVwibWRlUG9wb3ZlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgW21kZVBvcG92ZXJFbnRlckRlbGF5XT1cIjEwMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgW21kZVBvcG92ZXJMZWF2ZURlbGF5XT1cIjBcIlxyXG4gICAgICAgICAgICAgICAgICAgIFttZGVQb3BvdmVyUG9zaXRpb25ZXT1cIidhYm92ZSdcIlxyXG4gICAgICAgICAgICAgICAgICAgIFttZGVQb3BvdmVyT3ZlcmxhcFRyaWdnZXJdPVwiZmFsc2VcIlxyXG4gICAgICAgICAgICAgICAgICAgIFttZGVQb3BvdmVyRGlzYWJsZUFuaW1hdGlvbl09XCJmYWxzZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgW21kZVBvcG92ZXJBcnJvd1dpZHRoXT1cIjhcIlxyXG4gICAgICAgICAgICAgICAgICAgIFttZGVQb3BvdmVyQXJyb3dDb2xvcl09XCInYmxhY2snXCJcclxuICAgICAgICAgICAgICAgICAgICBtZGVQb3BvdmVyUGxhY2VtZW50PVwiYm90dG9tXCI+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxtYXQtY2FyZCBzdHlsZT1cIm1heC13aWR0aDogMzQwcHg7IHBhZGRpbmc6IDNweCA4cHg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAjZmZmZmZmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9XCJ6LWluZGV4OiAxMDcwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250LWZhbWlseTogJ0xhdG8nLCdIZWx2ZXRpY2EgTmV1ZScsSGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUtYnJlYWs6IGF1dG87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lLWhlaWdodDogMS40Mjg1NzE0MztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0LWFsaWduOiBzdGFydDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQtc2hhZG93OiBub25lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGl0ZS1zcGFjZTogbm9ybWFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd29yZC1icmVhazogbm9ybWFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd29yZC1zcGFjaW5nOiBub3JtYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3JkLXdyYXA6IG5vcm1hbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTNweDtcIj57e2RhdGEubmFtZX19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LWNhcmQ+XHJcbiAgICAgICAgICAgICAgICA8L21kZS1wb3BvdmVyPlxyXG5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmlkLWNlbGxcIlxyXG4gICAgICAgICAgICAgICAgICAgIFttZGVQb3BvdmVyVHJpZ2dlckZvcl09XCJhcHBQb3BvdmVyXCJcclxuICAgICAgICAgICAgICAgICAgICBbbWRlUG9wb3ZlckJhY2tkcm9wQ2xvc2VPbkNsaWNrXT1cImZhbHNlXCJcclxuICAgICAgICAgICAgICAgICAgICBtZGVQb3BvdmVyT2Zmc2V0WD1cIjI1XCJcclxuICAgICAgICAgICAgICAgICAgICBtZGVQb3BvdmVyT2Zmc2V0WT1cIjBcIlxyXG4gICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsgJ3dpZHRoJzogZ3JpZENvbHVtbnNbMV0ud2lkdGggKyAncHgnLCAncGFkZGluZy1sZWZ0JzogMCB9XCI+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC10cmVlLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gW25nU3R5bGVdPVwieyBib3JkZXJMZWZ0Q29sb3I6IGRhdGEuY29sb3IucHJpbWFyeSwgYm9yZGVyTGVmdFdpZHRoOiAuMzUgKyAnZW0nLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckxlZnRTdHlsZTogJ3NvbGlkJywgcGFkZGluZ1JpZ2h0OiAuNSArICdlbSd9XCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57e2RhdGEubmFtZX19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtYWN0aXZpdHlcIiAjZ2FudHRBY3Rpdml0eVxyXG4gICAgICAgICh3aGVlbCk9XCJkb1doZWVsKCRldmVudCwgZ2FudHRBY3Rpdml0eSlcIlxyXG4gICAgICAgICh3aW5kb3c6cmVzaXplKT1cIm9uUmVzaXplKCRldmVudClcIlxyXG4gICAgICAgIFtuZ1N0eWxlXT1cInsgJ2hlaWdodCc6IGdhbnR0U2VydmljZS5jYWxjdWxhdGVHYW50dEhlaWdodCgpICsgNjAsICd3aWR0aCc6IGNhbGN1bGF0ZUNvbHVtbnNXaWR0aCgpIH1cIj5cclxuXHJcbiAgICAgICAgPHRpbWUtc2NhbGUgW3RpbWVTY2FsZU1vbnRoXT1cImdhbnR0U2VydmljZS5NT05USF9TQ0FMRVwiXHJcbiAgICAgICAgICAgIFt0aW1lU2NhbGVXZWVrZW5kXT1cImdhbnR0U2VydmljZS5USU1FX1NDQUxFXCJcclxuICAgICAgICAgICAgW2RpbWVuc2lvbnNdPVwiZGltZW5zaW9uc1wiXHJcbiAgICAgICAgICAgIFtzY2FsZV09XCJvcHRpb25zLnNjYWxlXCI+PC90aW1lLXNjYWxlPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1hY3Rpdml0eS1hcmVhXCJcclxuICAgICAgICAgICAgI2dhbnR0QWN0aXZpdHlBcmVhXHJcbiAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsgJ2hlaWdodCc6IGdhbnR0U2VydmljZS5jYWxjdWxhdGVHYW50dEhlaWdodCgpLCAnd2lkdGgnOiBjb250YWluZXJXaWR0aCArIDM2ICsgJ3B4JyB9XCI+XHJcblxyXG4gICAgICAgICAgICA8YWN0aXZpdHktYmFja2dyb3VuZCBbdGltZVNjYWxlXT1cImdhbnR0U2VydmljZS5USU1FX1NDQUxFXCJcclxuICAgICAgICAgICAgICAgIFt0YXNrc109XCJnYW50dFNlcnZpY2UuVEFTS19DQUNIRVwiPjwvYWN0aXZpdHktYmFja2dyb3VuZD5cclxuICAgICAgICAgICAgPGFjdGl2aXR5LWJhcnMgW3RpbWVTY2FsZV09XCJnYW50dFNlcnZpY2UuVElNRV9TQ0FMRVwiXHJcbiAgICAgICAgICAgICAgICBbZGltZW5zaW9uc109XCJkaW1lbnNpb25zXCJcclxuICAgICAgICAgICAgICAgIFt0YXNrc109XCJnYW50dFNlcnZpY2UuVEFTS19DQUNIRVwiXHJcbiAgICAgICAgICAgICAgICAob25HcmlkUm93Q2xpY2spPVwiZ3JpZFJvd0NsaWNrKCRldmVudClcIlxyXG4gICAgICAgICAgICAgICAgKG9uUG9wb3Zlck9wZW4pPVwicG9wb3Zlck9wZW4oJGV2ZW50KVwiPjwvYWN0aXZpdHktYmFycz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICAgIHN0eWxlczogW2BcclxuICAgICAgICAuZ2FudHQtYWN0aXZpdHkge1xyXG4gICAgICAgICAgICBvdmVyZmxvdy15OiBoaWRkZW47XHJcbiAgICAgICAgICAgIG92ZXJmbG93LXg6IHNjcm9sbDtcclxuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5nYW50dC1hY3Rpdml0eS1hcmVhIHtcclxuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgICAgICBvdmVyZmxvdy14OiBoaWRkZW47XHJcbiAgICAgICAgICAgIG92ZXJmbG93LXk6IGhpZGRlbjtcclxuICAgICAgICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdhbnR0LXZlcnRpY2FsLXNjcm9sbCB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gICAgICAgICAgICBvdmVyZmxvdy14OiBoaWRkZW47XHJcbiAgICAgICAgICAgIG92ZXJmbG93LXk6IHNjcm9sbDtcclxuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgICAgICByaWdodDogLTEwcHg7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgICAgICB0b3A6IC0xcHg7XHJcbiAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNjZWNlY2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5ncmlkIHtcclxuICAgICAgICAgICAgb3ZlcmZsb3cteDogaGlkZGVuO1xyXG4gICAgICAgICAgICBvdmVyZmxvdy15OiBoaWRkZW47XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgICAgICAgdmVydGljYWwtYWxpZ246IHRvcDtcclxuICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2NlY2VjZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdyaWQtc2NhbGUge1xyXG4gICAgICAgICAgICBjb2xvcjogIzZiNmI2YjtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2UwZTBlMDtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGVzbW9rZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdyaWQtaGVhZC1jZWxsIHtcclxuICAgICAgICAgICAgLypjb2xvcjogI2E2YTZhNjsqL1xyXG4gICAgICAgICAgICBib3JkZXItdG9wOiBub25lICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogbm9uZSAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICBsaW5lLWhlaWdodDogaW5oZXJpdDtcclxuICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xyXG4gICAgICAgICAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjY2VjZWNlO1xyXG4gICAgICAgICAgICAvKnRleHQtYWxpZ246IGNlbnRlcjsqL1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgICAgIGN1cnNvcjogZGVmYXVsdDtcclxuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgICAgICAtbW96LXVzZXItc2VsZWN0OiAtbW96LW5vbmU7XHJcbiAgICAgICAgICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5ncmlkLWRhdGEge1xyXG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ3JpZC1yb3cge1xyXG4gICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2UwZTBlMDtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ3JpZC1yb3c6aG92ZXIge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlZWVlO1xyXG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5ncmlkLWNlbGwge1xyXG4gICAgICAgICAgICBib3JkZXItcmlnaHQ6IG5vbmU7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjNDU0NTQ1O1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XHJcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogNnB4O1xyXG4gICAgICAgICAgICBwYWRkaW5nLXJpZ2h0OiA2cHg7XHJcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICAgIH1cclxuICAgICAgICAuYWN0aW9ucy1iYXIge1xyXG4gICAgICAgICAgICAvKmJvcmRlci10b3A6IDFweCBzb2xpZCAjY2VjZWNlOyovXHJcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTBlMGUwO1xyXG4gICAgICAgICAgICBjbGVhcjogYm90aDtcclxuICAgICAgICAgICAgLyptYXJnaW4tdG9wOiA5MHB4OyovXHJcbiAgICAgICAgICAgIGhlaWdodDogMjhweDtcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogd2hpdGVzbW9rZTtcclxuICAgICAgICAgICAgY29sb3I6ICM0OTQ5NDk7XHJcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiBBcmlhbCwgc2Fucy1zZXJpZjtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDE1cHg7XHJcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAyNXB4O1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ2FudHQtdHJlZS1jb250ZW50IHtcclxuICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAxNXB4O1xyXG4gICAgICAgIH1cclxuICAgIGBdLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHYW50dEFjdGl2aXR5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBEb0NoZWNrIHtcclxuICAgIEBJbnB1dCgpIHByb2plY3Q6IFByb2plY3Q7XHJcbiAgICBASW5wdXQoKSBvcHRpb25zOiBJR2FudHRPcHRpb25zO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbkdyaWRSb3dDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAgIEBPdXRwdXQoKSBvblBvcG92ZXJPcGVuOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICAgIHByaXZhdGUgc3RhcnQ6IERhdGU7XHJcbiAgICBwcml2YXRlIGVuZDogRGF0ZTtcclxuICAgIHByaXZhdGUgdGltZVNjYWxlOiBhbnk7XHJcblxyXG4gICAgcHJpdmF0ZSBzY2FsZTogSVNjYWxlID0ge1xyXG4gICAgICAgIHN0YXJ0OiBudWxsLFxyXG4gICAgICAgIGVuZDogbnVsbFxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGFjdGl2aXR5Q29udGFpbmVyU2l6ZXM6IGFueTtcclxuXHJcbiAgICBjb250YWluZXJIZWlnaHQ6IGFueTtcclxuICAgIGNvbnRhaW5lcldpZHRoOiBhbnk7XHJcblxyXG4gICAgZ2FudHRBY3Rpdml0eUhlaWdodDogYW55O1xyXG4gICAgZ2FudHRBY3Rpdml0eVdpZHRoOiBhbnk7XHJcblxyXG4gICAgZGltZW5zaW9ucyA9IHtcclxuICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgd2lkdGg6IDBcclxuICAgIH07XHJcblxyXG4gICAgZ3JpZENvbHVtbnM6IElHcmlkQ29sdW1uW10gPSBbXHJcbiAgICAgICAgeyBuYW1lOiAnJywgbGVmdDogMCwgd2lkdGg6IDE2IH0sXHJcbiAgICAgICAgeyBuYW1lOiAnWmFkYW5pZScsIGxlZnQ6IDAsIHdpZHRoOiAzMzAgfVxyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgZWxlbTogRWxlbWVudFJlZixcclxuICAgICAgICBwdWJsaWMgZ2FudHRTZXJ2aWNlOiBHYW50dFNlcnZpY2UpIHtcclxuICAgIH1cclxuXHJcbiAgICBkb1doZWVsKGV2ZW50LCBlbGVtOiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgIC8vIGNob21lXHJcbiAgICAgICAgaWYgKGV2ZW50LndoZWVsRGVsdGEpIHtcclxuICAgICAgICAgICAgaWYgKChldmVudC53aGVlbERlbHRhIHx8IGV2ZW50LmRldGFpbCkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtLnNjcm9sbExlZnQgLT0gMTAwO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZWxlbS5zY3JvbGxMZWZ0ICs9IDEwMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vIGZpcmVmb3hcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQuZGVsdGFZID4gMCkge1xyXG4gICAgICAgICAgICAgICAgZWxlbS5zY3JvbGxMZWZ0ICs9IDEwMDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGVsZW0uc2Nyb2xsTGVmdCAtPSAxMDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIC8vIENhY2hlIHRoZSBwcm9qZWN0IGRhdGEgYW5kIG9ubHkgd29yayB3aXRoIHRoYXQuIE9ubHkgc2hvdyBwYXJlbnQgdGFza3MgYnkgZGVmYXVsdFxyXG4gICAgICAgIHRoaXMuZ2FudHRTZXJ2aWNlLlRBU0tfQ0FDSEUgPSB0aGlzLnByb2plY3QudGFza3M7XHJcbiAgICAgICAgdGhpcy5nYW50dFNlcnZpY2UuVElNRV9TQ0FMRSA9IHRoaXMuZ2FudHRTZXJ2aWNlLmNhbGN1bGF0ZVNjYWxlKHRoaXMub3B0aW9ucy5zY2FsZS5zdGFydCwgdGhpcy5vcHRpb25zLnNjYWxlLmVuZCk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhcnQgPSB0aGlzLm9wdGlvbnMuc2NhbGUuc3RhcnQ7XHJcbiAgICAgICAgdGhpcy5lbmQgPSB0aGlzLm9wdGlvbnMuc2NhbGUuZW5kO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyV2lkdGggPSB0aGlzLmNhbGN1bGF0ZUNvbnRhaW5lcldpZHRoKCk7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXJIZWlnaHQgPSB0aGlzLmNhbGN1bGF0ZUNvbnRhaW5lckhlaWdodCgpO1xyXG4gICAgICAgIHRoaXMuYWN0aXZpdHlDb250YWluZXJTaXplcyA9IHRoaXMuZ2FudHRTZXJ2aWNlLmNhbGN1bGF0ZUFjdGl2aXR5Q29udGFpbmVyRGltZW5zaW9ucygpO1xyXG5cclxuICAgICAgICB0aGlzLmdyaWRDb2x1bW5zID0gdGhpcy5vcHRpb25zLmdyaWRDb2x1bW5zID8gdGhpcy5vcHRpb25zLmdyaWRDb2x1bW5zIDogdGhpcy5ncmlkQ29sdW1ucztcclxuXHJcbiAgICAgICAgLy8gaW1wb3J0YW50IHRoYXQgdGhlc2UgYXJlIGNhbGxlZCBsYXN0IGFzIGl0IHJlbGllcyBvbiB2YWx1ZXMgY2FsY3VsYXRlZCBhYm92ZS5cclxuICAgICAgICB0aGlzLnNldFNjYWxlKCk7XHJcbiAgICAgICAgdGhpcy5zZXREaW1lbnNpb25zKCk7XHJcbiAgICAgICAgdGhpcy5zZXRTaXplcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDdXN0b20gbW9kZWwgY2hlY2sgKi9cclxuICAgIG5nRG9DaGVjaygpIHtcclxuICAgICAgICAvLyBkbyBhIGNoZWNrIHRvIHNlZSB3aGV0aGVyIGFueSBuZXcgdGFza3MgaGF2ZSBiZWVuIGFkZGVkLiBJZiB0aGUgdGFzayBpcyBhIGNoaWxkIHRoZW4gcHVzaCBpbnRvIGFycmF5IGlmIHRyZWUgZXhwYW5kZWQ/XHJcbiAgICAgICAgdGhpcy5nYW50dFNlcnZpY2UuZG9UYXNrQ2hlY2sodGhpcy5wcm9qZWN0LnRhc2tzLCB0aGlzLm9wdGlvbnMuc2NhbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBPbiB2ZXJ0aWNhbCBzY3JvbGwgc2V0IHRoZSBzY3JvbGwgdG9wIG9mIGdyaWQgYW5kIGFjdGl2aXR5ICAqL1xyXG4gICAgb25WZXJ0aWNhbFNjcm9sbCh2ZXJ0aWNhbFNjcm9sbDogYW55LCBnYW50dEdyaWQ6IGFueSwgZ2FudHRBY3Rpdml0eUFyZWE6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZ2FudHRTZXJ2aWNlLnNjcm9sbFRvcCh2ZXJ0aWNhbFNjcm9sbCwgZ2FudHRHcmlkLCBnYW50dEFjdGl2aXR5QXJlYSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ3JpZFJvd0NsaWNrKHRhc2spIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLm9uR3JpZFJvd0NsaWNrLmVtaXQodGFzayk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7IH1cclxuICAgIH1cclxuXHJcbiAgICBwb3BvdmVyT3Blbih0YXNrKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5vblBvcG92ZXJPcGVuLmVtaXQodGFzayk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7IH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogT24gcmVzaXplIG9mIGJyb3dzZXIgd2luZG93IGR5bmFtaWNhbGx5IGFkanVzdCBnYW50dCBhY3Rpdml0eSBoZWlnaHQgYW5kIHdpZHRoICovXHJcbiAgICBvblJlc2l6ZShldmVudDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgYWN0aXZpdHlDb250YWluZXJTaXplcyA9IHRoaXMuZ2FudHRTZXJ2aWNlLmNhbGN1bGF0ZUFjdGl2aXR5Q29udGFpbmVyRGltZW5zaW9ucygpO1xyXG4gICAgICAgIHRoaXMuZ2FudHRBY3Rpdml0eUhlaWdodCA9IGFjdGl2aXR5Q29udGFpbmVyU2l6ZXMuaGVpZ2h0ICsgJ3B4JztcclxuICAgICAgICB0aGlzLmdhbnR0QWN0aXZpdHlXaWR0aCA9IGFjdGl2aXR5Q29udGFpbmVyU2l6ZXMud2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2NhbGUoKSB7XHJcbiAgICAgICAgdGhpcy5zY2FsZS5zdGFydCA9IHRoaXMuc3RhcnQ7XHJcbiAgICAgICAgdGhpcy5zY2FsZS5lbmQgPSB0aGlzLmVuZDtcclxuICAgIH1cclxuXHJcbiAgICBzZXREaW1lbnNpb25zKCkge1xyXG4gICAgICAgIHRoaXMuZGltZW5zaW9ucy5oZWlnaHQgPSB0aGlzLmNvbnRhaW5lckhlaWdodDtcclxuICAgICAgICB0aGlzLmRpbWVuc2lvbnMud2lkdGggPSB0aGlzLmNvbnRhaW5lcldpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEdyaWRSb3dTdHlsZSgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICdoZWlnaHQnOiB0aGlzLmdhbnR0U2VydmljZS5yb3dIZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAnbGluZS1oZWlnaHQnOiB0aGlzLmdhbnR0U2VydmljZS5yb3dIZWlnaHQgKyAncHgnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRHcmlkU2NhbGVTdHlsZSgpIHtcclxuICAgICAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmdhbnR0U2VydmljZS5yb3dIZWlnaHQgKyAzMDtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAnaGVpZ2h0JzogaGVpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogaGVpZ2h0ICsgJ3B4J1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY2FsY3VsYXRlQ29sdW1uc1dpZHRoKCkge1xyXG4gICAgICAgIGNvbnN0IGdhbnR0QWN0aXZpdHlXaWR0aCA9IHRoaXMuZ3JpZENvbHVtbnMubWFwKGNvbHVtbiA9PiB7IHJldHVybiBjb2x1bW4ud2lkdGggfSkucmVkdWNlKChwdiwgY3YpID0+IHB2ICsgY3YsIDApICsgMTtcclxuICAgICAgICByZXR1cm4gYGNhbGMoMTAwJSAtICR7KGdhbnR0QWN0aXZpdHlXaWR0aCl9cHgpYDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZUNvbnRhaW5lckhlaWdodCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdhbnR0U2VydmljZS5UQVNLX0NBQ0hFLmxlbmd0aCAqIHRoaXMuZ2FudHRTZXJ2aWNlLnJvd0hlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZUNvbnRhaW5lcldpZHRoKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FudHRTZXJ2aWNlLlRJTUVfU0NBTEUubGVuZ3RoICogdGhpcy5nYW50dFNlcnZpY2UuY2VsbFdpZHRoICsgdGhpcy5nYW50dFNlcnZpY2UuY2VsbFdpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0U2l6ZXMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5nYW50dEFjdGl2aXR5SGVpZ2h0ID0gdGhpcy5hY3Rpdml0eUNvbnRhaW5lclNpemVzLmhlaWdodCArICdweCc7XHJcbiAgICAgICAgdGhpcy5nYW50dEFjdGl2aXR5V2lkdGggPSB0aGlzLmFjdGl2aXR5Q29udGFpbmVyU2l6ZXMud2lkdGg7XHJcbiAgICB9XHJcbn1cclxuIl19