NODEMON = node_modules/.bin/nodemon

.PHONY: watch

watch:
	$(NODEMON) app.js