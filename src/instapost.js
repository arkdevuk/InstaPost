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
        const self = this;
        this.addScript = function (attribute, text, callback) {
            let s = document.createElement('script');
            for (let attr in attribute) {
                s.setAttribute(attr, attribute[attr] ? attribute[attr] : null)
            }
            if(text === undefined){
                s.innerHTML = '';
            } else {
                s.innerHTML = text;
            }

            if(callback !== undefined){
                s.onload = callback;
            }

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
            const classNameReady = 'instapost_js_ready__';


            if (!document.body.classList.contains(classNameReady)) {
                if (!document.body.classList.contains(classNameLoaded)) {
                    this.addScript({
                        src: 'https://www.instagram.com/embed.js',
                        type: 'text/javascript',
                        async: true
                    },'',() => {
                        document.body.classList.add(classNameReady);
                        window.instapost.treatQueue();
                    });
                    document.body.classList.add(classNameLoaded);
                }
                window.instapost.queue.push(el);
            } else {
                let opa = new InstaPostInstance(el);
            }

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
        instance: undefined,
        init: function(selector) {
            if(window.instapost.instance === undefined){
                window.instapost.instance = new InstaPost();
            }
            if(typeof selector === 'string'){
                window.instapost.instance.createFromElement(document.querySelectorAll(selector));
                return;
            }
            window.instapost.instance.createFromElement(selector);
        },
        queue: [],
        activated: false,
        treatQueue: function(){
            if(window.instapost.activated){
                return;
            }
            window.instapost.activated = true;
            for(let i = 0; i < window.instapost.queue.length; i++){
                let opa = new InstaPostInstance(this.queue[i]);
            }
        }
    };


})()