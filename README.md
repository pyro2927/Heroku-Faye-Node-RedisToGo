# Heroku-Faye-Node-RedisToGo

Easily get a pub-sub working with [Faye](http://faye.jcoglan.com/) on [Heroku](http://www.heroku.com/).

![Faye logo](http://faye.jcoglan.com/images/faye-logo.gif)

## Quick-Setup, 3 easy steps

1) Clone this repo:

    git clone https://github.com/pyro2927/Heroku-Faye-Node-RedisToGo.git

2) Create Heroku instance and enable websockets & redistogo

    heroku create
    heroku labs:enable websockets
    heroku addons:add redistogo

3) Push up code!

    git push heroku master

## Tech stuffs

[Faye](http://faye.jcoglan.com/) is a simple [pub/sub](http://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) server that allows you to pass messages back and forth between clients.  This simple setup uses [node.js](http://nodejs.org/) to setup and manage Faye, as well as adding the ability to [cluster](http://blog.jcoglan.com/2011/05/25/faye-0-6-its-all-about-clustering/) by connecting to a [Redis-backend](https://github.com/faye/faye-redis-node).

## Clustering

This instance of Faye is setup to cluster around [RedisToGo](https://addons.heroku.com/redistogo), which allows you to have up to 10 connections/dynos on the free version.  If you want more connections you'll have to upgrade to a larger plan. **Note: This is NOT the number of clients you can have connected to Faye, just the number of dynos you can have connected to the Redis-backend.**

![Faye cluster diagram](http://faye.jcoglan.com/images/faye-cluster.png)

## TODO:

* Add in pub/sub secret to only allow authorized users
* Auto-scale dynos as necessary
* Add in sample client page
