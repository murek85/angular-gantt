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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZ2FudHQvIiwic291cmNlcyI6WyJsaWIvc2hhcmVkL3NlcnZpY2VzL2dhbnR0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBR3JEO0lBaUJJO1FBZk8sY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLGtCQUFhLEdBQUcsRUFBRSxDQUFDLENBQUMsb0RBQW9EOztRQUN4RSxtQkFBYyxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3pDLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxxQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFDckIsbUJBQWMsR0FBRyxDQUFDLENBQUM7UUFDbkIsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLFdBQU0sR0FBRyxDQUFDLENBQUM7UUFDWCxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixjQUFTLEdBQUcsR0FBRyxDQUFDLENBQUMsS0FBSzs7UUFDdEIsZUFBVSxHQUFHLEdBQUcsQ0FBQzs7WUFLZCxXQUFXLEdBQUcsSUFBSSxXQUFXLEVBQUU7UUFFckMsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQztRQUN2QyxJQUFJLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQyxjQUFjLENBQUM7UUFDakQsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQztRQUMvQyxJQUFJLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FB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MERBQTBEOzs7Ozs7Ozs7OztJQUNuRCxtQ0FBWTs7Ozs7Ozs7Ozs7SUFBbkIsVUFBb0IsU0FBaUIsRUFBRSxPQUFZO1FBQy9DLElBQUksT0FBTyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQzNDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1NBQ2pDO0lBQ0wsQ0FBQzs7Z0JBOVFKLFVBQVU7Ozs7SUErUVgsbUJBQUM7Q0FBQSxBQS9RRCxJQStRQztTQTlRWSxZQUFZOzs7SUFDckIsaUNBQXFCOztJQUNyQixxQ0FBMEI7O0lBQzFCLHNDQUFnRDs7SUFDaEQsaUNBQXFCOztJQUNyQix3Q0FBNEI7O0lBQzVCLHNDQUEwQjs7SUFDMUIsaUNBQXFCOztJQUNyQixxQ0FBeUI7O0lBQ3pCLDhCQUFrQjs7SUFDbEIsbUNBQTJCOztJQUMzQixpQ0FBdUI7O0lBQ3ZCLGtDQUF3Qjs7SUFDeEIsa0NBQXlCOztJQUN6QixrQ0FBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEdhbnR0Q29uZmlnIH0gZnJvbSAnLi9nYW50dC1jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IFRhc2ssIElTY2FsZSB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgR2FudHRTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyByb3dIZWlnaHQgPSAwO1xyXG4gICAgcHVibGljIGhvdXJDZWxsV2lkdGggPSA2MDsgLy8gY2hhbmdlIHRvIDYwIHNvIG1pbnV0ZXMgY2FuIGJlZW4gc2VlbiBtb3JlIGVhc2lseVxyXG4gICAgcHVibGljIGhvdXJzQ2VsbFdpZHRoID0gdGhpcy5ob3VyQ2VsbFdpZHRoICogMjU7XHJcbiAgICBwdWJsaWMgY2VsbFdpZHRoID0gMDtcclxuICAgIHB1YmxpYyB3aW5kb3dJbm5lcldpZHRoID0gMDtcclxuICAgIHB1YmxpYyBhY3Rpdml0eUhlaWdodCA9IDA7XHJcbiAgICBwdWJsaWMgYmFySGVpZ2h0ID0gMDtcclxuICAgIHB1YmxpYyBiYXJMaW5lSGVpZ2h0ID0gMDtcclxuICAgIHB1YmxpYyBiYXJUb3AgPSAwO1xyXG4gICAgcHVibGljIGJhck1vdmVhYmxlID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgZ3JpZFdpZHRoID0gNTQyOyAvLzE4OFxyXG4gICAgcHVibGljIGdyaWRIZWlnaHQgPSAzMzI7XHJcbiAgICBwdWJsaWMgVEFTS19DQUNIRTogYW55W107XHJcbiAgICBwdWJsaWMgVElNRV9TQ0FMRTogYW55W107XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgY29uc3QgZ2FudHRDb25maWcgPSBuZXcgR2FudHRDb25maWcoKTtcclxuXHJcbiAgICAgICAgdGhpcy5yb3dIZWlnaHQgPSBnYW50dENvbmZpZy5yb3dIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5jZWxsV2lkdGggPSBnYW50dENvbmZpZy5jZWxsV2lkdGg7XHJcbiAgICAgICAgdGhpcy5hY3Rpdml0eUhlaWdodCA9IGdhbnR0Q29uZmlnLmFjdGl2aXR5SGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuYmFySGVpZ2h0ID0gZ2FudHRDb25maWcuYmFySGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuYmFyTGluZUhlaWdodCA9IGdhbnR0Q29uZmlnLmJhckxpbmVIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5iYXJUb3AgPSBnYW50dENvbmZpZy5yb3dIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5iYXJNb3ZlYWJsZSA9IGdhbnR0Q29uZmlnLmJhck1vdmVhYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlQmFyV2lkdGgoc3RhcnQ6IERhdGUsIGVuZDogRGF0ZSk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzdGFydCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgc3RhcnQgPSBuZXcgRGF0ZShzdGFydCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGVuZCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgZW5kID0gbmV3IERhdGUoZW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGRheXMgPSB0aGlzLmNhbGN1bGF0ZURpZmZEYXlzKHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgIGNvbnN0IHdpZHRoOiBudW1iZXIgPSAoZGF5cyAvIDcgKiB0aGlzLmNlbGxXaWR0aCArIGRheXMgLyA3KTtcclxuICAgICAgICByZXR1cm4gd2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVCYXJMZWZ0KHN0YXJ0OiBEYXRlLCBzY2FsZTogYW55W10pOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBsZWZ0ID0gMDtcclxuXHJcbiAgICAgICAgaWYgKHN0YXJ0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdGFydCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzY2FsZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKChzdGFydC5nZXRUaW1lKCkgPj0gc2NhbGVbaV0uZ2V0VGltZSgpICYmIHN0YXJ0LmdldFRpbWUoKSA8IHNjYWxlW2kgKyAxXS5nZXRUaW1lKCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IGkgKiB0aGlzLmNlbGxXaWR0aCArIGkgKyB0aGlzLmNhbGN1bGF0ZUJhckxlZnREZWx0YShzdGFydCkgKyAoKDcgLyAoc2NhbGVbaSArIDFdLmdldERhdGUoKSAtIHN0YXJ0LmdldERhdGUoKSkgLyA3KSAqIHRoaXMuY2VsbFdpZHRoKSAtIHRoaXMuY2VsbFdpZHRoIC8gNztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGVmdDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlcyB0aGUgaGVpZ2h0IG9mIHRoZSBnYW50dCBncmlkLCBhY3Rpdml0eSBhbmQgdmVydGljYWwgc2Nyb2xsICovXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlR2FudHRIZWlnaHQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gYCR7dGhpcy5UQVNLX0NBQ0hFLmxlbmd0aCAqIHRoaXMucm93SGVpZ2h0fXB4YDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZUJhckxlZnREZWx0YShzdGFydDogRGF0ZSk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IG9mZnNldCA9IDA7XHJcbiAgICAgICAgY29uc3QgaG91cnNJbkRheSA9IDI0O1xyXG4gICAgICAgIGNvbnN0IG1pbnV0ZXNJbkhvdXIgPSA2MDtcclxuICAgICAgICBjb25zdCBzZWNvbmRzSW5Ib3VyID0gMzYwMDtcclxuICAgICAgICBjb25zdCBzdGFydEhvdXJzOiBudW1iZXIgPVxyXG4gICAgICAgICAgICBzdGFydC5nZXRIb3VycygpICsgc3RhcnQuZ2V0TWludXRlcygpIC8gbWludXRlc0luSG91ciArIHN0YXJ0LmdldFNlY29uZHMoKSAvIHNlY29uZHNJbkhvdXI7XHJcblxyXG4gICAgICAgIG9mZnNldCA9IHRoaXMuY2VsbFdpZHRoIC8gaG91cnNJbkRheSAqIHN0YXJ0SG91cnM7XHJcbiAgICAgICAgcmV0dXJuIG9mZnNldDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlIHRoZSBiYXIgc3R5bGVzICovXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlQmFyKHRhc2s6IGFueSwgaW5kZXg6IG51bWJlciwgc2NhbGU6IGFueSkge1xyXG4gICAgICAgIGNvbnN0IGJhclN0eWxlID0gdGhpcy5nZXRCYXJTdHlsZSh0YXNrLmNvbG9yKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAndG9wJzogdGhpcy5iYXJUb3AgKiBpbmRleCArIDIgKyAncHgnLFxyXG4gICAgICAgICAgICAnbGVmdCc6IHRoaXMuY2FsY3VsYXRlQmFyTGVmdCh0YXNrLnN0YXJ0LCBzY2FsZSkgKyAncHgnLFxyXG4gICAgICAgICAgICAnaGVpZ2h0JzogdGhpcy5iYXJIZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAnbGluZS1oZWlnaHQnOiB0aGlzLmJhckxpbmVIZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAnd2lkdGgnOiB0aGlzLmNhbGN1bGF0ZUJhcldpZHRoKHRhc2suc3RhcnQsIHRhc2suZW5kKSArICdweCcsXHJcbiAgICAgICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogYmFyU3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdLFxyXG4gICAgICAgICAgICAnYm9yZGVyLWxlZnQnOiBiYXJTdHlsZVtcImJvcmRlci1sZWZ0XCJdXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogR2V0IHRoZSBiYXIgc3R5bGUgYmFzZWQgb24gdGFzayBzdGF0dXMgKi9cclxuICAgIHByaXZhdGUgZ2V0QmFyU3R5bGUoY29sb3I6IGFueSk6IGFueSB7XHJcbiAgICAgICAgY29uc3Qgc3R5bGUgPSB7fTtcclxuICAgICAgICBzdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0gPSBjb2xvci5zZWNvbmRhcnk7XHJcbiAgICAgICAgc3R5bGVbXCJib3JkZXItbGVmdFwiXSA9IGA1cHggc29saWQgJHtjb2xvci5wcmltYXJ5fWA7XHJcblxyXG4gICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlcyB0aGUgZGlmZmVyZW5jZSBpbiB0d28gZGF0ZXMgYW5kIHJldHVybnMgbnVtYmVyIG9mIGRheXMgKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVEaWZmRGF5cyhzdGFydDogRGF0ZSwgZW5kOiBEYXRlKTogbnVtYmVyIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBvbmVEYXkgPSAyNCAqIDYwICogNjAgKiAxMDAwOyAvLyBob3VycyptaW51dGVzKnNlY29uZHMqbWlsbGlzZWNvbmRzIC9tc1xyXG4gICAgICAgICAgICBjb25zdCBkaWZmRGF5cyA9IE1hdGguYWJzKChzdGFydC5nZXRUaW1lKCkgLSBlbmQuZ2V0VGltZSgpKSAvIChvbmVEYXkpKTtcclxuICAgICAgICAgICAgY29uc3QgZGF5cyA9IGRpZmZEYXlzOyAvLyBkb24ndCB1c2UgTWF0aC5yb3VuZCBhcyBpdCB3aWxsIGRyYXcgYW4gaW5jb3JyZWN0IGJhclxyXG4gICAgICAgICAgICByZXR1cm4gZGF5cztcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDYWxjdWxhdGUgdGhlIGdhbnR0IHNjYWxlIHJhbmdlIGdpdmVuIHRoZSBzdGFydCBhbmQgZW5kIGRhdGUgb2YgdGFza3MqL1xyXG4gICAgcHVibGljIGNhbGN1bGF0ZVNjYWxlKHN0YXJ0OiBEYXRlID0gbmV3IERhdGUoKSwgZW5kOiBEYXRlID0gdGhpcy5hZGREYXlzKHN0YXJ0LCA3KSkge1xyXG4gICAgICAgIGNvbnN0IHNjYWxlOiBhbnlbXSA9IFtdO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHdoaWxlIChzdGFydC5nZXRUaW1lKCkgPD0gZW5kLmdldFRpbWUoKSkge1xyXG4gICAgICAgICAgICAgICAgc2NhbGUucHVzaChzdGFydCk7XHJcbiAgICAgICAgICAgICAgICBzdGFydCA9IHRoaXMuYWRkRGF5cyhzdGFydCwgNyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHNjYWxlO1xyXG5cclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNjYWxlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogRGV0ZXJtaW5lcyB3aGV0aGVyIGdpdmVuIGRhdGUgaXMgYSB3ZWVrZW5kICovXHJcbiAgICBwdWJsaWMgaXNEYXlXZWVrZW5kKGRhdGU6IERhdGUpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCBkYXkgPSBkYXRlLmdldERheSgpO1xyXG4gICAgICAgIGlmIChkYXkgPT09IDYgfHwgZGF5ID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEFkZCB4IG51bWJlciBvZiBkYXlzIHRvIGEgZGF0ZSBvYmplY3QgKi9cclxuICAgIHB1YmxpYyBhZGREYXlzKGRhdGU6IERhdGUsIGRheXM6IG51bWJlcik6IERhdGUge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBEYXRlKGRhdGUpO1xyXG4gICAgICAgIHJlc3VsdC5zZXREYXRlKHJlc3VsdC5nZXREYXRlKCkgKyBkYXlzKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8vKiogUmVtb3ZlIHggbnVtYmVyIG9mIGRheXMgZnJvbSBhIGRhdGUgb2JqZWN0ICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlRGF5cyhkYXRlOiBEYXRlLCBkYXlzOiBudW1iZXIpOiBEYXRlIHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgRGF0ZShkYXRlKTtcclxuICAgICAgICByZXN1bHQuc2V0RGF0ZShyZXN1bHQuZ2V0RGF0ZSgpIC0gZGF5cyk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlcyB0aGUgZ3JpZCBzY2FsZSBmb3IgZ2FudHQgYmFzZWQgb24gdGFza3Mgc3RhcnQgYW5kIGVuZCBkYXRlcyAqL1xyXG4gICAgcHVibGljIGNhbGN1bGF0ZUdyaWRTY2FsZSh0YXNrczogVGFza1tdKTogSVNjYWxlIHtcclxuICAgICAgICBsZXQgc3RhcnQ6IERhdGU7XHJcbiAgICAgICAgbGV0IGVuZDogRGF0ZTtcclxuICAgICAgICBjb25zdCBkYXRlcyA9IHRhc2tzLm1hcCgodGFzazogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBzdGFydDogbmV3IERhdGUodGFzay5zdGFydCksXHJcbiAgICAgICAgICAgICAgICBlbmQ6IG5ldyBEYXRlKHRhc2suZW5kKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzdGFydCA9IG5ldyBEYXRlKE1hdGgubWluLmFwcGx5KG51bGwsIGRhdGVzLm1hcCgodCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdC5zdGFydDtcclxuICAgICAgICB9KSkpO1xyXG5cclxuICAgICAgICBlbmQgPSBuZXcgRGF0ZShNYXRoLm1heC5hcHBseShudWxsLCBkYXRlcy5tYXAoKHQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHQuZW5kO1xyXG4gICAgICAgIH0pKSk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcclxuICAgICAgICAgICAgZW5kOiBlbmRcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQ6IGFueSwgYXR0cmlidXRlOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gcGFyc2VJbnQoZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KVthdHRyaWJ1dGVdLCAxMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPKGRhbGUpOiBkZXRlcm1pbmUgd2hldGhlciB0aGlzIGlzIG5lZWRlZFxyXG4gICAgcHVibGljIGNhbGN1bGF0ZUNvbnRhaW5lcldpZHRoKCk6IG51bWJlciB7XHJcbiAgICAgICAgdGhpcy53aW5kb3dJbm5lcldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyV2lkdGggPSB0aGlzLmdyaWRXaWR0aCAtIDE4O1xyXG4gICAgICAgIHJldHVybiBjb250YWluZXJXaWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlQ29udGFpbmVySGVpZ2h0KCk6IG51bWJlciB7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVySGVpZ2h0ID0gKGlubmVySGVpZ2h0IC0gMTgpO1xyXG4gICAgICAgIHJldHVybiBjb250YWluZXJIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbGN1bGF0ZUFjdGl2aXR5Q29udGFpbmVyRGltZW5zaW9ucygpOiBhbnkge1xyXG4gICAgICAgIGNvbnN0IHNjcm9sbFdpZHRoID0gMTg7XHJcbiAgICAgICAgdGhpcy53aW5kb3dJbm5lcldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgY29uc3Qgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCAtIHRoaXMuZ3JpZFdpZHRoIC0gc2Nyb2xsV2lkdGg7XHJcblxyXG4gICAgICAgIGNvbnN0IGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIHRoaXMuZ3JpZEhlaWdodDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHsgaGVpZ2h0OiB0aGlzLmFjdGl2aXR5SGVpZ2h0LCB3aWR0aDogd2lkdGggfTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlR2FudHRBY3Rpdml0eVdpZHRoKGdhbnR0QWN0aW9uczogSFRNTEVsZW1lbnQsIGdhbnR0R3JpZEVsZW06IEhUTUxFbGVtZW50KTogYW55IHtcclxuICAgICAgICByZXR1cm4gYCR7Z2FudHRBY3Rpb25zLm9mZnNldFdpZHRoIC0gZ2FudHRHcmlkRWxlbS5vZmZzZXRXaWR0aH1weGA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbGN1bGF0ZUdhbnR0QWN0aXZpdHlIZWlnaHQoZ2FudHRHcmlkRWxlbTogSFRNTEVsZW1lbnQpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiBgJHtnYW50dEdyaWRFbGVtLm9mZnNldEhlaWdodH1weGA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFNldCB0aGUgdmVydGljYWwgc2Nyb2xsIHRvcCBwb3NpdGlvbnMgZm9yIGdhbnR0ICovXHJcbiAgICBwdWJsaWMgc2Nyb2xsVG9wKHZlcnRpY2FsU2Nyb2xsRWxlbTogYW55LCBnYW50dEdyaWRFbGVtOiBhbnksIGdhbnR0QWN0aXZpdHlBcmVhRWxlbTogYW55KSB7XHJcbiAgICAgICAgY29uc3QgdmVydGljYWxTY3JvbGxUb3AgPSB2ZXJ0aWNhbFNjcm9sbEVsZW0uc2Nyb2xsVG9wO1xyXG4gICAgICAgIGNvbnN0IHNjcm9sbCA9IHRoaXMuc2V0U2Nyb2xsVG9wO1xyXG5cclxuICAgICAgICAvLyBkZWJvdW5jZVxyXG4gICAgICAgIGlmICh2ZXJ0aWNhbFNjcm9sbFRvcCAhPT0gbnVsbCAmJiB2ZXJ0aWNhbFNjcm9sbFRvcCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbCh2ZXJ0aWNhbFNjcm9sbFRvcCwgZ2FudHRBY3Rpdml0eUFyZWFFbGVtKTtcclxuICAgICAgICAgICAgc2Nyb2xsKGdhbnR0QWN0aXZpdHlBcmVhRWxlbS5zY3JvbGxUb3AsIGdhbnR0R3JpZEVsZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogR3JvdXAgZGF0YSBieSBpZCAsIG9ubHkgc3VwcG9ydHMgb25lIGxldmVsKi9cclxuICAgIHB1YmxpYyBncm91cERhdGEodGFza3M6IGFueSk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRhc2tzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDaGVja3Mgd2hldGhlciBhbnkgbmV3IGRhdGEgbmVlZHMgdG8gYmUgYWRkZWQgdG8gdGFzayBjYWNoZSAgKi9cclxuICAgIHB1YmxpYyBkb1Rhc2tDaGVjayh0YXNrczogYW55W10sIHNjYWxlOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICAvLyBjb25zdCBjYWNoZWRUYXNrSWRzID0gdGhpcy5UQVNLX0NBQ0hFLm1hcCgodGFzazogYW55KSA9PiB7IHJldHVybiB0YXNrLmlkIH0pO1xyXG4gICAgICAgIC8vIGNvbnN0IGl0ZW1zVG9DYWNoZTogYW55W10gPSBbXTtcclxuXHJcbiAgICAgICAgLy8gb25seSBsb29rIGF0IHRhc2tzIHRoYXQgYXJlIG5vdCBjYWNoZWRcclxuICAgICAgICAvLyB0YXNrcy5maWx0ZXIoKHRhc2s6IGFueSkgPT4ge1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gY2FjaGVkVGFza0lkcy5pbmRleE9mKHRhc2suaWQpID09PSAtMTtcclxuICAgICAgICAvLyB9KS5mb3JFYWNoKCh0YXNrOiBhbnkpID0+IHtcclxuICAgICAgICAvLyAgICAgaXRlbXNUb0NhY2hlLnB1c2godGFzayk7XHJcbiAgICAgICAgLy8gfSk7XHJcblxyXG4gICAgICAgIC8vIGl0ZW1zVG9DYWNoZS5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAvLyAgICAgdGhpcy5UQVNLX0NBQ0hFLnB1c2goaXRlbSk7XHJcbiAgICAgICAgLy8gfSk7XHJcblxyXG4gICAgICAgIC8vIGlmIChpdGVtc1RvQ2FjaGUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIHRoaXMuVEFTS19DQUNIRSA9IHRhc2tzO1xyXG5cclxuICAgICAgICB0aGlzLlRJTUVfU0NBTEUgPSB0aGlzLmNhbGN1bGF0ZVNjYWxlKHNjYWxlLnN0YXJ0LCBzY2FsZS5lbmQpO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogU2V0IGEgaWQgcHJlZml4IHNvIENTUzMgcXVlcnkgc2VsZWN0b3IgY2FuIHdvcmsgd2l0aCBpZHMgdGhhdCBjb250YWluIG51bWJlcnMgKi9cclxuICAgIHB1YmxpYyBzZXRJZFByZWZpeChpZDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gYF8ke2lkfWA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLyoqIFJlbW92ZSB0aGUgaWQgcHJlZml4IHRvIGFsbG93IHF1ZXJ5aW5nIG9mIGRhdGEgKi9cclxuICAgIC8vIHB1YmxpYyByZW1vdmVJZFByZWZpeChpZDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIC8vICAgICByZXR1cm4gaWQuc3Vic3RyaW5nKDEsIGlkLmxlbmd0aCAtIDEpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8qKiBTZXQgdGhlIHNjcm9sbCB0b3AgcHJvcGVydHkgb2YgYSBuYXRpdmUgRE9NIGVsZW1lbnQgKi9cclxuICAgIHB1YmxpYyBzZXRTY3JvbGxUb3Aoc2Nyb2xsVG9wOiBudW1iZXIsIGVsZW1lbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChlbGVtZW50ICE9PSBudWxsICYmIGVsZW1lbnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19