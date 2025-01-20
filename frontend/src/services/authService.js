// services/authService.js

export const signup = async (name, email, password) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  try {
    const response = await fetch(`${backendUrl}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      const result = await response.json();
      return { success: true, userId: result.user._id };
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "An error occurred");
    }
  } catch (err) {
    throw new Error(err.message || "An error occurred during signup");
  }
};

export const signin = async (email, password) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  try {
    const response = await fetch(`${backendUrl}/api/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result, "result", result.token, "result.token");
      return { success: true, token: result.token, user: result.user };
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "An error occurred");
    }
  } catch (err) {
    throw new Error(err.message || "An error occurred during signin");
  }
};

// Add logout function
export const logout = async () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  try {
    // Send a request to the backend to clear the JWT cookie
    const response = await fetch(`${backendUrl}/api/logout`, {
      method: "POST",
      credentials: "include", // Ensure cookies are sent
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    return { success: true };
  } catch (error) {
    throw new Error(error.message || "An error occurred during logout");
  }
};
