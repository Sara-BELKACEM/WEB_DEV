<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function getFavoriteTasks()
    {
        $tasks = Auth::user()->favoriteTasks;
        return response()->json($tasks);
    }

    public function addTaskToFavorites($taskId)
    {  
        Task::findOrFail($taskId);
        $user = Auth::user();
        $user->favoriteTasks()->syncWithoutDetaching($taskId);
        return response()->json(['message' => 'Task added to favorites successfully'], 200);
    }

    public function removeTaskFromFavorites($taskId)
    {
        $user = Auth::user();
        $user->favoriteTasks()->detach($taskId);
        return response()->json(['message' => 'Task removed from favorites successfully'], 200);
    }

    public function getTasksByPriority()
    {
        $tasks = Auth::user()->tasks()->orderByRaw("FIELD(priority , 'high', 'medium', 'low')")->get();
        return response()->json($tasks);
    }


    public function getAllTasks()
    {
        $tasks = Task::all();
        return response()->json($tasks);
    }

    public function addCategoriesToTask(Request $request, $taskId)
    {
        $task = Task::find($taskId);
        $task->categories()->attach($request->category_id);
        return response()->json(['message' => 'Categories added to task successfully'], 200);
    }

    public function getTaskCategories($taskId)
    {
        $categories = Task::find($taskId)->categories;
        return response()->json($categories, 200);
    }

    public function getTasksUser($id)
    {
        $user = Task::find($id)->user;
        return response()->json($user, 200);
    }
    public function index()
    {
        $tasks = Auth::user()->tasks;
        return response()->json($tasks);
    }
    public function store(StoreTaskRequest $request)
    {
        $user_id = Auth::user()->id;
        $validatedData = $request->validated();
        $validatedData['user_id'] = $user_id;
        $task = Task::create($request->validated());
        return response()->json($task, 201);
    }
    public function  update(Request $request, $id)
    {
        $user_id = Auth::user()->id;
        $task = Task::find($id);
        if ($task->user_id != $user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $validatedData = $request->validate([
            'title' => 'sometimes|string|max:55',
            'description' => 'sometimes|string|max:255',
            'priority' => 'sometimes|integer',
        ]);
        $task->update($validatedData);
        return response()->json($task);
    }
    public function show($id)
    {
        $task = Task::find($id);
        return response()->json($task);
    }
    public function destroy($id)
    {
        $task = Task::find($id);
        $task->delete();
        return response()->json(null, 204);
    }
}
