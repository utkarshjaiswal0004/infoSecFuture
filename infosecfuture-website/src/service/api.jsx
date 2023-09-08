
//base URL for calling API

const BASE_URL = "https://react-backend-infosecfuture.onrender.com/user"; 


// handling the user registration
export async function registerUserWithEmail( data) {
  try {
    const response = await fetch(`${BASE_URL}/registerUserWithEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      //  non-2xx HTTP responses 
      throw new Error(`Request failed with status ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    // network errors and exceptions 
    console.error("API Error:", error);
    throw error;
  }
}



// handling the user login
export async function loginWithEmail(data) {
  try {
    const response = await fetch(`${BASE_URL}/loginWithEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const responseData = await response.json();
 
    if (responseData.success) {
      // const userData = response.userData;
      const tokenData = response.tokenData;

      localStorage.setItem('token', JSON.stringify(tokenData));

      console.log(responseData);
      return responseData;
    } else {
      console.error('Login failed:', response.message);
      return;
    }
    
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
}
