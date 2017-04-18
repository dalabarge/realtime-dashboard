# Real-Time Dashboard
by [Daniel LaBarge](http://twitter.com/dalabarge)

When having the critical information available in an instant, businesses look to develop real-time dashboards. In the workshop _Real-Time Dashboards With Async PHP_, I will demonstrate how to:

- create an event loop
- write some non-blocking code
- configure a websocket server
- communicate bi-directionally with multiple connection
- build a reactive web application
- bridge "offline" and realtime communications using queues
- expand async applications with common async patterns

While an advanced topic, I will build up from the entry-level sparing no details or introducing any magic along the way (ok maybe a little abstraction of the low level stuff). At the end we will refactor to make our maintained codebase smaller and finally replace the plain-vanilla JS dashboard with Vue.js to help with the client-side heavy-lifting. The result is a synchronous and asynchronous bridge that makes frontends and backends communicate as a seamless, evented app.

## Table of Contents

> **Need Help?** If you find _any_ issues with these instructions or need help with the workshop please [submit an issue on Gitub](https://github.com/dalabarge/realtime-dashboard/issues) to the main repository.

1. [Install Dependencies](#1-installing-dependencies)
	- [Install Homestead](#install-homestead)
	- [Install Node.js](#install-nodejs)
	- [Install Application](#install-application)
	- [Recommended Reading](#recommended-reading)

# 1. Installing Dependencies

It is not critical that you understand how any of these dependencies work (though you are a dev and that's like your one main job), however it is important that you download all of these **BEFORE** the workshop day as Internet will be limited and may impact your ability to follow along. Again, please just read the docs for each.

## Install Homestead

Homestead is a Vagrant-based development machine with a full stack of devops tools available. It does **NOT** really represent a hardened production environment nor a practical one as you rarely need all the included services. It does however provide a great standard basis for our workshop with multi-platform support. Therefore it is a pre-requisite to our training day. If you are unfamiliar with Laravel or Homestead, please [read the full documentation](http://laravel.com/docs/homestead). It might not be a bad idea to just read it again even if you are.

> **Pro Tip:** A Ubuntu 16.04 dev box provisioned with Nginx, PHP 7+, MySQL, Beanstalkd, and Supervisord works. If you have your own kick-awesome setup then you are pro enough to debug it yourself. Or maybe just humor me and follow along...

- [Download and install Virtualbox 5.1+](https://www.virtualbox.org/wiki/Downloads): a virtualization service for your OS
- [Download and install Vagrant](https://www.vagrantup.com/downloads.html): a virtual setup and provisioner for VirtualBox

## Install Node.js

Node.js is the Javascript runtime that we will be using for some frontend development build tools. This should be installed on your host machine (your Mac), **NOT** in your virtual machine (Homestead) to provide optimal performance. We will be using [Larvel Mix](https://laravel.com/docs/mix#installation) as our build tools and while it requires NPM (installed with Node.js) we will also be installing and using the more performant [Yarn dependency manager](https://yarnpkg.com/en). Be sure to [read the Laravel Mix docs](https://laravel.com/docs/mix#installation) for specific installation instructions.

- [Download and install Node.js](https://nodejs.org/en/download/): a Javascript runtime for build tools
- Install Yarn (Globally): `npm install --global yarn`

## Install Application

The demo that will be built is built using Laravel and while you could just as
easily download and install Laravel and then begin from there, I've done some of that work already and have a more plain vanilla Laravel app checked-in at
[github.com/dalabarge/realtime-dashboard](github.com/dalabarge/realtime-dashboard).

Each branch of this repository will be a checkpoint for the application development and you should begin with `step-1`. The following commands do just that and put the code in your `~/Code/realtime-dashboard` folder (a Homestead convention).

```
mkdir ~/Code/realtime-dashboard
cd ~/Code/realtime-dashboard
git clone https://github.com/dalabarge/realtime-dashboard.git ./
git checkout step-1
yarn install
npm run dev
```

> **DevOps Tip:** Yes, I will be using basic Git the entire time because it's not actually that hard. You too should try it now and again.

The application ships with a Homestead configuration file which you can use to bring up your Homestead Vagrant box ready to build with. From the application directory simply run:

```
vagrant up
```

> **Need Help?** You may need to manually checkout `laravel/homestead` into `vendor/laravel/homestead` to properly bring up Homestead seeing as it's a Composer dependency. I had to update Virtualbox to the latest version and had to use 2048MB of RAM though honestly only 512MB should be needed. I also had to add my `/etc/hosts` file entry manually. So try some of these things if it just won't come up.

Next, you'll need to SSH into the Homestead Vagrant box and run the final Composer commands and remaining configuration:

```
vagrant ssh
cd /vagrant
composer install
cp .env.example .env
php artisan key:generate
```

Now go to `http://dashboard.test` in your browser and if all works well then you should see "Real-time Dashboards" title card showing. Furthermore if you run `npm run watch` it should open `localhost:3000` in your browser and any changes to JS or SASS will reload the app. If you manage to get this far then you're in good shape and we can cover the rest in the workshop.

## Recommended Reading

Ok, so maybe it should be required reading but I won't make you. I could have added more but I chose just the best so please take the time to read and listen and we can cover even more ground in the actual workshop.

- [PHP Round Table: #044 Asynchronous PHP](https://www.phproundtable.com/episode/asynchronous-php): a great primer on PHP sync and async coding practice and where it is all going.
- [A Case for Async PHP](https://medium.com/async-php/a-case-for-async-php-f33e5e31ebba): a breakdown of the state of async in PHP and why we have to have more of it
- [Reactive PHP Events](https://medium.com/async-php/reactive-php-events-d0cd866e9285): a complete introduction to the basics of this talk in primitive form
- [Event Loops in PHP](https://medium.com/async-php/event-loops-84978080389c): a briliant primary to event loops and how to use them originally written back in 2015
- [Sockets In Your API](https://medium.com/async-php/sockets-in-your-api-b682c8df5bd): how to reactify your APIs and an introduction
to message specification design
- [Gearman In Your Sockets](https://medium.com/async-php/gearman-in-your-sockets-eefe4f64de2f): bridging the sync nature of normal app code and realtime async code using message queues
- [Multi-Process PHP](https://medium.com/async-php/multi-process-php-94a4e5a4be05) and also [Grouped Execution](https://medium.com/async-php/a-while-ago-i-wrote-about-using-exec-and-shell-commands-to-manage-multiple-php-processes-511f2be5d30d): which set the stage for managing processes inside your event loops
- [How to Make Async Requests in PHP](https://segment.com/blog/how-to-make-async-requests-in-php): mainly just an interesting take on the nature of PHP and how to increase the responsiveness of regular blocking scripts (sync code).
- [Extending Laravel Queues](https://medium.com/@assertchris/laravel-extending-queues-883bf32040b3): This is a bit old so may not be 100% up-to-date but it gets into the details of queues
- [Parallel Processing Multi-Tasking In PHP](https://www.mullie.eu/parallel-processing-multi-tasking-php/): an overview of three well known ways to achieve parallel processing in PHP
- [Co-Operative PHP Multitasking](https://medium.com/async-php/co-operative-php-multitasking-ce4ef52858a0): basically an introduction to yields and generators which are the basis for coroutines in modern PHP
- [Cooperative Multitasking Using Coroutines In PHP](https://nikic.github.io/2012/12/22/Cooperative-multitasking-using-coroutines-in-PHP.html): an old article but something few have actually read and is the foundation of coroutines in PHP
- [Converting HTML to PDF Using Async PHP](https://www.sitepoint.com/writing-async-libraries-lets-convert-html-to-pdf/): a great tutorial on writing async code from scratch to achieve otherwise sync behavior
- [Ratchet WebSocket Server](http://socketo.me/docs/websocket): this demo builds on this server component so a good read of the docs is helpful
- [Promise Of a Burger Party](http://kosamari.com/notes/the-promise-of-a-burger-party): the best ever explanation of promises I've ever read and while JS-specific it still applies to our implementation
- [AWS PHP SDK Promises](https://docs.aws.amazon.com/aws-sdk-php/v3/guide/guide/promises.html): AWS SDK (and Guzzle) both implement "async" via promises so it is important to have a basic working knowledge
- [Kraken Distributed Async PHP Framework](https://kraken-php.com/): something I just came across recently that is in the same vein
- [List of Asynchronous PHP Resources](https://github.com/elazar/asynchronous-php): an organized list of asynchronous PHP programming resources to get your background knowledge up to speed
- [Supervisord Documentation](http://supervisord.org/): we use Supervisord to monitor the Websocket server process so you shoul be familiar with it

---

© 2017 [Artisans Collaborative](http://artisanscollaborative.com). All rights reserved.
