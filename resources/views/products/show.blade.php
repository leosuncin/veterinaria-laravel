@extends('layouts.app')

@section('content')
<div class="row py-4">
    <div class="col-md-6">
        <img src="{{ $product->image }}" alt="{{ $product->name }}" class="img-fluid" />
    </div>
    <div class="col-md-4">
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <h1>{{ $product->name }}</h1>
            </li>
            <li class="list-group-item h3">
                <strong>Price: </strong>$ {{ $product->price }}
            </li>
            <li class="list-group-item">
                <strong>Description: </strong> {{ $product->description }}
            </li>
        </ul>
    </div>
</div>
@endsection
