import { Task, IScale } from '../interfaces';
import * as ɵngcc0 from '@angular/core';
export declare class GanttService {
    rowHeight: number;
    hourCellWidth: number;
    hoursCellWidth: number;
    cellWidth: number;
    windowInnerWidth: number;
    activityHeight: number;
    barHeight: number;
    barLineHeight: number;
    barTop: number;
    barMoveable: boolean;
    gridWidth: number;
    gridHeight: number;
    TASK_CACHE: any[];
    TIME_SCALE: any[];
    MONTH_SCALE: any[];
    constructor();
    private calculateBarWidth;
    private calculateBarLeft;
    /** Calculates the height of the gantt grid, activity and vertical scroll */
    calculateGanttHeight(): string;
    private calculateBarLeftDelta;
    /** Calculate the bar styles */
    calculateBar(task: any, index: number, scale: any): {
        top: string;
        left: string;
        height: string;
        'line-height': string;
        width: string;
        'background-color': any;
        'border-left': any;
    };
    /** Get the bar style based on task status */
    private getBarStyle;
    /** Calculates the difference in two dates and returns number of days */
    calculateDiffDays(start: Date, end: Date): number;
    /** Calculate the gantt scale range given the start and end date of tasks*/
    calculateScale(start?: Date, end?: Date): any[];
    calculateMonthScale(start?: Date, end?: Date): any[];
    /** Determines whether given date is a weekend */
    isDayWeekend(date: Date): boolean;
    /** Add x number of days to a date object */
    addDays(date: Date, days: number): Date;
    removeDays(date: Date, days: number): Date;
    /** Calculates the grid scale for gantt based on tasks start and end dates */
    calculateGridScale(tasks: Task[]): IScale;
    getComputedStyle(element: any, attribute: any): number;
    calculateContainerWidth(): number;
    calculateContainerHeight(): number;
    calculateActivityContainerDimensions(): any;
    calculateGanttActivityWidth(elem: HTMLElement): any;
    calculateGanttActivityHeight(elem: HTMLElement): any;
    calculateCellMonthWidth(minDate: Date, maxDate: Date): any[];
    private calculateDiffMonths;
    /** Set the vertical scroll top positions for gantt */
    scrollTop(verticalScrollElem: any, ganttGridElem: any, ganttActivityAreaElem: any): void;
    /** Group data by id , only supports one level*/
    groupData(tasks: any): any;
    /** Checks whether any new data needs to be added to task cache  */
    doTaskCheck(tasks: any[], scale: any): boolean;
    /** Set a id prefix so CSS3 query selector can work with ids that contain numbers */
    setIdPrefix(id: string): string;
    /** Set the scroll top property of a native DOM element */
    setScrollTop(scrollTop: number, element: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<GanttService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<GanttService>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQuc2VydmljZS5kLnRzIiwic291cmNlcyI6WyJnYW50dC5zZXJ2aWNlLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGFzaywgSVNjYWxlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIEdhbnR0U2VydmljZSB7XHJcbiAgICByb3dIZWlnaHQ6IG51bWJlcjtcclxuICAgIGhvdXJDZWxsV2lkdGg6IG51bWJlcjtcclxuICAgIGhvdXJzQ2VsbFdpZHRoOiBudW1iZXI7XHJcbiAgICBjZWxsV2lkdGg6IG51bWJlcjtcclxuICAgIHdpbmRvd0lubmVyV2lkdGg6IG51bWJlcjtcclxuICAgIGFjdGl2aXR5SGVpZ2h0OiBudW1iZXI7XHJcbiAgICBiYXJIZWlnaHQ6IG51bWJlcjtcclxuICAgIGJhckxpbmVIZWlnaHQ6IG51bWJlcjtcclxuICAgIGJhclRvcDogbnVtYmVyO1xyXG4gICAgYmFyTW92ZWFibGU6IGJvb2xlYW47XHJcbiAgICBncmlkV2lkdGg6IG51bWJlcjtcclxuICAgIGdyaWRIZWlnaHQ6IG51bWJlcjtcclxuICAgIFRBU0tfQ0FDSEU6IGFueVtdO1xyXG4gICAgVElNRV9TQ0FMRTogYW55W107XHJcbiAgICBNT05USF9TQ0FMRTogYW55W107XHJcbiAgICBjb25zdHJ1Y3RvcigpO1xyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVCYXJXaWR0aDtcclxuICAgIHByaXZhdGUgY2FsY3VsYXRlQmFyTGVmdDtcclxuICAgIC8qKiBDYWxjdWxhdGVzIHRoZSBoZWlnaHQgb2YgdGhlIGdhbnR0IGdyaWQsIGFjdGl2aXR5IGFuZCB2ZXJ0aWNhbCBzY3JvbGwgKi9cclxuICAgIGNhbGN1bGF0ZUdhbnR0SGVpZ2h0KCk6IHN0cmluZztcclxuICAgIHByaXZhdGUgY2FsY3VsYXRlQmFyTGVmdERlbHRhO1xyXG4gICAgLyoqIENhbGN1bGF0ZSB0aGUgYmFyIHN0eWxlcyAqL1xyXG4gICAgY2FsY3VsYXRlQmFyKHRhc2s6IGFueSwgaW5kZXg6IG51bWJlciwgc2NhbGU6IGFueSk6IHtcclxuICAgICAgICB0b3A6IHN0cmluZztcclxuICAgICAgICBsZWZ0OiBzdHJpbmc7XHJcbiAgICAgICAgaGVpZ2h0OiBzdHJpbmc7XHJcbiAgICAgICAgJ2xpbmUtaGVpZ2h0Jzogc3RyaW5nO1xyXG4gICAgICAgIHdpZHRoOiBzdHJpbmc7XHJcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiBhbnk7XHJcbiAgICAgICAgJ2JvcmRlci1sZWZ0JzogYW55O1xyXG4gICAgfTtcclxuICAgIC8qKiBHZXQgdGhlIGJhciBzdHlsZSBiYXNlZCBvbiB0YXNrIHN0YXR1cyAqL1xyXG4gICAgcHJpdmF0ZSBnZXRCYXJTdHlsZTtcclxuICAgIC8qKiBDYWxjdWxhdGVzIHRoZSBkaWZmZXJlbmNlIGluIHR3byBkYXRlcyBhbmQgcmV0dXJucyBudW1iZXIgb2YgZGF5cyAqL1xyXG4gICAgY2FsY3VsYXRlRGlmZkRheXMoc3RhcnQ6IERhdGUsIGVuZDogRGF0ZSk6IG51bWJlcjtcclxuICAgIC8qKiBDYWxjdWxhdGUgdGhlIGdhbnR0IHNjYWxlIHJhbmdlIGdpdmVuIHRoZSBzdGFydCBhbmQgZW5kIGRhdGUgb2YgdGFza3MqL1xyXG4gICAgY2FsY3VsYXRlU2NhbGUoc3RhcnQ/OiBEYXRlLCBlbmQ/OiBEYXRlKTogYW55W107XHJcbiAgICBjYWxjdWxhdGVNb250aFNjYWxlKHN0YXJ0PzogRGF0ZSwgZW5kPzogRGF0ZSk6IGFueVtdO1xyXG4gICAgLyoqIERldGVybWluZXMgd2hldGhlciBnaXZlbiBkYXRlIGlzIGEgd2Vla2VuZCAqL1xyXG4gICAgaXNEYXlXZWVrZW5kKGRhdGU6IERhdGUpOiBib29sZWFuO1xyXG4gICAgLyoqIEFkZCB4IG51bWJlciBvZiBkYXlzIHRvIGEgZGF0ZSBvYmplY3QgKi9cclxuICAgIGFkZERheXMoZGF0ZTogRGF0ZSwgZGF5czogbnVtYmVyKTogRGF0ZTtcclxuICAgIHJlbW92ZURheXMoZGF0ZTogRGF0ZSwgZGF5czogbnVtYmVyKTogRGF0ZTtcclxuICAgIC8qKiBDYWxjdWxhdGVzIHRoZSBncmlkIHNjYWxlIGZvciBnYW50dCBiYXNlZCBvbiB0YXNrcyBzdGFydCBhbmQgZW5kIGRhdGVzICovXHJcbiAgICBjYWxjdWxhdGVHcmlkU2NhbGUodGFza3M6IFRhc2tbXSk6IElTY2FsZTtcclxuICAgIGdldENvbXB1dGVkU3R5bGUoZWxlbWVudDogYW55LCBhdHRyaWJ1dGU6IGFueSk6IG51bWJlcjtcclxuICAgIGNhbGN1bGF0ZUNvbnRhaW5lcldpZHRoKCk6IG51bWJlcjtcclxuICAgIGNhbGN1bGF0ZUNvbnRhaW5lckhlaWdodCgpOiBudW1iZXI7XHJcbiAgICBjYWxjdWxhdGVBY3Rpdml0eUNvbnRhaW5lckRpbWVuc2lvbnMoKTogYW55O1xyXG4gICAgY2FsY3VsYXRlR2FudHRBY3Rpdml0eVdpZHRoKGVsZW06IEhUTUxFbGVtZW50KTogYW55O1xyXG4gICAgY2FsY3VsYXRlR2FudHRBY3Rpdml0eUhlaWdodChlbGVtOiBIVE1MRWxlbWVudCk6IGFueTtcclxuICAgIGNhbGN1bGF0ZUNlbGxNb250aFdpZHRoKG1pbkRhdGU6IERhdGUsIG1heERhdGU6IERhdGUpOiBhbnlbXTtcclxuICAgIHByaXZhdGUgY2FsY3VsYXRlRGlmZk1vbnRocztcclxuICAgIC8qKiBTZXQgdGhlIHZlcnRpY2FsIHNjcm9sbCB0b3AgcG9zaXRpb25zIGZvciBnYW50dCAqL1xyXG4gICAgc2Nyb2xsVG9wKHZlcnRpY2FsU2Nyb2xsRWxlbTogYW55LCBnYW50dEdyaWRFbGVtOiBhbnksIGdhbnR0QWN0aXZpdHlBcmVhRWxlbTogYW55KTogdm9pZDtcclxuICAgIC8qKiBHcm91cCBkYXRhIGJ5IGlkICwgb25seSBzdXBwb3J0cyBvbmUgbGV2ZWwqL1xyXG4gICAgZ3JvdXBEYXRhKHRhc2tzOiBhbnkpOiBhbnk7XHJcbiAgICAvKiogQ2hlY2tzIHdoZXRoZXIgYW55IG5ldyBkYXRhIG5lZWRzIHRvIGJlIGFkZGVkIHRvIHRhc2sgY2FjaGUgICovXHJcbiAgICBkb1Rhc2tDaGVjayh0YXNrczogYW55W10sIHNjYWxlOiBhbnkpOiBib29sZWFuO1xyXG4gICAgLyoqIFNldCBhIGlkIHByZWZpeCBzbyBDU1MzIHF1ZXJ5IHNlbGVjdG9yIGNhbiB3b3JrIHdpdGggaWRzIHRoYXQgY29udGFpbiBudW1iZXJzICovXHJcbiAgICBzZXRJZFByZWZpeChpZDogc3RyaW5nKTogc3RyaW5nO1xyXG4gICAgLyoqIFNldCB0aGUgc2Nyb2xsIHRvcCBwcm9wZXJ0eSBvZiBhIG5hdGl2ZSBET00gZWxlbWVudCAqL1xyXG4gICAgc2V0U2Nyb2xsVG9wKHNjcm9sbFRvcDogbnVtYmVyLCBlbGVtZW50OiBhbnkpOiB2b2lkO1xyXG59XHJcbiJdfQ==