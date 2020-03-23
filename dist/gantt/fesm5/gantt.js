import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Injectable, Pipe, Component, Input, EventEmitter, Output, ElementRef, ChangeDetectionStrategy, ViewChild, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var GanttConfig = /** @class */ (function () {
    function GanttConfig() {
        this.cellWidth = 76;
        this.rowHeight = 25;
        this.activityHeight = 300;
        this.barHeight = 20;
        this.barLineHeight = 20;
        this.barMoveable = false;
    }
    GanttConfig.decorators = [
        { type: Injectable }
    ];
    return GanttConfig;
}());

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
var GroupByPipe = /** @class */ (function () {
    function GroupByPipe() {
    }
    /**
     * @param {?} array
     * @param {?} f
     * @return {?}
     */
    GroupByPipe.prototype.transform = /**
     * @param {?} array
     * @param {?} f
     * @return {?}
     */
    function (array, f) {
        /** @type {?} */
        var groups = {};
        array.forEach(function (o) {
            /** @type {?} */
            var group = JSON.stringify(f(o));
            groups[group] = groups[group] || [];
            groups[group].push(o);
        });
        return Object.keys(groups).map(function (group) {
            return groups[group];
        });
    };
    GroupByPipe.decorators = [
        { type: Pipe, args: [{ name: 'groupBy' },] }
    ];
    return GroupByPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
        this.gridWidth = 560;
        this.barStyles = [
            { status: "information", backgroundColor: "rgb(18,195, 244)", border: "1px solid #2196F3", progressBackgroundColor: "#2196F3" },
            { status: "warning", backgroundColor: "#FFA726", border: "1px solid #EF6C00", progressBackgroundColor: "#EF6C00" },
            { status: "error", backgroundColor: "#EF5350", border: "1px solid #C62828", progressBackgroundColor: "#C62828" },
            { status: "completed", backgroundColor: "#66BB6A", border: "1px solid #2E7D32", progressBackgroundColor: "#2E7D32" }
        ];
        /** @type {?} */
        var _ganttConfig = new GanttConfig();
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
    GanttService.prototype.calculateBarWidth = /**
     * @private
     * @param {?} start
     * @param {?} end
     * @param {?=} hours
     * @return {?}
     */
    function (start, end, hours) {
        if (typeof start === "string") {
            start = new Date(start);
        }
        if (typeof end === "string") {
            end = new Date(end);
        }
        /** @type {?} */
        var days = this.calculateDiffDays(start, end);
        /** @type {?} */
        var width = days * this.cellWidth + days;
        if (hours) {
            width = days * this.hourCellWidth * 24 + days * 24;
        }
        return width;
    };
    /**
     * @private
     * @param {?} start
     * @param {?} scale
     * @param {?=} hours
     * @return {?}
     */
    GanttService.prototype.calculateBarLeft = /**
     * @private
     * @param {?} start
     * @param {?} scale
     * @param {?=} hours
     * @return {?}
     */
    function (start, scale, hours) {
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
        return this.TASK_CACHE.length * this.rowHeight + this.rowHeight * 3 + "px";
    };
    /**
     * @private
     * @param {?} start
     * @param {?=} hours
     * @return {?}
     */
    GanttService.prototype.calculateBarLeftDelta = /**
     * @private
     * @param {?} start
     * @param {?=} hours
     * @return {?}
     */
    function (start, hours) {
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
    };
    /**
     * @param {?} treePath
     * @return {?}
     */
    GanttService.prototype.isParent = /**
     * @param {?} treePath
     * @return {?}
     */
    function (treePath) {
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
    };
    /**
     * @param {?} treePath
     * @return {?}
     */
    GanttService.prototype.isChild = /**
     * @param {?} treePath
     * @return {?}
     */
    function (treePath) {
        if (this.isParent(treePath)) {
            return '0px';
        }
        return '20px';
    };
    /** Calculate the bar styles */
    /**
     * Calculate the bar styles
     * @param {?} task
     * @param {?} index
     * @param {?} scale
     * @param {?=} hours
     * @return {?}
     */
    GanttService.prototype.calculateBar = /**
     * Calculate the bar styles
     * @param {?} task
     * @param {?} index
     * @param {?} scale
     * @param {?=} hours
     * @return {?}
     */
    function (task, index, scale, hours) {
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
    };
    /** Get the bar style based on task status */
    /**
     * Get the bar style based on task status
     * @private
     * @param {?=} taskStatus
     * @return {?}
     */
    GanttService.prototype.getBarStyle = /**
     * Get the bar style based on task status
     * @private
     * @param {?=} taskStatus
     * @return {?}
     */
    function (taskStatus) {
        if (taskStatus === void 0) { taskStatus = ""; }
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
    };
    /** Get the progresss bar background colour based on task status */
    /**
     * Get the progresss bar background colour based on task status
     * @param {?=} taskStatus
     * @return {?}
     */
    GanttService.prototype.getBarProgressStyle = /**
     * Get the progresss bar background colour based on task status
     * @param {?=} taskStatus
     * @return {?}
     */
    function (taskStatus) {
        if (taskStatus === void 0) { taskStatus = ""; }
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
    };
    /** Calculates the bar progress width in pixels given task percent complete */
    /**
     * Calculates the bar progress width in pixels given task percent complete
     * @param {?} width
     * @param {?} percent
     * @return {?}
     */
    GanttService.prototype.calculateBarProgress = /**
     * Calculates the bar progress width in pixels given task percent complete
     * @param {?} width
     * @param {?} percent
     * @return {?}
     */
    function (width, percent) {
        if (typeof percent === "number") {
            if (percent > 100) {
                percent = 100;
            }
            /** @type {?} */
            var progress = (width / 100) * percent - 2;
            return progress + "px";
        }
        return 0 + "px";
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
    /** Calculates the difference in two dates and returns number of hours */
    /**
     * Calculates the difference in two dates and returns number of hours
     * @param {?} task
     * @return {?}
     */
    GanttService.prototype.calculateDuration = /**
     * Calculates the difference in two dates and returns number of hours
     * @param {?} task
     * @return {?}
     */
    function (task) {
        try {
            if (task.start != null && task.end != null) {
                /** @type {?} */
                var oneHour = 60 * 60 * 1000;
                /** @type {?} */
                var diffHours = (Math.abs((task.start.getTime() - task.end.getTime()) / oneHour));
                /** @type {?} */
                var duration = diffHours;
                if (duration > 24) {
                    return Math.round(duration / 24) + " day(s)"; // duration in days
                }
                else if (duration > 1) {
                    return Math.round(duration) + " hr(s)"; // duration in hours
                }
                else {
                    /** @type {?} */
                    var minutes = duration * 60;
                    if (minutes < 1) {
                        return Math.round(minutes * 60) + " second(s)"; // duration in seconds
                    }
                    return Math.round(minutes) + " min(s)"; // duration in minutes
                }
            }
            return '';
        }
        catch (err) {
            return '';
        }
    };
    /**
     * @param {?} tasks
     * @return {?}
     */
    GanttService.prototype.calculateTotalDuration = /**
     * @param {?} tasks
     * @return {?}
     */
    function (tasks) {
        try {
            tasks = tasks.filter(function (t) { return t.parentId === t.id; }); // only calculate total duration with parent tasks
            // only calculate total duration with parent tasks
            /** @type {?} */
            var totalHours = 0;
            /** @type {?} */
            var oneHour = 60 * 60 * 1000;
            for (var i = 0; i < tasks.length; i++) {
                /** @type {?} */
                var start = tasks[i].start;
                /** @type {?} */
                var end = tasks[i].end;
                if (start != null && end != null) {
                    /** @type {?} */
                    var duration = Math.abs(tasks[i].end.getTime() - tasks[i].start.getTime()) / oneHour;
                    totalHours += duration;
                }
            }
            if (totalHours === 0) {
                return '';
            }
            if (totalHours > 24) {
                return Math.round(totalHours / 24) + " day(s)"; // duration in days
            }
            else if (totalHours > 1) {
                return Math.round(totalHours) + " hr(s)"; // duration in hours
            }
            else {
                /** @type {?} */
                var minutes = totalHours * 60;
                if (minutes < 1) {
                    return Math.round(minutes * 60) + " second(s)"; // duration in seconds
                }
                return Math.round(minutes) + " min(s)"; // duration in minutes
            }
        }
        catch (err) {
            return '';
        }
    };
    /** Calculate the total percentage of a group of tasks */
    /**
     * Calculate the total percentage of a group of tasks
     * @param {?} node
     * @return {?}
     */
    GanttService.prototype.calculateTotalPercentage = /**
     * Calculate the total percentage of a group of tasks
     * @param {?} node
     * @return {?}
     */
    function (node) {
        /** @type {?} */
        var totalPercent = 0;
        /** @type {?} */
        var children = node.children;
        if (children.length > 0) {
            children.forEach(function (child) {
                totalPercent += isNaN(child.percentComplete) ? 0 : child.percentComplete;
            });
            return Math.ceil(totalPercent / children.length);
        }
        else {
            return isNaN(node.percentComplete) ? 0 : node.percentComplete;
        }
    };
    /** Calculate the total percent of the parent task */
    /**
     * Calculate the total percent of the parent task
     * @param {?} parent
     * @param {?} tasks
     * @return {?}
     */
    GanttService.prototype.calculateParentTotalPercentage = /**
     * Calculate the total percent of the parent task
     * @param {?} parent
     * @param {?} tasks
     * @return {?}
     */
    function (parent, tasks) {
        /** @type {?} */
        var children = tasks.filter(function (task) {
            return task.parentId === parent.id && task.id != parent.id;
        });
        // get only children tasks ignoring parent.
        /** @type {?} */
        var totalPercent = 0;
        if (children.length > 0) {
            children.forEach(function (child) {
                totalPercent += isNaN(child.percentComplete) ? 0 : child.percentComplete;
            });
            return Math.ceil(totalPercent / children.length);
        }
        else {
            return isNaN(parent.percentComplete) ? 0 : parent.percentComplete;
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
                start = this.addDays(start, 1);
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
    /** Create an hours array for use in time scale component */
    /**
     * Create an hours array for use in time scale component
     * @param {?} cols
     * @return {?}
     */
    GanttService.prototype.getHours = /**
     * Create an hours array for use in time scale component
     * @param {?} cols
     * @return {?}
     */
    function (cols) {
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
        var containerWidth = (innerWidth - 18);
        return containerWidth;
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
        var width = this.windowInnerWidth - this.gridWidth - scrollWidth;
        return { height: this.activityHeight, width: width };
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
            setTimeout(function () {
                scroll(verticalScrollTop, ganttActivityAreaElem);
                scroll(ganttActivityAreaElem.scrollTop, ganttGridElem);
            }, 50);
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
        /** @type {?} */
        var merged = [];
        /** @type {?} */
        var groups = new GroupByPipe().transform(tasks, function (task) {
            return [task.treePath.split('/')[0]];
        });
        return merged.concat.apply([], groups);
    };
    /** Create tree of data */
    /**
     * Create tree of data
     * @param {?} input
     * @return {?}
     */
    GanttService.prototype.transformData = /**
     * Create tree of data
     * @param {?} input
     * @return {?}
     */
    function (input) {
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
    };
    /** Checks whether any new data needs to be added to task cache  */
    /**
     * Checks whether any new data needs to be added to task cache
     * @param {?} tasks
     * @param {?} treeExpanded
     * @return {?}
     */
    GanttService.prototype.doTaskCheck = /**
     * Checks whether any new data needs to be added to task cache
     * @param {?} tasks
     * @param {?} treeExpanded
     * @return {?}
     */
    function (tasks, treeExpanded) {
        var _this = this;
        /** @type {?} */
        var cachedTaskIds = this.TASK_CACHE.map(function (task) { return task.id; });
        /** @type {?} */
        var itemsToCache = [];
        if (treeExpanded) {
            // push children and parent tasks that are not cached
            tasks.filter(function (task) {
                return cachedTaskIds.indexOf(task.id) === -1;
            }).forEach(function (task) {
                itemsToCache.push(task);
            });
        }
        else {
            // only look at tasks that are not cached
            tasks.filter(function (task) {
                return cachedTaskIds.indexOf(task.id) === -1 && task.treePath.split('/').length === 1;
            }).forEach(function (task) {
                itemsToCache.push(task);
            });
        }
        itemsToCache.forEach(function (item) {
            _this.TASK_CACHE.push(item);
        });
        if (itemsToCache.length > 0) {
            return true;
        }
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
     * @private
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
     * @private
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var GanttComponent = /** @class */ (function () {
    function GanttComponent(ganttService) {
        this.ganttService = ganttService;
        this.onGridRowClick = new EventEmitter();
    }
    Object.defineProperty(GanttComponent.prototype, "project", {
        get: /**
         * @return {?}
         */
        function () { return this._project; },
        //TODO(dale): this may be causing an issue in the tree builder?
        set: 
        //TODO(dale): this may be causing an issue in the tree builder?
        /**
         * @param {?} project
         * @return {?}
         */
        function (project) {
            if (project) {
                this._project = project;
            }
            else {
                this.setDefaultProject();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GanttComponent.prototype, "options", {
        get: /**
         * @return {?}
         */
        function () { return this._options; },
        set: /**
         * @param {?} options
         * @return {?}
         */
        function (options) {
            if (options.scale) {
                this._options = options;
            }
            else {
                this.setDefaultOptions();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    GanttComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    GanttComponent.prototype.setSizes = /**
     * @return {?}
     */
    function () {
        this.ganttContainerWidth = this.ganttService.calculateContainerWidth();
    };
    /**
     * @return {?}
     */
    GanttComponent.prototype.setDefaultOptions = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var scale = this.ganttService.calculateGridScale(this._project.tasks);
        this._options = {
            scale: scale
        };
    };
    /**
     * @return {?}
     */
    GanttComponent.prototype.setDefaultProject = /**
     * @return {?}
     */
    function () {
        this._project = {
            id: '',
            name: '',
            startDate: null,
            tasks: []
        };
    };
    /**
     * @param {?} task
     * @return {?}
     */
    GanttComponent.prototype.gridRowClicked = /**
     * @param {?} task
     * @return {?}
     */
    function (task) {
        this.onGridRowClick.emit(task);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    GanttComponent.prototype.onResize = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.setSizes();
    };
    GanttComponent.decorators = [
        { type: Component, args: [{
                    selector: 'gantt',
                    template: "\n        <div style=\"width: 100%\">\n            <div class=\"gantt_container\" (window:resize)=\"onResize($event)\">\n                <gantt-header [name]=\"_project.name\" [startDate]=\"_project.startDate\"></gantt-header>\n                <gantt-activity [project]=\"_project\" [options]=\"_options\" (onGridRowClick)=\"gridRowClicked($event)\"></gantt-activity>\n                <gantt-footer [project]=\"_project\"></gantt-footer>\n            </div>\n        </div>\n    ",
                    providers: [],
                    styles: ["\n        .gantt_container {\n            font-family: Arial;\n            font-size: 13px;\n            border: 1px solid #cecece;\n            position: relative;\n            white-space: nowrap;   \n            margin-top: 0px;\n        }\n    "]
                }] }
    ];
    /** @nocollapse */
    GanttComponent.ctorParameters = function () { return [
        { type: GanttService }
    ]; };
    GanttComponent.propDecorators = {
        project: [{ type: Input }],
        options: [{ type: Input }],
        onGridRowClick: [{ type: Output }]
    };
    return GanttComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var GanttHeaderComponent = /** @class */ (function () {
    function GanttHeaderComponent() {
    }
    GanttHeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'gantt-header',
                    template: "\n        <div class=\"gantt-header\">\n            <div class=\"gantt-header-title\">\n                <div style=\"flex:1\">{{ name }}</div>\n                <div>Started: {{ startDate | date: 'medium'}}</div>\n            </div>\n        </div>\n    ",
                    styles: ["\n        .gantt-header {\n            background-color: whitesmoke;\n            height: 40px;\n            border-bottom: 1px solid #e0e0e0;\n        }\n\n        .gantt-header-title {\n            padding: 12px;   \n            display: flex;\n            flex-wrap:wrap;\n            font-family: Arial, Helvetica, sans-serif;\n            font-size: 16px;\n        }\n\n        .gantt-header-actions {\n            display: inline;\n            float: right;\n            padding: 6px;\n        }\n    "]
                }] }
    ];
    GanttHeaderComponent.propDecorators = {
        name: [{ type: Input }],
        startDate: [{ type: Input }]
    };
    return GanttHeaderComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var GanttFooterComponent = /** @class */ (function () {
    function GanttFooterComponent() {
    }
    GanttFooterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'gantt-footer',
                    template: "<div class=\"gantt-footer\"></div>",
                    styles: ["\n        .gantt-footer {\n            background-color: whitesmoke;\n            height: 36px;\n            border-top: 1px solid #e0e0e0;\n        }\n\n        .gantt-footer-actions {\n            float:right;\n        }\n    "]
                }] }
    ];
    /** @nocollapse */
    GanttFooterComponent.ctorParameters = function () { return []; };
    GanttFooterComponent.propDecorators = {
        project: [{ type: Input }]
    };
    return GanttFooterComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
var Zooming = {
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
var GanttActivityComponent = /** @class */ (function () {
    function GanttActivityComponent(elem, ganttService) {
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
    GanttActivityComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // Cache the project data and only work with that. Only show parent tasks by default
        this.ganttService.TASK_CACHE = this.project.tasks.slice(0).filter(function (item) {
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
    };
    /** Custom model check */
    /**
     * Custom model check
     * @return {?}
     */
    GanttActivityComponent.prototype.ngDoCheck = /**
     * Custom model check
     * @return {?}
     */
    function () {
        // do a check to see whether any new tasks have been added. If the task is a child then push into array if tree expanded?
        /** @type {?} */
        var tasksAdded = this.ganttService.doTaskCheck(this.project.tasks, this.treeExpanded);
        // only force expand if tasks are added and tree is already expanded
        if (tasksAdded && this.activityActions.expanded) {
            this.expand(true);
        }
    };
    /** On vertical scroll set the scroll top of grid and activity  */
    /**
     * On vertical scroll set the scroll top of grid and activity
     * @param {?} verticalScroll
     * @param {?} ganttGrid
     * @param {?} ganttActivityArea
     * @return {?}
     */
    GanttActivityComponent.prototype.onVerticalScroll = /**
     * On vertical scroll set the scroll top of grid and activity
     * @param {?} verticalScroll
     * @param {?} ganttGrid
     * @param {?} ganttActivityArea
     * @return {?}
     */
    function (verticalScroll, ganttGrid, ganttActivityArea) {
        this.ganttService.scrollTop(verticalScroll, ganttGrid, ganttActivityArea);
    };
    /** Removes or adds children for given parent tasks back into DOM by updating TASK_CACHE */
    /**
     * Removes or adds children for given parent tasks back into DOM by updating TASK_CACHE
     * @param {?} rowElem
     * @param {?} task
     * @return {?}
     */
    GanttActivityComponent.prototype.toggleChildren = /**
     * Removes or adds children for given parent tasks back into DOM by updating TASK_CACHE
     * @param {?} rowElem
     * @param {?} task
     * @return {?}
     */
    function (rowElem, task) {
        var _this = this;
        try {
            /** @type {?} */
            var isParent = "true" === rowElem.getAttribute('data-isparent');
            /** @type {?} */
            var parentId_1 = rowElem.getAttribute('data-parentid').replace("_", "");
            // remove id prefix
            /** @type {?} */
            var children = document.querySelectorAll('[data-parentid=' + rowElem.getAttribute('data-parentid') + '][data-isparent=false]');
            // use the task cache to allow deleting of items without polluting the project.tasks array
            if (isParent) {
                // remove children from the DOM as we don't want them if we are collapsing the parent
                if (children.length > 0) {
                    /** @type {?} */
                    var childrenIds = this.ganttService.TASK_CACHE.filter(function (task) {
                        return task.parentId == parentId_1 && task.treePath.split('/').length > 1;
                    }).map(function (item) { return item.id; });
                    childrenIds.forEach(function (item) {
                        /** @type {?} */
                        var removedIndex = _this.ganttService.TASK_CACHE.map(function (item) { return item.id; }).indexOf(item);
                        _this.ganttService.TASK_CACHE.splice(removedIndex, 1);
                    });
                    if (this.activityActions.expanded) {
                        this.expand(true);
                    }
                }
                else {
                    // CHECK the project cache to see if this parent id has any children
                    // and if so push them back into array so DOM is updated
                    /** @type {?} */
                    var childrenTasks = this.project.tasks.filter(function (task) {
                        return task.parentId === parentId_1 && task.treePath.split('/').length > 1;
                    });
                    childrenTasks.forEach(function (task) {
                        _this.ganttService.TASK_CACHE.push(task);
                    });
                    if (this.activityActions.expanded) {
                        this.expand(true);
                    }
                }
            }
            this.onGridRowClick.emit(task);
        }
        catch (err) { }
    };
    /** Removes or adds children tasks back into DOM by updating TASK_CACHE */
    /**
     * Removes or adds children tasks back into DOM by updating TASK_CACHE
     * @return {?}
     */
    GanttActivityComponent.prototype.toggleAllChildren = /**
     * Removes or adds children tasks back into DOM by updating TASK_CACHE
     * @return {?}
     */
    function () {
        var _this = this;
        try {
            /** @type {?} */
            var children = document.querySelectorAll('[data-isparent=false]');
            /** @type {?} */
            var childrenIds = Array.prototype.slice.call(children).map(function (item) {
                return item.getAttribute('data-id').replace("_", ""); // remove id prefix
            });
            // push all the children array items into cache
            if (this.treeExpanded) {
                if (children.length > 0) {
                    /** @type {?} */
                    var childrenIds_1 = this.ganttService.TASK_CACHE.filter(function (task) {
                        return task.treePath.split('/').length > 1;
                    }).map(function (item) { return item.id; });
                    childrenIds_1.forEach(function (item) {
                        /** @type {?} */
                        var removedIndex = _this.ganttService.TASK_CACHE.map(function (item) { return item.id; }).indexOf(item);
                        _this.ganttService.TASK_CACHE.splice(removedIndex, 1);
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
                var childrenTasks = this.project.tasks.filter(function (task) {
                    return task.treePath.split('/').length > 1;
                });
                if (children.length > 0) {
                    // filter out these children as they already exist in task cache
                    childrenTasks = childrenTasks.filter(function (task) {
                        return childrenIds.indexOf(task.id) === -1;
                    });
                }
                childrenTasks.forEach(function (task) {
                    _this.ganttService.TASK_CACHE.push(task);
                });
                this.treeExpanded = true;
                if (this.activityActions.expanded) {
                    this.expand(true);
                }
            }
        }
        catch (err) { }
    };
    /** On resize of browser window dynamically adjust gantt activity height and width */
    /**
     * On resize of browser window dynamically adjust gantt activity height and width
     * @param {?} event
     * @return {?}
     */
    GanttActivityComponent.prototype.onResize = /**
     * On resize of browser window dynamically adjust gantt activity height and width
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var activityContainerSizes = this.ganttService.calculateActivityContainerDimensions();
        if (this.activityActions.expanded) {
            this.ganttActivityHeight = this.ganttService.TASK_CACHE.length * this.ganttService.rowHeight + this.ganttService.rowHeight * 3 + 'px';
        }
        else {
            this.ganttActivityHeight = activityContainerSizes.height + 'px';
        }
        this.ganttActivityWidth = activityContainerSizes.width;
    };
    /**
     * @return {?}
     */
    GanttActivityComponent.prototype.setScale = /**
     * @return {?}
     */
    function () {
        this.scale.start = this.start;
        this.scale.end = this.end;
    };
    /**
     * @return {?}
     */
    GanttActivityComponent.prototype.setDimensions = /**
     * @return {?}
     */
    function () {
        this.dimensions.height = this.containerHeight;
        this.dimensions.width = this.containerWidth;
    };
    /**
     * @param {?} isParent
     * @return {?}
     */
    GanttActivityComponent.prototype.setGridRowStyle = /**
     * @param {?} isParent
     * @return {?}
     */
    function (isParent) {
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
    };
    /** Set the zoom level e.g hours, days */
    /**
     * Set the zoom level e.g hours, days
     * @param {?} level
     * @return {?}
     */
    GanttActivityComponent.prototype.zoomTasks = /**
     * Set the zoom level e.g hours, days
     * @param {?} level
     * @return {?}
     */
    function (level) {
        this.zoomLevel = level;
        this.zoom.emit(this.zoomLevel);
        this.containerWidth = this.calculateContainerWidth();
        this.setDimensions();
        document.querySelector('.gantt_activity').scrollLeft = 0; // reset scroll left, replace with @ViewChild?
    };
    /** Expand the gantt grid and activity area height */
    /**
     * Expand the gantt grid and activity area height
     * @param {?=} force
     * @return {?}
     */
    GanttActivityComponent.prototype.expand = /**
     * Expand the gantt grid and activity area height
     * @param {?=} force
     * @return {?}
     */
    function (force) {
        /** @type {?} */
        var verticalScroll = document.querySelector('.gantt_vertical_scroll');
        /** @type {?} */
        var ganttActivityHeight = this.ganttService.TASK_CACHE.length * this.ganttService.rowHeight + this.ganttService.rowHeight * 3 + "px";
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
    };
    /** Get the status icon unicode string */
    /**
     * Get the status icon unicode string
     * @param {?} status
     * @param {?} percentComplete
     * @return {?}
     */
    GanttActivityComponent.prototype.getStatusIcon = /**
     * Get the status icon unicode string
     * @param {?} status
     * @param {?} percentComplete
     * @return {?}
     */
    function (status, percentComplete) {
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
    };
    /** Get the status icon color */
    /**
     * Get the status icon color
     * @param {?} status
     * @param {?} percentComplete
     * @return {?}
     */
    GanttActivityComponent.prototype.getStatusIconColor = /**
     * Get the status icon color
     * @param {?} status
     * @param {?} percentComplete
     * @return {?}
     */
    function (status, percentComplete) {
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
    };
    /**
     * @return {?}
     */
    GanttActivityComponent.prototype.setGridScaleStyle = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @private
     * @return {?}
     */
    GanttActivityComponent.prototype.calculateContainerHeight = /**
     * @private
     * @return {?}
     */
    function () {
        return this.ganttService.TASK_CACHE.length * this.ganttService.rowHeight;
    };
    /**
     * @private
     * @return {?}
     */
    GanttActivityComponent.prototype.calculateContainerWidth = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.zoomLevel === Zooming[Zooming.hours]) {
            return this.ganttService.TIME_SCALE.length * this.ganttService.hourCellWidth * 24 + this.ganttService.hourCellWidth;
        }
        else {
            return this.ganttService.TIME_SCALE.length * this.ganttService.cellWidth + this.ganttService.cellWidth;
        }
    };
    /**
     * @private
     * @return {?}
     */
    GanttActivityComponent.prototype.setSizes = /**
     * @private
     * @return {?}
     */
    function () {
        this.ganttActivityHeight = this.activityContainerSizes.height + 'px';
        this.ganttActivityWidth = this.activityContainerSizes.width;
    };
    GanttActivityComponent.decorators = [
        { type: Component, args: [{
                    selector: 'gantt-activity',
                    template: "\n    <div class=\"actions-bar\">\n        <div style=\"float: right\">\n            <label>\n                <button (click)=\"zoomTasks('hours')\"\n                    style=\"background-color: whitesmoke; border: none; font-size: 16px; cursor: pointer\">Hour</button>\n            </label>\n            <label>\n                <button (click)=\"zoomTasks('days')\"\n                    style=\"background-color: whitesmoke; border: none; font-size: 16px; cursor: pointer\">Day</button>\n            </label>\n            <button (click)=\"expand()\"\n                style=\"background-color: whitesmoke; border: none; font-size: 21px; cursor: pointer\"\n                [innerHTML]=\"activityActions.expandedIcon\"></button>\n        </div>\n    </div>\n    <div class=\"grid\" #ganttGrid [ngStyle]=\"{ 'height': ganttActivityHeight, 'width': ganttService.gridWidth + 'px'}\">\n    <div class=\"grid-scale\" [ngStyle]=\"setGridScaleStyle()\">\n        <div class=\"grid-head-cell\"\n            *ngFor=\"let column of gridColumns\" [style.width]=\"column.width + 'px'\"\n            [style.left]=\"column.left + 'px'\">\n\n            <label>\n                {{column.name}}\n                <span *ngIf=\"column.name === 'Duration'\"\n                    style=\"font-weight:bold\">{{ ganttService.calculateTotalDuration(ganttService.TASK_CACHE) }}</span>\n            </label>\n        </div>\n        <div class=\"grid-head-cell\">\n            <button (click)=\"toggleAllChildren()\"\n                style=\"background-color: whitesmoke; border: none; font-size: 21px; cursor: pointer\">\n\n                {{ treeExpanded ? '&#x25b2;' : '&#x25bc;' }}\n            </button>\n        </div>\n    </div>\n    <div class=\"grid-data\"\n        #ganttGridData\n        [ngStyle]=\"{ 'height': ganttService.calculateGanttHeight() }\">\n\n    <div #row\n        *ngFor=\"let data of ganttService.groupData(ganttService.TASK_CACHE)\"\n        (click)=\"toggleChildren(row, data)\" class=\"grid_row\"\n        [ngStyle]=\"setGridRowStyle(ganttService.isParent(data.treePath))\"\n        [attr.data-id]=\"ganttService.setIdPrefix(data.id)\"\n        [attr.data-isParent]=\"ganttService.isParent(data.treePath)\"\n        [attr.data-parentid]=\"ganttService.setIdPrefix(data.parentId)\">\n\n            <div class=\"grid-cell\" [ngStyle]=\"{ 'width': gridColumns[0].width + 'px' }\">\n                <div [innerHTML]=\"getStatusIcon(data.status, data.percentComplete)\"\n                    [style.color]=\"getStatusIconColor(data.status, data.percentComplete)\"></div>\n            </div>\n            <div class=\"grid-cell\"\n                [ngStyle]=\"{ 'width': gridColumns[1].width + 'px', 'padding-left': ganttService.isChild(data.treePath) }\">\n\n                <div class=\"gantt-tree-content\">{{data.name}}</div>\n            </div>\n            <div class=\"grid-cell\" [ngStyle]=\"{ 'width': gridColumns[2].width + 'px' }\">\n                <div>{{ data.percentComplete }}</div>\n            </div>\n            <div class=\"grid-cell\" [ngStyle]=\"{ 'width': gridColumns[3].width + 'px'}\">\n                <div> {{ ganttService.calculateDuration(data) }}</div>\n            </div>\n        </div>\n    </div>\n    </div>\n    <div class=\"gantt-activity\"\n        (window:resize)=\"onResize($event)\"\n        [ngStyle]=\"{ 'height': ganttActivityHeight, 'width': ganttActivityWidth - 18 + 'px'}\">\n\n        <time-scale [zoom]=\"zoom\"\n            [zoomLevel]=\"zoomLevel\"\n            [timeScale]=\"ganttService.TIME_SCALE\"\n            [dimensions]=\"dimensions\"></time-scale>\n        <div class=\"gantt-activity-area\"\n            #ganttActivityArea\n            [ngStyle]=\"{ 'height': ganttService.calculateGanttHeight(), 'width': containerWidth + 'px'}\">\n\n            <activity-background [zoom]=\"zoom\"\n                [zoomLevel]=\"zoomLevel\"\n                [timeScale]=\"ganttService.TIME_SCALE\"\n                [tasks]=\"ganttService.TASK_CACHE\"></activity-background>\n            <activity-bars [zoom]=\"zoom\"\n                [zoomLevel]=\"zoomLevel\"\n                [timeScale]=\"ganttService.TIME_SCALE\"\n                [dimensions]=\"dimensions\"\n                [tasks]=\"ganttService.TASK_CACHE\"></activity-bars>\n        </div>\n    </div>\n    <div class=\"gantt-vertical-scroll\"\n        #verticalScroll\n        (scroll)=\"onVerticalScroll(verticalScroll, ganttGrid, ganttActivityArea)\"\n        [ngStyle]=\"{'display': activityActions.expanded === true ? 'none' : 'block' }\">\n\n        <div [ngStyle]=\"{ 'height': ganttService.calculateGanttHeight() }\"></div>\n    </div>\n    ",
                    changeDetection: ChangeDetectionStrategy.Default,
                    styles: ["\n        .gantt-activity {\n            /*overflow-x: hidden;*/\n            overflow-x: auto;\n            height: 250px;\n            overflow-y: hidden;\n            overflow-x: scroll;\n            display: inline-block;\n            vertical-align: top;\n            position:relative;\n        }\n        .gantt-activity-area {\n            position: relative;\n            overflow-x: hidden;\n            overflow-y: hidden;\n            -webkit-user-select: none;\n        }\n        .gantt-vertical-scroll {\n            background-color: transparent;\n            overflow-x: hidden;\n            overflow-y: scroll;\n            position: absolute;\n            right: 0;\n            display: block;\n            height: 283px;\n            width: 18px;\n            top: 70px;\n        }\n        .grid {\n            overflow-x: hidden;\n            overflow-y: hidden;\n            display: inline-block;\n            vertical-align: top;\n            border-right: 1px solid #cecece;\n        }\n        .grid-scale {\n            color: #6b6b6b;\n            font-size: 12px;\n            border-bottom: 1px solid #e0e0e0;\n            background-color: whitesmoke;\n        }\n        .grid-head-cell {\n            /*color: #a6a6a6;*/\n            border-top: none !important;\n            border-right: none !important;\n            line-height: inherit;\n            box-sizing: border-box;\n            display: inline-block;\n            vertical-align: top;\n            border-right: 1px solid #cecece;\n            /*text-align: center;*/\n            position: relative;\n            cursor: default;\n            height: 100%;\n            -moz-user-select: -moz-none;\n            -webkit-user-select: none;\n            overflow: hidden;\n        }\n        .grid-data {\n            overflow:hidden;\n        }\n        .grid-row {\n            box-sizing: border-box;\n            border-bottom: 1px solid #e0e0e0;\n            background-color: #fff;\n            position: relative;\n            -webkit-user-select: none;\n        }\n        .grid-row:hover {\n            background-color: #eeeeee;\n        }\n        .grid-cell {\n            border-right: none;\n            color: #454545;\n            display: inline-block;\n            vertical-align: top;\n            padding-left: 6px;\n            padding-right: 6px;\n            height: 100%;\n            overflow: hidden;\n            white-space: nowrap;\n            font-size: 13px;\n            box-sizing: border-box;\n        }\n        .actions-bar {\n            /*border-top: 1px solid #cecece;*/\n            border-bottom: 1px solid #e0e0e0;\n            clear: both;\n            /*margin-top: 90px;*/\n            height: 28px;\n            background: whitesmoke;\n            color: #494949;\n            font-family: Arial, sans-serif;\n            font-size: 13px;\n            padding-left: 15px;\n            line-height: 25px;\n        }\n        .gantt-tree-content {\n            padding-left:15px;\n        }\n    "]
                }] }
    ];
    /** @nocollapse */
    GanttActivityComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: GanttService }
    ]; };
    GanttActivityComponent.propDecorators = {
        project: [{ type: Input }],
        options: [{ type: Input }],
        onGridRowClick: [{ type: Output }]
    };
    return GanttActivityComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var GanttTimeScaleComponent = /** @class */ (function () {
    function GanttTimeScaleComponent(ganttService) {
        this.ganttService = ganttService;
    }
    /**
     * @return {?}
     */
    GanttTimeScaleComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.zoom.subscribe(function (zoomLevel) {
            _this.zoomLevel = zoomLevel;
        });
    };
    /**
     * @return {?}
     */
    GanttTimeScaleComponent.prototype.setTimescaleStyle = /**
     * @return {?}
     */
    function () {
        return {
            'width': this.dimensions.width + 'px'
        };
    };
    /**
     * @param {?} borderTop
     * @return {?}
     */
    GanttTimeScaleComponent.prototype.setTimescaleLineStyle = /**
     * @param {?} borderTop
     * @return {?}
     */
    function (borderTop) {
        return {
            'height': this.ganttService.rowHeight + 'px',
            'line-height': this.ganttService.rowHeight + 'px',
            'position': 'relative',
            'border-top': borderTop
        };
    };
    /**
     * @return {?}
     */
    GanttTimeScaleComponent.prototype.setTimescaleCellStyle = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @param {?} date
     * @return {?}
     */
    GanttTimeScaleComponent.prototype.isDayWeekend = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.ganttService.isDayWeekend(date);
    };
    /**
     * @return {?}
     */
    GanttTimeScaleComponent.prototype.getHours = /**
     * @return {?}
     */
    function () {
        return this.ganttService.getHours(this.timeScale.length);
    };
    GanttTimeScaleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'time-scale',
                    template: "\n        <div class=\"time-scale\" [ngStyle]=\"setTimescaleStyle()\">\n            <div class=\"time-scale-line\" [ngStyle]=\"setTimescaleLineStyle('none')\">\n                <div class=\"time-scale-cell\" *ngFor=\"let date of timeScale\" \n                    [ngStyle]=\"setTimescaleCellStyle()\"\n                    [ngClass]=\"(isDayWeekend(date)) ? 'weekend' : ''\">{{date | date: 'dd-MM-yyyy'}}</div>\n            </div>\n            <div *ngIf=\"zoomLevel === 'hours'\" class=\"time-scale-line\" [ngStyle]=\"setTimescaleLineStyle('1px solid #cecece')\">\n                <div class=\"time-scale-cell\"\n                    *ngFor=\"let hour of getHours()\"\n                    [ngStyle]=\"{ 'width': ganttService.hourCellWidth + 'px' }\">{{hour}}</div>\n            </div>\n        </div>",
                    providers: [
                        GanttService
                    ],
                    styles: ["\n        .weekend {\n            background-color: whitesmoke;\n        }\n        .time-scale {\n            font-size: 12px;\n            border-bottom: 1px solid #cecece;\n            background-color: #fff;\n        }\n        .time-scale-line {\n            box-sizing: border-box;\n        }\n        .time-scale-line:first-child {\n            border-top: none;\n        }\n        .time-scale-cell {\n            display: inline-block;\n            white-space: nowrap;\n            overflow: hidden;\n            border-right: 1px solid #cecece;\n            text-align: center;\n            height: 100%;\n        }"]
                }] }
    ];
    /** @nocollapse */
    GanttTimeScaleComponent.ctorParameters = function () { return [
        { type: GanttService }
    ]; };
    GanttTimeScaleComponent.propDecorators = {
        timeScale: [{ type: Input }],
        dimensions: [{ type: Input }],
        zoom: [{ type: Input }],
        zoomLevel: [{ type: Input }]
    };
    return GanttTimeScaleComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var GanttActivityBackgroundComponent = /** @class */ (function () {
    function GanttActivityBackgroundComponent(ganttService) {
        this.ganttService = ganttService;
        this.rows = [];
        this.cells = [];
    }
    /**
     * @return {?}
     */
    GanttActivityBackgroundComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.drawGrid();
        this.zoom.subscribe(function (zoomLevel) {
            _this.zoomLevel = zoomLevel;
            _this.drawGrid();
        });
    };
    /**
     * @param {?} date
     * @return {?}
     */
    GanttActivityBackgroundComponent.prototype.isDayWeekend = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.ganttService.isDayWeekend(date);
    };
    /**
     * @return {?}
     */
    GanttActivityBackgroundComponent.prototype.setRowStyle = /**
     * @return {?}
     */
    function () {
        return {
            'height': this.ganttService.rowHeight + 'px'
        };
    };
    /**
     * @return {?}
     */
    GanttActivityBackgroundComponent.prototype.setCellStyle = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var width = this.ganttService.cellWidth;
        if (this.zoomLevel === Zooming[Zooming.hours]) {
            width = this.ganttService.hourCellWidth;
        }
        return {
            'width': width + 'px'
        };
    };
    /**
     * @private
     * @return {?}
     */
    GanttActivityBackgroundComponent.prototype.drawGrid = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.zoomLevel === Zooming[Zooming.hours]) {
            this.cells = [];
            this.timeScale.forEach(function (date) {
                for (var i = 0; i <= 23; i++) {
                    _this.cells.push(date);
                }
            });
        }
        else {
            this.cells = this.timeScale;
        }
    };
    GanttActivityBackgroundComponent.decorators = [
        { type: Component, args: [{
                    selector: 'activity-background',
                    template: "\n    <div #bg class=\"gantt-activity-bg\">\n        <div class=\"gantt-activity-row\"\n            [ngStyle]=\"setRowStyle()\"\n            *ngFor=\"let row of ganttService.groupData(tasks)\">\n\n            <div class=\"gantt-activity-cell\"\n                [ngStyle]=\"setCellStyle()\"\n                *ngFor=\"let cell of cells; let l = last\"\n                [ngClass]=\"[(isDayWeekend(cell)) ? 'weekend' : '', l ? 'last-column-cell' : '']\"></div>\n        </div>\n    </div>\n    ",
                    styles: ["\n        .gantt-activity-bg {\n            overflow: hidden;\n        }\n        .gantt-activity-row {\n            border-bottom: 1px solid #ebebeb;\n            background-color: #fff;\n            box-sizing: border-box;\n        }\n        .gantt-activity-cell {\n            display: inline-block;\n            height: 100%;\n            border-right: 1px solid #ebebeb;\n        }\n        .weekend {\n            background-color: whitesmoke;\n        }\n    "]
                }] }
    ];
    /** @nocollapse */
    GanttActivityBackgroundComponent.ctorParameters = function () { return [
        { type: GanttService }
    ]; };
    GanttActivityBackgroundComponent.propDecorators = {
        tasks: [{ type: Input }],
        timeScale: [{ type: Input }],
        zoom: [{ type: Input }],
        zoomLevel: [{ type: Input }],
        bg: [{ type: ViewChild, args: ['bg',] }]
    };
    return GanttActivityBackgroundComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var GanttActivityBarsComponent = /** @class */ (function () {
    function GanttActivityBarsComponent(ganttService) {
        this.ganttService = ganttService;
        this.containerHeight = 0;
        this.containerWidth = 0;
    }
    /**
     * @return {?}
     */
    GanttActivityBarsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.containerHeight = this.dimensions.height;
        this.containerWidth = this.dimensions.width;
        this.zoom.subscribe(function (zoomLevel) {
            _this.zoomLevel = zoomLevel;
        });
    };
    //TODO(dale): the ability to move bars needs reviewing and there are a few quirks
    //TODO(dale): the ability to move bars needs reviewing and there are a few quirks
    /**
     * @param {?} $event
     * @param {?} bar
     * @return {?}
     */
    GanttActivityBarsComponent.prototype.expandLeft = 
    //TODO(dale): the ability to move bars needs reviewing and there are a few quirks
    /**
     * @param {?} $event
     * @param {?} bar
     * @return {?}
     */
    function ($event, bar) {
        $event.stopPropagation();
        /** @type {?} */
        var ganttService = this.ganttService;
        /** @type {?} */
        var startX = $event.clientX;
        /** @type {?} */
        var startBarWidth = bar.style.width;
        /** @type {?} */
        var startBarLeft = bar.style.left;
        /**
         * @param {?} e
         * @return {?}
         */
        function doDrag(e) {
            /** @type {?} */
            var cellWidth = ganttService.cellWidth;
            /** @type {?} */
            var barWidth = startBarWidth - e.clientX + startX;
            /** @type {?} */
            var days = Math.round(barWidth / cellWidth);
            bar.style.width = days * cellWidth + days;
            bar.style.left = (startBarLeft - (days * cellWidth) - days);
        }
        this.addMouseEventListeners(doDrag);
        return false;
    };
    /**
     * @param {?} $event
     * @param {?} bar
     * @return {?}
     */
    GanttActivityBarsComponent.prototype.expandRight = /**
     * @param {?} $event
     * @param {?} bar
     * @return {?}
     */
    function ($event, bar) {
        $event.stopPropagation();
        /** @type {?} */
        var ganttService = this.ganttService;
        /** @type {?} */
        var startX = $event.clientX;
        /** @type {?} */
        var startBarWidth = bar.style.width;
        /** @type {?} */
        var startBarEndDate = bar.task.end;
        /** @type {?} */
        var startBarLeft = bar.style.left;
        /**
         * @param {?} e
         * @return {?}
         */
        function doDrag(e) {
            /** @type {?} */
            var cellWidth = ganttService.cellWidth;
            /** @type {?} */
            var barWidth = startBarWidth + e.clientX - startX;
            /** @type {?} */
            var days = Math.round(barWidth / cellWidth);
            if (barWidth < cellWidth) {
                barWidth = cellWidth;
                days = Math.round(barWidth / cellWidth);
            }
            bar.style.width = ((days * cellWidth) + days); // rounds to the nearest cell
        }
        this.addMouseEventListeners(doDrag);
        return false;
    };
    /**
     * @param {?} $event
     * @param {?} bar
     * @return {?}
     */
    GanttActivityBarsComponent.prototype.move = /**
     * @param {?} $event
     * @param {?} bar
     * @return {?}
     */
    function ($event, bar) {
        $event.stopPropagation();
        /** @type {?} */
        var ganttService = this.ganttService;
        /** @type {?} */
        var startX = $event.clientX;
        /** @type {?} */
        var startBarLeft = bar.style.left;
        /**
         * @param {?} e
         * @return {?}
         */
        function doDrag(e) {
            /** @type {?} */
            var cellWidth = ganttService.cellWidth;
            /** @type {?} */
            var barLeft = startBarLeft + e.clientX - startX;
            /** @type {?} */
            var days = Math.round(barLeft / cellWidth);
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
    };
    /**
     * @param {?} task
     * @param {?} index
     * @return {?}
     */
    GanttActivityBarsComponent.prototype.drawBar = /**
     * @param {?} task
     * @param {?} index
     * @return {?}
     */
    function (task, index) {
        /** @type {?} */
        var style = {};
        if (this.zoomLevel === Zooming[Zooming.hours]) {
            style = this.ganttService.calculateBar(task, index, this.timeScale, true);
        }
        else {
            style = this.ganttService.calculateBar(task, index, this.timeScale);
        }
        return style;
    };
    /**
     * @param {?} task
     * @param {?} bar
     * @return {?}
     */
    GanttActivityBarsComponent.prototype.drawProgress = /**
     * @param {?} task
     * @param {?} bar
     * @return {?}
     */
    function (task, bar) {
        /** @type {?} */
        var barStyle = this.ganttService.getBarProgressStyle(task.status);
        /** @type {?} */
        var width = this.ganttService.calculateBarProgress(this.ganttService.getComputedStyle(bar, 'width'), task.percentComplete);
        return {
            'width': width,
            'background-color': barStyle["background-color"],
        };
    };
    /**
     * @private
     * @param {?} dragFn
     * @return {?}
     */
    GanttActivityBarsComponent.prototype.addMouseEventListeners = /**
     * @private
     * @param {?} dragFn
     * @return {?}
     */
    function (dragFn) {
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
    };
    GanttActivityBarsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'activity-bars',
                    template: "\n    <div class=\"gantt-activity-bars-area\" \n        [ngStyle]=\"{ 'height': containerHeight + 'px', 'width': containerWidth + 'px' }\">\n\n        <div #bar class=\"gantt-activity-line\"\n            *ngFor=\"let task of ganttService.groupData(tasks); let i = index\"\n            [ngStyle]=\"drawBar(task, i)\">\n\n            <div class=\"gantt-activity-progress\" [ngStyle]=\"drawProgress(task, bar)\"></div>\n            <div class=\"gantt-activity-progress_drag\" style=\"left: 518px\"></div>\n            <div class=\"gantt-activity-content\"></div>\n            <div class=\"gantt-activity-link-control gantt-activity-right\" style=\"height: 26px; line-height: 30px\">\n                <div class=\"gantt-link-point\"></div>\n            </div>\n            <div class=\"gantt-activity-link-control gantt-activity-left\" style=\"height: 26px; line-height: 30px\">\n                <div class=\"gantt-link-point\"></div>\n            </div>\n        </div>\n    </div>\n    ",
                    providers: [
                        GanttService
                    ],
                    styles: ["\n    .gantt-activity-line {\n        /*border-radius: 2px;*/\n        position: absolute;\n        box-sizing: border-box;\n        background-color: rgb(18,195,244);\n        border: 1px solid #2196F3;\n        -webkit-user-select: none;\n    }\n    .gantt-activity-line:hover {\n        /*cursor: move;*/\n    }\n    .gantt-activity-progress {\n        text-align: center;\n        z-index: 0;\n        background: #2196F3;\n        position: absolute;\n        min-height: 18px;\n        display: block;\n        height: 18px;\n    }\n    .gantt-activity-progress-drag {\n        height: 8px;\n        width: 8px;\n        bottom: -4px;\n        margin-left: 4px;\n        background-position: bottom;\n        background-image: \"\";\n        background-repeat: no-repeat;\n        z-index: 2;\n    }\n    .gantt-activity-content {\n        font-size: 12px;\n        color: #fff;\n        width: 100%;\n        top: 0;\n        position: absolute;\n        white-space: nowrap;\n        text-align: center;\n        line-height: inherit;\n        overflow: hidden;\n        height: 100%;\n    }\n    .gantt-activity-link-control {\n        position: absolute;\n        width: 13px;\n        top: 0;\n    }\n    .gantt-activity-right {\n        right: 0;\n    }\n    .gantt-activity-left {\n        left: 0;\n    }\n    .gantt-activity-right:hover {\n        cursor:w-resize;\n    }\n    .gantt-activity-left:hover {\n        cursor:w-resize;\n    }\n    "]
                }] }
    ];
    /** @nocollapse */
    GanttActivityBarsComponent.ctorParameters = function () { return [
        { type: GanttService }
    ]; };
    GanttActivityBarsComponent.propDecorators = {
        timeScale: [{ type: Input }],
        dimensions: [{ type: Input }],
        tasks: [{ type: Input }],
        zoom: [{ type: Input }],
        zoomLevel: [{ type: Input }]
    };
    return GanttActivityBarsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var GanttActivityModule = /** @class */ (function () {
    function GanttActivityModule() {
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
    return GanttActivityModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var GanttModule = /** @class */ (function () {
    function GanttModule() {
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
    return GanttModule;
}());

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