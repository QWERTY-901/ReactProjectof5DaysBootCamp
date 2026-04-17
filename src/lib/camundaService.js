import apiClient from './apiClient';

const CAMUNDA_BASE = "https://apidev-sdk.iserveu.online/NSDLAB/camunda";

export const CamundaService = {
    // 1. Start the report generation process
    startReportProcess: async (reportType, startDate, endDate) => {
        const username = localStorage.getItem('username');

        const payload = {
            applicationSource: "web",
            bpmnId: "NSDL_Report_Query_V1",
            processVariables: {
                reportQueryRequest: {
                    start_date: startDate, // Format: DD/MM/YYYY
                    end_date: endDate,
                    user_name: username,
                    report_name: reportType // e.g., "Wallet", "Cashout", "Onboarding"
                }
            }
        };

        const response = await apiClient.post(`${CAMUNDA_BASE}/startProcessInstance`, payload);
        return response.data; // Returns processInstanceKey
    },

    // 2. Poll for the status of the report
    checkReportStatus: async (processInstanceKey) => {
        const payload = {
            processSearchQuery: {
                filter: {
                    processInstanceKey: { "$eq": processInstanceKey }
                }
            }
        };

        const response = await apiClient.post(`${CAMUNDA_BASE}/searchProcessInstances`, payload);
        return response.data; // Check for state: "COMPLETED" or processVariables.reportStatus
    }
};