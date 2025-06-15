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
