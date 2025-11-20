<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEpisodeRequest;
use App\Http\Requests\UpdateEpisodeRequest;
use App\Models\Episode;
use App\Models\Podcast;
use Illuminate\Support\Facades\Storage;
use OpenApi\Annotations as OA;


class EpisodeController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/podcasts/{podcast_id}/episodes",
     *     summary="List episodes by podcast",
     *     tags={"Episodes"},
     *     @OA\Parameter(
     *         name="podcast_id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="List of episodes")
     * )
     */
    public function indexByPodcast($podcast_id)
    {
        $podcast = Podcast::findOrFail($podcast_id);
        return response()->json($podcast->episodes()->get(), 200);
    }

    /**
     * @OA\Get(
     *     path="/api/episodes/{id}",
     *     summary="Get single episode",
     *     tags={"Episodes"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Episode found"),
     *     @OA\Response(response=404, description="Not found")
     * )
     */
    public function show($id)
    {
        return response()->json(Episode::findOrFail($id), 200);
    }

    /**
     * @OA\Post(
     *     path="/api/podcasts/{podcast_id}/episodes",
     *     summary="Create episode for a podcast",
     *     security={{"sanctum":{}}},
     *     tags={"Episodes"},
     *     @OA\Parameter(
     *         name="podcast_id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={"title","description"},
     *                 @OA\Property(property="title", type="string"),
     *                 @OA\Property(property="description", type="string"),
     *                 @OA\Property(property="audio", type="string", format="binary")
     *             )
     *         )
     *     ),
     *     @OA\Response(response=201, description="Episode created")
     * )
     */
    public function store(StoreEpisodeRequest $request, $podcast_id)
    {
        $user = auth()->user();
        $podcast = Podcast::findOrFail($podcast_id);

        // Only host owner or admin  
        if ($user->role === 'host' && $podcast->user_id !== $user->id) {
            return response()->json(['message' => 'Forbidden - not owner'], 403);
        }

        if ($user->role !== 'host' && $user->role !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $episode = Episode::create([
            'podcast_id'  => $podcast_id,
            'title'       => $request->title,
            'description' => $request->description,
        ]);

        // Handle audio
        if ($request->hasFile('audio')) {
            $path = $request->file('audio')->store('episodes/audio', 'public');
            $episode->audio = $path;
            $episode->save();
        }

        return response()->json($episode, 201);
    }

    /**
     * @OA\Put(
     *     path="/api/episodes/{id}",
     *     summary="Update an episode",
     *     security={{"sanctum":{}}},
     *     tags={"Episodes"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 @OA\Property(property="title", type="string"),
     *                 @OA\Property(property="description", type="string"),
     *                 @OA\Property(property="audio", type="string", format="binary")
     *             )
     *         )
     *     ),
     *     @OA\Response(response=200, description="Episode updated"),
     *     @OA\Response(response=403, description="Forbidden")
     * )
     */
    public function update(UpdateEpisodeRequest $request, Episode $episode)
    {
        $user = auth()->user();

        if ($user->role !== 'admin' && $episode->podcast->user_id !== $user->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $episode->update($request->only(['title', 'description']));

        if ($request->hasFile('audio')) {
            $path = $request->file('audio')->store('episodes/audio', 'public');
            $episode->audio = $path;
            $episode->save();
        }

        return response()->json($episode, 200);
    }

    /**
     * @OA\Delete(
     *     path="/api/episodes/{id}",
     *     summary="Delete an episode",
     *     security={{"sanctum":{}}},
     *     tags={"Episodes"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Episode deleted"),
     *     @OA\Response(response=403, description="Forbidden")
     * )
     */
    public function destroy(Episode $episode)
    {
        $user = auth()->user();

        if ($user->role !== 'admin' && $episode->podcast->user_id !== $user->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $episode->delete();
        return response()->json(['message' => 'Episode deleted'], 200);
    }
}
