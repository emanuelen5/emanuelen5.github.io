for (img of document.querySelectorAll("section img")) {
	let cl = img.classList;
	if (!cl.contains("img-inline")) {
		img.classList.add("img-fluid");
		img.classList.add("img-centered");
	}
}
