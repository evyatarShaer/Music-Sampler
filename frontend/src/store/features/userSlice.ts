import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

interface UserState {
  currentUser: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
const initialState: UserState = {
  currentUser: null,
  status: "idle",
  error: null,
};

export const addUser = createAsyncThunk(
  "users/addUser",
  async (user: Partial<User>) => {
    const response = await axios.post(`${BASE_URL}/app/register`, user);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (user: Partial<User>) => {
    const response = await axios.post(`${BASE_URL}/app/login`, user);

    if (response.data) {
      const token: string = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem(
        "currentUser",
        JSON.stringify(response.data.userExist)
      );
      return response.data.userExist;
    }
    return;
  }
);

export const editUser = createAsyncThunk("users/editUser", async (user: Partial<User>) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${BASE_URL}/app/edit/${user._id}`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data) {
      console.log(response.data);
      
      console.log("user updated");
      return true;
    }
    return false;
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    clearUser: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
