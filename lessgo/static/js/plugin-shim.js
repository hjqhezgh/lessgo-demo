(function (d, e) {
    function a(c) {
        if (c) {
            c = c.alias;
            for (var a in c)(function (b) {
                b.src && (b.deps && define(b.src, b.deps), define(a, [d.resolve(b.src)], function () {
                    var a = b.exports;
                    return"function" === typeof a ? a() : "string" === typeof a ? e[a] : a
                }))
            })(c[a])
        }
    }

    d.on("config", a);
    a(d.config.data)
})(seajs, "undefined" === typeof global ? this : global);
