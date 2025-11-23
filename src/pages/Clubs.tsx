import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Users } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { CreateClubDialog } from "@/components/CreateClubDialog";

interface Club {
  id: string;
  name: string;
  description: string;
  member_count: number;
  icon: string;
}

// Default clubs for MVP
const DEFAULT_CLUBS: Club[] = [
  {
    id: '1',
    name: 'Tree Planters United',
    description: 'Join us in planting trees across our community to combat climate change and create greener spaces.',
    member_count: 45,
    icon: '🌳',
  },
  {
    id: '2',
    name: 'Ocean Warriors',
    description: 'Protecting marine life through beach cleanups and awareness campaigns about ocean pollution.',
    member_count: 32,
    icon: '🌊',
  },
  {
    id: '3',
    name: 'Recycling Champions',
    description: 'Making recycling accessible and fun while educating others about waste reduction.',
    member_count: 56,
    icon: '♻️',
  },
  {
    id: '4',
    name: 'Solar Youth',
    description: 'Advocating for renewable energy solutions and teaching about sustainable power sources.',
    member_count: 28,
    icon: '☀️',
  },
  {
    id: '5',
    name: 'Garden Growers',
    description: 'Creating community gardens and promoting urban farming for sustainable food production.',
    member_count: 41,
    icon: '🌱',
  },
  {
    id: '6',
    name: 'Wildlife Watchers',
    description: 'Monitoring local wildlife and creating habitats to support biodiversity in our area.',
    member_count: 23,
    icon: '🦅',
  },
];

export default function Clubs() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [clubs, setClubs] = useState<Club[]>([]);
  const [joinedClubIds, setJoinedClubIds] = useState<string[]>([]);

  useEffect(() => {
    loadClubs();
  }, []);

  useEffect(() => {
    if (user) {
      loadJoinedClubs();
    }
  }, [user]);

  const loadClubs = () => {
    // Load custom clubs from localStorage
    const customClubsJson = localStorage.getItem('custom_clubs');
    const customClubs = customClubsJson ? JSON.parse(customClubsJson) : [];
    
    // Combine default clubs with custom clubs
    setClubs([...DEFAULT_CLUBS, ...customClubs]);
  };

  const loadJoinedClubs = () => {
    if (!user) return;
    
    const stored = localStorage.getItem(`joined_clubs_${user.id}`);
    if (stored) {
      setJoinedClubIds(JSON.parse(stored));
    }
  };

  const handleClubCreated = (newClub: Club) => {
    // Add new club to the list
    setClubs([...clubs, newClub]);
    
    // Automatically join the creator to the club
    if (user) {
      const newJoinedClubs = [...joinedClubIds, newClub.id];
      setJoinedClubIds(newJoinedClubs);
      localStorage.setItem(`joined_clubs_${user.id}`, JSON.stringify(newJoinedClubs));
    }
  };

  const handleJoinClub = (clubId: string, clubName: string) => {
    if (!user) {
      toast.error("Please log in to join clubs");
      return;
    }

    const newJoinedClubs = [...joinedClubIds, clubId];
    setJoinedClubIds(newJoinedClubs);
    
    // Update member count
    setClubs(clubs.map(c => 
      c.id === clubId ? { ...c, member_count: c.member_count + 1 } : c
    ));

    // Update localStorage for custom clubs
    const customClubsJson = localStorage.getItem('custom_clubs');
    if (customClubsJson) {
      const customClubs = JSON.parse(customClubsJson);
      const updatedCustomClubs = customClubs.map((c: Club) =>
        c.id === clubId ? { ...c, member_count: c.member_count + 1 } : c
      );
      localStorage.setItem('custom_clubs', JSON.stringify(updatedCustomClubs));
    }

    // Save joined clubs
    localStorage.setItem(`joined_clubs_${user.id}`, JSON.stringify(newJoinedClubs));
    
    toast.success(`You've joined ${clubName}!`);
  };

  const handleLeaveClub = (clubId: string, clubName: string) => {
    if (!user) return;

    const newJoinedClubs = joinedClubIds.filter(id => id !== clubId);
    setJoinedClubIds(newJoinedClubs);
    
    // Update member count
    setClubs(clubs.map(c => 
      c.id === clubId ? { ...c, member_count: Math.max(c.member_count - 1, 0) } : c
    ));

    // Update localStorage for custom clubs
    const customClubsJson = localStorage.getItem('custom_clubs');
    if (customClubsJson) {
      const customClubs = JSON.parse(customClubsJson);
      const updatedCustomClubs = customClubs.map((c: Club) =>
        c.id === clubId ? { ...c, member_count: Math.max(c.member_count - 1, 0) } : c
      );
      localStorage.setItem('custom_clubs', JSON.stringify(updatedCustomClubs));
    }

    // Save joined clubs
    localStorage.setItem(`joined_clubs_${user.id}`, JSON.stringify(newJoinedClubs));
    
    toast.success(`You've left ${clubName}`);
  };

  const filteredClubs = clubs.filter(club =>
    club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    club.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container px-4 py-8 pb-24 md:pb-8 mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl md:text-4xl font-bold">Environmental Clubs</h1>
          {user && <CreateClubDialog onClubCreated={handleClubCreated} />}
        </div>
        <p className="text-muted-foreground">Discover and join clubs making a difference</p>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search clubs by name or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Clubs Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map((club) => {
          const isJoined = joinedClubIds.includes(club.id);
          return (
            <Card key={club.id} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="text-3xl">{club.icon}</div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{club.member_count}</span>
                  </div>
                </div>
                <CardTitle className="text-xl">{club.name}</CardTitle>
                <CardDescription className="line-clamp-3">{club.description}</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto">
                {isJoined ? (
                  <Button
                    className="w-full"
                    variant="secondary"
                    onClick={() => handleLeaveClub(club.id, club.name)}
                  >
                    Leave Club
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => handleJoinClub(club.id, club.name)}
                  >
                    Join Club
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {filteredClubs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No clubs found matching your search.</p>
        </div>
      )}
    </div>
  );
}