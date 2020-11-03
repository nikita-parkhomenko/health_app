export const publicPage = {
    path: '/public',
    link: () => `/public`
}

export const privatPage = {
    path: '/private',
    link: () => `/private`
}

export const logIn = {
    path: '/log-in',
    link: () => `/log-in`,
}

export const users = {
    path: '/users',
    link: () => '/users',
}

export const createUser = {
    path: '/create-user/:id',
    link: (id = 'new') => `/create-user/${id}`,
}
