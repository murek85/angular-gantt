import { Component, OnInit, Input, EventEmitter, ViewChild } from '@angular/core';
import { GanttService } from '../../shared/services/gantt.service';
import { Zooming } from '../../shared/interfaces';

@Component({
    selector: 'time-scale',
    template: `
        <div class="time-scale" [ngStyle]="setTimescaleStyle()">
            <div class="time-scale-line" [ngStyle]="setTimescaleLineStyle('none')">
                <div class="time-scale-cell" *ngFor="let date of timeScale" 
                    [ngStyle]="setTimescaleCellStyle()"
                    [ngClass]="(isDayWeekend(date)) ? 'weekend' : ''">{{date | date: 'dd-MM-yyyy'}}</div>
            </div>
            <div *ngIf="zoomLevel === 'hours'" class="time-scale-line" [ngStyle]="setTimescaleLineStyle('1px solid #cecece')">
                <div class="time-scale-cell"
                    *ngFor="let hour of getHours()"
                    [ngStyle]="{ 'width': ganttService.hourCellWidth + 'px' }">{{hour}}</div>
            </div>
        </div>`,
    styles: [`
        .weekend {
            background-color: whitesmoke;
        }
        .time-scale {
            font-size: 12px;
            border-bottom: 1px solid #cecece;
            background-color: #fff;
        }
        .time-scale-line {
            box-sizing: border-box;
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
    @Input() zoom: any;
    @Input() zoomLevel: any;

    constructor(public ganttService: GanttService) { }

    ngOnInit() {
        this.zoom.subscribe((zoomLevel: string) => {
            this.zoomLevel = zoomLevel;
        });
    }

    setTimescaleStyle() {
        return {
            'width': this.dimensions.width + 'px'
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
        var width = this.ganttService.cellWidth;
        var hoursInDay = 24;
        var hourSeperatorPixels = 23; // we don't include the first 

        if (this.zoomLevel ===  Zooming[Zooming.hours]) {
            width = this.ganttService.hourCellWidth * hoursInDay + hourSeperatorPixels; 
        }

        return {
            'width': width + 'px'
        };
    }

    isDayWeekend(date: Date): boolean {
        return this.ganttService.isDayWeekend(date);
    }

    getHours(): string[] {
        return this.ganttService.getHours(this.timeScale.length);
    }
}