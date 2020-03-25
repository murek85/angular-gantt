/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { GanttService } from '../shared/services/gantt.service';
var GanttActivityComponent = /** @class */ (function () {
    function GanttActivityComponent(elem, ganttService) {
        this.elem = elem;
        this.ganttService = ganttService;
        this.onGridRowClick = new EventEmitter();
        this.onPopoverOpen = new EventEmitter();
        this.upTriangle = '&#x25b2;'; // BLACK UP-POINTING TRIANGLE
        // BLACK UP-POINTING TRIANGLE
        this.downTriangle = '&#x25bc;'; // BLACK DOWN-POINTING TRIANGLE
        this.activityActions = {
            expanded: false,
            expandedIcon: this.downTriangle
        };
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
            { name: 'Grupa asortymentów', left: 0, width: 330 }
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
                    template: "\n    <div class=\"grid\" #ganttGrid>\n        <div class=\"grid-scale\" [ngStyle]=\"setGridScaleStyle()\">\n            <div class=\"grid-head-cell\"\n                *ngFor=\"let column of gridColumns\" [style.width]=\"column.width + 'px'\"\n                [style.left]=\"column.left + 'px'\">\n\n                <label>\n                    {{column.name}}\n                </label>\n            </div>\n        </div>\n        <div class=\"grid-data\"\n            #ganttGridData\n            [ngStyle]=\"{ 'height': ganttService.calculateGanttHeight() }\">\n\n            <div #row\n                *ngFor=\"let data of ganttService.TASK_CACHE\" class=\"grid-row\"\n                [ngStyle]=\"setGridRowStyle()\">\n\n                <div class=\"grid-cell\"\n                    [ngStyle]=\"{ 'width': gridColumns[1].width + 'px', 'padding-left': 0 }\">\n\n                    <div class=\"gantt-tree-content\">\n                        <span [ngStyle]=\"{ borderLeftColor: data.color.primary, borderLeftWidth: .35 + 'em', \n                            borderLeftStyle: 'solid', paddingRight: .5 + 'em'}\"></span>\n                        <span>{{data.name}}</span>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"gantt-activity\"\n        (window:resize)=\"onResize($event)\"\n        [ngStyle]=\"{ 'height': ganttService.calculateGanttHeight() + 60, 'width': ganttActivityWidth + 36 + 'px' }\">\n\n        <time-scale [timeScale]=\"ganttService.TIME_SCALE\"\n            [dimensions]=\"dimensions\"></time-scale>\n        <div class=\"gantt-activity-area\"\n            #ganttActivityArea\n            [ngStyle]=\"{ 'height': ganttService.calculateGanttHeight(), 'width': containerWidth + 36 + 'px' }\">\n\n            <activity-background [timeScale]=\"ganttService.TIME_SCALE\"\n                [tasks]=\"ganttService.TASK_CACHE\"></activity-background>\n            <activity-bars [timeScale]=\"ganttService.TIME_SCALE\"\n                [dimensions]=\"dimensions\"\n                [tasks]=\"ganttService.TASK_CACHE\"\n                (onGridRowClick)=\"gridRowClick($event)\"\n                (onPopoverOpen)=\"popoverOpen($event)\"></activity-bars>\n        </div>\n    </div>\n    ",
                    changeDetection: ChangeDetectionStrategy.Default,
                    styles: ["\n        .gantt-activity {\n            overflow-y: hidden;\n            overflow-x: scroll;\n            display: inline-block;\n            vertical-align: top;\n            position: relative;\n        }\n        .gantt-activity-area {\n            position: relative;\n            overflow-x: hidden;\n            overflow-y: hidden;\n            -webkit-user-select: none;\n        }\n        .gantt-vertical-scroll {\n            background-color: transparent;\n            overflow-x: hidden;\n            overflow-y: scroll;\n            position: absolute;\n            right: -10px;\n            display: block;\n            top: -1px;\n            border: 1px solid #cecece;\n        }\n        .grid {\n            overflow-x: hidden;\n            overflow-y: hidden;\n            display: inline-block;\n            vertical-align: top;\n            border-right: 1px solid #cecece;\n        }\n        .grid-scale {\n            color: #6b6b6b;\n            font-size: 12px;\n            border-bottom: 1px solid #e0e0e0;\n            background-color: whitesmoke;\n        }\n        .grid-head-cell {\n            /*color: #a6a6a6;*/\n            border-top: none !important;\n            border-right: none !important;\n            line-height: inherit;\n            box-sizing: border-box;\n            display: inline-block;\n            vertical-align: top;\n            border-right: 1px solid #cecece;\n            /*text-align: center;*/\n            position: relative;\n            cursor: default;\n            height: 100%;\n            -moz-user-select: -moz-none;\n            -webkit-user-select: none;\n            overflow: hidden;\n        }\n        .grid-data {\n            overflow:hidden;\n        }\n        .grid-row {\n            box-sizing: border-box;\n            border-bottom: 1px solid #e0e0e0;\n            background-color: #fff;\n            position: relative;\n            -webkit-user-select: none;\n        }\n        .grid-row:hover {\n            background-color: #eeeeee;\n            cursor: pointer;\n        }\n        .grid-cell {\n            border-right: none;\n            color: #454545;\n            display: inline-block;\n            vertical-align: top;\n            padding-left: 6px;\n            padding-right: 6px;\n            height: 100%;\n            overflow: hidden;\n            white-space: nowrap;\n            font-size: 13px;\n            box-sizing: border-box;\n        }\n        .actions-bar {\n            /*border-top: 1px solid #cecece;*/\n            border-bottom: 1px solid #e0e0e0;\n            clear: both;\n            /*margin-top: 90px;*/\n            height: 28px;\n            background: whitesmoke;\n            color: #494949;\n            font-family: Arial, sans-serif;\n            font-size: 13px;\n            padding-left: 15px;\n            line-height: 25px;\n        }\n        .gantt-tree-content {\n            padding-left: 15px;\n        }\n    "]
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
export { GanttActivityComponent };
if (false) {
    /** @type {?} */
    GanttActivityComponent.prototype.project;
    /** @type {?} */
    GanttActivityComponent.prototype.options;
    /** @type {?} */
    GanttActivityComponent.prototype.onGridRowClick;
    /** @type {?} */
    GanttActivityComponent.prototype.onPopoverOpen;
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
    /**
     * @type {?}
     * @private
     */
    GanttActivityComponent.prototype.timeScale;
    /**
     * @type {?}
     * @private
     */
    GanttActivityComponent.prototype.activityContainerSizes;
    /** @type {?} */
    GanttActivityComponent.prototype.activityActions;
    /** @type {?} */
    GanttActivityComponent.prototype.containerHeight;
    /** @type {?} */
    GanttActivityComponent.prototype.containerWidth;
    /** @type {?} */
    GanttActivityComponent.prototype.ganttActivityHeight;
    /** @type {?} */
    GanttActivityComponent.prototype.ganttActivityWidth;
    /**
     * @type {?}
     * @private
     */
    GanttActivityComponent.prototype.scale;
    /** @type {?} */
    GanttActivityComponent.prototype.dimensions;
    /** @type {?} */
    GanttActivityComponent.prototype.gridColumns;
    /** @type {?} */
    GanttActivityComponent.prototype.elem;
    /** @type {?} */
    GanttActivityComponent.prototype.ganttService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQtYWN0aXZpdHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1nYW50dC8iLCJzb3VyY2VzIjpbImxpYi9hY3Rpdml0eS9nYW50dC1hY3Rpdml0eS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFHLHVCQUF1QixFQUFzQixNQUFNLGVBQWUsQ0FBQztBQUV6SSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFaEU7SUFtTUksZ0NBQ1csSUFBZ0IsRUFDaEIsWUFBMEI7UUFEMUIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQXZDM0IsbUJBQWMsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUM1RCxrQkFBYSxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO1FBRTdELGVBQVUsR0FBRyxVQUFVLENBQUMsQ0FBQyw2QkFBNkI7O1FBQ3RELGlCQUFZLEdBQUcsVUFBVSxDQUFDLENBQUMsK0JBQStCO1FBUWxFLG9CQUFlLEdBQUc7WUFDZCxRQUFRLEVBQUUsS0FBSztZQUNmLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWTtTQUNsQyxDQUFDO1FBT00sVUFBSyxHQUFRO1lBQ2pCLEtBQUssRUFBRSxJQUFJO1lBQ1gsR0FBRyxFQUFFLElBQUk7U0FDWixDQUFDO1FBRUYsZUFBVSxHQUFHO1lBQ1QsTUFBTSxFQUFFLENBQUM7WUFDVCxLQUFLLEVBQUUsQ0FBQztTQUNYLENBQUM7UUFFSyxnQkFBVyxHQUFVO1lBQ3hCLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUU7WUFDaEMsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxLQUFL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OzswQkE2SmhCLEtBQUs7MEJBQ0wsS0FBSztpQ0FFTCxNQUFNO2dDQUNOLE1BQU07O0lBNkhYLDZCQUFDO0NBQUEsQUE1UkQsSUE0UkM7U0FsSVksc0JBQXNCOzs7SUFDL0IseUNBQXNCOztJQUN0Qix5Q0FBc0I7O0lBRXRCLGdEQUFzRTs7SUFDdEUsK0NBQXFFOzs7OztJQUVyRSw0Q0FBZ0M7Ozs7O0lBQ2hDLDhDQUFrQzs7Ozs7SUFFbEMsdUNBQW9COzs7OztJQUNwQixxQ0FBa0I7Ozs7O0lBQ2xCLDJDQUF1Qjs7Ozs7SUFFdkIsd0RBQW9DOztJQUVwQyxpREFHRTs7SUFDRixpREFBcUI7O0lBQ3JCLGdEQUFvQjs7SUFFcEIscURBQXlCOztJQUN6QixvREFBd0I7Ozs7O0lBRXhCLHVDQUdFOztJQUVGLDRDQUdFOztJQUVGLDZDQUdFOztJQUdFLHNDQUF1Qjs7SUFDdkIsOENBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBPbkNoYW5nZXMsIERvQ2hlY2sgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEdhbnR0U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9nYW50dC5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdnYW50dC1hY3Rpdml0eScsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBjbGFzcz1cImdyaWRcIiAjZ2FudHRHcmlkPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJncmlkLXNjYWxlXCIgW25nU3R5bGVdPVwic2V0R3JpZFNjYWxlU3R5bGUoKVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JpZC1oZWFkLWNlbGxcIlxyXG4gICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBncmlkQ29sdW1uc1wiIFtzdHlsZS53aWR0aF09XCJjb2x1bW4ud2lkdGggKyAncHgnXCJcclxuICAgICAgICAgICAgICAgIFtzdHlsZS5sZWZ0XT1cImNvbHVtbi5sZWZ0ICsgJ3B4J1wiPlxyXG5cclxuICAgICAgICAgICAgICAgIDxsYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICB7e2NvbHVtbi5uYW1lfX1cclxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJncmlkLWRhdGFcIlxyXG4gICAgICAgICAgICAjZ2FudHRHcmlkRGF0YVxyXG4gICAgICAgICAgICBbbmdTdHlsZV09XCJ7ICdoZWlnaHQnOiBnYW50dFNlcnZpY2UuY2FsY3VsYXRlR2FudHRIZWlnaHQoKSB9XCI+XHJcblxyXG4gICAgICAgICAgICA8ZGl2ICNyb3dcclxuICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBkYXRhIG9mIGdhbnR0U2VydmljZS5UQVNLX0NBQ0hFXCIgY2xhc3M9XCJncmlkLXJvd1wiXHJcbiAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJzZXRHcmlkUm93U3R5bGUoKVwiPlxyXG5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmlkLWNlbGxcIlxyXG4gICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsgJ3dpZHRoJzogZ3JpZENvbHVtbnNbMV0ud2lkdGggKyAncHgnLCAncGFkZGluZy1sZWZ0JzogMCB9XCI+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC10cmVlLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gW25nU3R5bGVdPVwieyBib3JkZXJMZWZ0Q29sb3I6IGRhdGEuY29sb3IucHJpbWFyeSwgYm9yZGVyTGVmdFdpZHRoOiAuMzUgKyAnZW0nLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckxlZnRTdHlsZTogJ3NvbGlkJywgcGFkZGluZ1JpZ2h0OiAuNSArICdlbSd9XCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57e2RhdGEubmFtZX19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtYWN0aXZpdHlcIlxyXG4gICAgICAgICh3aW5kb3c6cmVzaXplKT1cIm9uUmVzaXplKCRldmVudClcIlxyXG4gICAgICAgIFtuZ1N0eWxlXT1cInsgJ2hlaWdodCc6IGdhbnR0U2VydmljZS5jYWxjdWxhdGVHYW50dEhlaWdodCgpICsgNjAsICd3aWR0aCc6IGdhbnR0QWN0aXZpdHlXaWR0aCArIDM2ICsgJ3B4JyB9XCI+XHJcblxyXG4gICAgICAgIDx0aW1lLXNjYWxlIFt0aW1lU2NhbGVdPVwiZ2FudHRTZXJ2aWNlLlRJTUVfU0NBTEVcIlxyXG4gICAgICAgICAgICBbZGltZW5zaW9uc109XCJkaW1lbnNpb25zXCI+PC90aW1lLXNjYWxlPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1hY3Rpdml0eS1hcmVhXCJcclxuICAgICAgICAgICAgI2dhbnR0QWN0aXZpdHlBcmVhXHJcbiAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsgJ2hlaWdodCc6IGdhbnR0U2VydmljZS5jYWxjdWxhdGVHYW50dEhlaWdodCgpLCAnd2lkdGgnOiBjb250YWluZXJXaWR0aCArIDM2ICsgJ3B4JyB9XCI+XHJcblxyXG4gICAgICAgICAgICA8YWN0aXZpdHktYmFja2dyb3VuZCBbdGltZVNjYWxlXT1cImdhbnR0U2VydmljZS5USU1FX1NDQUxFXCJcclxuICAgICAgICAgICAgICAgIFt0YXNrc109XCJnYW50dFNlcnZpY2UuVEFTS19DQUNIRVwiPjwvYWN0aXZpdHktYmFja2dyb3VuZD5cclxuICAgICAgICAgICAgPGFjdGl2aXR5LWJhcnMgW3RpbWVTY2FsZV09XCJnYW50dFNlcnZpY2UuVElNRV9TQ0FMRVwiXHJcbiAgICAgICAgICAgICAgICBbZGltZW5zaW9uc109XCJkaW1lbnNpb25zXCJcclxuICAgICAgICAgICAgICAgIFt0YXNrc109XCJnYW50dFNlcnZpY2UuVEFTS19DQUNIRVwiXHJcbiAgICAgICAgICAgICAgICAob25HcmlkUm93Q2xpY2spPVwiZ3JpZFJvd0NsaWNrKCRldmVudClcIlxyXG4gICAgICAgICAgICAgICAgKG9uUG9wb3Zlck9wZW4pPVwicG9wb3Zlck9wZW4oJGV2ZW50KVwiPjwvYWN0aXZpdHktYmFycz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICAgIHN0eWxlczogW2BcclxuICAgICAgICAuZ2FudHQtYWN0aXZpdHkge1xyXG4gICAgICAgICAgICBvdmVyZmxvdy15OiBoaWRkZW47XHJcbiAgICAgICAgICAgIG92ZXJmbG93LXg6IHNjcm9sbDtcclxuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5nYW50dC1hY3Rpdml0eS1hcmVhIHtcclxuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgICAgICBvdmVyZmxvdy14OiBoaWRkZW47XHJcbiAgICAgICAgICAgIG92ZXJmbG93LXk6IGhpZGRlbjtcclxuICAgICAgICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdhbnR0LXZlcnRpY2FsLXNjcm9sbCB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gICAgICAgICAgICBvdmVyZmxvdy14OiBoaWRkZW47XHJcbiAgICAgICAgICAgIG92ZXJmbG93LXk6IHNjcm9sbDtcclxuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgICAgICByaWdodDogLTEwcHg7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgICAgICB0b3A6IC0xcHg7XHJcbiAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNjZWNlY2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5ncmlkIHtcclxuICAgICAgICAgICAgb3ZlcmZsb3cteDogaGlkZGVuO1xyXG4gICAgICAgICAgICBvdmVyZmxvdy15OiBoaWRkZW47XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgICAgICAgdmVydGljYWwtYWxpZ246IHRvcDtcclxuICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2NlY2VjZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdyaWQtc2NhbGUge1xyXG4gICAgICAgICAgICBjb2xvcjogIzZiNmI2YjtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2UwZTBlMDtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGVzbW9rZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdyaWQtaGVhZC1jZWxsIHtcclxuICAgICAgICAgICAgLypjb2xvcjogI2E2YTZhNjsqL1xyXG4gICAgICAgICAgICBib3JkZXItdG9wOiBub25lICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogbm9uZSAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICBsaW5lLWhlaWdodDogaW5oZXJpdDtcclxuICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xyXG4gICAgICAgICAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjY2VjZWNlO1xyXG4gICAgICAgICAgICAvKnRleHQtYWxpZ246IGNlbnRlcjsqL1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgICAgIGN1cnNvcjogZGVmYXVsdDtcclxuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgICAgICAtbW96LXVzZXItc2VsZWN0OiAtbW96LW5vbmU7XHJcbiAgICAgICAgICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5ncmlkLWRhdGEge1xyXG4gICAgICAgICAgICBvdmVyZmxvdzpoaWRkZW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5ncmlkLXJvdyB7XHJcbiAgICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTBlMGUwO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5ncmlkLXJvdzpob3ZlciB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlZWVlZWU7XHJcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdyaWQtY2VsbCB7XHJcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogbm9uZTtcclxuICAgICAgICAgICAgY29sb3I6ICM0NTQ1NDU7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgICAgICAgdmVydGljYWwtYWxpZ246IHRvcDtcclxuICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiA2cHg7XHJcbiAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDZweDtcclxuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5hY3Rpb25zLWJhciB7XHJcbiAgICAgICAgICAgIC8qYm9yZGVyLXRvcDogMXB4IHNvbGlkICNjZWNlY2U7Ki9cclxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlMGUwZTA7XHJcbiAgICAgICAgICAgIGNsZWFyOiBib3RoO1xyXG4gICAgICAgICAgICAvKm1hcmdpbi10b3A6IDkwcHg7Ki9cclxuICAgICAgICAgICAgaGVpZ2h0OiAyOHB4O1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiB3aGl0ZXNtb2tlO1xyXG4gICAgICAgICAgICBjb2xvcjogIzQ5NDk0OTtcclxuICAgICAgICAgICAgZm9udC1mYW1pbHk6IEFyaWFsLCBzYW5zLXNlcmlmO1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogMTVweDtcclxuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDI1cHg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5nYW50dC10cmVlLWNvbnRlbnQge1xyXG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDE1cHg7XHJcbiAgICAgICAgfVxyXG4gICAgYF0sXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcclxufSlcclxuZXhwb3J0IGNsYXNzIEdhbnR0QWN0aXZpdHlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIERvQ2hlY2sge1xyXG4gICAgQElucHV0KCkgcHJvamVjdDogYW55O1xyXG4gICAgQElucHV0KCkgb3B0aW9uczogYW55O1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbkdyaWRSb3dDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAgIEBPdXRwdXQoKSBvblBvcG92ZXJPcGVuOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICAgIHByaXZhdGUgdXBUcmlhbmdsZSA9ICcmI3gyNWIyOyc7IC8vIEJMQUNLIFVQLVBPSU5USU5HIFRSSUFOR0xFXHJcbiAgICBwcml2YXRlIGRvd25UcmlhbmdsZSA9ICcmI3gyNWJjOyc7IC8vIEJMQUNLIERPV04tUE9JTlRJTkcgVFJJQU5HTEVcclxuXHJcbiAgICBwcml2YXRlIHN0YXJ0OiBEYXRlO1xyXG4gICAgcHJpdmF0ZSBlbmQ6IERhdGU7XHJcbiAgICBwcml2YXRlIHRpbWVTY2FsZTogYW55O1xyXG5cclxuICAgIHByaXZhdGUgYWN0aXZpdHlDb250YWluZXJTaXplczogYW55O1xyXG5cclxuICAgIGFjdGl2aXR5QWN0aW9ucyA9IHtcclxuICAgICAgICBleHBhbmRlZDogZmFsc2UsXHJcbiAgICAgICAgZXhwYW5kZWRJY29uOiB0aGlzLmRvd25UcmlhbmdsZVxyXG4gICAgfTtcclxuICAgIGNvbnRhaW5lckhlaWdodDogYW55O1xyXG4gICAgY29udGFpbmVyV2lkdGg6IGFueTtcclxuXHJcbiAgICBnYW50dEFjdGl2aXR5SGVpZ2h0OiBhbnk7XHJcbiAgICBnYW50dEFjdGl2aXR5V2lkdGg6IGFueTtcclxuXHJcbiAgICBwcml2YXRlIHNjYWxlOiBhbnkgPSB7XHJcbiAgICAgICAgc3RhcnQ6IG51bGwsXHJcbiAgICAgICAgZW5kOiBudWxsXHJcbiAgICB9O1xyXG5cclxuICAgIGRpbWVuc2lvbnMgPSB7XHJcbiAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgIHdpZHRoOiAwXHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBncmlkQ29sdW1uczogYW55W10gPSBbXHJcbiAgICAgICAgeyBuYW1lOiAnJywgbGVmdDogMCwgd2lkdGg6IDE2IH0sXHJcbiAgICAgICAgeyBuYW1lOiAnR3J1cGEgYXNvcnR5bWVudMOzdycsIGxlZnQ6IDAsIHdpZHRoOiAzMzAgfVxyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgZWxlbTogRWxlbWVudFJlZixcclxuICAgICAgICBwdWJsaWMgZ2FudHRTZXJ2aWNlOiBHYW50dFNlcnZpY2UpIHtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICAvLyBDYWNoZSB0aGUgcHJvamVjdCBkYXRhIGFuZCBvbmx5IHdvcmsgd2l0aCB0aGF0LiBPbmx5IHNob3cgcGFyZW50IHRhc2tzIGJ5IGRlZmF1bHRcclxuICAgICAgICB0aGlzLmdhbnR0U2VydmljZS5UQVNLX0NBQ0hFID0gdGhpcy5wcm9qZWN0LnRhc2tzO1xyXG4gICAgICAgIHRoaXMuZ2FudHRTZXJ2aWNlLlRJTUVfU0NBTEUgPSB0aGlzLmdhbnR0U2VydmljZS5jYWxjdWxhdGVTY2FsZSh0aGlzLm9wdGlvbnMuc2NhbGUuc3RhcnQsIHRoaXMub3B0aW9ucy5zY2FsZS5lbmQpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXJ0ID0gdGhpcy5vcHRpb25zLnNjYWxlLnN0YXJ0O1xyXG4gICAgICAgIHRoaXMuZW5kID0gdGhpcy5vcHRpb25zLnNjYWxlLmVuZDtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lcldpZHRoID0gdGhpcy5jYWxjdWxhdGVDb250YWluZXJXaWR0aCgpO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVySGVpZ2h0ID0gdGhpcy5jYWxjdWxhdGVDb250YWluZXJIZWlnaHQoKTtcclxuICAgICAgICB0aGlzLmFjdGl2aXR5Q29udGFpbmVyU2l6ZXMgPSB0aGlzLmdhbnR0U2VydmljZS5jYWxjdWxhdGVBY3Rpdml0eUNvbnRhaW5lckRpbWVuc2lvbnMoKTtcclxuXHJcbiAgICAgICAgLy8gaW1wb3J0YW50IHRoYXQgdGhlc2UgYXJlIGNhbGxlZCBsYXN0IGFzIGl0IHJlbGllcyBvbiB2YWx1ZXMgY2FsY3VsYXRlZCBhYm92ZS5cclxuICAgICAgICB0aGlzLnNldFNjYWxlKCk7XHJcbiAgICAgICAgdGhpcy5zZXREaW1lbnNpb25zKCk7XHJcbiAgICAgICAgdGhpcy5zZXRTaXplcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDdXN0b20gbW9kZWwgY2hlY2sgKi9cclxuICAgIG5nRG9DaGVjaygpIHtcclxuICAgICAgICAvLyBkbyBhIGNoZWNrIHRvIHNlZSB3aGV0aGVyIGFueSBuZXcgdGFza3MgaGF2ZSBiZWVuIGFkZGVkLiBJZiB0aGUgdGFzayBpcyBhIGNoaWxkIHRoZW4gcHVzaCBpbnRvIGFycmF5IGlmIHRyZWUgZXhwYW5kZWQ/XHJcbiAgICAgICAgdGhpcy5nYW50dFNlcnZpY2UuZG9UYXNrQ2hlY2sodGhpcy5wcm9qZWN0LnRhc2tzLCB0aGlzLm9wdGlvbnMuc2NhbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBPbiB2ZXJ0aWNhbCBzY3JvbGwgc2V0IHRoZSBzY3JvbGwgdG9wIG9mIGdyaWQgYW5kIGFjdGl2aXR5ICAqL1xyXG4gICAgb25WZXJ0aWNhbFNjcm9sbCh2ZXJ0aWNhbFNjcm9sbDogYW55LCBnYW50dEdyaWQ6IGFueSwgZ2FudHRBY3Rpdml0eUFyZWE6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZ2FudHRTZXJ2aWNlLnNjcm9sbFRvcCh2ZXJ0aWNhbFNjcm9sbCwgZ2FudHRHcmlkLCBnYW50dEFjdGl2aXR5QXJlYSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ3JpZFJvd0NsaWNrKHRhc2spIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLm9uR3JpZFJvd0NsaWNrLmVtaXQodGFzayk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7IH1cclxuICAgIH1cclxuXHJcbiAgICBwb3BvdmVyT3Blbih0YXNrKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5vblBvcG92ZXJPcGVuLmVtaXQodGFzayk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7IH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogT24gcmVzaXplIG9mIGJyb3dzZXIgd2luZG93IGR5bmFtaWNhbGx5IGFkanVzdCBnYW50dCBhY3Rpdml0eSBoZWlnaHQgYW5kIHdpZHRoICovXHJcbiAgICBvblJlc2l6ZShldmVudDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgYWN0aXZpdHlDb250YWluZXJTaXplcyA9IHRoaXMuZ2FudHRTZXJ2aWNlLmNhbGN1bGF0ZUFjdGl2aXR5Q29udGFpbmVyRGltZW5zaW9ucygpO1xyXG4gICAgICAgIHRoaXMuZ2FudHRBY3Rpdml0eUhlaWdodCA9IGFjdGl2aXR5Q29udGFpbmVyU2l6ZXMuaGVpZ2h0ICsgJ3B4JztcclxuICAgICAgICB0aGlzLmdhbnR0QWN0aXZpdHlXaWR0aCA9IGFjdGl2aXR5Q29udGFpbmVyU2l6ZXMud2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2NhbGUoKSB7XHJcbiAgICAgICAgdGhpcy5zY2FsZS5zdGFydCA9IHRoaXMuc3RhcnQ7XHJcbiAgICAgICAgdGhpcy5zY2FsZS5lbmQgPSB0aGlzLmVuZDtcclxuICAgIH1cclxuXHJcbiAgICBzZXREaW1lbnNpb25zKCkge1xyXG4gICAgICAgIHRoaXMuZGltZW5zaW9ucy5oZWlnaHQgPSB0aGlzLmNvbnRhaW5lckhlaWdodDtcclxuICAgICAgICB0aGlzLmRpbWVuc2lvbnMud2lkdGggPSB0aGlzLmNvbnRhaW5lcldpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEdyaWRSb3dTdHlsZSgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICdoZWlnaHQnOiB0aGlzLmdhbnR0U2VydmljZS5yb3dIZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAnbGluZS1oZWlnaHQnOiB0aGlzLmdhbnR0U2VydmljZS5yb3dIZWlnaHQgKyAncHgnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRHcmlkU2NhbGVTdHlsZSgpIHtcclxuICAgICAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmdhbnR0U2VydmljZS5yb3dIZWlnaHQgKyAzMDtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAnaGVpZ2h0JzogaGVpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogaGVpZ2h0ICsgJ3B4J1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVDb250YWluZXJIZWlnaHQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nYW50dFNlcnZpY2UuVEFTS19DQUNIRS5sZW5ndGggKiB0aGlzLmdhbnR0U2VydmljZS5yb3dIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVDb250YWluZXJXaWR0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdhbnR0U2VydmljZS5USU1FX1NDQUxFLmxlbmd0aCAqIHRoaXMuZ2FudHRTZXJ2aWNlLmNlbGxXaWR0aCArIHRoaXMuZ2FudHRTZXJ2aWNlLmNlbGxXaWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFNpemVzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZ2FudHRBY3Rpdml0eUhlaWdodCA9IHRoaXMuYWN0aXZpdHlDb250YWluZXJTaXplcy5oZWlnaHQgKyAncHgnO1xyXG4gICAgICAgIHRoaXMuZ2FudHRBY3Rpdml0eVdpZHRoID0gdGhpcy5hY3Rpdml0eUNvbnRhaW5lclNpemVzLndpZHRoO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==