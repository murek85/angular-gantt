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
            { name: 'Task', left: 20, width: 330 }
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
            'line-height': height + 'px'
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
                    template: "\n    <div class=\"actions-bar\">\n        <div style=\"float: right\"></div>\n    </div>\n    <div class=\"grid\" #ganttGrid [ngStyle]=\"{ 'height': ganttActivityHeight }\">\n    <div class=\"grid-scale\" [ngStyle]=\"setGridScaleStyle()\">\n        <div class=\"grid-head-cell\"\n            *ngFor=\"let column of gridColumns\" [style.width]=\"column.width + 'px'\"\n            [style.left]=\"column.left + 'px'\">\n\n            <label>\n                {{column.name}}\n            </label>\n        </div>\n    </div>\n    <div class=\"grid-data\"\n        #ganttGridData\n        [ngStyle]=\"{ 'height': ganttService.calculateGanttHeight() }\">\n\n    <div #row\n        *ngFor=\"let data of ganttService.groupData(ganttService.TASK_CACHE)\"\n        (click)=\"toggleChildren(row, data)\" class=\"grid-row\"\n        [ngStyle]=\"setGridRowStyle(ganttService.isParent(data.treePath))\"\n        [attr.data-id]=\"ganttService.setIdPrefix(data.id)\"\n        [attr.data-isParent]=\"ganttService.isParent(data.treePath)\"\n        [attr.data-parentid]=\"ganttService.setIdPrefix(data.parentId)\">\n\n            <div class=\"grid-cell\"\n                [ngStyle]=\"{ 'width': gridColumns[1].width + 'px', 'padding-left': ganttService.isChild(data.treePath) }\">\n\n                <div class=\"gantt-tree-content\">{{data.name}}</div>\n            </div>\n        </div>\n    </div>\n    </div>\n    <div class=\"gantt-activity\"\n        (window:resize)=\"onResize($event)\"\n        [ngStyle]=\"{ 'height': ganttActivityHeight, 'width': ganttActivityWidth + 36 + 'px'}\">\n\n        <time-scale [zoom]=\"zoom\"\n            [zoomLevel]=\"zoomLevel\"\n            [timeScale]=\"ganttService.TIME_SCALE\"\n            [dimensions]=\"dimensions\"></time-scale>\n        <div class=\"gantt-activity-area\"\n            #ganttActivityArea\n            [ngStyle]=\"{ 'height': ganttService.calculateGanttHeight(), 'width': containerWidth + 'px'}\">\n\n            <activity-background [zoom]=\"zoom\"\n                [zoomLevel]=\"zoomLevel\"\n                [timeScale]=\"ganttService.TIME_SCALE\"\n                [tasks]=\"ganttService.TASK_CACHE\"></activity-background>\n            <activity-bars [zoom]=\"zoom\"\n                [zoomLevel]=\"zoomLevel\"\n                [timeScale]=\"ganttService.TIME_SCALE\"\n                [dimensions]=\"dimensions\"\n                [tasks]=\"ganttService.TASK_CACHE\"></activity-bars>\n        </div>\n    </div>\n    <div class=\"gantt-vertical-scroll\"\n        #verticalScroll\n        (scroll)=\"onVerticalScroll(verticalScroll, ganttGrid, ganttActivityArea)\"\n        [ngStyle]=\"{'display': activityActions.expanded === true ? 'none' : 'block' }\">\n\n        <div [ngStyle]=\"{ 'height': ganttService.calculateGanttHeight() }\"></div>\n    </div>\n    ",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQtYWN0aXZpdHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1nYW50dC8iLCJzb3VyY2VzIjpbImxpYi9hY3Rpdml0eS9nYW50dC1hY3Rpdml0eS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUE0Qix1QkFBdUIsRUFBc0IsTUFBTSxlQUFlLENBQUM7QUFFbEssT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRWhFLE9BQU8sRUFBaUIsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFOUQ7SUEyTkksZ0NBQ1csSUFBZ0IsRUFDaEIsWUFBMEI7UUFEMUIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQS9DM0IsbUJBQWMsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUU5RCxlQUFVLEdBQVcsVUFBVSxDQUFBLENBQUMsNkJBQTZCOztRQUM3RCxpQkFBWSxHQUFXLFVBQVUsQ0FBQyxDQUFDLCtCQUErQjs7UUFFMUUsU0FBSSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBRXhELG9CQUFlLEdBQUc7WUFDZCxRQUFRLEVBQUUsS0FBSztZQUNmLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWTtTQUNsQyxDQUFDO1FBY0YsY0FBUyxHQUFXLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFM0MsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFFYixVQUFLLEdBQVE7WUFDakIsS0FBSyxFQUFFLElBQUk7WUFDWCxHQUFHLEVBQUUsSUFBSTtTQUNaLENBQUM7UUFFRixlQUFVLEdBQUc7WUFDVCxNQUFNLEVBQUUsQ0FBQztZQUNULEtBQUssRUFBRSxDQUFDO1NBQ1gsQ0FBQztRQUVNLFNBQUksR0FBVSxFQUFFLENB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bnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgQWZ0ZXJWaWV3SW5pdCwgVmlld0NoaWxkLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgT25DaGFuZ2VzLCBEb0NoZWNrIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBHYW50dFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvZ2FudHQuc2VydmljZSc7XHJcbmltcG9ydCB7IEdhbnR0Q29uZmlnIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2dhbnR0LWNvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSUdhbnR0T3B0aW9ucywgWm9vbWluZyB9IGZyb20gJy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdnYW50dC1hY3Rpdml0eScsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBjbGFzcz1cImFjdGlvbnMtYmFyXCI+XHJcbiAgICAgICAgPGRpdiBzdHlsZT1cImZsb2F0OiByaWdodFwiPjwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZ3JpZFwiICNnYW50dEdyaWQgW25nU3R5bGVdPVwieyAnaGVpZ2h0JzogZ2FudHRBY3Rpdml0eUhlaWdodCB9XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZ3JpZC1zY2FsZVwiIFtuZ1N0eWxlXT1cInNldEdyaWRTY2FsZVN0eWxlKClcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JpZC1oZWFkLWNlbGxcIlxyXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGdyaWRDb2x1bW5zXCIgW3N0eWxlLndpZHRoXT1cImNvbHVtbi53aWR0aCArICdweCdcIlxyXG4gICAgICAgICAgICBbc3R5bGUubGVmdF09XCJjb2x1bW4ubGVmdCArICdweCdcIj5cclxuXHJcbiAgICAgICAgICAgIDxsYWJlbD5cclxuICAgICAgICAgICAgICAgIHt7Y29sdW1uLm5hbWV9fVxyXG4gICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZ3JpZC1kYXRhXCJcclxuICAgICAgICAjZ2FudHRHcmlkRGF0YVxyXG4gICAgICAgIFtuZ1N0eWxlXT1cInsgJ2hlaWdodCc6IGdhbnR0U2VydmljZS5jYWxjdWxhdGVHYW50dEhlaWdodCgpIH1cIj5cclxuXHJcbiAgICA8ZGl2ICNyb3dcclxuICAgICAgICAqbmdGb3I9XCJsZXQgZGF0YSBvZiBnYW50dFNlcnZpY2UuZ3JvdXBEYXRhKGdhbnR0U2VydmljZS5UQVNLX0NBQ0hFKVwiXHJcbiAgICAgICAgKGNsaWNrKT1cInRvZ2dsZUNoaWxkcmVuKHJvdywgZGF0YSlcIiBjbGFzcz1cImdyaWQtcm93XCJcclxuICAgICAgICBbbmdTdHlsZV09XCJzZXRHcmlkUm93U3R5bGUoZ2FudHRTZXJ2aWNlLmlzUGFyZW50KGRhdGEudHJlZVBhdGgpKVwiXHJcbiAgICAgICAgW2F0dHIuZGF0YS1pZF09XCJnYW50dFNlcnZpY2Uuc2V0SWRQcmVmaXgoZGF0YS5pZClcIlxyXG4gICAgICAgIFthdHRyLmRhdGEtaXNQYXJlbnRdPVwiZ2FudHRTZXJ2aWNlLmlzUGFyZW50KGRhdGEudHJlZVBhdGgpXCJcclxuICAgICAgICBbYXR0ci5kYXRhLXBhcmVudGlkXT1cImdhbnR0U2VydmljZS5zZXRJZFByZWZpeChkYXRhLnBhcmVudElkKVwiPlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyaWQtY2VsbFwiXHJcbiAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJ7ICd3aWR0aCc6IGdyaWRDb2x1bW5zWzFdLndpZHRoICsgJ3B4JywgJ3BhZGRpbmctbGVmdCc6IGdhbnR0U2VydmljZS5pc0NoaWxkKGRhdGEudHJlZVBhdGgpIH1cIj5cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtdHJlZS1jb250ZW50XCI+e3tkYXRhLm5hbWV9fTwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtYWN0aXZpdHlcIlxyXG4gICAgICAgICh3aW5kb3c6cmVzaXplKT1cIm9uUmVzaXplKCRldmVudClcIlxyXG4gICAgICAgIFtuZ1N0eWxlXT1cInsgJ2hlaWdodCc6IGdhbnR0QWN0aXZpdHlIZWlnaHQsICd3aWR0aCc6IGdhbnR0QWN0aXZpdHlXaWR0aCArIDM2ICsgJ3B4J31cIj5cclxuXHJcbiAgICAgICAgPHRpbWUtc2NhbGUgW3pvb21dPVwiem9vbVwiXHJcbiAgICAgICAgICAgIFt6b29tTGV2ZWxdPVwiem9vbUxldmVsXCJcclxuICAgICAgICAgICAgW3RpbWVTY2FsZV09XCJnYW50dFNlcnZpY2UuVElNRV9TQ0FMRVwiXHJcbiAgICAgICAgICAgIFtkaW1lbnNpb25zXT1cImRpbWVuc2lvbnNcIj48L3RpbWUtc2NhbGU+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImdhbnR0LWFjdGl2aXR5LWFyZWFcIlxyXG4gICAgICAgICAgICAjZ2FudHRBY3Rpdml0eUFyZWFcclxuICAgICAgICAgICAgW25nU3R5bGVdPVwieyAnaGVpZ2h0JzogZ2FudHRTZXJ2aWNlLmNhbGN1bGF0ZUdhbnR0SGVpZ2h0KCksICd3aWR0aCc6IGNvbnRhaW5lcldpZHRoICsgJ3B4J31cIj5cclxuXHJcbiAgICAgICAgICAgIDxhY3Rpdml0eS1iYWNrZ3JvdW5kIFt6b29tXT1cInpvb21cIlxyXG4gICAgICAgICAgICAgICAgW3pvb21MZXZlbF09XCJ6b29tTGV2ZWxcIlxyXG4gICAgICAgICAgICAgICAgW3RpbWVTY2FsZV09XCJnYW50dFNlcnZpY2UuVElNRV9TQ0FMRVwiXHJcbiAgICAgICAgICAgICAgICBbdGFza3NdPVwiZ2FudHRTZXJ2aWNlLlRBU0tfQ0FDSEVcIj48L2FjdGl2aXR5LWJhY2tncm91bmQ+XHJcbiAgICAgICAgICAgIDxhY3Rpdml0eS1iYXJzIFt6b29tXT1cInpvb21cIlxyXG4gICAgICAgICAgICAgICAgW3pvb21MZXZlbF09XCJ6b29tTGV2ZWxcIlxyXG4gICAgICAgICAgICAgICAgW3RpbWVTY2FsZV09XCJnYW50dFNlcnZpY2UuVElNRV9TQ0FMRVwiXHJcbiAgICAgICAgICAgICAgICBbZGltZW5zaW9uc109XCJkaW1lbnNpb25zXCJcclxuICAgICAgICAgICAgICAgIFt0YXNrc109XCJnYW50dFNlcnZpY2UuVEFTS19DQUNIRVwiPjwvYWN0aXZpdHktYmFycz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cImdhbnR0LXZlcnRpY2FsLXNjcm9sbFwiXHJcbiAgICAgICAgI3ZlcnRpY2FsU2Nyb2xsXHJcbiAgICAgICAgKHNjcm9sbCk9XCJvblZlcnRpY2FsU2Nyb2xsKHZlcnRpY2FsU2Nyb2xsLCBnYW50dEdyaWQsIGdhbnR0QWN0aXZpdHlBcmVhKVwiXHJcbiAgICAgICAgW25nU3R5bGVdPVwieydkaXNwbGF5JzogYWN0aXZpdHlBY3Rpb25zLmV4cGFuZGVkID09PSB0cnVlID8gJ25vbmUnIDogJ2Jsb2NrJyB9XCI+XHJcblxyXG4gICAgICAgIDxkaXYgW25nU3R5bGVdPVwieyAnaGVpZ2h0JzogZ2FudHRTZXJ2aWNlLmNhbGN1bGF0ZUdhbnR0SGVpZ2h0KCkgfVwiPjwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgc3R5bGVzOiBbYFxyXG4gICAgICAgIC5nYW50dC1hY3Rpdml0eSB7XHJcbiAgICAgICAgICAgIC8qb3ZlcmZsb3cteDogaGlkZGVuOyovXHJcbiAgICAgICAgICAgIG92ZXJmbG93LXg6IGF1dG87XHJcbiAgICAgICAgICAgIGhlaWdodDogMjUwcHg7XHJcbiAgICAgICAgICAgIG92ZXJmbG93LXk6IGhpZGRlbjtcclxuICAgICAgICAgICAgb3ZlcmZsb3cteDogc2Nyb2xsO1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOnJlbGF0aXZlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ2FudHQtYWN0aXZpdHktYXJlYSB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgICAgICAgb3ZlcmZsb3cteDogaGlkZGVuO1xyXG4gICAgICAgICAgICBvdmVyZmxvdy15OiBoaWRkZW47XHJcbiAgICAgICAgICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5nYW50dC12ZXJ0aWNhbC1zY3JvbGwge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuICAgICAgICAgICAgb3ZlcmZsb3cteDogaGlkZGVuO1xyXG4gICAgICAgICAgICBvdmVyZmxvdy15OiBzY3JvbGw7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICAgICAgcmlnaHQ6IDA7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDI4M3B4O1xyXG4gICAgICAgICAgICB3aWR0aDogMThweDtcclxuICAgICAgICAgICAgdG9wOiA3MHB4O1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ3JpZCB7XHJcbiAgICAgICAgICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcclxuICAgICAgICAgICAgb3ZlcmZsb3cteTogaGlkZGVuO1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XHJcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNjZWNlY2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5ncmlkLXNjYWxlIHtcclxuICAgICAgICAgICAgY29sb3I6ICM2YjZiNmI7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlMGUwZTA7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlc21va2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5ncmlkLWhlYWQtY2VsbCB7XHJcbiAgICAgICAgICAgIC8qY29sb3I6ICNhNmE2YTY7Ki9cclxuICAgICAgICAgICAgYm9yZGVyLXRvcDogbm9uZSAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICBib3JkZXItcmlnaHQ6IG5vbmUgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7XHJcbiAgICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgICAgICAgdmVydGljYWwtYWxpZ246IHRvcDtcclxuICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2NlY2VjZTtcclxuICAgICAgICAgICAgLyp0ZXh0LWFsaWduOiBjZW50ZXI7Ki9cclxuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgICAgICBjdXJzb3I6IGRlZmF1bHQ7XHJcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgICAgICAgLW1vei11c2VyLXNlbGVjdDogLW1vei1ub25lO1xyXG4gICAgICAgICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xyXG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ3JpZC1kYXRhIHtcclxuICAgICAgICAgICAgb3ZlcmZsb3c6aGlkZGVuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ3JpZC1yb3cge1xyXG4gICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2UwZTBlMDtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ3JpZC1yb3c6aG92ZXIge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlZWVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ3JpZC1jZWxsIHtcclxuICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OiBub25lO1xyXG4gICAgICAgICAgICBjb2xvcjogIzQ1NDU0NTtcclxuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xyXG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDZweDtcclxuICAgICAgICAgICAgcGFkZGluZy1yaWdodDogNnB4O1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmFjdGlvbnMtYmFyIHtcclxuICAgICAgICAgICAgLypib3JkZXItdG9wOiAxcHggc29saWQgI2NlY2VjZTsqL1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2UwZTBlMDtcclxuICAgICAgICAgICAgY2xlYXI6IGJvdGg7XHJcbiAgICAgICAgICAgIC8qbWFyZ2luLXRvcDogOTBweDsqL1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDI4cHg7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHdoaXRlc21va2U7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjNDk0OTQ5O1xyXG4gICAgICAgICAgICBmb250LWZhbWlseTogQXJpYWwsIHNhbnMtc2VyaWY7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAxNXB4O1xyXG4gICAgICAgICAgICBsaW5lLWhlaWdodDogMjVweDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdhbnR0LXRyZWUtY29udGVudCB7XHJcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDoxNXB4O1xyXG4gICAgICAgIH1cclxuICAgIGBdLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHYW50dEFjdGl2aXR5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBEb0NoZWNrIHtcclxuICAgIEBJbnB1dCgpIHByb2plY3Q6IGFueTtcclxuICAgIEBJbnB1dCgpIG9wdGlvbnM6IGFueTtcclxuICAgIEBPdXRwdXQoKSBvbkdyaWRSb3dDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgICBwcml2YXRlIHVwVHJpYW5nbGU6IHN0cmluZyA9ICcmI3gyNWIyOycgLy8gQkxBQ0sgVVAtUE9JTlRJTkcgVFJJQU5HTEVcclxuICAgIHByaXZhdGUgZG93blRyaWFuZ2xlOiBzdHJpbmcgPSAnJiN4MjViYzsnOyAvLyBCTEFDSyBET1dOLVBPSU5USU5HIFRSSUFOR0xFXHJcblxyXG4gICAgem9vbTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuXHJcbiAgICBhY3Rpdml0eUFjdGlvbnMgPSB7XHJcbiAgICAgICAgZXhwYW5kZWQ6IGZhbHNlLFxyXG4gICAgICAgIGV4cGFuZGVkSWNvbjogdGhpcy5kb3duVHJpYW5nbGVcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSB0aW1lU2NhbGU6IGFueTtcclxuXHJcbiAgICBwcml2YXRlIHN0YXJ0OiBEYXRlO1xyXG4gICAgcHJpdmF0ZSBlbmQ6IERhdGU7XHJcbiAgICBjb250YWluZXJIZWlnaHQ6IGFueTtcclxuICAgIGNvbnRhaW5lcldpZHRoOiBhbnk7XHJcblxyXG4gICAgcHJpdmF0ZSBhY3Rpdml0eUNvbnRhaW5lclNpemVzOiBhbnk7XHJcblxyXG4gICAgZ2FudHRBY3Rpdml0eUhlaWdodDogYW55O1xyXG4gICAgZ2FudHRBY3Rpdml0eVdpZHRoOiBhbnk7XHJcblxyXG4gICAgem9vbUxldmVsOiBzdHJpbmcgPSBab29taW5nW1pvb21pbmcuaG91cnNdO1xyXG5cclxuICAgIHRyZWVFeHBhbmRlZCA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgc2NhbGU6IGFueSA9IHtcclxuICAgICAgICBzdGFydDogbnVsbCxcclxuICAgICAgICBlbmQ6IG51bGxcclxuICAgIH07XHJcblxyXG4gICAgZGltZW5zaW9ucyA9IHtcclxuICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgd2lkdGg6IDBcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBkYXRhOiBhbnlbXSA9IFtdO1xyXG5cclxuICAgIHB1YmxpYyBncmlkQ29sdW1uczogYW55W10gPSBbXHJcbiAgICAgICAgeyBuYW1lOiAnJywgbGVmdDogMCwgd2lkdGg6IDE2IH0sXHJcbiAgICAgICAgeyBuYW1lOiAnVGFzaycsIGxlZnQ6IDIwLCB3aWR0aDogMzMwIH1cclxuICAgIF07XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIGVsZW06IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgcHVibGljIGdhbnR0U2VydmljZTogR2FudHRTZXJ2aWNlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgLy8gQ2FjaGUgdGhlIHByb2plY3QgZGF0YSBhbmQgb25seSB3b3JrIHdpdGggdGhhdC4gT25seSBzaG93IHBhcmVudCB0YXNrcyBieSBkZWZhdWx0XHJcbiAgICAgICAgdGhpcy5nYW50dFNlcnZpY2UuVEFTS19DQUNIRSA9IHRoaXMucHJvamVjdC50YXNrcy5zbGljZSgwKS5maWx0ZXIoKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gaXRlbS50cmVlUGF0aC5zcGxpdCgnLycpLmxlbmd0aCA9PT0gMTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmdhbnR0U2VydmljZS5USU1FX1NDQUxFID0gdGhpcy5nYW50dFNlcnZpY2UuY2FsY3VsYXRlU2NhbGUodGhpcy5vcHRpb25zLnNjYWxlLnN0YXJ0LCB0aGlzLm9wdGlvbnMuc2NhbGUuZW5kKTtcclxuXHJcbiAgICAgICAgdGhpcy56b29tTGV2ZWwgPSB0aGlzLm9wdGlvbnMuem9vbWluZztcclxuICAgICAgICB0aGlzLnN0YXJ0ID0gdGhpcy5vcHRpb25zLnNjYWxlLnN0YXJ0O1xyXG4gICAgICAgIHRoaXMuZW5kID0gdGhpcy5vcHRpb25zLnNjYWxlLmVuZDtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lcldpZHRoID0gdGhpcy5jYWxjdWxhdGVDb250YWluZXJXaWR0aCgpO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVySGVpZ2h0ID0gdGhpcy5jYWxjdWxhdGVDb250YWluZXJIZWlnaHQoKTtcclxuICAgICAgICB0aGlzLmFjdGl2aXR5Q29udGFpbmVyU2l6ZXMgPSB0aGlzLmdhbnR0U2VydmljZS5jYWxjdWxhdGVBY3Rpdml0eUNvbnRhaW5lckRpbWVuc2lvbnMoKTtcclxuXHJcbiAgICAgICAgLy8gaW1wb3J0YW50IHRoYXQgdGhlc2UgYXJlIGNhbGxlZCBsYXN0IGFzIGl0IHJlbGllcyBvbiB2YWx1ZXMgY2FsY3VsYXRlZCBhYm92ZS5cclxuICAgICAgICB0aGlzLnNldFNjYWxlKCk7XHJcbiAgICAgICAgdGhpcy5zZXREaW1lbnNpb25zKCk7XHJcbiAgICAgICAgdGhpcy5zZXRTaXplcygpO1xyXG5cclxuICAgICAgICB0aGlzLmV4cGFuZCgpOyAvLyBkZWZhdWx0IHRvIGV4cGFuZGVkXHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEN1c3RvbSBtb2RlbCBjaGVjayAqL1xyXG4gICAgbmdEb0NoZWNrKCkge1xyXG4gICAgICAgIC8vIGRvIGEgY2hlY2sgdG8gc2VlIHdoZXRoZXIgYW55IG5ldyB0YXNrcyBoYXZlIGJlZW4gYWRkZWQuIElmIHRoZSB0YXNrIGlzIGEgY2hpbGQgdGhlbiBwdXNoIGludG8gYXJyYXkgaWYgdHJlZSBleHBhbmRlZD9cclxuICAgICAgICB2YXIgdGFza3NBZGRlZCA9IHRoaXMuZ2FudHRTZXJ2aWNlLmRvVGFza0NoZWNrKHRoaXMucHJvamVjdC50YXNrcywgdGhpcy50cmVlRXhwYW5kZWQpO1xyXG5cclxuICAgICAgICAvLyBvbmx5IGZvcmNlIGV4cGFuZCBpZiB0YXNrcyBhcmUgYWRkZWQgYW5kIHRyZWUgaXMgYWxyZWFkeSBleHBhbmRlZFxyXG4gICAgICAgIGlmICh0YXNrc0FkZGVkICYmIHRoaXMuYWN0aXZpdHlBY3Rpb25zLmV4cGFuZGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXhwYW5kKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogT24gdmVydGljYWwgc2Nyb2xsIHNldCB0aGUgc2Nyb2xsIHRvcCBvZiBncmlkIGFuZCBhY3Rpdml0eSAgKi9cclxuICAgIG9uVmVydGljYWxTY3JvbGwodmVydGljYWxTY3JvbGw6IGFueSwgZ2FudHRHcmlkOiBhbnksIGdhbnR0QWN0aXZpdHlBcmVhOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmdhbnR0U2VydmljZS5zY3JvbGxUb3AodmVydGljYWxTY3JvbGwsIGdhbnR0R3JpZCwgZ2FudHRBY3Rpdml0eUFyZWEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBSZW1vdmVzIG9yIGFkZHMgY2hpbGRyZW4gZm9yIGdpdmVuIHBhcmVudCB0YXNrcyBiYWNrIGludG8gRE9NIGJ5IHVwZGF0aW5nIFRBU0tfQ0FDSEUgKi9cclxuICAgIHRvZ2dsZUNoaWxkcmVuKHJvd0VsZW06IGFueSwgdGFzazogYW55KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IGlzUGFyZW50OiBib29sZWFuID0gXCJ0cnVlXCIgPT09IHJvd0VsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWlzcGFyZW50Jyk7XHJcbiAgICAgICAgICAgIGxldCBwYXJlbnRJZDogc3RyaW5nID0gcm93RWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFyZW50aWQnKS5yZXBsYWNlKFwiX1wiLCBcIlwiKTsgLy8gcmVtb3ZlIGlkIHByZWZpeFxyXG4gICAgICAgICAgICBsZXQgY2hpbGRyZW46IGFueSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXBhcmVudGlkPScgKyByb3dFbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1wYXJlbnRpZCcpICsgJ11bZGF0YS1pc3BhcmVudD1mYWxzZV0nKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHVzZSB0aGUgdGFzayBjYWNoZSB0byBhbGxvdyBkZWxldGluZyBvZiBpdGVtcyB3aXRob3V0IHBvbGx1dGluZyB0aGUgcHJvamVjdC50YXNrcyBhcnJheVxyXG4gICAgICAgICAgICBpZiAoaXNQYXJlbnQpIHtcclxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBjaGlsZHJlbiBmcm9tIHRoZSBET00gYXMgd2UgZG9uJ3Qgd2FudCB0aGVtIGlmIHdlIGFyZSBjb2xsYXBzaW5nIHRoZSBwYXJlbnRcclxuICAgICAgICAgICAgICAgIGlmIChjaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkcmVuSWRzOiBhbnlbXSA9IHRoaXMuZ2FudHRTZXJ2aWNlLlRBU0tfQ0FDSEUuZmlsdGVyKCh0YXNrOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhc2sucGFyZW50SWQgPT0gcGFyZW50SWQgJiYgdGFzay50cmVlUGF0aC5zcGxpdCgnLycpLmxlbmd0aCA+IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkubWFwKChpdGVtOiBhbnkpID0+IHsgcmV0dXJuIGl0ZW0uaWQgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuSWRzLmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVtb3ZlZEluZGV4ID0gdGhpcy5nYW50dFNlcnZpY2UuVEFTS19DQUNIRS5tYXAoKGl0ZW06IGFueSkgPT4geyByZXR1cm4gaXRlbS5pZCB9KS5pbmRleE9mKGl0ZW0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW50dFNlcnZpY2UuVEFTS19DQUNIRS5zcGxpY2UocmVtb3ZlZEluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZpdHlBY3Rpb25zLmV4cGFuZGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5kKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIENIRUNLIHRoZSBwcm9qZWN0IGNhY2hlIHRvIHNlZSBpZiB0aGlzIHBhcmVudCBpZCBoYXMgYW55IGNoaWxkcmVuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYW5kIGlmIHNvIHB1c2ggdGhlbSBiYWNrIGludG8gYXJyYXkgc28gRE9NIGlzIHVwZGF0ZWRcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGRyZW5UYXNrczogYW55W10gPSB0aGlzLnByb2plY3QudGFza3MuZmlsdGVyKCh0YXNrOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhc2sucGFyZW50SWQgPT09IHBhcmVudElkICYmIHRhc2sudHJlZVBhdGguc3BsaXQoJy8nKS5sZW5ndGggPiAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlblRhc2tzLmZvckVhY2goKHRhc2s6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbnR0U2VydmljZS5UQVNLX0NBQ0hFLnB1c2godGFzayk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2aXR5QWN0aW9ucy5leHBhbmRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMub25HcmlkUm93Q2xpY2suZW1pdCh0YXNrKTtcclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7IH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogUmVtb3ZlcyBvciBhZGRzIGNoaWxkcmVuIHRhc2tzIGJhY2sgaW50byBET00gYnkgdXBkYXRpbmcgVEFTS19DQUNIRSAqL1xyXG4gICAgdG9nZ2xlQWxsQ2hpbGRyZW4oKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIGNoaWxkcmVuOiBhbnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1pc3BhcmVudD1mYWxzZV0nKTtcclxuICAgICAgICAgICAgdmFyIGNoaWxkcmVuSWRzOiBzdHJpbmdbXSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGNoaWxkcmVuKS5tYXAoKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWlkJykucmVwbGFjZShcIl9cIiwgXCJcIik7IC8vIHJlbW92ZSBpZCBwcmVmaXhcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBwdXNoIGFsbCB0aGUgY2hpbGRyZW4gYXJyYXkgaXRlbXMgaW50byBjYWNoZVxyXG4gICAgICAgICAgICBpZiAodGhpcy50cmVlRXhwYW5kZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkcmVuSWRzOiBzdHJpbmdbXSA9IHRoaXMuZ2FudHRTZXJ2aWNlLlRBU0tfQ0FDSEUuZmlsdGVyKCh0YXNrOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhc2sudHJlZVBhdGguc3BsaXQoJy8nKS5sZW5ndGggPiAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLm1hcCgoaXRlbTogYW55KSA9PiB7IHJldHVybiBpdGVtLmlkIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbklkcy5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlbW92ZWRJbmRleCA9IHRoaXMuZ2FudHRTZXJ2aWNlLlRBU0tfQ0FDSEUubWFwKChpdGVtOiBhbnkpID0+IHsgcmV0dXJuIGl0ZW0uaWQgfSkuaW5kZXhPZihpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW50dFNlcnZpY2UuVEFTS19DQUNIRS5zcGxpY2UocmVtb3ZlZEluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyZWVFeHBhbmRlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2aXR5QWN0aW9ucy5leHBhbmRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5kKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gZ2V0IGFsbCBjaGlsZHJlbiB0YXNrcyBpbiBwcm9qZWN0IGlucHV0XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hpbGRyZW5UYXNrczogYW55W10gPSB0aGlzLnByb2plY3QudGFza3MuZmlsdGVyKCh0YXNrOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFzay50cmVlUGF0aC5zcGxpdCgnLycpLmxlbmd0aCA+IDE7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZpbHRlciBvdXQgdGhlc2UgY2hpbGRyZW4gYXMgdGhleSBhbHJlYWR5IGV4aXN0IGluIHRhc2sgY2FjaGVcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlblRhc2tzID0gY2hpbGRyZW5UYXNrcy5maWx0ZXIoKHRhc2s6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2hpbGRyZW5JZHMuaW5kZXhPZih0YXNrLmlkKSA9PT0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW5UYXNrcy5mb3JFYWNoKCh0YXNrOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbnR0U2VydmljZS5UQVNLX0NBQ0hFLnB1c2godGFzayk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyZWVFeHBhbmRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZpdHlBY3Rpb25zLmV4cGFuZGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBhbmQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnIpIHsgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBPbiByZXNpemUgb2YgYnJvd3NlciB3aW5kb3cgZHluYW1pY2FsbHkgYWRqdXN0IGdhbnR0IGFjdGl2aXR5IGhlaWdodCBhbmQgd2lkdGggKi9cclxuICAgIG9uUmVzaXplKGV2ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBsZXQgYWN0aXZpdHlDb250YWluZXJTaXplcyA9IHRoaXMuZ2FudHRTZXJ2aWNlLmNhbGN1bGF0ZUFjdGl2aXR5Q29udGFpbmVyRGltZW5zaW9ucygpO1xyXG4gICAgICAgIGlmICh0aGlzLmFjdGl2aXR5QWN0aW9ucy5leHBhbmRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmdhbnR0QWN0aXZpdHlIZWlnaHQgPSB0aGlzLmdhbnR0U2VydmljZS5UQVNLX0NBQ0hFLmxlbmd0aCAqIHRoaXMuZ2FudHRTZXJ2aWNlLnJvd0hlaWdodCArIHRoaXMuZ2FudHRTZXJ2aWNlLnJvd0hlaWdodCAqIDMgKyAncHgnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FudHRBY3Rpdml0eUhlaWdodCA9IGFjdGl2aXR5Q29udGFpbmVyU2l6ZXMuaGVpZ2h0ICsgJ3B4Jzs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmdhbnR0QWN0aXZpdHlXaWR0aCA9IGFjdGl2aXR5Q29udGFpbmVyU2l6ZXMud2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2NhbGUoKSB7XHJcbiAgICAgICAgdGhpcy5zY2FsZS5zdGFydCA9IHRoaXMuc3RhcnQ7XHJcbiAgICAgICAgdGhpcy5zY2FsZS5lbmQgPSB0aGlzLmVuZDtcclxuICAgIH1cclxuXHJcbiAgICBzZXREaW1lbnNpb25zKCkge1xyXG4gICAgICAgIHRoaXMuZGltZW5zaW9ucy5oZWlnaHQgPSB0aGlzLmNvbnRhaW5lckhlaWdodDtcclxuICAgICAgICB0aGlzLmRpbWVuc2lvbnMud2lkdGggPSB0aGlzLmNvbnRhaW5lcldpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEdyaWRSb3dTdHlsZShpc1BhcmVudDogYm9vbGVhbik6IGFueSB7XHJcbiAgICAgICAgaWYgKGlzUGFyZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAnaGVpZ2h0JzogdGhpcy5nYW50dFNlcnZpY2Uucm93SGVpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6IHRoaXMuZ2FudHRTZXJ2aWNlLnJvd0hlaWdodCArICdweCcsXHJcbiAgICAgICAgICAgICAgICAnZm9udC13ZWlnaHQnOiAnYm9sZCcsXHJcbiAgICAgICAgICAgICAgICAnY3Vyc29yJzogJ3BvaW50ZXInXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAnaGVpZ2h0JzogdGhpcy5nYW50dFNlcnZpY2Uucm93SGVpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogdGhpcy5nYW50dFNlcnZpY2Uucm93SGVpZ2h0ICsgJ3B4J1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFNldCB0aGUgem9vbSBsZXZlbCBlLmcgaG91cnMsIGRheXMgKi9cclxuICAgIHpvb21UYXNrcyhsZXZlbDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy56b29tTGV2ZWwgPSBsZXZlbDtcclxuICAgICAgICB0aGlzLnpvb20uZW1pdCh0aGlzLnpvb21MZXZlbCk7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXJXaWR0aCA9IHRoaXMuY2FsY3VsYXRlQ29udGFpbmVyV2lkdGgoKTtcclxuICAgICAgICB0aGlzLnNldERpbWVuc2lvbnMoKTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FudHRfYWN0aXZpdHknKS5zY3JvbGxMZWZ0ID0gMCAvLyByZXNldCBzY3JvbGwgbGVmdCwgcmVwbGFjZSB3aXRoIEBWaWV3Q2hpbGQ/XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEV4cGFuZCB0aGUgZ2FudHQgZ3JpZCBhbmQgYWN0aXZpdHkgYXJlYSBoZWlnaHQgKi9cclxuICAgIGV4cGFuZChmb3JjZT86IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB2YXIgdmVydGljYWxTY3JvbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FudHRfdmVydGljYWxfc2Nyb2xsJyk7XHJcbiAgICAgICAgdmFyIGdhbnR0QWN0aXZpdHlIZWlnaHQ6IHN0cmluZyA9IGAke3RoaXMuZ2FudHRTZXJ2aWNlLlRBU0tfQ0FDSEUubGVuZ3RoICogdGhpcy5nYW50dFNlcnZpY2Uucm93SGVpZ2h0ICsgdGhpcy5nYW50dFNlcnZpY2Uucm93SGVpZ2h0ICogM31weGA7XHJcblxyXG4gICAgICAgIGlmIChmb3JjZSAmJiB0aGlzLmFjdGl2aXR5QWN0aW9ucy5leHBhbmRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmdhbnR0QWN0aXZpdHlIZWlnaHQgPSBnYW50dEFjdGl2aXR5SGVpZ2h0O1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5hY3Rpdml0eUFjdGlvbnMuZXhwYW5kZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpdml0eUFjdGlvbnMuZXhwYW5kZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpdml0eUFjdGlvbnMuZXhwYW5kZWRJY29uID0gdGhpcy5kb3duVHJpYW5nbGU7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FudHRBY3Rpdml0eUhlaWdodCA9ICczMDBweCc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmVydGljYWxTY3JvbGwuc2Nyb2xsVG9wID0gMDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZpdHlBY3Rpb25zLmV4cGFuZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpdml0eUFjdGlvbnMuZXhwYW5kZWRJY29uID0gdGhpcy51cFRyaWFuZ2xlO1xyXG4gICAgICAgICAgICB0aGlzLmdhbnR0QWN0aXZpdHlIZWlnaHQgPSBnYW50dEFjdGl2aXR5SGVpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogR2V0IHRoZSBzdGF0dXMgaWNvbiB1bmljb2RlIHN0cmluZyAqL1xyXG4gICAgZ2V0U3RhdHVzSWNvbihzdGF0dXM6IHN0cmluZywgcGVyY2VudENvbXBsZXRlOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIHZhciBjaGVja01hcmtJY29uOiBzdHJpbmcgPSAnJiN4MjcxNDsnO1xyXG4gICAgICAgIHZhciB1cEJsYWNrUG9pbnRlcjogc3RyaW5nID0gJyYjeDI1YjI7JztcclxuICAgICAgICB2YXIgY3Jvc3NNYXJrSWNvbjogc3RyaW5nID0gJyYjeDI3MTg7JztcclxuXHJcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gXCJDb21wbGV0ZWRcIiB8fCBwZXJjZW50Q29tcGxldGUgPT09IDEwMCAmJiBzdGF0dXMgIT09IFwiRXJyb3JcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gY2hlY2tNYXJrSWNvbjtcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gXCJXYXJuaW5nXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVwQmxhY2tQb2ludGVyO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSBcIkVycm9yXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNyb3NzTWFya0ljb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuXHJcbiAgICAvKiogR2V0IHRoZSBzdGF0dXMgaWNvbiBjb2xvciAqL1xyXG4gICAgZ2V0U3RhdHVzSWNvbkNvbG9yKHN0YXR1czogc3RyaW5nLCBwZXJjZW50Q29tcGxldGU6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gXCJDb21wbGV0ZWRcIiB8fCBwZXJjZW50Q29tcGxldGUgPT09IDEwMCAmJiBzdGF0dXMgIT09IFwiRXJyb3JcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gJ2dyZWVuJztcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gXCJXYXJuaW5nXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdvcmFuZ2UnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSBcIkVycm9yXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdyZWQnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0R3JpZFNjYWxlU3R5bGUoKSB7XHJcbiAgICAgICAgdmFyIGhlaWdodCA9IHRoaXMuZ2FudHRTZXJ2aWNlLnJvd0hlaWdodDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuem9vbUxldmVsID09PSBab29taW5nW1pvb21pbmcuaG91cnNdKSB7XHJcbiAgICAgICAgICAgIGhlaWdodCAqPSAyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ2hlaWdodCc6IGhlaWdodCArICdweCcsXHJcbiAgICAgICAgICAgICdsaW5lLWhlaWdodCc6IGhlaWdodCArICdweCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlQ29udGFpbmVySGVpZ2h0KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FudHRTZXJ2aWNlLlRBU0tfQ0FDSEUubGVuZ3RoICogdGhpcy5nYW50dFNlcnZpY2Uucm93SGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlQ29udGFpbmVyV2lkdGgoKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAodGhpcy56b29tTGV2ZWwgPT09IFpvb21pbmdbWm9vbWluZy5ob3Vyc10pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2FudHRTZXJ2aWNlLlRJTUVfU0NBTEUubGVuZ3RoICogdGhpcy5nYW50dFNlcnZpY2UuaG91ckNlbGxXaWR0aCAqIDI0ICsgdGhpcy5nYW50dFNlcnZpY2UuaG91ckNlbGxXaWR0aFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdhbnR0U2VydmljZS5USU1FX1NDQUxFLmxlbmd0aCAqIHRoaXMuZ2FudHRTZXJ2aWNlLmNlbGxXaWR0aCArIHRoaXMuZ2FudHRTZXJ2aWNlLmNlbGxXaWR0aDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRTaXplcygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmdhbnR0QWN0aXZpdHlIZWlnaHQgPSB0aGlzLmFjdGl2aXR5Q29udGFpbmVyU2l6ZXMuaGVpZ2h0ICsgJ3B4JztcclxuICAgICAgICB0aGlzLmdhbnR0QWN0aXZpdHlXaWR0aCA9IHRoaXMuYWN0aXZpdHlDb250YWluZXJTaXplcy53aWR0aDtcclxuICAgIH1cclxuXHJcbn1cclxuIl19