@extends('layouts.app')

@section('content')
<form method="POST" action="/products/{{ $product->id }}" class="py-4">
    @method('PUT')
    @csrf
    <legend class="h1 my-2">Editar informacion de: {{ $product->name }}</legend>
    <fieldset class="form-group">
        <label for="product_id">Identificador</label>
        <input id="product_id" name="product_id" class="form-control" readonly value="{{ $product->id }}" />
    </fieldset>
    <fieldset class="form-group">
        <label for="name">Nombre</label>
        <input id="name" name="name" type="text" class="form-control" value="{{ $product->name }}" />
    </fieldset>
    <fieldset class="form-group">
        <label for="description">Descripcion</label>
        <textarea id="description" name="description" class="form-control" row="3">{{ $product->description }}</textarea>
    </fieldset>
    <fieldset class="form-group">
        <label for="price">Precio</label>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">$</span>
            </div>
            <input id="price" name="price" type="text" class="form-control" pattern="^[0-9]+\.?[0-9]{0,2}$" value="{{ $product->price }}" />
        </div>
    </fieldset>
    <fieldset class="form-group">
        <label for="image">Imagen</label>
        <input id="image" name="image" type="url" class="form-control" value="{{ $product->image }}" />
    </fieldset>
    <button type="submit" class="btn btn-primary">Actualizar producto</button>
    <a href="/products" class="btn btn-secondary">Regresar</a>
</form>
@endsection
