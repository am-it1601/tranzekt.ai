"use server"
import fs from 'fs';
import path from 'path';
import axios from 'axios';

// Path to data file
const filePath = path.join(process.cwd(), 'src/data/data.json');

// Read data from JSON file
const readData = () => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
};

// Write data to JSON file
const writeData = (data: any) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Fetch all accounts
export const getAccounts = async () => {
    try {

        const data =  readData();
        
        return data;
    } catch (error) {
        console.error('Failed to fetch accounts:', error);
        throw new Error('Failed to fetch accounts');
    }
};

// Fetch a single account by ID
export async function getAccountById(id: string | number) {
    const accounts = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id; // Convert if needed
    return accounts.find((acc: any) => acc.id === numericId);
}

export const fetchAccounts = async () => {
    const response = await fetch('/api/accounts'); // Replace with your API endpoint
    const data = await response.json();
    return data;
};



// export const getAccountById = async (id: number) => {
//     try {
//         const data = readData();
//         return data.find((account: any) => account.id === id);
//     } catch (error) {
//         console.error('Failed to fetch account:', error);
//         throw new Error('Failed to fetch account');
//     }
// };

// Add a new account
export const addAccount = async (account: any) => {
    try {
        const data = readData();
        const newAccount = { id: Date.now(), ...account };
        data.push(newAccount);
        writeData(data);
        return newAccount;
    } catch (error) {
        console.error('Failed to add account:', error);
        throw new Error('Failed to add account');
    }
};

// export async function createAccount(type:string, data:any) {
//     try {
//       const response = await fetch('http://192.168.1.26:3000/api/account', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           type: type,
//           data: data,
//         }),
//       });
  
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
  
//       const result = await response.json();
//       return result;
//     } catch (error) {
//       console.error('Error creating account:', error);
//       throw error;
//     }
//   }


export async function createAccount(type: string, data: any) {
    try {
        // Perform the POST request using axios
        const response = await axios.post(
            'http://192.168.1.26:3000/api/account',
            {
                type: type,
                data: data,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        // Log success response for debugging
        console.log('Account created successfully:', response.data);

        // Return the response data
        return response.data;
    } catch (error: any) { // Catch and handle errors
        if (error.response) {
            // Server responded with a status code other than 2xx
            console.error('Error response:', error.response.data);
            console.error('Status code:', error.response.status);
            console.error('Headers:', error.response.headers);
        } else if (error.request) {
            // Request was made but no response received
            console.error('No response received:', error.request);
        } else {
            // Something else happened during setup
            console.error('Error setting up request:', error.message);
        }

        throw error; // Re-throw the error for further handling
    }
}

  

  // export async function getAllAccounts() {
  //   try {
  //     const response = await fetch('http://192.168.1.26:3000/api/account', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
    
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  
  //     const result = await response.json();
  //     return result;
  //   } catch (error) {
  //     console.error('Error creating account:', error);
  //     throw error;
  //   }
  // }



export async function getAllAccounts() {
    try {
        // Perform the GET request using axios
        const response = await axios.get('http://192.168.1.26:3000/api/account', {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Log success response for debugging
        console.log('Accounts retrieved successfully:', response.data);

        // Return the response data
        return response.data;
    } catch (error: any) { // Catch errors, including network errors
        if (error.response) {
            // Server responded with a status code other than 2xx
            console.error('Error response:', error.response.data);
            console.error('Status code:', error.response.status);
            console.error('Headers:', error.response.headers);
        } else if (error.request) {
            // Request was made but no response received
            console.error('No response received:', error.request);
        } else {
            // Something else happened during setup
            console.error('Error setting up request:', error.message);
        }

        throw error; // Re-throw error to handle it upstream
    }
}

  
//   export async function updateAccount(id: string, data: any) {
//     try {
//         const response = await fetch(`http://192.168.1.26:3000/api/account/${id}`, {  // Make sure this URL is correct
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 data: data,
//             }),
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const result = await response.json();
//         return result;
//     } catch (error) {
//         console.error('Error updating account:', error);
//         throw error;
//     }
// }


export async function updateAccount(id: string, data: any) {
    try {
        // Log request details for debugging
        console.log('Sending data for account update:', data);

        // Perform the PUT request using axios
        const response = await axios.put(`http://192.168.1.26:3000/api/account/${id}`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Log success response
        console.log('Account updated successfully:', response.data);

        // Return the response data
        return response.data;
    } catch (error: any) { // Catch errors, including network errors
        if (error.response) {
            // Server responded with a status code other than 2xx
            console.error('Error response:', error.response.data);
            console.error('Status code:', error.response.status);
            console.error('Headers:', error.response.headers);
        } else if (error.request) {
            // Request was made but no response received
            console.error('No response received:', error.request);
        } else {
            // Something else happened during setup
            console.error('Error setting up request:', error.message);
        }

        throw error; // Re-throw error to handle it upstream
    }
}



// export async function getAccount(id: string) {
//     try {
//         console.log('Fetching account data for ID:', id); // Log ID to verify input

//         const response = await fetch(`http://192.168.1.26:3000/api/account/${id}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         console.log('HTTP Status:', response.status); // Log status

//         if (!response.ok) {
//             const errorText = await response.text(); // Capture the error body
//             console.error(`Error response body: ${errorText}`); // Print the body
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const result = await response.json();
//         console.log('Fetched account data:', result); // Log data
//         return result;
//     } catch (error: any) {
//         console.error('Error fetching account:', error.message); // Print error
//         throw error;
//     }
// }


export async function getAccount(id: string) {
    try {
        console.log('Fetching account data for ID:', id); // Log ID to verify input

        // Perform the GET request using Axios
        const response = await axios.get(`http://192.168.1.26:3000/api/account/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('HTTP Status:', response.status); // Log status
        console.log('Fetched account data:', response.data); // Log data

        // Return the response data
        return response.data;
    } catch (error: any) { // Catch and handle errors
        if (error.response) {
            // Server responded with a status code other than 2xx
            console.error('Error response body:', error.response.data); // Log response data
            console.error('Status code:', error.response.status); // Log status code
            console.error('Headers:', error.response.headers); // Log headers
        } else if (error.request) {
            // Request was made but no response received
            console.error('No response received:', error.request);
        } else {
            // Something else happened during setup
            console.error('Error setting up request:', error.message);
        }

        throw error; // Re-throw the error for further handling
    }
}

