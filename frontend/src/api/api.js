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

// google login

export async function googleLogin(data) {
  try {
    const res = await fetch(`${baseUrl}/google/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return error;
  }
}

// all users

export async function getAllUsers() {
  const token = JSON.parse(localStorage.getItem("whatsApp_token"));
  try {
    const res = await fetch(`${baseUrl}/allusers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return error;
  }
}

// create conversation

export async function createConversationApi(id) {
  const token = JSON.parse(localStorage.getItem("whatsApp_token"));
  try {
    const res = await fetch(`${baseUrl}/conversation/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ receiverId: id }),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return error;
  }
}

// send message

export async function sendMessageApi(data) {
  const token = JSON.parse(localStorage.getItem("whatsApp_token"));
  try {
    const res = await fetch(`${baseUrl}/newmessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return error;
  }
}

// get all messages

export async function getAllMessages(id) {
  const token = JSON.parse(localStorage.getItem("whatsApp_token"));
  try {
    const res = await fetch(`${baseUrl}/message/all/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return error;
  }
}

export async function sendFileApi(data) {
  const token = JSON.parse(localStorage.getItem("whatsApp_token"));
  try {
    const res = await fetch(`${baseUrl}/message/sendfile`, {
      method: "POST",
      headers: {
        // "Content-Type": "/json",
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return error;
  }
}
