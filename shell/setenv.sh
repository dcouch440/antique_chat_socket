#!/usr/bin/env bash
heroku config:set DATABASE_URL=$(heroku config:get DATABASE_URL -a radiant-thicket-98181)