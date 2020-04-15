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
        this.onPopoverOpen = new EventEmitter();
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
    GanttActivityBarsComponent.prototype.gridRowClicked = /**
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
     * @param {?} task
     * @return {?}
     */
    GanttActivityBarsComponent.prototype.popoverOpened = /**
     * @param {?} task
     * @return {?}
     */
    function (task) {
        try {
            this.onPopoverOpen.emit(task);
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
                    template: "\n    <div class=\"gantt-activity-bars-area\"\n        [ngStyle]=\"{ 'height': containerHeight + 'px', 'width': containerWidth + 'px' }\">\n\n        <div #bar class=\"gantt-activity-line\"\n            *ngFor=\"let task of tasks; let i = index\" (click)=\"gridRowClicked(task)\"\n            [ngStyle]=\"drawBar(task, i)\">\n\n            <div #popoverTrigger=\"mdePopoverTrigger\"\n                [mdePopoverTriggerFor]=\"taskPopover\"\n                [mdePopoverBackdropCloseOnClick]=\"false\"\n                mdePopoverOffsetX=\"-15\"\n                mdePopoverOffsetY=\"0\"\n                (opened)=\"popoverOpened(task)\">\n\n                <mde-popover #taskPopover=\"mdePopover\"\n                    [mdePopoverEnterDelay]=\"100\"\n                    [mdePopoverLeaveDelay]=\"0\"\n                    [mdePopoverPositionY]=\"'above'\"\n                    [mdePopoverOverlapTrigger]=\"false\"\n                    [mdePopoverDisableAnimation]=\"false\"\n                    [mdeFocusTrapEnabled]=\"false\"\n                    [mdePopoverArrowWidth]=\"12\"\n                    [mdePopoverArrowColor]=\"task.color?.primary\"\n                    mdePopoverPlacement=\"bottom\">\n\n                    <ng-container *ngTemplateOutlet=\"templatePopoverTask; context: {task: task}\"></ng-container>\n                </mde-popover>\n\n                <div class=\"gantt-activity-content\"></div>\n                <div class=\"gantt-activity-link-control gantt-activity-right\" style=\"height: 26px; line-height: 30px\">\n                    <div class=\"gantt-link-point\"></div>\n                </div>\n                <div class=\"gantt-activity-link-control gantt-activity-left\" style=\"height: 26px; line-height: 30px\">\n                    <div class=\"gantt-link-point\"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <ng-template #templatePopoverTask let-data=\"task\">\n        <mat-card *ngIf=\"data\" class=\"mat-elevation-z6\" \n            [ngStyle]=\"{ \n                borderBottomColor: data.color?.primary,\n                borderBottomWidth: '.25em',\n                borderBottomStyle: 'solid' \n            }\" style=\"width: 320px; max-width: 320px;\">\n\n            <mat-card-header>\n                <div mat-card-avatar [ngStyle]=\"{ borderColor: data.color?.primary }\" style=\"width: 0; height: unset; margin-bottom: .7em; border-radius: 0; border-style: solid;\"></div>\n                <mat-card-title>\n                    <span style=\"font-size: 80%;\">{{data.name}}</span>\n                </mat-card-title>\n                <mat-card-subtitle>\n                    <span>{{data.start | date:'yyyy-MM-dd'}} - {{data.end | date:'yyyy-MM-dd'}}</span>\n                </mat-card-subtitle>\n                <mat-card-subtitle>\n                    <span style=\"padding-left: .75em; padding-right: 1em; font-stretch: condensed;\">&#x336;</span>\n                    <span>{{data.resource}}</span>\n                </mat-card-subtitle>\n            </mat-card-header>\n            <mat-card-content>\n                <footer *ngIf=\"data.description\">\n                    <span [innerHTML]=\"data.description\"></span>\n                </footer>\n            </mat-card-content>\n        </mat-card>\n    </ng-template>\n    ",
                    providers: [
                        GanttService
                    ],
                    styles: ["\n    .gantt-activity-line {\n        /*border-radius: 2px;*/\n        position: absolute;\n        box-sizing: border-box;\n        -webkit-user-select: none;\n    }\n    .gantt-activity-line:hover {\n        cursor: pointer;\n    }\n    .gantt-activity-content {\n        font-size: 12px;\n        color: #fff;\n        width: 100%;\n        top: 0;\n        position: absolute;\n        white-space: nowrap;\n        text-align: center;\n        line-height: inherit;\n        overflow: hidden;\n        height: 100%;\n    }\n    .gantt-activity-link-control {\n        position: absolute;\n        width: 13px;\n        top: 0;\n    }\n    .gantt-activity-right {\n        right: 0;\n    }\n    .gantt-activity-left {\n        left: 0;\n    }\n    .gantt-activity-right:hover {\n        /*cursor:w-resize;*/\n    }\n    .gantt-activity-left:hover {\n        /*cursor:w-resize;*/\n    }\n    "]
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
        onGridRowClick: [{ type: Output }],
        onPopoverOpen: [{ type: Output }]
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
    GanttActivityBarsComponent.prototype.onPopoverOpen;
    /** @type {?} */
    GanttActivityBarsComponent.prototype.containerHeight;
    /** @type {?} */
    GanttActivityBarsComponent.prototype.containerWidth;
    /** @type {?} */
    GanttActivityBarsComponent.prototype.ganttService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHktYmFycy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWdhbnR0LyIsInNvdXJjZXMiOlsibGliL2FjdGl2aXR5L2JhcnMvYWN0aXZpdHktYmFycy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFjLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0YsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBRW5FO0lBOEhJLG9DQUFtQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQU5uQyxtQkFBYyxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzVELGtCQUFhLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFFckUsb0JBQWUsR0FBRyxDQUFDLENBQUM7UUFDcEIsbUJBQWMsR0FBRyxDQUFDLENBQUM7SUFFOEIsQ0FBQzs7OztJQUVsRCw2Q0FBUTs7O0lBQVI7UUFDSSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQzlDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7SUFDaEQsQ0FBQzs7Ozs7O0lBRUQsNENBQU87Ozs7O0lBQVAsVUFBUSxJQUFTLEVBQUUsS0FBYTs7WUFDeEIsS0FBSyxHQUFHLEVBQUU7UUFDZCxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFcEUsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7Ozs7SUFFRCxtREFBYzs7OztJQUFkLFVBQWUsSUFBUztRQUNwQixJQUFJO1lBQ0EsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbEM7UUFBQyxPQUFPLEdBQUcsRUFBRSxHQUFHO0lBQ3JCLENBQUM7Ozs7O0lBRUQsa0RBQWE7Ozs7SUFBYixVQUFjLElBQVM7UUFDbkIsSUFBSTtZQUNBLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pDO1FBQUMsT0FBTyxHQUFHLEVBQUUsR0FBRztJQUNyQixDQUFDOzs7Ozs7SUFFTywyREFBc0I7Ozs7O0lBQTlCLFVBQStCLE1BQVc7Ozs7UUFDdEMsU0FBUyxNQUFNO1lBQ1gsUUFBUSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3pFLFFBQVEsQ0FBQyxlQUFlLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN2RSxRQUFRLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDOUUsQ0FBQztRQUVELFFBQVEsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN0RSxRQUFRLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDcEUsUUFBUSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzNFLENBQUM7O2dCQWxLSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFFBQVEsRUFBRSxndkdBb0VUO29CQXlDRCxTQUFTLEVBQUU7d0JBQ1AsWUFBWTtxQkFDZjs2QkExQ1EsaTRCQXVDUjtpQkFJSjs7OztnQkFwSFEsWUFBWTs7OzRCQXNIaEIsS0FBSzs2QkFDTCxLQUFLO3dCQUNMLEtBQUs7aUNBRUwsTUFBTTtnQ0FDTixNQUFNOztJQTBDWCxpQ0FBQztDQUFBLEFBbktELElBbUtDO1NBaERZLDBCQUEwQjs7O0lBQ25DLCtDQUF3Qjs7SUFDeEIsZ0RBQXlCOztJQUN6QiwyQ0FBb0I7O0lBRXBCLG9EQUFzRTs7SUFDdEUsbURBQXFFOztJQUVyRSxxREFBb0I7O0lBQ3BCLG9EQUFtQjs7SUFFUCxrREFBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEdhbnR0U2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9nYW50dC5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdhY3Rpdml0eS1iYXJzJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtYWN0aXZpdHktYmFycy1hcmVhXCJcclxuICAgICAgICBbbmdTdHlsZV09XCJ7ICdoZWlnaHQnOiBjb250YWluZXJIZWlnaHQgKyAncHgnLCAnd2lkdGgnOiBjb250YWluZXJXaWR0aCArICdweCcgfVwiPlxyXG5cclxuICAgICAgICA8ZGl2ICNiYXIgY2xhc3M9XCJnYW50dC1hY3Rpdml0eS1saW5lXCJcclxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IHRhc2sgb2YgdGFza3M7IGxldCBpID0gaW5kZXhcIiAoY2xpY2spPVwiZ3JpZFJvd0NsaWNrZWQodGFzaylcIlxyXG4gICAgICAgICAgICBbbmdTdHlsZV09XCJkcmF3QmFyKHRhc2ssIGkpXCI+XHJcblxyXG4gICAgICAgICAgICA8ZGl2ICNwb3BvdmVyVHJpZ2dlcj1cIm1kZVBvcG92ZXJUcmlnZ2VyXCJcclxuICAgICAgICAgICAgICAgIFttZGVQb3BvdmVyVHJpZ2dlckZvcl09XCJ0YXNrUG9wb3ZlclwiXHJcbiAgICAgICAgICAgICAgICBbbWRlUG9wb3ZlckJhY2tkcm9wQ2xvc2VPbkNsaWNrXT1cImZhbHNlXCJcclxuICAgICAgICAgICAgICAgIG1kZVBvcG92ZXJPZmZzZXRYPVwiLTE1XCJcclxuICAgICAgICAgICAgICAgIG1kZVBvcG92ZXJPZmZzZXRZPVwiMFwiXHJcbiAgICAgICAgICAgICAgICAob3BlbmVkKT1cInBvcG92ZXJPcGVuZWQodGFzaylcIj5cclxuXHJcbiAgICAgICAgICAgICAgICA8bWRlLXBvcG92ZXIgI3Rhc2tQb3BvdmVyPVwibWRlUG9wb3ZlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgW21kZVBvcG92ZXJFbnRlckRlbGF5XT1cIjEwMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgW21kZVBvcG92ZXJMZWF2ZURlbGF5XT1cIjBcIlxyXG4gICAgICAgICAgICAgICAgICAgIFttZGVQb3BvdmVyUG9zaXRpb25ZXT1cIidhYm92ZSdcIlxyXG4gICAgICAgICAgICAgICAgICAgIFttZGVQb3BvdmVyT3ZlcmxhcFRyaWdnZXJdPVwiZmFsc2VcIlxyXG4gICAgICAgICAgICAgICAgICAgIFttZGVQb3BvdmVyRGlzYWJsZUFuaW1hdGlvbl09XCJmYWxzZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgW21kZUZvY3VzVHJhcEVuYWJsZWRdPVwiZmFsc2VcIlxyXG4gICAgICAgICAgICAgICAgICAgIFttZGVQb3BvdmVyQXJyb3dXaWR0aF09XCIxMlwiXHJcbiAgICAgICAgICAgICAgICAgICAgW21kZVBvcG92ZXJBcnJvd0NvbG9yXT1cInRhc2suY29sb3I/LnByaW1hcnlcIlxyXG4gICAgICAgICAgICAgICAgICAgIG1kZVBvcG92ZXJQbGFjZW1lbnQ9XCJib3R0b21cIj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlUG9wb3ZlclRhc2s7IGNvbnRleHQ6IHt0YXNrOiB0YXNrfVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgPC9tZGUtcG9wb3Zlcj5cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FudHQtYWN0aXZpdHktY29udGVudFwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbnR0LWFjdGl2aXR5LWxpbmstY29udHJvbCBnYW50dC1hY3Rpdml0eS1yaWdodFwiIHN0eWxlPVwiaGVpZ2h0OiAyNnB4OyBsaW5lLWhlaWdodDogMzBweFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1saW5rLXBvaW50XCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1hY3Rpdml0eS1saW5rLWNvbnRyb2wgZ2FudHQtYWN0aXZpdHktbGVmdFwiIHN0eWxlPVwiaGVpZ2h0OiAyNnB4OyBsaW5lLWhlaWdodDogMzBweFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW50dC1saW5rLXBvaW50XCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8bmctdGVtcGxhdGUgI3RlbXBsYXRlUG9wb3ZlclRhc2sgbGV0LWRhdGE9XCJ0YXNrXCI+XHJcbiAgICAgICAgPG1hdC1jYXJkICpuZ0lmPVwiZGF0YVwiIGNsYXNzPVwibWF0LWVsZXZhdGlvbi16NlwiIFxyXG4gICAgICAgICAgICBbbmdTdHlsZV09XCJ7IFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyQm90dG9tQ29sb3I6IGRhdGEuY29sb3I/LnByaW1hcnksXHJcbiAgICAgICAgICAgICAgICBib3JkZXJCb3R0b21XaWR0aDogJy4yNWVtJyxcclxuICAgICAgICAgICAgICAgIGJvcmRlckJvdHRvbVN0eWxlOiAnc29saWQnIFxyXG4gICAgICAgICAgICB9XCIgc3R5bGU9XCJ3aWR0aDogMzIwcHg7IG1heC13aWR0aDogMzIwcHg7XCI+XHJcblxyXG4gICAgICAgICAgICA8bWF0LWNhcmQtaGVhZGVyPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBtYXQtY2FyZC1hdmF0YXIgW25nU3R5bGVdPVwieyBib3JkZXJDb2xvcjogZGF0YS5jb2xvcj8ucHJpbWFyeSB9XCIgc3R5bGU9XCJ3aWR0aDogMDsgaGVpZ2h0OiB1bnNldDsgbWFyZ2luLWJvdHRvbTogLjdlbTsgYm9yZGVyLXJhZGl1czogMDsgYm9yZGVyLXN0eWxlOiBzb2xpZDtcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxtYXQtY2FyZC10aXRsZT5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT1cImZvbnQtc2l6ZTogODAlO1wiPnt7ZGF0YS5uYW1lfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L21hdC1jYXJkLXRpdGxlPlxyXG4gICAgICAgICAgICAgICAgPG1hdC1jYXJkLXN1YnRpdGxlPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7ZGF0YS5zdGFydCB8IGRhdGU6J3l5eXktTU0tZGQnfX0gLSB7e2RhdGEuZW5kIHwgZGF0ZToneXl5eS1NTS1kZCd9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvbWF0LWNhcmQtc3VidGl0bGU+XHJcbiAgICAgICAgICAgICAgICA8bWF0LWNhcmQtc3VidGl0bGU+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9XCJwYWRkaW5nLWxlZnQ6IC43NWVtOyBwYWRkaW5nLXJpZ2h0OiAxZW07IGZvbnQtc3RyZXRjaDogY29uZGVuc2VkO1wiPiYjeDMzNjs8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3tkYXRhLnJlc291cmNlfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L21hdC1jYXJkLXN1YnRpdGxlPlxyXG4gICAgICAgICAgICA8L21hdC1jYXJkLWhlYWRlcj5cclxuICAgICAgICAgICAgPG1hdC1jYXJkLWNvbnRlbnQ+XHJcbiAgICAgICAgICAgICAgICA8Zm9vdGVyICpuZ0lmPVwiZGF0YS5kZXNjcmlwdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIFtpbm5lckhUTUxdPVwiZGF0YS5kZXNjcmlwdGlvblwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZm9vdGVyPlxyXG4gICAgICAgICAgICA8L21hdC1jYXJkLWNvbnRlbnQ+XHJcbiAgICAgICAgPC9tYXQtY2FyZD5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICBgLFxyXG4gICAgc3R5bGVzOiBbYFxyXG4gICAgLmdhbnR0LWFjdGl2aXR5LWxpbmUge1xyXG4gICAgICAgIC8qYm9yZGVyLXJhZGl1czogMnB4OyovXHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcclxuICAgIH1cclxuICAgIC5nYW50dC1hY3Rpdml0eS1saW5lOmhvdmVyIHtcclxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICB9XHJcbiAgICAuZ2FudHQtYWN0aXZpdHktY29udGVudCB7XHJcbiAgICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIHRvcDogMDtcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7XHJcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICB9XHJcbiAgICAuZ2FudHQtYWN0aXZpdHktbGluay1jb250cm9sIHtcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgd2lkdGg6IDEzcHg7XHJcbiAgICAgICAgdG9wOiAwO1xyXG4gICAgfVxyXG4gICAgLmdhbnR0LWFjdGl2aXR5LXJpZ2h0IHtcclxuICAgICAgICByaWdodDogMDtcclxuICAgIH1cclxuICAgIC5nYW50dC1hY3Rpdml0eS1sZWZ0IHtcclxuICAgICAgICBsZWZ0OiAwO1xyXG4gICAgfVxyXG4gICAgLmdhbnR0LWFjdGl2aXR5LXJpZ2h0OmhvdmVyIHtcclxuICAgICAgICAvKmN1cnNvcjp3LXJlc2l6ZTsqL1xyXG4gICAgfVxyXG4gICAgLmdhbnR0LWFjdGl2aXR5LWxlZnQ6aG92ZXIge1xyXG4gICAgICAgIC8qY3Vyc29yOnctcmVzaXplOyovXHJcbiAgICB9XHJcbiAgICBgXSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIEdhbnR0U2VydmljZVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR2FudHRBY3Rpdml0eUJhcnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgQElucHV0KCkgdGltZVNjYWxlOiBhbnk7XHJcbiAgICBASW5wdXQoKSBkaW1lbnNpb25zOiBhbnk7XHJcbiAgICBASW5wdXQoKSB0YXNrczogYW55O1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbkdyaWRSb3dDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAgIEBPdXRwdXQoKSBvblBvcG92ZXJPcGVuOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICAgIGNvbnRhaW5lckhlaWdodCA9IDA7XHJcbiAgICBjb250YWluZXJXaWR0aCA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGdhbnR0U2VydmljZTogR2FudHRTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lckhlaWdodCA9IHRoaXMuZGltZW5zaW9ucy5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXJXaWR0aCA9IHRoaXMuZGltZW5zaW9ucy53aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3QmFyKHRhc2s6IGFueSwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBzdHlsZSA9IHt9O1xyXG4gICAgICAgIHN0eWxlID0gdGhpcy5nYW50dFNlcnZpY2UuY2FsY3VsYXRlQmFyKHRhc2ssIGluZGV4LCB0aGlzLnRpbWVTY2FsZSk7XHJcblxyXG4gICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgIH1cclxuXHJcbiAgICBncmlkUm93Q2xpY2tlZCh0YXNrOiBhbnkpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLm9uR3JpZFJvd0NsaWNrLmVtaXQodGFzayk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7IH1cclxuICAgIH1cclxuXHJcbiAgICBwb3BvdmVyT3BlbmVkKHRhc2s6IGFueSkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMub25Qb3BvdmVyT3Blbi5lbWl0KHRhc2spO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikgeyB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRNb3VzZUV2ZW50TGlzdGVuZXJzKGRyYWdGbjogYW55KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gc3RvcEZuKCkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZHJhZ0ZuLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgc3RvcEZuLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgc3RvcEZuLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZHJhZ0ZuLCBmYWxzZSk7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBzdG9wRm4sIGZhbHNlKTtcclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHN0b3BGbiwgZmFsc2UpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==