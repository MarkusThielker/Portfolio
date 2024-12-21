import Image from 'next/image';
import Link from 'next/link';

interface SearchResultProps {
    website: string;
    website_icon_uri: string;
    href: string;
    title: string;
    description: string;
    links?: SearchResultLink[];
}

interface SearchResultLink {
    text: string;
    href: string;
}

export function SearchResult(
    {
        website,
        website_icon_uri,
        href,
        title,
        description,
        links,
    }: SearchResultProps,
) {

    return (
        <div className="flex flex-col space-y-2">
            <Link href={href} className="flex flex-row space-x-2 items-center">
                <div className="flex items-center justify-center h-8 w-8 rounded-full overflow-hidden bg-white">
                    <Image
                        height="100"
                        width="100"
                        src={website_icon_uri}
                        alt={website}/>
                </div>
                <div className="flex flex-col -space-y-1">
                    <span className="text-sm font-thin">{website}</span>
                    <span className="text-xs text-white/50">{href}</span>
                </div>
            </Link>
            <div className="flex flex-col">
                <Link href={href} className="text-xl text-blue-300">{title}</Link>
                <span className="test-sm text-white/80">{description}</span>
            </div>
            {
                links && links.length > 0 &&
                <div className="flex flex-row space-x-4">
                    {
                        links.map(({ text, href }) =>
                            <Link key={text} href={href} className="text-blue-300 hover:underline">
                                {text}
                            </Link>
                        )
                    }
                </div>
            }
        </div>
    );
}
