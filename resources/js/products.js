/**
 * @type {HTMLFormElement}
 */
const $form = document.getElementById('create-product-form');
/**
 * @type {HTMLInputElement}
 */
const $name = document.querySelector('input[name="name"]');
/**
 * @type {HTMLTextAreaElement}
 */
const $description = document.querySelector('textarea[name="description"]');
const $products = document.getElementById('product-list');

function validarNombre() {
    const entrada = $name.value;

    $name.setCustomValidity('');
    if (!entrada) {
        $name.setCustomValidity('Ingrese un nombre para el producto');
        $name.reportValidity();
    } else if (entrada.length < $name.minLength) {
        $name.setCustomValidity(`El nombre del producto debe tener al menos ${$name.minLength} caracteres`);
        $name.reportValidity();
    } else if (entrada.length > $name.maxLength) {
        $name.setCustomValidity(`El nombre del producto no puede tener mas de ${$name.maxLength} caracteres`);
        $name.reportValidity();
    }
}

function validarDescripcion() {
    const descripcion = $description.value;

    $description.setCustomValidity('');
    if (!descripcion) {
        $description.setCustomValidity('Ingrese la descripcion para el producto');
        $description.reportValidity();
    }
}

/**
 * Se encarga de eliminar un producto
 *
 * @param {Event} event
 */
function eliminarProductoManejador(event) {
    // Evita que el navegador se recargue
    event.preventDefault();
    // Pregunta al usuario si esta seguro de continuar
    const answer = confirm('¿Estas seguro de lo que haces?');

    if (answer) { // Si el usuario confirma la eliminación
        /**
         * El formulario que originó el evento «submit»
         * @type {HTMLFormElement}
         */
        const $formDelete = event.target;
        // Extraer la propiedad `productId` de dataset
        const { productId } = $formDelete.dataset;
        // Realizar la petición al backend
        fetch($formDelete.getAttribute('action'), {
            method: 'DELETE',
            headers: {
                // Le dice a Laravel que esta es una petición AJAX
                'X-Requested-With': 'XMLHttpRequest',
                // Establece el token CSRF usando headers
                'X-CSRF-Token': $formDelete.elements.namedItem('_token').value
            }
        }).then(response => {
            if (response.ok) { // Si todo salió bien
                // Busca la fila del producto a eliminar
                const $filaProducto = document.getElementById(`product-${productId}`);
                // Elimina la fila que contiene el producto
                $filaProducto.remove();
            } else { // Hubo un error
                alert('No se pudo borrar el producto, intentelo después');
            }
        });
    }
}

$name.addEventListener('input', validarNombre);
$description.addEventListener('input', validarDescripcion);

$form.addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData($form)

    fetch($form.getAttribute('action'), {
        method: 'POST',
        body: formData,
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            const fila = document.createElement('tr')
            fila.innerHTML = `
                <td>${ result.id }</td>
                <td>${ result.name }</td>
                <td>
                    <p>${ result.description }</p>
                </td>
                <td>$ ${ result.price }</td>
                <td>
                    <img src="${ result.image }" height="100" />
                </td>
                <td>
                    <a class="btn btn-info btn-small" href="/products/${ result.id }">🔍 Mostrar</a>
                    <a class="btn btn-primary btn-small" href="/products/${ result.id }/edit">✏️ Editar</a>
                    <form action="/products/${ result.id }" method="POST">
                        <input type="hidden" name="_method" value="DELETE" />
                        <button class="btn btn-danger btn-small" type="submit">🗑️ Borrar</button>
                    </form>
                </td>`;
            $products.appendChild(fila);
        })
        .catch(function (error) {
            console.error(error);
        });
});

document.querySelectorAll('form[data-product-id]').forEach(formDelete => {
    formDelete.addEventListener('submit', eliminarProductoManejador);
});
