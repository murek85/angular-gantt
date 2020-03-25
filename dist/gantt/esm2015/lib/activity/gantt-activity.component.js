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
    ngOnInit() {
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

                <div class="grid-cell"
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
    <div class="gantt-activity"
        (window:resize)="onResize($event)"
        [ngStyle]="{ 'height': ganttService.calculateGanttHeight() + 60, 'width': ganttActivityWidth + 36 + 'px' }">

        <time-scale [timeScale]="ganttService.TIME_SCALE"
            [dimensions]="dimensions"></time-scale>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQtYWN0aXZpdHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1nYW50dC8iLCJzb3VyY2VzIjpbImxpYi9hY3Rpdml0eS9nYW50dC1hY3Rpdml0eS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFHLHVCQUF1QixFQUFzQixNQUFNLGVBQWUsQ0FBQztBQUV6SSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUE0SmhFLE1BQU0sT0FBTyxzQkFBc0I7Ozs7O0lBeUMvQixZQUNXLElBQWdCLEVBQ2hCLFlBQTBCO1FBRDFCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUF2QzNCLG1CQUFjLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFDNUQsa0JBQWEsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUU3RCxlQUFVLEdBQUcsVUFBVSxDQUFDLENBQUMsNkJBQTZCOztRQUN0RCxpQkFBWSxHQUFHLFVBQVUsQ0FBQyxDQUFDLCtCQUErQjtRQVFsRSxvQkFBZSxHQUFHO1lBQ2QsUUFBUSxFQUFFLEtBQUs7WUFDZixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7U0FDbEMsQ0FBQztRQU9NLFVBQUssR0FBUTtZQUNqQixLQUFLLEVBQUUsSUFBSTtZQUNYLEdBQUcsRUFBRSxJQUFJO1NBQ1osQ0FBQztRQUVGLGVBQVUsR0FBRztZQUNULE1BQU0sRUFBRSxDQUFDO1lBQ1QsS0FBSyxFQUFFLENBQUM7U0FDWCxDQUFDO1FBRUssZ0JBQVcsR0FBVTtZQUN4QixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFO1lBQ2hDLEVBQUUsSUFBSSxFQUFFLG9CQUFvQixFQUFFLElB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LFlBQVk7OztzQkE2SmhCLEtBQUs7c0JBQ0wsS0FBSzs2QkFFTCxNQUFNOzRCQUNOLE1BQU07Ozs7SUFKUCx5Q0FBc0I7O0lBQ3RCLHlDQUFzQjs7SUFFdEIsZ0RBQXNFOztJQUN0RSwrQ0FBcUU7Ozs7O0lBRXJFLDRDQUFnQzs7Ozs7SUFDaEMsOENBQWtDOzs7OztJQUVsQyx1Q0FBb0I7Ozs7O0lBQ3BCLHFDQUFrQjs7Ozs7SUFDbEIsMkNBQXVCOzs7OztJQUV2Qix3REFBb0M7O0lBRXBDLGlEQUdFOztJQUNGLGlEQUFxQjs7SUFDckIsZ0RBQW9COztJQUVwQixxREFBeUI7O0lBQ3pCLG9EQUF3Qjs7Ozs7SUFFeEIsdUNBR0U7O0lBRUYsNENBR0U7O0lBRUYsNkNBR0U7O0lBR0Usc0NBQXVCOztJQUN2Qiw4Q0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLCAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIE9uQ2hhbmdlcywgRG9DaGVjayB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgR2FudHRTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2dhbnR0LnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2dhbnR0LWFjdGl2aXR5JyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwiZ3JpZFwiICNnYW50dEdyaWQ+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImdyaWQtc2NhbGVcIiBbbmdTdHlsZV09XCJzZXRHcmlkU2NhbGVTdHlsZSgpXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmlkLWhlYWQtY2VsbFwiXHJcbiAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGdyaWRDb2x1bW5zXCIgW3N0eWxlLndpZHRoXT1cImNvbHVtbi53aWR0aCArICdweCdcIlxyXG4gICAgICAgICAgICAgICAgW3N0eWxlLmxlZnRdPVwiY29sdW1uLmxlZnQgKyAncHgnXCI+XHJcblxyXG4gICAgICAgICAgICAgICAgPGxhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIHt7Y29sdW1uLm5hbWV9fVxyXG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImdyaWQtZGF0YVwiXHJcbiAgICAgICAgICAgICNnYW50dEdyaWREYXRhXHJcbiAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsgJ2hlaWdodCc6IGdhbnR0U2VydmljZS5jYWxjdWxhdGVHYW50dEhlaWdodCgpIH1cIj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgI3Jvd1xyXG4gICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IGRhdGEgb2YgZ2FudHRTZXJ2aWNlLlRBU0tfQ0FDSEVcIiBjbGFzcz1cImdyaWQtcm93XCJcclxuICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInNldEdyaWRSb3dTdHlsZSgpXCI+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyaWQtY2VsbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgW25nU3R5bGVdPVwieyAnd2lkdGgnOiBncmlkQ29sdW1uc1sxXS53aWR0aCArICdweCcsICdwYWRkaW5nLWxlZnQnOiAwIH1cIj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbnR0LXRyZWUtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBbbmdTdHlsZV09XCJ7IGJvcmRlckxlZnRDb2xvcjogZGF0YS5jb2xvci5wcmltYXJ5LCBib3JkZXJMZWZ0V2lkdGg6IC4zNSArICdlbScsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyTGVmdFN0eWxlOiAnc29saWQnLCBwYWRkaW5nUmlnaHQ6IC41ICsgJ2VtJ31cIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7ZGF0YS5uYW1lfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJnYW50dC1hY3Rpdml0eVwiXHJcbiAgICAgICAgKHdpbmRvdzpyZXNpemUpPVwib25SZXNpemUoJGV2ZW50KVwiXHJcbiAgICAgICAgW25nU3R5bGVdPVwieyAnaGVpZ2h0JzogZ2FudHRTZXJ2aWNlLmNhbGN1bGF0ZUdhbnR0SGVpZ2h0KCkgKyA2MCwgJ3dpZHRoJzogZ2FudHRBY3Rpdml0eVdpZHRoICsgMzYgKyAncHgnIH1cIj5cclxuXHJcbiAgICAgICAgPHRpbWUtc2NhbGUgW3RpbWVTY2FsZV09XCJnYW50dFNlcnZpY2UuVElNRV9TQ0FMRVwiXHJcbiAgICAgICAgICAgIFtkaW1lbnNpb25zXT1cImRpbWVuc2lvbnNcIj48L3RpbWUtc2NhbGU+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImdhbnR0LWFjdGl2aXR5LWFyZWFcIlxyXG4gICAgICAgICAgICAjZ2FudHRBY3Rpdml0eUFyZWFcclxuICAgICAgICAgICAgW25nU3R5bGVdPVwieyAnaGVpZ2h0JzogZ2FudHRTZXJ2aWNlLmNhbGN1bGF0ZUdhbnR0SGVpZ2h0KCksICd3aWR0aCc6IGNvbnRhaW5lcldpZHRoICsgMzYgKyAncHgnIH1cIj5cclxuXHJcbiAgICAgICAgICAgIDxhY3Rpdml0eS1iYWNrZ3JvdW5kIFt0aW1lU2NhbGVdPVwiZ2FudHRTZXJ2aWNlLlRJTUVfU0NBTEVcIlxyXG4gICAgICAgICAgICAgICAgW3Rhc2tzXT1cImdhbnR0U2VydmljZS5UQVNLX0NBQ0hFXCI+PC9hY3Rpdml0eS1iYWNrZ3JvdW5kPlxyXG4gICAgICAgICAgICA8YWN0aXZpdHktYmFycyBbdGltZVNjYWxlXT1cImdhbnR0U2VydmljZS5USU1FX1NDQUxFXCJcclxuICAgICAgICAgICAgICAgIFtkaW1lbnNpb25zXT1cImRpbWVuc2lvbnNcIlxyXG4gICAgICAgICAgICAgICAgW3Rhc2tzXT1cImdhbnR0U2VydmljZS5UQVNLX0NBQ0hFXCJcclxuICAgICAgICAgICAgICAgIChvbkdyaWRSb3dDbGljayk9XCJncmlkUm93Q2xpY2soJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAgICAob25Qb3BvdmVyT3Blbik9XCJwb3BvdmVyT3BlbigkZXZlbnQpXCI+PC9hY3Rpdml0eS1iYXJzPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgc3R5bGVzOiBbYFxyXG4gICAgICAgIC5nYW50dC1hY3Rpdml0eSB7XHJcbiAgICAgICAgICAgIG92ZXJmbG93LXk6IGhpZGRlbjtcclxuICAgICAgICAgICAgb3ZlcmZsb3cteDogc2Nyb2xsO1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdhbnR0LWFjdGl2aXR5LWFyZWEge1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcclxuICAgICAgICAgICAgb3ZlcmZsb3cteTogaGlkZGVuO1xyXG4gICAgICAgICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ2FudHQtdmVydGljYWwtc2Nyb2xsIHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbiAgICAgICAgICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcclxuICAgICAgICAgICAgb3ZlcmZsb3cteTogc2Nyb2xsO1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgICAgIHJpZ2h0OiAtMTBweDtcclxuICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgICAgIHRvcDogLTFweDtcclxuICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2NlY2VjZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdyaWQge1xyXG4gICAgICAgICAgICBvdmVyZmxvdy14OiBoaWRkZW47XHJcbiAgICAgICAgICAgIG92ZXJmbG93LXk6IGhpZGRlbjtcclxuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xyXG4gICAgICAgICAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjY2VjZWNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ3JpZC1zY2FsZSB7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjNmI2YjZiO1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTBlMGUwO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZXNtb2tlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ3JpZC1oZWFkLWNlbGwge1xyXG4gICAgICAgICAgICAvKmNvbG9yOiAjYTZhNmE2OyovXHJcbiAgICAgICAgICAgIGJvcmRlci10b3A6IG5vbmUgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OiBub25lICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xyXG4gICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XHJcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNjZWNlY2U7XHJcbiAgICAgICAgICAgIC8qdGV4dC1hbGlnbjogY2VudGVyOyovXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgICAgICAgY3Vyc29yOiBkZWZhdWx0O1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAgICAgICAgIC1tb3otdXNlci1zZWxlY3Q6IC1tb3otbm9uZTtcclxuICAgICAgICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcclxuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdyaWQtZGF0YSB7XHJcbiAgICAgICAgICAgIG92ZXJmbG93OmhpZGRlbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdyaWQtcm93IHtcclxuICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlMGUwZTA7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdyaWQtcm93OmhvdmVyIHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2VlZWVlZTtcclxuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ3JpZC1jZWxsIHtcclxuICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OiBub25lO1xyXG4gICAgICAgICAgICBjb2xvcjogIzQ1NDU0NTtcclxuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xyXG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDZweDtcclxuICAgICAgICAgICAgcGFkZGluZy1yaWdodDogNnB4O1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmFjdGlvbnMtYmFyIHtcclxuICAgICAgICAgICAgLypib3JkZXItdG9wOiAxcHggc29saWQgI2NlY2VjZTsqL1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2UwZTBlMDtcclxuICAgICAgICAgICAgY2xlYXI6IGJvdGg7XHJcbiAgICAgICAgICAgIC8qbWFyZ2luLXRvcDogOTBweDsqL1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDI4cHg7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHdoaXRlc21va2U7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjNDk0OTQ5O1xyXG4gICAgICAgICAgICBmb250LWZhbWlseTogQXJpYWwsIHNhbnMtc2VyaWY7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAxNXB4O1xyXG4gICAgICAgICAgICBsaW5lLWhlaWdodDogMjVweDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLmdhbnR0LXRyZWUtY29udGVudCB7XHJcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogMTVweDtcclxuICAgICAgICB9XHJcbiAgICBgXSxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxyXG59KVxyXG5leHBvcnQgY2xhc3MgR2FudHRBY3Rpdml0eUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgRG9DaGVjayB7XHJcbiAgICBASW5wdXQoKSBwcm9qZWN0OiBhbnk7XHJcbiAgICBASW5wdXQoKSBvcHRpb25zOiBhbnk7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uR3JpZFJvd0NsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gICAgQE91dHB1dCgpIG9uUG9wb3Zlck9wZW46IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSB1cFRyaWFuZ2xlID0gJyYjeDI1YjI7JzsgLy8gQkxBQ0sgVVAtUE9JTlRJTkcgVFJJQU5HTEVcclxuICAgIHByaXZhdGUgZG93blRyaWFuZ2xlID0gJyYjeDI1YmM7JzsgLy8gQkxBQ0sgRE9XTi1QT0lOVElORyBUUklBTkdMRVxyXG5cclxuICAgIHByaXZhdGUgc3RhcnQ6IERhdGU7XHJcbiAgICBwcml2YXRlIGVuZDogRGF0ZTtcclxuICAgIHByaXZhdGUgdGltZVNjYWxlOiBhbnk7XHJcblxyXG4gICAgcHJpdmF0ZSBhY3Rpdml0eUNvbnRhaW5lclNpemVzOiBhbnk7XHJcblxyXG4gICAgYWN0aXZpdHlBY3Rpb25zID0ge1xyXG4gICAgICAgIGV4cGFuZGVkOiBmYWxzZSxcclxuICAgICAgICBleHBhbmRlZEljb246IHRoaXMuZG93blRyaWFuZ2xlXHJcbiAgICB9O1xyXG4gICAgY29udGFpbmVySGVpZ2h0OiBhbnk7XHJcbiAgICBjb250YWluZXJXaWR0aDogYW55O1xyXG5cclxuICAgIGdhbnR0QWN0aXZpdHlIZWlnaHQ6IGFueTtcclxuICAgIGdhbnR0QWN0aXZpdHlXaWR0aDogYW55O1xyXG5cclxuICAgIHByaXZhdGUgc2NhbGU6IGFueSA9IHtcclxuICAgICAgICBzdGFydDogbnVsbCxcclxuICAgICAgICBlbmQ6IG51bGxcclxuICAgIH07XHJcblxyXG4gICAgZGltZW5zaW9ucyA9IHtcclxuICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgd2lkdGg6IDBcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGdyaWRDb2x1bW5zOiBhbnlbXSA9IFtcclxuICAgICAgICB7IG5hbWU6ICcnLCBsZWZ0OiAwLCB3aWR0aDogMTYgfSxcclxuICAgICAgICB7IG5hbWU6ICdHcnVwYSBhc29ydHltZW50w7N3JywgbGVmdDogMCwgd2lkdGg6IDMzMCB9XHJcbiAgICBdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyBlbGVtOiBFbGVtZW50UmVmLFxyXG4gICAgICAgIHB1YmxpYyBnYW50dFNlcnZpY2U6IEdhbnR0U2VydmljZSkge1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIC8vIENhY2hlIHRoZSBwcm9qZWN0IGRhdGEgYW5kIG9ubHkgd29yayB3aXRoIHRoYXQuIE9ubHkgc2hvdyBwYXJlbnQgdGFza3MgYnkgZGVmYXVsdFxyXG4gICAgICAgIHRoaXMuZ2FudHRTZXJ2aWNlLlRBU0tfQ0FDSEUgPSB0aGlzLnByb2plY3QudGFza3M7XHJcbiAgICAgICAgdGhpcy5nYW50dFNlcnZpY2UuVElNRV9TQ0FMRSA9IHRoaXMuZ2FudHRTZXJ2aWNlLmNhbGN1bGF0ZVNjYWxlKHRoaXMub3B0aW9ucy5zY2FsZS5zdGFydCwgdGhpcy5vcHRpb25zLnNjYWxlLmVuZCk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhcnQgPSB0aGlzLm9wdGlvbnMuc2NhbGUuc3RhcnQ7XHJcbiAgICAgICAgdGhpcy5lbmQgPSB0aGlzLm9wdGlvbnMuc2NhbGUuZW5kO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyV2lkdGggPSB0aGlzLmNhbGN1bGF0ZUNvbnRhaW5lcldpZHRoKCk7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXJIZWlnaHQgPSB0aGlzLmNhbGN1bGF0ZUNvbnRhaW5lckhlaWdodCgpO1xyXG4gICAgICAgIHRoaXMuYWN0aXZpdHlDb250YWluZXJTaXplcyA9IHRoaXMuZ2FudHRTZXJ2aWNlLmNhbGN1bGF0ZUFjdGl2aXR5Q29udGFpbmVyRGltZW5zaW9ucygpO1xyXG5cclxuICAgICAgICAvLyBpbXBvcnRhbnQgdGhhdCB0aGVzZSBhcmUgY2FsbGVkIGxhc3QgYXMgaXQgcmVsaWVzIG9uIHZhbHVlcyBjYWxjdWxhdGVkIGFib3ZlLlxyXG4gICAgICAgIHRoaXMuc2V0U2NhbGUoKTtcclxuICAgICAgICB0aGlzLnNldERpbWVuc2lvbnMoKTtcclxuICAgICAgICB0aGlzLnNldFNpemVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEN1c3RvbSBtb2RlbCBjaGVjayAqL1xyXG4gICAgbmdEb0NoZWNrKCkge1xyXG4gICAgICAgIC8vIGRvIGEgY2hlY2sgdG8gc2VlIHdoZXRoZXIgYW55IG5ldyB0YXNrcyBoYXZlIGJlZW4gYWRkZWQuIElmIHRoZSB0YXNrIGlzIGEgY2hpbGQgdGhlbiBwdXNoIGludG8gYXJyYXkgaWYgdHJlZSBleHBhbmRlZD9cclxuICAgICAgICB0aGlzLmdhbnR0U2VydmljZS5kb1Rhc2tDaGVjayh0aGlzLnByb2plY3QudGFza3MsIHRoaXMub3B0aW9ucy5zY2FsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIE9uIHZlcnRpY2FsIHNjcm9sbCBzZXQgdGhlIHNjcm9sbCB0b3Agb2YgZ3JpZCBhbmQgYWN0aXZpdHkgICovXHJcbiAgICBvblZlcnRpY2FsU2Nyb2xsKHZlcnRpY2FsU2Nyb2xsOiBhbnksIGdhbnR0R3JpZDogYW55LCBnYW50dEFjdGl2aXR5QXJlYTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5nYW50dFNlcnZpY2Uuc2Nyb2xsVG9wKHZlcnRpY2FsU2Nyb2xsLCBnYW50dEdyaWQsIGdhbnR0QWN0aXZpdHlBcmVhKTtcclxuICAgIH1cclxuXHJcbiAgICBncmlkUm93Q2xpY2sodGFzaykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMub25HcmlkUm93Q2xpY2suZW1pdCh0YXNrKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHsgfVxyXG4gICAgfVxyXG5cclxuICAgIHBvcG92ZXJPcGVuKHRhc2spIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLm9uUG9wb3Zlck9wZW4uZW1pdCh0YXNrKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHsgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBPbiByZXNpemUgb2YgYnJvd3NlciB3aW5kb3cgZHluYW1pY2FsbHkgYWRqdXN0IGdhbnR0IGFjdGl2aXR5IGhlaWdodCBhbmQgd2lkdGggKi9cclxuICAgIG9uUmVzaXplKGV2ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBhY3Rpdml0eUNvbnRhaW5lclNpemVzID0gdGhpcy5nYW50dFNlcnZpY2UuY2FsY3VsYXRlQWN0aXZpdHlDb250YWluZXJEaW1lbnNpb25zKCk7XHJcbiAgICAgICAgdGhpcy5nYW50dEFjdGl2aXR5SGVpZ2h0ID0gYWN0aXZpdHlDb250YWluZXJTaXplcy5oZWlnaHQgKyAncHgnO1xyXG4gICAgICAgIHRoaXMuZ2FudHRBY3Rpdml0eVdpZHRoID0gYWN0aXZpdHlDb250YWluZXJTaXplcy53aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTY2FsZSgpIHtcclxuICAgICAgICB0aGlzLnNjYWxlLnN0YXJ0ID0gdGhpcy5zdGFydDtcclxuICAgICAgICB0aGlzLnNjYWxlLmVuZCA9IHRoaXMuZW5kO1xyXG4gICAgfVxyXG5cclxuICAgIHNldERpbWVuc2lvbnMoKSB7XHJcbiAgICAgICAgdGhpcy5kaW1lbnNpb25zLmhlaWdodCA9IHRoaXMuY29udGFpbmVySGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuZGltZW5zaW9ucy53aWR0aCA9IHRoaXMuY29udGFpbmVyV2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0R3JpZFJvd1N0eWxlKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ2hlaWdodCc6IHRoaXMuZ2FudHRTZXJ2aWNlLnJvd0hlaWdodCArICdweCcsXHJcbiAgICAgICAgICAgICdsaW5lLWhlaWdodCc6IHRoaXMuZ2FudHRTZXJ2aWNlLnJvd0hlaWdodCArICdweCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHNldEdyaWRTY2FsZVN0eWxlKCkge1xyXG4gICAgICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuZ2FudHRTZXJ2aWNlLnJvd0hlaWdodCArIDMwO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICdoZWlnaHQnOiBoZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAnbGluZS1oZWlnaHQnOiBoZWlnaHQgKyAncHgnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZUNvbnRhaW5lckhlaWdodCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdhbnR0U2VydmljZS5UQVNLX0NBQ0hFLmxlbmd0aCAqIHRoaXMuZ2FudHRTZXJ2aWNlLnJvd0hlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZUNvbnRhaW5lcldpZHRoKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FudHRTZXJ2aWNlLlRJTUVfU0NBTEUubGVuZ3RoICogdGhpcy5nYW50dFNlcnZpY2UuY2VsbFdpZHRoICsgdGhpcy5nYW50dFNlcnZpY2UuY2VsbFdpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0U2l6ZXMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5nYW50dEFjdGl2aXR5SGVpZ2h0ID0gdGhpcy5hY3Rpdml0eUNvbnRhaW5lclNpemVzLmhlaWdodCArICdweCc7XHJcbiAgICAgICAgdGhpcy5nYW50dEFjdGl2aXR5V2lkdGggPSB0aGlzLmFjdGl2aXR5Q29udGFpbmVyU2l6ZXMud2lkdGg7XHJcbiAgICB9XHJcbn1cclxuIl19