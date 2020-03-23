/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { GanttService } from '../shared/services/gantt.service';
import { Zooming } from '../shared/interfaces';
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
            ;
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
export { GanttActivityComponent };
if (false) {
    /** @type {?} */
    GanttActivityComponent.prototype.project;
    /** @type {?} */
    GanttActivityComponent.prototype.options;
    /** @type {?} */
    GanttActivityComponent.prototype.onGridRowClick;
    /**
     * @type {?}
     * @private
     */
    GanttActivityComponent.prototype.upTriangle;
    /**
     * @type {?}
     * @private
     */
    GanttActivityComponent.prototype.downTriangle;
    /** @type {?} */
    GanttActivityComponent.prototype.zoom;
    /** @type {?} */
    GanttActivityComponent.prototype.activityActions;
    /**
     * @type {?}
     * @private
     */
    GanttActivityComponent.prototype.timeScale;
    /**
     * @type {?}
     * @private
     */
    GanttActivityComponent.prototype.start;
    /**
     * @type {?}
     * @private
     */
    GanttActivityComponent.prototype.end;
    /** @type {?} */
    GanttActivityComponent.prototype.containerHeight;
    /** @type {?} */
    GanttActivityComponent.prototype.containerWidth;
    /**
     * @type {?}
     * @private
     */
    GanttActivityComponent.prototype.activityContainerSizes;
    /** @type {?} */
    GanttActivityComponent.prototype.ganttActivityHeight;
    /** @type {?} */
    GanttActivityComponent.prototype.ganttActivityWidth;
    /** @type {?} */
    GanttActivityComponent.prototype.zoomLevel;
    /** @type {?} */
    GanttActivityComponent.prototype.treeExpanded;
    /**
     * @type {?}
     * @private
     */
    GanttActivityComponent.prototype.scale;
    /** @type {?} */
    GanttActivityComponent.prototype.dimensions;
    /**
     * @type {?}
     * @private
     */
    GanttActivityComponent.prototype.data;
    /** @type {?} */
    GanttActivityComponent.prototype.gridColumns;
    /** @type {?} */
    GanttActivityComponent.prototype.elem;
    /** @type {?} */
    GanttActivityComponent.prototype.ganttService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQtYWN0aXZpdHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vZ2FudHQvIiwic291cmNlcyI6WyJsaWIvYWN0aXZpdHkvZ2FudHQtYWN0aXZpdHkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBNEIsdUJBQXVCLEVBQXNCLE1BQU0sZUFBZSxDQUFDO0FBRWxLLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUVoRSxPQUFPLEVBQWlCLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTlEO0lBNFBJLGdDQUNXLElBQWdCLEVBQ2hCLFlBQTBCO1FBRDFCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFqRDNCLG1CQUFjLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFFOUQsZUFBVSxHQUFXLFVBQVUsQ0FBQSxDQUFDLDZCQUE2Qjs7UUFDN0QsaUJBQVksR0FBVyxVQUFVLENBQUMsQ0FBQywrQkFBK0I7O1FBRTFFLFNBQUksR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUV4RCxvQkFBZSxHQUFHO1lBQ2QsUUFBUSxFQUFFLEtBQUs7WUFDZixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7U0FDbEMsQ0FBQztRQWNGLGNBQVMsR0FBVyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTNDLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBRWIsVUFBSyxHQUFRO1lBQ2pCLEtBQUssRUFBRSxJQUFJO1lBQ1gsR0FBRyxFQUFFLElBQUk7U0FDWixDQUFDO1FBRUYsZUFBVSxHQUFHO1lBQ1QsTUFBTSxFQUFFLENBQUM7WUFDVCxLQUFLLEVBQUUsQ0FBQztTQUNYLENBQUM7UUFFTSxTQUFJLEdBQVUsRUFBRSxDQUFDO1FBRWxC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REFBcUI7O0lBQ3JCLGdEQUFvQjs7Ozs7SUFFcEIsd0RBQW9DOztJQUVwQyxxREFBeUI7O0lBQ3pCLG9EQUF3Qjs7SUFFeEIsMkNBQTJDOztJQUUzQyw4Q0FBcUI7Ozs7O0lBRXJCLHVDQUdFOztJQUVGLDRDQUdFOzs7OztJQUVGLHNDQUF5Qjs7SUFFekIsNkNBS0U7O0lBR0Usc0NBQXVCOztJQUN2Qiw4Q0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLCBBZnRlclZpZXdJbml0LCBWaWV3Q2hpbGQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBPbkNoYW5nZXMsIERvQ2hlY2sgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEdhbnR0U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9nYW50dC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR2FudHRDb25maWcgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvZ2FudHQtY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJR2FudHRPcHRpb25zLCBab29taW5nIH0gZnJvbSAnLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2dhbnR0LWFjdGl2aXR5JyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwiYWN0aW9ucy1iYXJcIj5cclxuICAgICAgICA8ZGl2IHN0eWxlPVwiZmxvYXQ6IHJpZ2h0XCI+XHJcbiAgICAgICAgICAgIDxsYWJlbD5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gKGNsaWNrKT1cInpvb21UYXNrcygnaG91cnMnKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZXNtb2tlOyBib3JkZXI6IG5vbmU7IGZvbnQtc2l6ZTogMTZweDsgY3Vyc29yOiBwb2ludGVyXCI+SG91cjwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8bGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIChjbGljayk9XCJ6b29tVGFza3MoJ2RheXMnKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZXNtb2tlOyBib3JkZXI6IG5vbmU7IGZvbnQtc2l6ZTogMTZweDsgY3Vyc29yOiBwb2ludGVyXCI+RGF5PC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxidXR0b24gKGNsaWNrKT1cImV4cGFuZCgpXCJcclxuICAgICAgICAgICAgICAgIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogd2hpdGVzbW9rZTsgYm9yZGVyOiBub25lOyBmb250LXNpemU6IDIxcHg7IGN1cnNvcjogcG9pbnRlclwiXHJcbiAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cImFjdGl2aXR5QWN0aW9ucy5leHBhbmRlZEljb25cIj48L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cImdyaWRcIiAjZ2FudHRHcmlkIFtuZ1N0eWxlXT1cInsgJ2hlaWdodCc6IGdhbnR0QWN0aXZpdHlIZWlnaHQsICd3aWR0aCc6IGdhbnR0U2VydmljZS5ncmlkV2lkdGggKyAncHgnfVwiPlxyXG4gICAgPGRpdiBjbGFzcz1cImdyaWQtc2NhbGVcIiBbbmdTdHlsZV09XCJzZXRHcmlkU2NhbGVTdHlsZSgpXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImdyaWQtaGVhZC1jZWxsXCJcclxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBncmlkQ29sdW1uc1wiIFtzdHlsZS53aWR0aF09XCJjb2x1bW4ud2lkdGggKyAncHgnXCJcclxuICAgICAgICAgICAgW3N0eWxlLmxlZnRdPVwiY29sdW1uLmxlZnQgKyAncHgnXCI+XHJcblxyXG4gICAgICAgICAgICA8bGFiZWw+XHJcbiAgICAgICAgICAgICAgICB7e2NvbHVtbi5uYW1lfX1cclxuICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiY29sdW1uLm5hbWUgPT09ICdEdXJhdGlvbidcIlxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPVwiZm9udC13ZWlnaHQ6Ym9sZFwiPnt7IGdhbnR0U2VydmljZS5jYWxjdWxhdGVUb3RhbER1cmF0aW9uKGdhbnR0U2VydmljZS5UQVNLX0NBQ0hFKSB9fTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JpZC1oZWFkLWNlbGxcIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwidG9nZ2xlQWxsQ2hpbGRyZW4oKVwiXHJcbiAgICAgICAgICAgICAgICBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6IHdoaXRlc21va2U7IGJvcmRlcjogbm9uZTsgZm9udC1zaXplOiAyMXB4OyBjdXJzb3I6IHBvaW50ZXJcIj5cclxuXHJcbiAgICAgICAgICAgICAgICB7eyB0cmVlRXhwYW5kZWQgPyAnJiN4MjViMjsnIDogJyYjeDI1YmM7JyB9fVxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cImdyaWQtZGF0YVwiXHJcbiAgICAgICAgI2dhbnR0R3JpZERhdGFcclxuICAgICAgICBbbmdTdHlsZV09XCJ7ICdoZWlnaHQnOiBnYW50dFNlcnZpY2UuY2FsY3VsYXRlR2FudHRIZWlnaHQoKSB9XCI+XHJcblxyXG4gICAgPGRpdiAjcm93XHJcbiAgICAgICAgKm5nRm9yPVwibGV0IGRhdGEgb2YgZ2FudHRTZXJ2aWNlLmdyb3VwRGF0YShnYW50dFNlcnZpY2UuVEFTS19DQUNIRSlcIlxyXG4gICAgICAgIChjbGljayk9XCJ0b2dnbGVDaGlsZHJlbihyb3csIGRhdGEpXCIgY2xhc3M9XCJncmlkX3Jvd1wiXHJcbiAgICAgICAgW25nU3R5bGVdPVwic2V0R3JpZFJvd1N0eWxlKGdhbnR0U2VydmljZS5pc1BhcmVudChkYXRhLnRyZWVQYXRoKSlcIlxyXG4gICAgICAgIFthdHRyLmRhdGEtaWRdPVwiZ2FudHRTZXJ2aWNlLnNldElkUHJlZml4KGRhdGEuaWQpXCJcclxuICAgICAgICBbYXR0ci5kYXRhLWlzUGFyZW50XT1cImdhbnR0U2VydmljZS5pc1BhcmVudChkYXRhLnRyZWVQYXRoKVwiXHJcbiAgICAgICAgW2F0dHIuZGF0YS1wYXJlbnRpZF09XCJnYW50dFNlcnZpY2Uuc2V0SWRQcmVmaXgoZGF0YS5wYXJlbnRJZClcIj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmlkLWNlbGxcIiBbbmdTdHlsZV09XCJ7ICd3aWR0aCc6IGdyaWRDb2x1bW5zWzBdLndpZHRoICsgJ3B4JyB9XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IFtpbm5lckhUTUxdPVwiZ2V0U3RhdHVzSWNvbihkYXRhLnN0YXR1cywgZGF0YS5wZXJjZW50Q29tcGxldGUpXCJcclxuICAgICAgICAgICAgICAgICAgICBbc3R5bGUuY29sb3JdPVwiZ2V0U3RhdHVzSWNvbkNvbG9yKGRhdGEuc3RhdHVzLCBkYXRhLnBlcmNlbnRDb21wbGV0ZSlcIj48L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmlkLWNlbGxcIlxyXG4gICAgICAgICAgICAgICAgW25nU3R5bGVdPVwieyAnd2lkdGgnOiBncmlkQ29sdW1uc1sxXS53aWR0aCArICdweCcsICdwYWRkaW5nLWxlZnQnOiBnYW50dFNlcnZpY2UuaXNDaGlsZChkYXRhLnRyZWVQYXRoKSB9XCI+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbnR0LXRyZWUtY29udGVudFwiPnt7ZGF0YS5uYW1lfX08L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmlkLWNlbGxcIiBbbmdTdHlsZV09XCJ7ICd3aWR0aCc6IGdyaWRDb2x1bW5zWzJdLndpZHRoICsgJ3B4JyB9XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2Pnt7IGRhdGEucGVyY2VudENvbXBsZXRlIH19PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JpZC1jZWxsXCIgW25nU3R5bGVdPVwieyAnd2lkdGgnOiBncmlkQ29sdW1uc1szXS53aWR0aCArICdweCd9XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2PiB7eyBnYW50dFNlcnZpY2UuY2FsY3VsYXRlRHVyYXRpb24oZGF0YSkgfX08L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cImdhbnR0LWFjdGl2aXR5XCJcclxuICAgICAgICAod2luZG93OnJlc2l6ZSk9XCJvblJlc2l6ZSgkZXZlbnQpXCJcclxuICAgICAgICBbbmdTdHlsZV09XCJ7ICdoZWlnaHQnOiBnYW50dEFjdGl2aXR5SGVpZ2h0LCAnd2lkdGgnOiBnYW50dEFjdGl2aXR5V2lkdGggLSAxOCArICdweCd9XCI+XHJcblxyXG4gICAgICAgIDx0aW1lLXNjYWxlIFt6b29tXT1cInpvb21cIlxyXG4gICAgICAgICAgICBbem9vbUxldmVsXT1cInpvb21MZXZlbFwiXHJcbiAgICAgICAgICAgIFt0aW1lU2NhbGVdPVwiZ2FudHRTZXJ2aWNlLlRJTUVfU0NBTEVcIlxyXG4gICAgICAgICAgICBbZGltZW5zaW9uc109XCJkaW1lbnNpb25zXCI+PC90aW1lLXNjYWxlPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1hY3Rpdml0eS1hcmVhXCJcclxuICAgICAgICAgICAgI2dhbnR0QWN0aXZpdHlBcmVhXHJcbiAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsgJ2hlaWdodCc6IGdhbnR0U2VydmljZS5jYWxjdWxhdGVHYW50dEhlaWdodCgpLCAnd2lkdGgnOiBjb250YWluZXJXaWR0aCArICdweCd9XCI+XHJcblxyXG4gICAgICAgICAgICA8YWN0aXZpdHktYmFja2dyb3VuZCBbem9vbV09XCJ6b29tXCJcclxuICAgICAgICAgICAgICAgIFt6b29tTGV2ZWxdPVwiem9vbUxldmVsXCJcclxuICAgICAgICAgICAgICAgIFt0aW1lU2NhbGVdPVwiZ2FudHRTZXJ2aWNlLlRJTUVfU0NBTEVcIlxyXG4gICAgICAgICAgICAgICAgW3Rhc2tzXT1cImdhbnR0U2VydmljZS5UQVNLX0NBQ0hFXCI+PC9hY3Rpdml0eS1iYWNrZ3JvdW5kPlxyXG4gICAgICAgICAgICA8YWN0aXZpdHktYmFycyBbem9vbV09XCJ6b29tXCJcclxuICAgICAgICAgICAgICAgIFt6b29tTGV2ZWxdPVwiem9vbUxldmVsXCJcclxuICAgICAgICAgICAgICAgIFt0aW1lU2NhbGVdPVwiZ2FudHRTZXJ2aWNlLlRJTUVfU0NBTEVcIlxyXG4gICAgICAgICAgICAgICAgW2RpbWVuc2lvbnNdPVwiZGltZW5zaW9uc1wiXHJcbiAgICAgICAgICAgICAgICBbdGFza3NdPVwiZ2FudHRTZXJ2aWNlLlRBU0tfQ0FDSEVcIj48L2FjdGl2aXR5LWJhcnM+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJnYW50dC12ZXJ0aWNhbC1zY3JvbGxcIlxyXG4gICAgICAgICN2ZXJ0aWNhbFNjcm9sbFxyXG4gICAgICAgIChzY3JvbGwpPVwib25WZXJ0aWNhbFNjcm9sbCh2ZXJ0aWNhbFNjcm9sbCwgZ2FudHRHcmlkLCBnYW50dEFjdGl2aXR5QXJlYSlcIlxyXG4gICAgICAgIFtuZ1N0eWxlXT1cInsnZGlzcGxheSc6IGFjdGl2aXR5QWN0aW9ucy5leHBhbmRlZCA9PT0gdHJ1ZSA/ICdub25lJyA6ICdibG9jaycgfVwiPlxyXG5cclxuICAgICAgICA8ZGl2IFtuZ1N0eWxlXT1cInsgJ2hlaWdodCc6IGdhbnR0U2VydmljZS5jYWxjdWxhdGVHYW50dEhlaWdodCgpIH1cIj48L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICAgIHN0eWxlczogW2BcclxuICAgICAgICAuZ2FudHQtYWN0aXZpdHkge1xyXG4gICAgICAgICAgICAvKm92ZXJmbG93LXg6IGhpZGRlbjsqL1xyXG4gICAgICAgICAgICBvdmVyZmxvdy14OiBhdXRvO1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDI1MHB4O1xyXG4gICAgICAgICAgICBvdmVyZmxvdy15OiBoaWRkZW47XHJcbiAgICAgICAgICAgIG92ZXJmbG93LXg6IHNjcm9sbDtcclxuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xyXG4gICAgICAgICAgICBwb3NpdGlvbjpyZWxhdGl2ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdhbnR0LWFjdGl2aXR5LWFyZWEge1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcclxuICAgICAgICAgICAgb3ZlcmZsb3cteTogaGlkZGVuO1xyXG4gICAgICAgICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ2FudHQtdmVydGljYWwtc2Nyb2xsIHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbiAgICAgICAgICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcclxuICAgICAgICAgICAgb3ZlcmZsb3cteTogc2Nyb2xsO1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgICAgIHJpZ2h0OiAwO1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgICAgICAgaGVpZ2h0OiAyODNweDtcclxuICAgICAgICAgICAgd2lkdGg6IDE4cHg7XHJcbiAgICAgICAgICAgIHRvcDogNzBweDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdyaWQge1xyXG4gICAgICAgICAgICBvdmVyZmxvdy14OiBoaWRkZW47XHJcbiAgICAgICAgICAgIG92ZXJmbG93LXk6IGhpZGRlbjtcclxuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xyXG4gICAgICAgICAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjY2VjZWNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ3JpZC1zY2FsZSB7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjNmI2YjZiO1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTBlMGUwO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZXNtb2tlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ3JpZC1oZWFkLWNlbGwge1xyXG4gICAgICAgICAgICAvKmNvbG9yOiAjYTZhNmE2OyovXHJcbiAgICAgICAgICAgIGJvcmRlci10b3A6IG5vbmUgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OiBub25lICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xyXG4gICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XHJcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNjZWNlY2U7XHJcbiAgICAgICAgICAgIC8qdGV4dC1hbGlnbjogY2VudGVyOyovXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgICAgICAgY3Vyc29yOiBkZWZhdWx0O1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAgICAgICAgIC1tb3otdXNlci1zZWxlY3Q6IC1tb3otbm9uZTtcclxuICAgICAgICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcclxuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdyaWQtZGF0YSB7XHJcbiAgICAgICAgICAgIG92ZXJmbG93OmhpZGRlbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdyaWQtcm93IHtcclxuICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlMGUwZTA7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdyaWQtcm93OmhvdmVyIHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2VlZWVlZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdyaWQtY2VsbCB7XHJcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogbm9uZTtcclxuICAgICAgICAgICAgY29sb3I6ICM0NTQ1NDU7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgICAgICAgdmVydGljYWwtYWxpZ246IHRvcDtcclxuICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiA2cHg7XHJcbiAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDZweDtcclxuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5hY3Rpb25zLWJhciB7XHJcbiAgICAgICAgICAgIC8qYm9yZGVyLXRvcDogMXB4IHNvbGlkICNjZWNlY2U7Ki9cclxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlMGUwZTA7XHJcbiAgICAgICAgICAgIGNsZWFyOiBib3RoO1xyXG4gICAgICAgICAgICAvKm1hcmdpbi10b3A6IDkwcHg7Ki9cclxuICAgICAgICAgICAgaGVpZ2h0OiAyOHB4O1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiB3aGl0ZXNtb2tlO1xyXG4gICAgICAgICAgICBjb2xvcjogIzQ5NDk0OTtcclxuICAgICAgICAgICAgZm9udC1mYW1pbHk6IEFyaWFsLCBzYW5zLXNlcmlmO1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogMTVweDtcclxuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDI1cHg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5nYW50dC10cmVlLWNvbnRlbnQge1xyXG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6MTVweDtcclxuICAgICAgICB9XHJcbiAgICBgXSxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxyXG59KVxyXG5leHBvcnQgY2xhc3MgR2FudHRBY3Rpdml0eUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgRG9DaGVjayB7XHJcbiAgICBASW5wdXQoKSBwcm9qZWN0OiBhbnk7XHJcbiAgICBASW5wdXQoKSBvcHRpb25zOiBhbnk7XHJcbiAgICBAT3V0cHV0KCkgb25HcmlkUm93Q2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSB1cFRyaWFuZ2xlOiBzdHJpbmcgPSAnJiN4MjViMjsnIC8vIEJMQUNLIFVQLVBPSU5USU5HIFRSSUFOR0xFXHJcbiAgICBwcml2YXRlIGRvd25UcmlhbmdsZTogc3RyaW5nID0gJyYjeDI1YmM7JzsgLy8gQkxBQ0sgRE9XTi1QT0lOVElORyBUUklBTkdMRVxyXG5cclxuICAgIHpvb206IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcblxyXG4gICAgYWN0aXZpdHlBY3Rpb25zID0ge1xyXG4gICAgICAgIGV4cGFuZGVkOiBmYWxzZSxcclxuICAgICAgICBleHBhbmRlZEljb246IHRoaXMuZG93blRyaWFuZ2xlXHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgdGltZVNjYWxlOiBhbnk7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGFydDogRGF0ZTtcclxuICAgIHByaXZhdGUgZW5kOiBEYXRlO1xyXG4gICAgY29udGFpbmVySGVpZ2h0OiBhbnk7XHJcbiAgICBjb250YWluZXJXaWR0aDogYW55O1xyXG5cclxuICAgIHByaXZhdGUgYWN0aXZpdHlDb250YWluZXJTaXplczogYW55O1xyXG5cclxuICAgIGdhbnR0QWN0aXZpdHlIZWlnaHQ6IGFueTtcclxuICAgIGdhbnR0QWN0aXZpdHlXaWR0aDogYW55O1xyXG5cclxuICAgIHpvb21MZXZlbDogc3RyaW5nID0gWm9vbWluZ1tab29taW5nLmhvdXJzXTtcclxuXHJcbiAgICB0cmVlRXhwYW5kZWQgPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIHNjYWxlOiBhbnkgPSB7XHJcbiAgICAgICAgc3RhcnQ6IG51bGwsXHJcbiAgICAgICAgZW5kOiBudWxsXHJcbiAgICB9O1xyXG5cclxuICAgIGRpbWVuc2lvbnMgPSB7XHJcbiAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgIHdpZHRoOiAwXHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgZGF0YTogYW55W10gPSBbXTtcclxuXHJcbiAgICBwdWJsaWMgZ3JpZENvbHVtbnM6IGFueVtdID0gW1xyXG4gICAgICAgIHsgbmFtZTogJycsIGxlZnQ6IDAsIHdpZHRoOiAxNiB9LFxyXG4gICAgICAgIHsgbmFtZTogJ1Rhc2snLCBsZWZ0OiAyMCwgd2lkdGg6IDMzMCB9LFxyXG4gICAgICAgIHsgbmFtZTogJyUnLCBsZWZ0OiA4LCB3aWR0aDogNDAgfSxcclxuICAgICAgICB7IG5hbWU6ICdEdXJhdGlvbicsIGxlZnQ6IDE0LCB3aWR0aDogMTQwIH1cclxuICAgIF07XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIGVsZW06IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgcHVibGljIGdhbnR0U2VydmljZTogR2FudHRTZXJ2aWNlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgLy8gQ2FjaGUgdGhlIHByb2plY3QgZGF0YSBhbmQgb25seSB3b3JrIHdpdGggdGhhdC4gT25seSBzaG93IHBhcmVudCB0YXNrcyBieSBkZWZhdWx0XHJcbiAgICAgICAgdGhpcy5nYW50dFNlcnZpY2UuVEFTS19DQUNIRSA9IHRoaXMucHJvamVjdC50YXNrcy5zbGljZSgwKS5maWx0ZXIoKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gaXRlbS50cmVlUGF0aC5zcGxpdCgnLycpLmxlbmd0aCA9PT0gMTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmdhbnR0U2VydmljZS5USU1FX1NDQUxFID0gdGhpcy5nYW50dFNlcnZpY2UuY2FsY3VsYXRlU2NhbGUodGhpcy5vcHRpb25zLnNjYWxlLnN0YXJ0LCB0aGlzLm9wdGlvbnMuc2NhbGUuZW5kKTtcclxuXHJcbiAgICAgICAgdGhpcy56b29tTGV2ZWwgPSB0aGlzLm9wdGlvbnMuem9vbWluZztcclxuICAgICAgICB0aGlzLnN0YXJ0ID0gdGhpcy5vcHRpb25zLnNjYWxlLnN0YXJ0O1xyXG4gICAgICAgIHRoaXMuZW5kID0gdGhpcy5vcHRpb25zLnNjYWxlLmVuZDtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lcldpZHRoID0gdGhpcy5jYWxjdWxhdGVDb250YWluZXJXaWR0aCgpO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVySGVpZ2h0ID0gdGhpcy5jYWxjdWxhdGVDb250YWluZXJIZWlnaHQoKTtcclxuICAgICAgICB0aGlzLmFjdGl2aXR5Q29udGFpbmVyU2l6ZXMgPSB0aGlzLmdhbnR0U2VydmljZS5jYWxjdWxhdGVBY3Rpdml0eUNvbnRhaW5lckRpbWVuc2lvbnMoKTtcclxuXHJcbiAgICAgICAgLy8gaW1wb3J0YW50IHRoYXQgdGhlc2UgYXJlIGNhbGxlZCBsYXN0IGFzIGl0IHJlbGllcyBvbiB2YWx1ZXMgY2FsY3VsYXRlZCBhYm92ZS5cclxuICAgICAgICB0aGlzLnNldFNjYWxlKCk7XHJcbiAgICAgICAgdGhpcy5zZXREaW1lbnNpb25zKCk7XHJcbiAgICAgICAgdGhpcy5zZXRTaXplcygpO1xyXG5cclxuICAgICAgICB0aGlzLmV4cGFuZCgpOyAvLyBkZWZhdWx0IHRvIGV4cGFuZGVkXHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEN1c3RvbSBtb2RlbCBjaGVjayAqL1xyXG4gICAgbmdEb0NoZWNrKCkge1xyXG4gICAgICAgIC8vIGRvIGEgY2hlY2sgdG8gc2VlIHdoZXRoZXIgYW55IG5ldyB0YXNrcyBoYXZlIGJlZW4gYWRkZWQuIElmIHRoZSB0YXNrIGlzIGEgY2hpbGQgdGhlbiBwdXNoIGludG8gYXJyYXkgaWYgdHJlZSBleHBhbmRlZD9cclxuICAgICAgICB2YXIgdGFza3NBZGRlZCA9IHRoaXMuZ2FudHRTZXJ2aWNlLmRvVGFza0NoZWNrKHRoaXMucHJvamVjdC50YXNrcywgdGhpcy50cmVlRXhwYW5kZWQpO1xyXG5cclxuICAgICAgICAvLyBvbmx5IGZvcmNlIGV4cGFuZCBpZiB0YXNrcyBhcmUgYWRkZWQgYW5kIHRyZWUgaXMgYWxyZWFkeSBleHBhbmRlZFxyXG4gICAgICAgIGlmICh0YXNrc0FkZGVkICYmIHRoaXMuYWN0aXZpdHlBY3Rpb25zLmV4cGFuZGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXhwYW5kKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogT24gdmVydGljYWwgc2Nyb2xsIHNldCB0aGUgc2Nyb2xsIHRvcCBvZiBncmlkIGFuZCBhY3Rpdml0eSAgKi9cclxuICAgIG9uVmVydGljYWxTY3JvbGwodmVydGljYWxTY3JvbGw6IGFueSwgZ2FudHRHcmlkOiBhbnksIGdhbnR0QWN0aXZpdHlBcmVhOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmdhbnR0U2VydmljZS5zY3JvbGxUb3AodmVydGljYWxTY3JvbGwsIGdhbnR0R3JpZCwgZ2FudHRBY3Rpdml0eUFyZWEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBSZW1vdmVzIG9yIGFkZHMgY2hpbGRyZW4gZm9yIGdpdmVuIHBhcmVudCB0YXNrcyBiYWNrIGludG8gRE9NIGJ5IHVwZGF0aW5nIFRBU0tfQ0FDSEUgKi9cclxuICAgIHRvZ2dsZUNoaWxkcmVuKHJvd0VsZW06IGFueSwgdGFzazogYW55KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IGlzUGFyZW50OiBib29sZWFuID0gXCJ0cnVlXCIgPT09IHJvd0VsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWlzcGFyZW50Jyk7XHJcbiAgICAgICAgICAgIGxldCBwYXJlbnRJZDogc3RyaW5nID0gcm93RWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFyZW50aWQnKS5yZXBsYWNlKFwiX1wiLCBcIlwiKTsgLy8gcmVtb3ZlIGlkIHByZWZpeFxyXG4gICAgICAgICAgICBsZXQgY2hpbGRyZW46IGFueSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXBhcmVudGlkPScgKyByb3dFbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1wYXJlbnRpZCcpICsgJ11bZGF0YS1pc3BhcmVudD1mYWxzZV0nKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHVzZSB0aGUgdGFzayBjYWNoZSB0byBhbGxvdyBkZWxldGluZyBvZiBpdGVtcyB3aXRob3V0IHBvbGx1dGluZyB0aGUgcHJvamVjdC50YXNrcyBhcnJheVxyXG4gICAgICAgICAgICBpZiAoaXNQYXJlbnQpIHtcclxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBjaGlsZHJlbiBmcm9tIHRoZSBET00gYXMgd2UgZG9uJ3Qgd2FudCB0aGVtIGlmIHdlIGFyZSBjb2xsYXBzaW5nIHRoZSBwYXJlbnRcclxuICAgICAgICAgICAgICAgIGlmIChjaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkcmVuSWRzOiBhbnlbXSA9IHRoaXMuZ2FudHRTZXJ2aWNlLlRBU0tfQ0FDSEUuZmlsdGVyKCh0YXNrOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhc2sucGFyZW50SWQgPT0gcGFyZW50SWQgJiYgdGFzay50cmVlUGF0aC5zcGxpdCgnLycpLmxlbmd0aCA+IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkubWFwKChpdGVtOiBhbnkpID0+IHsgcmV0dXJuIGl0ZW0uaWQgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuSWRzLmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVtb3ZlZEluZGV4ID0gdGhpcy5nYW50dFNlcnZpY2UuVEFTS19DQUNIRS5tYXAoKGl0ZW06IGFueSkgPT4geyByZXR1cm4gaXRlbS5pZCB9KS5pbmRleE9mKGl0ZW0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW50dFNlcnZpY2UuVEFTS19DQUNIRS5zcGxpY2UocmVtb3ZlZEluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZpdHlBY3Rpb25zLmV4cGFuZGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5kKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIENIRUNLIHRoZSBwcm9qZWN0IGNhY2hlIHRvIHNlZSBpZiB0aGlzIHBhcmVudCBpZCBoYXMgYW55IGNoaWxkcmVuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYW5kIGlmIHNvIHB1c2ggdGhlbSBiYWNrIGludG8gYXJyYXkgc28gRE9NIGlzIHVwZGF0ZWRcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGRyZW5UYXNrczogYW55W10gPSB0aGlzLnByb2plY3QudGFza3MuZmlsdGVyKCh0YXNrOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhc2sucGFyZW50SWQgPT09IHBhcmVudElkICYmIHRhc2sudHJlZVBhdGguc3BsaXQoJy8nKS5sZW5ndGggPiAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlblRhc2tzLmZvckVhY2goKHRhc2s6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbnR0U2VydmljZS5UQVNLX0NBQ0hFLnB1c2godGFzayk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2aXR5QWN0aW9ucy5leHBhbmRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMub25HcmlkUm93Q2xpY2suZW1pdCh0YXNrKTtcclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7IH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogUmVtb3ZlcyBvciBhZGRzIGNoaWxkcmVuIHRhc2tzIGJhY2sgaW50byBET00gYnkgdXBkYXRpbmcgVEFTS19DQUNIRSAqL1xyXG4gICAgdG9nZ2xlQWxsQ2hpbGRyZW4oKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIGNoaWxkcmVuOiBhbnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1pc3BhcmVudD1mYWxzZV0nKTtcclxuICAgICAgICAgICAgdmFyIGNoaWxkcmVuSWRzOiBzdHJpbmdbXSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGNoaWxkcmVuKS5tYXAoKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWlkJykucmVwbGFjZShcIl9cIiwgXCJcIik7IC8vIHJlbW92ZSBpZCBwcmVmaXhcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBwdXNoIGFsbCB0aGUgY2hpbGRyZW4gYXJyYXkgaXRlbXMgaW50byBjYWNoZVxyXG4gICAgICAgICAgICBpZiAodGhpcy50cmVlRXhwYW5kZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkcmVuSWRzOiBzdHJpbmdbXSA9IHRoaXMuZ2FudHRTZXJ2aWNlLlRBU0tfQ0FDSEUuZmlsdGVyKCh0YXNrOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhc2sudHJlZVBhdGguc3BsaXQoJy8nKS5sZW5ndGggPiAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLm1hcCgoaXRlbTogYW55KSA9PiB7IHJldHVybiBpdGVtLmlkIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbklkcy5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlbW92ZWRJbmRleCA9IHRoaXMuZ2FudHRTZXJ2aWNlLlRBU0tfQ0FDSEUubWFwKChpdGVtOiBhbnkpID0+IHsgcmV0dXJuIGl0ZW0uaWQgfSkuaW5kZXhPZihpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW50dFNlcnZpY2UuVEFTS19DQUNIRS5zcGxpY2UocmVtb3ZlZEluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyZWVFeHBhbmRlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2aXR5QWN0aW9ucy5leHBhbmRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5kKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gZ2V0IGFsbCBjaGlsZHJlbiB0YXNrcyBpbiBwcm9qZWN0IGlucHV0XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hpbGRyZW5UYXNrczogYW55W10gPSB0aGlzLnByb2plY3QudGFza3MuZmlsdGVyKCh0YXNrOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFzay50cmVlUGF0aC5zcGxpdCgnLycpLmxlbmd0aCA+IDE7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZpbHRlciBvdXQgdGhlc2UgY2hpbGRyZW4gYXMgdGhleSBhbHJlYWR5IGV4aXN0IGluIHRhc2sgY2FjaGVcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlblRhc2tzID0gY2hpbGRyZW5UYXNrcy5maWx0ZXIoKHRhc2s6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2hpbGRyZW5JZHMuaW5kZXhPZih0YXNrLmlkKSA9PT0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW5UYXNrcy5mb3JFYWNoKCh0YXNrOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbnR0U2VydmljZS5UQVNLX0NBQ0hFLnB1c2godGFzayk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyZWVFeHBhbmRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZpdHlBY3Rpb25zLmV4cGFuZGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBhbmQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnIpIHsgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBPbiByZXNpemUgb2YgYnJvd3NlciB3aW5kb3cgZHluYW1pY2FsbHkgYWRqdXN0IGdhbnR0IGFjdGl2aXR5IGhlaWdodCBhbmQgd2lkdGggKi9cclxuICAgIG9uUmVzaXplKGV2ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBsZXQgYWN0aXZpdHlDb250YWluZXJTaXplcyA9IHRoaXMuZ2FudHRTZXJ2aWNlLmNhbGN1bGF0ZUFjdGl2aXR5Q29udGFpbmVyRGltZW5zaW9ucygpO1xyXG4gICAgICAgIGlmICh0aGlzLmFjdGl2aXR5QWN0aW9ucy5leHBhbmRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmdhbnR0QWN0aXZpdHlIZWlnaHQgPSB0aGlzLmdhbnR0U2VydmljZS5UQVNLX0NBQ0hFLmxlbmd0aCAqIHRoaXMuZ2FudHRTZXJ2aWNlLnJvd0hlaWdodCArIHRoaXMuZ2FudHRTZXJ2aWNlLnJvd0hlaWdodCAqIDMgKyAncHgnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FudHRBY3Rpdml0eUhlaWdodCA9IGFjdGl2aXR5Q29udGFpbmVyU2l6ZXMuaGVpZ2h0ICsgJ3B4Jzs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmdhbnR0QWN0aXZpdHlXaWR0aCA9IGFjdGl2aXR5Q29udGFpbmVyU2l6ZXMud2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2NhbGUoKSB7XHJcbiAgICAgICAgdGhpcy5zY2FsZS5zdGFydCA9IHRoaXMuc3RhcnQ7XHJcbiAgICAgICAgdGhpcy5zY2FsZS5lbmQgPSB0aGlzLmVuZDtcclxuICAgIH1cclxuXHJcbiAgICBzZXREaW1lbnNpb25zKCkge1xyXG4gICAgICAgIHRoaXMuZGltZW5zaW9ucy5oZWlnaHQgPSB0aGlzLmNvbnRhaW5lckhlaWdodDtcclxuICAgICAgICB0aGlzLmRpbWVuc2lvbnMud2lkdGggPSB0aGlzLmNvbnRhaW5lcldpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEdyaWRSb3dTdHlsZShpc1BhcmVudDogYm9vbGVhbik6IGFueSB7XHJcbiAgICAgICAgaWYgKGlzUGFyZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAnaGVpZ2h0JzogdGhpcy5nYW50dFNlcnZpY2Uucm93SGVpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6IHRoaXMuZ2FudHRTZXJ2aWNlLnJvd0hlaWdodCArICdweCcsXHJcbiAgICAgICAgICAgICAgICAnZm9udC13ZWlnaHQnOiAnYm9sZCcsXHJcbiAgICAgICAgICAgICAgICAnY3Vyc29yJzogJ3BvaW50ZXInXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAnaGVpZ2h0JzogdGhpcy5nYW50dFNlcnZpY2Uucm93SGVpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogdGhpcy5nYW50dFNlcnZpY2Uucm93SGVpZ2h0ICsgJ3B4J1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFNldCB0aGUgem9vbSBsZXZlbCBlLmcgaG91cnMsIGRheXMgKi9cclxuICAgIHpvb21UYXNrcyhsZXZlbDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy56b29tTGV2ZWwgPSBsZXZlbDtcclxuICAgICAgICB0aGlzLnpvb20uZW1pdCh0aGlzLnpvb21MZXZlbCk7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXJXaWR0aCA9IHRoaXMuY2FsY3VsYXRlQ29udGFpbmVyV2lkdGgoKTtcclxuICAgICAgICB0aGlzLnNldERpbWVuc2lvbnMoKTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FudHRfYWN0aXZpdHknKS5zY3JvbGxMZWZ0ID0gMCAvLyByZXNldCBzY3JvbGwgbGVmdCwgcmVwbGFjZSB3aXRoIEBWaWV3Q2hpbGQ/XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEV4cGFuZCB0aGUgZ2FudHQgZ3JpZCBhbmQgYWN0aXZpdHkgYXJlYSBoZWlnaHQgKi9cclxuICAgIGV4cGFuZChmb3JjZT86IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB2YXIgdmVydGljYWxTY3JvbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FudHRfdmVydGljYWxfc2Nyb2xsJyk7XHJcbiAgICAgICAgdmFyIGdhbnR0QWN0aXZpdHlIZWlnaHQ6IHN0cmluZyA9IGAke3RoaXMuZ2FudHRTZXJ2aWNlLlRBU0tfQ0FDSEUubGVuZ3RoICogdGhpcy5nYW50dFNlcnZpY2Uucm93SGVpZ2h0ICsgdGhpcy5nYW50dFNlcnZpY2Uucm93SGVpZ2h0ICogM31weGA7XHJcblxyXG4gICAgICAgIGlmIChmb3JjZSAmJiB0aGlzLmFjdGl2aXR5QWN0aW9ucy5leHBhbmRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmdhbnR0QWN0aXZpdHlIZWlnaHQgPSBnYW50dEFjdGl2aXR5SGVpZ2h0O1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5hY3Rpdml0eUFjdGlvbnMuZXhwYW5kZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpdml0eUFjdGlvbnMuZXhwYW5kZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpdml0eUFjdGlvbnMuZXhwYW5kZWRJY29uID0gdGhpcy5kb3duVHJpYW5nbGU7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FudHRBY3Rpdml0eUhlaWdodCA9ICczMDBweCc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmVydGljYWxTY3JvbGwuc2Nyb2xsVG9wID0gMDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZpdHlBY3Rpb25zLmV4cGFuZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpdml0eUFjdGlvbnMuZXhwYW5kZWRJY29uID0gdGhpcy51cFRyaWFuZ2xlO1xyXG4gICAgICAgICAgICB0aGlzLmdhbnR0QWN0aXZpdHlIZWlnaHQgPSBnYW50dEFjdGl2aXR5SGVpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogR2V0IHRoZSBzdGF0dXMgaWNvbiB1bmljb2RlIHN0cmluZyAqL1xyXG4gICAgZ2V0U3RhdHVzSWNvbihzdGF0dXM6IHN0cmluZywgcGVyY2VudENvbXBsZXRlOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIHZhciBjaGVja01hcmtJY29uOiBzdHJpbmcgPSAnJiN4MjcxNDsnO1xyXG4gICAgICAgIHZhciB1cEJsYWNrUG9pbnRlcjogc3RyaW5nID0gJyYjeDI1YjI7JztcclxuICAgICAgICB2YXIgY3Jvc3NNYXJrSWNvbjogc3RyaW5nID0gJyYjeDI3MTg7JztcclxuXHJcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gXCJDb21wbGV0ZWRcIiB8fCBwZXJjZW50Q29tcGxldGUgPT09IDEwMCAmJiBzdGF0dXMgIT09IFwiRXJyb3JcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gY2hlY2tNYXJrSWNvbjtcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gXCJXYXJuaW5nXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVwQmxhY2tQb2ludGVyO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSBcIkVycm9yXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNyb3NzTWFya0ljb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuXHJcbiAgICAvKiogR2V0IHRoZSBzdGF0dXMgaWNvbiBjb2xvciAqL1xyXG4gICAgZ2V0U3RhdHVzSWNvbkNvbG9yKHN0YXR1czogc3RyaW5nLCBwZXJjZW50Q29tcGxldGU6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gXCJDb21wbGV0ZWRcIiB8fCBwZXJjZW50Q29tcGxldGUgPT09IDEwMCAmJiBzdGF0dXMgIT09IFwiRXJyb3JcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gJ2dyZWVuJztcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gXCJXYXJuaW5nXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdvcmFuZ2UnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSBcIkVycm9yXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdyZWQnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0R3JpZFNjYWxlU3R5bGUoKSB7XHJcbiAgICAgICAgdmFyIGhlaWdodCA9IHRoaXMuZ2FudHRTZXJ2aWNlLnJvd0hlaWdodDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuem9vbUxldmVsID09PSBab29taW5nW1pvb21pbmcuaG91cnNdKSB7XHJcbiAgICAgICAgICAgIGhlaWdodCAqPSAyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ2hlaWdodCc6IGhlaWdodCArICdweCcsXHJcbiAgICAgICAgICAgICdsaW5lLWhlaWdodCc6IGhlaWdodCArICdweCcsXHJcbiAgICAgICAgICAgICd3aWR0aCc6IHRoaXMuZ2FudHRTZXJ2aWNlLmdyaWRXaWR0aCArICdweCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlQ29udGFpbmVySGVpZ2h0KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FudHRTZXJ2aWNlLlRBU0tfQ0FDSEUubGVuZ3RoICogdGhpcy5nYW50dFNlcnZpY2Uucm93SGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlQ29udGFpbmVyV2lkdGgoKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAodGhpcy56b29tTGV2ZWwgPT09IFpvb21pbmdbWm9vbWluZy5ob3Vyc10pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2FudHRTZXJ2aWNlLlRJTUVfU0NBTEUubGVuZ3RoICogdGhpcy5nYW50dFNlcnZpY2UuaG91ckNlbGxXaWR0aCAqIDI0ICsgdGhpcy5nYW50dFNlcnZpY2UuaG91ckNlbGxXaWR0aFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdhbnR0U2VydmljZS5USU1FX1NDQUxFLmxlbmd0aCAqIHRoaXMuZ2FudHRTZXJ2aWNlLmNlbGxXaWR0aCArIHRoaXMuZ2FudHRTZXJ2aWNlLmNlbGxXaWR0aDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRTaXplcygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmdhbnR0QWN0aXZpdHlIZWlnaHQgPSB0aGlzLmFjdGl2aXR5Q29udGFpbmVyU2l6ZXMuaGVpZ2h0ICsgJ3B4JztcclxuICAgICAgICB0aGlzLmdhbnR0QWN0aXZpdHlXaWR0aCA9IHRoaXMuYWN0aXZpdHlDb250YWluZXJTaXplcy53aWR0aDtcclxuICAgIH1cclxuXHJcbn1cclxuIl19