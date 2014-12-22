/*!
 * @package jquery.ghostTown
 * @version 0.1.0
 * @Copyright (C) 2014 Kris Van Houten (krivaten@gmail.com)
 * @License MIT
 */
;(function($) {

    defaults = {
        feed: '/rss',
        limit: 0,
        content: function(post) {
            return '<li><a href="' + post.url + '""><strong>' + post.title + '</strong><br /><small>' + post.pubDate + '</small></a></li>';
        }
    }

    // Set up necessary element and properties
    function GhostTown(element, options) {
        // Empty element and get tag name
        this.tag = $(element).empty().data('tag');

        // Set element
        this.element = element;

        // Establish options
        this.options = $.extend({}, defaults, options);

        // Go get the RSS feed of the specified tag
        this.fetchTagRss();
    };

    // Render tag contents
    GhostTown.prototype.displayTagContents = function(posts) {
        var self = this,
            limit = self.options.limit,
            liClass = self.options.liClass,
            aClass = self.options.aClass,
            content = self.options.content,
            count = 0;

        // Append posts to element
        posts.forEach(function(post) {
            if (!limit || count < self.options.limit) {
                $(self.element).append($(content(post)));
            }
            count++;
        });

        // Notify if no posts present
        if (count == 0) {
            $(this.element).append($('<li class="' + liClass + '">No posts found with tag: <strong>' +  this.tag + '</strong></li>'));
        }
    };

    // Go get the RSS feed of the specified tag
    GhostTown.prototype.fetchTagRss = function() {
        var feeds = [],
            self = this;

        $.ajax({
            url: '/tag/' + this.tag + this.options.feed,
            type: 'GET'
        })
        .done(function(data, textStatus, xhr) {
            var posts;

            // Collect posts
            posts = self.extractPosts(new Array(data));

            // Render tag contents
            self.displayTagContents(posts);
        })
        .fail(function(error) {
            $(self.element).append($('<li class="' + self.options.liClass + '">' + error.statusText + '</li>'));
        });

    };

    // Extract posts from RSS feed
    GhostTown.prototype.extractPosts = function(feeds) {
        var posts = [], items = [];

        feeds.forEach(function(feed) {
            items = $.merge(items, $(feed).find('item'));
        });

        for (var i = 0; i < items.length; i++) {
            var item = $(items[i]);

            // Extract necessary properties
            if (item.find('title').text()) {
                posts.push({
                    title: item.find('title').text(),
                    url: item.find('link').text(),
                    pubDate: item.find('pubDate').text()
                });
            }
        }

        return posts;
    };

    // Instantiate ghostTown
    $.fn.ghostTown = function(options) {
        return this.each(function() {
            new GhostTown(this, options);
        });
    };


})(jQuery);