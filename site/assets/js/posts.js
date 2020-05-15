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

function filter(type, name) {
	console.log(type + " clicked!: " + name);
};

function create_filter_callback(type, name) {
	return (event) => {filter(type, name)};
};

for (e of document.querySelectorAll("button.tag")) {
	e.addEventListener("click", create_filter_callback(TYPE_TAG, e.innerHTML));
}

for (e of document.querySelectorAll("button.category")) {
	e.addEventListener("click", create_filter_callback(TYPE_CATEGORY, e.innerHTML));
}
