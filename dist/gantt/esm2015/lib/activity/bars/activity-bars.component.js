/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { GanttService } from '../../shared/services/gantt.service';
import { Zooming } from '../../shared/interfaces';
export class GanttActivityBarsComponent {
    /**
     * @param {?} ganttService
     */
    constructor(ganttService) {
        this.ganttService = ganttService;
        this.containerHeight = 0;
        this.containerWidth = 0;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.containerHeight = this.dimensions.height;
        this.containerWidth = this.dimensions.width;
        this.zoom.subscribe((zoomLevel) => {
            this.zoomLevel = zoomLevel;
        });
        ;
    }
    //TODO(dale): the ability to move bars needs reviewing and there are a few quirks
    /**
     * @param {?} $event
     * @param {?} bar
     * @return {?}
     */
    expandLeft($event, bar) {
        $event.stopPropagation();
        /** @type {?} */
        let ganttService = this.ganttService;
        /** @type {?} */
        let startX = $event.clientX;
        /** @type {?} */
        let startBarWidth = bar.style.width;
        /** @type {?} */
        let startBarLeft = bar.style.left;
        /**
         * @param {?} e
         * @return {?}
         */
        function doDrag(e) {
            /** @type {?} */
            let cellWidth = ganttService.cellWidth;
            /** @type {?} */
            let barWidth = startBarWidth - e.clientX + startX;
            /** @type {?} */
            let days = Math.round(barWidth / cellWidth);
            bar.style.width = days * cellWidth + days;
            bar.style.left = (startBarLeft - (days * cellWidth) - days);
        }
        this.addMouseEventListeners(doDrag);
        return false;
    }
    /**
     * @param {?} $event
     * @param {?} bar
     * @return {?}
     */
    expandRight($event, bar) {
        $event.stopPropagation();
        /** @type {?} */
        let ganttService = this.ganttService;
        /** @type {?} */
        let startX = $event.clientX;
        /** @type {?} */
        let startBarWidth = bar.style.width;
        /** @type {?} */
        let startBarEndDate = bar.task.end;
        /** @type {?} */
        let startBarLeft = bar.style.left;
        /**
         * @param {?} e
         * @return {?}
         */
        function doDrag(e) {
            /** @type {?} */
            let cellWidth = ganttService.cellWidth;
            /** @type {?} */
            let barWidth = startBarWidth + e.clientX - startX;
            /** @type {?} */
            let days = Math.round(barWidth / cellWidth);
            if (barWidth < cellWidth) {
                barWidth = cellWidth;
                days = Math.round(barWidth / cellWidth);
            }
            bar.style.width = ((days * cellWidth) + days); // rounds to the nearest cell
        }
        this.addMouseEventListeners(doDrag);
        return false;
    }
    /**
     * @param {?} $event
     * @param {?} bar
     * @return {?}
     */
    move($event, bar) {
        $event.stopPropagation();
        /** @type {?} */
        let ganttService = this.ganttService;
        /** @type {?} */
        let startX = $event.clientX;
        /** @type {?} */
        let startBarLeft = bar.style.left;
        /**
         * @param {?} e
         * @return {?}
         */
        function doDrag(e) {
            /** @type {?} */
            let cellWidth = ganttService.cellWidth;
            /** @type {?} */
            let barLeft = startBarLeft + e.clientX - startX;
            /** @type {?} */
            let days = Math.round(barLeft / cellWidth);
            // TODO: determine how many days the bar can be moved
            // if (days < maxDays) {
            bar.style.left = ((days * cellWidth) + days); // rounded to nearest cell
            // keep bar in bounds of grid
            if (barLeft < 0) {
                bar.style.left = 0;
            }
            // }
            // TODO: it needs to take into account the max number of days.
            // TODO: it needs to take into account the current days.
            // TODO: it needs to take into account the right boundary.
        }
        this.addMouseEventListeners(doDrag);
        return false;
    }
    /**
     * @param {?} task
     * @param {?} index
     * @return {?}
     */
    drawBar(task, index) {
        /** @type {?} */
        let style = {};
        if (this.zoomLevel === Zooming[Zooming.hours]) {
            style = this.ganttService.calculateBar(task, index, this.timeScale, true);
        }
        else {
            style = this.ganttService.calculateBar(task, index, this.timeScale);
        }
        return style;
    }
    /**
     * @param {?} task
     * @param {?} bar
     * @return {?}
     */
    drawProgress(task, bar) {
        /** @type {?} */
        var barStyle = this.ganttService.getBarProgressStyle(task.status);
        /** @type {?} */
        var width = this.ganttService.calculateBarProgress(this.ganttService.getComputedStyle(bar, 'width'), task.percentComplete);
        return {
            'width': width,
            'background-color': barStyle["background-color"],
        };
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
            *ngFor="let task of ganttService.groupData(tasks); let i = index"
            [ngStyle]="drawBar(task, i)">

            <div class="gantt-activity-progress" [ngStyle]="drawProgress(task, bar)"></div>
            <div class="gantt-activity-progress_drag" style="left: 518px"></div>
            <div class="gantt-activity-content"></div>
            <div class="gantt-activity-link-control gantt-activity-right" style="height: 26px; line-height: 30px">
                <div class="gantt-link-point"></div>
            </div>
            <div class="gantt-activity-link-control gantt-activity-left" style="height: 26px; line-height: 30px">
                <div class="gantt-link-point"></div>
            </div>
        </div>
    </div>
    `,
                providers: [
                    GanttService
                ],
                styles: [`
    .gantt-activity-line {
        /*border-radius: 2px;*/
        position: absolute;
        box-sizing: border-box;
        background-color: rgb(18,195,244);
        border: 1px solid #2196F3;
        -webkit-user-select: none;
    }
    .gantt-activity-line:hover {
        /*cursor: move;*/
    }
    .gantt-activity-progress {
        text-align: center;
        z-index: 0;
        background: #2196F3;
        position: absolute;
        min-height: 18px;
        display: block;
        height: 18px;
    }
    .gantt-activity-progress-drag {
        height: 8px;
        width: 8px;
        bottom: -4px;
        margin-left: 4px;
        background-position: bottom;
        background-image: "";
        background-repeat: no-repeat;
        z-index: 2;
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
        cursor:w-resize;
    }
    .gantt-activity-left:hover {
        cursor:w-resize;
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
    zoom: [{ type: Input }],
    zoomLevel: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    GanttActivityBarsComponent.prototype.timeScale;
    /** @type {?} */
    GanttActivityBarsComponent.prototype.dimensions;
    /** @type {?} */
    GanttActivityBarsComponent.prototype.tasks;
    /** @type {?} */
    GanttActivityBarsComponent.prototype.zoom;
    /** @type {?} */
    GanttActivityBarsComponent.prototype.zoomLevel;
    /** @type {?} */
    GanttActivityBarsComponent.prototype.containerHeight;
    /** @type {?} */
    GanttActivityBarsComponent.prototype.containerWidth;
    /** @type {?} */
    GanttActivityBarsComponent.prototype.ganttService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHktYmFycy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWdhbnR0LyIsInNvdXJjZXMiOlsibGliL2FjdGl2aXR5L2JhcnMvYWN0aXZpdHktYmFycy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFjLE1BQU0sZUFBZSxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNuRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUF5RmxELE1BQU0sT0FBTywwQkFBMEI7Ozs7SUFVbkMsWUFBbUIsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFIN0Msb0JBQWUsR0FBVyxDQUFDLENBQUM7UUFDNUIsbUJBQWMsR0FBVyxDQUFDLENBQUM7SUFFc0IsQ0FBQzs7OztJQUVsRCxRQUFRO1FBQ0osSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUM5QyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBRTVDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBaUIsRUFBRSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO1FBQUEsQ0FBQztJQUNSLENBQUM7Ozs7Ozs7SUFHRCxVQUFVLENBQUMsTUFBVyxFQUFFLEdBQVE7UUFDNUIsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDOztZQUVyQixZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVk7O1lBQ2hDLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTzs7WUFDdkIsYUFBYSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSzs7WUFDL0IsWUFBWSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSTs7Ozs7UUFFakMsU0FBUyxNQUFNLENBQUMsQ0FBTTs7Z0JBQ2QsU0FBUyxHQUFHLFlBQVksQ0FBQyxTQUFTOztnQkFDbEMsUUFBUSxHQUFHLGFBQWEsR0FBRyxDQUFDLENBQUMsT0FBTyxHQUFHLE1BQU07O2dCQUM3QyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO1lBRTNDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQzFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ2hFLENBQUM7UUFFRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFcEMsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7Ozs7O0lBRUQsV0FBVyxDQUFDLE1BQVcsRUFBRSxHQUFRO1FBQzdCLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQzs7WUFFckIsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZOztZQUNoQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU87O1lBQ3ZCLGFBQWEsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUs7O1lBQy9CLGVBQWUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUc7O1lBQzlCLFlBQVksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUk7Ozs7O1FBRWpDLFNBQVMsTUFBTSxDQUFDLENBQU07O2dCQUNkLFNBQVMsR0FBRyxZQUFZLENBQUMsU0FBUzs7Z0JBQ2xDLFFBQVEsR0FBRyxhQUFhLEdBQUcsQ0FBQyxDQUFDLE9BQU8sR0FBRyxNQUFNOztnQkFDN0MsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztZQUUzQyxJQUFJLFFBQVEsR0FBRyxTQUFTLEVBQUU7Z0JBQ3RCLFFBQVEsR0FBRyxTQUFTLENBQUM7Z0JBQ3JCLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsQ0FBQzthQUMzQztZQUNELEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyw2QkFBNkI7UUFDaEYsQ0FBQztRQUVELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVwQyxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDOzs7Ozs7SUFFRCxJQUFJLENBQUMsTUFBVyxFQUFFLEdBQVE7UUFDdEIsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDOztZQUVyQixZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVk7O1lBQ2hDLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTzs7WUFDdkIsWUFBWSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSTs7Ozs7UUFFakMsU0FBUyxNQUFNLENBQUMsQ0FBTTs7Z0JBQ2QsU0FBUyxHQUFHLFlBQVksQ0FBQyxTQUFTOztnQkFDbEMsT0FBTyxHQUFHLFlBQVksR0FBRyxDQUFDLENBQUMsT0FBTyxHQUFHLE1BQU07O2dCQUMzQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1lBRTFDLHFEQUFxRDtZQUNyRCx3QkFBd0I7WUFDeEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLDBCQUEwQjtZQUV4RSw2QkFBNkI7WUFDN0IsSUFBSSxPQUFPLEdBQUcsQ0FBQyxFQUFFO2dCQUNiLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQzthQUN0QjtZQUNELElBQUk7WUFDSiw4REFBOEQ7WUFDOUQsd0RBQXdEO1lBQ3hELDBEQUEwRDtRQUM5RCxDQUFDO1FBRUQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXBDLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Ozs7OztJQUVELE9BQU8sQ0FBQyxJQUFTLEVBQUUsS0FBYTs7WUFDeEIsS0FBSyxHQUFHLEVBQUU7UUFFZCxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMzQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzdFO2FBQU07WUFDSCxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDdkU7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDOzs7Ozs7SUFFRCxZQUFZLENBQUMsSUFBUyxFQUFFLEdBQVE7O1lBQ3hCLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7O1lBQzdELEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUM7UUFFMUgsT0FBTztZQUNILE9BQU8sRUFBRSxLQUFLO1lBQ2Qsa0JBQWtCLEVBQUUsUUFBUSxDQUFDLGtCQUFrQixDQUFDO1NBQ25ELENBQUM7SUFDTixDQUFDOzs7Ozs7SUFFTyxzQkFBc0IsQ0FBQyxNQUFXOzs7O1FBRXRDLFNBQVMsTUFBTTtZQUNYLFFBQVEsQ0FBQyxlQUFlLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN6RSxRQUFRLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDdkUsUUFBUSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzlFLENBQUM7UUFFRCxRQUFRLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdEUsUUFBUSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLFFBQVEsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMzRSxDQUFDOzs7WUE1TkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxlQUFlO2dCQUN6QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FtQlQ7Z0JBOERELFNBQVMsRUFBRTtvQkFDUCxZQUFZO2lCQUNmO3lCQS9EUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBNERSO2FBSUo7Ozs7WUF6RlEsWUFBWTs7O3dCQTJGaEIsS0FBSzt5QkFDTCxLQUFLO29CQUNMLEtBQUs7bUJBQ0wsS0FBSzt3QkFDTCxLQUFLOzs7O0lBSk4sK0NBQXdCOztJQUN4QixnREFBeUI7O0lBQ3pCLDJDQUFvQjs7SUFDcEIsMENBQW1COztJQUNuQiwrQ0FBd0I7O0lBRXhCLHFEQUE0Qjs7SUFDNUIsb0RBQTJCOztJQUVmLGtEQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBHYW50dFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvZ2FudHQuc2VydmljZSc7XHJcbmltcG9ydCB7IFpvb21pbmcgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnYWN0aXZpdHktYmFycycsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBjbGFzcz1cImdhbnR0LWFjdGl2aXR5LWJhcnMtYXJlYVwiIFxyXG4gICAgICAgIFtuZ1N0eWxlXT1cInsgJ2hlaWdodCc6IGNvbnRhaW5lckhlaWdodCArICdweCcsICd3aWR0aCc6IGNvbnRhaW5lcldpZHRoICsgJ3B4JyB9XCI+XHJcblxyXG4gICAgICAgIDxkaXYgI2JhciBjbGFzcz1cImdhbnR0LWFjdGl2aXR5LWxpbmVcIlxyXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgdGFzayBvZiBnYW50dFNlcnZpY2UuZ3JvdXBEYXRhKHRhc2tzKTsgbGV0IGkgPSBpbmRleFwiXHJcbiAgICAgICAgICAgIFtuZ1N0eWxlXT1cImRyYXdCYXIodGFzaywgaSlcIj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1hY3Rpdml0eS1wcm9ncmVzc1wiIFtuZ1N0eWxlXT1cImRyYXdQcm9ncmVzcyh0YXNrLCBiYXIpXCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1hY3Rpdml0eS1wcm9ncmVzc19kcmFnXCIgc3R5bGU9XCJsZWZ0OiA1MThweFwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtYWN0aXZpdHktY29udGVudFwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtYWN0aXZpdHktbGluay1jb250cm9sIGdhbnR0LWFjdGl2aXR5LXJpZ2h0XCIgc3R5bGU9XCJoZWlnaHQ6IDI2cHg7IGxpbmUtaGVpZ2h0OiAzMHB4XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtbGluay1wb2ludFwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbnR0LWFjdGl2aXR5LWxpbmstY29udHJvbCBnYW50dC1hY3Rpdml0eS1sZWZ0XCIgc3R5bGU9XCJoZWlnaHQ6IDI2cHg7IGxpbmUtaGVpZ2h0OiAzMHB4XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtbGluay1wb2ludFwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICAgIHN0eWxlczogW2BcclxuICAgIC5nYW50dC1hY3Rpdml0eS1saW5lIHtcclxuICAgICAgICAvKmJvcmRlci1yYWRpdXM6IDJweDsqL1xyXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxOCwxOTUsMjQ0KTtcclxuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjMjE5NkYzO1xyXG4gICAgICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgICB9XHJcbiAgICAuZ2FudHQtYWN0aXZpdHktbGluZTpob3ZlciB7XHJcbiAgICAgICAgLypjdXJzb3I6IG1vdmU7Ki9cclxuICAgIH1cclxuICAgIC5nYW50dC1hY3Rpdml0eS1wcm9ncmVzcyB7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgIHotaW5kZXg6IDA7XHJcbiAgICAgICAgYmFja2dyb3VuZDogIzIxOTZGMztcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgbWluLWhlaWdodDogMThweDtcclxuICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgICBoZWlnaHQ6IDE4cHg7XHJcbiAgICB9XHJcbiAgICAuZ2FudHQtYWN0aXZpdHktcHJvZ3Jlc3MtZHJhZyB7XHJcbiAgICAgICAgaGVpZ2h0OiA4cHg7XHJcbiAgICAgICAgd2lkdGg6IDhweDtcclxuICAgICAgICBib3R0b206IC00cHg7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDRweDtcclxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBib3R0b207XHJcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogXCJcIjtcclxuICAgICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG4gICAgICAgIHotaW5kZXg6IDI7XHJcbiAgICB9XHJcbiAgICAuZ2FudHQtYWN0aXZpdHktY29udGVudCB7XHJcbiAgICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIHRvcDogMDtcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7XHJcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICB9XHJcbiAgICAuZ2FudHQtYWN0aXZpdHktbGluay1jb250cm9sIHtcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgd2lkdGg6IDEzcHg7XHJcbiAgICAgICAgdG9wOiAwO1xyXG4gICAgfVxyXG4gICAgLmdhbnR0LWFjdGl2aXR5LXJpZ2h0IHtcclxuICAgICAgICByaWdodDogMDtcclxuICAgIH1cclxuICAgIC5nYW50dC1hY3Rpdml0eS1sZWZ0IHtcclxuICAgICAgICBsZWZ0OiAwO1xyXG4gICAgfVxyXG4gICAgLmdhbnR0LWFjdGl2aXR5LXJpZ2h0OmhvdmVyIHtcclxuICAgICAgICBjdXJzb3I6dy1yZXNpemU7XHJcbiAgICB9XHJcbiAgICAuZ2FudHQtYWN0aXZpdHktbGVmdDpob3ZlciB7XHJcbiAgICAgICAgY3Vyc29yOnctcmVzaXplO1xyXG4gICAgfVxyXG4gICAgYF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBHYW50dFNlcnZpY2VcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEdhbnR0QWN0aXZpdHlCYXJzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIEBJbnB1dCgpIHRpbWVTY2FsZTogYW55O1xyXG4gICAgQElucHV0KCkgZGltZW5zaW9uczogYW55O1xyXG4gICAgQElucHV0KCkgdGFza3M6IGFueTtcclxuICAgIEBJbnB1dCgpIHpvb206IGFueTtcclxuICAgIEBJbnB1dCgpIHpvb21MZXZlbDogYW55O1xyXG5cclxuICAgIGNvbnRhaW5lckhlaWdodDogbnVtYmVyID0gMDtcclxuICAgIGNvbnRhaW5lcldpZHRoOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBnYW50dFNlcnZpY2U6IEdhbnR0U2VydmljZSkgeyB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXJIZWlnaHQgPSB0aGlzLmRpbWVuc2lvbnMuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyV2lkdGggPSB0aGlzLmRpbWVuc2lvbnMud2lkdGg7XHJcblxyXG4gICAgICAgIHRoaXMuem9vbS5zdWJzY3JpYmUoKHpvb21MZXZlbDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuem9vbUxldmVsID0gem9vbUxldmVsO1xyXG4gICAgICAgIH0pOztcclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE8oZGFsZSk6IHRoZSBhYmlsaXR5IHRvIG1vdmUgYmFycyBuZWVkcyByZXZpZXdpbmcgYW5kIHRoZXJlIGFyZSBhIGZldyBxdWlya3NcclxuICAgIGV4cGFuZExlZnQoJGV2ZW50OiBhbnksIGJhcjogYW55KSB7XHJcbiAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICBsZXQgZ2FudHRTZXJ2aWNlID0gdGhpcy5nYW50dFNlcnZpY2U7XHJcbiAgICAgICAgbGV0IHN0YXJ0WCA9ICRldmVudC5jbGllbnRYO1xyXG4gICAgICAgIGxldCBzdGFydEJhcldpZHRoID0gYmFyLnN0eWxlLndpZHRoO1xyXG4gICAgICAgIGxldCBzdGFydEJhckxlZnQgPSBiYXIuc3R5bGUubGVmdDtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZG9EcmFnKGU6IGFueSkge1xyXG4gICAgICAgICAgICBsZXQgY2VsbFdpZHRoID0gZ2FudHRTZXJ2aWNlLmNlbGxXaWR0aDtcclxuICAgICAgICAgICAgbGV0IGJhcldpZHRoID0gc3RhcnRCYXJXaWR0aCAtIGUuY2xpZW50WCArIHN0YXJ0WDtcclxuICAgICAgICAgICAgbGV0IGRheXMgPSBNYXRoLnJvdW5kKGJhcldpZHRoIC8gY2VsbFdpZHRoKTtcclxuXHJcbiAgICAgICAgICAgIGJhci5zdHlsZS53aWR0aCA9IGRheXMgKiBjZWxsV2lkdGggKyBkYXlzO1xyXG4gICAgICAgICAgICBiYXIuc3R5bGUubGVmdCA9IChzdGFydEJhckxlZnQgLSAoZGF5cyAqIGNlbGxXaWR0aCkgLSBkYXlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYWRkTW91c2VFdmVudExpc3RlbmVycyhkb0RyYWcpO1xyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwYW5kUmlnaHQoJGV2ZW50OiBhbnksIGJhcjogYW55KSB7XHJcbiAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICBsZXQgZ2FudHRTZXJ2aWNlID0gdGhpcy5nYW50dFNlcnZpY2U7XHJcbiAgICAgICAgbGV0IHN0YXJ0WCA9ICRldmVudC5jbGllbnRYO1xyXG4gICAgICAgIGxldCBzdGFydEJhcldpZHRoID0gYmFyLnN0eWxlLndpZHRoO1xyXG4gICAgICAgIGxldCBzdGFydEJhckVuZERhdGUgPSBiYXIudGFzay5lbmQ7XHJcbiAgICAgICAgbGV0IHN0YXJ0QmFyTGVmdCA9IGJhci5zdHlsZS5sZWZ0O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBkb0RyYWcoZTogYW55KSB7XHJcbiAgICAgICAgICAgIGxldCBjZWxsV2lkdGggPSBnYW50dFNlcnZpY2UuY2VsbFdpZHRoO1xyXG4gICAgICAgICAgICBsZXQgYmFyV2lkdGggPSBzdGFydEJhcldpZHRoICsgZS5jbGllbnRYIC0gc3RhcnRYO1xyXG4gICAgICAgICAgICBsZXQgZGF5cyA9IE1hdGgucm91bmQoYmFyV2lkdGggLyBjZWxsV2lkdGgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGJhcldpZHRoIDwgY2VsbFdpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICBiYXJXaWR0aCA9IGNlbGxXaWR0aDtcclxuICAgICAgICAgICAgICAgIGRheXMgPSBNYXRoLnJvdW5kKGJhcldpZHRoIC8gY2VsbFdpZHRoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBiYXIuc3R5bGUud2lkdGggPSAoKGRheXMgKiBjZWxsV2lkdGgpICsgZGF5cyk7IC8vIHJvdW5kcyB0byB0aGUgbmVhcmVzdCBjZWxsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFkZE1vdXNlRXZlbnRMaXN0ZW5lcnMoZG9EcmFnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmUoJGV2ZW50OiBhbnksIGJhcjogYW55KSB7XHJcbiAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICBsZXQgZ2FudHRTZXJ2aWNlID0gdGhpcy5nYW50dFNlcnZpY2U7XHJcbiAgICAgICAgbGV0IHN0YXJ0WCA9ICRldmVudC5jbGllbnRYO1xyXG4gICAgICAgIGxldCBzdGFydEJhckxlZnQgPSBiYXIuc3R5bGUubGVmdDtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZG9EcmFnKGU6IGFueSkge1xyXG4gICAgICAgICAgICBsZXQgY2VsbFdpZHRoID0gZ2FudHRTZXJ2aWNlLmNlbGxXaWR0aDtcclxuICAgICAgICAgICAgbGV0IGJhckxlZnQgPSBzdGFydEJhckxlZnQgKyBlLmNsaWVudFggLSBzdGFydFg7XHJcbiAgICAgICAgICAgIGxldCBkYXlzID0gTWF0aC5yb3VuZChiYXJMZWZ0IC8gY2VsbFdpZHRoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRPRE86IGRldGVybWluZSBob3cgbWFueSBkYXlzIHRoZSBiYXIgY2FuIGJlIG1vdmVkXHJcbiAgICAgICAgICAgIC8vIGlmIChkYXlzIDwgbWF4RGF5cykge1xyXG4gICAgICAgICAgICBiYXIuc3R5bGUubGVmdCA9ICgoZGF5cyAqIGNlbGxXaWR0aCkgKyBkYXlzKTsgLy8gcm91bmRlZCB0byBuZWFyZXN0IGNlbGxcclxuXHJcbiAgICAgICAgICAgIC8vIGtlZXAgYmFyIGluIGJvdW5kcyBvZiBncmlkXHJcbiAgICAgICAgICAgIGlmIChiYXJMZWZ0IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgYmFyLnN0eWxlLmxlZnQgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgLy8gVE9ETzogaXQgbmVlZHMgdG8gdGFrZSBpbnRvIGFjY291bnQgdGhlIG1heCBudW1iZXIgb2YgZGF5cy5cclxuICAgICAgICAgICAgLy8gVE9ETzogaXQgbmVlZHMgdG8gdGFrZSBpbnRvIGFjY291bnQgdGhlIGN1cnJlbnQgZGF5cy5cclxuICAgICAgICAgICAgLy8gVE9ETzogaXQgbmVlZHMgdG8gdGFrZSBpbnRvIGFjY291bnQgdGhlIHJpZ2h0IGJvdW5kYXJ5LlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hZGRNb3VzZUV2ZW50TGlzdGVuZXJzKGRvRHJhZyk7XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3QmFyKHRhc2s6IGFueSwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBzdHlsZSA9IHt9O1xyXG5cclxuICAgICAgICBpZiAodGhpcy56b29tTGV2ZWwgPT09IFpvb21pbmdbWm9vbWluZy5ob3Vyc10pIHtcclxuICAgICAgICAgICAgc3R5bGUgPSB0aGlzLmdhbnR0U2VydmljZS5jYWxjdWxhdGVCYXIodGFzaywgaW5kZXgsIHRoaXMudGltZVNjYWxlLCB0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzdHlsZSA9IHRoaXMuZ2FudHRTZXJ2aWNlLmNhbGN1bGF0ZUJhcih0YXNrLCBpbmRleCwgdGhpcy50aW1lU2NhbGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3R5bGU7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd1Byb2dyZXNzKHRhc2s6IGFueSwgYmFyOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIHZhciBiYXJTdHlsZSA9IHRoaXMuZ2FudHRTZXJ2aWNlLmdldEJhclByb2dyZXNzU3R5bGUodGFzay5zdGF0dXMpO1xyXG4gICAgICAgIHZhciB3aWR0aCA9IHRoaXMuZ2FudHRTZXJ2aWNlLmNhbGN1bGF0ZUJhclByb2dyZXNzKHRoaXMuZ2FudHRTZXJ2aWNlLmdldENvbXB1dGVkU3R5bGUoYmFyLCAnd2lkdGgnKSwgdGFzay5wZXJjZW50Q29tcGxldGUpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAnd2lkdGgnOiB3aWR0aCxcclxuICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiBiYXJTdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkZE1vdXNlRXZlbnRMaXN0ZW5lcnMoZHJhZ0ZuOiBhbnkpIHtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc3RvcEZuKCkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZHJhZ0ZuLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgc3RvcEZuLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgc3RvcEZuLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZHJhZ0ZuLCBmYWxzZSk7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBzdG9wRm4sIGZhbHNlKTtcclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHN0b3BGbiwgZmFsc2UpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==