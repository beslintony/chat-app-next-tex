import Button from "@/components/ui/Button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <h1>Dashboard</h1>
      <Button variant="ghost">Button</Button>
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
}
