---
title: Posts
---

{%- for p in site.posts %}
<div class="card" id="{{p.id}}">
	<div class="card-body">
		<h5 class="card-title">
			<a href="{{p.url}}">{{p.title}}</a>
			<div>
				<span class="tags"></span>
				<span class="categories"></span>
			</div>
		</h5>
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

for (post in cards) {
	const c = cards[post];
	const card = document.getElementById(post);
	const tags = card.querySelector(".tags");
	for (const i in c.tags) {
		let tag = document.createElement("span");
		let tc = tag.classList;
		tc.add("badge");
		tc.add("badge-dark");
		tag.innerHTML = c.tags[i];
		tags.appendChild(tag);
	}
	const categories = card.querySelector(".categories");
	for (const i in c.categories) {
		let cat = document.createElement("span");
		let tc = cat.classList;
		tc.add("badge");
		tc.add("badge-info");
		cat.innerHTML = c.categories[i];
		categories.appendChild(cat);
	}
}
</script>
