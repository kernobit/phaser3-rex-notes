## Introduction

A container with a title, content, buttons and background.

- Author: Rex
- A kind of game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/templates/ui/ui-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexuiplugin.min.js)

[Class](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/templates/ui/dialog/Dialog.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-dialog)

### Install scene plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import UIPlugin from 'rexTemplates/ui/ui-plugin.js';

var config = {
    // ...
    plugins: {
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        },
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

### Add dialog object

```javascript
var dialog = scene.rexUI.add.dialog({
    // Position
    x: 0,
    y: 0,

    // Elements
    background: backgroundGameObject,

    title: titleGameObject,

    toolbar: [
        buttonGameObject,
        buttonGameObject,
        // ...
    ],

    content: contentGameObject,

    description: descriptionGameObject,

    choices: [
        buttonGameObject,
        buttonGameObject,
        // ...
    ],

    actions: [
        buttonGameObject,
        buttonGameObject,
        // ...
    ],

    // Space
    space: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,

        title: 0,
        titleLeft: 0,
        titleRight: 0,
        content: 0,
        contentLeft: 0,
        contentRight: 0,
        description: 0,
        descriptionLeft: 0,
        descriptionRight: 0
        choices: 0,
        choicesLeft: 0,
        choicesRight: 0,
        actionsLeft: 0,
        actionsRight: 0,

        toolbarItem: 0,
        choice: 0,
        action: 0,
    },

    expand: {
        title: true,
        content: true,
        description: true,
        choices: true,
        actions: true,
    },

    align: {
        title: 'center',
        content: 'center',
        description: 'center',
        choices: 'center',
        actions: 'center',
    },

    click: {
        mode: 'pointerup',
        clickInterval: 100
    }

    width: 0,
    height: 0,
    name: '',
});
```

- `x`, `y` : Position of this dialog object, it is valid when this dialog is the top object.
- `background` : Game object of background, optional. This background game object will be resized to fit the size of dialog.
- `title` : Game object of title, optional.
- `toolbar` : Array of Game objects for toolbar-buttons group which arranged from left to right, optional.
- `content` : Game object of content, optional.
- `description` : Game object of description, optional.
- `choices` : Array of Game objects for choice-buttons group which arranged from top to bottom, optional.
- `actions` : Array of Game objects for action-buttons group which arranged from left to right, optional.
- `space` : Pads spaces
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.
    - `space.title` : Space between title game object and below game object.
    - `space.titleLeft`, `space.titleRight` : Extra left/right padding of title game object.
    - `space.content` : Space between content game object and below game object.
    - `space.contentLeft`, `space.contentRight` : Extra left/right padding of content game object.
    - `space.description` : Space between description game object and below game object.
    - `space.descriptionLeft`, `space.descriptionRight` : Extra left/right padding of description game object.
    - `space.choices` : Space between last choice-button and below game object.
    - `space.choicesLeft`, `space.choicesRight` : Extra left/right padding of choice buttons.
    - `space.actionsLeft`, `space.actionsRight` : Extra left/right padding of actions buttons.
    - `space.toolbarItem` : Space between 2 toolbar item game objects.
    - `space.choice` : Space between 2 choice-button game objects.
    - `space.action` : Space between 2 action-button game objects.
- `expand` : Expand width of element
    - `expand.title` : Set `true` to expand width of title game object.
    - `expand.content`
    - `expand.description`
    - `expand.choices`
    - `expand.actions`
- `align` : Align element
    - `align.title`
        - `'center'`, or `Phaser.Display.Align.CENTER` : Align game object at center. Default value.
        - `'left'`, or `Phaser.Display.Align.LEFT_CENTER` : Align game object at left-center.
        - `'right'`, or `Phaser.Display.Align.RIGHT_CENTER` : Align game object at right-center.    
    - `align.content`
    - `align.description`
    - `align.choices`
    - `align.actions` : Alignment of action-buttons.
- `click`: Configuration of [button clicking](button.md).
    - `click.mode` :
        - `'pointerdown'`, `'press'`, or `0` : Fire 'click' event when touch pressed.
        - `'pointerup'`, `'release'`, or `1` : Fire 'click' event when touch released after pressed.
    - `click.clickInterval` : Interval between 2 'click' events, in ms.
- `name` : Set name of this dialog.
- `width`, `height` : Minimum width, minimum height.

### Custom class

- Define class
    ```javascript
    class MyDialog extends RexPlugins.UI.Dialog {
        constructor(scene, config) {
            super(scene, config);
            // ...
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var dialog = new MyDialog(scene, config);
    ```

### Layout children

Arrange position of all elements.

```javascript
dialog.layout();
```

### Other properties

See [sizer object](ui-sizer.md)

### Events

- Click button
    ```javascript
    dialog.on('button.click', function(button, groupName, index) {
        // ...
    }, scope);
    ```
    - `button` : Triggered button game object.
    - `groupName` : `'choices'` or `'actions'`.
    - `index` : Index of triggered button game object.
- Pointer-over button
    ```javascript
    dialog.on('button.over', function(button, groupName, index) {
        // ...
    }, scope);
    ```
    - `button` : Triggered button game object
    - `groupName` : `'choices'` or `'actions'`.
    - `index` : Index of triggered button game object
- Pointer-out button
    ```javascript
    dialog.on('button.out', function(button, groupName, index) {
        // ...
    }, scope);
    ```
    - `button` : Triggered button game object.
    - `groupName` : `'choices'` or `'actions'`.
    - `index` : Index of triggered button game object.

### Get element

- Get element
    - Background game object
        ```javascript
        var background = dialog.getElement('background');
        ```
    - Title game object
        ```javascript
        var title = dialog.getElement('title');
        ```
    - Content game object
        ```javascript
        var content = dialog.getElement('content');
        ```
    - Button game object
        ```javascript
        var button = dialog.getElement('choices[' + index + ']');
        ```
        or
        ```javascript
        var button = dialog.getElement('actions[' + index + ']');
        ```        
- Get by name
    ```javascript
    var gameObject = dialog.getElement('#' + name);
    ```
