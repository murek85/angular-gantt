/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { GanttConfig } from './gantt-config.service';
export class GanttService {
    constructor() {
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
        const ganttConfig = new GanttConfig();
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
    calculateBarWidth(start, end) {
        if (typeof start === 'string') {
            start = new Date(start);
        }
        if (typeof end === 'string') {
            end = new Date(end);
        }
        /** @type {?} */
        const days = this.calculateDiffDays(start, end);
        /** @type {?} */
        const width = (days / 7 * this.cellWidth + days / 7);
        return width;
    }
    /**
     * @private
     * @param {?} start
     * @param {?} scale
     * @return {?}
     */
    calculateBarLeft(start, scale) {
        /** @type {?} */
        let left = 0;
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
    }
    /**
     * Calculates the height of the gantt grid, activity and vertical scroll
     * @return {?}
     */
    calculateGanttHeight() {
        return `${this.TASK_CACHE.length * this.rowHeight}px`;
    }
    /**
     * @private
     * @param {?} start
     * @return {?}
     */
    calculateBarLeftDelta(start) {
        /** @type {?} */
        let offset = 0;
        /** @type {?} */
        const hoursInDay = 24;
        /** @type {?} */
        const minutesInHour = 60;
        /** @type {?} */
        const secondsInHour = 3600;
        /** @type {?} */
        const startHours = start.getHours() + start.getMinutes() / minutesInHour + start.getSeconds() / secondsInHour;
        offset = this.cellWidth / hoursInDay * startHours;
        return offset;
    }
    /**
     * Calculate the bar styles
     * @param {?} task
     * @param {?} index
     * @param {?} scale
     * @return {?}
     */
    calculateBar(task, index, scale) {
        /** @type {?} */
        const barStyle = this.getBarStyle(task.color);
        return {
            'top': this.barTop * index + 2 + 'px',
            'left': this.calculateBarLeft(task.start, scale) + 'px',
            'height': this.barHeight + 'px',
            'line-height': this.barLineHeight + 'px',
            'width': this.calculateBarWidth(task.start, task.end) + 'px',
            'background-color': barStyle["background-color"],
            'border-left': barStyle["border-left"]
        };
    }
    /**
     * Get the bar style based on task status
     * @private
     * @param {?} color
     * @return {?}
     */
    getBarStyle(color) {
        /** @type {?} */
        const style = {};
        style["background-color"] = color.secondary;
        style["border-left"] = `5px solid ${color.primary}`;
        return style;
    }
    /**
     * Calculates the difference in two dates and returns number of days
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    calculateDiffDays(start, end) {
        try {
            /** @type {?} */
            const oneDay = 24 * 60 * 60 * 1000;
            // hours*minutes*seconds*milliseconds /ms
            /** @type {?} */
            const diffDays = Math.abs((start.getTime() - end.getTime()) / (oneDay));
            /** @type {?} */
            const days = diffDays;
            return days;
        }
        catch (err) {
            return 0;
        }
    }
    /**
     * Calculate the gantt scale range given the start and end date of tasks
     * @param {?=} start
     * @param {?=} end
     * @return {?}
     */
    calculateScale(start = new Date(), end = this.addDays(start, 7)) {
        /** @type {?} */
        const scale = [];
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
    }
    /**
     * Determines whether given date is a weekend
     * @param {?} date
     * @return {?}
     */
    isDayWeekend(date) {
        /** @type {?} */
        const day = date.getDay();
        if (day === 6 || day === 0) {
            return true;
        }
        return false;
    }
    /**
     * Add x number of days to a date object
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    addDays(date, days) {
        /** @type {?} */
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
    //** Remove x number of days from a date object */
    /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    removeDays(date, days) {
        /** @type {?} */
        const result = new Date(date);
        result.setDate(result.getDate() - days);
        return result;
    }
    /**
     * Calculates the grid scale for gantt based on tasks start and end dates
     * @param {?} tasks
     * @return {?}
     */
    calculateGridScale(tasks) {
        /** @type {?} */
        let start;
        /** @type {?} */
        let end;
        /** @type {?} */
        const dates = tasks.map((task) => {
            return {
                start: new Date(task.start),
                end: new Date(task.end)
            };
        });
        start = new Date(Math.min.apply(null, dates.map((t) => {
            return t.start;
        })));
        end = new Date(Math.max.apply(null, dates.map((t) => {
            return t.end;
        })));
        return {
            start: start,
            end: end
        };
    }
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    getComputedStyle(element, attribute) {
        return parseInt(document.defaultView.getComputedStyle(element)[attribute], 10);
    }
    //TODO(dale): determine whether this is needed
    /**
     * @return {?}
     */
    calculateContainerWidth() {
        this.windowInnerWidth = window.innerWidth;
        /** @type {?} */
        const containerWidth = this.gridWidth - 18;
        return containerWidth;
    }
    /**
     * @return {?}
     */
    calculateContainerHeight() {
        /** @type {?} */
        const containerHeight = (innerHeight - 18);
        return containerHeight;
    }
    /**
     * @return {?}
     */
    calculateActivityContainerDimensions() {
        /** @type {?} */
        const scrollWidth = 18;
        this.windowInnerWidth = window.innerWidth;
        /** @type {?} */
        const width = window.innerWidth - this.gridWidth - scrollWidth;
        return { height: this.activityHeight, width: width };
    }
    /**
     * @param {?} elem
     * @return {?}
     */
    calculateGanttActivityWidth(elem) {
        return `calc(100% - ${(elem.offsetWidth + 1)}px)`;
    }
    /**
     * @param {?} elem
     * @return {?}
     */
    calculateGanttActivityHeight(elem) {
        return `${elem.offsetHeight}px`;
    }
    /**
     * Set the vertical scroll top positions for gantt
     * @param {?} verticalScrollElem
     * @param {?} ganttGridElem
     * @param {?} ganttActivityAreaElem
     * @return {?}
     */
    scrollTop(verticalScrollElem, ganttGridElem, ganttActivityAreaElem) {
        /** @type {?} */
        const verticalScrollTop = verticalScrollElem.scrollTop;
        /** @type {?} */
        const scroll = this.setScrollTop;
        // debounce
        if (verticalScrollTop !== null && verticalScrollTop !== undefined) {
            scroll(verticalScrollTop, ganttActivityAreaElem);
            scroll(ganttActivityAreaElem.scrollTop, ganttGridElem);
        }
    }
    /**
     * Group data by id , only supports one level
     * @param {?} tasks
     * @return {?}
     */
    groupData(tasks) {
        return tasks;
    }
    /**
     * Checks whether any new data needs to be added to task cache
     * @param {?} tasks
     * @param {?} scale
     * @return {?}
     */
    doTaskCheck(tasks, scale) {
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
    }
    /**
     * Set a id prefix so CSS3 query selector can work with ids that contain numbers
     * @param {?} id
     * @return {?}
     */
    setIdPrefix(id) {
        return `_${id}`;
    }
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
    setScrollTop(scrollTop, element) {
        if (element !== null && element !== undefined) {
            element.scrollTop = scrollTop;
        }
    }
}
GanttService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
GanttService.ctorParameters = () => [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZ2FudHQvIiwic291cmNlcyI6WyJsaWIvc2hhcmVkL3NlcnZpY2VzL2dhbnR0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBSXJELE1BQU0sT0FBTyxZQUFZO0lBZ0JyQjtRQWZPLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxrQkFBYSxHQUFHLEVBQUUsQ0FBQyxDQUFDLG9EQUFvRDs7UUFDeEUsbUJBQWMsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN6QyxjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QscUJBQWdCLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQixXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsY0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUs7O1FBQ3BCLGVBQVUsR0FBRyxHQUFHLENBQUM7O2NBS2QsV0FBVyxHQUFHLElBQUksV0FBVyxFQUFFO1FBRXJDLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQztRQUN2QyxJQUFJLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUM7UUFDdkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxXQUFXLENBQUMsY0FBYyxDQUFDO1FBQ2pELElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQztRQUN2QyxJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUM7UUFDL0MsSUFBSSxDQUFDLE1B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LGtDQUFrQztRQUVsQyx5Q0FBeUM7UUFDekMsZ0NBQWdDO1FBQ2hDLG9EQUFvRDtRQUNwRCw4QkFBOEI7UUFDOUIsK0JBQStCO1FBQy9CLE1BQU07UUFFTix3Q0FBd0M7UUFDeEMsa0NBQWtDO1FBQ2xDLE1BQU07UUFFTixpQ0FBaUM7UUFDakMsbUJBQW1CO1FBQ25CLElBQUk7UUFFSixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUV4QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFOUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQzs7Ozs7O0lBR00sV0FBVyxDQUFDLEVBQVU7UUFDekIsT0FBTyxJQUFJLEVBQUUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7Ozs7Ozs7Ozs7O0lBUU0sWUFBWSxDQUFDLFNBQWlCLEVBQUUsT0FBWTtRQUMvQyxJQUFJLE9BQU8sS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtZQUMzQyxPQUFPLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztTQUNqQztJQUNMLENBQUM7OztZQTVRSixVQUFVOzs7Ozs7SUFFUCxpQ0FBcUI7O0lBQ3JCLHFDQUEwQjs7SUFDMUIsc0NBQWdEOztJQUNoRCxpQ0FBcUI7O0lBQ3JCLHdDQUE0Qjs7SUFDNUIsc0NBQTBCOztJQUMxQixpQ0FBcUI7O0lBQ3JCLHFDQUF5Qjs7SUFDekIsOEJBQWtCOztJQUNsQixtQ0FBMkI7O0lBQzNCLGlDQUFxQjs7SUFDckIsa0NBQXdCOztJQUN4QixrQ0FBeUI7O0lBQ3pCLGtDQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgR2FudHRDb25maWcgfSBmcm9tICcuL2dhbnR0LWNvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVGFzaywgSVNjYWxlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBHYW50dFNlcnZpY2Uge1xyXG4gICAgcHVibGljIHJvd0hlaWdodCA9IDA7XHJcbiAgICBwdWJsaWMgaG91ckNlbGxXaWR0aCA9IDYwOyAvLyBjaGFuZ2UgdG8gNjAgc28gbWludXRlcyBjYW4gYmVlbiBzZWVuIG1vcmUgZWFzaWx5XHJcbiAgICBwdWJsaWMgaG91cnNDZWxsV2lkdGggPSB0aGlzLmhvdXJDZWxsV2lkdGggKiAyNTtcclxuICAgIHB1YmxpYyBjZWxsV2lkdGggPSAwO1xyXG4gICAgcHVibGljIHdpbmRvd0lubmVyV2lkdGggPSAwO1xyXG4gICAgcHVibGljIGFjdGl2aXR5SGVpZ2h0ID0gMDtcclxuICAgIHB1YmxpYyBiYXJIZWlnaHQgPSAwO1xyXG4gICAgcHVibGljIGJhckxpbmVIZWlnaHQgPSAwO1xyXG4gICAgcHVibGljIGJhclRvcCA9IDA7XHJcbiAgICBwdWJsaWMgYmFyTW92ZWFibGUgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBncmlkV2lkdGggPSAwOyAvLzE4OFxyXG4gICAgcHVibGljIGdyaWRIZWlnaHQgPSAzMzI7XHJcbiAgICBwdWJsaWMgVEFTS19DQUNIRTogYW55W107XHJcbiAgICBwdWJsaWMgVElNRV9TQ0FMRTogYW55W107XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgY29uc3QgZ2FudHRDb25maWcgPSBuZXcgR2FudHRDb25maWcoKTtcclxuXHJcbiAgICAgICAgdGhpcy5yb3dIZWlnaHQgPSBnYW50dENvbmZpZy5yb3dIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5jZWxsV2lkdGggPSBnYW50dENvbmZpZy5jZWxsV2lkdGg7XHJcbiAgICAgICAgdGhpcy5hY3Rpdml0eUhlaWdodCA9IGdhbnR0Q29uZmlnLmFjdGl2aXR5SGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuYmFySGVpZ2h0ID0gZ2FudHRDb25maWcuYmFySGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuYmFyTGluZUhlaWdodCA9IGdhbnR0Q29uZmlnLmJhckxpbmVIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5iYXJUb3AgPSBnYW50dENvbmZpZy5yb3dIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5iYXJNb3ZlYWJsZSA9IGdhbnR0Q29uZmlnLmJhck1vdmVhYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlQmFyV2lkdGgoc3RhcnQ6IERhdGUsIGVuZDogRGF0ZSk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzdGFydCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgc3RhcnQgPSBuZXcgRGF0ZShzdGFydCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGVuZCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgZW5kID0gbmV3IERhdGUoZW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGRheXMgPSB0aGlzLmNhbGN1bGF0ZURpZmZEYXlzKHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgIGNvbnN0IHdpZHRoOiBudW1iZXIgPSAoZGF5cyAvIDcgKiB0aGlzLmNlbGxXaWR0aCArIGRheXMgLyA3KTtcclxuICAgICAgICByZXR1cm4gd2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVCYXJMZWZ0KHN0YXJ0OiBEYXRlLCBzY2FsZTogYW55W10pOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBsZWZ0ID0gMDtcclxuXHJcbiAgICAgICAgaWYgKHN0YXJ0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdGFydCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzY2FsZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKChzdGFydC5nZXRUaW1lKCkgPj0gc2NhbGVbaV0uZ2V0VGltZSgpICYmIHN0YXJ0LmdldFRpbWUoKSA8IHNjYWxlW2kgKyAxXS5nZXRUaW1lKCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IGkgKiB0aGlzLmNlbGxXaWR0aCArIGkgKyB0aGlzLmNhbGN1bGF0ZUJhckxlZnREZWx0YShzdGFydCkgKyAoKDcgLyAoc2NhbGVbaSArIDFdLmdldERhdGUoKSAtIHN0YXJ0LmdldERhdGUoKSkgLyA3KSAqIHRoaXMuY2VsbFdpZHRoKSAtIHRoaXMuY2VsbFdpZHRoIC8gNztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGVmdDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlcyB0aGUgaGVpZ2h0IG9mIHRoZSBnYW50dCBncmlkLCBhY3Rpdml0eSBhbmQgdmVydGljYWwgc2Nyb2xsICovXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlR2FudHRIZWlnaHQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gYCR7dGhpcy5UQVNLX0NBQ0hFLmxlbmd0aCAqIHRoaXMucm93SGVpZ2h0fXB4YDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZUJhckxlZnREZWx0YShzdGFydDogRGF0ZSk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IG9mZnNldCA9IDA7XHJcbiAgICAgICAgY29uc3QgaG91cnNJbkRheSA9IDI0O1xyXG4gICAgICAgIGNvbnN0IG1pbnV0ZXNJbkhvdXIgPSA2MDtcclxuICAgICAgICBjb25zdCBzZWNvbmRzSW5Ib3VyID0gMzYwMDtcclxuICAgICAgICBjb25zdCBzdGFydEhvdXJzOiBudW1iZXIgPVxyXG4gICAgICAgICAgICBzdGFydC5nZXRIb3VycygpICsgc3RhcnQuZ2V0TWludXRlcygpIC8gbWludXRlc0luSG91ciArIHN0YXJ0LmdldFNlY29uZHMoKSAvIHNlY29uZHNJbkhvdXI7XHJcblxyXG4gICAgICAgIG9mZnNldCA9IHRoaXMuY2VsbFdpZHRoIC8gaG91cnNJbkRheSAqIHN0YXJ0SG91cnM7XHJcbiAgICAgICAgcmV0dXJuIG9mZnNldDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlIHRoZSBiYXIgc3R5bGVzICovXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlQmFyKHRhc2s6IGFueSwgaW5kZXg6IG51bWJlciwgc2NhbGU6IGFueSkge1xyXG4gICAgICAgIGNvbnN0IGJhclN0eWxlID0gdGhpcy5nZXRCYXJTdHlsZSh0YXNrLmNvbG9yKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAndG9wJzogdGhpcy5iYXJUb3AgKiBpbmRleCArIDIgKyAncHgnLFxyXG4gICAgICAgICAgICAnbGVmdCc6IHRoaXMuY2FsY3VsYXRlQmFyTGVmdCh0YXNrLnN0YXJ0LCBzY2FsZSkgKyAncHgnLFxyXG4gICAgICAgICAgICAnaGVpZ2h0JzogdGhpcy5iYXJIZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAnbGluZS1oZWlnaHQnOiB0aGlzLmJhckxpbmVIZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAnd2lkdGgnOiB0aGlzLmNhbGN1bGF0ZUJhcldpZHRoKHRhc2suc3RhcnQsIHRhc2suZW5kKSArICdweCcsXHJcbiAgICAgICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogYmFyU3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdLFxyXG4gICAgICAgICAgICAnYm9yZGVyLWxlZnQnOiBiYXJTdHlsZVtcImJvcmRlci1sZWZ0XCJdXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogR2V0IHRoZSBiYXIgc3R5bGUgYmFzZWQgb24gdGFzayBzdGF0dXMgKi9cclxuICAgIHByaXZhdGUgZ2V0QmFyU3R5bGUoY29sb3I6IGFueSk6IGFueSB7XHJcbiAgICAgICAgY29uc3Qgc3R5bGUgPSB7fTtcclxuICAgICAgICBzdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0gPSBjb2xvci5zZWNvbmRhcnk7XHJcbiAgICAgICAgc3R5bGVbXCJib3JkZXItbGVmdFwiXSA9IGA1cHggc29saWQgJHtjb2xvci5wcmltYXJ5fWA7XHJcblxyXG4gICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlcyB0aGUgZGlmZmVyZW5jZSBpbiB0d28gZGF0ZXMgYW5kIHJldHVybnMgbnVtYmVyIG9mIGRheXMgKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVEaWZmRGF5cyhzdGFydDogRGF0ZSwgZW5kOiBEYXRlKTogbnVtYmVyIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBvbmVEYXkgPSAyNCAqIDYwICogNjAgKiAxMDAwOyAvLyBob3VycyptaW51dGVzKnNlY29uZHMqbWlsbGlzZWNvbmRzIC9tc1xyXG4gICAgICAgICAgICBjb25zdCBkaWZmRGF5cyA9IE1hdGguYWJzKChzdGFydC5nZXRUaW1lKCkgLSBlbmQuZ2V0VGltZSgpKSAvIChvbmVEYXkpKTtcclxuICAgICAgICAgICAgY29uc3QgZGF5cyA9IGRpZmZEYXlzOyAvLyBkb24ndCB1c2UgTWF0aC5yb3VuZCBhcyBpdCB3aWxsIGRyYXcgYW4gaW5jb3JyZWN0IGJhclxyXG4gICAgICAgICAgICByZXR1cm4gZGF5cztcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDYWxjdWxhdGUgdGhlIGdhbnR0IHNjYWxlIHJhbmdlIGdpdmVuIHRoZSBzdGFydCBhbmQgZW5kIGRhdGUgb2YgdGFza3MqL1xyXG4gICAgcHVibGljIGNhbGN1bGF0ZVNjYWxlKHN0YXJ0OiBEYXRlID0gbmV3IERhdGUoKSwgZW5kOiBEYXRlID0gdGhpcy5hZGREYXlzKHN0YXJ0LCA3KSkge1xyXG4gICAgICAgIGNvbnN0IHNjYWxlOiBhbnlbXSA9IFtdO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHdoaWxlIChzdGFydC5nZXRUaW1lKCkgPD0gZW5kLmdldFRpbWUoKSkge1xyXG4gICAgICAgICAgICAgICAgc2NhbGUucHVzaChzdGFydCk7XHJcbiAgICAgICAgICAgICAgICBzdGFydCA9IHRoaXMuYWRkRGF5cyhzdGFydCwgNyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHNjYWxlO1xyXG5cclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNjYWxlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogRGV0ZXJtaW5lcyB3aGV0aGVyIGdpdmVuIGRhdGUgaXMgYSB3ZWVrZW5kICovXHJcbiAgICBwdWJsaWMgaXNEYXlXZWVrZW5kKGRhdGU6IERhdGUpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCBkYXkgPSBkYXRlLmdldERheSgpO1xyXG4gICAgICAgIGlmIChkYXkgPT09IDYgfHwgZGF5ID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEFkZCB4IG51bWJlciBvZiBkYXlzIHRvIGEgZGF0ZSBvYmplY3QgKi9cclxuICAgIHB1YmxpYyBhZGREYXlzKGRhdGU6IERhdGUsIGRheXM6IG51bWJlcik6IERhdGUge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBEYXRlKGRhdGUpO1xyXG4gICAgICAgIHJlc3VsdC5zZXREYXRlKHJlc3VsdC5nZXREYXRlKCkgKyBkYXlzKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8vKiogUmVtb3ZlIHggbnVtYmVyIG9mIGRheXMgZnJvbSBhIGRhdGUgb2JqZWN0ICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlRGF5cyhkYXRlOiBEYXRlLCBkYXlzOiBudW1iZXIpOiBEYXRlIHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgRGF0ZShkYXRlKTtcclxuICAgICAgICByZXN1bHQuc2V0RGF0ZShyZXN1bHQuZ2V0RGF0ZSgpIC0gZGF5cyk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlcyB0aGUgZ3JpZCBzY2FsZSBmb3IgZ2FudHQgYmFzZWQgb24gdGFza3Mgc3RhcnQgYW5kIGVuZCBkYXRlcyAqL1xyXG4gICAgcHVibGljIGNhbGN1bGF0ZUdyaWRTY2FsZSh0YXNrczogVGFza1tdKTogSVNjYWxlIHtcclxuICAgICAgICBsZXQgc3RhcnQ6IERhdGU7XHJcbiAgICAgICAgbGV0IGVuZDogRGF0ZTtcclxuICAgICAgICBjb25zdCBkYXRlcyA9IHRhc2tzLm1hcCgodGFzazogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBzdGFydDogbmV3IERhdGUodGFzay5zdGFydCksXHJcbiAgICAgICAgICAgICAgICBlbmQ6IG5ldyBEYXRlKHRhc2suZW5kKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzdGFydCA9IG5ldyBEYXRlKE1hdGgubWluLmFwcGx5KG51bGwsIGRhdGVzLm1hcCgodCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdC5zdGFydDtcclxuICAgICAgICB9KSkpO1xyXG5cclxuICAgICAgICBlbmQgPSBuZXcgRGF0ZShNYXRoLm1heC5hcHBseShudWxsLCBkYXRlcy5tYXAoKHQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHQuZW5kO1xyXG4gICAgICAgIH0pKSk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcclxuICAgICAgICAgICAgZW5kOiBlbmRcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQ6IGFueSwgYXR0cmlidXRlOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gcGFyc2VJbnQoZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KVthdHRyaWJ1dGVdLCAxMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPKGRhbGUpOiBkZXRlcm1pbmUgd2hldGhlciB0aGlzIGlzIG5lZWRlZFxyXG4gICAgcHVibGljIGNhbGN1bGF0ZUNvbnRhaW5lcldpZHRoKCk6IG51bWJlciB7XHJcbiAgICAgICAgdGhpcy53aW5kb3dJbm5lcldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyV2lkdGggPSB0aGlzLmdyaWRXaWR0aCAtIDE4O1xyXG4gICAgICAgIHJldHVybiBjb250YWluZXJXaWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlQ29udGFpbmVySGVpZ2h0KCk6IG51bWJlciB7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVySGVpZ2h0ID0gKGlubmVySGVpZ2h0IC0gMTgpO1xyXG4gICAgICAgIHJldHVybiBjb250YWluZXJIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbGN1bGF0ZUFjdGl2aXR5Q29udGFpbmVyRGltZW5zaW9ucygpOiBhbnkge1xyXG4gICAgICAgIGNvbnN0IHNjcm9sbFdpZHRoID0gMTg7XHJcbiAgICAgICAgdGhpcy53aW5kb3dJbm5lcldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgY29uc3Qgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCAtIHRoaXMuZ3JpZFdpZHRoIC0gc2Nyb2xsV2lkdGg7XHJcblxyXG4gICAgICAgIHJldHVybiB7IGhlaWdodDogdGhpcy5hY3Rpdml0eUhlaWdodCwgd2lkdGg6IHdpZHRoIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbGN1bGF0ZUdhbnR0QWN0aXZpdHlXaWR0aChlbGVtOiBIVE1MRWxlbWVudCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIGBjYWxjKDEwMCUgLSAkeyhlbGVtLm9mZnNldFdpZHRoICsgMSl9cHgpYDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlR2FudHRBY3Rpdml0eUhlaWdodChlbGVtOiBIVE1MRWxlbWVudCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIGAke2VsZW0ub2Zmc2V0SGVpZ2h0fXB4YDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogU2V0IHRoZSB2ZXJ0aWNhbCBzY3JvbGwgdG9wIHBvc2l0aW9ucyBmb3IgZ2FudHQgKi9cclxuICAgIHB1YmxpYyBzY3JvbGxUb3AodmVydGljYWxTY3JvbGxFbGVtOiBhbnksIGdhbnR0R3JpZEVsZW06IGFueSwgZ2FudHRBY3Rpdml0eUFyZWFFbGVtOiBhbnkpIHtcclxuICAgICAgICBjb25zdCB2ZXJ0aWNhbFNjcm9sbFRvcCA9IHZlcnRpY2FsU2Nyb2xsRWxlbS5zY3JvbGxUb3A7XHJcbiAgICAgICAgY29uc3Qgc2Nyb2xsID0gdGhpcy5zZXRTY3JvbGxUb3A7XHJcblxyXG4gICAgICAgIC8vIGRlYm91bmNlXHJcbiAgICAgICAgaWYgKHZlcnRpY2FsU2Nyb2xsVG9wICE9PSBudWxsICYmIHZlcnRpY2FsU2Nyb2xsVG9wICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgc2Nyb2xsKHZlcnRpY2FsU2Nyb2xsVG9wLCBnYW50dEFjdGl2aXR5QXJlYUVsZW0pO1xyXG4gICAgICAgICAgICBzY3JvbGwoZ2FudHRBY3Rpdml0eUFyZWFFbGVtLnNjcm9sbFRvcCwgZ2FudHRHcmlkRWxlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBHcm91cCBkYXRhIGJ5IGlkICwgb25seSBzdXBwb3J0cyBvbmUgbGV2ZWwqL1xyXG4gICAgcHVibGljIGdyb3VwRGF0YSh0YXNrczogYW55KTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGFza3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENoZWNrcyB3aGV0aGVyIGFueSBuZXcgZGF0YSBuZWVkcyB0byBiZSBhZGRlZCB0byB0YXNrIGNhY2hlICAqL1xyXG4gICAgcHVibGljIGRvVGFza0NoZWNrKHRhc2tzOiBhbnlbXSwgc2NhbGU6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8vIGNvbnN0IGNhY2hlZFRhc2tJZHMgPSB0aGlzLlRBU0tfQ0FDSEUubWFwKCh0YXNrOiBhbnkpID0+IHsgcmV0dXJuIHRhc2suaWQgfSk7XHJcbiAgICAgICAgLy8gY29uc3QgaXRlbXNUb0NhY2hlOiBhbnlbXSA9IFtdO1xyXG5cclxuICAgICAgICAvLyBvbmx5IGxvb2sgYXQgdGFza3MgdGhhdCBhcmUgbm90IGNhY2hlZFxyXG4gICAgICAgIC8vIHRhc2tzLmZpbHRlcigodGFzazogYW55KSA9PiB7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiBjYWNoZWRUYXNrSWRzLmluZGV4T2YodGFzay5pZCkgPT09IC0xO1xyXG4gICAgICAgIC8vIH0pLmZvckVhY2goKHRhc2s6IGFueSkgPT4ge1xyXG4gICAgICAgIC8vICAgICBpdGVtc1RvQ2FjaGUucHVzaCh0YXNrKTtcclxuICAgICAgICAvLyB9KTtcclxuXHJcbiAgICAgICAgLy8gaXRlbXNUb0NhY2hlLmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgIC8vICAgICB0aGlzLlRBU0tfQ0FDSEUucHVzaChpdGVtKTtcclxuICAgICAgICAvLyB9KTtcclxuXHJcbiAgICAgICAgLy8gaWYgKGl0ZW1zVG9DYWNoZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgdGhpcy5UQVNLX0NBQ0hFID0gdGFza3M7XHJcblxyXG4gICAgICAgIHRoaXMuVElNRV9TQ0FMRSA9IHRoaXMuY2FsY3VsYXRlU2NhbGUoc2NhbGUuc3RhcnQsIHNjYWxlLmVuZCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBTZXQgYSBpZCBwcmVmaXggc28gQ1NTMyBxdWVyeSBzZWxlY3RvciBjYW4gd29yayB3aXRoIGlkcyB0aGF0IGNvbnRhaW4gbnVtYmVycyAqL1xyXG4gICAgcHVibGljIHNldElkUHJlZml4KGlkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBgXyR7aWR9YDtcclxuICAgIH1cclxuXHJcbiAgICAvLyAvKiogUmVtb3ZlIHRoZSBpZCBwcmVmaXggdG8gYWxsb3cgcXVlcnlpbmcgb2YgZGF0YSAqL1xyXG4gICAgLy8gcHVibGljIHJlbW92ZUlkUHJlZml4KGlkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgLy8gICAgIHJldHVybiBpZC5zdWJzdHJpbmcoMSwgaWQubGVuZ3RoIC0gMSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLyoqIFNldCB0aGUgc2Nyb2xsIHRvcCBwcm9wZXJ0eSBvZiBhIG5hdGl2ZSBET00gZWxlbWVudCAqL1xyXG4gICAgcHVibGljIHNldFNjcm9sbFRvcChzY3JvbGxUb3A6IG51bWJlciwgZWxlbWVudDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQgIT09IG51bGwgJiYgZWxlbWVudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=