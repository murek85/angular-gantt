/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { GanttConfig } from './gantt-config.service';
import * as ɵngcc0 from '@angular/core';
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
        type: Injectable
    }], function () { return []; }, null); })();
    return GanttService;
}());
export { GanttService };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQuc2VydmljZS5qcyIsInNvdXJjZXMiOlsibmc6L2FuZ3VsYXItZ2FudHQvbGliL3NoYXJlZC9zZXJ2aWNlcy9nYW50dC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7QUFHckQ7QUFFTSxJQWdCRjtBQUNNLFFBakJDLGNBQVMsR0FBRyxDQUFDLENBQUM7QUFDekIsUUFBVyxrQkFBYSxHQUFHLEVBQUUsQ0FBQyxDQUFDLG9EQUFvRDtBQUNuRjtBQUNRLFFBREcsbUJBQWMsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztBQUNwRCxRQUFXLGNBQVMsR0FBRyxDQUFDLENBQUM7QUFDekIsUUFBVyxxQkFBZ0IsR0FBRyxDQUFDLENBQUM7QUFDaEMsUUFBVyxtQkFBYyxHQUFHLENBQUMsQ0FBQztBQUM5QixRQUFXLGNBQVMsR0FBRyxDQUFDLENBQUM7QUFDekIsUUFBVyxrQkFBYSxHQUFHLENBQUMsQ0FBQztBQUM3QixRQUFXLFdBQU0sR0FBRyxDQUFDLENBQUM7QUFDdEIsUUFBVyxnQkFBVyxHQUFHLEtBQUssQ0FBQztBQUMvQixRQUFXLGNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLO0FBQy9CO0FBQWMsUUFBSCxlQUFVLEdBQUcsR0FBRyxDQUFDO0FBQzVCO0FBQXlCLFlBS1gsV0FBVyxHQUFHLElBQUksV0FBVyxFQUFFO0FBQzdDLFFBQ1EsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDO0FBQy9DLFFBQVEsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDO0FBQy9DLFFBQVEsSUFBSSxDQUFDLGNBQWMsR0FBRyxXQUFXLENBQUMsY0FBYyxDQUFDO0FBQ3pELFFBQVEsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENB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QSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFHQSxBQWtCQSxBQWhCQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBTUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBRUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUVBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUVBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFFQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUVBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFFQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFFQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBRUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUVBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFFQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBRUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFDQSxBQUFBLEFBRUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUVBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUVBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFDQSxBQUFBLEFBRUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFFQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUNBLEFBQUEsQUFFQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUNBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQUNBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUVBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQ0EsQUFBQSxBQUVBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFFQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFFQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFFQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBRUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUVBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFFQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFDQSxBQUFBLEFBRUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFFQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUVBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFFQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUVBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBRUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFFQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBRUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFFQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUVBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUVBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUVBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFFQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFDQSxBQUVBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFFQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBRUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFDQSxBQUFBLEFBRUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFFQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQUVBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQUNBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQUVBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQUVBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQUVBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBRUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBRUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBRUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFBQSxBQUVBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQUNBLEFBQUEsQUFFQSxBQUFBLEFBQ0EsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFDQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUNBLEFBQUEsQUFBQSxBQUFBLEFBQUEsQUFBQSxBQUFBLEFBQ0EsQUFDQSxBQUFBLEFBL1RBLEFBQUEsQUFnVUEsQUFBQSxBQUFBLEFBaFVBLEFBZ1VBLEFBL1RBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQUNBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQUNBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQUNBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQUNBLEFBQUEsQUFDQSxBQUFBLEFBQ0EsQUFBQSxBQUNBLEFBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEdhbnR0Q29uZmlnIH0gZnJvbSAnLi9nYW50dC1jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IFRhc2ssIElTY2FsZSB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgR2FudHRTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyByb3dIZWlnaHQgPSAwO1xyXG4gICAgcHVibGljIGhvdXJDZWxsV2lkdGggPSA2MDsgLy8gY2hhbmdlIHRvIDYwIHNvIG1pbnV0ZXMgY2FuIGJlZW4gc2VlbiBtb3JlIGVhc2lseVxyXG4gICAgcHVibGljIGhvdXJzQ2VsbFdpZHRoID0gdGhpcy5ob3VyQ2VsbFdpZHRoICogMjU7XHJcbiAgICBwdWJsaWMgY2VsbFdpZHRoID0gMDtcclxuICAgIHB1YmxpYyB3aW5kb3dJbm5lcldpZHRoID0gMDtcclxuICAgIHB1YmxpYyBhY3Rpdml0eUhlaWdodCA9IDA7XHJcbiAgICBwdWJsaWMgYmFySGVpZ2h0ID0gMDtcclxuICAgIHB1YmxpYyBiYXJMaW5lSGVpZ2h0ID0gMDtcclxuICAgIHB1YmxpYyBiYXJUb3AgPSAwO1xyXG4gICAgcHVibGljIGJhck1vdmVhYmxlID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgZ3JpZFdpZHRoID0gMDsgLy8xODhcclxuICAgIHB1YmxpYyBncmlkSGVpZ2h0ID0gMzMyO1xyXG4gICAgcHVibGljIFRBU0tfQ0FDSEU6IGFueVtdO1xyXG4gICAgcHVibGljIFRJTUVfU0NBTEU6IGFueVtdO1xyXG4gICAgcHVibGljIE1PTlRIX1NDQUxFOiBhbnlbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBjb25zdCBnYW50dENvbmZpZyA9IG5ldyBHYW50dENvbmZpZygpO1xyXG5cclxuICAgICAgICB0aGlzLnJvd0hlaWdodCA9IGdhbnR0Q29uZmlnLnJvd0hlaWdodDtcclxuICAgICAgICB0aGlzLmNlbGxXaWR0aCA9IGdhbnR0Q29uZmlnLmNlbGxXaWR0aDtcclxuICAgICAgICB0aGlzLmFjdGl2aXR5SGVpZ2h0ID0gZ2FudHRDb25maWcuYWN0aXZpdHlIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5iYXJIZWlnaHQgPSBnYW50dENvbmZpZy5iYXJIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5iYXJMaW5lSGVpZ2h0ID0gZ2FudHRDb25maWcuYmFyTGluZUhlaWdodDtcclxuICAgICAgICB0aGlzLmJhclRvcCA9IGdhbnR0Q29uZmlnLnJvd0hlaWdodDtcclxuICAgICAgICB0aGlzLmJhck1vdmVhYmxlID0gZ2FudHRDb25maWcuYmFyTW92ZWFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVCYXJXaWR0aChzdGFydDogRGF0ZSwgZW5kOiBEYXRlKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAodHlwZW9mIHN0YXJ0ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBzdGFydCA9IG5ldyBEYXRlKHN0YXJ0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgZW5kID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBlbmQgPSBuZXcgRGF0ZShlbmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZGF5cyA9IHRoaXMuY2FsY3VsYXRlRGlmZkRheXMoc3RhcnQsIGVuZCk7XHJcbiAgICAgICAgY29uc3Qgd2lkdGg6IG51bWJlciA9IChkYXlzICogdGhpcy5jZWxsV2lkdGggKyBkYXlzKSAvIDc7XHJcbiAgICAgICAgcmV0dXJuIHdpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlQmFyTGVmdChzdGFydDogRGF0ZSwgc2NhbGU6IGFueVtdKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgbGVmdCA9IDA7XHJcblxyXG4gICAgICAgIGlmIChzdGFydCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICBzdGFydCA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2NhbGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdGFydC5nZXRUaW1lKCkgPj0gc2NhbGVbaV0uZ2V0VGltZSgpICYmIHN0YXJ0LmdldFRpbWUoKSA8IHNjYWxlW2kgKyAxXS5nZXRUaW1lKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBsZWZ0ID0gaSAqIHRoaXMuY2VsbFdpZHRoICsgaSArIHRoaXMuY2FsY3VsYXRlQmFyTGVmdERlbHRhKHN0YXJ0KSArXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgKCg3IC8gKHNjYWxlW2kgKyAxXS5nZXREYXRlKCkgLSBzdGFydC5nZXREYXRlKCkpIC8gNykgKiB0aGlzLmNlbGxXaWR0aCkgLSB0aGlzLmNlbGxXaWR0aCAvIDc7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IGkgKiB0aGlzLmNlbGxXaWR0aCArICgodGhpcy5jZWxsV2lkdGgpICogdGhpcy5jYWxjdWxhdGVEaWZmRGF5cyhzY2FsZVtpXSwgc3RhcnQpIC8gNykgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpICsgdGhpcy5jYWxjdWxhdGVCYXJMZWZ0RGVsdGEoc3RhcnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsZWZ0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDYWxjdWxhdGVzIHRoZSBoZWlnaHQgb2YgdGhlIGdhbnR0IGdyaWQsIGFjdGl2aXR5IGFuZCB2ZXJ0aWNhbCBzY3JvbGwgKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVHYW50dEhlaWdodCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBgJHt0aGlzLlRBU0tfQ0FDSEUubGVuZ3RoICogdGhpcy5yb3dIZWlnaHR9cHhgO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlQmFyTGVmdERlbHRhKHN0YXJ0OiBEYXRlKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgb2Zmc2V0ID0gMDtcclxuICAgICAgICBjb25zdCBob3Vyc0luRGF5ID0gMjQ7XHJcbiAgICAgICAgY29uc3QgbWludXRlc0luSG91ciA9IDYwO1xyXG4gICAgICAgIGNvbnN0IHNlY29uZHNJbkhvdXIgPSAzNjAwO1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0SG91cnM6IG51bWJlciA9XHJcbiAgICAgICAgICAgIChzdGFydC5nZXRIb3VycygpICsgc3RhcnQuZ2V0TWludXRlcygpIC8gbWludXRlc0luSG91ciArIHN0YXJ0LmdldFNlY29uZHMoKSAvIHNlY29uZHNJbkhvdXIpO1xyXG5cclxuICAgICAgICBvZmZzZXQgPSB0aGlzLmNlbGxXaWR0aCAvIGhvdXJzSW5EYXkgKiBzdGFydEhvdXJzO1xyXG4gICAgICAgIHJldHVybiBvZmZzZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENhbGN1bGF0ZSB0aGUgYmFyIHN0eWxlcyAqL1xyXG4gICAgcHVibGljIGNhbGN1bGF0ZUJhcih0YXNrOiBhbnksIGluZGV4OiBudW1iZXIsIHNjYWxlOiBhbnkpIHtcclxuICAgICAgICBjb25zdCBiYXJTdHlsZSA9IHRoaXMuZ2V0QmFyU3R5bGUodGFzay5jb2xvcik7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ3RvcCc6IHRoaXMuYmFyVG9wICogaW5kZXggKyAyICsgJ3B4JyxcclxuICAgICAgICAgICAgJ2xlZnQnOiB0aGlzLmNhbGN1bGF0ZUJhckxlZnQodGFzay5zdGFydCwgc2NhbGUpICsgJ3B4JyxcclxuICAgICAgICAgICAgJ2hlaWdodCc6IHRoaXMuYmFySGVpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogdGhpcy5iYXJMaW5lSGVpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgJ3dpZHRoJzogdGhpcy5jYWxjdWxhdGVCYXJXaWR0aCh0YXNrLnN0YXJ0LCB0YXNrLmVuZCkgKyAncHgnLFxyXG4gICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IGJhclN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSxcclxuICAgICAgICAgICAgJ2JvcmRlci1sZWZ0JzogYmFyU3R5bGVbXCJib3JkZXItbGVmdFwiXVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEdldCB0aGUgYmFyIHN0eWxlIGJhc2VkIG9uIHRhc2sgc3RhdHVzICovXHJcbiAgICBwcml2YXRlIGdldEJhclN0eWxlKGNvbG9yOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIGNvbnN0IHN0eWxlID0ge307XHJcbiAgICAgICAgc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gY29sb3Iuc2Vjb25kYXJ5O1xyXG4gICAgICAgIHN0eWxlW1wiYm9yZGVyLWxlZnRcIl0gPSBgNXB4IHNvbGlkICR7Y29sb3IucHJpbWFyeX1gO1xyXG5cclxuICAgICAgICByZXR1cm4gc3R5bGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENhbGN1bGF0ZXMgdGhlIGRpZmZlcmVuY2UgaW4gdHdvIGRhdGVzIGFuZCByZXR1cm5zIG51bWJlciBvZiBkYXlzICovXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlRGlmZkRheXMoc3RhcnQ6IERhdGUsIGVuZDogRGF0ZSk6IG51bWJlciB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3Qgb25lRGF5ID0gMjQgKiA2MCAqIDYwICogMTAwMDsgLy8gaG91cnMqbWludXRlcypzZWNvbmRzKm1pbGxpc2Vjb25kcyAvbXNcclxuICAgICAgICAgICAgY29uc3QgZGlmZkRheXMgPSBNYXRoLmFicygoc3RhcnQuZ2V0VGltZSgpIC0gZW5kLmdldFRpbWUoKSkgLyAob25lRGF5KSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRheXMgPSBkaWZmRGF5czsgLy8gZG9uJ3QgdXNlIE1hdGgucm91bmQgYXMgaXQgd2lsbCBkcmF3IGFuIGluY29ycmVjdCBiYXJcclxuICAgICAgICAgICAgcmV0dXJuIGRheXM7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlIHRoZSBnYW50dCBzY2FsZSByYW5nZSBnaXZlbiB0aGUgc3RhcnQgYW5kIGVuZCBkYXRlIG9mIHRhc2tzKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVTY2FsZShzdGFydDogRGF0ZSA9IG5ldyBEYXRlKCksIGVuZDogRGF0ZSA9IHRoaXMuYWRkRGF5cyhzdGFydCwgNykpIHtcclxuICAgICAgICBjb25zdCBzY2FsZTogYW55W10gPSBbXTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB3aGlsZSAoc3RhcnQuZ2V0VGltZSgpIDw9IGVuZC5nZXRUaW1lKCkpIHtcclxuICAgICAgICAgICAgICAgIHNjYWxlLnB1c2goc3RhcnQpO1xyXG4gICAgICAgICAgICAgICAgc3RhcnQgPSB0aGlzLmFkZERheXMoc3RhcnQsIDcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzY2FsZTtcclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzY2FsZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbGN1bGF0ZU1vbnRoU2NhbGUoc3RhcnQ6IERhdGUgPSBuZXcgRGF0ZSgpLCBlbmQ6IERhdGUgPSB0aGlzLmFkZERheXMoc3RhcnQsIDcpKSB7XHJcbiAgICAgICAgbGV0IHNjYWxlOiBhbnlbXSA9IFtdO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIHdoaWxlIChzdGFydC5nZXRUaW1lKCkgPD0gZW5kLmdldFRpbWUoKSkge1xyXG4gICAgICAgICAgICAvLyAgICAgc2NhbGUucHVzaCh7IHN0YXJ0OiBzdGFydCwgd2lkdGg6IHRoaXMuY2FsY3VsYXRlQ2VsbE1vbnRoV2lkdGgoc3RhcnQsIGVuZCkgfSk7XHJcbiAgICAgICAgICAgIC8vICAgICBzdGFydCA9IHRoaXMuYWRkRGF5cyhzdGFydCwgbmV3IERhdGUoc3RhcnQuZ2V0RnVsbFllYXIoKSwgc3RhcnQuZ2V0TW9udGgoKSArIDEsIDApLmdldERhdGUoKSk7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgc2NhbGUgPSB0aGlzLmNhbGN1bGF0ZUNlbGxNb250aFdpZHRoKHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgICAgICByZXR1cm4gc2NhbGU7XHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZXR1cm4gc2NhbGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBEZXRlcm1pbmVzIHdoZXRoZXIgZ2l2ZW4gZGF0ZSBpcyBhIHdlZWtlbmQgKi9cclxuICAgIHB1YmxpYyBpc0RheVdlZWtlbmQoZGF0ZTogRGF0ZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IGRheSA9IGRhdGUuZ2V0RGF5KCk7XHJcbiAgICAgICAgaWYgKGRheSA9PT0gNiB8fCBkYXkgPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQWRkIHggbnVtYmVyIG9mIGRheXMgdG8gYSBkYXRlIG9iamVjdCAqL1xyXG4gICAgcHVibGljIGFkZERheXMoZGF0ZTogRGF0ZSwgZGF5czogbnVtYmVyKTogRGF0ZSB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGUoZGF0ZSk7XHJcbiAgICAgICAgcmVzdWx0LnNldERhdGUocmVzdWx0LmdldERhdGUoKSArIGRheXMpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8qKiBSZW1vdmUgeCBudW1iZXIgb2YgZGF5cyBmcm9tIGEgZGF0ZSBvYmplY3QgKi9cclxuICAgIHB1YmxpYyByZW1vdmVEYXlzKGRhdGU6IERhdGUsIGRheXM6IG51bWJlcik6IERhdGUge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBEYXRlKGRhdGUpO1xyXG4gICAgICAgIHJlc3VsdC5zZXREYXRlKHJlc3VsdC5nZXREYXRlKCkgLSBkYXlzKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDYWxjdWxhdGVzIHRoZSBncmlkIHNjYWxlIGZvciBnYW50dCBiYXNlZCBvbiB0YXNrcyBzdGFydCBhbmQgZW5kIGRhdGVzICovXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlR3JpZFNjYWxlKHRhc2tzOiBUYXNrW10pOiBJU2NhbGUge1xyXG4gICAgICAgIGxldCBzdGFydDogRGF0ZTtcclxuICAgICAgICBsZXQgZW5kOiBEYXRlO1xyXG4gICAgICAgIGNvbnN0IGRhdGVzID0gdGFza3MubWFwKCh0YXNrOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0OiBuZXcgRGF0ZSh0YXNrLnN0YXJ0KSxcclxuICAgICAgICAgICAgICAgIGVuZDogbmV3IERhdGUodGFzay5lbmQpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHN0YXJ0ID0gbmV3IERhdGUoTWF0aC5taW4uYXBwbHkobnVsbCwgZGF0ZXMubWFwKCh0KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0LnN0YXJ0O1xyXG4gICAgICAgIH0pKSk7XHJcblxyXG4gICAgICAgIGVuZCA9IG5ldyBEYXRlKE1hdGgubWF4LmFwcGx5KG51bGwsIGRhdGVzLm1hcCgodCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdC5lbmQ7XHJcbiAgICAgICAgfSkpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxyXG4gICAgICAgICAgICBlbmQ6IGVuZFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldENvbXB1dGVkU3R5bGUoZWxlbWVudDogYW55LCBhdHRyaWJ1dGU6IGFueSkge1xyXG4gICAgICAgIHJldHVybiBwYXJzZUludChkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpW2F0dHJpYnV0ZV0sIDEwKTtcclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE8oZGFsZSk6IGRldGVybWluZSB3aGV0aGVyIHRoaXMgaXMgbmVlZGVkXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlQ29udGFpbmVyV2lkdGgoKTogbnVtYmVyIHtcclxuICAgICAgICB0aGlzLndpbmRvd0lubmVyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICBjb25zdCBjb250YWluZXJXaWR0aCA9IHRoaXMuZ3JpZFdpZHRoIC0gMTg7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcldpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVDb250YWluZXJIZWlnaHQoKTogbnVtYmVyIHtcclxuICAgICAgICBjb25zdCBjb250YWluZXJIZWlnaHQgPSAoaW5uZXJIZWlnaHQgLSAxOCk7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lckhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlQWN0aXZpdHlDb250YWluZXJEaW1lbnNpb25zKCk6IGFueSB7XHJcbiAgICAgICAgY29uc3Qgc2Nyb2xsV2lkdGggPSAxODtcclxuICAgICAgICB0aGlzLndpbmRvd0lubmVyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICBjb25zdCB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIC0gdGhpcy5ncmlkV2lkdGggLSBzY3JvbGxXaWR0aDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHsgaGVpZ2h0OiB0aGlzLmFjdGl2aXR5SGVpZ2h0LCB3aWR0aDogd2lkdGggfTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlR2FudHRBY3Rpdml0eVdpZHRoKGVsZW06IEhUTUxFbGVtZW50KTogYW55IHtcclxuICAgICAgICByZXR1cm4gYGNhbGMoMTAwJSAtICR7KGVsZW0ub2Zmc2V0V2lkdGggKyAxKX1weClgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVHYW50dEFjdGl2aXR5SGVpZ2h0KGVsZW06IEhUTUxFbGVtZW50KTogYW55IHtcclxuICAgICAgICByZXR1cm4gYCR7ZWxlbS5vZmZzZXRIZWlnaHR9cHhgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVDZWxsTW9udGhXaWR0aChtaW5EYXRlOiBEYXRlLCBtYXhEYXRlOiBEYXRlKSB7XHJcbiAgICAgICAgdmFyIGksIHJlc3VsdCA9IFtdO1xyXG4gICAgICAgIHZhciBzdGFydERhdGUgPSBtaW5EYXRlO1xyXG4gICAgICAgIHZhciBlbmREYXRlID0gbWF4RGF0ZTtcclxuICAgICAgICB2YXIgbW9udGhEaWZmID0gdGhpcy5jYWxjdWxhdGVEaWZmTW9udGhzKHN0YXJ0RGF0ZSwgZW5kRGF0ZSk7XHJcbiAgICAgICAgdmFyIGRheURpZmYgPSB0aGlzLmNhbGN1bGF0ZURpZmZEYXlzKHN0YXJ0RGF0ZSwgZW5kRGF0ZSk7XHJcblxyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBtb250aERpZmY7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgc3RhcnRPZk1vbnRoID0gaSA9PT0gMCA/IHN0YXJ0RGF0ZSA6IG5ldyBEYXRlKHN0YXJ0RGF0ZS5nZXRGdWxsWWVhcigpLCBpLCAxKTtcclxuICAgICAgICAgICAgdmFyIGVuZE9mTW9udGggPSBpID09PSBtb250aERpZmYgLSAxID8gZW5kRGF0ZSA6IG5ldyBEYXRlKHN0YXJ0RGF0ZS5nZXRGdWxsWWVhcigpLCBpICsgMSwgMCk7XHJcbiAgICAgICAgICAgIHZhciBkYXlJbk1vbnRoID0gdGhpcy5jYWxjdWxhdGVEaWZmRGF5cyhzdGFydE9mTW9udGgsIGVuZE9mTW9udGgpICsgKGkgIT09IG1vbnRoRGlmZiAtIDEgJiYgMSk7XHJcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IE1hdGguZmxvb3IoZGF5SW5Nb250aCAvIGRheURpZmYgKiAyRTMpICogMS4wMjU7XHJcblxyXG4gICAgICAgICAgICByZXN1bHQucHVzaCh7IHN0YXJ0OiBzdGFydE9mTW9udGgsIGVuZDogZW5kT2ZNb250aCwgd2lkdGg6IHdpZHRoIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZURpZmZNb250aHMoc3RhcnQsIGVuZCkge1xyXG4gICAgICAgIHZhciBtb250aHMgPSBlbmQuZ2V0TW9udGgoKSAtIHN0YXJ0LmdldE1vbnRoKCkgKyAoMTIgKiAoZW5kLmdldEZ1bGxZZWFyKCkgLSBzdGFydC5nZXRGdWxsWWVhcigpKSk7XHJcblxyXG4gICAgICAgIGlmKGVuZC5nZXREYXRlKCkgPCBzdGFydC5nZXREYXRlKCkpIHtcclxuICAgICAgICAgICAgdmFyIG5ld0Zyb20gPSBuZXcgRGF0ZShlbmQuZ2V0RnVsbFllYXIoKSwgZW5kLmdldE1vbnRoKCksc3RhcnQuZ2V0RGF0ZSgpKTtcclxuICAgICAgICAgICAgaWYgKGVuZCA8IG5ld0Zyb20gICYmIGVuZC5nZXRNb250aCgpID09IG5ld0Zyb20uZ2V0TW9udGgoKSAmJiBlbmQuZ2V0WWVhcigpICUgNCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICBtb250aHMtLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1vbnRocyArIDE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFNldCB0aGUgdmVydGljYWwgc2Nyb2xsIHRvcCBwb3NpdGlvbnMgZm9yIGdhbnR0ICovXHJcbiAgICBwdWJsaWMgc2Nyb2xsVG9wKHZlcnRpY2FsU2Nyb2xsRWxlbTogYW55LCBnYW50dEdyaWRFbGVtOiBhbnksIGdhbnR0QWN0aXZpdHlBcmVhRWxlbTogYW55KSB7XHJcbiAgICAgICAgY29uc3QgdmVydGljYWxTY3JvbGxUb3AgPSB2ZXJ0aWNhbFNjcm9sbEVsZW0uc2Nyb2xsVG9wO1xyXG4gICAgICAgIGNvbnN0IHNjcm9sbCA9IHRoaXMuc2V0U2Nyb2xsVG9wO1xyXG5cclxuICAgICAgICAvLyBkZWJvdW5jZVxyXG4gICAgICAgIGlmICh2ZXJ0aWNhbFNjcm9sbFRvcCAhPT0gbnVsbCAmJiB2ZXJ0aWNhbFNjcm9sbFRvcCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbCh2ZXJ0aWNhbFNjcm9sbFRvcCwgZ2FudHRBY3Rpdml0eUFyZWFFbGVtKTtcclxuICAgICAgICAgICAgc2Nyb2xsKGdhbnR0QWN0aXZpdHlBcmVhRWxlbS5zY3JvbGxUb3AsIGdhbnR0R3JpZEVsZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogR3JvdXAgZGF0YSBieSBpZCAsIG9ubHkgc3VwcG9ydHMgb25lIGxldmVsKi9cclxuICAgIHB1YmxpYyBncm91cERhdGEodGFza3M6IGFueSk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRhc2tzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDaGVja3Mgd2hldGhlciBhbnkgbmV3IGRhdGEgbmVlZHMgdG8gYmUgYWRkZWQgdG8gdGFzayBjYWNoZSAgKi9cclxuICAgIHB1YmxpYyBkb1Rhc2tDaGVjayh0YXNrczogYW55W10sIHNjYWxlOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICAvLyBjb25zdCBjYWNoZWRUYXNrSWRzID0gdGhpcy5UQVNLX0NBQ0hFLm1hcCgodGFzazogYW55KSA9PiB7IHJldHVybiB0YXNrLmlkIH0pO1xyXG4gICAgICAgIC8vIGNvbnN0IGl0ZW1zVG9DYWNoZTogYW55W10gPSBbXTtcclxuXHJcbiAgICAgICAgLy8gb25seSBsb29rIGF0IHRhc2tzIHRoYXQgYXJlIG5vdCBjYWNoZWRcclxuICAgICAgICAvLyB0YXNrcy5maWx0ZXIoKHRhc2s6IGFueSkgPT4ge1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gY2FjaGVkVGFza0lkcy5pbmRleE9mKHRhc2suaWQpID09PSAtMTtcclxuICAgICAgICAvLyB9KS5mb3JFYWNoKCh0YXNrOiBhbnkpID0+IHtcclxuICAgICAgICAvLyAgICAgaXRlbXNUb0NhY2hlLnB1c2godGFzayk7XHJcbiAgICAgICAgLy8gfSk7XHJcblxyXG4gICAgICAgIC8vIGl0ZW1zVG9DYWNoZS5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAvLyAgICAgdGhpcy5UQVNLX0NBQ0hFLnB1c2goaXRlbSk7XHJcbiAgICAgICAgLy8gfSk7XHJcblxyXG4gICAgICAgIC8vIGlmIChpdGVtc1RvQ2FjaGUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIHRoaXMuVEFTS19DQUNIRSA9IHRhc2tzO1xyXG5cclxuICAgICAgICB0aGlzLlRJTUVfU0NBTEUgPSB0aGlzLmNhbGN1bGF0ZVNjYWxlKHNjYWxlLnN0YXJ0LCBzY2FsZS5lbmQpO1xyXG4gICAgICAgIHRoaXMuTU9OVEhfU0NBTEUgPSB0aGlzLmNhbGN1bGF0ZU1vbnRoU2NhbGUoc2NhbGUuc3RhcnQsIHNjYWxlLmVuZCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBTZXQgYSBpZCBwcmVmaXggc28gQ1NTMyBxdWVyeSBzZWxlY3RvciBjYW4gd29yayB3aXRoIGlkcyB0aGF0IGNvbnRhaW4gbnVtYmVycyAqL1xyXG4gICAgcHVibGljIHNldElkUHJlZml4KGlkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBgXyR7aWR9YDtcclxuICAgIH1cclxuXHJcbiAgICAvLyAvKiogUmVtb3ZlIHRoZSBpZCBwcmVmaXggdG8gYWxsb3cgcXVlcnlpbmcgb2YgZGF0YSAqL1xyXG4gICAgLy8gcHVibGljIHJlbW92ZUlkUHJlZml4KGlkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgLy8gICAgIHJldHVybiBpZC5zdWJzdHJpbmcoMSwgaWQubGVuZ3RoIC0gMSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLyoqIFNldCB0aGUgc2Nyb2xsIHRvcCBwcm9wZXJ0eSBvZiBhIG5hdGl2ZSBET00gZWxlbWVudCAqL1xyXG4gICAgcHVibGljIHNldFNjcm9sbFRvcChzY3JvbGxUb3A6IG51bWJlciwgZWxlbWVudDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQgIT09IG51bGwgJiYgZWxlbWVudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=