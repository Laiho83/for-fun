/**
 * @file /src/scripts/init/subPub.js
 * Events (publish subscribe pattern)
 *
 * Publish the event with emit.
 * Than listen to this event from any added module.
 *
 * @events.on: subscribe to event
 * @events.off: unsubscribe from event
 * @events.emit: publish event
 *
 * Usage:
 *  events.on('event_name', someHandler);
 *  events.off('event_name', someHandler);
 *  events.emit('event_name', someHandler);
 */

var events = {
    events: {},

    /**
     * Subscribe to event.
     *
     * @param {string} eventName
     * @param {function} fn
     */
    on: function (eventName, fn) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(fn);
    },
    /**
     * Unsubscribe from event.
     *
     * @param {string} eventName
     * @param {function} fn
     */
    off: function(eventName, fn) {
        if (this.events[eventName]) {
            for (var i = 0; i < this.events[eventName].length; i++) {
                if (this.events[eventName][i] === fn) {
                    this.events[eventName].splice(i, 1);
                    break;
                }
            }
        }
    },
    /**
     * Publish (produce) ann event.
     *
     * @param {string} eventName
     * @param {data} data
     */
    emit: function (eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(function(fn) {
                fn(data);
            });
        }
    }
};