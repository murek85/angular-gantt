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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZ2FudHQvIiwic291cmNlcyI6WyJsaWIvc2hhcmVkL3NlcnZpY2VzL2dhbnR0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBR3JEO0lBa0JJO1FBaEJPLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxrQkFBYSxHQUFHLEVBQUUsQ0FBQyxDQUFDLG9EQUFvRDs7UUFDeEUsbUJBQWMsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN6QyxjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QscUJBQWdCLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQixXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsY0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUs7O1FBQ3BCLGVBQVUsR0FBRyxHQUFHLENBQUM7O1lBTWQsV0FBVyxHQUFHLElBQUksV0FBVyxFQUFFO1FBRXJDLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQztRQUN2QyxJQUFJLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUM7UUFDdkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxXQUFXLENBQUMsY0FBYyxDQUFDO1FBQ2pELElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQztRQUN2QyxJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUM7UUFDL0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQztJQUMvQyxDQUFDOzs7Ozs7O0lBRU8sd0NBQWlCOzs7Ozs7SUFBekIsVUFBMEIsS0FBVyxFQUFFLEdBQVM7UUFDNUMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDM0IsS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNCO1FBRUQsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7WUFDekIsR0FBRyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZCOztZQUVLLElBQUksR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQzs7WUFDekMsS0FBSyxHQUFXLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUN4RCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDOzs7Ozs7O0lBRU8sdUNBQWdCOzs7Ozs7SUFBeEIsVUFBeUIsS0FBVyxFQUFFLEtBQVk7O1lBQzFDLElBQUksR0FBRyxDQUFDO1FBRVosSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO1lBQ2YsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7Z0JBQzNCLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO2FBQ3RCO1lBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25DLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtvQkFDbkYsc0VBQXNFO29CQUN0RSxtR0FBbUc7b0JBQ25HLElBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUN4RixDQUFDLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMxQyxNQUFNO2lCQUNUO2FBQ0o7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCw0RUFBNEU7Ozs7O0lBQ3JFLDJDQUFvQjs7OztJQUEzQjtRQUNJLE9BQVUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsT0FBSSxDQUFDO0lBQzFELENBQUM7Ozs7OztJQUVPLDRDQUFxQjs7Ozs7SUFBN0IsVUFBOEIsS0FBVzs7WUFDakMsTUFBTSxHQUFHLENBQUM7O1lBQ1IsVUFBVSxHQUFHLEVBQUU7O1lBQ2YsYUFBYSxHQUFHLEVBQUU7O1lBQ2xCLGFBQWEsR0FBRyxJQUFJOztZQUNwQixVQUFVLEdBQ1osQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsS0FBSyxDQUFDLFVBQVUsRUFBRSxHQUFHLGFBQWEsR0FBRyxLQUFLLENBQUMsVUFBVSxFQUFFLEdBQUcsYUFBYSxDQUFDO1FBRWhHLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDbEQsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVELCtCQUErQjs7Ozs7Ozs7SUFDeEIsbUNBQVk7Ozs7Ozs7SUFBbkIsVUFBb0IsSUFBUyxFQUFFLEtBQWEsRUFBRSxLQUFVOztZQUM5QyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzdDLE9BQU87WUFDSCxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLEdBQUcsQ0FBQyxHQUFHLElBQUk7WUFDckMsTUFBTSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxHQUFHLElBQUk7WUFDdkQsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSTtZQUMvQixhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJO1lBQ3hDLE9BQU8sRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSTtZQUM1RCxrQkFBa0IsRUFBRSxRQUFRLENBQUMsa0JBQWtCLENBQUM7WUFDaEQsYUFBYSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUM7U0FDekMsQ0FBQztJQUNOLENBQUM7SUFFRCw2Q0FBNkM7Ozs7Ozs7SUFDckMsa0NBQVc7Ozs7OztJQUFuQixVQUFvQixLQUFVOztZQUNwQixLQUFLLEdBQUcsRUFBRTtRQUNoQixLQUFLLENBQUMsa0JBQWtCLENBQUMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQzVDLEtBQUssQ0FBQyxhQUFhLENBQUMsR0FBRyxlQUFhLEtBQUssQ0FBQyxPQUFTLENBQUM7UUFFcEQsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELHdFQUF3RTs7Ozs7OztJQUNqRSx3Q0FBaUI7Ozs7OztJQUF4QixVQUF5QixLQUFXLEVBQUUsR0FBUztRQUMzQyxJQUFJOztnQkFDTSxNQUFNLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSTs7O2dCQUM1QixRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztnQkFDakUsSUFBSSxHQUFHLFFBQVE7WUFDckIsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1YsT0FBTyxDQUFDLENBQUM7U0FDWjtJQUNMLENBQUM7SUFFRCwyRUFBMkU7Ozs7Ozs7SUFDcEUscUNBQWM7Ozs7OztJQUFyQixVQUFzQixLQUF3QixFQUFFLEdBQWtDO1FBQTVELHNCQUFBLEVBQUEsWUFBa0IsSUFBSSxFQUFFO1FBQUUsb0JBQUEsRUFBQSxNQUFZLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQzs7WUFDeEUsS0FBSyxHQUFVLEVBQUU7UUFDdkIsSUFBSTtZQUNBLE9BQU8sS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEIsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ2xDO1lBQ0QsT0FBTyxLQUFLLENBQUM7U0FFaEI7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNWLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO0lBQ0wsQ0FBQzs7Ozs7O0lBRU0sMENBQW1COzs7OztJQUExQixVQUEyQixLQUF3QixFQUFFLEdBQWtDO1FBQTVELHNCQUFBLEVBQUEsWUFBa0IsSUFBSSxFQUFFO1FBQUUsb0JBQUEsRUFBQSxNQUFZLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQzs7WUFDL0UsS0FBSyxHQUFVLEVBQUU7UUFDckIsSUFBSTtZQUNBLDZDQUE2QztZQUM3QyxxRkFBcUY7WUFDckYscUdBQXFHO1lBQ3JHLElBQUk7WUFDSixLQUFLLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNqRCxPQUFPLEtBQUssQ0FBQztTQUVoQjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1YsT0FBTyxLQUFLLENBQUM7U0FDaEI7SUFDTCxDQUFDO0lBRUQsaURBQWlEOzs7Ozs7SUFDMUMsbUNBQVk7Ozs7O0lBQW5CLFVBQW9CLElBQVU7O1lBQ3BCLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFO1FBQ3pCLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFFO1lBQ3hCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsNENBQTRDOzs7Ozs7O0lBQ3JDLDhCQUFPOzs7Ozs7SUFBZCxVQUFlLElBQVUsRUFBRSxJQUFZOztZQUM3QixNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxrREFBa0Q7Ozs7Ozs7SUFDM0MsaUNBQVU7Ozs7Ozs7SUFBakIsVUFBa0IsSUFBVSxFQUFFLElBQVk7O1lBQ2hDLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDN0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDeEMsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVELDZFQUE2RTs7Ozs7O0lBQ3RFLHlDQUFrQjs7Ozs7SUFBekIsVUFBMEIsS0FBYTs7WUFDL0IsS0FBVzs7WUFDWCxHQUFTOztZQUNQLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBUztZQUM5QixPQUFPO2dCQUNILEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUMzQixHQUFHLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzthQUMxQixDQUFDO1FBQ04sQ0FBQyxDQUFDO1FBRUYsS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBQztZQUM5QyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRUwsR0FBRyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBQztZQUM1QyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRUwsT0FBTztZQUNILEtBQUssRUFBRSxLQUFLO1lBQ1osR0FBRyxFQUFFLEdBQUc7U0FDWCxDQUFDO0lBQ04sQ0FBQzs7Ozs7O0lBRU0sdUNBQWdCOzs7OztJQUF2QixVQUF3QixPQUFZLEVBQUUsU0FBYztRQUNoRCxPQUFPLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFFRCw4Q0FBOEM7Ozs7O0lBQ3ZDLDhDQUF1Qjs7Ozs7SUFBOUI7UUFDSSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQzs7WUFDcEMsY0FBYyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRTtRQUMxQyxPQUFPLGNBQWMsQ0FBQztJQUMxQixDQUFDOzs7O0lBRU0sK0NBQXdCOzs7SUFBL0I7O1lBQ1UsZUFBZSxHQUFHLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUMxQyxPQUFPLGVBQWUsQ0FBQztJQUMzQixDQUFDOzs7O0lBRU0sMkRBQW9DOzs7SUFBM0M7O1lBQ1UsV0FBVyxHQUFHLEVBQUU7UUFDdEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7O1lBQ3BDLEtBQUssR0FBRyxNQUFNLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVztRQUU5RCxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDO0lBQ3pELENBQUM7Ozs7O0lBRU0sa0RBQTJCOzs7O0lBQWxDLFVBQW1DLElBQWlCO1FBQ2hELE9BQU8saUJBQWUsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxRQUFLLENBQUM7SUFDdEQsQ0FBQzs7Ozs7SUFFTSxtREFBNEI7Ozs7SUFBbkMsVUFBb0MsSUFBaUI7UUFDakQsT0FBVSxJQUFJLENBQUMsWUFBWSxPQUFJLENBQUM7SUFDcEMsQ0FBQzs7Ozs7O0lBRU0sOENBQXVCOzs7OztJQUE5QixVQUErQixPQUFhLEVBQUUsT0FBYTs7WUFDbkQsQ0FBQzs7WUFBRSxNQUFNLEdBQUcsRUFBRTs7WUFDZCxTQUFTLEdBQUcsT0FBTzs7WUFDbkIsT0FBTyxHQUFHLE9BQU87O1lBQ2pCLFNBQVMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQzs7WUFDeEQsT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDO1FBRXhELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFOztnQkFDeEIsWUFBWSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7O2dCQUM1RSxVQUFVLEdBQUcsQ0FBQyxLQUFLLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDOztnQkFDeEYsVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7O2dCQUMxRixLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEtBQUs7WUFFMUQsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUN2RTtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7Ozs7Ozs7SUFFTywwQ0FBbUI7Ozs7OztJQUEzQixVQUE0QixLQUFLLEVBQUUsR0FBRzs7WUFDOUIsTUFBTSxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEdBQUcsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFFakcsSUFBRyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFOztnQkFDNUIsT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBRSxHQUFHLENBQUMsUUFBUSxFQUFFLEVBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3pFLElBQUksR0FBRyxHQUFHLE9BQU8sSUFBSyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNsRixNQUFNLEVBQUUsQ0FBQzthQUNaO1NBQ0o7UUFFRCxPQUFPLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVELHNEQUFzRDs7Ozs7Ozs7SUFDL0MsZ0NBQVM7Ozs7Ozs7SUFBaEIsVUFBaUIsa0JBQXVCLEVBQUUsYUFBa0IsRUFBRSxxQkFBMEI7O1lBQzlFLGlCQUFpQixHQUFHLGtCQUFrQixDQUFDLFNBQVM7O1lBQ2hELE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWTtRQUVoQyxXQUFXO1FBQ1gsSUFBSSxpQkFBaUIsS0FBSyxJQUFJLElBQUksaUJBQWlCLEtBQUssU0FBUyxFQUFFO1lBQy9ELE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1lBQ2pELE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUM7U0FDMUQ7SUFDTCxDQUFDO0lBRUQsZ0RBQWdEOzs7Ozs7SUFDekMsZ0NBQVM7Ozs7O0lBQWhCLFVBQWlCLEtBQVU7UUFDdkIsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELG1FQUFtRTs7Ozs7OztJQUM1RCxrQ0FBVzs7Ozs7O0lBQWxCLFVBQW1CLEtBQVksRUFBRSxLQUFVO1FBQ3ZDLGdGQUFnRjtRQUNoRixrQ0FBa0M7UUFFbEMseUNBQXlDO1FBQ3pDLGdDQUFnQztRQUNoQyxvREFBb0Q7UUFDcEQsOEJBQThCO1FBQzlCLCtCQUErQjtRQUMvQixNQUFNO1FBRU4sd0NBQXdDO1FBQ3hDLGtDQUFrQztRQUNsQyxNQUFNO1FBRU4saUNBQWlDO1FBQ2pDLG1CQUFtQjtRQUNuQixJQUFJO1FBRUosSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFFeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXBFLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxvRkFBb0Y7Ozs7OztJQUM3RSxrQ0FBVzs7Ozs7SUFBbEIsVUFBbUIsRUFBVTtRQUN6QixPQUFPLE1BQUksRUFBSSxDQUFDO0lBQ3BCLENBQUM7SUFFRCx3REFBd0Q7SUFDeEQsOENBQThDO0lBQzlDLDZDQUE2QztJQUM3QyxJQUFJO0lBRUosMERBQTBEOzs7Ozs7Ozs7OztJQUNuRCxtQ0FBWTs7Ozs7Ozs7Ozs7SUFBbkIsVUFBb0IsU0FBaUIsRUFBRSxPQUFZO1FBQy9DLElBQUksT0FBTyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQzNDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1NBQ2pDO0lBQ0wsQ0FBQzs7Z0JBL1RKLFVBQVU7Ozs7SUFnVVgsbUJBQUM7Q0FBQSxBQWhVRCxJQWdVQztTQS9UWSxZQUFZOzs7SUFDckIsaUNBQXFCOztJQUNyQixxQ0FBMEI7O0lBQzFCLHNDQUFnRDs7SUFDaEQsaUNBQXFCOztJQUNyQix3Q0FBNEI7O0lBQzVCLHNDQUEwQjs7SUFDMUIsaUNBQXFCOztJQUNyQixxQ0FBeUI7O0lBQ3pCLDhCQUFrQjs7SUFDbEIsbUNBQTJCOztJQUMzQixpQ0FBcUI7O0lBQ3JCLGtDQUF3Qjs7SUFDeEIsa0NBQXlCOztJQUN6QixrQ0FBeUI7O0lBQ3pCLG1DQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgR2FudHRDb25maWcgfSBmcm9tICcuL2dhbnR0LWNvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVGFzaywgSVNjYWxlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBHYW50dFNlcnZpY2Uge1xyXG4gICAgcHVibGljIHJvd0hlaWdodCA9IDA7XHJcbiAgICBwdWJsaWMgaG91ckNlbGxXaWR0aCA9IDYwOyAvLyBjaGFuZ2UgdG8gNjAgc28gbWludXRlcyBjYW4gYmVlbiBzZWVuIG1vcmUgZWFzaWx5XHJcbiAgICBwdWJsaWMgaG91cnNDZWxsV2lkdGggPSB0aGlzLmhvdXJDZWxsV2lkdGggKiAyNTtcclxuICAgIHB1YmxpYyBjZWxsV2lkdGggPSAwO1xyXG4gICAgcHVibGljIHdpbmRvd0lubmVyV2lkdGggPSAwO1xyXG4gICAgcHVibGljIGFjdGl2aXR5SGVpZ2h0ID0gMDtcclxuICAgIHB1YmxpYyBiYXJIZWlnaHQgPSAwO1xyXG4gICAgcHVibGljIGJhckxpbmVIZWlnaHQgPSAwO1xyXG4gICAgcHVibGljIGJhclRvcCA9IDA7XHJcbiAgICBwdWJsaWMgYmFyTW92ZWFibGUgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBncmlkV2lkdGggPSAwOyAvLzE4OFxyXG4gICAgcHVibGljIGdyaWRIZWlnaHQgPSAzMzI7XHJcbiAgICBwdWJsaWMgVEFTS19DQUNIRTogYW55W107XHJcbiAgICBwdWJsaWMgVElNRV9TQ0FMRTogYW55W107XHJcbiAgICBwdWJsaWMgTU9OVEhfU0NBTEU6IGFueVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGNvbnN0IGdhbnR0Q29uZmlnID0gbmV3IEdhbnR0Q29uZmlnKCk7XHJcblxyXG4gICAgICAgIHRoaXMucm93SGVpZ2h0ID0gZ2FudHRDb25maWcucm93SGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuY2VsbFdpZHRoID0gZ2FudHRDb25maWcuY2VsbFdpZHRoO1xyXG4gICAgICAgIHRoaXMuYWN0aXZpdHlIZWlnaHQgPSBnYW50dENvbmZpZy5hY3Rpdml0eUhlaWdodDtcclxuICAgICAgICB0aGlzLmJhckhlaWdodCA9IGdhbnR0Q29uZmlnLmJhckhlaWdodDtcclxuICAgICAgICB0aGlzLmJhckxpbmVIZWlnaHQgPSBnYW50dENvbmZpZy5iYXJMaW5lSGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuYmFyVG9wID0gZ2FudHRDb25maWcucm93SGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuYmFyTW92ZWFibGUgPSBnYW50dENvbmZpZy5iYXJNb3ZlYWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZUJhcldpZHRoKHN0YXJ0OiBEYXRlLCBlbmQ6IERhdGUpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHN0YXJ0ID0gbmV3IERhdGUoc3RhcnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBlbmQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGVuZCA9IG5ldyBEYXRlKGVuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBkYXlzID0gdGhpcy5jYWxjdWxhdGVEaWZmRGF5cyhzdGFydCwgZW5kKTtcclxuICAgICAgICBjb25zdCB3aWR0aDogbnVtYmVyID0gKGRheXMgKiB0aGlzLmNlbGxXaWR0aCArIGRheXMpIC8gNztcclxuICAgICAgICByZXR1cm4gd2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVCYXJMZWZ0KHN0YXJ0OiBEYXRlLCBzY2FsZTogYW55W10pOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBsZWZ0ID0gMDtcclxuXHJcbiAgICAgICAgaWYgKHN0YXJ0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdGFydCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY2FsZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXJ0LmdldFRpbWUoKSA+PSBzY2FsZVtpXS5nZXRUaW1lKCkgJiYgc3RhcnQuZ2V0VGltZSgpIDwgc2NhbGVbaSArIDFdLmdldFRpbWUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxlZnQgPSBpICogdGhpcy5jZWxsV2lkdGggKyBpICsgdGhpcy5jYWxjdWxhdGVCYXJMZWZ0RGVsdGEoc3RhcnQpICtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAoKDcgLyAoc2NhbGVbaSArIDFdLmdldERhdGUoKSAtIHN0YXJ0LmdldERhdGUoKSkgLyA3KSAqIHRoaXMuY2VsbFdpZHRoKSAtIHRoaXMuY2VsbFdpZHRoIC8gNztcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gaSAqIHRoaXMuY2VsbFdpZHRoICsgKCh0aGlzLmNlbGxXaWR0aCkgKiB0aGlzLmNhbGN1bGF0ZURpZmZEYXlzKHNjYWxlW2ldLCBzdGFydCkgLyA3KSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgKyB0aGlzLmNhbGN1bGF0ZUJhckxlZnREZWx0YShzdGFydCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxlZnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENhbGN1bGF0ZXMgdGhlIGhlaWdodCBvZiB0aGUgZ2FudHQgZ3JpZCwgYWN0aXZpdHkgYW5kIHZlcnRpY2FsIHNjcm9sbCAqL1xyXG4gICAgcHVibGljIGNhbGN1bGF0ZUdhbnR0SGVpZ2h0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuVEFTS19DQUNIRS5sZW5ndGggKiB0aGlzLnJvd0hlaWdodH1weGA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVCYXJMZWZ0RGVsdGEoc3RhcnQ6IERhdGUpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBvZmZzZXQgPSAwO1xyXG4gICAgICAgIGNvbnN0IGhvdXJzSW5EYXkgPSAyNDtcclxuICAgICAgICBjb25zdCBtaW51dGVzSW5Ib3VyID0gNjA7XHJcbiAgICAgICAgY29uc3Qgc2Vjb25kc0luSG91ciA9IDM2MDA7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRIb3VyczogbnVtYmVyID1cclxuICAgICAgICAgICAgKHN0YXJ0LmdldEhvdXJzKCkgKyBzdGFydC5nZXRNaW51dGVzKCkgLyBtaW51dGVzSW5Ib3VyICsgc3RhcnQuZ2V0U2Vjb25kcygpIC8gc2Vjb25kc0luSG91cik7XHJcblxyXG4gICAgICAgIG9mZnNldCA9IHRoaXMuY2VsbFdpZHRoIC8gaG91cnNJbkRheSAqIHN0YXJ0SG91cnM7XHJcbiAgICAgICAgcmV0dXJuIG9mZnNldDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlIHRoZSBiYXIgc3R5bGVzICovXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlQmFyKHRhc2s6IGFueSwgaW5kZXg6IG51bWJlciwgc2NhbGU6IGFueSkge1xyXG4gICAgICAgIGNvbnN0IGJhclN0eWxlID0gdGhpcy5nZXRCYXJTdHlsZSh0YXNrLmNvbG9yKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAndG9wJzogdGhpcy5iYXJUb3AgKiBpbmRleCArIDIgKyAncHgnLFxyXG4gICAgICAgICAgICAnbGVmdCc6IHRoaXMuY2FsY3VsYXRlQmFyTGVmdCh0YXNrLnN0YXJ0LCBzY2FsZSkgKyAncHgnLFxyXG4gICAgICAgICAgICAnaGVpZ2h0JzogdGhpcy5iYXJIZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAnbGluZS1oZWlnaHQnOiB0aGlzLmJhckxpbmVIZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAnd2lkdGgnOiB0aGlzLmNhbGN1bGF0ZUJhcldpZHRoKHRhc2suc3RhcnQsIHRhc2suZW5kKSArICdweCcsXHJcbiAgICAgICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogYmFyU3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdLFxyXG4gICAgICAgICAgICAnYm9yZGVyLWxlZnQnOiBiYXJTdHlsZVtcImJvcmRlci1sZWZ0XCJdXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogR2V0IHRoZSBiYXIgc3R5bGUgYmFzZWQgb24gdGFzayBzdGF0dXMgKi9cclxuICAgIHByaXZhdGUgZ2V0QmFyU3R5bGUoY29sb3I6IGFueSk6IGFueSB7XHJcbiAgICAgICAgY29uc3Qgc3R5bGUgPSB7fTtcclxuICAgICAgICBzdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0gPSBjb2xvci5zZWNvbmRhcnk7XHJcbiAgICAgICAgc3R5bGVbXCJib3JkZXItbGVmdFwiXSA9IGA1cHggc29saWQgJHtjb2xvci5wcmltYXJ5fWA7XHJcblxyXG4gICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlcyB0aGUgZGlmZmVyZW5jZSBpbiB0d28gZGF0ZXMgYW5kIHJldHVybnMgbnVtYmVyIG9mIGRheXMgKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVEaWZmRGF5cyhzdGFydDogRGF0ZSwgZW5kOiBEYXRlKTogbnVtYmVyIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBvbmVEYXkgPSAyNCAqIDYwICogNjAgKiAxMDAwOyAvLyBob3VycyptaW51dGVzKnNlY29uZHMqbWlsbGlzZWNvbmRzIC9tc1xyXG4gICAgICAgICAgICBjb25zdCBkaWZmRGF5cyA9IE1hdGguYWJzKChzdGFydC5nZXRUaW1lKCkgLSBlbmQuZ2V0VGltZSgpKSAvIChvbmVEYXkpKTtcclxuICAgICAgICAgICAgY29uc3QgZGF5cyA9IGRpZmZEYXlzOyAvLyBkb24ndCB1c2UgTWF0aC5yb3VuZCBhcyBpdCB3aWxsIGRyYXcgYW4gaW5jb3JyZWN0IGJhclxyXG4gICAgICAgICAgICByZXR1cm4gZGF5cztcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDYWxjdWxhdGUgdGhlIGdhbnR0IHNjYWxlIHJhbmdlIGdpdmVuIHRoZSBzdGFydCBhbmQgZW5kIGRhdGUgb2YgdGFza3MqL1xyXG4gICAgcHVibGljIGNhbGN1bGF0ZVNjYWxlKHN0YXJ0OiBEYXRlID0gbmV3IERhdGUoKSwgZW5kOiBEYXRlID0gdGhpcy5hZGREYXlzKHN0YXJ0LCA3KSkge1xyXG4gICAgICAgIGNvbnN0IHNjYWxlOiBhbnlbXSA9IFtdO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHdoaWxlIChzdGFydC5nZXRUaW1lKCkgPD0gZW5kLmdldFRpbWUoKSkge1xyXG4gICAgICAgICAgICAgICAgc2NhbGUucHVzaChzdGFydCk7XHJcbiAgICAgICAgICAgICAgICBzdGFydCA9IHRoaXMuYWRkRGF5cyhzdGFydCwgNyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHNjYWxlO1xyXG5cclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNjYWxlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlTW9udGhTY2FsZShzdGFydDogRGF0ZSA9IG5ldyBEYXRlKCksIGVuZDogRGF0ZSA9IHRoaXMuYWRkRGF5cyhzdGFydCwgNykpIHtcclxuICAgICAgICBsZXQgc2NhbGU6IGFueVtdID0gW107XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gd2hpbGUgKHN0YXJ0LmdldFRpbWUoKSA8PSBlbmQuZ2V0VGltZSgpKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBzY2FsZS5wdXNoKHsgc3RhcnQ6IHN0YXJ0LCB3aWR0aDogdGhpcy5jYWxjdWxhdGVDZWxsTW9udGhXaWR0aChzdGFydCwgZW5kKSB9KTtcclxuICAgICAgICAgICAgLy8gICAgIHN0YXJ0ID0gdGhpcy5hZGREYXlzKHN0YXJ0LCBuZXcgRGF0ZShzdGFydC5nZXRGdWxsWWVhcigpLCBzdGFydC5nZXRNb250aCgpICsgMSwgMCkuZ2V0RGF0ZSgpKTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICBzY2FsZSA9IHRoaXMuY2FsY3VsYXRlQ2VsbE1vbnRoV2lkdGgoc3RhcnQsIGVuZCk7XHJcbiAgICAgICAgICAgIHJldHVybiBzY2FsZTtcclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzY2FsZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIERldGVybWluZXMgd2hldGhlciBnaXZlbiBkYXRlIGlzIGEgd2Vla2VuZCAqL1xyXG4gICAgcHVibGljIGlzRGF5V2Vla2VuZChkYXRlOiBEYXRlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgZGF5ID0gZGF0ZS5nZXREYXkoKTtcclxuICAgICAgICBpZiAoZGF5ID09PSA2IHx8IGRheSA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBBZGQgeCBudW1iZXIgb2YgZGF5cyB0byBhIGRhdGUgb2JqZWN0ICovXHJcbiAgICBwdWJsaWMgYWRkRGF5cyhkYXRlOiBEYXRlLCBkYXlzOiBudW1iZXIpOiBEYXRlIHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgRGF0ZShkYXRlKTtcclxuICAgICAgICByZXN1bHQuc2V0RGF0ZShyZXN1bHQuZ2V0RGF0ZSgpICsgZGF5cyk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvLyoqIFJlbW92ZSB4IG51bWJlciBvZiBkYXlzIGZyb20gYSBkYXRlIG9iamVjdCAqL1xyXG4gICAgcHVibGljIHJlbW92ZURheXMoZGF0ZTogRGF0ZSwgZGF5czogbnVtYmVyKTogRGF0ZSB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGUoZGF0ZSk7XHJcbiAgICAgICAgcmVzdWx0LnNldERhdGUocmVzdWx0LmdldERhdGUoKSAtIGRheXMpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENhbGN1bGF0ZXMgdGhlIGdyaWQgc2NhbGUgZm9yIGdhbnR0IGJhc2VkIG9uIHRhc2tzIHN0YXJ0IGFuZCBlbmQgZGF0ZXMgKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVHcmlkU2NhbGUodGFza3M6IFRhc2tbXSk6IElTY2FsZSB7XHJcbiAgICAgICAgbGV0IHN0YXJ0OiBEYXRlO1xyXG4gICAgICAgIGxldCBlbmQ6IERhdGU7XHJcbiAgICAgICAgY29uc3QgZGF0ZXMgPSB0YXNrcy5tYXAoKHRhc2s6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgc3RhcnQ6IG5ldyBEYXRlKHRhc2suc3RhcnQpLFxyXG4gICAgICAgICAgICAgICAgZW5kOiBuZXcgRGF0ZSh0YXNrLmVuZClcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc3RhcnQgPSBuZXcgRGF0ZShNYXRoLm1pbi5hcHBseShudWxsLCBkYXRlcy5tYXAoKHQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHQuc3RhcnQ7XHJcbiAgICAgICAgfSkpKTtcclxuXHJcbiAgICAgICAgZW5kID0gbmV3IERhdGUoTWF0aC5tYXguYXBwbHkobnVsbCwgZGF0ZXMubWFwKCh0KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0LmVuZDtcclxuICAgICAgICB9KSkpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzdGFydDogc3RhcnQsXHJcbiAgICAgICAgICAgIGVuZDogZW5kXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50OiBhbnksIGF0dHJpYnV0ZTogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudClbYXR0cmlidXRlXSwgMTApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETyhkYWxlKTogZGV0ZXJtaW5lIHdoZXRoZXIgdGhpcyBpcyBuZWVkZWRcclxuICAgIHB1YmxpYyBjYWxjdWxhdGVDb250YWluZXJXaWR0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIHRoaXMud2luZG93SW5uZXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lcldpZHRoID0gdGhpcy5ncmlkV2lkdGggLSAxODtcclxuICAgICAgICByZXR1cm4gY29udGFpbmVyV2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbGN1bGF0ZUNvbnRhaW5lckhlaWdodCgpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckhlaWdodCA9IChpbm5lckhlaWdodCAtIDE4KTtcclxuICAgICAgICByZXR1cm4gY29udGFpbmVySGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVBY3Rpdml0eUNvbnRhaW5lckRpbWVuc2lvbnMoKTogYW55IHtcclxuICAgICAgICBjb25zdCBzY3JvbGxXaWR0aCA9IDE4O1xyXG4gICAgICAgIHRoaXMud2luZG93SW5uZXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgIGNvbnN0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGggLSB0aGlzLmdyaWRXaWR0aCAtIHNjcm9sbFdpZHRoO1xyXG5cclxuICAgICAgICByZXR1cm4geyBoZWlnaHQ6IHRoaXMuYWN0aXZpdHlIZWlnaHQsIHdpZHRoOiB3aWR0aCB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVHYW50dEFjdGl2aXR5V2lkdGgoZWxlbTogSFRNTEVsZW1lbnQpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiBgY2FsYygxMDAlIC0gJHsoZWxlbS5vZmZzZXRXaWR0aCArIDEpfXB4KWA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbGN1bGF0ZUdhbnR0QWN0aXZpdHlIZWlnaHQoZWxlbTogSFRNTEVsZW1lbnQpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiBgJHtlbGVtLm9mZnNldEhlaWdodH1weGA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbGN1bGF0ZUNlbGxNb250aFdpZHRoKG1pbkRhdGU6IERhdGUsIG1heERhdGU6IERhdGUpIHtcclxuICAgICAgICB2YXIgaSwgcmVzdWx0ID0gW107XHJcbiAgICAgICAgdmFyIHN0YXJ0RGF0ZSA9IG1pbkRhdGU7XHJcbiAgICAgICAgdmFyIGVuZERhdGUgPSBtYXhEYXRlO1xyXG4gICAgICAgIHZhciBtb250aERpZmYgPSB0aGlzLmNhbGN1bGF0ZURpZmZNb250aHMoc3RhcnREYXRlLCBlbmREYXRlKTtcclxuICAgICAgICB2YXIgZGF5RGlmZiA9IHRoaXMuY2FsY3VsYXRlRGlmZkRheXMoc3RhcnREYXRlLCBlbmREYXRlKTtcclxuXHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG1vbnRoRGlmZjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGFydE9mTW9udGggPSBpID09PSAwID8gc3RhcnREYXRlIDogbmV3IERhdGUoc3RhcnREYXRlLmdldEZ1bGxZZWFyKCksIGksIDEpO1xyXG4gICAgICAgICAgICB2YXIgZW5kT2ZNb250aCA9IGkgPT09IG1vbnRoRGlmZiAtIDEgPyBlbmREYXRlIDogbmV3IERhdGUoc3RhcnREYXRlLmdldEZ1bGxZZWFyKCksIGkgKyAxLCAwKTtcclxuICAgICAgICAgICAgdmFyIGRheUluTW9udGggPSB0aGlzLmNhbGN1bGF0ZURpZmZEYXlzKHN0YXJ0T2ZNb250aCwgZW5kT2ZNb250aCkgKyAoaSAhPT0gbW9udGhEaWZmIC0gMSAmJiAxKTtcclxuICAgICAgICAgICAgdmFyIHdpZHRoID0gTWF0aC5mbG9vcihkYXlJbk1vbnRoIC8gZGF5RGlmZiAqIDJFMykgKiAxLjAyNTtcclxuXHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHsgc3RhcnQ6IHN0YXJ0T2ZNb250aCwgZW5kOiBlbmRPZk1vbnRoLCB3aWR0aDogd2lkdGggfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlRGlmZk1vbnRocyhzdGFydCwgZW5kKSB7XHJcbiAgICAgICAgdmFyIG1vbnRocyA9IGVuZC5nZXRNb250aCgpIC0gc3RhcnQuZ2V0TW9udGgoKSArICgxMiAqIChlbmQuZ2V0RnVsbFllYXIoKSAtIHN0YXJ0LmdldEZ1bGxZZWFyKCkpKTtcclxuXHJcbiAgICAgICAgaWYoZW5kLmdldERhdGUoKSA8IHN0YXJ0LmdldERhdGUoKSkge1xyXG4gICAgICAgICAgICB2YXIgbmV3RnJvbSA9IG5ldyBEYXRlKGVuZC5nZXRGdWxsWWVhcigpLCBlbmQuZ2V0TW9udGgoKSxzdGFydC5nZXREYXRlKCkpO1xyXG4gICAgICAgICAgICBpZiAoZW5kIDwgbmV3RnJvbSAgJiYgZW5kLmdldE1vbnRoKCkgPT0gbmV3RnJvbS5nZXRNb250aCgpICYmIGVuZC5nZXRZZWFyKCkgJSA0ICE9IDApIHtcclxuICAgICAgICAgICAgICAgIG1vbnRocy0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbW9udGhzICsgMTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogU2V0IHRoZSB2ZXJ0aWNhbCBzY3JvbGwgdG9wIHBvc2l0aW9ucyBmb3IgZ2FudHQgKi9cclxuICAgIHB1YmxpYyBzY3JvbGxUb3AodmVydGljYWxTY3JvbGxFbGVtOiBhbnksIGdhbnR0R3JpZEVsZW06IGFueSwgZ2FudHRBY3Rpdml0eUFyZWFFbGVtOiBhbnkpIHtcclxuICAgICAgICBjb25zdCB2ZXJ0aWNhbFNjcm9sbFRvcCA9IHZlcnRpY2FsU2Nyb2xsRWxlbS5zY3JvbGxUb3A7XHJcbiAgICAgICAgY29uc3Qgc2Nyb2xsID0gdGhpcy5zZXRTY3JvbGxUb3A7XHJcblxyXG4gICAgICAgIC8vIGRlYm91bmNlXHJcbiAgICAgICAgaWYgKHZlcnRpY2FsU2Nyb2xsVG9wICE9PSBudWxsICYmIHZlcnRpY2FsU2Nyb2xsVG9wICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgc2Nyb2xsKHZlcnRpY2FsU2Nyb2xsVG9wLCBnYW50dEFjdGl2aXR5QXJlYUVsZW0pO1xyXG4gICAgICAgICAgICBzY3JvbGwoZ2FudHRBY3Rpdml0eUFyZWFFbGVtLnNjcm9sbFRvcCwgZ2FudHRHcmlkRWxlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBHcm91cCBkYXRhIGJ5IGlkICwgb25seSBzdXBwb3J0cyBvbmUgbGV2ZWwqL1xyXG4gICAgcHVibGljIGdyb3VwRGF0YSh0YXNrczogYW55KTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGFza3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENoZWNrcyB3aGV0aGVyIGFueSBuZXcgZGF0YSBuZWVkcyB0byBiZSBhZGRlZCB0byB0YXNrIGNhY2hlICAqL1xyXG4gICAgcHVibGljIGRvVGFza0NoZWNrKHRhc2tzOiBhbnlbXSwgc2NhbGU6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8vIGNvbnN0IGNhY2hlZFRhc2tJZHMgPSB0aGlzLlRBU0tfQ0FDSEUubWFwKCh0YXNrOiBhbnkpID0+IHsgcmV0dXJuIHRhc2suaWQgfSk7XHJcbiAgICAgICAgLy8gY29uc3QgaXRlbXNUb0NhY2hlOiBhbnlbXSA9IFtdO1xyXG5cclxuICAgICAgICAvLyBvbmx5IGxvb2sgYXQgdGFza3MgdGhhdCBhcmUgbm90IGNhY2hlZFxyXG4gICAgICAgIC8vIHRhc2tzLmZpbHRlcigodGFzazogYW55KSA9PiB7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiBjYWNoZWRUYXNrSWRzLmluZGV4T2YodGFzay5pZCkgPT09IC0xO1xyXG4gICAgICAgIC8vIH0pLmZvckVhY2goKHRhc2s6IGFueSkgPT4ge1xyXG4gICAgICAgIC8vICAgICBpdGVtc1RvQ2FjaGUucHVzaCh0YXNrKTtcclxuICAgICAgICAvLyB9KTtcclxuXHJcbiAgICAgICAgLy8gaXRlbXNUb0NhY2hlLmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgIC8vICAgICB0aGlzLlRBU0tfQ0FDSEUucHVzaChpdGVtKTtcclxuICAgICAgICAvLyB9KTtcclxuXHJcbiAgICAgICAgLy8gaWYgKGl0ZW1zVG9DYWNoZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgdGhpcy5UQVNLX0NBQ0hFID0gdGFza3M7XHJcblxyXG4gICAgICAgIHRoaXMuVElNRV9TQ0FMRSA9IHRoaXMuY2FsY3VsYXRlU2NhbGUoc2NhbGUuc3RhcnQsIHNjYWxlLmVuZCk7XHJcbiAgICAgICAgdGhpcy5NT05USF9TQ0FMRSA9IHRoaXMuY2FsY3VsYXRlTW9udGhTY2FsZShzY2FsZS5zdGFydCwgc2NhbGUuZW5kKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFNldCBhIGlkIHByZWZpeCBzbyBDU1MzIHF1ZXJ5IHNlbGVjdG9yIGNhbiB3b3JrIHdpdGggaWRzIHRoYXQgY29udGFpbiBudW1iZXJzICovXHJcbiAgICBwdWJsaWMgc2V0SWRQcmVmaXgoaWQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGBfJHtpZH1gO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIC8qKiBSZW1vdmUgdGhlIGlkIHByZWZpeCB0byBhbGxvdyBxdWVyeWluZyBvZiBkYXRhICovXHJcbiAgICAvLyBwdWJsaWMgcmVtb3ZlSWRQcmVmaXgoaWQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAvLyAgICAgcmV0dXJuIGlkLnN1YnN0cmluZygxLCBpZC5sZW5ndGggLSAxKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvKiogU2V0IHRoZSBzY3JvbGwgdG9wIHByb3BlcnR5IG9mIGEgbmF0aXZlIERPTSBlbGVtZW50ICovXHJcbiAgICBwdWJsaWMgc2V0U2Nyb2xsVG9wKHNjcm9sbFRvcDogbnVtYmVyLCBlbGVtZW50OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZWxlbWVudCAhPT0gbnVsbCAmJiBlbGVtZW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5zY3JvbGxUb3AgPSBzY3JvbGxUb3A7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==