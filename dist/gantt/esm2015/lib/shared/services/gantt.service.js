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
     * @param {?=} start
     * @param {?=} end
     * @return {?}
     */
    calculateMonthScale(start = new Date(), end = this.addDays(start, 7)) {
        /** @type {?} */
        let scale = [];
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
     * @param {?} minDate
     * @param {?} maxDate
     * @return {?}
     */
    calculateCellMonthWidth(minDate, maxDate) {
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
    }
    /**
     * @private
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    calculateDiffMonths(start, end) {
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
        this.MONTH_SCALE = this.calculateMonthScale(scale.start, scale.end);
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
    /** @type {?} */
    GanttService.prototype.MONTH_SCALE;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZ2FudHQvIiwic291cmNlcyI6WyJsaWIvc2hhcmVkL3NlcnZpY2VzL2dhbnR0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBSXJELE1BQU0sT0FBTyxZQUFZO0lBaUJyQjtRQWhCTyxjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2Qsa0JBQWEsR0FBRyxFQUFFLENBQUMsQ0FBQyxvREFBb0Q7O1FBQ3hFLG1CQUFjLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDekMsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLHFCQUFnQixHQUFHLENBQUMsQ0FBQztRQUNyQixtQkFBYyxHQUFHLENBQUMsQ0FBQztRQUNuQixjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2Qsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFDbEIsV0FBTSxHQUFHLENBQUMsQ0FBQztRQUNYLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLOztRQUNwQixlQUFVLEdBQUcsR0FBRyxDQUFDOztjQU1kLFdBQVcsR0FBRyxJQUFJLFdBQVcsRUFBRTtRQUVyQyxJQUFJLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUM7UUFDdkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxjQUFjLEdBQUcsV0FBVyxDQUFDLGNBQWMsQ0FBQztRQUNqRCxJQUFJLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUM7UUFDdkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUMsYUFBYSxDQUFDO1FBQy9DLElBQUksQ0FBQyxN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O1FBQ2hDLG9EQUFvRDtRQUNwRCw4QkFBOEI7UUFDOUIsK0JBQStCO1FBQy9CLE1BQU07UUFFTix3Q0FBd0M7UUFDeEMsa0NBQWtDO1FBQ2xDLE1BQU07UUFFTixpQ0FBaUM7UUFDakMsbUJBQW1CO1FBQ25CLElBQUk7UUFFSixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUV4QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFcEUsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQzs7Ozs7O0lBR00sV0FBVyxDQUFDLEVBQVU7UUFDekIsT0FBTyxJQUFJLEVBQUUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7Ozs7Ozs7Ozs7O0lBUU0sWUFBWSxDQUFDLFNBQWlCLEVBQUUsT0FBWTtRQUMvQyxJQUFJLE9BQU8sS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtZQUMzQyxPQUFPLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztTQUNqQztJQUNMLENBQUM7OztZQTdUSixVQUFVOzs7Ozs7SUFFUCxpQ0FBcUI7O0lBQ3JCLHFDQUEwQjs7SUFDMUIsc0NBQWdEOztJQUNoRCxpQ0FBcUI7O0lBQ3JCLHdDQUE0Qjs7SUFDNUIsc0NBQTBCOztJQUMxQixpQ0FBcUI7O0lBQ3JCLHFDQUF5Qjs7SUFDekIsOEJBQWtCOztJQUNsQixtQ0FBMkI7O0lBQzNCLGlDQUFxQjs7SUFDckIsa0NBQXdCOztJQUN4QixrQ0FBeUI7O0lBQ3pCLGtDQUF5Qjs7SUFDekIsbUNBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBHYW50dENvbmZpZyB9IGZyb20gJy4vZ2FudHQtY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUYXNrLCBJU2NhbGUgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdhbnR0U2VydmljZSB7XHJcbiAgICBwdWJsaWMgcm93SGVpZ2h0ID0gMDtcclxuICAgIHB1YmxpYyBob3VyQ2VsbFdpZHRoID0gNjA7IC8vIGNoYW5nZSB0byA2MCBzbyBtaW51dGVzIGNhbiBiZWVuIHNlZW4gbW9yZSBlYXNpbHlcclxuICAgIHB1YmxpYyBob3Vyc0NlbGxXaWR0aCA9IHRoaXMuaG91ckNlbGxXaWR0aCAqIDI1O1xyXG4gICAgcHVibGljIGNlbGxXaWR0aCA9IDA7XHJcbiAgICBwdWJsaWMgd2luZG93SW5uZXJXaWR0aCA9IDA7XHJcbiAgICBwdWJsaWMgYWN0aXZpdHlIZWlnaHQgPSAwO1xyXG4gICAgcHVibGljIGJhckhlaWdodCA9IDA7XHJcbiAgICBwdWJsaWMgYmFyTGluZUhlaWdodCA9IDA7XHJcbiAgICBwdWJsaWMgYmFyVG9wID0gMDtcclxuICAgIHB1YmxpYyBiYXJNb3ZlYWJsZSA9IGZhbHNlO1xyXG4gICAgcHVibGljIGdyaWRXaWR0aCA9IDA7IC8vMTg4XHJcbiAgICBwdWJsaWMgZ3JpZEhlaWdodCA9IDMzMjtcclxuICAgIHB1YmxpYyBUQVNLX0NBQ0hFOiBhbnlbXTtcclxuICAgIHB1YmxpYyBUSU1FX1NDQUxFOiBhbnlbXTtcclxuICAgIHB1YmxpYyBNT05USF9TQ0FMRTogYW55W107XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgY29uc3QgZ2FudHRDb25maWcgPSBuZXcgR2FudHRDb25maWcoKTtcclxuXHJcbiAgICAgICAgdGhpcy5yb3dIZWlnaHQgPSBnYW50dENvbmZpZy5yb3dIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5jZWxsV2lkdGggPSBnYW50dENvbmZpZy5jZWxsV2lkdGg7XHJcbiAgICAgICAgdGhpcy5hY3Rpdml0eUhlaWdodCA9IGdhbnR0Q29uZmlnLmFjdGl2aXR5SGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuYmFySGVpZ2h0ID0gZ2FudHRDb25maWcuYmFySGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuYmFyTGluZUhlaWdodCA9IGdhbnR0Q29uZmlnLmJhckxpbmVIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5iYXJUb3AgPSBnYW50dENvbmZpZy5yb3dIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5iYXJNb3ZlYWJsZSA9IGdhbnR0Q29uZmlnLmJhck1vdmVhYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlQmFyV2lkdGgoc3RhcnQ6IERhdGUsIGVuZDogRGF0ZSk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzdGFydCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgc3RhcnQgPSBuZXcgRGF0ZShzdGFydCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGVuZCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgZW5kID0gbmV3IERhdGUoZW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGRheXMgPSB0aGlzLmNhbGN1bGF0ZURpZmZEYXlzKHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgIGNvbnN0IHdpZHRoOiBudW1iZXIgPSAoZGF5cyAvIDcgKiB0aGlzLmNlbGxXaWR0aCArIGRheXMgLyA3KTtcclxuICAgICAgICByZXR1cm4gd2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVCYXJMZWZ0KHN0YXJ0OiBEYXRlLCBzY2FsZTogYW55W10pOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBsZWZ0ID0gMDtcclxuXHJcbiAgICAgICAgaWYgKHN0YXJ0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdGFydCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzY2FsZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKChzdGFydC5nZXRUaW1lKCkgPj0gc2NhbGVbaV0uZ2V0VGltZSgpICYmIHN0YXJ0LmdldFRpbWUoKSA8IHNjYWxlW2kgKyAxXS5nZXRUaW1lKCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IGkgKiB0aGlzLmNlbGxXaWR0aCArIGkgKyB0aGlzLmNhbGN1bGF0ZUJhckxlZnREZWx0YShzdGFydCkgKyAoKDcgLyAoc2NhbGVbaSArIDFdLmdldERhdGUoKSAtIHN0YXJ0LmdldERhdGUoKSkgLyA3KSAqIHRoaXMuY2VsbFdpZHRoKSAtIHRoaXMuY2VsbFdpZHRoIC8gNztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGVmdDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlcyB0aGUgaGVpZ2h0IG9mIHRoZSBnYW50dCBncmlkLCBhY3Rpdml0eSBhbmQgdmVydGljYWwgc2Nyb2xsICovXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlR2FudHRIZWlnaHQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gYCR7dGhpcy5UQVNLX0NBQ0hFLmxlbmd0aCAqIHRoaXMucm93SGVpZ2h0fXB4YDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZUJhckxlZnREZWx0YShzdGFydDogRGF0ZSk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IG9mZnNldCA9IDA7XHJcbiAgICAgICAgY29uc3QgaG91cnNJbkRheSA9IDI0O1xyXG4gICAgICAgIGNvbnN0IG1pbnV0ZXNJbkhvdXIgPSA2MDtcclxuICAgICAgICBjb25zdCBzZWNvbmRzSW5Ib3VyID0gMzYwMDtcclxuICAgICAgICBjb25zdCBzdGFydEhvdXJzOiBudW1iZXIgPVxyXG4gICAgICAgICAgICBzdGFydC5nZXRIb3VycygpICsgc3RhcnQuZ2V0TWludXRlcygpIC8gbWludXRlc0luSG91ciArIHN0YXJ0LmdldFNlY29uZHMoKSAvIHNlY29uZHNJbkhvdXI7XHJcblxyXG4gICAgICAgIG9mZnNldCA9IHRoaXMuY2VsbFdpZHRoIC8gaG91cnNJbkRheSAqIHN0YXJ0SG91cnM7XHJcbiAgICAgICAgcmV0dXJuIG9mZnNldDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlIHRoZSBiYXIgc3R5bGVzICovXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlQmFyKHRhc2s6IGFueSwgaW5kZXg6IG51bWJlciwgc2NhbGU6IGFueSkge1xyXG4gICAgICAgIGNvbnN0IGJhclN0eWxlID0gdGhpcy5nZXRCYXJTdHlsZSh0YXNrLmNvbG9yKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAndG9wJzogdGhpcy5iYXJUb3AgKiBpbmRleCArIDIgKyAncHgnLFxyXG4gICAgICAgICAgICAnbGVmdCc6IHRoaXMuY2FsY3VsYXRlQmFyTGVmdCh0YXNrLnN0YXJ0LCBzY2FsZSkgKyAncHgnLFxyXG4gICAgICAgICAgICAnaGVpZ2h0JzogdGhpcy5iYXJIZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAnbGluZS1oZWlnaHQnOiB0aGlzLmJhckxpbmVIZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAnd2lkdGgnOiB0aGlzLmNhbGN1bGF0ZUJhcldpZHRoKHRhc2suc3RhcnQsIHRhc2suZW5kKSArICdweCcsXHJcbiAgICAgICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogYmFyU3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdLFxyXG4gICAgICAgICAgICAnYm9yZGVyLWxlZnQnOiBiYXJTdHlsZVtcImJvcmRlci1sZWZ0XCJdXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogR2V0IHRoZSBiYXIgc3R5bGUgYmFzZWQgb24gdGFzayBzdGF0dXMgKi9cclxuICAgIHByaXZhdGUgZ2V0QmFyU3R5bGUoY29sb3I6IGFueSk6IGFueSB7XHJcbiAgICAgICAgY29uc3Qgc3R5bGUgPSB7fTtcclxuICAgICAgICBzdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0gPSBjb2xvci5zZWNvbmRhcnk7XHJcbiAgICAgICAgc3R5bGVbXCJib3JkZXItbGVmdFwiXSA9IGA1cHggc29saWQgJHtjb2xvci5wcmltYXJ5fWA7XHJcblxyXG4gICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlcyB0aGUgZGlmZmVyZW5jZSBpbiB0d28gZGF0ZXMgYW5kIHJldHVybnMgbnVtYmVyIG9mIGRheXMgKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVEaWZmRGF5cyhzdGFydDogRGF0ZSwgZW5kOiBEYXRlKTogbnVtYmVyIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBvbmVEYXkgPSAyNCAqIDYwICogNjAgKiAxMDAwOyAvLyBob3VycyptaW51dGVzKnNlY29uZHMqbWlsbGlzZWNvbmRzIC9tc1xyXG4gICAgICAgICAgICBjb25zdCBkaWZmRGF5cyA9IE1hdGguYWJzKChzdGFydC5nZXRUaW1lKCkgLSBlbmQuZ2V0VGltZSgpKSAvIChvbmVEYXkpKTtcclxuICAgICAgICAgICAgY29uc3QgZGF5cyA9IGRpZmZEYXlzOyAvLyBkb24ndCB1c2UgTWF0aC5yb3VuZCBhcyBpdCB3aWxsIGRyYXcgYW4gaW5jb3JyZWN0IGJhclxyXG4gICAgICAgICAgICByZXR1cm4gZGF5cztcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDYWxjdWxhdGUgdGhlIGdhbnR0IHNjYWxlIHJhbmdlIGdpdmVuIHRoZSBzdGFydCBhbmQgZW5kIGRhdGUgb2YgdGFza3MqL1xyXG4gICAgcHVibGljIGNhbGN1bGF0ZVNjYWxlKHN0YXJ0OiBEYXRlID0gbmV3IERhdGUoKSwgZW5kOiBEYXRlID0gdGhpcy5hZGREYXlzKHN0YXJ0LCA3KSkge1xyXG4gICAgICAgIGNvbnN0IHNjYWxlOiBhbnlbXSA9IFtdO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHdoaWxlIChzdGFydC5nZXRUaW1lKCkgPD0gZW5kLmdldFRpbWUoKSkge1xyXG4gICAgICAgICAgICAgICAgc2NhbGUucHVzaChzdGFydCk7XHJcbiAgICAgICAgICAgICAgICBzdGFydCA9IHRoaXMuYWRkRGF5cyhzdGFydCwgNyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHNjYWxlO1xyXG5cclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNjYWxlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlTW9udGhTY2FsZShzdGFydDogRGF0ZSA9IG5ldyBEYXRlKCksIGVuZDogRGF0ZSA9IHRoaXMuYWRkRGF5cyhzdGFydCwgNykpIHtcclxuICAgICAgICBsZXQgc2NhbGU6IGFueVtdID0gW107XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gd2hpbGUgKHN0YXJ0LmdldFRpbWUoKSA8PSBlbmQuZ2V0VGltZSgpKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBzY2FsZS5wdXNoKHsgc3RhcnQ6IHN0YXJ0LCB3aWR0aDogdGhpcy5jYWxjdWxhdGVDZWxsTW9udGhXaWR0aChzdGFydCwgZW5kKSB9KTtcclxuICAgICAgICAgICAgLy8gICAgIHN0YXJ0ID0gdGhpcy5hZGREYXlzKHN0YXJ0LCBuZXcgRGF0ZShzdGFydC5nZXRGdWxsWWVhcigpLCBzdGFydC5nZXRNb250aCgpICsgMSwgMCkuZ2V0RGF0ZSgpKTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICBzY2FsZSA9IHRoaXMuY2FsY3VsYXRlQ2VsbE1vbnRoV2lkdGgoc3RhcnQsIGVuZCk7XHJcbiAgICAgICAgICAgIHJldHVybiBzY2FsZTtcclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzY2FsZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIERldGVybWluZXMgd2hldGhlciBnaXZlbiBkYXRlIGlzIGEgd2Vla2VuZCAqL1xyXG4gICAgcHVibGljIGlzRGF5V2Vla2VuZChkYXRlOiBEYXRlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgZGF5ID0gZGF0ZS5nZXREYXkoKTtcclxuICAgICAgICBpZiAoZGF5ID09PSA2IHx8IGRheSA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBBZGQgeCBudW1iZXIgb2YgZGF5cyB0byBhIGRhdGUgb2JqZWN0ICovXHJcbiAgICBwdWJsaWMgYWRkRGF5cyhkYXRlOiBEYXRlLCBkYXlzOiBudW1iZXIpOiBEYXRlIHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgRGF0ZShkYXRlKTtcclxuICAgICAgICByZXN1bHQuc2V0RGF0ZShyZXN1bHQuZ2V0RGF0ZSgpICsgZGF5cyk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvLyoqIFJlbW92ZSB4IG51bWJlciBvZiBkYXlzIGZyb20gYSBkYXRlIG9iamVjdCAqL1xyXG4gICAgcHVibGljIHJlbW92ZURheXMoZGF0ZTogRGF0ZSwgZGF5czogbnVtYmVyKTogRGF0ZSB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGUoZGF0ZSk7XHJcbiAgICAgICAgcmVzdWx0LnNldERhdGUocmVzdWx0LmdldERhdGUoKSAtIGRheXMpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENhbGN1bGF0ZXMgdGhlIGdyaWQgc2NhbGUgZm9yIGdhbnR0IGJhc2VkIG9uIHRhc2tzIHN0YXJ0IGFuZCBlbmQgZGF0ZXMgKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVHcmlkU2NhbGUodGFza3M6IFRhc2tbXSk6IElTY2FsZSB7XHJcbiAgICAgICAgbGV0IHN0YXJ0OiBEYXRlO1xyXG4gICAgICAgIGxldCBlbmQ6IERhdGU7XHJcbiAgICAgICAgY29uc3QgZGF0ZXMgPSB0YXNrcy5tYXAoKHRhc2s6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgc3RhcnQ6IG5ldyBEYXRlKHRhc2suc3RhcnQpLFxyXG4gICAgICAgICAgICAgICAgZW5kOiBuZXcgRGF0ZSh0YXNrLmVuZClcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc3RhcnQgPSBuZXcgRGF0ZShNYXRoLm1pbi5hcHBseShudWxsLCBkYXRlcy5tYXAoKHQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHQuc3RhcnQ7XHJcbiAgICAgICAgfSkpKTtcclxuXHJcbiAgICAgICAgZW5kID0gbmV3IERhdGUoTWF0aC5tYXguYXBwbHkobnVsbCwgZGF0ZXMubWFwKCh0KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0LmVuZDtcclxuICAgICAgICB9KSkpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzdGFydDogc3RhcnQsXHJcbiAgICAgICAgICAgIGVuZDogZW5kXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50OiBhbnksIGF0dHJpYnV0ZTogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudClbYXR0cmlidXRlXSwgMTApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETyhkYWxlKTogZGV0ZXJtaW5lIHdoZXRoZXIgdGhpcyBpcyBuZWVkZWRcclxuICAgIHB1YmxpYyBjYWxjdWxhdGVDb250YWluZXJXaWR0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIHRoaXMud2luZG93SW5uZXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lcldpZHRoID0gdGhpcy5ncmlkV2lkdGggLSAxODtcclxuICAgICAgICByZXR1cm4gY29udGFpbmVyV2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbGN1bGF0ZUNvbnRhaW5lckhlaWdodCgpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckhlaWdodCA9IChpbm5lckhlaWdodCAtIDE4KTtcclxuICAgICAgICByZXR1cm4gY29udGFpbmVySGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVBY3Rpdml0eUNvbnRhaW5lckRpbWVuc2lvbnMoKTogYW55IHtcclxuICAgICAgICBjb25zdCBzY3JvbGxXaWR0aCA9IDE4O1xyXG4gICAgICAgIHRoaXMud2luZG93SW5uZXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgIGNvbnN0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGggLSB0aGlzLmdyaWRXaWR0aCAtIHNjcm9sbFdpZHRoO1xyXG5cclxuICAgICAgICByZXR1cm4geyBoZWlnaHQ6IHRoaXMuYWN0aXZpdHlIZWlnaHQsIHdpZHRoOiB3aWR0aCB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVHYW50dEFjdGl2aXR5V2lkdGgoZWxlbTogSFRNTEVsZW1lbnQpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiBgY2FsYygxMDAlIC0gJHsoZWxlbS5vZmZzZXRXaWR0aCArIDEpfXB4KWA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbGN1bGF0ZUdhbnR0QWN0aXZpdHlIZWlnaHQoZWxlbTogSFRNTEVsZW1lbnQpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiBgJHtlbGVtLm9mZnNldEhlaWdodH1weGA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbGN1bGF0ZUNlbGxNb250aFdpZHRoKG1pbkRhdGU6IERhdGUsIG1heERhdGU6IERhdGUpIHtcclxuICAgICAgICB2YXIgaSwgcmVzdWx0ID0gW107XHJcbiAgICAgICAgdmFyIHN0YXJ0RGF0ZSA9IG1pbkRhdGU7XHJcbiAgICAgICAgdmFyIGVuZERhdGUgPSBtYXhEYXRlO1xyXG4gICAgICAgIHZhciBtb250aERpZmYgPSB0aGlzLmNhbGN1bGF0ZURpZmZNb250aHMoc3RhcnREYXRlLCBlbmREYXRlKTtcclxuICAgICAgICB2YXIgZGF5RGlmZiA9IHRoaXMuY2FsY3VsYXRlRGlmZkRheXMoc3RhcnREYXRlLCBlbmREYXRlKTtcclxuXHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG1vbnRoRGlmZjsgaSsrKSB7ICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHN0YXJ0T2ZNb250aCA9IGkgPT09IDAgPyBzdGFydERhdGUgOiBuZXcgRGF0ZShzdGFydERhdGUuZ2V0RnVsbFllYXIoKSwgaSwgMSk7XHJcbiAgICAgICAgICAgIHZhciBlbmRPZk1vbnRoID0gaSA9PT0gbW9udGhEaWZmIC0gMSA/IGVuZERhdGUgOiBuZXcgRGF0ZShzdGFydERhdGUuZ2V0RnVsbFllYXIoKSwgaSArIDEsIDApO1xyXG4gICAgICAgICAgICB2YXIgZGF5SW5Nb250aCA9IHRoaXMuY2FsY3VsYXRlRGlmZkRheXMoc3RhcnRPZk1vbnRoLCBlbmRPZk1vbnRoKSArIChpICE9PSBtb250aERpZmYgLSAxICYmIDEpO1xyXG4gICAgICAgICAgICB2YXIgd2lkdGggPSBNYXRoLmZsb29yKGRheUluTW9udGggLyBkYXlEaWZmICogMkUzKSAqIDEuMDI1O1xyXG5cclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goeyBzdGFydDogc3RhcnRPZk1vbnRoLCBlbmQ6IGVuZE9mTW9udGgsIHdpZHRoOiB3aWR0aCB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVEaWZmTW9udGhzKHN0YXJ0LCBlbmQpIHtcclxuICAgICAgICB2YXIgbW9udGhzID0gZW5kLmdldE1vbnRoKCkgLSBzdGFydC5nZXRNb250aCgpICsgKDEyICogKGVuZC5nZXRGdWxsWWVhcigpIC0gc3RhcnQuZ2V0RnVsbFllYXIoKSkpO1xyXG5cclxuICAgICAgICBpZihlbmQuZ2V0RGF0ZSgpIDwgc3RhcnQuZ2V0RGF0ZSgpKSB7XHJcbiAgICAgICAgICAgIHZhciBuZXdGcm9tID0gbmV3IERhdGUoZW5kLmdldEZ1bGxZZWFyKCksIGVuZC5nZXRNb250aCgpLHN0YXJ0LmdldERhdGUoKSk7XHJcbiAgICAgICAgICAgIGlmIChlbmQgPCBuZXdGcm9tICAmJiBlbmQuZ2V0TW9udGgoKSA9PSBuZXdGcm9tLmdldE1vbnRoKCkgJiYgZW5kLmdldFllYXIoKSAlIDQgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbW9udGhzLS07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtb250aHMgKyAxO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBTZXQgdGhlIHZlcnRpY2FsIHNjcm9sbCB0b3AgcG9zaXRpb25zIGZvciBnYW50dCAqL1xyXG4gICAgcHVibGljIHNjcm9sbFRvcCh2ZXJ0aWNhbFNjcm9sbEVsZW06IGFueSwgZ2FudHRHcmlkRWxlbTogYW55LCBnYW50dEFjdGl2aXR5QXJlYUVsZW06IGFueSkge1xyXG4gICAgICAgIGNvbnN0IHZlcnRpY2FsU2Nyb2xsVG9wID0gdmVydGljYWxTY3JvbGxFbGVtLnNjcm9sbFRvcDtcclxuICAgICAgICBjb25zdCBzY3JvbGwgPSB0aGlzLnNldFNjcm9sbFRvcDtcclxuXHJcbiAgICAgICAgLy8gZGVib3VuY2VcclxuICAgICAgICBpZiAodmVydGljYWxTY3JvbGxUb3AgIT09IG51bGwgJiYgdmVydGljYWxTY3JvbGxUb3AgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBzY3JvbGwodmVydGljYWxTY3JvbGxUb3AsIGdhbnR0QWN0aXZpdHlBcmVhRWxlbSk7XHJcbiAgICAgICAgICAgIHNjcm9sbChnYW50dEFjdGl2aXR5QXJlYUVsZW0uc2Nyb2xsVG9wLCBnYW50dEdyaWRFbGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEdyb3VwIGRhdGEgYnkgaWQgLCBvbmx5IHN1cHBvcnRzIG9uZSBsZXZlbCovXHJcbiAgICBwdWJsaWMgZ3JvdXBEYXRhKHRhc2tzOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0YXNrcztcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2hlY2tzIHdoZXRoZXIgYW55IG5ldyBkYXRhIG5lZWRzIHRvIGJlIGFkZGVkIHRvIHRhc2sgY2FjaGUgICovXHJcbiAgICBwdWJsaWMgZG9UYXNrQ2hlY2sodGFza3M6IGFueVtdLCBzY2FsZTogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgLy8gY29uc3QgY2FjaGVkVGFza0lkcyA9IHRoaXMuVEFTS19DQUNIRS5tYXAoKHRhc2s6IGFueSkgPT4geyByZXR1cm4gdGFzay5pZCB9KTtcclxuICAgICAgICAvLyBjb25zdCBpdGVtc1RvQ2FjaGU6IGFueVtdID0gW107XHJcblxyXG4gICAgICAgIC8vIG9ubHkgbG9vayBhdCB0YXNrcyB0aGF0IGFyZSBub3QgY2FjaGVkXHJcbiAgICAgICAgLy8gdGFza3MuZmlsdGVyKCh0YXNrOiBhbnkpID0+IHtcclxuICAgICAgICAvLyAgICAgcmV0dXJuIGNhY2hlZFRhc2tJZHMuaW5kZXhPZih0YXNrLmlkKSA9PT0gLTE7XHJcbiAgICAgICAgLy8gfSkuZm9yRWFjaCgodGFzazogYW55KSA9PiB7XHJcbiAgICAgICAgLy8gICAgIGl0ZW1zVG9DYWNoZS5wdXNoKHRhc2spO1xyXG4gICAgICAgIC8vIH0pO1xyXG5cclxuICAgICAgICAvLyBpdGVtc1RvQ2FjaGUuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuVEFTS19DQUNIRS5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIC8vIH0pO1xyXG5cclxuICAgICAgICAvLyBpZiAoaXRlbXNUb0NhY2hlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAvLyAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICB0aGlzLlRBU0tfQ0FDSEUgPSB0YXNrcztcclxuXHJcbiAgICAgICAgdGhpcy5USU1FX1NDQUxFID0gdGhpcy5jYWxjdWxhdGVTY2FsZShzY2FsZS5zdGFydCwgc2NhbGUuZW5kKTtcclxuICAgICAgICB0aGlzLk1PTlRIX1NDQUxFID0gdGhpcy5jYWxjdWxhdGVNb250aFNjYWxlKHNjYWxlLnN0YXJ0LCBzY2FsZS5lbmQpO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogU2V0IGEgaWQgcHJlZml4IHNvIENTUzMgcXVlcnkgc2VsZWN0b3IgY2FuIHdvcmsgd2l0aCBpZHMgdGhhdCBjb250YWluIG51bWJlcnMgKi9cclxuICAgIHB1YmxpYyBzZXRJZFByZWZpeChpZDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gYF8ke2lkfWA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLyoqIFJlbW92ZSB0aGUgaWQgcHJlZml4IHRvIGFsbG93IHF1ZXJ5aW5nIG9mIGRhdGEgKi9cclxuICAgIC8vIHB1YmxpYyByZW1vdmVJZFByZWZpeChpZDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIC8vICAgICByZXR1cm4gaWQuc3Vic3RyaW5nKDEsIGlkLmxlbmd0aCAtIDEpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8qKiBTZXQgdGhlIHNjcm9sbCB0b3AgcHJvcGVydHkgb2YgYSBuYXRpdmUgRE9NIGVsZW1lbnQgKi9cclxuICAgIHB1YmxpYyBzZXRTY3JvbGxUb3Aoc2Nyb2xsVG9wOiBudW1iZXIsIGVsZW1lbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChlbGVtZW50ICE9PSBudWxsICYmIGVsZW1lbnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19