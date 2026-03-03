import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth, Profile as ProfileType } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Mail, Phone, MapPin, Save, LogOut, Package } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { formatZAR } from "@/lib/format";

type Order = {
  id: string;
  status: string;
  total: number;
  created_at: string;
  shipping_city: string;
};

const Profile = () => {
  const { user, profile, loading, signOut, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [saving, setSaving] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setPhone(profile.phone || "");
      setAddress(profile.address || "");
    }
  }, [profile]);

  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      setOrdersLoading(true);
      const { data } = await supabase
        .from("orders")
        .select("id, status, total, created_at, shipping_city")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(10);
      setOrders((data as Order[]) || []);
      setOrdersLoading(false);
    };
    fetchOrders();
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await updateProfile({ name, phone, address });
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Profile updated!" });
    }
    setSaving(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <MainLayout>
        <section className="container-jimmy py-12 space-y-6">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-64 w-full max-w-lg" />
        </section>
      </MainLayout>
    );
  }

  if (!user) return null;

  return (
    <MainLayout>
      <section className="container-jimmy py-12">
        <h1 className="text-3xl font-bold text-foreground mb-8">My Account</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Profile Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-md border bg-card p-6 shadow-soft">
              <h2 className="text-xl font-semibold text-foreground mb-6">Profile Information</h2>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="email" value={user.email || ""} disabled className="pl-10 bg-muted" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="phone"
                      placeholder="+27 XX XXX XXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="address"
                      placeholder="Street address, city, postal code"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="gap-2 rounded-sm bg-primary font-bold text-primary-foreground hover:bg-primary/90"
                >
                  <Save className="h-4 w-4" />
                  {saving ? "Saving…" : "Save Changes"}
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-md border bg-card p-6 shadow-soft">
              <h3 className="font-semibold text-foreground mb-4">Account</h3>
              <p className="text-sm text-muted-foreground mb-4 truncate">{user.email}</p>
              <Button
                variant="outline"
                className="w-full gap-2 rounded-sm text-destructive border-destructive/30 hover:bg-destructive/10"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="mt-10 rounded-md border bg-card p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Package className="h-5 w-5" /> Order History
          </h2>
          {ordersLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => <Skeleton key={i} className="h-14 w-full" />)}
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No orders yet.</p>
              <Button asChild variant="outline" className="mt-4 rounded-sm">
                <Link to="/shop">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-2 pr-4 font-medium">Order</th>
                    <th className="pb-2 pr-4 font-medium">Date</th>
                    <th className="pb-2 pr-4 font-medium">City</th>
                    <th className="pb-2 pr-4 font-medium">Status</th>
                    <th className="pb-2 font-medium text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-b last:border-0">
                      <td className="py-3 pr-4 font-mono text-xs">{o.id.slice(0, 8)}…</td>
                      <td className="py-3 pr-4">{new Date(o.created_at).toLocaleDateString()}</td>
                      <td className="py-3 pr-4">{o.shipping_city}</td>
                      <td className="py-3 pr-4">
                        <span className="inline-block rounded-full bg-accent/20 px-2 py-0.5 text-xs font-semibold capitalize text-accent-foreground">
                          {o.status}
                        </span>
                      </td>
                      <td className="py-3 text-right font-bold">{formatZAR(Number(o.total))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Profile;
