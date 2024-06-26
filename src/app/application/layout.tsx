import FloatingButtonLinkBottom from "@/components/FloatingButtonLinkBottom";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { PlusIcon } from "@radix-ui/react-icons";

export default ApplicationLayout;

function ApplicationLayout ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return <div className="relative flex min-h-screen flex-col">
    <div className="flex-1">{children}</div>
    <FloatingButtonLinkBottom href="sms:+19292961936"><PlusIcon height='30' width='30' color="black"/></FloatingButtonLinkBottom>
  </div>
}
