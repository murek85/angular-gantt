import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { GanttService } from '../../shared/services/gantt.service';

@Component({
    selector: 'activity-background',
    template: `
    <div #bg class="gantt-activity-bg">
        <div class="gantt-activity-row"
            [ngStyle]="setRowStyle()"
            *ngFor="let row of tasks">

            <div class="gantt-activity-cell"
                [ngStyle]="setCellStyle()"
                *ngFor="let cell of cells; let i = index; let l = last" [ngClass]="(i % 2) ? 'weekend' : ''" ></div>
        </div>
    </div>
    `,
    styles: [`
        .weekend {
            background-color: whitesmoke;
        }
        .gantt-activity-bg {
            overflow: hidden;
        }
        .gantt-activity-row {
            border-bottom: 1px solid #ebebeb;
            background-color: #fff;
            box-sizing: border-box;
        }
        .gantt-activity-cell {
            display: inline-block;
            height: 100%;
            border-right: 1px solid #ebebeb;
        }
    `]
})
export class GanttActivityBackgroundComponent implements OnInit {
    @Input() tasks: any;
    @Input() timeScale: any;

    @ViewChild('bg') bg: ElementRef;

    rows: any[] = [];
    cells: any[] = [];

    constructor(public ganttService: GanttService) { }

    ngOnInit() {
        this.drawGrid();
    }

    isDayWeekend(date: Date): boolean {
        return this.ganttService.isDayWeekend(date);
    }

    setRowStyle() {
        return {
            'height': this.ganttService.rowHeight + 'px'
        };
    }

    setCellStyle() {
        return {
            'width': this.ganttService.cellWidth + 'px'
        };
    }

    private drawGrid(): void {
        this.cells = this.timeScale;
    }
}
