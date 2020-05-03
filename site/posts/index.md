---
title: Posts
---

{%- for p in site.posts %}
<div class="card" id="{{p.id}}">
	<div class="card-body">
		<a href="{{p.url}}">
			<h5 class="card-title">{{p.title}}</h5>
		</a>
		<div class="card-subtitle">{{p.date | date: "%Y-%m-%d"}}</div>
		<div class="card-text">{{p.description}}</div>
	</div>
</div>
{%- endfor %}

<script>
let cards = {
{%- for p in site.posts %}
"{{p.id}}": {"tags": [
	{%- for t in p.tags -%}
		"{{t}}",
	{%- endfor -%}
	],"categories": [
	{%- for c in p.categories -%}
		"{{c}}",
	{%- endfor -%}
	]},
{%- endfor -%}
};
console.log(cards);
</script>
