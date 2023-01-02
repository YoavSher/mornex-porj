import axios, { AxiosError } from 'axios'

const BASE_URL = 'https://45-32-136-124.sslip.io/api/'

//access_token: 
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzI2NTA0NTAsImV4cCI6MTY3MjY1MDc1MCwianRpIjoiMzUyYWM5OGQtM2U1Ni00YjA2LWI5N2EtYzQwNmUyZjc4NTg3IiwiaWQiOjEsInJscyI6IkFkbWluIiwicmZfZXhwIjoxNjcyNzM2ODUwfQ.ECOl5dcANvmlKJmgOrqwBV9_i1-g0DlPYR_M-5y-UBg"



export const httpService = {
    get(endpoint: string, data: any, token: string | null) {
        return ajax(endpoint, 'GET', data, token)
    },
    post(endpoint: string, data: any, token: string | null) {
        // console.log('token:', token)
        return ajax(endpoint, 'POST', data, token)
    },
    put(endpoint: string, data: any, token: string | null) {
        return ajax(endpoint, 'PUT', data, token)
    },
    patch(endpoint: string, data: any, token: string | null) {
        console.log('patcvhing');

        return ajax(endpoint, 'PATCH', data, token)
    },
    delete(endpoint: string, data: any, token: string | null) {
        return ajax(endpoint, 'DELETE', data, token)
    }
}

async function ajax(endpoint: string, method = 'GET', data = null, token: string | null) {
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
            params: (method === 'GET') ? data : null,
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token ? token : 'undefined'}` }
        })
        return res.data
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `)
        console.log('err:', err)
        console.dir(err)
        if (err instanceof AxiosError) {
            throw err
        }
    }
}