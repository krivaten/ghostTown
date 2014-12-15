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
    liClass: '',
    aClass: '',
    limit: 0
};
```

### liClass
This option sets a custom class on the `li` tags that are output from the plugin. By default, it does not add any class.

### aClass
This option sets a custom class on the `a` tags that are output from the plugin. By default, it does not add any class. 

### Limit
This option sets a limit to the number of results that will be output. By default, it displays all the posts found with the specified tag.

# Using Custom Options
```
$('[data-tag]').ghostTown({
    liClass: 'list-item',
    aClass: 'list-item-link',
    limit: 5
});
```

## Roadmap

- Optimize the code for speed.
- Optimize the plugin for AJAX based themes.

## Credits
Cheers to the folks who made:

- [GhostHunter](https://github.com/i11ume/ghostHunter) - An awesome search plugin for Ghost
- [Ghost Related](https://github.com/danecando/jquery.ghostrelated) - A related posts plugin for Ghost

I used *Ghost Related* as the base of this plugin and modified it greatly to make it work for my purposes.