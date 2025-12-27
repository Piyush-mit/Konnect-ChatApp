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
        if (response.status === 201) return response.data;
        else throw new Error(response.data.message);
    } catch (error: any) {
        throw new Error(error.message || "Signup failed");
    }
}

export const loginUser = async (user: UserSignin): Promise<UserResponse> => {
    try {
        const response = await api.post("/user/signin", user);
        if (response.status === 200) return response.data;
        else throw new Error(response.data.message);
        
    } catch (error: any) {
        throw new Error(error.message || "Signin failed");
    }
}

