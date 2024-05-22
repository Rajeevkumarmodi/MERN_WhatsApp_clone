const baseUrl = "http://localhost:8990/api/v1/user";

export async function registerFun(data) {
  try {
    const res = await fetch(`${baseUrl}/register`, {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return error;
  }
}

// login using email and password

export async function loginWithEmailAndPassword(data) {
  try {
    const res = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    console.log("result", res);
    return result;
  } catch (error) {
    return error;
  }
}
