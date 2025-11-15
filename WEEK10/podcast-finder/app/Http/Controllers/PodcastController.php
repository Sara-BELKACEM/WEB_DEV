<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePodcastRequest;
use App\Models\Podcast;
use Illuminate\Http\Request;

class PodcastController extends Controller
{
    public function index()
    {
        return Podcast::with('user', 'episodes')->get();
    }

    public function show($id)
    {
        return Podcast::with('user', 'episodes')->findOrFail($id);
    }

    public function store(StorePodcastRequest $request)
    {
        $this->authorize('create', Podcast::class);

        $podcast = Podcast::create([
            'user_id' => auth()->id(),
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('podcasts/images', 'public');
            $podcast->image_path = $path;
            $podcast->save();
        }

        return $podcast;
    }

    public function update(Request $request, Podcast $podcast)
    {
        $this->authorize('update', $podcast);

        $podcast->update($request->validated());

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('podcasts/images', 'public');
            $podcast->image_path = $path;
            $podcast->save();
        }

        return $podcast;
    }

    public function destroy(Podcast $podcast)
    {
        $this->authorize('delete', $podcast);
        $podcast->delete();
        return response()->json(['message' => 'Podcast deleted']);
    }
}
