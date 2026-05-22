import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();
  return <div className="mx-auto max-w-4xl px-6 py-10"><div className="glass rounded-xl p-6"><h1 className="text-2xl font-semibold">Profile</h1><p className="mt-2">Name: {user?.name}</p><p>Email: {user?.email}</p></div></div>;
}
