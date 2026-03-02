/**
 * Copyright (c) 2006-2024, JGraph Holdings Ltd
 * Copyright (c) 2006-2024, draw.io AG
 *
 * Changed for Diagram Maker: the EditorUi is kept as window.drawioUI and a
 * drawio:ready event fires once it exists, for the page that hosts the editor.
 */
window.ICONSEARCH_PATH = null;

(function () {
    var origInit = EditorUi.prototype.init;
    EditorUi.prototype.init = function () {
        origInit.apply(this, arguments);
        window.drawioUI = this;
        window.dispatchEvent(new CustomEvent('drawio:ready', { detail: { ui: this } }));
    };
})();
