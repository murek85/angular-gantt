import { Component, OnInit, Input, Output, EventEmitter, ElementRef,  ChangeDetectionStrategy, OnChanges, DoCheck } from '@angular/core';

import { GanttService } from '../shared/services/gantt.service';

@Component({
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
    `],
    changeDetection: ChangeDetectionStrategy.Default
})
export class GanttActivityComponent implements OnInit, DoCheck {
    @Input() project: any;
    @Input() options: any;

    @Output() onGridRowClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() onPopoverOpen: EventEmitter<any> = new EventEmitter<any>();

    private upTriangle = '&#x25b2;'; // BLACK UP-POINTING TRIANGLE
    private downTriangle = '&#x25bc;'; // BLACK DOWN-POINTING TRIANGLE

    private start: Date;
    private end: Date;
    private timeScale: any;

    private activityContainerSizes: any;

    activityActions = {
        expanded: false,
        expandedIcon: this.downTriangle
    };
    containerHeight: any;
    containerWidth: any;

    ganttActivityHeight: any;
    ganttActivityWidth: any;

    private scale: any = {
        start: null,
        end: null
    };

    dimensions = {
        height: 0,
        width: 0
    };

    public gridColumns: any[] = [
        { name: '', left: 0, width: 16 },
        { name: 'Grupa asortymentów', left: 0, width: 330 }
    ];

    constructor(
        public elem: ElementRef,
        public ganttService: GanttService) {
    }

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

    /** Custom model check */
    ngDoCheck() {
        // do a check to see whether any new tasks have been added. If the task is a child then push into array if tree expanded?
        this.ganttService.doTaskCheck(this.project.tasks);
    }

    /** On vertical scroll set the scroll top of grid and activity  */
    onVerticalScroll(verticalScroll: any, ganttGrid: any, ganttActivityArea: any): void {
        this.ganttService.scrollTop(verticalScroll, ganttGrid, ganttActivityArea);
    }

    gridRowClick(task) {
        try {
            this.onGridRowClick.emit(task);
        } catch (err) { }
    }

    popoverOpen(task) {
        try {
            this.onPopoverOpen.emit(task);
        } catch (err) { }
    }

    /** On resize of browser window dynamically adjust gantt activity height and width */
    onResize(event: any): void {
        const activityContainerSizes = this.ganttService.calculateActivityContainerDimensions();
        this.ganttActivityHeight = activityContainerSizes.height + 'px';
        this.ganttActivityWidth = activityContainerSizes.width;
    }

    setScale() {
        this.scale.start = this.start;
        this.scale.end = this.end;
    }

    setDimensions() {
        this.dimensions.height = this.containerHeight;
        this.dimensions.width = this.containerWidth;
    }

    setGridRowStyle(): any {
        return {
            'height': this.ganttService.rowHeight + 'px',
            'line-height': this.ganttService.rowHeight + 'px'
        };
    }

    setGridScaleStyle() {
        const height = this.ganttService.rowHeight + 30;
        return {
            'height': height + 'px',
            'line-height': height + 'px'
        };
    }

    private calculateContainerHeight(): number {
        return this.ganttService.TASK_CACHE.length * this.ganttService.rowHeight;
    }

    private calculateContainerWidth(): number {
        return this.ganttService.TIME_SCALE.length * this.ganttService.cellWidth + this.ganttService.cellWidth;
    }

    private setSizes(): void {
        this.ganttActivityHeight = this.activityContainerSizes.height + 'px';
        this.ganttActivityWidth = this.activityContainerSizes.width;
    }
}
