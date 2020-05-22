---
layout: none
---

let cards; // Generated at bottom

const TYPE_TAG = "tags",
	TYPE_CATEGORY = "categories";

class PageFilters {
	constructor () {
		this.tag_filters = [];
		this.category_filters = [];
	};

	get_filter(type) {
		if (type == TYPE_TAG)
			return this.tag_filters;
		else if (type == TYPE_CATEGORY)
			return this.category_filters;
	}

	toggle(type, name) {
		let filters = this.get_filter(type);
		let filter_index = filters.indexOf(name);
		if (filter_index >= 0) {
			filters.splice(filter_index, 1);
		} else {
			filters.push(name);
		}
	}

	is_visible(card) {
		return this.tag_filters.every((filter) => card[TYPE_TAG].indexOf(filter) >= 0) &&
			this.category_filters.every((filter) => card[TYPE_CATEGORY].indexOf(filter) >= 0)
	}

	on_clicked_callback(name, type) {
		return (event) => {
			console.log(type + " clicked!: (" + name + ")");
			this.toggle(name, type);
			render_visibility();
		};
	}
};

const page_filters = new PageFilters();

function set_visibility(elem, visible) {
	if (visible) {
		elem.style.removeProperty("display");
	} else {
		elem.style.display = "none";
	}
}

function render_visibility() {
	for (let cardname in cards) {
		const card = cards[cardname];
		const elem = document.getElementById(cardname);
		set_visibility(elem, page_filters.is_visible(card));
	};
}

for (e of document.querySelectorAll("button.tag")) {
	e.addEventListener("click", page_filters.on_clicked_callback(TYPE_TAG, e.innerHTML));
}

for (e of document.querySelectorAll("button.category")) {
	e.addEventListener("click", page_filters.on_clicked_callback(TYPE_CATEGORY, e.innerHTML));
}

// Generated
cards = {
{%- for p in site.posts -%}
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
