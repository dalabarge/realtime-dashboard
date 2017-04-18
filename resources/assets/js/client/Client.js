let UUID = require('uuid-js');

class Client {

    constructor(options)
    {
        const {host, port, path, secure} = options;
        this._connection = null;
        this.host = host;
        this.path = path;
        this.scheme = port === 443 || secure === true ? 'wss' : 'ws';
        this.port = (port === '') ? (secure === true ? 443 : 80) : port;
        this.url = this.scheme +'://' + this.host + ':' + this.port + '/' + this.path;
    }

    connect()
    {
        try {
            this._connection = new WebSocket(this.url);
            this._connection.onopen = this.onOpen.bind(this);
            this._connection.onerror = this.onError.bind(this);
            this._connection.onmessage = this.onMessage.bind(this);
            this._connection.onclose = this.onClose.bind(this);
        } catch(e) {
            this._manager.fire('ConnectionFailed', e);
        }
    }

    manager(instance)
    {
        this._manager = instance;
    }

    send(message, payload)
    {
        payload = payload || {};
        payload.id = UUID.create().hex;
        payload.name = message;
        payload.timestamp = new Date().getTime();

        return this._connection.send(JSON.stringify(payload));
    }

    close(code, reason)
    {
        this._connection.close(code, reason);
    }

    onOpen(e)
    {
        e.message = 'Opening connection to ' + this.url;
        this._manager.fire('ConnectionOpened', e);
    }

    onMessage(e)
    {
        var payload = JSON.parse(e.data);
        this._manager.fire(payload.name, payload);
    }

    onError(e)
    {
        this._manager.fire('ConnectionErrored', e);
    }

    onClose(e)
    {
        var data = {};
        switch(e.code) {
            case 1000:
                data.message = 'Connection closed.';
                break;

            case 1006:
                data.message = 'Connection closed: remote server hung up.';
                if (e.reason !== undefined) {
                    data.reason = e.reason;
                }
                this._manager.fire('ConnectionFailed', data);
                return;
        }
        this._manager.fire('ConnectionClosed', data);
    }
}

module.exports = Client;
