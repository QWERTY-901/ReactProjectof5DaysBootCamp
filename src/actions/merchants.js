import apiClient from '../lib/apiClient';

export const fetchMerchants = () => {
    const role = localStorage.getItem('role');

    // Endpoint #1 for Checker, Endpoint #8 for Maker from the doc
    const endpoint = role === 'checker'
        ? '/user-mgmt/user/FetchUserList'
        : '/user-mgmt/user/FetchUserListMaker';

    return apiClient.post(endpoint, {
        // Standard pagination/filter payload for NSDL
        pageNumber: 0,
        pageSize: 10,
        searchFilter: []
    }).then(res => {
        if (res.data.status !== "SUCCESS") {
            throw new Error(res.data.statusDesc || "Failed to fetch merchants");
        }
        return res.data.userList || [];
    });
};