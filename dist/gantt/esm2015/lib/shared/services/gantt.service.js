/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { GanttConfig } from './gantt-config.service';
import { GroupByPipe } from '../../shared/pipes/groupBy.pipe';
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
        this.gridWidth = 560;
        this.barStyles = [
            { status: "information", backgroundColor: "rgb(18,195, 244)", border: "1px solid #2196F3", progressBackgroundColor: "#2196F3" },
            { status: "warning", backgroundColor: "#FFA726", border: "1px solid #EF6C00", progressBackgroundColor: "#EF6C00" },
            { status: "error", backgroundColor: "#EF5350", border: "1px solid #C62828", progressBackgroundColor: "#C62828" },
            { status: "completed", backgroundColor: "#66BB6A", border: "1px solid #2E7D32", progressBackgroundColor: "#2E7D32" }
        ];
        /** @type {?} */
        let _ganttConfig = new GanttConfig();
        this.rowHeight = _ganttConfig.rowHeight;
        this.cellWidth = _ganttConfig.cellWidth;
        this.activityHeight = _ganttConfig.activityHeight;
        this.barHeight = _ganttConfig.barHeight;
        this.barLineHeight = _ganttConfig.barLineHeight;
        this.barTop = _ganttConfig.rowHeight;
        this.barMoveable = _ganttConfig.barMoveable;
    }
    /**
     * @private
     * @param {?} start
     * @param {?} end
     * @param {?=} hours
     * @return {?}
     */
    calculateBarWidth(start, end, hours) {
        if (typeof start === "string") {
            start = new Date(start);
        }
        if (typeof end === "string") {
            end = new Date(end);
        }
        /** @type {?} */
        let days = this.calculateDiffDays(start, end);
        /** @type {?} */
        let width = days * this.cellWidth + days;
        if (hours) {
            width = days * this.hourCellWidth * 24 + days * 24;
        }
        return width;
    }
    /**
     * @private
     * @param {?} start
     * @param {?} scale
     * @param {?=} hours
     * @return {?}
     */
    calculateBarLeft(start, scale, hours) {
        /** @type {?} */
        var left = 0;
        /** @type {?} */
        var hoursInDay = 24;
        if (start != null) {
            if (typeof start === "string") {
                start = new Date();
            }
            for (var i = 0; i < scale.length; i++) {
                if (start.getDate() === scale[i].getDate()) {
                    if (hours) {
                        left = i * hoursInDay * this.hourCellWidth + hoursInDay * i + this.calculateBarLeftDelta(start, hours);
                    }
                    else {
                        left = i * this.cellWidth + i + this.calculateBarLeftDelta(start, hours);
                    }
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
        return `${this.TASK_CACHE.length * this.rowHeight + this.rowHeight * 3}px`;
    }
    /**
     * @private
     * @param {?} start
     * @param {?=} hours
     * @return {?}
     */
    calculateBarLeftDelta(start, hours) {
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
        if (hours) {
            offset = this.hoursCellWidth / hoursInDay * startHours - startHours;
        }
        else {
            offset = this.cellWidth / hoursInDay * startHours;
        }
        return offset;
    }
    /**
     * @param {?} treePath
     * @return {?}
     */
    isParent(treePath) {
        try {
            /** @type {?} */
            var depth = treePath.split('/').length;
            if (depth === 1) {
                return true;
            }
        }
        catch (err) {
            return false;
        }
        return false;
    }
    /**
     * @param {?} treePath
     * @return {?}
     */
    isChild(treePath) {
        if (this.isParent(treePath)) {
            return '0px';
        }
        return '20px';
    }
    /**
     * Calculate the bar styles
     * @param {?} task
     * @param {?} index
     * @param {?} scale
     * @param {?=} hours
     * @return {?}
     */
    calculateBar(task, index, scale, hours) {
        /** @type {?} */
        var barStyle = this.getBarStyle(task.status);
        return {
            'top': this.barTop * index + 2 + 'px',
            'left': this.calculateBarLeft(task.start, scale, hours) + 'px',
            'height': this.barHeight + 'px',
            'line-height': this.barLineHeight + 'px',
            'width': this.calculateBarWidth(task.start, task.end, hours) + 'px',
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
        var style = {};
        try {
            taskStatus = taskStatus.toLowerCase();
        }
        catch (err) {
            taskStatus = "";
        }
        switch (taskStatus) {
            case "information":
                style["background-color"] = this.barStyles[0].backgroundColor;
                style["border"] = this.barStyles[0].border;
                break;
            case "warning":
                style["background-color"] = this.barStyles[1].backgroundColor;
                style["border"] = this.barStyles[1].border;
                break;
            case "error":
                style["background-color"] = this.barStyles[2].backgroundColor;
                style["border"] = this.barStyles[2].border;
                break;
            case "completed":
                style["background-color"] = this.barStyles[3].backgroundColor;
                style["border"] = this.barStyles[3].border;
                break;
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
        var style = {};
        try {
            taskStatus = taskStatus.toLowerCase();
        }
        catch (err) {
            taskStatus = "";
        }
        switch (taskStatus) {
            case "information":
                style["background-color"] = this.barStyles[0].progressBackgroundColor;
                break;
            case "warning":
                style["background-color"] = this.barStyles[1].progressBackgroundColor;
                break;
            case "error":
                style["background-color"] = this.barStyles[2].progressBackgroundColor;
                break;
            case "completed":
                style["background-color"] = this.barStyles[3].progressBackgroundColor;
                break;
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
            let progress = (width / 100) * percent - 2;
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
            let oneDay = 24 * 60 * 60 * 1000;
            // hours*minutes*seconds*milliseconds /ms
            /** @type {?} */
            let diffDays = Math.abs((start.getTime() - end.getTime()) / (oneDay));
            /** @type {?} */
            let days = diffDays;
            return days;
        }
        catch (err) {
            return 0;
        }
    }
    /**
     * Calculates the difference in two dates and returns number of hours
     * @param {?} task
     * @return {?}
     */
    calculateDuration(task) {
        try {
            if (task.start != null && task.end != null) {
                /** @type {?} */
                let oneHour = 60 * 60 * 1000;
                /** @type {?} */
                let diffHours = (Math.abs((task.start.getTime() - task.end.getTime()) / oneHour));
                /** @type {?} */
                let duration = diffHours;
                if (duration > 24) {
                    return `${Math.round(duration / 24)} day(s)`; // duration in days
                }
                else if (duration > 1) {
                    return `${Math.round(duration)} hr(s)`; // duration in hours
                }
                else {
                    /** @type {?} */
                    let minutes = duration * 60;
                    if (minutes < 1) {
                        return `${Math.round(minutes * 60)} second(s)`; // duration in seconds
                    }
                    return `${Math.round(minutes)} min(s)`; // duration in minutes
                }
            }
            return '';
        }
        catch (err) {
            return '';
        }
    }
    /**
     * @param {?} tasks
     * @return {?}
     */
    calculateTotalDuration(tasks) {
        try {
            tasks = tasks.filter(t => t.parentId === t.id); // only calculate total duration with parent tasks
            // only calculate total duration with parent tasks
            /** @type {?} */
            let totalHours = 0;
            /** @type {?} */
            let oneHour = 60 * 60 * 1000;
            for (let i = 0; i < tasks.length; i++) {
                /** @type {?} */
                let start = tasks[i].start;
                /** @type {?} */
                let end = tasks[i].end;
                if (start != null && end != null) {
                    /** @type {?} */
                    let duration = Math.abs(tasks[i].end.getTime() - tasks[i].start.getTime()) / oneHour;
                    totalHours += duration;
                }
            }
            if (totalHours === 0) {
                return '';
            }
            if (totalHours > 24) {
                return `${Math.round(totalHours / 24)} day(s)`; // duration in days
            }
            else if (totalHours > 1) {
                return `${Math.round(totalHours)} hr(s)`; // duration in hours
            }
            else {
                /** @type {?} */
                let minutes = totalHours * 60;
                if (minutes < 1) {
                    return `${Math.round(minutes * 60)} second(s)`; // duration in seconds
                }
                return `${Math.round(minutes)} min(s)`; // duration in minutes
            }
        }
        catch (err) {
            return '';
        }
    }
    /**
     * Calculate the total percentage of a group of tasks
     * @param {?} node
     * @return {?}
     */
    calculateTotalPercentage(node) {
        /** @type {?} */
        var totalPercent = 0;
        /** @type {?} */
        var children = node.children;
        if (children.length > 0) {
            children.forEach((child) => {
                totalPercent += isNaN(child.percentComplete) ? 0 : child.percentComplete;
            });
            return Math.ceil(totalPercent / children.length);
        }
        else {
            return isNaN(node.percentComplete) ? 0 : node.percentComplete;
        }
    }
    /**
     * Calculate the total percent of the parent task
     * @param {?} parent
     * @param {?} tasks
     * @return {?}
     */
    calculateParentTotalPercentage(parent, tasks) {
        /** @type {?} */
        var children = tasks.filter((task) => {
            return task.parentId === parent.id && task.id != parent.id;
        });
        // get only children tasks ignoring parent.
        /** @type {?} */
        var totalPercent = 0;
        if (children.length > 0) {
            children.forEach((child) => {
                totalPercent += isNaN(child.percentComplete) ? 0 : child.percentComplete;
            });
            return Math.ceil(totalPercent / children.length);
        }
        else {
            return isNaN(parent.percentComplete) ? 0 : parent.percentComplete;
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
        let scale = [];
        try {
            while (start.getTime() <= end.getTime()) {
                scale.push(start);
                start = this.addDays(start, 1);
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
        let day = date.getDay();
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
        let result = new Date(date);
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
        let result = new Date(date);
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
        var start;
        /** @type {?} */
        var end;
        /** @type {?} */
        var dates = tasks.map((task) => {
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
    }
    /**
     * Create an hours array for use in time scale component
     * @param {?} cols
     * @return {?}
     */
    getHours(cols) {
        /** @type {?} */
        var hours = [];
        while (hours.length <= cols * 24) {
            for (var i = 0; i <= 23; i++) {
                if (i < 10) {
                    hours.push('0' + i.toString());
                }
                else {
                    hours.push(i.toString());
                }
            }
        }
        return hours;
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
        let containerWidth = (innerWidth - 18);
        return containerWidth;
    }
    /**
     * @return {?}
     */
    calculateActivityContainerDimensions() {
        /** @type {?} */
        var scrollWidth = 18;
        this.windowInnerWidth = window.innerWidth;
        /** @type {?} */
        let width = this.windowInnerWidth - this.gridWidth - scrollWidth;
        return { height: this.activityHeight, width: width };
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
        let verticalScrollTop = verticalScrollElem.scrollTop;
        /** @type {?} */
        let scroll = this.setScrollTop;
        // debounce
        if (verticalScrollTop !== null && verticalScrollTop !== undefined) {
            setTimeout(function () {
                scroll(verticalScrollTop, ganttActivityAreaElem);
                scroll(ganttActivityAreaElem.scrollTop, ganttGridElem);
            }, 50);
        }
    }
    /**
     * Group data by id , only supports one level
     * @param {?} tasks
     * @return {?}
     */
    groupData(tasks) {
        /** @type {?} */
        var merged = [];
        /** @type {?} */
        var groups = new GroupByPipe().transform(tasks, (task) => {
            return [task.treePath.split('/')[0]];
        });
        return merged.concat.apply([], groups);
    }
    /**
     * Create tree of data
     * @param {?} input
     * @return {?}
     */
    transformData(input) {
        /** @type {?} */
        var output = [];
        for (var i = 0; i < input.length; i++) {
            /** @type {?} */
            var chain = input[i].id.split('/');
            /** @type {?} */
            var currentNode = output;
            for (var j = 0; j < chain.length; j++) {
                /** @type {?} */
                var wantedNode = chain[j];
                /** @type {?} */
                var lastNode = currentNode;
                for (var k = 0; k < currentNode.length; k++) {
                    if (currentNode[k].name == wantedNode) {
                        currentNode = currentNode[k].children;
                        break;
                    }
                }
                // If we couldn't find an item in this list of children
                // that has the right name, create one:
                if (lastNode == currentNode) {
                    //TODO(dale): determine way to show percent complete on correct child  
                    /** @type {?} */
                    var newNode = currentNode[k] = {
                        name: wantedNode,
                        percentComplete: input[i].percentComplete,
                        start: input[i].start,
                        end: input[i].end,
                        children: []
                    };
                    currentNode = newNode.children;
                }
            }
        }
        return output;
    }
    /**
     * Checks whether any new data needs to be added to task cache
     * @param {?} tasks
     * @param {?} treeExpanded
     * @return {?}
     */
    doTaskCheck(tasks, treeExpanded) {
        /** @type {?} */
        var cachedTaskIds = this.TASK_CACHE.map((task) => { return task.id; });
        /** @type {?} */
        var itemsToCache = [];
        if (treeExpanded) {
            // push children and parent tasks that are not cached
            tasks.filter((task) => {
                return cachedTaskIds.indexOf(task.id) === -1;
            }).forEach((task) => {
                itemsToCache.push(task);
            });
        }
        else {
            // only look at tasks that are not cached
            tasks.filter((task) => {
                return cachedTaskIds.indexOf(task.id) === -1 && task.treePath.split('/').length === 1;
            }).forEach((task) => {
                itemsToCache.push(task);
            });
        }
        itemsToCache.forEach((item) => {
            this.TASK_CACHE.push(item);
        });
        if (itemsToCache.length > 0) {
            return true;
        }
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
     * @private
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZ2FudHQvIiwic291cmNlcyI6WyJsaWIvc2hhcmVkL3NlcnZpY2VzL2dhbnR0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXJELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUc5RCxNQUFNLE9BQU8sWUFBWTtJQXFCckI7UUFwQk8sY0FBUyxHQUFXLENBQUMsQ0FBQztRQUN0QixrQkFBYSxHQUFXLEVBQUUsQ0FBQyxDQUFDLG9EQUFvRDs7UUFDaEYsbUJBQWMsR0FBVyxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUNqRCxjQUFTLEdBQVcsQ0FBQyxDQUFDO1FBQ3RCLHFCQUFnQixHQUFXLENBQUMsQ0FBQztRQUM3QixtQkFBYyxHQUFXLENBQUMsQ0FBQztRQUMzQixjQUFTLEdBQVcsQ0FBQyxDQUFDO1FBQ3RCLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFDbkIsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFDN0IsY0FBUyxHQUFXLEdBQUcsQ0FBQztRQUN2QixjQUFTLEdBQWdCO1lBQzdCLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxFQUFFLG1CQUFtQixFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRTtZQUMvSCxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFO1lBQ2xILEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFB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QUUsRUFBRTtZQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDekIsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Ozs7OztJQUdNLFdBQVcsQ0FBQyxFQUFVO1FBQ3pCLE9BQU8sSUFBSSxFQUFFLEVBQUUsQ0FBQztJQUNwQixDQUFDOzs7Ozs7Ozs7Ozs7SUFRTyxZQUFZLENBQUMsU0FBaUIsRUFBRSxPQUFZO1FBQ2hELElBQUksT0FBTyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQzNDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1NBQ2pDO0lBQ0wsQ0FBQzs7O1lBbmhCSixVQUFVOzs7Ozs7SUFFUCxpQ0FBNkI7O0lBQzdCLHFDQUFrQzs7SUFDbEMsc0NBQXdEOztJQUN4RCxpQ0FBNkI7O0lBQzdCLHdDQUFvQzs7SUFDcEMsc0NBQWtDOztJQUNsQyxpQ0FBNkI7O0lBQzdCLHFDQUFpQzs7SUFDakMsOEJBQTBCOztJQUMxQixtQ0FBb0M7O0lBQ3BDLGlDQUErQjs7Ozs7SUFDL0IsaUNBS0U7O0lBQ0Ysa0NBQXlCOztJQUN6QixrQ0FBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEdhbnR0Q29uZmlnIH0gZnJvbSAnLi9nYW50dC1jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IElCYXJTdHlsZSwgVGFzaywgSVNjYWxlLCBab29taW5nIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IEdyb3VwQnlQaXBlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3BpcGVzL2dyb3VwQnkucGlwZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBHYW50dFNlcnZpY2Uge1xyXG4gICAgcHVibGljIHJvd0hlaWdodDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBob3VyQ2VsbFdpZHRoOiBudW1iZXIgPSA2MDsgLy8gY2hhbmdlIHRvIDYwIHNvIG1pbnV0ZXMgY2FuIGJlZW4gc2VlbiBtb3JlIGVhc2lseVxyXG4gICAgcHVibGljIGhvdXJzQ2VsbFdpZHRoOiBudW1iZXIgPSB0aGlzLmhvdXJDZWxsV2lkdGggKiAyNTtcclxuICAgIHB1YmxpYyBjZWxsV2lkdGg6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgd2luZG93SW5uZXJXaWR0aDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBhY3Rpdml0eUhlaWdodDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBiYXJIZWlnaHQ6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgYmFyTGluZUhlaWdodDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBiYXJUb3A6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgYmFyTW92ZWFibGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBncmlkV2lkdGg6IG51bWJlciA9IDU2MDtcclxuICAgIHByaXZhdGUgYmFyU3R5bGVzOiBJQmFyU3R5bGVbXSA9IFtcclxuICAgICAgICB7IHN0YXR1czogXCJpbmZvcm1hdGlvblwiLCBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiKDE4LDE5NSwgMjQ0KVwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICMyMTk2RjNcIiwgcHJvZ3Jlc3NCYWNrZ3JvdW5kQ29sb3I6IFwiIzIxOTZGM1wiIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IFwid2FybmluZ1wiLCBiYWNrZ3JvdW5kQ29sb3I6IFwiI0ZGQTcyNlwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICNFRjZDMDBcIiwgcHJvZ3Jlc3NCYWNrZ3JvdW5kQ29sb3I6IFwiI0VGNkMwMFwiIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IFwiZXJyb3JcIiwgYmFja2dyb3VuZENvbG9yOiBcIiNFRjUzNTBcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCAjQzYyODI4XCIsIHByb2dyZXNzQmFja2dyb3VuZENvbG9yOiBcIiNDNjI4MjhcIiB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiBcImNvbXBsZXRlZFwiLCBiYWNrZ3JvdW5kQ29sb3I6IFwiIzY2QkI2QVwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICMyRTdEMzJcIiwgcHJvZ3Jlc3NCYWNrZ3JvdW5kQ29sb3I6IFwiIzJFN0QzMlwiIH1cclxuICAgIF07XHJcbiAgICBwdWJsaWMgVEFTS19DQUNIRTogYW55W107XHJcbiAgICBwdWJsaWMgVElNRV9TQ0FMRTogYW55W107XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgbGV0IF9nYW50dENvbmZpZyA9IG5ldyBHYW50dENvbmZpZygpO1xyXG5cclxuICAgICAgICB0aGlzLnJvd0hlaWdodCA9IF9nYW50dENvbmZpZy5yb3dIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5jZWxsV2lkdGggPSBfZ2FudHRDb25maWcuY2VsbFdpZHRoO1xyXG4gICAgICAgIHRoaXMuYWN0aXZpdHlIZWlnaHQgPSBfZ2FudHRDb25maWcuYWN0aXZpdHlIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5iYXJIZWlnaHQgPSBfZ2FudHRDb25maWcuYmFySGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuYmFyTGluZUhlaWdodCA9IF9nYW50dENvbmZpZy5iYXJMaW5lSGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuYmFyVG9wID0gX2dhbnR0Q29uZmlnLnJvd0hlaWdodDtcclxuICAgICAgICB0aGlzLmJhck1vdmVhYmxlID0gX2dhbnR0Q29uZmlnLmJhck1vdmVhYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlQmFyV2lkdGgoc3RhcnQ6IERhdGUsIGVuZDogRGF0ZSwgaG91cnM/OiBib29sZWFuKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAodHlwZW9mIHN0YXJ0ID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHN0YXJ0ID0gbmV3IERhdGUoc3RhcnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBlbmQgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgZW5kID0gbmV3IERhdGUoZW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBkYXlzID0gdGhpcy5jYWxjdWxhdGVEaWZmRGF5cyhzdGFydCwgZW5kKTtcclxuICAgICAgICBsZXQgd2lkdGg6IG51bWJlciA9IGRheXMgKiB0aGlzLmNlbGxXaWR0aCArIGRheXM7XHJcblxyXG4gICAgICAgIGlmIChob3Vycykge1xyXG4gICAgICAgICAgICB3aWR0aCA9IGRheXMgKiB0aGlzLmhvdXJDZWxsV2lkdGggKiAyNCArIGRheXMgKiAyNDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB3aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZUJhckxlZnQoc3RhcnQ6IERhdGUsIHNjYWxlOiBhbnlbXSwgaG91cnM/OiBib29sZWFuKTogbnVtYmVyIHtcclxuICAgICAgICB2YXIgbGVmdDogbnVtYmVyID0gMDtcclxuICAgICAgICB2YXIgaG91cnNJbkRheTogbnVtYmVyID0gMjQ7XHJcblxyXG4gICAgICAgIGlmIChzdGFydCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzY2FsZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXJ0LmdldERhdGUoKSA9PT0gc2NhbGVbaV0uZ2V0RGF0ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhvdXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQgPSBpICogaG91cnNJbkRheSAqIHRoaXMuaG91ckNlbGxXaWR0aCArIGhvdXJzSW5EYXkgKiBpICsgdGhpcy5jYWxjdWxhdGVCYXJMZWZ0RGVsdGEoc3RhcnQsIGhvdXJzKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gaSAqIHRoaXMuY2VsbFdpZHRoICsgaSArIHRoaXMuY2FsY3VsYXRlQmFyTGVmdERlbHRhKHN0YXJ0LCBob3Vycyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsZWZ0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDYWxjdWxhdGVzIHRoZSBoZWlnaHQgb2YgdGhlIGdhbnR0IGdyaWQsIGFjdGl2aXR5IGFuZCB2ZXJ0aWNhbCBzY3JvbGwgKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVHYW50dEhlaWdodCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBgJHt0aGlzLlRBU0tfQ0FDSEUubGVuZ3RoICogdGhpcy5yb3dIZWlnaHQgKyB0aGlzLnJvd0hlaWdodCAqIDN9cHhgO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlQmFyTGVmdERlbHRhKHN0YXJ0OiBEYXRlLCBob3Vycz86IGJvb2xlYW4pOiBudW1iZXIge1xyXG4gICAgICAgIHZhciBvZmZzZXQ6IG51bWJlciA9IDA7XHJcbiAgICAgICAgdmFyIGhvdXJzSW5EYXk6IG51bWJlciA9IDI0O1xyXG4gICAgICAgIHZhciBtaW51dGVzSW5Ib3VyOiBudW1iZXIgPSA2MDtcclxuICAgICAgICB2YXIgc2Vjb25kc0luSG91cjogbnVtYmVyID0gMzYwMDtcclxuICAgICAgICB2YXIgc3RhcnRIb3VyczogbnVtYmVyID0gc3RhcnQuZ2V0SG91cnMoKSArIHN0YXJ0LmdldE1pbnV0ZXMoKSAvIG1pbnV0ZXNJbkhvdXIgKyBzdGFydC5nZXRTZWNvbmRzKCkgLyBzZWNvbmRzSW5Ib3VyO1xyXG5cclxuICAgICAgICBpZiAoaG91cnMpIHtcclxuICAgICAgICAgICAgb2Zmc2V0ID0gdGhpcy5ob3Vyc0NlbGxXaWR0aCAvIGhvdXJzSW5EYXkgKiBzdGFydEhvdXJzIC0gc3RhcnRIb3VycztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBvZmZzZXQgPSB0aGlzLmNlbGxXaWR0aCAvIGhvdXJzSW5EYXkgKiBzdGFydEhvdXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb2Zmc2V0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc1BhcmVudCh0cmVlUGF0aDogc3RyaW5nKTogYm9vbGVhbiB7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhciBkZXB0aCA9IHRyZWVQYXRoLnNwbGl0KCcvJykubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRlcHRoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0NoaWxkKHRyZWVQYXRoOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1BhcmVudCh0cmVlUGF0aCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICcwcHgnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gJzIwcHgnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDYWxjdWxhdGUgdGhlIGJhciBzdHlsZXMgKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVCYXIodGFzazogYW55LCBpbmRleDogbnVtYmVyLCBzY2FsZTogYW55LCBob3Vycz86IGJvb2xlYW4pIHtcclxuICAgICAgICB2YXIgYmFyU3R5bGUgPSB0aGlzLmdldEJhclN0eWxlKHRhc2suc3RhdHVzKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAndG9wJzogdGhpcy5iYXJUb3AgKiBpbmRleCArIDIgKyAncHgnLFxyXG4gICAgICAgICAgICAnbGVmdCc6IHRoaXMuY2FsY3VsYXRlQmFyTGVmdCh0YXNrLnN0YXJ0LCBzY2FsZSwgaG91cnMpICsgJ3B4JyxcclxuICAgICAgICAgICAgJ2hlaWdodCc6IHRoaXMuYmFySGVpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogdGhpcy5iYXJMaW5lSGVpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgJ3dpZHRoJzogdGhpcy5jYWxjdWxhdGVCYXJXaWR0aCh0YXNrLnN0YXJ0LCB0YXNrLmVuZCwgaG91cnMpICsgJ3B4JyxcclxuICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiBiYXJTdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0sXHJcbiAgICAgICAgICAgICdib3JkZXInOiBiYXJTdHlsZVtcImJvcmRlclwiXVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogR2V0IHRoZSBiYXIgc3R5bGUgYmFzZWQgb24gdGFzayBzdGF0dXMgKi9cclxuICAgIHByaXZhdGUgZ2V0QmFyU3R5bGUodGFza1N0YXR1czogc3RyaW5nID0gXCJcIik6IGFueSB7XHJcbiAgICAgICAgdmFyIHN0eWxlID0ge307XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRhc2tTdGF0dXMgPSB0YXNrU3RhdHVzLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHRhc2tTdGF0dXMgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3dpdGNoICh0YXNrU3RhdHVzKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJpbmZvcm1hdGlvblwiOlxyXG4gICAgICAgICAgICAgICAgc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gdGhpcy5iYXJTdHlsZXNbMF0uYmFja2dyb3VuZENvbG9yO1xyXG4gICAgICAgICAgICAgICAgc3R5bGVbXCJib3JkZXJcIl0gPSB0aGlzLmJhclN0eWxlc1swXS5ib3JkZXI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIndhcm5pbmdcIjpcclxuICAgICAgICAgICAgICAgIHN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSA9IHRoaXMuYmFyU3R5bGVzWzFdLmJhY2tncm91bmRDb2xvcjtcclxuICAgICAgICAgICAgICAgIHN0eWxlW1wiYm9yZGVyXCJdID0gdGhpcy5iYXJTdHlsZXNbMV0uYm9yZGVyO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJlcnJvclwiOlxyXG4gICAgICAgICAgICAgICAgc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gdGhpcy5iYXJTdHlsZXNbMl0uYmFja2dyb3VuZENvbG9yO1xyXG4gICAgICAgICAgICAgICAgc3R5bGVbXCJib3JkZXJcIl0gPSB0aGlzLmJhclN0eWxlc1syXS5ib3JkZXI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNvbXBsZXRlZFwiOlxyXG4gICAgICAgICAgICAgICAgc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gdGhpcy5iYXJTdHlsZXNbM10uYmFja2dyb3VuZENvbG9yO1xyXG4gICAgICAgICAgICAgICAgc3R5bGVbXCJib3JkZXJcIl0gPSB0aGlzLmJhclN0eWxlc1szXS5ib3JkZXI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSA9IFwicmdiKDE4LDE5NSwgMjQ0KVwiO1xyXG4gICAgICAgICAgICAgICAgc3R5bGVbXCJib3JkZXJcIl0gPSBcIjFweCBzb2xpZCAjMjE5NkYzXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogR2V0IHRoZSBwcm9ncmVzc3MgYmFyIGJhY2tncm91bmQgY29sb3VyIGJhc2VkIG9uIHRhc2sgc3RhdHVzICovXHJcbiAgICBwdWJsaWMgZ2V0QmFyUHJvZ3Jlc3NTdHlsZSh0YXNrU3RhdHVzOiBzdHJpbmcgPSBcIlwiKTogYW55IHtcclxuICAgICAgICB2YXIgc3R5bGUgPSB7fTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGFza1N0YXR1cyA9IHRhc2tTdGF0dXMudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgdGFza1N0YXR1cyA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzd2l0Y2ggKHRhc2tTdGF0dXMpIHtcclxuICAgICAgICAgICAgY2FzZSBcImluZm9ybWF0aW9uXCI6XHJcbiAgICAgICAgICAgICAgICBzdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0gPSB0aGlzLmJhclN0eWxlc1swXS5wcm9ncmVzc0JhY2tncm91bmRDb2xvcjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwid2FybmluZ1wiOlxyXG4gICAgICAgICAgICAgICAgc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gdGhpcy5iYXJTdHlsZXNbMV0ucHJvZ3Jlc3NCYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImVycm9yXCI6XHJcbiAgICAgICAgICAgICAgICBzdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0gPSB0aGlzLmJhclN0eWxlc1syXS5wcm9ncmVzc0JhY2tncm91bmRDb2xvcjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY29tcGxldGVkXCI6XHJcbiAgICAgICAgICAgICAgICBzdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0gPSB0aGlzLmJhclN0eWxlc1szXS5wcm9ncmVzc0JhY2tncm91bmRDb2xvcjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gdGhpcy5iYXJTdHlsZXNbMF0ucHJvZ3Jlc3NCYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlcyB0aGUgYmFyIHByb2dyZXNzIHdpZHRoIGluIHBpeGVscyBnaXZlbiB0YXNrIHBlcmNlbnQgY29tcGxldGUgKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVCYXJQcm9ncmVzcyh3aWR0aDogbnVtYmVyLCBwZXJjZW50OiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0eXBlb2YgcGVyY2VudCA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICBpZiAocGVyY2VudCA+IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgcGVyY2VudCA9IDEwMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3M6IG51bWJlciA9ICh3aWR0aCAvIDEwMCkgKiBwZXJjZW50IC0gMjtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBgJHtwcm9ncmVzc31weGA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBgJHswfXB4YDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlcyB0aGUgZGlmZmVyZW5jZSBpbiB0d28gZGF0ZXMgYW5kIHJldHVybnMgbnVtYmVyIG9mIGRheXMgKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVEaWZmRGF5cyhzdGFydDogRGF0ZSwgZW5kOiBEYXRlKTogbnVtYmVyIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsZXQgb25lRGF5ID0gMjQgKiA2MCAqIDYwICogMTAwMDsgLy8gaG91cnMqbWludXRlcypzZWNvbmRzKm1pbGxpc2Vjb25kcyAvbXNcclxuICAgICAgICAgICAgbGV0IGRpZmZEYXlzID0gTWF0aC5hYnMoKHN0YXJ0LmdldFRpbWUoKSAtIGVuZC5nZXRUaW1lKCkpIC8gKG9uZURheSkpO1xyXG4gICAgICAgICAgICBsZXQgZGF5cyA9IGRpZmZEYXlzOyAvLyBkb24ndCB1c2UgTWF0aC5yb3VuZCBhcyBpdCB3aWxsIGRyYXcgYW4gaW5jb3JyZWN0IGJhclxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRheXM7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlcyB0aGUgZGlmZmVyZW5jZSBpbiB0d28gZGF0ZXMgYW5kIHJldHVybnMgbnVtYmVyIG9mIGhvdXJzICovXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlRHVyYXRpb24odGFzazogYW55KTogc3RyaW5nIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAodGFzay5zdGFydCAhPSBudWxsICYmIHRhc2suZW5kICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGxldCBvbmVIb3VyID0gNjAgKiA2MCAqIDEwMDA7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlmZkhvdXJzID0gKE1hdGguYWJzKCh0YXNrLnN0YXJ0LmdldFRpbWUoKSAtIHRhc2suZW5kLmdldFRpbWUoKSkgLyBvbmVIb3VyKSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZHVyYXRpb24gPSBkaWZmSG91cnM7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGR1cmF0aW9uID4gMjQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7TWF0aC5yb3VuZChkdXJhdGlvbiAvIDI0KX0gZGF5KHMpYDsgLy8gZHVyYXRpb24gaW4gZGF5c1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkdXJhdGlvbiA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7TWF0aC5yb3VuZChkdXJhdGlvbil9IGhyKHMpYDsgLy8gZHVyYXRpb24gaW4gaG91cnNcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1pbnV0ZXMgPSBkdXJhdGlvbiAqIDYwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAobWludXRlcyA8IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke01hdGgucm91bmQobWludXRlcyAqIDYwKX0gc2Vjb25kKHMpYDsgLy8gZHVyYXRpb24gaW4gc2Vjb25kc1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7TWF0aC5yb3VuZChtaW51dGVzKX0gbWluKHMpYCAvLyBkdXJhdGlvbiBpbiBtaW51dGVzXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjYWxjdWxhdGVUb3RhbER1cmF0aW9uKHRhc2tzOiBhbnlbXSk6IHN0cmluZyB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGFza3MgPSB0YXNrcy5maWx0ZXIodCA9PiB0LnBhcmVudElkID09PSB0LmlkKTsgLy8gb25seSBjYWxjdWxhdGUgdG90YWwgZHVyYXRpb24gd2l0aCBwYXJlbnQgdGFza3NcclxuXHJcbiAgICAgICAgICAgIGxldCB0b3RhbEhvdXJzID0gMDtcclxuICAgICAgICAgICAgbGV0IG9uZUhvdXIgPSA2MCAqIDYwICogMTAwMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YXNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0YXJ0ID0gdGFza3NbaV0uc3RhcnQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgZW5kID0gdGFza3NbaV0uZW5kO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzdGFydCAhPSBudWxsICYmIGVuZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGR1cmF0aW9uID0gTWF0aC5hYnModGFza3NbaV0uZW5kLmdldFRpbWUoKSAtIHRhc2tzW2ldLnN0YXJ0LmdldFRpbWUoKSkgLyBvbmVIb3VyOyAvLyBkdXJhdGlvbiBpbiBob3Vyc1xyXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsSG91cnMgKz0gZHVyYXRpb247XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0b3RhbEhvdXJzID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0b3RhbEhvdXJzID4gMjQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBgJHtNYXRoLnJvdW5kKHRvdGFsSG91cnMgLyAyNCl9IGRheShzKWA7IC8vIGR1cmF0aW9uIGluIGRheXNcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0b3RhbEhvdXJzID4gMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke01hdGgucm91bmQodG90YWxIb3Vycyl9IGhyKHMpYDsgLy8gZHVyYXRpb24gaW4gaG91cnNcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBtaW51dGVzID0gdG90YWxIb3VycyAqIDYwO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtaW51dGVzIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtNYXRoLnJvdW5kKG1pbnV0ZXMgKiA2MCl9IHNlY29uZChzKWA7IC8vIGR1cmF0aW9uIGluIHNlY29uZHNcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBgJHtNYXRoLnJvdW5kKG1pbnV0ZXMpfSBtaW4ocylgIC8vIGR1cmF0aW9uIGluIG1pbnV0ZXNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDYWxjdWxhdGUgdGhlIHRvdGFsIHBlcmNlbnRhZ2Ugb2YgYSBncm91cCBvZiB0YXNrcyAqL1xyXG4gICAgY2FsY3VsYXRlVG90YWxQZXJjZW50YWdlKG5vZGU6IGFueSk6IG51bWJlciB7XHJcbiAgICAgICAgdmFyIHRvdGFsUGVyY2VudDogbnVtYmVyID0gMDtcclxuICAgICAgICB2YXIgY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuO1xyXG5cclxuICAgICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0b3RhbFBlcmNlbnQgKz0gaXNOYU4oY2hpbGQucGVyY2VudENvbXBsZXRlKSA/IDAgOiBjaGlsZC5wZXJjZW50Q29tcGxldGU7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguY2VpbCh0b3RhbFBlcmNlbnQgLyBjaGlsZHJlbi5sZW5ndGgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpc05hTihub2RlLnBlcmNlbnRDb21wbGV0ZSkgPyAwIDogbm9kZS5wZXJjZW50Q29tcGxldGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDYWxjdWxhdGUgdGhlIHRvdGFsIHBlcmNlbnQgb2YgdGhlIHBhcmVudCB0YXNrICovXHJcbiAgICBjYWxjdWxhdGVQYXJlbnRUb3RhbFBlcmNlbnRhZ2UocGFyZW50OiBhbnksIHRhc2tzOiBhbnlbXSkge1xyXG4gICAgICAgIHZhciBjaGlsZHJlbiA9IHRhc2tzLmZpbHRlcigodGFzazphbnkpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRhc2sucGFyZW50SWQgPT09IHBhcmVudC5pZCAmJiB0YXNrLmlkICE9IHBhcmVudC5pZFxyXG4gICAgICAgIH0pOyAvLyBnZXQgb25seSBjaGlsZHJlbiB0YXNrcyBpZ25vcmluZyBwYXJlbnQuXHJcblxyXG4gICAgICAgIHZhciB0b3RhbFBlcmNlbnQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgICAgIGlmIChjaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goKGNoaWxkOmFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdG90YWxQZXJjZW50ICs9IGlzTmFOKGNoaWxkLnBlcmNlbnRDb21wbGV0ZSkgPyAwIDogY2hpbGQucGVyY2VudENvbXBsZXRlO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmNlaWwodG90YWxQZXJjZW50IC8gY2hpbGRyZW4ubGVuZ3RoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gaXNOYU4ocGFyZW50LnBlcmNlbnRDb21wbGV0ZSkgPyAwIDogcGFyZW50LnBlcmNlbnRDb21wbGV0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENhbGN1bGF0ZSB0aGUgZ2FudHQgc2NhbGUgcmFuZ2UgZ2l2ZW4gdGhlIHN0YXJ0IGFuZCBlbmQgZGF0ZSBvZiB0YXNrcyovXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlU2NhbGUoc3RhcnQ6IERhdGUgPSBuZXcgRGF0ZSgpLCBlbmQ6IERhdGUgPSB0aGlzLmFkZERheXMoc3RhcnQsIDcpKSB7XHJcbiAgICAgICAgbGV0IHNjYWxlOiBhbnlbXSA9IFtdO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB3aGlsZSAoc3RhcnQuZ2V0VGltZSgpIDw9IGVuZC5nZXRUaW1lKCkpIHtcclxuICAgICAgICAgICAgICAgIHNjYWxlLnB1c2goc3RhcnQpO1xyXG4gICAgICAgICAgICAgICAgc3RhcnQgPSB0aGlzLmFkZERheXMoc3RhcnQsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzY2FsZTtcclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzY2FsZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIERldGVybWluZXMgd2hldGhlciBnaXZlbiBkYXRlIGlzIGEgd2Vla2VuZCAqL1xyXG4gICAgcHVibGljIGlzRGF5V2Vla2VuZChkYXRlOiBEYXRlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGRheSA9IGRhdGUuZ2V0RGF5KCk7XHJcblxyXG4gICAgICAgIGlmIChkYXkgPT09IDYgfHwgZGF5ID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEFkZCB4IG51bWJlciBvZiBkYXlzIHRvIGEgZGF0ZSBvYmplY3QgKi9cclxuICAgIHB1YmxpYyBhZGREYXlzKGRhdGU6IERhdGUsIGRheXM6IG51bWJlcik6IERhdGUge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBuZXcgRGF0ZShkYXRlKTtcclxuICAgICAgICByZXN1bHQuc2V0RGF0ZShyZXN1bHQuZ2V0RGF0ZSgpICsgZGF5cyk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvLyoqIFJlbW92ZSB4IG51bWJlciBvZiBkYXlzIGZyb20gYSBkYXRlIG9iamVjdCAqL1xyXG4gICAgcHVibGljIHJlbW92ZURheXMoZGF0ZTogRGF0ZSwgZGF5czogbnVtYmVyKTogRGF0ZSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBEYXRlKGRhdGUpO1xyXG4gICAgICAgIHJlc3VsdC5zZXREYXRlKHJlc3VsdC5nZXREYXRlKCkgLSBkYXlzKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDYWxjdWxhdGVzIHRoZSBncmlkIHNjYWxlIGZvciBnYW50dCBiYXNlZCBvbiB0YXNrcyBzdGFydCBhbmQgZW5kIGRhdGVzICovXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlR3JpZFNjYWxlKHRhc2tzOiBUYXNrW10pOiBJU2NhbGUge1xyXG4gICAgICAgIHZhciBzdGFydDogRGF0ZTtcclxuICAgICAgICB2YXIgZW5kOiBEYXRlO1xyXG4gICAgICAgIHZhciBkYXRlcyA9IHRhc2tzLm1hcCgodGFzazphbnkpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0OiBuZXcgRGF0ZSh0YXNrLnN0YXJ0KSxcclxuICAgICAgICAgICAgICAgIGVuZDogbmV3IERhdGUodGFzay5lbmQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc3RhcnQgPSBuZXcgRGF0ZShNYXRoLm1pbi5hcHBseShudWxsLCBkYXRlcy5tYXAoZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHQuc3RhcnQ7XHJcbiAgICAgICAgfSkpKTtcclxuXHJcbiAgICAgICAgZW5kID0gbmV3IERhdGUoTWF0aC5tYXguYXBwbHkobnVsbCwgZGF0ZXMubWFwKGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0LmVuZDtcclxuICAgICAgICB9KSkpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzdGFydDogc3RhcnQsXHJcbiAgICAgICAgICAgIGVuZDogZW5kXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDcmVhdGUgYW4gaG91cnMgYXJyYXkgZm9yIHVzZSBpbiB0aW1lIHNjYWxlIGNvbXBvbmVudCAqL1xyXG4gICAgcHVibGljIGdldEhvdXJzKGNvbHM6IG51bWJlcik6IHN0cmluZ1tdIHtcclxuICAgICAgICB2YXIgaG91cnM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgIHdoaWxlIChob3Vycy5sZW5ndGggPD0gY29scyAqIDI0KSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IDIzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChpIDwgMTApIHtcclxuICAgICAgICAgICAgICAgICAgICBob3Vycy5wdXNoKCcwJyArIGkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdXJzLnB1c2goaS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGhvdXJzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQ6IGFueSwgYXR0cmlidXRlOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gcGFyc2VJbnQoZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KVthdHRyaWJ1dGVdLCAxMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPKGRhbGUpOiBkZXRlcm1pbmUgd2hldGhlciB0aGlzIGlzIG5lZWRlZFxyXG4gICAgcHVibGljIGNhbGN1bGF0ZUNvbnRhaW5lcldpZHRoKCk6IG51bWJlciB7XHJcbiAgICAgICAgdGhpcy53aW5kb3dJbm5lcldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lcldpZHRoID0gKGlubmVyV2lkdGggLSAxOCk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb250YWluZXJXaWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlQWN0aXZpdHlDb250YWluZXJEaW1lbnNpb25zKCk6IGFueSB7XHJcbiAgICAgICAgdmFyIHNjcm9sbFdpZHRoOiBudW1iZXIgPSAxODtcclxuICAgICAgICB0aGlzLndpbmRvd0lubmVyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICBsZXQgd2lkdGggPSB0aGlzLndpbmRvd0lubmVyV2lkdGggLSB0aGlzLmdyaWRXaWR0aCAtIHNjcm9sbFdpZHRoO1xyXG5cclxuICAgICAgICByZXR1cm4geyBoZWlnaHQ6IHRoaXMuYWN0aXZpdHlIZWlnaHQsIHdpZHRoOiB3aWR0aCB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBTZXQgdGhlIHZlcnRpY2FsIHNjcm9sbCB0b3AgcG9zaXRpb25zIGZvciBnYW50dCAqL1xyXG4gICAgcHVibGljIHNjcm9sbFRvcCh2ZXJ0aWNhbFNjcm9sbEVsZW06IGFueSwgZ2FudHRHcmlkRWxlbTogYW55LCBnYW50dEFjdGl2aXR5QXJlYUVsZW06IGFueSkge1xyXG4gICAgICAgIGxldCB2ZXJ0aWNhbFNjcm9sbFRvcCA9IHZlcnRpY2FsU2Nyb2xsRWxlbS5zY3JvbGxUb3A7XHJcbiAgICAgICAgbGV0IHNjcm9sbCA9IHRoaXMuc2V0U2Nyb2xsVG9wO1xyXG5cclxuICAgICAgICAvLyBkZWJvdW5jZVxyXG4gICAgICAgIGlmICh2ZXJ0aWNhbFNjcm9sbFRvcCAhPT0gbnVsbCAmJiB2ZXJ0aWNhbFNjcm9sbFRvcCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGwodmVydGljYWxTY3JvbGxUb3AsIGdhbnR0QWN0aXZpdHlBcmVhRWxlbSk7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGwoZ2FudHRBY3Rpdml0eUFyZWFFbGVtLnNjcm9sbFRvcCwgZ2FudHRHcmlkRWxlbSk7XHJcblxyXG4gICAgICAgICAgICB9LCA1MCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBHcm91cCBkYXRhIGJ5IGlkICwgb25seSBzdXBwb3J0cyBvbmUgbGV2ZWwqL1xyXG4gICAgcHVibGljIGdyb3VwRGF0YSh0YXNrczogYW55KTogYW55IHtcclxuICAgICAgICB2YXIgbWVyZ2VkOmFueSA9IFtdO1xyXG4gICAgICAgIHZhciBncm91cHM6YW55ID0gbmV3IEdyb3VwQnlQaXBlKCkudHJhbnNmb3JtKHRhc2tzLCAodGFzazphbnkpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIFt0YXNrLnRyZWVQYXRoLnNwbGl0KCcvJylbMF1dXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG1lcmdlZC5jb25jYXQuYXBwbHkoW10sIGdyb3Vwcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENyZWF0ZSB0cmVlIG9mIGRhdGEgKi9cclxuICAgIHB1YmxpYyB0cmFuc2Zvcm1EYXRhKGlucHV0OiBhbnkpOiBhbnkge1xyXG4gICAgICAgIHZhciBvdXRwdXQ6YW55ID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbnB1dC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgY2hhaW46YW55ID0gaW5wdXRbaV0uaWQuc3BsaXQoJy8nKTtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnROb2RlOmFueSA9IG91dHB1dDtcclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjaGFpbi5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHdhbnRlZE5vZGU6YW55ID0gY2hhaW5bal07XHJcbiAgICAgICAgICAgICAgICB2YXIgbGFzdE5vZGU6YW55ID0gY3VycmVudE5vZGU7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGN1cnJlbnROb2RlLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnROb2RlW2tdLm5hbWUgPT0gd2FudGVkTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlW2tdLmNoaWxkcmVuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBjb3VsZG4ndCBmaW5kIGFuIGl0ZW0gaW4gdGhpcyBsaXN0IG9mIGNoaWxkcmVuXHJcbiAgICAgICAgICAgICAgICAvLyB0aGF0IGhhcyB0aGUgcmlnaHQgbmFtZSwgY3JlYXRlIG9uZTpcclxuICAgICAgICAgICAgICAgIGlmIChsYXN0Tm9kZSA9PSBjdXJyZW50Tm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vVE9ETyhkYWxlKTogZGV0ZXJtaW5lIHdheSB0byBzaG93IHBlcmNlbnQgY29tcGxldGUgb24gY29ycmVjdCBjaGlsZCAgXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld05vZGU6YW55ID0gY3VycmVudE5vZGVba10gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHdhbnRlZE5vZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcmNlbnRDb21wbGV0ZTogaW5wdXRbaV0ucGVyY2VudENvbXBsZXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogaW5wdXRbaV0uc3RhcnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZDogaW5wdXRbaV0uZW5kLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW11cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlID0gbmV3Tm9kZS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3V0cHV0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDaGVja3Mgd2hldGhlciBhbnkgbmV3IGRhdGEgbmVlZHMgdG8gYmUgYWRkZWQgdG8gdGFzayBjYWNoZSAgKi9cclxuICAgIHB1YmxpYyBkb1Rhc2tDaGVjayh0YXNrczogYW55W10sIHRyZWVFeHBhbmRlZDogYm9vbGVhbik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHZhciBjYWNoZWRUYXNrSWRzID0gdGhpcy5UQVNLX0NBQ0hFLm1hcCgodGFzazphbnkpID0+IHsgcmV0dXJuIHRhc2suaWQgfSk7XHJcbiAgICAgICAgdmFyIGl0ZW1zVG9DYWNoZTogYW55W10gPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKHRyZWVFeHBhbmRlZCkge1xyXG4gICAgICAgICAgICAvLyBwdXNoIGNoaWxkcmVuIGFuZCBwYXJlbnQgdGFza3MgdGhhdCBhcmUgbm90IGNhY2hlZFxyXG4gICAgICAgICAgICB0YXNrcy5maWx0ZXIoKHRhc2s6YW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGVkVGFza0lkcy5pbmRleE9mKHRhc2suaWQpID09PSAtMVxyXG4gICAgICAgICAgICB9KS5mb3JFYWNoKCh0YXNrOmFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaXRlbXNUb0NhY2hlLnB1c2godGFzayk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gb25seSBsb29rIGF0IHRhc2tzIHRoYXQgYXJlIG5vdCBjYWNoZWRcclxuICAgICAgICAgICAgdGFza3MuZmlsdGVyKCh0YXNrOmFueSkgPT4geyBcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZWRUYXNrSWRzLmluZGV4T2YodGFzay5pZCkgPT09IC0xICYmIHRhc2sudHJlZVBhdGguc3BsaXQoJy8nKS5sZW5ndGggPT09IDEgXHJcbiAgICAgICAgICAgIH0pLmZvckVhY2goKHRhc2s6YW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpdGVtc1RvQ2FjaGUucHVzaCh0YXNrKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpdGVtc1RvQ2FjaGUuZm9yRWFjaCgoaXRlbTphbnkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5UQVNLX0NBQ0hFLnB1c2goaXRlbSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChpdGVtc1RvQ2FjaGUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogU2V0IGEgaWQgcHJlZml4IHNvIENTUzMgcXVlcnkgc2VsZWN0b3IgY2FuIHdvcmsgd2l0aCBpZHMgdGhhdCBjb250YWluIG51bWJlcnMgKi9cclxuICAgIHB1YmxpYyBzZXRJZFByZWZpeChpZDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gYF8ke2lkfWA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLyoqIFJlbW92ZSB0aGUgaWQgcHJlZml4IHRvIGFsbG93IHF1ZXJ5aW5nIG9mIGRhdGEgKi9cclxuICAgIC8vIHB1YmxpYyByZW1vdmVJZFByZWZpeChpZDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIC8vICAgICByZXR1cm4gaWQuc3Vic3RyaW5nKDEsIGlkLmxlbmd0aCAtIDEpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8qKiBTZXQgdGhlIHNjcm9sbCB0b3AgcHJvcGVydHkgb2YgYSBuYXRpdmUgRE9NIGVsZW1lbnQgKi9cclxuICAgIHByaXZhdGUgc2V0U2Nyb2xsVG9wKHNjcm9sbFRvcDogbnVtYmVyLCBlbGVtZW50OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZWxlbWVudCAhPT0gbnVsbCAmJiBlbGVtZW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5zY3JvbGxUb3AgPSBzY3JvbGxUb3A7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==