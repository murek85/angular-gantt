import { Component, OnInit, Input, ElementRef, EventEmitter, Output } from '@angular/core';
import { GanttService } from '../../shared/services/gantt.service';

@Component({
    selector: 'activity-bars',
    template: `
    <div class="gantt-activity-bars-area"
        [ngStyle]="{ 'height': containerHeight + 'px', 'width': containerWidth + 'px' }">

        <div #bar class="gantt-activity-line"
            *ngFor="let task of tasks; let i = index" (click)="toggleChildren(task)"
            [ngStyle]="drawBar(task, i)">

            <div class="gantt-activity-content"></div>
            <div class="gantt-activity-link-control gantt-activity-right" style="height: 26px; line-height: 30px">
                <div class="gantt-link-point"></div>
            </div>
            <div class="gantt-activity-link-control gantt-activity-left" style="height: 26px; line-height: 30px">
                <div class="gantt-link-point"></div>
            </div>
        </div>
    </div>
    `,
    styles: [`
    .gantt-activity-line {
        /*border-radius: 2px;*/
        position: absolute;
        box-sizing: border-box;
        background-color: rgb(18,195,244);
        border: 1px solid #2196F3;
        -webkit-user-select: none;
    }
    .gantt-activity-line:hover {
        cursor: pointer;
    }
    .gantt-activity-progress {
        text-align: center;
        z-index: 0;
        background: #2196F3;
        position: absolute;
        min-height: 18px;
        display: block;
        height: 18px;
    }
    .gantt-activity-progress-drag {
        height: 8px;
        width: 8px;
        bottom: -4px;
        margin-left: 4px;
        background-position: bottom;
        background-image: "";
        background-repeat: no-repeat;
        z-index: 2;
    }
    .gantt-activity-content {
        font-size: 12px;
        color: #fff;
        width: 100%;
        top: 0;
        position: absolute;
        white-space: nowrap;
        text-align: center;
        line-height: inherit;
        overflow: hidden;
        height: 100%;
    }
    .gantt-activity-link-control {
        position: absolute;
        width: 13px;
        top: 0;
    }
    .gantt-activity-right {
        right: 0;
    }
    .gantt-activity-left {
        left: 0;
    }
    .gantt-activity-right:hover {
        /*cursor:w-resize;*/
    }
    .gantt-activity-left:hover {
        /*cursor:w-resize;*/
    }
    `],
    providers: [
        GanttService
    ]
})
export class GanttActivityBarsComponent implements OnInit {
    @Input() timeScale: any;
    @Input() dimensions: any;
    @Input() tasks: any;

    @Output() onGridRowClick: EventEmitter<any> = new EventEmitter<any>();

    containerHeight = 0;
    containerWidth = 0;

    constructor(public ganttService: GanttService) { }

    ngOnInit() {
        this.containerHeight = this.dimensions.height;
        this.containerWidth = this.dimensions.width;
    }

    drawBar(task: any, index: number) {
        let style = {};
        style = this.ganttService.calculateBar(task, index, this.timeScale);

        return style;
    }

    toggleChildren(task: any) {
        try {
            this.onGridRowClick.emit(task);
        } catch (err) { }
    }

    private addMouseEventListeners(dragFn: any) {
        function stopFn() {
            document.documentElement.removeEventListener('mousemove', dragFn, false);
            document.documentElement.removeEventListener('mouseup', stopFn, false);
            document.documentElement.removeEventListener('mouseleave', stopFn, false);
        }

        document.documentElement.addEventListener('mousemove', dragFn, false);
        document.documentElement.addEventListener('mouseup', stopFn, false);
        document.documentElement.addEventListener('mouseleave', stopFn, false);
    }
}
