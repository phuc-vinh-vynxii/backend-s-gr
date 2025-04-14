const deleteForm = document.querySelector('#delete-form');
const deleteButtons = document.querySelectorAll('.btn-delete');

deleteButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const id = button.getAttribute('data-id');
        const path = deleteForm.getAttribute('data-path') + `${id}?_method=DELETE`;
        deleteForm.setAttribute('action', path);
        deleteForm.submit();
    });
});
