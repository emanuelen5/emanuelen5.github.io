# Frameworks for blogs

So you want to create your own blog/website, and need to decide what framework/tool to use for it? Me too, so here are the info I collected on some popular options:

* Hugo
* Jekyll
* Pandoc
* Pelican
* Sphinx
* Squarespace
* Wordpress

Honorable mentions:

* Hexo
* Gatsby
* Middleman
* VuePress
* Metalsmith
* Octopress
* DocPad

I kid you not, there are so many alternatives! See [stackshare's listing of alternatives for different static web page generators](https://stackshare.io/hugo_2/alternatives).

## Summary of traits

### Static vs Dynamic
A static site has pure HTML-files that are directly served to clients instead of say PHP or Python scripts that can dynamically create the pages before serving them. This has the advantage of being more light-weight for the server (meaning possibly faster) and more secure (almost no possibility to inject info to the server).

**Static:** Hugo, Jekyll, Pandoc, Sphinx <br>
**Dynamic:** Squarespace, Wordpress

### Hosted vs Self-hosted
Hosting is its own issue. This is a cost issue, and possibly an updating issue when using dynamic websites and its plugins. Hosted pages tend to update plugins for you as well as the website engine, and thus solves the hassle for you. When you host it yourself, you'll have to manage the updating yourself as well.

**Hosted:** Squarespace, Wordpress (via *Wordpress.com*) <br>
**Not hosted:** Hugo, Jekyll, Pandoc, Sphinx, Wordpress

### Coded vs GUI
Most highly customizable types of website frameworks are codable, i.e. you can hold almost the whole configuration of the web site as text files. This makes it easy to version the website as well as redeploy it, but can be harder to make look as you want.

**Coded:** Hugo, Jekyll, Pandoc, Sphinx, Wordpress <br>
**GUI:** Squarespace, Wordpress (through *Wordpress.com*)

### Markdown support
The Markdown language is truly splendid when it comes to documentation since it is easy to read, but can be rendered beautifully with good templates. Kind of like a basic variant of LaTeX that is much simpler to write (and read from source code).

**Supports Markdown:** Hugo, Jekyll, Pandoc, Pelican, Sphinx, Wordpress <br>
**No Markdown:** Squarespace

## Frameworks
### <img style="height: 1em;" alt="Pelican logo" title="Pelican logo" src="pelican_logo.png"/> Pelican
Supports reStructuredText.

[Pelican documentation]
### <img style="height: 1em;" alt="Pandoc logo" title="Pandoc logo" src="pandoc_logo.png"/> Pandoc
Pandoc is really just a document conversion tool that can be used for creating static web sites from e.g. Markdown.

[Scientific blogging with Pelican and Pandoc]

### <img style="height: 1em;" alt="Sphinx logo" title="Sphinx logo" src="sphinx_logo.png"/> Sphinx
I ran into this on the documentation of the [VUnit project](https://github.com/vunit/Vunit) (a great tool by the way for anyone writing VHDL - and SystemVerilog I guess).

### <img style="height: 1em;" alt="Jekyll logo" title="Jekyll logo" src="jekyll_logo.png"/> Jekyll
Jekyll is used for creating static websites from Markdown.

Also see [Octopress](http://octopress.org/docs/) for coding related setups with Jekyll.

### <img style="height: 1em;" alt="Hugo logo" title="Hugo logo" src="hugo_logo.png"/> Hugo
Static site generator designed to be fast. Takes Markdown as input.

### <img style="height: 1em;" alt="Wordpress logo" title="Wordpress logo" src="wordpress_logo.png"/> Wordpress
> Not to be confused with *Wordpress.com* which is the hosted variant.

An open source framework for creating web sites with lots of plugins. This is quite tempting to use since it is so popular ([used by 32% of the Top 1 million websites as of July 2019 according to builtwith.com/cms](https://trends.builtwith.com/cms)). This gives several pros: I might have use of it in other cases (can help others), there exists an active community (there is help to get), it gets regular updates (it stays secure and fresh).

It also seems very customizable.

### <img style="height: 1em;" alt="Squarespace logo" title="Squarespace logo" src="squarespace_logo.png"/> Squarespace
Hosted and managed by Squarespace themselves. This means that you can set up the page once and really stop caring about it. They will keep updating it for you. So goodbye security theats, and needs of manually updating.

The probably most notable feature of Squarespace is its design, and [that's their biggest sales pitch][Squarespace: Website design]:

> Award-Winning Web Designs: <br>
> Stand out online with a professional website, online store, or portfolio. With Squarespace, you can turn any idea into a reality.

They also have a lot of tools if you're more serious with your website, such as search engine optimization (SEO), commerce tools, encryption (SSL), etc.

However, Squarespace also lacks more advanced features which are nice for programmers, like fully customizing plugins, adding your own code etc. To get all of that goodness, you'll have to stick to an open source platform, of course!

Also, I believe that it is harder to version your website (if you're into that kind of stuff) since it's all click-and-drag types of GUI (WYSIWYG).

Last but not least. It's not free! Sure, you'll need to find hosting for all of the other alternatives, which will cost, but if you host it yourself, then you can get it much cheaper. Starting price: $12/month (ouch). And all of the good stuff I mentioned above will cost extra. So: *mmk-bye*!

## Sources
1. [Pelican documentation].
1. [Scientific blogging with Pelican and Pandoc][Scientific blogging with Pelican and Pandoc].
1. [Squarespace sales pitch][Squarespace: Website design].
1. [A quite nice rundown between Squarespace and Wordpress][Wordpress vs Squarespace].

[Pelican documentation]: https://docs.getpelican.com/en/stable/
[Scientific blogging with Pelican and Pandoc]: http://proven-inconclusive.com/blog/scientific_blogging_with_pelican_and_pandoc.html
[Squarespace: Website design]: https://www.squarespace.com/website-design
[Wordpress vs Squarespace]: https://www.websitebuilderexpert.com/website-builders/comparisons/squarespace-vs-wordpress/

# Comments on blogs
> A blog without ability to comment is no true blog.

Everybody loves to express their opinions on blogs.

[Alternatives](https://alternativeto.net/software/disqus/):

* Disquis
* Isso