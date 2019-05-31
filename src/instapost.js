;( function () {

    const InstaPostInstance = function (el) {
        this.el = el;
        this.fetchData = function (url) {
            const $this = this;
            fetch('https://api.instagram.com/oembed/?url=' + url)
                .then(response => response.json())
                .then(data => {
                    if (data !== undefined && data.html !== undefined) {
                        $this.el.innerHTML = data.html;
                        if (window.instgrm === undefined) {
                            console.error('instgrm is not defined')
                        } else {
                            window.instgrm.Embeds.process()
                        }

                    }
                })
                .catch(error => console.error(error))
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

    const InstaPost = function () {
        this.addScript = function (attribute, text, callback) {
            let s = document.createElement('script');
            for (let attr in attribute) {
                s.setAttribute(attr, attribute[attr] ? attribute[attr] : null)
            }
            s.innerHTML = text;
            s.onload = callback;
            document.body.appendChild(s);
        };
        this.createFromElement = (el) => {
            if (!this.isElement(el)) {

                if (el !== undefined && el.length > 0) {
                    for (let i = 0; i < el.length; i++) {
                        this.createFromElement(el[i]);
                    }
                } else {
                    console.error('el is not a DOM Element');
                }
                return;

            }
            const classNameLoaded = 'instapost_js_loaded__';
            if (!document.body.classList.contains(classNameLoaded)) {
                this.addScript({
                    src: 'https://www.instagram.com/embed.js',
                    type: 'text/javascript',
                    async: true
                });
                document.body.classList.add(classNameLoaded);
            }
            let opa = new InstaPostInstance(el);
        };
        //Returns true if it is a DOM node
        this.isNode = function (o) {
            return (
                typeof Node === "object" ? o instanceof Node :
                    o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string"
            );
        };
        //Returns true if it is a DOM element
        this.isElement = function (o) {
            return (
                typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
                    o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
            );
        };
    };

    window.instapost = {
        init: function(selector) {
            let instPost = new InstaPost();
            instPost.createFromElement(document.querySelectorAll(selector));
        }
    };


})()