/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { GanttService } from '../../shared/services/gantt.service';
export class GanttActivityBarsComponent {
    /**
     * @param {?} ganttService
     */
    constructor(ganttService) {
        this.ganttService = ganttService;
        this.onGridRowClick = new EventEmitter();
        this.onPopoverOpen = new EventEmitter();
        this.containerHeight = 0;
        this.containerWidth = 0;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.containerHeight = this.dimensions.height;
        this.containerWidth = this.dimensions.width;
    }
    /**
     * @param {?} task
     * @param {?} index
     * @return {?}
     */
    drawBar(task, index) {
        /** @type {?} */
        let style = {};
        style = this.ganttService.calculateBar(task, index, this.timeScale);
        return style;
    }
    /**
     * @param {?} task
     * @return {?}
     */
    gridRowClicked(task) {
        try {
            this.onGridRowClick.emit(task);
        }
        catch (err) { }
    }
    /**
     * @param {?} task
     * @return {?}
     */
    popoverOpened(task) {
        try {
            this.onPopoverOpen.emit(task);
        }
        catch (err) { }
    }
    /**
     * @private
     * @param {?} dragFn
     * @return {?}
     */
    addMouseEventListeners(dragFn) {
        /**
         * @return {?}
         */
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
GanttActivityBarsComponent.decorators = [
    { type: Component, args: [{
                selector: 'activity-bars',
                template: `
    <div class="gantt-activity-bars-area"
        [ngStyle]="{ 'height': containerHeight + 'px', 'width': containerWidth + 'px' }">

        <div #bar class="gantt-activity-line"
            *ngFor="let task of tasks; let i = index" (click)="gridRowClicked(task)"
            [ngStyle]="drawBar(task, i)">

            <div #popoverTrigger="mdePopoverTrigger"
                [mdePopoverTriggerFor]="taskPopover"
                [mdePopoverBackdropCloseOnClick]="false"
                mdePopoverOffsetX="-15"
                mdePopoverOffsetY="0"
                (opened)="popoverOpened(task)">

                <mde-popover #taskPopover="mdePopover" 
                    [mdePopoverEnterDelay]="100"
                    [mdePopoverLeaveDelay]="0"
                    [mdePopoverPositionY]="'above'"
                    [mdePopoverOverlapTrigger]="false"
                    [mdePopoverDisableAnimation]="false"
                    [mdeFocusTrapEnabled]="false"
                    [mdePopoverArrowWidth]="12"
                    [mdePopoverArrowColor]="task.color?.primary"
                    mdePopoverPlacement="bottom">

                    <ng-container *ngTemplateOutlet="templatePopoverTask; context: {task: task}"></ng-container>
                </mde-popover>

                <div class="gantt-activity-content"></div>
                <div class="gantt-activity-link-control gantt-activity-right" style="height: 26px; line-height: 30px">
                    <div class="gantt-link-point"></div>
                </div>
                <div class="gantt-activity-link-control gantt-activity-left" style="height: 26px; line-height: 30px">
                    <div class="gantt-link-point"></div>
                </div>
            </div>
        </div>
    </div>

    <ng-template #templatePopoverTask let-data="task">
        <mat-card *ngIf="data" class="mat-elevation-z6" 
            [ngStyle]="{ 
                borderBottomColor: data.color?.primary,
                borderBottomWidth: '.25em',
                borderBottomStyle: 'solid' 
            }" style="width: 320px; max-width: 320px;">

            <mat-card-header>
                <div mat-card-avatar [ngStyle]="{ borderColor: data.color?.primary }" style="width: 0; height: calc(10vh - 30px); border-radius: 0; border-style: solid;"></div>
                <mat-card-title>
                    <span style="font-size: 80%;">{{data.name}}</span>
                </mat-card-title>
                <mat-card-subtitle>
                    <span>{{data.start | date:'yyyy-MM-dd'}} - {{data.end | date:'yyyy-MM-dd'}}</span>
                </mat-card-subtitle>
                <mat-card-subtitle>
                    <span style="padding-left: .75em; padding-right: 1em; font-stretch: condensed;">&#x336;</span>
                    <span>{{data.resource}}</span>
                </mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
                <footer *ngIf="data.description">
                    <span [innerHTML]="data.description"></span>
                </footer>
            </mat-card-content>
        </mat-card>
    </ng-template>
    `,
                providers: [
                    GanttService
                ],
                styles: [`
    .gantt-activity-line {
        /*border-radius: 2px;*/
        position: absolute;
        box-sizing: border-box;
        -webkit-user-select: none;
    }
    .gantt-activity-line:hover {
        cursor: pointer;
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
    `]
            }] }
];
/** @nocollapse */
GanttActivityBarsComponent.ctorParameters = () => [
    { type: GanttService }
];
GanttActivityBarsComponent.propDecorators = {
    timeScale: [{ type: Input }],
    dimensions: [{ type: Input }],
    tasks: [{ type: Input }],
    onGridRowClick: [{ type: Output }],
    onPopoverOpen: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    GanttActivityBarsComponent.prototype.timeScale;
    /** @type {?} */
    GanttActivityBarsComponent.prototype.dimensions;
    /** @type {?} */
    GanttActivityBarsComponent.prototype.tasks;
    /** @type {?} */
    GanttActivityBarsComponent.prototype.onGridRowClick;
    /** @type {?} */
    GanttActivityBarsComponent.prototype.onPopoverOpen;
    /** @type {?} */
    GanttActivityBarsComponent.prototype.containerHeight;
    /** @type {?} */
    GanttActivityBarsComponent.prototype.containerWidth;
    /** @type {?} */
    GanttActivityBarsComponent.prototype.ganttService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHktYmFycy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWdhbnR0LyIsInNvdXJjZXMiOlsibGliL2FjdGl2aXR5L2JhcnMvYWN0aXZpdHktYmFycy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFjLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0YsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBcUhuRSxNQUFNLE9BQU8sMEJBQTBCOzs7O0lBV25DLFlBQW1CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBTm5DLG1CQUFjLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFDNUQsa0JBQWEsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUVyRSxvQkFBZSxHQUFHLENBQUMsQ0FBQztRQUNwQixtQkFBYyxHQUFHLENBQUMsQ0FBQztJQUU4QixDQUFDOzs7O0lBRWxELFFBQVE7UUFDSixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQzlDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7SUFDaEQsQ0FBQzs7Ozs7O0lBRUQsT0FBTyxDQUFDLElBQVMsRUFBRSxLQUFhOztZQUN4QixLQUFLLEdBQUcsRUFBRTtRQUNkLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVwRSxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDOzs7OztJQUVELGNBQWMsQ0FBQyxJQUFTO1FBQ3BCLElBQUk7WUFDQSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNsQztRQUFDLE9BQU8sR0FBRyxFQUFFLEdBQUc7SUFDckIsQ0FBQzs7Ozs7SUFFRCxhQUFhLENBQUMsSUFBUztRQUNuQixJQUFJO1lBQ0EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakM7UUFBQyxPQUFPLEdBQUcsRUFBRSxHQUFHO0lBQ3JCLENBQUM7Ozs7OztJQUVPLHNCQUFzQixDQUFDLE1BQVc7Ozs7UUFDdEMsU0FBUyxNQUFNO1lBQ1gsUUFBUSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3pFLFFBQVEsQ0FBQyxlQUFlLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN2RSxRQUFRLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDOUUsQ0FBQztRQUVELFFBQVEsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN0RSxRQUFRLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDcEUsUUFBUSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzNFLENBQUM7OztZQWxLSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FvRVQ7Z0JBeUNELFNBQVMsRUFBRTtvQkFDUCxZQUFZO2lCQUNmO3lCQTFDUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBdUNSO2FBSUo7Ozs7WUFwSFEsWUFBWTs7O3dCQXNIaEIsS0FBSzt5QkFDTCxLQUFLO29CQUNMLEtBQUs7NkJBRUwsTUFBTTs0QkFDTixNQUFNOzs7O0lBTFAsK0NBQXdCOztJQUN4QixnREFBeUI7O0lBQ3pCLDJDQUFvQjs7SUFFcEIsb0RBQXNFOztJQUN0RSxtREFBcUU7O0lBRXJFLHFEQUFvQjs7SUFDcEIsb0RBQW1COztJQUVQLGtEQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgR2FudHRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2dhbnR0LnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2FjdGl2aXR5LWJhcnMnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJnYW50dC1hY3Rpdml0eS1iYXJzLWFyZWFcIlxyXG4gICAgICAgIFtuZ1N0eWxlXT1cInsgJ2hlaWdodCc6IGNvbnRhaW5lckhlaWdodCArICdweCcsICd3aWR0aCc6IGNvbnRhaW5lcldpZHRoICsgJ3B4JyB9XCI+XHJcblxyXG4gICAgICAgIDxkaXYgI2JhciBjbGFzcz1cImdhbnR0LWFjdGl2aXR5LWxpbmVcIlxyXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgdGFzayBvZiB0YXNrczsgbGV0IGkgPSBpbmRleFwiIChjbGljayk9XCJncmlkUm93Q2xpY2tlZCh0YXNrKVwiXHJcbiAgICAgICAgICAgIFtuZ1N0eWxlXT1cImRyYXdCYXIodGFzaywgaSlcIj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgI3BvcG92ZXJUcmlnZ2VyPVwibWRlUG9wb3ZlclRyaWdnZXJcIlxyXG4gICAgICAgICAgICAgICAgW21kZVBvcG92ZXJUcmlnZ2VyRm9yXT1cInRhc2tQb3BvdmVyXCJcclxuICAgICAgICAgICAgICAgIFttZGVQb3BvdmVyQmFja2Ryb3BDbG9zZU9uQ2xpY2tdPVwiZmFsc2VcIlxyXG4gICAgICAgICAgICAgICAgbWRlUG9wb3Zlck9mZnNldFg9XCItMTVcIlxyXG4gICAgICAgICAgICAgICAgbWRlUG9wb3Zlck9mZnNldFk9XCIwXCJcclxuICAgICAgICAgICAgICAgIChvcGVuZWQpPVwicG9wb3Zlck9wZW5lZCh0YXNrKVwiPlxyXG5cclxuICAgICAgICAgICAgICAgIDxtZGUtcG9wb3ZlciAjdGFza1BvcG92ZXI9XCJtZGVQb3BvdmVyXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgW21kZVBvcG92ZXJFbnRlckRlbGF5XT1cIjEwMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgW21kZVBvcG92ZXJMZWF2ZURlbGF5XT1cIjBcIlxyXG4gICAgICAgICAgICAgICAgICAgIFttZGVQb3BvdmVyUG9zaXRpb25ZXT1cIidhYm92ZSdcIlxyXG4gICAgICAgICAgICAgICAgICAgIFttZGVQb3BvdmVyT3ZlcmxhcFRyaWdnZXJdPVwiZmFsc2VcIlxyXG4gICAgICAgICAgICAgICAgICAgIFttZGVQb3BvdmVyRGlzYWJsZUFuaW1hdGlvbl09XCJmYWxzZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgW21kZUZvY3VzVHJhcEVuYWJsZWRdPVwiZmFsc2VcIlxyXG4gICAgICAgICAgICAgICAgICAgIFttZGVQb3BvdmVyQXJyb3dXaWR0aF09XCIxMlwiXHJcbiAgICAgICAgICAgICAgICAgICAgW21kZVBvcG92ZXJBcnJvd0NvbG9yXT1cInRhc2suY29sb3I/LnByaW1hcnlcIlxyXG4gICAgICAgICAgICAgICAgICAgIG1kZVBvcG92ZXJQbGFjZW1lbnQ9XCJib3R0b21cIj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlUG9wb3ZlclRhc2s7IGNvbnRleHQ6IHt0YXNrOiB0YXNrfVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgPC9tZGUtcG9wb3Zlcj5cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtYWN0aXZpdHktY29udGVudFwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbnR0LWFjdGl2aXR5LWxpbmstY29udHJvbCBnYW50dC1hY3Rpdml0eS1yaWdodFwiIHN0eWxlPVwiaGVpZ2h0OiAyNnB4OyBsaW5lLWhlaWdodDogMzBweFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1saW5rLXBvaW50XCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1hY3Rpdml0eS1saW5rLWNvbnRyb2wgZ2FudHQtYWN0aXZpdHktbGVmdFwiIHN0eWxlPVwiaGVpZ2h0OiAyNnB4OyBsaW5lLWhlaWdodDogMzBweFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1saW5rLXBvaW50XCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8bmctdGVtcGxhdGUgI3RlbXBsYXRlUG9wb3ZlclRhc2sgbGV0LWRhdGE9XCJ0YXNrXCI+XHJcbiAgICAgICAgPG1hdC1jYXJkICpuZ0lmPVwiZGF0YVwiIGNsYXNzPVwibWF0LWVsZXZhdGlvbi16NlwiIFxyXG4gICAgICAgICAgICBbbmdTdHlsZV09XCJ7IFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyQm90dG9tQ29sb3I6IGRhdGEuY29sb3I/LnByaW1hcnksXHJcbiAgICAgICAgICAgICAgICBib3JkZXJCb3R0b21XaWR0aDogJy4yNWVtJyxcclxuICAgICAgICAgICAgICAgIGJvcmRlckJvdHRvbVN0eWxlOiAnc29saWQnIFxyXG4gICAgICAgICAgICB9XCIgc3R5bGU9XCJ3aWR0aDogMzIwcHg7IG1heC13aWR0aDogMzIwcHg7XCI+XHJcblxyXG4gICAgICAgICAgICA8bWF0LWNhcmQtaGVhZGVyPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBtYXQtY2FyZC1hdmF0YXIgW25nU3R5bGVdPVwieyBib3JkZXJDb2xvcjogZGF0YS5jb2xvcj8ucHJpbWFyeSB9XCIgc3R5bGU9XCJ3aWR0aDogMDsgaGVpZ2h0OiBjYWxjKDEwdmggLSAzMHB4KTsgYm9yZGVyLXJhZGl1czogMDsgYm9yZGVyLXN0eWxlOiBzb2xpZDtcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxtYXQtY2FyZC10aXRsZT5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT1cImZvbnQtc2l6ZTogODAlO1wiPnt7ZGF0YS5uYW1lfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L21hdC1jYXJkLXRpdGxlPlxyXG4gICAgICAgICAgICAgICAgPG1hdC1jYXJkLXN1YnRpdGxlPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7ZGF0YS5zdGFydCB8IGRhdGU6J3l5eXktTU0tZGQnfX0gLSB7e2RhdGEuZW5kIHwgZGF0ZToneXl5eS1NTS1kZCd9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvbWF0LWNhcmQtc3VidGl0bGU+XHJcbiAgICAgICAgICAgICAgICA8bWF0LWNhcmQtc3VidGl0bGU+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9XCJwYWRkaW5nLWxlZnQ6IC43NWVtOyBwYWRkaW5nLXJpZ2h0OiAxZW07IGZvbnQtc3RyZXRjaDogY29uZGVuc2VkO1wiPiYjeDMzNjs8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3tkYXRhLnJlc291cmNlfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L21hdC1jYXJkLXN1YnRpdGxlPlxyXG4gICAgICAgICAgICA8L21hdC1jYXJkLWhlYWRlcj5cclxuICAgICAgICAgICAgPG1hdC1jYXJkLWNvbnRlbnQ+XHJcbiAgICAgICAgICAgICAgICA8Zm9vdGVyICpuZ0lmPVwiZGF0YS5kZXNjcmlwdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIFtpbm5lckhUTUxdPVwiZGF0YS5kZXNjcmlwdGlvblwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZm9vdGVyPlxyXG4gICAgICAgICAgICA8L21hdC1jYXJkLWNvbnRlbnQ+XHJcbiAgICAgICAgPC9tYXQtY2FyZD5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICBgLFxyXG4gICAgc3R5bGVzOiBbYFxyXG4gICAgLmdhbnR0LWFjdGl2aXR5LWxpbmUge1xyXG4gICAgICAgIC8qYm9yZGVyLXJhZGl1czogMnB4OyovXHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcclxuICAgIH1cclxuICAgIC5nYW50dC1hY3Rpdml0eS1saW5lOmhvdmVyIHtcclxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICB9XHJcbiAgICAuZ2FudHQtYWN0aXZpdHktY29udGVudCB7XHJcbiAgICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIHRvcDogMDtcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7XHJcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICB9XHJcbiAgICAuZ2FudHQtYWN0aXZpdHktbGluay1jb250cm9sIHtcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgd2lkdGg6IDEzcHg7XHJcbiAgICAgICAgdG9wOiAwO1xyXG4gICAgfVxyXG4gICAgLmdhbnR0LWFjdGl2aXR5LXJpZ2h0IHtcclxuICAgICAgICByaWdodDogMDtcclxuICAgIH1cclxuICAgIC5nYW50dC1hY3Rpdml0eS1sZWZ0IHtcclxuICAgICAgICBsZWZ0OiAwO1xyXG4gICAgfVxyXG4gICAgLmdhbnR0LWFjdGl2aXR5LXJpZ2h0OmhvdmVyIHtcclxuICAgICAgICAvKmN1cnNvcjp3LXJlc2l6ZTsqL1xyXG4gICAgfVxyXG4gICAgLmdhbnR0LWFjdGl2aXR5LWxlZnQ6aG92ZXIge1xyXG4gICAgICAgIC8qY3Vyc29yOnctcmVzaXplOyovXHJcbiAgICB9XHJcbiAgICBgXSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIEdhbnR0U2VydmljZVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR2FudHRBY3Rpdml0eUJhcnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgQElucHV0KCkgdGltZVNjYWxlOiBhbnk7XHJcbiAgICBASW5wdXQoKSBkaW1lbnNpb25zOiBhbnk7XHJcbiAgICBASW5wdXQoKSB0YXNrczogYW55O1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbkdyaWRSb3dDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAgIEBPdXRwdXQoKSBvblBvcG92ZXJPcGVuOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICAgIGNvbnRhaW5lckhlaWdodCA9IDA7XHJcbiAgICBjb250YWluZXJXaWR0aCA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGdhbnR0U2VydmljZTogR2FudHRTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lckhlaWdodCA9IHRoaXMuZGltZW5zaW9ucy5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXJXaWR0aCA9IHRoaXMuZGltZW5zaW9ucy53aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3QmFyKHRhc2s6IGFueSwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBzdHlsZSA9IHt9O1xyXG4gICAgICAgIHN0eWxlID0gdGhpcy5nYW50dFNlcnZpY2UuY2FsY3VsYXRlQmFyKHRhc2ssIGluZGV4LCB0aGlzLnRpbWVTY2FsZSk7XHJcblxyXG4gICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgIH1cclxuXHJcbiAgICBncmlkUm93Q2xpY2tlZCh0YXNrOiBhbnkpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLm9uR3JpZFJvd0NsaWNrLmVtaXQodGFzayk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7IH1cclxuICAgIH1cclxuXHJcbiAgICBwb3BvdmVyT3BlbmVkKHRhc2s6IGFueSkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMub25Qb3BvdmVyT3Blbi5lbWl0KHRhc2spO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikgeyB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRNb3VzZUV2ZW50TGlzdGVuZXJzKGRyYWdGbjogYW55KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gc3RvcEZuKCkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZHJhZ0ZuLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgc3RvcEZuLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgc3RvcEZuLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZHJhZ0ZuLCBmYWxzZSk7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBzdG9wRm4sIGZhbHNlKTtcclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHN0b3BGbiwgZmFsc2UpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==