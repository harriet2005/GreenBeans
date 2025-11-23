import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostCard from "@/components/PostCard";
import { PostCreator } from "@/components/PostCreator";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Post {
  id: string;
  user_id: string;
  content: string;
  post_type: string;
  media_url?: string;
  event_date?: string;
  event_location?: string;
  likes: number;
  comments: number;
  shares: number;
  created_at: string;
  profiles: {
    full_name: string;
    avatar_url?: string;
  };
}

export default function Feed() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      // First, get all posts
      const { data: postsData, error: postsError } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (postsError) throw postsError;

      if (!postsData || postsData.length === 0) {
        setPosts([]);
        setLoading(false);
        return;
      }

      // Get unique user IDs from posts
      const userIds = [...new Set(postsData.map(post => post.user_id))];

      // Fetch profiles for those users
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url")
        .in("id", userIds);

      if (profilesError) throw profilesError;

      // Merge posts with profiles
      const postsWithProfiles = postsData.map(post => ({
        ...post,
        profiles: profilesData?.find(profile => profile.id === post.user_id) || {
          full_name: "Unknown User",
          avatar_url: null
        }
      }));

      setPosts(postsWithProfiles as any);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = () => {
    fetchPosts();
  };

  const filteredPosts = filter === "all" 
    ? posts 
    : posts.filter(post => post.post_type === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Community Feed</h1>
        <p className="text-muted-foreground">
          Share your environmental journey and connect with others
        </p>
      </div>

      <PostCreator onPostCreated={handlePostCreated} />

      <Tabs value={filter} onValueChange={setFilter} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="update">Updates</TabsTrigger>
          <TabsTrigger value="event">Events</TabsTrigger>
          <TabsTrigger value="achievement">Achievements</TabsTrigger>
          <TabsTrigger value="question">Questions</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No posts yet. Be the first to share something!
            </p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={{
                id: parseInt(post.id.substring(0, 8), 16),
                author: {
                  name: post.profiles.full_name,
                  avatar: post.profiles.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.user_id}`,
                  title: "GreenBeans Member",
                },
                type: post.post_type,
                content: post.content,
                timestamp: new Date(post.created_at).toLocaleDateString(),
                likes: post.likes,
                comments: post.comments,
                media: post.media_url ? {
                  type: "image" as const,
                  url: post.media_url,
                } : undefined,
                event: post.event_date && post.event_location ? {
                  date: post.event_date,
                  location: post.event_location,
                } : undefined,
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}