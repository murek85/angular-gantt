import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { GanttService } from '../../shared/services/gantt.service';
import { Zooming } from '../../shared/interfaces';

@Component({
    selector: 'activity-background',
    template: `
    <div #bg class="gantt-activity-bg">
        <div class="gantt-activity-row"
            [ngStyle]="setRowStyle()"
            *ngFor="let row of ganttService.groupData(tasks)">

            <div class="gantt-activity-cell"
                [ngStyle]="setCellStyle()"
                *ngFor="let cell of cells; let l = last"
                [ngClass]="[(isDayWeekend(cell)) ? 'weekend' : '', l ? 'last-column-cell' : '']"></div>
        </div>
    </div>
    `,
    styles: [`
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
        .weekend {
            background-color: whitesmoke;
        }
    `]
})
export class GanttActivityBackgroundComponent implements OnInit {
    @Input() tasks: any;
    @Input() timeScale: any;
    @Input() zoom: any;
    @Input() zoomLevel: string;

    @ViewChild('bg') bg: ElementRef;

    private rows: any[] = [];
    private cells: any[] = [];

    constructor(private ganttService: GanttService) { }

    ngOnInit() {
        this.drawGrid();

        this.zoom.subscribe((zoomLevel: string) => {
            this.zoomLevel = zoomLevel;
            this.drawGrid();
        });
    }

    isDayWeekend(date: Date): boolean {
        return this.ganttService.isDayWeekend(date);
    }

    private setRowStyle() {
        return {
            'height': this.ganttService.rowHeight + 'px'
        };
    }

    private setCellStyle() {
        var width = this.ganttService.cellWidth;

        if (this.zoomLevel === Zooming[Zooming.hours]) {
            width = this.ganttService.hourCellWidth;
        }

        return {
            'width': width + 'px'
        };
    }

    private drawGrid(): void {
        if (this.zoomLevel === Zooming[Zooming.hours]) {
            this.cells = [];

            this.timeScale.forEach((date: any) => {
                for (var i = 0; i <= 23; i++) {
                    this.cells.push(date);
                }
            });
        } else {
            this.cells = this.timeScale;
        }
    }
}
