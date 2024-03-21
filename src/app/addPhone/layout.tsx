import Nav from '@/components/Nav';


export default function ApplicationLayout ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return <div className="relative flex min-h-screen flex-col">
      <Nav/>
    <div className="flex-1">{children}</div>
  </div>
}

