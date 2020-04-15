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
                <div mat-card-avatar [ngStyle]="{ borderColor: data.color?.primary }" style="width: 0; height: unset; margin-bottom: .7em; border-radius: 0; border-style: solid;"></div>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHktYmFycy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWdhbnR0LyIsInNvdXJjZXMiOlsibGliL2FjdGl2aXR5L2JhcnMvYWN0aXZpdHktYmFycy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFjLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0YsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBcUhuRSxNQUFNLE9BQU8sMEJBQTBCOzs7O0lBV25DLFlBQW1CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBTm5DLG1CQUFjLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFDNUQsa0JBQWEsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUVyRSxvQkFBZSxHQUFHLENBQUMsQ0FBQztRQUNwQixtQkFBYyxHQUFHLENBQUMsQ0FBQztJQUU4QixDQUFDOzs7O0lBRWxELFFBQVE7UUFDSixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQzlDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7SUFDaEQsQ0FBQzs7Ozs7O0lBRUQsT0FBTyxDQUFDLElBQVMsRUFBRSxLQUFhOztZQUN4QixLQUFLLEdBQUcsRUFBRTtRQUNkLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVwRSxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDOzs7OztJQUVELGNBQWMsQ0FBQyxJQUFTO1FBQ3BCLElBQUk7WUFDQSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNsQztRQUFDLE9BQU8sR0FBRyxFQUFFLEdBQUc7SUFDckIsQ0FBQzs7Ozs7SUFFRCxhQUFhLENBQUMsSUFBUztRQUNuQixJQUFJO1lBQ0EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakM7UUFBQyxPQUFPLEdBQUcsRUFBRSxHQUFHO0lBQ3JCLENBQUM7Ozs7OztJQUVPLHNCQUFzQixDQUFDLE1BQVc7Ozs7UUFDdEMsU0FBUyxNQUFNO1lBQ1gsUUFBUSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3pFLFFBQVEsQ0FBQyxlQUFlLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN2RSxRQUFRLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDOUUsQ0FBQztRQUVELFFBQVEsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN0RSxRQUFRLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDcEUsUUFBUSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzNFLENBQUM7OztZQWxLSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FvRVQ7Z0JBeUNELFNBQVMsRUFBRTtvQkFDUCxZQUFZO2lCQUNmO3lCQTFDUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBdUNSO2FBSUo7Ozs7WUFwSFEsWUFBWTs7O3dCQXNIaEIsS0FBSzt5QkFDTCxLQUFLO29CQUNMLEtBQUs7NkJBRUwsTUFBTTs0QkFDTixNQUFNOzs7O0lBTFAsK0NBQXdCOztJQUN4QixnREFBeUI7O0lBQ3pCLDJDQUFvQjs7SUFFcEIsb0RBQXNFOztJQUN0RSxtREFBcUU7O0lBRXJFLHFEQUFvQjs7SUFDcEIsb0RBQW1COztJQUVQLGtEQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgR2FudHRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2dhbnR0LnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2FjdGl2aXR5LWJhcnMnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJnYW50dC1hY3Rpdml0eS1iYXJzLWFyZWFcIlxyXG4gICAgICAgIFtuZ1N0eWxlXT1cInsgJ2hlaWdodCc6IGNvbnRhaW5lckhlaWdodCArICdweCcsICd3aWR0aCc6IGNvbnRhaW5lcldpZHRoICsgJ3B4JyB9XCI+XHJcblxyXG4gICAgICAgIDxkaXYgI2JhciBjbGFzcz1cImdhbnR0LWFjdGl2aXR5LWxpbmVcIlxyXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgdGFzayBvZiB0YXNrczsgbGV0IGkgPSBpbmRleFwiIChjbGljayk9XCJncmlkUm93Q2xpY2tlZCh0YXNrKVwiXHJcbiAgICAgICAgICAgIFtuZ1N0eWxlXT1cImRyYXdCYXIodGFzaywgaSlcIj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgI3BvcG92ZXJUcmlnZ2VyPVwibWRlUG9wb3ZlclRyaWdnZXJcIlxyXG4gICAgICAgICAgICAgICAgW21kZVBvcG92ZXJUcmlnZ2VyRm9yXT1cInRhc2tQb3BvdmVyXCJcclxuICAgICAgICAgICAgICAgIFttZGVQb3BvdmVyQmFja2Ryb3BDbG9zZU9uQ2xpY2tdPVwiZmFsc2VcIlxyXG4gICAgICAgICAgICAgICAgbWRlUG9wb3Zlck9mZnNldFg9XCItMTVcIlxyXG4gICAgICAgICAgICAgICAgbWRlUG9wb3Zlck9mZnNldFk9XCIwXCJcclxuICAgICAgICAgICAgICAgIChvcGVuZWQpPVwicG9wb3Zlck9wZW5lZCh0YXNrKVwiPlxyXG5cclxuICAgICAgICAgICAgICAgIDxtZGUtcG9wb3ZlciAjdGFza1BvcG92ZXI9XCJtZGVQb3BvdmVyXCJcclxuICAgICAgICAgICAgICAgICAgICBbbWRlUG9wb3ZlckVudGVyRGVsYXldPVwiMTAwXCJcclxuICAgICAgICAgICAgICAgICAgICBbbWRlUG9wb3ZlckxlYXZlRGVsYXldPVwiMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgW21kZVBvcG92ZXJQb3NpdGlvblldPVwiJ2Fib3ZlJ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgW21kZVBvcG92ZXJPdmVybGFwVHJpZ2dlcl09XCJmYWxzZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgW21kZVBvcG92ZXJEaXNhYmxlQW5pbWF0aW9uXT1cImZhbHNlXCJcclxuICAgICAgICAgICAgICAgICAgICBbbWRlRm9jdXNUcmFwRW5hYmxlZF09XCJmYWxzZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgW21kZVBvcG92ZXJBcnJvd1dpZHRoXT1cIjEyXCJcclxuICAgICAgICAgICAgICAgICAgICBbbWRlUG9wb3ZlckFycm93Q29sb3JdPVwidGFzay5jb2xvcj8ucHJpbWFyeVwiXHJcbiAgICAgICAgICAgICAgICAgICAgbWRlUG9wb3ZlclBsYWNlbWVudD1cImJvdHRvbVwiPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGVQb3BvdmVyVGFzazsgY29udGV4dDoge3Rhc2s6IHRhc2t9XCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICA8L21kZS1wb3BvdmVyPlxyXG5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1hY3Rpdml0eS1jb250ZW50XCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtYWN0aXZpdHktbGluay1jb250cm9sIGdhbnR0LWFjdGl2aXR5LXJpZ2h0XCIgc3R5bGU9XCJoZWlnaHQ6IDI2cHg7IGxpbmUtaGVpZ2h0OiAzMHB4XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbnR0LWxpbmstcG9pbnRcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbnR0LWFjdGl2aXR5LWxpbmstY29udHJvbCBnYW50dC1hY3Rpdml0eS1sZWZ0XCIgc3R5bGU9XCJoZWlnaHQ6IDI2cHg7IGxpbmUtaGVpZ2h0OiAzMHB4XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbnR0LWxpbmstcG9pbnRcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxuZy10ZW1wbGF0ZSAjdGVtcGxhdGVQb3BvdmVyVGFzayBsZXQtZGF0YT1cInRhc2tcIj5cclxuICAgICAgICA8bWF0LWNhcmQgKm5nSWY9XCJkYXRhXCIgY2xhc3M9XCJtYXQtZWxldmF0aW9uLXo2XCIgXHJcbiAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsgXHJcbiAgICAgICAgICAgICAgICBib3JkZXJCb3R0b21Db2xvcjogZGF0YS5jb2xvcj8ucHJpbWFyeSxcclxuICAgICAgICAgICAgICAgIGJvcmRlckJvdHRvbVdpZHRoOiAnLjI1ZW0nLFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyQm90dG9tU3R5bGU6ICdzb2xpZCcgXHJcbiAgICAgICAgICAgIH1cIiBzdHlsZT1cIndpZHRoOiAzMjBweDsgbWF4LXdpZHRoOiAzMjBweDtcIj5cclxuXHJcbiAgICAgICAgICAgIDxtYXQtY2FyZC1oZWFkZXI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IG1hdC1jYXJkLWF2YXRhciBbbmdTdHlsZV09XCJ7IGJvcmRlckNvbG9yOiBkYXRhLmNvbG9yPy5wcmltYXJ5IH1cIiBzdHlsZT1cIndpZHRoOiAwOyBoZWlnaHQ6IHVuc2V0OyBtYXJnaW4tYm90dG9tOiAuN2VtOyBib3JkZXItcmFkaXVzOiAwOyBib3JkZXItc3R5bGU6IHNvbGlkO1wiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPG1hdC1jYXJkLXRpdGxlPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPVwiZm9udC1zaXplOiA4MCU7XCI+e3tkYXRhLm5hbWV9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvbWF0LWNhcmQtdGl0bGU+XHJcbiAgICAgICAgICAgICAgICA8bWF0LWNhcmQtc3VidGl0bGU+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3tkYXRhLnN0YXJ0IHwgZGF0ZToneXl5eS1NTS1kZCd9fSAtIHt7ZGF0YS5lbmQgfCBkYXRlOid5eXl5LU1NLWRkJ319PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9tYXQtY2FyZC1zdWJ0aXRsZT5cclxuICAgICAgICAgICAgICAgIDxtYXQtY2FyZC1zdWJ0aXRsZT5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT1cInBhZGRpbmctbGVmdDogLjc1ZW07IHBhZGRpbmctcmlnaHQ6IDFlbTsgZm9udC1zdHJldGNoOiBjb25kZW5zZWQ7XCI+JiN4MzM2Ozwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj57e2RhdGEucmVzb3VyY2V9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvbWF0LWNhcmQtc3VidGl0bGU+XHJcbiAgICAgICAgICAgIDwvbWF0LWNhcmQtaGVhZGVyPlxyXG4gICAgICAgICAgICA8bWF0LWNhcmQtY29udGVudD5cclxuICAgICAgICAgICAgICAgIDxmb290ZXIgKm5nSWY9XCJkYXRhLmRlc2NyaXB0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gW2lubmVySFRNTF09XCJkYXRhLmRlc2NyaXB0aW9uXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9mb290ZXI+XHJcbiAgICAgICAgICAgIDwvbWF0LWNhcmQtY29udGVudD5cclxuICAgICAgICA8L21hdC1jYXJkPlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgIGAsXHJcbiAgICBzdHlsZXM6IFtgXHJcbiAgICAuZ2FudHQtYWN0aXZpdHktbGluZSB7XHJcbiAgICAgICAgLypib3JkZXItcmFkaXVzOiAycHg7Ki9cclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xyXG4gICAgfVxyXG4gICAgLmdhbnR0LWFjdGl2aXR5LWxpbmU6aG92ZXIge1xyXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIH1cclxuICAgIC5nYW50dC1hY3Rpdml0eS1jb250ZW50IHtcclxuICAgICAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICAgICAgY29sb3I6ICNmZmY7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgdG9wOiAwO1xyXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICBsaW5lLWhlaWdodDogaW5oZXJpdDtcclxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgIH1cclxuICAgIC5nYW50dC1hY3Rpdml0eS1saW5rLWNvbnRyb2wge1xyXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICB3aWR0aDogMTNweDtcclxuICAgICAgICB0b3A6IDA7XHJcbiAgICB9XHJcbiAgICAuZ2FudHQtYWN0aXZpdHktcmlnaHQge1xyXG4gICAgICAgIHJpZ2h0OiAwO1xyXG4gICAgfVxyXG4gICAgLmdhbnR0LWFjdGl2aXR5LWxlZnQge1xyXG4gICAgICAgIGxlZnQ6IDA7XHJcbiAgICB9XHJcbiAgICAuZ2FudHQtYWN0aXZpdHktcmlnaHQ6aG92ZXIge1xyXG4gICAgICAgIC8qY3Vyc29yOnctcmVzaXplOyovXHJcbiAgICB9XHJcbiAgICAuZ2FudHQtYWN0aXZpdHktbGVmdDpob3ZlciB7XHJcbiAgICAgICAgLypjdXJzb3I6dy1yZXNpemU7Ki9cclxuICAgIH1cclxuICAgIGBdLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgR2FudHRTZXJ2aWNlXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHYW50dEFjdGl2aXR5QmFyc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBASW5wdXQoKSB0aW1lU2NhbGU6IGFueTtcclxuICAgIEBJbnB1dCgpIGRpbWVuc2lvbnM6IGFueTtcclxuICAgIEBJbnB1dCgpIHRhc2tzOiBhbnk7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uR3JpZFJvd0NsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gICAgQE91dHB1dCgpIG9uUG9wb3Zlck9wZW46IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gICAgY29udGFpbmVySGVpZ2h0ID0gMDtcclxuICAgIGNvbnRhaW5lcldpZHRoID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZ2FudHRTZXJ2aWNlOiBHYW50dFNlcnZpY2UpIHsgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVySGVpZ2h0ID0gdGhpcy5kaW1lbnNpb25zLmhlaWdodDtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lcldpZHRoID0gdGhpcy5kaW1lbnNpb25zLndpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdCYXIodGFzazogYW55LCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHN0eWxlID0ge307XHJcbiAgICAgICAgc3R5bGUgPSB0aGlzLmdhbnR0U2VydmljZS5jYWxjdWxhdGVCYXIodGFzaywgaW5kZXgsIHRoaXMudGltZVNjYWxlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgfVxyXG5cclxuICAgIGdyaWRSb3dDbGlja2VkKHRhc2s6IGFueSkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMub25HcmlkUm93Q2xpY2suZW1pdCh0YXNrKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHsgfVxyXG4gICAgfVxyXG5cclxuICAgIHBvcG92ZXJPcGVuZWQodGFzazogYW55KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5vblBvcG92ZXJPcGVuLmVtaXQodGFzayk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7IH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkZE1vdXNlRXZlbnRMaXN0ZW5lcnMoZHJhZ0ZuOiBhbnkpIHtcclxuICAgICAgICBmdW5jdGlvbiBzdG9wRm4oKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBkcmFnRm4sIGZhbHNlKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBzdG9wRm4sIGZhbHNlKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBzdG9wRm4sIGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBkcmFnRm4sIGZhbHNlKTtcclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHN0b3BGbiwgZmFsc2UpO1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgc3RvcEZuLCBmYWxzZSk7XHJcbiAgICB9XHJcbn1cclxuIl19