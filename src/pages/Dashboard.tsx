import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Award, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Profile {
  full_name: string;
  points: number;
  level: number;
}

interface Activity {
  id: string;
  description: string;
  points: number;
  created_at: string;
}

interface Club {
  id: string;
  name: string;
  member_count: number;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (profileData) {
        setProfile(profileData);
      }

      // Fetch recent activities
      const { data: activitiesData } = await supabase
        .from("activities")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false })
        .limit(5);

      if (activitiesData) {
        setActivities(activitiesData);
      }

      // Load joined clubs from localStorage (MVP approach)
      const storedJoinedClubs = localStorage.getItem(`joined_clubs_${user?.id}`);
      if (storedJoinedClubs) {
        try {
          const joinedClubIds = JSON.parse(storedJoinedClubs);
          
          // Load both default and custom clubs
          const defaultClubs = [
            { id: '1', name: 'Tree Planters United', member_count: 45 },
            { id: '2', name: 'Ocean Warriors', member_count: 32 },
            { id: '3', name: 'Recycling Champions', member_count: 56 },
            { id: '4', name: 'Solar Youth', member_count: 28 },
            { id: '5', name: 'Garden Growers', member_count: 41 },
            { id: '6', name: 'Wildlife Watchers', member_count: 23 },
          ];
          
          const customClubsJson = localStorage.getItem('custom_clubs');
          const customClubs = customClubsJson ? JSON.parse(customClubsJson) : [];
          
          const allClubs = [...defaultClubs, ...customClubs];
          const userClubs = allClubs.filter(club => joinedClubIds.includes(club.id));
          setClubs(userClubs);
        } catch (error) {
          console.error("Error parsing joined clubs:", error);
          setClubs([]);
        }
      } else {
        setClubs([]);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const levelProgress = profile ? ((profile.points % 100) / 100) * 100 : 0;
  const nextLevelPoints = profile ? (profile.level * 100) - profile.points : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {profile?.full_name || "User"}!</h1>
        <p className="text-muted-foreground">Track your environmental impact and achievements</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profile?.points || 0}</div>
            <p className="text-xs text-muted-foreground">Keep up the great work!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activities</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activities.length}</div>
            <p className="text-xs text-muted-foreground">Completed this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clubs Joined</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clubs.length}</div>
            <p className="text-xs text-muted-foreground">Environmental groups</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Level</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Level {profile?.level || 1}</div>
            <p className="text-xs text-muted-foreground">{nextLevelPoints} points to next level</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Level Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={levelProgress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2">
            {Math.round(levelProgress)}% to Level {(profile?.level || 1) + 1}
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            {activities.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No activities yet. Start by joining clubs and participating in events!
              </p>
            ) : (
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4">
                    <Badge variant="secondary" className="mt-1">
                      +{activity.points}
                    </Badge>
                    <div className="flex-1">
                      <p className="text-sm">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Clubs</CardTitle>
          </CardHeader>
          <CardContent>
            {clubs.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                You haven't joined any clubs yet. Visit the Clubs page to get started!
              </p>
            ) : (
              <div className="space-y-4">
                {clubs.map((club) => (
                  <div key={club.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{club.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {club.member_count} members
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}