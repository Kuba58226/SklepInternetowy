<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Category;
use Validator;

class CategoryController extends Controller
{
    public function getAll(Request $request)
    {
        $categories = Category::all();

        return response()->json([
            'success' => true,
            'message' => 'Categories successfully returned',
            'categories' => $categories
        ], 201);
    }
    public function getSingle(Request $request)
    {
        $category = Category::findOrFail($request->id);

        return response()->json([
            'success' => true,
            'message' => 'Category successfully returned',
            'category' => $category
        ], 201);
    }
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:2|unique:categories',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $category = Category::create($validator->validated());

        return response()->json([
            'success' => true,
            'message' => 'Category successfully created',
            'category' => $category
        ], 201);
    }
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:2|unique:categories',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $category = Category::findOrFail($request->id);

        $category->name = $request->input('name');
        if ($category->save()){
            return response()->json([
                'success' => true,
                'message' => 'Category successfully updated',
                'category' => $category
            ], 201);
        }
    }
    public function delete(Request $request)
    {
        $category = Category::destroy($request->id);

        return response()->json([
            'success' => true,
            'message' => 'Category successfully deleted',
            'category' => $category
        ], 201);
    }
}
