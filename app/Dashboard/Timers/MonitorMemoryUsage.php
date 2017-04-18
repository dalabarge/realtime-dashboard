<?php

namespace App\Dashboard\Timers;

use App\Dashboard\Commands\ReportMemoryUsage;
use ArtisanSDK\Server\Contracts\ShouldAutoStart;
use ArtisanSDK\Server\Entities\Timer;

class MonitorMemoryUsage extends Timer implements ShouldAutoStart
{
    /**
     * Setup the timed command.
     */
    public function __construct()
    {
        $this->command(ReportMemoryUsage::class)
            ->interval(1 * 1000);
    }
}
