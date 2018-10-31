#
# TZ Voice Book
#

PATH := node_modules/.bin:$(PATH)

PROJECT = "TZ_VOICE_BOOK"
dir = $(shell pwd)
include .tz_config
include /tmp/tz_env 


admin_dir := $(dir)/functions/src/admin
env_dir := $(dir)/env

#Add in admin node modules executable
PATH := $(admin_dir)/node_modules/.bin:$(PATH)

##
# Admin Tools
## 

admin-deploy-audio:
	@echo ${admin_dir}
	cd ${admin_dir} && gulp deploy_audio

admin-deploy-config:
	@echo ${admin_dir}
	cd ${admin_dir} && gulp deploy_config


##
# Env Setup
## 

env:
	cat ${env_dir}/.env.${stage}.sh ${env_dir}/env.${stage}.sh > /tmp/tz_env


switch:
	@echo switching to stage: ${stage}
	@echo 'export stage=${stage}\n' > .tz_config
	@make env

switch-dev:
	make switch stage="development"

switch-prod:
	make switch stage="production"


##
# Local Development
##

run-lt: 
	@lt --subdomain ${LT_SUBDOMAIN} --port 5000

run-local:
	./_run_local.sh

deploy:
	./_deploy.sh

.PHONY: switch switch-dev swich-prod env