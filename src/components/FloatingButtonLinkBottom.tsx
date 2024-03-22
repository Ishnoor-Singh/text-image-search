import Link from 'next/link';
export default function FloatingButtonLinkBottom({
    href,
    children,
    className
}: {
    href: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <a href={href}
            className={`fixed bottom-6 right-6 p-4 bg-white text-black rounded-full shadow-lg text-2xl ${className}`}
        > {children}</a>
    );
}