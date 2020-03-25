/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { GanttService } from '../../shared/services/gantt.service';
var GanttActivityBarsComponent = /** @class */ (function () {
    function GanttActivityBarsComponent(ganttService) {
        this.ganttService = ganttService;
        this.onGridRowClick = new EventEmitter();
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
        this.containerHeight = this.dimensions.height;
        this.containerWidth = this.dimensions.width;
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
        style = this.ganttService.calculateBar(task, index, this.timeScale);
        return style;
    };
    /**
     * @param {?} task
     * @return {?}
     */
    GanttActivityBarsComponent.prototype.toggleChildren = /**
     * @param {?} task
     * @return {?}
     */
    function (task) {
        try {
            this.onGridRowClick.emit(task);
        }
        catch (err) { }
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
                    template: "\n    <div class=\"gantt-activity-bars-area\"\n        [ngStyle]=\"{ 'height': containerHeight + 'px', 'width': containerWidth + 'px' }\">\n\n        <div #bar class=\"gantt-activity-line\"\n            *ngFor=\"let task of tasks; let i = index\" (click)=\"toggleChildren(task)\"\n            [ngStyle]=\"drawBar(task, i)\">\n\n            <div class=\"gantt-activity-content\"></div>\n            <div class=\"gantt-activity-link-control gantt-activity-right\" style=\"height: 26px; line-height: 30px\">\n                <div class=\"gantt-link-point\"></div>\n            </div>\n            <div class=\"gantt-activity-link-control gantt-activity-left\" style=\"height: 26px; line-height: 30px\">\n                <div class=\"gantt-link-point\"></div>\n            </div>\n        </div>\n    </div>\n    ",
                    providers: [
                        GanttService
                    ],
                    styles: ["\n    .gantt-activity-line {\n        /*border-radius: 2px;*/\n        position: absolute;\n        box-sizing: border-box;\n        background-color: rgb(18,195,244);\n        border: 1px solid #2196F3;\n        -webkit-user-select: none;\n    }\n    .gantt-activity-line:hover {\n        cursor: pointer;\n    }\n    .gantt-activity-progress {\n        text-align: center;\n        z-index: 0;\n        background: #2196F3;\n        position: absolute;\n        min-height: 18px;\n        display: block;\n        height: 18px;\n    }\n    .gantt-activity-progress-drag {\n        height: 8px;\n        width: 8px;\n        bottom: -4px;\n        margin-left: 4px;\n        background-position: bottom;\n        background-image: \"\";\n        background-repeat: no-repeat;\n        z-index: 2;\n    }\n    .gantt-activity-content {\n        font-size: 12px;\n        color: #fff;\n        width: 100%;\n        top: 0;\n        position: absolute;\n        white-space: nowrap;\n        text-align: center;\n        line-height: inherit;\n        overflow: hidden;\n        height: 100%;\n    }\n    .gantt-activity-link-control {\n        position: absolute;\n        width: 13px;\n        top: 0;\n    }\n    .gantt-activity-right {\n        right: 0;\n    }\n    .gantt-activity-left {\n        left: 0;\n    }\n    .gantt-activity-right:hover {\n        /*cursor:w-resize;*/\n    }\n    .gantt-activity-left:hover {\n        /*cursor:w-resize;*/\n    }\n    "]
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
        onGridRowClick: [{ type: Output }]
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
    GanttActivityBarsComponent.prototype.onGridRowClick;
    /** @type {?} */
    GanttActivityBarsComponent.prototype.containerHeight;
    /** @type {?} */
    GanttActivityBarsComponent.prototype.containerWidth;
    /** @type {?} */
    GanttActivityBarsComponent.prototype.ganttService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHktYmFycy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWdhbnR0LyIsInNvdXJjZXMiOlsibGliL2FjdGl2aXR5L2JhcnMvYWN0aXZpdHktYmFycy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFjLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0YsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBRW5FO0lBK0ZJLG9DQUFtQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUxuQyxtQkFBYyxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO1FBRXRFLG9CQUFlLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLG1CQUFjLEdBQUcsQ0FBQyxDQUFDO0lBRThCLENBQUM7Ozs7SUFFbEQsNkNBQVE7OztJQUFSO1FBQ0ksSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUM5QyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO0lBQ2hELENBQUM7Ozs7OztJQUVELDRDQUFPOzs7OztJQUFQLFVBQVEsSUFBUyxFQUFFLEtBQWE7O1lBQ3hCLEtBQUssR0FBRyxFQUFFO1FBQ2QsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXBFLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Ozs7O0lBRUQsbURBQWM7Ozs7SUFBZCxVQUFlLElBQVM7UUFDcEIsSUFBSTtZQUNBLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2xDO1FBQUMsT0FBTyxHQUFHLEVBQUUsR0FBRztJQUNyQixDQUFDOzs7Ozs7SUFFTywyREFBc0I7Ozs7O0lBQTlCLFVBQStCLE1BQVc7Ozs7UUFDdEMsU0FBUyxNQUFNO1lBQ1gsUUFBUSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3pFLFFBQVEsQ0FBQyxlQUFlLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN2RSxRQUFRLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDOUUsQ0FBQztRQUVELFFBQVEsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN0RSxRQUFRLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDcEUsUUFBUSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzNFLENBQUM7O2dCQTdISixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFFBQVEsRUFBRSwyeUJBaUJUO29CQThERCxTQUFTLEVBQUU7d0JBQ1AsWUFBWTtxQkFDZjs2QkEvRFEsNDdDQTREUjtpQkFJSjs7OztnQkF0RlEsWUFBWTs7OzRCQXdGaEIsS0FBSzs2QkFDTCxLQUFLO3dCQUNMLEtBQUs7aUNBRUwsTUFBTTs7SUFvQ1gsaUNBQUM7Q0FBQSxBQTlIRCxJQThIQztTQXpDWSwwQkFBMEI7OztJQUNuQywrQ0FBd0I7O0lBQ3hCLGdEQUF5Qjs7SUFDekIsMkNBQW9COztJQUVwQixvREFBc0U7O0lBRXRFLHFEQUFvQjs7SUFDcEIsb0RBQW1COztJQUVQLGtEQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgR2FudHRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2dhbnR0LnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2FjdGl2aXR5LWJhcnMnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJnYW50dC1hY3Rpdml0eS1iYXJzLWFyZWFcIlxyXG4gICAgICAgIFtuZ1N0eWxlXT1cInsgJ2hlaWdodCc6IGNvbnRhaW5lckhlaWdodCArICdweCcsICd3aWR0aCc6IGNvbnRhaW5lcldpZHRoICsgJ3B4JyB9XCI+XHJcblxyXG4gICAgICAgIDxkaXYgI2JhciBjbGFzcz1cImdhbnR0LWFjdGl2aXR5LWxpbmVcIlxyXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgdGFzayBvZiB0YXNrczsgbGV0IGkgPSBpbmRleFwiIChjbGljayk9XCJ0b2dnbGVDaGlsZHJlbih0YXNrKVwiXHJcbiAgICAgICAgICAgIFtuZ1N0eWxlXT1cImRyYXdCYXIodGFzaywgaSlcIj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1hY3Rpdml0eS1jb250ZW50XCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1hY3Rpdml0eS1saW5rLWNvbnRyb2wgZ2FudHQtYWN0aXZpdHktcmlnaHRcIiBzdHlsZT1cImhlaWdodDogMjZweDsgbGluZS1oZWlnaHQ6IDMwcHhcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1saW5rLXBvaW50XCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtYWN0aXZpdHktbGluay1jb250cm9sIGdhbnR0LWFjdGl2aXR5LWxlZnRcIiBzdHlsZT1cImhlaWdodDogMjZweDsgbGluZS1oZWlnaHQ6IDMwcHhcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1saW5rLXBvaW50XCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgc3R5bGVzOiBbYFxyXG4gICAgLmdhbnR0LWFjdGl2aXR5LWxpbmUge1xyXG4gICAgICAgIC8qYm9yZGVyLXJhZGl1czogMnB4OyovXHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE4LDE5NSwyNDQpO1xyXG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICMyMTk2RjM7XHJcbiAgICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcclxuICAgIH1cclxuICAgIC5nYW50dC1hY3Rpdml0eS1saW5lOmhvdmVyIHtcclxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICB9XHJcbiAgICAuZ2FudHQtYWN0aXZpdHktcHJvZ3Jlc3Mge1xyXG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICB6LWluZGV4OiAwO1xyXG4gICAgICAgIGJhY2tncm91bmQ6ICMyMTk2RjM7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIG1pbi1oZWlnaHQ6IDE4cHg7XHJcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgaGVpZ2h0OiAxOHB4O1xyXG4gICAgfVxyXG4gICAgLmdhbnR0LWFjdGl2aXR5LXByb2dyZXNzLWRyYWcge1xyXG4gICAgICAgIGhlaWdodDogOHB4O1xyXG4gICAgICAgIHdpZHRoOiA4cHg7XHJcbiAgICAgICAgYm90dG9tOiAtNHB4O1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiA0cHg7XHJcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogYm90dG9tO1xyXG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IFwiXCI7XHJcbiAgICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcclxuICAgICAgICB6LWluZGV4OiAyO1xyXG4gICAgfVxyXG4gICAgLmdhbnR0LWFjdGl2aXR5LWNvbnRlbnQge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgICAgICBjb2xvcjogI2ZmZjtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICB0b3A6IDA7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xyXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgfVxyXG4gICAgLmdhbnR0LWFjdGl2aXR5LWxpbmstY29udHJvbCB7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIHdpZHRoOiAxM3B4O1xyXG4gICAgICAgIHRvcDogMDtcclxuICAgIH1cclxuICAgIC5nYW50dC1hY3Rpdml0eS1yaWdodCB7XHJcbiAgICAgICAgcmlnaHQ6IDA7XHJcbiAgICB9XHJcbiAgICAuZ2FudHQtYWN0aXZpdHktbGVmdCB7XHJcbiAgICAgICAgbGVmdDogMDtcclxuICAgIH1cclxuICAgIC5nYW50dC1hY3Rpdml0eS1yaWdodDpob3ZlciB7XHJcbiAgICAgICAgLypjdXJzb3I6dy1yZXNpemU7Ki9cclxuICAgIH1cclxuICAgIC5nYW50dC1hY3Rpdml0eS1sZWZ0OmhvdmVyIHtcclxuICAgICAgICAvKmN1cnNvcjp3LXJlc2l6ZTsqL1xyXG4gICAgfVxyXG4gICAgYF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBHYW50dFNlcnZpY2VcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEdhbnR0QWN0aXZpdHlCYXJzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIEBJbnB1dCgpIHRpbWVTY2FsZTogYW55O1xyXG4gICAgQElucHV0KCkgZGltZW5zaW9uczogYW55O1xyXG4gICAgQElucHV0KCkgdGFza3M6IGFueTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25HcmlkUm93Q2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gICAgY29udGFpbmVySGVpZ2h0ID0gMDtcclxuICAgIGNvbnRhaW5lcldpZHRoID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZ2FudHRTZXJ2aWNlOiBHYW50dFNlcnZpY2UpIHsgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVySGVpZ2h0ID0gdGhpcy5kaW1lbnNpb25zLmhlaWdodDtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lcldpZHRoID0gdGhpcy5kaW1lbnNpb25zLndpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdCYXIodGFzazogYW55LCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHN0eWxlID0ge307XHJcbiAgICAgICAgc3R5bGUgPSB0aGlzLmdhbnR0U2VydmljZS5jYWxjdWxhdGVCYXIodGFzaywgaW5kZXgsIHRoaXMudGltZVNjYWxlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZUNoaWxkcmVuKHRhc2s6IGFueSkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMub25HcmlkUm93Q2xpY2suZW1pdCh0YXNrKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHsgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRkTW91c2VFdmVudExpc3RlbmVycyhkcmFnRm46IGFueSkge1xyXG4gICAgICAgIGZ1bmN0aW9uIHN0b3BGbigpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGRyYWdGbiwgZmFsc2UpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHN0b3BGbiwgZmFsc2UpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHN0b3BGbiwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGRyYWdGbiwgZmFsc2UpO1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgc3RvcEZuLCBmYWxzZSk7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBzdG9wRm4sIGZhbHNlKTtcclxuICAgIH1cclxufVxyXG4iXX0=