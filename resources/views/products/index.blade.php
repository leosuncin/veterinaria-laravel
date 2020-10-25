@extends('layouts.app')

@section('content')
<div class="row">
    <div class="col-12">
        <h1>Productos</h1>
    </div>
    <div class="col-12">
        <table class="table table-bordered table-responsive">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Precio</th>
                    <th>Imagen</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($products as $product)
                <tr>
                    <td>{{ $product->id }}</td>
                    <td>{{ $product->name }}</td>
                    <td>
                        <p>{{ $product->description }}</p>
                    </td>
                    <td>$ {{ $product->price }}</td>
                    <td>
                        <img src="{{ $product->image }}" height="100" />
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>
@endsection
