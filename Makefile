FLAGS?=
BUILD_DIR?=.build

build:
	bundle exec jekyll build -d ${BUILD_DIR} ${FLAGS}
gh-pages: build
	touch "${BUILD_DIR}/.nojekyll"
	if [ -f README.md ]; then cp README.md "${BUILD_DIR}"; fi

clean:
	rm -rf "${BUILD_DIR}" .jekyll-*

serve:
	bundle exec jekyll serve -H '*' ${FLAGS}

.PHONY:build serve gh-pages clean
