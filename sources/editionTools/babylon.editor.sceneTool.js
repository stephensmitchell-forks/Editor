var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BABYLON;
(function (BABYLON) {
    var EDITOR;
    (function (EDITOR) {
        var SceneTool = (function (_super) {
            __extends(SceneTool, _super);
            /**
            * Constructor
            * @param editionTool: edition tool instance
            */
            function SceneTool(editionTool) {
                _super.call(this, editionTool);
                // Public members
                this.scene = null;
                this.tab = "SCENE.TAB";
                // Initialize
                this.containers = [
                    "BABYLON-EDITOR-EDITION-TOOL-SCENE"
                ];
            }
            // Object supported
            SceneTool.prototype.isObjectSupported = function (object) {
                if (object instanceof BABYLON.Scene)
                    return true;
                return false;
            };
            // Creates the UI
            SceneTool.prototype.createUI = function () {
                // Tabs
                this._editionTool.panel.createTab({ id: this.tab, caption: "Scene" });
            };
            // Update
            SceneTool.prototype.update = function () {
                var object = this.object = this._editionTool.object;
                if (this._element) {
                    this._element.remove();
                    this._element = null;
                }
                if (!object)
                    return;
                this._element = new EDITOR.GUI.GUIEditForm(this.containers[0], this._editionTool.core);
                this._element.buildElement(this.containers[0]);
                this._element.remember(object);
                // Colors
                var colorsFolder = this._element.addFolder("Colors");
                var ambientColorFolder = colorsFolder.addFolder("Ambient Color");
                ambientColorFolder.add(object.ambientColor, "r").min(0.0).max(1.0).step(0.001);
                ambientColorFolder.add(object.ambientColor, "g").min(0.0).max(1.0).step(0.001);
                ambientColorFolder.add(object.ambientColor, "b").min(0.0).max(1.0).step(0.001);
                var clearColorFolder = colorsFolder.addFolder("Clear Color");
                clearColorFolder.add(object.clearColor, "r").min(0.0).max(1.0).step(0.001);
                clearColorFolder.add(object.clearColor, "g").min(0.0).max(1.0).step(0.001);
                clearColorFolder.add(object.clearColor, "b").min(0.0).max(1.0).step(0.001);
                // Collisions
                var collisionsFolder = this._element.addFolder("Collisions");
                collisionsFolder.add(object, "collisionsEnabled").name("Collisions Enabled");
                var gravityFolder = collisionsFolder.addFolder("Gravity");
                gravityFolder.add(object.gravity, "x");
                gravityFolder.add(object.gravity, "y");
                gravityFolder.add(object.gravity, "z");
                // Audio
                var audioFolder = this._element.addFolder("Audio");
                audioFolder.add(object, "audioEnabled").name("Audio Enabled");
                // Fog
                var fogFolder = this._element.addFolder("Fog");
                fogFolder.add(object, "fogMode", [
                    "None",
                    "Exp",
                    "Exp2",
                    "Linear"
                ]).name("Fog Mode").onFinishChange(function (result) {
                    switch (result) {
                        case "Exp":
                            object.fogMode = BABYLON.Scene.FOGMODE_EXP;
                            break;
                        case "Exp2":
                            object.fogMode = BABYLON.Scene.FOGMODE_EXP2;
                            break;
                        case "Linear":
                            object.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
                            break;
                        default:
                            object.fogMode = BABYLON.Scene.FOGMODE_NONE;
                            break;
                    }
                });
                fogFolder.add(object, "fogEnabled").name("Enable Fog");
                fogFolder.add(object, "fogStart").name("Fog Start").min(0.0);
                fogFolder.add(object, "fogEnd").name("Fog End").min(0.0);
                fogFolder.add(object, "fogDensity").name("Fog Density").min(0.0);
                var fogColorFolder = fogFolder.addFolder("Fog Color");
                fogColorFolder.add(object.fogColor, "r").min(0.0).max(1.0).step(0.001);
                fogColorFolder.add(object.fogColor, "g").min(0.0).max(1.0).step(0.001);
                fogColorFolder.add(object.fogColor, "b").min(0.0).max(1.0).step(0.001);
                // Capacities
                var capacitiesFolder = this._element.addFolder("Capacities");
                /*
                object.audioEnabled;
                object.collisionsEnabled;
                object.gravity;
                object.headphone;
                */
                // Capacities
            };
            // Resize
            SceneTool.prototype.resize = function () {
                this._element.width = this._editionTool.panel.width - 15;
            };
            return SceneTool;
        })(EDITOR.AbstractTool);
        EDITOR.SceneTool = SceneTool;
    })(EDITOR = BABYLON.EDITOR || (BABYLON.EDITOR = {}));
})(BABYLON || (BABYLON = {}));
//# sourceMappingURL=babylon.editor.sceneTool.js.map