# InstaPost
Embed instagram post for lazy dev :D

## Usage

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



