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
    /** @type {?} */
    GanttService.prototype.TASK_CACHE;
    /** @type {?} */
    GanttService.prototype.TIME_SCALE;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZ2FudHQvIiwic291cmNlcyI6WyJsaWIvc2hhcmVkL3NlcnZpY2VzL2dhbnR0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBR3JEO0lBaUJJO1FBZk8sY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLGtCQUFhLEdBQUcsRUFBRSxDQUFDLENBQUMsb0RBQW9EOztRQUN4RSxtQkFBYyxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3pDLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxxQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFDckIsbUJBQWMsR0FBRyxDQUFDLENBQUM7UUFDbkIsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLFdBQU0sR0FBRyxDQUFDLENBQUM7UUFDWCxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixjQUFTLEdBQUcsR0FBRyxDQUFDLENBQUMsS0FBSzs7UUFDdEIsZUFBVSxHQUFHLEdBQUcsQ0FBQzs7WUFLZCxXQUFXLEdBQUcsSUFBSSxXQUFXLEVBQUU7UUFFckMsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQztRQUN2QyxJQUFJLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQyxjQUFjLENBQUM7UUFDakQsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQztRQUMvQyxJQUFJLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FB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S0FBSyxTQUFTLEVBQUU7WUFDM0MsT0FBTyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7U0FDakM7SUFDTCxDQUFDOztnQkE1UUosVUFBVTs7OztJQTZRWCxtQkFBQztDQUFBLEFBN1FELElBNlFDO1NBNVFZLFlBQVk7OztJQUNyQixpQ0FBcUI7O0lBQ3JCLHFDQUEwQjs7SUFDMUIsc0NBQWdEOztJQUNoRCxpQ0FBcUI7O0lBQ3JCLHdDQUE0Qjs7SUFDNUIsc0NBQTBCOztJQUMxQixpQ0FBcUI7O0lBQ3JCLHFDQUF5Qjs7SUFDekIsOEJBQWtCOztJQUNsQixtQ0FBMkI7O0lBQzNCLGlDQUF1Qjs7SUFDdkIsa0NBQXdCOztJQUN4QixrQ0FBeUI7O0lBQ3pCLGtDQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgR2FudHRDb25maWcgfSBmcm9tICcuL2dhbnR0LWNvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVGFzaywgSVNjYWxlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBHYW50dFNlcnZpY2Uge1xyXG4gICAgcHVibGljIHJvd0hlaWdodCA9IDA7XHJcbiAgICBwdWJsaWMgaG91ckNlbGxXaWR0aCA9IDYwOyAvLyBjaGFuZ2UgdG8gNjAgc28gbWludXRlcyBjYW4gYmVlbiBzZWVuIG1vcmUgZWFzaWx5XHJcbiAgICBwdWJsaWMgaG91cnNDZWxsV2lkdGggPSB0aGlzLmhvdXJDZWxsV2lkdGggKiAyNTtcclxuICAgIHB1YmxpYyBjZWxsV2lkdGggPSAwO1xyXG4gICAgcHVibGljIHdpbmRvd0lubmVyV2lkdGggPSAwO1xyXG4gICAgcHVibGljIGFjdGl2aXR5SGVpZ2h0ID0gMDtcclxuICAgIHB1YmxpYyBiYXJIZWlnaHQgPSAwO1xyXG4gICAgcHVibGljIGJhckxpbmVIZWlnaHQgPSAwO1xyXG4gICAgcHVibGljIGJhclRvcCA9IDA7XHJcbiAgICBwdWJsaWMgYmFyTW92ZWFibGUgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBncmlkV2lkdGggPSA1NDI7IC8vMTg4XHJcbiAgICBwdWJsaWMgZ3JpZEhlaWdodCA9IDMzMjtcclxuICAgIHB1YmxpYyBUQVNLX0NBQ0hFOiBhbnlbXTtcclxuICAgIHB1YmxpYyBUSU1FX1NDQUxFOiBhbnlbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBjb25zdCBnYW50dENvbmZpZyA9IG5ldyBHYW50dENvbmZpZygpO1xyXG5cclxuICAgICAgICB0aGlzLnJvd0hlaWdodCA9IGdhbnR0Q29uZmlnLnJvd0hlaWdodDtcclxuICAgICAgICB0aGlzLmNlbGxXaWR0aCA9IGdhbnR0Q29uZmlnLmNlbGxXaWR0aDtcclxuICAgICAgICB0aGlzLmFjdGl2aXR5SGVpZ2h0ID0gZ2FudHRDb25maWcuYWN0aXZpdHlIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5iYXJIZWlnaHQgPSBnYW50dENvbmZpZy5iYXJIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5iYXJMaW5lSGVpZ2h0ID0gZ2FudHRDb25maWcuYmFyTGluZUhlaWdodDtcclxuICAgICAgICB0aGlzLmJhclRvcCA9IGdhbnR0Q29uZmlnLnJvd0hlaWdodDtcclxuICAgICAgICB0aGlzLmJhck1vdmVhYmxlID0gZ2FudHRDb25maWcuYmFyTW92ZWFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVCYXJXaWR0aChzdGFydDogRGF0ZSwgZW5kOiBEYXRlKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAodHlwZW9mIHN0YXJ0ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBzdGFydCA9IG5ldyBEYXRlKHN0YXJ0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgZW5kID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBlbmQgPSBuZXcgRGF0ZShlbmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZGF5cyA9IHRoaXMuY2FsY3VsYXRlRGlmZkRheXMoc3RhcnQsIGVuZCk7XHJcbiAgICAgICAgY29uc3Qgd2lkdGg6IG51bWJlciA9IChkYXlzIC8gNyAqIHRoaXMuY2VsbFdpZHRoICsgZGF5cyAvIDcpO1xyXG4gICAgICAgIHJldHVybiB3aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZUJhckxlZnQoc3RhcnQ6IERhdGUsIHNjYWxlOiBhbnlbXSk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGxlZnQgPSAwO1xyXG5cclxuICAgICAgICBpZiAoc3RhcnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHN0YXJ0ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgc3RhcnQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNjYWxlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKHN0YXJ0LmdldFRpbWUoKSA+PSBzY2FsZVtpXS5nZXRUaW1lKCkgJiYgc3RhcnQuZ2V0VGltZSgpIDwgc2NhbGVbaSArIDFdLmdldFRpbWUoKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gaSAqIHRoaXMuY2VsbFdpZHRoICsgaSArIHRoaXMuY2FsY3VsYXRlQmFyTGVmdERlbHRhKHN0YXJ0KSArICgoNyAvIChzY2FsZVtpICsgMV0uZ2V0RGF0ZSgpIC0gc3RhcnQuZ2V0RGF0ZSgpKSAvIDcpICogdGhpcy5jZWxsV2lkdGgpIC0gdGhpcy5jZWxsV2lkdGggLyA3O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsZWZ0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDYWxjdWxhdGVzIHRoZSBoZWlnaHQgb2YgdGhlIGdhbnR0IGdyaWQsIGFjdGl2aXR5IGFuZCB2ZXJ0aWNhbCBzY3JvbGwgKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVHYW50dEhlaWdodCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBgJHt0aGlzLlRBU0tfQ0FDSEUubGVuZ3RoICogdGhpcy5yb3dIZWlnaHR9cHhgO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlQmFyTGVmdERlbHRhKHN0YXJ0OiBEYXRlKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgb2Zmc2V0ID0gMDtcclxuICAgICAgICBjb25zdCBob3Vyc0luRGF5ID0gMjQ7XHJcbiAgICAgICAgY29uc3QgbWludXRlc0luSG91ciA9IDYwO1xyXG4gICAgICAgIGNvbnN0IHNlY29uZHNJbkhvdXIgPSAzNjAwO1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0SG91cnM6IG51bWJlciA9XHJcbiAgICAgICAgICAgIHN0YXJ0LmdldEhvdXJzKCkgKyBzdGFydC5nZXRNaW51dGVzKCkgLyBtaW51dGVzSW5Ib3VyICsgc3RhcnQuZ2V0U2Vjb25kcygpIC8gc2Vjb25kc0luSG91cjtcclxuXHJcbiAgICAgICAgb2Zmc2V0ID0gdGhpcy5jZWxsV2lkdGggLyBob3Vyc0luRGF5ICogc3RhcnRIb3VycztcclxuICAgICAgICByZXR1cm4gb2Zmc2V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDYWxjdWxhdGUgdGhlIGJhciBzdHlsZXMgKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVCYXIodGFzazogYW55LCBpbmRleDogbnVtYmVyLCBzY2FsZTogYW55KSB7XHJcbiAgICAgICAgY29uc3QgYmFyU3R5bGUgPSB0aGlzLmdldEJhclN0eWxlKHRhc2suY29sb3IpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICd0b3AnOiB0aGlzLmJhclRvcCAqIGluZGV4ICsgMiArICdweCcsXHJcbiAgICAgICAgICAgICdsZWZ0JzogdGhpcy5jYWxjdWxhdGVCYXJMZWZ0KHRhc2suc3RhcnQsIHNjYWxlKSArICdweCcsXHJcbiAgICAgICAgICAgICdoZWlnaHQnOiB0aGlzLmJhckhlaWdodCArICdweCcsXHJcbiAgICAgICAgICAgICdsaW5lLWhlaWdodCc6IHRoaXMuYmFyTGluZUhlaWdodCArICdweCcsXHJcbiAgICAgICAgICAgICd3aWR0aCc6IHRoaXMuY2FsY3VsYXRlQmFyV2lkdGgodGFzay5zdGFydCwgdGFzay5lbmQpICsgJ3B4JyxcclxuICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiBiYXJTdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0sXHJcbiAgICAgICAgICAgICdib3JkZXItbGVmdCc6IGJhclN0eWxlW1wiYm9yZGVyLWxlZnRcIl1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBHZXQgdGhlIGJhciBzdHlsZSBiYXNlZCBvbiB0YXNrIHN0YXR1cyAqL1xyXG4gICAgcHJpdmF0ZSBnZXRCYXJTdHlsZShjb2xvcjogYW55KTogYW55IHtcclxuICAgICAgICBjb25zdCBzdHlsZSA9IHt9O1xyXG4gICAgICAgIHN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSA9IGNvbG9yLnNlY29uZGFyeTtcclxuICAgICAgICBzdHlsZVtcImJvcmRlci1sZWZ0XCJdID0gYDVweCBzb2xpZCAke2NvbG9yLnByaW1hcnl9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDYWxjdWxhdGVzIHRoZSBkaWZmZXJlbmNlIGluIHR3byBkYXRlcyBhbmQgcmV0dXJucyBudW1iZXIgb2YgZGF5cyAqL1xyXG4gICAgcHVibGljIGNhbGN1bGF0ZURpZmZEYXlzKHN0YXJ0OiBEYXRlLCBlbmQ6IERhdGUpOiBudW1iZXIge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9uZURheSA9IDI0ICogNjAgKiA2MCAqIDEwMDA7IC8vIGhvdXJzKm1pbnV0ZXMqc2Vjb25kcyptaWxsaXNlY29uZHMgL21zXHJcbiAgICAgICAgICAgIGNvbnN0IGRpZmZEYXlzID0gTWF0aC5hYnMoKHN0YXJ0LmdldFRpbWUoKSAtIGVuZC5nZXRUaW1lKCkpIC8gKG9uZURheSkpO1xyXG4gICAgICAgICAgICBjb25zdCBkYXlzID0gZGlmZkRheXM7IC8vIGRvbid0IHVzZSBNYXRoLnJvdW5kIGFzIGl0IHdpbGwgZHJhdyBhbiBpbmNvcnJlY3QgYmFyXHJcbiAgICAgICAgICAgIHJldHVybiBkYXlzO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENhbGN1bGF0ZSB0aGUgZ2FudHQgc2NhbGUgcmFuZ2UgZ2l2ZW4gdGhlIHN0YXJ0IGFuZCBlbmQgZGF0ZSBvZiB0YXNrcyovXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlU2NhbGUoc3RhcnQ6IERhdGUgPSBuZXcgRGF0ZSgpLCBlbmQ6IERhdGUgPSB0aGlzLmFkZERheXMoc3RhcnQsIDcpKSB7XHJcbiAgICAgICAgY29uc3Qgc2NhbGU6IGFueVtdID0gW107XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgd2hpbGUgKHN0YXJ0LmdldFRpbWUoKSA8PSBlbmQuZ2V0VGltZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBzY2FsZS5wdXNoKHN0YXJ0KTtcclxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gdGhpcy5hZGREYXlzKHN0YXJ0LCA3KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gc2NhbGU7XHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZXR1cm4gc2NhbGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBEZXRlcm1pbmVzIHdoZXRoZXIgZ2l2ZW4gZGF0ZSBpcyBhIHdlZWtlbmQgKi9cclxuICAgIHB1YmxpYyBpc0RheVdlZWtlbmQoZGF0ZTogRGF0ZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IGRheSA9IGRhdGUuZ2V0RGF5KCk7XHJcbiAgICAgICAgaWYgKGRheSA9PT0gNiB8fCBkYXkgPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQWRkIHggbnVtYmVyIG9mIGRheXMgdG8gYSBkYXRlIG9iamVjdCAqL1xyXG4gICAgcHVibGljIGFkZERheXMoZGF0ZTogRGF0ZSwgZGF5czogbnVtYmVyKTogRGF0ZSB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGUoZGF0ZSk7XHJcbiAgICAgICAgcmVzdWx0LnNldERhdGUocmVzdWx0LmdldERhdGUoKSArIGRheXMpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8qKiBSZW1vdmUgeCBudW1iZXIgb2YgZGF5cyBmcm9tIGEgZGF0ZSBvYmplY3QgKi9cclxuICAgIHB1YmxpYyByZW1vdmVEYXlzKGRhdGU6IERhdGUsIGRheXM6IG51bWJlcik6IERhdGUge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBEYXRlKGRhdGUpO1xyXG4gICAgICAgIHJlc3VsdC5zZXREYXRlKHJlc3VsdC5nZXREYXRlKCkgLSBkYXlzKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDYWxjdWxhdGVzIHRoZSBncmlkIHNjYWxlIGZvciBnYW50dCBiYXNlZCBvbiB0YXNrcyBzdGFydCBhbmQgZW5kIGRhdGVzICovXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlR3JpZFNjYWxlKHRhc2tzOiBUYXNrW10pOiBJU2NhbGUge1xyXG4gICAgICAgIGxldCBzdGFydDogRGF0ZTtcclxuICAgICAgICBsZXQgZW5kOiBEYXRlO1xyXG4gICAgICAgIGNvbnN0IGRhdGVzID0gdGFza3MubWFwKCh0YXNrOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0OiBuZXcgRGF0ZSh0YXNrLnN0YXJ0KSxcclxuICAgICAgICAgICAgICAgIGVuZDogbmV3IERhdGUodGFzay5lbmQpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHN0YXJ0ID0gbmV3IERhdGUoTWF0aC5taW4uYXBwbHkobnVsbCwgZGF0ZXMubWFwKCh0KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0LnN0YXJ0O1xyXG4gICAgICAgIH0pKSk7XHJcblxyXG4gICAgICAgIGVuZCA9IG5ldyBEYXRlKE1hdGgubWF4LmFwcGx5KG51bGwsIGRhdGVzLm1hcCgodCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdC5lbmQ7XHJcbiAgICAgICAgfSkpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxyXG4gICAgICAgICAgICBlbmQ6IGVuZFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldENvbXB1dGVkU3R5bGUoZWxlbWVudDogYW55LCBhdHRyaWJ1dGU6IGFueSkge1xyXG4gICAgICAgIHJldHVybiBwYXJzZUludChkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpW2F0dHJpYnV0ZV0sIDEwKTtcclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE8oZGFsZSk6IGRldGVybWluZSB3aGV0aGVyIHRoaXMgaXMgbmVlZGVkXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlQ29udGFpbmVyV2lkdGgoKTogbnVtYmVyIHtcclxuICAgICAgICB0aGlzLndpbmRvd0lubmVyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICBjb25zdCBjb250YWluZXJXaWR0aCA9IHRoaXMuZ3JpZFdpZHRoIC0gMTg7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcldpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVDb250YWluZXJIZWlnaHQoKTogbnVtYmVyIHtcclxuICAgICAgICBjb25zdCBjb250YWluZXJIZWlnaHQgPSAoaW5uZXJIZWlnaHQgLSAxOCk7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lckhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlQWN0aXZpdHlDb250YWluZXJEaW1lbnNpb25zKCk6IGFueSB7XHJcbiAgICAgICAgY29uc3Qgc2Nyb2xsV2lkdGggPSAxODtcclxuICAgICAgICB0aGlzLndpbmRvd0lubmVyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICBjb25zdCB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIC0gdGhpcy5ncmlkV2lkdGggLSBzY3JvbGxXaWR0aDtcclxuXHJcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IC0gdGhpcy5ncmlkSGVpZ2h0O1xyXG5cclxuICAgICAgICByZXR1cm4geyBoZWlnaHQ6IHRoaXMuYWN0aXZpdHlIZWlnaHQsIHdpZHRoOiB3aWR0aCB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVHYW50dEFjdGl2aXR5V2lkdGgoZ2FudHRBY3Rpb25zOiBIVE1MRWxlbWVudCwgZ2FudHRHcmlkRWxlbTogSFRNTEVsZW1lbnQpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiBgJHtnYW50dEFjdGlvbnMub2Zmc2V0V2lkdGggLSBnYW50dEdyaWRFbGVtLm9mZnNldFdpZHRofXB4YDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlR2FudHRBY3Rpdml0eUhlaWdodChnYW50dEdyaWRFbGVtOiBIVE1MRWxlbWVudCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIGAke2dhbnR0R3JpZEVsZW0ub2Zmc2V0SGVpZ2h0fXB4YDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogU2V0IHRoZSB2ZXJ0aWNhbCBzY3JvbGwgdG9wIHBvc2l0aW9ucyBmb3IgZ2FudHQgKi9cclxuICAgIHB1YmxpYyBzY3JvbGxUb3AodmVydGljYWxTY3JvbGxFbGVtOiBhbnksIGdhbnR0R3JpZEVsZW06IGFueSwgZ2FudHRBY3Rpdml0eUFyZWFFbGVtOiBhbnkpIHtcclxuICAgICAgICBjb25zdCB2ZXJ0aWNhbFNjcm9sbFRvcCA9IHZlcnRpY2FsU2Nyb2xsRWxlbS5zY3JvbGxUb3A7XHJcbiAgICAgICAgY29uc3Qgc2Nyb2xsID0gdGhpcy5zZXRTY3JvbGxUb3A7XHJcblxyXG4gICAgICAgIC8vIGRlYm91bmNlXHJcbiAgICAgICAgaWYgKHZlcnRpY2FsU2Nyb2xsVG9wICE9PSBudWxsICYmIHZlcnRpY2FsU2Nyb2xsVG9wICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgc2Nyb2xsKHZlcnRpY2FsU2Nyb2xsVG9wLCBnYW50dEFjdGl2aXR5QXJlYUVsZW0pO1xyXG4gICAgICAgICAgICBzY3JvbGwoZ2FudHRBY3Rpdml0eUFyZWFFbGVtLnNjcm9sbFRvcCwgZ2FudHRHcmlkRWxlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBHcm91cCBkYXRhIGJ5IGlkICwgb25seSBzdXBwb3J0cyBvbmUgbGV2ZWwqL1xyXG4gICAgcHVibGljIGdyb3VwRGF0YSh0YXNrczogYW55KTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGFza3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENoZWNrcyB3aGV0aGVyIGFueSBuZXcgZGF0YSBuZWVkcyB0byBiZSBhZGRlZCB0byB0YXNrIGNhY2hlICAqL1xyXG4gICAgcHVibGljIGRvVGFza0NoZWNrKHRhc2tzOiBhbnlbXSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8vIGNvbnN0IGNhY2hlZFRhc2tJZHMgPSB0aGlzLlRBU0tfQ0FDSEUubWFwKCh0YXNrOiBhbnkpID0+IHsgcmV0dXJuIHRhc2suaWQgfSk7XHJcbiAgICAgICAgLy8gY29uc3QgaXRlbXNUb0NhY2hlOiBhbnlbXSA9IFtdO1xyXG5cclxuICAgICAgICAvLyBvbmx5IGxvb2sgYXQgdGFza3MgdGhhdCBhcmUgbm90IGNhY2hlZFxyXG4gICAgICAgIC8vIHRhc2tzLmZpbHRlcigodGFzazogYW55KSA9PiB7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiBjYWNoZWRUYXNrSWRzLmluZGV4T2YodGFzay5pZCkgPT09IC0xO1xyXG4gICAgICAgIC8vIH0pLmZvckVhY2goKHRhc2s6IGFueSkgPT4ge1xyXG4gICAgICAgIC8vICAgICBpdGVtc1RvQ2FjaGUucHVzaCh0YXNrKTtcclxuICAgICAgICAvLyB9KTtcclxuXHJcbiAgICAgICAgLy8gaXRlbXNUb0NhY2hlLmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgIC8vICAgICB0aGlzLlRBU0tfQ0FDSEUucHVzaChpdGVtKTtcclxuICAgICAgICAvLyB9KTtcclxuXHJcbiAgICAgICAgLy8gaWYgKGl0ZW1zVG9DYWNoZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgdGhpcy5UQVNLX0NBQ0hFID0gdGFza3M7XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogU2V0IGEgaWQgcHJlZml4IHNvIENTUzMgcXVlcnkgc2VsZWN0b3IgY2FuIHdvcmsgd2l0aCBpZHMgdGhhdCBjb250YWluIG51bWJlcnMgKi9cclxuICAgIHB1YmxpYyBzZXRJZFByZWZpeChpZDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gYF8ke2lkfWA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLyoqIFJlbW92ZSB0aGUgaWQgcHJlZml4IHRvIGFsbG93IHF1ZXJ5aW5nIG9mIGRhdGEgKi9cclxuICAgIC8vIHB1YmxpYyByZW1vdmVJZFByZWZpeChpZDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIC8vICAgICByZXR1cm4gaWQuc3Vic3RyaW5nKDEsIGlkLmxlbmd0aCAtIDEpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8qKiBTZXQgdGhlIHNjcm9sbCB0b3AgcHJvcGVydHkgb2YgYSBuYXRpdmUgRE9NIGVsZW1lbnQgKi9cclxuICAgIHB1YmxpYyBzZXRTY3JvbGxUb3Aoc2Nyb2xsVG9wOiBudW1iZXIsIGVsZW1lbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChlbGVtZW50ICE9PSBudWxsICYmIGVsZW1lbnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19