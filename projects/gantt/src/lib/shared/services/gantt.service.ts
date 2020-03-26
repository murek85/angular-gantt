import { Injectable } from '@angular/core';
import { GanttConfig } from './gantt-config.service';
import { Task, IScale } from '../interfaces';

@Injectable()
export class GanttService {
    public rowHeight = 0;
    public hourCellWidth = 60; // change to 60 so minutes can been seen more easily
    public hoursCellWidth = this.hourCellWidth * 25;
    public cellWidth = 0;
    public windowInnerWidth = 0;
    public activityHeight = 0;
    public barHeight = 0;
    public barLineHeight = 0;
    public barTop = 0;
    public barMoveable = false;
    public gridWidth = 0; //188
    public gridHeight = 332;
    public TASK_CACHE: any[];
    public TIME_SCALE: any[];

    constructor() {
        const ganttConfig = new GanttConfig();

        this.rowHeight = ganttConfig.rowHeight;
        this.cellWidth = ganttConfig.cellWidth;
        this.activityHeight = ganttConfig.activityHeight;
        this.barHeight = ganttConfig.barHeight;
        this.barLineHeight = ganttConfig.barLineHeight;
        this.barTop = ganttConfig.rowHeight;
        this.barMoveable = ganttConfig.barMoveable;
    }

    private calculateBarWidth(start: Date, end: Date): number {
        if (typeof start === 'string') {
            start = new Date(start);
        }

        if (typeof end === 'string') {
            end = new Date(end);
        }

        const days = this.calculateDiffDays(start, end);
        const width: number = (days / 7 * this.cellWidth + days / 7);
        return width;
    }

    private calculateBarLeft(start: Date, scale: any[]): number {
        let left = 0;

        if (start != null) {
            if (typeof start === 'string') {
                start = new Date();
            }

            for (var i = 0; i < scale.length; i++) {
                if ((start.getTime() >= scale[i].getTime() && start.getTime() < scale[i + 1].getTime())) {
                    
                    left = i * this.cellWidth + i + this.calculateBarLeftDelta(start) + ((7 / (scale[i + 1].getDate() - start.getDate()) / 7) * this.cellWidth) - this.cellWidth / 7;
                    break;
                }
            }
        }
        return left;
    }

    /** Calculates the height of the gantt grid, activity and vertical scroll */
    public calculateGanttHeight(): string {
        return `${this.TASK_CACHE.length * this.rowHeight}px`;
    }

    private calculateBarLeftDelta(start: Date): number {
        let offset = 0;
        const hoursInDay = 24;
        const minutesInHour = 60;
        const secondsInHour = 3600;
        const startHours: number =
            start.getHours() + start.getMinutes() / minutesInHour + start.getSeconds() / secondsInHour;

        offset = this.cellWidth / hoursInDay * startHours;
        return offset;
    }

    /** Calculate the bar styles */
    public calculateBar(task: any, index: number, scale: any) {
        const barStyle = this.getBarStyle(task.color);
        return {
            'top': this.barTop * index + 2 + 'px',
            'left': this.calculateBarLeft(task.start, scale) + 'px',
            'height': this.barHeight + 'px',
            'line-height': this.barLineHeight + 'px',
            'width': this.calculateBarWidth(task.start, task.end) + 'px',
            'background-color': barStyle["background-color"],
            'border-left': barStyle["border-left"]
        };
    }

    /** Get the bar style based on task status */
    private getBarStyle(color: any): any {
        const style = {};
        style["background-color"] = color.secondary;
        style["border-left"] = `5px solid ${color.primary}`;

        return style;
    }

    /** Calculates the difference in two dates and returns number of days */
    public calculateDiffDays(start: Date, end: Date): number {
        try {
            const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds /ms
            const diffDays = Math.abs((start.getTime() - end.getTime()) / (oneDay));
            const days = diffDays; // don't use Math.round as it will draw an incorrect bar
            return days;
        } catch (err) {
            return 0;
        }
    }

    /** Calculate the gantt scale range given the start and end date of tasks*/
    public calculateScale(start: Date = new Date(), end: Date = this.addDays(start, 7)) {
        const scale: any[] = [];
        try {
            while (start.getTime() <= end.getTime()) {
                scale.push(start);
                start = this.addDays(start, 7);
            }
            return scale;

        } catch (err) {
            return scale;
        }
    }

