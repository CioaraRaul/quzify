import { supabase } from "@/lib/supabaseClient";

export const fetchUsers = async () => {
  try {
    const { data, error } = await supabase.from("users").select("*");

    if (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }

    if (data) {
      return data;
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export const createUserProfile = async ({
  user,
  password,
}: {
  user: string;
  password: string;
}) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .insert([{ username: user, password: password }]);

    if (error) {
      throw new Error(`Error creating user profile : ${error?.message}`);
    }
    return data;
  } catch (err: any) {
    throw new Error(err?.message || "Unknown error");
  }
};

export const getUserPassword = async (
  username: string
): Promise<string | undefined> => {
  const { data, error } = await supabase
    .from("users")
    .select("password")
    .eq("username", username) // filter directly in Supabase
    .single(); // expect only one user

  if (error) {
    throw new Error(error.message);
  }

  return data?.password;
};

export const getDataByUsername = async (username: string) => {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .single();

  return data;
};

export const changePassword = async (
  username: string,
  new_password: string
) => {
  const { data, error } = await supabase
    .from("users")
    .update({ password: new_password })
    .eq("username", username);

  if (error) {
    console.error("Error updating password:", error.message);
    return false;
  }

  console.log("Password updated for user:", username);
  return true;
};

export const addQuizHistory = async (
  username: string,
  quizTitle: string,
  score: number,
  created_at: string
) => {
  const { data, error } = await supabase
    .from("quiz_history")
    .insert([{ username, quizTitle, score, created_at }]);

  if (error) {
    throw new Error(error?.message);
  }

  return data;
};

export const getQuizByUsername = async (username: string) => {
  const { data } = await supabase
    .from("quiz_history")
    .select("*")
    .eq("username", username);
  return data;
};

export const deleteQuiz = async (id: string) => {
  const { data, error } = await supabase
    .from("quiz_history")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Failed to delete quiz:", error.message);
    throw error;
  }

  return data;
};
