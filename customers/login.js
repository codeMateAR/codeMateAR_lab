document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessageDiv = document.getElementById('error-message');

    errorMessageDiv.style.display = 'none'; // Ocultar mensaje de error previo

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();

        if (response.ok && result.success) {
            // Si el login es exitoso, redirigir al dashboard o a la página de facturación
            window.location.href = '/customers/dashboard.html';
        } else {
            // Mostrar mensaje de error
            errorMessageDiv.textContent = result.message || 'Error al iniciar sesión.';
            errorMessageDiv.style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
        errorMessageDiv.textContent = 'No se pudo conectar con el servidor. Inténtalo más tarde.';
        errorMessageDiv.style.display = 'block';
    }
});