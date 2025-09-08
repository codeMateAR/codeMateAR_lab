document.addEventListener('DOMContentLoaded', () => {
    console.log('Portal script loaded successfully!');

    // Lógica para el botón de cerrar sesión
    const logoutButton = document.querySelector('a[href="/customers/login.html"]');
    
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevenir la navegación inmediata
            
            // En un futuro, aquí limpiarías tokens o sesiones del cliente
            console.log('Cerrando sesión...');
            
            // Redirigir al login
            window.location.href = '/customers/login.html';
        });
    }

    // Aquí puedes añadir más lógica para el portal, como:
    // - Cargar datos del usuario de forma dinámica.
    // - Manejar los botones de "Pagar" o "Descargar".
});