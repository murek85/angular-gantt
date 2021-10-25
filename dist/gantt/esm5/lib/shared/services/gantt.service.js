import { Injectable } from '@angular/core';
import { GanttConfig } from './gantt-config.service';
import * as i0 from "@angular/core";
var GanttService = /** @class */ (function () {
    function GanttService() {
        this.rowHeight = 0;
        this.hourCellWidth = 60; // change to 60 so minutes can been seen more easily
        this.hoursCellWidth = this.hourCellWidth * 25;
        this.cellWidth = 0;
        this.windowInnerWidth = 0;
        this.activityHeight = 0;
        this.barHeight = 0;
        this.barLineHeight = 0;
        this.barTop = 0;
        this.barMoveable = false;
        this.gridWidth = 0; //188
        this.gridHeight = 332;
        var ganttConfig = new GanttConfig();
        this.rowHeight = ganttConfig.rowHeight;
        this.cellWidth = ganttConfig.cellWidth;
        this.activityHeight = ganttConfig.activityHeight;
        this.barHeight = ganttConfig.barHeight;
        this.barLineHeight = ganttConfig.barLineHeight;
        this.barTop = ganttConfig.rowHeight;
        this.barMoveable = ganttConfig.barMoveable;
    }
    GanttService.prototype.calculateBarWidth = function (start, end) {
        if (typeof start === 'string') {
            start = new Date(start);
        }
        if (typeof end === 'string') {
            end = new Date(end);
        }
        var days = this.calculateDiffDays(start, end);
        var width = (days * this.cellWidth + days) / 7;
        return width;
    };
    GanttService.prototype.calculateBarLeft = function (start, scale) {
        var left = 0;
        if (start != null) {
            if (typeof start === 'string') {
                start = new Date();
            }
            for (var i = 0; i < scale.length; i++) {
                if (start.getTime() >= scale[i].getTime() && start.getTime() < scale[i + 1].getTime()) {
                    // left = i * this.cellWidth + i + this.calculateBarLeftDelta(start) +
                    //    ((7 / (scale[i + 1].getDate() - start.getDate()) / 7) * this.cellWidth) - this.cellWidth / 7;
                    left = i * this.cellWidth + ((this.cellWidth) * this.calculateDiffDays(scale[i], start) / 7) +
                        i + this.calculateBarLeftDelta(start);
                    break;
                }
            }
        }
        return left;
    };
    /** Calculates the height of the gantt grid, activity and vertical scroll */
    GanttService.prototype.calculateGanttHeight = function () {
        return this.TASK_CACHE.length * this.rowHeight + "px";
    };
    GanttService.prototype.calculateBarLeftDelta = function (start) {
        var offset = 0;
        var hoursInDay = 24;
        var minutesInHour = 60;
        var secondsInHour = 3600;
        var startHours = (start.getHours() + start.getMinutes() / minutesInHour + start.getSeconds() / secondsInHour);
        offset = this.cellWidth / hoursInDay * startHours;
        return offset;
    };
    /** Calculate the bar styles */
    GanttService.prototype.calculateBar = function (task, index, scale) {
        var barStyle = this.getBarStyle(task.color);
        return {
            'top': this.barTop * index + 2 + 'px',
            'left': this.calculateBarLeft(task.start, scale) + 'px',
            'height': this.barHeight + 'px',
            'line-height': this.barLineHeight + 'px',
            'width': this.calculateBarWidth(task.start, task.end) + 'px',
            'background-color': barStyle["background-color"],
            'border-left': barStyle["border-left"]
        };
    };
    /** Get the bar style based on task status */
    GanttService.prototype.getBarStyle = function (color) {
        var style = {};
        style["background-color"] = color.secondary;
        style["border-left"] = "5px solid " + color.primary;
        return style;
    };
    /** Calculates the difference in two dates and returns number of days */
    GanttService.prototype.calculateDiffDays = function (start, end) {
        try {
            var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds /ms
            var diffDays = Math.abs((start.getTime() - end.getTime()) / (oneDay));
            var days = diffDays; // don't use Math.round as it will draw an incorrect bar
            return days;
        }
        catch (err) {
            return 0;
        }
    };
    /** Calculate the gantt scale range given the start and end date of tasks*/
    GanttService.prototype.calculateScale = function (start, end) {
        if (start === void 0) { start = new Date(); }
        if (end === void 0) { end = this.addDays(start, 7); }
        var scale = [];
        try {
            while (start.getTime() <= end.getTime()) {
                scale.push(start);
                start = this.addDays(start, 7);
            }
            return scale;
        }
        catch (err) {
            return scale;
        }
    };
    GanttService.prototype.calculateMonthScale = function (start, end) {
        if (start === void 0) { start = new Date(); }
        if (end === void 0) { end = this.addDays(start, 7); }
        var scale = [];
        try {
            // while (start.getTime() <= end.getTime()) {
            //     scale.push({ start: start, width: this.calculateCellMonthWidth(start, end) });
            //     start = this.addDays(start, new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate());
            // }
            scale = this.calculateCellMonthWidth(start, end);
            return scale;
        }
        catch (err) {
            return scale;
        }
    };
    /** Determines whether given date is a weekend */
    GanttService.prototype.isDayWeekend = function (date) {
        var day = date.getDay();
        if (day === 6 || day === 0) {
            return true;
        }
        return false;
    };
    /** Add x number of days to a date object */
    GanttService.prototype.addDays = function (date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };
    //** Remove x number of days from a date object */
    GanttService.prototype.removeDays = function (date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() - days);
        return result;
    };
    /** Calculates the grid scale for gantt based on tasks start and end dates */
    GanttService.prototype.calculateGridScale = function (tasks) {
        var start;
        var end;
        var dates = tasks.map(function (task) {
            return {
                start: new Date(task.start),
                end: new Date(task.end)
            };
        });
        start = new Date(Math.min.apply(null, dates.map(function (t) {
            return t.start;
        })));
        end = new Date(Math.max.apply(null, dates.map(function (t) {
            return t.end;
        })));
        return {
            start: start,
            end: end
        };
    };
    GanttService.prototype.getComputedStyle = function (element, attribute) {
        return parseInt(document.defaultView.getComputedStyle(element)[attribute], 10);
    };
    //TODO(dale): determine whether this is needed
    GanttService.prototype.calculateContainerWidth = function () {
        this.windowInnerWidth = window.innerWidth;
        var containerWidth = this.gridWidth - 18;
        return containerWidth;
    };
    GanttService.prototype.calculateContainerHeight = function () {
        var containerHeight = (innerHeight - 18);
        return containerHeight;
    };
    GanttService.prototype.calculateActivityContainerDimensions = function () {
        var scrollWidth = 18;
        this.windowInnerWidth = window.innerWidth;
        var width = window.innerWidth - this.gridWidth - scrollWidth;
        return { height: this.activityHeight, width: width };
    };
    GanttService.prototype.calculateGanttActivityWidth = function (elem) {
        return "calc(100% - " + (elem.offsetWidth + 1) + "px)";
    };
    GanttService.prototype.calculateGanttActivityHeight = function (elem) {
        return elem.offsetHeight + "px";
    };
    GanttService.prototype.calculateCellMonthWidth = function (minDate, maxDate) {
        var i, result = [];
        var startDate = minDate;
        var endDate = maxDate;
        var monthDiff = this.calculateDiffMonths(startDate, endDate);
        var dayDiff = this.calculateDiffDays(startDate, endDate);
        for (i = 0; i < monthDiff; i++) {
            var startOfMonth = i === 0 ? startDate : new Date(startDate.getFullYear(), i, 1);
            var endOfMonth = i === monthDiff - 1 ? endDate : new Date(startDate.getFullYear(), i + 1, 0);
            var dayInMonth = this.calculateDiffDays(startOfMonth, endOfMonth) + (i !== monthDiff - 1 && 1);
            var width = Math.floor(dayInMonth / dayDiff * 2E3) * 1.025;
            result.push({ start: startOfMonth, end: endOfMonth, width: width });
        }
        return result;
    };
    GanttService.prototype.calculateDiffMonths = function (start, end) {
        var months = end.getMonth() - start.getMonth() + (12 * (end.getFullYear() - start.getFullYear()));
        if (end.getDate() < start.getDate()) {
            var newFrom = new Date(end.getFullYear(), end.getMonth(), start.getDate());
            if (end < newFrom && end.getMonth() == newFrom.getMonth() && end.getYear() % 4 != 0) {
                months--;
            }
        }
        return months + 1;
    };
    /** Set the vertical scroll top positions for gantt */
    GanttService.prototype.scrollTop = function (verticalScrollElem, ganttGridElem, ganttActivityAreaElem) {
        var verticalScrollTop = verticalScrollElem.scrollTop;
        var scroll = this.setScrollTop;
        // debounce
        if (verticalScrollTop !== null && verticalScrollTop !== undefined) {
            scroll(verticalScrollTop, ganttActivityAreaElem);
            scroll(ganttActivityAreaElem.scrollTop, ganttGridElem);
        }
    };
    /** Group data by id , only supports one level*/
    GanttService.prototype.groupData = function (tasks) {
        return tasks;
    };
    /** Checks whether any new data needs to be added to task cache  */
    GanttService.prototype.doTaskCheck = function (tasks, scale) {
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
        this.MONTH_SCALE = this.calculateMonthScale(scale.start, scale.end);
        return true;
    };
    /** Set a id prefix so CSS3 query selector can work with ids that contain numbers */
    GanttService.prototype.setIdPrefix = function (id) {
        return "_" + id;
    };
    // /** Remove the id prefix to allow querying of data */
    // public removeIdPrefix(id: string): string {
    //     return id.substring(1, id.length - 1);
    // }
    /** Set the scroll top property of a native DOM element */
    GanttService.prototype.setScrollTop = function (scrollTop, element) {
        if (element !== null && element !== undefined) {
            element.scrollTop = scrollTop;
        }
    };
    /** @nocollapse */ GanttService.ɵfac = function GanttService_Factory(t) { return new (t || GanttService)(); };
    /** @nocollapse */ GanttService.ɵprov = i0.ɵɵdefineInjectable({ token: GanttService, factory: GanttService.ɵfac });
    return GanttService;
}());
export { GanttService };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(GanttService, [{
        type: Injectable
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZ2FudHQvIiwic291cmNlcyI6WyJsaWIvc2hhcmVkL3NlcnZpY2VzL2dhbnR0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7O0FBR3JEO0lBa0JJO1FBaEJPLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxrQkFBYSxHQUFHLEVBQUUsQ0FBQyxDQUFDLG9EQUFvRDtRQUN4RSxtQkFBYyxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3pDLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxxQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFDckIsbUJBQWMsR0FBRyxDQUFDLENBQUM7UUFDbkIsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLFdBQU0sR0FBRyxDQUFDLENBQUM7UUFDWCxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixjQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSztRQUNwQixlQUFVLEdBQUcsR0FBRyxDQUFDO1FBTXBCLElBQU0sV0FBVyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFFdEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQztRQUN2QyxJQUFJLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQyxjQUFjLENBQUM7UUFDakQsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQztRQUMvQyxJQUFJLENBQUMsTUFBTSxHQUFHLFdB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RSxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsb0ZBQW9GO0lBQzdFLGtDQUFXLEdBQWxCLFVBQW1CLEVBQVU7UUFDekIsT0FBTyxNQUFJLEVBQUksQ0FBQztJQUNwQixDQUFDO0lBRUQsd0RBQXdEO0lBQ3hELDhDQUE4QztJQUM5Qyw2Q0FBNkM7SUFDN0MsSUFBSTtJQUVKLDBEQUEwRDtJQUNuRCxtQ0FBWSxHQUFuQixVQUFvQixTQUFpQixFQUFFLE9BQVk7UUFDL0MsSUFBSSxPQUFPLEtBQUssSUFBSSxJQUFJLE9BQU8sS0FBSyxTQUFTLEVBQUU7WUFDM0MsT0FBTyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7U0FDakM7SUFDTCxDQUFDOytGQTlUUSxZQUFZOzJFQUFaLFlBQVksV0FBWixZQUFZO3VCQUx6QjtDQW9VQyxBQWhVRCxJQWdVQztTQS9UWSxZQUFZO2tEQUFaLFlBQVk7Y0FEeEIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgR2FudHRDb25maWcgfSBmcm9tICcuL2dhbnR0LWNvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVGFzaywgSVNjYWxlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBHYW50dFNlcnZpY2Uge1xyXG4gICAgcHVibGljIHJvd0hlaWdodCA9IDA7XHJcbiAgICBwdWJsaWMgaG91ckNlbGxXaWR0aCA9IDYwOyAvLyBjaGFuZ2UgdG8gNjAgc28gbWludXRlcyBjYW4gYmVlbiBzZWVuIG1vcmUgZWFzaWx5XHJcbiAgICBwdWJsaWMgaG91cnNDZWxsV2lkdGggPSB0aGlzLmhvdXJDZWxsV2lkdGggKiAyNTtcclxuICAgIHB1YmxpYyBjZWxsV2lkdGggPSAwO1xyXG4gICAgcHVibGljIHdpbmRvd0lubmVyV2lkdGggPSAwO1xyXG4gICAgcHVibGljIGFjdGl2aXR5SGVpZ2h0ID0gMDtcclxuICAgIHB1YmxpYyBiYXJIZWlnaHQgPSAwO1xyXG4gICAgcHVibGljIGJhckxpbmVIZWlnaHQgPSAwO1xyXG4gICAgcHVibGljIGJhclRvcCA9IDA7XHJcbiAgICBwdWJsaWMgYmFyTW92ZWFibGUgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBncmlkV2lkdGggPSAwOyAvLzE4OFxyXG4gICAgcHVibGljIGdyaWRIZWlnaHQgPSAzMzI7XHJcbiAgICBwdWJsaWMgVEFTS19DQUNIRTogYW55W107XHJcbiAgICBwdWJsaWMgVElNRV9TQ0FMRTogYW55W107XHJcbiAgICBwdWJsaWMgTU9OVEhfU0NBTEU6IGFueVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGNvbnN0IGdhbnR0Q29uZmlnID0gbmV3IEdhbnR0Q29uZmlnKCk7XHJcblxyXG4gICAgICAgIHRoaXMucm93SGVpZ2h0ID0gZ2FudHRDb25maWcucm93SGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuY2VsbFdpZHRoID0gZ2FudHRDb25maWcuY2VsbFdpZHRoO1xyXG4gICAgICAgIHRoaXMuYWN0aXZpdHlIZWlnaHQgPSBnYW50dENvbmZpZy5hY3Rpdml0eUhlaWdodDtcclxuICAgICAgICB0aGlzLmJhckhlaWdodCA9IGdhbnR0Q29uZmlnLmJhckhlaWdodDtcclxuICAgICAgICB0aGlzLmJhckxpbmVIZWlnaHQgPSBnYW50dENvbmZpZy5iYXJMaW5lSGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuYmFyVG9wID0gZ2FudHRDb25maWcucm93SGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuYmFyTW92ZWFibGUgPSBnYW50dENvbmZpZy5iYXJNb3ZlYWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZUJhcldpZHRoKHN0YXJ0OiBEYXRlLCBlbmQ6IERhdGUpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHN0YXJ0ID0gbmV3IERhdGUoc3RhcnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBlbmQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGVuZCA9IG5ldyBEYXRlKGVuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBkYXlzID0gdGhpcy5jYWxjdWxhdGVEaWZmRGF5cyhzdGFydCwgZW5kKTtcclxuICAgICAgICBjb25zdCB3aWR0aDogbnVtYmVyID0gKGRheXMgKiB0aGlzLmNlbGxXaWR0aCArIGRheXMpIC8gNztcclxuICAgICAgICByZXR1cm4gd2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVCYXJMZWZ0KHN0YXJ0OiBEYXRlLCBzY2FsZTogYW55W10pOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBsZWZ0ID0gMDtcclxuXHJcbiAgICAgICAgaWYgKHN0YXJ0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdGFydCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY2FsZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXJ0LmdldFRpbWUoKSA+PSBzY2FsZVtpXS5nZXRUaW1lKCkgJiYgc3RhcnQuZ2V0VGltZSgpIDwgc2NhbGVbaSArIDFdLmdldFRpbWUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxlZnQgPSBpICogdGhpcy5jZWxsV2lkdGggKyBpICsgdGhpcy5jYWxjdWxhdGVCYXJMZWZ0RGVsdGEoc3RhcnQpICtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAoKDcgLyAoc2NhbGVbaSArIDFdLmdldERhdGUoKSAtIHN0YXJ0LmdldERhdGUoKSkgLyA3KSAqIHRoaXMuY2VsbFdpZHRoKSAtIHRoaXMuY2VsbFdpZHRoIC8gNztcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gaSAqIHRoaXMuY2VsbFdpZHRoICsgKCh0aGlzLmNlbGxXaWR0aCkgKiB0aGlzLmNhbGN1bGF0ZURpZmZEYXlzKHNjYWxlW2ldLCBzdGFydCkgLyA3KSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgKyB0aGlzLmNhbGN1bGF0ZUJhckxlZnREZWx0YShzdGFydCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxlZnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENhbGN1bGF0ZXMgdGhlIGhlaWdodCBvZiB0aGUgZ2FudHQgZ3JpZCwgYWN0aXZpdHkgYW5kIHZlcnRpY2FsIHNjcm9sbCAqL1xyXG4gICAgcHVibGljIGNhbGN1bGF0ZUdhbnR0SGVpZ2h0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuVEFTS19DQUNIRS5sZW5ndGggKiB0aGlzLnJvd0hlaWdodH1weGA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVCYXJMZWZ0RGVsdGEoc3RhcnQ6IERhdGUpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBvZmZzZXQgPSAwO1xyXG4gICAgICAgIGNvbnN0IGhvdXJzSW5EYXkgPSAyNDtcclxuICAgICAgICBjb25zdCBtaW51dGVzSW5Ib3VyID0gNjA7XHJcbiAgICAgICAgY29uc3Qgc2Vjb25kc0luSG91ciA9IDM2MDA7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRIb3VyczogbnVtYmVyID1cclxuICAgICAgICAgICAgKHN0YXJ0LmdldEhvdXJzKCkgKyBzdGFydC5nZXRNaW51dGVzKCkgLyBtaW51dGVzSW5Ib3VyICsgc3RhcnQuZ2V0U2Vjb25kcygpIC8gc2Vjb25kc0luSG91cik7XHJcblxyXG4gICAgICAgIG9mZnNldCA9IHRoaXMuY2VsbFdpZHRoIC8gaG91cnNJbkRheSAqIHN0YXJ0SG91cnM7XHJcbiAgICAgICAgcmV0dXJuIG9mZnNldDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlIHRoZSBiYXIgc3R5bGVzICovXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlQmFyKHRhc2s6IGFueSwgaW5kZXg6IG51bWJlciwgc2NhbGU6IGFueSkge1xyXG4gICAgICAgIGNvbnN0IGJhclN0eWxlID0gdGhpcy5nZXRCYXJTdHlsZSh0YXNrLmNvbG9yKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAndG9wJzogdGhpcy5iYXJUb3AgKiBpbmRleCArIDIgKyAncHgnLFxyXG4gICAgICAgICAgICAnbGVmdCc6IHRoaXMuY2FsY3VsYXRlQmFyTGVmdCh0YXNrLnN0YXJ0LCBzY2FsZSkgKyAncHgnLFxyXG4gICAgICAgICAgICAnaGVpZ2h0JzogdGhpcy5iYXJIZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAnbGluZS1oZWlnaHQnOiB0aGlzLmJhckxpbmVIZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAnd2lkdGgnOiB0aGlzLmNhbGN1bGF0ZUJhcldpZHRoKHRhc2suc3RhcnQsIHRhc2suZW5kKSArICdweCcsXHJcbiAgICAgICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogYmFyU3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdLFxyXG4gICAgICAgICAgICAnYm9yZGVyLWxlZnQnOiBiYXJTdHlsZVtcImJvcmRlci1sZWZ0XCJdXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogR2V0IHRoZSBiYXIgc3R5bGUgYmFzZWQgb24gdGFzayBzdGF0dXMgKi9cclxuICAgIHByaXZhdGUgZ2V0QmFyU3R5bGUoY29sb3I6IGFueSk6IGFueSB7XHJcbiAgICAgICAgY29uc3Qgc3R5bGUgPSB7fTtcclxuICAgICAgICBzdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0gPSBjb2xvci5zZWNvbmRhcnk7XHJcbiAgICAgICAgc3R5bGVbXCJib3JkZXItbGVmdFwiXSA9IGA1cHggc29saWQgJHtjb2xvci5wcmltYXJ5fWA7XHJcblxyXG4gICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2FsY3VsYXRlcyB0aGUgZGlmZmVyZW5jZSBpbiB0d28gZGF0ZXMgYW5kIHJldHVybnMgbnVtYmVyIG9mIGRheXMgKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVEaWZmRGF5cyhzdGFydDogRGF0ZSwgZW5kOiBEYXRlKTogbnVtYmVyIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBvbmVEYXkgPSAyNCAqIDYwICogNjAgKiAxMDAwOyAvLyBob3VycyptaW51dGVzKnNlY29uZHMqbWlsbGlzZWNvbmRzIC9tc1xyXG4gICAgICAgICAgICBjb25zdCBkaWZmRGF5cyA9IE1hdGguYWJzKChzdGFydC5nZXRUaW1lKCkgLSBlbmQuZ2V0VGltZSgpKSAvIChvbmVEYXkpKTtcclxuICAgICAgICAgICAgY29uc3QgZGF5cyA9IGRpZmZEYXlzOyAvLyBkb24ndCB1c2UgTWF0aC5yb3VuZCBhcyBpdCB3aWxsIGRyYXcgYW4gaW5jb3JyZWN0IGJhclxyXG4gICAgICAgICAgICByZXR1cm4gZGF5cztcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDYWxjdWxhdGUgdGhlIGdhbnR0IHNjYWxlIHJhbmdlIGdpdmVuIHRoZSBzdGFydCBhbmQgZW5kIGRhdGUgb2YgdGFza3MqL1xyXG4gICAgcHVibGljIGNhbGN1bGF0ZVNjYWxlKHN0YXJ0OiBEYXRlID0gbmV3IERhdGUoKSwgZW5kOiBEYXRlID0gdGhpcy5hZGREYXlzKHN0YXJ0LCA3KSkge1xyXG4gICAgICAgIGNvbnN0IHNjYWxlOiBhbnlbXSA9IFtdO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHdoaWxlIChzdGFydC5nZXRUaW1lKCkgPD0gZW5kLmdldFRpbWUoKSkge1xyXG4gICAgICAgICAgICAgICAgc2NhbGUucHVzaChzdGFydCk7XHJcbiAgICAgICAgICAgICAgICBzdGFydCA9IHRoaXMuYWRkRGF5cyhzdGFydCwgNyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHNjYWxlO1xyXG5cclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNjYWxlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlTW9udGhTY2FsZShzdGFydDogRGF0ZSA9IG5ldyBEYXRlKCksIGVuZDogRGF0ZSA9IHRoaXMuYWRkRGF5cyhzdGFydCwgNykpIHtcclxuICAgICAgICBsZXQgc2NhbGU6IGFueVtdID0gW107XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gd2hpbGUgKHN0YXJ0LmdldFRpbWUoKSA8PSBlbmQuZ2V0VGltZSgpKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBzY2FsZS5wdXNoKHsgc3RhcnQ6IHN0YXJ0LCB3aWR0aDogdGhpcy5jYWxjdWxhdGVDZWxsTW9udGhXaWR0aChzdGFydCwgZW5kKSB9KTtcclxuICAgICAgICAgICAgLy8gICAgIHN0YXJ0ID0gdGhpcy5hZGREYXlzKHN0YXJ0LCBuZXcgRGF0ZShzdGFydC5nZXRGdWxsWWVhcigpLCBzdGFydC5nZXRNb250aCgpICsgMSwgMCkuZ2V0RGF0ZSgpKTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICBzY2FsZSA9IHRoaXMuY2FsY3VsYXRlQ2VsbE1vbnRoV2lkdGgoc3RhcnQsIGVuZCk7XHJcbiAgICAgICAgICAgIHJldHVybiBzY2FsZTtcclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzY2FsZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIERldGVybWluZXMgd2hldGhlciBnaXZlbiBkYXRlIGlzIGEgd2Vla2VuZCAqL1xyXG4gICAgcHVibGljIGlzRGF5V2Vla2VuZChkYXRlOiBEYXRlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgZGF5ID0gZGF0ZS5nZXREYXkoKTtcclxuICAgICAgICBpZiAoZGF5ID09PSA2IHx8IGRheSA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBBZGQgeCBudW1iZXIgb2YgZGF5cyB0byBhIGRhdGUgb2JqZWN0ICovXHJcbiAgICBwdWJsaWMgYWRkRGF5cyhkYXRlOiBEYXRlLCBkYXlzOiBudW1iZXIpOiBEYXRlIHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgRGF0ZShkYXRlKTtcclxuICAgICAgICByZXN1bHQuc2V0RGF0ZShyZXN1bHQuZ2V0RGF0ZSgpICsgZGF5cyk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvLyoqIFJlbW92ZSB4IG51bWJlciBvZiBkYXlzIGZyb20gYSBkYXRlIG9iamVjdCAqL1xyXG4gICAgcHVibGljIHJlbW92ZURheXMoZGF0ZTogRGF0ZSwgZGF5czogbnVtYmVyKTogRGF0ZSB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGUoZGF0ZSk7XHJcbiAgICAgICAgcmVzdWx0LnNldERhdGUocmVzdWx0LmdldERhdGUoKSAtIGRheXMpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENhbGN1bGF0ZXMgdGhlIGdyaWQgc2NhbGUgZm9yIGdhbnR0IGJhc2VkIG9uIHRhc2tzIHN0YXJ0IGFuZCBlbmQgZGF0ZXMgKi9cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVHcmlkU2NhbGUodGFza3M6IFRhc2tbXSk6IElTY2FsZSB7XHJcbiAgICAgICAgbGV0IHN0YXJ0OiBEYXRlO1xyXG4gICAgICAgIGxldCBlbmQ6IERhdGU7XHJcbiAgICAgICAgY29uc3QgZGF0ZXMgPSB0YXNrcy5tYXAoKHRhc2s6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgc3RhcnQ6IG5ldyBEYXRlKHRhc2suc3RhcnQpLFxyXG4gICAgICAgICAgICAgICAgZW5kOiBuZXcgRGF0ZSh0YXNrLmVuZClcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc3RhcnQgPSBuZXcgRGF0ZShNYXRoLm1pbi5hcHBseShudWxsLCBkYXRlcy5tYXAoKHQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHQuc3RhcnQ7XHJcbiAgICAgICAgfSkpKTtcclxuXHJcbiAgICAgICAgZW5kID0gbmV3IERhdGUoTWF0aC5tYXguYXBwbHkobnVsbCwgZGF0ZXMubWFwKCh0KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0LmVuZDtcclxuICAgICAgICB9KSkpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzdGFydDogc3RhcnQsXHJcbiAgICAgICAgICAgIGVuZDogZW5kXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50OiBhbnksIGF0dHJpYnV0ZTogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudClbYXR0cmlidXRlXSwgMTApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETyhkYWxlKTogZGV0ZXJtaW5lIHdoZXRoZXIgdGhpcyBpcyBuZWVkZWRcclxuICAgIHB1YmxpYyBjYWxjdWxhdGVDb250YWluZXJXaWR0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIHRoaXMud2luZG93SW5uZXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lcldpZHRoID0gdGhpcy5ncmlkV2lkdGggLSAxODtcclxuICAgICAgICByZXR1cm4gY29udGFpbmVyV2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbGN1bGF0ZUNvbnRhaW5lckhlaWdodCgpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckhlaWdodCA9IChpbm5lckhlaWdodCAtIDE4KTtcclxuICAgICAgICByZXR1cm4gY29udGFpbmVySGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVBY3Rpdml0eUNvbnRhaW5lckRpbWVuc2lvbnMoKTogYW55IHtcclxuICAgICAgICBjb25zdCBzY3JvbGxXaWR0aCA9IDE4O1xyXG4gICAgICAgIHRoaXMud2luZG93SW5uZXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgIGNvbnN0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGggLSB0aGlzLmdyaWRXaWR0aCAtIHNjcm9sbFdpZHRoO1xyXG5cclxuICAgICAgICByZXR1cm4geyBoZWlnaHQ6IHRoaXMuYWN0aXZpdHlIZWlnaHQsIHdpZHRoOiB3aWR0aCB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjYWxjdWxhdGVHYW50dEFjdGl2aXR5V2lkdGgoZWxlbTogSFRNTEVsZW1lbnQpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiBgY2FsYygxMDAlIC0gJHsoZWxlbS5vZmZzZXRXaWR0aCArIDEpfXB4KWA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbGN1bGF0ZUdhbnR0QWN0aXZpdHlIZWlnaHQoZWxlbTogSFRNTEVsZW1lbnQpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiBgJHtlbGVtLm9mZnNldEhlaWdodH1weGA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbGN1bGF0ZUNlbGxNb250aFdpZHRoKG1pbkRhdGU6IERhdGUsIG1heERhdGU6IERhdGUpIHtcclxuICAgICAgICB2YXIgaSwgcmVzdWx0ID0gW107XHJcbiAgICAgICAgdmFyIHN0YXJ0RGF0ZSA9IG1pbkRhdGU7XHJcbiAgICAgICAgdmFyIGVuZERhdGUgPSBtYXhEYXRlO1xyXG4gICAgICAgIHZhciBtb250aERpZmYgPSB0aGlzLmNhbGN1bGF0ZURpZmZNb250aHMoc3RhcnREYXRlLCBlbmREYXRlKTtcclxuICAgICAgICB2YXIgZGF5RGlmZiA9IHRoaXMuY2FsY3VsYXRlRGlmZkRheXMoc3RhcnREYXRlLCBlbmREYXRlKTtcclxuXHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG1vbnRoRGlmZjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGFydE9mTW9udGggPSBpID09PSAwID8gc3RhcnREYXRlIDogbmV3IERhdGUoc3RhcnREYXRlLmdldEZ1bGxZZWFyKCksIGksIDEpO1xyXG4gICAgICAgICAgICB2YXIgZW5kT2ZNb250aCA9IGkgPT09IG1vbnRoRGlmZiAtIDEgPyBlbmREYXRlIDogbmV3IERhdGUoc3RhcnREYXRlLmdldEZ1bGxZZWFyKCksIGkgKyAxLCAwKTtcclxuICAgICAgICAgICAgdmFyIGRheUluTW9udGggPSB0aGlzLmNhbGN1bGF0ZURpZmZEYXlzKHN0YXJ0T2ZNb250aCwgZW5kT2ZNb250aCkgKyAoaSAhPT0gbW9udGhEaWZmIC0gMSAmJiAxKTtcclxuICAgICAgICAgICAgdmFyIHdpZHRoID0gTWF0aC5mbG9vcihkYXlJbk1vbnRoIC8gZGF5RGlmZiAqIDJFMykgKiAxLjAyNTtcclxuXHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHsgc3RhcnQ6IHN0YXJ0T2ZNb250aCwgZW5kOiBlbmRPZk1vbnRoLCB3aWR0aDogd2lkdGggfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlRGlmZk1vbnRocyhzdGFydCwgZW5kKSB7XHJcbiAgICAgICAgdmFyIG1vbnRocyA9IGVuZC5nZXRNb250aCgpIC0gc3RhcnQuZ2V0TW9udGgoKSArICgxMiAqIChlbmQuZ2V0RnVsbFllYXIoKSAtIHN0YXJ0LmdldEZ1bGxZZWFyKCkpKTtcclxuXHJcbiAgICAgICAgaWYoZW5kLmdldERhdGUoKSA8IHN0YXJ0LmdldERhdGUoKSkge1xyXG4gICAgICAgICAgICB2YXIgbmV3RnJvbSA9IG5ldyBEYXRlKGVuZC5nZXRGdWxsWWVhcigpLCBlbmQuZ2V0TW9udGgoKSxzdGFydC5nZXREYXRlKCkpO1xyXG4gICAgICAgICAgICBpZiAoZW5kIDwgbmV3RnJvbSAgJiYgZW5kLmdldE1vbnRoKCkgPT0gbmV3RnJvbS5nZXRNb250aCgpICYmIGVuZC5nZXRZZWFyKCkgJSA0ICE9IDApIHtcclxuICAgICAgICAgICAgICAgIG1vbnRocy0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbW9udGhzICsgMTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogU2V0IHRoZSB2ZXJ0aWNhbCBzY3JvbGwgdG9wIHBvc2l0aW9ucyBmb3IgZ2FudHQgKi9cclxuICAgIHB1YmxpYyBzY3JvbGxUb3AodmVydGljYWxTY3JvbGxFbGVtOiBhbnksIGdhbnR0R3JpZEVsZW06IGFueSwgZ2FudHRBY3Rpdml0eUFyZWFFbGVtOiBhbnkpIHtcclxuICAgICAgICBjb25zdCB2ZXJ0aWNhbFNjcm9sbFRvcCA9IHZlcnRpY2FsU2Nyb2xsRWxlbS5zY3JvbGxUb3A7XHJcbiAgICAgICAgY29uc3Qgc2Nyb2xsID0gdGhpcy5zZXRTY3JvbGxUb3A7XHJcblxyXG4gICAgICAgIC8vIGRlYm91bmNlXHJcbiAgICAgICAgaWYgKHZlcnRpY2FsU2Nyb2xsVG9wICE9PSBudWxsICYmIHZlcnRpY2FsU2Nyb2xsVG9wICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgc2Nyb2xsKHZlcnRpY2FsU2Nyb2xsVG9wLCBnYW50dEFjdGl2aXR5QXJlYUVsZW0pO1xyXG4gICAgICAgICAgICBzY3JvbGwoZ2FudHRBY3Rpdml0eUFyZWFFbGVtLnNjcm9sbFRvcCwgZ2FudHRHcmlkRWxlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBHcm91cCBkYXRhIGJ5IGlkICwgb25seSBzdXBwb3J0cyBvbmUgbGV2ZWwqL1xyXG4gICAgcHVibGljIGdyb3VwRGF0YSh0YXNrczogYW55KTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGFza3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENoZWNrcyB3aGV0aGVyIGFueSBuZXcgZGF0YSBuZWVkcyB0byBiZSBhZGRlZCB0byB0YXNrIGNhY2hlICAqL1xyXG4gICAgcHVibGljIGRvVGFza0NoZWNrKHRhc2tzOiBhbnlbXSwgc2NhbGU6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8vIGNvbnN0IGNhY2hlZFRhc2tJZHMgPSB0aGlzLlRBU0tfQ0FDSEUubWFwKCh0YXNrOiBhbnkpID0+IHsgcmV0dXJuIHRhc2suaWQgfSk7XHJcbiAgICAgICAgLy8gY29uc3QgaXRlbXNUb0NhY2hlOiBhbnlbXSA9IFtdO1xyXG5cclxuICAgICAgICAvLyBvbmx5IGxvb2sgYXQgdGFza3MgdGhhdCBhcmUgbm90IGNhY2hlZFxyXG4gICAgICAgIC8vIHRhc2tzLmZpbHRlcigodGFzazogYW55KSA9PiB7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiBjYWNoZWRUYXNrSWRzLmluZGV4T2YodGFzay5pZCkgPT09IC0xO1xyXG4gICAgICAgIC8vIH0pLmZvckVhY2goKHRhc2s6IGFueSkgPT4ge1xyXG4gICAgICAgIC8vICAgICBpdGVtc1RvQ2FjaGUucHVzaCh0YXNrKTtcclxuICAgICAgICAvLyB9KTtcclxuXHJcbiAgICAgICAgLy8gaXRlbXNUb0NhY2hlLmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgIC8vICAgICB0aGlzLlRBU0tfQ0FDSEUucHVzaChpdGVtKTtcclxuICAgICAgICAvLyB9KTtcclxuXHJcbiAgICAgICAgLy8gaWYgKGl0ZW1zVG9DYWNoZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgdGhpcy5UQVNLX0NBQ0hFID0gdGFza3M7XHJcblxyXG4gICAgICAgIHRoaXMuVElNRV9TQ0FMRSA9IHRoaXMuY2FsY3VsYXRlU2NhbGUoc2NhbGUuc3RhcnQsIHNjYWxlLmVuZCk7XHJcbiAgICAgICAgdGhpcy5NT05USF9TQ0FMRSA9IHRoaXMuY2FsY3VsYXRlTW9udGhTY2FsZShzY2FsZS5zdGFydCwgc2NhbGUuZW5kKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFNldCBhIGlkIHByZWZpeCBzbyBDU1MzIHF1ZXJ5IHNlbGVjdG9yIGNhbiB3b3JrIHdpdGggaWRzIHRoYXQgY29udGFpbiBudW1iZXJzICovXHJcbiAgICBwdWJsaWMgc2V0SWRQcmVmaXgoaWQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGBfJHtpZH1gO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIC8qKiBSZW1vdmUgdGhlIGlkIHByZWZpeCB0byBhbGxvdyBxdWVyeWluZyBvZiBkYXRhICovXHJcbiAgICAvLyBwdWJsaWMgcmVtb3ZlSWRQcmVmaXgoaWQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAvLyAgICAgcmV0dXJuIGlkLnN1YnN0cmluZygxLCBpZC5sZW5ndGggLSAxKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvKiogU2V0IHRoZSBzY3JvbGwgdG9wIHByb3BlcnR5IG9mIGEgbmF0aXZlIERPTSBlbGVtZW50ICovXHJcbiAgICBwdWJsaWMgc2V0U2Nyb2xsVG9wKHNjcm9sbFRvcDogbnVtYmVyLCBlbGVtZW50OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZWxlbWVudCAhPT0gbnVsbCAmJiBlbGVtZW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5zY3JvbGxUb3AgPSBzY3JvbGxUb3A7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==