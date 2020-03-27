/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { GanttConfig } from './gantt-config.service';
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
        var width = (days / 7 * this.cellWidth + days / 7);
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
                if ((start.getTime() >= scale[i].getTime() && start.getTime() < scale[i + 1].getTime())) {
                    left = i * this.cellWidth + i + this.calculateBarLeftDelta(start) + ((7 / (scale[i + 1].getDate() - start.getDate()) / 7) * this.cellWidth) - this.cellWidth / 7;
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
        var startHours = start.getHours() + start.getMinutes() / minutesInHour + start.getSeconds() / secondsInHour;
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
    GanttService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    GanttService.ctorParameters = function () { return []; };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZ2FudHQvIiwic291cmNlcyI6WyJsaWIvc2hhcmVkL3NlcnZpY2VzL2dhbnR0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBR3JEO0lBa0JJO1FBaEJPLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxrQkFBYSxHQUFHLEVBQUUsQ0FBQyxDQUFDLG9EQUFvRDs7UUFDeEUsbUJBQWMsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN6QyxjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QscUJBQWdCLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQixXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsY0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUs7O1FBQ3BCLGVBQVUsR0FBRyxHQUFHLENBQUM7O1lBTWQsV0FBVyxHQUFHLElBQUksV0FBVyxFQUFFO1FBRXJDLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQztRQUN2QyxJQUFJLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUM7UUFDdkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxXQUFXLENBQUMsY0FBYyxDQUFDO1FBQ2pELElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQztRQUN2QyxJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUM7UUFDL0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLENB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LEVBQUksQ0FBQztJQUNwQixDQUFDO0lBRUQsd0RBQXdEO0lBQ3hELDhDQUE4QztJQUM5Qyw2Q0FBNkM7SUFDN0MsSUFBSTtJQUVKLDBEQUEwRDs7Ozs7Ozs7Ozs7SUFDbkQsbUNBQVk7Ozs7Ozs7Ozs7O0lBQW5CLFVBQW9CLFNBQWlCLEVBQUUsT0FBWTtRQUMvQyxJQUFJLE9BQU8sS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtZQUMzQyxPQUFPLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztTQUNqQztJQUNMLENBQUM7O2dCQTdUSixVQUFVOzs7O0lBOFRYLG1CQUFDO0NBQUEsQUE5VEQsSUE4VEM7U0E3VFksWUFBWTs7O0lBQ3JCLGlDQUFxQjs7SUFDckIscUNBQTBCOztJQUMxQixzQ0FBZ0Q7O0lBQ2hELGlDQUFxQjs7SUFDckIsd0NBQTRCOztJQUM1QixzQ0FBMEI7O0lBQzFCLGlDQUFxQjs7SUFDckIscUNBQXlCOztJQUN6Qiw4QkFBa0I7O0lBQ2xCLG1DQUEyQjs7SUFDM0IsaUNBQXFCOztJQUNyQixrQ0FBd0I7O0lBQ3hCLGtDQUF5Qjs7SUFDekIsa0NBQXlCOztJQUN6QixtQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEdhbnR0Q29uZmlnIH0gZnJvbSAnLi9nYW50dC1jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IFRhc2ssIElTY2FsZSB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgR2FudHRTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyByb3dIZWlnaHQgPSAwO1xyXG4gICAgcHVibGljIGhvdXJDZWxsV2lkdGggPSA2MDsgLy8gY2hhbmdlIHRvIDYwIHNvIG1pbnV0ZXMgY2FuIGJlZW4gc2VlbiBtb3JlIGVhc2lseVxyXG4gICAgcHVibGljIGhvdXJzQ2VsbFdpZHRoID0gdGhpcy5ob3VyQ2VsbFdpZHRoICogMjU7XHJcbiAgICBwdWJsaWMgY2VsbFdpZHRoID0gMDtcclxuICAgIHB1YmxpYyB3aW5kb3dJbm5lcldpZHRoID0gMDtcclxuICAgIHB1YmxpYyBhY3Rpdml0eUhlaWdodCA9IDA7XHJcbiAgICBwdWJsaWMgYmFySGVpZ2h0ID0gMDtcclxuICAgIHB1YmxpYyBiYXJMaW5lSGVpZ2h0ID0gMDtcclxuICAgIHB1YmxpYyBiYXJUb3AgPSAwO1xyXG4gICAgcHVibGljIGJhck1vdmVhYmxlID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgZ3JpZFdpZHRoID0gMDsgLy8xODhcclxuICAgIHB1YmxpYyBncmlkSGVpZ2h0ID0gMzMyO1xyXG4gICAgcHVibGljIFRBU0tfQ0FDSEU6IGFueVtdO1xyXG4gICAgcHVibGljIFRJTUVfU0NBTEU6IGFueVtdO1xyXG4gICAgcHVibGljIE1PTlRIX1NDQUxFOiBhbnlbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBjb25zdCBnYW50dENvbmZpZyA9IG5ldyBHYW50dENvbmZpZygpO1xyXG5cclxuICAgICAgICB0aGlzLnJvd0hlaWdodCA9IGdhbnR0Q29uZmlnLnJvd0hlaWdodDtcclxuICAgICAgICB0aGlzLmNlbGxXaWR0aCA9IGdhbnR0Q29uZmlnLmNlbGxXaWR0aDtcclxuICAgICAgICB0aGlzLmFjdGl2aXR5SGVpZ2h0ID0gZ2FudHRDb25maWcuYWN0aXZpdHlIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5iYXJIZWlnaHQgPSBnYW50dENvbmZpZy5iYXJIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5iYXJMaW5lSGVpZ2h0ID0gZ2FudHRDb25maWcuYmFyTGluZUhlaWdodDtcclxuICAgICAgICB0aGlzLmJhclRvcCA9IGdhbnR0Q29uZmlnLnJvd0hlaWdodDtcclxuICAgICAgICB0aGlzLmJhck1vdmVhYmxlID0gZ2FudHRDb25maWcuYmFyTW92ZWFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVCYXJXaWR0aChzdGFydDogRGF0ZSwgZW5kOiBEYXRlKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAodHlwZW9mIHN0YXJ0ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBzdGFydCA9IG5ldyBEYXRlKHN0YXJ0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgZW5kID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBlbmQgPSBuZXcgRGF0ZShlbmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZGF5cyA9IHRoaXMuY2FsY3VsYXRlRGlmZkRheXMoc3RhcnQsIGVuZCk7XHJcbiAgICAgICAgY29uc3Qgd2lkdGg6IG51bWJlciA9IChkYXlzIC8gNyAqIHRoaXMuY2VsbFdpZHRoICsgZGF5cyAvIDcpO1xyXG4gICAgICAgIHJldHVybiB3aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZUJhckxlZnQoc3RhcnQ6IERhdGUsIHNjYWxlOiBhbnlbXSk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGxlZnQgPSAwO1xyXG5cclxuICAgICAgICBpZiAoc3RhcnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHN0YXJ0ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgc3RhcnQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNjYWxlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKHN0YXJ0LmdldFRpbWUoKSA+PSBzY2FsZVtpXS5nZXRUaW1lKCkgJiYgc3RhcnQuZ2V0VGltZSgpIDwgc2NhbGVbaSArIDFdLmdldFRpbWUoKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gaSAqIHRoaXMuY2VsbFdpZHRoICsgaSArIHRoaXMuY2FsY3VsYXRlQmFyTGVmdERlbHRhKHN0YXJ0KSArICgoNyAvIChzY2FsZVtpICsgMV0uZ2V0RGF0ZSgpIC0gc3RhcnQuZ2V0RGF0ZSgpKSAvIDcpICogdGhpcy5jZWxsV2lkdGgpIC0gdGhpcy5jZWxsV2lkdGggLyA3O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsZWZ0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDYWxjdWxhdGVzIHRoZSBoZWlnaHQgb2YgdGhlIGdhbnR0IGdyaWQsIGFjdGl2aXR5IGFuZCB2ZXJ0aWNhbCBzY3JvbGwgKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVHYW50dEhlaWdodCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBgJHt0aGlzLlRBU0tfQ0FDSEUubGVuZ3RoICogdGhpcy5yb3dIZWlnaHR9cHhgO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlQmFyTGVmdERlbHRhKHN0YXJ0OiBEYXRlKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgb2Zmc2V0ID0gMDtcclxuICAgICAgICBjb25zdCBob3Vyc0luRGF5ID0gMjQ7XHJcbiAgICAgICAgY29uc3QgbWludXRlc0luSG91ciA9IDYwO1xyXG4gICAgICAgIGNvbnN0IHNlY29uZHNJbkhvdXIgPSAzNjAwO1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0SG91cnM6IG51bWJlciA9XHJcbiAgICAgICAgICAgIHN0YXJ0LmdldEhvdXJzKCkgKyBzdGFydC5nZXRNaW51dGVzKCkgLyBtaW51dGVzSW5Ib3VyICsgc3RhcnQuZ2V0U2Vjb25kcygpIC8gc2Vjb25kc0luSG91cjtcclxuXHJcbiAgICAgICAgb2Zmc2V0ID0gdGhpcy5jZWxsV2lkdGggLyBob3Vyc0luRGF5ICogc3RhcnRIb3VycztcclxuICAgICAgICByZXR1cm4gb2Zmc2V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDYWxjdWxhdGUgdGhlIGJhciBzdHlsZXMgKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVCYXIodGFzazogYW55LCBpbmRleDogbnVtYmVyLCBzY2FsZTogYW55KSB7XHJcbiAgICAgICAgY29uc3QgYmFyU3R5bGUgPSB0aGlzLmdldEJhclN0eWxlKHRhc2suY29sb3IpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICd0b3AnOiB0aGlzLmJhclRvcCAqIGluZGV4ICsgMiArICdweCcsXHJcbiAgICAgICAgICAgICdsZWZ0JzogdGhpcy5jYWxjdWxhdGVCYXJMZWZ0KHRhc2suc3RhcnQsIHNjYWxlKSArICdweCcsXHJcbiAgICAgICAgICAgICdoZWlnaHQnOiB0aGlzLmJhckhlaWdodCArICdweCcsXHJcbiAgICAgICAgICAgICdsaW5lLWhlaWdodCc6IHRoaXMuYmFyTGluZUhlaWdodCArICdweCcsXHJcbiAgICAgICAgICAgICd3aWR0aCc6IHRoaXMuY2FsY3VsYXRlQmFyV2lkdGgodGFzay5zdGFydCwgdGFzay5lbmQpICsgJ3B4JyxcclxuICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiBiYXJTdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0sXHJcbiAgICAgICAgICAgICdib3JkZXItbGVmdCc6IGJhclN0eWxlW1wiYm9yZGVyLWxlZnRcIl1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBHZXQgdGhlIGJhciBzdHlsZSBiYXNlZCBvbiB0YXNrIHN0YXR1cyAqL1xyXG4gICAgcHJpdmF0ZSBnZXRCYXJTdHlsZShjb2xvcjogYW55KTogYW55IHtcclxuICAgICAgICBjb25zdCBzdHlsZSA9IHt9O1xyXG4gICAgICAgIHN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSA9IGNvbG9yLnNlY29uZGFyeTtcclxuICAgICAgICBzdHlsZVtcImJvcmRlci1sZWZ0XCJdID0gYDVweCBzb2xpZCAke2NvbG9yLnByaW1hcnl9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDYWxjdWxhdGVzIHRoZSBkaWZmZXJlbmNlIGluIHR3byBkYXRlcyBhbmQgcmV0dXJucyBudW1iZXIgb2YgZGF5cyAqL1xyXG4gICAgcHVibGljIGNhbGN1bGF0ZURpZmZEYXlzKHN0YXJ0OiBEYXRlLCBlbmQ6IERhdGUpOiBudW1iZXIge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9uZURheSA9IDI0ICogNjAgKiA2MCAqIDEwMDA7IC8vIGhvdXJzKm1pbnV0ZXMqc2Vjb25kcyptaWxsaXNlY29uZHMgL21zXHJcbiAgICAgICAgICAgIGNvbnN0IGRpZmZEYXlzID0gTWF0aC5hYnMoKHN0YXJ0LmdldFRpbWUoKSAtIGVuZC5nZXRUaW1lKCkpIC8gKG9uZURheSkpO1xyXG4gICAgICAgICAgICBjb25zdCBkYXlzID0gZGlmZkRheXM7IC8vIGRvbid0IHVzZSBNYXRoLnJvdW5kIGFzIGl0IHdpbGwgZHJhdyBhbiBpbmNvcnJlY3QgYmFyXHJcbiAgICAgICAgICAgIHJldHVybiBkYXlzO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENhbGN1bGF0ZSB0aGUgZ2FudHQgc2NhbGUgcmFuZ2UgZ2l2ZW4gdGhlIHN0YXJ0IGFuZCBlbmQgZGF0ZSBvZiB0YXNrcyovXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlU2NhbGUoc3RhcnQ6IERhdGUgPSBuZXcgRGF0ZSgpLCBlbmQ6IERhdGUgPSB0aGlzLmFkZERheXMoc3RhcnQsIDcpKSB7XHJcbiAgICAgICAgY29uc3Qgc2NhbGU6IGFueVtdID0gW107XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgd2hpbGUgKHN0YXJ0LmdldFRpbWUoKSA8PSBlbmQuZ2V0VGltZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBzY2FsZS5wdXNoKHN0YXJ0KTtcclxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gdGhpcy5hZGREYXlzKHN0YXJ0LCA3KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gc2NhbGU7XHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZXR1cm4gc2NhbGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVNb250aFNjYWxlKHN0YXJ0OiBEYXRlID0gbmV3IERhdGUoKSwgZW5kOiBEYXRlID0gdGhpcy5hZGREYXlzKHN0YXJ0LCA3KSkge1xyXG4gICAgICAgIGxldCBzY2FsZTogYW55W10gPSBbXTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyB3aGlsZSAoc3RhcnQuZ2V0VGltZSgpIDw9IGVuZC5nZXRUaW1lKCkpIHtcclxuICAgICAgICAgICAgLy8gICAgIHNjYWxlLnB1c2goeyBzdGFydDogc3RhcnQsIHdpZHRoOiB0aGlzLmNhbGN1bGF0ZUNlbGxNb250aFdpZHRoKHN0YXJ0LCBlbmQpIH0pO1xyXG4gICAgICAgICAgICAvLyAgICAgc3RhcnQgPSB0aGlzLmFkZERheXMoc3RhcnQsIG5ldyBEYXRlKHN0YXJ0LmdldEZ1bGxZZWFyKCksIHN0YXJ0LmdldE1vbnRoKCkgKyAxLCAwKS5nZXREYXRlKCkpO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIHNjYWxlID0gdGhpcy5jYWxjdWxhdGVDZWxsTW9udGhXaWR0aChzdGFydCwgZW5kKTtcclxuICAgICAgICAgICAgcmV0dXJuIHNjYWxlO1xyXG5cclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNjYWxlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogRGV0ZXJtaW5lcyB3aGV0aGVyIGdpdmVuIGRhdGUgaXMgYSB3ZWVrZW5kICovXHJcbiAgICBwdWJsaWMgaXNEYXlXZWVrZW5kKGRhdGU6IERhdGUpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCBkYXkgPSBkYXRlLmdldERheSgpO1xyXG4gICAgICAgIGlmIChkYXkgPT09IDYgfHwgZGF5ID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEFkZCB4IG51bWJlciBvZiBkYXlzIHRvIGEgZGF0ZSBvYmplY3QgKi9cclxuICAgIHB1YmxpYyBhZGREYXlzKGRhdGU6IERhdGUsIGRheXM6IG51bWJlcik6IERhdGUge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBEYXRlKGRhdGUpO1xyXG4gICAgICAgIHJlc3VsdC5zZXREYXRlKHJlc3VsdC5nZXREYXRlKCkgKyBkYXlzKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8vKiogUmVtb3ZlIHggbnVtYmVyIG9mIGRheXMgZnJvbSBhIGRhdGUgb2JqZWN0ICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlRGF5cyhkYXRlOiBEYXRlLCBkYXlzOiBudW1iZXIpOiBEYXRlIHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgRGF0ZShkYXRlKTtcclxuICAgICAgICByZXN1bHQuc2V0RGF0ZShyZXN1bHQuZ2V0RGF0ZSgpIC0gZGF5cyk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlcyB0aGUgZ3JpZCBzY2FsZSBmb3IgZ2FudHQgYmFzZWQgb24gdGFza3Mgc3RhcnQgYW5kIGVuZCBkYXRlcyAqL1xyXG4gICAgcHVibGljIGNhbGN1bGF0ZUdyaWRTY2FsZSh0YXNrczogVGFza1tdKTogSVNjYWxlIHtcclxuICAgICAgICBsZXQgc3RhcnQ6IERhdGU7XHJcbiAgICAgICAgbGV0IGVuZDogRGF0ZTtcclxuICAgICAgICBjb25zdCBkYXRlcyA9IHRhc2tzLm1hcCgodGFzazogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBzdGFydDogbmV3IERhdGUodGFzay5zdGFydCksXHJcbiAgICAgICAgICAgICAgICBlbmQ6IG5ldyBEYXRlKHRhc2suZW5kKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzdGFydCA9IG5ldyBEYXRlKE1hdGgubWluLmFwcGx5KG51bGwsIGRhdGVzLm1hcCgodCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdC5zdGFydDtcclxuICAgICAgICB9KSkpO1xyXG5cclxuICAgICAgICBlbmQgPSBuZXcgRGF0ZShNYXRoLm1heC5hcHBseShudWxsLCBkYXRlcy5tYXAoKHQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHQuZW5kO1xyXG4gICAgICAgIH0pKSk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcclxuICAgICAgICAgICAgZW5kOiBlbmRcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQ6IGFueSwgYXR0cmlidXRlOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gcGFyc2VJbnQoZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KVthdHRyaWJ1dGVdLCAxMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPKGRhbGUpOiBkZXRlcm1pbmUgd2hldGhlciB0aGlzIGlzIG5lZWRlZFxyXG4gICAgcHVibGljIGNhbGN1bGF0ZUNvbnRhaW5lcldpZHRoKCk6IG51bWJlciB7XHJcbiAgICAgICAgdGhpcy53aW5kb3dJbm5lcldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyV2lkdGggPSB0aGlzLmdyaWRXaWR0aCAtIDE4O1xyXG4gICAgICAgIHJldHVybiBjb250YWluZXJXaWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlQ29udGFpbmVySGVpZ2h0KCk6IG51bWJlciB7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVySGVpZ2h0ID0gKGlubmVySGVpZ2h0IC0gMTgpO1xyXG4gICAgICAgIHJldHVybiBjb250YWluZXJIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbGN1bGF0ZUFjdGl2aXR5Q29udGFpbmVyRGltZW5zaW9ucygpOiBhbnkge1xyXG4gICAgICAgIGNvbnN0IHNjcm9sbFdpZHRoID0gMTg7XHJcbiAgICAgICAgdGhpcy53aW5kb3dJbm5lcldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgY29uc3Qgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCAtIHRoaXMuZ3JpZFdpZHRoIC0gc2Nyb2xsV2lkdGg7XHJcblxyXG4gICAgICAgIHJldHVybiB7IGhlaWdodDogdGhpcy5hY3Rpdml0eUhlaWdodCwgd2lkdGg6IHdpZHRoIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbGN1bGF0ZUdhbnR0QWN0aXZpdHlXaWR0aChlbGVtOiBIVE1MRWxlbWVudCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIGBjYWxjKDEwMCUgLSAkeyhlbGVtLm9mZnNldFdpZHRoICsgMSl9cHgpYDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlR2FudHRBY3Rpdml0eUhlaWdodChlbGVtOiBIVE1MRWxlbWVudCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIGAke2VsZW0ub2Zmc2V0SGVpZ2h0fXB4YDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlQ2VsbE1vbnRoV2lkdGgobWluRGF0ZTogRGF0ZSwgbWF4RGF0ZTogRGF0ZSkge1xyXG4gICAgICAgIHZhciBpLCByZXN1bHQgPSBbXTtcclxuICAgICAgICB2YXIgc3RhcnREYXRlID0gbWluRGF0ZTtcclxuICAgICAgICB2YXIgZW5kRGF0ZSA9IG1heERhdGU7XHJcbiAgICAgICAgdmFyIG1vbnRoRGlmZiA9IHRoaXMuY2FsY3VsYXRlRGlmZk1vbnRocyhzdGFydERhdGUsIGVuZERhdGUpO1xyXG4gICAgICAgIHZhciBkYXlEaWZmID0gdGhpcy5jYWxjdWxhdGVEaWZmRGF5cyhzdGFydERhdGUsIGVuZERhdGUpO1xyXG5cclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbW9udGhEaWZmOyBpKyspIHsgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgc3RhcnRPZk1vbnRoID0gaSA9PT0gMCA/IHN0YXJ0RGF0ZSA6IG5ldyBEYXRlKHN0YXJ0RGF0ZS5nZXRGdWxsWWVhcigpLCBpLCAxKTtcclxuICAgICAgICAgICAgdmFyIGVuZE9mTW9udGggPSBpID09PSBtb250aERpZmYgLSAxID8gZW5kRGF0ZSA6IG5ldyBEYXRlKHN0YXJ0RGF0ZS5nZXRGdWxsWWVhcigpLCBpICsgMSwgMCk7XHJcbiAgICAgICAgICAgIHZhciBkYXlJbk1vbnRoID0gdGhpcy5jYWxjdWxhdGVEaWZmRGF5cyhzdGFydE9mTW9udGgsIGVuZE9mTW9udGgpICsgKGkgIT09IG1vbnRoRGlmZiAtIDEgJiYgMSk7XHJcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IE1hdGguZmxvb3IoZGF5SW5Nb250aCAvIGRheURpZmYgKiAyRTMpICogMS4wMjU7XHJcblxyXG4gICAgICAgICAgICByZXN1bHQucHVzaCh7IHN0YXJ0OiBzdGFydE9mTW9udGgsIGVuZDogZW5kT2ZNb250aCwgd2lkdGg6IHdpZHRoIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZURpZmZNb250aHMoc3RhcnQsIGVuZCkge1xyXG4gICAgICAgIHZhciBtb250aHMgPSBlbmQuZ2V0TW9udGgoKSAtIHN0YXJ0LmdldE1vbnRoKCkgKyAoMTIgKiAoZW5kLmdldEZ1bGxZZWFyKCkgLSBzdGFydC5nZXRGdWxsWWVhcigpKSk7XHJcblxyXG4gICAgICAgIGlmKGVuZC5nZXREYXRlKCkgPCBzdGFydC5nZXREYXRlKCkpIHtcclxuICAgICAgICAgICAgdmFyIG5ld0Zyb20gPSBuZXcgRGF0ZShlbmQuZ2V0RnVsbFllYXIoKSwgZW5kLmdldE1vbnRoKCksc3RhcnQuZ2V0RGF0ZSgpKTtcclxuICAgICAgICAgICAgaWYgKGVuZCA8IG5ld0Zyb20gICYmIGVuZC5nZXRNb250aCgpID09IG5ld0Zyb20uZ2V0TW9udGgoKSAmJiBlbmQuZ2V0WWVhcigpICUgNCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICBtb250aHMtLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1vbnRocyArIDE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFNldCB0aGUgdmVydGljYWwgc2Nyb2xsIHRvcCBwb3NpdGlvbnMgZm9yIGdhbnR0ICovXHJcbiAgICBwdWJsaWMgc2Nyb2xsVG9wKHZlcnRpY2FsU2Nyb2xsRWxlbTogYW55LCBnYW50dEdyaWRFbGVtOiBhbnksIGdhbnR0QWN0aXZpdHlBcmVhRWxlbTogYW55KSB7XHJcbiAgICAgICAgY29uc3QgdmVydGljYWxTY3JvbGxUb3AgPSB2ZXJ0aWNhbFNjcm9sbEVsZW0uc2Nyb2xsVG9wO1xyXG4gICAgICAgIGNvbnN0IHNjcm9sbCA9IHRoaXMuc2V0U2Nyb2xsVG9wO1xyXG5cclxuICAgICAgICAvLyBkZWJvdW5jZVxyXG4gICAgICAgIGlmICh2ZXJ0aWNhbFNjcm9sbFRvcCAhPT0gbnVsbCAmJiB2ZXJ0aWNhbFNjcm9sbFRvcCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbCh2ZXJ0aWNhbFNjcm9sbFRvcCwgZ2FudHRBY3Rpdml0eUFyZWFFbGVtKTtcclxuICAgICAgICAgICAgc2Nyb2xsKGdhbnR0QWN0aXZpdHlBcmVhRWxlbS5zY3JvbGxUb3AsIGdhbnR0R3JpZEVsZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogR3JvdXAgZGF0YSBieSBpZCAsIG9ubHkgc3VwcG9ydHMgb25lIGxldmVsKi9cclxuICAgIHB1YmxpYyBncm91cERhdGEodGFza3M6IGFueSk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRhc2tzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDaGVja3Mgd2hldGhlciBhbnkgbmV3IGRhdGEgbmVlZHMgdG8gYmUgYWRkZWQgdG8gdGFzayBjYWNoZSAgKi9cclxuICAgIHB1YmxpYyBkb1Rhc2tDaGVjayh0YXNrczogYW55W10sIHNjYWxlOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICAvLyBjb25zdCBjYWNoZWRUYXNrSWRzID0gdGhpcy5UQVNLX0NBQ0hFLm1hcCgodGFzazogYW55KSA9PiB7IHJldHVybiB0YXNrLmlkIH0pO1xyXG4gICAgICAgIC8vIGNvbnN0IGl0ZW1zVG9DYWNoZTogYW55W10gPSBbXTtcclxuXHJcbiAgICAgICAgLy8gb25seSBsb29rIGF0IHRhc2tzIHRoYXQgYXJlIG5vdCBjYWNoZWRcclxuICAgICAgICAvLyB0YXNrcy5maWx0ZXIoKHRhc2s6IGFueSkgPT4ge1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gY2FjaGVkVGFza0lkcy5pbmRleE9mKHRhc2suaWQpID09PSAtMTtcclxuICAgICAgICAvLyB9KS5mb3JFYWNoKCh0YXNrOiBhbnkpID0+IHtcclxuICAgICAgICAvLyAgICAgaXRlbXNUb0NhY2hlLnB1c2godGFzayk7XHJcbiAgICAgICAgLy8gfSk7XHJcblxyXG4gICAgICAgIC8vIGl0ZW1zVG9DYWNoZS5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAvLyAgICAgdGhpcy5UQVNLX0NBQ0hFLnB1c2goaXRlbSk7XHJcbiAgICAgICAgLy8gfSk7XHJcblxyXG4gICAgICAgIC8vIGlmIChpdGVtc1RvQ2FjaGUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIHRoaXMuVEFTS19DQUNIRSA9IHRhc2tzO1xyXG5cclxuICAgICAgICB0aGlzLlRJTUVfU0NBTEUgPSB0aGlzLmNhbGN1bGF0ZVNjYWxlKHNjYWxlLnN0YXJ0LCBzY2FsZS5lbmQpO1xyXG4gICAgICAgIHRoaXMuTU9OVEhfU0NBTEUgPSB0aGlzLmNhbGN1bGF0ZU1vbnRoU2NhbGUoc2NhbGUuc3RhcnQsIHNjYWxlLmVuZCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBTZXQgYSBpZCBwcmVmaXggc28gQ1NTMyBxdWVyeSBzZWxlY3RvciBjYW4gd29yayB3aXRoIGlkcyB0aGF0IGNvbnRhaW4gbnVtYmVycyAqL1xyXG4gICAgcHVibGljIHNldElkUHJlZml4KGlkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBgXyR7aWR9YDtcclxuICAgIH1cclxuXHJcbiAgICAvLyAvKiogUmVtb3ZlIHRoZSBpZCBwcmVmaXggdG8gYWxsb3cgcXVlcnlpbmcgb2YgZGF0YSAqL1xyXG4gICAgLy8gcHVibGljIHJlbW92ZUlkUHJlZml4KGlkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgLy8gICAgIHJldHVybiBpZC5zdWJzdHJpbmcoMSwgaWQubGVuZ3RoIC0gMSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLyoqIFNldCB0aGUgc2Nyb2xsIHRvcCBwcm9wZXJ0eSBvZiBhIG5hdGl2ZSBET00gZWxlbWVudCAqL1xyXG4gICAgcHVibGljIHNldFNjcm9sbFRvcChzY3JvbGxUb3A6IG51bWJlciwgZWxlbWVudDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQgIT09IG51bGwgJiYgZWxlbWVudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=