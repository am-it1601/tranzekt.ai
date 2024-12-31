export const fetchAccounts = async () => {
    const response = await fetch('/api/accounts'); // Replace with your API endpoint
    const data = await response.json();
    return data;
};
