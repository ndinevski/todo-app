<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Carbon\Carbon;


class TaskController extends Controller
{
    public function index()
    {
        return response()->json(Task::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'boolean',
            'priority' => 'in:low,medium,high',
            'due_date' => 'nullable|date',
        ]);

        if (!empty($validated['due_date'])) {
            $validated['due_date'] = Carbon::parse($validated['due_date'])->format('Y-m-d H:i:s');
        }

        $task = Task::create($validated);

        return response()->json($task, 201);
    }

    

    public function show(Task $task)
    {
        return response()->json($task);
    }

    public function update(Request $request, Task $task)
    {
        $task->update($request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'boolean',
            'priority' => 'in:low,medium,high',
            'due_date' => 'nullable|date',
        ]));

        return response()->json($task);
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(['message' => 'Task deleted']);
    }
}
