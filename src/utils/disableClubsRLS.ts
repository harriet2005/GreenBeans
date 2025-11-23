import { supabase } from "@/integrations/supabase/client";

export const disableClubsRLS = async () => {
  try {
    // This will only work if you have the right permissions
    const { error } = await supabase.rpc('disable_clubs_rls');
    
    if (error) {
      console.error('Could not disable RLS:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
};