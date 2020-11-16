@extends('layouts.app')

@section('content')
<div class="row">
    <div class="col-12">
        <h1>Productos</h1>
    </div>
    <div class="col-12">
        <form id="create-product-form" method="POST" action="/products" class="jumbotron">
            @csrf
            <fieldset class="form-group">
                <label for="name">Nombre</label>
                <input id="name" name="name" type="text" class="form-control" required minlength="5" maxlength="90"/>
            </fieldset>
            <fieldset class="form-group">
                <label for="description">Descripcion</label>
                <textarea id="description" name="description" class="form-control" row="3" required></textarea>
            </fieldset>
            <fieldset class="form-group">
                <label for="price">Precio</label>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">$</span>
                    </div>
                    <input id="price" name="price" type="text" class="form-control" pattern="^[0-9]+\.?[0-9]{0,2}$" />
                </div>
            </fieldset>
            <fieldset class="form-group">
                <label for="image">Imagen</label>
                <input id="image" name="image" type="url" class="form-control" />
            </fieldset>
            <button type="submit" class="btn btn-primary">Crear producto</button>
        </form>
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
                    <th></th>
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
                    <td>
                        <a class="btn btn-info btn-small" href="/products/{{ $product->id }}">🔍 Mostrar</a>
                        <a class="btn btn-primary btn-small" href="/products/{{ $product->id }}/edit">✏️ Editar</a>
                        <form action="/products/{{ $product->id }}" method="POST">
                            <input type="hidden" name="_method" value="DELETE" />
                            @csrf
                            <button class="btn btn-danger btn-small" type="submit">🗑️ Borrar</button>
                        </form>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>
<script src="/js/products.js"></script>
@endsection
