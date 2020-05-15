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

TYPE_TAG = "tag";
TYPE_CATEGORY = "category";

function filter(type, name, filters) {
	console.log(type + " clicked!: " + name);
	for (let cardname in cards) {
		const card = cards[cardname];
		if (type == TYPE_TAG && card.tags.indexOf(name) >= 0 ||
			type == TYPE_CATEGORY && card.categories.indexOf(name) >= 0) {
			if (filters.indexOf(name) >= 0) {
			}
			const elem = document.getElementById(cardname);
			card.visible = !card.visible;
			if (card.visible) {
				elem.style.height = 0;
				elem.style.visibility = "hidden";
			} else {
				elem.style.removeProperty("height");
				elem.style.removeProperty("visibility");
			}
		}
	};
};

let tag_filters = [], category_filters = [];

function create_filter_callback(type, name, filters) {
	return (event) => {filter(type, name, filters)};
};

for (e of document.querySelectorAll("button.tag")) {
	e.addEventListener("click", create_filter_callback(TYPE_TAG, e.innerHTML, tag_filters));
}

for (e of document.querySelectorAll("button.category")) {
	e.addEventListener("click", create_filter_callback(TYPE_CATEGORY, e.innerHTML, category_filters));
}
