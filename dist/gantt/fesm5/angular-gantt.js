import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';
import { MdePopoverModule } from '@material-extended/mde';
import { Injectable, Component, Input, EventEmitter, Output, ElementRef, ChangeDetectionStrategy, ViewChild, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var GanttConfig = /** @class */ (function () {
    function GanttConfig() {
        this.cellWidth = 38;
        this.rowHeight = 30;
        this.activityHeight = 420;
        this.barHeight = 25;
        this.barLineHeight = 35;
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
        this.gridWidth = 0; //188
        //188
        this.gridHeight = 332;
        /** @type {?} */
        var ganttConfig = new GanttConfig();
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
    GanttService.prototype.calculateBarWidth = /**
     * @private
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    function (start, end) {
        if (typeof start === 'string') {
            start = new Date(start);
        }
        if (typeof end === 'string') {
            end = new Date(end);
        }
        /** @type {?} */
        var days = this.calculateDiffDays(start, end);
        /** @type {?} */
        var width = (days / 7 * this.cellWidth + days / 7);
        return width;
    };
    /**
     * @private
     * @param {?} start
     * @param {?} scale
     * @return {?}
     */
    GanttService.prototype.calculateBarLeft = /**
     * @private
     * @param {?} start
     * @param {?} scale
     * @return {?}
     */
    function (start, scale) {
        /** @type {?} */
        var left = 0;
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
        return this.TASK_CACHE.length * this.rowHeight + "px";
    };
    /**
     * @private
     * @param {?} start
     * @return {?}
     */
    GanttService.prototype.calculateBarLeftDelta = /**
     * @private
     * @param {?} start
     * @return {?}
     */
    function (start) {
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
        offset = this.cellWidth / hoursInDay * startHours;
        return offset;
    };
    /** Calculate the bar styles */
    /**
     * Calculate the bar styles
     * @param {?} task
     * @param {?} index
     * @param {?} scale
     * @return {?}
     */
    GanttService.prototype.calculateBar = /**
     * Calculate the bar styles
     * @param {?} task
     * @param {?} index
     * @param {?} scale
     * @return {?}
     */
    function (task, index, scale) {
        /** @type {?} */
        var barStyle = this.getBarStyle(task.color);
        return {
            'top': this.barTop * index + 2 + 'px',
            'left': this.calculateBarLeft(task.start, scale) + 'px',
            'height': this.barHeight + 'px',
            'line-height': this.barLineHeight + 'px',
            'width': this.calculateBarWidth(task.start, task.end) + 'px',
            'background-color': barStyle["background-color"],
            'border-left': barStyle["border-left"]
        };
    };
    /** Get the bar style based on task status */
    /**
     * Get the bar style based on task status
     * @private
     * @param {?} color
     * @return {?}
     */
    GanttService.prototype.getBarStyle = /**
     * Get the bar style based on task status
     * @private
     * @param {?} color
     * @return {?}
     */
    function (color) {
        /** @type {?} */
        var style = {};
        style["background-color"] = color.secondary;
        style["border-left"] = "5px solid " + color.primary;
        return style;
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
                start = this.addDays(start, 7);
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
        var containerWidth = this.gridWidth - 18;
        return containerWidth;
    };
    /**
     * @return {?}
     */
    GanttService.prototype.calculateContainerHeight = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var containerHeight = (innerHeight - 18);
        return containerHeight;
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
        var width = window.innerWidth - this.gridWidth - scrollWidth;
        return { height: this.activityHeight, width: width };
    };
    /**
     * @param {?} elem
     * @return {?}
     */
    GanttService.prototype.calculateGanttActivityWidth = /**
     * @param {?} elem
     * @return {?}
     */
    function (elem) {
        return "calc(100% - " + (elem.offsetWidth + 1) + "px)";
    };
    /**
     * @param {?} elem
     * @return {?}
     */
    GanttService.prototype.calculateGanttActivityHeight = /**
     * @param {?} elem
     * @return {?}
     */
    function (elem) {
        return elem.offsetHeight + "px";
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
            scroll(verticalScrollTop, ganttActivityAreaElem);
            scroll(ganttActivityAreaElem.scrollTop, ganttGridElem);
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
        return tasks;
    };
    /** Checks whether any new data needs to be added to task cache  */
    /**
     * Checks whether any new data needs to be added to task cache
     * @param {?} tasks
     * @param {?} scale
     * @return {?}
     */
    GanttService.prototype.doTaskCheck = /**
     * Checks whether any new data needs to be added to task cache
     * @param {?} tasks
     * @param {?} scale
     * @return {?}
     */
    function (tasks, scale) {
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
        this.onPopoverOpen = new EventEmitter();
    }
    Object.defineProperty(GanttComponent.prototype, "project", {
        get: /**
         * @return {?}
         */
        function () { return this._project; },
        set: /**
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
        /** @type {?} */
        var gridColumns = [
            { name: '', left: 0, width: 16 },
            { name: 'Zadanie', left: 0, width: 330 }
        ];
        this._options = {
            scale: scale,
            gridColumns: gridColumns
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
     * @param {?} task
     * @return {?}
     */
    GanttComponent.prototype.popoverOpened = /**
     * @param {?} task
     * @return {?}
     */
    function (task) {
        this.onPopoverOpen.emit(task);
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
                    template: "\n        <div [ngStyle]=\"{ 'width': '100%' }\">\n            <div class=\"gantt-container\" (window:resize)=\"onResize($event)\">\n                <!--<gantt-header [name]=\"_project.name\" [startDate]=\"_project.startDate\"></gantt-header>-->\n                <gantt-activity [project]=\"_project\" [options]=\"_options\" (onGridRowClick)=\"gridRowClicked($event)\" (onPopoverOpen)=\"popoverOpened($event)\"></gantt-activity>\n                <!--<gantt-footer [project]=\"_project\"></gantt-footer>-->\n            </div>\n        </div>\n    ",
                    providers: [],
                    styles: ["\n        .gantt-container {\n            font-family: Arial;\n            font-size: 13px;\n            border: 1px solid #cecece;\n            position: relative;\n            white-space: nowrap;\n            margin-top: 0px;\n        }\n    "]
                }] }
    ];
    /** @nocollapse */
    GanttComponent.ctorParameters = function () { return [
        { type: GanttService }
    ]; };
    GanttComponent.propDecorators = {
        project: [{ type: Input }],
        options: [{ type: Input }],
        onGridRowClick: [{ type: Output }],
        onPopoverOpen: [{ type: Output }]
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
                    styles: ["\n        .gantt-header {\n            background-color: whitesmoke;\n            height: 40px;\n            border-bottom: 1px solid #e0e0e0;\n        }\n        .gantt-header-title {\n            padding: 12px;\n            display: flex;\n            flex-wrap:wrap;\n            font-family: Arial, Helvetica, sans-serif;\n            font-size: 16px;\n        }\n        .gantt-header-actions {\n            display: inline;\n            float: right;\n            padding: 6px;\n        }\n    "]
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
                    styles: ["\n        .gantt-footer {\n            background-color: whitesmoke;\n            height: 36px;\n            border-top: 1px solid #e0e0e0;\n        }\n        .gantt-footer-actions {\n            float: right;\n        }\n    "]
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
var GanttActivityComponent = /** @class */ (function () {
    function GanttActivityComponent(elem, ganttService) {
        this.elem = elem;
        this.ganttService = ganttService;
        this.onGridRowClick = new EventEmitter();
        this.onPopoverOpen = new EventEmitter();
        this.scale = {
            start: null,
            end: null
        };
        this.dimensions = {
            height: 0,
            width: 0
        };
        this.gridColumns = [
            { name: '', left: 0, width: 16 },
            { name: 'Zadanie', left: 0, width: 330 }
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
        this.ganttService.TASK_CACHE = this.project.tasks;
        this.ganttService.TIME_SCALE = this.ganttService.calculateScale(this.options.scale.start, this.options.scale.end);
        this.start = this.options.scale.start;
        this.end = this.options.scale.end;
        this.containerWidth = this.calculateContainerWidth();
        this.containerHeight = this.calculateContainerHeight();
        this.activityContainerSizes = this.ganttService.calculateActivityContainerDimensions();
        this.gridColumns = this.options.gridColumns ? this.options.gridColumns : this.gridColumns;
        // important that these are called last as it relies on values calculated above.
        this.setScale();
        this.setDimensions();
        this.setSizes();
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
        this.ganttService.doTaskCheck(this.project.tasks, this.options.scale);
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
    /**
     * @param {?} task
     * @return {?}
     */
    GanttActivityComponent.prototype.gridRowClick = /**
     * @param {?} task
     * @return {?}
     */
    function (task) {
        try {
            this.onGridRowClick.emit(task);
        }
        catch (err) { }
    };
    /**
     * @param {?} task
     * @return {?}
     */
    GanttActivityComponent.prototype.popoverOpen = /**
     * @param {?} task
     * @return {?}
     */
    function (task) {
        try {
            this.onPopoverOpen.emit(task);
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
        this.ganttActivityHeight = activityContainerSizes.height + 'px';
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
     * @return {?}
     */
    GanttActivityComponent.prototype.setGridRowStyle = /**
     * @return {?}
     */
    function () {
        return {
            'height': this.ganttService.rowHeight + 'px',
            'line-height': this.ganttService.rowHeight + 'px'
        };
    };
    /**
     * @return {?}
     */
    GanttActivityComponent.prototype.setGridScaleStyle = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var height = this.ganttService.rowHeight + 30;
        return {
            'height': height + 'px',
            'line-height': height + 'px'
        };
    };
    /**
     * @return {?}
     */
    GanttActivityComponent.prototype.calculateColumnsWidth = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var ganttActivityWidth = this.gridColumns.map(function (column) { return column.width; }).reduce(function (pv, cv) { return pv + cv; }, 0) + 1;
        return "calc(100% - " + (ganttActivityWidth) + "px)";
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
        return this.ganttService.TIME_SCALE.length * this.ganttService.cellWidth + this.ganttService.cellWidth;
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
                    template: "\n    <div class=\"grid\" #ganttGrid>\n        <div class=\"grid-scale\" [ngStyle]=\"setGridScaleStyle()\">\n            <div class=\"grid-head-cell\"\n                *ngFor=\"let column of gridColumns\" [style.width]=\"column.width + 'px'\"\n                [style.left]=\"column.left + 'px'\">\n\n                <label>\n                    {{column.name}}\n                </label>\n            </div>\n        </div>\n        <div class=\"grid-data\"\n            #ganttGridData\n            [ngStyle]=\"{ 'height': ganttService.calculateGanttHeight() }\">\n\n            <div #row\n                *ngFor=\"let data of ganttService.TASK_CACHE\" class=\"grid-row\"\n                [ngStyle]=\"setGridRowStyle()\">\n\n                <div class=\"grid-cell\"\n                    [ngStyle]=\"{ 'width': gridColumns[1].width + 'px', 'padding-left': 0 }\">\n\n                    <div class=\"gantt-tree-content\">\n                        <span [ngStyle]=\"{ borderLeftColor: data.color.primary, borderLeftWidth: .35 + 'em', \n                            borderLeftStyle: 'solid', paddingRight: .5 + 'em'}\"></span>\n                        <span>{{data.name}}</span>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"gantt-activity\"\n        (window:resize)=\"onResize($event)\"\n        [ngStyle]=\"{ 'height': ganttService.calculateGanttHeight() + 60, 'width': calculateColumnsWidth() }\">\n\n        <time-scale [timeScale]=\"ganttService.TIME_SCALE\"\n            [dimensions]=\"dimensions\"></time-scale>\n        <div class=\"gantt-activity-area\"\n            #ganttActivityArea\n            [ngStyle]=\"{ 'height': ganttService.calculateGanttHeight(), 'width': containerWidth + 36 + 'px' }\">\n\n            <activity-background [timeScale]=\"ganttService.TIME_SCALE\"\n                [tasks]=\"ganttService.TASK_CACHE\"></activity-background>\n            <activity-bars [timeScale]=\"ganttService.TIME_SCALE\"\n                [dimensions]=\"dimensions\"\n                [tasks]=\"ganttService.TASK_CACHE\"\n                (onGridRowClick)=\"gridRowClick($event)\"\n                (onPopoverOpen)=\"popoverOpen($event)\"></activity-bars>\n        </div>\n    </div>\n    ",
                    changeDetection: ChangeDetectionStrategy.Default,
                    styles: ["\n        .gantt-activity {\n            overflow-y: hidden;\n            overflow-x: scroll;\n            display: inline-block;\n            vertical-align: top;\n            position: relative;\n        }\n        .gantt-activity-area {\n            position: relative;\n            overflow-x: hidden;\n            overflow-y: hidden;\n            -webkit-user-select: none;\n        }\n        .gantt-vertical-scroll {\n            background-color: transparent;\n            overflow-x: hidden;\n            overflow-y: scroll;\n            position: absolute;\n            right: -10px;\n            display: block;\n            top: -1px;\n            border: 1px solid #cecece;\n        }\n        .grid {\n            overflow-x: hidden;\n            overflow-y: hidden;\n            display: inline-block;\n            vertical-align: top;\n            border-right: 1px solid #cecece;\n        }\n        .grid-scale {\n            color: #6b6b6b;\n            font-size: 12px;\n            border-bottom: 1px solid #e0e0e0;\n            background-color: whitesmoke;\n        }\n        .grid-head-cell {\n            /*color: #a6a6a6;*/\n            border-top: none !important;\n            border-right: none !important;\n            line-height: inherit;\n            box-sizing: border-box;\n            display: inline-block;\n            vertical-align: top;\n            border-right: 1px solid #cecece;\n            /*text-align: center;*/\n            position: relative;\n            cursor: default;\n            height: 100%;\n            -moz-user-select: -moz-none;\n            -webkit-user-select: none;\n            overflow: hidden;\n        }\n        .grid-data {\n            overflow: hidden;\n        }\n        .grid-row {\n            box-sizing: border-box;\n            border-bottom: 1px solid #e0e0e0;\n            background-color: #fff;\n            position: relative;\n            -webkit-user-select: none;\n        }\n        .grid-row:hover {\n            background-color: #eeeeee;\n            cursor: pointer;\n        }\n        .grid-cell {\n            border-right: none;\n            color: #454545;\n            display: inline-block;\n            vertical-align: top;\n            padding-left: 6px;\n            padding-right: 6px;\n            height: 100%;\n            overflow: hidden;\n            white-space: nowrap;\n            font-size: 13px;\n            box-sizing: border-box;\n        }\n        .actions-bar {\n            /*border-top: 1px solid #cecece;*/\n            border-bottom: 1px solid #e0e0e0;\n            clear: both;\n            /*margin-top: 90px;*/\n            height: 28px;\n            background: whitesmoke;\n            color: #494949;\n            font-family: Arial, sans-serif;\n            font-size: 13px;\n            padding-left: 15px;\n            line-height: 25px;\n        }\n        .gantt-tree-content {\n            padding-left: 15px;\n        }\n    "]
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
        onGridRowClick: [{ type: Output }],
        onPopoverOpen: [{ type: Output }]
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
    };
    /**
     * @return {?}
     */
    GanttTimeScaleComponent.prototype.setTimescaleStyle = /**
     * @return {?}
     */
    function () {
        return {
            'width': (this.dimensions.width + 36) + 'px'
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
        return {
            'width': this.ganttService.cellWidth + 'px'
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
    GanttTimeScaleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'time-scale',
                    template: "\n        <div class=\"time-scale\" [ngStyle]=\"setTimescaleStyle()\">\n            <div class=\"time-scale-line\" [ngStyle]=\"setTimescaleLineStyle('none')\">\n                <div class=\"time-scale-cell\" *ngFor=\"let date of timeScale; let i = index\"\n                    [ngClass]=\"(i % 2) ? 'weekend' : ''\" [ngStyle]=\"setTimescaleCellStyle()\">{{date | date: 'dd-MM'}}</div>\n            </div>\n            <div class=\"time-scale-line\" [ngStyle]=\"setTimescaleLineStyle('none')\">\n                <div class=\"time-scale-cell\" *ngFor=\"let date of timeScale; let i = index\"\n                [ngClass]=\"(i % 2) ? 'weekend' : ''\" [ngStyle]=\"setTimescaleCellStyle()\">{{i + 1}}</div>\n            </div>\n        </div>",
                    providers: [
                        GanttService
                    ],
                    styles: ["\n        .weekend {\n            background-color: whitesmoke;\n        }\n        .time-scale {\n            font-size: 12px;\n            background-color: #fff;\n            border-bottom: 1px solid #cecece;\n        }\n        .time-scale-line {\n            box-sizing: border-box;\n            border-bottom: 1px solid #cecece;\n        }\n        .time-scale-line:first-child {\n            border-top: none;\n        }\n        .time-scale-cell {\n            display: inline-block;\n            white-space: nowrap;\n            overflow: hidden;\n            border-right: 1px solid #cecece;\n            text-align: center;\n            height: 100%;\n        }"]
                }] }
    ];
    /** @nocollapse */
    GanttTimeScaleComponent.ctorParameters = function () { return [
        { type: GanttService }
    ]; };
    GanttTimeScaleComponent.propDecorators = {
        timeScale: [{ type: Input }],
        dimensions: [{ type: Input }]
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
        this.drawGrid();
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
        return {
            'width': this.ganttService.cellWidth + 'px'
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
        this.cells = this.timeScale;
    };
    GanttActivityBackgroundComponent.decorators = [
        { type: Component, args: [{
                    selector: 'activity-background',
                    template: "\n    <div #bg class=\"gantt-activity-bg\">\n        <div class=\"gantt-activity-row\"\n            [ngStyle]=\"setRowStyle()\"\n            *ngFor=\"let row of tasks\">\n\n            <div class=\"gantt-activity-cell\"\n                [ngStyle]=\"setCellStyle()\"\n                *ngFor=\"let cell of cells; let i = index; let l = last\" [ngClass]=\"(i % 2) ? 'weekend' : ''\" ></div>\n        </div>\n    </div>\n    ",
                    styles: ["\n        .weekend {\n            background-color: whitesmoke;\n        }\n        .gantt-activity-bg {\n            overflow: hidden;\n        }\n        .gantt-activity-row {\n            border-bottom: 1px solid #ebebeb;\n            background-color: #fff;\n            box-sizing: border-box;\n        }\n        .gantt-activity-cell {\n            display: inline-block;\n            height: 100%;\n            border-right: 1px solid #ebebeb;\n        }\n    "]
                }] }
    ];
    /** @nocollapse */
    GanttActivityBackgroundComponent.ctorParameters = function () { return [
        { type: GanttService }
    ]; };
    GanttActivityBackgroundComponent.propDecorators = {
        tasks: [{ type: Input }],
        timeScale: [{ type: Input }],
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
        this.onGridRowClick = new EventEmitter();
        this.onPopoverOpen = new EventEmitter();
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
        this.containerHeight = this.dimensions.height;
        this.containerWidth = this.dimensions.width;
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
        style = this.ganttService.calculateBar(task, index, this.timeScale);
        return style;
    };
    /**
     * @param {?} task
     * @return {?}
     */
    GanttActivityBarsComponent.prototype.gridRowClicked = /**
     * @param {?} task
     * @return {?}
     */
    function (task) {
        try {
            this.onGridRowClick.emit(task);
        }
        catch (err) { }
    };
    /**
     * @param {?} task
     * @return {?}
     */
    GanttActivityBarsComponent.prototype.popoverOpened = /**
     * @param {?} task
     * @return {?}
     */
    function (task) {
        try {
            this.onPopoverOpen.emit(task);
        }
        catch (err) { }
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
                    template: "\n    <div class=\"gantt-activity-bars-area\"\n        [ngStyle]=\"{ 'height': containerHeight + 'px', 'width': containerWidth + 'px' }\">\n\n        <div #bar class=\"gantt-activity-line\"\n            *ngFor=\"let task of tasks; let i = index\" (click)=\"gridRowClicked(task)\"\n            [ngStyle]=\"drawBar(task, i)\">\n\n            <div #popoverTrigger=\"mdePopoverTrigger\"\n                [mdePopoverTriggerFor]=\"taskPopover\"\n                [mdePopoverBackdropCloseOnClick]=\"false\"\n                mdePopoverOffsetX=\"-15\"\n                mdePopoverOffsetY=\"0\"\n                (opened)=\"popoverOpened(task)\">\n\n                <mde-popover #taskPopover=\"mdePopover\" \n                    [mdePopoverEnterDelay]=\"100\"\n                    [mdePopoverLeaveDelay]=\"0\"\n                    [mdePopoverPositionY]=\"'above'\"\n                    [mdePopoverOverlapTrigger]=\"false\"\n                    [mdePopoverDisableAnimation]=\"false\"\n                    [mdeFocusTrapEnabled]=\"false\"\n                    [mdePopoverArrowWidth]=\"12\"\n                    [mdePopoverArrowColor]=\"task.color?.primary\"\n                    mdePopoverPlacement=\"bottom\">\n\n                    <ng-container *ngTemplateOutlet=\"templatePopoverTask; context: {task: task}\"></ng-container>\n                </mde-popover>\n\n                <div class=\"gantt-activity-content\"></div>\n                <div class=\"gantt-activity-link-control gantt-activity-right\" style=\"height: 26px; line-height: 30px\">\n                    <div class=\"gantt-link-point\"></div>\n                </div>\n                <div class=\"gantt-activity-link-control gantt-activity-left\" style=\"height: 26px; line-height: 30px\">\n                    <div class=\"gantt-link-point\"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <ng-template #templatePopoverTask let-data=\"task\">\n        <mat-card *ngIf=\"data\" class=\"mat-elevation-z6\" \n            [ngStyle]=\"{ \n                borderBottomColor: data.color?.primary,\n                borderBottomWidth: '.25em',\n                borderBottomStyle: 'solid' \n            }\" style=\"width: 320px; max-width: 320px;\">\n\n            <mat-card-header>\n                <div mat-card-avatar [ngStyle]=\"{ borderColor: data.color?.primary }\" style=\"width: 0; height: calc(10vh - 30px); border-radius: 0; border-style: solid;\"></div>\n                <mat-card-title>\n                    <span style=\"font-size: 80%;\">{{data.name}}</span>\n                </mat-card-title>\n                <mat-card-subtitle>\n                    <span>{{data.start | date:'yyyy-MM-dd'}} - {{data.end | date:'yyyy-MM-dd'}}</span>\n                </mat-card-subtitle>\n                <mat-card-subtitle>\n                    <span style=\"padding-left: .75em; padding-right: 1em; font-stretch: condensed;\">&#x336;</span>\n                    <span>{{data.resource}}</span>\n                </mat-card-subtitle>\n            </mat-card-header>\n            <mat-card-content>\n                <footer *ngIf=\"data.description\">\n                    <span [innerHTML]=\"data.description\"></span>\n                </footer>\n            </mat-card-content>\n        </mat-card>\n    </ng-template>\n    ",
                    providers: [
                        GanttService
                    ],
                    styles: ["\n    .gantt-activity-line {\n        /*border-radius: 2px;*/\n        position: absolute;\n        box-sizing: border-box;\n        -webkit-user-select: none;\n    }\n    .gantt-activity-line:hover {\n        cursor: pointer;\n    }\n    .gantt-activity-content {\n        font-size: 12px;\n        color: #fff;\n        width: 100%;\n        top: 0;\n        position: absolute;\n        white-space: nowrap;\n        text-align: center;\n        line-height: inherit;\n        overflow: hidden;\n        height: 100%;\n    }\n    .gantt-activity-link-control {\n        position: absolute;\n        width: 13px;\n        top: 0;\n    }\n    .gantt-activity-right {\n        right: 0;\n    }\n    .gantt-activity-left {\n        left: 0;\n    }\n    .gantt-activity-right:hover {\n        /*cursor:w-resize;*/\n    }\n    .gantt-activity-left:hover {\n        /*cursor:w-resize;*/\n    }\n    "]
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
        onGridRowClick: [{ type: Output }],
        onPopoverOpen: [{ type: Output }]
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
                        MatCardModule,
                        MdePopoverModule
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
                        GanttFooterComponent
                    ],
                    providers: [GanttService],
                    schemas: [
                        CUSTOM_ELEMENTS_SCHEMA
                    ]
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

export { GanttModule, GanttActivityBackgroundComponent as ɵe, GanttActivityBarsComponent as ɵf, GanttActivityComponent as ɵb, GanttActivityModule as ɵa, GanttTimeScaleComponent as ɵd, GanttFooterComponent as ɵi, GanttComponent as ɵg, GanttHeaderComponent as ɵh, GanttService as ɵc };

//# sourceMappingURL=angular-gantt.js.map