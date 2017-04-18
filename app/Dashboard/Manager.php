<?php

namespace App\Dashboard;

use ArtisanSDK\Server\Manager as BaseManager;

class Manager extends BaseManager
{
    /**
     * Setup the initial state of the manager when starting.
     *
     * @return self
     */
    public function boot()
    {
        parent::boot();

        $this->add(new Timers\MonitorMemoryUsage());
    }
}
