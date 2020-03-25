import { Component, OnInit, Input } from '@angular/core';
import { GanttService } from '../../shared/services/gantt.service';

@Component({
    selector: 'time-scale',
    template: `
        <div class="time-scale" [ngStyle]="setTimescaleStyle()">
            <div class="time-scale-line" [ngStyle]="setTimescaleLineStyle('none')">
                <div class="time-scale-cell" *ngFor="let date of timeScale; let i = index"
                    [ngClass]="(i % 2) ? 'weekend' : ''" [ngStyle]="setTimescaleCellStyle()">{{date | date: 'dd-MM'}}</div>
            </div>
            <div class="time-scale-line" [ngStyle]="setTimescaleLineStyle('none')">
                <div class="time-scale-cell" *ngFor="let date of timeScale; let i = index"
                [ngClass]="(i % 2) ? 'weekend' : ''" [ngStyle]="setTimescaleCellStyle()">{{i + 1}}</div>
            </div>
        </div>`,
    styles: [`
        .weekend {
            background-color: whitesmoke;
        }
        .time-scale {
            font-size: 12px;
            background-color: #fff;
            border-bottom: 1px solid #cecece;
        }
        .time-scale-line {
            box-sizing: border-box;
            border-bottom: 1px solid #cecece;
        }
        .time-scale-line:first-child {
            border-top: none;
        }
        .time-scale-cell {
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            border-right: 1px solid #cecece;
            text-align: center;
            height: 100%;
        }`
    ],
    providers: [
        GanttService
    ]
})
export class GanttTimeScaleComponent implements OnInit {
    @Input() timeScale: any;
    @Input() dimensions: any;

    constructor(public ganttService: GanttService) { }

    ngOnInit() {
    }

    setTimescaleStyle() {
        return {
            'width': (this.dimensions.width + 36) + 'px'
        };
    }

    setTimescaleLineStyle(borderTop: string) {
        return {
            'height': this.ganttService.rowHeight + 'px',
            'line-height': this.ganttService.rowHeight + 'px',
            'position': 'relative',
            'border-top': borderTop
        };
    }

    setTimescaleCellStyle() {
        return {
            'width': this.ganttService.cellWidth + 'px'
        };
    }

    isDayWeekend(date: Date): boolean {
        return this.ganttService.isDayWeekend(date);
    }
}
