#!/usr/bin/make
# Makefile readme (ru): <http://linux.yaroslavl.ru/docs/prog/gnu_make_3-79_russian_manual.html>
# Makefile readme (en): <https://www.gnu.org/software/make/manual/html_node/index.html#SEC_Contents>

SHELL = /bin/sh
DC_BIN := $(shell command -v docker-compose 2> /dev/null)
DC_RUN_ARGS = --rm --user "$(shell id -u):$(shell id -g)"

cwd = $(shell pwd)

.PHONY : help install test fix shell clean build build-demo
.DEFAULT_GOAL : help

# This will output the help for each task. thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
help: ## Show this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install all dependencies
	$(DC_BIN) run $(DC_RUN_ARGS) node yarn install

test: ## Execute tests and linters
	$(DC_BIN) run $(DC_RUN_ARGS) node sh -c "yarn lint && yarn test"

fix: ## Execute sources fixing
	$(DC_BIN) run $(DC_RUN_ARGS) node yarn lint:fix

shell: ## Start shell into container with node
	$(DC_BIN) run $(DC_RUN_ARGS) node sh

watch: ## Start watching assets for changes
	@printf "\n  \033[1;47m  %s  \033[0m\n\n" 'Navigate your browser to ⇒ https://127.0.0.1:8082 or https://localhost:8082/'
	$(DC_BIN) run $(DC_RUN_ARGS) -p "8082:8080/tcp" node yarn watch

clean: ## Make some clean
	rm -Rf "$(cwd)/coverage" "$(cwd)/dist" "$(cwd)/dist-demo"

build: clean ## Build component bundle
	$(DC_BIN) run $(DC_RUN_ARGS) -e "NODE_ENV=production" node yarn build

build-demo: clean ## Build demo application bundle
	$(DC_BIN) run $(DC_RUN_ARGS) -e "NODE_ENV=production" node yarn build:demo
