juxtanews
=========

## Getting Started

Run the following:

    bundle install

## Web App

We use rails-api. It's a stripped down Rails stack

    rails s -p 3001

## Newsie

Newsie Snapshot background process

    rake newsie:poller

Newsie can do a one-time fetch to

    rake newsie:fetch ID=XX

Newsie can find things too

    rake newsie:find NAME=fox
