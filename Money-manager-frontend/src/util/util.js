export const addThousandsSeparator = (num) => {
    if (num == null || isNaN(num)) return "";

    // Convert number to string to handle decimals
    const numStr = num.toString();
    const parts = numStr.split('.'); // Split into integer and fractional parts

    let integerPart = parts[0];
    let fractionalPart = parts[1];

    // Regex for Indian numbering system
    // It handles the first three digits, then every two digits
    const lastThree = integerPart.substring(integerPart.length - 3);
    const otherNumbers = integerPart.substring(0, integerPart.length - 3);

    if (otherNumbers !== '') {
        // Apply comma after every two digits for the 'otherNumbers' part
        const formatedOtherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
        integerPart = formatedOtherNumbers + "," + lastThree;
    } else {
        integerPart = lastThree; // No change if less than 4 digits
    }

    // Combine integer and fractional parts
    return fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;
}

// Groups transactions by date and prepares data for the line chart
export const prepareIncomeLineChartData = (transactions) => {
    if (!Array.isArray(transactions)) return [];
    // Group by date
    const grouped = {};
    transactions.forEach(tx => {
        const date = tx.date;
        if (!grouped[date]) {
            grouped[date] = {
                date,
                totalAmount: 0,
                items: [],
            };
        }
        grouped[date].totalAmount += Number(tx.amount || 0);
        grouped[date].items.push(tx);
    });
    // Convert to array and add month field (e.g., '12th Jul 2025')
    return Object.values(grouped).map(obj => {
        const d = new Date(obj.date);
        const day = d.getDate();
        const month = d.toLocaleString('default', { month: 'short' });
        const year = d.getFullYear();
        // Add ordinal suffix to day
        const getOrdinal = n => n + (['st', 'nd', 'rd'][((n + 90) % 100 - 10) % 10 - 1] || 'th');
        obj.month = `${getOrdinal(day)} ${month} ${year}`;
        return obj;
    });
}

// Groups expense transactions by date and prepares data for the line chart
export const prepareExpenseLineChartData = (transactions) => {
    if (!Array.isArray(transactions)) return [];
    const grouped = {};
    transactions.forEach(tx => {
        const date = tx.date;
        if (!grouped[date]) {
            grouped[date] = {
                date,
                totalAmount: 0,
                items: [],
            };
        }
        grouped[date].totalAmount += Number(tx.amount || 0);
        grouped[date].items.push(tx);
    });
    return Object.values(grouped).map(obj => {
        const d = new Date(obj.date);
        const day = d.getDate();
        const month = d.toLocaleString('default', { month: 'short' });
        const year = d.getFullYear();
        const getOrdinal = n => n + (['st', 'nd', 'rd'][((n + 90) % 100 - 10) % 10 - 1] || 'th');
        obj.month = `${getOrdinal(day)} ${month} ${year}`;
        return obj;
    });
}