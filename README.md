# Ghost Town
A jQuery dependent plugin that will display a list of posts with a specific tag using [Ghost](https://ghost.org).

This is great tool if you want to provide a more custom interface to your Ghost blog.

## How it Works
*Ghost Town* works by fetching the value of a `data` attribute on an html element (Prefarably a `ul` tag). From there it looks up the rss feed of that tag and returns a list of links to the results. If no posts are returned, a message is displayed.

## Installation
Download either `jquery.ghostTown.js` or `jquery.ghostTown.min.js` and save it to the `js` folder of your Ghost theme directory.

Include the following script below `{{ghost_foot}}` in your theme's `default.hbs` file: 
```
<script type="text/javascript" src="{{asset "js/jquery.ghost-town.min.js"}}"></script>
```

Add a `ul` tag with the attribute `data-tag="tag-name"` into one of your template files, like the following:
```
<ul data-tag="tag-name"></ul>
```

Call the Ghost Town plugin with `[data-tag]` selector in your main `js` file like the following:
```
$('[data-tag]').ghostTown();
```

Now, on each page refresh, it will check for elements with that `data-tag` attribute and perform a lookup based on the value.

## Options
The plugin has some options for you, if you want to customize the output a little bit to suit your needs.

```
defaults = {
    limit: 0,
    content: function(post) {
    	return '<li><a href="' + post.url + '""><strong>' + post.title + '</strong><br /><small>' + post.pubDate + '</small></a></li>';
	}
};
```

### Limit
This option sets a limit to the number of results that will be output. By default, it displays all the posts found with the specified tag.


### Content
This option allows to parse a different string as the content of each result that is returned. It must be struction as a `function` with the object passed in being the `post`. At this time, the properties that are returned and available in the `post` object are: `post.title`, `post.url`, and `post.pubDate`.


# Using Custom Options
```
$('[data-tag]').ghostTown({
    limit: 5,
    content: function(post) {
        return '<a href="' + post.url + '"">' + post.title + '</a>';
	}
});
```

## Roadmap

- Optimize the code for speed.
- Optimize the plugin for AJAX based themes.
- Figure out how to return creator. 

## Credits
Cheers to the folks who made:

- [GhostHunter](https://github.com/i11ume/ghostHunter) - An awesome search plugin for Ghost
- [Ghost Related](https://github.com/danecando/jquery.ghostrelated) - A related posts plugin for Ghost

I used *Ghost Related* as the base of this plugin and modified it greatly to make it work for my purposes.