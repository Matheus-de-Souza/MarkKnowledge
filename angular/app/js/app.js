'use strict';

// Declare app level module which depends on views, and components
angular
	.module('app', ['ngRoute','hc.marked'])
	.config(['$routeProvider', 'markedProvider', config]);

function config ($routeProvider, markedProvider) {
	$routeProvider.
		when('/', {
			templateUrl: 'templates/file-contents.html',
			controller: 'FileContentsCtrl'
		}).
		otherwise({
			redirectTo: '/'
		});

	markedProvider.setOptions({
		gfm: true,
		tables: true,
		highlight: function (code, lang) {
			if (lang) {
				return hljs.highlight(lang, code, true).value;
			} else {
				return hljs.highlightAuto(code).value;
			}
		}
	});
	markedProvider.setRenderer({
		link: function(href, title, text) {
			return "<a href='" + href + "'" + (title ? " title='" + title + "'" : '') + " target='_blank'>" + text + "</a>";
		}
	});
}
