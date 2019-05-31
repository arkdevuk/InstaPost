[![npm ](https://img.shields.io/npm/v/instapost.svg?style=flat-square)](https://www.npmjs.com/package/instapost) ![GitHub file size in bytes](https://img.shields.io/github/size/arkdevuk/InstaPost/dist/instapost.min.js.svg?style=flat-square)

# InstaPost
Embed instagram post for lazy dev :D

## Use as npm package

See on [npm](https://www.npmjs.com/package/instapost)

```
npm install -D instapost
```

## Basic Use

See the [Demo](https://codepen.io/jclf2018/full/yWRmrV) on codepen.io

```html
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/arkdevuk/InstaPost@master/dist/instapost.min.css">
    </head>
        <body>
        <!-- [...] -->
        
        <div class="instapost instapost_lg" data-url="https://www.instagram.com/p/Bv4_JMDncw1/"></div>
        
        <div class="instapost instapost_md" data-url="https://www.instagram.com/p/BvCEqeVHJn9/"></div>
        
        <!-- [...] -->
        
        
        <script src="https://cdn.jsdelivr.net/gh/arkdevuk/InstaPost@master/dist/instapost.min.js"></script>
        
        <script>
        document.addEventListener("DOMContentLoaded", function() {
           instapost.init('div.instapost');
        });
        </script>
    
    </body>
</html>
```



