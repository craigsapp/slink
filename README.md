

SLINK
======

Slink is a JavaScript package for displaying a list of searchable links.


Installation
=============

Copy these files into any location in your website, and then include them
how you like.  For example, if using only on one page and saving slink as
a local copy in the same directory, you would add this code to your HTML file:

```
	<script src="slink.js"></script>
	<script src="aton.js"></script>
	<link rel="stylesheet" href="slink.css">
```

A third source file is aton.html, this can be copied directly
into your webpage, or added to the page via templating systems
such as Jekyll:

```
{% include slink.html %}
```

To display links on a page, an element with a class "slink" is needed.
The "title" attribute is used to specify the file in the same directory
which contains the list of links.

```
<div class="slink-search"></div>
<div id="categories" class="slink" title="links.aton"></div>
```



