(function (g) {
    function l(a) {
        var b = {__KEYS: []};
        f(a, function (d) {
            d = d.replace("://", "__").split("/");
            var c = b;
            f(d, function (b) {
                c[b] || (c[b] = {__KEYS: []}, c.__KEYS.push(b));
                c = c[b]
            })
        });
        var e = [];
        f(b.__KEYS, function (d) {
            var c = d;
            d = b[d];
            for (var a = d.__KEYS; 1 === a.length;)c += "/" + a[0], d = d[a[0]], a = d.__KEYS;
            a.length && e.push([c.replace("__", "://"), n(d)])
        });
        return e
    }

    function n(a) {
        var b = [];
        f(a.__KEYS, function (e) {
            var d = n(a[e]);
            d.length ? f(d, function (c) {
                b.push(e + "/" + c)
            }) : b.push(e)
        });
        return b
    }

    function p(a) {
        f(a, function (b) {
            var a = b[0] + "/", d = [], c = {};
            f(b[1], function (b) {
                var a;
                a = b.lastIndexOf(".");
                (a = 0 <= a ? b.substring(a) : "") && (c[a] || (c[a] = [])).push(b)
            });
            for (var m in c)c.hasOwnProperty(m) && d.push(c[m]);
            f(d, function (b) {
                j(a, b)
            })
        });
        return k
    }

    function j(a, b) {
        var e = h.comboSyntax || ["??", ","], d = h.comboMaxLength || 2E3, c = a + e[0] + b.join(e[1]), e = c.length > d;
        if (1 < b.length && e)j(a, b.splice(0, Math.ceil(b.length / 2))), j(a, b); else {
            if (e)throw Error("The combo url is too long: " + c);
            f(b, function (b) {
                k[a + b] = c
            })
        }
    }

    var k = {}, q = g.cache, h = g.config.data;
    g.on("load", function (a) {
        var b = [], e = h.comboExcludes;
        f(a, function (a) {
            var c;
            if (c = 1 > q[a].status)if (c = !e || !e.test(a)) {
                var f = h.comboSyntax || ["??", ","];
                c = f[0];
                f = f[1];
                c = !(c && 0 < a.indexOf(c) || f && 0 < a.indexOf(f))
            }
            c && b.push(a)
        });
        1 < b.length && p(l(b))
    });
    g.on("fetch", function (a) {
        var b = a.uri;
        a.requestUri = k[b] || b
    });
    var f = [].forEach ? function (a, b) {
        a.forEach(b)
    } : function (a, b) {
        for (var e = 0; e < a.length; e++)b(a[e], e, a)
    };
    h.test && (g = g.test || (g.test = {}), g.uris2paths = l, g.paths2hash = p)
})(seajs);
