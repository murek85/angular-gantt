/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function Project() { }
if (false) {
    /** @type {?} */
    Project.prototype.id;
    /** @type {?} */
    Project.prototype.name;
    /** @type {?|undefined} */
    Project.prototype.startDate;
    /** @type {?} */
    Project.prototype.tasks;
}
/**
 * @record
 */
export function Task() { }
if (false) {
    /** @type {?} */
    Task.prototype.id;
    /** @type {?} */
    Task.prototype.treePath;
    /** @type {?} */
    Task.prototype.parentId;
    /** @type {?} */
    Task.prototype.name;
    /** @type {?|undefined} */
    Task.prototype.resource;
    /** @type {?} */
    Task.prototype.start;
    /** @type {?|undefined} */
    Task.prototype.end;
    /** @type {?|undefined} */
    Task.prototype.percentComplete;
    /** @type {?|undefined} */
    Task.prototype.status;
}
/**
 * @record
 */
export function IGanttOptions() { }
if (false) {
    /** @type {?|undefined} */
    IGanttOptions.prototype.scale;
    /** @type {?|undefined} */
    IGanttOptions.prototype.zooming;
}
/**
 * @record
 */
export function IScale() { }
if (false) {
    /** @type {?|undefined} */
    IScale.prototype.start;
    /** @type {?|undefined} */
    IScale.prototype.end;
}
/**
 * @record
 */
export function IBarStyle() { }
if (false) {
    /** @type {?} */
    IBarStyle.prototype.status;
    /** @type {?} */
    IBarStyle.prototype.backgroundColor;
    /** @type {?} */
    IBarStyle.prototype.border;
    /** @type {?} */
    IBarStyle.prototype.progressBackgroundColor;
}
/** @enum {number} */
var Zooming = {
    hours: 0,
    days: 1,
    weeks: 2,
};
export { Zooming };
Zooming[Zooming.hours] = 'hours';
Zooming[Zooming.days] = 'days';
Zooming[Zooming.weeks] = 'weeks';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2dhbnR0LyIsInNvdXJjZXMiOlsibGliL3NoYXJlZC9pbnRlcmZhY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSw2QkFLQzs7O0lBSkcscUJBQVc7O0lBQ1gsdUJBQWE7O0lBQ2IsNEJBQWlCOztJQUNqQix3QkFBYzs7Ozs7QUFHbEIsMEJBVUM7OztJQVRHLGtCQUFXOztJQUNYLHdCQUFpQjs7SUFDakIsd0JBQWlCOztJQUNqQixvQkFBYTs7SUFDYix3QkFBa0I7O0lBQ2xCLHFCQUFZOztJQUNaLG1CQUFXOztJQUNYLCtCQUF5Qjs7SUFDekIsc0JBQWdCOzs7OztBQUdwQixtQ0FHQzs7O0lBRkcsOEJBQWU7O0lBQ2YsZ0NBQWlCOzs7OztBQUdyQiw0QkFHQzs7O0lBRkcsdUJBQWE7O0lBQ2IscUJBQVc7Ozs7O0FBR2YsK0JBS0M7OztJQUpHLDJCQUFlOztJQUNmLG9DQUF3Qjs7SUFDeEIsMkJBQWU7O0lBQ2YsNENBQWdDOzs7O0lBSWhDLFFBQUs7SUFDTCxPQUFJO0lBQ0osUUFBSyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgUHJvamVjdCB7XHJcbiAgICBpZDogc3RyaW5nO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgc3RhcnREYXRlPzogRGF0ZTtcclxuICAgIHRhc2tzOiBUYXNrW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGFzayB7XHJcbiAgICBpZDogc3RyaW5nO1xyXG4gICAgdHJlZVBhdGg6IHN0cmluZztcclxuICAgIHBhcmVudElkOiBzdHJpbmc7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICByZXNvdXJjZT86IHN0cmluZztcclxuICAgIHN0YXJ0OiBEYXRlO1xyXG4gICAgZW5kPzogRGF0ZTsgXHJcbiAgICBwZXJjZW50Q29tcGxldGU/OiBudW1iZXI7XHJcbiAgICBzdGF0dXM/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUdhbnR0T3B0aW9ucyB7XHJcbiAgICBzY2FsZT86IElTY2FsZTtcclxuICAgIHpvb21pbmc/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVNjYWxlIHtcclxuICAgIHN0YXJ0PzogRGF0ZTtcclxuICAgIGVuZD86IERhdGU7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhclN0eWxlIHtcclxuICAgIHN0YXR1czogc3RyaW5nO1xyXG4gICAgYmFja2dyb3VuZENvbG9yOiBzdHJpbmc7XHJcbiAgICBib3JkZXI6IHN0cmluZztcclxuICAgIHByb2dyZXNzQmFja2dyb3VuZENvbG9yOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFpvb21pbmcge1xyXG4gICAgaG91cnMsXHJcbiAgICBkYXlzLFxyXG4gICAgd2Vla3NcclxufVxyXG4iXX0=