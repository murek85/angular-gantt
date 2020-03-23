/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { GanttService } from '../../shared/services/gantt.service';
import { Zooming } from '../../shared/interfaces';
var GanttActivityBarsComponent = /** @class */ (function () {
    function GanttActivityBarsComponent(ganttService) {
        this.ganttService = ganttService;
        this.containerHeight = 0;
        this.containerWidth = 0;
    }
    /**
     * @return {?}
     */
    GanttActivityBarsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.containerHeight = this.dimensions.height;
        this.containerWidth = this.dimensions.width;
        this.zoom.subscribe(function (zoomLevel) {
            _this.zoomLevel = zoomLevel;
        });
        ;
    };
    //TODO(dale): the ability to move bars needs reviewing and there are a few quirks
    //TODO(dale): the ability to move bars needs reviewing and there are a few quirks
    /**
     * @param {?} $event
     * @param {?} bar
     * @return {?}
     */
    GanttActivityBarsComponent.prototype.expandLeft = 
    //TODO(dale): the ability to move bars needs reviewing and there are a few quirks
    /**
     * @param {?} $event
     * @param {?} bar
     * @return {?}
     */
    function ($event, bar) {
        $event.stopPropagation();
        /** @type {?} */
        var ganttService = this.ganttService;
        /** @type {?} */
        var startX = $event.clientX;
        /** @type {?} */
        var startBarWidth = bar.style.width;
        /** @type {?} */
        var startBarLeft = bar.style.left;
        /**
         * @param {?} e
         * @return {?}
         */
        function doDrag(e) {
            /** @type {?} */
            var cellWidth = ganttService.cellWidth;
            /** @type {?} */
            var barWidth = startBarWidth - e.clientX + startX;
            /** @type {?} */
            var days = Math.round(barWidth / cellWidth);
            bar.style.width = days * cellWidth + days;
            bar.style.left = (startBarLeft - (days * cellWidth) - days);
        }
        this.addMouseEventListeners(doDrag);
        return false;
    };
    /**
     * @param {?} $event
     * @param {?} bar
     * @return {?}
     */
    GanttActivityBarsComponent.prototype.expandRight = /**
     * @param {?} $event
     * @param {?} bar
     * @return {?}
     */
    function ($event, bar) {
        $event.stopPropagation();
        /** @type {?} */
        var ganttService = this.ganttService;
        /** @type {?} */
        var startX = $event.clientX;
        /** @type {?} */
        var startBarWidth = bar.style.width;
        /** @type {?} */
        var startBarEndDate = bar.task.end;
        /** @type {?} */
        var startBarLeft = bar.style.left;
        /**
         * @param {?} e
         * @return {?}
         */
        function doDrag(e) {
            /** @type {?} */
            var cellWidth = ganttService.cellWidth;
            /** @type {?} */
            var barWidth = startBarWidth + e.clientX - startX;
            /** @type {?} */
            var days = Math.round(barWidth / cellWidth);
            if (barWidth < cellWidth) {
                barWidth = cellWidth;
                days = Math.round(barWidth / cellWidth);
            }
            bar.style.width = ((days * cellWidth) + days); // rounds to the nearest cell
        }
        this.addMouseEventListeners(doDrag);
        return false;
    };
    /**
     * @param {?} $event
     * @param {?} bar
     * @return {?}
     */
    GanttActivityBarsComponent.prototype.move = /**
     * @param {?} $event
     * @param {?} bar
     * @return {?}
     */
    function ($event, bar) {
        $event.stopPropagation();
        /** @type {?} */
        var ganttService = this.ganttService;
        /** @type {?} */
        var startX = $event.clientX;
        /** @type {?} */
        var startBarLeft = bar.style.left;
        /**
         * @param {?} e
         * @return {?}
         */
        function doDrag(e) {
            /** @type {?} */
            var cellWidth = ganttService.cellWidth;
            /** @type {?} */
            var barLeft = startBarLeft + e.clientX - startX;
            /** @type {?} */
            var days = Math.round(barLeft / cellWidth);
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
    };
    /**
     * @param {?} task
     * @param {?} index
     * @return {?}
     */
    GanttActivityBarsComponent.prototype.drawBar = /**
     * @param {?} task
     * @param {?} index
     * @return {?}
     */
    function (task, index) {
        /** @type {?} */
        var style = {};
        if (this.zoomLevel === Zooming[Zooming.hours]) {
            style = this.ganttService.calculateBar(task, index, this.timeScale, true);
        }
        else {
            style = this.ganttService.calculateBar(task, index, this.timeScale);
        }
        return style;
    };
    /**
     * @param {?} task
     * @param {?} bar
     * @return {?}
     */
    GanttActivityBarsComponent.prototype.drawProgress = /**
     * @param {?} task
     * @param {?} bar
     * @return {?}
     */
    function (task, bar) {
        /** @type {?} */
        var barStyle = this.ganttService.getBarProgressStyle(task.status);
        /** @type {?} */
        var width = this.ganttService.calculateBarProgress(this.ganttService.getComputedStyle(bar, 'width'), task.percentComplete);
        return {
            'width': width,
            'background-color': barStyle["background-color"],
        };
    };
    /**
     * @private
     * @param {?} dragFn
     * @return {?}
     */
    GanttActivityBarsComponent.prototype.addMouseEventListeners = /**
     * @private
     * @param {?} dragFn
     * @return {?}
     */
    function (dragFn) {
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
    };
    GanttActivityBarsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'activity-bars',
                    template: "\n    <div class=\"gantt-activity-bars-area\" \n        [ngStyle]=\"{ 'height': containerHeight + 'px', 'width': containerWidth + 'px' }\">\n\n        <div #bar class=\"gantt-activity-line\"\n            *ngFor=\"let task of ganttService.groupData(tasks); let i = index\"\n            [ngStyle]=\"drawBar(task, i)\">\n\n            <div class=\"gantt-activity-progress\" [ngStyle]=\"drawProgress(task, bar)\"></div>\n            <div class=\"gantt-activity-progress_drag\" style=\"left: 518px\"></div>\n            <div class=\"gantt-activity-content\"></div>\n            <div class=\"gantt-activity-link-control gantt-activity-right\" style=\"height: 26px; line-height: 30px\">\n                <div class=\"gantt-link-point\"></div>\n            </div>\n            <div class=\"gantt-activity-link-control gantt-activity-left\" style=\"height: 26px; line-height: 30px\">\n                <div class=\"gantt-link-point\"></div>\n            </div>\n        </div>\n    </div>\n    ",
                    providers: [
                        GanttService
                    ],
                    styles: ["\n    .gantt-activity-line {\n        /*border-radius: 2px;*/\n        position: absolute;\n        box-sizing: border-box;\n        background-color: rgb(18,195,244);\n        border: 1px solid #2196F3;\n        -webkit-user-select: none;\n    }\n    .gantt-activity-line:hover {\n        /*cursor: move;*/\n    }\n    .gantt-activity-progress {\n        text-align: center;\n        z-index: 0;\n        background: #2196F3;\n        position: absolute;\n        min-height: 18px;\n        display: block;\n        height: 18px;\n    }\n    .gantt-activity-progress-drag {\n        height: 8px;\n        width: 8px;\n        bottom: -4px;\n        margin-left: 4px;\n        background-position: bottom;\n        background-image: \"\";\n        background-repeat: no-repeat;\n        z-index: 2;\n    }\n    .gantt-activity-content {\n        font-size: 12px;\n        color: #fff;\n        width: 100%;\n        top: 0;\n        position: absolute;\n        white-space: nowrap;\n        text-align: center;\n        line-height: inherit;\n        overflow: hidden;\n        height: 100%;\n    }\n    .gantt-activity-link-control {\n        position: absolute;\n        width: 13px;\n        top: 0;\n    }\n    .gantt-activity-right {\n        right: 0;\n    }\n    .gantt-activity-left {\n        left: 0;\n    }\n    .gantt-activity-right:hover {\n        cursor:w-resize;\n    }\n    .gantt-activity-left:hover {\n        cursor:w-resize;\n    }\n    "]
                }] }
    ];
    /** @nocollapse */
    GanttActivityBarsComponent.ctorParameters = function () { return [
        { type: GanttService }
    ]; };
    GanttActivityBarsComponent.propDecorators = {
        timeScale: [{ type: Input }],
        dimensions: [{ type: Input }],
        tasks: [{ type: Input }],
        zoom: [{ type: Input }],
        zoomLevel: [{ type: Input }]
    };
    return GanttActivityBarsComponent;
}());
export { GanttActivityBarsComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHktYmFycy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9nYW50dC8iLCJzb3VyY2VzIjpbImxpYi9hY3Rpdml0eS9iYXJzL2FjdGl2aXR5LWJhcnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBYyxNQUFNLGVBQWUsQ0FBQztBQUNyRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDbkUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRWxEO0lBaUdJLG9DQUFtQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUg3QyxvQkFBZSxHQUFXLENBQUMsQ0FBQztRQUM1QixtQkFBYyxHQUFXLENBQUMsQ0FBQztJQUVzQixDQUFDOzs7O0lBRWxELDZDQUFROzs7SUFBUjtRQUFBLGlCQU9DO1FBTkcsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUM5QyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBRTVDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQUMsU0FBaUI7WUFDbEMsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7UUFBQSxDQUFDO0lBQ1IsQ0FBQztJQUVELGlGQUFpRjs7Ozs7OztJQUNqRiwrQ0FBVTs7Ozs7OztJQUFWLFVBQVcsTUFBVyxFQUFFLEdBQVE7UUFDNUIsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDOztZQUVyQixZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVk7O1lBQ2hDLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTzs7WUFDdkIsYUFBYSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSzs7WUFDL0IsWUFBWSxHQUFHLEdB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QUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN6RSxRQUFRLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDdkUsUUFBUSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzlFLENBQUM7UUFFRCxRQUFRLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdEUsUUFBUSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLFFBQVEsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMzRSxDQUFDOztnQkE1TkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxlQUFlO29CQUN6QixRQUFRLEVBQUUsMDlCQW1CVDtvQkE4REQsU0FBUyxFQUFFO3dCQUNQLFlBQVk7cUJBQ2Y7NkJBL0RRLHE3Q0E0RFI7aUJBSUo7Ozs7Z0JBekZRLFlBQVk7Ozs0QkEyRmhCLEtBQUs7NkJBQ0wsS0FBSzt3QkFDTCxLQUFLO3VCQUNMLEtBQUs7NEJBQ0wsS0FBSzs7SUFpSVYsaUNBQUM7Q0FBQSxBQTdORCxJQTZOQztTQXRJWSwwQkFBMEI7OztJQUNuQywrQ0FBd0I7O0lBQ3hCLGdEQUF5Qjs7SUFDekIsMkNBQW9COztJQUNwQiwwQ0FBbUI7O0lBQ25CLCtDQUF3Qjs7SUFFeEIscURBQTRCOztJQUM1QixvREFBMkI7O0lBRWYsa0RBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEdhbnR0U2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9nYW50dC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgWm9vbWluZyB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdhY3Rpdml0eS1iYXJzJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtYWN0aXZpdHktYmFycy1hcmVhXCIgXHJcbiAgICAgICAgW25nU3R5bGVdPVwieyAnaGVpZ2h0JzogY29udGFpbmVySGVpZ2h0ICsgJ3B4JywgJ3dpZHRoJzogY29udGFpbmVyV2lkdGggKyAncHgnIH1cIj5cclxuXHJcbiAgICAgICAgPGRpdiAjYmFyIGNsYXNzPVwiZ2FudHQtYWN0aXZpdHktbGluZVwiXHJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCB0YXNrIG9mIGdhbnR0U2VydmljZS5ncm91cERhdGEodGFza3MpOyBsZXQgaSA9IGluZGV4XCJcclxuICAgICAgICAgICAgW25nU3R5bGVdPVwiZHJhd0Jhcih0YXNrLCBpKVwiPlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbnR0LWFjdGl2aXR5LXByb2dyZXNzXCIgW25nU3R5bGVdPVwiZHJhd1Byb2dyZXNzKHRhc2ssIGJhcilcIj48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbnR0LWFjdGl2aXR5LXByb2dyZXNzX2RyYWdcIiBzdHlsZT1cImxlZnQ6IDUxOHB4XCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1hY3Rpdml0eS1jb250ZW50XCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1hY3Rpdml0eS1saW5rLWNvbnRyb2wgZ2FudHQtYWN0aXZpdHktcmlnaHRcIiBzdHlsZT1cImhlaWdodDogMjZweDsgbGluZS1oZWlnaHQ6IDMwcHhcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1saW5rLXBvaW50XCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtYWN0aXZpdHktbGluay1jb250cm9sIGdhbnR0LWFjdGl2aXR5LWxlZnRcIiBzdHlsZT1cImhlaWdodDogMjZweDsgbGluZS1oZWlnaHQ6IDMwcHhcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1saW5rLXBvaW50XCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgc3R5bGVzOiBbYFxyXG4gICAgLmdhbnR0LWFjdGl2aXR5LWxpbmUge1xyXG4gICAgICAgIC8qYm9yZGVyLXJhZGl1czogMnB4OyovXHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE4LDE5NSwyNDQpO1xyXG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICMyMTk2RjM7XHJcbiAgICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcclxuICAgIH1cclxuICAgIC5nYW50dC1hY3Rpdml0eS1saW5lOmhvdmVyIHtcclxuICAgICAgICAvKmN1cnNvcjogbW92ZTsqL1xyXG4gICAgfVxyXG4gICAgLmdhbnR0LWFjdGl2aXR5LXByb2dyZXNzIHtcclxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgei1pbmRleDogMDtcclxuICAgICAgICBiYWNrZ3JvdW5kOiAjMjE5NkYzO1xyXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICBtaW4taGVpZ2h0OiAxOHB4O1xyXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgIGhlaWdodDogMThweDtcclxuICAgIH1cclxuICAgIC5nYW50dC1hY3Rpdml0eS1wcm9ncmVzcy1kcmFnIHtcclxuICAgICAgICBoZWlnaHQ6IDhweDtcclxuICAgICAgICB3aWR0aDogOHB4O1xyXG4gICAgICAgIGJvdHRvbTogLTRweDtcclxuICAgICAgICBtYXJnaW4tbGVmdDogNHB4O1xyXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IGJvdHRvbTtcclxuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiBcIlwiO1xyXG4gICAgICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XHJcbiAgICAgICAgei1pbmRleDogMjtcclxuICAgIH1cclxuICAgIC5nYW50dC1hY3Rpdml0eS1jb250ZW50IHtcclxuICAgICAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICAgICAgY29sb3I6ICNmZmY7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgdG9wOiAwO1xyXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICBsaW5lLWhlaWdodDogaW5oZXJpdDtcclxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgIH1cclxuICAgIC5nYW50dC1hY3Rpdml0eS1saW5rLWNvbnRyb2wge1xyXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICB3aWR0aDogMTNweDtcclxuICAgICAgICB0b3A6IDA7XHJcbiAgICB9XHJcbiAgICAuZ2FudHQtYWN0aXZpdHktcmlnaHQge1xyXG4gICAgICAgIHJpZ2h0OiAwO1xyXG4gICAgfVxyXG4gICAgLmdhbnR0LWFjdGl2aXR5LWxlZnQge1xyXG4gICAgICAgIGxlZnQ6IDA7XHJcbiAgICB9XHJcbiAgICAuZ2FudHQtYWN0aXZpdHktcmlnaHQ6aG92ZXIge1xyXG4gICAgICAgIGN1cnNvcjp3LXJlc2l6ZTtcclxuICAgIH1cclxuICAgIC5nYW50dC1hY3Rpdml0eS1sZWZ0OmhvdmVyIHtcclxuICAgICAgICBjdXJzb3I6dy1yZXNpemU7XHJcbiAgICB9XHJcbiAgICBgXSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIEdhbnR0U2VydmljZVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR2FudHRBY3Rpdml0eUJhcnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgQElucHV0KCkgdGltZVNjYWxlOiBhbnk7XHJcbiAgICBASW5wdXQoKSBkaW1lbnNpb25zOiBhbnk7XHJcbiAgICBASW5wdXQoKSB0YXNrczogYW55O1xyXG4gICAgQElucHV0KCkgem9vbTogYW55O1xyXG4gICAgQElucHV0KCkgem9vbUxldmVsOiBhbnk7XHJcblxyXG4gICAgY29udGFpbmVySGVpZ2h0OiBudW1iZXIgPSAwO1xyXG4gICAgY29udGFpbmVyV2lkdGg6IG51bWJlciA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGdhbnR0U2VydmljZTogR2FudHRTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lckhlaWdodCA9IHRoaXMuZGltZW5zaW9ucy5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXJXaWR0aCA9IHRoaXMuZGltZW5zaW9ucy53aWR0aDtcclxuXHJcbiAgICAgICAgdGhpcy56b29tLnN1YnNjcmliZSgoem9vbUxldmVsOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgdGhpcy56b29tTGV2ZWwgPSB6b29tTGV2ZWw7XHJcbiAgICAgICAgfSk7O1xyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETyhkYWxlKTogdGhlIGFiaWxpdHkgdG8gbW92ZSBiYXJzIG5lZWRzIHJldmlld2luZyBhbmQgdGhlcmUgYXJlIGEgZmV3IHF1aXJrc1xyXG4gICAgZXhwYW5kTGVmdCgkZXZlbnQ6IGFueSwgYmFyOiBhbnkpIHtcclxuICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgIGxldCBnYW50dFNlcnZpY2UgPSB0aGlzLmdhbnR0U2VydmljZTtcclxuICAgICAgICBsZXQgc3RhcnRYID0gJGV2ZW50LmNsaWVudFg7XHJcbiAgICAgICAgbGV0IHN0YXJ0QmFyV2lkdGggPSBiYXIuc3R5bGUud2lkdGg7XHJcbiAgICAgICAgbGV0IHN0YXJ0QmFyTGVmdCA9IGJhci5zdHlsZS5sZWZ0O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBkb0RyYWcoZTogYW55KSB7XHJcbiAgICAgICAgICAgIGxldCBjZWxsV2lkdGggPSBnYW50dFNlcnZpY2UuY2VsbFdpZHRoO1xyXG4gICAgICAgICAgICBsZXQgYmFyV2lkdGggPSBzdGFydEJhcldpZHRoIC0gZS5jbGllbnRYICsgc3RhcnRYO1xyXG4gICAgICAgICAgICBsZXQgZGF5cyA9IE1hdGgucm91bmQoYmFyV2lkdGggLyBjZWxsV2lkdGgpO1xyXG5cclxuICAgICAgICAgICAgYmFyLnN0eWxlLndpZHRoID0gZGF5cyAqIGNlbGxXaWR0aCArIGRheXM7XHJcbiAgICAgICAgICAgIGJhci5zdHlsZS5sZWZ0ID0gKHN0YXJ0QmFyTGVmdCAtIChkYXlzICogY2VsbFdpZHRoKSAtIGRheXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hZGRNb3VzZUV2ZW50TGlzdGVuZXJzKGRvRHJhZyk7XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBleHBhbmRSaWdodCgkZXZlbnQ6IGFueSwgYmFyOiBhbnkpIHtcclxuICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgIGxldCBnYW50dFNlcnZpY2UgPSB0aGlzLmdhbnR0U2VydmljZTtcclxuICAgICAgICBsZXQgc3RhcnRYID0gJGV2ZW50LmNsaWVudFg7XHJcbiAgICAgICAgbGV0IHN0YXJ0QmFyV2lkdGggPSBiYXIuc3R5bGUud2lkdGg7XHJcbiAgICAgICAgbGV0IHN0YXJ0QmFyRW5kRGF0ZSA9IGJhci50YXNrLmVuZDtcclxuICAgICAgICBsZXQgc3RhcnRCYXJMZWZ0ID0gYmFyLnN0eWxlLmxlZnQ7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGRvRHJhZyhlOiBhbnkpIHtcclxuICAgICAgICAgICAgbGV0IGNlbGxXaWR0aCA9IGdhbnR0U2VydmljZS5jZWxsV2lkdGg7XHJcbiAgICAgICAgICAgIGxldCBiYXJXaWR0aCA9IHN0YXJ0QmFyV2lkdGggKyBlLmNsaWVudFggLSBzdGFydFg7XHJcbiAgICAgICAgICAgIGxldCBkYXlzID0gTWF0aC5yb3VuZChiYXJXaWR0aCAvIGNlbGxXaWR0aCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoYmFyV2lkdGggPCBjZWxsV2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIGJhcldpZHRoID0gY2VsbFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgZGF5cyA9IE1hdGgucm91bmQoYmFyV2lkdGggLyBjZWxsV2lkdGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJhci5zdHlsZS53aWR0aCA9ICgoZGF5cyAqIGNlbGxXaWR0aCkgKyBkYXlzKTsgLy8gcm91bmRzIHRvIHRoZSBuZWFyZXN0IGNlbGxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYWRkTW91c2VFdmVudExpc3RlbmVycyhkb0RyYWcpO1xyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZSgkZXZlbnQ6IGFueSwgYmFyOiBhbnkpIHtcclxuICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgIGxldCBnYW50dFNlcnZpY2UgPSB0aGlzLmdhbnR0U2VydmljZTtcclxuICAgICAgICBsZXQgc3RhcnRYID0gJGV2ZW50LmNsaWVudFg7XHJcbiAgICAgICAgbGV0IHN0YXJ0QmFyTGVmdCA9IGJhci5zdHlsZS5sZWZ0O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBkb0RyYWcoZTogYW55KSB7XHJcbiAgICAgICAgICAgIGxldCBjZWxsV2lkdGggPSBnYW50dFNlcnZpY2UuY2VsbFdpZHRoO1xyXG4gICAgICAgICAgICBsZXQgYmFyTGVmdCA9IHN0YXJ0QmFyTGVmdCArIGUuY2xpZW50WCAtIHN0YXJ0WDtcclxuICAgICAgICAgICAgbGV0IGRheXMgPSBNYXRoLnJvdW5kKGJhckxlZnQgLyBjZWxsV2lkdGgpO1xyXG5cclxuICAgICAgICAgICAgLy8gVE9ETzogZGV0ZXJtaW5lIGhvdyBtYW55IGRheXMgdGhlIGJhciBjYW4gYmUgbW92ZWRcclxuICAgICAgICAgICAgLy8gaWYgKGRheXMgPCBtYXhEYXlzKSB7XHJcbiAgICAgICAgICAgIGJhci5zdHlsZS5sZWZ0ID0gKChkYXlzICogY2VsbFdpZHRoKSArIGRheXMpOyAvLyByb3VuZGVkIHRvIG5lYXJlc3QgY2VsbFxyXG5cclxuICAgICAgICAgICAgLy8ga2VlcCBiYXIgaW4gYm91bmRzIG9mIGdyaWRcclxuICAgICAgICAgICAgaWYgKGJhckxlZnQgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBiYXIuc3R5bGUubGVmdCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAvLyBUT0RPOiBpdCBuZWVkcyB0byB0YWtlIGludG8gYWNjb3VudCB0aGUgbWF4IG51bWJlciBvZiBkYXlzLlxyXG4gICAgICAgICAgICAvLyBUT0RPOiBpdCBuZWVkcyB0byB0YWtlIGludG8gYWNjb3VudCB0aGUgY3VycmVudCBkYXlzLlxyXG4gICAgICAgICAgICAvLyBUT0RPOiBpdCBuZWVkcyB0byB0YWtlIGludG8gYWNjb3VudCB0aGUgcmlnaHQgYm91bmRhcnkuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFkZE1vdXNlRXZlbnRMaXN0ZW5lcnMoZG9EcmFnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdCYXIodGFzazogYW55LCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHN0eWxlID0ge307XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnpvb21MZXZlbCA9PT0gWm9vbWluZ1tab29taW5nLmhvdXJzXSkge1xyXG4gICAgICAgICAgICBzdHlsZSA9IHRoaXMuZ2FudHRTZXJ2aWNlLmNhbGN1bGF0ZUJhcih0YXNrLCBpbmRleCwgdGhpcy50aW1lU2NhbGUsIHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN0eWxlID0gdGhpcy5nYW50dFNlcnZpY2UuY2FsY3VsYXRlQmFyKHRhc2ssIGluZGV4LCB0aGlzLnRpbWVTY2FsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3UHJvZ3Jlc3ModGFzazogYW55LCBiYXI6IGFueSk6IGFueSB7XHJcbiAgICAgICAgdmFyIGJhclN0eWxlID0gdGhpcy5nYW50dFNlcnZpY2UuZ2V0QmFyUHJvZ3Jlc3NTdHlsZSh0YXNrLnN0YXR1cyk7XHJcbiAgICAgICAgdmFyIHdpZHRoID0gdGhpcy5nYW50dFNlcnZpY2UuY2FsY3VsYXRlQmFyUHJvZ3Jlc3ModGhpcy5nYW50dFNlcnZpY2UuZ2V0Q29tcHV0ZWRTdHlsZShiYXIsICd3aWR0aCcpLCB0YXNrLnBlcmNlbnRDb21wbGV0ZSk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICd3aWR0aCc6IHdpZHRoLFxyXG4gICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IGJhclN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRkTW91c2VFdmVudExpc3RlbmVycyhkcmFnRm46IGFueSkge1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzdG9wRm4oKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBkcmFnRm4sIGZhbHNlKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBzdG9wRm4sIGZhbHNlKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBzdG9wRm4sIGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBkcmFnRm4sIGZhbHNlKTtcclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHN0b3BGbiwgZmFsc2UpO1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgc3RvcEZuLCBmYWxzZSk7XHJcbiAgICB9XHJcbn1cclxuIl19