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
        this.gridWidth = 542; //188
        //188
        this.gridHeight = 332;
        this.barStyles = [
            { status: "information", backgroundColor: "rgb(18,195, 244)", border: "1px solid #2196F3", progressBackgroundColor: "#2196F3" },
            { status: "warning", backgroundColor: "#FFA726", border: "1px solid #EF6C00", progressBackgroundColor: "#EF6C00" },
            { status: "error", backgroundColor: "#EF5350", border: "1px solid #C62828", progressBackgroundColor: "#C62828" },
            { status: "completed", backgroundColor: "#66BB6A", border: "1px solid #2E7D32", progressBackgroundColor: "#2E7D32" }
        ];
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
        var barStyle = this.getBarStyle(task.status);
        return {
            'top': this.barTop * index + 2 + 'px',
            'left': this.calculateBarLeft(task.start, scale) + 'px',
            'height': this.barHeight + 'px',
            'line-height': this.barLineHeight + 'px',
            'width': this.calculateBarWidth(task.start, task.end) + 'px',
            'background-color': barStyle["background-color"],
            'border': barStyle["border"]
        };
    };
    /** Get the bar style based on task status */
    /**
     * Get the bar style based on task status
     * @private
     * @param {?=} taskStatus
     * @return {?}
     */
    GanttService.prototype.getBarStyle = /**
     * Get the bar style based on task status
     * @private
     * @param {?=} taskStatus
     * @return {?}
     */
    function (taskStatus) {
        if (taskStatus === void 0) { taskStatus = ""; }
        /** @type {?} */
        var style = {};
        try {
            taskStatus = taskStatus.toLowerCase();
        }
        catch (err) {
            taskStatus = "";
        }
        switch (taskStatus) {
            default:
                style["background-color"] = "rgb(18,195, 244)";
                style["border"] = "1px solid #2196F3";
                break;
        }
        return style;
    };
    /** Get the progresss bar background colour based on task status */
    /**
     * Get the progresss bar background colour based on task status
     * @param {?=} taskStatus
     * @return {?}
     */
    GanttService.prototype.getBarProgressStyle = /**
     * Get the progresss bar background colour based on task status
     * @param {?=} taskStatus
     * @return {?}
     */
    function (taskStatus) {
        if (taskStatus === void 0) { taskStatus = ""; }
        /** @type {?} */
        var style = {};
        try {
            taskStatus = taskStatus.toLowerCase();
        }
        catch (err) {
            taskStatus = "";
        }
        switch (taskStatus) {
            default:
                style["background-color"] = this.barStyles[0].progressBackgroundColor;
                break;
        }
        return style;
    };
    /** Calculates the bar progress width in pixels given task percent complete */
    /**
     * Calculates the bar progress width in pixels given task percent complete
     * @param {?} width
     * @param {?} percent
     * @return {?}
     */
    GanttService.prototype.calculateBarProgress = /**
     * Calculates the bar progress width in pixels given task percent complete
     * @param {?} width
     * @param {?} percent
     * @return {?}
     */
    function (width, percent) {
        if (typeof percent === "number") {
            if (percent > 100) {
                percent = 100;
            }
            /** @type {?} */
            var progress = (width / 100) * percent - 2;
            return progress + "px";
        }
        return 0 + "px";
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
        /** @type {?} */
        var height = window.innerHeight - this.gridHeight;
        return { height: this.activityHeight, width: width };
    };
    /**
     * @param {?} ganttActions
     * @param {?} ganttGridElem
     * @return {?}
     */
    GanttService.prototype.calculateGanttActivityWidth = /**
     * @param {?} ganttActions
     * @param {?} ganttGridElem
     * @return {?}
     */
    function (ganttActions, ganttGridElem) {
        return ganttActions.offsetWidth - ganttGridElem.offsetWidth + "px";
    };
    /**
     * @param {?} ganttGridElem
     * @return {?}
     */
    GanttService.prototype.calculateGanttActivityHeight = /**
     * @param {?} ganttGridElem
     * @return {?}
     */
    function (ganttGridElem) {
        return ganttGridElem.offsetHeight + "px";
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
     * @return {?}
     */
    GanttService.prototype.doTaskCheck = /**
     * Checks whether any new data needs to be added to task cache
     * @param {?} tasks
     * @return {?}
     */
    function (tasks) {
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
        return false;
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
    /**
     * @type {?}
     * @private
     */
    GanttService.prototype.barStyles;
    /** @type {?} */
    GanttService.prototype.TASK_CACHE;
    /** @type {?} */
    GanttService.prototype.TIME_SCALE;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZ2FudHQvIiwic291cmNlcyI6WyJsaWIvc2hhcmVkL3NlcnZpY2VzL2dhbnR0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBR3JEO0lBdUJJO1FBckJPLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxrQkFBYSxHQUFHLEVBQUUsQ0FBQyxDQUFDLG9EQUFvRDs7UUFDeEUsbUJBQWMsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN6QyxjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QscUJBQWdCLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQixXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsY0FBUyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEtBQUs7O1FBQ3RCLGVBQVUsR0FBRyxHQUFHLENBQUM7UUFDaEIsY0FBUyxHQUFnQjtZQUM3QixFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLGtCQUFrQixFQUFFLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUU7WUFDL0gsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLG1CQUFtQixFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRTtZQUNsSCxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsdUJBQXVCLEVBQUUs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SUFBSTtRQUVKLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBRXhCLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxvRkFBb0Y7Ozs7OztJQUM3RSxrQ0FBVzs7Ozs7SUFBbEIsVUFBbUIsRUFBVTtRQUN6QixPQUFPLE1BQUksRUFBSSxDQUFDO0lBQ3BCLENBQUM7SUFFRCx3REFBd0Q7SUFDeEQsOENBQThDO0lBQzlDLDZDQUE2QztJQUM3QyxJQUFJO0lBRUosMERBQTBEOzs7Ozs7Ozs7OztJQUNuRCxtQ0FBWTs7Ozs7Ozs7Ozs7SUFBbkIsVUFBb0IsU0FBaUIsRUFBRSxPQUFZO1FBQy9DLElBQUksT0FBTyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQzNDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1NBQ2pDO0lBQ0wsQ0FBQzs7Z0JBNVRKLFVBQVU7Ozs7SUE2VFgsbUJBQUM7Q0FBQSxBQTdURCxJQTZUQztTQTVUWSxZQUFZOzs7SUFDckIsaUNBQXFCOztJQUNyQixxQ0FBMEI7O0lBQzFCLHNDQUFnRDs7SUFDaEQsaUNBQXFCOztJQUNyQix3Q0FBNEI7O0lBQzVCLHNDQUEwQjs7SUFDMUIsaUNBQXFCOztJQUNyQixxQ0FBeUI7O0lBQ3pCLDhCQUFrQjs7SUFDbEIsbUNBQTJCOztJQUMzQixpQ0FBdUI7O0lBQ3ZCLGtDQUF3Qjs7Ozs7SUFDeEIsaUNBS0U7O0lBQ0Ysa0NBQXlCOztJQUN6QixrQ0FBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEdhbnR0Q29uZmlnIH0gZnJvbSAnLi9nYW50dC1jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IElCYXJTdHlsZSwgVGFzaywgSVNjYWxlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBHYW50dFNlcnZpY2Uge1xyXG4gICAgcHVibGljIHJvd0hlaWdodCA9IDA7XHJcbiAgICBwdWJsaWMgaG91ckNlbGxXaWR0aCA9IDYwOyAvLyBjaGFuZ2UgdG8gNjAgc28gbWludXRlcyBjYW4gYmVlbiBzZWVuIG1vcmUgZWFzaWx5XHJcbiAgICBwdWJsaWMgaG91cnNDZWxsV2lkdGggPSB0aGlzLmhvdXJDZWxsV2lkdGggKiAyNTtcclxuICAgIHB1YmxpYyBjZWxsV2lkdGggPSAwO1xyXG4gICAgcHVibGljIHdpbmRvd0lubmVyV2lkdGggPSAwO1xyXG4gICAgcHVibGljIGFjdGl2aXR5SGVpZ2h0ID0gMDtcclxuICAgIHB1YmxpYyBiYXJIZWlnaHQgPSAwO1xyXG4gICAgcHVibGljIGJhckxpbmVIZWlnaHQgPSAwO1xyXG4gICAgcHVibGljIGJhclRvcCA9IDA7XHJcbiAgICBwdWJsaWMgYmFyTW92ZWFibGUgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBncmlkV2lkdGggPSA1NDI7IC8vMTg4XHJcbiAgICBwdWJsaWMgZ3JpZEhlaWdodCA9IDMzMjtcclxuICAgIHByaXZhdGUgYmFyU3R5bGVzOiBJQmFyU3R5bGVbXSA9IFtcclxuICAgICAgICB7IHN0YXR1czogXCJpbmZvcm1hdGlvblwiLCBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiKDE4LDE5NSwgMjQ0KVwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICMyMTk2RjNcIiwgcHJvZ3Jlc3NCYWNrZ3JvdW5kQ29sb3I6IFwiIzIxOTZGM1wiIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IFwid2FybmluZ1wiLCBiYWNrZ3JvdW5kQ29sb3I6IFwiI0ZGQTcyNlwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICNFRjZDMDBcIiwgcHJvZ3Jlc3NCYWNrZ3JvdW5kQ29sb3I6IFwiI0VGNkMwMFwiIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IFwiZXJyb3JcIiwgYmFja2dyb3VuZENvbG9yOiBcIiNFRjUzNTBcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCAjQzYyODI4XCIsIHByb2dyZXNzQmFja2dyb3VuZENvbG9yOiBcIiNDNjI4MjhcIiB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiBcImNvbXBsZXRlZFwiLCBiYWNrZ3JvdW5kQ29sb3I6IFwiIzY2QkI2QVwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICMyRTdEMzJcIiwgcHJvZ3Jlc3NCYWNrZ3JvdW5kQ29sb3I6IFwiIzJFN0QzMlwiIH1cclxuICAgIF07XHJcbiAgICBwdWJsaWMgVEFTS19DQUNIRTogYW55W107XHJcbiAgICBwdWJsaWMgVElNRV9TQ0FMRTogYW55W107XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgY29uc3QgZ2FudHRDb25maWcgPSBuZXcgR2FudHRDb25maWcoKTtcclxuXHJcbiAgICAgICAgdGhpcy5yb3dIZWlnaHQgPSBnYW50dENvbmZpZy5yb3dIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5jZWxsV2lkdGggPSBnYW50dENvbmZpZy5jZWxsV2lkdGg7XHJcbiAgICAgICAgdGhpcy5hY3Rpdml0eUhlaWdodCA9IGdhbnR0Q29uZmlnLmFjdGl2aXR5SGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuYmFySGVpZ2h0ID0gZ2FudHRDb25maWcuYmFySGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuYmFyTGluZUhlaWdodCA9IGdhbnR0Q29uZmlnLmJhckxpbmVIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5iYXJUb3AgPSBnYW50dENvbmZpZy5yb3dIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5iYXJNb3ZlYWJsZSA9IGdhbnR0Q29uZmlnLmJhck1vdmVhYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlQmFyV2lkdGgoc3RhcnQ6IERhdGUsIGVuZDogRGF0ZSk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzdGFydCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgc3RhcnQgPSBuZXcgRGF0ZShzdGFydCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGVuZCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgZW5kID0gbmV3IERhdGUoZW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGRheXMgPSB0aGlzLmNhbGN1bGF0ZURpZmZEYXlzKHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgIGNvbnN0IHdpZHRoOiBudW1iZXIgPSAoZGF5cyAvIDcgKiB0aGlzLmNlbGxXaWR0aCArIGRheXMgLyA3KTtcclxuICAgICAgICByZXR1cm4gd2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVCYXJMZWZ0KHN0YXJ0OiBEYXRlLCBzY2FsZTogYW55W10pOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBsZWZ0ID0gMDtcclxuXHJcbiAgICAgICAgaWYgKHN0YXJ0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdGFydCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzY2FsZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKChzdGFydC5nZXRUaW1lKCkgPj0gc2NhbGVbaV0uZ2V0VGltZSgpICYmIHN0YXJ0LmdldFRpbWUoKSA8IHNjYWxlW2kgKyAxXS5nZXRUaW1lKCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IGkgKiB0aGlzLmNlbGxXaWR0aCArIGkgKyB0aGlzLmNhbGN1bGF0ZUJhckxlZnREZWx0YShzdGFydCkgKyAoKDcgLyAoc2NhbGVbaSArIDFdLmdldERhdGUoKSAtIHN0YXJ0LmdldERhdGUoKSkgLyA3KSAqIHRoaXMuY2VsbFdpZHRoKSAtIHRoaXMuY2VsbFdpZHRoIC8gNztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGVmdDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlcyB0aGUgaGVpZ2h0IG9mIHRoZSBnYW50dCBncmlkLCBhY3Rpdml0eSBhbmQgdmVydGljYWwgc2Nyb2xsICovXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlR2FudHRIZWlnaHQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gYCR7dGhpcy5UQVNLX0NBQ0hFLmxlbmd0aCAqIHRoaXMucm93SGVpZ2h0fXB4YDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZUJhckxlZnREZWx0YShzdGFydDogRGF0ZSk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IG9mZnNldCA9IDA7XHJcbiAgICAgICAgY29uc3QgaG91cnNJbkRheSA9IDI0O1xyXG4gICAgICAgIGNvbnN0IG1pbnV0ZXNJbkhvdXIgPSA2MDtcclxuICAgICAgICBjb25zdCBzZWNvbmRzSW5Ib3VyID0gMzYwMDtcclxuICAgICAgICBjb25zdCBzdGFydEhvdXJzOiBudW1iZXIgPVxyXG4gICAgICAgICAgICBzdGFydC5nZXRIb3VycygpICsgc3RhcnQuZ2V0TWludXRlcygpIC8gbWludXRlc0luSG91ciArIHN0YXJ0LmdldFNlY29uZHMoKSAvIHNlY29uZHNJbkhvdXI7XHJcblxyXG4gICAgICAgIG9mZnNldCA9IHRoaXMuY2VsbFdpZHRoIC8gaG91cnNJbkRheSAqIHN0YXJ0SG91cnM7XHJcbiAgICAgICAgcmV0dXJuIG9mZnNldDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlIHRoZSBiYXIgc3R5bGVzICovXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlQmFyKHRhc2s6IGFueSwgaW5kZXg6IG51bWJlciwgc2NhbGU6IGFueSkge1xyXG4gICAgICAgIGNvbnN0IGJhclN0eWxlID0gdGhpcy5nZXRCYXJTdHlsZSh0YXNrLnN0YXR1cyk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ3RvcCc6IHRoaXMuYmFyVG9wICogaW5kZXggKyAyICsgJ3B4JyxcclxuICAgICAgICAgICAgJ2xlZnQnOiB0aGlzLmNhbGN1bGF0ZUJhckxlZnQodGFzay5zdGFydCwgc2NhbGUpICsgJ3B4JyxcclxuICAgICAgICAgICAgJ2hlaWdodCc6IHRoaXMuYmFySGVpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogdGhpcy5iYXJMaW5lSGVpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgJ3dpZHRoJzogdGhpcy5jYWxjdWxhdGVCYXJXaWR0aCh0YXNrLnN0YXJ0LCB0YXNrLmVuZCkgKyAncHgnLFxyXG4gICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IGJhclN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSxcclxuICAgICAgICAgICAgJ2JvcmRlcic6IGJhclN0eWxlW1wiYm9yZGVyXCJdXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogR2V0IHRoZSBiYXIgc3R5bGUgYmFzZWQgb24gdGFzayBzdGF0dXMgKi9cclxuICAgIHByaXZhdGUgZ2V0QmFyU3R5bGUodGFza1N0YXR1czogc3RyaW5nID0gXCJcIik6IGFueSB7XHJcbiAgICAgICAgY29uc3Qgc3R5bGUgPSB7fTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGFza1N0YXR1cyA9IHRhc2tTdGF0dXMudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgdGFza1N0YXR1cyA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzd2l0Y2ggKHRhc2tTdGF0dXMpIHtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSA9IFwicmdiKDE4LDE5NSwgMjQ0KVwiO1xyXG4gICAgICAgICAgICAgICAgc3R5bGVbXCJib3JkZXJcIl0gPSBcIjFweCBzb2xpZCAjMjE5NkYzXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogR2V0IHRoZSBwcm9ncmVzc3MgYmFyIGJhY2tncm91bmQgY29sb3VyIGJhc2VkIG9uIHRhc2sgc3RhdHVzICovXHJcbiAgICBwdWJsaWMgZ2V0QmFyUHJvZ3Jlc3NTdHlsZSh0YXNrU3RhdHVzOiBzdHJpbmcgPSBcIlwiKTogYW55IHtcclxuICAgICAgICBjb25zdCBzdHlsZSA9IHt9O1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0YXNrU3RhdHVzID0gdGFza1N0YXR1cy50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICB0YXNrU3RhdHVzID0gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN3aXRjaCAodGFza1N0YXR1cykge1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gdGhpcy5iYXJTdHlsZXNbMF0ucHJvZ3Jlc3NCYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlcyB0aGUgYmFyIHByb2dyZXNzIHdpZHRoIGluIHBpeGVscyBnaXZlbiB0YXNrIHBlcmNlbnQgY29tcGxldGUgKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVCYXJQcm9ncmVzcyh3aWR0aDogbnVtYmVyLCBwZXJjZW50OiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0eXBlb2YgcGVyY2VudCA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICBpZiAocGVyY2VudCA+IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgcGVyY2VudCA9IDEwMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBwcm9ncmVzczogbnVtYmVyID0gKHdpZHRoIC8gMTAwKSAqIHBlcmNlbnQgLSAyO1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7cHJvZ3Jlc3N9cHhgO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYCR7MH1weGA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENhbGN1bGF0ZXMgdGhlIGRpZmZlcmVuY2UgaW4gdHdvIGRhdGVzIGFuZCByZXR1cm5zIG51bWJlciBvZiBkYXlzICovXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlRGlmZkRheXMoc3RhcnQ6IERhdGUsIGVuZDogRGF0ZSk6IG51bWJlciB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3Qgb25lRGF5ID0gMjQgKiA2MCAqIDYwICogMTAwMDsgLy8gaG91cnMqbWludXRlcypzZWNvbmRzKm1pbGxpc2Vjb25kcyAvbXNcclxuICAgICAgICAgICAgY29uc3QgZGlmZkRheXMgPSBNYXRoLmFicygoc3RhcnQuZ2V0VGltZSgpIC0gZW5kLmdldFRpbWUoKSkgLyAob25lRGF5KSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRheXMgPSBkaWZmRGF5czsgLy8gZG9uJ3QgdXNlIE1hdGgucm91bmQgYXMgaXQgd2lsbCBkcmF3IGFuIGluY29ycmVjdCBiYXJcclxuICAgICAgICAgICAgcmV0dXJuIGRheXM7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlIHRoZSBnYW50dCBzY2FsZSByYW5nZSBnaXZlbiB0aGUgc3RhcnQgYW5kIGVuZCBkYXRlIG9mIHRhc2tzKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVTY2FsZShzdGFydDogRGF0ZSA9IG5ldyBEYXRlKCksIGVuZDogRGF0ZSA9IHRoaXMuYWRkRGF5cyhzdGFydCwgNykpIHtcclxuICAgICAgICBjb25zdCBzY2FsZTogYW55W10gPSBbXTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB3aGlsZSAoc3RhcnQuZ2V0VGltZSgpIDw9IGVuZC5nZXRUaW1lKCkpIHtcclxuICAgICAgICAgICAgICAgIHNjYWxlLnB1c2goc3RhcnQpO1xyXG4gICAgICAgICAgICAgICAgc3RhcnQgPSB0aGlzLmFkZERheXMoc3RhcnQsIDcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzY2FsZTtcclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzY2FsZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIERldGVybWluZXMgd2hldGhlciBnaXZlbiBkYXRlIGlzIGEgd2Vla2VuZCAqL1xyXG4gICAgcHVibGljIGlzRGF5V2Vla2VuZChkYXRlOiBEYXRlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgZGF5ID0gZGF0ZS5nZXREYXkoKTtcclxuICAgICAgICBpZiAoZGF5ID09PSA2IHx8IGRheSA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBBZGQgeCBudW1iZXIgb2YgZGF5cyB0byBhIGRhdGUgb2JqZWN0ICovXHJcbiAgICBwdWJsaWMgYWRkRGF5cyhkYXRlOiBEYXRlLCBkYXlzOiBudW1iZXIpOiBEYXRlIHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgRGF0ZShkYXRlKTtcclxuICAgICAgICByZXN1bHQuc2V0RGF0ZShyZXN1bHQuZ2V0RGF0ZSgpICsgZGF5cyk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvLyoqIFJlbW92ZSB4IG51bWJlciBvZiBkYXlzIGZyb20gYSBkYXRlIG9iamVjdCAqL1xyXG4gICAgcHVibGljIHJlbW92ZURheXMoZGF0ZTogRGF0ZSwgZGF5czogbnVtYmVyKTogRGF0ZSB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGUoZGF0ZSk7XHJcbiAgICAgICAgcmVzdWx0LnNldERhdGUocmVzdWx0LmdldERhdGUoKSAtIGRheXMpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENhbGN1bGF0ZXMgdGhlIGdyaWQgc2NhbGUgZm9yIGdhbnR0IGJhc2VkIG9uIHRhc2tzIHN0YXJ0IGFuZCBlbmQgZGF0ZXMgKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVHcmlkU2NhbGUodGFza3M6IFRhc2tbXSk6IElTY2FsZSB7XHJcbiAgICAgICAgbGV0IHN0YXJ0OiBEYXRlO1xyXG4gICAgICAgIGxldCBlbmQ6IERhdGU7XHJcbiAgICAgICAgY29uc3QgZGF0ZXMgPSB0YXNrcy5tYXAoKHRhc2s6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgc3RhcnQ6IG5ldyBEYXRlKHRhc2suc3RhcnQpLFxyXG4gICAgICAgICAgICAgICAgZW5kOiBuZXcgRGF0ZSh0YXNrLmVuZClcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc3RhcnQgPSBuZXcgRGF0ZShNYXRoLm1pbi5hcHBseShudWxsLCBkYXRlcy5tYXAoKHQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHQuc3RhcnQ7XHJcbiAgICAgICAgfSkpKTtcclxuXHJcbiAgICAgICAgZW5kID0gbmV3IERhdGUoTWF0aC5tYXguYXBwbHkobnVsbCwgZGF0ZXMubWFwKCh0KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0LmVuZDtcclxuICAgICAgICB9KSkpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzdGFydDogc3RhcnQsXHJcbiAgICAgICAgICAgIGVuZDogZW5kXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50OiBhbnksIGF0dHJpYnV0ZTogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudClbYXR0cmlidXRlXSwgMTApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETyhkYWxlKTogZGV0ZXJtaW5lIHdoZXRoZXIgdGhpcyBpcyBuZWVkZWRcclxuICAgIHB1YmxpYyBjYWxjdWxhdGVDb250YWluZXJXaWR0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIHRoaXMud2luZG93SW5uZXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lcldpZHRoID0gdGhpcy5ncmlkV2lkdGggLSAxODtcclxuICAgICAgICByZXR1cm4gY29udGFpbmVyV2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbGN1bGF0ZUNvbnRhaW5lckhlaWdodCgpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckhlaWdodCA9IChpbm5lckhlaWdodCAtIDE4KTtcclxuICAgICAgICByZXR1cm4gY29udGFpbmVySGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVBY3Rpdml0eUNvbnRhaW5lckRpbWVuc2lvbnMoKTogYW55IHtcclxuICAgICAgICBjb25zdCBzY3JvbGxXaWR0aCA9IDE4O1xyXG4gICAgICAgIHRoaXMud2luZG93SW5uZXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgIGNvbnN0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGggLSB0aGlzLmdyaWRXaWR0aCAtIHNjcm9sbFdpZHRoO1xyXG5cclxuICAgICAgICBjb25zdCBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSB0aGlzLmdyaWRIZWlnaHQ7XHJcblxyXG4gICAgICAgIHJldHVybiB7IGhlaWdodDogdGhpcy5hY3Rpdml0eUhlaWdodCwgd2lkdGg6IHdpZHRoIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbGN1bGF0ZUdhbnR0QWN0aXZpdHlXaWR0aChnYW50dEFjdGlvbnM6IEhUTUxFbGVtZW50LCBnYW50dEdyaWRFbGVtOiBIVE1MRWxlbWVudCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIGAke2dhbnR0QWN0aW9ucy5vZmZzZXRXaWR0aCAtIGdhbnR0R3JpZEVsZW0ub2Zmc2V0V2lkdGh9cHhgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVHYW50dEFjdGl2aXR5SGVpZ2h0KGdhbnR0R3JpZEVsZW06IEhUTUxFbGVtZW50KTogYW55IHtcclxuICAgICAgICByZXR1cm4gYCR7Z2FudHRHcmlkRWxlbS5vZmZzZXRIZWlnaHR9cHhgO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBTZXQgdGhlIHZlcnRpY2FsIHNjcm9sbCB0b3AgcG9zaXRpb25zIGZvciBnYW50dCAqL1xyXG4gICAgcHVibGljIHNjcm9sbFRvcCh2ZXJ0aWNhbFNjcm9sbEVsZW06IGFueSwgZ2FudHRHcmlkRWxlbTogYW55LCBnYW50dEFjdGl2aXR5QXJlYUVsZW06IGFueSkge1xyXG4gICAgICAgIGNvbnN0IHZlcnRpY2FsU2Nyb2xsVG9wID0gdmVydGljYWxTY3JvbGxFbGVtLnNjcm9sbFRvcDtcclxuICAgICAgICBjb25zdCBzY3JvbGwgPSB0aGlzLnNldFNjcm9sbFRvcDtcclxuXHJcbiAgICAgICAgLy8gZGVib3VuY2VcclxuICAgICAgICBpZiAodmVydGljYWxTY3JvbGxUb3AgIT09IG51bGwgJiYgdmVydGljYWxTY3JvbGxUb3AgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBzY3JvbGwodmVydGljYWxTY3JvbGxUb3AsIGdhbnR0QWN0aXZpdHlBcmVhRWxlbSk7XHJcbiAgICAgICAgICAgIHNjcm9sbChnYW50dEFjdGl2aXR5QXJlYUVsZW0uc2Nyb2xsVG9wLCBnYW50dEdyaWRFbGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEdyb3VwIGRhdGEgYnkgaWQgLCBvbmx5IHN1cHBvcnRzIG9uZSBsZXZlbCovXHJcbiAgICBwdWJsaWMgZ3JvdXBEYXRhKHRhc2tzOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0YXNrcztcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2hlY2tzIHdoZXRoZXIgYW55IG5ldyBkYXRhIG5lZWRzIHRvIGJlIGFkZGVkIHRvIHRhc2sgY2FjaGUgICovXHJcbiAgICBwdWJsaWMgZG9UYXNrQ2hlY2sodGFza3M6IGFueVtdKTogYm9vbGVhbiB7XHJcbiAgICAgICAgLy8gY29uc3QgY2FjaGVkVGFza0lkcyA9IHRoaXMuVEFTS19DQUNIRS5tYXAoKHRhc2s6IGFueSkgPT4geyByZXR1cm4gdGFzay5pZCB9KTtcclxuICAgICAgICAvLyBjb25zdCBpdGVtc1RvQ2FjaGU6IGFueVtdID0gW107XHJcblxyXG4gICAgICAgIC8vIG9ubHkgbG9vayBhdCB0YXNrcyB0aGF0IGFyZSBub3QgY2FjaGVkXHJcbiAgICAgICAgLy8gdGFza3MuZmlsdGVyKCh0YXNrOiBhbnkpID0+IHtcclxuICAgICAgICAvLyAgICAgcmV0dXJuIGNhY2hlZFRhc2tJZHMuaW5kZXhPZih0YXNrLmlkKSA9PT0gLTE7XHJcbiAgICAgICAgLy8gfSkuZm9yRWFjaCgodGFzazogYW55KSA9PiB7XHJcbiAgICAgICAgLy8gICAgIGl0ZW1zVG9DYWNoZS5wdXNoKHRhc2spO1xyXG4gICAgICAgIC8vIH0pO1xyXG5cclxuICAgICAgICAvLyBpdGVtc1RvQ2FjaGUuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuVEFTS19DQUNIRS5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIC8vIH0pO1xyXG5cclxuICAgICAgICAvLyBpZiAoaXRlbXNUb0NhY2hlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAvLyAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICB0aGlzLlRBU0tfQ0FDSEUgPSB0YXNrcztcclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBTZXQgYSBpZCBwcmVmaXggc28gQ1NTMyBxdWVyeSBzZWxlY3RvciBjYW4gd29yayB3aXRoIGlkcyB0aGF0IGNvbnRhaW4gbnVtYmVycyAqL1xyXG4gICAgcHVibGljIHNldElkUHJlZml4KGlkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBgXyR7aWR9YDtcclxuICAgIH1cclxuXHJcbiAgICAvLyAvKiogUmVtb3ZlIHRoZSBpZCBwcmVmaXggdG8gYWxsb3cgcXVlcnlpbmcgb2YgZGF0YSAqL1xyXG4gICAgLy8gcHVibGljIHJlbW92ZUlkUHJlZml4KGlkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgLy8gICAgIHJldHVybiBpZC5zdWJzdHJpbmcoMSwgaWQubGVuZ3RoIC0gMSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLyoqIFNldCB0aGUgc2Nyb2xsIHRvcCBwcm9wZXJ0eSBvZiBhIG5hdGl2ZSBET00gZWxlbWVudCAqL1xyXG4gICAgcHVibGljIHNldFNjcm9sbFRvcChzY3JvbGxUb3A6IG51bWJlciwgZWxlbWVudDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQgIT09IG51bGwgJiYgZWxlbWVudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=