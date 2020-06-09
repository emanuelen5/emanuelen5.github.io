for (img of document.querySelectorAll("section img")) {
	let cl = img.classList;
	if (!cl.contains("img-inline")) {
		img.classList.add("img-fluid");
		img.classList.add("img-centered");
	}
}

for (img of document.querySelectorAll("img.img-post, img.img-post-helper")) {
	// Not a vector file
	if (img.src.match(/.svg/i) == null) {
		img.style.maxWidth = img.naturalWidth + "px";
		img.style.minWidth = img.naturalWidth/2 + "px";
	}
}

for (tbl of document.querySelectorAll("table.thead-dark > thead")) {
	tbl.classList.add("thead-dark");
}
