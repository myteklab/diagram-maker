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

    // Show shortcuts.svg in a modal overlay instead of opening a new tab
    var origOpenLink = Graph.prototype.openLink;
    Graph.prototype.openLink = function (url) {
        if (url && (url === 'shortcuts.svg' || url.indexOf('shortcuts.svg') !== -1)) {
            var overlay = document.createElement('div');
            overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:99999;display:flex;align-items:center;justify-content:center;cursor:pointer;';
            var img = document.createElement('img');
            img.src = 'shortcuts.svg';
            img.style.cssText = 'max-width:90%;max-height:90%;border-radius:8px;box-shadow:0 4px 24px rgba(0,0,0,0.5);';
            overlay.appendChild(img);
            overlay.addEventListener('click', function () {
                document.body.removeChild(overlay);
            });
            document.addEventListener('keydown', function handler(e) {
                if (e.key === 'Escape') {
                    if (overlay.parentNode) document.body.removeChild(overlay);
                    document.removeEventListener('keydown', handler);
                }
            });
            document.body.appendChild(overlay);
            return;
        }
        return origOpenLink.apply(this, arguments);
    };
})();
