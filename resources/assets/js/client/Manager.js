class Manager {

    /**
     * Constructor
     *
     * @param vue
     */
    constructor(vue = null) {
        this.vue = vue || new Vue();
    }

    /**
     * Fire an event with a payload.
     *
     * @param event
     * @param data
     */
    fire(event, data = null) {
        this.vue.$emit(event, data);
    }

    /**
     * Fire an event with a payload but only once.
     *
     * @param event
     * @param data
     */
    once(event, data = null) {
        this.vue.$once(event, data);
    }

    /**
     * Listen for an event and call the callback.
     *
     * @param event
     * @param callback
     */
    listen(event, callback) {
        this.vue.$on(event, callback);
    }
}

module.exports = Manager;
