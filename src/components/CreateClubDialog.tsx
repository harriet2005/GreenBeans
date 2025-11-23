import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface CreateClubDialogProps {
  onClubCreated: (newClub: {
    id: string;
    name: string;
    description: string;
    member_count: number;
    icon: string;
  }) => void;
}

export function CreateClubDialog({ onClubCreated }: CreateClubDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("🌿");
  const [loading, setLoading] = useState(false);

  const emojiOptions = ["🌳", "🌊", "♻️", "☀️", "🌱", "🦅", "🌿", "🌍", "💚", "🌺", "🐝", "🌈"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error("Please enter a club name");
      return;
    }

    if (!description.trim()) {
      toast.error("Please enter a description");
      return;
    }

    setLoading(true);

    try {
      // Generate a random ID
      const newClub = {
        id: `club_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: name.trim(),
        description: description.trim(),
        member_count: 1, // Creator is automatically a member
        icon: icon,
      };

      // Save to localStorage (for MVP)
      const existingClubsJson = localStorage.getItem('custom_clubs');
      const existingClubs = existingClubsJson ? JSON.parse(existingClubsJson) : [];
      const updatedClubs = [...existingClubs, newClub];
      localStorage.setItem('custom_clubs', JSON.stringify(updatedClubs));

      // Call the callback to update parent component
      onClubCreated(newClub);

      toast.success(`${name} club created successfully!`);
      
      // Reset form
      setName("");
      setDescription("");
      setIcon("🌿");
      setOpen(false);
    } catch (error) {
      console.error("Error creating club:", error);
      toast.error("Failed to create club");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Club
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Club</DialogTitle>
            <DialogDescription>
              Start your own environmental club and invite others to join your cause.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {/* Club Icon */}
            <div className="grid gap-2">
              <Label htmlFor="icon">Club Icon</Label>
              <div className="flex flex-wrap gap-2">
                {emojiOptions.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setIcon(emoji)}
                    className={`text-2xl p-2 rounded-lg border-2 transition-all hover:scale-110 ${
                      icon === emoji
                        ? "border-primary bg-primary/10"
                        : "border-transparent hover:border-muted"
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Club Name */}
            <div className="grid gap-2">
              <Label htmlFor="name">Club Name</Label>
              <Input
                id="name"
                placeholder="e.g., Green Warriors"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={50}
                required
              />
              <p className="text-xs text-muted-foreground">
                {name.length}/50 characters
              </p>
            </div>

            {/* Description */}
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your club's mission and activities..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={200}
                rows={4}
                required
              />
              <p className="text-xs text-muted-foreground">
                {description.length}/200 characters
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Club"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}