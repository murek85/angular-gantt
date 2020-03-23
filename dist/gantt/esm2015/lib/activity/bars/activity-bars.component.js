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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHktYmFycy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9nYW50dC8iLCJzb3VyY2VzIjpbImxpYi9hY3Rpdml0eS9iYXJzL2FjdGl2aXR5LWJhcnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBYyxNQUFNLGVBQWUsQ0FBQztBQUNyRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDbkUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBeUZsRCxNQUFNLE9BQU8sMEJBQTBCOzs7O0lBVW5DLFlBQW1CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBSDdDLG9CQUFlLEdBQVcsQ0FBQyxDQUFDO1FBQzVCLG1CQUFjLEdBQVcsQ0FBQyxDQUFDO0lBRXNCLENBQUM7Ozs7SUFFbEQsUUFBUTtRQUNKLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDOUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUU1QyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQWlCLEVBQUUsRUFBRTtZQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztRQUFBLENBQUM7SUFDUixDQUFDOzs7Ozs7O0lBR0QsVUFBVSxDQUFDLE1BQVcsRUFBRSxHQUFRO1FBQzVCLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQzs7WUFFckIsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZOztZQUNoQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU87O1lBQ3ZCLGFBQWEsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUs7O1lBQy9CLFlBQVksR0FBRyxHQUFHLENBQUMsS0FBSyxD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QyxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3ZFLFFBQVEsQ0FBQyxlQUFlLENBQUMsbUJBQW1CLENBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM5RSxDQUFDO1FBRUQsUUFBUSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3RFLFFBQVEsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNwRSxRQUFRLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDM0UsQ0FBQzs7O1lBNU5KLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBbUJUO2dCQThERCxTQUFTLEVBQUU7b0JBQ1AsWUFBWTtpQkFDZjt5QkEvRFE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQTREUjthQUlKOzs7O1lBekZRLFlBQVk7Ozt3QkEyRmhCLEtBQUs7eUJBQ0wsS0FBSztvQkFDTCxLQUFLO21CQUNMLEtBQUs7d0JBQ0wsS0FBSzs7OztJQUpOLCtDQUF3Qjs7SUFDeEIsZ0RBQXlCOztJQUN6QiwyQ0FBb0I7O0lBQ3BCLDBDQUFtQjs7SUFDbkIsK0NBQXdCOztJQUV4QixxREFBNEI7O0lBQzVCLG9EQUEyQjs7SUFFZixrREFBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgR2FudHRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2dhbnR0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBab29taW5nIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2FjdGl2aXR5LWJhcnMnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJnYW50dC1hY3Rpdml0eS1iYXJzLWFyZWFcIiBcclxuICAgICAgICBbbmdTdHlsZV09XCJ7ICdoZWlnaHQnOiBjb250YWluZXJIZWlnaHQgKyAncHgnLCAnd2lkdGgnOiBjb250YWluZXJXaWR0aCArICdweCcgfVwiPlxyXG5cclxuICAgICAgICA8ZGl2ICNiYXIgY2xhc3M9XCJnYW50dC1hY3Rpdml0eS1saW5lXCJcclxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IHRhc2sgb2YgZ2FudHRTZXJ2aWNlLmdyb3VwRGF0YSh0YXNrcyk7IGxldCBpID0gaW5kZXhcIlxyXG4gICAgICAgICAgICBbbmdTdHlsZV09XCJkcmF3QmFyKHRhc2ssIGkpXCI+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtYWN0aXZpdHktcHJvZ3Jlc3NcIiBbbmdTdHlsZV09XCJkcmF3UHJvZ3Jlc3ModGFzaywgYmFyKVwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtYWN0aXZpdHktcHJvZ3Jlc3NfZHJhZ1wiIHN0eWxlPVwibGVmdDogNTE4cHhcIj48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbnR0LWFjdGl2aXR5LWNvbnRlbnRcIj48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbnR0LWFjdGl2aXR5LWxpbmstY29udHJvbCBnYW50dC1hY3Rpdml0eS1yaWdodFwiIHN0eWxlPVwiaGVpZ2h0OiAyNnB4OyBsaW5lLWhlaWdodDogMzBweFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbnR0LWxpbmstcG9pbnRcIj48L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1hY3Rpdml0eS1saW5rLWNvbnRyb2wgZ2FudHQtYWN0aXZpdHktbGVmdFwiIHN0eWxlPVwiaGVpZ2h0OiAyNnB4OyBsaW5lLWhlaWdodDogMzBweFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbnR0LWxpbmstcG9pbnRcIj48L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBzdHlsZXM6IFtgXHJcbiAgICAuZ2FudHQtYWN0aXZpdHktbGluZSB7XHJcbiAgICAgICAgLypib3JkZXItcmFkaXVzOiAycHg7Ki9cclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTgsMTk1LDI0NCk7XHJcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgIzIxOTZGMztcclxuICAgICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xyXG4gICAgfVxyXG4gICAgLmdhbnR0LWFjdGl2aXR5LWxpbmU6aG92ZXIge1xyXG4gICAgICAgIC8qY3Vyc29yOiBtb3ZlOyovXHJcbiAgICB9XHJcbiAgICAuZ2FudHQtYWN0aXZpdHktcHJvZ3Jlc3Mge1xyXG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICB6LWluZGV4OiAwO1xyXG4gICAgICAgIGJhY2tncm91bmQ6ICMyMTk2RjM7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIG1pbi1oZWlnaHQ6IDE4cHg7XHJcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgaGVpZ2h0OiAxOHB4O1xyXG4gICAgfVxyXG4gICAgLmdhbnR0LWFjdGl2aXR5LXByb2dyZXNzLWRyYWcge1xyXG4gICAgICAgIGhlaWdodDogOHB4O1xyXG4gICAgICAgIHdpZHRoOiA4cHg7XHJcbiAgICAgICAgYm90dG9tOiAtNHB4O1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiA0cHg7XHJcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogYm90dG9tO1xyXG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IFwiXCI7XHJcbiAgICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcclxuICAgICAgICB6LWluZGV4OiAyO1xyXG4gICAgfVxyXG4gICAgLmdhbnR0LWFjdGl2aXR5LWNvbnRlbnQge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgICAgICBjb2xvcjogI2ZmZjtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICB0b3A6IDA7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xyXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgfVxyXG4gICAgLmdhbnR0LWFjdGl2aXR5LWxpbmstY29udHJvbCB7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIHdpZHRoOiAxM3B4O1xyXG4gICAgICAgIHRvcDogMDtcclxuICAgIH1cclxuICAgIC5nYW50dC1hY3Rpdml0eS1yaWdodCB7XHJcbiAgICAgICAgcmlnaHQ6IDA7XHJcbiAgICB9XHJcbiAgICAuZ2FudHQtYWN0aXZpdHktbGVmdCB7XHJcbiAgICAgICAgbGVmdDogMDtcclxuICAgIH1cclxuICAgIC5nYW50dC1hY3Rpdml0eS1yaWdodDpob3ZlciB7XHJcbiAgICAgICAgY3Vyc29yOnctcmVzaXplO1xyXG4gICAgfVxyXG4gICAgLmdhbnR0LWFjdGl2aXR5LWxlZnQ6aG92ZXIge1xyXG4gICAgICAgIGN1cnNvcjp3LXJlc2l6ZTtcclxuICAgIH1cclxuICAgIGBdLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgR2FudHRTZXJ2aWNlXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHYW50dEFjdGl2aXR5QmFyc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBASW5wdXQoKSB0aW1lU2NhbGU6IGFueTtcclxuICAgIEBJbnB1dCgpIGRpbWVuc2lvbnM6IGFueTtcclxuICAgIEBJbnB1dCgpIHRhc2tzOiBhbnk7XHJcbiAgICBASW5wdXQoKSB6b29tOiBhbnk7XHJcbiAgICBASW5wdXQoKSB6b29tTGV2ZWw6IGFueTtcclxuXHJcbiAgICBjb250YWluZXJIZWlnaHQ6IG51bWJlciA9IDA7XHJcbiAgICBjb250YWluZXJXaWR0aDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZ2FudHRTZXJ2aWNlOiBHYW50dFNlcnZpY2UpIHsgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVySGVpZ2h0ID0gdGhpcy5kaW1lbnNpb25zLmhlaWdodDtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lcldpZHRoID0gdGhpcy5kaW1lbnNpb25zLndpZHRoO1xyXG5cclxuICAgICAgICB0aGlzLnpvb20uc3Vic2NyaWJlKCh6b29tTGV2ZWw6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnpvb21MZXZlbCA9IHpvb21MZXZlbDtcclxuICAgICAgICB9KTs7XHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPKGRhbGUpOiB0aGUgYWJpbGl0eSB0byBtb3ZlIGJhcnMgbmVlZHMgcmV2aWV3aW5nIGFuZCB0aGVyZSBhcmUgYSBmZXcgcXVpcmtzXHJcbiAgICBleHBhbmRMZWZ0KCRldmVudDogYW55LCBiYXI6IGFueSkge1xyXG4gICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgbGV0IGdhbnR0U2VydmljZSA9IHRoaXMuZ2FudHRTZXJ2aWNlO1xyXG4gICAgICAgIGxldCBzdGFydFggPSAkZXZlbnQuY2xpZW50WDtcclxuICAgICAgICBsZXQgc3RhcnRCYXJXaWR0aCA9IGJhci5zdHlsZS53aWR0aDtcclxuICAgICAgICBsZXQgc3RhcnRCYXJMZWZ0ID0gYmFyLnN0eWxlLmxlZnQ7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGRvRHJhZyhlOiBhbnkpIHtcclxuICAgICAgICAgICAgbGV0IGNlbGxXaWR0aCA9IGdhbnR0U2VydmljZS5jZWxsV2lkdGg7XHJcbiAgICAgICAgICAgIGxldCBiYXJXaWR0aCA9IHN0YXJ0QmFyV2lkdGggLSBlLmNsaWVudFggKyBzdGFydFg7XHJcbiAgICAgICAgICAgIGxldCBkYXlzID0gTWF0aC5yb3VuZChiYXJXaWR0aCAvIGNlbGxXaWR0aCk7XHJcblxyXG4gICAgICAgICAgICBiYXIuc3R5bGUud2lkdGggPSBkYXlzICogY2VsbFdpZHRoICsgZGF5cztcclxuICAgICAgICAgICAgYmFyLnN0eWxlLmxlZnQgPSAoc3RhcnRCYXJMZWZ0IC0gKGRheXMgKiBjZWxsV2lkdGgpIC0gZGF5cyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFkZE1vdXNlRXZlbnRMaXN0ZW5lcnMoZG9EcmFnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cGFuZFJpZ2h0KCRldmVudDogYW55LCBiYXI6IGFueSkge1xyXG4gICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgbGV0IGdhbnR0U2VydmljZSA9IHRoaXMuZ2FudHRTZXJ2aWNlO1xyXG4gICAgICAgIGxldCBzdGFydFggPSAkZXZlbnQuY2xpZW50WDtcclxuICAgICAgICBsZXQgc3RhcnRCYXJXaWR0aCA9IGJhci5zdHlsZS53aWR0aDtcclxuICAgICAgICBsZXQgc3RhcnRCYXJFbmREYXRlID0gYmFyLnRhc2suZW5kO1xyXG4gICAgICAgIGxldCBzdGFydEJhckxlZnQgPSBiYXIuc3R5bGUubGVmdDtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZG9EcmFnKGU6IGFueSkge1xyXG4gICAgICAgICAgICBsZXQgY2VsbFdpZHRoID0gZ2FudHRTZXJ2aWNlLmNlbGxXaWR0aDtcclxuICAgICAgICAgICAgbGV0IGJhcldpZHRoID0gc3RhcnRCYXJXaWR0aCArIGUuY2xpZW50WCAtIHN0YXJ0WDtcclxuICAgICAgICAgICAgbGV0IGRheXMgPSBNYXRoLnJvdW5kKGJhcldpZHRoIC8gY2VsbFdpZHRoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChiYXJXaWR0aCA8IGNlbGxXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgYmFyV2lkdGggPSBjZWxsV2lkdGg7XHJcbiAgICAgICAgICAgICAgICBkYXlzID0gTWF0aC5yb3VuZChiYXJXaWR0aCAvIGNlbGxXaWR0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYmFyLnN0eWxlLndpZHRoID0gKChkYXlzICogY2VsbFdpZHRoKSArIGRheXMpOyAvLyByb3VuZHMgdG8gdGhlIG5lYXJlc3QgY2VsbFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hZGRNb3VzZUV2ZW50TGlzdGVuZXJzKGRvRHJhZyk7XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlKCRldmVudDogYW55LCBiYXI6IGFueSkge1xyXG4gICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgbGV0IGdhbnR0U2VydmljZSA9IHRoaXMuZ2FudHRTZXJ2aWNlO1xyXG4gICAgICAgIGxldCBzdGFydFggPSAkZXZlbnQuY2xpZW50WDtcclxuICAgICAgICBsZXQgc3RhcnRCYXJMZWZ0ID0gYmFyLnN0eWxlLmxlZnQ7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGRvRHJhZyhlOiBhbnkpIHtcclxuICAgICAgICAgICAgbGV0IGNlbGxXaWR0aCA9IGdhbnR0U2VydmljZS5jZWxsV2lkdGg7XHJcbiAgICAgICAgICAgIGxldCBiYXJMZWZ0ID0gc3RhcnRCYXJMZWZ0ICsgZS5jbGllbnRYIC0gc3RhcnRYO1xyXG4gICAgICAgICAgICBsZXQgZGF5cyA9IE1hdGgucm91bmQoYmFyTGVmdCAvIGNlbGxXaWR0aCk7XHJcblxyXG4gICAgICAgICAgICAvLyBUT0RPOiBkZXRlcm1pbmUgaG93IG1hbnkgZGF5cyB0aGUgYmFyIGNhbiBiZSBtb3ZlZFxyXG4gICAgICAgICAgICAvLyBpZiAoZGF5cyA8IG1heERheXMpIHtcclxuICAgICAgICAgICAgYmFyLnN0eWxlLmxlZnQgPSAoKGRheXMgKiBjZWxsV2lkdGgpICsgZGF5cyk7IC8vIHJvdW5kZWQgdG8gbmVhcmVzdCBjZWxsXHJcblxyXG4gICAgICAgICAgICAvLyBrZWVwIGJhciBpbiBib3VuZHMgb2YgZ3JpZFxyXG4gICAgICAgICAgICBpZiAoYmFyTGVmdCA8IDApIHtcclxuICAgICAgICAgICAgICAgIGJhci5zdHlsZS5sZWZ0ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIC8vIFRPRE86IGl0IG5lZWRzIHRvIHRha2UgaW50byBhY2NvdW50IHRoZSBtYXggbnVtYmVyIG9mIGRheXMuXHJcbiAgICAgICAgICAgIC8vIFRPRE86IGl0IG5lZWRzIHRvIHRha2UgaW50byBhY2NvdW50IHRoZSBjdXJyZW50IGRheXMuXHJcbiAgICAgICAgICAgIC8vIFRPRE86IGl0IG5lZWRzIHRvIHRha2UgaW50byBhY2NvdW50IHRoZSByaWdodCBib3VuZGFyeS5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYWRkTW91c2VFdmVudExpc3RlbmVycyhkb0RyYWcpO1xyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd0Jhcih0YXNrOiBhbnksIGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgc3R5bGUgPSB7fTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuem9vbUxldmVsID09PSBab29taW5nW1pvb21pbmcuaG91cnNdKSB7XHJcbiAgICAgICAgICAgIHN0eWxlID0gdGhpcy5nYW50dFNlcnZpY2UuY2FsY3VsYXRlQmFyKHRhc2ssIGluZGV4LCB0aGlzLnRpbWVTY2FsZSwgdHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3R5bGUgPSB0aGlzLmdhbnR0U2VydmljZS5jYWxjdWxhdGVCYXIodGFzaywgaW5kZXgsIHRoaXMudGltZVNjYWxlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdQcm9ncmVzcyh0YXNrOiBhbnksIGJhcjogYW55KTogYW55IHtcclxuICAgICAgICB2YXIgYmFyU3R5bGUgPSB0aGlzLmdhbnR0U2VydmljZS5nZXRCYXJQcm9ncmVzc1N0eWxlKHRhc2suc3RhdHVzKTtcclxuICAgICAgICB2YXIgd2lkdGggPSB0aGlzLmdhbnR0U2VydmljZS5jYWxjdWxhdGVCYXJQcm9ncmVzcyh0aGlzLmdhbnR0U2VydmljZS5nZXRDb21wdXRlZFN0eWxlKGJhciwgJ3dpZHRoJyksIHRhc2sucGVyY2VudENvbXBsZXRlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ3dpZHRoJzogd2lkdGgsXHJcbiAgICAgICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogYmFyU3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRNb3VzZUV2ZW50TGlzdGVuZXJzKGRyYWdGbjogYW55KSB7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHN0b3BGbigpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGRyYWdGbiwgZmFsc2UpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHN0b3BGbiwgZmFsc2UpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHN0b3BGbiwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGRyYWdGbiwgZmFsc2UpO1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgc3RvcEZuLCBmYWxzZSk7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBzdG9wRm4sIGZhbHNlKTtcclxuICAgIH1cclxufVxyXG4iXX0=