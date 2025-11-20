<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePodcastRequest;
use App\Http\Requests\UpdatePodcastRequest;
use App\Models\Podcast;
use Illuminate\Http\Request;
use OpenApi\Annotations as OA;


class PodcastController extends Controller
{
      /**
     * @OA\Get(
     *     path="/api/podcasts",
     *     summary="List all podcasts",
     *     tags={"Podcasts"},
     *     @OA\Response(response=200, description="List of podcasts")
     * )
     */
    public function index()
    {
        return response()->json(Podcast::with('user','episodes')->get(), 200);
    }

       /**
     * @OA\Get(
     *     path="/api/podcasts/{id}",
     *     summary="Get single podcast",
     *     tags={"Podcasts"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Podcast found"),
     *     @OA\Response(response=404, description="Not found")
     * )
     */
    public function show($id)
    {
        return response()->json(Podcast::with('user','episodes')->findOrFail($id), 200);
    }

      /**
     * @OA\Post(
     *     path="/api/podcasts",
     *     summary="Create a podcast",
     *     security={{"sanctum":{}}},
     *     tags={"Podcasts"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={"title","description","category"},
     *                 @OA\Property(property="title", type="string"),
     *                 @OA\Property(property="description", type="string"),
     *                 @OA\Property(property="category", type="string"),
     *                 @OA\Property(property="image", type="string", format="binary")
     *             )
     *         )
     *     ),
     *     @OA\Response(response=200, description="Podcast created")
     * )
     */
    public function store(StorePodcastRequest $request)
    {
        // only host or admin can create
        $user = auth()->user();
        if (!in_array($user->role, ['host','admin'])) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $podcast = Podcast::create([
            'user_id'     => $user->id,
            'title'       => $request->title,
            'description' => $request->description,
            'category'    => $request->category,
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('podcasts/images', 'public');
            $podcast->image = $path; 
            $podcast->save();
        }

        return response()->json($podcast, 200);
    }

        /**
         * @OA\Put(
         *     path="/api/podcasts/{id}",
         *     summary="Update a podcast",
         *     security={{"sanctum":{}}},
         *     tags={"Podcasts"},
         *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
         *     @OA\RequestBody(
         *         required=true,
         *         @OA\MediaType(
         *             mediaType="multipart/form-data",
         *             @OA\Schema(
         *                 @OA\Property(property="title", type="string"),
         *                 @OA\Property(property="description", type="string"),
         *                 @OA\Property(property="category", type="string"),
         *                 @OA\Property(property="image", type="string", format="binary")
         *             )
         *         )
         *     ),
         *     @OA\Response(response=200, description="Podcast updated"),
         *     @OA\Response(response=403, description="Forbidden")
         * )
         */
    public function update(UpdatePodcastRequest $request, Podcast $podcast)
    {
        $user = auth()->user();
        if (!($user->role === 'admin' || $podcast->user_id === $user->id)) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $podcast->update($request->only(['title','description','category']));

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('podcasts/images', 'public');
            $podcast->image = $path;
            $podcast->save();
        }

        return response()->json($podcast, 200);
    }

        /**
         * @OA\Delete(
         *     path="/api/podcasts/{id}",
         *     summary="Delete a podcast",
         *     security={{"sanctum":{}}},
         *     tags={"Podcasts"},
         *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
         *     @OA\Response(response=200, description="Podcast deleted"),
         *     @OA\Response(response=403, description="Forbidden")
         * )
         */
    public function destroy(Podcast $podcast)
    {
        $user = auth()->user();
        if (!($user->role === 'admin' || $podcast->user_id === $user->id)) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $podcast->delete();
        return response()->json(['message' => 'Podcast deleted'], 200);
    }
}
