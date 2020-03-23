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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2dhbnR0LyIsInNvdXJjZXMiOlsibGliL3NoYXJlZC9zZXJ2aWNlcy9nYW50dC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVyRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFHOUQsTUFBTSxPQUFPLFlBQVk7SUFxQnJCO1FBcEJPLGNBQVMsR0FBVyxDQUFDLENBQUM7UUFDdEIsa0JBQWEsR0FBVyxFQUFFLENBQUMsQ0FBQyxvREFBb0Q7O1FBQ2hGLG1CQUFjLEdBQVcsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDakQsY0FBUyxHQUFXLENBQUMsQ0FBQztRQUN0QixxQkFBZ0IsR0FBVyxDQUFDLENBQUM7UUFDN0IsbUJBQWMsR0FBVyxDQUFDLENBQUM7UUFDM0IsY0FBUyxHQUFXLENBQUMsQ0FBQztRQUN0QixrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUMxQixXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBQ25CLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBQzdCLGNBQVMsR0FBVyxHQUFHLENBQUM7UUFDdkIsY0FBUyxHQUFnQjtZQUM3QixFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLGtCQUFrQixFQUFFLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUU7WUFDL0gsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLG1CQUFtQixFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRTtZQUNsSCxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsbUJBQW1C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WUFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3pCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDOzs7Ozs7SUFHTSxXQUFXLENBQUMsRUFBVTtRQUN6QixPQUFPLElBQUksRUFBRSxFQUFFLENBQUM7SUFDcEIsQ0FBQzs7Ozs7Ozs7Ozs7O0lBUU8sWUFBWSxDQUFDLFNBQWlCLEVBQUUsT0FBWTtRQUNoRCxJQUFJLE9BQU8sS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtZQUMzQyxPQUFPLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztTQUNqQztJQUNMLENBQUM7OztZQW5oQkosVUFBVTs7Ozs7O0lBRVAsaUNBQTZCOztJQUM3QixxQ0FBa0M7O0lBQ2xDLHNDQUF3RDs7SUFDeEQsaUNBQTZCOztJQUM3Qix3Q0FBb0M7O0lBQ3BDLHNDQUFrQzs7SUFDbEMsaUNBQTZCOztJQUM3QixxQ0FBaUM7O0lBQ2pDLDhCQUEwQjs7SUFDMUIsbUNBQW9DOztJQUNwQyxpQ0FBK0I7Ozs7O0lBQy9CLGlDQUtFOztJQUNGLGtDQUF5Qjs7SUFDekIsa0NBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBHYW50dENvbmZpZyB9IGZyb20gJy4vZ2FudHQtY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQmFyU3R5bGUsIFRhc2ssIElTY2FsZSwgWm9vbWluZyB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBHcm91cEJ5UGlwZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9waXBlcy9ncm91cEJ5LnBpcGUnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgR2FudHRTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyByb3dIZWlnaHQ6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgaG91ckNlbGxXaWR0aDogbnVtYmVyID0gNjA7IC8vIGNoYW5nZSB0byA2MCBzbyBtaW51dGVzIGNhbiBiZWVuIHNlZW4gbW9yZSBlYXNpbHlcclxuICAgIHB1YmxpYyBob3Vyc0NlbGxXaWR0aDogbnVtYmVyID0gdGhpcy5ob3VyQ2VsbFdpZHRoICogMjU7XHJcbiAgICBwdWJsaWMgY2VsbFdpZHRoOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHdpbmRvd0lubmVyV2lkdGg6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgYWN0aXZpdHlIZWlnaHQ6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgYmFySGVpZ2h0OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGJhckxpbmVIZWlnaHQ6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgYmFyVG9wOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGJhck1vdmVhYmxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgZ3JpZFdpZHRoOiBudW1iZXIgPSA1NjA7XHJcbiAgICBwcml2YXRlIGJhclN0eWxlczogSUJhclN0eWxlW10gPSBbXHJcbiAgICAgICAgeyBzdGF0dXM6IFwiaW5mb3JtYXRpb25cIiwgYmFja2dyb3VuZENvbG9yOiBcInJnYigxOCwxOTUsIDI0NClcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCAjMjE5NkYzXCIsIHByb2dyZXNzQmFja2dyb3VuZENvbG9yOiBcIiMyMTk2RjNcIiB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiBcIndhcm5pbmdcIiwgYmFja2dyb3VuZENvbG9yOiBcIiNGRkE3MjZcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCAjRUY2QzAwXCIsIHByb2dyZXNzQmFja2dyb3VuZENvbG9yOiBcIiNFRjZDMDBcIiB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiBcImVycm9yXCIsIGJhY2tncm91bmRDb2xvcjogXCIjRUY1MzUwXCIsIGJvcmRlcjogXCIxcHggc29saWQgI0M2MjgyOFwiLCBwcm9ncmVzc0JhY2tncm91bmRDb2xvcjogXCIjQzYyODI4XCIgfSxcclxuICAgICAgICB7IHN0YXR1czogXCJjb21wbGV0ZWRcIiwgYmFja2dyb3VuZENvbG9yOiBcIiM2NkJCNkFcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCAjMkU3RDMyXCIsIHByb2dyZXNzQmFja2dyb3VuZENvbG9yOiBcIiMyRTdEMzJcIiB9XHJcbiAgICBdO1xyXG4gICAgcHVibGljIFRBU0tfQ0FDSEU6IGFueVtdO1xyXG4gICAgcHVibGljIFRJTUVfU0NBTEU6IGFueVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGxldCBfZ2FudHRDb25maWcgPSBuZXcgR2FudHRDb25maWcoKTtcclxuXHJcbiAgICAgICAgdGhpcy5yb3dIZWlnaHQgPSBfZ2FudHRDb25maWcucm93SGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuY2VsbFdpZHRoID0gX2dhbnR0Q29uZmlnLmNlbGxXaWR0aDtcclxuICAgICAgICB0aGlzLmFjdGl2aXR5SGVpZ2h0ID0gX2dhbnR0Q29uZmlnLmFjdGl2aXR5SGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuYmFySGVpZ2h0ID0gX2dhbnR0Q29uZmlnLmJhckhlaWdodDtcclxuICAgICAgICB0aGlzLmJhckxpbmVIZWlnaHQgPSBfZ2FudHRDb25maWcuYmFyTGluZUhlaWdodDtcclxuICAgICAgICB0aGlzLmJhclRvcCA9IF9nYW50dENvbmZpZy5yb3dIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5iYXJNb3ZlYWJsZSA9IF9nYW50dENvbmZpZy5iYXJNb3ZlYWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZUJhcldpZHRoKHN0YXJ0OiBEYXRlLCBlbmQ6IERhdGUsIGhvdXJzPzogYm9vbGVhbik6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzdGFydCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICBzdGFydCA9IG5ldyBEYXRlKHN0YXJ0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgZW5kID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIGVuZCA9IG5ldyBEYXRlKGVuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZGF5cyA9IHRoaXMuY2FsY3VsYXRlRGlmZkRheXMoc3RhcnQsIGVuZCk7XHJcbiAgICAgICAgbGV0IHdpZHRoOiBudW1iZXIgPSBkYXlzICogdGhpcy5jZWxsV2lkdGggKyBkYXlzO1xyXG5cclxuICAgICAgICBpZiAoaG91cnMpIHtcclxuICAgICAgICAgICAgd2lkdGggPSBkYXlzICogdGhpcy5ob3VyQ2VsbFdpZHRoICogMjQgKyBkYXlzICogMjQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gd2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVCYXJMZWZ0KHN0YXJ0OiBEYXRlLCBzY2FsZTogYW55W10sIGhvdXJzPzogYm9vbGVhbik6IG51bWJlciB7XHJcbiAgICAgICAgdmFyIGxlZnQ6IG51bWJlciA9IDA7XHJcbiAgICAgICAgdmFyIGhvdXJzSW5EYXk6IG51bWJlciA9IDI0O1xyXG5cclxuICAgICAgICBpZiAoc3RhcnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHN0YXJ0ID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICBzdGFydCA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2NhbGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdGFydC5nZXREYXRlKCkgPT09IHNjYWxlW2ldLmdldERhdGUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChob3Vycykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gaSAqIGhvdXJzSW5EYXkgKiB0aGlzLmhvdXJDZWxsV2lkdGggKyBob3Vyc0luRGF5ICogaSArIHRoaXMuY2FsY3VsYXRlQmFyTGVmdERlbHRhKHN0YXJ0LCBob3Vycyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCA9IGkgKiB0aGlzLmNlbGxXaWR0aCArIGkgKyB0aGlzLmNhbGN1bGF0ZUJhckxlZnREZWx0YShzdGFydCwgaG91cnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGVmdDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlcyB0aGUgaGVpZ2h0IG9mIHRoZSBnYW50dCBncmlkLCBhY3Rpdml0eSBhbmQgdmVydGljYWwgc2Nyb2xsICovXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlR2FudHRIZWlnaHQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gYCR7dGhpcy5UQVNLX0NBQ0hFLmxlbmd0aCAqIHRoaXMucm93SGVpZ2h0ICsgdGhpcy5yb3dIZWlnaHQgKiAzfXB4YDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZUJhckxlZnREZWx0YShzdGFydDogRGF0ZSwgaG91cnM/OiBib29sZWFuKTogbnVtYmVyIHtcclxuICAgICAgICB2YXIgb2Zmc2V0OiBudW1iZXIgPSAwO1xyXG4gICAgICAgIHZhciBob3Vyc0luRGF5OiBudW1iZXIgPSAyNDtcclxuICAgICAgICB2YXIgbWludXRlc0luSG91cjogbnVtYmVyID0gNjA7XHJcbiAgICAgICAgdmFyIHNlY29uZHNJbkhvdXI6IG51bWJlciA9IDM2MDA7XHJcbiAgICAgICAgdmFyIHN0YXJ0SG91cnM6IG51bWJlciA9IHN0YXJ0LmdldEhvdXJzKCkgKyBzdGFydC5nZXRNaW51dGVzKCkgLyBtaW51dGVzSW5Ib3VyICsgc3RhcnQuZ2V0U2Vjb25kcygpIC8gc2Vjb25kc0luSG91cjtcclxuXHJcbiAgICAgICAgaWYgKGhvdXJzKSB7XHJcbiAgICAgICAgICAgIG9mZnNldCA9IHRoaXMuaG91cnNDZWxsV2lkdGggLyBob3Vyc0luRGF5ICogc3RhcnRIb3VycyAtIHN0YXJ0SG91cnM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb2Zmc2V0ID0gdGhpcy5jZWxsV2lkdGggLyBob3Vyc0luRGF5ICogc3RhcnRIb3VycztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9mZnNldDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNQYXJlbnQodHJlZVBhdGg6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgZGVwdGggPSB0cmVlUGF0aC5zcGxpdCgnLycpLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgIGlmIChkZXB0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNDaGlsZCh0cmVlUGF0aDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNQYXJlbnQodHJlZVBhdGgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnMHB4JztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICcyMHB4JztcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlIHRoZSBiYXIgc3R5bGVzICovXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlQmFyKHRhc2s6IGFueSwgaW5kZXg6IG51bWJlciwgc2NhbGU6IGFueSwgaG91cnM/OiBib29sZWFuKSB7XHJcbiAgICAgICAgdmFyIGJhclN0eWxlID0gdGhpcy5nZXRCYXJTdHlsZSh0YXNrLnN0YXR1cyk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ3RvcCc6IHRoaXMuYmFyVG9wICogaW5kZXggKyAyICsgJ3B4JyxcclxuICAgICAgICAgICAgJ2xlZnQnOiB0aGlzLmNhbGN1bGF0ZUJhckxlZnQodGFzay5zdGFydCwgc2NhbGUsIGhvdXJzKSArICdweCcsXHJcbiAgICAgICAgICAgICdoZWlnaHQnOiB0aGlzLmJhckhlaWdodCArICdweCcsXHJcbiAgICAgICAgICAgICdsaW5lLWhlaWdodCc6IHRoaXMuYmFyTGluZUhlaWdodCArICdweCcsXHJcbiAgICAgICAgICAgICd3aWR0aCc6IHRoaXMuY2FsY3VsYXRlQmFyV2lkdGgodGFzay5zdGFydCwgdGFzay5lbmQsIGhvdXJzKSArICdweCcsXHJcbiAgICAgICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogYmFyU3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdLFxyXG4gICAgICAgICAgICAnYm9yZGVyJzogYmFyU3R5bGVbXCJib3JkZXJcIl1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEdldCB0aGUgYmFyIHN0eWxlIGJhc2VkIG9uIHRhc2sgc3RhdHVzICovXHJcbiAgICBwcml2YXRlIGdldEJhclN0eWxlKHRhc2tTdGF0dXM6IHN0cmluZyA9IFwiXCIpOiBhbnkge1xyXG4gICAgICAgIHZhciBzdHlsZSA9IHt9O1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0YXNrU3RhdHVzID0gdGFza1N0YXR1cy50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICB0YXNrU3RhdHVzID0gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN3aXRjaCAodGFza1N0YXR1cykge1xyXG4gICAgICAgICAgICBjYXNlIFwiaW5mb3JtYXRpb25cIjpcclxuICAgICAgICAgICAgICAgIHN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSA9IHRoaXMuYmFyU3R5bGVzWzBdLmJhY2tncm91bmRDb2xvcjtcclxuICAgICAgICAgICAgICAgIHN0eWxlW1wiYm9yZGVyXCJdID0gdGhpcy5iYXJTdHlsZXNbMF0uYm9yZGVyO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ3YXJuaW5nXCI6XHJcbiAgICAgICAgICAgICAgICBzdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0gPSB0aGlzLmJhclN0eWxlc1sxXS5iYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICAgICAgICAgICAgICBzdHlsZVtcImJvcmRlclwiXSA9IHRoaXMuYmFyU3R5bGVzWzFdLmJvcmRlcjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZXJyb3JcIjpcclxuICAgICAgICAgICAgICAgIHN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSA9IHRoaXMuYmFyU3R5bGVzWzJdLmJhY2tncm91bmRDb2xvcjtcclxuICAgICAgICAgICAgICAgIHN0eWxlW1wiYm9yZGVyXCJdID0gdGhpcy5iYXJTdHlsZXNbMl0uYm9yZGVyO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjb21wbGV0ZWRcIjpcclxuICAgICAgICAgICAgICAgIHN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSA9IHRoaXMuYmFyU3R5bGVzWzNdLmJhY2tncm91bmRDb2xvcjtcclxuICAgICAgICAgICAgICAgIHN0eWxlW1wiYm9yZGVyXCJdID0gdGhpcy5iYXJTdHlsZXNbM10uYm9yZGVyO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBzdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0gPSBcInJnYigxOCwxOTUsIDI0NClcIjtcclxuICAgICAgICAgICAgICAgIHN0eWxlW1wiYm9yZGVyXCJdID0gXCIxcHggc29saWQgIzIxOTZGM1wiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3R5bGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEdldCB0aGUgcHJvZ3Jlc3NzIGJhciBiYWNrZ3JvdW5kIGNvbG91ciBiYXNlZCBvbiB0YXNrIHN0YXR1cyAqL1xyXG4gICAgcHVibGljIGdldEJhclByb2dyZXNzU3R5bGUodGFza1N0YXR1czogc3RyaW5nID0gXCJcIik6IGFueSB7XHJcbiAgICAgICAgdmFyIHN0eWxlID0ge307XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRhc2tTdGF0dXMgPSB0YXNrU3RhdHVzLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHRhc2tTdGF0dXMgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3dpdGNoICh0YXNrU3RhdHVzKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJpbmZvcm1hdGlvblwiOlxyXG4gICAgICAgICAgICAgICAgc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gdGhpcy5iYXJTdHlsZXNbMF0ucHJvZ3Jlc3NCYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIndhcm5pbmdcIjpcclxuICAgICAgICAgICAgICAgIHN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSA9IHRoaXMuYmFyU3R5bGVzWzFdLnByb2dyZXNzQmFja2dyb3VuZENvbG9yO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJlcnJvclwiOlxyXG4gICAgICAgICAgICAgICAgc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gdGhpcy5iYXJTdHlsZXNbMl0ucHJvZ3Jlc3NCYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNvbXBsZXRlZFwiOlxyXG4gICAgICAgICAgICAgICAgc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gdGhpcy5iYXJTdHlsZXNbM10ucHJvZ3Jlc3NCYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSA9IHRoaXMuYmFyU3R5bGVzWzBdLnByb2dyZXNzQmFja2dyb3VuZENvbG9yO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3R5bGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENhbGN1bGF0ZXMgdGhlIGJhciBwcm9ncmVzcyB3aWR0aCBpbiBwaXhlbHMgZ2l2ZW4gdGFzayBwZXJjZW50IGNvbXBsZXRlICovXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlQmFyUHJvZ3Jlc3Mod2lkdGg6IG51bWJlciwgcGVyY2VudDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodHlwZW9mIHBlcmNlbnQgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgaWYgKHBlcmNlbnQgPiAxMDApIHtcclxuICAgICAgICAgICAgICAgIHBlcmNlbnQgPSAxMDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHByb2dyZXNzOiBudW1iZXIgPSAod2lkdGggLyAxMDApICogcGVyY2VudCAtIDI7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYCR7cHJvZ3Jlc3N9cHhgO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYCR7MH1weGA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENhbGN1bGF0ZXMgdGhlIGRpZmZlcmVuY2UgaW4gdHdvIGRhdGVzIGFuZCByZXR1cm5zIG51bWJlciBvZiBkYXlzICovXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlRGlmZkRheXMoc3RhcnQ6IERhdGUsIGVuZDogRGF0ZSk6IG51bWJlciB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IG9uZURheSA9IDI0ICogNjAgKiA2MCAqIDEwMDA7IC8vIGhvdXJzKm1pbnV0ZXMqc2Vjb25kcyptaWxsaXNlY29uZHMgL21zXHJcbiAgICAgICAgICAgIGxldCBkaWZmRGF5cyA9IE1hdGguYWJzKChzdGFydC5nZXRUaW1lKCkgLSBlbmQuZ2V0VGltZSgpKSAvIChvbmVEYXkpKTtcclxuICAgICAgICAgICAgbGV0IGRheXMgPSBkaWZmRGF5czsgLy8gZG9uJ3QgdXNlIE1hdGgucm91bmQgYXMgaXQgd2lsbCBkcmF3IGFuIGluY29ycmVjdCBiYXJcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkYXlzO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENhbGN1bGF0ZXMgdGhlIGRpZmZlcmVuY2UgaW4gdHdvIGRhdGVzIGFuZCByZXR1cm5zIG51bWJlciBvZiBob3VycyAqL1xyXG4gICAgcHVibGljIGNhbGN1bGF0ZUR1cmF0aW9uKHRhc2s6IGFueSk6IHN0cmluZyB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHRhc2suc3RhcnQgIT0gbnVsbCAmJiB0YXNrLmVuZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb25lSG91ciA9IDYwICogNjAgKiAxMDAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpZmZIb3VycyA9IChNYXRoLmFicygodGFzay5zdGFydC5nZXRUaW1lKCkgLSB0YXNrLmVuZC5nZXRUaW1lKCkpIC8gb25lSG91cikpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGR1cmF0aW9uID0gZGlmZkhvdXJzO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkdXJhdGlvbiA+IDI0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke01hdGgucm91bmQoZHVyYXRpb24gLyAyNCl9IGRheShzKWA7IC8vIGR1cmF0aW9uIGluIGRheXNcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZHVyYXRpb24gPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke01hdGgucm91bmQoZHVyYXRpb24pfSBocihzKWA7IC8vIGR1cmF0aW9uIGluIGhvdXJzXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtaW51dGVzID0gZHVyYXRpb24gKiA2MDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1pbnV0ZXMgPCAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtNYXRoLnJvdW5kKG1pbnV0ZXMgKiA2MCl9IHNlY29uZChzKWA7IC8vIGR1cmF0aW9uIGluIHNlY29uZHNcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke01hdGgucm91bmQobWludXRlcyl9IG1pbihzKWAgLy8gZHVyYXRpb24gaW4gbWludXRlc1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2FsY3VsYXRlVG90YWxEdXJhdGlvbih0YXNrczogYW55W10pOiBzdHJpbmcge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRhc2tzID0gdGFza3MuZmlsdGVyKHQgPT4gdC5wYXJlbnRJZCA9PT0gdC5pZCk7IC8vIG9ubHkgY2FsY3VsYXRlIHRvdGFsIGR1cmF0aW9uIHdpdGggcGFyZW50IHRhc2tzXHJcblxyXG4gICAgICAgICAgICBsZXQgdG90YWxIb3VycyA9IDA7XHJcbiAgICAgICAgICAgIGxldCBvbmVIb3VyID0gNjAgKiA2MCAqIDEwMDA7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFza3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBzdGFydCA9IHRhc2tzW2ldLnN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgbGV0IGVuZCA9IHRhc2tzW2ldLmVuZDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhcnQgIT0gbnVsbCAmJiBlbmQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkdXJhdGlvbiA9IE1hdGguYWJzKHRhc2tzW2ldLmVuZC5nZXRUaW1lKCkgLSB0YXNrc1tpXS5zdGFydC5nZXRUaW1lKCkpIC8gb25lSG91cjsgLy8gZHVyYXRpb24gaW4gaG91cnNcclxuICAgICAgICAgICAgICAgICAgICB0b3RhbEhvdXJzICs9IGR1cmF0aW9uO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodG90YWxIb3VycyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodG90YWxIb3VycyA+IDI0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7TWF0aC5yb3VuZCh0b3RhbEhvdXJzIC8gMjQpfSBkYXkocylgOyAvLyBkdXJhdGlvbiBpbiBkYXlzXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodG90YWxIb3VycyA+IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBgJHtNYXRoLnJvdW5kKHRvdGFsSG91cnMpfSBocihzKWA7IC8vIGR1cmF0aW9uIGluIGhvdXJzXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWludXRlcyA9IHRvdGFsSG91cnMgKiA2MDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWludXRlcyA8IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7TWF0aC5yb3VuZChtaW51dGVzICogNjApfSBzZWNvbmQocylgOyAvLyBkdXJhdGlvbiBpbiBzZWNvbmRzXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7TWF0aC5yb3VuZChtaW51dGVzKX0gbWluKHMpYCAvLyBkdXJhdGlvbiBpbiBtaW51dGVzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlIHRoZSB0b3RhbCBwZXJjZW50YWdlIG9mIGEgZ3JvdXAgb2YgdGFza3MgKi9cclxuICAgIGNhbGN1bGF0ZVRvdGFsUGVyY2VudGFnZShub2RlOiBhbnkpOiBudW1iZXIge1xyXG4gICAgICAgIHZhciB0b3RhbFBlcmNlbnQ6IG51bWJlciA9IDA7XHJcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gbm9kZS5jaGlsZHJlbjtcclxuXHJcbiAgICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdG90YWxQZXJjZW50ICs9IGlzTmFOKGNoaWxkLnBlcmNlbnRDb21wbGV0ZSkgPyAwIDogY2hpbGQucGVyY2VudENvbXBsZXRlO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmNlaWwodG90YWxQZXJjZW50IC8gY2hpbGRyZW4ubGVuZ3RoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gaXNOYU4obm9kZS5wZXJjZW50Q29tcGxldGUpID8gMCA6IG5vZGUucGVyY2VudENvbXBsZXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlIHRoZSB0b3RhbCBwZXJjZW50IG9mIHRoZSBwYXJlbnQgdGFzayAqL1xyXG4gICAgY2FsY3VsYXRlUGFyZW50VG90YWxQZXJjZW50YWdlKHBhcmVudDogYW55LCB0YXNrczogYW55W10pIHtcclxuICAgICAgICB2YXIgY2hpbGRyZW4gPSB0YXNrcy5maWx0ZXIoKHRhc2s6YW55KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0YXNrLnBhcmVudElkID09PSBwYXJlbnQuaWQgJiYgdGFzay5pZCAhPSBwYXJlbnQuaWRcclxuICAgICAgICB9KTsgLy8gZ2V0IG9ubHkgY2hpbGRyZW4gdGFza3MgaWdub3JpbmcgcGFyZW50LlxyXG5cclxuICAgICAgICB2YXIgdG90YWxQZXJjZW50OiBudW1iZXIgPSAwO1xyXG5cclxuICAgICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZDphbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHRvdGFsUGVyY2VudCArPSBpc05hTihjaGlsZC5wZXJjZW50Q29tcGxldGUpID8gMCA6IGNoaWxkLnBlcmNlbnRDb21wbGV0ZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5jZWlsKHRvdGFsUGVyY2VudCAvIGNoaWxkcmVuLmxlbmd0aCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlzTmFOKHBhcmVudC5wZXJjZW50Q29tcGxldGUpID8gMCA6IHBhcmVudC5wZXJjZW50Q29tcGxldGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDYWxjdWxhdGUgdGhlIGdhbnR0IHNjYWxlIHJhbmdlIGdpdmVuIHRoZSBzdGFydCBhbmQgZW5kIGRhdGUgb2YgdGFza3MqL1xyXG4gICAgcHVibGljIGNhbGN1bGF0ZVNjYWxlKHN0YXJ0OiBEYXRlID0gbmV3IERhdGUoKSwgZW5kOiBEYXRlID0gdGhpcy5hZGREYXlzKHN0YXJ0LCA3KSkge1xyXG4gICAgICAgIGxldCBzY2FsZTogYW55W10gPSBbXTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgd2hpbGUgKHN0YXJ0LmdldFRpbWUoKSA8PSBlbmQuZ2V0VGltZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBzY2FsZS5wdXNoKHN0YXJ0KTtcclxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gdGhpcy5hZGREYXlzKHN0YXJ0LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gc2NhbGU7XHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZXR1cm4gc2NhbGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBEZXRlcm1pbmVzIHdoZXRoZXIgZ2l2ZW4gZGF0ZSBpcyBhIHdlZWtlbmQgKi9cclxuICAgIHB1YmxpYyBpc0RheVdlZWtlbmQoZGF0ZTogRGF0ZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBkYXkgPSBkYXRlLmdldERheSgpO1xyXG5cclxuICAgICAgICBpZiAoZGF5ID09PSA2IHx8IGRheSA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBBZGQgeCBudW1iZXIgb2YgZGF5cyB0byBhIGRhdGUgb2JqZWN0ICovXHJcbiAgICBwdWJsaWMgYWRkRGF5cyhkYXRlOiBEYXRlLCBkYXlzOiBudW1iZXIpOiBEYXRlIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IERhdGUoZGF0ZSk7XHJcbiAgICAgICAgcmVzdWx0LnNldERhdGUocmVzdWx0LmdldERhdGUoKSArIGRheXMpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8qKiBSZW1vdmUgeCBudW1iZXIgb2YgZGF5cyBmcm9tIGEgZGF0ZSBvYmplY3QgKi9cclxuICAgIHB1YmxpYyByZW1vdmVEYXlzKGRhdGU6IERhdGUsIGRheXM6IG51bWJlcik6IERhdGUge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBuZXcgRGF0ZShkYXRlKTtcclxuICAgICAgICByZXN1bHQuc2V0RGF0ZShyZXN1bHQuZ2V0RGF0ZSgpIC0gZGF5cyk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlcyB0aGUgZ3JpZCBzY2FsZSBmb3IgZ2FudHQgYmFzZWQgb24gdGFza3Mgc3RhcnQgYW5kIGVuZCBkYXRlcyAqL1xyXG4gICAgcHVibGljIGNhbGN1bGF0ZUdyaWRTY2FsZSh0YXNrczogVGFza1tdKTogSVNjYWxlIHtcclxuICAgICAgICB2YXIgc3RhcnQ6IERhdGU7XHJcbiAgICAgICAgdmFyIGVuZDogRGF0ZTtcclxuICAgICAgICB2YXIgZGF0ZXMgPSB0YXNrcy5tYXAoKHRhc2s6YW55KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBzdGFydDogbmV3IERhdGUodGFzay5zdGFydCksXHJcbiAgICAgICAgICAgICAgICBlbmQ6IG5ldyBEYXRlKHRhc2suZW5kKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHN0YXJ0ID0gbmV3IERhdGUoTWF0aC5taW4uYXBwbHkobnVsbCwgZGF0ZXMubWFwKGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0LnN0YXJ0O1xyXG4gICAgICAgIH0pKSk7XHJcblxyXG4gICAgICAgIGVuZCA9IG5ldyBEYXRlKE1hdGgubWF4LmFwcGx5KG51bGwsIGRhdGVzLm1hcChmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdC5lbmQ7XHJcbiAgICAgICAgfSkpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxyXG4gICAgICAgICAgICBlbmQ6IGVuZFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogQ3JlYXRlIGFuIGhvdXJzIGFycmF5IGZvciB1c2UgaW4gdGltZSBzY2FsZSBjb21wb25lbnQgKi9cclxuICAgIHB1YmxpYyBnZXRIb3Vycyhjb2xzOiBudW1iZXIpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgdmFyIGhvdXJzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgICAgICB3aGlsZSAoaG91cnMubGVuZ3RoIDw9IGNvbHMgKiAyNCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSAyMzsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA8IDEwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaG91cnMucHVzaCgnMCcgKyBpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBob3Vycy5wdXNoKGkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBob3VycztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50OiBhbnksIGF0dHJpYnV0ZTogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudClbYXR0cmlidXRlXSwgMTApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETyhkYWxlKTogZGV0ZXJtaW5lIHdoZXRoZXIgdGhpcyBpcyBuZWVkZWRcclxuICAgIHB1YmxpYyBjYWxjdWxhdGVDb250YWluZXJXaWR0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIHRoaXMud2luZG93SW5uZXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgIGxldCBjb250YWluZXJXaWR0aCA9IChpbm5lcldpZHRoIC0gMTgpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29udGFpbmVyV2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbGN1bGF0ZUFjdGl2aXR5Q29udGFpbmVyRGltZW5zaW9ucygpOiBhbnkge1xyXG4gICAgICAgIHZhciBzY3JvbGxXaWR0aDogbnVtYmVyID0gMTg7XHJcbiAgICAgICAgdGhpcy53aW5kb3dJbm5lcldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgbGV0IHdpZHRoID0gdGhpcy53aW5kb3dJbm5lcldpZHRoIC0gdGhpcy5ncmlkV2lkdGggLSBzY3JvbGxXaWR0aDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHsgaGVpZ2h0OiB0aGlzLmFjdGl2aXR5SGVpZ2h0LCB3aWR0aDogd2lkdGggfTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogU2V0IHRoZSB2ZXJ0aWNhbCBzY3JvbGwgdG9wIHBvc2l0aW9ucyBmb3IgZ2FudHQgKi9cclxuICAgIHB1YmxpYyBzY3JvbGxUb3AodmVydGljYWxTY3JvbGxFbGVtOiBhbnksIGdhbnR0R3JpZEVsZW06IGFueSwgZ2FudHRBY3Rpdml0eUFyZWFFbGVtOiBhbnkpIHtcclxuICAgICAgICBsZXQgdmVydGljYWxTY3JvbGxUb3AgPSB2ZXJ0aWNhbFNjcm9sbEVsZW0uc2Nyb2xsVG9wO1xyXG4gICAgICAgIGxldCBzY3JvbGwgPSB0aGlzLnNldFNjcm9sbFRvcDtcclxuXHJcbiAgICAgICAgLy8gZGVib3VuY2VcclxuICAgICAgICBpZiAodmVydGljYWxTY3JvbGxUb3AgIT09IG51bGwgJiYgdmVydGljYWxTY3JvbGxUb3AgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsKHZlcnRpY2FsU2Nyb2xsVG9wLCBnYW50dEFjdGl2aXR5QXJlYUVsZW0pO1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsKGdhbnR0QWN0aXZpdHlBcmVhRWxlbS5zY3JvbGxUb3AsIGdhbnR0R3JpZEVsZW0pO1xyXG5cclxuICAgICAgICAgICAgfSwgNTApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogR3JvdXAgZGF0YSBieSBpZCAsIG9ubHkgc3VwcG9ydHMgb25lIGxldmVsKi9cclxuICAgIHB1YmxpYyBncm91cERhdGEodGFza3M6IGFueSk6IGFueSB7XHJcbiAgICAgICAgdmFyIG1lcmdlZDphbnkgPSBbXTtcclxuICAgICAgICB2YXIgZ3JvdXBzOmFueSA9IG5ldyBHcm91cEJ5UGlwZSgpLnRyYW5zZm9ybSh0YXNrcywgKHRhc2s6YW55KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBbdGFzay50cmVlUGF0aC5zcGxpdCgnLycpWzBdXVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBtZXJnZWQuY29uY2F0LmFwcGx5KFtdLCBncm91cHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDcmVhdGUgdHJlZSBvZiBkYXRhICovXHJcbiAgICBwdWJsaWMgdHJhbnNmb3JtRGF0YShpbnB1dDogYW55KTogYW55IHtcclxuICAgICAgICB2YXIgb3V0cHV0OmFueSA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGNoYWluOmFueSA9IGlucHV0W2ldLmlkLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50Tm9kZTphbnkgPSBvdXRwdXQ7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY2hhaW4ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciB3YW50ZWROb2RlOmFueSA9IGNoYWluW2pdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGxhc3ROb2RlOmFueSA9IGN1cnJlbnROb2RlO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBjdXJyZW50Tm9kZS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Tm9kZVtrXS5uYW1lID09IHdhbnRlZE5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZVtrXS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgY291bGRuJ3QgZmluZCBhbiBpdGVtIGluIHRoaXMgbGlzdCBvZiBjaGlsZHJlblxyXG4gICAgICAgICAgICAgICAgLy8gdGhhdCBoYXMgdGhlIHJpZ2h0IG5hbWUsIGNyZWF0ZSBvbmU6XHJcbiAgICAgICAgICAgICAgICBpZiAobGFzdE5vZGUgPT0gY3VycmVudE5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL1RPRE8oZGFsZSk6IGRldGVybWluZSB3YXkgdG8gc2hvdyBwZXJjZW50IGNvbXBsZXRlIG9uIGNvcnJlY3QgY2hpbGQgIFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdOb2RlOmFueSA9IGN1cnJlbnROb2RlW2tdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB3YW50ZWROb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50Q29tcGxldGU6IGlucHV0W2ldLnBlcmNlbnRDb21wbGV0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGlucHV0W2ldLnN0YXJ0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IGlucHV0W2ldLmVuZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZSA9IG5ld05vZGUuY2hpbGRyZW47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2hlY2tzIHdoZXRoZXIgYW55IG5ldyBkYXRhIG5lZWRzIHRvIGJlIGFkZGVkIHRvIHRhc2sgY2FjaGUgICovXHJcbiAgICBwdWJsaWMgZG9UYXNrQ2hlY2sodGFza3M6IGFueVtdLCB0cmVlRXhwYW5kZWQ6IGJvb2xlYW4pOiBib29sZWFuIHtcclxuICAgICAgICB2YXIgY2FjaGVkVGFza0lkcyA9IHRoaXMuVEFTS19DQUNIRS5tYXAoKHRhc2s6YW55KSA9PiB7IHJldHVybiB0YXNrLmlkIH0pO1xyXG4gICAgICAgIHZhciBpdGVtc1RvQ2FjaGU6IGFueVtdID0gW107XHJcblxyXG4gICAgICAgIGlmICh0cmVlRXhwYW5kZWQpIHtcclxuICAgICAgICAgICAgLy8gcHVzaCBjaGlsZHJlbiBhbmQgcGFyZW50IHRhc2tzIHRoYXQgYXJlIG5vdCBjYWNoZWRcclxuICAgICAgICAgICAgdGFza3MuZmlsdGVyKCh0YXNrOmFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFRhc2tJZHMuaW5kZXhPZih0YXNrLmlkKSA9PT0gLTFcclxuICAgICAgICAgICAgfSkuZm9yRWFjaCgodGFzazphbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zVG9DYWNoZS5wdXNoKHRhc2spO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIG9ubHkgbG9vayBhdCB0YXNrcyB0aGF0IGFyZSBub3QgY2FjaGVkXHJcbiAgICAgICAgICAgIHRhc2tzLmZpbHRlcigodGFzazphbnkpID0+IHsgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGVkVGFza0lkcy5pbmRleE9mKHRhc2suaWQpID09PSAtMSAmJiB0YXNrLnRyZWVQYXRoLnNwbGl0KCcvJykubGVuZ3RoID09PSAxIFxyXG4gICAgICAgICAgICB9KS5mb3JFYWNoKCh0YXNrOmFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaXRlbXNUb0NhY2hlLnB1c2godGFzayk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXRlbXNUb0NhY2hlLmZvckVhY2goKGl0ZW06YW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuVEFTS19DQUNIRS5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoaXRlbXNUb0NhY2hlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFNldCBhIGlkIHByZWZpeCBzbyBDU1MzIHF1ZXJ5IHNlbGVjdG9yIGNhbiB3b3JrIHdpdGggaWRzIHRoYXQgY29udGFpbiBudW1iZXJzICovXHJcbiAgICBwdWJsaWMgc2V0SWRQcmVmaXgoaWQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGBfJHtpZH1gO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIC8qKiBSZW1vdmUgdGhlIGlkIHByZWZpeCB0byBhbGxvdyBxdWVyeWluZyBvZiBkYXRhICovXHJcbiAgICAvLyBwdWJsaWMgcmVtb3ZlSWRQcmVmaXgoaWQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAvLyAgICAgcmV0dXJuIGlkLnN1YnN0cmluZygxLCBpZC5sZW5ndGggLSAxKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvKiogU2V0IHRoZSBzY3JvbGwgdG9wIHByb3BlcnR5IG9mIGEgbmF0aXZlIERPTSBlbGVtZW50ICovXHJcbiAgICBwcml2YXRlIHNldFNjcm9sbFRvcChzY3JvbGxUb3A6IG51bWJlciwgZWxlbWVudDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQgIT09IG51bGwgJiYgZWxlbWVudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=