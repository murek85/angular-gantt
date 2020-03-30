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
     * @param {?} event
     * @param {?} elem
     * @return {?}
     */
    GanttActivityComponent.prototype.doWheel = /**
     * @param {?} event
     * @param {?} elem
     * @return {?}
     */
    function (event, elem) {
        event.preventDefault();
        event.stopPropagation();
        if ((event.wheelDelta || event.detail) > 0) {
            elem.scrollLeft -= 100;
        }
        else {
            elem.scrollLeft += 100;
        }
        return false;
    };
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
                    template: "\n    <div class=\"grid\" #ganttGrid>\n        <div class=\"grid-scale\" [ngStyle]=\"setGridScaleStyle()\">\n            <div class=\"grid-head-cell\"\n                *ngFor=\"let column of gridColumns\" [style.width]=\"column.width + 'px'\"\n                [style.left]=\"column.left + 'px'\">\n\n                <label>\n                    {{column.name}}\n                </label>\n            </div>\n        </div>\n        <div class=\"grid-data\"\n            #ganttGridData\n            [ngStyle]=\"{ 'height': ganttService.calculateGanttHeight() }\">\n\n            <div #row\n                *ngFor=\"let data of ganttService.TASK_CACHE\" class=\"grid-row\"\n                [ngStyle]=\"setGridRowStyle()\">\n\n                <div class=\"grid-cell\"\n                    [ngStyle]=\"{ 'width': gridColumns[1].width + 'px', 'padding-left': 0 }\">\n\n                    <div class=\"gantt-tree-content\">\n                        <span [ngStyle]=\"{ borderLeftColor: data.color.primary, borderLeftWidth: .35 + 'em', \n                            borderLeftStyle: 'solid', paddingRight: .5 + 'em'}\"></span>\n                        <span>{{data.name}}</span>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"gantt-activity\" #ganttActivity\n        (wheel)=\"doWheel($event, ganttActivity)\"\n        (window:resize)=\"onResize($event)\"\n        [ngStyle]=\"{ 'height': ganttService.calculateGanttHeight() + 60, 'width': calculateColumnsWidth() }\">\n\n        <time-scale [timeScaleMonth]=\"ganttService.MONTH_SCALE\"\n            [timeScaleWeekend]=\"ganttService.TIME_SCALE\"\n            [dimensions]=\"dimensions\"\n            [scale]=\"options.scale\"></time-scale>\n        <div class=\"gantt-activity-area\"\n            #ganttActivityArea\n            [ngStyle]=\"{ 'height': ganttService.calculateGanttHeight(), 'width': containerWidth + 36 + 'px' }\">\n\n            <activity-background [timeScale]=\"ganttService.TIME_SCALE\"\n                [tasks]=\"ganttService.TASK_CACHE\"></activity-background>\n            <activity-bars [timeScale]=\"ganttService.TIME_SCALE\"\n                [dimensions]=\"dimensions\"\n                [tasks]=\"ganttService.TASK_CACHE\"\n                (onGridRowClick)=\"gridRowClick($event)\"\n                (onPopoverOpen)=\"popoverOpen($event)\"></activity-bars>\n        </div>\n    </div>\n    ",
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
    GanttActivityComponent.prototype.scale;
    /**
     * @type {?}
     * @private
     */
    GanttActivityComponent.prototype.activityContainerSizes;
    /** @type {?} */
    GanttActivityComponent.prototype.containerHeight;
    /** @type {?} */
    GanttActivityComponent.prototype.containerWidth;
    /** @type {?} */
    GanttActivityComponent.prototype.ganttActivityHeight;
    /** @type {?} */
    GanttActivityComponent.prototype.ganttActivityWidth;
    /** @type {?} */
    GanttActivityComponent.prototype.dimensions;
    /** @type {?} */
    GanttActivityComponent.prototype.gridColumns;
    /** @type {?} */
    GanttActivityComponent.prototype.elem;
    /** @type {?} */
    GanttActivityComponent.prototype.ganttService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQtYWN0aXZpdHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1nYW50dC8iLCJzb3VyY2VzIjpbImxpYi9hY3Rpdml0eS9nYW50dC1hY3Rpdml0eS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFHLHVCQUF1QixFQUFzQixNQUFNLGVBQWUsQ0FBQztBQUV6SSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFHaEU7SUErTEksZ0NBQ1csSUFBZ0IsRUFDaEIsWUFBMEI7UUFEMUIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQWhDM0IsbUJBQWMsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUM1RCxrQkFBYSxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO1FBTTdELFVBQUssR0FBVztZQUNwQixLQUFLLEVBQUUsSUFBSTtZQUNYLEdBQUcsRUFBRSxJQUFJO1NBQ1osQ0FBQztRQVVGLGVBQVUsR0FBRztZQUNULE1BQU0sRUFBRSxDQUFDO1lBQ1QsS0FBSyxFQUFFLENBQUM7U0FDWCxDQUFDO1FBRUYsZ0JBQVcsR0FBa0I7WUFDekIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRTtZQUNoQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO1NBQzNDLENBQUM7SUFLRixDQUFDOzs7Ozs7SUFFRCx3Q0FBTzs7Ozs7SUFBUCxVQUFRLEtBQUssRUFBRSxJQUFpQjtRQUM1QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXhCLElBQUks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OlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBPbkNoYW5nZXMsIERvQ2hlY2sgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEdhbnR0U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9nYW50dC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSUdyaWRDb2x1bW4sIElHYW50dE9wdGlvbnMsIFByb2plY3QsIElTY2FsZSB9IGZyb20gJy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdnYW50dC1hY3Rpdml0eScsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBjbGFzcz1cImdyaWRcIiAjZ2FudHRHcmlkPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJncmlkLXNjYWxlXCIgW25nU3R5bGVdPVwic2V0R3JpZFNjYWxlU3R5bGUoKVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JpZC1oZWFkLWNlbGxcIlxyXG4gICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBncmlkQ29sdW1uc1wiIFtzdHlsZS53aWR0aF09XCJjb2x1bW4ud2lkdGggKyAncHgnXCJcclxuICAgICAgICAgICAgICAgIFtzdHlsZS5sZWZ0XT1cImNvbHVtbi5sZWZ0ICsgJ3B4J1wiPlxyXG5cclxuICAgICAgICAgICAgICAgIDxsYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICB7e2NvbHVtbi5uYW1lfX1cclxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJncmlkLWRhdGFcIlxyXG4gICAgICAgICAgICAjZ2FudHRHcmlkRGF0YVxyXG4gICAgICAgICAgICBbbmdTdHlsZV09XCJ7ICdoZWlnaHQnOiBnYW50dFNlcnZpY2UuY2FsY3VsYXRlR2FudHRIZWlnaHQoKSB9XCI+XHJcblxyXG4gICAgICAgICAgICA8ZGl2ICNyb3dcclxuICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBkYXRhIG9mIGdhbnR0U2VydmljZS5UQVNLX0NBQ0hFXCIgY2xhc3M9XCJncmlkLXJvd1wiXHJcbiAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJzZXRHcmlkUm93U3R5bGUoKVwiPlxyXG5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmlkLWNlbGxcIlxyXG4gICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsgJ3dpZHRoJzogZ3JpZENvbHVtbnNbMV0ud2lkdGggKyAncHgnLCAncGFkZGluZy1sZWZ0JzogMCB9XCI+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC10cmVlLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gW25nU3R5bGVdPVwieyBib3JkZXJMZWZ0Q29sb3I6IGRhdGEuY29sb3IucHJpbWFyeSwgYm9yZGVyTGVmdFdpZHRoOiAuMzUgKyAnZW0nLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckxlZnRTdHlsZTogJ3NvbGlkJywgcGFkZGluZ1JpZ2h0OiAuNSArICdlbSd9XCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57e2RhdGEubmFtZX19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtYWN0aXZpdHlcIiAjZ2FudHRBY3Rpdml0eVxyXG4gICAgICAgICh3aGVlbCk9XCJkb1doZWVsKCRldmVudCwgZ2FudHRBY3Rpdml0eSlcIlxyXG4gICAgICAgICh3aW5kb3c6cmVzaXplKT1cIm9uUmVzaXplKCRldmVudClcIlxyXG4gICAgICAgIFtuZ1N0eWxlXT1cInsgJ2hlaWdodCc6IGdhbnR0U2VydmljZS5jYWxjdWxhdGVHYW50dEhlaWdodCgpICsgNjAsICd3aWR0aCc6IGNhbGN1bGF0ZUNvbHVtbnNXaWR0aCgpIH1cIj5cclxuXHJcbiAgICAgICAgPHRpbWUtc2NhbGUgW3RpbWVTY2FsZU1vbnRoXT1cImdhbnR0U2VydmljZS5NT05USF9TQ0FMRVwiXHJcbiAgICAgICAgICAgIFt0aW1lU2NhbGVXZWVrZW5kXT1cImdhbnR0U2VydmljZS5USU1FX1NDQUxFXCJcclxuICAgICAgICAgICAgW2RpbWVuc2lvbnNdPVwiZGltZW5zaW9uc1wiXHJcbiAgICAgICAgICAgIFtzY2FsZV09XCJvcHRpb25zLnNjYWxlXCI+PC90aW1lLXNjYWxlPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1hY3Rpdml0eS1hcmVhXCJcclxuICAgICAgICAgICAgI2dhbnR0QWN0aXZpdHlBcmVhXHJcbiAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsgJ2hlaWdodCc6IGdhbnR0U2VydmljZS5jYWxjdWxhdGVHYW50dEhlaWdodCgpLCAnd2lkdGgnOiBjb250YWluZXJXaWR0aCArIDM2ICsgJ3B4JyB9XCI+XHJcblxyXG4gICAgICAgICAgICA8YWN0aXZpdHktYmFja2dyb3VuZCBbdGltZVNjYWxlXT1cImdhbnR0U2VydmljZS5USU1FX1NDQUxFXCJcclxuICAgICAgICAgICAgICAgIFt0YXNrc109XCJnYW50dFNlcnZpY2UuVEFTS19DQUNIRVwiPjwvYWN0aXZpdHktYmFja2dyb3VuZD5cclxuICAgICAgICAgICAgPGFjdGl2aXR5LWJhcnMgW3RpbWVTY2FsZV09XCJnYW50dFNlcnZpY2UuVElNRV9TQ0FMRVwiXHJcbiAgICAgICAgICAgICAgICBbZGltZW5zaW9uc109XCJkaW1lbnNpb25zXCJcclxuICAgICAgICAgICAgICAgIFt0YXNrc109XCJnYW50dFNlcnZpY2UuVEFTS19DQUNIRVwiXHJcbiAgICAgICAgICAgICAgICAob25HcmlkUm93Q2xpY2spPVwiZ3JpZFJvd0NsaWNrKCRldmVudClcIlxyXG4gICAgICAgICAgICAgICAgKG9uUG9wb3Zlck9wZW4pPVwicG9wb3Zlck9wZW4oJGV2ZW50KVwiPjwvYWN0aXZpdHktYmFycz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICAgIHN0eWxlczogW2BcclxuICAgICAgICAuZ2FudHQtYWN0aXZpdHkge1xyXG4gICAgICAgICAgICBvdmVyZmxvdy15OiBoaWRkZW47XHJcbiAgICAgICAgICAgIG92ZXJmbG93LXg6IHNjcm9sbDtcclxuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5nYW50dC1hY3Rpdml0eS1hcmVhIHtcclxuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgICAgICBvdmVyZmxvdy14OiBoaWRkZW47XHJcbiAgICAgICAgICAgIG92ZXJmbG93LXk6IGhpZGRlbjtcclxuICAgICAgICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdhbnR0LXZlcnRpY2FsLXNjcm9sbCB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gICAgICAgICAgICBvdmVyZmxvdy14OiBoaWRkZW47XHJcbiAgICAgICAgICAgIG92ZXJmbG93LXk6IHNjcm9sbDtcclxuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgICAgICByaWdodDogLTEwcHg7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgICAgICB0b3A6IC0xcHg7XHJcbiAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNjZWNlY2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5ncmlkIHtcclxuICAgICAgICAgICAgb3ZlcmZsb3cteDogaGlkZGVuO1xyXG4gICAgICAgICAgICBvdmVyZmxvdy15OiBoaWRkZW47XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgICAgICAgdmVydGljYWwtYWxpZ246IHRvcDtcclxuICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2NlY2VjZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdyaWQtc2NhbGUge1xyXG4gICAgICAgICAgICBjb2xvcjogIzZiNmI2YjtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2UwZTBlMDtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGVzbW9rZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdyaWQtaGVhZC1jZWxsIHtcclxuICAgICAgICAgICAgLypjb2xvcjogI2E2YTZhNjsqL1xyXG4gICAgICAgICAgICBib3JkZXItdG9wOiBub25lICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogbm9uZSAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICBsaW5lLWhlaWdodDogaW5oZXJpdDtcclxuICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xyXG4gICAgICAgICAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjY2VjZWNlO1xyXG4gICAgICAgICAgICAvKnRleHQtYWxpZ246IGNlbnRlcjsqL1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgICAgIGN1cnNvcjogZGVmYXVsdDtcclxuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgICAgICAtbW96LXVzZXItc2VsZWN0OiAtbW96LW5vbmU7XHJcbiAgICAgICAgICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5ncmlkLWRhdGEge1xyXG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ3JpZC1yb3cge1xyXG4gICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2UwZTBlMDtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ3JpZC1yb3c6aG92ZXIge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlZWVlO1xyXG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5ncmlkLWNlbGwge1xyXG4gICAgICAgICAgICBib3JkZXItcmlnaHQ6IG5vbmU7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjNDU0NTQ1O1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XHJcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogNnB4O1xyXG4gICAgICAgICAgICBwYWRkaW5nLXJpZ2h0OiA2cHg7XHJcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICAgIH1cclxuICAgICAgICAuYWN0aW9ucy1iYXIge1xyXG4gICAgICAgICAgICAvKmJvcmRlci10b3A6IDFweCBzb2xpZCAjY2VjZWNlOyovXHJcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTBlMGUwO1xyXG4gICAgICAgICAgICBjbGVhcjogYm90aDtcclxuICAgICAgICAgICAgLyptYXJnaW4tdG9wOiA5MHB4OyovXHJcbiAgICAgICAgICAgIGhlaWdodDogMjhweDtcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogd2hpdGVzbW9rZTtcclxuICAgICAgICAgICAgY29sb3I6ICM0OTQ5NDk7XHJcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiBBcmlhbCwgc2Fucy1zZXJpZjtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDE1cHg7XHJcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAyNXB4O1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ2FudHQtdHJlZS1jb250ZW50IHtcclxuICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAxNXB4O1xyXG4gICAgICAgIH1cclxuICAgIGBdLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHYW50dEFjdGl2aXR5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBEb0NoZWNrIHtcclxuICAgIEBJbnB1dCgpIHByb2plY3Q6IFByb2plY3Q7XHJcbiAgICBASW5wdXQoKSBvcHRpb25zOiBJR2FudHRPcHRpb25zO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbkdyaWRSb3dDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAgIEBPdXRwdXQoKSBvblBvcG92ZXJPcGVuOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICAgIHByaXZhdGUgc3RhcnQ6IERhdGU7XHJcbiAgICBwcml2YXRlIGVuZDogRGF0ZTtcclxuICAgIHByaXZhdGUgdGltZVNjYWxlOiBhbnk7XHJcblxyXG4gICAgcHJpdmF0ZSBzY2FsZTogSVNjYWxlID0ge1xyXG4gICAgICAgIHN0YXJ0OiBudWxsLFxyXG4gICAgICAgIGVuZDogbnVsbFxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGFjdGl2aXR5Q29udGFpbmVyU2l6ZXM6IGFueTtcclxuXHJcbiAgICBjb250YWluZXJIZWlnaHQ6IGFueTtcclxuICAgIGNvbnRhaW5lcldpZHRoOiBhbnk7XHJcblxyXG4gICAgZ2FudHRBY3Rpdml0eUhlaWdodDogYW55O1xyXG4gICAgZ2FudHRBY3Rpdml0eVdpZHRoOiBhbnk7XHJcblxyXG4gICAgZGltZW5zaW9ucyA9IHtcclxuICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgd2lkdGg6IDBcclxuICAgIH07XHJcblxyXG4gICAgZ3JpZENvbHVtbnM6IElHcmlkQ29sdW1uW10gPSBbXHJcbiAgICAgICAgeyBuYW1lOiAnJywgbGVmdDogMCwgd2lkdGg6IDE2IH0sXHJcbiAgICAgICAgeyBuYW1lOiAnWmFkYW5pZScsIGxlZnQ6IDAsIHdpZHRoOiAzMzAgfVxyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgZWxlbTogRWxlbWVudFJlZixcclxuICAgICAgICBwdWJsaWMgZ2FudHRTZXJ2aWNlOiBHYW50dFNlcnZpY2UpIHtcclxuICAgIH1cclxuXHJcbiAgICBkb1doZWVsKGV2ZW50LCBlbGVtOiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgIGlmICgoZXZlbnQud2hlZWxEZWx0YSB8fCBldmVudC5kZXRhaWwpID4gMCkge1xyXG4gICAgICAgICAgICBlbGVtLnNjcm9sbExlZnQgLT0gMTAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVsZW0uc2Nyb2xsTGVmdCArPSAxMDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICAvLyBDYWNoZSB0aGUgcHJvamVjdCBkYXRhIGFuZCBvbmx5IHdvcmsgd2l0aCB0aGF0LiBPbmx5IHNob3cgcGFyZW50IHRhc2tzIGJ5IGRlZmF1bHRcclxuICAgICAgICB0aGlzLmdhbnR0U2VydmljZS5UQVNLX0NBQ0hFID0gdGhpcy5wcm9qZWN0LnRhc2tzO1xyXG4gICAgICAgIHRoaXMuZ2FudHRTZXJ2aWNlLlRJTUVfU0NBTEUgPSB0aGlzLmdhbnR0U2VydmljZS5jYWxjdWxhdGVTY2FsZSh0aGlzLm9wdGlvbnMuc2NhbGUuc3RhcnQsIHRoaXMub3B0aW9ucy5zY2FsZS5lbmQpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXJ0ID0gdGhpcy5vcHRpb25zLnNjYWxlLnN0YXJ0O1xyXG4gICAgICAgIHRoaXMuZW5kID0gdGhpcy5vcHRpb25zLnNjYWxlLmVuZDtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lcldpZHRoID0gdGhpcy5jYWxjdWxhdGVDb250YWluZXJXaWR0aCgpO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVySGVpZ2h0ID0gdGhpcy5jYWxjdWxhdGVDb250YWluZXJIZWlnaHQoKTtcclxuICAgICAgICB0aGlzLmFjdGl2aXR5Q29udGFpbmVyU2l6ZXMgPSB0aGlzLmdhbnR0U2VydmljZS5jYWxjdWxhdGVBY3Rpdml0eUNvbnRhaW5lckRpbWVuc2lvbnMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5ncmlkQ29sdW1ucyA9IHRoaXMub3B0aW9ucy5ncmlkQ29sdW1ucyA/IHRoaXMub3B0aW9ucy5ncmlkQ29sdW1ucyA6IHRoaXMuZ3JpZENvbHVtbnM7XHJcblxyXG4gICAgICAgIC8vIGltcG9ydGFudCB0aGF0IHRoZXNlIGFyZSBjYWxsZWQgbGFzdCBhcyBpdCByZWxpZXMgb24gdmFsdWVzIGNhbGN1bGF0ZWQgYWJvdmUuXHJcbiAgICAgICAgdGhpcy5zZXRTY2FsZSgpO1xyXG4gICAgICAgIHRoaXMuc2V0RGltZW5zaW9ucygpO1xyXG4gICAgICAgIHRoaXMuc2V0U2l6ZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ3VzdG9tIG1vZGVsIGNoZWNrICovXHJcbiAgICBuZ0RvQ2hlY2soKSB7XHJcbiAgICAgICAgLy8gZG8gYSBjaGVjayB0byBzZWUgd2hldGhlciBhbnkgbmV3IHRhc2tzIGhhdmUgYmVlbiBhZGRlZC4gSWYgdGhlIHRhc2sgaXMgYSBjaGlsZCB0aGVuIHB1c2ggaW50byBhcnJheSBpZiB0cmVlIGV4cGFuZGVkP1xyXG4gICAgICAgIHRoaXMuZ2FudHRTZXJ2aWNlLmRvVGFza0NoZWNrKHRoaXMucHJvamVjdC50YXNrcywgdGhpcy5vcHRpb25zLnNjYWxlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogT24gdmVydGljYWwgc2Nyb2xsIHNldCB0aGUgc2Nyb2xsIHRvcCBvZiBncmlkIGFuZCBhY3Rpdml0eSAgKi9cclxuICAgIG9uVmVydGljYWxTY3JvbGwodmVydGljYWxTY3JvbGw6IGFueSwgZ2FudHRHcmlkOiBhbnksIGdhbnR0QWN0aXZpdHlBcmVhOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmdhbnR0U2VydmljZS5zY3JvbGxUb3AodmVydGljYWxTY3JvbGwsIGdhbnR0R3JpZCwgZ2FudHRBY3Rpdml0eUFyZWEpO1xyXG4gICAgfVxyXG5cclxuICAgIGdyaWRSb3dDbGljayh0YXNrKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5vbkdyaWRSb3dDbGljay5lbWl0KHRhc2spO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikgeyB9XHJcbiAgICB9XHJcblxyXG4gICAgcG9wb3Zlck9wZW4odGFzaykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMub25Qb3BvdmVyT3Blbi5lbWl0KHRhc2spO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikgeyB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIE9uIHJlc2l6ZSBvZiBicm93c2VyIHdpbmRvdyBkeW5hbWljYWxseSBhZGp1c3QgZ2FudHQgYWN0aXZpdHkgaGVpZ2h0IGFuZCB3aWR0aCAqL1xyXG4gICAgb25SZXNpemUoZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGFjdGl2aXR5Q29udGFpbmVyU2l6ZXMgPSB0aGlzLmdhbnR0U2VydmljZS5jYWxjdWxhdGVBY3Rpdml0eUNvbnRhaW5lckRpbWVuc2lvbnMoKTtcclxuICAgICAgICB0aGlzLmdhbnR0QWN0aXZpdHlIZWlnaHQgPSBhY3Rpdml0eUNvbnRhaW5lclNpemVzLmhlaWdodCArICdweCc7XHJcbiAgICAgICAgdGhpcy5nYW50dEFjdGl2aXR5V2lkdGggPSBhY3Rpdml0eUNvbnRhaW5lclNpemVzLndpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFNjYWxlKCkge1xyXG4gICAgICAgIHRoaXMuc2NhbGUuc3RhcnQgPSB0aGlzLnN0YXJ0O1xyXG4gICAgICAgIHRoaXMuc2NhbGUuZW5kID0gdGhpcy5lbmQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGltZW5zaW9ucygpIHtcclxuICAgICAgICB0aGlzLmRpbWVuc2lvbnMuaGVpZ2h0ID0gdGhpcy5jb250YWluZXJIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5kaW1lbnNpb25zLndpZHRoID0gdGhpcy5jb250YWluZXJXaWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRHcmlkUm93U3R5bGUoKTogYW55IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAnaGVpZ2h0JzogdGhpcy5nYW50dFNlcnZpY2Uucm93SGVpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogdGhpcy5nYW50dFNlcnZpY2Uucm93SGVpZ2h0ICsgJ3B4J1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0R3JpZFNjYWxlU3R5bGUoKSB7XHJcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5nYW50dFNlcnZpY2Uucm93SGVpZ2h0ICsgMzA7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ2hlaWdodCc6IGhlaWdodCArICdweCcsXHJcbiAgICAgICAgICAgICdsaW5lLWhlaWdodCc6IGhlaWdodCArICdweCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGN1bGF0ZUNvbHVtbnNXaWR0aCgpIHtcclxuICAgICAgICBjb25zdCBnYW50dEFjdGl2aXR5V2lkdGggPSB0aGlzLmdyaWRDb2x1bW5zLm1hcChjb2x1bW4gPT4geyByZXR1cm4gY29sdW1uLndpZHRoIH0pLnJlZHVjZSgocHYsIGN2KSA9PiBwdiArIGN2LCAwKSArIDE7XHJcbiAgICAgICAgcmV0dXJuIGBjYWxjKDEwMCUgLSAkeyhnYW50dEFjdGl2aXR5V2lkdGgpfXB4KWA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVDb250YWluZXJIZWlnaHQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nYW50dFNlcnZpY2UuVEFTS19DQUNIRS5sZW5ndGggKiB0aGlzLmdhbnR0U2VydmljZS5yb3dIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVDb250YWluZXJXaWR0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdhbnR0U2VydmljZS5USU1FX1NDQUxFLmxlbmd0aCAqIHRoaXMuZ2FudHRTZXJ2aWNlLmNlbGxXaWR0aCArIHRoaXMuZ2FudHRTZXJ2aWNlLmNlbGxXaWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFNpemVzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZ2FudHRBY3Rpdml0eUhlaWdodCA9IHRoaXMuYWN0aXZpdHlDb250YWluZXJTaXplcy5oZWlnaHQgKyAncHgnO1xyXG4gICAgICAgIHRoaXMuZ2FudHRBY3Rpdml0eVdpZHRoID0gdGhpcy5hY3Rpdml0eUNvbnRhaW5lclNpemVzLndpZHRoO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==