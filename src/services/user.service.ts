import { httpService } from "./http.service"

export const userService = {
    authenticateUser,
    getUsers,
    getUserById,
    refreshToken,
    createUser,
    updateUser,
    deleteUser
}

async function getUserById() {
    // console.log('cred:', cred)
    try {
        await httpService.get
    } catch (err) {
        throw err
    }
}

interface Cred {
    id?:number
    username: string,
    password: string,
    email?: string,
    role?: string
}
async function authenticateUser(cred: Cred) {

    try {
        const token = await httpService.post('auth/login', cred, null)
        console.log('token:', token)
        return token
    } catch (err) {
        throw err
    }
}

async function getUsers(token: string) {
    try {
        console.log('token:', token)
        const users = await httpService.get('users', null, token)
        return users
    } catch (err) {
        throw err
    }
}

async function refreshToken(token: string) {
    // console.log('refrsh');

    try {
        // console.log('token:', token)
        const newToken = await httpService.get('auth/refresh', null, token)
        console.log('newToken:', newToken)
        return newToken
    } catch (err) {
        throw err
    }
}

async function createUser(cred: Cred, token: string) {
    try {
        console.log('token:', token)
        const newUser = await httpService.post('users', cred, token)
        console.log('newUser:', newUser)
        return newUser
    } catch (err) {
        throw err
    }
}

async function updateUser(userId: number, cred: Cred, token: string) {
    try {
        const updatedUser = await httpService.patch(`users/${userId}`, cred, token)
        return updatedUser
    } catch (err) {
        throw err
    }
}

async function deleteUser(userId: number, token: string) {
    try {
        const updatedUser = await httpService.delete(`users/${userId}`, null, token)
        return updatedUser
    } catch (err) {
        throw err
    }
}