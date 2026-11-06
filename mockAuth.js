// mockAuth.js
// Client-side simulation of Firebase Authentication using localStorage

export const auth = {
    get currentUser() {
        const loggedIn = localStorage.getItem("loggedIn") === "true";
        if (!loggedIn) return null;
        return {
            email: localStorage.getItem("userEmail") || "guest@email.com",
            displayName: localStorage.getItem("userName") || "Guest"
        };
    }
};

export async function signInWithEmailAndPassword(authInstance, email, password) {
    // Artificial latency for realism
    await new Promise(resolve => setTimeout(resolve, 500));

    const users = JSON.parse(localStorage.getItem("mock_users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        throw new Error("Invalid email or password. (Mock Auth Error: User not found or password incorrect)");
    }

    // Set session flags
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userEmail", user.email);
    localStorage.setItem("userName", user.name || email.split("@")[0]);
    
    // Store additional profile info if available
    if (user.phone) localStorage.setItem("userPhone", user.phone);
    if (user.address) localStorage.setItem("userAddress", user.address);
    if (user.city) localStorage.setItem("userCity", user.city);
    if (user.pincode) localStorage.setItem("userPincode", user.pincode);

    return {
        user: {
            email: user.email,
            displayName: user.name
        }
    };
}

export async function createUserWithEmailAndPassword(authInstance, email, password) {
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!email || !password) {
        throw new Error("Email and password are required.");
    }

    const users = JSON.parse(localStorage.getItem("mock_users")) || [];
    const userExists = users.some(u => u.email === email);

    if (userExists) {
        throw new Error("An account with this email already exists. (Mock Auth Error)");
    }

    const newUser = {
        email: email,
        password: password,
        name: email.split("@")[0],
        phone: "",
        address: "",
        city: "",
        pincode: ""
    };

    users.push(newUser);
    localStorage.setItem("mock_users", JSON.stringify(users));

    return {
        user: {
            email: newUser.email,
            displayName: newUser.name
        }
    };
}
