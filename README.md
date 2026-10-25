# Diagram Maker, as served on mytekdev.com

Diagram Maker is the diagram editor students use on mytekdev.com. It is the
open-source draw.io editor by draw.io Ltd (previously JGraph) and draw.io AG
([source](https://github.com/jgraph/drawio)), set up to run inside our site. The
code is licensed under the Apache License 2.0 (see LICENSE), and so are our
changes.

This project is not affiliated with or endorsed by draw.io. draw.io is a
registered trademark of its owners, which is why the app goes by another name.

## Where it comes from

The first commit is `src/main/webapp` from jgraph/drawio at tag
[v29.5.2](https://github.com/jgraph/drawio/tree/v29.5.2) (commit b2a9aa13dcb0),
with every file byte for byte as upstream ships it, including the built
`js/app.min.js`. Upstream builds that bundle from the unminified sources in the
same folder (`js/grapheditor`, `js/diagramly` and the rest).

Left out are the parts we do not run: the Java servlets (META-INF, WEB-INF),
the cloud connector pages, the service worker, the integrate and viewer bundles,
and a notes file in `js/diagramly/vsdx`.

## What we changed

The commits after the first one are all of it:

1. **`js/PreConfig.js`.** Diagrams stay on the device. Google Drive, Dropbox,
   OneDrive, GitHub, GitLab and Trello are off, the export and PlantUML servers
   point at nothing, and the Save and Exit buttons are hidden because the site
   saves the diagram itself.
2. **`js/PostConfig.js`.** Keeps the editor as `window.drawioUI` and fires a
   `drawio:ready` event, so the page that hosts it can load and save diagrams.
   The keyboard shortcut sheet opens over the editor instead of in a new tab.
3. **`index.html` and `icon.svg`.** The page text says Diagram Maker, and the
   app tile is ours.

## Checking it

```
git clone --depth 1 --branch v29.5.2 https://github.com/jgraph/drawio.git upstream
git clone https://github.com/myteklab/diagram-maker.git ours
git -C ours checkout "$(git -C ours rev-list --max-parents=0 HEAD)"
diff -r --exclude=.git upstream/src/main/webapp ours
```

Every difference is a file that is only in `upstream`.

## Icons and templates

Upstream's terms for the icon sets, stencil libraries and diagram templates
carry over unchanged:

> The icon sets and stencil libraries included in this software, and any
> derivatives thereof (including conversions to other formats, traced
> reproductions, substantially similar visual representations, or AI-generated
> images created using these icons as reference or training input), may not be
> used as software assets in, distributed for use with, or incorporated into
> Atlassian products or products distributed through the Atlassian marketplace
> or plugin ecosystem, without explicit written permission.
>
> This restriction does not apply to end-user diagram output (such as exported
> images or documents) created using this software.

The page that embeds the editor on mytekdev.com and the script that connects it
to the site are separate programs that use the hook above. They are not part of
this repository.
