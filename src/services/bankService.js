
export const bankService = {
    // Generate Bank Transfer File (Mock)
    // in real app, this would fetch payroll data and format it as CSV/Excel specific to the bank
    generateBankFile: async (batchId, bankName) => {
        console.log(`Generating ${bankName} file for batch ${batchId}...`);

        // Mock Data
        const headers = "Employee Code,Account Number,Amount,IFSC,Name\n";
        const rows = [
            "EMP001,1234567890,50000,HDFC0001234,John Doe",
            "EMP002,0987654321,45000,ICIC0005678,Jane Smith",
            "EMP003,1122334455,52000,SBIN0009988,Bob Wilson"
        ];

        const csvContent = headers + rows.join("\n");

        // Create Blob
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        // Return download URL and filename
        return {
            url,
            filename: `Salary_Payout_${bankName}_${new Date().toISOString().split('T')[0]}.csv`
        };
    }
};
