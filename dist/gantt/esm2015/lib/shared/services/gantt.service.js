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
        const barStyle = this.getBarStyle(task.status);
        return {
            'top': this.barTop * index + 2 + 'px',
            'left': this.calculateBarLeft(task.start, scale) + 'px',
            'height': this.barHeight + 'px',
            'line-height': this.barLineHeight + 'px',
            'width': this.calculateBarWidth(task.start, task.end) + 'px',
            'background-color': barStyle["background-color"],
            'border': barStyle["border"]
        };
    }
    /**
     * Get the bar style based on task status
     * @private
     * @param {?=} taskStatus
     * @return {?}
     */
    getBarStyle(taskStatus = "") {
        /** @type {?} */
        const style = {};
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
    }
    /**
     * Get the progresss bar background colour based on task status
     * @param {?=} taskStatus
     * @return {?}
     */
    getBarProgressStyle(taskStatus = "") {
        /** @type {?} */
        const style = {};
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
    }
    /**
     * Calculates the bar progress width in pixels given task percent complete
     * @param {?} width
     * @param {?} percent
     * @return {?}
     */
    calculateBarProgress(width, percent) {
        if (typeof percent === "number") {
            if (percent > 100) {
                percent = 100;
            }
            /** @type {?} */
            const progress = (width / 100) * percent - 2;
            return `${progress}px`;
        }
        return `${0}px`;
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
        /** @type {?} */
        const height = window.innerHeight - this.gridHeight;
        return { height: this.activityHeight, width: width };
    }
    /**
     * @param {?} ganttActions
     * @param {?} ganttGridElem
     * @return {?}
     */
    calculateGanttActivityWidth(ganttActions, ganttGridElem) {
        return `${ganttActions.offsetWidth - ganttGridElem.offsetWidth}px`;
    }
    /**
     * @param {?} ganttGridElem
     * @return {?}
     */
    calculateGanttActivityHeight(ganttGridElem) {
        return `${ganttGridElem.offsetHeight}px`;
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
     * @return {?}
     */
    doTaskCheck(tasks) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZ2FudHQvIiwic291cmNlcyI6WyJsaWIvc2hhcmVkL3NlcnZpY2VzL2dhbnR0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBSXJELE1BQU0sT0FBTyxZQUFZO0lBc0JyQjtRQXJCTyxjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2Qsa0JBQWEsR0FBRyxFQUFFLENBQUMsQ0FBQyxvREFBb0Q7O1FBQ3hFLG1CQUFjLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDekMsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLHFCQUFnQixHQUFHLENBQUMsQ0FBQztRQUNyQixtQkFBYyxHQUFHLENBQUMsQ0FBQztRQUNuQixjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2Qsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFDbEIsV0FBTSxHQUFHLENBQUMsQ0FBQztRQUNYLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQyxLQUFLOztRQUN0QixlQUFVLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLGNBQVMsR0FBZ0I7WUFDN0IsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFO1lBQy9ILEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUU7WUFDbEgsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLG1CQUFtQixF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a0NBQXdCOzs7OztJQUN4QixpQ0FLRTs7SUFDRixrQ0FBeUI7O0lBQ3pCLGtDQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgR2FudHRDb25maWcgfSBmcm9tICcuL2dhbnR0LWNvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSUJhclN0eWxlLCBUYXNrLCBJU2NhbGUgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdhbnR0U2VydmljZSB7XHJcbiAgICBwdWJsaWMgcm93SGVpZ2h0ID0gMDtcclxuICAgIHB1YmxpYyBob3VyQ2VsbFdpZHRoID0gNjA7IC8vIGNoYW5nZSB0byA2MCBzbyBtaW51dGVzIGNhbiBiZWVuIHNlZW4gbW9yZSBlYXNpbHlcclxuICAgIHB1YmxpYyBob3Vyc0NlbGxXaWR0aCA9IHRoaXMuaG91ckNlbGxXaWR0aCAqIDI1O1xyXG4gICAgcHVibGljIGNlbGxXaWR0aCA9IDA7XHJcbiAgICBwdWJsaWMgd2luZG93SW5uZXJXaWR0aCA9IDA7XHJcbiAgICBwdWJsaWMgYWN0aXZpdHlIZWlnaHQgPSAwO1xyXG4gICAgcHVibGljIGJhckhlaWdodCA9IDA7XHJcbiAgICBwdWJsaWMgYmFyTGluZUhlaWdodCA9IDA7XHJcbiAgICBwdWJsaWMgYmFyVG9wID0gMDtcclxuICAgIHB1YmxpYyBiYXJNb3ZlYWJsZSA9IGZhbHNlO1xyXG4gICAgcHVibGljIGdyaWRXaWR0aCA9IDU0MjsgLy8xODhcclxuICAgIHB1YmxpYyBncmlkSGVpZ2h0ID0gMzMyO1xyXG4gICAgcHJpdmF0ZSBiYXJTdHlsZXM6IElCYXJTdHlsZVtdID0gW1xyXG4gICAgICAgIHsgc3RhdHVzOiBcImluZm9ybWF0aW9uXCIsIGJhY2tncm91bmRDb2xvcjogXCJyZ2IoMTgsMTk1LCAyNDQpXCIsIGJvcmRlcjogXCIxcHggc29saWQgIzIxOTZGM1wiLCBwcm9ncmVzc0JhY2tncm91bmRDb2xvcjogXCIjMjE5NkYzXCIgfSxcclxuICAgICAgICB7IHN0YXR1czogXCJ3YXJuaW5nXCIsIGJhY2tncm91bmRDb2xvcjogXCIjRkZBNzI2XCIsIGJvcmRlcjogXCIxcHggc29saWQgI0VGNkMwMFwiLCBwcm9ncmVzc0JhY2tncm91bmRDb2xvcjogXCIjRUY2QzAwXCIgfSxcclxuICAgICAgICB7IHN0YXR1czogXCJlcnJvclwiLCBiYWNrZ3JvdW5kQ29sb3I6IFwiI0VGNTM1MFwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICNDNjI4MjhcIiwgcHJvZ3Jlc3NCYWNrZ3JvdW5kQ29sb3I6IFwiI0M2MjgyOFwiIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IFwiY29tcGxldGVkXCIsIGJhY2tncm91bmRDb2xvcjogXCIjNjZCQjZBXCIsIGJvcmRlcjogXCIxcHggc29saWQgIzJFN0QzMlwiLCBwcm9ncmVzc0JhY2tncm91bmRDb2xvcjogXCIjMkU3RDMyXCIgfVxyXG4gICAgXTtcclxuICAgIHB1YmxpYyBUQVNLX0NBQ0hFOiBhbnlbXTtcclxuICAgIHB1YmxpYyBUSU1FX1NDQUxFOiBhbnlbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBjb25zdCBnYW50dENvbmZpZyA9IG5ldyBHYW50dENvbmZpZygpO1xyXG5cclxuICAgICAgICB0aGlzLnJvd0hlaWdodCA9IGdhbnR0Q29uZmlnLnJvd0hlaWdodDtcclxuICAgICAgICB0aGlzLmNlbGxXaWR0aCA9IGdhbnR0Q29uZmlnLmNlbGxXaWR0aDtcclxuICAgICAgICB0aGlzLmFjdGl2aXR5SGVpZ2h0ID0gZ2FudHRDb25maWcuYWN0aXZpdHlIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5iYXJIZWlnaHQgPSBnYW50dENvbmZpZy5iYXJIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5iYXJMaW5lSGVpZ2h0ID0gZ2FudHRDb25maWcuYmFyTGluZUhlaWdodDtcclxuICAgICAgICB0aGlzLmJhclRvcCA9IGdhbnR0Q29uZmlnLnJvd0hlaWdodDtcclxuICAgICAgICB0aGlzLmJhck1vdmVhYmxlID0gZ2FudHRDb25maWcuYmFyTW92ZWFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVCYXJXaWR0aChzdGFydDogRGF0ZSwgZW5kOiBEYXRlKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAodHlwZW9mIHN0YXJ0ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBzdGFydCA9IG5ldyBEYXRlKHN0YXJ0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgZW5kID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBlbmQgPSBuZXcgRGF0ZShlbmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZGF5cyA9IHRoaXMuY2FsY3VsYXRlRGlmZkRheXMoc3RhcnQsIGVuZCk7XHJcbiAgICAgICAgY29uc3Qgd2lkdGg6IG51bWJlciA9IChkYXlzIC8gNyAqIHRoaXMuY2VsbFdpZHRoICsgZGF5cyAvIDcpO1xyXG4gICAgICAgIHJldHVybiB3aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZUJhckxlZnQoc3RhcnQ6IERhdGUsIHNjYWxlOiBhbnlbXSk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGxlZnQgPSAwO1xyXG5cclxuICAgICAgICBpZiAoc3RhcnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHN0YXJ0ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgc3RhcnQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNjYWxlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKHN0YXJ0LmdldFRpbWUoKSA+PSBzY2FsZVtpXS5nZXRUaW1lKCkgJiYgc3RhcnQuZ2V0VGltZSgpIDwgc2NhbGVbaSArIDFdLmdldFRpbWUoKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gaSAqIHRoaXMuY2VsbFdpZHRoICsgaSArIHRoaXMuY2FsY3VsYXRlQmFyTGVmdERlbHRhKHN0YXJ0KSArICgoNyAvIChzY2FsZVtpICsgMV0uZ2V0RGF0ZSgpIC0gc3RhcnQuZ2V0RGF0ZSgpKSAvIDcpICogdGhpcy5jZWxsV2lkdGgpIC0gdGhpcy5jZWxsV2lkdGggLyA3O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsZWZ0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDYWxjdWxhdGVzIHRoZSBoZWlnaHQgb2YgdGhlIGdhbnR0IGdyaWQsIGFjdGl2aXR5IGFuZCB2ZXJ0aWNhbCBzY3JvbGwgKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVHYW50dEhlaWdodCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBgJHt0aGlzLlRBU0tfQ0FDSEUubGVuZ3RoICogdGhpcy5yb3dIZWlnaHR9cHhgO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlQmFyTGVmdERlbHRhKHN0YXJ0OiBEYXRlKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgb2Zmc2V0ID0gMDtcclxuICAgICAgICBjb25zdCBob3Vyc0luRGF5ID0gMjQ7XHJcbiAgICAgICAgY29uc3QgbWludXRlc0luSG91ciA9IDYwO1xyXG4gICAgICAgIGNvbnN0IHNlY29uZHNJbkhvdXIgPSAzNjAwO1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0SG91cnM6IG51bWJlciA9XHJcbiAgICAgICAgICAgIHN0YXJ0LmdldEhvdXJzKCkgKyBzdGFydC5nZXRNaW51dGVzKCkgLyBtaW51dGVzSW5Ib3VyICsgc3RhcnQuZ2V0U2Vjb25kcygpIC8gc2Vjb25kc0luSG91cjtcclxuXHJcbiAgICAgICAgb2Zmc2V0ID0gdGhpcy5jZWxsV2lkdGggLyBob3Vyc0luRGF5ICogc3RhcnRIb3VycztcclxuICAgICAgICByZXR1cm4gb2Zmc2V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDYWxjdWxhdGUgdGhlIGJhciBzdHlsZXMgKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVCYXIodGFzazogYW55LCBpbmRleDogbnVtYmVyLCBzY2FsZTogYW55KSB7XHJcbiAgICAgICAgY29uc3QgYmFyU3R5bGUgPSB0aGlzLmdldEJhclN0eWxlKHRhc2suc3RhdHVzKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAndG9wJzogdGhpcy5iYXJUb3AgKiBpbmRleCArIDIgKyAncHgnLFxyXG4gICAgICAgICAgICAnbGVmdCc6IHRoaXMuY2FsY3VsYXRlQmFyTGVmdCh0YXNrLnN0YXJ0LCBzY2FsZSkgKyAncHgnLFxyXG4gICAgICAgICAgICAnaGVpZ2h0JzogdGhpcy5iYXJIZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAnbGluZS1oZWlnaHQnOiB0aGlzLmJhckxpbmVIZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAnd2lkdGgnOiB0aGlzLmNhbGN1bGF0ZUJhcldpZHRoKHRhc2suc3RhcnQsIHRhc2suZW5kKSArICdweCcsXHJcbiAgICAgICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogYmFyU3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdLFxyXG4gICAgICAgICAgICAnYm9yZGVyJzogYmFyU3R5bGVbXCJib3JkZXJcIl1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBHZXQgdGhlIGJhciBzdHlsZSBiYXNlZCBvbiB0YXNrIHN0YXR1cyAqL1xyXG4gICAgcHJpdmF0ZSBnZXRCYXJTdHlsZSh0YXNrU3RhdHVzOiBzdHJpbmcgPSBcIlwiKTogYW55IHtcclxuICAgICAgICBjb25zdCBzdHlsZSA9IHt9O1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0YXNrU3RhdHVzID0gdGFza1N0YXR1cy50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICB0YXNrU3RhdHVzID0gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN3aXRjaCAodGFza1N0YXR1cykge1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gXCJyZ2IoMTgsMTk1LCAyNDQpXCI7XHJcbiAgICAgICAgICAgICAgICBzdHlsZVtcImJvcmRlclwiXSA9IFwiMXB4IHNvbGlkICMyMTk2RjNcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBHZXQgdGhlIHByb2dyZXNzcyBiYXIgYmFja2dyb3VuZCBjb2xvdXIgYmFzZWQgb24gdGFzayBzdGF0dXMgKi9cclxuICAgIHB1YmxpYyBnZXRCYXJQcm9ncmVzc1N0eWxlKHRhc2tTdGF0dXM6IHN0cmluZyA9IFwiXCIpOiBhbnkge1xyXG4gICAgICAgIGNvbnN0IHN0eWxlID0ge307XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRhc2tTdGF0dXMgPSB0YXNrU3RhdHVzLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHRhc2tTdGF0dXMgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3dpdGNoICh0YXNrU3RhdHVzKSB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBzdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0gPSB0aGlzLmJhclN0eWxlc1swXS5wcm9ncmVzc0JhY2tncm91bmRDb2xvcjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDYWxjdWxhdGVzIHRoZSBiYXIgcHJvZ3Jlc3Mgd2lkdGggaW4gcGl4ZWxzIGdpdmVuIHRhc2sgcGVyY2VudCBjb21wbGV0ZSAqL1xyXG4gICAgcHVibGljIGNhbGN1bGF0ZUJhclByb2dyZXNzKHdpZHRoOiBudW1iZXIsIHBlcmNlbnQ6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBwZXJjZW50ID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgIGlmIChwZXJjZW50ID4gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICBwZXJjZW50ID0gMTAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2dyZXNzOiBudW1iZXIgPSAod2lkdGggLyAxMDApICogcGVyY2VudCAtIDI7XHJcbiAgICAgICAgICAgIHJldHVybiBgJHtwcm9ncmVzc31weGA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBgJHswfXB4YDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlcyB0aGUgZGlmZmVyZW5jZSBpbiB0d28gZGF0ZXMgYW5kIHJldHVybnMgbnVtYmVyIG9mIGRheXMgKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVEaWZmRGF5cyhzdGFydDogRGF0ZSwgZW5kOiBEYXRlKTogbnVtYmVyIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBvbmVEYXkgPSAyNCAqIDYwICogNjAgKiAxMDAwOyAvLyBob3VycyptaW51dGVzKnNlY29uZHMqbWlsbGlzZWNvbmRzIC9tc1xyXG4gICAgICAgICAgICBjb25zdCBkaWZmRGF5cyA9IE1hdGguYWJzKChzdGFydC5nZXRUaW1lKCkgLSBlbmQuZ2V0VGltZSgpKSAvIChvbmVEYXkpKTtcclxuICAgICAgICAgICAgY29uc3QgZGF5cyA9IGRpZmZEYXlzOyAvLyBkb24ndCB1c2UgTWF0aC5yb3VuZCBhcyBpdCB3aWxsIGRyYXcgYW4gaW5jb3JyZWN0IGJhclxyXG4gICAgICAgICAgICByZXR1cm4gZGF5cztcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDYWxjdWxhdGUgdGhlIGdhbnR0IHNjYWxlIHJhbmdlIGdpdmVuIHRoZSBzdGFydCBhbmQgZW5kIGRhdGUgb2YgdGFza3MqL1xyXG4gICAgcHVibGljIGNhbGN1bGF0ZVNjYWxlKHN0YXJ0OiBEYXRlID0gbmV3IERhdGUoKSwgZW5kOiBEYXRlID0gdGhpcy5hZGREYXlzKHN0YXJ0LCA3KSkge1xyXG4gICAgICAgIGNvbnN0IHNjYWxlOiBhbnlbXSA9IFtdO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHdoaWxlIChzdGFydC5nZXRUaW1lKCkgPD0gZW5kLmdldFRpbWUoKSkge1xyXG4gICAgICAgICAgICAgICAgc2NhbGUucHVzaChzdGFydCk7XHJcbiAgICAgICAgICAgICAgICBzdGFydCA9IHRoaXMuYWRkRGF5cyhzdGFydCwgNyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHNjYWxlO1xyXG5cclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNjYWxlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogRGV0ZXJtaW5lcyB3aGV0aGVyIGdpdmVuIGRhdGUgaXMgYSB3ZWVrZW5kICovXHJcbiAgICBwdWJsaWMgaXNEYXlXZWVrZW5kKGRhdGU6IERhdGUpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCBkYXkgPSBkYXRlLmdldERheSgpO1xyXG4gICAgICAgIGlmIChkYXkgPT09IDYgfHwgZGF5ID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEFkZCB4IG51bWJlciBvZiBkYXlzIHRvIGEgZGF0ZSBvYmplY3QgKi9cclxuICAgIHB1YmxpYyBhZGREYXlzKGRhdGU6IERhdGUsIGRheXM6IG51bWJlcik6IERhdGUge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBEYXRlKGRhdGUpO1xyXG4gICAgICAgIHJlc3VsdC5zZXREYXRlKHJlc3VsdC5nZXREYXRlKCkgKyBkYXlzKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8vKiogUmVtb3ZlIHggbnVtYmVyIG9mIGRheXMgZnJvbSBhIGRhdGUgb2JqZWN0ICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlRGF5cyhkYXRlOiBEYXRlLCBkYXlzOiBudW1iZXIpOiBEYXRlIHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgRGF0ZShkYXRlKTtcclxuICAgICAgICByZXN1bHQuc2V0RGF0ZShyZXN1bHQuZ2V0RGF0ZSgpIC0gZGF5cyk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlcyB0aGUgZ3JpZCBzY2FsZSBmb3IgZ2FudHQgYmFzZWQgb24gdGFza3Mgc3RhcnQgYW5kIGVuZCBkYXRlcyAqL1xyXG4gICAgcHVibGljIGNhbGN1bGF0ZUdyaWRTY2FsZSh0YXNrczogVGFza1tdKTogSVNjYWxlIHtcclxuICAgICAgICBsZXQgc3RhcnQ6IERhdGU7XHJcbiAgICAgICAgbGV0IGVuZDogRGF0ZTtcclxuICAgICAgICBjb25zdCBkYXRlcyA9IHRhc2tzLm1hcCgodGFzazogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBzdGFydDogbmV3IERhdGUodGFzay5zdGFydCksXHJcbiAgICAgICAgICAgICAgICBlbmQ6IG5ldyBEYXRlKHRhc2suZW5kKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzdGFydCA9IG5ldyBEYXRlKE1hdGgubWluLmFwcGx5KG51bGwsIGRhdGVzLm1hcCgodCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdC5zdGFydDtcclxuICAgICAgICB9KSkpO1xyXG5cclxuICAgICAgICBlbmQgPSBuZXcgRGF0ZShNYXRoLm1heC5hcHBseShudWxsLCBkYXRlcy5tYXAoKHQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHQuZW5kO1xyXG4gICAgICAgIH0pKSk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcclxuICAgICAgICAgICAgZW5kOiBlbmRcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQ6IGFueSwgYXR0cmlidXRlOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gcGFyc2VJbnQoZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KVthdHRyaWJ1dGVdLCAxMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPKGRhbGUpOiBkZXRlcm1pbmUgd2hldGhlciB0aGlzIGlzIG5lZWRlZFxyXG4gICAgcHVibGljIGNhbGN1bGF0ZUNvbnRhaW5lcldpZHRoKCk6IG51bWJlciB7XHJcbiAgICAgICAgdGhpcy53aW5kb3dJbm5lcldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyV2lkdGggPSB0aGlzLmdyaWRXaWR0aCAtIDE4O1xyXG4gICAgICAgIHJldHVybiBjb250YWluZXJXaWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlQ29udGFpbmVySGVpZ2h0KCk6IG51bWJlciB7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVySGVpZ2h0ID0gKGlubmVySGVpZ2h0IC0gMTgpO1xyXG4gICAgICAgIHJldHVybiBjb250YWluZXJIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbGN1bGF0ZUFjdGl2aXR5Q29udGFpbmVyRGltZW5zaW9ucygpOiBhbnkge1xyXG4gICAgICAgIGNvbnN0IHNjcm9sbFdpZHRoID0gMTg7XHJcbiAgICAgICAgdGhpcy53aW5kb3dJbm5lcldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgY29uc3Qgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCAtIHRoaXMuZ3JpZFdpZHRoIC0gc2Nyb2xsV2lkdGg7XHJcblxyXG4gICAgICAgIGNvbnN0IGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIHRoaXMuZ3JpZEhlaWdodDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHsgaGVpZ2h0OiB0aGlzLmFjdGl2aXR5SGVpZ2h0LCB3aWR0aDogd2lkdGggfTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlR2FudHRBY3Rpdml0eVdpZHRoKGdhbnR0QWN0aW9uczogSFRNTEVsZW1lbnQsIGdhbnR0R3JpZEVsZW06IEhUTUxFbGVtZW50KTogYW55IHtcclxuICAgICAgICByZXR1cm4gYCR7Z2FudHRBY3Rpb25zLm9mZnNldFdpZHRoIC0gZ2FudHRHcmlkRWxlbS5vZmZzZXRXaWR0aH1weGA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbGN1bGF0ZUdhbnR0QWN0aXZpdHlIZWlnaHQoZ2FudHRHcmlkRWxlbTogSFRNTEVsZW1lbnQpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiBgJHtnYW50dEdyaWRFbGVtLm9mZnNldEhlaWdodH1weGA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFNldCB0aGUgdmVydGljYWwgc2Nyb2xsIHRvcCBwb3NpdGlvbnMgZm9yIGdhbnR0ICovXHJcbiAgICBwdWJsaWMgc2Nyb2xsVG9wKHZlcnRpY2FsU2Nyb2xsRWxlbTogYW55LCBnYW50dEdyaWRFbGVtOiBhbnksIGdhbnR0QWN0aXZpdHlBcmVhRWxlbTogYW55KSB7XHJcbiAgICAgICAgY29uc3QgdmVydGljYWxTY3JvbGxUb3AgPSB2ZXJ0aWNhbFNjcm9sbEVsZW0uc2Nyb2xsVG9wO1xyXG4gICAgICAgIGNvbnN0IHNjcm9sbCA9IHRoaXMuc2V0U2Nyb2xsVG9wO1xyXG5cclxuICAgICAgICAvLyBkZWJvdW5jZVxyXG4gICAgICAgIGlmICh2ZXJ0aWNhbFNjcm9sbFRvcCAhPT0gbnVsbCAmJiB2ZXJ0aWNhbFNjcm9sbFRvcCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbCh2ZXJ0aWNhbFNjcm9sbFRvcCwgZ2FudHRBY3Rpdml0eUFyZWFFbGVtKTtcclxuICAgICAgICAgICAgc2Nyb2xsKGdhbnR0QWN0aXZpdHlBcmVhRWxlbS5zY3JvbGxUb3AsIGdhbnR0R3JpZEVsZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogR3JvdXAgZGF0YSBieSBpZCAsIG9ubHkgc3VwcG9ydHMgb25lIGxldmVsKi9cclxuICAgIHB1YmxpYyBncm91cERhdGEodGFza3M6IGFueSk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRhc2tzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDaGVja3Mgd2hldGhlciBhbnkgbmV3IGRhdGEgbmVlZHMgdG8gYmUgYWRkZWQgdG8gdGFzayBjYWNoZSAgKi9cclxuICAgIHB1YmxpYyBkb1Rhc2tDaGVjayh0YXNrczogYW55W10pOiBib29sZWFuIHtcclxuICAgICAgICAvLyBjb25zdCBjYWNoZWRUYXNrSWRzID0gdGhpcy5UQVNLX0NBQ0hFLm1hcCgodGFzazogYW55KSA9PiB7IHJldHVybiB0YXNrLmlkIH0pO1xyXG4gICAgICAgIC8vIGNvbnN0IGl0ZW1zVG9DYWNoZTogYW55W10gPSBbXTtcclxuXHJcbiAgICAgICAgLy8gb25seSBsb29rIGF0IHRhc2tzIHRoYXQgYXJlIG5vdCBjYWNoZWRcclxuICAgICAgICAvLyB0YXNrcy5maWx0ZXIoKHRhc2s6IGFueSkgPT4ge1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gY2FjaGVkVGFza0lkcy5pbmRleE9mKHRhc2suaWQpID09PSAtMTtcclxuICAgICAgICAvLyB9KS5mb3JFYWNoKCh0YXNrOiBhbnkpID0+IHtcclxuICAgICAgICAvLyAgICAgaXRlbXNUb0NhY2hlLnB1c2godGFzayk7XHJcbiAgICAgICAgLy8gfSk7XHJcblxyXG4gICAgICAgIC8vIGl0ZW1zVG9DYWNoZS5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAvLyAgICAgdGhpcy5UQVNLX0NBQ0hFLnB1c2goaXRlbSk7XHJcbiAgICAgICAgLy8gfSk7XHJcblxyXG4gICAgICAgIC8vIGlmIChpdGVtc1RvQ2FjaGUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIHRoaXMuVEFTS19DQUNIRSA9IHRhc2tzO1xyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFNldCBhIGlkIHByZWZpeCBzbyBDU1MzIHF1ZXJ5IHNlbGVjdG9yIGNhbiB3b3JrIHdpdGggaWRzIHRoYXQgY29udGFpbiBudW1iZXJzICovXHJcbiAgICBwdWJsaWMgc2V0SWRQcmVmaXgoaWQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGBfJHtpZH1gO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIC8qKiBSZW1vdmUgdGhlIGlkIHByZWZpeCB0byBhbGxvdyBxdWVyeWluZyBvZiBkYXRhICovXHJcbiAgICAvLyBwdWJsaWMgcmVtb3ZlSWRQcmVmaXgoaWQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAvLyAgICAgcmV0dXJuIGlkLnN1YnN0cmluZygxLCBpZC5sZW5ndGggLSAxKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvKiogU2V0IHRoZSBzY3JvbGwgdG9wIHByb3BlcnR5IG9mIGEgbmF0aXZlIERPTSBlbGVtZW50ICovXHJcbiAgICBwdWJsaWMgc2V0U2Nyb2xsVG9wKHNjcm9sbFRvcDogbnVtYmVyLCBlbGVtZW50OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZWxlbWVudCAhPT0gbnVsbCAmJiBlbGVtZW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5zY3JvbGxUb3AgPSBzY3JvbGxUb3A7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==