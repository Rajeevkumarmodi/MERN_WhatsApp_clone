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
