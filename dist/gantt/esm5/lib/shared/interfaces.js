/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function Project() { }
if (false) {
    /** @type {?|undefined} */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZ2FudHQvIiwic291cmNlcyI6WyJsaWIvc2hhcmVkL2ludGVyZmFjZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLDZCQUtDOzs7SUFKRyxxQkFBWTs7SUFDWix1QkFBYTs7SUFDYiw0QkFBaUI7O0lBQ2pCLHdCQUFjOzs7OztBQUdsQiwwQkFVQzs7O0lBVEcsa0JBQVc7O0lBQ1gsd0JBQWlCOztJQUNqQix3QkFBaUI7O0lBQ2pCLG9CQUFhOztJQUNiLHdCQUFrQjs7SUFDbEIscUJBQVk7O0lBQ1osbUJBQVc7O0lBQ1gsK0JBQXlCOztJQUN6QixzQkFBZ0I7Ozs7O0FBR3BCLG1DQUdDOzs7SUFGRyw4QkFBZTs7SUFDZixnQ0FBaUI7Ozs7O0FBR3JCLDRCQUdDOzs7SUFGRyx1QkFBYTs7SUFDYixxQkFBVzs7Ozs7QUFHZiwrQkFLQzs7O0lBSkcsMkJBQWU7O0lBQ2Ysb0NBQXdCOztJQUN4QiwyQkFBZTs7SUFDZiw0Q0FBZ0M7Ozs7SUFJaEMsUUFBSztJQUNMLE9BQUk7SUFDSixRQUFLIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBQcm9qZWN0IHtcclxuICAgIGlkPzogc3RyaW5nO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgc3RhcnREYXRlPzogRGF0ZTtcclxuICAgIHRhc2tzOiBUYXNrW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGFzayB7XHJcbiAgICBpZDogc3RyaW5nO1xyXG4gICAgdHJlZVBhdGg6IHN0cmluZztcclxuICAgIHBhcmVudElkOiBzdHJpbmc7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICByZXNvdXJjZT86IHN0cmluZztcclxuICAgIHN0YXJ0OiBEYXRlO1xyXG4gICAgZW5kPzogRGF0ZTtcclxuICAgIHBlcmNlbnRDb21wbGV0ZT86IG51bWJlcjtcclxuICAgIHN0YXR1cz86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJR2FudHRPcHRpb25zIHtcclxuICAgIHNjYWxlPzogSVNjYWxlO1xyXG4gICAgem9vbWluZz86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU2NhbGUge1xyXG4gICAgc3RhcnQ/OiBEYXRlO1xyXG4gICAgZW5kPzogRGF0ZTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmFyU3R5bGUge1xyXG4gICAgc3RhdHVzOiBzdHJpbmc7XHJcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IHN0cmluZztcclxuICAgIGJvcmRlcjogc3RyaW5nO1xyXG4gICAgcHJvZ3Jlc3NCYWNrZ3JvdW5kQ29sb3I6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGVudW0gWm9vbWluZyB7XHJcbiAgICBob3VycyxcclxuICAgIGRheXMsXHJcbiAgICB3ZWVrc1xyXG59XHJcbiJdfQ==