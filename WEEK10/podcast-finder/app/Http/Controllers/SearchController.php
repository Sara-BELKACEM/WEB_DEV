<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function podcasts(Request $request)
    {
        $q = Podcast::query();

        if($request->title) $q->where('title','like',"%$request->title%");
        if($request->category) $q->where('category',$request->category);

        return $q->get();
    }

    public function episodes(Request $request)
    {
        $q = Episode::query();

        if($request->title) $q->where('title','like',"%$request->title%");
        if($request->podcast) $q->where('podcast_id',$request->podcast);

        return $q->get();
    }
}
