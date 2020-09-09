/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { GanttService } from '../shared/services/gantt.service';
export class GanttActivityComponent {
    /**
     * @param {?} elem
     * @param {?} ganttService
     */
    constructor(elem, ganttService) {
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
    doWheel(event, elem) {
        event.preventDefault();
        event.stopPropagation();
        // chome
        if (event.wheelDelta) {
            if ((event.wheelDelta || event.detail) > 0) {
                elem.scrollLeft -= 100;
            }
            else {
                elem.scrollLeft += 100;
            }
            // firefox
        }
        else {
            if (event.deltaY > 0) {
                elem.scrollLeft += 100;
            }
            else {
                elem.scrollLeft -= 100;
            }
        }
        return false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
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
    }
    /**
     * Custom model check
     * @return {?}
     */
    ngDoCheck() {
        // do a check to see whether any new tasks have been added. If the task is a child then push into array if tree expanded?
        this.ganttService.doTaskCheck(this.project.tasks, this.options.scale);
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
     * @param {?} task
     * @return {?}
     */
    gridRowClick(task) {
        try {
            this.onGridRowClick.emit(task);
        }
        catch (err) { }
    }
    /**
     * @param {?} task
     * @return {?}
     */
    popoverOpen(task) {
        try {
            this.onPopoverOpen.emit(task);
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
        const activityContainerSizes = this.ganttService.calculateActivityContainerDimensions();
        this.ganttActivityHeight = activityContainerSizes.height + 'px';
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
     * @return {?}
     */
    setGridRowStyle() {
        return {
            'height': this.ganttService.rowHeight + 'px',
            'line-height': this.ganttService.rowHeight + 'px'
        };
    }
    /**
     * @return {?}
     */
    setGridScaleStyle() {
        /** @type {?} */
        const height = this.ganttService.rowHeight + 30;
        return {
            'height': height + 'px',
            'line-height': height + 'px'
        };
    }
    /**
     * @return {?}
     */
    calculateColumnsWidth() {
        /** @type {?} */
        const ganttActivityWidth = this.gridColumns.map(column => { return column.width; }).reduce((pv, cv) => pv + cv, 0) + 1;
        return `calc(100% - ${(ganttActivityWidth)}px)`;
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
        return this.ganttService.TIME_SCALE.length * this.ganttService.cellWidth + this.ganttService.cellWidth;
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

    <div class="grid" #ganttGrid>
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
                *ngFor="let data of ganttService.TASK_CACHE" class="grid-row"
                [ngStyle]="setGridRowStyle()">

                <mde-popover #appPopover="mdePopover"
                    [mdePopoverEnterDelay]="100"
                    [mdePopoverLeaveDelay]="0"
                    [mdePopoverPositionY]="'above'"
                    [mdePopoverOverlapTrigger]="false"
                    [mdePopoverDisableAnimation]="false"
                    [mdePopoverArrowWidth]="8"
                    [mdePopoverArrowColor]="'black'"
                    mdePopoverPlacement="bottom">

                    <mat-card style="max-width: 340px; padding: 3px 8px;
                        color: #ffffff;
                        text-align: center;
                        background-color: #000000;
                        border-radius: 4px;">
                        <span style="z-index: 1070;
                            display: block;
                            font-family: 'Lato','Helvetica Neue',Helvetica,Arial,sans-serif;
                            font-style: normal;
                            font-weight: normal;
                            letter-spacing: normal;
                            line-break: auto;
                            line-height: 1.42857143;
                            text-align: left;
                            text-align: start;
                            text-decoration: none;
                            text-shadow: none;
                            text-transform: none;
                            white-space: normal;
                            word-break: normal;
                            word-spacing: normal;
                            word-wrap: normal;
                            font-size: 13px;">{{data.name}}</span>
                    </mat-card>
                </mde-popover>

                <div class="grid-cell"
                    [mdePopoverTriggerFor]="appPopover"
                    [mdePopoverBackdropCloseOnClick]="false"
                    mdePopoverOffsetX="25"
                    mdePopoverOffsetY="0"
                    [ngStyle]="{ 'width': gridColumns[1].width + 'px', 'padding-left': 0 }">

                    <div class="gantt-tree-content">
                        <span [ngStyle]="{ borderLeftColor: data.color.primary, borderLeftWidth: .35 + 'em', 
                            borderLeftStyle: 'solid', paddingRight: .5 + 'em'}"></span>
                        <span>{{data.name}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="gantt-activity" #ganttActivity
        (wheel)="doWheel($event, ganttActivity)"
        (window:resize)="onResize($event)"
        [ngStyle]="{ 'height': ganttService.calculateGanttHeight() + 60, 'width': calculateColumnsWidth() }">

        <time-scale [timeScaleMonth]="ganttService.MONTH_SCALE"
            [timeScaleWeekend]="ganttService.TIME_SCALE"
            [dimensions]="dimensions"
            [scale]="options.scale"></time-scale>
        <div class="gantt-activity-area"
            #ganttActivityArea
            [ngStyle]="{ 'height': ganttService.calculateGanttHeight(), 'width': containerWidth + 36 + 'px' }">

            <activity-background [timeScale]="ganttService.TIME_SCALE"
                [tasks]="ganttService.TASK_CACHE"></activity-background>
            <activity-bars [timeScale]="ganttService.TIME_SCALE"
                [dimensions]="dimensions"
                [tasks]="ganttService.TASK_CACHE"
                (onGridRowClick)="gridRowClick($event)"
                (onPopoverOpen)="popoverOpen($event)"></activity-bars>
        </div>
    </div>
    `,
                changeDetection: ChangeDetectionStrategy.Default,
                styles: [`
        .gantt-activity {
            overflow-y: hidden;
            overflow-x: scroll;
            display: inline-block;
            vertical-align: top;
            position: relative;
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
            right: -10px;
            display: block;
            top: -1px;
            border: 1px solid #cecece;
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
            overflow: hidden;
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
            cursor: pointer;
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
            padding-left: 15px;
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
    onGridRowClick: [{ type: Output }],
    onPopoverOpen: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQtYWN0aXZpdHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1nYW50dC8iLCJzb3VyY2VzIjpbImxpYi9hY3Rpdml0eS9nYW50dC1hY3Rpdml0eS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFHLHVCQUF1QixFQUFzQixNQUFNLGVBQWUsQ0FBQztBQUV6SSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUEwTWhFLE1BQU0sT0FBTyxzQkFBc0I7Ozs7O0lBa0MvQixZQUNXLElBQWdCLEVBQ2hCLFlBQTBCO1FBRDFCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFoQzNCLG1CQUFjLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFDNUQsa0JBQWEsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQU03RCxVQUFLLEdBQVc7WUFDcEIsS0FBSyxFQUFFLElBQUk7WUFDWCxHQUFHLEVBQUUsSUFBSTtTQUNaLENBQUM7UUFVRixlQUFVLEdBQUc7WUFDVCxNQUFNLEVBQUUsQ0FBQztZQUNULEtBQUssRUFBRSxDQUFDO1NBQ1gsQ0FBQztRQUVGLGdCQUFXLEdBQWtCO1lBQ3pCLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUU7WUFDaEMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtTQUMzQyxDQUFDO0lBS0YsQ0FBQzs7Ozs7O0lBRUQsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFpQjtRQUM1QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFD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O0lBQ3BCLHFDQUFrQjs7Ozs7SUFDbEIsMkNBQXVCOzs7OztJQUV2Qix1Q0FHRTs7Ozs7SUFFRix3REFBb0M7O0lBRXBDLGlEQUFxQjs7SUFDckIsZ0RBQW9COztJQUVwQixxREFBeUI7O0lBQ3pCLG9EQUF3Qjs7SUFFeEIsNENBR0U7O0lBRUYsNkNBR0U7O0lBR0Usc0NBQXVCOztJQUN2Qiw4Q0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLCAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIE9uQ2hhbmdlcywgRG9DaGVjayB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgR2FudHRTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2dhbnR0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJR3JpZENvbHVtbiwgSUdhbnR0T3B0aW9ucywgUHJvamVjdCwgSVNjYWxlIH0gZnJvbSAnLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBFdmVudE1hbmFnZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdnYW50dC1hY3Rpdml0eScsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJncmlkXCIgI2dhbnR0R3JpZD5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JpZC1zY2FsZVwiIFtuZ1N0eWxlXT1cInNldEdyaWRTY2FsZVN0eWxlKClcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyaWQtaGVhZC1jZWxsXCJcclxuICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgZ3JpZENvbHVtbnNcIiBbc3R5bGUud2lkdGhdPVwiY29sdW1uLndpZHRoICsgJ3B4J1wiXHJcbiAgICAgICAgICAgICAgICBbc3R5bGUubGVmdF09XCJjb2x1bW4ubGVmdCArICdweCdcIj5cclxuXHJcbiAgICAgICAgICAgICAgICA8bGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAge3tjb2x1bW4ubmFtZX19XHJcbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JpZC1kYXRhXCJcclxuICAgICAgICAgICAgI2dhbnR0R3JpZERhdGFcclxuICAgICAgICAgICAgW25nU3R5bGVdPVwieyAnaGVpZ2h0JzogZ2FudHRTZXJ2aWNlLmNhbGN1bGF0ZUdhbnR0SGVpZ2h0KCkgfVwiPlxyXG5cclxuICAgICAgICAgICAgPGRpdiAjcm93XHJcbiAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgZGF0YSBvZiBnYW50dFNlcnZpY2UuVEFTS19DQUNIRVwiIGNsYXNzPVwiZ3JpZC1yb3dcIlxyXG4gICAgICAgICAgICAgICAgW25nU3R5bGVdPVwic2V0R3JpZFJvd1N0eWxlKClcIj5cclxuXHJcbiAgICAgICAgICAgICAgICA8bWRlLXBvcG92ZXIgI2FwcFBvcG92ZXI9XCJtZGVQb3BvdmVyXCJcclxuICAgICAgICAgICAgICAgICAgICBbbWRlUG9wb3ZlckVudGVyRGVsYXldPVwiMTAwXCJcclxuICAgICAgICAgICAgICAgICAgICBbbWRlUG9wb3ZlckxlYXZlRGVsYXldPVwiMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgW21kZVBvcG92ZXJQb3NpdGlvblldPVwiJ2Fib3ZlJ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgW21kZVBvcG92ZXJPdmVybGFwVHJpZ2dlcl09XCJmYWxzZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgW21kZVBvcG92ZXJEaXNhYmxlQW5pbWF0aW9uXT1cImZhbHNlXCJcclxuICAgICAgICAgICAgICAgICAgICBbbWRlUG9wb3ZlckFycm93V2lkdGhdPVwiOFwiXHJcbiAgICAgICAgICAgICAgICAgICAgW21kZVBvcG92ZXJBcnJvd0NvbG9yXT1cIidibGFjaydcIlxyXG4gICAgICAgICAgICAgICAgICAgIG1kZVBvcG92ZXJQbGFjZW1lbnQ9XCJib3R0b21cIj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPG1hdC1jYXJkIHN0eWxlPVwibWF4LXdpZHRoOiAzNDBweDsgcGFkZGluZzogM3B4IDhweDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICNmZmZmZmY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT1cInotaW5kZXg6IDEwNzA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQtZmFtaWx5OiAnTGF0bycsJ0hlbHZldGljYSBOZXVlJyxIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXItc3BhY2luZzogbm9ybWFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZS1icmVhazogYXV0bztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxLjQyODU3MTQzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQtYWxpZ246IHN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dC1zaGFkb3c6IG5vbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3JtYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3JkLWJyZWFrOiBub3JtYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3JkLXNwYWNpbmc6IG5vcm1hbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmQtd3JhcDogbm9ybWFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udC1zaXplOiAxM3B4O1wiPnt7ZGF0YS5uYW1lfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtY2FyZD5cclxuICAgICAgICAgICAgICAgIDwvbWRlLXBvcG92ZXI+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyaWQtY2VsbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgW21kZVBvcG92ZXJUcmlnZ2VyRm9yXT1cImFwcFBvcG92ZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgIFttZGVQb3BvdmVyQmFja2Ryb3BDbG9zZU9uQ2xpY2tdPVwiZmFsc2VcIlxyXG4gICAgICAgICAgICAgICAgICAgIG1kZVBvcG92ZXJPZmZzZXRYPVwiMjVcIlxyXG4gICAgICAgICAgICAgICAgICAgIG1kZVBvcG92ZXJPZmZzZXRZPVwiMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgW25nU3R5bGVdPVwieyAnd2lkdGgnOiBncmlkQ29sdW1uc1sxXS53aWR0aCArICdweCcsICdwYWRkaW5nLWxlZnQnOiAwIH1cIj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbnR0LXRyZWUtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBbbmdTdHlsZV09XCJ7IGJvcmRlckxlZnRDb2xvcjogZGF0YS5jb2xvci5wcmltYXJ5LCBib3JkZXJMZWZ0V2lkdGg6IC4zNSArICdlbScsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyTGVmdFN0eWxlOiAnc29saWQnLCBwYWRkaW5nUmlnaHQ6IC41ICsgJ2VtJ31cIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7ZGF0YS5uYW1lfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJnYW50dC1hY3Rpdml0eVwiICNnYW50dEFjdGl2aXR5XHJcbiAgICAgICAgKHdoZWVsKT1cImRvV2hlZWwoJGV2ZW50LCBnYW50dEFjdGl2aXR5KVwiXHJcbiAgICAgICAgKHdpbmRvdzpyZXNpemUpPVwib25SZXNpemUoJGV2ZW50KVwiXHJcbiAgICAgICAgW25nU3R5bGVdPVwieyAnaGVpZ2h0JzogZ2FudHRTZXJ2aWNlLmNhbGN1bGF0ZUdhbnR0SGVpZ2h0KCkgKyA2MCwgJ3dpZHRoJzogY2FsY3VsYXRlQ29sdW1uc1dpZHRoKCkgfVwiPlxyXG5cclxuICAgICAgICA8dGltZS1zY2FsZSBbdGltZVNjYWxlTW9udGhdPVwiZ2FudHRTZXJ2aWNlLk1PTlRIX1NDQUxFXCJcclxuICAgICAgICAgICAgW3RpbWVTY2FsZVdlZWtlbmRdPVwiZ2FudHRTZXJ2aWNlLlRJTUVfU0NBTEVcIlxyXG4gICAgICAgICAgICBbZGltZW5zaW9uc109XCJkaW1lbnNpb25zXCJcclxuICAgICAgICAgICAgW3NjYWxlXT1cIm9wdGlvbnMuc2NhbGVcIj48L3RpbWUtc2NhbGU+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImdhbnR0LWFjdGl2aXR5LWFyZWFcIlxyXG4gICAgICAgICAgICAjZ2FudHRBY3Rpdml0eUFyZWFcclxuICAgICAgICAgICAgW25nU3R5bGVdPVwieyAnaGVpZ2h0JzogZ2FudHRTZXJ2aWNlLmNhbGN1bGF0ZUdhbnR0SGVpZ2h0KCksICd3aWR0aCc6IGNvbnRhaW5lcldpZHRoICsgMzYgKyAncHgnIH1cIj5cclxuXHJcbiAgICAgICAgICAgIDxhY3Rpdml0eS1iYWNrZ3JvdW5kIFt0aW1lU2NhbGVdPVwiZ2FudHRTZXJ2aWNlLlRJTUVfU0NBTEVcIlxyXG4gICAgICAgICAgICAgICAgW3Rhc2tzXT1cImdhbnR0U2VydmljZS5UQVNLX0NBQ0hFXCI+PC9hY3Rpdml0eS1iYWNrZ3JvdW5kPlxyXG4gICAgICAgICAgICA8YWN0aXZpdHktYmFycyBbdGltZVNjYWxlXT1cImdhbnR0U2VydmljZS5USU1FX1NDQUxFXCJcclxuICAgICAgICAgICAgICAgIFtkaW1lbnNpb25zXT1cImRpbWVuc2lvbnNcIlxyXG4gICAgICAgICAgICAgICAgW3Rhc2tzXT1cImdhbnR0U2VydmljZS5UQVNLX0NBQ0hFXCJcclxuICAgICAgICAgICAgICAgIChvbkdyaWRSb3dDbGljayk9XCJncmlkUm93Q2xpY2soJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAgICAob25Qb3BvdmVyT3Blbik9XCJwb3BvdmVyT3BlbigkZXZlbnQpXCI+PC9hY3Rpdml0eS1iYXJzPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgc3R5bGVzOiBbYFxyXG4gICAgICAgIC5nYW50dC1hY3Rpdml0eSB7XHJcbiAgICAgICAgICAgIG92ZXJmbG93LXk6IGhpZGRlbjtcclxuICAgICAgICAgICAgb3ZlcmZsb3cteDogc2Nyb2xsO1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdhbnR0LWFjdGl2aXR5LWFyZWEge1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcclxuICAgICAgICAgICAgb3ZlcmZsb3cteTogaGlkZGVuO1xyXG4gICAgICAgICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ2FudHQtdmVydGljYWwtc2Nyb2xsIHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbiAgICAgICAgICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcclxuICAgICAgICAgICAgb3ZlcmZsb3cteTogc2Nyb2xsO1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgICAgIHJpZ2h0OiAtMTBweDtcclxuICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgICAgIHRvcDogLTFweDtcclxuICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2NlY2VjZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdyaWQge1xyXG4gICAgICAgICAgICBvdmVyZmxvdy14OiBoaWRkZW47XHJcbiAgICAgICAgICAgIG92ZXJmbG93LXk6IGhpZGRlbjtcclxuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xyXG4gICAgICAgICAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjY2VjZWNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ3JpZC1zY2FsZSB7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjNmI2YjZiO1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTBlMGUwO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZXNtb2tlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ3JpZC1oZWFkLWNlbGwge1xyXG4gICAgICAgICAgICAvKmNvbG9yOiAjYTZhNmE2OyovXHJcbiAgICAgICAgICAgIGJvcmRlci10b3A6IG5vbmUgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OiBub25lICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xyXG4gICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XHJcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNjZWNlY2U7XHJcbiAgICAgICAgICAgIC8qdGV4dC1hbGlnbjogY2VudGVyOyovXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgICAgICAgY3Vyc29yOiBkZWZhdWx0O1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAgICAgICAgIC1tb3otdXNlci1zZWxlY3Q6IC1tb3otbm9uZTtcclxuICAgICAgICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcclxuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdyaWQtZGF0YSB7XHJcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5ncmlkLXJvdyB7XHJcbiAgICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTBlMGUwO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5ncmlkLXJvdzpob3ZlciB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlZWVlZWU7XHJcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdyaWQtY2VsbCB7XHJcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogbm9uZTtcclxuICAgICAgICAgICAgY29sb3I6ICM0NTQ1NDU7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgICAgICAgdmVydGljYWwtYWxpZ246IHRvcDtcclxuICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiA2cHg7XHJcbiAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDZweDtcclxuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5hY3Rpb25zLWJhciB7XHJcbiAgICAgICAgICAgIC8qYm9yZGVyLXRvcDogMXB4IHNvbGlkICNjZWNlY2U7Ki9cclxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlMGUwZTA7XHJcbiAgICAgICAgICAgIGNsZWFyOiBib3RoO1xyXG4gICAgICAgICAgICAvKm1hcmdpbi10b3A6IDkwcHg7Ki9cclxuICAgICAgICAgICAgaGVpZ2h0OiAyOHB4O1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiB3aGl0ZXNtb2tlO1xyXG4gICAgICAgICAgICBjb2xvcjogIzQ5NDk0OTtcclxuICAgICAgICAgICAgZm9udC1mYW1pbHk6IEFyaWFsLCBzYW5zLXNlcmlmO1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogMTVweDtcclxuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDI1cHg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5nYW50dC10cmVlLWNvbnRlbnQge1xyXG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDE1cHg7XHJcbiAgICAgICAgfVxyXG4gICAgYF0sXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcclxufSlcclxuZXhwb3J0IGNsYXNzIEdhbnR0QWN0aXZpdHlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIERvQ2hlY2sge1xyXG4gICAgQElucHV0KCkgcHJvamVjdDogUHJvamVjdDtcclxuICAgIEBJbnB1dCgpIG9wdGlvbnM6IElHYW50dE9wdGlvbnM7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uR3JpZFJvd0NsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gICAgQE91dHB1dCgpIG9uUG9wb3Zlck9wZW46IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGFydDogRGF0ZTtcclxuICAgIHByaXZhdGUgZW5kOiBEYXRlO1xyXG4gICAgcHJpdmF0ZSB0aW1lU2NhbGU6IGFueTtcclxuXHJcbiAgICBwcml2YXRlIHNjYWxlOiBJU2NhbGUgPSB7XHJcbiAgICAgICAgc3RhcnQ6IG51bGwsXHJcbiAgICAgICAgZW5kOiBudWxsXHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgYWN0aXZpdHlDb250YWluZXJTaXplczogYW55O1xyXG5cclxuICAgIGNvbnRhaW5lckhlaWdodDogYW55O1xyXG4gICAgY29udGFpbmVyV2lkdGg6IGFueTtcclxuXHJcbiAgICBnYW50dEFjdGl2aXR5SGVpZ2h0OiBhbnk7XHJcbiAgICBnYW50dEFjdGl2aXR5V2lkdGg6IGFueTtcclxuXHJcbiAgICBkaW1lbnNpb25zID0ge1xyXG4gICAgICAgIGhlaWdodDogMCxcclxuICAgICAgICB3aWR0aDogMFxyXG4gICAgfTtcclxuXHJcbiAgICBncmlkQ29sdW1uczogSUdyaWRDb2x1bW5bXSA9IFtcclxuICAgICAgICB7IG5hbWU6ICcnLCBsZWZ0OiAwLCB3aWR0aDogMTYgfSxcclxuICAgICAgICB7IG5hbWU6ICdaYWRhbmllJywgbGVmdDogMCwgd2lkdGg6IDMzMCB9XHJcbiAgICBdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyBlbGVtOiBFbGVtZW50UmVmLFxyXG4gICAgICAgIHB1YmxpYyBnYW50dFNlcnZpY2U6IEdhbnR0U2VydmljZSkge1xyXG4gICAgfVxyXG5cclxuICAgIGRvV2hlZWwoZXZlbnQsIGVsZW06IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgLy8gY2hvbWVcclxuICAgICAgICBpZiAoZXZlbnQud2hlZWxEZWx0YSkge1xyXG4gICAgICAgICAgICBpZiAoKGV2ZW50LndoZWVsRGVsdGEgfHwgZXZlbnQuZGV0YWlsKSA+IDApIHtcclxuICAgICAgICAgICAgICAgIGVsZW0uc2Nyb2xsTGVmdCAtPSAxMDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtLnNjcm9sbExlZnQgKz0gMTAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gZmlyZWZveFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC5kZWx0YVkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtLnNjcm9sbExlZnQgKz0gMTAwO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZWxlbS5zY3JvbGxMZWZ0IC09IDEwMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgLy8gQ2FjaGUgdGhlIHByb2plY3QgZGF0YSBhbmQgb25seSB3b3JrIHdpdGggdGhhdC4gT25seSBzaG93IHBhcmVudCB0YXNrcyBieSBkZWZhdWx0XHJcbiAgICAgICAgdGhpcy5nYW50dFNlcnZpY2UuVEFTS19DQUNIRSA9IHRoaXMucHJvamVjdC50YXNrcztcclxuICAgICAgICB0aGlzLmdhbnR0U2VydmljZS5USU1FX1NDQUxFID0gdGhpcy5nYW50dFNlcnZpY2UuY2FsY3VsYXRlU2NhbGUodGhpcy5vcHRpb25zLnNjYWxlLnN0YXJ0LCB0aGlzLm9wdGlvbnMuc2NhbGUuZW5kKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGFydCA9IHRoaXMub3B0aW9ucy5zY2FsZS5zdGFydDtcclxuICAgICAgICB0aGlzLmVuZCA9IHRoaXMub3B0aW9ucy5zY2FsZS5lbmQ7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXJXaWR0aCA9IHRoaXMuY2FsY3VsYXRlQ29udGFpbmVyV2lkdGgoKTtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lckhlaWdodCA9IHRoaXMuY2FsY3VsYXRlQ29udGFpbmVySGVpZ2h0KCk7XHJcbiAgICAgICAgdGhpcy5hY3Rpdml0eUNvbnRhaW5lclNpemVzID0gdGhpcy5nYW50dFNlcnZpY2UuY2FsY3VsYXRlQWN0aXZpdHlDb250YWluZXJEaW1lbnNpb25zKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZ3JpZENvbHVtbnMgPSB0aGlzLm9wdGlvbnMuZ3JpZENvbHVtbnMgPyB0aGlzLm9wdGlvbnMuZ3JpZENvbHVtbnMgOiB0aGlzLmdyaWRDb2x1bW5zO1xyXG5cclxuICAgICAgICAvLyBpbXBvcnRhbnQgdGhhdCB0aGVzZSBhcmUgY2FsbGVkIGxhc3QgYXMgaXQgcmVsaWVzIG9uIHZhbHVlcyBjYWxjdWxhdGVkIGFib3ZlLlxyXG4gICAgICAgIHRoaXMuc2V0U2NhbGUoKTtcclxuICAgICAgICB0aGlzLnNldERpbWVuc2lvbnMoKTtcclxuICAgICAgICB0aGlzLnNldFNpemVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEN1c3RvbSBtb2RlbCBjaGVjayAqL1xyXG4gICAgbmdEb0NoZWNrKCkge1xyXG4gICAgICAgIC8vIGRvIGEgY2hlY2sgdG8gc2VlIHdoZXRoZXIgYW55IG5ldyB0YXNrcyBoYXZlIGJlZW4gYWRkZWQuIElmIHRoZSB0YXNrIGlzIGEgY2hpbGQgdGhlbiBwdXNoIGludG8gYXJyYXkgaWYgdHJlZSBleHBhbmRlZD9cclxuICAgICAgICB0aGlzLmdhbnR0U2VydmljZS5kb1Rhc2tDaGVjayh0aGlzLnByb2plY3QudGFza3MsIHRoaXMub3B0aW9ucy5zY2FsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIE9uIHZlcnRpY2FsIHNjcm9sbCBzZXQgdGhlIHNjcm9sbCB0b3Agb2YgZ3JpZCBhbmQgYWN0aXZpdHkgICovXHJcbiAgICBvblZlcnRpY2FsU2Nyb2xsKHZlcnRpY2FsU2Nyb2xsOiBhbnksIGdhbnR0R3JpZDogYW55LCBnYW50dEFjdGl2aXR5QXJlYTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5nYW50dFNlcnZpY2Uuc2Nyb2xsVG9wKHZlcnRpY2FsU2Nyb2xsLCBnYW50dEdyaWQsIGdhbnR0QWN0aXZpdHlBcmVhKTtcclxuICAgIH1cclxuXHJcbiAgICBncmlkUm93Q2xpY2sodGFzaykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMub25HcmlkUm93Q2xpY2suZW1pdCh0YXNrKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHsgfVxyXG4gICAgfVxyXG5cclxuICAgIHBvcG92ZXJPcGVuKHRhc2spIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLm9uUG9wb3Zlck9wZW4uZW1pdCh0YXNrKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHsgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBPbiByZXNpemUgb2YgYnJvd3NlciB3aW5kb3cgZHluYW1pY2FsbHkgYWRqdXN0IGdhbnR0IGFjdGl2aXR5IGhlaWdodCBhbmQgd2lkdGggKi9cclxuICAgIG9uUmVzaXplKGV2ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBhY3Rpdml0eUNvbnRhaW5lclNpemVzID0gdGhpcy5nYW50dFNlcnZpY2UuY2FsY3VsYXRlQWN0aXZpdHlDb250YWluZXJEaW1lbnNpb25zKCk7XHJcbiAgICAgICAgdGhpcy5nYW50dEFjdGl2aXR5SGVpZ2h0ID0gYWN0aXZpdHlDb250YWluZXJTaXplcy5oZWlnaHQgKyAncHgnO1xyXG4gICAgICAgIHRoaXMuZ2FudHRBY3Rpdml0eVdpZHRoID0gYWN0aXZpdHlDb250YWluZXJTaXplcy53aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTY2FsZSgpIHtcclxuICAgICAgICB0aGlzLnNjYWxlLnN0YXJ0ID0gdGhpcy5zdGFydDtcclxuICAgICAgICB0aGlzLnNjYWxlLmVuZCA9IHRoaXMuZW5kO1xyXG4gICAgfVxyXG5cclxuICAgIHNldERpbWVuc2lvbnMoKSB7XHJcbiAgICAgICAgdGhpcy5kaW1lbnNpb25zLmhlaWdodCA9IHRoaXMuY29udGFpbmVySGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuZGltZW5zaW9ucy53aWR0aCA9IHRoaXMuY29udGFpbmVyV2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0R3JpZFJvd1N0eWxlKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ2hlaWdodCc6IHRoaXMuZ2FudHRTZXJ2aWNlLnJvd0hlaWdodCArICdweCcsXHJcbiAgICAgICAgICAgICdsaW5lLWhlaWdodCc6IHRoaXMuZ2FudHRTZXJ2aWNlLnJvd0hlaWdodCArICdweCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHNldEdyaWRTY2FsZVN0eWxlKCkge1xyXG4gICAgICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuZ2FudHRTZXJ2aWNlLnJvd0hlaWdodCArIDMwO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICdoZWlnaHQnOiBoZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAnbGluZS1oZWlnaHQnOiBoZWlnaHQgKyAncHgnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxjdWxhdGVDb2x1bW5zV2lkdGgoKSB7XHJcbiAgICAgICAgY29uc3QgZ2FudHRBY3Rpdml0eVdpZHRoID0gdGhpcy5ncmlkQ29sdW1ucy5tYXAoY29sdW1uID0+IHsgcmV0dXJuIGNvbHVtbi53aWR0aCB9KS5yZWR1Y2UoKHB2LCBjdikgPT4gcHYgKyBjdiwgMCkgKyAxO1xyXG4gICAgICAgIHJldHVybiBgY2FsYygxMDAlIC0gJHsoZ2FudHRBY3Rpdml0eVdpZHRoKX1weClgO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlQ29udGFpbmVySGVpZ2h0KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FudHRTZXJ2aWNlLlRBU0tfQ0FDSEUubGVuZ3RoICogdGhpcy5nYW50dFNlcnZpY2Uucm93SGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlQ29udGFpbmVyV2lkdGgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nYW50dFNlcnZpY2UuVElNRV9TQ0FMRS5sZW5ndGggKiB0aGlzLmdhbnR0U2VydmljZS5jZWxsV2lkdGggKyB0aGlzLmdhbnR0U2VydmljZS5jZWxsV2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRTaXplcygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmdhbnR0QWN0aXZpdHlIZWlnaHQgPSB0aGlzLmFjdGl2aXR5Q29udGFpbmVyU2l6ZXMuaGVpZ2h0ICsgJ3B4JztcclxuICAgICAgICB0aGlzLmdhbnR0QWN0aXZpdHlXaWR0aCA9IHRoaXMuYWN0aXZpdHlDb250YWluZXJTaXplcy53aWR0aDtcclxuICAgIH1cclxufVxyXG4iXX0=