---
layout: none
---

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
