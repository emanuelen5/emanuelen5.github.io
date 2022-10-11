---
title: Posts
permalink: /posts/
navlink: true
shortname: Posts
sortindex: 1
---

<div class="mb-2 small">
	<button class="btn btn-block py-0" collapsing-target="#filters">
		<div class="row">
			<div class="col-auto pl-1">
				Filters
			</div>
			<div class="col"></div>
			<div class="col-auto pr-1">
				⥍ <!-- Up/down arrow symbol -->
			</div>
		</div>
	</button>
	<div class="collapsing" id="filters">
		<div class="row no-gutters justify-content-center">
			{%- include tags_n_categories.html -%}
			{%- assign tags = tags | sort_natural -%}
			{%- assign categories = categories | sort_natural -%}

			{%- for tag in tags -%}
				<div class="col-auto"><button class="btn badge badge-dark tag mini-margin">{{tag}}</button></div>
			{%- endfor -%}
			{%- for category in categories -%}
				<div class="col-auto"><button class="btn badge badge-info category mini-margin">{{category}}</button></div>
			{%- endfor -%}
		</div>
		<div class="mb-2"></div>
	</div>
</div>

{%- for p in site.posts -%}
<div class="card my-3" id="{{p.id}}">
	<div class="card-body px-sm-3 px-1 py-1">
		<h5 class="card-title">
			<a href="{{p.url}}">
				{%- if p.thumbnail -%}
				<span style="width:1.5em; text-align:center; display: inline-block; overflow: hidden;"><img style="height:1em;" alt="Post thumbnail" src="{{p.thumbnail}}"/></span>
				{%- endif -%}
			{{p.title}}</a>
			<div>
				{%- if p.draft == true -%}
				<span>
					<div class="badge badge-warning">DRAFT</div>
				</span>
				{%- endif -%}
				<span class="tags">
				{%- for t in p.tags -%}
					<button class="btn badge badge-dark tag">{{t}}</button>
				{%- endfor -%}
				</span>
				<span class="categories">
				{%- for c in p.categories -%}
					<button class="btn badge badge-info category">{{c}}</button>
				{%- endfor -%}
				</span>
			</div>
		</h5>
		<div class="card-subtitle">{{p.date | date: "%Y-%m-%d"}}</div>
		<div class="card-text">{{p.description}}</div>
	</div>
</div>
{%- endfor -%}

<script src="/assets/js/posts.js"></script>
