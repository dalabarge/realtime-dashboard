<?php

namespace App\Dashboard\Commands;

use App\Dashboard\Messages\MemoryUsage;
use ArtisanSDK\Server\Entities\Command;

class ReportMemoryUsage extends Command
{
    /**
     * Run the command.
     */
    public function run()
    {
        $size = memory_get_usage();
        $message = new MemoryUsage([
            'value'     => $size,
            'formatted' => $this->format($size),
        ]);
        $this->dispatcher()->broadcast($message);
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
