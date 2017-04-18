<?php

namespace App\Dashboard\Commands;

use ArtisanSDK\Server\Entities\Command;

class ReportMemoryUsage extends Command
{
    /**
     * Run the command.
     */
    public function run()
    {
        $memory = memory_get_peak_usage(true);
        $this->dispatcher()
            ->broker()
            ->log($this->format($memory));
    }

    /**
     * Format the size as a human readable string.
     *
     * @param int $size in bytes
     *
     * @return string
     */
    protected function format($size)
    {
        $unit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];

        $i = floor(log($size, 1024));

        return (string) round($size / pow(1024, $i), 2).' '.$unit[$i];
    }
}
