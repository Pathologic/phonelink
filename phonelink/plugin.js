tinymce.PluginManager.add('phonelink', function (editor) {
    function isOnlyTextSelected(anchorElm)
    {
        var html = editor.selection.getContent();

        // Partial html and not a fully selected anchor element
        if (/</.test(html) && (!/^<a [^>]+>[^<]+<\/a>$/.test(html) || html.indexOf('href=') == -1)) {
            return false;
        }

        if (anchorElm) {
            var nodes = anchorElm.childNodes, i;

            if (nodes.length === 0) {
                return false;
            }

            for (i = nodes.length - 1; i >= 0; i--) {
                if (nodes[i].nodeType != 3) {
                    return false;
                }
            }
        }

        return true;
    }

    function isPhone(text) {
        return text.test(/^[0-9\(\)\+\s\-]*$/);
    }

    function insertLink() {
        var selectedElm = editor.selection.getNode(),
            anchorElm = editor.dom.getParent(selectedElm, 'a[href]'),
            onlyText = isOnlyTextSelected() && anchorElm === null,
            text = editor.selection.getContent();
        if (onlyText && isPhone(text)) {
            var href = 'tel:+' + text.replace(/[^0-9]/gi, '');
            editor.insertContent(editor.dom.createHTML('a', {href: href}, editor.dom.encode(text)));
        };
    }
    editor.addButton('phonelink', {
        text: false,
        icon: true,
        image: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIHN0eWxlPSJmaWxsOiMwMDI4MzM7IiBkPSJNMzg0LDUxMkgxMjhjLTguNDgsMC0xNS4zNi02Ljg4LTE1LjM2LTE1LjM2VjE1LjM2QzExMi42NCw2Ljg4LDExOS41MiwwLDEyOCwwaDI1Ng0KCWM4LjQ4LDAsMTUuMzYsNi44OCwxNS4zNiwxNS4zNnY0ODEuMjhDMzk5LjM2LDUwNS4wNCwzOTIuNDgsNTEyLDM4NCw1MTJ6Ii8+DQo8cmVjdCB4PSIxMjgiIHk9IjQwLjk2IiBzdHlsZT0iZmlsbDojRkY1RjVGOyIgd2lkdGg9IjI1NiIgaGVpZ2h0PSI0MDkuNiIvPg0KPGc+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0M5QzlDOTsiIGQ9Ik0yODYuNzIsMjUuNzZoLTYxLjQ0Yy0yLjgsMC01LjEyLTIuMzItNS4xMi01LjEybDAsMGMwLTIuOCwyLjMyLTUuMTIsNS4xMi01LjEyaDYxLjQ0DQoJCWMyLjgsMCw1LjEyLDIuMzIsNS4xMiw1LjEybDAsMEMyOTEuODQsMjMuNDQsMjg5LjUyLDI1Ljc2LDI4Ni43MiwyNS43NnoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojQzlDOUM5OyIgZD0iTTI4Ni43Miw0ODEuMjhoLTYxLjQ0Yy0yLjgsMC01LjEyLTIuMzItNS4xMi01LjEybDAsMGMwLTIuOCwyLjMyLTUuMTIsNS4xMi01LjEyaDYxLjQ0DQoJCWMyLjgsMCw1LjEyLDIuMzIsNS4xMiw1LjEybDAsMEMyOTEuODQsNDc4Ljk2LDI4OS41Miw0ODEuMjgsMjg2LjcyLDQ4MS4yOHoiLz4NCjwvZz4NCjxwb2x5Z29uIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBwb2ludHM9IjIzNC40LDMwNi44IDE4NS4yLDI1NS4yOCAyMDAuMDgsMjQxLjEyIDIzNC4wOCwyNzYuOCAzMTcuMzYsMTg1LjYgMzMyLjQ4LDE5OS40NCAiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K',
        onclick: function() {
            insertLink();
        }
    });
    editor.addMenuItem('phonelink', {
        text: 'Phone link',
        context: 'tools',
        onclick: function() {
            insertLink();
        }
    });
    return {
        getMetadata: function () {
            return  {
                name: 'Phone link',
                url: 'https://github.com/Pathologic/PhoneLink'
            };
        }
    };
})
;
