import { OnInit, EventEmitter } from '@angular/core';
import { GanttService } from './shared/services/gantt.service';
import { IGanttOptions, Project } from './shared/interfaces';
import * as i0 from "@angular/core";
export declare class GanttComponent implements OnInit {
    ganttService: GanttService;
    _project: Project;
    _options: IGanttOptions;
    set project(project: any);
    get project(): any;
    set options(options: any);
    get options(): any;
    onGridRowClick: EventEmitter<any>;
    onPopoverOpen: EventEmitter<any>;
    ganttContainerWidth: number;
    constructor(ganttService: GanttService);
    ngOnInit(): void;
    setSizes(): void;
    setDefaultOptions(): void;
    setDefaultProject(): void;
    gridRowClicked(task: any): void;
    popoverOpened(task: any): void;
    onResize($event: any): void;
    static ɵfac: i0.ɵɵFactoryDef<GanttComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<GanttComponent, "gantt", never, { "project": "project"; "options": "options"; }, { "onGridRowClick": "onGridRowClick"; "onPopoverOpen": "onPopoverOpen"; }, never, never>;
}
