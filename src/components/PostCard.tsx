import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, Calendar, MapPin } from "lucide-react";
import { useState } from "react";

interface PostCardProps {
  post: {
    id: number;
    author: {
      name: string;
      avatar: string;
      title: string;
    };
    type: string;
    content: string;
    timestamp: string;
    likes: number;
    comments: number;
    media?: {
      type: "image" | "video";
      url: string;
    };
    event?: {
      date: string;
      location: string;
    };
  };
}

export default function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <Card className="p-4 md:p-6 mb-3 md:mb-4 hover:shadow-md transition-shadow">
      {/* Post Header */}
      <div className="flex items-start gap-2 md:gap-3 mb-3 md:mb-4">
        <Avatar className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0">
          <AvatarImage src={post.author.avatar} />
          <AvatarFallback>{post.author.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-sm md:text-base">{post.author.name}</h3>
              <p className="text-xs md:text-sm text-muted-foreground line-clamp-1">{post.author.title}</p>
              <p className="text-xs text-muted-foreground">{post.timestamp}</p>
            </div>
            <Badge variant="secondary" className="text-xs">{post.type}</Badge>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-3 md:mb-4">
        <p className="text-sm md:text-base whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* Event Details */}
      {post.event && (
        <div className="mb-3 md:mb-4 p-2 md:p-3 bg-muted rounded-lg">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{post.event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{post.event.location}</span>
            </div>
          </div>
        </div>
      )}

      {/* Media */}
      {post.media && (
        <div className="mb-3 md:mb-4 rounded-lg overflow-hidden">
          {post.media.type === "image" ? (
            <img 
              src={post.media.url} 
              alt="Post media" 
              className="w-full object-cover max-h-[300px] md:max-h-[400px]"
            />
          ) : (
            <video 
              src={post.media.url} 
              controls 
              className="w-full max-h-[300px] md:max-h-[400px]"
            />
          )}
        </div>
      )}

      {/* Post Actions */}
      <div className="flex items-center gap-0.5 md:gap-1 pt-2 md:pt-3 border-t">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex-1 h-8 md:h-9 text-xs md:text-sm"
          onClick={handleLike}
        >
          <Heart className={`h-3.5 w-3.5 md:h-4 md:w-4 ${liked ? 'fill-current text-red-500' : ''}`} />
          <span className="ml-1 md:ml-2">{likesCount}</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex-1 h-8 md:h-9 text-xs md:text-sm">
          <MessageCircle className="h-3.5 w-3.5 md:h-4 md:w-4" />
          <span className="ml-1 md:ml-2">{post.comments}</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex-1 h-8 md:h-9 text-xs md:text-sm">
          <Share2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
          <span className="ml-1 md:ml-2 hidden sm:inline">Share</span>
        </Button>
      </div>
    </Card>
  );
}
