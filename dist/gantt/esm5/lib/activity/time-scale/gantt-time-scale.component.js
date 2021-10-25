import { Component, Input } from '@angular/core';
import { GanttService } from '../../shared/services/gantt.service';
import * as i0 from "@angular/core";
import * as i1 from "../../shared/services/gantt.service";
import * as i2 from "@angular/common";
function GanttTimeScaleComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var date_r2 = ctx.$implicit;
    var i_r3 = ctx.index;
    var ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", i_r3 % 2 ? "weekend" : "")("ngStyle", ctx_r0.setTimescaleWeekendCellStyle());
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 3, date_r2, "dd-MM"));
} }
function GanttTimeScaleComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var i_r5 = ctx.index;
    var ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", i_r5 % 2 ? "weekend" : "")("ngStyle", ctx_r1.setTimescaleWeekendCellStyle());
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i_r5 + 1);
} }
var GanttTimeScaleComponent = /** @class */ (function () {
    function GanttTimeScaleComponent(ganttService) {
        this.ganttService = ganttService;
    }
    GanttTimeScaleComponent.prototype.ngOnInit = function () {
    };
    GanttTimeScaleComponent.prototype.setTimescaleStyle = function () {
        return {
            'width': (this.dimensions.width + 36) + 'px'
        };
    };
    GanttTimeScaleComponent.prototype.setTimescaleMonthLineStyle = function (borderTop) {
        return {
            'height': this.ganttService.rowHeight + 'px',
            'line-height': this.ganttService.rowHeight + 'px',
            'position': 'relative',
            'border-top': borderTop
        };
    };
    GanttTimeScaleComponent.prototype.setTimescaleMonthCellStyle = function () {
        return {
            'width': this.ganttService.cellWidth + 'px'
        };
    };
    GanttTimeScaleComponent.prototype.setTimescaleWeekendLineStyle = function (borderTop) {
        return {
            'height': this.ganttService.rowHeight + 'px',
            'line-height': this.ganttService.rowHeight + 'px',
            'position': 'relative',
            'border-top': borderTop
        };
    };
    GanttTimeScaleComponent.prototype.setTimescaleWeekendCellStyle = function () {
        return {
            'width': this.ganttService.cellWidth + 'px'
        };
    };
    GanttTimeScaleComponent.prototype.isDayWeekend = function (date) {
        return this.ganttService.isDayWeekend(date);
    };
    /** @nocollapse */ GanttTimeScaleComponent.ɵfac = function GanttTimeScaleComponent_Factory(t) { return new (t || GanttTimeScaleComponent)(i0.ɵɵdirectiveInject(i1.GanttService)); };
    /** @nocollapse */ GanttTimeScaleComponent.ɵcmp = i0.ɵɵdefineComponent({ type: GanttTimeScaleComponent, selectors: [["time-scale"]], inputs: { timeScaleMonth: "timeScaleMonth", timeScaleWeekend: "timeScaleWeekend", dimensions: "dimensions", scale: "scale" }, features: [i0.ɵɵProvidersFeature([
                GanttService
            ])], decls: 5, vars: 5, consts: [[1, "time-scale", 3, "ngStyle"], [1, "time-scale-line", 3, "ngStyle"], ["class", "time-scale-cell", 3, "ngClass", "ngStyle", 4, "ngFor", "ngForOf"], [1, "time-scale-cell", 3, "ngClass", "ngStyle"]], template: function GanttTimeScaleComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelementStart(1, "div", 1);
            i0.ɵɵtemplate(2, GanttTimeScaleComponent_div_2_Template, 3, 6, "div", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "div", 1);
            i0.ɵɵtemplate(4, GanttTimeScaleComponent_div_4_Template, 2, 3, "div", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵproperty("ngStyle", ctx.setTimescaleStyle());
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngStyle", ctx.setTimescaleWeekendLineStyle("none"));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx.timeScaleWeekend);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngStyle", ctx.setTimescaleWeekendLineStyle("none"));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx.timeScaleWeekend);
        } }, directives: [i2.NgStyle, i2.NgForOf, i2.NgClass], pipes: [i2.DatePipe], styles: [".weekend[_ngcontent-%COMP%] {\n            background-color: whitesmoke;\n        }\n        .time-scale[_ngcontent-%COMP%] {\n            font-size: 12px;\n            background-color: #fff;\n            border-bottom: 1px solid #cecece;\n        }\n        .time-scale-line[_ngcontent-%COMP%] {\n            box-sizing: border-box;\n            border-bottom: 1px solid #cecece;\n        }\n        .time-scale-line[_ngcontent-%COMP%]:first-child {\n            border-top: none;\n        }\n        .time-scale-cell[_ngcontent-%COMP%] {\n            display: inline-block;\n            white-space: nowrap;\n            overflow: hidden;\n            border-right: 1px solid #cecece;\n            text-align: center;\n            height: 100%;\n        }"] });
    return GanttTimeScaleComponent;
}());
export { GanttTimeScaleComponent };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(GanttTimeScaleComponent, [{
        type: Component,
        args: [{
                selector: 'time-scale',
                template: "\n        <div class=\"time-scale\" [ngStyle]=\"setTimescaleStyle()\">\n            <!--<div class=\"time-scale-line\" [ngStyle]=\"setTimescaleMonthLineStyle('none')\">\n                <div class=\"time-scale-cell\" *ngFor=\"let scale of timeScaleMonth; let i = index\"\n                    [ngClass]=\"(i % 2) ? 'weekend' : ''\" [style.width.px]=\"scale.width\">{{scale.start | date: 'dd-MM'}}</div>\n            </div>-->\n            <div class=\"time-scale-line\" [ngStyle]=\"setTimescaleWeekendLineStyle('none')\">\n                <div class=\"time-scale-cell\" *ngFor=\"let date of timeScaleWeekend; let i = index\"\n                    [ngClass]=\"(i % 2) ? 'weekend' : ''\" [ngStyle]=\"setTimescaleWeekendCellStyle()\">{{date | date: 'dd-MM'}}</div>\n            </div>\n            <div class=\"time-scale-line\" [ngStyle]=\"setTimescaleWeekendLineStyle('none')\">\n                <div class=\"time-scale-cell\" *ngFor=\"let date of timeScaleWeekend; let i = index\"\n                [ngClass]=\"(i % 2) ? 'weekend' : ''\" [ngStyle]=\"setTimescaleWeekendCellStyle()\">{{i + 1}}</div>\n            </div>\n        </div>",
                styles: ["\n        .weekend {\n            background-color: whitesmoke;\n        }\n        .time-scale {\n            font-size: 12px;\n            background-color: #fff;\n            border-bottom: 1px solid #cecece;\n        }\n        .time-scale-line {\n            box-sizing: border-box;\n            border-bottom: 1px solid #cecece;\n        }\n        .time-scale-line:first-child {\n            border-top: none;\n        }\n        .time-scale-cell {\n            display: inline-block;\n            white-space: nowrap;\n            overflow: hidden;\n            border-right: 1px solid #cecece;\n            text-align: center;\n            height: 100%;\n        }"
                ],
                providers: [
                    GanttService
                ]
            }]
    }], function () { return [{ type: i1.GanttService }]; }, { timeScaleMonth: [{
            type: Input
        }], timeScaleWeekend: [{
            type: Input
        }], dimensions: [{
            type: Input
        }], scale: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQtdGltZS1zY2FsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWdhbnR0LyIsInNvdXJjZXMiOlsibGliL2FjdGl2aXR5L3RpbWUtc2NhbGUvZ2FudHQtdGltZS1zY2FsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFDQUFxQyxDQUFDOzs7OztJQVluRCw4QkFDb0Y7SUFBQSxZQUF3Qjs7SUFBQSxpQkFBTTs7Ozs7SUFBOUcsbURBQW9DLGtEQUFBO0lBQTRDLGVBQXdCO0lBQXhCLDREQUF3Qjs7O0lBRzVHLDhCQUNnRjtJQUFBLFlBQVM7SUFBQSxpQkFBTTs7OztJQUEvRixtREFBb0Msa0RBQUE7SUFBNEMsZUFBUztJQUFULDhCQUFTOztBQWR6RztJQW9ESSxpQ0FBbUIsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7SUFBSSxDQUFDO0lBRWxELDBDQUFRLEdBQVI7SUFDQSxDQUFDO0lBRUQsbURBQWlCLEdBQWpCO1FBQ0ksT0FBTztZQUNILE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxHQUFHLElBQUk7U0FDL0MsQ0FBQztJQUNOLENBQUM7SUFFRCw0REFBMEIsR0FBMUIsVUFBMkIsU0FBaUI7UUFDeEMsT0FBTztZQUNILFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJO1lBQzVDLGFBQWEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJO1lBQ2pELFVBQVUsRUFBRSxVQUFVO1lBQ3RCLFlBQVksRUFBRSxTQUFTO1NBQzFCLENBQUM7SUFDTixDQUFDO0lBRUQsNERBQTBCLEdBQTFCO1FBQ0ksT0FBTztZQUNILE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJO1NBQzlDLENBQUM7SUFDTixDQUFDO0lBRUQsOERBQTRCLEdBQTVCLFVBQTZCLFNBQWlCO1FBQzFDLE9BQU87WUFDSCxRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSTtZQUM1QyxhQUFhLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSTtZQUNqRCxVQUFVLEVBQUUsVUFBVTtZQUN0QixZQUFZLEVBQUUsU0FBUztTQUMxQixDQUFDO0lBQ04sQ0FBQztJQUVELDhEQUE0QixHQUE1QjtRQUNJLE9BQU87WUFDSCxPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSTtTQUM5QyxDQUFDO0lBQ04sQ0FBQztJQUVELDhDQUFZLEdBQVosVUFBYSxJQUFVO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQztxSEFqRFEsdUJBQXVCO21GQUF2Qix1QkFBdUIsOExBSnJCO2dCQUNQLFlBQVk7YUFDZjtZQXpDRyw4QkFDSTtZQUlBLDhCQUNJO1lBQUEsd0VBQ29GO1lBQ3hGLGlCQUFNO1lBQ04sOEJBQ0k7WUFBQSx3RUFDZ0Y7WUFDcEYsaUJBQU07WUFDVixpQkFBTTs7WUFia0IsaURBQStCO1lBS3RCLGVBQWdEO1lBQWhELGtFQUFnRDtZQUM1QyxlQUFvRDtZQUFwRCw4Q0FBb0Q7WUFHeEQsZUFBZ0Q7WUFBaEQsa0VBQWdEO1lBQzVDLGVBQW9EO1lBQXBELDhDQUFvRDs7a0NBakJqRztDQW9HQyxBQWhHRCxJQWdHQztTQWxEWSx1QkFBdUI7a0RBQXZCLHVCQUF1QjtjQTlDbkMsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxZQUFZO2dCQUN0QixRQUFRLEVBQUUsNm1DQWNDO2dCQUNYLE1BQU0sRUFBRSxDQUFDLG1xQkF1Qkg7aUJBQ0w7Z0JBQ0QsU0FBUyxFQUFFO29CQUNQLFlBQVk7aUJBQ2Y7YUFDSjs7a0JBRUksS0FBSzs7a0JBQ0wsS0FBSzs7a0JBQ0wsS0FBSzs7a0JBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBHYW50dFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvZ2FudHQuc2VydmljZSc7XHJcbmltcG9ydCB7IElTY2FsZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICd0aW1lLXNjYWxlJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRpbWUtc2NhbGVcIiBbbmdTdHlsZV09XCJzZXRUaW1lc2NhbGVTdHlsZSgpXCI+XHJcbiAgICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVwidGltZS1zY2FsZS1saW5lXCIgW25nU3R5bGVdPVwic2V0VGltZXNjYWxlTW9udGhMaW5lU3R5bGUoJ25vbmUnKVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpbWUtc2NhbGUtY2VsbFwiICpuZ0Zvcj1cImxldCBzY2FsZSBvZiB0aW1lU2NhbGVNb250aDsgbGV0IGkgPSBpbmRleFwiXHJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiKGkgJSAyKSA/ICd3ZWVrZW5kJyA6ICcnXCIgW3N0eWxlLndpZHRoLnB4XT1cInNjYWxlLndpZHRoXCI+e3tzY2FsZS5zdGFydCB8IGRhdGU6ICdkZC1NTSd9fTwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj4tLT5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpbWUtc2NhbGUtbGluZVwiIFtuZ1N0eWxlXT1cInNldFRpbWVzY2FsZVdlZWtlbmRMaW5lU3R5bGUoJ25vbmUnKVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpbWUtc2NhbGUtY2VsbFwiICpuZ0Zvcj1cImxldCBkYXRlIG9mIHRpbWVTY2FsZVdlZWtlbmQ7IGxldCBpID0gaW5kZXhcIlxyXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIihpICUgMikgPyAnd2Vla2VuZCcgOiAnJ1wiIFtuZ1N0eWxlXT1cInNldFRpbWVzY2FsZVdlZWtlbmRDZWxsU3R5bGUoKVwiPnt7ZGF0ZSB8IGRhdGU6ICdkZC1NTSd9fTwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpbWUtc2NhbGUtbGluZVwiIFtuZ1N0eWxlXT1cInNldFRpbWVzY2FsZVdlZWtlbmRMaW5lU3R5bGUoJ25vbmUnKVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpbWUtc2NhbGUtY2VsbFwiICpuZ0Zvcj1cImxldCBkYXRlIG9mIHRpbWVTY2FsZVdlZWtlbmQ7IGxldCBpID0gaW5kZXhcIlxyXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiKGkgJSAyKSA/ICd3ZWVrZW5kJyA6ICcnXCIgW25nU3R5bGVdPVwic2V0VGltZXNjYWxlV2Vla2VuZENlbGxTdHlsZSgpXCI+e3tpICsgMX19PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PmAsXHJcbiAgICBzdHlsZXM6IFtgXHJcbiAgICAgICAgLndlZWtlbmQge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZXNtb2tlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAudGltZS1zY2FsZSB7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjZWNlY2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC50aW1lLXNjYWxlLWxpbmUge1xyXG4gICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NlY2VjZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLnRpbWUtc2NhbGUtbGluZTpmaXJzdC1jaGlsZCB7XHJcbiAgICAgICAgICAgIGJvcmRlci10b3A6IG5vbmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC50aW1lLXNjYWxlLWNlbGwge1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNjZWNlY2U7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgIH1gXHJcbiAgICBdLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgR2FudHRTZXJ2aWNlXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHYW50dFRpbWVTY2FsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBASW5wdXQoKSB0aW1lU2NhbGVNb250aDogYW55O1xyXG4gICAgQElucHV0KCkgdGltZVNjYWxlV2Vla2VuZDogYW55O1xyXG4gICAgQElucHV0KCkgZGltZW5zaW9uczogYW55O1xyXG4gICAgQElucHV0KCkgc2NhbGU6IElTY2FsZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZ2FudHRTZXJ2aWNlOiBHYW50dFNlcnZpY2UpIHsgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVzY2FsZVN0eWxlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICd3aWR0aCc6ICh0aGlzLmRpbWVuc2lvbnMud2lkdGggKyAzNikgKyAncHgnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lc2NhbGVNb250aExpbmVTdHlsZShib3JkZXJUb3A6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICdoZWlnaHQnOiB0aGlzLmdhbnR0U2VydmljZS5yb3dIZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAnbGluZS1oZWlnaHQnOiB0aGlzLmdhbnR0U2VydmljZS5yb3dIZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAncG9zaXRpb24nOiAncmVsYXRpdmUnLFxyXG4gICAgICAgICAgICAnYm9yZGVyLXRvcCc6IGJvcmRlclRvcFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZXNjYWxlTW9udGhDZWxsU3R5bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ3dpZHRoJzogdGhpcy5nYW50dFNlcnZpY2UuY2VsbFdpZHRoICsgJ3B4J1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZXNjYWxlV2Vla2VuZExpbmVTdHlsZShib3JkZXJUb3A6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICdoZWlnaHQnOiB0aGlzLmdhbnR0U2VydmljZS5yb3dIZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAnbGluZS1oZWlnaHQnOiB0aGlzLmdhbnR0U2VydmljZS5yb3dIZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAncG9zaXRpb24nOiAncmVsYXRpdmUnLFxyXG4gICAgICAgICAgICAnYm9yZGVyLXRvcCc6IGJvcmRlclRvcFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZXNjYWxlV2Vla2VuZENlbGxTdHlsZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAnd2lkdGgnOiB0aGlzLmdhbnR0U2VydmljZS5jZWxsV2lkdGggKyAncHgnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpc0RheVdlZWtlbmQoZGF0ZTogRGF0ZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdhbnR0U2VydmljZS5pc0RheVdlZWtlbmQoZGF0ZSk7XHJcbiAgICB9XHJcbn1cclxuIl19