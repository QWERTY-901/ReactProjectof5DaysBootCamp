import apiClient from '../lib/apiClient';

export async function loginAction(prevState, formData) {
    const username = formData.get('username');
    const password = formData.get('password');

    // 1. Generate Basic Auth Token: btoa("username:password")
    const basicAuthToken = btoa(`${username}:${password}`);

    // 2. Prepare Payload as per NSDL Documentation
    const payload = {
        grant_type: "password",
        username: username,
        password: password
    };

    try {
        // 3. Send Request
        // Note: Our apiClient interceptor will automatically encrypt 'payload' 
        // and put it inside { "RequestData": "..." }
        const response = await apiClient.post(
            '/user-authorization/user/login',
            payload,
            {
                headers: {
                    'Authorization': `Basic ${basicAuthToken}`,
                    'Geo-Location': btoa("0,0") // Default for staging if not using GPS
                }
            }
        );

        // 4. Extract decrypted data (already handled by our interceptor)
        const data = response.data;

        if (data.status === "SUCCESS") {
            // Store session details
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', username.includes('checker') ? 'checker' : 'maker');
            localStorage.setItem('username', username);

            return { success: true };
        } else {
            return { success: false, error: data.statusDesc || "Authentication Failed" };
        }
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.statusDesc || "Connection Error to NSDL Servers"
        };
    }
}