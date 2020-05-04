---
title: Jekyll plugin for escaping Atom feed content
date: 2020-05-04 20:01
--- 

# Creating the first Jekyll plugin
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
