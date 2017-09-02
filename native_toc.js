(function () {
    "use strict";

window.onload = function () {

    var toc = document.createElement('ul');
    document.getElementById('toc').appendChild(toc);
    var cur = function (e) { toc.appendChild(e); };

    [].slice.call(document.getElementsByTagName('*'))
    .filter(function (e) { return e.tagName.match(/^h[0-9]$/i); })
    .forEach(function (h, i, a) {

        var anchor = document.createElement('a');
        anchor.setAttribute('name', h.textContent.replace(/[^a-z]/gi, '_'));
        h.insertBefore(anchor, h.firstChild);

        var li = document.createElement('li');
        var ref = document.createElement('a');
        ref.setAttribute('href', '#' + anchor.getAttribute('name'));
        ref.textContent = h.textContent;
        li.appendChild(ref);
        cur(li);

        if (i === a.length - 1) { return; }
        switch (h.tagName.toLowerCase().localeCompare(a[i + 1].tagName.toLowerCase())) {
            case -2:
            case -1:
                var ul = document.createElement('ul');
                li.appendChild(ul);
                cur = function (e) { ul.appendChild(e); };
                ul.setAttribute('data-level', a[i + 1].tagName.toLowerCase());
                li.parentElement.setAttribute('data-level', h.tagName.toLowerCase());
                break;
            case 0:
                cur = function (e) { li.parentElement.appendChild(e); };
                break;
            case 1:
            case 2:
                var target_level = a[i + 1].tagName.toLowerCase();
                var toc_uls = [].slice.call(toc.parentElement.getElementsByTagName('ul'));
                var last_up_or_same = toc_uls.find(function (ul) { return ul.getAttribute('data-level').toLowerCase().localeCompare(target_level) >= 0; });;
                cur = function (e) { last_up_or_same.appendChild(e) };
                break;
        }

    });
};

}());
