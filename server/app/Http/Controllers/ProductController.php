<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Product;
use Validator;

class ProductController extends Controller
{
    public function getAll(Request $request)
    {
        $products = Product::all();

        return response()->json([
            'success' => true,
            'message' => 'Products successfully returned',
            'products' => $products
        ], 201);
    }
    public function getSingle(Request $request)
    {
        $product = Product::findOrFail($request->id);

        return response()->json([
            'success' => true,
            'message' => 'Product successfully returned',
            'product' => $product
        ], 201);
    }
    public function getRandom(Request $request)
    {
        $products = Product::inRandomOrder()->limit($request->number)->get();

        return response()->json([
            'success' => true,
            'message' => 'Products successfully returned',
            'products' => $products
        ], 201);
    }
    public function getByCategory(Request $request)
    {
        $products = Product::where('category_id', $request->categoryId)->whereBetween('price',[$request->minPrice,$request->maxPrice])->paginate(9);

        return response()->json([
            'success' => true,
            'message' => 'Products successfully returned',
            'products' => $products
        ], 201);
    }
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:2',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|',
            'img' => 'required|url',
            'description' => 'required|string',
            'short_description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $product = Product::create($validator->validated());

        return response()->json([
            'success' => true,
            'message' => 'Product successfully created',
            'product' => $product
        ], 201);
    }
}
