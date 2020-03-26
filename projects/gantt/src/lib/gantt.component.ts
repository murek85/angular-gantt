import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgStyle } from '@angular/common';
import { GanttService } from './shared/services/gantt.service';
import { IGanttOptions, Project } from './shared/interfaces';

@Component({
    selector: 'gantt',
    template: `
        <div [ngStyle]="{ 'width': '100%' }">
            <div class="gantt-container" (window:resize)="onResize($event)">
                <!--<gantt-header [name]="_project.name" [startDate]="_project.startDate"></gantt-header>-->
                <gantt-activity [project]="_project" [options]="_options" (onGridRowClick)="gridRowClicked($event)" (onPopoverOpen)="popoverOpened($event)"></gantt-activity>
                <!--<gantt-footer [project]="_project"></gantt-footer>-->
            </div>
        </div>
    `,
    styles: [`
        .gantt-container {
            font-family: Arial;
            font-size: 13px;
            border: 1px solid #cecece;
            position: relative;
            white-space: nowrap;
            margin-top: 0px;
        }
    `],
    providers: []
})
export class GanttComponent implements OnInit {
    _project: Project;
    _options: IGanttOptions;

    @Input()
    set project(project: any) {
        if (project) {
            this._project = project;
        } else {
            this.setDefaultProject();
        }
    }
    get project() { return this._project; }

    @Input()
    set options(options: any) {
        if (options.scale) {
            this._options = options;
        } else {
            this.setDefaultOptions();
        }
    }
    get options() { return this._options; }

    @Output() onGridRowClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() onPopoverOpen: EventEmitter<any> = new EventEmitter<any>();

    ganttContainerWidth: number;

    constructor(public ganttService: GanttService) { }

    ngOnInit() {
    }

    setSizes(): void {
        this.ganttContainerWidth = this.ganttService.calculateContainerWidth();
    }

    setDefaultOptions() {
        const scale = this.ganttService.calculateGridScale(this._project.tasks);
        const gridColumns = [
            { name: '', left: 0, width: 16 },
            { name: 'Zadanie', left: 0, width: 330 }
        ];

        this._options = {
            scale,
            gridColumns
        };
    }

    setDefaultProject() {
        this._project = {
            name: '',
            startDate: null,
            tasks: []
        };
    }

    gridRowClicked(task: any) {
        this.onGridRowClick.emit(task);
    }

    popoverOpened(task: any) {
        this.onPopoverOpen.emit(task);
    }

    onResize($event: any): void {
        this.setSizes();
    }
}
