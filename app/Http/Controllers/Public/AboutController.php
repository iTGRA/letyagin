<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\HistoryMilestone;
use App\Models\Page;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('About', [
            'page' => Page::forSlug('about'),
            'milestones' => Cache::rememberForever('history.active', fn () => HistoryMilestone::active()->get()->values()->toArray()),
        ]);
    }
}
