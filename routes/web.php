<?php

use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

Route::get('/', function () {
    return view('welcome');
});

Route::get('/products', function () {
    $products = Product::all();
    return view('products/index', ['products' => $products]);
});

Route::post('/products', function (Request $request) {
    $newProduct = new Product($request->all());
    $newProduct->save();

    return redirect('/products');
});

Route::get('/products/{product}', function (Product $product) {
    return view('products/show', ['product' => $product]);
});

Route::get('/products/{product}/edit', function (Product $product) {
    return view('products/edit', ['product' => $product]);
});
