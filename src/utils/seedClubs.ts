import { supabase } from "@/integrations/supabase/client";

const initialClubs = [
  {
    name: 'Tree Planters United',
    description: 'Join us in planting trees across our community to combat climate change and create greener spaces.',
    member_count: 0,
    icon: '🌳',
  },
  {
    name: 'Ocean Warriors',
    description: 'Protecting marine life through beach cleanups and awareness campaigns about ocean pollution.',
    member_count: 0,
    icon: '🌊',
  },
  {
    name: 'Recycling Champions',
    description: 'Making recycling accessible and fun while educating others about waste reduction.',
    member_count: 0,
    icon: '♻️',
  },
  {
    name: 'Solar Youth',
    description: 'Advocating for renewable energy solutions and teaching about sustainable power sources.',
    member_count: 0,
    icon: '☀️',
  },
  {
    name: 'Garden Growers',
    description: 'Creating community gardens and promoting urban farming for sustainable food production.',
    member_count: 0,
    icon: '🌱',
  },
  {
    name: 'Wildlife Watchers',
    description: 'Monitoring local wildlife and creating habitats to support biodiversity in our area.',
    member_count: 0,
    icon: '🦅',
  },
];

export const seedClubs = async () => {
  try {
    // Check if clubs already exist
    const { data: existingClubs, error: checkError } = await supabase
      .from('clubs')
      .select('id')
      .limit(1);

    if (checkError) {
      console.error('Error checking clubs:', checkError);
      return false;
    }

    // If clubs already exist, don't seed again
    if (existingClubs && existingClubs.length > 0) {
      console.log('Clubs already seeded');
      return true;
    }

    // Insert clubs
    const { error: insertError } = await supabase
      .from('clubs')
      .insert(initialClubs);

    if (insertError) {
      console.error('Error seeding clubs:', insertError);
      return false;
    }

    console.log('Clubs seeded successfully!');
    return true;
  } catch (error) {
    console.error('Error in seedClubs:', error);
    return false;
  }
};