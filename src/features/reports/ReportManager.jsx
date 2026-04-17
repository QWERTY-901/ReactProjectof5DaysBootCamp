import React, { useState } from 'react';
import { CamundaService } from '../../lib/camundaService';

const ReportManager = () => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);

    const handleGenerateReport = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus("Initiating Request...");

        try {
            const formData = new FormData(e.target);
            const res = await CamundaService.startReportProcess(
                formData.get('reportType'),
                formData.get('startDate'),
                formData.get('endDate')
            );

            if (res.status === "SUCCESS") {
                const key = res.processInstanceKey;
                // Start Polling (simplified example)
                pollStatus(key);
            }
        } catch (err) {
            setStatus("Error starting process");
            setLoading(false);
        }
    };

    const pollStatus = async (key) => {
        const check = setInterval(async () => {
            setStatus("Processing by Bank Servers...");
            const result = await CamundaService.checkReportStatus(key);

            // If the report is ready (Based on Camunda state logic)
            if (result.processInstances?.[0]?.state === "COMPLETED") {
                setStatus("Report Ready for Download!");
                setLoading(false);
                clearInterval(check);
            }
        }, 3000); // Check every 3 seconds
    };

    return (
        <div style={reportCard}>
            <h3>Generate Financial Report</h3>
            <form onSubmit={handleGenerateReport} style={formStyle}>
                <select name="reportType" style={inputStyle}>
                    <option value="Onboarding">Onboarding Report</option>
                    <option value="Wallet">Wallet Transaction Report</option>
                    <option value="Cashout">Cashout Report</option>
                </select>
                <input name="startDate" placeholder="Start Date (DD/MM/YYYY)" style={inputStyle} />
                <input name="endDate" placeholder="End Date (DD/MM/YYYY)" style={inputStyle} />
                <button type="submit" disabled={loading} style={btnStyle}>
                    {loading ? status : "Generate Report"}
                </button>
            </form>
        </div>
    );
};

// Styles
const reportCard = { background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px' };
const inputStyle = { padding: '10px', borderRadius: '6px', border: '1px solid #ddd' };
const btnStyle = { padding: '12px', background: '#1a365d', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' };

export default ReportManager;