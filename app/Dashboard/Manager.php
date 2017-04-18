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

        $this->loop()->addPeriodicTimer(10, function () {
            $this->stop();
        });

        $x = 0;
        $timer = $this->loop()->addPeriodicTimer(1 / 10, function () use (&$x) {
            ++$x;
            $this->broker()->log((string) $x);
        });

        $this->loop()->addTimer(3, function () use ($timer) {
            $this->loop()->cancelTimer($timer);

            $this->run(new Commands\ReportMemoryUsage());
        });

        $this->add(new Timers\MonitorMemoryUsage());
    }
}
