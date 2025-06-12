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
