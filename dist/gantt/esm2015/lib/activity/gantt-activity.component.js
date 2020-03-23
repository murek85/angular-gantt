/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { GanttService } from '../shared/services/gantt.service';
import { Zooming } from '../shared/interfaces';
export class GanttActivityComponent {
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
            ;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQtYWN0aXZpdHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vZ2FudHQvIiwic291cmNlcyI6WyJsaWIvYWN0aXZpdHkvZ2FudHQtYWN0aXZpdHkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBNEIsdUJBQXVCLEVBQXNCLE1BQU0sZUFBZSxDQUFDO0FBRWxLLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUVoRSxPQUFPLEVBQWlCLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBNE05RCxNQUFNLE9BQU8sc0JBQXNCOzs7OztJQWtEL0IsWUFDVyxJQUFnQixFQUNoQixZQUEwQjtRQUQxQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBakQzQixtQkFBYyxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO1FBRTlELGVBQVUsR0FBVyxVQUFVLENBQUEsQ0FBQyw2QkFBNkI7O1FBQzdELGlCQUFZLEdBQVcsVUFBVSxDQUFDLENBQUMsK0JBQStCOztRQUUxRSxTQUFJLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFFeEQsb0JBQWUsR0FBRztZQUNkLFFBQVEsRUFBRSxLQUFLO1lBQ2YsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO1NBQ2xDLENBQUM7UUFjRixjQUFTLEdBQVcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUzQyxpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUViLFVBQUssR0FBUTtZQUNqQixLQUFLLEVBQUUsSUFBSTtZQUNYLEdBQUcsRUFBRSxJQUFJO1NBQ1osQ0FBQztRQUVGLGVBQVUsR0FBRztZQUNULE1BQU0sRUFBRSxDQUFDO1lBQ1QsS0FBSyxFQUFFLENBQUM7U0FDWCxDQUFDO1FBRU0sU0FB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QUFrQjs7SUFDbEIsaURBQXFCOztJQUNyQixnREFBb0I7Ozs7O0lBRXBCLHdEQUFvQzs7SUFFcEMscURBQXlCOztJQUN6QixvREFBd0I7O0lBRXhCLDJDQUEyQzs7SUFFM0MsOENBQXFCOzs7OztJQUVyQix1Q0FHRTs7SUFFRiw0Q0FHRTs7Ozs7SUFFRixzQ0FBeUI7O0lBRXpCLDZDQUtFOztJQUdFLHNDQUF1Qjs7SUFDdkIsOENBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgQWZ0ZXJWaWV3SW5pdCwgVmlld0NoaWxkLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgT25DaGFuZ2VzLCBEb0NoZWNrIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBHYW50dFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvZ2FudHQuc2VydmljZSc7XHJcbmltcG9ydCB7IEdhbnR0Q29uZmlnIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2dhbnR0LWNvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSUdhbnR0T3B0aW9ucywgWm9vbWluZyB9IGZyb20gJy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdnYW50dC1hY3Rpdml0eScsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBjbGFzcz1cImFjdGlvbnMtYmFyXCI+XHJcbiAgICAgICAgPGRpdiBzdHlsZT1cImZsb2F0OiByaWdodFwiPlxyXG4gICAgICAgICAgICA8bGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIChjbGljayk9XCJ6b29tVGFza3MoJ2hvdXJzJylcIlxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogd2hpdGVzbW9rZTsgYm9yZGVyOiBub25lOyBmb250LXNpemU6IDE2cHg7IGN1cnNvcjogcG9pbnRlclwiPkhvdXI8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgPGxhYmVsPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwiem9vbVRhc2tzKCdkYXlzJylcIlxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogd2hpdGVzbW9rZTsgYm9yZGVyOiBub25lOyBmb250LXNpemU6IDE2cHg7IGN1cnNvcjogcG9pbnRlclwiPkRheTwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8YnV0dG9uIChjbGljayk9XCJleHBhbmQoKVwiXHJcbiAgICAgICAgICAgICAgICBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6IHdoaXRlc21va2U7IGJvcmRlcjogbm9uZTsgZm9udC1zaXplOiAyMXB4OyBjdXJzb3I6IHBvaW50ZXJcIlxyXG4gICAgICAgICAgICAgICAgW2lubmVySFRNTF09XCJhY3Rpdml0eUFjdGlvbnMuZXhwYW5kZWRJY29uXCI+PC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJncmlkXCIgI2dhbnR0R3JpZCBbbmdTdHlsZV09XCJ7ICdoZWlnaHQnOiBnYW50dEFjdGl2aXR5SGVpZ2h0LCAnd2lkdGgnOiBnYW50dFNlcnZpY2UuZ3JpZFdpZHRoICsgJ3B4J31cIj5cclxuICAgIDxkaXYgY2xhc3M9XCJncmlkLXNjYWxlXCIgW25nU3R5bGVdPVwic2V0R3JpZFNjYWxlU3R5bGUoKVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJncmlkLWhlYWQtY2VsbFwiXHJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgZ3JpZENvbHVtbnNcIiBbc3R5bGUud2lkdGhdPVwiY29sdW1uLndpZHRoICsgJ3B4J1wiXHJcbiAgICAgICAgICAgIFtzdHlsZS5sZWZ0XT1cImNvbHVtbi5sZWZ0ICsgJ3B4J1wiPlxyXG5cclxuICAgICAgICAgICAgPGxhYmVsPlxyXG4gICAgICAgICAgICAgICAge3tjb2x1bW4ubmFtZX19XHJcbiAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImNvbHVtbi5uYW1lID09PSAnRHVyYXRpb24nXCJcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT1cImZvbnQtd2VpZ2h0OmJvbGRcIj57eyBnYW50dFNlcnZpY2UuY2FsY3VsYXRlVG90YWxEdXJhdGlvbihnYW50dFNlcnZpY2UuVEFTS19DQUNIRSkgfX08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImdyaWQtaGVhZC1jZWxsXCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gKGNsaWNrKT1cInRvZ2dsZUFsbENoaWxkcmVuKClcIlxyXG4gICAgICAgICAgICAgICAgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZXNtb2tlOyBib3JkZXI6IG5vbmU7IGZvbnQtc2l6ZTogMjFweDsgY3Vyc29yOiBwb2ludGVyXCI+XHJcblxyXG4gICAgICAgICAgICAgICAge3sgdHJlZUV4cGFuZGVkID8gJyYjeDI1YjI7JyA6ICcmI3gyNWJjOycgfX1cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJncmlkLWRhdGFcIlxyXG4gICAgICAgICNnYW50dEdyaWREYXRhXHJcbiAgICAgICAgW25nU3R5bGVdPVwieyAnaGVpZ2h0JzogZ2FudHRTZXJ2aWNlLmNhbGN1bGF0ZUdhbnR0SGVpZ2h0KCkgfVwiPlxyXG5cclxuICAgIDxkaXYgI3Jvd1xyXG4gICAgICAgICpuZ0Zvcj1cImxldCBkYXRhIG9mIGdhbnR0U2VydmljZS5ncm91cERhdGEoZ2FudHRTZXJ2aWNlLlRBU0tfQ0FDSEUpXCJcclxuICAgICAgICAoY2xpY2spPVwidG9nZ2xlQ2hpbGRyZW4ocm93LCBkYXRhKVwiIGNsYXNzPVwiZ3JpZF9yb3dcIlxyXG4gICAgICAgIFtuZ1N0eWxlXT1cInNldEdyaWRSb3dTdHlsZShnYW50dFNlcnZpY2UuaXNQYXJlbnQoZGF0YS50cmVlUGF0aCkpXCJcclxuICAgICAgICBbYXR0ci5kYXRhLWlkXT1cImdhbnR0U2VydmljZS5zZXRJZFByZWZpeChkYXRhLmlkKVwiXHJcbiAgICAgICAgW2F0dHIuZGF0YS1pc1BhcmVudF09XCJnYW50dFNlcnZpY2UuaXNQYXJlbnQoZGF0YS50cmVlUGF0aClcIlxyXG4gICAgICAgIFthdHRyLmRhdGEtcGFyZW50aWRdPVwiZ2FudHRTZXJ2aWNlLnNldElkUHJlZml4KGRhdGEucGFyZW50SWQpXCI+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JpZC1jZWxsXCIgW25nU3R5bGVdPVwieyAnd2lkdGgnOiBncmlkQ29sdW1uc1swXS53aWR0aCArICdweCcgfVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBbaW5uZXJIVE1MXT1cImdldFN0YXR1c0ljb24oZGF0YS5zdGF0dXMsIGRhdGEucGVyY2VudENvbXBsZXRlKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmNvbG9yXT1cImdldFN0YXR1c0ljb25Db2xvcihkYXRhLnN0YXR1cywgZGF0YS5wZXJjZW50Q29tcGxldGUpXCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JpZC1jZWxsXCJcclxuICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsgJ3dpZHRoJzogZ3JpZENvbHVtbnNbMV0ud2lkdGggKyAncHgnLCAncGFkZGluZy1sZWZ0JzogZ2FudHRTZXJ2aWNlLmlzQ2hpbGQoZGF0YS50cmVlUGF0aCkgfVwiPlxyXG5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC10cmVlLWNvbnRlbnRcIj57e2RhdGEubmFtZX19PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JpZC1jZWxsXCIgW25nU3R5bGVdPVwieyAnd2lkdGgnOiBncmlkQ29sdW1uc1syXS53aWR0aCArICdweCcgfVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdj57eyBkYXRhLnBlcmNlbnRDb21wbGV0ZSB9fTwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyaWQtY2VsbFwiIFtuZ1N0eWxlXT1cInsgJ3dpZHRoJzogZ3JpZENvbHVtbnNbM10ud2lkdGggKyAncHgnfVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdj4ge3sgZ2FudHRTZXJ2aWNlLmNhbGN1bGF0ZUR1cmF0aW9uKGRhdGEpIH19PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJnYW50dC1hY3Rpdml0eVwiXHJcbiAgICAgICAgKHdpbmRvdzpyZXNpemUpPVwib25SZXNpemUoJGV2ZW50KVwiXHJcbiAgICAgICAgW25nU3R5bGVdPVwieyAnaGVpZ2h0JzogZ2FudHRBY3Rpdml0eUhlaWdodCwgJ3dpZHRoJzogZ2FudHRBY3Rpdml0eVdpZHRoIC0gMTggKyAncHgnfVwiPlxyXG5cclxuICAgICAgICA8dGltZS1zY2FsZSBbem9vbV09XCJ6b29tXCJcclxuICAgICAgICAgICAgW3pvb21MZXZlbF09XCJ6b29tTGV2ZWxcIlxyXG4gICAgICAgICAgICBbdGltZVNjYWxlXT1cImdhbnR0U2VydmljZS5USU1FX1NDQUxFXCJcclxuICAgICAgICAgICAgW2RpbWVuc2lvbnNdPVwiZGltZW5zaW9uc1wiPjwvdGltZS1zY2FsZT5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtYWN0aXZpdHktYXJlYVwiXHJcbiAgICAgICAgICAgICNnYW50dEFjdGl2aXR5QXJlYVxyXG4gICAgICAgICAgICBbbmdTdHlsZV09XCJ7ICdoZWlnaHQnOiBnYW50dFNlcnZpY2UuY2FsY3VsYXRlR2FudHRIZWlnaHQoKSwgJ3dpZHRoJzogY29udGFpbmVyV2lkdGggKyAncHgnfVwiPlxyXG5cclxuICAgICAgICAgICAgPGFjdGl2aXR5LWJhY2tncm91bmQgW3pvb21dPVwiem9vbVwiXHJcbiAgICAgICAgICAgICAgICBbem9vbUxldmVsXT1cInpvb21MZXZlbFwiXHJcbiAgICAgICAgICAgICAgICBbdGltZVNjYWxlXT1cImdhbnR0U2VydmljZS5USU1FX1NDQUxFXCJcclxuICAgICAgICAgICAgICAgIFt0YXNrc109XCJnYW50dFNlcnZpY2UuVEFTS19DQUNIRVwiPjwvYWN0aXZpdHktYmFja2dyb3VuZD5cclxuICAgICAgICAgICAgPGFjdGl2aXR5LWJhcnMgW3pvb21dPVwiem9vbVwiXHJcbiAgICAgICAgICAgICAgICBbem9vbUxldmVsXT1cInpvb21MZXZlbFwiXHJcbiAgICAgICAgICAgICAgICBbdGltZVNjYWxlXT1cImdhbnR0U2VydmljZS5USU1FX1NDQUxFXCJcclxuICAgICAgICAgICAgICAgIFtkaW1lbnNpb25zXT1cImRpbWVuc2lvbnNcIlxyXG4gICAgICAgICAgICAgICAgW3Rhc2tzXT1cImdhbnR0U2VydmljZS5UQVNLX0NBQ0hFXCI+PC9hY3Rpdml0eS1iYXJzPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtdmVydGljYWwtc2Nyb2xsXCJcclxuICAgICAgICAjdmVydGljYWxTY3JvbGxcclxuICAgICAgICAoc2Nyb2xsKT1cIm9uVmVydGljYWxTY3JvbGwodmVydGljYWxTY3JvbGwsIGdhbnR0R3JpZCwgZ2FudHRBY3Rpdml0eUFyZWEpXCJcclxuICAgICAgICBbbmdTdHlsZV09XCJ7J2Rpc3BsYXknOiBhY3Rpdml0eUFjdGlvbnMuZXhwYW5kZWQgPT09IHRydWUgPyAnbm9uZScgOiAnYmxvY2snIH1cIj5cclxuXHJcbiAgICAgICAgPGRpdiBbbmdTdHlsZV09XCJ7ICdoZWlnaHQnOiBnYW50dFNlcnZpY2UuY2FsY3VsYXRlR2FudHRIZWlnaHQoKSB9XCI+PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBzdHlsZXM6IFtgXHJcbiAgICAgICAgLmdhbnR0LWFjdGl2aXR5IHtcclxuICAgICAgICAgICAgLypvdmVyZmxvdy14OiBoaWRkZW47Ki9cclxuICAgICAgICAgICAgb3ZlcmZsb3cteDogYXV0bztcclxuICAgICAgICAgICAgaGVpZ2h0OiAyNTBweDtcclxuICAgICAgICAgICAgb3ZlcmZsb3cteTogaGlkZGVuO1xyXG4gICAgICAgICAgICBvdmVyZmxvdy14OiBzY3JvbGw7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgICAgICAgdmVydGljYWwtYWxpZ246IHRvcDtcclxuICAgICAgICAgICAgcG9zaXRpb246cmVsYXRpdmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5nYW50dC1hY3Rpdml0eS1hcmVhIHtcclxuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgICAgICBvdmVyZmxvdy14OiBoaWRkZW47XHJcbiAgICAgICAgICAgIG92ZXJmbG93LXk6IGhpZGRlbjtcclxuICAgICAgICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdhbnR0LXZlcnRpY2FsLXNjcm9sbCB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gICAgICAgICAgICBvdmVyZmxvdy14OiBoaWRkZW47XHJcbiAgICAgICAgICAgIG92ZXJmbG93LXk6IHNjcm9sbDtcclxuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgICAgICByaWdodDogMDtcclxuICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgICAgIGhlaWdodDogMjgzcHg7XHJcbiAgICAgICAgICAgIHdpZHRoOiAxOHB4O1xyXG4gICAgICAgICAgICB0b3A6IDcwcHg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5ncmlkIHtcclxuICAgICAgICAgICAgb3ZlcmZsb3cteDogaGlkZGVuO1xyXG4gICAgICAgICAgICBvdmVyZmxvdy15OiBoaWRkZW47XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgICAgICAgdmVydGljYWwtYWxpZ246IHRvcDtcclxuICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2NlY2VjZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdyaWQtc2NhbGUge1xyXG4gICAgICAgICAgICBjb2xvcjogIzZiNmI2YjtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2UwZTBlMDtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGVzbW9rZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdyaWQtaGVhZC1jZWxsIHtcclxuICAgICAgICAgICAgLypjb2xvcjogI2E2YTZhNjsqL1xyXG4gICAgICAgICAgICBib3JkZXItdG9wOiBub25lICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogbm9uZSAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICBsaW5lLWhlaWdodDogaW5oZXJpdDtcclxuICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xyXG4gICAgICAgICAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjY2VjZWNlO1xyXG4gICAgICAgICAgICAvKnRleHQtYWxpZ246IGNlbnRlcjsqL1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgICAgIGN1cnNvcjogZGVmYXVsdDtcclxuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgICAgICAtbW96LXVzZXItc2VsZWN0OiAtbW96LW5vbmU7XHJcbiAgICAgICAgICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5ncmlkLWRhdGEge1xyXG4gICAgICAgICAgICBvdmVyZmxvdzpoaWRkZW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5ncmlkLXJvdyB7XHJcbiAgICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTBlMGUwO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5ncmlkLXJvdzpob3ZlciB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlZWVlZWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5ncmlkLWNlbGwge1xyXG4gICAgICAgICAgICBib3JkZXItcmlnaHQ6IG5vbmU7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjNDU0NTQ1O1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XHJcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogNnB4O1xyXG4gICAgICAgICAgICBwYWRkaW5nLXJpZ2h0OiA2cHg7XHJcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICAgIH1cclxuICAgICAgICAuYWN0aW9ucy1iYXIge1xyXG4gICAgICAgICAgICAvKmJvcmRlci10b3A6IDFweCBzb2xpZCAjY2VjZWNlOyovXHJcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTBlMGUwO1xyXG4gICAgICAgICAgICBjbGVhcjogYm90aDtcclxuICAgICAgICAgICAgLyptYXJnaW4tdG9wOiA5MHB4OyovXHJcbiAgICAgICAgICAgIGhlaWdodDogMjhweDtcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogd2hpdGVzbW9rZTtcclxuICAgICAgICAgICAgY29sb3I6ICM0OTQ5NDk7XHJcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiBBcmlhbCwgc2Fucy1zZXJpZjtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDE1cHg7XHJcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAyNXB4O1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ2FudHQtdHJlZS1jb250ZW50IHtcclxuICAgICAgICAgICAgcGFkZGluZy1sZWZ0OjE1cHg7XHJcbiAgICAgICAgfVxyXG4gICAgYF0sXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcclxufSlcclxuZXhwb3J0IGNsYXNzIEdhbnR0QWN0aXZpdHlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIERvQ2hlY2sge1xyXG4gICAgQElucHV0KCkgcHJvamVjdDogYW55O1xyXG4gICAgQElucHV0KCkgb3B0aW9uczogYW55O1xyXG4gICAgQE91dHB1dCgpIG9uR3JpZFJvd0NsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICAgIHByaXZhdGUgdXBUcmlhbmdsZTogc3RyaW5nID0gJyYjeDI1YjI7JyAvLyBCTEFDSyBVUC1QT0lOVElORyBUUklBTkdMRVxyXG4gICAgcHJpdmF0ZSBkb3duVHJpYW5nbGU6IHN0cmluZyA9ICcmI3gyNWJjOyc7IC8vIEJMQUNLIERPV04tUE9JTlRJTkcgVFJJQU5HTEVcclxuXHJcbiAgICB6b29tOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG5cclxuICAgIGFjdGl2aXR5QWN0aW9ucyA9IHtcclxuICAgICAgICBleHBhbmRlZDogZmFsc2UsXHJcbiAgICAgICAgZXhwYW5kZWRJY29uOiB0aGlzLmRvd25UcmlhbmdsZVxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIHRpbWVTY2FsZTogYW55O1xyXG5cclxuICAgIHByaXZhdGUgc3RhcnQ6IERhdGU7XHJcbiAgICBwcml2YXRlIGVuZDogRGF0ZTtcclxuICAgIGNvbnRhaW5lckhlaWdodDogYW55O1xyXG4gICAgY29udGFpbmVyV2lkdGg6IGFueTtcclxuXHJcbiAgICBwcml2YXRlIGFjdGl2aXR5Q29udGFpbmVyU2l6ZXM6IGFueTtcclxuXHJcbiAgICBnYW50dEFjdGl2aXR5SGVpZ2h0OiBhbnk7XHJcbiAgICBnYW50dEFjdGl2aXR5V2lkdGg6IGFueTtcclxuXHJcbiAgICB6b29tTGV2ZWw6IHN0cmluZyA9IFpvb21pbmdbWm9vbWluZy5ob3Vyc107XHJcblxyXG4gICAgdHJlZUV4cGFuZGVkID0gZmFsc2U7XHJcblxyXG4gICAgcHJpdmF0ZSBzY2FsZTogYW55ID0ge1xyXG4gICAgICAgIHN0YXJ0OiBudWxsLFxyXG4gICAgICAgIGVuZDogbnVsbFxyXG4gICAgfTtcclxuXHJcbiAgICBkaW1lbnNpb25zID0ge1xyXG4gICAgICAgIGhlaWdodDogMCxcclxuICAgICAgICB3aWR0aDogMFxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGRhdGE6IGFueVtdID0gW107XHJcblxyXG4gICAgcHVibGljIGdyaWRDb2x1bW5zOiBhbnlbXSA9IFtcclxuICAgICAgICB7IG5hbWU6ICcnLCBsZWZ0OiAwLCB3aWR0aDogMTYgfSxcclxuICAgICAgICB7IG5hbWU6ICdUYXNrJywgbGVmdDogMjAsIHdpZHRoOiAzMzAgfSxcclxuICAgICAgICB7IG5hbWU6ICclJywgbGVmdDogOCwgd2lkdGg6IDQwIH0sXHJcbiAgICAgICAgeyBuYW1lOiAnRHVyYXRpb24nLCBsZWZ0OiAxNCwgd2lkdGg6IDE0MCB9XHJcbiAgICBdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyBlbGVtOiBFbGVtZW50UmVmLFxyXG4gICAgICAgIHB1YmxpYyBnYW50dFNlcnZpY2U6IEdhbnR0U2VydmljZSkge1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIC8vIENhY2hlIHRoZSBwcm9qZWN0IGRhdGEgYW5kIG9ubHkgd29yayB3aXRoIHRoYXQuIE9ubHkgc2hvdyBwYXJlbnQgdGFza3MgYnkgZGVmYXVsdFxyXG4gICAgICAgIHRoaXMuZ2FudHRTZXJ2aWNlLlRBU0tfQ0FDSEUgPSB0aGlzLnByb2plY3QudGFza3Muc2xpY2UoMCkuZmlsdGVyKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0udHJlZVBhdGguc3BsaXQoJy8nKS5sZW5ndGggPT09IDE7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5nYW50dFNlcnZpY2UuVElNRV9TQ0FMRSA9IHRoaXMuZ2FudHRTZXJ2aWNlLmNhbGN1bGF0ZVNjYWxlKHRoaXMub3B0aW9ucy5zY2FsZS5zdGFydCwgdGhpcy5vcHRpb25zLnNjYWxlLmVuZCk7XHJcblxyXG4gICAgICAgIHRoaXMuem9vbUxldmVsID0gdGhpcy5vcHRpb25zLnpvb21pbmc7XHJcbiAgICAgICAgdGhpcy5zdGFydCA9IHRoaXMub3B0aW9ucy5zY2FsZS5zdGFydDtcclxuICAgICAgICB0aGlzLmVuZCA9IHRoaXMub3B0aW9ucy5zY2FsZS5lbmQ7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXJXaWR0aCA9IHRoaXMuY2FsY3VsYXRlQ29udGFpbmVyV2lkdGgoKTtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lckhlaWdodCA9IHRoaXMuY2FsY3VsYXRlQ29udGFpbmVySGVpZ2h0KCk7XHJcbiAgICAgICAgdGhpcy5hY3Rpdml0eUNvbnRhaW5lclNpemVzID0gdGhpcy5nYW50dFNlcnZpY2UuY2FsY3VsYXRlQWN0aXZpdHlDb250YWluZXJEaW1lbnNpb25zKCk7XHJcblxyXG4gICAgICAgIC8vIGltcG9ydGFudCB0aGF0IHRoZXNlIGFyZSBjYWxsZWQgbGFzdCBhcyBpdCByZWxpZXMgb24gdmFsdWVzIGNhbGN1bGF0ZWQgYWJvdmUuXHJcbiAgICAgICAgdGhpcy5zZXRTY2FsZSgpO1xyXG4gICAgICAgIHRoaXMuc2V0RGltZW5zaW9ucygpO1xyXG4gICAgICAgIHRoaXMuc2V0U2l6ZXMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5leHBhbmQoKTsgLy8gZGVmYXVsdCB0byBleHBhbmRlZFxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDdXN0b20gbW9kZWwgY2hlY2sgKi9cclxuICAgIG5nRG9DaGVjaygpIHtcclxuICAgICAgICAvLyBkbyBhIGNoZWNrIHRvIHNlZSB3aGV0aGVyIGFueSBuZXcgdGFza3MgaGF2ZSBiZWVuIGFkZGVkLiBJZiB0aGUgdGFzayBpcyBhIGNoaWxkIHRoZW4gcHVzaCBpbnRvIGFycmF5IGlmIHRyZWUgZXhwYW5kZWQ/XHJcbiAgICAgICAgdmFyIHRhc2tzQWRkZWQgPSB0aGlzLmdhbnR0U2VydmljZS5kb1Rhc2tDaGVjayh0aGlzLnByb2plY3QudGFza3MsIHRoaXMudHJlZUV4cGFuZGVkKTtcclxuXHJcbiAgICAgICAgLy8gb25seSBmb3JjZSBleHBhbmQgaWYgdGFza3MgYXJlIGFkZGVkIGFuZCB0cmVlIGlzIGFscmVhZHkgZXhwYW5kZWRcclxuICAgICAgICBpZiAodGFza3NBZGRlZCAmJiB0aGlzLmFjdGl2aXR5QWN0aW9ucy5leHBhbmRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmV4cGFuZCh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIE9uIHZlcnRpY2FsIHNjcm9sbCBzZXQgdGhlIHNjcm9sbCB0b3Agb2YgZ3JpZCBhbmQgYWN0aXZpdHkgICovXHJcbiAgICBvblZlcnRpY2FsU2Nyb2xsKHZlcnRpY2FsU2Nyb2xsOiBhbnksIGdhbnR0R3JpZDogYW55LCBnYW50dEFjdGl2aXR5QXJlYTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5nYW50dFNlcnZpY2Uuc2Nyb2xsVG9wKHZlcnRpY2FsU2Nyb2xsLCBnYW50dEdyaWQsIGdhbnR0QWN0aXZpdHlBcmVhKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogUmVtb3ZlcyBvciBhZGRzIGNoaWxkcmVuIGZvciBnaXZlbiBwYXJlbnQgdGFza3MgYmFjayBpbnRvIERPTSBieSB1cGRhdGluZyBUQVNLX0NBQ0hFICovXHJcbiAgICB0b2dnbGVDaGlsZHJlbihyb3dFbGVtOiBhbnksIHRhc2s6IGFueSkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBpc1BhcmVudDogYm9vbGVhbiA9IFwidHJ1ZVwiID09PSByb3dFbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1pc3BhcmVudCcpO1xyXG4gICAgICAgICAgICBsZXQgcGFyZW50SWQ6IHN0cmluZyA9IHJvd0VsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXBhcmVudGlkJykucmVwbGFjZShcIl9cIiwgXCJcIik7IC8vIHJlbW92ZSBpZCBwcmVmaXhcclxuICAgICAgICAgICAgbGV0IGNoaWxkcmVuOiBhbnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wYXJlbnRpZD0nICsgcm93RWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFyZW50aWQnKSArICddW2RhdGEtaXNwYXJlbnQ9ZmFsc2VdJyk7XHJcblxyXG4gICAgICAgICAgICAvLyB1c2UgdGhlIHRhc2sgY2FjaGUgdG8gYWxsb3cgZGVsZXRpbmcgb2YgaXRlbXMgd2l0aG91dCBwb2xsdXRpbmcgdGhlIHByb2plY3QudGFza3MgYXJyYXlcclxuICAgICAgICAgICAgaWYgKGlzUGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgY2hpbGRyZW4gZnJvbSB0aGUgRE9NIGFzIHdlIGRvbid0IHdhbnQgdGhlbSBpZiB3ZSBhcmUgY29sbGFwc2luZyB0aGUgcGFyZW50XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZHJlbklkczogYW55W10gPSB0aGlzLmdhbnR0U2VydmljZS5UQVNLX0NBQ0hFLmZpbHRlcigodGFzazogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXNrLnBhcmVudElkID09IHBhcmVudElkICYmIHRhc2sudHJlZVBhdGguc3BsaXQoJy8nKS5sZW5ndGggPiAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLm1hcCgoaXRlbTogYW55KSA9PiB7IHJldHVybiBpdGVtLmlkIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbklkcy5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlbW92ZWRJbmRleCA9IHRoaXMuZ2FudHRTZXJ2aWNlLlRBU0tfQ0FDSEUubWFwKChpdGVtOiBhbnkpID0+IHsgcmV0dXJuIGl0ZW0uaWQgfSkuaW5kZXhPZihpdGVtKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FudHRTZXJ2aWNlLlRBU0tfQ0FDSEUuc3BsaWNlKHJlbW92ZWRJbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2aXR5QWN0aW9ucy5leHBhbmRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBDSEVDSyB0aGUgcHJvamVjdCBjYWNoZSB0byBzZWUgaWYgdGhpcyBwYXJlbnQgaWQgaGFzIGFueSBjaGlsZHJlblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFuZCBpZiBzbyBwdXNoIHRoZW0gYmFjayBpbnRvIGFycmF5IHNvIERPTSBpcyB1cGRhdGVkXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkcmVuVGFza3M6IGFueVtdID0gdGhpcy5wcm9qZWN0LnRhc2tzLmZpbHRlcigodGFzazogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXNrLnBhcmVudElkID09PSBwYXJlbnRJZCAmJiB0YXNrLnRyZWVQYXRoLnNwbGl0KCcvJykubGVuZ3RoID4gMTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW5UYXNrcy5mb3JFYWNoKCh0YXNrOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW50dFNlcnZpY2UuVEFTS19DQUNIRS5wdXNoKHRhc2spO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hY3Rpdml0eUFjdGlvbnMuZXhwYW5kZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBhbmQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLm9uR3JpZFJvd0NsaWNrLmVtaXQodGFzayk7XHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKGVycikgeyB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFJlbW92ZXMgb3IgYWRkcyBjaGlsZHJlbiB0YXNrcyBiYWNrIGludG8gRE9NIGJ5IHVwZGF0aW5nIFRBU0tfQ0FDSEUgKi9cclxuICAgIHRvZ2dsZUFsbENoaWxkcmVuKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZHJlbjogYW55ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtaXNwYXJlbnQ9ZmFsc2VdJyk7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZHJlbklkczogc3RyaW5nW10gPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChjaGlsZHJlbikubWFwKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpLnJlcGxhY2UoXCJfXCIsIFwiXCIpOyAvLyByZW1vdmUgaWQgcHJlZml4XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gcHVzaCBhbGwgdGhlIGNoaWxkcmVuIGFycmF5IGl0ZW1zIGludG8gY2FjaGVcclxuICAgICAgICAgICAgaWYgKHRoaXMudHJlZUV4cGFuZGVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZHJlbklkczogc3RyaW5nW10gPSB0aGlzLmdhbnR0U2VydmljZS5UQVNLX0NBQ0hFLmZpbHRlcigodGFzazogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXNrLnRyZWVQYXRoLnNwbGl0KCcvJykubGVuZ3RoID4gMTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5tYXAoKGl0ZW06IGFueSkgPT4geyByZXR1cm4gaXRlbS5pZCB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW5JZHMuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZW1vdmVkSW5kZXggPSB0aGlzLmdhbnR0U2VydmljZS5UQVNLX0NBQ0hFLm1hcCgoaXRlbTogYW55KSA9PiB7IHJldHVybiBpdGVtLmlkIH0pLmluZGV4T2YoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FudHRTZXJ2aWNlLlRBU0tfQ0FDSEUuc3BsaWNlKHJlbW92ZWRJbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy50cmVlRXhwYW5kZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hY3Rpdml0eUFjdGlvbnMuZXhwYW5kZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIGdldCBhbGwgY2hpbGRyZW4gdGFza3MgaW4gcHJvamVjdCBpbnB1dFxyXG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkcmVuVGFza3M6IGFueVtdID0gdGhpcy5wcm9qZWN0LnRhc2tzLmZpbHRlcigodGFzazogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhc2sudHJlZVBhdGguc3BsaXQoJy8nKS5sZW5ndGggPiAxO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBmaWx0ZXIgb3V0IHRoZXNlIGNoaWxkcmVuIGFzIHRoZXkgYWxyZWFkeSBleGlzdCBpbiB0YXNrIGNhY2hlXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW5UYXNrcyA9IGNoaWxkcmVuVGFza3MuZmlsdGVyKCh0YXNrOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkcmVuSWRzLmluZGV4T2YodGFzay5pZCkgPT09IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuVGFza3MuZm9yRWFjaCgodGFzazogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW50dFNlcnZpY2UuVEFTS19DQUNIRS5wdXNoKHRhc2spO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy50cmVlRXhwYW5kZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2aXR5QWN0aW9ucy5leHBhbmRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5kKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7IH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogT24gcmVzaXplIG9mIGJyb3dzZXIgd2luZG93IGR5bmFtaWNhbGx5IGFkanVzdCBnYW50dCBhY3Rpdml0eSBoZWlnaHQgYW5kIHdpZHRoICovXHJcbiAgICBvblJlc2l6ZShldmVudDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGFjdGl2aXR5Q29udGFpbmVyU2l6ZXMgPSB0aGlzLmdhbnR0U2VydmljZS5jYWxjdWxhdGVBY3Rpdml0eUNvbnRhaW5lckRpbWVuc2lvbnMoKTtcclxuICAgICAgICBpZiAodGhpcy5hY3Rpdml0eUFjdGlvbnMuZXhwYW5kZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW50dEFjdGl2aXR5SGVpZ2h0ID0gdGhpcy5nYW50dFNlcnZpY2UuVEFTS19DQUNIRS5sZW5ndGggKiB0aGlzLmdhbnR0U2VydmljZS5yb3dIZWlnaHQgKyB0aGlzLmdhbnR0U2VydmljZS5yb3dIZWlnaHQgKiAzICsgJ3B4JztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmdhbnR0QWN0aXZpdHlIZWlnaHQgPSBhY3Rpdml0eUNvbnRhaW5lclNpemVzLmhlaWdodCArICdweCc7O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5nYW50dEFjdGl2aXR5V2lkdGggPSBhY3Rpdml0eUNvbnRhaW5lclNpemVzLndpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFNjYWxlKCkge1xyXG4gICAgICAgIHRoaXMuc2NhbGUuc3RhcnQgPSB0aGlzLnN0YXJ0O1xyXG4gICAgICAgIHRoaXMuc2NhbGUuZW5kID0gdGhpcy5lbmQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGltZW5zaW9ucygpIHtcclxuICAgICAgICB0aGlzLmRpbWVuc2lvbnMuaGVpZ2h0ID0gdGhpcy5jb250YWluZXJIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5kaW1lbnNpb25zLndpZHRoID0gdGhpcy5jb250YWluZXJXaWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRHcmlkUm93U3R5bGUoaXNQYXJlbnQ6IGJvb2xlYW4pOiBhbnkge1xyXG4gICAgICAgIGlmIChpc1BhcmVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgJ2hlaWdodCc6IHRoaXMuZ2FudHRTZXJ2aWNlLnJvd0hlaWdodCArICdweCcsXHJcbiAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiB0aGlzLmdhbnR0U2VydmljZS5yb3dIZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgJ2ZvbnQtd2VpZ2h0JzogJ2JvbGQnLFxyXG4gICAgICAgICAgICAgICAgJ2N1cnNvcic6ICdwb2ludGVyJ1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ2hlaWdodCc6IHRoaXMuZ2FudHRTZXJ2aWNlLnJvd0hlaWdodCArICdweCcsXHJcbiAgICAgICAgICAgICdsaW5lLWhlaWdodCc6IHRoaXMuZ2FudHRTZXJ2aWNlLnJvd0hlaWdodCArICdweCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBTZXQgdGhlIHpvb20gbGV2ZWwgZS5nIGhvdXJzLCBkYXlzICovXHJcbiAgICB6b29tVGFza3MobGV2ZWw6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuem9vbUxldmVsID0gbGV2ZWw7XHJcbiAgICAgICAgdGhpcy56b29tLmVtaXQodGhpcy56b29tTGV2ZWwpO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyV2lkdGggPSB0aGlzLmNhbGN1bGF0ZUNvbnRhaW5lcldpZHRoKCk7XHJcbiAgICAgICAgdGhpcy5zZXREaW1lbnNpb25zKCk7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbnR0X2FjdGl2aXR5Jykuc2Nyb2xsTGVmdCA9IDAgLy8gcmVzZXQgc2Nyb2xsIGxlZnQsIHJlcGxhY2Ugd2l0aCBAVmlld0NoaWxkP1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBFeHBhbmQgdGhlIGdhbnR0IGdyaWQgYW5kIGFjdGl2aXR5IGFyZWEgaGVpZ2h0ICovXHJcbiAgICBleHBhbmQoZm9yY2U/OiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdmFyIHZlcnRpY2FsU2Nyb2xsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbnR0X3ZlcnRpY2FsX3Njcm9sbCcpO1xyXG4gICAgICAgIHZhciBnYW50dEFjdGl2aXR5SGVpZ2h0OiBzdHJpbmcgPSBgJHt0aGlzLmdhbnR0U2VydmljZS5UQVNLX0NBQ0hFLmxlbmd0aCAqIHRoaXMuZ2FudHRTZXJ2aWNlLnJvd0hlaWdodCArIHRoaXMuZ2FudHRTZXJ2aWNlLnJvd0hlaWdodCAqIDN9cHhgO1xyXG5cclxuICAgICAgICBpZiAoZm9yY2UgJiYgdGhpcy5hY3Rpdml0eUFjdGlvbnMuZXhwYW5kZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW50dEFjdGl2aXR5SGVpZ2h0ID0gZ2FudHRBY3Rpdml0eUhlaWdodDtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYWN0aXZpdHlBY3Rpb25zLmV4cGFuZGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZpdHlBY3Rpb25zLmV4cGFuZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZpdHlBY3Rpb25zLmV4cGFuZGVkSWNvbiA9IHRoaXMuZG93blRyaWFuZ2xlO1xyXG4gICAgICAgICAgICB0aGlzLmdhbnR0QWN0aXZpdHlIZWlnaHQgPSAnMzAwcHgnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZlcnRpY2FsU2Nyb2xsLnNjcm9sbFRvcCA9IDA7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGl2aXR5QWN0aW9ucy5leHBhbmRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZpdHlBY3Rpb25zLmV4cGFuZGVkSWNvbiA9IHRoaXMudXBUcmlhbmdsZTtcclxuICAgICAgICAgICAgdGhpcy5nYW50dEFjdGl2aXR5SGVpZ2h0ID0gZ2FudHRBY3Rpdml0eUhlaWdodDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEdldCB0aGUgc3RhdHVzIGljb24gdW5pY29kZSBzdHJpbmcgKi9cclxuICAgIGdldFN0YXR1c0ljb24oc3RhdHVzOiBzdHJpbmcsIHBlcmNlbnRDb21wbGV0ZTogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICB2YXIgY2hlY2tNYXJrSWNvbjogc3RyaW5nID0gJyYjeDI3MTQ7JztcclxuICAgICAgICB2YXIgdXBCbGFja1BvaW50ZXI6IHN0cmluZyA9ICcmI3gyNWIyOyc7XHJcbiAgICAgICAgdmFyIGNyb3NzTWFya0ljb246IHN0cmluZyA9ICcmI3gyNzE4Oyc7XHJcblxyXG4gICAgICAgIGlmIChzdGF0dXMgPT09IFwiQ29tcGxldGVkXCIgfHwgcGVyY2VudENvbXBsZXRlID09PSAxMDAgJiYgc3RhdHVzICE9PSBcIkVycm9yXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNoZWNrTWFya0ljb247XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09IFwiV2FybmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1cEJsYWNrUG9pbnRlcjtcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gXCJFcnJvclwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjcm9zc01hcmtJY29uO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEdldCB0aGUgc3RhdHVzIGljb24gY29sb3IgKi9cclxuICAgIGdldFN0YXR1c0ljb25Db2xvcihzdGF0dXM6IHN0cmluZywgcGVyY2VudENvbXBsZXRlOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmIChzdGF0dXMgPT09IFwiQ29tcGxldGVkXCIgfHwgcGVyY2VudENvbXBsZXRlID09PSAxMDAgJiYgc3RhdHVzICE9PSBcIkVycm9yXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdncmVlbic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09IFwiV2FybmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnb3JhbmdlJztcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gXCJFcnJvclwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAncmVkJztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEdyaWRTY2FsZVN0eWxlKCkge1xyXG4gICAgICAgIHZhciBoZWlnaHQgPSB0aGlzLmdhbnR0U2VydmljZS5yb3dIZWlnaHQ7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnpvb21MZXZlbCA9PT0gWm9vbWluZ1tab29taW5nLmhvdXJzXSkge1xyXG4gICAgICAgICAgICBoZWlnaHQgKj0gMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICdoZWlnaHQnOiBoZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAnbGluZS1oZWlnaHQnOiBoZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAnd2lkdGgnOiB0aGlzLmdhbnR0U2VydmljZS5ncmlkV2lkdGggKyAncHgnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZUNvbnRhaW5lckhlaWdodCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdhbnR0U2VydmljZS5UQVNLX0NBQ0hFLmxlbmd0aCAqIHRoaXMuZ2FudHRTZXJ2aWNlLnJvd0hlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZUNvbnRhaW5lcldpZHRoKCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHRoaXMuem9vbUxldmVsID09PSBab29taW5nW1pvb21pbmcuaG91cnNdKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdhbnR0U2VydmljZS5USU1FX1NDQUxFLmxlbmd0aCAqIHRoaXMuZ2FudHRTZXJ2aWNlLmhvdXJDZWxsV2lkdGggKiAyNCArIHRoaXMuZ2FudHRTZXJ2aWNlLmhvdXJDZWxsV2lkdGhcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nYW50dFNlcnZpY2UuVElNRV9TQ0FMRS5sZW5ndGggKiB0aGlzLmdhbnR0U2VydmljZS5jZWxsV2lkdGggKyB0aGlzLmdhbnR0U2VydmljZS5jZWxsV2lkdGg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0U2l6ZXMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5nYW50dEFjdGl2aXR5SGVpZ2h0ID0gdGhpcy5hY3Rpdml0eUNvbnRhaW5lclNpemVzLmhlaWdodCArICdweCc7XHJcbiAgICAgICAgdGhpcy5nYW50dEFjdGl2aXR5V2lkdGggPSB0aGlzLmFjdGl2aXR5Q29udGFpbmVyU2l6ZXMud2lkdGg7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==