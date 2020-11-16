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
            console.table(result);
        })
        .catch(function (error) {
            console.error(error);
        });
});
