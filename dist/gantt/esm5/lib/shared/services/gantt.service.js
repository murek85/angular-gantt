/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { GanttConfig } from './gantt-config.service';
import { GroupByPipe } from '../../shared/pipes/groupBy.pipe';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZ2FudHQvIiwic291cmNlcyI6WyJsaWIvc2hhcmVkL3NlcnZpY2VzL2dhbnR0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXJELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUU5RDtJQXNCSTtRQXBCTyxjQUFTLEdBQVcsQ0FBQyxDQUFDO1FBQ3RCLGtCQUFhLEdBQVcsRUFBRSxDQUFDLENBQUMsb0RBQW9EOztRQUNoRixtQkFBYyxHQUFXLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ2pELGNBQVMsR0FBVyxDQUFDLENBQUM7UUFDdEIscUJBQWdCLEdBQVcsQ0FBQyxDQUFDO1FBQzdCLG1CQUFjLEdBQVcsQ0FBQyxDQUFDO1FBQzNCLGNBQVMsR0FBVyxDQUFDLENBQUM7UUFDdEIsa0JBQWEsR0FBVyxDQUFDLENBQUM7UUFDMUIsV0FBTSxHQUFXLENBQUMsQ0FBQztRQUNuQixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixjQUFTLEdBQVcsR0FBRyxDQUFDO1FBQ3ZCLGNBQVMsR0FBZ0I7WUFDN0IsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFO1lBQy9ILEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUU7WUFDbEgsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLG1CQUFtQixFQUFFLHVC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LE9BQU8sS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtZQUMzQyxPQUFPLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztTQUNqQztJQUNMLENBQUM7O2dCQW5oQkosVUFBVTs7OztJQW9oQlgsbUJBQUM7Q0FBQSxBQXBoQkQsSUFvaEJDO1NBbmhCWSxZQUFZOzs7SUFDckIsaUNBQTZCOztJQUM3QixxQ0FBa0M7O0lBQ2xDLHNDQUF3RDs7SUFDeEQsaUNBQTZCOztJQUM3Qix3Q0FBb0M7O0lBQ3BDLHNDQUFrQzs7SUFDbEMsaUNBQTZCOztJQUM3QixxQ0FBaUM7O0lBQ2pDLDhCQUEwQjs7SUFDMUIsbUNBQW9DOztJQUNwQyxpQ0FBK0I7Ozs7O0lBQy9CLGlDQUtFOztJQUNGLGtDQUF5Qjs7SUFDekIsa0NBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBHYW50dENvbmZpZyB9IGZyb20gJy4vZ2FudHQtY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQmFyU3R5bGUsIFRhc2ssIElTY2FsZSwgWm9vbWluZyB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBHcm91cEJ5UGlwZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9waXBlcy9ncm91cEJ5LnBpcGUnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgR2FudHRTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyByb3dIZWlnaHQ6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgaG91ckNlbGxXaWR0aDogbnVtYmVyID0gNjA7IC8vIGNoYW5nZSB0byA2MCBzbyBtaW51dGVzIGNhbiBiZWVuIHNlZW4gbW9yZSBlYXNpbHlcclxuICAgIHB1YmxpYyBob3Vyc0NlbGxXaWR0aDogbnVtYmVyID0gdGhpcy5ob3VyQ2VsbFdpZHRoICogMjU7XHJcbiAgICBwdWJsaWMgY2VsbFdpZHRoOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHdpbmRvd0lubmVyV2lkdGg6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgYWN0aXZpdHlIZWlnaHQ6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgYmFySGVpZ2h0OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGJhckxpbmVIZWlnaHQ6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgYmFyVG9wOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGJhck1vdmVhYmxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgZ3JpZFdpZHRoOiBudW1iZXIgPSA1NjA7XHJcbiAgICBwcml2YXRlIGJhclN0eWxlczogSUJhclN0eWxlW10gPSBbXHJcbiAgICAgICAgeyBzdGF0dXM6IFwiaW5mb3JtYXRpb25cIiwgYmFja2dyb3VuZENvbG9yOiBcInJnYigxOCwxOTUsIDI0NClcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCAjMjE5NkYzXCIsIHByb2dyZXNzQmFja2dyb3VuZENvbG9yOiBcIiMyMTk2RjNcIiB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiBcIndhcm5pbmdcIiwgYmFja2dyb3VuZENvbG9yOiBcIiNGRkE3MjZcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCAjRUY2QzAwXCIsIHByb2dyZXNzQmFja2dyb3VuZENvbG9yOiBcIiNFRjZDMDBcIiB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiBcImVycm9yXCIsIGJhY2tncm91bmRDb2xvcjogXCIjRUY1MzUwXCIsIGJvcmRlcjogXCIxcHggc29saWQgI0M2MjgyOFwiLCBwcm9ncmVzc0JhY2tncm91bmRDb2xvcjogXCIjQzYyODI4XCIgfSxcclxuICAgICAgICB7IHN0YXR1czogXCJjb21wbGV0ZWRcIiwgYmFja2dyb3VuZENvbG9yOiBcIiM2NkJCNkFcIiwgYm9yZGVyOiBcIjFweCBzb2xpZCAjMkU3RDMyXCIsIHByb2dyZXNzQmFja2dyb3VuZENvbG9yOiBcIiMyRTdEMzJcIiB9XHJcbiAgICBdO1xyXG4gICAgcHVibGljIFRBU0tfQ0FDSEU6IGFueVtdO1xyXG4gICAgcHVibGljIFRJTUVfU0NBTEU6IGFueVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGxldCBfZ2FudHRDb25maWcgPSBuZXcgR2FudHRDb25maWcoKTtcclxuXHJcbiAgICAgICAgdGhpcy5yb3dIZWlnaHQgPSBfZ2FudHRDb25maWcucm93SGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuY2VsbFdpZHRoID0gX2dhbnR0Q29uZmlnLmNlbGxXaWR0aDtcclxuICAgICAgICB0aGlzLmFjdGl2aXR5SGVpZ2h0ID0gX2dhbnR0Q29uZmlnLmFjdGl2aXR5SGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuYmFySGVpZ2h0ID0gX2dhbnR0Q29uZmlnLmJhckhlaWdodDtcclxuICAgICAgICB0aGlzLmJhckxpbmVIZWlnaHQgPSBfZ2FudHRDb25maWcuYmFyTGluZUhlaWdodDtcclxuICAgICAgICB0aGlzLmJhclRvcCA9IF9nYW50dENvbmZpZy5yb3dIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5iYXJNb3ZlYWJsZSA9IF9nYW50dENvbmZpZy5iYXJNb3ZlYWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZUJhcldpZHRoKHN0YXJ0OiBEYXRlLCBlbmQ6IERhdGUsIGhvdXJzPzogYm9vbGVhbik6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzdGFydCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICBzdGFydCA9IG5ldyBEYXRlKHN0YXJ0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgZW5kID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIGVuZCA9IG5ldyBEYXRlKGVuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZGF5cyA9IHRoaXMuY2FsY3VsYXRlRGlmZkRheXMoc3RhcnQsIGVuZCk7XHJcbiAgICAgICAgbGV0IHdpZHRoOiBudW1iZXIgPSBkYXlzICogdGhpcy5jZWxsV2lkdGggKyBkYXlzO1xyXG5cclxuICAgICAgICBpZiAoaG91cnMpIHtcclxuICAgICAgICAgICAgd2lkdGggPSBkYXlzICogdGhpcy5ob3VyQ2VsbFdpZHRoICogMjQgKyBkYXlzICogMjQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gd2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVCYXJMZWZ0KHN0YXJ0OiBEYXRlLCBzY2FsZTogYW55W10sIGhvdXJzPzogYm9vbGVhbik6IG51bWJlciB7XHJcbiAgICAgICAgdmFyIGxlZnQ6IG51bWJlciA9IDA7XHJcbiAgICAgICAgdmFyIGhvdXJzSW5EYXk6IG51bWJlciA9IDI0O1xyXG5cclxuICAgICAgICBpZiAoc3RhcnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHN0YXJ0ID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICBzdGFydCA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2NhbGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdGFydC5nZXREYXRlKCkgPT09IHNjYWxlW2ldLmdldERhdGUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChob3Vycykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gaSAqIGhvdXJzSW5EYXkgKiB0aGlzLmhvdXJDZWxsV2lkdGggKyBob3Vyc0luRGF5ICogaSArIHRoaXMuY2FsY3VsYXRlQmFyTGVmdERlbHRhKHN0YXJ0LCBob3Vycyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCA9IGkgKiB0aGlzLmNlbGxXaWR0aCArIGkgKyB0aGlzLmNhbGN1bGF0ZUJhckxlZnREZWx0YShzdGFydCwgaG91cnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGVmdDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlcyB0aGUgaGVpZ2h0IG9mIHRoZSBnYW50dCBncmlkLCBhY3Rpdml0eSBhbmQgdmVydGljYWwgc2Nyb2xsICovXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlR2FudHRIZWlnaHQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gYCR7dGhpcy5UQVNLX0NBQ0hFLmxlbmd0aCAqIHRoaXMucm93SGVpZ2h0ICsgdGhpcy5yb3dIZWlnaHQgKiAzfXB4YDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZUJhckxlZnREZWx0YShzdGFydDogRGF0ZSwgaG91cnM/OiBib29sZWFuKTogbnVtYmVyIHtcclxuICAgICAgICB2YXIgb2Zmc2V0OiBudW1iZXIgPSAwO1xyXG4gICAgICAgIHZhciBob3Vyc0luRGF5OiBudW1iZXIgPSAyNDtcclxuICAgICAgICB2YXIgbWludXRlc0luSG91cjogbnVtYmVyID0gNjA7XHJcbiAgICAgICAgdmFyIHNlY29uZHNJbkhvdXI6IG51bWJlciA9IDM2MDA7XHJcbiAgICAgICAgdmFyIHN0YXJ0SG91cnM6IG51bWJlciA9IHN0YXJ0LmdldEhvdXJzKCkgKyBzdGFydC5nZXRNaW51dGVzKCkgLyBtaW51dGVzSW5Ib3VyICsgc3RhcnQuZ2V0U2Vjb25kcygpIC8gc2Vjb25kc0luSG91cjtcclxuXHJcbiAgICAgICAgaWYgKGhvdXJzKSB7XHJcbiAgICAgICAgICAgIG9mZnNldCA9IHRoaXMuaG91cnNDZWxsV2lkdGggLyBob3Vyc0luRGF5ICogc3RhcnRIb3VycyAtIHN0YXJ0SG91cnM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb2Zmc2V0ID0gdGhpcy5jZWxsV2lkdGggLyBob3Vyc0luRGF5ICogc3RhcnRIb3VycztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9mZnNldDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNQYXJlbnQodHJlZVBhdGg6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgZGVwdGggPSB0cmVlUGF0aC5zcGxpdCgnLycpLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgIGlmIChkZXB0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNDaGlsZCh0cmVlUGF0aDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNQYXJlbnQodHJlZVBhdGgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnMHB4JztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICcyMHB4JztcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlIHRoZSBiYXIgc3R5bGVzICovXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlQmFyKHRhc2s6IGFueSwgaW5kZXg6IG51bWJlciwgc2NhbGU6IGFueSwgaG91cnM/OiBib29sZWFuKSB7XHJcbiAgICAgICAgdmFyIGJhclN0eWxlID0gdGhpcy5nZXRCYXJTdHlsZSh0YXNrLnN0YXR1cyk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ3RvcCc6IHRoaXMuYmFyVG9wICogaW5kZXggKyAyICsgJ3B4JyxcclxuICAgICAgICAgICAgJ2xlZnQnOiB0aGlzLmNhbGN1bGF0ZUJhckxlZnQodGFzay5zdGFydCwgc2NhbGUsIGhvdXJzKSArICdweCcsXHJcbiAgICAgICAgICAgICdoZWlnaHQnOiB0aGlzLmJhckhlaWdodCArICdweCcsXHJcbiAgICAgICAgICAgICdsaW5lLWhlaWdodCc6IHRoaXMuYmFyTGluZUhlaWdodCArICdweCcsXHJcbiAgICAgICAgICAgICd3aWR0aCc6IHRoaXMuY2FsY3VsYXRlQmFyV2lkdGgodGFzay5zdGFydCwgdGFzay5lbmQsIGhvdXJzKSArICdweCcsXHJcbiAgICAgICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogYmFyU3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdLFxyXG4gICAgICAgICAgICAnYm9yZGVyJzogYmFyU3R5bGVbXCJib3JkZXJcIl1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEdldCB0aGUgYmFyIHN0eWxlIGJhc2VkIG9uIHRhc2sgc3RhdHVzICovXHJcbiAgICBwcml2YXRlIGdldEJhclN0eWxlKHRhc2tTdGF0dXM6IHN0cmluZyA9IFwiXCIpOiBhbnkge1xyXG4gICAgICAgIHZhciBzdHlsZSA9IHt9O1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0YXNrU3RhdHVzID0gdGFza1N0YXR1cy50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICB0YXNrU3RhdHVzID0gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN3aXRjaCAodGFza1N0YXR1cykge1xyXG4gICAgICAgICAgICBjYXNlIFwiaW5mb3JtYXRpb25cIjpcclxuICAgICAgICAgICAgICAgIHN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSA9IHRoaXMuYmFyU3R5bGVzWzBdLmJhY2tncm91bmRDb2xvcjtcclxuICAgICAgICAgICAgICAgIHN0eWxlW1wiYm9yZGVyXCJdID0gdGhpcy5iYXJTdHlsZXNbMF0uYm9yZGVyO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ3YXJuaW5nXCI6XHJcbiAgICAgICAgICAgICAgICBzdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0gPSB0aGlzLmJhclN0eWxlc1sxXS5iYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICAgICAgICAgICAgICBzdHlsZVtcImJvcmRlclwiXSA9IHRoaXMuYmFyU3R5bGVzWzFdLmJvcmRlcjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZXJyb3JcIjpcclxuICAgICAgICAgICAgICAgIHN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSA9IHRoaXMuYmFyU3R5bGVzWzJdLmJhY2tncm91bmRDb2xvcjtcclxuICAgICAgICAgICAgICAgIHN0eWxlW1wiYm9yZGVyXCJdID0gdGhpcy5iYXJTdHlsZXNbMl0uYm9yZGVyO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjb21wbGV0ZWRcIjpcclxuICAgICAgICAgICAgICAgIHN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSA9IHRoaXMuYmFyU3R5bGVzWzNdLmJhY2tncm91bmRDb2xvcjtcclxuICAgICAgICAgICAgICAgIHN0eWxlW1wiYm9yZGVyXCJdID0gdGhpcy5iYXJTdHlsZXNbM10uYm9yZGVyO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBzdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0gPSBcInJnYigxOCwxOTUsIDI0NClcIjtcclxuICAgICAgICAgICAgICAgIHN0eWxlW1wiYm9yZGVyXCJdID0gXCIxcHggc29saWQgIzIxOTZGM1wiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3R5bGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEdldCB0aGUgcHJvZ3Jlc3NzIGJhciBiYWNrZ3JvdW5kIGNvbG91ciBiYXNlZCBvbiB0YXNrIHN0YXR1cyAqL1xyXG4gICAgcHVibGljIGdldEJhclByb2dyZXNzU3R5bGUodGFza1N0YXR1czogc3RyaW5nID0gXCJcIik6IGFueSB7XHJcbiAgICAgICAgdmFyIHN0eWxlID0ge307XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRhc2tTdGF0dXMgPSB0YXNrU3RhdHVzLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHRhc2tTdGF0dXMgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3dpdGNoICh0YXNrU3RhdHVzKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJpbmZvcm1hdGlvblwiOlxyXG4gICAgICAgICAgICAgICAgc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gdGhpcy5iYXJTdHlsZXNbMF0ucHJvZ3Jlc3NCYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIndhcm5pbmdcIjpcclxuICAgICAgICAgICAgICAgIHN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSA9IHRoaXMuYmFyU3R5bGVzWzFdLnByb2dyZXNzQmFja2dyb3VuZENvbG9yO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJlcnJvclwiOlxyXG4gICAgICAgICAgICAgICAgc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gdGhpcy5iYXJTdHlsZXNbMl0ucHJvZ3Jlc3NCYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNvbXBsZXRlZFwiOlxyXG4gICAgICAgICAgICAgICAgc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gdGhpcy5iYXJTdHlsZXNbM10ucHJvZ3Jlc3NCYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSA9IHRoaXMuYmFyU3R5bGVzWzBdLnByb2dyZXNzQmFja2dyb3VuZENvbG9yO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3R5bGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENhbGN1bGF0ZXMgdGhlIGJhciBwcm9ncmVzcyB3aWR0aCBpbiBwaXhlbHMgZ2l2ZW4gdGFzayBwZXJjZW50IGNvbXBsZXRlICovXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlQmFyUHJvZ3Jlc3Mod2lkdGg6IG51bWJlciwgcGVyY2VudDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodHlwZW9mIHBlcmNlbnQgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgaWYgKHBlcmNlbnQgPiAxMDApIHtcclxuICAgICAgICAgICAgICAgIHBlcmNlbnQgPSAxMDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHByb2dyZXNzOiBudW1iZXIgPSAod2lkdGggLyAxMDApICogcGVyY2VudCAtIDI7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYCR7cHJvZ3Jlc3N9cHhgO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYCR7MH1weGA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENhbGN1bGF0ZXMgdGhlIGRpZmZlcmVuY2UgaW4gdHdvIGRhdGVzIGFuZCByZXR1cm5zIG51bWJlciBvZiBkYXlzICovXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlRGlmZkRheXMoc3RhcnQ6IERhdGUsIGVuZDogRGF0ZSk6IG51bWJlciB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IG9uZURheSA9IDI0ICogNjAgKiA2MCAqIDEwMDA7IC8vIGhvdXJzKm1pbnV0ZXMqc2Vjb25kcyptaWxsaXNlY29uZHMgL21zXHJcbiAgICAgICAgICAgIGxldCBkaWZmRGF5cyA9IE1hdGguYWJzKChzdGFydC5nZXRUaW1lKCkgLSBlbmQuZ2V0VGltZSgpKSAvIChvbmVEYXkpKTtcclxuICAgICAgICAgICAgbGV0IGRheXMgPSBkaWZmRGF5czsgLy8gZG9uJ3QgdXNlIE1hdGgucm91bmQgYXMgaXQgd2lsbCBkcmF3IGFuIGluY29ycmVjdCBiYXJcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkYXlzO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENhbGN1bGF0ZXMgdGhlIGRpZmZlcmVuY2UgaW4gdHdvIGRhdGVzIGFuZCByZXR1cm5zIG51bWJlciBvZiBob3VycyAqL1xyXG4gICAgcHVibGljIGNhbGN1bGF0ZUR1cmF0aW9uKHRhc2s6IGFueSk6IHN0cmluZyB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHRhc2suc3RhcnQgIT0gbnVsbCAmJiB0YXNrLmVuZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb25lSG91ciA9IDYwICogNjAgKiAxMDAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpZmZIb3VycyA9IChNYXRoLmFicygodGFzay5zdGFydC5nZXRUaW1lKCkgLSB0YXNrLmVuZC5nZXRUaW1lKCkpIC8gb25lSG91cikpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGR1cmF0aW9uID0gZGlmZkhvdXJzO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkdXJhdGlvbiA+IDI0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke01hdGgucm91bmQoZHVyYXRpb24gLyAyNCl9IGRheShzKWA7IC8vIGR1cmF0aW9uIGluIGRheXNcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZHVyYXRpb24gPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke01hdGgucm91bmQoZHVyYXRpb24pfSBocihzKWA7IC8vIGR1cmF0aW9uIGluIGhvdXJzXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtaW51dGVzID0gZHVyYXRpb24gKiA2MDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1pbnV0ZXMgPCAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtNYXRoLnJvdW5kKG1pbnV0ZXMgKiA2MCl9IHNlY29uZChzKWA7IC8vIGR1cmF0aW9uIGluIHNlY29uZHNcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke01hdGgucm91bmQobWludXRlcyl9IG1pbihzKWAgLy8gZHVyYXRpb24gaW4gbWludXRlc1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2FsY3VsYXRlVG90YWxEdXJhdGlvbih0YXNrczogYW55W10pOiBzdHJpbmcge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRhc2tzID0gdGFza3MuZmlsdGVyKHQgPT4gdC5wYXJlbnRJZCA9PT0gdC5pZCk7IC8vIG9ubHkgY2FsY3VsYXRlIHRvdGFsIGR1cmF0aW9uIHdpdGggcGFyZW50IHRhc2tzXHJcblxyXG4gICAgICAgICAgICBsZXQgdG90YWxIb3VycyA9IDA7XHJcbiAgICAgICAgICAgIGxldCBvbmVIb3VyID0gNjAgKiA2MCAqIDEwMDA7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFza3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBzdGFydCA9IHRhc2tzW2ldLnN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgbGV0IGVuZCA9IHRhc2tzW2ldLmVuZDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhcnQgIT0gbnVsbCAmJiBlbmQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkdXJhdGlvbiA9IE1hdGguYWJzKHRhc2tzW2ldLmVuZC5nZXRUaW1lKCkgLSB0YXNrc1tpXS5zdGFydC5nZXRUaW1lKCkpIC8gb25lSG91cjsgLy8gZHVyYXRpb24gaW4gaG91cnNcclxuICAgICAgICAgICAgICAgICAgICB0b3RhbEhvdXJzICs9IGR1cmF0aW9uO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodG90YWxIb3VycyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodG90YWxIb3VycyA+IDI0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7TWF0aC5yb3VuZCh0b3RhbEhvdXJzIC8gMjQpfSBkYXkocylgOyAvLyBkdXJhdGlvbiBpbiBkYXlzXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodG90YWxIb3VycyA+IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBgJHtNYXRoLnJvdW5kKHRvdGFsSG91cnMpfSBocihzKWA7IC8vIGR1cmF0aW9uIGluIGhvdXJzXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWludXRlcyA9IHRvdGFsSG91cnMgKiA2MDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWludXRlcyA8IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7TWF0aC5yb3VuZChtaW51dGVzICogNjApfSBzZWNvbmQocylgOyAvLyBkdXJhdGlvbiBpbiBzZWNvbmRzXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7TWF0aC5yb3VuZChtaW51dGVzKX0gbWluKHMpYCAvLyBkdXJhdGlvbiBpbiBtaW51dGVzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlIHRoZSB0b3RhbCBwZXJjZW50YWdlIG9mIGEgZ3JvdXAgb2YgdGFza3MgKi9cclxuICAgIGNhbGN1bGF0ZVRvdGFsUGVyY2VudGFnZShub2RlOiBhbnkpOiBudW1iZXIge1xyXG4gICAgICAgIHZhciB0b3RhbFBlcmNlbnQ6IG51bWJlciA9IDA7XHJcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gbm9kZS5jaGlsZHJlbjtcclxuXHJcbiAgICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdG90YWxQZXJjZW50ICs9IGlzTmFOKGNoaWxkLnBlcmNlbnRDb21wbGV0ZSkgPyAwIDogY2hpbGQucGVyY2VudENvbXBsZXRlO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmNlaWwodG90YWxQZXJjZW50IC8gY2hpbGRyZW4ubGVuZ3RoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gaXNOYU4obm9kZS5wZXJjZW50Q29tcGxldGUpID8gMCA6IG5vZGUucGVyY2VudENvbXBsZXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlIHRoZSB0b3RhbCBwZXJjZW50IG9mIHRoZSBwYXJlbnQgdGFzayAqL1xyXG4gICAgY2FsY3VsYXRlUGFyZW50VG90YWxQZXJjZW50YWdlKHBhcmVudDogYW55LCB0YXNrczogYW55W10pIHtcclxuICAgICAgICB2YXIgY2hpbGRyZW4gPSB0YXNrcy5maWx0ZXIoKHRhc2s6YW55KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0YXNrLnBhcmVudElkID09PSBwYXJlbnQuaWQgJiYgdGFzay5pZCAhPSBwYXJlbnQuaWRcclxuICAgICAgICB9KTsgLy8gZ2V0IG9ubHkgY2hpbGRyZW4gdGFza3MgaWdub3JpbmcgcGFyZW50LlxyXG5cclxuICAgICAgICB2YXIgdG90YWxQZXJjZW50OiBudW1iZXIgPSAwO1xyXG5cclxuICAgICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZDphbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHRvdGFsUGVyY2VudCArPSBpc05hTihjaGlsZC5wZXJjZW50Q29tcGxldGUpID8gMCA6IGNoaWxkLnBlcmNlbnRDb21wbGV0ZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5jZWlsKHRvdGFsUGVyY2VudCAvIGNoaWxkcmVuLmxlbmd0aCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlzTmFOKHBhcmVudC5wZXJjZW50Q29tcGxldGUpID8gMCA6IHBhcmVudC5wZXJjZW50Q29tcGxldGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDYWxjdWxhdGUgdGhlIGdhbnR0IHNjYWxlIHJhbmdlIGdpdmVuIHRoZSBzdGFydCBhbmQgZW5kIGRhdGUgb2YgdGFza3MqL1xyXG4gICAgcHVibGljIGNhbGN1bGF0ZVNjYWxlKHN0YXJ0OiBEYXRlID0gbmV3IERhdGUoKSwgZW5kOiBEYXRlID0gdGhpcy5hZGREYXlzKHN0YXJ0LCA3KSkge1xyXG4gICAgICAgIGxldCBzY2FsZTogYW55W10gPSBbXTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgd2hpbGUgKHN0YXJ0LmdldFRpbWUoKSA8PSBlbmQuZ2V0VGltZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBzY2FsZS5wdXNoKHN0YXJ0KTtcclxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gdGhpcy5hZGREYXlzKHN0YXJ0LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gc2NhbGU7XHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZXR1cm4gc2NhbGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBEZXRlcm1pbmVzIHdoZXRoZXIgZ2l2ZW4gZGF0ZSBpcyBhIHdlZWtlbmQgKi9cclxuICAgIHB1YmxpYyBpc0RheVdlZWtlbmQoZGF0ZTogRGF0ZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBkYXkgPSBkYXRlLmdldERheSgpO1xyXG5cclxuICAgICAgICBpZiAoZGF5ID09PSA2IHx8IGRheSA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBBZGQgeCBudW1iZXIgb2YgZGF5cyB0byBhIGRhdGUgb2JqZWN0ICovXHJcbiAgICBwdWJsaWMgYWRkRGF5cyhkYXRlOiBEYXRlLCBkYXlzOiBudW1iZXIpOiBEYXRlIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IERhdGUoZGF0ZSk7XHJcbiAgICAgICAgcmVzdWx0LnNldERhdGUocmVzdWx0LmdldERhdGUoKSArIGRheXMpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8qKiBSZW1vdmUgeCBudW1iZXIgb2YgZGF5cyBmcm9tIGEgZGF0ZSBvYmplY3QgKi9cclxuICAgIHB1YmxpYyByZW1vdmVEYXlzKGRhdGU6IERhdGUsIGRheXM6IG51bWJlcik6IERhdGUge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBuZXcgRGF0ZShkYXRlKTtcclxuICAgICAgICByZXN1bHQuc2V0RGF0ZShyZXN1bHQuZ2V0RGF0ZSgpIC0gZGF5cyk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlcyB0aGUgZ3JpZCBzY2FsZSBmb3IgZ2FudHQgYmFzZWQgb24gdGFza3Mgc3RhcnQgYW5kIGVuZCBkYXRlcyAqL1xyXG4gICAgcHVibGljIGNhbGN1bGF0ZUdyaWRTY2FsZSh0YXNrczogVGFza1tdKTogSVNjYWxlIHtcclxuICAgICAgICB2YXIgc3RhcnQ6IERhdGU7XHJcbiAgICAgICAgdmFyIGVuZDogRGF0ZTtcclxuICAgICAgICB2YXIgZGF0ZXMgPSB0YXNrcy5tYXAoKHRhc2s6YW55KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBzdGFydDogbmV3IERhdGUodGFzay5zdGFydCksXHJcbiAgICAgICAgICAgICAgICBlbmQ6IG5ldyBEYXRlKHRhc2suZW5kKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHN0YXJ0ID0gbmV3IERhdGUoTWF0aC5taW4uYXBwbHkobnVsbCwgZGF0ZXMubWFwKGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0LnN0YXJ0O1xyXG4gICAgICAgIH0pKSk7XHJcblxyXG4gICAgICAgIGVuZCA9IG5ldyBEYXRlKE1hdGgubWF4LmFwcGx5KG51bGwsIGRhdGVzLm1hcChmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdC5lbmQ7XHJcbiAgICAgICAgfSkpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxyXG4gICAgICAgICAgICBlbmQ6IGVuZFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogQ3JlYXRlIGFuIGhvdXJzIGFycmF5IGZvciB1c2UgaW4gdGltZSBzY2FsZSBjb21wb25lbnQgKi9cclxuICAgIHB1YmxpYyBnZXRIb3Vycyhjb2xzOiBudW1iZXIpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgdmFyIGhvdXJzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgICAgICB3aGlsZSAoaG91cnMubGVuZ3RoIDw9IGNvbHMgKiAyNCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSAyMzsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA8IDEwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaG91cnMucHVzaCgnMCcgKyBpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBob3Vycy5wdXNoKGkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBob3VycztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50OiBhbnksIGF0dHJpYnV0ZTogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudClbYXR0cmlidXRlXSwgMTApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETyhkYWxlKTogZGV0ZXJtaW5lIHdoZXRoZXIgdGhpcyBpcyBuZWVkZWRcclxuICAgIHB1YmxpYyBjYWxjdWxhdGVDb250YWluZXJXaWR0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIHRoaXMud2luZG93SW5uZXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgIGxldCBjb250YWluZXJXaWR0aCA9IChpbm5lcldpZHRoIC0gMTgpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29udGFpbmVyV2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbGN1bGF0ZUFjdGl2aXR5Q29udGFpbmVyRGltZW5zaW9ucygpOiBhbnkge1xyXG4gICAgICAgIHZhciBzY3JvbGxXaWR0aDogbnVtYmVyID0gMTg7XHJcbiAgICAgICAgdGhpcy53aW5kb3dJbm5lcldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgbGV0IHdpZHRoID0gdGhpcy53aW5kb3dJbm5lcldpZHRoIC0gdGhpcy5ncmlkV2lkdGggLSBzY3JvbGxXaWR0aDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHsgaGVpZ2h0OiB0aGlzLmFjdGl2aXR5SGVpZ2h0LCB3aWR0aDogd2lkdGggfTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogU2V0IHRoZSB2ZXJ0aWNhbCBzY3JvbGwgdG9wIHBvc2l0aW9ucyBmb3IgZ2FudHQgKi9cclxuICAgIHB1YmxpYyBzY3JvbGxUb3AodmVydGljYWxTY3JvbGxFbGVtOiBhbnksIGdhbnR0R3JpZEVsZW06IGFueSwgZ2FudHRBY3Rpdml0eUFyZWFFbGVtOiBhbnkpIHtcclxuICAgICAgICBsZXQgdmVydGljYWxTY3JvbGxUb3AgPSB2ZXJ0aWNhbFNjcm9sbEVsZW0uc2Nyb2xsVG9wO1xyXG4gICAgICAgIGxldCBzY3JvbGwgPSB0aGlzLnNldFNjcm9sbFRvcDtcclxuXHJcbiAgICAgICAgLy8gZGVib3VuY2VcclxuICAgICAgICBpZiAodmVydGljYWxTY3JvbGxUb3AgIT09IG51bGwgJiYgdmVydGljYWxTY3JvbGxUb3AgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsKHZlcnRpY2FsU2Nyb2xsVG9wLCBnYW50dEFjdGl2aXR5QXJlYUVsZW0pO1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsKGdhbnR0QWN0aXZpdHlBcmVhRWxlbS5zY3JvbGxUb3AsIGdhbnR0R3JpZEVsZW0pO1xyXG5cclxuICAgICAgICAgICAgfSwgNTApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogR3JvdXAgZGF0YSBieSBpZCAsIG9ubHkgc3VwcG9ydHMgb25lIGxldmVsKi9cclxuICAgIHB1YmxpYyBncm91cERhdGEodGFza3M6IGFueSk6IGFueSB7XHJcbiAgICAgICAgdmFyIG1lcmdlZDphbnkgPSBbXTtcclxuICAgICAgICB2YXIgZ3JvdXBzOmFueSA9IG5ldyBHcm91cEJ5UGlwZSgpLnRyYW5zZm9ybSh0YXNrcywgKHRhc2s6YW55KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBbdGFzay50cmVlUGF0aC5zcGxpdCgnLycpWzBdXVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBtZXJnZWQuY29uY2F0LmFwcGx5KFtdLCBncm91cHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDcmVhdGUgdHJlZSBvZiBkYXRhICovXHJcbiAgICBwdWJsaWMgdHJhbnNmb3JtRGF0YShpbnB1dDogYW55KTogYW55IHtcclxuICAgICAgICB2YXIgb3V0cHV0OmFueSA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGNoYWluOmFueSA9IGlucHV0W2ldLmlkLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50Tm9kZTphbnkgPSBvdXRwdXQ7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY2hhaW4ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciB3YW50ZWROb2RlOmFueSA9IGNoYWluW2pdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGxhc3ROb2RlOmFueSA9IGN1cnJlbnROb2RlO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBjdXJyZW50Tm9kZS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Tm9kZVtrXS5uYW1lID09IHdhbnRlZE5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZVtrXS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgY291bGRuJ3QgZmluZCBhbiBpdGVtIGluIHRoaXMgbGlzdCBvZiBjaGlsZHJlblxyXG4gICAgICAgICAgICAgICAgLy8gdGhhdCBoYXMgdGhlIHJpZ2h0IG5hbWUsIGNyZWF0ZSBvbmU6XHJcbiAgICAgICAgICAgICAgICBpZiAobGFzdE5vZGUgPT0gY3VycmVudE5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL1RPRE8oZGFsZSk6IGRldGVybWluZSB3YXkgdG8gc2hvdyBwZXJjZW50IGNvbXBsZXRlIG9uIGNvcnJlY3QgY2hpbGQgIFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdOb2RlOmFueSA9IGN1cnJlbnROb2RlW2tdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB3YW50ZWROb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50Q29tcGxldGU6IGlucHV0W2ldLnBlcmNlbnRDb21wbGV0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGlucHV0W2ldLnN0YXJ0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IGlucHV0W2ldLmVuZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZSA9IG5ld05vZGUuY2hpbGRyZW47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2hlY2tzIHdoZXRoZXIgYW55IG5ldyBkYXRhIG5lZWRzIHRvIGJlIGFkZGVkIHRvIHRhc2sgY2FjaGUgICovXHJcbiAgICBwdWJsaWMgZG9UYXNrQ2hlY2sodGFza3M6IGFueVtdLCB0cmVlRXhwYW5kZWQ6IGJvb2xlYW4pOiBib29sZWFuIHtcclxuICAgICAgICB2YXIgY2FjaGVkVGFza0lkcyA9IHRoaXMuVEFTS19DQUNIRS5tYXAoKHRhc2s6YW55KSA9PiB7IHJldHVybiB0YXNrLmlkIH0pO1xyXG4gICAgICAgIHZhciBpdGVtc1RvQ2FjaGU6IGFueVtdID0gW107XHJcblxyXG4gICAgICAgIGlmICh0cmVlRXhwYW5kZWQpIHtcclxuICAgICAgICAgICAgLy8gcHVzaCBjaGlsZHJlbiBhbmQgcGFyZW50IHRhc2tzIHRoYXQgYXJlIG5vdCBjYWNoZWRcclxuICAgICAgICAgICAgdGFza3MuZmlsdGVyKCh0YXNrOmFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFRhc2tJZHMuaW5kZXhPZih0YXNrLmlkKSA9PT0gLTFcclxuICAgICAgICAgICAgfSkuZm9yRWFjaCgodGFzazphbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zVG9DYWNoZS5wdXNoKHRhc2spO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIG9ubHkgbG9vayBhdCB0YXNrcyB0aGF0IGFyZSBub3QgY2FjaGVkXHJcbiAgICAgICAgICAgIHRhc2tzLmZpbHRlcigodGFzazphbnkpID0+IHsgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGVkVGFza0lkcy5pbmRleE9mKHRhc2suaWQpID09PSAtMSAmJiB0YXNrLnRyZWVQYXRoLnNwbGl0KCcvJykubGVuZ3RoID09PSAxIFxyXG4gICAgICAgICAgICB9KS5mb3JFYWNoKCh0YXNrOmFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaXRlbXNUb0NhY2hlLnB1c2godGFzayk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXRlbXNUb0NhY2hlLmZvckVhY2goKGl0ZW06YW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuVEFTS19DQUNIRS5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoaXRlbXNUb0NhY2hlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFNldCBhIGlkIHByZWZpeCBzbyBDU1MzIHF1ZXJ5IHNlbGVjdG9yIGNhbiB3b3JrIHdpdGggaWRzIHRoYXQgY29udGFpbiBudW1iZXJzICovXHJcbiAgICBwdWJsaWMgc2V0SWRQcmVmaXgoaWQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGBfJHtpZH1gO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIC8qKiBSZW1vdmUgdGhlIGlkIHByZWZpeCB0byBhbGxvdyBxdWVyeWluZyBvZiBkYXRhICovXHJcbiAgICAvLyBwdWJsaWMgcmVtb3ZlSWRQcmVmaXgoaWQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAvLyAgICAgcmV0dXJuIGlkLnN1YnN0cmluZygxLCBpZC5sZW5ndGggLSAxKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvKiogU2V0IHRoZSBzY3JvbGwgdG9wIHByb3BlcnR5IG9mIGEgbmF0aXZlIERPTSBlbGVtZW50ICovXHJcbiAgICBwcml2YXRlIHNldFNjcm9sbFRvcChzY3JvbGxUb3A6IG51bWJlciwgZWxlbWVudDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQgIT09IG51bGwgJiYgZWxlbWVudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=