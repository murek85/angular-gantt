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
        const width = (days * this.cellWidth + days) / 7;
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
            for (let i = 0; i < scale.length; i++) {
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
        const startHours = (start.getHours() + start.getMinutes() / minutesInHour + start.getSeconds() / secondsInHour);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZ2FudHQvIiwic291cmNlcyI6WyJsaWIvc2hhcmVkL3NlcnZpY2VzL2dhbnR0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBSXJELE1BQU0sT0FBTyxZQUFZO0lBaUJyQjtRQWhCTyxjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2Qsa0JBQWEsR0FBRyxFQUFFLENBQUMsQ0FBQyxvREFBb0Q7O1FBQ3hFLG1CQUFjLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDekMsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLHFCQUFnQixHQUFHLENBQUMsQ0FBQztRQUNyQixtQkFBYyxHQUFHLENBQUMsQ0FBQztRQUNuQixjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2Qsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFDbEIsV0FBTSxHQUFHLENBQUMsQ0FBQztRQUNYLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLOztRQUNwQixlQUFVLEdBQUcsR0FBRyxDQUFDOztjQU1kLFdBQVcsR0FBRyxJQUFJLFdBQVcsRUFBRTtRQUVyQyxJQUFJLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUM7UUFDdkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxjQUFjLEdBQUcsV0FBVyxDQUFDLGNBQWMsQ0FBQztRQUNqRCxJQUFJLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUM7UUFDdkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUMsYUFBYSxDQUFDO1FBQy9DLElBQUksQ0FBQyxN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L0IsTUFBTTtRQUVOLHdDQUF3QztRQUN4QyxrQ0FBa0M7UUFDbEMsTUFBTTtRQUVOLGlDQUFpQztRQUNqQyxtQkFBbUI7UUFDbkIsSUFBSTtRQUVKLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBRXhCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVwRSxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7Ozs7SUFHTSxXQUFXLENBQUMsRUFBVTtRQUN6QixPQUFPLElBQUksRUFBRSxFQUFFLENBQUM7SUFDcEIsQ0FBQzs7Ozs7Ozs7Ozs7SUFRTSxZQUFZLENBQUMsU0FBaUIsRUFBRSxPQUFZO1FBQy9DLElBQUksT0FBTyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQzNDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1NBQ2pDO0lBQ0wsQ0FBQzs7O1lBL1RKLFVBQVU7Ozs7OztJQUVQLGlDQUFxQjs7SUFDckIscUNBQTBCOztJQUMxQixzQ0FBZ0Q7O0lBQ2hELGlDQUFxQjs7SUFDckIsd0NBQTRCOztJQUM1QixzQ0FBMEI7O0lBQzFCLGlDQUFxQjs7SUFDckIscUNBQXlCOztJQUN6Qiw4QkFBa0I7O0lBQ2xCLG1DQUEyQjs7SUFDM0IsaUNBQXFCOztJQUNyQixrQ0FBd0I7O0lBQ3hCLGtDQUF5Qjs7SUFDekIsa0NBQXlCOztJQUN6QixtQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEdhbnR0Q29uZmlnIH0gZnJvbSAnLi9nYW50dC1jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IFRhc2ssIElTY2FsZSB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgR2FudHRTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyByb3dIZWlnaHQgPSAwO1xyXG4gICAgcHVibGljIGhvdXJDZWxsV2lkdGggPSA2MDsgLy8gY2hhbmdlIHRvIDYwIHNvIG1pbnV0ZXMgY2FuIGJlZW4gc2VlbiBtb3JlIGVhc2lseVxyXG4gICAgcHVibGljIGhvdXJzQ2VsbFdpZHRoID0gdGhpcy5ob3VyQ2VsbFdpZHRoICogMjU7XHJcbiAgICBwdWJsaWMgY2VsbFdpZHRoID0gMDtcclxuICAgIHB1YmxpYyB3aW5kb3dJbm5lcldpZHRoID0gMDtcclxuICAgIHB1YmxpYyBhY3Rpdml0eUhlaWdodCA9IDA7XHJcbiAgICBwdWJsaWMgYmFySGVpZ2h0ID0gMDtcclxuICAgIHB1YmxpYyBiYXJMaW5lSGVpZ2h0ID0gMDtcclxuICAgIHB1YmxpYyBiYXJUb3AgPSAwO1xyXG4gICAgcHVibGljIGJhck1vdmVhYmxlID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgZ3JpZFdpZHRoID0gMDsgLy8xODhcclxuICAgIHB1YmxpYyBncmlkSGVpZ2h0ID0gMzMyO1xyXG4gICAgcHVibGljIFRBU0tfQ0FDSEU6IGFueVtdO1xyXG4gICAgcHVibGljIFRJTUVfU0NBTEU6IGFueVtdO1xyXG4gICAgcHVibGljIE1PTlRIX1NDQUxFOiBhbnlbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBjb25zdCBnYW50dENvbmZpZyA9IG5ldyBHYW50dENvbmZpZygpO1xyXG5cclxuICAgICAgICB0aGlzLnJvd0hlaWdodCA9IGdhbnR0Q29uZmlnLnJvd0hlaWdodDtcclxuICAgICAgICB0aGlzLmNlbGxXaWR0aCA9IGdhbnR0Q29uZmlnLmNlbGxXaWR0aDtcclxuICAgICAgICB0aGlzLmFjdGl2aXR5SGVpZ2h0ID0gZ2FudHRDb25maWcuYWN0aXZpdHlIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5iYXJIZWlnaHQgPSBnYW50dENvbmZpZy5iYXJIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5iYXJMaW5lSGVpZ2h0ID0gZ2FudHRDb25maWcuYmFyTGluZUhlaWdodDtcclxuICAgICAgICB0aGlzLmJhclRvcCA9IGdhbnR0Q29uZmlnLnJvd0hlaWdodDtcclxuICAgICAgICB0aGlzLmJhck1vdmVhYmxlID0gZ2FudHRDb25maWcuYmFyTW92ZWFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVCYXJXaWR0aChzdGFydDogRGF0ZSwgZW5kOiBEYXRlKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAodHlwZW9mIHN0YXJ0ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBzdGFydCA9IG5ldyBEYXRlKHN0YXJ0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgZW5kID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBlbmQgPSBuZXcgRGF0ZShlbmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZGF5cyA9IHRoaXMuY2FsY3VsYXRlRGlmZkRheXMoc3RhcnQsIGVuZCk7XHJcbiAgICAgICAgY29uc3Qgd2lkdGg6IG51bWJlciA9IChkYXlzICogdGhpcy5jZWxsV2lkdGggKyBkYXlzKSAvIDc7XHJcbiAgICAgICAgcmV0dXJuIHdpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlQmFyTGVmdChzdGFydDogRGF0ZSwgc2NhbGU6IGFueVtdKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgbGVmdCA9IDA7XHJcblxyXG4gICAgICAgIGlmIChzdGFydCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICBzdGFydCA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2NhbGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdGFydC5nZXRUaW1lKCkgPj0gc2NhbGVbaV0uZ2V0VGltZSgpICYmIHN0YXJ0LmdldFRpbWUoKSA8IHNjYWxlW2kgKyAxXS5nZXRUaW1lKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBsZWZ0ID0gaSAqIHRoaXMuY2VsbFdpZHRoICsgaSArIHRoaXMuY2FsY3VsYXRlQmFyTGVmdERlbHRhKHN0YXJ0KSArXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgKCg3IC8gKHNjYWxlW2kgKyAxXS5nZXREYXRlKCkgLSBzdGFydC5nZXREYXRlKCkpIC8gNykgKiB0aGlzLmNlbGxXaWR0aCkgLSB0aGlzLmNlbGxXaWR0aCAvIDc7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IGkgKiB0aGlzLmNlbGxXaWR0aCArICgodGhpcy5jZWxsV2lkdGgpICogdGhpcy5jYWxjdWxhdGVEaWZmRGF5cyhzY2FsZVtpXSwgc3RhcnQpIC8gNykgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpICsgdGhpcy5jYWxjdWxhdGVCYXJMZWZ0RGVsdGEoc3RhcnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsZWZ0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDYWxjdWxhdGVzIHRoZSBoZWlnaHQgb2YgdGhlIGdhbnR0IGdyaWQsIGFjdGl2aXR5IGFuZCB2ZXJ0aWNhbCBzY3JvbGwgKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVHYW50dEhlaWdodCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBgJHt0aGlzLlRBU0tfQ0FDSEUubGVuZ3RoICogdGhpcy5yb3dIZWlnaHR9cHhgO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlQmFyTGVmdERlbHRhKHN0YXJ0OiBEYXRlKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgb2Zmc2V0ID0gMDtcclxuICAgICAgICBjb25zdCBob3Vyc0luRGF5ID0gMjQ7XHJcbiAgICAgICAgY29uc3QgbWludXRlc0luSG91ciA9IDYwO1xyXG4gICAgICAgIGNvbnN0IHNlY29uZHNJbkhvdXIgPSAzNjAwO1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0SG91cnM6IG51bWJlciA9XHJcbiAgICAgICAgICAgIChzdGFydC5nZXRIb3VycygpICsgc3RhcnQuZ2V0TWludXRlcygpIC8gbWludXRlc0luSG91ciArIHN0YXJ0LmdldFNlY29uZHMoKSAvIHNlY29uZHNJbkhvdXIpO1xyXG5cclxuICAgICAgICBvZmZzZXQgPSB0aGlzLmNlbGxXaWR0aCAvIGhvdXJzSW5EYXkgKiBzdGFydEhvdXJzO1xyXG4gICAgICAgIHJldHVybiBvZmZzZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENhbGN1bGF0ZSB0aGUgYmFyIHN0eWxlcyAqL1xyXG4gICAgcHVibGljIGNhbGN1bGF0ZUJhcih0YXNrOiBhbnksIGluZGV4OiBudW1iZXIsIHNjYWxlOiBhbnkpIHtcclxuICAgICAgICBjb25zdCBiYXJTdHlsZSA9IHRoaXMuZ2V0QmFyU3R5bGUodGFzay5jb2xvcik7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ3RvcCc6IHRoaXMuYmFyVG9wICogaW5kZXggKyAyICsgJ3B4JyxcclxuICAgICAgICAgICAgJ2xlZnQnOiB0aGlzLmNhbGN1bGF0ZUJhckxlZnQodGFzay5zdGFydCwgc2NhbGUpICsgJ3B4JyxcclxuICAgICAgICAgICAgJ2hlaWdodCc6IHRoaXMuYmFySGVpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogdGhpcy5iYXJMaW5lSGVpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgJ3dpZHRoJzogdGhpcy5jYWxjdWxhdGVCYXJXaWR0aCh0YXNrLnN0YXJ0LCB0YXNrLmVuZCkgKyAncHgnLFxyXG4gICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IGJhclN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSxcclxuICAgICAgICAgICAgJ2JvcmRlci1sZWZ0JzogYmFyU3R5bGVbXCJib3JkZXItbGVmdFwiXVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEdldCB0aGUgYmFyIHN0eWxlIGJhc2VkIG9uIHRhc2sgc3RhdHVzICovXHJcbiAgICBwcml2YXRlIGdldEJhclN0eWxlKGNvbG9yOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIGNvbnN0IHN0eWxlID0ge307XHJcbiAgICAgICAgc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gY29sb3Iuc2Vjb25kYXJ5O1xyXG4gICAgICAgIHN0eWxlW1wiYm9yZGVyLWxlZnRcIl0gPSBgNXB4IHNvbGlkICR7Y29sb3IucHJpbWFyeX1gO1xyXG5cclxuICAgICAgICByZXR1cm4gc3R5bGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENhbGN1bGF0ZXMgdGhlIGRpZmZlcmVuY2UgaW4gdHdvIGRhdGVzIGFuZCByZXR1cm5zIG51bWJlciBvZiBkYXlzICovXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlRGlmZkRheXMoc3RhcnQ6IERhdGUsIGVuZDogRGF0ZSk6IG51bWJlciB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3Qgb25lRGF5ID0gMjQgKiA2MCAqIDYwICogMTAwMDsgLy8gaG91cnMqbWludXRlcypzZWNvbmRzKm1pbGxpc2Vjb25kcyAvbXNcclxuICAgICAgICAgICAgY29uc3QgZGlmZkRheXMgPSBNYXRoLmFicygoc3RhcnQuZ2V0VGltZSgpIC0gZW5kLmdldFRpbWUoKSkgLyAob25lRGF5KSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRheXMgPSBkaWZmRGF5czsgLy8gZG9uJ3QgdXNlIE1hdGgucm91bmQgYXMgaXQgd2lsbCBkcmF3IGFuIGluY29ycmVjdCBiYXJcclxuICAgICAgICAgICAgcmV0dXJuIGRheXM7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlIHRoZSBnYW50dCBzY2FsZSByYW5nZSBnaXZlbiB0aGUgc3RhcnQgYW5kIGVuZCBkYXRlIG9mIHRhc2tzKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVTY2FsZShzdGFydDogRGF0ZSA9IG5ldyBEYXRlKCksIGVuZDogRGF0ZSA9IHRoaXMuYWRkRGF5cyhzdGFydCwgNykpIHtcclxuICAgICAgICBjb25zdCBzY2FsZTogYW55W10gPSBbXTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB3aGlsZSAoc3RhcnQuZ2V0VGltZSgpIDw9IGVuZC5nZXRUaW1lKCkpIHtcclxuICAgICAgICAgICAgICAgIHNjYWxlLnB1c2goc3RhcnQpO1xyXG4gICAgICAgICAgICAgICAgc3RhcnQgPSB0aGlzLmFkZERheXMoc3RhcnQsIDcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzY2FsZTtcclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzY2FsZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbGN1bGF0ZU1vbnRoU2NhbGUoc3RhcnQ6IERhdGUgPSBuZXcgRGF0ZSgpLCBlbmQ6IERhdGUgPSB0aGlzLmFkZERheXMoc3RhcnQsIDcpKSB7XHJcbiAgICAgICAgbGV0IHNjYWxlOiBhbnlbXSA9IFtdO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIHdoaWxlIChzdGFydC5nZXRUaW1lKCkgPD0gZW5kLmdldFRpbWUoKSkge1xyXG4gICAgICAgICAgICAvLyAgICAgc2NhbGUucHVzaCh7IHN0YXJ0OiBzdGFydCwgd2lkdGg6IHRoaXMuY2FsY3VsYXRlQ2VsbE1vbnRoV2lkdGgoc3RhcnQsIGVuZCkgfSk7XHJcbiAgICAgICAgICAgIC8vICAgICBzdGFydCA9IHRoaXMuYWRkRGF5cyhzdGFydCwgbmV3IERhdGUoc3RhcnQuZ2V0RnVsbFllYXIoKSwgc3RhcnQuZ2V0TW9udGgoKSArIDEsIDApLmdldERhdGUoKSk7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgc2NhbGUgPSB0aGlzLmNhbGN1bGF0ZUNlbGxNb250aFdpZHRoKHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgICAgICByZXR1cm4gc2NhbGU7XHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZXR1cm4gc2NhbGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBEZXRlcm1pbmVzIHdoZXRoZXIgZ2l2ZW4gZGF0ZSBpcyBhIHdlZWtlbmQgKi9cclxuICAgIHB1YmxpYyBpc0RheVdlZWtlbmQoZGF0ZTogRGF0ZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IGRheSA9IGRhdGUuZ2V0RGF5KCk7XHJcbiAgICAgICAgaWYgKGRheSA9PT0gNiB8fCBkYXkgPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQWRkIHggbnVtYmVyIG9mIGRheXMgdG8gYSBkYXRlIG9iamVjdCAqL1xyXG4gICAgcHVibGljIGFkZERheXMoZGF0ZTogRGF0ZSwgZGF5czogbnVtYmVyKTogRGF0ZSB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGUoZGF0ZSk7XHJcbiAgICAgICAgcmVzdWx0LnNldERhdGUocmVzdWx0LmdldERhdGUoKSArIGRheXMpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8qKiBSZW1vdmUgeCBudW1iZXIgb2YgZGF5cyBmcm9tIGEgZGF0ZSBvYmplY3QgKi9cclxuICAgIHB1YmxpYyByZW1vdmVEYXlzKGRhdGU6IERhdGUsIGRheXM6IG51bWJlcik6IERhdGUge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBEYXRlKGRhdGUpO1xyXG4gICAgICAgIHJlc3VsdC5zZXREYXRlKHJlc3VsdC5nZXREYXRlKCkgLSBkYXlzKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDYWxjdWxhdGVzIHRoZSBncmlkIHNjYWxlIGZvciBnYW50dCBiYXNlZCBvbiB0YXNrcyBzdGFydCBhbmQgZW5kIGRhdGVzICovXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlR3JpZFNjYWxlKHRhc2tzOiBUYXNrW10pOiBJU2NhbGUge1xyXG4gICAgICAgIGxldCBzdGFydDogRGF0ZTtcclxuICAgICAgICBsZXQgZW5kOiBEYXRlO1xyXG4gICAgICAgIGNvbnN0IGRhdGVzID0gdGFza3MubWFwKCh0YXNrOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0OiBuZXcgRGF0ZSh0YXNrLnN0YXJ0KSxcclxuICAgICAgICAgICAgICAgIGVuZDogbmV3IERhdGUodGFzay5lbmQpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHN0YXJ0ID0gbmV3IERhdGUoTWF0aC5taW4uYXBwbHkobnVsbCwgZGF0ZXMubWFwKCh0KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0LnN0YXJ0O1xyXG4gICAgICAgIH0pKSk7XHJcblxyXG4gICAgICAgIGVuZCA9IG5ldyBEYXRlKE1hdGgubWF4LmFwcGx5KG51bGwsIGRhdGVzLm1hcCgodCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdC5lbmQ7XHJcbiAgICAgICAgfSkpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxyXG4gICAgICAgICAgICBlbmQ6IGVuZFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldENvbXB1dGVkU3R5bGUoZWxlbWVudDogYW55LCBhdHRyaWJ1dGU6IGFueSkge1xyXG4gICAgICAgIHJldHVybiBwYXJzZUludChkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpW2F0dHJpYnV0ZV0sIDEwKTtcclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE8oZGFsZSk6IGRldGVybWluZSB3aGV0aGVyIHRoaXMgaXMgbmVlZGVkXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlQ29udGFpbmVyV2lkdGgoKTogbnVtYmVyIHtcclxuICAgICAgICB0aGlzLndpbmRvd0lubmVyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICBjb25zdCBjb250YWluZXJXaWR0aCA9IHRoaXMuZ3JpZFdpZHRoIC0gMTg7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcldpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVDb250YWluZXJIZWlnaHQoKTogbnVtYmVyIHtcclxuICAgICAgICBjb25zdCBjb250YWluZXJIZWlnaHQgPSAoaW5uZXJIZWlnaHQgLSAxOCk7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lckhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlQWN0aXZpdHlDb250YWluZXJEaW1lbnNpb25zKCk6IGFueSB7XHJcbiAgICAgICAgY29uc3Qgc2Nyb2xsV2lkdGggPSAxODtcclxuICAgICAgICB0aGlzLndpbmRvd0lubmVyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICBjb25zdCB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIC0gdGhpcy5ncmlkV2lkdGggLSBzY3JvbGxXaWR0aDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHsgaGVpZ2h0OiB0aGlzLmFjdGl2aXR5SGVpZ2h0LCB3aWR0aDogd2lkdGggfTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlR2FudHRBY3Rpdml0eVdpZHRoKGVsZW06IEhUTUxFbGVtZW50KTogYW55IHtcclxuICAgICAgICByZXR1cm4gYGNhbGMoMTAwJSAtICR7KGVsZW0ub2Zmc2V0V2lkdGggKyAxKX1weClgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVHYW50dEFjdGl2aXR5SGVpZ2h0KGVsZW06IEhUTUxFbGVtZW50KTogYW55IHtcclxuICAgICAgICByZXR1cm4gYCR7ZWxlbS5vZmZzZXRIZWlnaHR9cHhgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVDZWxsTW9udGhXaWR0aChtaW5EYXRlOiBEYXRlLCBtYXhEYXRlOiBEYXRlKSB7XHJcbiAgICAgICAgdmFyIGksIHJlc3VsdCA9IFtdO1xyXG4gICAgICAgIHZhciBzdGFydERhdGUgPSBtaW5EYXRlO1xyXG4gICAgICAgIHZhciBlbmREYXRlID0gbWF4RGF0ZTtcclxuICAgICAgICB2YXIgbW9udGhEaWZmID0gdGhpcy5jYWxjdWxhdGVEaWZmTW9udGhzKHN0YXJ0RGF0ZSwgZW5kRGF0ZSk7XHJcbiAgICAgICAgdmFyIGRheURpZmYgPSB0aGlzLmNhbGN1bGF0ZURpZmZEYXlzKHN0YXJ0RGF0ZSwgZW5kRGF0ZSk7XHJcblxyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBtb250aERpZmY7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgc3RhcnRPZk1vbnRoID0gaSA9PT0gMCA/IHN0YXJ0RGF0ZSA6IG5ldyBEYXRlKHN0YXJ0RGF0ZS5nZXRGdWxsWWVhcigpLCBpLCAxKTtcclxuICAgICAgICAgICAgdmFyIGVuZE9mTW9udGggPSBpID09PSBtb250aERpZmYgLSAxID8gZW5kRGF0ZSA6IG5ldyBEYXRlKHN0YXJ0RGF0ZS5nZXRGdWxsWWVhcigpLCBpICsgMSwgMCk7XHJcbiAgICAgICAgICAgIHZhciBkYXlJbk1vbnRoID0gdGhpcy5jYWxjdWxhdGVEaWZmRGF5cyhzdGFydE9mTW9udGgsIGVuZE9mTW9udGgpICsgKGkgIT09IG1vbnRoRGlmZiAtIDEgJiYgMSk7XHJcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IE1hdGguZmxvb3IoZGF5SW5Nb250aCAvIGRheURpZmYgKiAyRTMpICogMS4wMjU7XHJcblxyXG4gICAgICAgICAgICByZXN1bHQucHVzaCh7IHN0YXJ0OiBzdGFydE9mTW9udGgsIGVuZDogZW5kT2ZNb250aCwgd2lkdGg6IHdpZHRoIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZURpZmZNb250aHMoc3RhcnQsIGVuZCkge1xyXG4gICAgICAgIHZhciBtb250aHMgPSBlbmQuZ2V0TW9udGgoKSAtIHN0YXJ0LmdldE1vbnRoKCkgKyAoMTIgKiAoZW5kLmdldEZ1bGxZZWFyKCkgLSBzdGFydC5nZXRGdWxsWWVhcigpKSk7XHJcblxyXG4gICAgICAgIGlmKGVuZC5nZXREYXRlKCkgPCBzdGFydC5nZXREYXRlKCkpIHtcclxuICAgICAgICAgICAgdmFyIG5ld0Zyb20gPSBuZXcgRGF0ZShlbmQuZ2V0RnVsbFllYXIoKSwgZW5kLmdldE1vbnRoKCksc3RhcnQuZ2V0RGF0ZSgpKTtcclxuICAgICAgICAgICAgaWYgKGVuZCA8IG5ld0Zyb20gICYmIGVuZC5nZXRNb250aCgpID09IG5ld0Zyb20uZ2V0TW9udGgoKSAmJiBlbmQuZ2V0WWVhcigpICUgNCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICBtb250aHMtLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1vbnRocyArIDE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFNldCB0aGUgdmVydGljYWwgc2Nyb2xsIHRvcCBwb3NpdGlvbnMgZm9yIGdhbnR0ICovXHJcbiAgICBwdWJsaWMgc2Nyb2xsVG9wKHZlcnRpY2FsU2Nyb2xsRWxlbTogYW55LCBnYW50dEdyaWRFbGVtOiBhbnksIGdhbnR0QWN0aXZpdHlBcmVhRWxlbTogYW55KSB7XHJcbiAgICAgICAgY29uc3QgdmVydGljYWxTY3JvbGxUb3AgPSB2ZXJ0aWNhbFNjcm9sbEVsZW0uc2Nyb2xsVG9wO1xyXG4gICAgICAgIGNvbnN0IHNjcm9sbCA9IHRoaXMuc2V0U2Nyb2xsVG9wO1xyXG5cclxuICAgICAgICAvLyBkZWJvdW5jZVxyXG4gICAgICAgIGlmICh2ZXJ0aWNhbFNjcm9sbFRvcCAhPT0gbnVsbCAmJiB2ZXJ0aWNhbFNjcm9sbFRvcCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbCh2ZXJ0aWNhbFNjcm9sbFRvcCwgZ2FudHRBY3Rpdml0eUFyZWFFbGVtKTtcclxuICAgICAgICAgICAgc2Nyb2xsKGdhbnR0QWN0aXZpdHlBcmVhRWxlbS5zY3JvbGxUb3AsIGdhbnR0R3JpZEVsZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogR3JvdXAgZGF0YSBieSBpZCAsIG9ubHkgc3VwcG9ydHMgb25lIGxldmVsKi9cclxuICAgIHB1YmxpYyBncm91cERhdGEodGFza3M6IGFueSk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRhc2tzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDaGVja3Mgd2hldGhlciBhbnkgbmV3IGRhdGEgbmVlZHMgdG8gYmUgYWRkZWQgdG8gdGFzayBjYWNoZSAgKi9cclxuICAgIHB1YmxpYyBkb1Rhc2tDaGVjayh0YXNrczogYW55W10sIHNjYWxlOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICAvLyBjb25zdCBjYWNoZWRUYXNrSWRzID0gdGhpcy5UQVNLX0NBQ0hFLm1hcCgodGFzazogYW55KSA9PiB7IHJldHVybiB0YXNrLmlkIH0pO1xyXG4gICAgICAgIC8vIGNvbnN0IGl0ZW1zVG9DYWNoZTogYW55W10gPSBbXTtcclxuXHJcbiAgICAgICAgLy8gb25seSBsb29rIGF0IHRhc2tzIHRoYXQgYXJlIG5vdCBjYWNoZWRcclxuICAgICAgICAvLyB0YXNrcy5maWx0ZXIoKHRhc2s6IGFueSkgPT4ge1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gY2FjaGVkVGFza0lkcy5pbmRleE9mKHRhc2suaWQpID09PSAtMTtcclxuICAgICAgICAvLyB9KS5mb3JFYWNoKCh0YXNrOiBhbnkpID0+IHtcclxuICAgICAgICAvLyAgICAgaXRlbXNUb0NhY2hlLnB1c2godGFzayk7XHJcbiAgICAgICAgLy8gfSk7XHJcblxyXG4gICAgICAgIC8vIGl0ZW1zVG9DYWNoZS5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAvLyAgICAgdGhpcy5UQVNLX0NBQ0hFLnB1c2goaXRlbSk7XHJcbiAgICAgICAgLy8gfSk7XHJcblxyXG4gICAgICAgIC8vIGlmIChpdGVtc1RvQ2FjaGUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIHRoaXMuVEFTS19DQUNIRSA9IHRhc2tzO1xyXG5cclxuICAgICAgICB0aGlzLlRJTUVfU0NBTEUgPSB0aGlzLmNhbGN1bGF0ZVNjYWxlKHNjYWxlLnN0YXJ0LCBzY2FsZS5lbmQpO1xyXG4gICAgICAgIHRoaXMuTU9OVEhfU0NBTEUgPSB0aGlzLmNhbGN1bGF0ZU1vbnRoU2NhbGUoc2NhbGUuc3RhcnQsIHNjYWxlLmVuZCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBTZXQgYSBpZCBwcmVmaXggc28gQ1NTMyBxdWVyeSBzZWxlY3RvciBjYW4gd29yayB3aXRoIGlkcyB0aGF0IGNvbnRhaW4gbnVtYmVycyAqL1xyXG4gICAgcHVibGljIHNldElkUHJlZml4KGlkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBgXyR7aWR9YDtcclxuICAgIH1cclxuXHJcbiAgICAvLyAvKiogUmVtb3ZlIHRoZSBpZCBwcmVmaXggdG8gYWxsb3cgcXVlcnlpbmcgb2YgZGF0YSAqL1xyXG4gICAgLy8gcHVibGljIHJlbW92ZUlkUHJlZml4KGlkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgLy8gICAgIHJldHVybiBpZC5zdWJzdHJpbmcoMSwgaWQubGVuZ3RoIC0gMSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLyoqIFNldCB0aGUgc2Nyb2xsIHRvcCBwcm9wZXJ0eSBvZiBhIG5hdGl2ZSBET00gZWxlbWVudCAqL1xyXG4gICAgcHVibGljIHNldFNjcm9sbFRvcChzY3JvbGxUb3A6IG51bWJlciwgZWxlbWVudDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQgIT09IG51bGwgJiYgZWxlbWVudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=