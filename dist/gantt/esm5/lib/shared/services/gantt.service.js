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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZ2FudHQvIiwic291cmNlcyI6WyJsaWIvc2hhcmVkL3NlcnZpY2VzL2dhbnR0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBR3JEO0lBaUJJO1FBZk8sY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLGtCQUFhLEdBQUcsRUFBRSxDQUFDLENBQUMsb0RBQW9EOztRQUN4RSxtQkFBYyxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3pDLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxxQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFDckIsbUJBQWMsR0FBRyxDQUFDLENBQUM7UUFDbkIsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLFdBQU0sR0FBRyxDQUFDLENBQUM7UUFDWCxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixjQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSzs7UUFDcEIsZUFBVSxHQUFHLEdBQUcsQ0FBQzs7WUFLZCxXQUFXLEdBQUcsSUFBSSxXQUFXLEVBQUU7UUFFckMsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQztRQUN2QyxJQUFJLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQyxjQUFjLENBQUM7UUFDakQsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQztRQUMvQyxJQUFJLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUM7UUFDcEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDO0lBQy9DLENBQUM7Ozs7Ozs7SUFFTyx3Q0FBaUI7Ozs7OztJQUF6QixVQUEwQixLQUFXLEVBQUUsR0FBUztRQUM1QyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUMzQixLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDM0I7UUFFRCxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtZQUN6QixHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdkI7O1lBRUssSUFBSSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDOztZQUN6QyxLQUFLLEdBQVcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUM1RCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDOzs7Ozs7O0lBRU8sdUNBQWdCOzs7Ozs7SUFBeEIsVUFBeUIsS0FBVyxFQUFFLEtBQVk7O1lBQzFDLElBQUksR0FBRyxDQUFDO1FBRVosSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO1lBQ2YsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7Z0JBQzNCLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO2FBQ3RCO1lBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUU7b0JBRXJGLElBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztvQkFDakssTUFBTTtpQkFDVDthQUNKO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsNEVBQTRFOzs7OztJQUNyRSwyQ0FBb0I7Ozs7SUFBM0I7UUFDSSxPQUFVLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLE9BQUksQ0FBQztJQUMxRCxDQUFDOzs7Ozs7SUFFTyw0Q0FBcUI7Ozs7O0lBQTdCLFVBQThCLEtBQVc7O1lBQ2pDLE1BQU0sR0FBRyxDQUFDOztZQUNSLFVBQVUsR0FBRyxFQUFFOztZQUNmLGFBQWEsR0FBRyxFQUFFOztZQUNsQixhQUFhLEdBQUcsSUFBSTs7WUFDcEIsVUFBVSxHQUNaLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxLQUFLLENBQUMsVUFBVSxFQUFFLEdBQUcsYUFBYSxHQUFHLEtBQUssQ0FBQyxVQUFVLEVBQUUsR0FBRyxhQUFhO1FBRTlGLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDbEQsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVELCtCQUErQjs7Ozs7Ozs7SUFDeEIsbUNBQVk7Ozs7Ozs7SUFBbkIsVUFBb0IsSUFBUyxFQUFFLEtBQWEsRUFBRSxLQUFVOztZQUM5QyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzdDLE9BQU87WUFDSCxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLEdBQUcsQ0FBQyxHQUFHLElBQUk7WUFDckMsTUFBTSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxHQUFHLElBQUk7WUFDdkQsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSTtZQUMvQixhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJO1lBQ3hDLE9BQU8sRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSTtZQUM1RCxrQkFBa0IsRUFBRSxRQUFRLENBQUMsa0JBQWtCLENBQUM7WUFDaEQsYUFBYSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUM7U0FDekMsQ0FBQztJQUNOLENBQUM7SUFFRCw2Q0FBNkM7Ozs7Ozs7SUFDckMsa0NBQVc7Ozs7OztJQUFuQixVQUFvQixLQUFVOztZQUNwQixLQUFLLEdBQUcsRUFBRTtRQUNoQixLQUFLLENBQUMsa0JBQWtCLENBQUMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQzVDLEtBQUssQ0FBQyxhQUFhLENBQUMsR0FBRyxlQUFhLEtBQUssQ0FBQyxPQUFTLENBQUM7UUFFcEQsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELHdFQUF3RTs7Ozs7OztJQUNqRSx3Q0FBaUI7Ozs7OztJQUF4QixVQUF5QixLQUFXLEVBQUUsR0FBUztRQUMzQyxJQUFJOztnQkFDTSxNQUFNLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSTs7O2dCQUM1QixRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztnQkFDakUsSUFBSSxHQUFHLFFBQVE7WUFDckIsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1YsT0FBTyxDQUFDLENBQUM7U0FDWjtJQUNMLENBQUM7SUFFRCwyRUFBMkU7Ozs7Ozs7SUFDcEUscUNBQWM7Ozs7OztJQUFyQixVQUFzQixLQUF3QixFQUFFLEdBQWtDO1FBQTVELHNCQUFBLEVBQUEsWUFBa0IsSUFBSSxFQUFFO1FBQUUsb0JBQUEsRUFBQSxNQUFZLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQzs7WUFDeEUsS0FBSyxHQUFVLEVBQUU7UUFDdkIsSUFBSTtZQUNBLE9BQU8sS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEIsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ2xDO1lBQ0QsT0FBTyxLQUFLLENBQUM7U0FFaEI7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNWLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO0lBQ0wsQ0FBQztJQUVELGlEQUFpRDs7Ozs7O0lBQzFDLG1DQUFZOzs7OztJQUFuQixVQUFvQixJQUFVOztZQUNwQixHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUN6QixJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRTtZQUN4QixPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELDRDQUE0Qzs7Ozs7OztJQUNyQyw4QkFBTzs7Ozs7O0lBQWQsVUFBZSxJQUFVLEVBQUUsSUFBWTs7WUFDN0IsTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQztRQUM3QixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUN4QyxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsa0RBQWtEOzs7Ozs7O0lBQzNDLGlDQUFVOzs7Ozs7O0lBQWpCLFVBQWtCLElBQVUsRUFBRSxJQUFZOztZQUNoQyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCw2RUFBNkU7Ozs7OztJQUN0RSx5Q0FBa0I7Ozs7O0lBQXpCLFVBQTBCLEtBQWE7O1lBQy9CLEtBQVc7O1lBQ1gsR0FBUzs7WUFDUCxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQVM7WUFDOUIsT0FBTztnQkFDSCxLQUFLLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDM0IsR0FBRyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7YUFDMUIsQ0FBQztRQUNOLENBQUMsQ0FBQztRQUVGLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUM7WUFDOUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVMLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUM7WUFDNUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVMLE9BQU87WUFDSCxLQUFLLEVBQUUsS0FBSztZQUNaLEdBQUcsRUFBRSxHQUFHO1NBQ1gsQ0FBQztJQUNOLENBQUM7Ozs7OztJQUVNLHVDQUFnQjs7Ozs7SUFBdkIsVUFBd0IsT0FBWSxFQUFFLFNBQWM7UUFDaEQsT0FBTyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRUQsOENBQThDOzs7OztJQUN2Qyw4Q0FBdUI7Ozs7O0lBQTlCO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7O1lBQ3BDLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUU7UUFDMUMsT0FBTyxjQUFjLENBQUM7SUFDMUIsQ0FBQzs7OztJQUVNLCtDQUF3Qjs7O0lBQS9COztZQUNVLGVBQWUsR0FBRyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDMUMsT0FBTyxlQUFlLENBQUM7SUFDM0IsQ0FBQzs7OztJQUVNLDJEQUFvQzs7O0lBQTNDOztZQUNVLFdBQVcsR0FBRyxFQUFFO1FBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDOztZQUNwQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLFdBQVc7O1lBRXhELE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVO1FBRW5ELE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUM7SUFDekQsQ0FBQzs7Ozs7O0lBRU0sa0RBQTJCOzs7OztJQUFsQyxVQUFtQyxZQUF5QixFQUFFLGFBQTBCO1FBQ3BGLE9BQVUsWUFBWSxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUMsV0FBVyxPQUFJLENBQUM7SUFDdkUsQ0FBQzs7Ozs7SUFFTSxtREFBNEI7Ozs7SUFBbkMsVUFBb0MsYUFBMEI7UUFDMUQsT0FBVSxhQUFhLENBQUMsWUFBWSxPQUFJLENBQUM7SUFDN0MsQ0FBQztJQUVELHNEQUFzRDs7Ozs7Ozs7SUFDL0MsZ0NBQVM7Ozs7Ozs7SUFBaEIsVUFBaUIsa0JBQXVCLEVBQUUsYUFBa0IsRUFBRSxxQkFBMEI7O1lBQzlFLGlCQUFpQixHQUFHLGtCQUFrQixDQUFDLFNBQVM7O1lBQ2hELE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWTtRQUVoQyxXQUFXO1FBQ1gsSUFBSSxpQkFBaUIsS0FBSyxJQUFJLElBQUksaUJBQWlCLEtBQUssU0FBUyxFQUFFO1lBQy9ELE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1lBQ2pELE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUM7U0FDMUQ7SUFDTCxDQUFDO0lBRUQsZ0RBQWdEOzs7Ozs7SUFDekMsZ0NBQVM7Ozs7O0lBQWhCLFVBQWlCLEtBQVU7UUFDdkIsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELG1FQUFtRTs7Ozs7OztJQUM1RCxrQ0FBVzs7Ozs7O0lBQWxCLFVBQW1CLEtBQVksRUFBRSxLQUFVO1FBQ3ZDLGdGQUFnRjtRQUNoRixrQ0FBa0M7UUFFbEMseUNBQXlDO1FBQ3pDLGdDQUFnQztRQUNoQyxvREFBb0Q7UUFDcEQsOEJBQThCO1FBQzlCLCtCQUErQjtRQUMvQixNQUFNO1FBRU4sd0NBQXdDO1FBQ3hDLGtDQUFrQztRQUNsQyxNQUFNO1FBRU4saUNBQWlDO1FBQ2pDLG1CQUFtQjtRQUNuQixJQUFJO1FBRUosSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFFeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTlELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxvRkFBb0Y7Ozs7OztJQUM3RSxrQ0FBVzs7Ozs7SUFBbEIsVUFBbUIsRUFBVTtRQUN6QixPQUFPLE1BQUksRUFBSSxDQUFDO0lBQ3BCLENBQUM7SUFFRCx3REFBd0Q7SUFDeEQsOENBQThDO0lBQzlDLDZDQUE2QztJQUM3QyxJQUFJO0lBRUosMERBQTBEOzs7Ozs7Ozs7OztJQUNuRCxtQ0FBWTs7Ozs7Ozs7Ozs7SUFBbkIsVUFBb0IsU0FBaUIsRUFBRSxPQUFZO1FBQy9DLElBQUksT0FBTyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQzNDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1NBQ2pDO0lBQ0wsQ0FBQzs7Z0JBOVFKLFVBQVU7Ozs7SUErUVgsbUJBQUM7Q0FBQSxBQS9RRCxJQStRQztTQTlRWSxZQUFZOzs7SUFDckIsaUNBQXFCOztJQUNyQixxQ0FBMEI7O0lBQzFCLHNDQUFnRDs7SUFDaEQsaUNBQXFCOztJQUNyQix3Q0FBNEI7O0lBQzVCLHNDQUEwQjs7SUFDMUIsaUNBQXFCOztJQUNyQixxQ0FBeUI7O0lBQ3pCLDhCQUFrQjs7SUFDbEIsbUNBQTJCOztJQUMzQixpQ0FBcUI7O0lBQ3JCLGtDQUF3Qjs7SUFDeEIsa0NBQXlCOztJQUN6QixrQ0FBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEdhbnR0Q29uZmlnIH0gZnJvbSAnLi9nYW50dC1jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IFRhc2ssIElTY2FsZSB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgR2FudHRTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyByb3dIZWlnaHQgPSAwO1xyXG4gICAgcHVibGljIGhvdXJDZWxsV2lkdGggPSA2MDsgLy8gY2hhbmdlIHRvIDYwIHNvIG1pbnV0ZXMgY2FuIGJlZW4gc2VlbiBtb3JlIGVhc2lseVxyXG4gICAgcHVibGljIGhvdXJzQ2VsbFdpZHRoID0gdGhpcy5ob3VyQ2VsbFdpZHRoICogMjU7XHJcbiAgICBwdWJsaWMgY2VsbFdpZHRoID0gMDtcclxuICAgIHB1YmxpYyB3aW5kb3dJbm5lcldpZHRoID0gMDtcclxuICAgIHB1YmxpYyBhY3Rpdml0eUhlaWdodCA9IDA7XHJcbiAgICBwdWJsaWMgYmFySGVpZ2h0ID0gMDtcclxuICAgIHB1YmxpYyBiYXJMaW5lSGVpZ2h0ID0gMDtcclxuICAgIHB1YmxpYyBiYXJUb3AgPSAwO1xyXG4gICAgcHVibGljIGJhck1vdmVhYmxlID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgZ3JpZFdpZHRoID0gMDsgLy8xODhcclxuICAgIHB1YmxpYyBncmlkSGVpZ2h0ID0gMzMyO1xyXG4gICAgcHVibGljIFRBU0tfQ0FDSEU6IGFueVtdO1xyXG4gICAgcHVibGljIFRJTUVfU0NBTEU6IGFueVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGNvbnN0IGdhbnR0Q29uZmlnID0gbmV3IEdhbnR0Q29uZmlnKCk7XHJcblxyXG4gICAgICAgIHRoaXMucm93SGVpZ2h0ID0gZ2FudHRDb25maWcucm93SGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuY2VsbFdpZHRoID0gZ2FudHRDb25maWcuY2VsbFdpZHRoO1xyXG4gICAgICAgIHRoaXMuYWN0aXZpdHlIZWlnaHQgPSBnYW50dENvbmZpZy5hY3Rpdml0eUhlaWdodDtcclxuICAgICAgICB0aGlzLmJhckhlaWdodCA9IGdhbnR0Q29uZmlnLmJhckhlaWdodDtcclxuICAgICAgICB0aGlzLmJhckxpbmVIZWlnaHQgPSBnYW50dENvbmZpZy5iYXJMaW5lSGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuYmFyVG9wID0gZ2FudHRDb25maWcucm93SGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuYmFyTW92ZWFibGUgPSBnYW50dENvbmZpZy5iYXJNb3ZlYWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZUJhcldpZHRoKHN0YXJ0OiBEYXRlLCBlbmQ6IERhdGUpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHN0YXJ0ID0gbmV3IERhdGUoc3RhcnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBlbmQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGVuZCA9IG5ldyBEYXRlKGVuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBkYXlzID0gdGhpcy5jYWxjdWxhdGVEaWZmRGF5cyhzdGFydCwgZW5kKTtcclxuICAgICAgICBjb25zdCB3aWR0aDogbnVtYmVyID0gKGRheXMgLyA3ICogdGhpcy5jZWxsV2lkdGggKyBkYXlzIC8gNyk7XHJcbiAgICAgICAgcmV0dXJuIHdpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlQmFyTGVmdChzdGFydDogRGF0ZSwgc2NhbGU6IGFueVtdKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgbGVmdCA9IDA7XHJcblxyXG4gICAgICAgIGlmIChzdGFydCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICBzdGFydCA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2NhbGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICgoc3RhcnQuZ2V0VGltZSgpID49IHNjYWxlW2ldLmdldFRpbWUoKSAmJiBzdGFydC5nZXRUaW1lKCkgPCBzY2FsZVtpICsgMV0uZ2V0VGltZSgpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQgPSBpICogdGhpcy5jZWxsV2lkdGggKyBpICsgdGhpcy5jYWxjdWxhdGVCYXJMZWZ0RGVsdGEoc3RhcnQpICsgKCg3IC8gKHNjYWxlW2kgKyAxXS5nZXREYXRlKCkgLSBzdGFydC5nZXREYXRlKCkpIC8gNykgKiB0aGlzLmNlbGxXaWR0aCkgLSB0aGlzLmNlbGxXaWR0aCAvIDc7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxlZnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENhbGN1bGF0ZXMgdGhlIGhlaWdodCBvZiB0aGUgZ2FudHQgZ3JpZCwgYWN0aXZpdHkgYW5kIHZlcnRpY2FsIHNjcm9sbCAqL1xyXG4gICAgcHVibGljIGNhbGN1bGF0ZUdhbnR0SGVpZ2h0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuVEFTS19DQUNIRS5sZW5ndGggKiB0aGlzLnJvd0hlaWdodH1weGA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVCYXJMZWZ0RGVsdGEoc3RhcnQ6IERhdGUpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBvZmZzZXQgPSAwO1xyXG4gICAgICAgIGNvbnN0IGhvdXJzSW5EYXkgPSAyNDtcclxuICAgICAgICBjb25zdCBtaW51dGVzSW5Ib3VyID0gNjA7XHJcbiAgICAgICAgY29uc3Qgc2Vjb25kc0luSG91ciA9IDM2MDA7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRIb3VyczogbnVtYmVyID1cclxuICAgICAgICAgICAgc3RhcnQuZ2V0SG91cnMoKSArIHN0YXJ0LmdldE1pbnV0ZXMoKSAvIG1pbnV0ZXNJbkhvdXIgKyBzdGFydC5nZXRTZWNvbmRzKCkgLyBzZWNvbmRzSW5Ib3VyO1xyXG5cclxuICAgICAgICBvZmZzZXQgPSB0aGlzLmNlbGxXaWR0aCAvIGhvdXJzSW5EYXkgKiBzdGFydEhvdXJzO1xyXG4gICAgICAgIHJldHVybiBvZmZzZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENhbGN1bGF0ZSB0aGUgYmFyIHN0eWxlcyAqL1xyXG4gICAgcHVibGljIGNhbGN1bGF0ZUJhcih0YXNrOiBhbnksIGluZGV4OiBudW1iZXIsIHNjYWxlOiBhbnkpIHtcclxuICAgICAgICBjb25zdCBiYXJTdHlsZSA9IHRoaXMuZ2V0QmFyU3R5bGUodGFzay5jb2xvcik7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ3RvcCc6IHRoaXMuYmFyVG9wICogaW5kZXggKyAyICsgJ3B4JyxcclxuICAgICAgICAgICAgJ2xlZnQnOiB0aGlzLmNhbGN1bGF0ZUJhckxlZnQodGFzay5zdGFydCwgc2NhbGUpICsgJ3B4JyxcclxuICAgICAgICAgICAgJ2hlaWdodCc6IHRoaXMuYmFySGVpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogdGhpcy5iYXJMaW5lSGVpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgJ3dpZHRoJzogdGhpcy5jYWxjdWxhdGVCYXJXaWR0aCh0YXNrLnN0YXJ0LCB0YXNrLmVuZCkgKyAncHgnLFxyXG4gICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IGJhclN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSxcclxuICAgICAgICAgICAgJ2JvcmRlci1sZWZ0JzogYmFyU3R5bGVbXCJib3JkZXItbGVmdFwiXVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEdldCB0aGUgYmFyIHN0eWxlIGJhc2VkIG9uIHRhc2sgc3RhdHVzICovXHJcbiAgICBwcml2YXRlIGdldEJhclN0eWxlKGNvbG9yOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIGNvbnN0IHN0eWxlID0ge307XHJcbiAgICAgICAgc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gY29sb3Iuc2Vjb25kYXJ5O1xyXG4gICAgICAgIHN0eWxlW1wiYm9yZGVyLWxlZnRcIl0gPSBgNXB4IHNvbGlkICR7Y29sb3IucHJpbWFyeX1gO1xyXG5cclxuICAgICAgICByZXR1cm4gc3R5bGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENhbGN1bGF0ZXMgdGhlIGRpZmZlcmVuY2UgaW4gdHdvIGRhdGVzIGFuZCByZXR1cm5zIG51bWJlciBvZiBkYXlzICovXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlRGlmZkRheXMoc3RhcnQ6IERhdGUsIGVuZDogRGF0ZSk6IG51bWJlciB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3Qgb25lRGF5ID0gMjQgKiA2MCAqIDYwICogMTAwMDsgLy8gaG91cnMqbWludXRlcypzZWNvbmRzKm1pbGxpc2Vjb25kcyAvbXNcclxuICAgICAgICAgICAgY29uc3QgZGlmZkRheXMgPSBNYXRoLmFicygoc3RhcnQuZ2V0VGltZSgpIC0gZW5kLmdldFRpbWUoKSkgLyAob25lRGF5KSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRheXMgPSBkaWZmRGF5czsgLy8gZG9uJ3QgdXNlIE1hdGgucm91bmQgYXMgaXQgd2lsbCBkcmF3IGFuIGluY29ycmVjdCBiYXJcclxuICAgICAgICAgICAgcmV0dXJuIGRheXM7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlIHRoZSBnYW50dCBzY2FsZSByYW5nZSBnaXZlbiB0aGUgc3RhcnQgYW5kIGVuZCBkYXRlIG9mIHRhc2tzKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVTY2FsZShzdGFydDogRGF0ZSA9IG5ldyBEYXRlKCksIGVuZDogRGF0ZSA9IHRoaXMuYWRkRGF5cyhzdGFydCwgNykpIHtcclxuICAgICAgICBjb25zdCBzY2FsZTogYW55W10gPSBbXTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB3aGlsZSAoc3RhcnQuZ2V0VGltZSgpIDw9IGVuZC5nZXRUaW1lKCkpIHtcclxuICAgICAgICAgICAgICAgIHNjYWxlLnB1c2goc3RhcnQpO1xyXG4gICAgICAgICAgICAgICAgc3RhcnQgPSB0aGlzLmFkZERheXMoc3RhcnQsIDcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzY2FsZTtcclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzY2FsZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIERldGVybWluZXMgd2hldGhlciBnaXZlbiBkYXRlIGlzIGEgd2Vla2VuZCAqL1xyXG4gICAgcHVibGljIGlzRGF5V2Vla2VuZChkYXRlOiBEYXRlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgZGF5ID0gZGF0ZS5nZXREYXkoKTtcclxuICAgICAgICBpZiAoZGF5ID09PSA2IHx8IGRheSA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBBZGQgeCBudW1iZXIgb2YgZGF5cyB0byBhIGRhdGUgb2JqZWN0ICovXHJcbiAgICBwdWJsaWMgYWRkRGF5cyhkYXRlOiBEYXRlLCBkYXlzOiBudW1iZXIpOiBEYXRlIHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgRGF0ZShkYXRlKTtcclxuICAgICAgICByZXN1bHQuc2V0RGF0ZShyZXN1bHQuZ2V0RGF0ZSgpICsgZGF5cyk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvLyoqIFJlbW92ZSB4IG51bWJlciBvZiBkYXlzIGZyb20gYSBkYXRlIG9iamVjdCAqL1xyXG4gICAgcHVibGljIHJlbW92ZURheXMoZGF0ZTogRGF0ZSwgZGF5czogbnVtYmVyKTogRGF0ZSB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGUoZGF0ZSk7XHJcbiAgICAgICAgcmVzdWx0LnNldERhdGUocmVzdWx0LmdldERhdGUoKSAtIGRheXMpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENhbGN1bGF0ZXMgdGhlIGdyaWQgc2NhbGUgZm9yIGdhbnR0IGJhc2VkIG9uIHRhc2tzIHN0YXJ0IGFuZCBlbmQgZGF0ZXMgKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVHcmlkU2NhbGUodGFza3M6IFRhc2tbXSk6IElTY2FsZSB7XHJcbiAgICAgICAgbGV0IHN0YXJ0OiBEYXRlO1xyXG4gICAgICAgIGxldCBlbmQ6IERhdGU7XHJcbiAgICAgICAgY29uc3QgZGF0ZXMgPSB0YXNrcy5tYXAoKHRhc2s6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgc3RhcnQ6IG5ldyBEYXRlKHRhc2suc3RhcnQpLFxyXG4gICAgICAgICAgICAgICAgZW5kOiBuZXcgRGF0ZSh0YXNrLmVuZClcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc3RhcnQgPSBuZXcgRGF0ZShNYXRoLm1pbi5hcHBseShudWxsLCBkYXRlcy5tYXAoKHQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHQuc3RhcnQ7XHJcbiAgICAgICAgfSkpKTtcclxuXHJcbiAgICAgICAgZW5kID0gbmV3IERhdGUoTWF0aC5tYXguYXBwbHkobnVsbCwgZGF0ZXMubWFwKCh0KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0LmVuZDtcclxuICAgICAgICB9KSkpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzdGFydDogc3RhcnQsXHJcbiAgICAgICAgICAgIGVuZDogZW5kXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50OiBhbnksIGF0dHJpYnV0ZTogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudClbYXR0cmlidXRlXSwgMTApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETyhkYWxlKTogZGV0ZXJtaW5lIHdoZXRoZXIgdGhpcyBpcyBuZWVkZWRcclxuICAgIHB1YmxpYyBjYWxjdWxhdGVDb250YWluZXJXaWR0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIHRoaXMud2luZG93SW5uZXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lcldpZHRoID0gdGhpcy5ncmlkV2lkdGggLSAxODtcclxuICAgICAgICByZXR1cm4gY29udGFpbmVyV2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbGN1bGF0ZUNvbnRhaW5lckhlaWdodCgpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckhlaWdodCA9IChpbm5lckhlaWdodCAtIDE4KTtcclxuICAgICAgICByZXR1cm4gY29udGFpbmVySGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVBY3Rpdml0eUNvbnRhaW5lckRpbWVuc2lvbnMoKTogYW55IHtcclxuICAgICAgICBjb25zdCBzY3JvbGxXaWR0aCA9IDE4O1xyXG4gICAgICAgIHRoaXMud2luZG93SW5uZXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgIGNvbnN0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGggLSB0aGlzLmdyaWRXaWR0aCAtIHNjcm9sbFdpZHRoO1xyXG5cclxuICAgICAgICBjb25zdCBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSB0aGlzLmdyaWRIZWlnaHQ7XHJcblxyXG4gICAgICAgIHJldHVybiB7IGhlaWdodDogdGhpcy5hY3Rpdml0eUhlaWdodCwgd2lkdGg6IHdpZHRoIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbGN1bGF0ZUdhbnR0QWN0aXZpdHlXaWR0aChnYW50dEFjdGlvbnM6IEhUTUxFbGVtZW50LCBnYW50dEdyaWRFbGVtOiBIVE1MRWxlbWVudCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIGAke2dhbnR0QWN0aW9ucy5vZmZzZXRXaWR0aCAtIGdhbnR0R3JpZEVsZW0ub2Zmc2V0V2lkdGh9cHhgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVHYW50dEFjdGl2aXR5SGVpZ2h0KGdhbnR0R3JpZEVsZW06IEhUTUxFbGVtZW50KTogYW55IHtcclxuICAgICAgICByZXR1cm4gYCR7Z2FudHRHcmlkRWxlbS5vZmZzZXRIZWlnaHR9cHhgO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBTZXQgdGhlIHZlcnRpY2FsIHNjcm9sbCB0b3AgcG9zaXRpb25zIGZvciBnYW50dCAqL1xyXG4gICAgcHVibGljIHNjcm9sbFRvcCh2ZXJ0aWNhbFNjcm9sbEVsZW06IGFueSwgZ2FudHRHcmlkRWxlbTogYW55LCBnYW50dEFjdGl2aXR5QXJlYUVsZW06IGFueSkge1xyXG4gICAgICAgIGNvbnN0IHZlcnRpY2FsU2Nyb2xsVG9wID0gdmVydGljYWxTY3JvbGxFbGVtLnNjcm9sbFRvcDtcclxuICAgICAgICBjb25zdCBzY3JvbGwgPSB0aGlzLnNldFNjcm9sbFRvcDtcclxuXHJcbiAgICAgICAgLy8gZGVib3VuY2VcclxuICAgICAgICBpZiAodmVydGljYWxTY3JvbGxUb3AgIT09IG51bGwgJiYgdmVydGljYWxTY3JvbGxUb3AgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBzY3JvbGwodmVydGljYWxTY3JvbGxUb3AsIGdhbnR0QWN0aXZpdHlBcmVhRWxlbSk7XHJcbiAgICAgICAgICAgIHNjcm9sbChnYW50dEFjdGl2aXR5QXJlYUVsZW0uc2Nyb2xsVG9wLCBnYW50dEdyaWRFbGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEdyb3VwIGRhdGEgYnkgaWQgLCBvbmx5IHN1cHBvcnRzIG9uZSBsZXZlbCovXHJcbiAgICBwdWJsaWMgZ3JvdXBEYXRhKHRhc2tzOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0YXNrcztcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2hlY2tzIHdoZXRoZXIgYW55IG5ldyBkYXRhIG5lZWRzIHRvIGJlIGFkZGVkIHRvIHRhc2sgY2FjaGUgICovXHJcbiAgICBwdWJsaWMgZG9UYXNrQ2hlY2sodGFza3M6IGFueVtdLCBzY2FsZTogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgLy8gY29uc3QgY2FjaGVkVGFza0lkcyA9IHRoaXMuVEFTS19DQUNIRS5tYXAoKHRhc2s6IGFueSkgPT4geyByZXR1cm4gdGFzay5pZCB9KTtcclxuICAgICAgICAvLyBjb25zdCBpdGVtc1RvQ2FjaGU6IGFueVtdID0gW107XHJcblxyXG4gICAgICAgIC8vIG9ubHkgbG9vayBhdCB0YXNrcyB0aGF0IGFyZSBub3QgY2FjaGVkXHJcbiAgICAgICAgLy8gdGFza3MuZmlsdGVyKCh0YXNrOiBhbnkpID0+IHtcclxuICAgICAgICAvLyAgICAgcmV0dXJuIGNhY2hlZFRhc2tJZHMuaW5kZXhPZih0YXNrLmlkKSA9PT0gLTE7XHJcbiAgICAgICAgLy8gfSkuZm9yRWFjaCgodGFzazogYW55KSA9PiB7XHJcbiAgICAgICAgLy8gICAgIGl0ZW1zVG9DYWNoZS5wdXNoKHRhc2spO1xyXG4gICAgICAgIC8vIH0pO1xyXG5cclxuICAgICAgICAvLyBpdGVtc1RvQ2FjaGUuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuVEFTS19DQUNIRS5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIC8vIH0pO1xyXG5cclxuICAgICAgICAvLyBpZiAoaXRlbXNUb0NhY2hlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAvLyAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICB0aGlzLlRBU0tfQ0FDSEUgPSB0YXNrcztcclxuXHJcbiAgICAgICAgdGhpcy5USU1FX1NDQUxFID0gdGhpcy5jYWxjdWxhdGVTY2FsZShzY2FsZS5zdGFydCwgc2NhbGUuZW5kKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFNldCBhIGlkIHByZWZpeCBzbyBDU1MzIHF1ZXJ5IHNlbGVjdG9yIGNhbiB3b3JrIHdpdGggaWRzIHRoYXQgY29udGFpbiBudW1iZXJzICovXHJcbiAgICBwdWJsaWMgc2V0SWRQcmVmaXgoaWQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGBfJHtpZH1gO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIC8qKiBSZW1vdmUgdGhlIGlkIHByZWZpeCB0byBhbGxvdyBxdWVyeWluZyBvZiBkYXRhICovXHJcbiAgICAvLyBwdWJsaWMgcmVtb3ZlSWRQcmVmaXgoaWQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAvLyAgICAgcmV0dXJuIGlkLnN1YnN0cmluZygxLCBpZC5sZW5ndGggLSAxKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvKiogU2V0IHRoZSBzY3JvbGwgdG9wIHByb3BlcnR5IG9mIGEgbmF0aXZlIERPTSBlbGVtZW50ICovXHJcbiAgICBwdWJsaWMgc2V0U2Nyb2xsVG9wKHNjcm9sbFRvcDogbnVtYmVyLCBlbGVtZW50OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZWxlbWVudCAhPT0gbnVsbCAmJiBlbGVtZW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5zY3JvbGxUb3AgPSBzY3JvbGxUb3A7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==