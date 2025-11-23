import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image, Calendar, Award, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface PostCreatorProps {
  onPostCreated?: () => void;
}

export const PostCreator = ({ onPostCreated }: PostCreatorProps) => {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const handlePost = async () => {
    if (!content.trim()) {
      toast.error("Please write something before posting");
      return;
    }

    if (!user) {
      toast.error("You must be logged in to post");
      return;
    }

    setIsPosting(true);
    
    try {
      const { error } = await supabase
        .from("posts")
        .insert({
          user_id: user.id,
          content: content.trim(),
          post_type: "update",
        });

      if (error) throw error;

      toast.success("Post created successfully!");
      setContent("");
      
      if (onPostCreated) {
        onPostCreated();
      }
    } catch (error: any) {
      console.error("Error creating post:", error);
      toast.error(error.message || "Failed to create post");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`} />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-4">
            <Textarea
              placeholder="Share your environmental journey..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px] resize-none"
              disabled={isPosting}
            />
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" disabled>
                  <Image className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" disabled>
                  <Calendar className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" disabled>
                  <Award className="h-4 w-4" />
                </Button>
              </div>
              <Button 
                className="w-full sm:w-auto" 
                onClick={handlePost}
                disabled={isPosting}
              >
                {isPosting ? "Posting..." : "Post"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
