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
            { name: 'Task', left: 20, width: 330 }
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
            'line-height': height + 'px'
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
        <div style="float: right"></div>
    </div>
    <div class="grid" #ganttGrid [ngStyle]="{ 'height': ganttActivityHeight }">
    <div class="grid-scale" [ngStyle]="setGridScaleStyle()">
        <div class="grid-head-cell"
            *ngFor="let column of gridColumns" [style.width]="column.width + 'px'"
            [style.left]="column.left + 'px'">

            <label>
                {{column.name}}
            </label>
        </div>
    </div>
    <div class="grid-data"
        #ganttGridData
        [ngStyle]="{ 'height': ganttService.calculateGanttHeight() }">

    <div #row
        *ngFor="let data of ganttService.groupData(ganttService.TASK_CACHE)"
        (click)="toggleChildren(row, data)" class="grid-row"
        [ngStyle]="setGridRowStyle(ganttService.isParent(data.treePath))"
        [attr.data-id]="ganttService.setIdPrefix(data.id)"
        [attr.data-isParent]="ganttService.isParent(data.treePath)"
        [attr.data-parentid]="ganttService.setIdPrefix(data.parentId)">

            <div class="grid-cell"
                [ngStyle]="{ 'width': gridColumns[1].width + 'px', 'padding-left': ganttService.isChild(data.treePath) }">

                <div class="gantt-tree-content">{{data.name}}</div>
            </div>
        </div>
    </div>
    </div>
    <div class="gantt-activity"
        (window:resize)="onResize($event)"
        [ngStyle]="{ 'height': ganttActivityHeight, 'width': ganttActivityWidth + 36 + 'px'}">

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQtYWN0aXZpdHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1nYW50dC8iLCJzb3VyY2VzIjpbImxpYi9hY3Rpdml0eS9nYW50dC1hY3Rpdml0eS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUE0Qix1QkFBdUIsRUFBc0IsTUFBTSxlQUFlLENBQUM7QUFFbEssT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRWhFLE9BQU8sRUFBaUIsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUE2SzlELE1BQU0sT0FBTyxzQkFBc0I7Ozs7O0lBZ0QvQixZQUNXLElBQWdCLEVBQ2hCLFlBQTBCO1FBRDFCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUEvQzNCLG1CQUFjLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFFOUQsZUFBVSxHQUFXLFVBQVUsQ0FBQSxDQUFDLDZCQUE2Qjs7UUFDN0QsaUJBQVksR0FBVyxVQUFVLENBQUMsQ0FBQywrQkFBK0I7O1FBRTFFLFNBQUksR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUV4RCxvQkFBZSxHQUFHO1lBQ2QsUUFBUSxFQUFFLEtBQUs7WUFDZixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7U0FDbEMsQ0FBQztRQWNGLGNBQVMsR0FBVyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTNDLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBRWIsVUFBSyxHQUFRO1lBQ2pCLEtBQUssRUFBRSxJQUFJO1lBQ1gsR0FBRyxFQUFFLElBQUk7U0FDWixDQUFDO1FBRUYsZUFBVSxHQUFHO1lBQ1QsTUFBTSxFQUFFLENBQUM7WUFDVCxLQUFLLEVBQUUsQ0FBQztTQUNYLENBQUM7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eyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLCBBZnRlclZpZXdJbml0LCBWaWV3Q2hpbGQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBPbkNoYW5nZXMsIERvQ2hlY2sgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEdhbnR0U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9nYW50dC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR2FudHRDb25maWcgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvZ2FudHQtY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJR2FudHRPcHRpb25zLCBab29taW5nIH0gZnJvbSAnLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2dhbnR0LWFjdGl2aXR5JyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwiYWN0aW9ucy1iYXJcIj5cclxuICAgICAgICA8ZGl2IHN0eWxlPVwiZmxvYXQ6IHJpZ2h0XCI+PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJncmlkXCIgI2dhbnR0R3JpZCBbbmdTdHlsZV09XCJ7ICdoZWlnaHQnOiBnYW50dEFjdGl2aXR5SGVpZ2h0IH1cIj5cclxuICAgIDxkaXYgY2xhc3M9XCJncmlkLXNjYWxlXCIgW25nU3R5bGVdPVwic2V0R3JpZFNjYWxlU3R5bGUoKVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJncmlkLWhlYWQtY2VsbFwiXHJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgZ3JpZENvbHVtbnNcIiBbc3R5bGUud2lkdGhdPVwiY29sdW1uLndpZHRoICsgJ3B4J1wiXHJcbiAgICAgICAgICAgIFtzdHlsZS5sZWZ0XT1cImNvbHVtbi5sZWZ0ICsgJ3B4J1wiPlxyXG5cclxuICAgICAgICAgICAgPGxhYmVsPlxyXG4gICAgICAgICAgICAgICAge3tjb2x1bW4ubmFtZX19XHJcbiAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJncmlkLWRhdGFcIlxyXG4gICAgICAgICNnYW50dEdyaWREYXRhXHJcbiAgICAgICAgW25nU3R5bGVdPVwieyAnaGVpZ2h0JzogZ2FudHRTZXJ2aWNlLmNhbGN1bGF0ZUdhbnR0SGVpZ2h0KCkgfVwiPlxyXG5cclxuICAgIDxkaXYgI3Jvd1xyXG4gICAgICAgICpuZ0Zvcj1cImxldCBkYXRhIG9mIGdhbnR0U2VydmljZS5ncm91cERhdGEoZ2FudHRTZXJ2aWNlLlRBU0tfQ0FDSEUpXCJcclxuICAgICAgICAoY2xpY2spPVwidG9nZ2xlQ2hpbGRyZW4ocm93LCBkYXRhKVwiIGNsYXNzPVwiZ3JpZC1yb3dcIlxyXG4gICAgICAgIFtuZ1N0eWxlXT1cInNldEdyaWRSb3dTdHlsZShnYW50dFNlcnZpY2UuaXNQYXJlbnQoZGF0YS50cmVlUGF0aCkpXCJcclxuICAgICAgICBbYXR0ci5kYXRhLWlkXT1cImdhbnR0U2VydmljZS5zZXRJZFByZWZpeChkYXRhLmlkKVwiXHJcbiAgICAgICAgW2F0dHIuZGF0YS1pc1BhcmVudF09XCJnYW50dFNlcnZpY2UuaXNQYXJlbnQoZGF0YS50cmVlUGF0aClcIlxyXG4gICAgICAgIFthdHRyLmRhdGEtcGFyZW50aWRdPVwiZ2FudHRTZXJ2aWNlLnNldElkUHJlZml4KGRhdGEucGFyZW50SWQpXCI+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JpZC1jZWxsXCJcclxuICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsgJ3dpZHRoJzogZ3JpZENvbHVtbnNbMV0ud2lkdGggKyAncHgnLCAncGFkZGluZy1sZWZ0JzogZ2FudHRTZXJ2aWNlLmlzQ2hpbGQoZGF0YS50cmVlUGF0aCkgfVwiPlxyXG5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC10cmVlLWNvbnRlbnRcIj57e2RhdGEubmFtZX19PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJnYW50dC1hY3Rpdml0eVwiXHJcbiAgICAgICAgKHdpbmRvdzpyZXNpemUpPVwib25SZXNpemUoJGV2ZW50KVwiXHJcbiAgICAgICAgW25nU3R5bGVdPVwieyAnaGVpZ2h0JzogZ2FudHRBY3Rpdml0eUhlaWdodCwgJ3dpZHRoJzogZ2FudHRBY3Rpdml0eVdpZHRoICsgMzYgKyAncHgnfVwiPlxyXG5cclxuICAgICAgICA8dGltZS1zY2FsZSBbem9vbV09XCJ6b29tXCJcclxuICAgICAgICAgICAgW3pvb21MZXZlbF09XCJ6b29tTGV2ZWxcIlxyXG4gICAgICAgICAgICBbdGltZVNjYWxlXT1cImdhbnR0U2VydmljZS5USU1FX1NDQUxFXCJcclxuICAgICAgICAgICAgW2RpbWVuc2lvbnNdPVwiZGltZW5zaW9uc1wiPjwvdGltZS1zY2FsZT5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtYWN0aXZpdHktYXJlYVwiXHJcbiAgICAgICAgICAgICNnYW50dEFjdGl2aXR5QXJlYVxyXG4gICAgICAgICAgICBbbmdTdHlsZV09XCJ7ICdoZWlnaHQnOiBnYW50dFNlcnZpY2UuY2FsY3VsYXRlR2FudHRIZWlnaHQoKSwgJ3dpZHRoJzogY29udGFpbmVyV2lkdGggKyAncHgnfVwiPlxyXG5cclxuICAgICAgICAgICAgPGFjdGl2aXR5LWJhY2tncm91bmQgW3pvb21dPVwiem9vbVwiXHJcbiAgICAgICAgICAgICAgICBbem9vbUxldmVsXT1cInpvb21MZXZlbFwiXHJcbiAgICAgICAgICAgICAgICBbdGltZVNjYWxlXT1cImdhbnR0U2VydmljZS5USU1FX1NDQUxFXCJcclxuICAgICAgICAgICAgICAgIFt0YXNrc109XCJnYW50dFNlcnZpY2UuVEFTS19DQUNIRVwiPjwvYWN0aXZpdHktYmFja2dyb3VuZD5cclxuICAgICAgICAgICAgPGFjdGl2aXR5LWJhcnMgW3pvb21dPVwiem9vbVwiXHJcbiAgICAgICAgICAgICAgICBbem9vbUxldmVsXT1cInpvb21MZXZlbFwiXHJcbiAgICAgICAgICAgICAgICBbdGltZVNjYWxlXT1cImdhbnR0U2VydmljZS5USU1FX1NDQUxFXCJcclxuICAgICAgICAgICAgICAgIFtkaW1lbnNpb25zXT1cImRpbWVuc2lvbnNcIlxyXG4gICAgICAgICAgICAgICAgW3Rhc2tzXT1cImdhbnR0U2VydmljZS5UQVNLX0NBQ0hFXCI+PC9hY3Rpdml0eS1iYXJzPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtdmVydGljYWwtc2Nyb2xsXCJcclxuICAgICAgICAjdmVydGljYWxTY3JvbGxcclxuICAgICAgICAoc2Nyb2xsKT1cIm9uVmVydGljYWxTY3JvbGwodmVydGljYWxTY3JvbGwsIGdhbnR0R3JpZCwgZ2FudHRBY3Rpdml0eUFyZWEpXCJcclxuICAgICAgICBbbmdTdHlsZV09XCJ7J2Rpc3BsYXknOiBhY3Rpdml0eUFjdGlvbnMuZXhwYW5kZWQgPT09IHRydWUgPyAnbm9uZScgOiAnYmxvY2snIH1cIj5cclxuXHJcbiAgICAgICAgPGRpdiBbbmdTdHlsZV09XCJ7ICdoZWlnaHQnOiBnYW50dFNlcnZpY2UuY2FsY3VsYXRlR2FudHRIZWlnaHQoKSB9XCI+PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBzdHlsZXM6IFtgXHJcbiAgICAgICAgLmdhbnR0LWFjdGl2aXR5IHtcclxuICAgICAgICAgICAgLypvdmVyZmxvdy14OiBoaWRkZW47Ki9cclxuICAgICAgICAgICAgb3ZlcmZsb3cteDogYXV0bztcclxuICAgICAgICAgICAgaGVpZ2h0OiAyNTBweDtcclxuICAgICAgICAgICAgb3ZlcmZsb3cteTogaGlkZGVuO1xyXG4gICAgICAgICAgICBvdmVyZmxvdy14OiBzY3JvbGw7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgICAgICAgdmVydGljYWwtYWxpZ246IHRvcDtcclxuICAgICAgICAgICAgcG9zaXRpb246cmVsYXRpdmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5nYW50dC1hY3Rpdml0eS1hcmVhIHtcclxuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgICAgICBvdmVyZmxvdy14OiBoaWRkZW47XHJcbiAgICAgICAgICAgIG92ZXJmbG93LXk6IGhpZGRlbjtcclxuICAgICAgICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdhbnR0LXZlcnRpY2FsLXNjcm9sbCB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gICAgICAgICAgICBvdmVyZmxvdy14OiBoaWRkZW47XHJcbiAgICAgICAgICAgIG92ZXJmbG93LXk6IHNjcm9sbDtcclxuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgICAgICByaWdodDogMDtcclxuICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgICAgIGhlaWdodDogMjgzcHg7XHJcbiAgICAgICAgICAgIHdpZHRoOiAxOHB4O1xyXG4gICAgICAgICAgICB0b3A6IDcwcHg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5ncmlkIHtcclxuICAgICAgICAgICAgb3ZlcmZsb3cteDogaGlkZGVuO1xyXG4gICAgICAgICAgICBvdmVyZmxvdy15OiBoaWRkZW47XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgICAgICAgdmVydGljYWwtYWxpZ246IHRvcDtcclxuICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2NlY2VjZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdyaWQtc2NhbGUge1xyXG4gICAgICAgICAgICBjb2xvcjogIzZiNmI2YjtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2UwZTBlMDtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGVzbW9rZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdyaWQtaGVhZC1jZWxsIHtcclxuICAgICAgICAgICAgLypjb2xvcjogI2E2YTZhNjsqL1xyXG4gICAgICAgICAgICBib3JkZXItdG9wOiBub25lICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogbm9uZSAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICBsaW5lLWhlaWdodDogaW5oZXJpdDtcclxuICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xyXG4gICAgICAgICAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjY2VjZWNlO1xyXG4gICAgICAgICAgICAvKnRleHQtYWxpZ246IGNlbnRlcjsqL1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgICAgIGN1cnNvcjogZGVmYXVsdDtcclxuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgICAgICAtbW96LXVzZXItc2VsZWN0OiAtbW96LW5vbmU7XHJcbiAgICAgICAgICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5ncmlkLWRhdGEge1xyXG4gICAgICAgICAgICBvdmVyZmxvdzpoaWRkZW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5ncmlkLXJvdyB7XHJcbiAgICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTBlMGUwO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5ncmlkLXJvdzpob3ZlciB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlZWVlZWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5ncmlkLWNlbGwge1xyXG4gICAgICAgICAgICBib3JkZXItcmlnaHQ6IG5vbmU7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjNDU0NTQ1O1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XHJcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogNnB4O1xyXG4gICAgICAgICAgICBwYWRkaW5nLXJpZ2h0OiA2cHg7XHJcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICAgIH1cclxuICAgICAgICAuYWN0aW9ucy1iYXIge1xyXG4gICAgICAgICAgICAvKmJvcmRlci10b3A6IDFweCBzb2xpZCAjY2VjZWNlOyovXHJcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTBlMGUwO1xyXG4gICAgICAgICAgICBjbGVhcjogYm90aDtcclxuICAgICAgICAgICAgLyptYXJnaW4tdG9wOiA5MHB4OyovXHJcbiAgICAgICAgICAgIGhlaWdodDogMjhweDtcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogd2hpdGVzbW9rZTtcclxuICAgICAgICAgICAgY29sb3I6ICM0OTQ5NDk7XHJcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiBBcmlhbCwgc2Fucy1zZXJpZjtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDE1cHg7XHJcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAyNXB4O1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ2FudHQtdHJlZS1jb250ZW50IHtcclxuICAgICAgICAgICAgcGFkZGluZy1sZWZ0OjE1cHg7XHJcbiAgICAgICAgfVxyXG4gICAgYF0sXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcclxufSlcclxuZXhwb3J0IGNsYXNzIEdhbnR0QWN0aXZpdHlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIERvQ2hlY2sge1xyXG4gICAgQElucHV0KCkgcHJvamVjdDogYW55O1xyXG4gICAgQElucHV0KCkgb3B0aW9uczogYW55O1xyXG4gICAgQE91dHB1dCgpIG9uR3JpZFJvd0NsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICAgIHByaXZhdGUgdXBUcmlhbmdsZTogc3RyaW5nID0gJyYjeDI1YjI7JyAvLyBCTEFDSyBVUC1QT0lOVElORyBUUklBTkdMRVxyXG4gICAgcHJpdmF0ZSBkb3duVHJpYW5nbGU6IHN0cmluZyA9ICcmI3gyNWJjOyc7IC8vIEJMQUNLIERPV04tUE9JTlRJTkcgVFJJQU5HTEVcclxuXHJcbiAgICB6b29tOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG5cclxuICAgIGFjdGl2aXR5QWN0aW9ucyA9IHtcclxuICAgICAgICBleHBhbmRlZDogZmFsc2UsXHJcbiAgICAgICAgZXhwYW5kZWRJY29uOiB0aGlzLmRvd25UcmlhbmdsZVxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIHRpbWVTY2FsZTogYW55O1xyXG5cclxuICAgIHByaXZhdGUgc3RhcnQ6IERhdGU7XHJcbiAgICBwcml2YXRlIGVuZDogRGF0ZTtcclxuICAgIGNvbnRhaW5lckhlaWdodDogYW55O1xyXG4gICAgY29udGFpbmVyV2lkdGg6IGFueTtcclxuXHJcbiAgICBwcml2YXRlIGFjdGl2aXR5Q29udGFpbmVyU2l6ZXM6IGFueTtcclxuXHJcbiAgICBnYW50dEFjdGl2aXR5SGVpZ2h0OiBhbnk7XHJcbiAgICBnYW50dEFjdGl2aXR5V2lkdGg6IGFueTtcclxuXHJcbiAgICB6b29tTGV2ZWw6IHN0cmluZyA9IFpvb21pbmdbWm9vbWluZy5ob3Vyc107XHJcblxyXG4gICAgdHJlZUV4cGFuZGVkID0gZmFsc2U7XHJcblxyXG4gICAgcHJpdmF0ZSBzY2FsZTogYW55ID0ge1xyXG4gICAgICAgIHN0YXJ0OiBudWxsLFxyXG4gICAgICAgIGVuZDogbnVsbFxyXG4gICAgfTtcclxuXHJcbiAgICBkaW1lbnNpb25zID0ge1xyXG4gICAgICAgIGhlaWdodDogMCxcclxuICAgICAgICB3aWR0aDogMFxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGRhdGE6IGFueVtdID0gW107XHJcblxyXG4gICAgcHVibGljIGdyaWRDb2x1bW5zOiBhbnlbXSA9IFtcclxuICAgICAgICB7IG5hbWU6ICcnLCBsZWZ0OiAwLCB3aWR0aDogMTYgfSxcclxuICAgICAgICB7IG5hbWU6ICdUYXNrJywgbGVmdDogMjAsIHdpZHRoOiAzMzAgfVxyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgZWxlbTogRWxlbWVudFJlZixcclxuICAgICAgICBwdWJsaWMgZ2FudHRTZXJ2aWNlOiBHYW50dFNlcnZpY2UpIHtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICAvLyBDYWNoZSB0aGUgcHJvamVjdCBkYXRhIGFuZCBvbmx5IHdvcmsgd2l0aCB0aGF0LiBPbmx5IHNob3cgcGFyZW50IHRhc2tzIGJ5IGRlZmF1bHRcclxuICAgICAgICB0aGlzLmdhbnR0U2VydmljZS5UQVNLX0NBQ0hFID0gdGhpcy5wcm9qZWN0LnRhc2tzLnNsaWNlKDApLmZpbHRlcigoaXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtLnRyZWVQYXRoLnNwbGl0KCcvJykubGVuZ3RoID09PSAxO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZ2FudHRTZXJ2aWNlLlRJTUVfU0NBTEUgPSB0aGlzLmdhbnR0U2VydmljZS5jYWxjdWxhdGVTY2FsZSh0aGlzLm9wdGlvbnMuc2NhbGUuc3RhcnQsIHRoaXMub3B0aW9ucy5zY2FsZS5lbmQpO1xyXG5cclxuICAgICAgICB0aGlzLnpvb21MZXZlbCA9IHRoaXMub3B0aW9ucy56b29taW5nO1xyXG4gICAgICAgIHRoaXMuc3RhcnQgPSB0aGlzLm9wdGlvbnMuc2NhbGUuc3RhcnQ7XHJcbiAgICAgICAgdGhpcy5lbmQgPSB0aGlzLm9wdGlvbnMuc2NhbGUuZW5kO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyV2lkdGggPSB0aGlzLmNhbGN1bGF0ZUNvbnRhaW5lcldpZHRoKCk7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXJIZWlnaHQgPSB0aGlzLmNhbGN1bGF0ZUNvbnRhaW5lckhlaWdodCgpO1xyXG4gICAgICAgIHRoaXMuYWN0aXZpdHlDb250YWluZXJTaXplcyA9IHRoaXMuZ2FudHRTZXJ2aWNlLmNhbGN1bGF0ZUFjdGl2aXR5Q29udGFpbmVyRGltZW5zaW9ucygpO1xyXG5cclxuICAgICAgICAvLyBpbXBvcnRhbnQgdGhhdCB0aGVzZSBhcmUgY2FsbGVkIGxhc3QgYXMgaXQgcmVsaWVzIG9uIHZhbHVlcyBjYWxjdWxhdGVkIGFib3ZlLlxyXG4gICAgICAgIHRoaXMuc2V0U2NhbGUoKTtcclxuICAgICAgICB0aGlzLnNldERpbWVuc2lvbnMoKTtcclxuICAgICAgICB0aGlzLnNldFNpemVzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZXhwYW5kKCk7IC8vIGRlZmF1bHQgdG8gZXhwYW5kZWRcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ3VzdG9tIG1vZGVsIGNoZWNrICovXHJcbiAgICBuZ0RvQ2hlY2soKSB7XHJcbiAgICAgICAgLy8gZG8gYSBjaGVjayB0byBzZWUgd2hldGhlciBhbnkgbmV3IHRhc2tzIGhhdmUgYmVlbiBhZGRlZC4gSWYgdGhlIHRhc2sgaXMgYSBjaGlsZCB0aGVuIHB1c2ggaW50byBhcnJheSBpZiB0cmVlIGV4cGFuZGVkP1xyXG4gICAgICAgIHZhciB0YXNrc0FkZGVkID0gdGhpcy5nYW50dFNlcnZpY2UuZG9UYXNrQ2hlY2sodGhpcy5wcm9qZWN0LnRhc2tzLCB0aGlzLnRyZWVFeHBhbmRlZCk7XHJcblxyXG4gICAgICAgIC8vIG9ubHkgZm9yY2UgZXhwYW5kIGlmIHRhc2tzIGFyZSBhZGRlZCBhbmQgdHJlZSBpcyBhbHJlYWR5IGV4cGFuZGVkXHJcbiAgICAgICAgaWYgKHRhc2tzQWRkZWQgJiYgdGhpcy5hY3Rpdml0eUFjdGlvbnMuZXhwYW5kZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5leHBhbmQodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBPbiB2ZXJ0aWNhbCBzY3JvbGwgc2V0IHRoZSBzY3JvbGwgdG9wIG9mIGdyaWQgYW5kIGFjdGl2aXR5ICAqL1xyXG4gICAgb25WZXJ0aWNhbFNjcm9sbCh2ZXJ0aWNhbFNjcm9sbDogYW55LCBnYW50dEdyaWQ6IGFueSwgZ2FudHRBY3Rpdml0eUFyZWE6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZ2FudHRTZXJ2aWNlLnNjcm9sbFRvcCh2ZXJ0aWNhbFNjcm9sbCwgZ2FudHRHcmlkLCBnYW50dEFjdGl2aXR5QXJlYSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFJlbW92ZXMgb3IgYWRkcyBjaGlsZHJlbiBmb3IgZ2l2ZW4gcGFyZW50IHRhc2tzIGJhY2sgaW50byBET00gYnkgdXBkYXRpbmcgVEFTS19DQUNIRSAqL1xyXG4gICAgdG9nZ2xlQ2hpbGRyZW4ocm93RWxlbTogYW55LCB0YXNrOiBhbnkpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsZXQgaXNQYXJlbnQ6IGJvb2xlYW4gPSBcInRydWVcIiA9PT0gcm93RWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaXNwYXJlbnQnKTtcclxuICAgICAgICAgICAgbGV0IHBhcmVudElkOiBzdHJpbmcgPSByb3dFbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1wYXJlbnRpZCcpLnJlcGxhY2UoXCJfXCIsIFwiXCIpOyAvLyByZW1vdmUgaWQgcHJlZml4XHJcbiAgICAgICAgICAgIGxldCBjaGlsZHJlbjogYW55ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcGFyZW50aWQ9JyArIHJvd0VsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXBhcmVudGlkJykgKyAnXVtkYXRhLWlzcGFyZW50PWZhbHNlXScpO1xyXG5cclxuICAgICAgICAgICAgLy8gdXNlIHRoZSB0YXNrIGNhY2hlIHRvIGFsbG93IGRlbGV0aW5nIG9mIGl0ZW1zIHdpdGhvdXQgcG9sbHV0aW5nIHRoZSBwcm9qZWN0LnRhc2tzIGFycmF5XHJcbiAgICAgICAgICAgIGlmIChpc1BhcmVudCkge1xyXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGNoaWxkcmVuIGZyb20gdGhlIERPTSBhcyB3ZSBkb24ndCB3YW50IHRoZW0gaWYgd2UgYXJlIGNvbGxhcHNpbmcgdGhlIHBhcmVudFxyXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGRyZW5JZHM6IGFueVtdID0gdGhpcy5nYW50dFNlcnZpY2UuVEFTS19DQUNIRS5maWx0ZXIoKHRhc2s6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFzay5wYXJlbnRJZCA9PSBwYXJlbnRJZCAmJiB0YXNrLnRyZWVQYXRoLnNwbGl0KCcvJykubGVuZ3RoID4gMTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5tYXAoKGl0ZW06IGFueSkgPT4geyByZXR1cm4gaXRlbS5pZCB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW5JZHMuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZW1vdmVkSW5kZXggPSB0aGlzLmdhbnR0U2VydmljZS5UQVNLX0NBQ0hFLm1hcCgoaXRlbTogYW55KSA9PiB7IHJldHVybiBpdGVtLmlkIH0pLmluZGV4T2YoaXRlbSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbnR0U2VydmljZS5UQVNLX0NBQ0hFLnNwbGljZShyZW1vdmVkSW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hY3Rpdml0eUFjdGlvbnMuZXhwYW5kZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBhbmQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ0hFQ0sgdGhlIHByb2plY3QgY2FjaGUgdG8gc2VlIGlmIHRoaXMgcGFyZW50IGlkIGhhcyBhbnkgY2hpbGRyZW5cclxuICAgICAgICAgICAgICAgICAgICAvLyBhbmQgaWYgc28gcHVzaCB0aGVtIGJhY2sgaW50byBhcnJheSBzbyBET00gaXMgdXBkYXRlZFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZHJlblRhc2tzOiBhbnlbXSA9IHRoaXMucHJvamVjdC50YXNrcy5maWx0ZXIoKHRhc2s6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFzay5wYXJlbnRJZCA9PT0gcGFyZW50SWQgJiYgdGFzay50cmVlUGF0aC5zcGxpdCgnLycpLmxlbmd0aCA+IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuVGFza3MuZm9yRWFjaCgodGFzazogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FudHRTZXJ2aWNlLlRBU0tfQ0FDSEUucHVzaCh0YXNrKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZpdHlBY3Rpb25zLmV4cGFuZGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5kKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5vbkdyaWRSb3dDbGljay5lbWl0KHRhc2spO1xyXG5cclxuICAgICAgICB9IGNhdGNoIChlcnIpIHsgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBSZW1vdmVzIG9yIGFkZHMgY2hpbGRyZW4gdGFza3MgYmFjayBpbnRvIERPTSBieSB1cGRhdGluZyBUQVNLX0NBQ0hFICovXHJcbiAgICB0b2dnbGVBbGxDaGlsZHJlbigpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgY2hpbGRyZW46IGFueSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWlzcGFyZW50PWZhbHNlXScpO1xyXG4gICAgICAgICAgICB2YXIgY2hpbGRyZW5JZHM6IHN0cmluZ1tdID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoY2hpbGRyZW4pLm1hcCgoaXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKS5yZXBsYWNlKFwiX1wiLCBcIlwiKTsgLy8gcmVtb3ZlIGlkIHByZWZpeFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIHB1c2ggYWxsIHRoZSBjaGlsZHJlbiBhcnJheSBpdGVtcyBpbnRvIGNhY2hlXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRyZWVFeHBhbmRlZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGRyZW5JZHM6IHN0cmluZ1tdID0gdGhpcy5nYW50dFNlcnZpY2UuVEFTS19DQUNIRS5maWx0ZXIoKHRhc2s6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFzay50cmVlUGF0aC5zcGxpdCgnLycpLmxlbmd0aCA+IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkubWFwKChpdGVtOiBhbnkpID0+IHsgcmV0dXJuIGl0ZW0uaWQgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuSWRzLmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVtb3ZlZEluZGV4ID0gdGhpcy5nYW50dFNlcnZpY2UuVEFTS19DQUNIRS5tYXAoKGl0ZW06IGFueSkgPT4geyByZXR1cm4gaXRlbS5pZCB9KS5pbmRleE9mKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbnR0U2VydmljZS5UQVNLX0NBQ0hFLnNwbGljZShyZW1vdmVkSW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMudHJlZUV4cGFuZGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZpdHlBY3Rpb25zLmV4cGFuZGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBhbmQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBnZXQgYWxsIGNoaWxkcmVuIHRhc2tzIGluIHByb2plY3QgaW5wdXRcclxuICAgICAgICAgICAgICAgIGxldCBjaGlsZHJlblRhc2tzOiBhbnlbXSA9IHRoaXMucHJvamVjdC50YXNrcy5maWx0ZXIoKHRhc2s6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXNrLnRyZWVQYXRoLnNwbGl0KCcvJykubGVuZ3RoID4gMTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZmlsdGVyIG91dCB0aGVzZSBjaGlsZHJlbiBhcyB0aGV5IGFscmVhZHkgZXhpc3QgaW4gdGFzayBjYWNoZVxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuVGFza3MgPSBjaGlsZHJlblRhc2tzLmZpbHRlcigodGFzazogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjaGlsZHJlbklkcy5pbmRleE9mKHRhc2suaWQpID09PSAtMTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlblRhc2tzLmZvckVhY2goKHRhc2s6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FudHRTZXJ2aWNlLlRBU0tfQ0FDSEUucHVzaCh0YXNrKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMudHJlZUV4cGFuZGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hY3Rpdml0eUFjdGlvbnMuZXhwYW5kZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycikgeyB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIE9uIHJlc2l6ZSBvZiBicm93c2VyIHdpbmRvdyBkeW5hbWljYWxseSBhZGp1c3QgZ2FudHQgYWN0aXZpdHkgaGVpZ2h0IGFuZCB3aWR0aCAqL1xyXG4gICAgb25SZXNpemUoZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBhY3Rpdml0eUNvbnRhaW5lclNpemVzID0gdGhpcy5nYW50dFNlcnZpY2UuY2FsY3VsYXRlQWN0aXZpdHlDb250YWluZXJEaW1lbnNpb25zKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZpdHlBY3Rpb25zLmV4cGFuZGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FudHRBY3Rpdml0eUhlaWdodCA9IHRoaXMuZ2FudHRTZXJ2aWNlLlRBU0tfQ0FDSEUubGVuZ3RoICogdGhpcy5nYW50dFNlcnZpY2Uucm93SGVpZ2h0ICsgdGhpcy5nYW50dFNlcnZpY2Uucm93SGVpZ2h0ICogMyArICdweCc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5nYW50dEFjdGl2aXR5SGVpZ2h0ID0gYWN0aXZpdHlDb250YWluZXJTaXplcy5oZWlnaHQgKyAncHgnOztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZ2FudHRBY3Rpdml0eVdpZHRoID0gYWN0aXZpdHlDb250YWluZXJTaXplcy53aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTY2FsZSgpIHtcclxuICAgICAgICB0aGlzLnNjYWxlLnN0YXJ0ID0gdGhpcy5zdGFydDtcclxuICAgICAgICB0aGlzLnNjYWxlLmVuZCA9IHRoaXMuZW5kO1xyXG4gICAgfVxyXG5cclxuICAgIHNldERpbWVuc2lvbnMoKSB7XHJcbiAgICAgICAgdGhpcy5kaW1lbnNpb25zLmhlaWdodCA9IHRoaXMuY29udGFpbmVySGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuZGltZW5zaW9ucy53aWR0aCA9IHRoaXMuY29udGFpbmVyV2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0R3JpZFJvd1N0eWxlKGlzUGFyZW50OiBib29sZWFuKTogYW55IHtcclxuICAgICAgICBpZiAoaXNQYXJlbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICdoZWlnaHQnOiB0aGlzLmdhbnR0U2VydmljZS5yb3dIZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogdGhpcy5nYW50dFNlcnZpY2Uucm93SGVpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICdmb250LXdlaWdodCc6ICdib2xkJyxcclxuICAgICAgICAgICAgICAgICdjdXJzb3InOiAncG9pbnRlcidcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICdoZWlnaHQnOiB0aGlzLmdhbnR0U2VydmljZS5yb3dIZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAnbGluZS1oZWlnaHQnOiB0aGlzLmdhbnR0U2VydmljZS5yb3dIZWlnaHQgKyAncHgnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogU2V0IHRoZSB6b29tIGxldmVsIGUuZyBob3VycywgZGF5cyAqL1xyXG4gICAgem9vbVRhc2tzKGxldmVsOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnpvb21MZXZlbCA9IGxldmVsO1xyXG4gICAgICAgIHRoaXMuem9vbS5lbWl0KHRoaXMuem9vbUxldmVsKTtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lcldpZHRoID0gdGhpcy5jYWxjdWxhdGVDb250YWluZXJXaWR0aCgpO1xyXG4gICAgICAgIHRoaXMuc2V0RGltZW5zaW9ucygpO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW50dF9hY3Rpdml0eScpLnNjcm9sbExlZnQgPSAwIC8vIHJlc2V0IHNjcm9sbCBsZWZ0LCByZXBsYWNlIHdpdGggQFZpZXdDaGlsZD9cclxuICAgIH1cclxuXHJcbiAgICAvKiogRXhwYW5kIHRoZSBnYW50dCBncmlkIGFuZCBhY3Rpdml0eSBhcmVhIGhlaWdodCAqL1xyXG4gICAgZXhwYW5kKGZvcmNlPzogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHZhciB2ZXJ0aWNhbFNjcm9sbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW50dF92ZXJ0aWNhbF9zY3JvbGwnKTtcclxuICAgICAgICB2YXIgZ2FudHRBY3Rpdml0eUhlaWdodDogc3RyaW5nID0gYCR7dGhpcy5nYW50dFNlcnZpY2UuVEFTS19DQUNIRS5sZW5ndGggKiB0aGlzLmdhbnR0U2VydmljZS5yb3dIZWlnaHQgKyB0aGlzLmdhbnR0U2VydmljZS5yb3dIZWlnaHQgKiAzfXB4YDtcclxuXHJcbiAgICAgICAgaWYgKGZvcmNlICYmIHRoaXMuYWN0aXZpdHlBY3Rpb25zLmV4cGFuZGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FudHRBY3Rpdml0eUhlaWdodCA9IGdhbnR0QWN0aXZpdHlIZWlnaHQ7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFjdGl2aXR5QWN0aW9ucy5leHBhbmRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2aXR5QWN0aW9ucy5leHBhbmRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2aXR5QWN0aW9ucy5leHBhbmRlZEljb24gPSB0aGlzLmRvd25UcmlhbmdsZTtcclxuICAgICAgICAgICAgdGhpcy5nYW50dEFjdGl2aXR5SGVpZ2h0ID0gJzMwMHB4JztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2ZXJ0aWNhbFNjcm9sbC5zY3JvbGxUb3AgPSAwO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rpdml0eUFjdGlvbnMuZXhwYW5kZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2aXR5QWN0aW9ucy5leHBhbmRlZEljb24gPSB0aGlzLnVwVHJpYW5nbGU7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FudHRBY3Rpdml0eUhlaWdodCA9IGdhbnR0QWN0aXZpdHlIZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBHZXQgdGhlIHN0YXR1cyBpY29uIHVuaWNvZGUgc3RyaW5nICovXHJcbiAgICBnZXRTdGF0dXNJY29uKHN0YXR1czogc3RyaW5nLCBwZXJjZW50Q29tcGxldGU6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgdmFyIGNoZWNrTWFya0ljb246IHN0cmluZyA9ICcmI3gyNzE0Oyc7XHJcbiAgICAgICAgdmFyIHVwQmxhY2tQb2ludGVyOiBzdHJpbmcgPSAnJiN4MjViMjsnO1xyXG4gICAgICAgIHZhciBjcm9zc01hcmtJY29uOiBzdHJpbmcgPSAnJiN4MjcxODsnO1xyXG5cclxuICAgICAgICBpZiAoc3RhdHVzID09PSBcIkNvbXBsZXRlZFwiIHx8IHBlcmNlbnRDb21wbGV0ZSA9PT0gMTAwICYmIHN0YXR1cyAhPT0gXCJFcnJvclwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjaGVja01hcmtJY29uO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSBcIldhcm5pbmdcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gdXBCbGFja1BvaW50ZXI7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09IFwiRXJyb3JcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gY3Jvc3NNYXJrSWNvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBHZXQgdGhlIHN0YXR1cyBpY29uIGNvbG9yICovXHJcbiAgICBnZXRTdGF0dXNJY29uQ29sb3Ioc3RhdHVzOiBzdHJpbmcsIHBlcmNlbnRDb21wbGV0ZTogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoc3RhdHVzID09PSBcIkNvbXBsZXRlZFwiIHx8IHBlcmNlbnRDb21wbGV0ZSA9PT0gMTAwICYmIHN0YXR1cyAhPT0gXCJFcnJvclwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnZ3JlZW4nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSBcIldhcm5pbmdcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gJ29yYW5nZSc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09IFwiRXJyb3JcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gJ3JlZCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuXHJcbiAgICBzZXRHcmlkU2NhbGVTdHlsZSgpIHtcclxuICAgICAgICB2YXIgaGVpZ2h0ID0gdGhpcy5nYW50dFNlcnZpY2Uucm93SGVpZ2h0O1xyXG5cclxuICAgICAgICBpZiAodGhpcy56b29tTGV2ZWwgPT09IFpvb21pbmdbWm9vbWluZy5ob3Vyc10pIHtcclxuICAgICAgICAgICAgaGVpZ2h0ICo9IDI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAnaGVpZ2h0JzogaGVpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogaGVpZ2h0ICsgJ3B4J1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVDb250YWluZXJIZWlnaHQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nYW50dFNlcnZpY2UuVEFTS19DQUNIRS5sZW5ndGggKiB0aGlzLmdhbnR0U2VydmljZS5yb3dIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVDb250YWluZXJXaWR0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICh0aGlzLnpvb21MZXZlbCA9PT0gWm9vbWluZ1tab29taW5nLmhvdXJzXSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nYW50dFNlcnZpY2UuVElNRV9TQ0FMRS5sZW5ndGggKiB0aGlzLmdhbnR0U2VydmljZS5ob3VyQ2VsbFdpZHRoICogMjQgKyB0aGlzLmdhbnR0U2VydmljZS5ob3VyQ2VsbFdpZHRoXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2FudHRTZXJ2aWNlLlRJTUVfU0NBTEUubGVuZ3RoICogdGhpcy5nYW50dFNlcnZpY2UuY2VsbFdpZHRoICsgdGhpcy5nYW50dFNlcnZpY2UuY2VsbFdpZHRoO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFNpemVzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZ2FudHRBY3Rpdml0eUhlaWdodCA9IHRoaXMuYWN0aXZpdHlDb250YWluZXJTaXplcy5oZWlnaHQgKyAncHgnO1xyXG4gICAgICAgIHRoaXMuZ2FudHRBY3Rpdml0eVdpZHRoID0gdGhpcy5hY3Rpdml0eUNvbnRhaW5lclNpemVzLndpZHRoO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=