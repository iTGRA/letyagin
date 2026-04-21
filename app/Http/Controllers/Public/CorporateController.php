<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Inertia\Inertia;
use Inertia\Response;

class CorporateController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Corporate', [
            'page' => Page::forSlug('corporate'),
        ]);
    }
}
