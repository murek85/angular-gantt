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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2dhbnR0LyIsInNvdXJjZXMiOlsibGliL3NoYXJlZC9zZXJ2aWNlcy9nYW50dC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVyRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFOUQ7SUFzQkk7UUFwQk8sY0FBUyxHQUFXLENBQUMsQ0FBQztRQUN0QixrQkFBYSxHQUFXLEVBQUUsQ0FBQyxDQUFDLG9EQUFvRDs7UUFDaEYsbUJBQWMsR0FBVyxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUNqRCxjQUFTLEdBQVcsQ0FBQyxDQUFDO1FBQ3RCLHFCQUFnQixHQUFXLENBQUMsQ0FBQztRQUM3QixtQkFBYyxHQUFXLENBQUMsQ0FBQztRQUMzQixjQUFTLEdBQVcsQ0FBQyxDQUFDO1FBQ3RCLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFDbkIsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFDN0IsY0FBUyxHQUFXLEdBQUcsQ0FBQztRQUN2QixjQUFTLEdBQWdCO1lBQzdCLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxFQUFFLG1CQUFtQixFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRTtZQUMvSCxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFO1lBQ2xILEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSx1QkFBdUIsRUFB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QUssSUFBSSxJQUFJLE9BQU8sS0FBSyxTQUFTLEVBQUU7WUFDM0MsT0FBTyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7U0FDakM7SUFDTCxDQUFDOztnQkFuaEJKLFVBQVU7Ozs7SUFvaEJYLG1CQUFDO0NBQUEsQUFwaEJELElBb2hCQztTQW5oQlksWUFBWTs7O0lBQ3JCLGlDQUE2Qjs7SUFDN0IscUNBQWtDOztJQUNsQyxzQ0FBd0Q7O0lBQ3hELGlDQUE2Qjs7SUFDN0Isd0NBQW9DOztJQUNwQyxzQ0FBa0M7O0lBQ2xDLGlDQUE2Qjs7SUFDN0IscUNBQWlDOztJQUNqQyw4QkFBMEI7O0lBQzFCLG1DQUFvQzs7SUFDcEMsaUNBQStCOzs7OztJQUMvQixpQ0FLRTs7SUFDRixrQ0FBeUI7O0lBQ3pCLGtDQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgR2FudHRDb25maWcgfSBmcm9tICcuL2dhbnR0LWNvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSUJhclN0eWxlLCBUYXNrLCBJU2NhbGUsIFpvb21pbmcgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgR3JvdXBCeVBpcGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvcGlwZXMvZ3JvdXBCeS5waXBlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdhbnR0U2VydmljZSB7XHJcbiAgICBwdWJsaWMgcm93SGVpZ2h0OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGhvdXJDZWxsV2lkdGg6IG51bWJlciA9IDYwOyAvLyBjaGFuZ2UgdG8gNjAgc28gbWludXRlcyBjYW4gYmVlbiBzZWVuIG1vcmUgZWFzaWx5XHJcbiAgICBwdWJsaWMgaG91cnNDZWxsV2lkdGg6IG51bWJlciA9IHRoaXMuaG91ckNlbGxXaWR0aCAqIDI1O1xyXG4gICAgcHVibGljIGNlbGxXaWR0aDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyB3aW5kb3dJbm5lcldpZHRoOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGFjdGl2aXR5SGVpZ2h0OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGJhckhlaWdodDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBiYXJMaW5lSGVpZ2h0OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGJhclRvcDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBiYXJNb3ZlYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGdyaWRXaWR0aDogbnVtYmVyID0gNTYwO1xyXG4gICAgcHJpdmF0ZSBiYXJTdHlsZXM6IElCYXJTdHlsZVtdID0gW1xyXG4gICAgICAgIHsgc3RhdHVzOiBcImluZm9ybWF0aW9uXCIsIGJhY2tncm91bmRDb2xvcjogXCJyZ2IoMTgsMTk1LCAyNDQpXCIsIGJvcmRlcjogXCIxcHggc29saWQgIzIxOTZGM1wiLCBwcm9ncmVzc0JhY2tncm91bmRDb2xvcjogXCIjMjE5NkYzXCIgfSxcclxuICAgICAgICB7IHN0YXR1czogXCJ3YXJuaW5nXCIsIGJhY2tncm91bmRDb2xvcjogXCIjRkZBNzI2XCIsIGJvcmRlcjogXCIxcHggc29saWQgI0VGNkMwMFwiLCBwcm9ncmVzc0JhY2tncm91bmRDb2xvcjogXCIjRUY2QzAwXCIgfSxcclxuICAgICAgICB7IHN0YXR1czogXCJlcnJvclwiLCBiYWNrZ3JvdW5kQ29sb3I6IFwiI0VGNTM1MFwiLCBib3JkZXI6IFwiMXB4IHNvbGlkICNDNjI4MjhcIiwgcHJvZ3Jlc3NCYWNrZ3JvdW5kQ29sb3I6IFwiI0M2MjgyOFwiIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IFwiY29tcGxldGVkXCIsIGJhY2tncm91bmRDb2xvcjogXCIjNjZCQjZBXCIsIGJvcmRlcjogXCIxcHggc29saWQgIzJFN0QzMlwiLCBwcm9ncmVzc0JhY2tncm91bmRDb2xvcjogXCIjMkU3RDMyXCIgfVxyXG4gICAgXTtcclxuICAgIHB1YmxpYyBUQVNLX0NBQ0hFOiBhbnlbXTtcclxuICAgIHB1YmxpYyBUSU1FX1NDQUxFOiBhbnlbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBsZXQgX2dhbnR0Q29uZmlnID0gbmV3IEdhbnR0Q29uZmlnKCk7XHJcblxyXG4gICAgICAgIHRoaXMucm93SGVpZ2h0ID0gX2dhbnR0Q29uZmlnLnJvd0hlaWdodDtcclxuICAgICAgICB0aGlzLmNlbGxXaWR0aCA9IF9nYW50dENvbmZpZy5jZWxsV2lkdGg7XHJcbiAgICAgICAgdGhpcy5hY3Rpdml0eUhlaWdodCA9IF9nYW50dENvbmZpZy5hY3Rpdml0eUhlaWdodDtcclxuICAgICAgICB0aGlzLmJhckhlaWdodCA9IF9nYW50dENvbmZpZy5iYXJIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5iYXJMaW5lSGVpZ2h0ID0gX2dhbnR0Q29uZmlnLmJhckxpbmVIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5iYXJUb3AgPSBfZ2FudHRDb25maWcucm93SGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuYmFyTW92ZWFibGUgPSBfZ2FudHRDb25maWcuYmFyTW92ZWFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVCYXJXaWR0aChzdGFydDogRGF0ZSwgZW5kOiBEYXRlLCBob3Vycz86IGJvb2xlYW4pOiBudW1iZXIge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgc3RhcnQgPSBuZXcgRGF0ZShzdGFydCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGVuZCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICBlbmQgPSBuZXcgRGF0ZShlbmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGRheXMgPSB0aGlzLmNhbGN1bGF0ZURpZmZEYXlzKHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgIGxldCB3aWR0aDogbnVtYmVyID0gZGF5cyAqIHRoaXMuY2VsbFdpZHRoICsgZGF5cztcclxuXHJcbiAgICAgICAgaWYgKGhvdXJzKSB7XHJcbiAgICAgICAgICAgIHdpZHRoID0gZGF5cyAqIHRoaXMuaG91ckNlbGxXaWR0aCAqIDI0ICsgZGF5cyAqIDI0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHdpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlQmFyTGVmdChzdGFydDogRGF0ZSwgc2NhbGU6IGFueVtdLCBob3Vycz86IGJvb2xlYW4pOiBudW1iZXIge1xyXG4gICAgICAgIHZhciBsZWZ0OiBudW1iZXIgPSAwO1xyXG4gICAgICAgIHZhciBob3Vyc0luRGF5OiBudW1iZXIgPSAyNDtcclxuXHJcbiAgICAgICAgaWYgKHN0YXJ0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdGFydCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgc3RhcnQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNjYWxlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhcnQuZ2V0RGF0ZSgpID09PSBzY2FsZVtpXS5nZXREYXRlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaG91cnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCA9IGkgKiBob3Vyc0luRGF5ICogdGhpcy5ob3VyQ2VsbFdpZHRoICsgaG91cnNJbkRheSAqIGkgKyB0aGlzLmNhbGN1bGF0ZUJhckxlZnREZWx0YShzdGFydCwgaG91cnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQgPSBpICogdGhpcy5jZWxsV2lkdGggKyBpICsgdGhpcy5jYWxjdWxhdGVCYXJMZWZ0RGVsdGEoc3RhcnQsIGhvdXJzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxlZnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENhbGN1bGF0ZXMgdGhlIGhlaWdodCBvZiB0aGUgZ2FudHQgZ3JpZCwgYWN0aXZpdHkgYW5kIHZlcnRpY2FsIHNjcm9sbCAqL1xyXG4gICAgcHVibGljIGNhbGN1bGF0ZUdhbnR0SGVpZ2h0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuVEFTS19DQUNIRS5sZW5ndGggKiB0aGlzLnJvd0hlaWdodCArIHRoaXMucm93SGVpZ2h0ICogM31weGA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVCYXJMZWZ0RGVsdGEoc3RhcnQ6IERhdGUsIGhvdXJzPzogYm9vbGVhbik6IG51bWJlciB7XHJcbiAgICAgICAgdmFyIG9mZnNldDogbnVtYmVyID0gMDtcclxuICAgICAgICB2YXIgaG91cnNJbkRheTogbnVtYmVyID0gMjQ7XHJcbiAgICAgICAgdmFyIG1pbnV0ZXNJbkhvdXI6IG51bWJlciA9IDYwO1xyXG4gICAgICAgIHZhciBzZWNvbmRzSW5Ib3VyOiBudW1iZXIgPSAzNjAwO1xyXG4gICAgICAgIHZhciBzdGFydEhvdXJzOiBudW1iZXIgPSBzdGFydC5nZXRIb3VycygpICsgc3RhcnQuZ2V0TWludXRlcygpIC8gbWludXRlc0luSG91ciArIHN0YXJ0LmdldFNlY29uZHMoKSAvIHNlY29uZHNJbkhvdXI7XHJcblxyXG4gICAgICAgIGlmIChob3Vycykge1xyXG4gICAgICAgICAgICBvZmZzZXQgPSB0aGlzLmhvdXJzQ2VsbFdpZHRoIC8gaG91cnNJbkRheSAqIHN0YXJ0SG91cnMgLSBzdGFydEhvdXJzO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG9mZnNldCA9IHRoaXMuY2VsbFdpZHRoIC8gaG91cnNJbkRheSAqIHN0YXJ0SG91cnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvZmZzZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzUGFyZW50KHRyZWVQYXRoOiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIGRlcHRoID0gdHJlZVBhdGguc3BsaXQoJy8nKS5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGVwdGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzQ2hpbGQodHJlZVBhdGg6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0aGlzLmlzUGFyZW50KHRyZWVQYXRoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJzBweCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAnMjBweCc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENhbGN1bGF0ZSB0aGUgYmFyIHN0eWxlcyAqL1xyXG4gICAgcHVibGljIGNhbGN1bGF0ZUJhcih0YXNrOiBhbnksIGluZGV4OiBudW1iZXIsIHNjYWxlOiBhbnksIGhvdXJzPzogYm9vbGVhbikge1xyXG4gICAgICAgIHZhciBiYXJTdHlsZSA9IHRoaXMuZ2V0QmFyU3R5bGUodGFzay5zdGF0dXMpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICd0b3AnOiB0aGlzLmJhclRvcCAqIGluZGV4ICsgMiArICdweCcsXHJcbiAgICAgICAgICAgICdsZWZ0JzogdGhpcy5jYWxjdWxhdGVCYXJMZWZ0KHRhc2suc3RhcnQsIHNjYWxlLCBob3VycykgKyAncHgnLFxyXG4gICAgICAgICAgICAnaGVpZ2h0JzogdGhpcy5iYXJIZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAnbGluZS1oZWlnaHQnOiB0aGlzLmJhckxpbmVIZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAnd2lkdGgnOiB0aGlzLmNhbGN1bGF0ZUJhcldpZHRoKHRhc2suc3RhcnQsIHRhc2suZW5kLCBob3VycykgKyAncHgnLFxyXG4gICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IGJhclN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSxcclxuICAgICAgICAgICAgJ2JvcmRlcic6IGJhclN0eWxlW1wiYm9yZGVyXCJdXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBHZXQgdGhlIGJhciBzdHlsZSBiYXNlZCBvbiB0YXNrIHN0YXR1cyAqL1xyXG4gICAgcHJpdmF0ZSBnZXRCYXJTdHlsZSh0YXNrU3RhdHVzOiBzdHJpbmcgPSBcIlwiKTogYW55IHtcclxuICAgICAgICB2YXIgc3R5bGUgPSB7fTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGFza1N0YXR1cyA9IHRhc2tTdGF0dXMudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgdGFza1N0YXR1cyA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzd2l0Y2ggKHRhc2tTdGF0dXMpIHtcclxuICAgICAgICAgICAgY2FzZSBcImluZm9ybWF0aW9uXCI6XHJcbiAgICAgICAgICAgICAgICBzdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0gPSB0aGlzLmJhclN0eWxlc1swXS5iYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICAgICAgICAgICAgICBzdHlsZVtcImJvcmRlclwiXSA9IHRoaXMuYmFyU3R5bGVzWzBdLmJvcmRlcjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwid2FybmluZ1wiOlxyXG4gICAgICAgICAgICAgICAgc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gdGhpcy5iYXJTdHlsZXNbMV0uYmFja2dyb3VuZENvbG9yO1xyXG4gICAgICAgICAgICAgICAgc3R5bGVbXCJib3JkZXJcIl0gPSB0aGlzLmJhclN0eWxlc1sxXS5ib3JkZXI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImVycm9yXCI6XHJcbiAgICAgICAgICAgICAgICBzdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0gPSB0aGlzLmJhclN0eWxlc1syXS5iYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICAgICAgICAgICAgICBzdHlsZVtcImJvcmRlclwiXSA9IHRoaXMuYmFyU3R5bGVzWzJdLmJvcmRlcjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY29tcGxldGVkXCI6XHJcbiAgICAgICAgICAgICAgICBzdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0gPSB0aGlzLmJhclN0eWxlc1szXS5iYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICAgICAgICAgICAgICBzdHlsZVtcImJvcmRlclwiXSA9IHRoaXMuYmFyU3R5bGVzWzNdLmJvcmRlcjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gXCJyZ2IoMTgsMTk1LCAyNDQpXCI7XHJcbiAgICAgICAgICAgICAgICBzdHlsZVtcImJvcmRlclwiXSA9IFwiMXB4IHNvbGlkICMyMTk2RjNcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBHZXQgdGhlIHByb2dyZXNzcyBiYXIgYmFja2dyb3VuZCBjb2xvdXIgYmFzZWQgb24gdGFzayBzdGF0dXMgKi9cclxuICAgIHB1YmxpYyBnZXRCYXJQcm9ncmVzc1N0eWxlKHRhc2tTdGF0dXM6IHN0cmluZyA9IFwiXCIpOiBhbnkge1xyXG4gICAgICAgIHZhciBzdHlsZSA9IHt9O1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0YXNrU3RhdHVzID0gdGFza1N0YXR1cy50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICB0YXNrU3RhdHVzID0gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN3aXRjaCAodGFza1N0YXR1cykge1xyXG4gICAgICAgICAgICBjYXNlIFwiaW5mb3JtYXRpb25cIjpcclxuICAgICAgICAgICAgICAgIHN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSA9IHRoaXMuYmFyU3R5bGVzWzBdLnByb2dyZXNzQmFja2dyb3VuZENvbG9yO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ3YXJuaW5nXCI6XHJcbiAgICAgICAgICAgICAgICBzdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0gPSB0aGlzLmJhclN0eWxlc1sxXS5wcm9ncmVzc0JhY2tncm91bmRDb2xvcjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZXJyb3JcIjpcclxuICAgICAgICAgICAgICAgIHN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSA9IHRoaXMuYmFyU3R5bGVzWzJdLnByb2dyZXNzQmFja2dyb3VuZENvbG9yO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjb21wbGV0ZWRcIjpcclxuICAgICAgICAgICAgICAgIHN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSA9IHRoaXMuYmFyU3R5bGVzWzNdLnByb2dyZXNzQmFja2dyb3VuZENvbG9yO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBzdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0gPSB0aGlzLmJhclN0eWxlc1swXS5wcm9ncmVzc0JhY2tncm91bmRDb2xvcjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDYWxjdWxhdGVzIHRoZSBiYXIgcHJvZ3Jlc3Mgd2lkdGggaW4gcGl4ZWxzIGdpdmVuIHRhc2sgcGVyY2VudCBjb21wbGV0ZSAqL1xyXG4gICAgcHVibGljIGNhbGN1bGF0ZUJhclByb2dyZXNzKHdpZHRoOiBudW1iZXIsIHBlcmNlbnQ6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBwZXJjZW50ID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgIGlmIChwZXJjZW50ID4gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICBwZXJjZW50ID0gMTAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBwcm9ncmVzczogbnVtYmVyID0gKHdpZHRoIC8gMTAwKSAqIHBlcmNlbnQgLSAyO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGAke3Byb2dyZXNzfXB4YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGAkezB9cHhgO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDYWxjdWxhdGVzIHRoZSBkaWZmZXJlbmNlIGluIHR3byBkYXRlcyBhbmQgcmV0dXJucyBudW1iZXIgb2YgZGF5cyAqL1xyXG4gICAgcHVibGljIGNhbGN1bGF0ZURpZmZEYXlzKHN0YXJ0OiBEYXRlLCBlbmQ6IERhdGUpOiBudW1iZXIge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBvbmVEYXkgPSAyNCAqIDYwICogNjAgKiAxMDAwOyAvLyBob3VycyptaW51dGVzKnNlY29uZHMqbWlsbGlzZWNvbmRzIC9tc1xyXG4gICAgICAgICAgICBsZXQgZGlmZkRheXMgPSBNYXRoLmFicygoc3RhcnQuZ2V0VGltZSgpIC0gZW5kLmdldFRpbWUoKSkgLyAob25lRGF5KSk7XHJcbiAgICAgICAgICAgIGxldCBkYXlzID0gZGlmZkRheXM7IC8vIGRvbid0IHVzZSBNYXRoLnJvdW5kIGFzIGl0IHdpbGwgZHJhdyBhbiBpbmNvcnJlY3QgYmFyXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGF5cztcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDYWxjdWxhdGVzIHRoZSBkaWZmZXJlbmNlIGluIHR3byBkYXRlcyBhbmQgcmV0dXJucyBudW1iZXIgb2YgaG91cnMgKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVEdXJhdGlvbih0YXNrOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmICh0YXNrLnN0YXJ0ICE9IG51bGwgJiYgdGFzay5lbmQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG9uZUhvdXIgPSA2MCAqIDYwICogMTAwMDtcclxuICAgICAgICAgICAgICAgIGxldCBkaWZmSG91cnMgPSAoTWF0aC5hYnMoKHRhc2suc3RhcnQuZ2V0VGltZSgpIC0gdGFzay5lbmQuZ2V0VGltZSgpKSAvIG9uZUhvdXIpKTtcclxuICAgICAgICAgICAgICAgIGxldCBkdXJhdGlvbiA9IGRpZmZIb3VycztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZHVyYXRpb24gPiAyNCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtNYXRoLnJvdW5kKGR1cmF0aW9uIC8gMjQpfSBkYXkocylgOyAvLyBkdXJhdGlvbiBpbiBkYXlzXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGR1cmF0aW9uID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtNYXRoLnJvdW5kKGR1cmF0aW9uKX0gaHIocylgOyAvLyBkdXJhdGlvbiBpbiBob3Vyc1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWludXRlcyA9IGR1cmF0aW9uICogNjA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtaW51dGVzIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7TWF0aC5yb3VuZChtaW51dGVzICogNjApfSBzZWNvbmQocylgOyAvLyBkdXJhdGlvbiBpbiBzZWNvbmRzXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtNYXRoLnJvdW5kKG1pbnV0ZXMpfSBtaW4ocylgIC8vIGR1cmF0aW9uIGluIG1pbnV0ZXNcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNhbGN1bGF0ZVRvdGFsRHVyYXRpb24odGFza3M6IGFueVtdKTogc3RyaW5nIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0YXNrcyA9IHRhc2tzLmZpbHRlcih0ID0+IHQucGFyZW50SWQgPT09IHQuaWQpOyAvLyBvbmx5IGNhbGN1bGF0ZSB0b3RhbCBkdXJhdGlvbiB3aXRoIHBhcmVudCB0YXNrc1xyXG5cclxuICAgICAgICAgICAgbGV0IHRvdGFsSG91cnMgPSAwO1xyXG4gICAgICAgICAgICBsZXQgb25lSG91ciA9IDYwICogNjAgKiAxMDAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhc2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnQgPSB0YXNrc1tpXS5zdGFydDtcclxuICAgICAgICAgICAgICAgIGxldCBlbmQgPSB0YXNrc1tpXS5lbmQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXJ0ICE9IG51bGwgJiYgZW5kICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZHVyYXRpb24gPSBNYXRoLmFicyh0YXNrc1tpXS5lbmQuZ2V0VGltZSgpIC0gdGFza3NbaV0uc3RhcnQuZ2V0VGltZSgpKSAvIG9uZUhvdXI7IC8vIGR1cmF0aW9uIGluIGhvdXJzXHJcbiAgICAgICAgICAgICAgICAgICAgdG90YWxIb3VycyArPSBkdXJhdGlvbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRvdGFsSG91cnMgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRvdGFsSG91cnMgPiAyNCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke01hdGgucm91bmQodG90YWxIb3VycyAvIDI0KX0gZGF5KHMpYDsgLy8gZHVyYXRpb24gaW4gZGF5c1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRvdGFsSG91cnMgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7TWF0aC5yb3VuZCh0b3RhbEhvdXJzKX0gaHIocylgOyAvLyBkdXJhdGlvbiBpbiBob3Vyc1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1pbnV0ZXMgPSB0b3RhbEhvdXJzICogNjA7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1pbnV0ZXMgPCAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke01hdGgucm91bmQobWludXRlcyAqIDYwKX0gc2Vjb25kKHMpYDsgLy8gZHVyYXRpb24gaW4gc2Vjb25kc1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke01hdGgucm91bmQobWludXRlcyl9IG1pbihzKWAgLy8gZHVyYXRpb24gaW4gbWludXRlc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENhbGN1bGF0ZSB0aGUgdG90YWwgcGVyY2VudGFnZSBvZiBhIGdyb3VwIG9mIHRhc2tzICovXHJcbiAgICBjYWxjdWxhdGVUb3RhbFBlcmNlbnRhZ2Uobm9kZTogYW55KTogbnVtYmVyIHtcclxuICAgICAgICB2YXIgdG90YWxQZXJjZW50OiBudW1iZXIgPSAwO1xyXG4gICAgICAgIHZhciBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW47XHJcblxyXG4gICAgICAgIGlmIChjaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goKGNoaWxkOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHRvdGFsUGVyY2VudCArPSBpc05hTihjaGlsZC5wZXJjZW50Q29tcGxldGUpID8gMCA6IGNoaWxkLnBlcmNlbnRDb21wbGV0ZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5jZWlsKHRvdGFsUGVyY2VudCAvIGNoaWxkcmVuLmxlbmd0aCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlzTmFOKG5vZGUucGVyY2VudENvbXBsZXRlKSA/IDAgOiBub2RlLnBlcmNlbnRDb21wbGV0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENhbGN1bGF0ZSB0aGUgdG90YWwgcGVyY2VudCBvZiB0aGUgcGFyZW50IHRhc2sgKi9cclxuICAgIGNhbGN1bGF0ZVBhcmVudFRvdGFsUGVyY2VudGFnZShwYXJlbnQ6IGFueSwgdGFza3M6IGFueVtdKSB7XHJcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gdGFza3MuZmlsdGVyKCh0YXNrOmFueSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGFzay5wYXJlbnRJZCA9PT0gcGFyZW50LmlkICYmIHRhc2suaWQgIT0gcGFyZW50LmlkXHJcbiAgICAgICAgfSk7IC8vIGdldCBvbmx5IGNoaWxkcmVuIHRhc2tzIGlnbm9yaW5nIHBhcmVudC5cclxuXHJcbiAgICAgICAgdmFyIHRvdGFsUGVyY2VudDogbnVtYmVyID0gMDtcclxuXHJcbiAgICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQ6YW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0b3RhbFBlcmNlbnQgKz0gaXNOYU4oY2hpbGQucGVyY2VudENvbXBsZXRlKSA/IDAgOiBjaGlsZC5wZXJjZW50Q29tcGxldGU7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguY2VpbCh0b3RhbFBlcmNlbnQgLyBjaGlsZHJlbi5sZW5ndGgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpc05hTihwYXJlbnQucGVyY2VudENvbXBsZXRlKSA/IDAgOiBwYXJlbnQucGVyY2VudENvbXBsZXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlIHRoZSBnYW50dCBzY2FsZSByYW5nZSBnaXZlbiB0aGUgc3RhcnQgYW5kIGVuZCBkYXRlIG9mIHRhc2tzKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVTY2FsZShzdGFydDogRGF0ZSA9IG5ldyBEYXRlKCksIGVuZDogRGF0ZSA9IHRoaXMuYWRkRGF5cyhzdGFydCwgNykpIHtcclxuICAgICAgICBsZXQgc2NhbGU6IGFueVtdID0gW107XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHdoaWxlIChzdGFydC5nZXRUaW1lKCkgPD0gZW5kLmdldFRpbWUoKSkge1xyXG4gICAgICAgICAgICAgICAgc2NhbGUucHVzaChzdGFydCk7XHJcbiAgICAgICAgICAgICAgICBzdGFydCA9IHRoaXMuYWRkRGF5cyhzdGFydCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHNjYWxlO1xyXG5cclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNjYWxlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogRGV0ZXJtaW5lcyB3aGV0aGVyIGdpdmVuIGRhdGUgaXMgYSB3ZWVrZW5kICovXHJcbiAgICBwdWJsaWMgaXNEYXlXZWVrZW5kKGRhdGU6IERhdGUpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgZGF5ID0gZGF0ZS5nZXREYXkoKTtcclxuXHJcbiAgICAgICAgaWYgKGRheSA9PT0gNiB8fCBkYXkgPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQWRkIHggbnVtYmVyIG9mIGRheXMgdG8gYSBkYXRlIG9iamVjdCAqL1xyXG4gICAgcHVibGljIGFkZERheXMoZGF0ZTogRGF0ZSwgZGF5czogbnVtYmVyKTogRGF0ZSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBEYXRlKGRhdGUpO1xyXG4gICAgICAgIHJlc3VsdC5zZXREYXRlKHJlc3VsdC5nZXREYXRlKCkgKyBkYXlzKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8vKiogUmVtb3ZlIHggbnVtYmVyIG9mIGRheXMgZnJvbSBhIGRhdGUgb2JqZWN0ICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlRGF5cyhkYXRlOiBEYXRlLCBkYXlzOiBudW1iZXIpOiBEYXRlIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IERhdGUoZGF0ZSk7XHJcbiAgICAgICAgcmVzdWx0LnNldERhdGUocmVzdWx0LmdldERhdGUoKSAtIGRheXMpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENhbGN1bGF0ZXMgdGhlIGdyaWQgc2NhbGUgZm9yIGdhbnR0IGJhc2VkIG9uIHRhc2tzIHN0YXJ0IGFuZCBlbmQgZGF0ZXMgKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVHcmlkU2NhbGUodGFza3M6IFRhc2tbXSk6IElTY2FsZSB7XHJcbiAgICAgICAgdmFyIHN0YXJ0OiBEYXRlO1xyXG4gICAgICAgIHZhciBlbmQ6IERhdGU7XHJcbiAgICAgICAgdmFyIGRhdGVzID0gdGFza3MubWFwKCh0YXNrOmFueSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgc3RhcnQ6IG5ldyBEYXRlKHRhc2suc3RhcnQpLFxyXG4gICAgICAgICAgICAgICAgZW5kOiBuZXcgRGF0ZSh0YXNrLmVuZClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzdGFydCA9IG5ldyBEYXRlKE1hdGgubWluLmFwcGx5KG51bGwsIGRhdGVzLm1hcChmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdC5zdGFydDtcclxuICAgICAgICB9KSkpO1xyXG5cclxuICAgICAgICBlbmQgPSBuZXcgRGF0ZShNYXRoLm1heC5hcHBseShudWxsLCBkYXRlcy5tYXAoZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHQuZW5kO1xyXG4gICAgICAgIH0pKSk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcclxuICAgICAgICAgICAgZW5kOiBlbmRcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENyZWF0ZSBhbiBob3VycyBhcnJheSBmb3IgdXNlIGluIHRpbWUgc2NhbGUgY29tcG9uZW50ICovXHJcbiAgICBwdWJsaWMgZ2V0SG91cnMoY29sczogbnVtYmVyKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHZhciBob3Vyczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAgICAgd2hpbGUgKGhvdXJzLmxlbmd0aCA8PSBjb2xzICogMjQpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gMjM7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPCAxMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdXJzLnB1c2goJzAnICsgaS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaG91cnMucHVzaChpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaG91cnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldENvbXB1dGVkU3R5bGUoZWxlbWVudDogYW55LCBhdHRyaWJ1dGU6IGFueSkge1xyXG4gICAgICAgIHJldHVybiBwYXJzZUludChkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpW2F0dHJpYnV0ZV0sIDEwKTtcclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE8oZGFsZSk6IGRldGVybWluZSB3aGV0aGVyIHRoaXMgaXMgbmVlZGVkXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlQ29udGFpbmVyV2lkdGgoKTogbnVtYmVyIHtcclxuICAgICAgICB0aGlzLndpbmRvd0lubmVyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICBsZXQgY29udGFpbmVyV2lkdGggPSAoaW5uZXJXaWR0aCAtIDE4KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcldpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVBY3Rpdml0eUNvbnRhaW5lckRpbWVuc2lvbnMoKTogYW55IHtcclxuICAgICAgICB2YXIgc2Nyb2xsV2lkdGg6IG51bWJlciA9IDE4O1xyXG4gICAgICAgIHRoaXMud2luZG93SW5uZXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgIGxldCB3aWR0aCA9IHRoaXMud2luZG93SW5uZXJXaWR0aCAtIHRoaXMuZ3JpZFdpZHRoIC0gc2Nyb2xsV2lkdGg7XHJcblxyXG4gICAgICAgIHJldHVybiB7IGhlaWdodDogdGhpcy5hY3Rpdml0eUhlaWdodCwgd2lkdGg6IHdpZHRoIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFNldCB0aGUgdmVydGljYWwgc2Nyb2xsIHRvcCBwb3NpdGlvbnMgZm9yIGdhbnR0ICovXHJcbiAgICBwdWJsaWMgc2Nyb2xsVG9wKHZlcnRpY2FsU2Nyb2xsRWxlbTogYW55LCBnYW50dEdyaWRFbGVtOiBhbnksIGdhbnR0QWN0aXZpdHlBcmVhRWxlbTogYW55KSB7XHJcbiAgICAgICAgbGV0IHZlcnRpY2FsU2Nyb2xsVG9wID0gdmVydGljYWxTY3JvbGxFbGVtLnNjcm9sbFRvcDtcclxuICAgICAgICBsZXQgc2Nyb2xsID0gdGhpcy5zZXRTY3JvbGxUb3A7XHJcblxyXG4gICAgICAgIC8vIGRlYm91bmNlXHJcbiAgICAgICAgaWYgKHZlcnRpY2FsU2Nyb2xsVG9wICE9PSBudWxsICYmIHZlcnRpY2FsU2Nyb2xsVG9wICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHNjcm9sbCh2ZXJ0aWNhbFNjcm9sbFRvcCwgZ2FudHRBY3Rpdml0eUFyZWFFbGVtKTtcclxuICAgICAgICAgICAgICAgIHNjcm9sbChnYW50dEFjdGl2aXR5QXJlYUVsZW0uc2Nyb2xsVG9wLCBnYW50dEdyaWRFbGVtKTtcclxuXHJcbiAgICAgICAgICAgIH0sIDUwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEdyb3VwIGRhdGEgYnkgaWQgLCBvbmx5IHN1cHBvcnRzIG9uZSBsZXZlbCovXHJcbiAgICBwdWJsaWMgZ3JvdXBEYXRhKHRhc2tzOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIHZhciBtZXJnZWQ6YW55ID0gW107XHJcbiAgICAgICAgdmFyIGdyb3VwczphbnkgPSBuZXcgR3JvdXBCeVBpcGUoKS50cmFuc2Zvcm0odGFza3MsICh0YXNrOmFueSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gW3Rhc2sudHJlZVBhdGguc3BsaXQoJy8nKVswXV1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbWVyZ2VkLmNvbmNhdC5hcHBseShbXSwgZ3JvdXBzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ3JlYXRlIHRyZWUgb2YgZGF0YSAqL1xyXG4gICAgcHVibGljIHRyYW5zZm9ybURhdGEoaW5wdXQ6IGFueSk6IGFueSB7XHJcbiAgICAgICAgdmFyIG91dHB1dDphbnkgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGlucHV0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjaGFpbjphbnkgPSBpbnB1dFtpXS5pZC5zcGxpdCgnLycpO1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudE5vZGU6YW55ID0gb3V0cHV0O1xyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNoYWluLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgd2FudGVkTm9kZTphbnkgPSBjaGFpbltqXTtcclxuICAgICAgICAgICAgICAgIHZhciBsYXN0Tm9kZTphbnkgPSBjdXJyZW50Tm9kZTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgY3VycmVudE5vZGUubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudE5vZGVba10ubmFtZSA9PSB3YW50ZWROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGVba10uY2hpbGRyZW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIElmIHdlIGNvdWxkbid0IGZpbmQgYW4gaXRlbSBpbiB0aGlzIGxpc3Qgb2YgY2hpbGRyZW5cclxuICAgICAgICAgICAgICAgIC8vIHRoYXQgaGFzIHRoZSByaWdodCBuYW1lLCBjcmVhdGUgb25lOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxhc3ROb2RlID09IGN1cnJlbnROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UT0RPKGRhbGUpOiBkZXRlcm1pbmUgd2F5IHRvIHNob3cgcGVyY2VudCBjb21wbGV0ZSBvbiBjb3JyZWN0IGNoaWxkICBcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3Tm9kZTphbnkgPSBjdXJyZW50Tm9kZVtrXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogd2FudGVkTm9kZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyY2VudENvbXBsZXRlOiBpbnB1dFtpXS5wZXJjZW50Q29tcGxldGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBpbnB1dFtpXS5zdGFydCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiBpbnB1dFtpXS5lbmQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE5vZGUgPSBuZXdOb2RlLmNoaWxkcmVuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENoZWNrcyB3aGV0aGVyIGFueSBuZXcgZGF0YSBuZWVkcyB0byBiZSBhZGRlZCB0byB0YXNrIGNhY2hlICAqL1xyXG4gICAgcHVibGljIGRvVGFza0NoZWNrKHRhc2tzOiBhbnlbXSwgdHJlZUV4cGFuZGVkOiBib29sZWFuKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdmFyIGNhY2hlZFRhc2tJZHMgPSB0aGlzLlRBU0tfQ0FDSEUubWFwKCh0YXNrOmFueSkgPT4geyByZXR1cm4gdGFzay5pZCB9KTtcclxuICAgICAgICB2YXIgaXRlbXNUb0NhY2hlOiBhbnlbXSA9IFtdO1xyXG5cclxuICAgICAgICBpZiAodHJlZUV4cGFuZGVkKSB7XHJcbiAgICAgICAgICAgIC8vIHB1c2ggY2hpbGRyZW4gYW5kIHBhcmVudCB0YXNrcyB0aGF0IGFyZSBub3QgY2FjaGVkXHJcbiAgICAgICAgICAgIHRhc2tzLmZpbHRlcigodGFzazphbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZWRUYXNrSWRzLmluZGV4T2YodGFzay5pZCkgPT09IC0xXHJcbiAgICAgICAgICAgIH0pLmZvckVhY2goKHRhc2s6YW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpdGVtc1RvQ2FjaGUucHVzaCh0YXNrKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBvbmx5IGxvb2sgYXQgdGFza3MgdGhhdCBhcmUgbm90IGNhY2hlZFxyXG4gICAgICAgICAgICB0YXNrcy5maWx0ZXIoKHRhc2s6YW55KSA9PiB7IFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFRhc2tJZHMuaW5kZXhPZih0YXNrLmlkKSA9PT0gLTEgJiYgdGFzay50cmVlUGF0aC5zcGxpdCgnLycpLmxlbmd0aCA9PT0gMSBcclxuICAgICAgICAgICAgfSkuZm9yRWFjaCgodGFzazphbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zVG9DYWNoZS5wdXNoKHRhc2spO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGl0ZW1zVG9DYWNoZS5mb3JFYWNoKChpdGVtOmFueSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLlRBU0tfQ0FDSEUucHVzaChpdGVtKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGl0ZW1zVG9DYWNoZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBTZXQgYSBpZCBwcmVmaXggc28gQ1NTMyBxdWVyeSBzZWxlY3RvciBjYW4gd29yayB3aXRoIGlkcyB0aGF0IGNvbnRhaW4gbnVtYmVycyAqL1xyXG4gICAgcHVibGljIHNldElkUHJlZml4KGlkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBgXyR7aWR9YDtcclxuICAgIH1cclxuXHJcbiAgICAvLyAvKiogUmVtb3ZlIHRoZSBpZCBwcmVmaXggdG8gYWxsb3cgcXVlcnlpbmcgb2YgZGF0YSAqL1xyXG4gICAgLy8gcHVibGljIHJlbW92ZUlkUHJlZml4KGlkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgLy8gICAgIHJldHVybiBpZC5zdWJzdHJpbmcoMSwgaWQubGVuZ3RoIC0gMSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLyoqIFNldCB0aGUgc2Nyb2xsIHRvcCBwcm9wZXJ0eSBvZiBhIG5hdGl2ZSBET00gZWxlbWVudCAqL1xyXG4gICAgcHJpdmF0ZSBzZXRTY3JvbGxUb3Aoc2Nyb2xsVG9wOiBudW1iZXIsIGVsZW1lbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChlbGVtZW50ICE9PSBudWxsICYmIGVsZW1lbnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19