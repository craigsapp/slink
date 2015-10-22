//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct 21 09:28:12 PDT 2015
// Last Modified: Wed Oct 21 09:28:22 PDT 2015
// Filename:      slink.js
// Syntax:        JavaScript 1.8.5/ECMAScript 5.1
// vim:           ts=3
//
// Description:   Searchable hyper-links class.
//
// Example entry:
//
// @BEGIN: LINK
// @TITLE:          Title for the link entry
// @URL:            URL for the link entry
// @DESCRIPTION:    Short description for the entry
// @CREATION-DATE:  Date added to the list
// @EDIT-DATE:      Date last changed
// @CATEGORY:       category
// @SUBCATEGORY:    sub-category
// @SUBSUBCATEGORY: sub-sub-category
// @CATEGORY2:      secondary category
// @SUBCATEGORY2:   secondary sub-category
// @END:   LINK
//	
//

'use strict';


//////////////////////////////
//
// SLINK constructor -- The slink object is used to manage
//   list of categorized links.
// 

function SLINK() {
	this.flatList = [];
	this.categoryList = {};
	this.entryTemplate = "";

	this.defaultEntryTemplate = '';
	this.defaultEntryTemplate += '{{#each this}}\n';
	this.defaultEntryTemplate += '   <details open>\n';
	this.defaultEntryTemplate += '      <summary>\n';
	this.defaultEntryTemplate += '      {{{TITLE}}}\n';
	this.defaultEntryTemplate += '      </summary>\n';
	this.defaultEntryTemplate += '      <a href="{{URL}}">{{URL}}</a>\n';
	this.defaultEntryTemplate += '      <p>{{{DESCRIPTION}}}</p>\n';
	this.defaultEntryTemplate += '   </details>\n';
	this.defaultEntryTemplate += '{{/each}}\n';

	return this;
}



//////////////////////////////
//
// SLINK.addLinkEntry -- Add a link to the list (both flat and
//    by category.
//

SLINK.prototype.addLinkEntry = function (entry) {

   if (Array.isArray(entry)) {
		for (var i=0; i<entry.length; i++) {
			this.addLinkEntry(entry[i]);
		}
		return;
	}

	if (!entry) {
		return;
	}

	this.flatList.push(entry);


	if (entry.CATEGORY) {
		if (this.categoryList[entry.CATEGORY]) {
			this.categoryList[entry.CATEGORY].push(entry);
		} else {
			this.categoryList[entry.CATEGORY] = [];
			this.categoryList[entry.CATEGORY].push(entry);
		}
	}

	if (entry.category2) {
		if (this.categoryList[entry.CATEGORY2]) {
			this.categoryList[entry.CATEGORY2].push(entry);
		} else {
			this.categoryList[entry.CATEGORY2] = [];
			this.categoryList[entry.CATEGORY2].push(entry);
		}
	}

	if (entry.category3) {
		if (this.categoryList[entry.CATEGORY3]) {
			this.categoryList[entry.CATEGORY3].push(entry);
		} else {
			this.categoryList[entry.CATEGORY3] = [];
			this.categoryList[entry.CATEGORY3].push(entry);
		}
	}
}



//////////////////////////////
//
// SLINK.getLinkCount -- return the number of link entries
//    in the object.
//

SLINK.prototype.getLinkCount = function () {
	return this.flatList.length;
}




//////////////////////////////
//
// SLINK.loadAtonLinks -- 
//

SLINK.prototype.loadAtonLinks = function (element) {
	if (!element.title) {
		return;
	}
	var file = element.title;
	if (!file) {
		return;
	}
	var that = this;

   var request = new XMLHttpRequest();
   request.open('GET', file);
   request.addEventListener('load', function() {
      if (request.status == 200) {
         try {
				var aton = new ATON();
				aton.setOnlyChildRoot();
            var parsed = aton.parse(request.responseText);
				that.addLinkEntry(parsed);
				element.innerHTML = that.linksToHtml();
         } catch(err) {
            console.log('Error parsing search results: %s', err);
            console.log('ATON data:', request.responseText);
         }
      } else {
         console.log('Error retrieving search result:', queryUrl);
         console.log('Returned data',request.responseText);
      }
   });
   request.send();
}



//////////////////////////////
//
// SLINK.prototype.linksToHtml --
//

SLINK.prototype.linksToHtml = function () {
	var slink = new SLINK;
	this.addLinkEntry();

	var output = "";
	for (var i=0; i<this.getLinkCount(); i++) {
		output += " " + i;
	}

	var renderAllLinks = Handlebars.compile(this.defaultEntryTemplate);
	var listing = this.getFlatList();
console.log(listing);
	var html = renderAllLinks(listing);
	return html;
}



//////////////////////////////
//
// SLINK.prototype.getFlatList --
//

SLINK.prototype.getFlatList = function () {
	return this.flatList;
};




