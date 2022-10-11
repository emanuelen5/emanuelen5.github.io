---
title: Recipes
permalink: /recipes/
navlink: true
shortname: Recipes
sortindex: 3
---

Recipes are in 🇸🇪 Swedish!

{% assign recipes = site.recipes | sort: 'date' | reverse -%}
{%- for p in recipes -%}
<div class="card my-1" id="{{p.id}}">
	<div class="card-body px-sm-3 px-1 py-1">
		<h5 class="card-title">
			<a href="{{p.url}}">
				{%- if p.thumbnail -%}
				<span style="width:1.5em; text-align:center; display: inline-block; overflow: hidden;"><img style="height:1em;" alt="Post thumbnail" src="{{p.thumbnail}}"/></span>
				{%- endif -%}
			{{p.title | markdownify}}</a>
		</h5>
		<div class="card-text">{{p.why}}
			<div class="d-inline-block">
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
		</div>
	</div>
</div>
{%- endfor -%}
