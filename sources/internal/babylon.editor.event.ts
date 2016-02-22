﻿module BABYLON.EDITOR {
    /**
    * Event Type
    */
    export enum EventType {
        SCENE_EVENT = 0,
        GUI_EVENT = 1,

        UNKNOWN = 2
    }

    export enum GUIEventType {
        FORM_CHANGED = 0,
        FORM_TOOLBAR_CLICKED = 1,
        LAYOUT_CHANGED = 2,
        PANEL_CHANGED = 3,
        GRAPH_SELECTED = 4,
        TAB_CHANGED = 5,
        TOOLBAR_MENU_SELECTED = 6,
        GRAPH_MENU_SELECTED = 7,

        GRID_SELECTED = 8,
        GRID_ROW_REMOVED = 9,
        GRID_ROW_ADDED = 10,
        GRID_ROW_EDITED = 11,
        GRID_MENU_SELECTED = 12,

        WINDOW_BUTTON_CLICKED = 13,

        OBJECT_PICKED = 14,

        UNKNOWN = 15
    }

    export enum SceneEventType {
        OBJECT_PICKED = 0,
        OBJECT_ADDED = 1,
        OBJECT_REMOVED = 2,
        OBJECT_CHANGED = 3,

        UNKNOWN = 4
    }

    /**
    * Base Event
    */
    export class BaseEvent {
        public data: any;

        constructor(data?: Object) {
            this.data = data;
        }
    }

    /**
    * Scene Event
    */
    export class SceneEvent extends BaseEvent {
        public object: any;
        public eventType: SceneEventType;

        /**
        * Constructor
        * @param object: the object generating the event
        */
        constructor(object: any, eventType: number, data?: Object) {
            super(data);

            this.object = object;
            this.eventType = eventType
        }
    }

    /**
    * GUI Event
    */
    export class GUIEvent extends BaseEvent {
        public caller: GUI.IGUIElement;
        public eventType: GUIEventType;

        /**
        * Constructor
        * @param caller: gui element calling the event
        * @param eventType: the gui event type
        */
        constructor(caller: GUI.GUIElement, eventType: number, data?: Object)
        {
            super(data);

            this.caller = caller;
            this.eventType = eventType;
        }
    }

    /**
    * IEvent implementation
    */
    export class Event implements IEvent {
        public eventType: EventType = EventType.UNKNOWN;

        public sceneEvent: SceneEvent = null;
        public guiEvent: GUIEvent = null;

        static sendSceneEvent(object: any, type: SceneEventType, core: EditorCore): void {
            var ev = new Event();

            ev.eventType = EventType.SCENE_EVENT;
            ev.sceneEvent = new SceneEvent(object, type);

            core.sendEvent(ev);
        }

        static sendGUIEvent(object: any, type: GUIEventType, core: EditorCore): void {
            var ev = new Event();

            ev.eventType = EventType.GUI_EVENT;
            ev.guiEvent = new GUIEvent(object, type);

            core.sendEvent(ev);
        }
    }

    /**
    * Statics
    */

    /**
    * Sends a scene event
    */
    var sendSceneEvent = (object: any, type: SceneEventType, core: EditorCore) => {
        var ev = new Event();

        ev.eventType = EventType.SCENE_EVENT;
        ev.sceneEvent = new SceneEvent(object, type);

        core.sendEvent(ev);
    };
}
