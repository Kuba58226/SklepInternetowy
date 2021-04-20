<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Orderdetails;
use Illuminate\Support\Facades\Auth;
use Validator;

class OrderController extends Controller
{
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstName' => 'required|string|min:2',
            'lastName' => 'required|string|min:2',
            'address1' => 'required|string|min:2',
            'address2' => 'required|string|min:2',
            'city' => 'required|string|min:2',
            'state' => 'required|string|min:2',
            'postalCode' => 'required|string|min:2',
            'country' => 'required|string|min:2',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $total_price = 0;
        foreach ($request->cart as $element) {
            $total_price+=$element['price'];
        }

        $order = Order::create(array_merge([
            'user_id' => auth()->user()->id,
            'total_price'=>$total_price,
            'is_paid'=>false,
            'is_sent'=>false],
            $validator->validated()));

        foreach ($request->cart as $element) {
            $orderdetails = Orderdetails::create([
                'order_id' => $order->id,
                'product_id' => $element['id'],
                'name' => $element['name'],
                'count' => $element['count'],
                'price_each' => $element['price']]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Order successfully created',
            'order' => $order
        ], 201);
    }
}