    /** Determines whether given date is a weekend */
    public isDayWeekend(date: Date): boolean {
        const day = date.getDay();
        if (day === 6 || day === 0) {
            return true;
        }
        return false;
    }

    /** Add x number of days to a date object */
    public addDays(date: Date, days: number): Date {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    //** Remove x number of days from a date object */
    public removeDays(date: Date, days: number): Date {
        const result = new Date(date);
        result.setDate(result.getDate() - days);
        return result;
    }

    /** Calculates the grid scale for gantt based on tasks start and end dates */
    public calculateGridScale(tasks: Task[]): IScale {
        let start: Date;
        let end: Date;
        const dates = tasks.map((task: any) => {
            return {
                start: new Date(task.start),
                end: new Date(task.end)
            };
        });

        start = new Date(Math.min.apply(null, dates.map((t) => {
            return t.start;
        })));

        end = new Date(Math.max.apply(null, dates.map((t) => {
            return t.end;
        })));

        return {
            start: start,
            end: end
        };
    }

    public getComputedStyle(element: any, attribute: any) {
        return parseInt(document.defaultView.getComputedStyle(element)[attribute], 10);
    }

    //TODO(dale): determine whether this is needed
    public calculateContainerWidth(): number {
        this.windowInnerWidth = window.innerWidth;
        const containerWidth = this.gridWidth - 18;
        return containerWidth;
    }

    public calculateContainerHeight(): number {
        const containerHeight = (innerHeight - 18);
        return containerHeight;
    }

    public calculateActivityContainerDimensions(): any {
        const scrollWidth = 18;
        this.windowInnerWidth = window.innerWidth;
        const width = window.innerWidth - this.gridWidth - scrollWidth;

        return { height: this.activityHeight, width: width };
    }

    public calculateGanttActivityWidth(elem: HTMLElement): any {
        return `calc(100% - ${(elem.offsetWidth + 1)}px)`;
    }

    public calculateGanttActivityHeight(elem: HTMLElement): any {
        return `${elem.offsetHeight}px`;
    }

    /** Set the vertical scroll top positions for gantt */
    public scrollTop(verticalScrollElem: any, ganttGridElem: any, ganttActivityAreaElem: any) {
        const verticalScrollTop = verticalScrollElem.scrollTop;
        const scroll = this.setScrollTop;

        // debounce
        if (verticalScrollTop !== null && verticalScrollTop !== undefined) {
            scroll(verticalScrollTop, ganttActivityAreaElem);
            scroll(ganttActivityAreaElem.scrollTop, ganttGridElem);
        }
    }

    /** Group data by id , only supports one level*/
    public groupData(tasks: any): any {
        return tasks;
    }

    /** Checks whether any new data needs to be added to task cache  */
    public doTaskCheck(tasks: any[], scale: any): boolean {
        // const cachedTaskIds = this.TASK_CACHE.map((task: any) => { return task.id });
        // const itemsToCache: any[] = [];

        // only look at tasks that are not cached
        // tasks.filter((task: any) => {
        //     return cachedTaskIds.indexOf(task.id) === -1;
        // }).forEach((task: any) => {
        //     itemsToCache.push(task);
        // });

        // itemsToCache.forEach((item: any) => {
        //     this.TASK_CACHE.push(item);
        // });

        // if (itemsToCache.length > 0) {
        //     return true;
        // }

        this.TASK_CACHE = tasks;

        this.TIME_SCALE = this.calculateScale(scale.start, scale.end);

        return true;
    }

    /** Set a id prefix so CSS3 query selector can work with ids that contain numbers */
    public setIdPrefix(id: string): string {
        return `_${id}`;
    }

    // /** Remove the id prefix to allow querying of data */
    // public removeIdPrefix(id: string): string {
    //     return id.substring(1, id.length - 1);
    // }

    /** Set the scroll top property of a native DOM element */
    public setScrollTop(scrollTop: number, element: any): void {
        if (element !== null && element !== undefined) {
            element.scrollTop = scrollTop;
        }
    }
}
