(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@material-extended/mde'), require('@angular/material/card'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('angular-gantt', ['exports', '@angular/core', '@angular/common', '@material-extended/mde', '@angular/material/card', '@angular/forms'], factory) :
    (global = global || self, factory(global['angular-gantt'] = {}, global.ng.core, global.ng.common, global.mde, global.ng.material.card, global.ng.forms));
}(this, (function (exports, core, common, mde, card, forms) { 'use strict';

    var GanttConfig = /** @class */ (function () {
        function GanttConfig() {
            this.cellWidth = 38;
            this.rowHeight = 30;
            this.activityHeight = 420;
            this.barHeight = 25;
            this.barLineHeight = 35;
            this.barMoveable = false;
        }
        /** @nocollapse */ GanttConfig.ɵfac = function GanttConfig_Factory(t) { return new (t || GanttConfig)(); };
        /** @nocollapse */ GanttConfig.ɵprov = core.ɵɵdefineInjectable({ token: GanttConfig, factory: GanttConfig.ɵfac });
        return GanttConfig;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(GanttConfig, [{
            type: core.Injectable
        }], null, null); })();

    var GanttService = /** @class */ (function () {
        function GanttService() {
            this.rowHeight = 0;
            this.hourCellWidth = 60; // change to 60 so minutes can been seen more easily
            this.hoursCellWidth = this.hourCellWidth * 25;
            this.cellWidth = 0;
            this.windowInnerWidth = 0;
            this.activityHeight = 0;
            this.barHeight = 0;
            this.barLineHeight = 0;
            this.barTop = 0;
            this.barMoveable = false;
            this.gridWidth = 0; //188
            this.gridHeight = 332;
            var ganttConfig = new GanttConfig();
            this.rowHeight = ganttConfig.rowHeight;
            this.cellWidth = ganttConfig.cellWidth;
            this.activityHeight = ganttConfig.activityHeight;
            this.barHeight = ganttConfig.barHeight;
            this.barLineHeight = ganttConfig.barLineHeight;
            this.barTop = ganttConfig.rowHeight;
            this.barMoveable = ganttConfig.barMoveable;
        }
        GanttService.prototype.calculateBarWidth = function (start, end) {
            if (typeof start === 'string') {
                start = new Date(start);
            }
            if (typeof end === 'string') {
                end = new Date(end);
            }
            var days = this.calculateDiffDays(start, end);
            var width = (days * this.cellWidth + days) / 7;
            return width;
        };
        GanttService.prototype.calculateBarLeft = function (start, scale) {
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
        GanttService.prototype.calculateGanttHeight = function () {
            return this.TASK_CACHE.length * this.rowHeight + "px";
        };
        GanttService.prototype.calculateBarLeftDelta = function (start) {
            var offset = 0;
            var hoursInDay = 24;
            var minutesInHour = 60;
            var secondsInHour = 3600;
            var startHours = (start.getHours() + start.getMinutes() / minutesInHour + start.getSeconds() / secondsInHour);
            offset = this.cellWidth / hoursInDay * startHours;
            return offset;
        };
        /** Calculate the bar styles */
        GanttService.prototype.calculateBar = function (task, index, scale) {
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
        GanttService.prototype.getBarStyle = function (color) {
            var style = {};
            style["background-color"] = color.secondary;
            style["border-left"] = "5px solid " + color.primary;
            return style;
        };
        /** Calculates the difference in two dates and returns number of days */
        GanttService.prototype.calculateDiffDays = function (start, end) {
            try {
                var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds /ms
                var diffDays = Math.abs((start.getTime() - end.getTime()) / (oneDay));
                var days = diffDays; // don't use Math.round as it will draw an incorrect bar
                return days;
            }
            catch (err) {
                return 0;
            }
        };
        /** Calculate the gantt scale range given the start and end date of tasks*/
        GanttService.prototype.calculateScale = function (start, end) {
            if (start === void 0) { start = new Date(); }
            if (end === void 0) { end = this.addDays(start, 7); }
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
        GanttService.prototype.calculateMonthScale = function (start, end) {
            if (start === void 0) { start = new Date(); }
            if (end === void 0) { end = this.addDays(start, 7); }
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
        GanttService.prototype.isDayWeekend = function (date) {
            var day = date.getDay();
            if (day === 6 || day === 0) {
                return true;
            }
            return false;
        };
        /** Add x number of days to a date object */
        GanttService.prototype.addDays = function (date, days) {
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        };
        //** Remove x number of days from a date object */
        GanttService.prototype.removeDays = function (date, days) {
            var result = new Date(date);
            result.setDate(result.getDate() - days);
            return result;
        };
        /** Calculates the grid scale for gantt based on tasks start and end dates */
        GanttService.prototype.calculateGridScale = function (tasks) {
            var start;
            var end;
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
        GanttService.prototype.getComputedStyle = function (element, attribute) {
            return parseInt(document.defaultView.getComputedStyle(element)[attribute], 10);
        };
        //TODO(dale): determine whether this is needed
        GanttService.prototype.calculateContainerWidth = function () {
            this.windowInnerWidth = window.innerWidth;
            var containerWidth = this.gridWidth - 18;
            return containerWidth;
        };
        GanttService.prototype.calculateContainerHeight = function () {
            var containerHeight = (innerHeight - 18);
            return containerHeight;
        };
        GanttService.prototype.calculateActivityContainerDimensions = function () {
            var scrollWidth = 18;
            this.windowInnerWidth = window.innerWidth;
            var width = window.innerWidth - this.gridWidth - scrollWidth;
            return { height: this.activityHeight, width: width };
        };
        GanttService.prototype.calculateGanttActivityWidth = function (elem) {
            return "calc(100% - " + (elem.offsetWidth + 1) + "px)";
        };
        GanttService.prototype.calculateGanttActivityHeight = function (elem) {
            return elem.offsetHeight + "px";
        };
        GanttService.prototype.calculateCellMonthWidth = function (minDate, maxDate) {
            var i, result = [];
            var startDate = minDate;
            var endDate = maxDate;
            var monthDiff = this.calculateDiffMonths(startDate, endDate);
            var dayDiff = this.calculateDiffDays(startDate, endDate);
            for (i = 0; i < monthDiff; i++) {
                var startOfMonth = i === 0 ? startDate : new Date(startDate.getFullYear(), i, 1);
                var endOfMonth = i === monthDiff - 1 ? endDate : new Date(startDate.getFullYear(), i + 1, 0);
                var dayInMonth = this.calculateDiffDays(startOfMonth, endOfMonth) + (i !== monthDiff - 1 && 1);
                var width = Math.floor(dayInMonth / dayDiff * 2E3) * 1.025;
                result.push({ start: startOfMonth, end: endOfMonth, width: width });
            }
            return result;
        };
        GanttService.prototype.calculateDiffMonths = function (start, end) {
            var months = end.getMonth() - start.getMonth() + (12 * (end.getFullYear() - start.getFullYear()));
            if (end.getDate() < start.getDate()) {
                var newFrom = new Date(end.getFullYear(), end.getMonth(), start.getDate());
                if (end < newFrom && end.getMonth() == newFrom.getMonth() && end.getYear() % 4 != 0) {
                    months--;
                }
            }
            return months + 1;
        };
        /** Set the vertical scroll top positions for gantt */
        GanttService.prototype.scrollTop = function (verticalScrollElem, ganttGridElem, ganttActivityAreaElem) {
            var verticalScrollTop = verticalScrollElem.scrollTop;
            var scroll = this.setScrollTop;
            // debounce
            if (verticalScrollTop !== null && verticalScrollTop !== undefined) {
                scroll(verticalScrollTop, ganttActivityAreaElem);
                scroll(ganttActivityAreaElem.scrollTop, ganttGridElem);
            }
        };
        /** Group data by id , only supports one level*/
        GanttService.prototype.groupData = function (tasks) {
            return tasks;
        };
        /** Checks whether any new data needs to be added to task cache  */
        GanttService.prototype.doTaskCheck = function (tasks, scale) {
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
        GanttService.prototype.setIdPrefix = function (id) {
            return "_" + id;
        };
        // /** Remove the id prefix to allow querying of data */
        // public removeIdPrefix(id: string): string {
        //     return id.substring(1, id.length - 1);
        // }
        /** Set the scroll top property of a native DOM element */
        GanttService.prototype.setScrollTop = function (scrollTop, element) {
            if (element !== null && element !== undefined) {
                element.scrollTop = scrollTop;
            }
        };
        /** @nocollapse */ GanttService.ɵfac = function GanttService_Factory(t) { return new (t || GanttService)(); };
        /** @nocollapse */ GanttService.ɵprov = core.ɵɵdefineInjectable({ token: GanttService, factory: GanttService.ɵfac });
        return GanttService;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(GanttService, [{
            type: core.Injectable
        }], function () { return []; }, null); })();

    function GanttTimeScaleComponent_div_2_Template(rf, ctx) { if (rf & 1) {
        core.ɵɵelementStart(0, "div", 3);
        core.ɵɵtext(1);
        core.ɵɵpipe(2, "date");
        core.ɵɵelementEnd();
    } if (rf & 2) {
        var date_r2 = ctx.$implicit;
        var i_r3 = ctx.index;
        var ctx_r0 = core.ɵɵnextContext();
        core.ɵɵproperty("ngClass", i_r3 % 2 ? "weekend" : "")("ngStyle", ctx_r0.setTimescaleWeekendCellStyle());
        core.ɵɵadvance(1);
        core.ɵɵtextInterpolate(core.ɵɵpipeBind2(2, 3, date_r2, "dd-MM"));
    } }
    function GanttTimeScaleComponent_div_4_Template(rf, ctx) { if (rf & 1) {
        core.ɵɵelementStart(0, "div", 3);
        core.ɵɵtext(1);
        core.ɵɵelementEnd();
    } if (rf & 2) {
        var i_r5 = ctx.index;
        var ctx_r1 = core.ɵɵnextContext();
        core.ɵɵproperty("ngClass", i_r5 % 2 ? "weekend" : "")("ngStyle", ctx_r1.setTimescaleWeekendCellStyle());
        core.ɵɵadvance(1);
        core.ɵɵtextInterpolate(i_r5 + 1);
    } }
    var GanttTimeScaleComponent = /** @class */ (function () {
        function GanttTimeScaleComponent(ganttService) {
            this.ganttService = ganttService;
        }
        GanttTimeScaleComponent.prototype.ngOnInit = function () {
        };
        GanttTimeScaleComponent.prototype.setTimescaleStyle = function () {
            return {
                'width': (this.dimensions.width + 36) + 'px'
            };
        };
        GanttTimeScaleComponent.prototype.setTimescaleMonthLineStyle = function (borderTop) {
            return {
                'height': this.ganttService.rowHeight + 'px',
                'line-height': this.ganttService.rowHeight + 'px',
                'position': 'relative',
                'border-top': borderTop
            };
        };
        GanttTimeScaleComponent.prototype.setTimescaleMonthCellStyle = function () {
            return {
                'width': this.ganttService.cellWidth + 'px'
            };
        };
        GanttTimeScaleComponent.prototype.setTimescaleWeekendLineStyle = function (borderTop) {
            return {
                'height': this.ganttService.rowHeight + 'px',
                'line-height': this.ganttService.rowHeight + 'px',
                'position': 'relative',
                'border-top': borderTop
            };
        };
        GanttTimeScaleComponent.prototype.setTimescaleWeekendCellStyle = function () {
            return {
                'width': this.ganttService.cellWidth + 'px'
            };
        };
        GanttTimeScaleComponent.prototype.isDayWeekend = function (date) {
            return this.ganttService.isDayWeekend(date);
        };
        /** @nocollapse */ GanttTimeScaleComponent.ɵfac = function GanttTimeScaleComponent_Factory(t) { return new (t || GanttTimeScaleComponent)(core.ɵɵdirectiveInject(GanttService)); };
        /** @nocollapse */ GanttTimeScaleComponent.ɵcmp = core.ɵɵdefineComponent({ type: GanttTimeScaleComponent, selectors: [["time-scale"]], inputs: { timeScaleMonth: "timeScaleMonth", timeScaleWeekend: "timeScaleWeekend", dimensions: "dimensions", scale: "scale" }, features: [core.ɵɵProvidersFeature([
                    GanttService
                ])], decls: 5, vars: 5, consts: [[1, "time-scale", 3, "ngStyle"], [1, "time-scale-line", 3, "ngStyle"], ["class", "time-scale-cell", 3, "ngClass", "ngStyle", 4, "ngFor", "ngForOf"], [1, "time-scale-cell", 3, "ngClass", "ngStyle"]], template: function GanttTimeScaleComponent_Template(rf, ctx) { if (rf & 1) {
                core.ɵɵelementStart(0, "div", 0);
                core.ɵɵelementStart(1, "div", 1);
                core.ɵɵtemplate(2, GanttTimeScaleComponent_div_2_Template, 3, 6, "div", 2);
                core.ɵɵelementEnd();
                core.ɵɵelementStart(3, "div", 1);
                core.ɵɵtemplate(4, GanttTimeScaleComponent_div_4_Template, 2, 3, "div", 2);
                core.ɵɵelementEnd();
                core.ɵɵelementEnd();
            } if (rf & 2) {
                core.ɵɵproperty("ngStyle", ctx.setTimescaleStyle());
                core.ɵɵadvance(1);
                core.ɵɵproperty("ngStyle", ctx.setTimescaleWeekendLineStyle("none"));
                core.ɵɵadvance(1);
                core.ɵɵproperty("ngForOf", ctx.timeScaleWeekend);
                core.ɵɵadvance(1);
                core.ɵɵproperty("ngStyle", ctx.setTimescaleWeekendLineStyle("none"));
                core.ɵɵadvance(1);
                core.ɵɵproperty("ngForOf", ctx.timeScaleWeekend);
            } }, directives: [common.NgStyle, common.NgForOf, common.NgClass], pipes: [common.DatePipe], styles: [".weekend[_ngcontent-%COMP%] {\n            background-color: whitesmoke;\n        }\n        .time-scale[_ngcontent-%COMP%] {\n            font-size: 12px;\n            background-color: #fff;\n            border-bottom: 1px solid #cecece;\n        }\n        .time-scale-line[_ngcontent-%COMP%] {\n            box-sizing: border-box;\n            border-bottom: 1px solid #cecece;\n        }\n        .time-scale-line[_ngcontent-%COMP%]:first-child {\n            border-top: none;\n        }\n        .time-scale-cell[_ngcontent-%COMP%] {\n            display: inline-block;\n            white-space: nowrap;\n            overflow: hidden;\n            border-right: 1px solid #cecece;\n            text-align: center;\n            height: 100%;\n        }"] });
        return GanttTimeScaleComponent;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(GanttTimeScaleComponent, [{
            type: core.Component,
            args: [{
                    selector: 'time-scale',
                    template: "\n        <div class=\"time-scale\" [ngStyle]=\"setTimescaleStyle()\">\n            <!--<div class=\"time-scale-line\" [ngStyle]=\"setTimescaleMonthLineStyle('none')\">\n                <div class=\"time-scale-cell\" *ngFor=\"let scale of timeScaleMonth; let i = index\"\n                    [ngClass]=\"(i % 2) ? 'weekend' : ''\" [style.width.px]=\"scale.width\">{{scale.start | date: 'dd-MM'}}</div>\n            </div>-->\n            <div class=\"time-scale-line\" [ngStyle]=\"setTimescaleWeekendLineStyle('none')\">\n                <div class=\"time-scale-cell\" *ngFor=\"let date of timeScaleWeekend; let i = index\"\n                    [ngClass]=\"(i % 2) ? 'weekend' : ''\" [ngStyle]=\"setTimescaleWeekendCellStyle()\">{{date | date: 'dd-MM'}}</div>\n            </div>\n            <div class=\"time-scale-line\" [ngStyle]=\"setTimescaleWeekendLineStyle('none')\">\n                <div class=\"time-scale-cell\" *ngFor=\"let date of timeScaleWeekend; let i = index\"\n                [ngClass]=\"(i % 2) ? 'weekend' : ''\" [ngStyle]=\"setTimescaleWeekendCellStyle()\">{{i + 1}}</div>\n            </div>\n        </div>",
                    styles: ["\n        .weekend {\n            background-color: whitesmoke;\n        }\n        .time-scale {\n            font-size: 12px;\n            background-color: #fff;\n            border-bottom: 1px solid #cecece;\n        }\n        .time-scale-line {\n            box-sizing: border-box;\n            border-bottom: 1px solid #cecece;\n        }\n        .time-scale-line:first-child {\n            border-top: none;\n        }\n        .time-scale-cell {\n            display: inline-block;\n            white-space: nowrap;\n            overflow: hidden;\n            border-right: 1px solid #cecece;\n            text-align: center;\n            height: 100%;\n        }"
                    ],
                    providers: [
                        GanttService
                    ]
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

    var _c0 = ["bg"];
    function GanttActivityBackgroundComponent_div_2_div_1_Template(rf, ctx) { if (rf & 1) {
        core.ɵɵelement(0, "div", 5);
    } if (rf & 2) {
        var i_r5 = ctx.index;
        var ctx_r3 = core.ɵɵnextContext(2);
        core.ɵɵproperty("ngStyle", ctx_r3.setCellStyle())("ngClass", i_r5 % 2 ? "weekend" : "");
    } }
    function GanttActivityBackgroundComponent_div_2_Template(rf, ctx) { if (rf & 1) {
        core.ɵɵelementStart(0, "div", 3);
        core.ɵɵtemplate(1, GanttActivityBackgroundComponent_div_2_div_1_Template, 1, 2, "div", 4);
        core.ɵɵelementEnd();
    } if (rf & 2) {
        var ctx_r1 = core.ɵɵnextContext();
        core.ɵɵproperty("ngStyle", ctx_r1.setRowStyle());
        core.ɵɵadvance(1);
        core.ɵɵproperty("ngForOf", ctx_r1.cells);
    } }
    var GanttActivityBackgroundComponent = /** @class */ (function () {
        function GanttActivityBackgroundComponent(ganttService) {
            this.ganttService = ganttService;
            this.rows = [];
            this.cells = [];
        }
        GanttActivityBackgroundComponent.prototype.ngOnInit = function () {
            this.drawGrid();
        };
        GanttActivityBackgroundComponent.prototype.isDayWeekend = function (date) {
            return this.ganttService.isDayWeekend(date);
        };
        GanttActivityBackgroundComponent.prototype.setRowStyle = function () {
            return {
                'height': this.ganttService.rowHeight + 'px'
            };
        };
        GanttActivityBackgroundComponent.prototype.setCellStyle = function () {
            return {
                'width': this.ganttService.cellWidth + 'px'
            };
        };
        GanttActivityBackgroundComponent.prototype.drawGrid = function () {
            this.cells = this.timeScale;
        };
        /** @nocollapse */ GanttActivityBackgroundComponent.ɵfac = function GanttActivityBackgroundComponent_Factory(t) { return new (t || GanttActivityBackgroundComponent)(core.ɵɵdirectiveInject(GanttService)); };
        /** @nocollapse */ GanttActivityBackgroundComponent.ɵcmp = core.ɵɵdefineComponent({ type: GanttActivityBackgroundComponent, selectors: [["activity-background"]], viewQuery: function GanttActivityBackgroundComponent_Query(rf, ctx) { if (rf & 1) {
                core.ɵɵviewQuery(_c0, true);
            } if (rf & 2) {
                var _t;
                core.ɵɵqueryRefresh(_t = core.ɵɵloadQuery()) && (ctx.bg = _t.first);
            } }, inputs: { tasks: "tasks", timeScale: "timeScale" }, decls: 3, vars: 1, consts: [[1, "gantt-activity-bg"], ["bg", ""], ["class", "gantt-activity-row", 3, "ngStyle", 4, "ngFor", "ngForOf"], [1, "gantt-activity-row", 3, "ngStyle"], ["class", "gantt-activity-cell", 3, "ngStyle", "ngClass", 4, "ngFor", "ngForOf"], [1, "gantt-activity-cell", 3, "ngStyle", "ngClass"]], template: function GanttActivityBackgroundComponent_Template(rf, ctx) { if (rf & 1) {
                core.ɵɵelementStart(0, "div", 0, 1);
                core.ɵɵtemplate(2, GanttActivityBackgroundComponent_div_2_Template, 2, 2, "div", 2);
                core.ɵɵelementEnd();
            } if (rf & 2) {
                core.ɵɵadvance(2);
                core.ɵɵproperty("ngForOf", ctx.tasks);
            } }, directives: [common.NgForOf, common.NgStyle, common.NgClass], styles: [".weekend[_ngcontent-%COMP%] {\n            background-color: whitesmoke;\n        }\n        .gantt-activity-bg[_ngcontent-%COMP%] {\n            overflow: hidden;\n        }\n        .gantt-activity-row[_ngcontent-%COMP%] {\n            border-bottom: 1px solid #ebebeb;\n            background-color: #fff;\n            box-sizing: border-box;\n        }\n        .gantt-activity-cell[_ngcontent-%COMP%] {\n            display: inline-block;\n            height: 100%;\n            border-right: 1px solid #ebebeb;\n        }"] });
        return GanttActivityBackgroundComponent;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(GanttActivityBackgroundComponent, [{
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

    function GanttActivityBarsComponent_div_1_ng_container_6_Template(rf, ctx) { if (rf & 1) {
        core.ɵɵelementContainer(0);
    } }
    var _c0$1 = function (a0) { return { task: a0 }; };
    function GanttActivityBarsComponent_div_1_Template(rf, ctx) { if (rf & 1) {
        var _r10 = core.ɵɵgetCurrentView();
        core.ɵɵelementStart(0, "div", 3, 4);
        core.ɵɵlistener("click", function GanttActivityBarsComponent_div_1_Template_div_click_0_listener() { core.ɵɵrestoreView(_r10); var task_r3 = ctx.$implicit; var ctx_r9 = core.ɵɵnextContext(); return ctx_r9.gridRowClicked(task_r3); });
        core.ɵɵelementStart(2, "div", 5, 6);
        core.ɵɵlistener("opened", function GanttActivityBarsComponent_div_1_Template_div_opened_2_listener() { core.ɵɵrestoreView(_r10); var task_r3 = ctx.$implicit; var ctx_r11 = core.ɵɵnextContext(); return ctx_r11.popoverOpened(task_r3); });
        core.ɵɵelementStart(4, "mde-popover", 7, 8);
        core.ɵɵtemplate(6, GanttActivityBarsComponent_div_1_ng_container_6_Template, 1, 0, "ng-container", 9);
        core.ɵɵelementEnd();
        core.ɵɵelement(7, "div", 10);
        core.ɵɵelementStart(8, "div", 11);
        core.ɵɵelement(9, "div", 12);
        core.ɵɵelementEnd();
        core.ɵɵelementStart(10, "div", 13);
        core.ɵɵelement(11, "div", 12);
        core.ɵɵelementEnd();
        core.ɵɵelementEnd();
        core.ɵɵelementEnd();
    } if (rf & 2) {
        var task_r3 = ctx.$implicit;
        var i_r4 = ctx.index;
        var _r7 = core.ɵɵreference(5);
        var ctx_r0 = core.ɵɵnextContext();
        var _r1 = core.ɵɵreference(3);
        core.ɵɵproperty("ngStyle", ctx_r0.drawBar(task_r3, i_r4));
        core.ɵɵadvance(2);
        core.ɵɵproperty("mdePopoverTriggerFor", _r7)("mdePopoverBackdropCloseOnClick", false);
        core.ɵɵadvance(2);
        core.ɵɵproperty("mdePopoverEnterDelay", 100)("mdePopoverLeaveDelay", 0)("mdePopoverPositionY", "above")("mdePopoverOverlapTrigger", false)("mdePopoverDisableAnimation", false)("mdeFocusTrapEnabled", false)("mdePopoverArrowWidth", 12)("mdePopoverArrowColor", task_r3.color == null ? null : task_r3.color.primary);
        core.ɵɵadvance(2);
        core.ɵɵproperty("ngTemplateOutlet", _r1)("ngTemplateOutletContext", core.ɵɵpureFunction1(13, _c0$1, task_r3));
    } }
    function GanttActivityBarsComponent_ng_template_2_mat_card_0_footer_17_Template(rf, ctx) { if (rf & 1) {
        core.ɵɵelementStart(0, "footer");
        core.ɵɵelement(1, "span", 20);
        core.ɵɵelementEnd();
    } if (rf & 2) {
        var data_r12 = core.ɵɵnextContext(2).task;
        core.ɵɵadvance(1);
        core.ɵɵproperty("innerHTML", data_r12.description, core.ɵɵsanitizeHtml);
    } }
    var _c1 = function (a0) { return { borderBottomColor: a0, borderBottomWidth: ".25em", borderBottomStyle: "solid" }; };
    var _c2 = function (a0) { return { borderColor: a0 }; };
    function GanttActivityBarsComponent_ng_template_2_mat_card_0_Template(rf, ctx) { if (rf & 1) {
        core.ɵɵelementStart(0, "mat-card", 15);
        core.ɵɵelementStart(1, "mat-card-header");
        core.ɵɵelement(2, "div", 16);
        core.ɵɵelementStart(3, "mat-card-title");
        core.ɵɵelementStart(4, "span", 17);
        core.ɵɵtext(5);
        core.ɵɵelementEnd();
        core.ɵɵelementEnd();
        core.ɵɵelementStart(6, "mat-card-subtitle");
        core.ɵɵelementStart(7, "span");
        core.ɵɵtext(8);
        core.ɵɵpipe(9, "date");
        core.ɵɵpipe(10, "date");
        core.ɵɵelementEnd();
        core.ɵɵelementEnd();
        core.ɵɵelementStart(11, "mat-card-subtitle");
        core.ɵɵelementStart(12, "span", 18);
        core.ɵɵtext(13, "\u0336");
        core.ɵɵelementEnd();
        core.ɵɵelementStart(14, "span");
        core.ɵɵtext(15);
        core.ɵɵelementEnd();
        core.ɵɵelementEnd();
        core.ɵɵelementEnd();
        core.ɵɵelementStart(16, "mat-card-content");
        core.ɵɵtemplate(17, GanttActivityBarsComponent_ng_template_2_mat_card_0_footer_17_Template, 2, 1, "footer", 19);
        core.ɵɵelementEnd();
        core.ɵɵelementEnd();
    } if (rf & 2) {
        var data_r12 = core.ɵɵnextContext().task;
        core.ɵɵproperty("ngStyle", core.ɵɵpureFunction1(13, _c1, data_r12.color == null ? null : data_r12.color.primary));
        core.ɵɵadvance(2);
        core.ɵɵproperty("ngStyle", core.ɵɵpureFunction1(15, _c2, data_r12.color == null ? null : data_r12.color.primary));
        core.ɵɵadvance(3);
        core.ɵɵtextInterpolate(data_r12.name);
        core.ɵɵadvance(3);
        core.ɵɵtextInterpolate2("", core.ɵɵpipeBind2(9, 7, data_r12.start, "yyyy-MM-dd"), " - ", core.ɵɵpipeBind2(10, 10, data_r12.end, "yyyy-MM-dd"), "");
        core.ɵɵadvance(7);
        core.ɵɵtextInterpolate(data_r12.resource);
        core.ɵɵadvance(2);
        core.ɵɵproperty("ngIf", data_r12.description);
    } }
    function GanttActivityBarsComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
        core.ɵɵtemplate(0, GanttActivityBarsComponent_ng_template_2_mat_card_0_Template, 18, 17, "mat-card", 14);
    } if (rf & 2) {
        var data_r12 = ctx.task;
        core.ɵɵproperty("ngIf", data_r12);
    } }
    var _c3 = function (a0, a1) { return { "height": a0, "width": a1 }; };
    var GanttActivityBarsComponent = /** @class */ (function () {
        function GanttActivityBarsComponent(ganttService) {
            this.ganttService = ganttService;
            this.onGridRowClick = new core.EventEmitter();
            this.onPopoverOpen = new core.EventEmitter();
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
        /** @nocollapse */ GanttActivityBarsComponent.ɵfac = function GanttActivityBarsComponent_Factory(t) { return new (t || GanttActivityBarsComponent)(core.ɵɵdirectiveInject(GanttService)); };
        /** @nocollapse */ GanttActivityBarsComponent.ɵcmp = core.ɵɵdefineComponent({ type: GanttActivityBarsComponent, selectors: [["activity-bars"]], inputs: { timeScale: "timeScale", dimensions: "dimensions", tasks: "tasks" }, outputs: { onGridRowClick: "onGridRowClick", onPopoverOpen: "onPopoverOpen" }, features: [core.ɵɵProvidersFeature([
                    GanttService
                ])], decls: 4, vars: 5, consts: [[1, "gantt-activity-bars-area", 3, "ngStyle"], ["class", "gantt-activity-line", 3, "ngStyle", "click", 4, "ngFor", "ngForOf"], ["templatePopoverTask", ""], [1, "gantt-activity-line", 3, "ngStyle", "click"], ["bar", ""], ["mdePopoverOffsetX", "-15", "mdePopoverOffsetY", "0", 3, "mdePopoverTriggerFor", "mdePopoverBackdropCloseOnClick", "opened"], ["popoverTrigger", "mdePopoverTrigger"], ["mdePopoverPlacement", "bottom", 3, "mdePopoverEnterDelay", "mdePopoverLeaveDelay", "mdePopoverPositionY", "mdePopoverOverlapTrigger", "mdePopoverDisableAnimation", "mdeFocusTrapEnabled", "mdePopoverArrowWidth", "mdePopoverArrowColor"], ["taskPopover", "mdePopover"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "gantt-activity-content"], [1, "gantt-activity-link-control", "gantt-activity-right", 2, "height", "26px", "line-height", "30px"], [1, "gantt-link-point"], [1, "gantt-activity-link-control", "gantt-activity-left", 2, "height", "26px", "line-height", "30px"], ["class", "mat-elevation-z6", "style", "width: 320px; max-width: 320px;", 3, "ngStyle", 4, "ngIf"], [1, "mat-elevation-z6", 2, "width", "320px", "max-width", "320px", 3, "ngStyle"], ["mat-card-avatar", "", 2, "width", "0", "height", "unset", "margin-bottom", ".7em", "border-radius", "0", "border-style", "solid", 3, "ngStyle"], [2, "font-size", "80%"], [2, "padding-left", ".75em", "padding-right", "1em", "font-stretch", "condensed"], [4, "ngIf"], [3, "innerHTML"]], template: function GanttActivityBarsComponent_Template(rf, ctx) { if (rf & 1) {
                core.ɵɵelementStart(0, "div", 0);
                core.ɵɵtemplate(1, GanttActivityBarsComponent_div_1_Template, 12, 15, "div", 1);
                core.ɵɵelementEnd();
                core.ɵɵtemplate(2, GanttActivityBarsComponent_ng_template_2_Template, 1, 1, "ng-template", null, 2, core.ɵɵtemplateRefExtractor);
            } if (rf & 2) {
                core.ɵɵproperty("ngStyle", core.ɵɵpureFunction2(2, _c3, ctx.containerHeight + "px", ctx.containerWidth + "px"));
                core.ɵɵadvance(1);
                core.ɵɵproperty("ngForOf", ctx.tasks);
            } }, directives: [common.NgStyle, common.NgForOf, mde.MdePopoverTrigger, mde.MdePopover, common.NgTemplateOutlet, common.NgIf, card.MatCard, card.MatCardHeader, card.MatCardAvatar, card.MatCardTitle, card.MatCardSubtitle, card.MatCardContent], pipes: [common.DatePipe], styles: [".gantt-activity-line[_ngcontent-%COMP%] {\n        \n        position: absolute;\n        box-sizing: border-box;\n        -webkit-user-select: none;\n    }\n    .gantt-activity-line[_ngcontent-%COMP%]:hover {\n        cursor: pointer;\n    }\n    .gantt-activity-content[_ngcontent-%COMP%] {\n        font-size: 12px;\n        color: #fff;\n        width: 100%;\n        top: 0;\n        position: absolute;\n        white-space: nowrap;\n        text-align: center;\n        line-height: inherit;\n        overflow: hidden;\n        height: 100%;\n    }\n    .gantt-activity-link-control[_ngcontent-%COMP%] {\n        position: absolute;\n        width: 13px;\n        top: 0;\n    }\n    .gantt-activity-right[_ngcontent-%COMP%] {\n        right: 0;\n    }\n    .gantt-activity-left[_ngcontent-%COMP%] {\n        left: 0;\n    }\n    .gantt-activity-right[_ngcontent-%COMP%]:hover {\n        \n    }\n    .gantt-activity-left[_ngcontent-%COMP%]:hover {\n        \n    }"] });
        return GanttActivityBarsComponent;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(GanttActivityBarsComponent, [{
            type: core.Component,
            args: [{
                    selector: 'activity-bars',
                    template: "\n    <div class=\"gantt-activity-bars-area\"\n        [ngStyle]=\"{ 'height': containerHeight + 'px', 'width': containerWidth + 'px' }\">\n\n        <div #bar class=\"gantt-activity-line\"\n            *ngFor=\"let task of tasks; let i = index\" (click)=\"gridRowClicked(task)\"\n            [ngStyle]=\"drawBar(task, i)\">\n\n            <div #popoverTrigger=\"mdePopoverTrigger\"\n                [mdePopoverTriggerFor]=\"taskPopover\"\n                [mdePopoverBackdropCloseOnClick]=\"false\"\n                mdePopoverOffsetX=\"-15\"\n                mdePopoverOffsetY=\"0\"\n                (opened)=\"popoverOpened(task)\">\n\n                <mde-popover #taskPopover=\"mdePopover\"\n                    [mdePopoverEnterDelay]=\"100\"\n                    [mdePopoverLeaveDelay]=\"0\"\n                    [mdePopoverPositionY]=\"'above'\"\n                    [mdePopoverOverlapTrigger]=\"false\"\n                    [mdePopoverDisableAnimation]=\"false\"\n                    [mdeFocusTrapEnabled]=\"false\"\n                    [mdePopoverArrowWidth]=\"12\"\n                    [mdePopoverArrowColor]=\"task.color?.primary\"\n                    mdePopoverPlacement=\"bottom\">\n\n                    <ng-container *ngTemplateOutlet=\"templatePopoverTask; context: {task: task}\"></ng-container>\n                </mde-popover>\n\n                <div class=\"gantt-activity-content\"></div>\n                <div class=\"gantt-activity-link-control gantt-activity-right\" style=\"height: 26px; line-height: 30px\">\n                    <div class=\"gantt-link-point\"></div>\n                </div>\n                <div class=\"gantt-activity-link-control gantt-activity-left\" style=\"height: 26px; line-height: 30px\">\n                    <div class=\"gantt-link-point\"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <ng-template #templatePopoverTask let-data=\"task\">\n        <mat-card *ngIf=\"data\" class=\"mat-elevation-z6\" \n            [ngStyle]=\"{ \n                borderBottomColor: data.color?.primary,\n                borderBottomWidth: '.25em',\n                borderBottomStyle: 'solid' \n            }\" style=\"width: 320px; max-width: 320px;\">\n\n            <mat-card-header>\n                <div mat-card-avatar [ngStyle]=\"{ borderColor: data.color?.primary }\" style=\"width: 0; height: unset; margin-bottom: .7em; border-radius: 0; border-style: solid;\"></div>\n                <mat-card-title>\n                    <span style=\"font-size: 80%;\">{{data.name}}</span>\n                </mat-card-title>\n                <mat-card-subtitle>\n                    <span>{{data.start | date:'yyyy-MM-dd'}} - {{data.end | date:'yyyy-MM-dd'}}</span>\n                </mat-card-subtitle>\n                <mat-card-subtitle>\n                    <span style=\"padding-left: .75em; padding-right: 1em; font-stretch: condensed;\">&#x336;</span>\n                    <span>{{data.resource}}</span>\n                </mat-card-subtitle>\n            </mat-card-header>\n            <mat-card-content>\n                <footer *ngIf=\"data.description\">\n                    <span [innerHTML]=\"data.description\"></span>\n                </footer>\n            </mat-card-content>\n        </mat-card>\n    </ng-template>\n    ",
                    styles: ["\n    .gantt-activity-line {\n        /*border-radius: 2px;*/\n        position: absolute;\n        box-sizing: border-box;\n        -webkit-user-select: none;\n    }\n    .gantt-activity-line:hover {\n        cursor: pointer;\n    }\n    .gantt-activity-content {\n        font-size: 12px;\n        color: #fff;\n        width: 100%;\n        top: 0;\n        position: absolute;\n        white-space: nowrap;\n        text-align: center;\n        line-height: inherit;\n        overflow: hidden;\n        height: 100%;\n    }\n    .gantt-activity-link-control {\n        position: absolute;\n        width: 13px;\n        top: 0;\n    }\n    .gantt-activity-right {\n        right: 0;\n    }\n    .gantt-activity-left {\n        left: 0;\n    }\n    .gantt-activity-right:hover {\n        /*cursor:w-resize;*/\n    }\n    .gantt-activity-left:hover {\n        /*cursor:w-resize;*/\n    }\n    "],
                    providers: [
                        GanttService
                    ]
                }]
        }], function () { return [{ type: GanttService }]; }, { timeScale: [{
                type: core.Input
            }], dimensions: [{
                type: core.Input
            }], tasks: [{
                type: core.Input
            }], onGridRowClick: [{
                type: core.Output
            }], onPopoverOpen: [{
                type: core.Output
            }] }); })();

    function GanttActivityComponent_div_3_Template(rf, ctx) { if (rf & 1) {
        core.ɵɵelementStart(0, "div", 14);
        core.ɵɵelementStart(1, "label");
        core.ɵɵtext(2);
        core.ɵɵelementEnd();
        core.ɵɵelementEnd();
    } if (rf & 2) {
        var column_r6 = ctx.$implicit;
        core.ɵɵstyleProp("width", column_r6.width + "px")("left", column_r6.left + "px");
        core.ɵɵadvance(2);
        core.ɵɵtextInterpolate1(" ", column_r6.name, " ");
    } }
    var _c0$2 = function (a0) { return { "width": a0, "padding-left": 0 }; };
    var _c1$1 = function (a0, a1, a3) { return { borderLeftColor: a0, borderLeftWidth: a1, borderLeftStyle: "solid", paddingRight: a3 }; };
    function GanttActivityComponent_div_6_Template(rf, ctx) { if (rf & 1) {
        core.ɵɵelementStart(0, "div", 15, 16);
        core.ɵɵelementStart(2, "mde-popover", 17, 18);
        core.ɵɵelementStart(4, "mat-card", 19);
        core.ɵɵelementStart(5, "span", 20);
        core.ɵɵtext(6);
        core.ɵɵelementEnd();
        core.ɵɵelementEnd();
        core.ɵɵelementEnd();
        core.ɵɵelementStart(7, "div", 21);
        core.ɵɵelementStart(8, "div", 22);
        core.ɵɵelement(9, "span", 23);
        core.ɵɵelementStart(10, "span");
        core.ɵɵtext(11);
        core.ɵɵelementEnd();
        core.ɵɵelementEnd();
        core.ɵɵelementEnd();
        core.ɵɵelementEnd();
    } if (rf & 2) {
        var data_r7 = ctx.$implicit;
        var _r9 = core.ɵɵreference(3);
        var ctx_r3 = core.ɵɵnextContext();
        core.ɵɵproperty("ngStyle", ctx_r3.setGridRowStyle());
        core.ɵɵadvance(2);
        core.ɵɵproperty("mdePopoverEnterDelay", 100)("mdePopoverLeaveDelay", 0)("mdePopoverPositionY", "above")("mdePopoverOverlapTrigger", false)("mdePopoverDisableAnimation", false)("mdePopoverArrowWidth", 8)("mdePopoverArrowColor", "black");
        core.ɵɵadvance(4);
        core.ɵɵtextInterpolate(data_r7.name);
        core.ɵɵadvance(1);
        core.ɵɵproperty("mdePopoverTriggerFor", _r9)("mdePopoverBackdropCloseOnClick", false)("ngStyle", core.ɵɵpureFunction1(14, _c0$2, ctx_r3.gridColumns[1].width + "px"));
        core.ɵɵadvance(2);
        core.ɵɵproperty("ngStyle", core.ɵɵpureFunction3(16, _c1$1, data_r7.color.primary, 0.35 + "em", 0.5 + "em"));
        core.ɵɵadvance(2);
        core.ɵɵtextInterpolate(data_r7.name);
    } }
    var _c2$1 = function (a0) { return { "height": a0 }; };
    var _c3$1 = function (a0, a1) { return { "height": a0, "width": a1 }; };
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
        GanttActivityComponent.prototype.doWheel = function (event, elem) {
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
        GanttActivityComponent.prototype.ngOnInit = function () {
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
        GanttActivityComponent.prototype.ngDoCheck = function () {
            // do a check to see whether any new tasks have been added. If the task is a child then push into array if tree expanded?
            this.ganttService.doTaskCheck(this.project.tasks, this.options.scale);
        };
        /** On vertical scroll set the scroll top of grid and activity  */
        GanttActivityComponent.prototype.onVerticalScroll = function (verticalScroll, ganttGrid, ganttActivityArea) {
            this.ganttService.scrollTop(verticalScroll, ganttGrid, ganttActivityArea);
        };
        GanttActivityComponent.prototype.gridRowClick = function (task) {
            try {
                this.onGridRowClick.emit(task);
            }
            catch (err) { }
        };
        GanttActivityComponent.prototype.popoverOpen = function (task) {
            try {
                this.onPopoverOpen.emit(task);
            }
            catch (err) { }
        };
        /** On resize of browser window dynamically adjust gantt activity height and width */
        GanttActivityComponent.prototype.onResize = function (event) {
            var activityContainerSizes = this.ganttService.calculateActivityContainerDimensions();
            this.ganttActivityHeight = activityContainerSizes.height + 'px';
            this.ganttActivityWidth = activityContainerSizes.width;
        };
        GanttActivityComponent.prototype.setScale = function () {
            this.scale.start = this.start;
            this.scale.end = this.end;
        };
        GanttActivityComponent.prototype.setDimensions = function () {
            this.dimensions.height = this.containerHeight;
            this.dimensions.width = this.containerWidth;
        };
        GanttActivityComponent.prototype.setGridRowStyle = function () {
            return {
                'height': this.ganttService.rowHeight + 'px',
                'line-height': this.ganttService.rowHeight + 'px'
            };
        };
        GanttActivityComponent.prototype.setGridScaleStyle = function () {
            var height = this.ganttService.rowHeight + 30;
            return {
                'height': height + 'px',
                'line-height': height + 'px'
            };
        };
        GanttActivityComponent.prototype.calculateColumnsWidth = function () {
            var ganttActivityWidth = this.gridColumns.map(function (column) { return column.width; }).reduce(function (pv, cv) { return pv + cv; }, 0) + 1;
            return "calc(100% - " + (ganttActivityWidth) + "px)";
        };
        GanttActivityComponent.prototype.calculateContainerHeight = function () {
            return this.ganttService.TASK_CACHE.length * this.ganttService.rowHeight;
        };
        GanttActivityComponent.prototype.calculateContainerWidth = function () {
            return this.ganttService.TIME_SCALE.length * this.ganttService.cellWidth + this.ganttService.cellWidth;
        };
        GanttActivityComponent.prototype.setSizes = function () {
            this.ganttActivityHeight = this.activityContainerSizes.height + 'px';
            this.ganttActivityWidth = this.activityContainerSizes.width;
        };
        /** @nocollapse */ GanttActivityComponent.ɵfac = function GanttActivityComponent_Factory(t) { return new (t || GanttActivityComponent)(core.ɵɵdirectiveInject(core.ElementRef), core.ɵɵdirectiveInject(GanttService)); };
        /** @nocollapse */ GanttActivityComponent.ɵcmp = core.ɵɵdefineComponent({ type: GanttActivityComponent, selectors: [["gantt-activity"]], inputs: { project: "project", options: "options" }, outputs: { onGridRowClick: "onGridRowClick", onPopoverOpen: "onPopoverOpen" }, decls: 14, vars: 23, consts: [[1, "grid"], ["ganttGrid", ""], [1, "grid-scale", 3, "ngStyle"], ["class", "grid-head-cell", 3, "width", "left", 4, "ngFor", "ngForOf"], [1, "grid-data", 3, "ngStyle"], ["ganttGridData", ""], ["class", "grid-row", 3, "ngStyle", 4, "ngFor", "ngForOf"], [1, "gantt-activity", 3, "ngStyle", "wheel", "resize"], ["ganttActivity", ""], [3, "timeScaleMonth", "timeScaleWeekend", "dimensions", "scale"], [1, "gantt-activity-area", 3, "ngStyle"], ["ganttActivityArea", ""], [3, "timeScale", "tasks"], [3, "timeScale", "dimensions", "tasks", "onGridRowClick", "onPopoverOpen"], [1, "grid-head-cell"], [1, "grid-row", 3, "ngStyle"], ["row", ""], ["mdePopoverPlacement", "bottom", 3, "mdePopoverEnterDelay", "mdePopoverLeaveDelay", "mdePopoverPositionY", "mdePopoverOverlapTrigger", "mdePopoverDisableAnimation", "mdePopoverArrowWidth", "mdePopoverArrowColor"], ["appPopover", "mdePopover"], [2, "max-width", "340px", "padding", "3px 8px", "color", "#ffffff", "text-align", "center", "background-color", "#000000", "border-radius", "4px"], [2, "z-index", "1070", "display", "block", "font-family", "'Lato','Helvetica Neue',Helvetica,Arial,sans-serif", "font-style", "normal", "font-weight", "normal", "letter-spacing", "normal", "line-break", "auto", "line-height", "1.42857143", "text-align", "left", "text-align", "start", "text-decoration", "none", "text-shadow", "none", "text-transform", "none", "white-space", "normal", "word-break", "normal", "word-spacing", "normal", "word-wrap", "normal", "font-size", "13px"], ["mdePopoverOffsetX", "25", "mdePopoverOffsetY", "0", 1, "grid-cell", 3, "mdePopoverTriggerFor", "mdePopoverBackdropCloseOnClick", "ngStyle"], [1, "gantt-tree-content"], [3, "ngStyle"]], template: function GanttActivityComponent_Template(rf, ctx) { if (rf & 1) {
                var _r10 = core.ɵɵgetCurrentView();
                core.ɵɵelementStart(0, "div", 0, 1);
                core.ɵɵelementStart(2, "div", 2);
                core.ɵɵtemplate(3, GanttActivityComponent_div_3_Template, 3, 5, "div", 3);
                core.ɵɵelementEnd();
                core.ɵɵelementStart(4, "div", 4, 5);
                core.ɵɵtemplate(6, GanttActivityComponent_div_6_Template, 12, 20, "div", 6);
                core.ɵɵelementEnd();
                core.ɵɵelementEnd();
                core.ɵɵelementStart(7, "div", 7, 8);
                core.ɵɵlistener("wheel", function GanttActivityComponent_Template_div_wheel_7_listener($event) { core.ɵɵrestoreView(_r10); var _r4 = core.ɵɵreference(8); return ctx.doWheel($event, _r4); })("resize", function GanttActivityComponent_Template_div_resize_7_listener($event) { return ctx.onResize($event); }, false, core.ɵɵresolveWindow);
                core.ɵɵelement(9, "time-scale", 9);
                core.ɵɵelementStart(10, "div", 10, 11);
                core.ɵɵelement(12, "activity-background", 12);
                core.ɵɵelementStart(13, "activity-bars", 13);
                core.ɵɵlistener("onGridRowClick", function GanttActivityComponent_Template_activity_bars_onGridRowClick_13_listener($event) { return ctx.gridRowClick($event); })("onPopoverOpen", function GanttActivityComponent_Template_activity_bars_onPopoverOpen_13_listener($event) { return ctx.popoverOpen($event); });
                core.ɵɵelementEnd();
                core.ɵɵelementEnd();
                core.ɵɵelementEnd();
            } if (rf & 2) {
                core.ɵɵadvance(2);
                core.ɵɵproperty("ngStyle", ctx.setGridScaleStyle());
                core.ɵɵadvance(1);
                core.ɵɵproperty("ngForOf", ctx.gridColumns);
                core.ɵɵadvance(1);
                core.ɵɵproperty("ngStyle", core.ɵɵpureFunction1(15, _c2$1, ctx.ganttService.calculateGanttHeight()));
                core.ɵɵadvance(2);
                core.ɵɵproperty("ngForOf", ctx.ganttService.TASK_CACHE);
                core.ɵɵadvance(1);
                core.ɵɵproperty("ngStyle", core.ɵɵpureFunction2(17, _c3$1, ctx.ganttService.calculateGanttHeight() + 60, ctx.calculateColumnsWidth()));
                core.ɵɵadvance(2);
                core.ɵɵproperty("timeScaleMonth", ctx.ganttService.MONTH_SCALE)("timeScaleWeekend", ctx.ganttService.TIME_SCALE)("dimensions", ctx.dimensions)("scale", ctx.options.scale);
                core.ɵɵadvance(1);
                core.ɵɵproperty("ngStyle", core.ɵɵpureFunction2(20, _c3$1, ctx.ganttService.calculateGanttHeight(), ctx.containerWidth + 36 + "px"));
                core.ɵɵadvance(2);
                core.ɵɵproperty("timeScale", ctx.ganttService.TIME_SCALE)("tasks", ctx.ganttService.TASK_CACHE);
                core.ɵɵadvance(1);
                core.ɵɵproperty("timeScale", ctx.ganttService.TIME_SCALE)("dimensions", ctx.dimensions)("tasks", ctx.ganttService.TASK_CACHE);
            } }, directives: [common.NgStyle, common.NgForOf, GanttTimeScaleComponent, GanttActivityBackgroundComponent, GanttActivityBarsComponent, mde.MdePopover, card.MatCard, mde.MdePopoverTrigger], styles: [".gantt-activity[_ngcontent-%COMP%] {\n            overflow-y: hidden;\n            overflow-x: scroll;\n            display: inline-block;\n            vertical-align: top;\n            position: relative;\n        }\n        .gantt-activity-area[_ngcontent-%COMP%] {\n            position: relative;\n            overflow-x: hidden;\n            overflow-y: hidden;\n            -webkit-user-select: none;\n        }\n        .gantt-vertical-scroll[_ngcontent-%COMP%] {\n            background-color: transparent;\n            overflow-x: hidden;\n            overflow-y: scroll;\n            position: absolute;\n            right: -10px;\n            display: block;\n            top: -1px;\n            border: 1px solid #cecece;\n        }\n        .grid[_ngcontent-%COMP%] {\n            overflow-x: hidden;\n            overflow-y: hidden;\n            display: inline-block;\n            vertical-align: top;\n            border-right: 1px solid #cecece;\n        }\n        .grid-scale[_ngcontent-%COMP%] {\n            color: #6b6b6b;\n            font-size: 12px;\n            border-bottom: 1px solid #e0e0e0;\n            background-color: whitesmoke;\n        }\n        .grid-head-cell[_ngcontent-%COMP%] {\n            \n            border-top: none !important;\n            border-right: none !important;\n            line-height: inherit;\n            box-sizing: border-box;\n            display: inline-block;\n            vertical-align: top;\n            border-right: 1px solid #cecece;\n            \n            position: relative;\n            cursor: default;\n            height: 100%;\n            -moz-user-select: -moz-none;\n            -webkit-user-select: none;\n            overflow: hidden;\n        }\n        .grid-data[_ngcontent-%COMP%] {\n            overflow: hidden;\n        }\n        .grid-row[_ngcontent-%COMP%] {\n            box-sizing: border-box;\n            border-bottom: 1px solid #e0e0e0;\n            background-color: #fff;\n            position: relative;\n            -webkit-user-select: none;\n        }\n        .grid-row[_ngcontent-%COMP%]:hover {\n            background-color: #eeeeee;\n            cursor: pointer;\n        }\n        .grid-cell[_ngcontent-%COMP%] {\n            border-right: none;\n            color: #454545;\n            display: inline-block;\n            vertical-align: top;\n            padding-left: 6px;\n            padding-right: 6px;\n            height: 100%;\n            overflow: hidden;\n            white-space: nowrap;\n            font-size: 13px;\n            box-sizing: border-box;\n        }\n        .actions-bar[_ngcontent-%COMP%] {\n            \n            border-bottom: 1px solid #e0e0e0;\n            clear: both;\n            \n            height: 28px;\n            background: whitesmoke;\n            color: #494949;\n            font-family: Arial, sans-serif;\n            font-size: 13px;\n            padding-left: 15px;\n            line-height: 25px;\n        }\n        .gantt-tree-content[_ngcontent-%COMP%] {\n            padding-left: 15px;\n        }"] });
        return GanttActivityComponent;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(GanttActivityComponent, [{
            type: core.Component,
            args: [{
                    selector: 'gantt-activity',
                    template: "\n\n    <div class=\"grid\" #ganttGrid>\n        <div class=\"grid-scale\" [ngStyle]=\"setGridScaleStyle()\">\n            <div class=\"grid-head-cell\"\n                *ngFor=\"let column of gridColumns\" [style.width]=\"column.width + 'px'\"\n                [style.left]=\"column.left + 'px'\">\n\n                <label>\n                    {{column.name}}\n                </label>\n            </div>\n        </div>\n        <div class=\"grid-data\"\n            #ganttGridData\n            [ngStyle]=\"{ 'height': ganttService.calculateGanttHeight() }\">\n\n            <div #row\n                *ngFor=\"let data of ganttService.TASK_CACHE\" class=\"grid-row\"\n                [ngStyle]=\"setGridRowStyle()\">\n\n                <mde-popover #appPopover=\"mdePopover\"\n                    [mdePopoverEnterDelay]=\"100\"\n                    [mdePopoverLeaveDelay]=\"0\"\n                    [mdePopoverPositionY]=\"'above'\"\n                    [mdePopoverOverlapTrigger]=\"false\"\n                    [mdePopoverDisableAnimation]=\"false\"\n                    [mdePopoverArrowWidth]=\"8\"\n                    [mdePopoverArrowColor]=\"'black'\"\n                    mdePopoverPlacement=\"bottom\">\n\n                    <mat-card style=\"max-width: 340px; padding: 3px 8px;\n                        color: #ffffff;\n                        text-align: center;\n                        background-color: #000000;\n                        border-radius: 4px;\">\n                        <span style=\"z-index: 1070;\n                            display: block;\n                            font-family: 'Lato','Helvetica Neue',Helvetica,Arial,sans-serif;\n                            font-style: normal;\n                            font-weight: normal;\n                            letter-spacing: normal;\n                            line-break: auto;\n                            line-height: 1.42857143;\n                            text-align: left;\n                            text-align: start;\n                            text-decoration: none;\n                            text-shadow: none;\n                            text-transform: none;\n                            white-space: normal;\n                            word-break: normal;\n                            word-spacing: normal;\n                            word-wrap: normal;\n                            font-size: 13px;\">{{data.name}}</span>\n                    </mat-card>\n                </mde-popover>\n\n                <div class=\"grid-cell\"\n                    [mdePopoverTriggerFor]=\"appPopover\"\n                    [mdePopoverBackdropCloseOnClick]=\"false\"\n                    mdePopoverOffsetX=\"25\"\n                    mdePopoverOffsetY=\"0\"\n                    [ngStyle]=\"{ 'width': gridColumns[1].width + 'px', 'padding-left': 0 }\">\n\n                    <div class=\"gantt-tree-content\">\n                        <span [ngStyle]=\"{ borderLeftColor: data.color.primary, borderLeftWidth: .35 + 'em', \n                            borderLeftStyle: 'solid', paddingRight: .5 + 'em'}\"></span>\n                        <span>{{data.name}}</span>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"gantt-activity\" #ganttActivity\n        (wheel)=\"doWheel($event, ganttActivity)\"\n        (window:resize)=\"onResize($event)\"\n        [ngStyle]=\"{ 'height': ganttService.calculateGanttHeight() + 60, 'width': calculateColumnsWidth() }\">\n\n        <time-scale [timeScaleMonth]=\"ganttService.MONTH_SCALE\"\n            [timeScaleWeekend]=\"ganttService.TIME_SCALE\"\n            [dimensions]=\"dimensions\"\n            [scale]=\"options.scale\"></time-scale>\n        <div class=\"gantt-activity-area\"\n            #ganttActivityArea\n            [ngStyle]=\"{ 'height': ganttService.calculateGanttHeight(), 'width': containerWidth + 36 + 'px' }\">\n\n            <activity-background [timeScale]=\"ganttService.TIME_SCALE\"\n                [tasks]=\"ganttService.TASK_CACHE\"></activity-background>\n            <activity-bars [timeScale]=\"ganttService.TIME_SCALE\"\n                [dimensions]=\"dimensions\"\n                [tasks]=\"ganttService.TASK_CACHE\"\n                (onGridRowClick)=\"gridRowClick($event)\"\n                (onPopoverOpen)=\"popoverOpen($event)\"></activity-bars>\n        </div>\n    </div>\n    ",
                    styles: ["\n        .gantt-activity {\n            overflow-y: hidden;\n            overflow-x: scroll;\n            display: inline-block;\n            vertical-align: top;\n            position: relative;\n        }\n        .gantt-activity-area {\n            position: relative;\n            overflow-x: hidden;\n            overflow-y: hidden;\n            -webkit-user-select: none;\n        }\n        .gantt-vertical-scroll {\n            background-color: transparent;\n            overflow-x: hidden;\n            overflow-y: scroll;\n            position: absolute;\n            right: -10px;\n            display: block;\n            top: -1px;\n            border: 1px solid #cecece;\n        }\n        .grid {\n            overflow-x: hidden;\n            overflow-y: hidden;\n            display: inline-block;\n            vertical-align: top;\n            border-right: 1px solid #cecece;\n        }\n        .grid-scale {\n            color: #6b6b6b;\n            font-size: 12px;\n            border-bottom: 1px solid #e0e0e0;\n            background-color: whitesmoke;\n        }\n        .grid-head-cell {\n            /*color: #a6a6a6;*/\n            border-top: none !important;\n            border-right: none !important;\n            line-height: inherit;\n            box-sizing: border-box;\n            display: inline-block;\n            vertical-align: top;\n            border-right: 1px solid #cecece;\n            /*text-align: center;*/\n            position: relative;\n            cursor: default;\n            height: 100%;\n            -moz-user-select: -moz-none;\n            -webkit-user-select: none;\n            overflow: hidden;\n        }\n        .grid-data {\n            overflow: hidden;\n        }\n        .grid-row {\n            box-sizing: border-box;\n            border-bottom: 1px solid #e0e0e0;\n            background-color: #fff;\n            position: relative;\n            -webkit-user-select: none;\n        }\n        .grid-row:hover {\n            background-color: #eeeeee;\n            cursor: pointer;\n        }\n        .grid-cell {\n            border-right: none;\n            color: #454545;\n            display: inline-block;\n            vertical-align: top;\n            padding-left: 6px;\n            padding-right: 6px;\n            height: 100%;\n            overflow: hidden;\n            white-space: nowrap;\n            font-size: 13px;\n            box-sizing: border-box;\n        }\n        .actions-bar {\n            /*border-top: 1px solid #cecece;*/\n            border-bottom: 1px solid #e0e0e0;\n            clear: both;\n            /*margin-top: 90px;*/\n            height: 28px;\n            background: whitesmoke;\n            color: #494949;\n            font-family: Arial, sans-serif;\n            font-size: 13px;\n            padding-left: 15px;\n            line-height: 25px;\n        }\n        .gantt-tree-content {\n            padding-left: 15px;\n        }\n    "],
                    changeDetection: core.ChangeDetectionStrategy.Default
                }]
        }], function () { return [{ type: core.ElementRef }, { type: GanttService }]; }, { project: [{
                type: core.Input
            }], options: [{
                type: core.Input
            }], onGridRowClick: [{
                type: core.Output
            }], onPopoverOpen: [{
                type: core.Output
            }] }); })();

    var _c0$3 = function () { return { "width": "100%" }; };
    var GanttComponent = /** @class */ (function () {
        function GanttComponent(ganttService) {
            this.ganttService = ganttService;
            this.onGridRowClick = new core.EventEmitter();
            this.onPopoverOpen = new core.EventEmitter();
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
        /** @nocollapse */ GanttComponent.ɵfac = function GanttComponent_Factory(t) { return new (t || GanttComponent)(core.ɵɵdirectiveInject(GanttService)); };
        /** @nocollapse */ GanttComponent.ɵcmp = core.ɵɵdefineComponent({ type: GanttComponent, selectors: [["gantt"]], inputs: { project: "project", options: "options" }, outputs: { onGridRowClick: "onGridRowClick", onPopoverOpen: "onPopoverOpen" }, features: [core.ɵɵProvidersFeature([])], decls: 3, vars: 4, consts: [[3, "ngStyle"], [1, "gantt-container", 3, "resize"], [3, "project", "options", "onGridRowClick", "onPopoverOpen"]], template: function GanttComponent_Template(rf, ctx) { if (rf & 1) {
                core.ɵɵelementStart(0, "div", 0);
                core.ɵɵelementStart(1, "div", 1);
                core.ɵɵlistener("resize", function GanttComponent_Template_div_resize_1_listener($event) { return ctx.onResize($event); }, false, core.ɵɵresolveWindow);
                core.ɵɵelementStart(2, "gantt-activity", 2);
                core.ɵɵlistener("onGridRowClick", function GanttComponent_Template_gantt_activity_onGridRowClick_2_listener($event) { return ctx.gridRowClicked($event); })("onPopoverOpen", function GanttComponent_Template_gantt_activity_onPopoverOpen_2_listener($event) { return ctx.popoverOpened($event); });
                core.ɵɵelementEnd();
                core.ɵɵelementEnd();
                core.ɵɵelementEnd();
            } if (rf & 2) {
                core.ɵɵproperty("ngStyle", core.ɵɵpureFunction0(3, _c0$3));
                core.ɵɵadvance(2);
                core.ɵɵproperty("project", ctx._project)("options", ctx._options);
            } }, directives: [common.NgStyle, GanttActivityComponent], styles: [".gantt-container[_ngcontent-%COMP%] {\n            font-family: Arial;\n            font-size: 13px;\n            border: 1px solid #cecece;\n            position: relative;\n            white-space: nowrap;\n            margin-top: 0px;\n        }"] });
        return GanttComponent;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(GanttComponent, [{
            type: core.Component,
            args: [{
                    selector: 'gantt',
                    template: "\n        <div [ngStyle]=\"{ 'width': '100%' }\">\n            <div class=\"gantt-container\" (window:resize)=\"onResize($event)\">\n                <!--<gantt-header [name]=\"_project.name\" [startDate]=\"_project.startDate\"></gantt-header>-->\n                <gantt-activity [project]=\"_project\" [options]=\"_options\" (onGridRowClick)=\"gridRowClicked($event)\" (onPopoverOpen)=\"popoverOpened($event)\"></gantt-activity>\n                <!--<gantt-footer [project]=\"_project\"></gantt-footer>-->\n            </div>\n        </div>\n    ",
                    styles: ["\n        .gantt-container {\n            font-family: Arial;\n            font-size: 13px;\n            border: 1px solid #cecece;\n            position: relative;\n            white-space: nowrap;\n            margin-top: 0px;\n        }\n    "],
                    providers: []
                }]
        }], function () { return [{ type: GanttService }]; }, { project: [{
                type: core.Input
            }], options: [{
                type: core.Input
            }], onGridRowClick: [{
                type: core.Output
            }], onPopoverOpen: [{
                type: core.Output
            }] }); })();

    var GanttHeaderComponent = /** @class */ (function () {
        function GanttHeaderComponent() {
        }
        /** @nocollapse */ GanttHeaderComponent.ɵfac = function GanttHeaderComponent_Factory(t) { return new (t || GanttHeaderComponent)(); };
        /** @nocollapse */ GanttHeaderComponent.ɵcmp = core.ɵɵdefineComponent({ type: GanttHeaderComponent, selectors: [["gantt-header"]], inputs: { name: "name", startDate: "startDate" }, decls: 7, vars: 5, consts: [[1, "gantt-header"], [1, "gantt-header-title"], [2, "flex", "1"]], template: function GanttHeaderComponent_Template(rf, ctx) { if (rf & 1) {
                core.ɵɵelementStart(0, "div", 0);
                core.ɵɵelementStart(1, "div", 1);
                core.ɵɵelementStart(2, "div", 2);
                core.ɵɵtext(3);
                core.ɵɵelementEnd();
                core.ɵɵelementStart(4, "div");
                core.ɵɵtext(5);
                core.ɵɵpipe(6, "date");
                core.ɵɵelementEnd();
                core.ɵɵelementEnd();
                core.ɵɵelementEnd();
            } if (rf & 2) {
                core.ɵɵadvance(3);
                core.ɵɵtextInterpolate(ctx.name);
                core.ɵɵadvance(2);
                core.ɵɵtextInterpolate1("Started: ", core.ɵɵpipeBind2(6, 2, ctx.startDate, "medium"), "");
            } }, pipes: [common.DatePipe], styles: [".gantt-header[_ngcontent-%COMP%] {\n            background-color: whitesmoke;\n            height: 40px;\n            border-bottom: 1px solid #e0e0e0;\n        }\n        .gantt-header-title[_ngcontent-%COMP%] {\n            padding: 12px;\n            display: flex;\n            flex-wrap:wrap;\n            font-family: Arial, Helvetica, sans-serif;\n            font-size: 16px;\n        }\n        .gantt-header-actions[_ngcontent-%COMP%] {\n            display: inline;\n            float: right;\n            padding: 6px;\n        }"] });
        return GanttHeaderComponent;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(GanttHeaderComponent, [{
            type: core.Component,
            args: [{
                    selector: 'gantt-header',
                    template: "\n        <div class=\"gantt-header\">\n            <div class=\"gantt-header-title\">\n                <div style=\"flex:1\">{{ name }}</div>\n                <div>Started: {{ startDate | date: 'medium'}}</div>\n            </div>\n        </div>\n    ",
                    styles: ["\n        .gantt-header {\n            background-color: whitesmoke;\n            height: 40px;\n            border-bottom: 1px solid #e0e0e0;\n        }\n        .gantt-header-title {\n            padding: 12px;\n            display: flex;\n            flex-wrap:wrap;\n            font-family: Arial, Helvetica, sans-serif;\n            font-size: 16px;\n        }\n        .gantt-header-actions {\n            display: inline;\n            float: right;\n            padding: 6px;\n        }\n    "]
                }]
        }], null, { name: [{
                type: core.Input
            }], startDate: [{
                type: core.Input
            }] }); })();

    var GanttFooterComponent = /** @class */ (function () {
        function GanttFooterComponent() {
        }
        /** @nocollapse */ GanttFooterComponent.ɵfac = function GanttFooterComponent_Factory(t) { return new (t || GanttFooterComponent)(); };
        /** @nocollapse */ GanttFooterComponent.ɵcmp = core.ɵɵdefineComponent({ type: GanttFooterComponent, selectors: [["gantt-footer"]], inputs: { project: "project" }, decls: 1, vars: 0, consts: [[1, "gantt-footer"]], template: function GanttFooterComponent_Template(rf, ctx) { if (rf & 1) {
                core.ɵɵelement(0, "div", 0);
            } }, styles: [".gantt-footer[_ngcontent-%COMP%] {\n            background-color: whitesmoke;\n            height: 36px;\n            border-top: 1px solid #e0e0e0;\n        }\n        .gantt-footer-actions[_ngcontent-%COMP%] {\n            float: right;\n        }"] });
        return GanttFooterComponent;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(GanttFooterComponent, [{
            type: core.Component,
            args: [{
                    selector: 'gantt-footer',
                    template: "<div class=\"gantt-footer\"></div>",
                    styles: ["\n        .gantt-footer {\n            background-color: whitesmoke;\n            height: 36px;\n            border-top: 1px solid #e0e0e0;\n        }\n        .gantt-footer-actions {\n            float: right;\n        }\n    "]
                }]
        }], function () { return []; }, { project: [{
                type: core.Input
            }] }); })();

    var GanttActivityModule = /** @class */ (function () {
        function GanttActivityModule() {
        }
        /** @nocollapse */ GanttActivityModule.ɵmod = core.ɵɵdefineNgModule({ type: GanttActivityModule });
        /** @nocollapse */ GanttActivityModule.ɵinj = core.ɵɵdefineInjector({ factory: function GanttActivityModule_Factory(t) { return new (t || GanttActivityModule)(); }, providers: [], imports: [[common.CommonModule, card.MatCardModule, mde.MdePopoverModule]] });
        return GanttActivityModule;
    }());
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && core.ɵɵsetNgModuleScope(GanttActivityModule, { declarations: [GanttActivityComponent,
            GanttTimeScaleComponent,
            GanttActivityBackgroundComponent,
            GanttActivityBarsComponent], imports: [common.CommonModule, card.MatCardModule, mde.MdePopoverModule], exports: [GanttActivityComponent,
            GanttTimeScaleComponent,
            GanttActivityBackgroundComponent,
            GanttActivityBarsComponent] }); })();
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(GanttActivityModule, [{
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
                    providers: [],
                }]
        }], null, null); })();

    var GanttModule = /** @class */ (function () {
        function GanttModule() {
        }
        GanttModule.forRoot = function () {
            return {
                ngModule: GanttModule,
            };
        };
        /** @nocollapse */ GanttModule.ɵmod = core.ɵɵdefineNgModule({ type: GanttModule });
        /** @nocollapse */ GanttModule.ɵinj = core.ɵɵdefineInjector({ factory: function GanttModule_Factory(t) { return new (t || GanttModule)(); }, providers: [GanttService], imports: [[common.CommonModule, forms.FormsModule, GanttActivityModule]] });
        return GanttModule;
    }());
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && core.ɵɵsetNgModuleScope(GanttModule, { declarations: [GanttComponent, GanttHeaderComponent, GanttFooterComponent], imports: [common.CommonModule, forms.FormsModule, GanttActivityModule], exports: [GanttComponent] }); })();
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(GanttModule, [{
            type: core.NgModule,
            args: [{
                    imports: [common.CommonModule, forms.FormsModule, GanttActivityModule],
                    exports: [GanttComponent],
                    declarations: [GanttComponent, GanttHeaderComponent, GanttFooterComponent],
                    providers: [GanttService],
                    schemas: [core.CUSTOM_ELEMENTS_SCHEMA],
                }]
        }], null, null); })();

    exports.GanttComponent = GanttComponent;
    exports.GanttModule = GanttModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular-gantt.umd.js.map
