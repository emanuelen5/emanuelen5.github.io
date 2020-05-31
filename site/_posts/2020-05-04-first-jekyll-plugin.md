---
finished: true
title: Jekyll plugin for escaping Atom feed content and altering links
summary: I look into how one could escape an Atom feed using Ruby and making links absolute. The intention was to use it for fixing links in my Atom feed, but I didn't need to turn it into a plugin since the actual problem was with the main url in the Atom feed (it was missing https:// in the start).
date: 2020-05-04 20:01
tags: [jekyll, ruby, nokogiri, xpath]
categories: [meta, plugin]
---

So I had some trouble getting correct links in my Atom feed. The links are written as relative in my posts, while feed apps expect them to be absolute.

I was looking for any plugins that would transform them easily to absolute links, but fell short. I therefore started looking at how hard it would be to develop my own Ruby plugin to Jekyll. Having no previous experience with Ruby, than typing `bundle install` and `bundle exec jekyll serve`, I felt that I had some reading to do.

## Ruby example
The following script opens up the final Atom feed XML file, prepends each url with the values `base_url` and `page_url`, and then HTML escapes the contents of the entries.

```ruby
require 'nokogiri'
require 'cgi'

# Parse document
doc = Nokogiri::HTML(open('atom.xml'))
contents = doc.xpath('//feed//entry//content')

# Fix URLs for images and links
contents.xpath('//img').foreach { |img|
	img['src'] = base_url + page_url + img['src']
}

contents.xpath('//a').foreach { |a|
	a['href'] = base_url + page_url + a['href']
}

# Escape the content of each each entry
contents.children = CGI.escapeHTML(contents.children.to_s)
```

## Unexpected solution

The actual problem with the feed seemed to be with the atom feed URL not being absolute, which was fixed by adding the `absolute_url` filter to the url:

```xml
<link href="{% raw %}{{ page.url | absolute_url }}{% endraw %}" rel="self" type="application/atom+xml" />
```

which then turns into

```xml
<link href="https://blog.cedernaes.com/atom.xml" rel="self" type="application/atom+xml"/>
```

[Modifying XML nodes]: https://nokogiri.org/tutorials/modifying_an_html_xml_document.html#modifying-nodes-and-attributes
[Selecting nodes with XPath]: https://www.w3schools.com/xml/xpath_syntax.asp
[Iterate through an array in Ruby]: https://stackoverflow.com/questions/310634/what-is-the-right-way-to-iterate-through-an-array-in-ruby
[Suppress irb prints]: https://stackoverflow.com/questions/4678732/how-to-suppress-rails-console-irb-outputs
[HTML codec]: https://stackoverflow.com/questions/1600526/how-do-i-encode-decode-html-entities-in-ruby
[HTML a@rel attribute]: https://www.w3schools.com/tags/att_a_rel.asp
