<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEpisodeRequest;
use App\Models\Episode;
use App\Models\Podcast;
use GuzzleHttp\Psr7\Request as Psr7Request;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Request as HttpFoundationRequest;

class EpisodeController extends Controller
{
   public function indexByPodcast($podcast_id)
{
    return Episode::where('podcast_id',$podcast_id)->get();
}

public function show($id)
{
    return Episode::findOrFail($id);
}

public function store(StoreEpisodeRequest $request, $podcast_id)
{
    $podcast = Podcast::findOrFail($podcast_id);
    $this->authorize('create', Episode::class);

    $episode = Episode::create([
        'title'=>$request->title,
        'description'=>$request->description,
        'podcast_id'=>$podcast_id
    ]);

    if ($request->hasFile('audio')) {
        $path = $request->file('audio')->store('episodes/audio','public');
        $episode->audio_path = $path;
        $episode->save();
    }

    return $episode;
}

public function update(Request $request, Episode $episode)
{
    $this->authorize('update', $episode);

    $episode->update($request->validated());

    if ($request->hasFile('audio')) {
        $path = $request->file('audio')->store('episodes/audio','public');
        $episode->audio_path = $path;
        $episode->save();
    }

    return $episode;
}

public function destroy(Episode $episode)
{
    $this->authorize('delete', $episode);
    $episode->delete();
    return response()->json(['message'=>'Episode deleted']);
}

}
