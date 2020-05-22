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

for (e of document.querySelectorAll("[collapsing-target]")) {
	const target_selector = e.getAttribute("collapsing-target");
	// Check if collapsed; set attribute
	for (et of document.querySelectorAll(target_selector)) {
		if (et.style.height == "") {
			e.setAttribute("collapsed", true);
			et.style.height = "0px";
		} else {
			e.setAttribute("collapsed", false);
		}
	}
	// Add event listener for each button
	e.addEventListener("click", ((e, target_selector) => {
		return (event) => {
			for (et of document.querySelectorAll(target_selector)) {
				const collapsed = e.getAttribute("collapsed") == "true";
				if (collapsed) {
					et.style.height = et.scrollHeight + "px";
				} else {
					et.style.height = "0px";
				}
				e.setAttribute("collapsed", !collapsed);
			}
		}
	})(e, target_selector));
	window.addEventListener('resize', ((elem) => {
		return (event) => {
			console.log("resize");
		}
	})(e));
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
