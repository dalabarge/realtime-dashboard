<?php

namespace App\Dashboard\Messages;

use ArtisanSDK\Server\Contracts\ClientMessage;
use ArtisanSDK\Server\Contracts\SelfHandling;
use ArtisanSDK\Server\Contracts\ServerMessage;
use ArtisanSDK\Server\Entities\Message;
use ArtisanSDK\Server\Traits\NoProtection;

class Say extends Message implements ClientMessage, ServerMessage, SelfHandling
{
    use NoProtection;

    public function handle()
    {
        $message = new self([
            'phrase' => $this->phrase.' World',
        ]);
        $this->dispatcher()->send($message, $this->client());
    }
}
