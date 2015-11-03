

SLINK
======

Slink is a JavaScript package for displaying lists of website links which are
shown in a collapsible and searchable list (but does not collapse in current 
versions of Firefox.)


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

Then you can load links in this manner:

```
<script>
document.addEventListener("DOMContentLoaded", function() {
   var slinks = document.querySelectorAll('[class^="slink"]');
   for (var i=0; i<slinks.length; i++) {
      var slink = new SLINK;
      slink.loadAtonLinks(slinks[i]);
   }  
});
</script>

<div class="slink" title="links.aton"></div>
```





