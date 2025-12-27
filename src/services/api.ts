// Base API URL
const API_BASE_URL = 'http://localhost:3001'

// Custom fetch function that includes Keycloak token
const authFetch = async (keycloak: any, url: string, options: RequestInit = {}): Promise<Response> => {
    // Get the current Keycloak token
    const token = keycloak?.token

    // Add authorization header if token exists
    const headers = {
        ...options.headers,
        ...(token && { 'Authorization': `Bearer ${token}` })
    }

    // Make the request with authentication
    const response = await fetch(url, {
        ...options,
        headers
    })

    // Check for unauthorized responses
    if (response.status === 401) {
        // Token might be expired, try to refresh
        if (keycloak) {
            try {
                await keycloak.updateToken(30) // Try to refresh token if it expires in 30 seconds
                // Retry with new token
                const newToken = keycloak.token
                const retryHeaders = {
                    ...options.headers,
                    ...(newToken && { 'Authorization': `Bearer ${newToken}` })
                }
                return await fetch(url, {
                    ...options,
                    headers: retryHeaders
                })
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError)
                throw new Error('Session expired. Please login again.')
            }
        }
    }

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response
}

export const fetchUsers = async (keycloak: any): Promise<any[]> => {
    try {
        const response = await authFetch(keycloak, `${API_BASE_URL}/users`)
        return await response.json()
    } catch (error) {
        console.error('Failed to fetch users:', error)
        throw error
    }
}

export const fetchUserById = async (keycloak: any, id: string): Promise<any> => {
    try {
        const response = await authFetch(keycloak, `${API_BASE_URL}/users/${id}`)
        return await response.json()
    } catch (error) {
        console.error(`Failed to fetch user ${id}:`, error)
        throw error
    }
}

export const createUser = async (keycloak: any, userData: any): Promise<any> => {
    try {
        const response = await authFetch(keycloak, `${API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        return await response.json()
    } catch (error) {
        console.error('Failed to create user:', error)
        throw error
    }
}

export const updateUser = async (keycloak: any, id: string, userData: any): Promise<any> => {
    try {
        const response = await authFetch(keycloak, `${API_BASE_URL}/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        return await response.json()
    } catch (error) {
        console.error(`Failed to update user ${id}:`, error)
        throw error
    }
}

export const deleteUser = async (keycloak: any, id: string): Promise<void> => {
    try {
        await authFetch(keycloak, `${API_BASE_URL}/users/${id}`, {
            method: 'DELETE'
        })
    } catch (error) {
        console.error(`Failed to delete user ${id}:`, error)
        throw error
    }
}