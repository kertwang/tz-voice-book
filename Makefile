#
# TZ Voice Book
#

PATH := node_modules/.bin:$(PATH)

PROJECT = "TZ_VOICE_BOOK"
dir = $(shell pwd)
include ./config/version
include .tz_config
include $(dir)/env/.compiled

admin_dir := $(dir)/src/admin
env_dir := $(dir)/env

PATH := $(dir)/node_modules/.bin:$(PATH)
PATH := $(admin_dir)/node_modules/.bin:$(PATH)

##
# Admin Tools
## 
admin-deploy-audio:
	cd ${admin_dir} && gulp deploy_audio

admin-deploy-config:
	source ./env/.compiled && cd ${admin_dir} && gulp deploy_config

admin-health-check:
	source ./env/.compiled && cd ${admin_dir} && gulp admin-health-check

admin-get-config:
	source ./env/.compiled && cd ${admin_dir} && gulp admin-get-config

admin-trigger-test-call:
	source ./env/.compiled && cd ${admin_dir} && gulp admin-trigger-test-call

admin-get-db-url:
	@heroku config:get DATABASE_URL

admin-update-db-url:
	@./scripts/update_db_url.sh
	@make env

##
# Env Setup
## 
env:
	cat ${env_dir}/.env.${stage}.sh ${env_dir}/env.${stage}.sh > ${env_dir}/.compiled

switch:
	@echo switching to stage: ${stage}
	@echo 'export stage=${stage}\n' > .tz_config
	@make env

switch-local:
	make switch stage="local"

switch-dev:
	make switch stage="development"
	heroku git:remote -a vb-server-development

switch-prod:
	make switch stage="production"
	heroku git:remote -a vb-server-production


##
# Local Development
##
build:
	yarn run build

lint: 
	yarn run lint

run-lt: 
	@lt --subdomain ${LT_SUBDOMAIN} --port 3000

watch:
	npm run build -- --watch

run-dev:
	source ./env/.compiled; npm run dev

run-db:
	# only run the database not the server 
	docker-compose up db 

run-docker:
	source ./env/.compiled; docker-compose up vb-server

##
# Tests
##
test-unit:
	source ./env/.compiled; npm run test:unit -- --exit

test-service:
	source ./env/.compiled; npm run test:service -- --exit

test-api:
	@make admin-health-check
	source ./env/.compiled; npm run test:api -- --exit

##
# Deployment
##
setup-deployment-config:
	heroku login
	heroku container:login
	heroku git:remote -a ${HEROKU_APP}

	@touch setup-deployment-config

build-docker:
	docker-compose build

deploy:
	#@make env lint build test-unit test-service
	@./scripts/_deploy.sh

db-login:
	@docker exec -it s4_db sh -c 'psql ${DATABASE_URL}'


# Bring the db up to date with the latest migrations
migrate:
	source ./env/.compiled; npm run knex -- migrate:latest

rollback:
	source ./env/.compiled; npm run knex -- migrate:rollback

# Add seed data to the tables
# re-runs existing seeds, so don't use this in
# production!
seed:
	#TODO: disallow in production
	source ./env/.compiled; npm knex -- seed:run --env development



.PHONY: switch switch-dev swich-prod env