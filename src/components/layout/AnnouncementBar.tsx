import { Truck } from "lucide-react";

const AnnouncementBar = () => {
  return (
    <div className="announcement-gradient w-full py-2.5 text-primary-foreground">
      <div className="container-jimmy flex items-center justify-center gap-2 text-sm font-medium">
        <Truck className="h-4 w-4 shrink-0" />
        <span>Free Delivery on Orders Over R1,500 | 30-Day Returns</span>
      </div>
    </div>
  );
};

export default AnnouncementBar;
