const $form = document.getElementById('create-product-form');

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
