---
image: /assets/images/nginx_logo.svg
title: Setting up Nginx for Jekyll
date: 2020-05-16 10:33
tags: [nginx]
categories: [miniguide, meta]
---

# Installing
Is easy on Ubuntu:

```bash
apt install nginx
```

# Configuring
Then add a configuration file for the site under `/etc/nginx/conf.d/`. I've use the following configuration for my blog:

```nginx
# /etc/nginx/conf.d/blog.conf

server {
  # Port to serve on
  listen 4000;
 
  # Where the build output is located (that should be served)
  root /home/emaus/blog/.build;

  # Custom 404 page
  error_page 404 /404.html;

  # If you're using permalink configuration without .html extension, use
  # this to make sure that the links are served correctly
  # found on https://stackoverflow.com/a/38238001/4713758
  if ($request_uri ~ ^/(.*)\.html$) {
      return 302 /$1;
  }
  # Try to find file with different endings, otherwise send to 404 page
  try_files $uri $uri.html $uri/ =404;
}
```

## Update the configuration
Remember to run `nginx -s reload` after updating the configuration files!
