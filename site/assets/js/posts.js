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

TYPE_TAG = "tags";
TYPE_CATEGORY = "categories";

function set_visibility(elem, visible) {
	if (visible) {
		elem.style.removeProperty("height");
		elem.style.removeProperty("visibility");
	} else {
		elem.style.height = 0;
		elem.style.visibility = "hidden";
	}
}

function update_visibility(type, name, filters) {
	for (let cardname in cards) {
		const card = cards[cardname];
		const elem = document.getElementById(cardname);
		if (filters.length == 0) {
			console.log(cardname + " as visible");
			set_visibility(elem, true);
		} else {
			console.log(cardname + " as hidden");
			set_visibility(elem, card[type].indexOf(name) >= 0);
		}
	};
}

function filter(type, name, filters) {
	let filter_index = filters.indexOf(name);
	if (filter_index >= 0) {
		filters.splice(filter_index, 1);
	} else {
		filters.push(name);
	}
	console.log(type + " clicked!: " + name + ". Filters active: " + filters);
	update_visibility(type, name, filters);
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
