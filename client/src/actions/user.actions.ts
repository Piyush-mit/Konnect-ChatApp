import { api } from "@/api";
interface UserSignup {
    fullname: string,
    username: string,
    password: string,
    gender: string
}
interface UserResponse {
    fullname: string,
    userId: string,
    username: string,
    profilePicture: string,
    message: string
}

interface UserSignin {
    usernameInput: string,
    passwordInput: string
}


export const createUser = async (user: UserSignup): Promise<UserResponse> => {
    try {
        const response = await api.post("/user/signup", user);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message || "Signup failed");
    }
}

export const loginUser = async (user: UserSignin): Promise<UserResponse> => {
    try {
        const { usernameInput: username, passwordInput: password } = user;
        const response = await api.post("/user/signin", { username, password });
        return response.data ;
    } catch (error: any) {
        throw new Error(error.response.data.message || "Signin failed");
    }
}

export const logout = async () => {
    try {
        const response = await api.post("/user/logout");
        if (response.status == 200) return response.data;
        throw new Error(response.data.message);
    } catch (error: any) {
        throw new Error(error.message || "Logout failed")
    }
}


