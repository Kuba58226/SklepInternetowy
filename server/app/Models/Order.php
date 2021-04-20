<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'firstName',
        'lastName',
        'address1',
        'address2',
        'city',
        'state',
        'postalCode',
        'country',
        'total_price',
        'is_paid',
        'is_sent',
    ];
}
