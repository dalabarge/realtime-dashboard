
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

/**
 * Then we will use a native WebSocket client to establish a connection to
 * the server that is running and bind in event listeners.
 */

let Manager = require('./client/Manager');
global.Client = new (require('./client/Client'))({
    host: document.location.host,
    port: document.location.port,
    path: 'server/',
    secure: document.location.protocol === 'https:'
});

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('intro', require('./components/Intro.vue'));
Vue.component('connections', require('./components/Connections.vue'));
Vue.component('memory-usage', require('./components/MemoryUsage.vue'));

const app = new Vue({
    el: '#app',

    /**
     * Data that the Vue.js is listening for changes to make the components
     * reactive in their state.
     */
    data: {
        connected: false,
        connecting: false,
        connection: {
            uuid: '',
            type: 'anonymous'
        },
        connections: [],
        memory_usage: 0
    },

    /**
     * Have the manager listen to client and server side events and
     * register the command handlers for each message.
     */
    created() {
        Manager = new Manager(this);

        Manager.listen('ConnectionEstablished', message => {
            this.connecting = false;
            this.connected = true;
            this.connection = message.connection;
        });

        Manager.listen('ConnectionFailed', message => {
            this.reset();
        });

        Manager.listen('ConnectionErrored', message => {
            this.reset();
        });

        Manager.listen('ConnectionClosed', message => {
            this.reset();
        });

        Manager.listen('UpdateConnections', message => {
            this.connections = _.values(message.connections);
        });

        Manager.listen('MemoryUsage', message => {
            this.memory_usage = message.value;
        });

        Manager.listen('Say', message => {
            console.log(message);
        });
    },

    /**
     * Now that Vue.js has mounted, lets boot up the client connection.
     */
    mounted() {
        Client.manager(Manager);
        this.connect();
    },

    /**
     * Available method on the Vue.js dashboard that can be called as
     * event handlers or just helpers to keep the listeners readable.
     */
    methods: {

        reset() {
            this.connected = false;
            this.connecting = false;
            this.connections = [];
            this.connection = {
                uuid: '',
                type: 'anonymous'
            };
            this.memory_usage = 0;
        },

        connect() {
            this.connecting = true;
            this.connected = false;
            Client.connect();
        },

        reconnect() {
            if( this.connected ) {
                this.disconnect();
            }
            this.connect();
        },

        disconnect() {
            Client.close();
            this.reset();
        }
    }
});
