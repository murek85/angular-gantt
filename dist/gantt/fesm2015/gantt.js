import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Injectable, Pipe, Component, Input, EventEmitter, Output, ElementRef, ChangeDetectionStrategy, ViewChild, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GanttConfig {
    constructor() {
        this.cellWidth = 76;
        this.rowHeight = 25;
        this.activityHeight = 300;
        this.barHeight = 20;
        this.barLineHeight = 20;
        this.barMoveable = false;
    }
}
GanttConfig.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Group the array by given function
 * Takes an array argument that defaults to 1.
 * Usage:
 *   array | groupBy:func()
 * Example:
 *   {{ [ { id: '1'}] |  groupBy: }}
 *   formats to: []
*/
class GroupByPipe {
    /**
     * @param {?} array
     * @param {?} f
     * @return {?}
     */
    transform(array, f) {
        /** @type {?} */
        var groups = {};
        array.forEach((o) => {
            /** @type {?} */
            var group = JSON.stringify(f(o));
            groups[group] = groups[group] || [];
            groups[group].push(o);
        });
        return Object.keys(groups).map((group) => {
            return groups[group];
        });
    }
}
GroupByPipe.decorators = [
    { type: Pipe, args: [{ name: 'groupBy' },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GanttService {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GanttComponent {
    /**
     * @param {?} ganttService
     */
    constructor(ganttService) {
        this.ganttService = ganttService;
        this.onGridRowClick = new EventEmitter();
    }
    //TODO(dale): this may be causing an issue in the tree builder?
    /**
     * @param {?} project
     * @return {?}
     */
    set project(project) {
        if (project) {
            this._project = project;
        }
        else {
            this.setDefaultProject();
        }
    }
    /**
     * @return {?}
     */
    get project() { return this._project; }
    /**
     * @param {?} options
     * @return {?}
     */
    set options(options) {
        if (options.scale) {
            this._options = options;
        }
        else {
            this.setDefaultOptions();
        }
    }
    /**
     * @return {?}
     */
    get options() { return this._options; }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    setSizes() {
        this.ganttContainerWidth = this.ganttService.calculateContainerWidth();
    }
    /**
     * @return {?}
     */
    setDefaultOptions() {
        /** @type {?} */
        var scale = this.ganttService.calculateGridScale(this._project.tasks);
        this._options = {
            scale: scale
        };
    }
    /**
     * @return {?}
     */
    setDefaultProject() {
        this._project = {
            id: '',
            name: '',
            startDate: null,
            tasks: []
        };
    }
    /**
     * @param {?} task
     * @return {?}
     */
    gridRowClicked(task) {
        this.onGridRowClick.emit(task);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onResize($event) {
        this.setSizes();
    }
}
GanttComponent.decorators = [
    { type: Component, args: [{
                selector: 'gantt',
                template: `
        <div style="width: 100%">
            <div class="gantt_container" (window:resize)="onResize($event)">
                <gantt-header [name]="_project.name" [startDate]="_project.startDate"></gantt-header>
                <gantt-activity [project]="_project" [options]="_options" (onGridRowClick)="gridRowClicked($event)"></gantt-activity>
                <gantt-footer [project]="_project"></gantt-footer>
            </div>
        </div>
    `,
                providers: [],
                styles: [`
        .gantt_container {
            font-family: Arial;
            font-size: 13px;
            border: 1px solid #cecece;
            position: relative;
            white-space: nowrap;   
            margin-top: 0px;
        }
    `]
            }] }
];
/** @nocollapse */
GanttComponent.ctorParameters = () => [
    { type: GanttService }
];
GanttComponent.propDecorators = {
    project: [{ type: Input }],
    options: [{ type: Input }],
    onGridRowClick: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GanttHeaderComponent {
}
GanttHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'gantt-header',
                template: `
        <div class="gantt-header">
            <div class="gantt-header-title">
                <div style="flex:1">{{ name }}</div>
                <div>Started: {{ startDate | date: 'medium'}}</div>
            </div>
        </div>
    `,
                styles: [`
        .gantt-header {
            background-color: whitesmoke;
            height: 40px;
            border-bottom: 1px solid #e0e0e0;
        }

        .gantt-header-title {
            padding: 12px;   
            display: flex;
            flex-wrap:wrap;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 16px;
        }

        .gantt-header-actions {
            display: inline;
            float: right;
            padding: 6px;
        }
    `]
            }] }
];
GanttHeaderComponent.propDecorators = {
    name: [{ type: Input }],
    startDate: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GanttFooterComponent {
    constructor() { }
}
GanttFooterComponent.decorators = [
    { type: Component, args: [{
                selector: 'gantt-footer',
                template: `<div class="gantt-footer"></div>`,
                styles: [`
        .gantt-footer {
            background-color: whitesmoke;
            height: 36px;
            border-top: 1px solid #e0e0e0;
        }

        .gantt-footer-actions {
            float:right;
        }
    `]
            }] }
];
/** @nocollapse */
GanttFooterComponent.ctorParameters = () => [];
GanttFooterComponent.propDecorators = {
    project: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const Zooming = {
    hours: 0,
    days: 1,
    weeks: 2,
};
Zooming[Zooming.hours] = 'hours';
Zooming[Zooming.days] = 'days';
Zooming[Zooming.weeks] = 'weeks';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GanttActivityComponent {
    /**
     * @param {?} elem
     * @param {?} ganttService
     */
    constructor(elem, ganttService) {
        this.elem = elem;
        this.ganttService = ganttService;
        this.onGridRowClick = new EventEmitter();
        this.upTriangle = '&#x25b2;'; // BLACK UP-POINTING TRIANGLE
        // BLACK UP-POINTING TRIANGLE
        this.downTriangle = '&#x25bc;'; // BLACK DOWN-POINTING TRIANGLE
        // BLACK DOWN-POINTING TRIANGLE
        this.zoom = new EventEmitter();
        this.activityActions = {
            expanded: false,
            expandedIcon: this.downTriangle
        };
        this.zoomLevel = Zooming[Zooming.hours];
        this.treeExpanded = false;
        this.scale = {
            start: null,
            end: null
        };
        this.dimensions = {
            height: 0,
            width: 0
        };
        this.data = [];
        this.gridColumns = [
            { name: '', left: 0, width: 16 },
            { name: 'Task', left: 20, width: 330 },
            { name: '%', left: 8, width: 40 },
            { name: 'Duration', left: 14, width: 140 }
        ];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Cache the project data and only work with that. Only show parent tasks by default
        this.ganttService.TASK_CACHE = this.project.tasks.slice(0).filter((item) => {
            return item.treePath.split('/').length === 1;
        });
        this.ganttService.TIME_SCALE = this.ganttService.calculateScale(this.options.scale.start, this.options.scale.end);
        this.zoomLevel = this.options.zooming;
        this.start = this.options.scale.start;
        this.end = this.options.scale.end;
        this.containerWidth = this.calculateContainerWidth();
        this.containerHeight = this.calculateContainerHeight();
        this.activityContainerSizes = this.ganttService.calculateActivityContainerDimensions();
        // important that these are called last as it relies on values calculated above.
        this.setScale();
        this.setDimensions();
        this.setSizes();
        this.expand(); // default to expanded
    }
    /**
     * Custom model check
     * @return {?}
     */
    ngDoCheck() {
        // do a check to see whether any new tasks have been added. If the task is a child then push into array if tree expanded?
        /** @type {?} */
        var tasksAdded = this.ganttService.doTaskCheck(this.project.tasks, this.treeExpanded);
        // only force expand if tasks are added and tree is already expanded
        if (tasksAdded && this.activityActions.expanded) {
            this.expand(true);
        }
    }
    /**
     * On vertical scroll set the scroll top of grid and activity
     * @param {?} verticalScroll
     * @param {?} ganttGrid
     * @param {?} ganttActivityArea
     * @return {?}
     */
    onVerticalScroll(verticalScroll, ganttGrid, ganttActivityArea) {
        this.ganttService.scrollTop(verticalScroll, ganttGrid, ganttActivityArea);
    }
    /**
     * Removes or adds children for given parent tasks back into DOM by updating TASK_CACHE
     * @param {?} rowElem
     * @param {?} task
     * @return {?}
     */
    toggleChildren(rowElem, task) {
        try {
            /** @type {?} */
            let isParent = "true" === rowElem.getAttribute('data-isparent');
            /** @type {?} */
            let parentId = rowElem.getAttribute('data-parentid').replace("_", "");
            // remove id prefix
            /** @type {?} */
            let children = document.querySelectorAll('[data-parentid=' + rowElem.getAttribute('data-parentid') + '][data-isparent=false]');
            // use the task cache to allow deleting of items without polluting the project.tasks array
            if (isParent) {
                // remove children from the DOM as we don't want them if we are collapsing the parent
                if (children.length > 0) {
                    /** @type {?} */
                    let childrenIds = this.ganttService.TASK_CACHE.filter((task) => {
                        return task.parentId == parentId && task.treePath.split('/').length > 1;
                    }).map((item) => { return item.id; });
                    childrenIds.forEach((item) => {
                        /** @type {?} */
                        var removedIndex = this.ganttService.TASK_CACHE.map((item) => { return item.id; }).indexOf(item);
                        this.ganttService.TASK_CACHE.splice(removedIndex, 1);
                    });
                    if (this.activityActions.expanded) {
                        this.expand(true);
                    }
                }
                else {
                    // CHECK the project cache to see if this parent id has any children
                    // and if so push them back into array so DOM is updated
                    /** @type {?} */
                    let childrenTasks = this.project.tasks.filter((task) => {
                        return task.parentId === parentId && task.treePath.split('/').length > 1;
                    });
                    childrenTasks.forEach((task) => {
                        this.ganttService.TASK_CACHE.push(task);
                    });
                    if (this.activityActions.expanded) {
                        this.expand(true);
                    }
                }
            }
            this.onGridRowClick.emit(task);
        }
        catch (err) { }
    }
    /**
     * Removes or adds children tasks back into DOM by updating TASK_CACHE
     * @return {?}
     */
    toggleAllChildren() {
        try {
            /** @type {?} */
            var children = document.querySelectorAll('[data-isparent=false]');
            /** @type {?} */
            var childrenIds = Array.prototype.slice.call(children).map((item) => {
                return item.getAttribute('data-id').replace("_", ""); // remove id prefix
            });
            // push all the children array items into cache
            if (this.treeExpanded) {
                if (children.length > 0) {
                    /** @type {?} */
                    let childrenIds = this.ganttService.TASK_CACHE.filter((task) => {
                        return task.treePath.split('/').length > 1;
                    }).map((item) => { return item.id; });
                    childrenIds.forEach((item) => {
                        /** @type {?} */
                        var removedIndex = this.ganttService.TASK_CACHE.map((item) => { return item.id; }).indexOf(item);
                        this.ganttService.TASK_CACHE.splice(removedIndex, 1);
                    });
                }
                this.treeExpanded = false;
                if (this.activityActions.expanded) {
                    this.expand(true);
                }
            }
            else {
                // get all children tasks in project input
                /** @type {?} */
                let childrenTasks = this.project.tasks.filter((task) => {
                    return task.treePath.split('/').length > 1;
                });
                if (children.length > 0) {
                    // filter out these children as they already exist in task cache
                    childrenTasks = childrenTasks.filter((task) => {
                        return childrenIds.indexOf(task.id) === -1;
                    });
                }
                childrenTasks.forEach((task) => {
                    this.ganttService.TASK_CACHE.push(task);
                });
                this.treeExpanded = true;
                if (this.activityActions.expanded) {
                    this.expand(true);
                }
            }
        }
        catch (err) { }
    }
    /**
     * On resize of browser window dynamically adjust gantt activity height and width
     * @param {?} event
     * @return {?}
     */
    onResize(event) {
        /** @type {?} */
        let activityContainerSizes = this.ganttService.calculateActivityContainerDimensions();
        if (this.activityActions.expanded) {
            this.ganttActivityHeight = this.ganttService.TASK_CACHE.length * this.ganttService.rowHeight + this.ganttService.rowHeight * 3 + 'px';
        }
        else {
            this.ganttActivityHeight = activityContainerSizes.height + 'px';
        }
        this.ganttActivityWidth = activityContainerSizes.width;
    }
    /**
     * @return {?}
     */
    setScale() {
        this.scale.start = this.start;
        this.scale.end = this.end;
    }
    /**
     * @return {?}
     */
    setDimensions() {
        this.dimensions.height = this.containerHeight;
        this.dimensions.width = this.containerWidth;
    }
    /**
     * @param {?} isParent
     * @return {?}
     */
    setGridRowStyle(isParent) {
        if (isParent) {
            return {
                'height': this.ganttService.rowHeight + 'px',
                'line-height': this.ganttService.rowHeight + 'px',
                'font-weight': 'bold',
                'cursor': 'pointer'
            };
        }
        return {
            'height': this.ganttService.rowHeight + 'px',
            'line-height': this.ganttService.rowHeight + 'px'
        };
    }
    /**
     * Set the zoom level e.g hours, days
     * @param {?} level
     * @return {?}
     */
    zoomTasks(level) {
        this.zoomLevel = level;
        this.zoom.emit(this.zoomLevel);
        this.containerWidth = this.calculateContainerWidth();
        this.setDimensions();
        document.querySelector('.gantt_activity').scrollLeft = 0; // reset scroll left, replace with @ViewChild?
    }
    /**
     * Expand the gantt grid and activity area height
     * @param {?=} force
     * @return {?}
     */
    expand(force) {
        /** @type {?} */
        var verticalScroll = document.querySelector('.gantt_vertical_scroll');
        /** @type {?} */
        var ganttActivityHeight = `${this.ganttService.TASK_CACHE.length * this.ganttService.rowHeight + this.ganttService.rowHeight * 3}px`;
        if (force && this.activityActions.expanded) {
            this.ganttActivityHeight = ganttActivityHeight;
        }
        else if (this.activityActions.expanded) {
            this.activityActions.expanded = false;
            this.activityActions.expandedIcon = this.downTriangle;
            this.ganttActivityHeight = '300px';
        }
        else {
            verticalScroll.scrollTop = 0;
            this.activityActions.expanded = true;
            this.activityActions.expandedIcon = this.upTriangle;
            this.ganttActivityHeight = ganttActivityHeight;
        }
    }
    /**
     * Get the status icon unicode string
     * @param {?} status
     * @param {?} percentComplete
     * @return {?}
     */
    getStatusIcon(status, percentComplete) {
        /** @type {?} */
        var checkMarkIcon = '&#x2714;';
        /** @type {?} */
        var upBlackPointer = '&#x25b2;';
        /** @type {?} */
        var crossMarkIcon = '&#x2718;';
        if (status === "Completed" || percentComplete === 100 && status !== "Error") {
            return checkMarkIcon;
        }
        else if (status === "Warning") {
            return upBlackPointer;
        }
        else if (status === "Error") {
            return crossMarkIcon;
        }
        return '';
    }
    /**
     * Get the status icon color
     * @param {?} status
     * @param {?} percentComplete
     * @return {?}
     */
    getStatusIconColor(status, percentComplete) {
        if (status === "Completed" || percentComplete === 100 && status !== "Error") {
            return 'green';
        }
        else if (status === "Warning") {
            return 'orange';
        }
        else if (status === "Error") {
            return 'red';
        }
        return '';
    }
    /**
     * @return {?}
     */
    setGridScaleStyle() {
        /** @type {?} */
        var height = this.ganttService.rowHeight;
        if (this.zoomLevel === Zooming[Zooming.hours]) {
            height *= 2;
        }
        return {
            'height': height + 'px',
            'line-height': height + 'px',
            'width': this.ganttService.gridWidth + 'px'
        };
    }
    /**
     * @private
     * @return {?}
     */
    calculateContainerHeight() {
        return this.ganttService.TASK_CACHE.length * this.ganttService.rowHeight;
    }
    /**
     * @private
     * @return {?}
     */
    calculateContainerWidth() {
        if (this.zoomLevel === Zooming[Zooming.hours]) {
            return this.ganttService.TIME_SCALE.length * this.ganttService.hourCellWidth * 24 + this.ganttService.hourCellWidth;
        }
        else {
            return this.ganttService.TIME_SCALE.length * this.ganttService.cellWidth + this.ganttService.cellWidth;
        }
    }
    /**
     * @private
     * @return {?}
     */
    setSizes() {
        this.ganttActivityHeight = this.activityContainerSizes.height + 'px';
        this.ganttActivityWidth = this.activityContainerSizes.width;
    }
}
GanttActivityComponent.decorators = [
    { type: Component, args: [{
                selector: 'gantt-activity',
                template: `
    <div class="actions-bar">
        <div style="float: right">
            <label>
                <button (click)="zoomTasks('hours')"
                    style="background-color: whitesmoke; border: none; font-size: 16px; cursor: pointer">Hour</button>
            </label>
            <label>
                <button (click)="zoomTasks('days')"
                    style="background-color: whitesmoke; border: none; font-size: 16px; cursor: pointer">Day</button>
            </label>
            <button (click)="expand()"
                style="background-color: whitesmoke; border: none; font-size: 21px; cursor: pointer"
                [innerHTML]="activityActions.expandedIcon"></button>
        </div>
    </div>
    <div class="grid" #ganttGrid [ngStyle]="{ 'height': ganttActivityHeight, 'width': ganttService.gridWidth + 'px'}">
    <div class="grid-scale" [ngStyle]="setGridScaleStyle()">
        <div class="grid-head-cell"
            *ngFor="let column of gridColumns" [style.width]="column.width + 'px'"
            [style.left]="column.left + 'px'">

            <label>
                {{column.name}}
                <span *ngIf="column.name === 'Duration'"
                    style="font-weight:bold">{{ ganttService.calculateTotalDuration(ganttService.TASK_CACHE) }}</span>
            </label>
        </div>
        <div class="grid-head-cell">
            <button (click)="toggleAllChildren()"
                style="background-color: whitesmoke; border: none; font-size: 21px; cursor: pointer">

                {{ treeExpanded ? '&#x25b2;' : '&#x25bc;' }}
            </button>
        </div>
    </div>
    <div class="grid-data"
        #ganttGridData
        [ngStyle]="{ 'height': ganttService.calculateGanttHeight() }">

    <div #row
        *ngFor="let data of ganttService.groupData(ganttService.TASK_CACHE)"
        (click)="toggleChildren(row, data)" class="grid_row"
        [ngStyle]="setGridRowStyle(ganttService.isParent(data.treePath))"
        [attr.data-id]="ganttService.setIdPrefix(data.id)"
        [attr.data-isParent]="ganttService.isParent(data.treePath)"
        [attr.data-parentid]="ganttService.setIdPrefix(data.parentId)">

            <div class="grid-cell" [ngStyle]="{ 'width': gridColumns[0].width + 'px' }">
                <div [innerHTML]="getStatusIcon(data.status, data.percentComplete)"
                    [style.color]="getStatusIconColor(data.status, data.percentComplete)"></div>
            </div>
            <div class="grid-cell"
                [ngStyle]="{ 'width': gridColumns[1].width + 'px', 'padding-left': ganttService.isChild(data.treePath) }">

                <div class="gantt-tree-content">{{data.name}}</div>
            </div>
            <div class="grid-cell" [ngStyle]="{ 'width': gridColumns[2].width + 'px' }">
                <div>{{ data.percentComplete }}</div>
            </div>
            <div class="grid-cell" [ngStyle]="{ 'width': gridColumns[3].width + 'px'}">
                <div> {{ ganttService.calculateDuration(data) }}</div>
            </div>
        </div>
    </div>
    </div>
    <div class="gantt-activity"
        (window:resize)="onResize($event)"
        [ngStyle]="{ 'height': ganttActivityHeight, 'width': ganttActivityWidth - 18 + 'px'}">

        <time-scale [zoom]="zoom"
            [zoomLevel]="zoomLevel"
            [timeScale]="ganttService.TIME_SCALE"
            [dimensions]="dimensions"></time-scale>
        <div class="gantt-activity-area"
            #ganttActivityArea
            [ngStyle]="{ 'height': ganttService.calculateGanttHeight(), 'width': containerWidth + 'px'}">

            <activity-background [zoom]="zoom"
                [zoomLevel]="zoomLevel"
                [timeScale]="ganttService.TIME_SCALE"
                [tasks]="ganttService.TASK_CACHE"></activity-background>
            <activity-bars [zoom]="zoom"
                [zoomLevel]="zoomLevel"
                [timeScale]="ganttService.TIME_SCALE"
                [dimensions]="dimensions"
                [tasks]="ganttService.TASK_CACHE"></activity-bars>
        </div>
    </div>
    <div class="gantt-vertical-scroll"
        #verticalScroll
        (scroll)="onVerticalScroll(verticalScroll, ganttGrid, ganttActivityArea)"
        [ngStyle]="{'display': activityActions.expanded === true ? 'none' : 'block' }">

        <div [ngStyle]="{ 'height': ganttService.calculateGanttHeight() }"></div>
    </div>
    `,
                changeDetection: ChangeDetectionStrategy.Default,
                styles: [`
        .gantt-activity {
            /*overflow-x: hidden;*/
            overflow-x: auto;
            height: 250px;
            overflow-y: hidden;
            overflow-x: scroll;
            display: inline-block;
            vertical-align: top;
            position:relative;
        }
        .gantt-activity-area {
            position: relative;
            overflow-x: hidden;
            overflow-y: hidden;
            -webkit-user-select: none;
        }
        .gantt-vertical-scroll {
            background-color: transparent;
            overflow-x: hidden;
            overflow-y: scroll;
            position: absolute;
            right: 0;
            display: block;
            height: 283px;
            width: 18px;
            top: 70px;
        }
        .grid {
            overflow-x: hidden;
            overflow-y: hidden;
            display: inline-block;
            vertical-align: top;
            border-right: 1px solid #cecece;
        }
        .grid-scale {
            color: #6b6b6b;
            font-size: 12px;
            border-bottom: 1px solid #e0e0e0;
            background-color: whitesmoke;
        }
        .grid-head-cell {
            /*color: #a6a6a6;*/
            border-top: none !important;
            border-right: none !important;
            line-height: inherit;
            box-sizing: border-box;
            display: inline-block;
            vertical-align: top;
            border-right: 1px solid #cecece;
            /*text-align: center;*/
            position: relative;
            cursor: default;
            height: 100%;
            -moz-user-select: -moz-none;
            -webkit-user-select: none;
            overflow: hidden;
        }
        .grid-data {
            overflow:hidden;
        }
        .grid-row {
            box-sizing: border-box;
            border-bottom: 1px solid #e0e0e0;
            background-color: #fff;
            position: relative;
            -webkit-user-select: none;
        }
        .grid-row:hover {
            background-color: #eeeeee;
        }
        .grid-cell {
            border-right: none;
            color: #454545;
            display: inline-block;
            vertical-align: top;
            padding-left: 6px;
            padding-right: 6px;
            height: 100%;
            overflow: hidden;
            white-space: nowrap;
            font-size: 13px;
            box-sizing: border-box;
        }
        .actions-bar {
            /*border-top: 1px solid #cecece;*/
            border-bottom: 1px solid #e0e0e0;
            clear: both;
            /*margin-top: 90px;*/
            height: 28px;
            background: whitesmoke;
            color: #494949;
            font-family: Arial, sans-serif;
            font-size: 13px;
            padding-left: 15px;
            line-height: 25px;
        }
        .gantt-tree-content {
            padding-left:15px;
        }
    `]
            }] }
];
/** @nocollapse */
GanttActivityComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: GanttService }
];
GanttActivityComponent.propDecorators = {
    project: [{ type: Input }],
    options: [{ type: Input }],
    onGridRowClick: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GanttTimeScaleComponent {
    /**
     * @param {?} ganttService
     */
    constructor(ganttService) {
        this.ganttService = ganttService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.zoom.subscribe((zoomLevel) => {
            this.zoomLevel = zoomLevel;
        });
    }
    /**
     * @return {?}
     */
    setTimescaleStyle() {
        return {
            'width': this.dimensions.width + 'px'
        };
    }
    /**
     * @param {?} borderTop
     * @return {?}
     */
    setTimescaleLineStyle(borderTop) {
        return {
            'height': this.ganttService.rowHeight + 'px',
            'line-height': this.ganttService.rowHeight + 'px',
            'position': 'relative',
            'border-top': borderTop
        };
    }
    /**
     * @return {?}
     */
    setTimescaleCellStyle() {
        /** @type {?} */
        var width = this.ganttService.cellWidth;
        /** @type {?} */
        var hoursInDay = 24;
        /** @type {?} */
        var hourSeperatorPixels = 23;
        if (this.zoomLevel === Zooming[Zooming.hours]) {
            width = this.ganttService.hourCellWidth * hoursInDay + hourSeperatorPixels;
        }
        return {
            'width': width + 'px'
        };
    }
    /**
     * @param {?} date
     * @return {?}
     */
    isDayWeekend(date) {
        return this.ganttService.isDayWeekend(date);
    }
    /**
     * @return {?}
     */
    getHours() {
        return this.ganttService.getHours(this.timeScale.length);
    }
}
GanttTimeScaleComponent.decorators = [
    { type: Component, args: [{
                selector: 'time-scale',
                template: `
        <div class="time-scale" [ngStyle]="setTimescaleStyle()">
            <div class="time-scale-line" [ngStyle]="setTimescaleLineStyle('none')">
                <div class="time-scale-cell" *ngFor="let date of timeScale" 
                    [ngStyle]="setTimescaleCellStyle()"
                    [ngClass]="(isDayWeekend(date)) ? 'weekend' : ''">{{date | date: 'dd-MM-yyyy'}}</div>
            </div>
            <div *ngIf="zoomLevel === 'hours'" class="time-scale-line" [ngStyle]="setTimescaleLineStyle('1px solid #cecece')">
                <div class="time-scale-cell"
                    *ngFor="let hour of getHours()"
                    [ngStyle]="{ 'width': ganttService.hourCellWidth + 'px' }">{{hour}}</div>
            </div>
        </div>`,
                providers: [
                    GanttService
                ],
                styles: [`
        .weekend {
            background-color: whitesmoke;
        }
        .time-scale {
            font-size: 12px;
            border-bottom: 1px solid #cecece;
            background-color: #fff;
        }
        .time-scale-line {
            box-sizing: border-box;
        }
        .time-scale-line:first-child {
            border-top: none;
        }
        .time-scale-cell {
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            border-right: 1px solid #cecece;
            text-align: center;
            height: 100%;
        }`]
            }] }
];
/** @nocollapse */
GanttTimeScaleComponent.ctorParameters = () => [
    { type: GanttService }
];
GanttTimeScaleComponent.propDecorators = {
    timeScale: [{ type: Input }],
    dimensions: [{ type: Input }],
    zoom: [{ type: Input }],
    zoomLevel: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GanttActivityBackgroundComponent {
    /**
     * @param {?} ganttService
     */
    constructor(ganttService) {
        this.ganttService = ganttService;
        this.rows = [];
        this.cells = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.drawGrid();
        this.zoom.subscribe((zoomLevel) => {
            this.zoomLevel = zoomLevel;
            this.drawGrid();
        });
    }
    /**
     * @param {?} date
     * @return {?}
     */
    isDayWeekend(date) {
        return this.ganttService.isDayWeekend(date);
    }
    /**
     * @return {?}
     */
    setRowStyle() {
        return {
            'height': this.ganttService.rowHeight + 'px'
        };
    }
    /**
     * @return {?}
     */
    setCellStyle() {
        /** @type {?} */
        var width = this.ganttService.cellWidth;
        if (this.zoomLevel === Zooming[Zooming.hours]) {
            width = this.ganttService.hourCellWidth;
        }
        return {
            'width': width + 'px'
        };
    }
    /**
     * @private
     * @return {?}
     */
    drawGrid() {
        if (this.zoomLevel === Zooming[Zooming.hours]) {
            this.cells = [];
            this.timeScale.forEach((date) => {
                for (var i = 0; i <= 23; i++) {
                    this.cells.push(date);
                }
            });
        }
        else {
            this.cells = this.timeScale;
        }
    }
}
GanttActivityBackgroundComponent.decorators = [
    { type: Component, args: [{
                selector: 'activity-background',
                template: `
    <div #bg class="gantt-activity-bg">
        <div class="gantt-activity-row"
            [ngStyle]="setRowStyle()"
            *ngFor="let row of ganttService.groupData(tasks)">

            <div class="gantt-activity-cell"
                [ngStyle]="setCellStyle()"
                *ngFor="let cell of cells; let l = last"
                [ngClass]="[(isDayWeekend(cell)) ? 'weekend' : '', l ? 'last-column-cell' : '']"></div>
        </div>
    </div>
    `,
                styles: [`
        .gantt-activity-bg {
            overflow: hidden;
        }
        .gantt-activity-row {
            border-bottom: 1px solid #ebebeb;
            background-color: #fff;
            box-sizing: border-box;
        }
        .gantt-activity-cell {
            display: inline-block;
            height: 100%;
            border-right: 1px solid #ebebeb;
        }
        .weekend {
            background-color: whitesmoke;
        }
    `]
            }] }
];
/** @nocollapse */
GanttActivityBackgroundComponent.ctorParameters = () => [
    { type: GanttService }
];
GanttActivityBackgroundComponent.propDecorators = {
    tasks: [{ type: Input }],
    timeScale: [{ type: Input }],
    zoom: [{ type: Input }],
    zoomLevel: [{ type: Input }],
    bg: [{ type: ViewChild, args: ['bg',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GanttActivityBarsComponent {
    /**
     * @param {?} ganttService
     */
    constructor(ganttService) {
        this.ganttService = ganttService;
        this.containerHeight = 0;
        this.containerWidth = 0;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.containerHeight = this.dimensions.height;
        this.containerWidth = this.dimensions.width;
        this.zoom.subscribe((zoomLevel) => {
            this.zoomLevel = zoomLevel;
        });
    }
    //TODO(dale): the ability to move bars needs reviewing and there are a few quirks
    /**
     * @param {?} $event
     * @param {?} bar
     * @return {?}
     */
    expandLeft($event, bar) {
        $event.stopPropagation();
        /** @type {?} */
        let ganttService = this.ganttService;
        /** @type {?} */
        let startX = $event.clientX;
        /** @type {?} */
        let startBarWidth = bar.style.width;
        /** @type {?} */
        let startBarLeft = bar.style.left;
        /**
         * @param {?} e
         * @return {?}
         */
        function doDrag(e) {
            /** @type {?} */
            let cellWidth = ganttService.cellWidth;
            /** @type {?} */
            let barWidth = startBarWidth - e.clientX + startX;
            /** @type {?} */
            let days = Math.round(barWidth / cellWidth);
            bar.style.width = days * cellWidth + days;
            bar.style.left = (startBarLeft - (days * cellWidth) - days);
        }
        this.addMouseEventListeners(doDrag);
        return false;
    }
    /**
     * @param {?} $event
     * @param {?} bar
     * @return {?}
     */
    expandRight($event, bar) {
        $event.stopPropagation();
        /** @type {?} */
        let ganttService = this.ganttService;
        /** @type {?} */
        let startX = $event.clientX;
        /** @type {?} */
        let startBarWidth = bar.style.width;
        /** @type {?} */
        let startBarEndDate = bar.task.end;
        /** @type {?} */
        let startBarLeft = bar.style.left;
        /**
         * @param {?} e
         * @return {?}
         */
        function doDrag(e) {
            /** @type {?} */
            let cellWidth = ganttService.cellWidth;
            /** @type {?} */
            let barWidth = startBarWidth + e.clientX - startX;
            /** @type {?} */
            let days = Math.round(barWidth / cellWidth);
            if (barWidth < cellWidth) {
                barWidth = cellWidth;
                days = Math.round(barWidth / cellWidth);
            }
            bar.style.width = ((days * cellWidth) + days); // rounds to the nearest cell
        }
        this.addMouseEventListeners(doDrag);
        return false;
    }
    /**
     * @param {?} $event
     * @param {?} bar
     * @return {?}
     */
    move($event, bar) {
        $event.stopPropagation();
        /** @type {?} */
        let ganttService = this.ganttService;
        /** @type {?} */
        let startX = $event.clientX;
        /** @type {?} */
        let startBarLeft = bar.style.left;
        /**
         * @param {?} e
         * @return {?}
         */
        function doDrag(e) {
            /** @type {?} */
            let cellWidth = ganttService.cellWidth;
            /** @type {?} */
            let barLeft = startBarLeft + e.clientX - startX;
            /** @type {?} */
            let days = Math.round(barLeft / cellWidth);
            // TODO: determine how many days the bar can be moved
            // if (days < maxDays) {
            bar.style.left = ((days * cellWidth) + days); // rounded to nearest cell
            // keep bar in bounds of grid
            if (barLeft < 0) {
                bar.style.left = 0;
            }
            // }
            // TODO: it needs to take into account the max number of days.
            // TODO: it needs to take into account the current days.
            // TODO: it needs to take into account the right boundary.
        }
        this.addMouseEventListeners(doDrag);
        return false;
    }
    /**
     * @param {?} task
     * @param {?} index
     * @return {?}
     */
    drawBar(task, index) {
        /** @type {?} */
        let style = {};
        if (this.zoomLevel === Zooming[Zooming.hours]) {
            style = this.ganttService.calculateBar(task, index, this.timeScale, true);
        }
        else {
            style = this.ganttService.calculateBar(task, index, this.timeScale);
        }
        return style;
    }
    /**
     * @param {?} task
     * @param {?} bar
     * @return {?}
     */
    drawProgress(task, bar) {
        /** @type {?} */
        var barStyle = this.ganttService.getBarProgressStyle(task.status);
        /** @type {?} */
        var width = this.ganttService.calculateBarProgress(this.ganttService.getComputedStyle(bar, 'width'), task.percentComplete);
        return {
            'width': width,
            'background-color': barStyle["background-color"],
        };
    }
    /**
     * @private
     * @param {?} dragFn
     * @return {?}
     */
    addMouseEventListeners(dragFn) {
        /**
         * @return {?}
         */
        function stopFn() {
            document.documentElement.removeEventListener('mousemove', dragFn, false);
            document.documentElement.removeEventListener('mouseup', stopFn, false);
            document.documentElement.removeEventListener('mouseleave', stopFn, false);
        }
        document.documentElement.addEventListener('mousemove', dragFn, false);
        document.documentElement.addEventListener('mouseup', stopFn, false);
        document.documentElement.addEventListener('mouseleave', stopFn, false);
    }
}
GanttActivityBarsComponent.decorators = [
    { type: Component, args: [{
                selector: 'activity-bars',
                template: `
    <div class="gantt-activity-bars-area" 
        [ngStyle]="{ 'height': containerHeight + 'px', 'width': containerWidth + 'px' }">

        <div #bar class="gantt-activity-line"
            *ngFor="let task of ganttService.groupData(tasks); let i = index"
            [ngStyle]="drawBar(task, i)">

            <div class="gantt-activity-progress" [ngStyle]="drawProgress(task, bar)"></div>
            <div class="gantt-activity-progress_drag" style="left: 518px"></div>
            <div class="gantt-activity-content"></div>
            <div class="gantt-activity-link-control gantt-activity-right" style="height: 26px; line-height: 30px">
                <div class="gantt-link-point"></div>
            </div>
            <div class="gantt-activity-link-control gantt-activity-left" style="height: 26px; line-height: 30px">
                <div class="gantt-link-point"></div>
            </div>
        </div>
    </div>
    `,
                providers: [
                    GanttService
                ],
                styles: [`
    .gantt-activity-line {
        /*border-radius: 2px;*/
        position: absolute;
        box-sizing: border-box;
        background-color: rgb(18,195,244);
        border: 1px solid #2196F3;
        -webkit-user-select: none;
    }
    .gantt-activity-line:hover {
        /*cursor: move;*/
    }
    .gantt-activity-progress {
        text-align: center;
        z-index: 0;
        background: #2196F3;
        position: absolute;
        min-height: 18px;
        display: block;
        height: 18px;
    }
    .gantt-activity-progress-drag {
        height: 8px;
        width: 8px;
        bottom: -4px;
        margin-left: 4px;
        background-position: bottom;
        background-image: "";
        background-repeat: no-repeat;
        z-index: 2;
    }
    .gantt-activity-content {
        font-size: 12px;
        color: #fff;
        width: 100%;
        top: 0;
        position: absolute;
        white-space: nowrap;
        text-align: center;
        line-height: inherit;
        overflow: hidden;
        height: 100%;
    }
    .gantt-activity-link-control {
        position: absolute;
        width: 13px;
        top: 0;
    }
    .gantt-activity-right {
        right: 0;
    }
    .gantt-activity-left {
        left: 0;
    }
    .gantt-activity-right:hover {
        cursor:w-resize;
    }
    .gantt-activity-left:hover {
        cursor:w-resize;
    }
    `]
            }] }
];
/** @nocollapse */
GanttActivityBarsComponent.ctorParameters = () => [
    { type: GanttService }
];
GanttActivityBarsComponent.propDecorators = {
    timeScale: [{ type: Input }],
    dimensions: [{ type: Input }],
    tasks: [{ type: Input }],
    zoom: [{ type: Input }],
    zoomLevel: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GanttActivityModule {
}
GanttActivityModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                ],
                exports: [
                    GanttActivityComponent,
                    GanttTimeScaleComponent,
                    GanttActivityBackgroundComponent,
                    GanttActivityBarsComponent
                ],
                declarations: [
                    GanttActivityComponent,
                    GanttTimeScaleComponent,
                    GanttActivityBackgroundComponent,
                    GanttActivityBarsComponent
                ],
                providers: [],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GanttModule {
}
GanttModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    GanttActivityModule,
                ],
                exports: [
                    GanttComponent
                ],
                declarations: [
                    GanttComponent,
                    GanttHeaderComponent,
                    GanttFooterComponent,
                    GroupByPipe
                ],
                providers: [GanttService],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { GanttModule, GanttActivityBackgroundComponent as ɵe, GanttActivityBarsComponent as ɵf, GanttActivityComponent as ɵb, GanttActivityModule as ɵa, GanttTimeScaleComponent as ɵd, GanttFooterComponent as ɵi, GanttComponent as ɵg, GanttHeaderComponent as ɵh, GroupByPipe as ɵj, GanttService as ɵc };

//# sourceMappingURL=gantt.js.map