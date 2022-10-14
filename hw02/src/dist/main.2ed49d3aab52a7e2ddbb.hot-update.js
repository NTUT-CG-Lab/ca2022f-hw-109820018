"use strict";
self["webpackHotUpdate"]("main",{

/***/ "./src/lapplive2dmanager.ts":
/*!**********************************!*\
  !*** ./src/lapplive2dmanager.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LAppLive2DManager = exports.s_instance = void 0;
var cubismmatrix44_1 = __webpack_require__(/*! @framework/math/cubismmatrix44 */ "../../../Framework/src/math/cubismmatrix44.ts");
var csmvector_1 = __webpack_require__(/*! @framework/type/csmvector */ "../../../Framework/src/type/csmvector.ts");
var LAppDefine = __importStar(__webpack_require__(/*! ./lappdefine */ "./src/lappdefine.ts"));
var lappdelegate_1 = __webpack_require__(/*! ./lappdelegate */ "./src/lappdelegate.ts");
var lappmodel_1 = __webpack_require__(/*! ./lappmodel */ "./src/lappmodel.ts");
var lapppal_1 = __webpack_require__(/*! ./lapppal */ "./src/lapppal.ts");
exports.s_instance = null;
var LAppLive2DManager = (function () {
    function LAppLive2DManager() {
        this._finishedMotion = function (self) {
            lapppal_1.LAppPal.printMessage('Motion Finished:');
            console.log(self);
        };
        this.stupidRice = false;
        this._viewMatrix = new cubismmatrix44_1.CubismMatrix44();
        this._models = new csmvector_1.csmVector();
        this._sceneIndex = 0;
        this.changeScene(this._sceneIndex);
    }
    LAppLive2DManager.getInstance = function () {
        if (exports.s_instance == null) {
            exports.s_instance = new LAppLive2DManager();
        }
        return exports.s_instance;
    };
    LAppLive2DManager.releaseInstance = function () {
        if (exports.s_instance != null) {
            exports.s_instance = void 0;
        }
        exports.s_instance = null;
    };
    LAppLive2DManager.prototype.getModel = function (no) {
        if (no < this._models.getSize()) {
            return this._models.at(no);
        }
        return null;
    };
    LAppLive2DManager.prototype.releaseAllModel = function () {
        for (var i = 0; i < this._models.getSize(); i++) {
            this._models.at(i).release();
            this._models.set(i, null);
        }
        this._models.clear();
    };
    LAppLive2DManager.prototype.onDrag = function (x, y) {
        for (var i = 0; i < this._models.getSize(); i++) {
            var model = this.getModel(i);
            if (model) {
                model.setDragging(x, y);
            }
        }
    };
    LAppLive2DManager.prototype.onTap = function (x, y) {
        if (LAppDefine.DebugLogEnable) {
            lapppal_1.LAppPal.printMessage("[APP]tap point: {x: ".concat(x.toFixed(2), " y: ").concat(y.toFixed(2), "}"));
        }
        for (var i = 0; i < this._models.getSize(); i++) {
            if (this._models.at(i).hitTest(LAppDefine.HitAreaNameHead, x, y)) {
                if (LAppDefine.DebugLogEnable) {
                    lapppal_1.LAppPal.printMessage("[APP]hit area: [".concat(LAppDefine.HitAreaNameHead, "]"));
                }
                this._models.at(i).setRandomExpression();
            }
            else if (this._models.at(i).hitTest(LAppDefine.HitAreaNameBody, x, y)) {
                if (LAppDefine.DebugLogEnable) {
                    lapppal_1.LAppPal.printMessage("[APP]hit area: [".concat(LAppDefine.HitAreaNameBody, "]"));
                }
                this._models
                    .at(i)
                    .startRandomMotion(LAppDefine.MotionGroupTapBody, LAppDefine.PriorityNormal, this._finishedMotion);
            }
        }
    };
    LAppLive2DManager.prototype.update = function (x, y, scale) {
        var width = lappdelegate_1.canvas.width, height = lappdelegate_1.canvas.height;
        var modelCount = this._models.getSize();
        for (var i = 0; i < modelCount; ++i) {
            var projection = new cubismmatrix44_1.CubismMatrix44();
            var model = this.getModel(i);
            if (model.getModel()) {
                if (model.getModel().getCanvasWidth() > 1.0 && width < height) {
                    model.getModelMatrix().setWidth(2.0);
                    projection.scale(1.0, width / height);
                }
                else {
                    projection.scale(height / width, 1.0);
                }
                if (this._viewMatrix != null) {
                    projection.multiplyByMatrix(this._viewMatrix);
                }
            }
            projection.translateRelative(x, y);
            projection.scaleRelative(scale, scale);
            model.update();
            model.draw(projection);
        }
    };
    LAppLive2DManager.prototype.onUpdate = function () {
        var width = lappdelegate_1.canvas.width, height = lappdelegate_1.canvas.height;
        var modelCount = this._models.getSize();
        for (var i = 0; i < modelCount; ++i) {
            var projection = new cubismmatrix44_1.CubismMatrix44();
            var model = this.getModel(i);
            if (model.getModel()) {
                if (model.getModel().getCanvasWidth() > 1.0 && width < height) {
                    model.getModelMatrix().setWidth(2.0);
                    projection.scale(1.0, width / height);
                }
                else {
                    projection.scale(height / width, 1.0);
                }
                if (this._viewMatrix != null) {
                    projection.multiplyByMatrix(this._viewMatrix);
                }
            }
            model.update();
            model.draw(projection);
        }
    };
    LAppLive2DManager.prototype.nextScene = function () {
        var no = (this._sceneIndex + 1) % LAppDefine.ModelDirSize;
        this.changeScene(no);
    };
    LAppLive2DManager.prototype.changeScene = function (index) {
        this._sceneIndex = index;
        if (LAppDefine.DebugLogEnable) {
            lapppal_1.LAppPal.printMessage("[APP]model index: ".concat(this._sceneIndex));
        }
        var model = LAppDefine.ModelDir[index];
        var modelPath = LAppDefine.ResourcesPath + model + '/';
        var modelJsonName = LAppDefine.ModelDir[index];
        modelJsonName += '.model3.json';
        this.releaseAllModel();
        this._models.pushBack(new lappmodel_1.LAppModel());
        this._models.at(0).loadAssets(modelPath, modelJsonName);
    };
    LAppLive2DManager.prototype.setViewMatrix = function (m) {
        for (var i = 0; i < 16; i++) {
            this._viewMatrix.getArray()[i] = m.getArray()[i];
        }
    };
    return LAppLive2DManager;
}());
exports.LAppLive2DManager = LAppLive2DManager;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ !function() {
/******/ 	__webpack_require__.h = function() { return "228b7ee36e5233569e9a"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4yZWQ0OWQzYWFiNTJhN2UyZGRiYi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBU0Esa0lBQWdFO0FBRWhFLG1IQUFzRDtBQUV0RCw4RkFBMkM7QUFDM0Msd0ZBQXdDO0FBQ3hDLCtFQUF3QztBQUN4Qyx5RUFBb0M7QUFFekIsa0JBQVUsR0FBc0IsSUFBSSxDQUFDO0FBTWhEO0lBbVBFO1FBV0Esb0JBQWUsR0FBRyxVQUFDLElBQW1CO1lBQ3BDLGlCQUFPLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUM7UUFHRixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBaEJqQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksK0JBQWMsRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxxQkFBUyxFQUFhLENBQUM7UUFDMUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQWpQYSw2QkFBVyxHQUF6QjtRQUNFLElBQUksa0JBQVUsSUFBSSxJQUFJLEVBQUU7WUFDdEIsa0JBQVUsR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUM7U0FDdEM7UUFFRCxPQUFPLGtCQUFVLENBQUM7SUFDcEIsQ0FBQztJQUthLGlDQUFlLEdBQTdCO1FBQ0UsSUFBSSxrQkFBVSxJQUFJLElBQUksRUFBRTtZQUN0QixrQkFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDO1NBQ3JCO1FBRUQsa0JBQVUsR0FBRyxJQUFJLENBQUM7SUFDcEIsQ0FBQztJQVFNLG9DQUFRLEdBQWYsVUFBZ0IsRUFBVTtRQUN4QixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxF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VUFBVSxDQUFDLGNBQWMsRUFBRTtZQUM3QixpQkFBTyxDQUFDLFlBQVksQ0FBQyw0QkFBcUIsSUFBSSxDQUFDLFdBQVcsQ0FBRSxDQUFDLENBQUM7U0FDL0Q7UUFLRCxJQUFNLEtBQUssR0FBVyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pELElBQU0sU0FBUyxHQUFXLFVBQVUsQ0FBQyxhQUFhLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUNqRSxJQUFJLGFBQWEsR0FBVyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZELGFBQWEsSUFBSSxjQUFjLENBQUM7UUFFaEMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUkscUJBQVMsRUFBRSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRU0seUNBQWEsR0FBcEIsVUFBcUIsQ0FBaUI7UUFDcEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMzQixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNsRDtJQUNILENBQUM7SUF1Qkgsd0JBQUM7QUFBRCxDQUFDO0FBclFZLDhDQUFpQjs7Ozs7Ozs7O1VDeEI5QixxQ0FBcUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbGFwcGxpdmUyZG1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJcblxuLyoqXG4gKiBDb3B5cmlnaHQoYykgTGl2ZTJEIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSB0aGUgTGl2ZTJEIE9wZW4gU29mdHdhcmUgbGljZW5zZVxuICogdGhhdCBjYW4gYmUgZm91bmQgYXQgaHR0cHM6Ly93d3cubGl2ZTJkLmNvbS9ldWxhL2xpdmUyZC1vcGVuLXNvZnR3YXJlLWxpY2Vuc2UtYWdyZWVtZW50X2VuLmh0bWwuXG4gKi9cblxuaW1wb3J0IHsgQ3ViaXNtTWF0cml4NDQgfSBmcm9tICdAZnJhbWV3b3JrL21hdGgvY3ViaXNtbWF0cml4NDQnO1xuaW1wb3J0IHsgQUN1YmlzbU1vdGlvbiB9IGZyb20gJ0BmcmFtZXdvcmsvbW90aW9uL2FjdWJpc21tb3Rpb24nO1xuaW1wb3J0IHsgY3NtVmVjdG9yIH0gZnJvbSAnQGZyYW1ld29yay90eXBlL2NzbXZlY3Rvcic7XG5cbmltcG9ydCAqIGFzIExBcHBEZWZpbmUgZnJvbSAnLi9sYXBwZGVmaW5lJztcbmltcG9ydCB7IGNhbnZhcyB9IGZyb20gJy4vbGFwcGRlbGVnYXRlJztcbmltcG9ydCB7IExBcHBNb2RlbCB9IGZyb20gJy4vbGFwcG1vZGVsJztcbmltcG9ydCB7IExBcHBQYWwgfSBmcm9tICcuL2xhcHBwYWwnO1xuXG5leHBvcnQgbGV0IHNfaW5zdGFuY2U6IExBcHBMaXZlMkRNYW5hZ2VyID0gbnVsbDtcblxuLyoqXG4gKiDjgrXjg7Pjg5fjg6vjgqLjg5fjg6rjgrHjg7zjgrfjg6fjg7PjgavjgYrjgYTjgaZDdWJpc21Nb2RlbOOCkueuoeeQhuOBmeOCi+OCr+ODqeOCuVxuICog44Oi44OH44Or55Sf5oiQ44Go56C05qOE44CB44K/44OD44OX44Kk44OZ44Oz44OI44Gu5Yem55CG44CB44Oi44OH44Or5YiH44KK5pu/44GI44KS6KGM44GG44CCXG4gKi9cbmV4cG9ydCBjbGFzcyBMQXBwTGl2ZTJETWFuYWdlciB7XG4gIC8qKlxuICAgKiDjgq/jg6njgrnjga7jgqTjg7Pjgrnjgr/jg7PjgrnvvIjjgrfjg7PjgrDjg6vjg4jjg7PvvInjgpLov5TjgZnjgIJcbiAgICog44Kk44Oz44K544K/44Oz44K544GM55Sf5oiQ44GV44KM44Gm44GE44Gq44GE5aC05ZCI44Gv5YaF6YOo44Gn44Kk44Oz44K544K/44Oz44K544KS55Sf5oiQ44GZ44KL44CCXG4gICAqXG4gICAqIEByZXR1cm4g44Kv44Op44K544Gu44Kk44Oz44K544K/44Oz44K5XG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IExBcHBMaXZlMkRNYW5hZ2VyIHtcbiAgICBpZiAoc19pbnN0YW5jZSA9PSBudWxsKSB7XG4gICAgICBzX2luc3RhbmNlID0gbmV3IExBcHBMaXZlMkRNYW5hZ2VyKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNfaW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICog44Kv44Op44K544Gu44Kk44Oz44K544K/44Oz44K577yI44K344Oz44Kw44Or44OI44Oz77yJ44KS6Kej5pS+44GZ44KL44CCXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHJlbGVhc2VJbnN0YW5jZSgpOiB2b2lkIHtcbiAgICBpZiAoc19pbnN0YW5jZSAhPSBudWxsKSB7XG4gICAgICBzX2luc3RhbmNlID0gdm9pZCAwO1xuICAgIH1cblxuICAgIHNfaW5zdGFuY2UgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIOePvuWcqOOBruOCt+ODvOODs+OBp+S/neaMgeOBl+OBpuOBhOOCi+ODouODh+ODq+OCkui/lOOBmeOAglxuICAgKlxuICAgKiBAcGFyYW0gbm8g44Oi44OH44Or44Oq44K544OI44Gu44Kk44Oz44OH44OD44Kv44K55YCkXG4gICAqIEByZXR1cm4g44Oi44OH44Or44Gu44Kk44Oz44K544K/44Oz44K544KS6L+U44GZ44CC44Kk44Oz44OH44OD44Kv44K55YCk44GM56+E5Zuy5aSW44Gu5aC05ZCI44GvTlVMTOOCkui/lOOBmeOAglxuICAgKi9cbiAgcHVibGljIGdldE1vZGVsKG5vOiBudW1iZXIpOiBMQXBwTW9kZWwge1xuICAgIGlmIChubyA8IHRoaXMuX21vZGVscy5nZXRTaXplKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9tb2RlbHMuYXQobm8pO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIOePvuWcqOOBruOCt+ODvOODs+OBp+S/neaMgeOBl+OBpuOBhOOCi+OBmeOBueOBpuOBruODouODh+ODq+OCkuino+aUvuOBmeOCi1xuICAgKi9cbiAgcHVibGljIHJlbGVhc2VBbGxNb2RlbCgpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX21vZGVscy5nZXRTaXplKCk7IGkrKykge1xuICAgICAgdGhpcy5fbW9kZWxzLmF0KGkpLnJlbGVhc2UoKTtcbiAgICAgIHRoaXMuX21vZGVscy5zZXQoaSwgbnVsbCk7XG4gICAgfVxuXG4gICAgdGhpcy5fbW9kZWxzLmNsZWFyKCk7XG4gIH1cblxuICAvKipcbiAgICog55S76Z2i44KS44OJ44Op44OD44Kw44GX44Gf5pmC44Gu5Yem55CGXG4gICAqXG4gICAqIEBwYXJhbSB4IOeUu+mdouOBrljluqfmqJlcbiAgICogQHBhcmFtIHkg55S76Z2i44GuWeW6p+aomVxuICAgKi9cbiAgcHVibGljIG9uRHJhZyh4OiBudW1iZXIsIHk6IG51bWJlcik6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbW9kZWxzLmdldFNpemUoKTsgaSsrKSB7XG4gICAgICBjb25zdCBtb2RlbDogTEFwcE1vZGVsID0gdGhpcy5nZXRNb2RlbChpKTtcblxuICAgICAgaWYgKG1vZGVsKSB7XG4gICAgICAgIG1vZGVsLnNldERyYWdnaW5nKHgsIHkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDnlLvpnaLjgpLjgr/jg4Pjg5fjgZfjgZ/mmYLjga7lh6bnkIZcbiAgICpcbiAgICogQHBhcmFtIHgg55S76Z2i44GuWOW6p+aomVxuICAgKiBAcGFyYW0geSDnlLvpnaLjga5Z5bqn5qiZXG4gICAqL1xuICBwdWJsaWMgb25UYXAoeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoTEFwcERlZmluZS5EZWJ1Z0xvZ0VuYWJsZSkge1xuICAgICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoXG4gICAgICAgIGBbQVBQXXRhcCBwb2ludDoge3g6ICR7eC50b0ZpeGVkKDIpfSB5OiAke3kudG9GaXhlZCgyKX19YFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX21vZGVscy5nZXRTaXplKCk7IGkrKykge1xuICAgICAgaWYgKHRoaXMuX21vZGVscy5hdChpKS5oaXRUZXN0KExBcHBEZWZpbmUuSGl0QXJlYU5hbWVIZWFkLCB4LCB5KSkge1xuICAgICAgICBpZiAoTEFwcERlZmluZS5EZWJ1Z0xvZ0VuYWJsZSkge1xuICAgICAgICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKFxuICAgICAgICAgICAgYFtBUFBdaGl0IGFyZWE6IFske0xBcHBEZWZpbmUuSGl0QXJlYU5hbWVIZWFkfV1gXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tb2RlbHMuYXQoaSkuc2V0UmFuZG9tRXhwcmVzc2lvbigpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLl9tb2RlbHMuYXQoaSkuaGl0VGVzdChMQXBwRGVmaW5lLkhpdEFyZWFOYW1lQm9keSwgeCwgeSkpIHtcbiAgICAgICAgaWYgKExBcHBEZWZpbmUuRGVidWdMb2dFbmFibGUpIHtcbiAgICAgICAgICBMQXBwUGFsLnByaW50TWVzc2FnZShcbiAgICAgICAgICAgIGBbQVBQXWhpdCBhcmVhOiBbJHtMQXBwRGVmaW5lLkhpdEFyZWFOYW1lQm9keX1dYFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbW9kZWxzXG4gICAgICAgICAgLmF0KGkpXG4gICAgICAgICAgLnN0YXJ0UmFuZG9tTW90aW9uKFxuICAgICAgICAgICAgTEFwcERlZmluZS5Nb3Rpb25Hcm91cFRhcEJvZHksXG4gICAgICAgICAgICBMQXBwRGVmaW5lLlByaW9yaXR5Tm9ybWFsLFxuICAgICAgICAgICAgdGhpcy5fZmluaXNoZWRNb3Rpb25cbiAgICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gICAvKipcbiAgICog55S76Z2i44KS5pu05paw44GZ44KL44Go44GN44Gu5Yem55CGXG4gICAqIOODouODh+ODq+OBruabtOaWsOWHpueQhuWPiuOBs+aPj+eUu+WHpueQhuOCkuihjOOBhlxuICAgKiBAVE9ET1xuICAgKiB1cGRhdGXlh73mlbjlrqPlkYpcbiAgICovXG4gICAgcHVibGljIHVwZGF0ZSh4Om51bWJlciwgeTpudW1iZXIsIHNjYWxlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gY2FudmFzO1xuXG4gICAgICBjb25zdCBtb2RlbENvdW50OiBudW1iZXIgPSB0aGlzLl9tb2RlbHMuZ2V0U2l6ZSgpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vZGVsQ291bnQ7ICsraSkge1xuICAgICAgICBjb25zdCBwcm9qZWN0aW9uOiBDdWJpc21NYXRyaXg0NCA9IG5ldyBDdWJpc21NYXRyaXg0NCgpO1xuXG4gICAgICAgIGNvbnN0IG1vZGVsOiBMQXBwTW9kZWwgPSB0aGlzLmdldE1vZGVsKGkpO1xuXG4gICAgICAgIGlmIChtb2RlbC5nZXRNb2RlbCgpKSB7XG4gICAgICAgICAgaWYgKG1vZGVsLmdldE1vZGVsKCkuZ2V0Q2FudmFzV2lkdGgoKSA+IDEuMCAmJiB3aWR0aCA8IGhlaWdodCkge1xuICAgICAgICAgICAgLy8g5qiq44Gr6ZW344GE44Oi44OH44Or44KS57im6ZW344Km44Kj44Oz44OJ44Km44Gr6KGo56S644GZ44KL6Zqb44Oi44OH44Or44Gu5qiq44K144Kk44K644Gnc2NhbGXjgpLnrpflh7rjgZnjgotcbiAgICAgICAgICAgIG1vZGVsLmdldE1vZGVsTWF0cml4KCkuc2V0V2lkdGgoMi4wKTtcbiAgICAgICAgICAgIHByb2plY3Rpb24uc2NhbGUoMS4wLCB3aWR0aCAvIGhlaWdodCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb2plY3Rpb24uc2NhbGUoaGVpZ2h0IC8gd2lkdGgsIDEuMCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8g5b+F6KaB44GM44GC44KM44Gw44GT44GT44Gn5LmX566XXG4gICAgICAgICAgaWYgKHRoaXMuX3ZpZXdNYXRyaXggIT0gbnVsbCkge1xuICAgICAgICAgICAgcHJvamVjdGlvbi5tdWx0aXBseUJ5TWF0cml4KHRoaXMuX3ZpZXdNYXRyaXgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vQFRPRE8g5Yqg5YWleCwgeeS9jeenu1xuICAgICAgICAvL+S7peWPinNjYWxl5pS+5aSn57iu5bCPXG4gICAgICAgIC8vIHgsIHkg56e75YuVXG4gICAgICAgIHByb2plY3Rpb24udHJhbnNsYXRlUmVsYXRpdmUoeCwgeSk7XG4gICAgICAgIHByb2plY3Rpb24uc2NhbGVSZWxhdGl2ZShzY2FsZSwgc2NhbGUpO1xuXG4gICAgICAgIG1vZGVsLnVwZGF0ZSgpO1xuICAgICAgICBtb2RlbC5kcmF3KHByb2plY3Rpb24pOyAvLyDlj4LnhafmuKHjgZfjgarjga7jgadwcm9qZWN0aW9u44Gv5aSJ6LOq44GZ44KL44CCXG4gICAgICB9XG4gICAgfVxuXG5cbiAgLyoqXG4gICAqIOeUu+mdouOCkuabtOaWsOOBmeOCi+OBqOOBjeOBruWHpueQhlxuICAgKiDjg6Ljg4fjg6vjga7mm7TmlrDlh6bnkIblj4rjgbPmj4/nlLvlh6bnkIbjgpLooYzjgYZcbiAgICovXG4gIHB1YmxpYyBvblVwZGF0ZSgpOiB2b2lkIHtcbiAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IGNhbnZhcztcblxuICAgIGNvbnN0IG1vZGVsQ291bnQ6IG51bWJlciA9IHRoaXMuX21vZGVscy5nZXRTaXplKCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vZGVsQ291bnQ7ICsraSkge1xuICAgICAgY29uc3QgcHJvamVjdGlvbjogQ3ViaXNtTWF0cml4NDQgPSBuZXcgQ3ViaXNtTWF0cml4NDQoKTtcblxuICAgICAgLy8gQFRPRE8g5pu05pS557iu5pS+5aSn5bCPXG4gICAgICAvLyBpZiAoIXRoaXMuc3R1cGlkUmljZSkge1xuICAgICAgLy8gICBwcm9qZWN0aW9uLnNjYWxlKDQuNSwgd2lkdGggKiA0LjUgLyBoZWlnaHQpO1xuICAgICAgLy8gICBwcm9qZWN0aW9uLnRyYW5zbGF0ZVJlbGF0aXZlKDAsIC0wLjI1KTtcbiAgICAgIC8vIH1lbHNlIHtcbiAgICAgIC8vICAgcHJvamVjdGlvbi5zY2FsZSg0LjAsIHdpZHRoICogNC4wIC8gaGVpZ2h0KTtcbiAgICAgIC8vICAgcHJvamVjdGlvbi50cmFuc2xhdGVSZWxhdGl2ZSgtMC4yLCAtMC4yMCk7XG4gICAgICAvLyB9XG5cbiAgICAgIGNvbnN0IG1vZGVsOiBMQXBwTW9kZWwgPSB0aGlzLmdldE1vZGVsKGkpO1xuXG4gICAgICBpZiAobW9kZWwuZ2V0TW9kZWwoKSkge1xuICAgICAgICBpZiAobW9kZWwuZ2V0TW9kZWwoKS5nZXRDYW52YXNXaWR0aCgpID4gMS4wICYmIHdpZHRoIDwgaGVpZ2h0KSB7XG4gICAgICAgICAgLy8g5qiq44Gr6ZW344GE44Oi44OH44Or44KS57im6ZW344Km44Kj44Oz44OJ44Km44Gr6KGo56S644GZ44KL6Zqb44Oi44OH44Or44Gu5qiq44K144Kk44K644Gnc2NhbGXjgpLnrpflh7rjgZnjgotcbiAgICAgICAgICBtb2RlbC5nZXRNb2RlbE1hdHJpeCgpLnNldFdpZHRoKDIuMCk7XG4gICAgICAgICAgcHJvamVjdGlvbi5zY2FsZSgxLjAsIHdpZHRoIC8gaGVpZ2h0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm9qZWN0aW9uLnNjYWxlKGhlaWdodCAvIHdpZHRoLCAxLjApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g5b+F6KaB44GM44GC44KM44Gw44GT44GT44Gn5LmX566XXG4gICAgICAgIGlmICh0aGlzLl92aWV3TWF0cml4ICE9IG51bGwpIHtcbiAgICAgICAgICBwcm9qZWN0aW9uLm11bHRpcGx5QnlNYXRyaXgodGhpcy5fdmlld01hdHJpeCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQFRPRE8g5pu05pS557iu5pS+5aSn5bCPXG4gICAgICAvLyBpZiAobW9kZWwuX21vZGVsU2V0dGluZykge1xuICAgICAgLy8gICBpZiAobW9kZWwuX21vZGVsU2V0dGluZy5nZXRNb2RlbEZpbGVOYW1lKCkgPT0gXCJSaWNlLm1vYzNcIikge1xuICAgICAgLy8gICAgIHRoaXMuc3R1cGlkUmljZSA9IHRydWU7XG4gICAgICAvLyAgIH1cbiAgICAgIC8vICAgZWxzZSB7XG4gICAgICAvLyAgICAgdGhpcy5zdHVwaWRSaWNlID0gZmFsc2U7XG4gICAgICAvLyAgIH1cbiAgICAgIC8vIH1cblxuICAgICAgbW9kZWwudXBkYXRlKCk7XG4gICAgICBtb2RlbC5kcmF3KHByb2plY3Rpb24pOyAvLyDlj4LnhafmuKHjgZfjgarjga7jgadwcm9qZWN0aW9u44Gv5aSJ6LOq44GZ44KL44CCXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOasoeOBruOCt+ODvOODs+OBq+WIh+OCiuOBi+OBiOOCi1xuICAgKiDjgrXjg7Pjg5fjg6vjgqLjg5fjg6rjgrHjg7zjgrfjg6fjg7Pjgafjga/jg6Ljg4fjg6vjgrvjg4Pjg4jjga7liIfjgormm7/jgYjjgpLooYzjgYbjgIJcbiAgICovXG4gIHB1YmxpYyBuZXh0U2NlbmUoKTogdm9pZCB7XG4gICAgY29uc3Qgbm86IG51bWJlciA9ICh0aGlzLl9zY2VuZUluZGV4ICsgMSkgJSBMQXBwRGVmaW5lLk1vZGVsRGlyU2l6ZTtcbiAgICB0aGlzLmNoYW5nZVNjZW5lKG5vKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjgrfjg7zjg7PjgpLliIfjgormm7/jgYjjgotcbiAgICog44K144Oz44OX44Or44Ki44OX44Oq44Kx44O844K344On44Oz44Gn44Gv44Oi44OH44Or44K744OD44OI44Gu5YiH44KK5pu/44GI44KS6KGM44GG44CCXG4gICAqL1xuICBwdWJsaWMgY2hhbmdlU2NlbmUoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX3NjZW5lSW5kZXggPSBpbmRleDtcbiAgICBpZiAoTEFwcERlZmluZS5EZWJ1Z0xvZ0VuYWJsZSkge1xuICAgICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoYFtBUFBdbW9kZWwgaW5kZXg6ICR7dGhpcy5fc2NlbmVJbmRleH1gKTtcbiAgICB9XG5cbiAgICAvLyBNb2RlbERpcltd44Gr5L+d5oyB44GX44Gf44OH44Kj44Os44Kv44OI44Oq5ZCN44GL44KJXG4gICAgLy8gbW9kZWwzLmpzb27jga7jg5HjgrnjgpLmsbrlrprjgZnjgovjgIJcbiAgICAvLyDjg4fjgqPjg6zjgq/jg4jjg6rlkI3jgahtb2RlbDMuanNvbuOBruWQjeWJjeOCkuS4gOiHtOOBleOBm+OBpuOBiuOBj+OBk+OBqOOAglxuICAgIGNvbnN0IG1vZGVsOiBzdHJpbmcgPSBMQXBwRGVmaW5lLk1vZGVsRGlyW2luZGV4XTtcbiAgICBjb25zdCBtb2RlbFBhdGg6IHN0cmluZyA9IExBcHBEZWZpbmUuUmVzb3VyY2VzUGF0aCArIG1vZGVsICsgJy8nO1xuICAgIGxldCBtb2RlbEpzb25OYW1lOiBzdHJpbmcgPSBMQXBwRGVmaW5lLk1vZGVsRGlyW2luZGV4XTtcbiAgICBtb2RlbEpzb25OYW1lICs9ICcubW9kZWwzLmpzb24nO1xuXG4gICAgdGhpcy5yZWxlYXNlQWxsTW9kZWwoKTtcbiAgICB0aGlzLl9tb2RlbHMucHVzaEJhY2sobmV3IExBcHBNb2RlbCgpKTtcbiAgICB0aGlzLl9tb2RlbHMuYXQoMCkubG9hZEFzc2V0cyhtb2RlbFBhdGgsIG1vZGVsSnNvbk5hbWUpO1xuICB9XG5cbiAgcHVibGljIHNldFZpZXdNYXRyaXgobTogQ3ViaXNtTWF0cml4NDQpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyBpKyspIHtcbiAgICAgIHRoaXMuX3ZpZXdNYXRyaXguZ2V0QXJyYXkoKVtpXSA9IG0uZ2V0QXJyYXkoKVtpXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog44Kz44Oz44K544OI44Op44Kv44K/XG4gICAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl92aWV3TWF0cml4ID0gbmV3IEN1YmlzbU1hdHJpeDQ0KCk7XG4gICAgdGhpcy5fbW9kZWxzID0gbmV3IGNzbVZlY3RvcjxMQXBwTW9kZWw+KCk7XG4gICAgdGhpcy5fc2NlbmVJbmRleCA9IDA7XG4gICAgdGhpcy5jaGFuZ2VTY2VuZSh0aGlzLl9zY2VuZUluZGV4KTtcbiAgfVxuXG4gIF92aWV3TWF0cml4OiBDdWJpc21NYXRyaXg0NDsgLy8g44Oi44OH44Or5o+P55S744Gr55So44GE44KLdmlld+ihjOWIl1xuICBfbW9kZWxzOiBjc21WZWN0b3I8TEFwcE1vZGVsPjsgLy8g44Oi44OH44Or44Kk44Oz44K544K/44Oz44K544Gu44Kz44Oz44OG44OKXG4gIF9zY2VuZUluZGV4OiBudW1iZXI7IC8vIOihqOekuuOBmeOCi+OCt+ODvOODs+OBruOCpOODs+ODh+ODg+OCr+OCueWApFxuICAvLyDjg6Ljg7zjgrfjg6fjg7Plho3nlJ/ntYLkuobjga7jgrPjg7zjg6vjg5Djg4Pjgq/plqLmlbBcbiAgX2ZpbmlzaGVkTW90aW9uID0gKHNlbGY6IEFDdWJpc21Nb3Rpb24pOiB2b2lkID0+IHtcbiAgICBMQXBwUGFsLnByaW50TWVzc2FnZSgnTW90aW9uIEZpbmlzaGVkOicpO1xuICAgIGNvbnNvbGUubG9nKHNlbGYpO1xuICB9O1xuXG4gIC8vQFRPRE8g5pu05pS557iu5pS+5aSn5bCPXG4gIHN0dXBpZFJpY2UgPSBmYWxzZTtcbn1cbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gXCIyMjhiN2VlMzZlNTIzMzU2OWU5YVwiOyB9Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9