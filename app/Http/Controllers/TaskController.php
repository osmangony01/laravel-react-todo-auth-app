<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Todo;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TaskController extends Controller
{
    public function index($id){

        
        // $tasks = Task::find();

        // if($tasks->count()>0){
        //     return response()->json([
        //         'status'=> 200,
        //         'tasks'=> $tasks
        //     ], 200);
        // }
        // else{
        //     return response()->json([
        //         'status'=> 404,
        //         'tasks'=> 'No Records Found!!'
        //     ], 404);
        // }

        try {
            // $task = Task::findOrFail($id);
            $tasks = User::find($id)->tasks;
            if($tasks->count()>0){
                return response()->json([
                    'status'=> 200,
                    'tasks'=> $tasks
                ], 200);
            }
        } 
        catch (ModelNotFoundException $exception) {
            return response()->json([
                'status'=> 404,
                'tasks'=> 'No Records Found!!'
            ], 404);
        }
    }

    public function fetchTask($id)
    {
        try {
            $task = Task::findOrFail($id);
            return response()->json($task, 200);
        } 
        catch (ModelNotFoundException $exception) {
            return response()->json([
                'status' => 404,
                'message' => 'Todo not found!',
            ], 404);
        }
    }


    public function addTask(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'task_title' => 'required|string|max:255',
            'task_due_date' => 'required|date',
            'task_priority' => 'required|string',
            'task_description' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors()
            ], 422);
        } 
        else {
            $task = new Task();
            $task->task_title = $req->task_title;
            $task->task_due_date =  $req->task_due_date;
            $task->task_priority =  $req->task_priority;
            $task->task_description =  $req->task_description;
            $task->user_id = $req->id;

            if ($task->save()) {
                return response()->json([
                    'status' => 201,
                    'message' => 'Task created successfully'
                ], 200);
            } 
            else {
                return response()->json([
                    'status' => 500,
                    'message' => 'Something went wrong!'
                ], 500);
            }
        }
    }

    public function updateTask(Request $req, $id){
        
        $validator = Validator::make($req->all(), [
            'task_title' => 'required|string|max:255',
            'task_due_date' => 'required|date',
            'task_priority' => 'required|string',
            'task_description' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors()
            ], 422);
        } 
        else {
            try {
                $task = Task::findOrFail($id);
                $task->task_title = $req->task_title;
                $task->task_due_date =  $req->task_due_date;
                $task->task_priority =  $req->task_priority;
                $task->task_description =  $req->task_description;

                if ($task->save()) {
                    return response()->json([
                        'status' => 202,
                        'message' => 'Task updated successfully'
                    ], 202);
                } 
                else {
                    return response()->json([
                        'status' => 500,
                        'message' => 'Something went wrong!'
                    ], 500);
                }
            } 
            catch (ModelNotFoundException $exception) {
                return response()->json([
                    'status' => 404,
                    'message' => 'Task not found!',
                ], 404);
            }
            
        }
    }

    public function deleteTask($id)
    {
        try {
            $task = Task::findOrFail($id);
            $task->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Task deleted successful',
            ], 200);
        } 
        catch (ModelNotFoundException $exception) {
            return response()->json([
                'status' => 404,
                'message' => 'Task not found!',
            ], 404);
        }
    }

    public function findUserTask()
    {
        $tasks = User::find("5")->tasks;

        if($tasks->count()>0){
            return response()->json([
                'status'=> 200,
                'tasks'=> $tasks
            ], 200);
        }
        else{
            return response()->json([
                'status'=> 404,
                'tasks'=> 'No Records Found!!'
            ], 404);
        }
    }
}
