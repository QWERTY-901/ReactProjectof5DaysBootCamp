import apiClient from '../lib/apiClient';

export const fetchDashboardData = () => {
    // This returns the promise to be "unwrapped" by the use() hook
    return apiClient.get('/user-mgmt/user/dashboard')
        .then(res => {
            if (res.data.status !== "SUCCESS") {
                throw new Error(res.data.statusDesc || "Failed to load dashboard data");
            }
            return res.data; // This is the decrypted dashboard JSON
        });
};