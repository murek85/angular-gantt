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
        this.ganttService.doTaskCheck(this.project.tasks);
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
                    [ngStyle]="{ 'width': gridColumns[1].width + 'px', 'padding-left': 2 + 'px' }">

                    <div class="gantt-tree-content">{{data.name}}</div>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQtYWN0aXZpdHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1nYW50dC8iLCJzb3VyY2VzIjpbImxpYi9hY3Rpdml0eS9nYW50dC1hY3Rpdml0eS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFHLHVCQUF1QixFQUFzQixNQUFNLGVBQWUsQ0FBQztBQUV6SSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUF3SmhFLE1BQU0sT0FBTyxzQkFBc0I7Ozs7O0lBeUMvQixZQUNXLElBQWdCLEVBQ2hCLFlBQTBCO1FBRDFCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUF2QzNCLG1CQUFjLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFDNUQsa0JBQWEsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUU3RCxlQUFVLEdBQUcsVUFBVSxDQUFDLENBQUMsNkJBQTZCOztRQUN0RCxpQkFBWSxHQUFHLFVBQVUsQ0FBQyxDQUFDLCtCQUErQjtRQVFsRSxvQkFBZSxHQUFHO1lBQ2QsUUFBUSxFQUFFLEtBQUs7WUFDZixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7U0FDbEMsQ0FBQztRQU9NLFVBQUssR0FBUTtZQUNqQixLQUFLLEVBQUUsSUFBSTtZQUNYLEdBQUcsRUFBRSxJQUFJO1NBQ1osQ0FBQztRQUVGLGVBQVUsR0FBRztZQUNULE1BQU0sRUFBRSxDQUFDO1lBQ1QsS0FBSyxFQUFFLENBQUM7U0FDWCxDQUFDO1FBRUssZ0JBQVcsR0FBVTtZQUN4QixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFO1lBQ2hDLEVBQUUsSUFBSSxFQUFFLG9CQUFvQixFQUFFLElB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QUVMLE1BQU07NEJBQ04sTUFBTTs7OztJQUpQLHlDQUFzQjs7SUFDdEIseUNBQXNCOztJQUV0QixnREFBc0U7O0lBQ3RFLCtDQUFxRTs7Ozs7SUFFckUsNENBQWdDOzs7OztJQUNoQyw4Q0FBa0M7Ozs7O0lBRWxDLHVDQUFvQjs7Ozs7SUFDcEIscUNBQWtCOzs7OztJQUNsQiwyQ0FBdUI7Ozs7O0lBRXZCLHdEQUFvQzs7SUFFcEMsaURBR0U7O0lBQ0YsaURBQXFCOztJQUNyQixnREFBb0I7O0lBRXBCLHFEQUF5Qjs7SUFDekIsb0RBQXdCOzs7OztJQUV4Qix1Q0FHRTs7SUFFRiw0Q0FHRTs7SUFFRiw2Q0FHRTs7SUFHRSxzQ0FBdUI7O0lBQ3ZCLDhDQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYsICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgT25DaGFuZ2VzLCBEb0NoZWNrIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBHYW50dFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvZ2FudHQuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnZ2FudHQtYWN0aXZpdHknLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJncmlkXCIgI2dhbnR0R3JpZD5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JpZC1zY2FsZVwiIFtuZ1N0eWxlXT1cInNldEdyaWRTY2FsZVN0eWxlKClcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyaWQtaGVhZC1jZWxsXCJcclxuICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgZ3JpZENvbHVtbnNcIiBbc3R5bGUud2lkdGhdPVwiY29sdW1uLndpZHRoICsgJ3B4J1wiXHJcbiAgICAgICAgICAgICAgICBbc3R5bGUubGVmdF09XCJjb2x1bW4ubGVmdCArICdweCdcIj5cclxuXHJcbiAgICAgICAgICAgICAgICA8bGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAge3tjb2x1bW4ubmFtZX19XHJcbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JpZC1kYXRhXCJcclxuICAgICAgICAgICAgI2dhbnR0R3JpZERhdGFcclxuICAgICAgICAgICAgW25nU3R5bGVdPVwieyAnaGVpZ2h0JzogZ2FudHRTZXJ2aWNlLmNhbGN1bGF0ZUdhbnR0SGVpZ2h0KCkgfVwiPlxyXG5cclxuICAgICAgICAgICAgPGRpdiAjcm93XHJcbiAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgZGF0YSBvZiBnYW50dFNlcnZpY2UuVEFTS19DQUNIRVwiIGNsYXNzPVwiZ3JpZC1yb3dcIlxyXG4gICAgICAgICAgICAgICAgW25nU3R5bGVdPVwic2V0R3JpZFJvd1N0eWxlKClcIj5cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JpZC1jZWxsXCJcclxuICAgICAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJ7ICd3aWR0aCc6IGdyaWRDb2x1bW5zWzFdLndpZHRoICsgJ3B4JywgJ3BhZGRpbmctbGVmdCc6IDIgKyAncHgnIH1cIj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbnR0LXRyZWUtY29udGVudFwiPnt7ZGF0YS5uYW1lfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cImdhbnR0LWFjdGl2aXR5XCJcclxuICAgICAgICAod2luZG93OnJlc2l6ZSk9XCJvblJlc2l6ZSgkZXZlbnQpXCJcclxuICAgICAgICBbbmdTdHlsZV09XCJ7ICdoZWlnaHQnOiBnYW50dFNlcnZpY2UuY2FsY3VsYXRlR2FudHRIZWlnaHQoKSArIDYwLCAnd2lkdGgnOiBnYW50dEFjdGl2aXR5V2lkdGggKyAzNiArICdweCcgfVwiPlxyXG5cclxuICAgICAgICA8dGltZS1zY2FsZSBbdGltZVNjYWxlXT1cImdhbnR0U2VydmljZS5USU1FX1NDQUxFXCJcclxuICAgICAgICAgICAgW2RpbWVuc2lvbnNdPVwiZGltZW5zaW9uc1wiPjwvdGltZS1zY2FsZT5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtYWN0aXZpdHktYXJlYVwiXHJcbiAgICAgICAgICAgICNnYW50dEFjdGl2aXR5QXJlYVxyXG4gICAgICAgICAgICBbbmdTdHlsZV09XCJ7ICdoZWlnaHQnOiBnYW50dFNlcnZpY2UuY2FsY3VsYXRlR2FudHRIZWlnaHQoKSwgJ3dpZHRoJzogY29udGFpbmVyV2lkdGggKyAzNiArICdweCcgfVwiPlxyXG5cclxuICAgICAgICAgICAgPGFjdGl2aXR5LWJhY2tncm91bmQgW3RpbWVTY2FsZV09XCJnYW50dFNlcnZpY2UuVElNRV9TQ0FMRVwiXHJcbiAgICAgICAgICAgICAgICBbdGFza3NdPVwiZ2FudHRTZXJ2aWNlLlRBU0tfQ0FDSEVcIj48L2FjdGl2aXR5LWJhY2tncm91bmQ+XHJcbiAgICAgICAgICAgIDxhY3Rpdml0eS1iYXJzIFt0aW1lU2NhbGVdPVwiZ2FudHRTZXJ2aWNlLlRJTUVfU0NBTEVcIlxyXG4gICAgICAgICAgICAgICAgW2RpbWVuc2lvbnNdPVwiZGltZW5zaW9uc1wiXHJcbiAgICAgICAgICAgICAgICBbdGFza3NdPVwiZ2FudHRTZXJ2aWNlLlRBU0tfQ0FDSEVcIlxyXG4gICAgICAgICAgICAgICAgKG9uR3JpZFJvd0NsaWNrKT1cImdyaWRSb3dDbGljaygkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgIChvblBvcG92ZXJPcGVuKT1cInBvcG92ZXJPcGVuKCRldmVudClcIj48L2FjdGl2aXR5LWJhcnM+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBzdHlsZXM6IFtgXHJcbiAgICAgICAgLmdhbnR0LWFjdGl2aXR5IHtcclxuICAgICAgICAgICAgb3ZlcmZsb3cteTogaGlkZGVuO1xyXG4gICAgICAgICAgICBvdmVyZmxvdy14OiBzY3JvbGw7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgICAgICAgdmVydGljYWwtYWxpZ246IHRvcDtcclxuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ2FudHQtYWN0aXZpdHktYXJlYSB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgICAgICAgb3ZlcmZsb3cteDogaGlkZGVuO1xyXG4gICAgICAgICAgICBvdmVyZmxvdy15OiBoaWRkZW47XHJcbiAgICAgICAgICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5nYW50dC12ZXJ0aWNhbC1zY3JvbGwge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuICAgICAgICAgICAgb3ZlcmZsb3cteDogaGlkZGVuO1xyXG4gICAgICAgICAgICBvdmVyZmxvdy15OiBzY3JvbGw7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICAgICAgcmlnaHQ6IC0xMHB4O1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgICAgICAgdG9wOiAtMXB4O1xyXG4gICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjY2VjZWNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ3JpZCB7XHJcbiAgICAgICAgICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcclxuICAgICAgICAgICAgb3ZlcmZsb3cteTogaGlkZGVuO1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XHJcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNjZWNlY2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5ncmlkLXNjYWxlIHtcclxuICAgICAgICAgICAgY29sb3I6ICM2YjZiNmI7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlMGUwZTA7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlc21va2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5ncmlkLWhlYWQtY2VsbCB7XHJcbiAgICAgICAgICAgIC8qY29sb3I6ICNhNmE2YTY7Ki9cclxuICAgICAgICAgICAgYm9yZGVyLXRvcDogbm9uZSAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICBib3JkZXItcmlnaHQ6IG5vbmUgIWltcG9ydGFudDtcclxuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7XHJcbiAgICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgICAgICAgdmVydGljYWwtYWxpZ246IHRvcDtcclxuICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2NlY2VjZTtcclxuICAgICAgICAgICAgLyp0ZXh0LWFsaWduOiBjZW50ZXI7Ki9cclxuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgICAgICBjdXJzb3I6IGRlZmF1bHQ7XHJcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgICAgICAgLW1vei11c2VyLXNlbGVjdDogLW1vei1ub25lO1xyXG4gICAgICAgICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xyXG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ3JpZC1kYXRhIHtcclxuICAgICAgICAgICAgb3ZlcmZsb3c6aGlkZGVuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ3JpZC1yb3cge1xyXG4gICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2UwZTBlMDtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ3JpZC1yb3c6aG92ZXIge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlZWVlO1xyXG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5ncmlkLWNlbGwge1xyXG4gICAgICAgICAgICBib3JkZXItcmlnaHQ6IG5vbmU7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjNDU0NTQ1O1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XHJcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogNnB4O1xyXG4gICAgICAgICAgICBwYWRkaW5nLXJpZ2h0OiA2cHg7XHJcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICAgIH1cclxuICAgICAgICAuYWN0aW9ucy1iYXIge1xyXG4gICAgICAgICAgICAvKmJvcmRlci10b3A6IDFweCBzb2xpZCAjY2VjZWNlOyovXHJcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTBlMGUwO1xyXG4gICAgICAgICAgICBjbGVhcjogYm90aDtcclxuICAgICAgICAgICAgLyptYXJnaW4tdG9wOiA5MHB4OyovXHJcbiAgICAgICAgICAgIGhlaWdodDogMjhweDtcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogd2hpdGVzbW9rZTtcclxuICAgICAgICAgICAgY29sb3I6ICM0OTQ5NDk7XHJcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiBBcmlhbCwgc2Fucy1zZXJpZjtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDE1cHg7XHJcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAyNXB4O1xyXG4gICAgICAgIH1cclxuICAgICAgICAuZ2FudHQtdHJlZS1jb250ZW50IHtcclxuICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAxNXB4O1xyXG4gICAgICAgIH1cclxuICAgIGBdLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHYW50dEFjdGl2aXR5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBEb0NoZWNrIHtcclxuICAgIEBJbnB1dCgpIHByb2plY3Q6IGFueTtcclxuICAgIEBJbnB1dCgpIG9wdGlvbnM6IGFueTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25HcmlkUm93Q2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgICBAT3V0cHV0KCkgb25Qb3BvdmVyT3BlbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgICBwcml2YXRlIHVwVHJpYW5nbGUgPSAnJiN4MjViMjsnOyAvLyBCTEFDSyBVUC1QT0lOVElORyBUUklBTkdMRVxyXG4gICAgcHJpdmF0ZSBkb3duVHJpYW5nbGUgPSAnJiN4MjViYzsnOyAvLyBCTEFDSyBET1dOLVBPSU5USU5HIFRSSUFOR0xFXHJcblxyXG4gICAgcHJpdmF0ZSBzdGFydDogRGF0ZTtcclxuICAgIHByaXZhdGUgZW5kOiBEYXRlO1xyXG4gICAgcHJpdmF0ZSB0aW1lU2NhbGU6IGFueTtcclxuXHJcbiAgICBwcml2YXRlIGFjdGl2aXR5Q29udGFpbmVyU2l6ZXM6IGFueTtcclxuXHJcbiAgICBhY3Rpdml0eUFjdGlvbnMgPSB7XHJcbiAgICAgICAgZXhwYW5kZWQ6IGZhbHNlLFxyXG4gICAgICAgIGV4cGFuZGVkSWNvbjogdGhpcy5kb3duVHJpYW5nbGVcclxuICAgIH07XHJcbiAgICBjb250YWluZXJIZWlnaHQ6IGFueTtcclxuICAgIGNvbnRhaW5lcldpZHRoOiBhbnk7XHJcblxyXG4gICAgZ2FudHRBY3Rpdml0eUhlaWdodDogYW55O1xyXG4gICAgZ2FudHRBY3Rpdml0eVdpZHRoOiBhbnk7XHJcblxyXG4gICAgcHJpdmF0ZSBzY2FsZTogYW55ID0ge1xyXG4gICAgICAgIHN0YXJ0OiBudWxsLFxyXG4gICAgICAgIGVuZDogbnVsbFxyXG4gICAgfTtcclxuXHJcbiAgICBkaW1lbnNpb25zID0ge1xyXG4gICAgICAgIGhlaWdodDogMCxcclxuICAgICAgICB3aWR0aDogMFxyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgZ3JpZENvbHVtbnM6IGFueVtdID0gW1xyXG4gICAgICAgIHsgbmFtZTogJycsIGxlZnQ6IDAsIHdpZHRoOiAxNiB9LFxyXG4gICAgICAgIHsgbmFtZTogJ0dydXBhIGFzb3J0eW1lbnTDs3cnLCBsZWZ0OiAwLCB3aWR0aDogMzMwIH1cclxuICAgIF07XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIGVsZW06IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgcHVibGljIGdhbnR0U2VydmljZTogR2FudHRTZXJ2aWNlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgLy8gQ2FjaGUgdGhlIHByb2plY3QgZGF0YSBhbmQgb25seSB3b3JrIHdpdGggdGhhdC4gT25seSBzaG93IHBhcmVudCB0YXNrcyBieSBkZWZhdWx0XHJcbiAgICAgICAgdGhpcy5nYW50dFNlcnZpY2UuVEFTS19DQUNIRSA9IHRoaXMucHJvamVjdC50YXNrcztcclxuICAgICAgICB0aGlzLmdhbnR0U2VydmljZS5USU1FX1NDQUxFID0gdGhpcy5nYW50dFNlcnZpY2UuY2FsY3VsYXRlU2NhbGUodGhpcy5vcHRpb25zLnNjYWxlLnN0YXJ0LCB0aGlzLm9wdGlvbnMuc2NhbGUuZW5kKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGFydCA9IHRoaXMub3B0aW9ucy5zY2FsZS5zdGFydDtcclxuICAgICAgICB0aGlzLmVuZCA9IHRoaXMub3B0aW9ucy5zY2FsZS5lbmQ7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXJXaWR0aCA9IHRoaXMuY2FsY3VsYXRlQ29udGFpbmVyV2lkdGgoKTtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lckhlaWdodCA9IHRoaXMuY2FsY3VsYXRlQ29udGFpbmVySGVpZ2h0KCk7XHJcbiAgICAgICAgdGhpcy5hY3Rpdml0eUNvbnRhaW5lclNpemVzID0gdGhpcy5nYW50dFNlcnZpY2UuY2FsY3VsYXRlQWN0aXZpdHlDb250YWluZXJEaW1lbnNpb25zKCk7XHJcblxyXG4gICAgICAgIC8vIGltcG9ydGFudCB0aGF0IHRoZXNlIGFyZSBjYWxsZWQgbGFzdCBhcyBpdCByZWxpZXMgb24gdmFsdWVzIGNhbGN1bGF0ZWQgYWJvdmUuXHJcbiAgICAgICAgdGhpcy5zZXRTY2FsZSgpO1xyXG4gICAgICAgIHRoaXMuc2V0RGltZW5zaW9ucygpO1xyXG4gICAgICAgIHRoaXMuc2V0U2l6ZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ3VzdG9tIG1vZGVsIGNoZWNrICovXHJcbiAgICBuZ0RvQ2hlY2soKSB7XHJcbiAgICAgICAgLy8gZG8gYSBjaGVjayB0byBzZWUgd2hldGhlciBhbnkgbmV3IHRhc2tzIGhhdmUgYmVlbiBhZGRlZC4gSWYgdGhlIHRhc2sgaXMgYSBjaGlsZCB0aGVuIHB1c2ggaW50byBhcnJheSBpZiB0cmVlIGV4cGFuZGVkP1xyXG4gICAgICAgIHRoaXMuZ2FudHRTZXJ2aWNlLmRvVGFza0NoZWNrKHRoaXMucHJvamVjdC50YXNrcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIE9uIHZlcnRpY2FsIHNjcm9sbCBzZXQgdGhlIHNjcm9sbCB0b3Agb2YgZ3JpZCBhbmQgYWN0aXZpdHkgICovXHJcbiAgICBvblZlcnRpY2FsU2Nyb2xsKHZlcnRpY2FsU2Nyb2xsOiBhbnksIGdhbnR0R3JpZDogYW55LCBnYW50dEFjdGl2aXR5QXJlYTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5nYW50dFNlcnZpY2Uuc2Nyb2xsVG9wKHZlcnRpY2FsU2Nyb2xsLCBnYW50dEdyaWQsIGdhbnR0QWN0aXZpdHlBcmVhKTtcclxuICAgIH1cclxuXHJcbiAgICBncmlkUm93Q2xpY2sodGFzaykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMub25HcmlkUm93Q2xpY2suZW1pdCh0YXNrKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHsgfVxyXG4gICAgfVxyXG5cclxuICAgIHBvcG92ZXJPcGVuKHRhc2spIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLm9uUG9wb3Zlck9wZW4uZW1pdCh0YXNrKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHsgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBPbiByZXNpemUgb2YgYnJvd3NlciB3aW5kb3cgZHluYW1pY2FsbHkgYWRqdXN0IGdhbnR0IGFjdGl2aXR5IGhlaWdodCBhbmQgd2lkdGggKi9cclxuICAgIG9uUmVzaXplKGV2ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBhY3Rpdml0eUNvbnRhaW5lclNpemVzID0gdGhpcy5nYW50dFNlcnZpY2UuY2FsY3VsYXRlQWN0aXZpdHlDb250YWluZXJEaW1lbnNpb25zKCk7XHJcbiAgICAgICAgdGhpcy5nYW50dEFjdGl2aXR5SGVpZ2h0ID0gYWN0aXZpdHlDb250YWluZXJTaXplcy5oZWlnaHQgKyAncHgnO1xyXG4gICAgICAgIHRoaXMuZ2FudHRBY3Rpdml0eVdpZHRoID0gYWN0aXZpdHlDb250YWluZXJTaXplcy53aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTY2FsZSgpIHtcclxuICAgICAgICB0aGlzLnNjYWxlLnN0YXJ0ID0gdGhpcy5zdGFydDtcclxuICAgICAgICB0aGlzLnNjYWxlLmVuZCA9IHRoaXMuZW5kO1xyXG4gICAgfVxyXG5cclxuICAgIHNldERpbWVuc2lvbnMoKSB7XHJcbiAgICAgICAgdGhpcy5kaW1lbnNpb25zLmhlaWdodCA9IHRoaXMuY29udGFpbmVySGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuZGltZW5zaW9ucy53aWR0aCA9IHRoaXMuY29udGFpbmVyV2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0R3JpZFJvd1N0eWxlKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ2hlaWdodCc6IHRoaXMuZ2FudHRTZXJ2aWNlLnJvd0hlaWdodCArICdweCcsXHJcbiAgICAgICAgICAgICdsaW5lLWhlaWdodCc6IHRoaXMuZ2FudHRTZXJ2aWNlLnJvd0hlaWdodCArICdweCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHNldEdyaWRTY2FsZVN0eWxlKCkge1xyXG4gICAgICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuZ2FudHRTZXJ2aWNlLnJvd0hlaWdodCArIDMwO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICdoZWlnaHQnOiBoZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAnbGluZS1oZWlnaHQnOiBoZWlnaHQgKyAncHgnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZUNvbnRhaW5lckhlaWdodCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdhbnR0U2VydmljZS5UQVNLX0NBQ0hFLmxlbmd0aCAqIHRoaXMuZ2FudHRTZXJ2aWNlLnJvd0hlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZUNvbnRhaW5lcldpZHRoKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FudHRTZXJ2aWNlLlRJTUVfU0NBTEUubGVuZ3RoICogdGhpcy5nYW50dFNlcnZpY2UuY2VsbFdpZHRoICsgdGhpcy5nYW50dFNlcnZpY2UuY2VsbFdpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0U2l6ZXMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5nYW50dEFjdGl2aXR5SGVpZ2h0ID0gdGhpcy5hY3Rpdml0eUNvbnRhaW5lclNpemVzLmhlaWdodCArICdweCc7XHJcbiAgICAgICAgdGhpcy5nYW50dEFjdGl2aXR5V2lkdGggPSB0aGlzLmFjdGl2aXR5Q29udGFpbmVyU2l6ZXMud2lkdGg7XHJcbiAgICB9XHJcbn1cclxuIl19