const getMenuFrontEnd = (role = 'USER_ROLE') => {

    const menu = [{
            titulo: 'Dashboard',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Main', url: '/' },
                { titulo: 'Gráficas', url: 'grafica1' },
                { titulo: 'ProgressBar', url: 'progress' },
            ]
        },

        {
            titulo: 'Mantenimientos',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                // { titulo: 'Usuarios', url: 'usuarios' },
                { titulo: 'Cursos', url: 'cursos' },
                { titulo: 'Profesores', url: 'profesores' },
            ]
        },
    ];

    if (role === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios' })
    }

    return menu;
}

module.exports = {
    getMenuFrontEnd
}