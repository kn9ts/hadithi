# Hadithi

MP3 audio + facebook storytelling collection tool, [Hadithi](http://djotjog.com/hadithi/tellme)

## Documentation
_(Coming soon)_

But I have a little trick for you to get all the Javascript files and CSS your app is using. I use this to know what scripts I am to add and watch in GRUNTJS.

    // Get all the JS scripts in the page for GRUNTFILE addition
	var sc = $('html').find('script').map(function(a, b) {
	    if ($(b).attr('src')) return $(b).attr('src');
	});
	console.log(sc);

	var css = $('html').find('link').map(function(a, b) {
	    if ($(b).attr('href')) return $(b).attr('href');
	});
	console.log(css);

## Test Phase
Want to try it out, [CLICK HERE](http://luvit.me/hadithiapp) or [HERE](http://djotjog.com/hadithi/tellme)

## Release History
_(Just a little patience)_

> "Never increase, beyond what is necessary,   
> the number of entities required to explain anything."  
> – *William Ockham*

## License
Copyright (c) 2014 Eugene Mutai  
Licensed under the MIT license.
