/**
 * @type {HTMLFormElement}
 */
const $form = document.getElementById('create-product-form');
/**
 * @type {HTMLInputElement}
 */
const $name = document.querySelector('input[name="name"]');

function validarNombre() {
    const entrada = $name.value;

    $name.setCustomValidity('');
    if (!entrada) {
        $name.setCustomValidity('Ingrese un nombre para producto');
        $name.reportValidity();
    } else if (entrada.length < $name.minLength) {
        $name.setCustomValidity(`El nombre del producto debe tener al menos ${$name.minLength} caracteres`);
        $name.reportValidity();
    } else if (entrada.length > $name.maxLength) {
        $name.setCustomValidity(`El nombre del producto no puede tener mas de ${$name.maxLength} caracteres`);
        $name.reportValidity();
    }
}

$name.addEventListener('input', validarNombre)

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
