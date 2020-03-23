import { OnInit, EventEmitter } from '@angular/core';
import { GanttService } from './shared/services/gantt.service';
import { IGanttOptions, Project } from './shared/interfaces';
export declare class GanttComponent implements OnInit {
    private ganttService;
    _project: Project;
    _options: IGanttOptions;
    project: any;
    options: any;
    onGridRowClick: EventEmitter<any>;
    private ganttContainerWidth;
    constructor(ganttService: GanttService);
    ngOnInit(): void;
    setSizes(): void;
    setDefaultOptions(): void;
    setDefaultProject(): void;
    gridRowClicked(task: any): void;
    onResize($event: any): void;
}
