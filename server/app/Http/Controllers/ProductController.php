<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Product;
use Validator;

class ProductController extends Controller
{
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
        $products = Product::where('category_id', $request->categoryId)->paginate(9);

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