import Button from "@/components/ui/Button";
import { redis } from "@/lib/db";

export default function Home() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Button>Button</Button>
    </div>
  );
}
