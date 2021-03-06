import NOOP from '../../../plugins/utils/object/NOOP.js';
import ResizeGameObject from '../utils/ResizeGameObject.js';
import GetChildWidth from './GetChildWidth.js';
import GetChildHeight from './GetChildHeight.js';
import GetMaxChildWidth from './GetMaxChildWidth.js';
import GetMaxChildHeight from './GetMaxChildHeight.js';

const Zone = Phaser.GameObjects.Zone;
const AlignIn = Phaser.Display.Align.In.QuickSet;

var Layout = function (parent) {
    // Skip invisible sizer
    if (!this.visible) {
        return this;
    }

    var isTopSizer = (parent === undefined);

    // Set size
    var newWidth, newHeight;
    var expandX, expandY;
    if (!isTopSizer) {
        if (this.rexSizer.expand) {
            if (parent.orientation === 0) { // x
                expandY = 1;
            } else { // y
                expandX = 1;
            }
        }
        if (this.rexSizer.proportion > 0) {
            if (parent.orientation === 0) { // x
                expandX = 2;
            } else { // y
                expandY = 2;
            }
        }
    }
    switch (expandX) {
        case 1: // rexSizer.expand
            var padding = this.rexSizer.padding;
            newWidth = parent.width - padding.left - padding.right;
            break;
        case 2: // rexSizer.proportion > 0
            var padding = this.rexSizer.padding;
            newWidth = (this.rexSizer.proportion * parent.proportionLength) - padding.left - padding.right;
            break;
        default:
            newWidth = Math.max(this.maxChildWidth, this.minWidth);
            break;
    }
    switch (expandY) {
        case 1: // rexSizer.expand
            var padding = this.rexSizer.padding;
            newHeight = parent.height - padding.top - padding.bottom;
            break;
        case 2: // rexSizer.proportion > 0
            var padding = this.rexSizer.padding;
            newHeight = (this.rexSizer.proportion * parent.proportionLength) - padding.top - padding.bottom;
            break;
        default:
            newHeight = Math.max(this.maxChildHeight, this.minHeight);
            break;
    }
    this.resize(newWidth, newHeight);

    // Layout children    
    var children = this.sizerChildren;
    var child, childConfig, padding;
    var startX = this.left,
        startY = this.top,
        endX = this.right,
        endY = this.bottom;
    var itemX = startX,
        itemY = startY;
    var x, y, width, height; // Align zone
    var childWidth, childHeight;

    var rowChildren = [];
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        // Skip invisible child
        if (!child.visible) {
            continue;
        }

        if (child.isRexSizer) {
            child.layout(this);
        }

        childConfig = child.rexSizer;
        padding = childConfig.padding;
        if (this.orientation === 0) { // x
            childWidth = GetChildWidth(child);
            if ((itemX + childWidth) > endX) {
                itemX = startX;
                itemY += GetMaxChildHeight(rowChildren);;
                rowChildren.length = 0;
            }
            x = (itemX + padding.left);
            y = (itemY + padding.top);
            width = child.width;
            height = child.height;
            itemX += childWidth;
        } else { // y
            childHeight = GetChildHeight(child);
            if ((itemY + childHeight) > endY) {
                itemY = startY;
                itemX += GetMaxChildWidth(rowChildren);
                rowChildren.length = 0;
            }
            x = (itemX + padding.left);
            y = (itemY + padding.top);
            width = child.width;
            height = child.height;
            itemY += childHeight;
        }

        rowChildren.push(child);
        tmpZone.setPosition(x, y).setSize(width, height);
        AlignIn(child, tmpZone, childConfig.align);
        this.resetChildState(child);
    }

    // Layout background children
    for (var i = 0, cnt = this.backgroundChildren.length; i < cnt; i++) {
        child = this.backgroundChildren[i];
        // Skip invisible child
        if (!child.visible) {
            continue;
        }
        childConfig = child.rexSizer;
        padding = childConfig.padding;
        x = (startX + padding.left);
        y = (startY + padding.top);
        width = this.width - padding.left - padding.right;
        height = this.height - padding.top - padding.bottom;
        ResizeGameObject(child, width, height);
        tmpZone.setPosition(x, y).setSize(width, height);
        AlignIn(child, tmpZone, childConfig.align);
        this.resetChildState(child);
    }

    return this;
}

var tmpZone = new Zone({
    sys: {
        queueDepthSort: NOOP,
        events: {
            once: NOOP
        }
    }
}, 0, 0, 1, 1);
tmpZone.setOrigin(0);

export default Layout;