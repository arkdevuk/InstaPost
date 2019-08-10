function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

;

(function () {
    var InstaPostInstance = function InstaPostInstance(el) {
        this.el = el;

        this.fetchData = function (url) {
            var $this = this;
            fetch('https://api.instagram.com/oembed/?url=' + url).then(function (response) {
                return response.json();
            }).then(function (data) {
                if (data !== undefined && data.html !== undefined) {
                    $this.el.innerHTML = data.html;

                    if (window.instgrm === undefined) {
                        console.error('instgrm is not defined');
                    } else {
                        window.instgrm.Embeds.process();
                    }
                }
            }).catch(function (error) {
                return console.error(error);
            });
        };

        this.loadElement = function (el) {
            if (el.dataset === undefined || el.dataset.url === undefined) {
                console.error('No url defined for el', el);
                return;
            }

            this.fetchData(el.dataset.url);
        };

        this.loadElement(this.el);
    };

    var InstaPost = function InstaPost() {
        var _this = this;

        var self = this;

        this.addScript = function (attribute, text, callback) {
            var s = document.createElement('script');

            for (var attr in attribute) {
                s.setAttribute(attr, attribute[attr] ? attribute[attr] : null);
            }

            if (text === undefined) {
                s.innerHTML = '';
            } else {
                s.innerHTML = text;
            }

            if (callback !== undefined) {
                s.onload = callback;
            }

            document.body.appendChild(s);
        };

        this.createFromElement = function (el) {
            if (!_this.isElement(el)) {
                if (el !== undefined && el.length > 0) {
                    for (var i = 0; i < el.length; i++) {
                        _this.createFromElement(el[i]);
                    }
                } else {
                    console.error('el is not a DOM Element');
                }

                return;
            }

            var classNameLoaded = 'instapost_js_loaded__';
            var classNameReady = 'instapost_js_ready__';

            if (!document.body.classList.contains(classNameReady)) {
                if (!document.body.classList.contains(classNameLoaded)) {
                    _this.addScript({
                        src: 'https://www.instagram.com/embed.js',
                        type: 'text/javascript',
                        async: true
                    }, '', function () {
                        document.body.classList.add(classNameReady);
                        window.instapost.treatQueue();
                    });

                    document.body.classList.add(classNameLoaded);
                }

                window.instapost.queue.push(el);
            } else {
                var opa = new InstaPostInstance(el);
            }
        }; //Returns true if it is a DOM node


        this.isNode = function (o) {
            return (typeof Node === "undefined" ? "undefined" : _typeof(Node)) === "object" ? _instanceof(o, Node) : o && _typeof(o) === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string";
        }; //Returns true if it is a DOM element


        this.isElement = function (o) {
            return (typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement)) === "object" ? _instanceof(o, HTMLElement) : //DOM2
                o && _typeof(o) === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string";
        };
    };

    window.instapost = {
        init: function init(selector) {
            var instPost = new InstaPost();

            if (typeof selector === 'string') {
                instPost.createFromElement(document.querySelectorAll(selector));
                return;
            }

            instPost.createFromElement(selector);
        },
        queue: [],
        activated: false,
        treatQueue: function treatQueue() {
            if (window.instapost.activated) {
                return;
            }

            window.instapost.activated = true;

            for (var i = 0; i < window.instapost.queue.length; i++) {
                var opa = new InstaPostInstance(this.queue[i]);
            }
        }
    };
})();