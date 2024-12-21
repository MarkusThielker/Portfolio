import React from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export default async function Home() {

    const response = await fetch("https://api.github.com/users/markusthielker")
    const profile = await response.json() as PublicUser

    return (
        <div className="flex flex-col w-full min-h-screen">

            { /* search header */}
            <header className="pt-8 px-8 pb-2">

                { /* input */}
                <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-8">
                    <Image
                        height="50"
                        width="50"
                        src="/portrait.png"
                        className="rounded"
                        alt="Portrait of Markus Thielker"/>
                    <Input value="Who the fuck is Markus Thielker?" readOnly/>
                </div>
            </header>

            <Separator/>

            <main className="flex flex-col w-full justify-center max-w-6xl">

                { /* heading */}
                <section className="p-4 w-full overflow-y-scroll">
                    <p className="text-3xl font-semibold">Markus Thielker</p>
                    <p className="text-lg font-light text-neutral-500">Software Engineer</p>
                </section>

                { /* card grid */}
                <section className="p-4 w-full overflow-y-scroll">
                    <div className="grid grid-cols-8 grid-rows-2 gap-4 h-64">

                        { /* images */}
                        <Card className="col-span-4 row-span-2 grid grid-cols-5 grid-rows-2 overflow-hidden">
                            <div className="flex col-span-3 row-span-2 items-center overflow-hidden">
                                <Image
                                    height="350"
                                    width="350"
                                    src="/portrait.png"
                                    className="aspect-square overflow-hidden"
                                    alt="Portrait of Markus Thielker"/>
                            </div>
                            <div className="flex col-span-2 row-span-1 items-center overflow-hidden">
                                <Image
                                    height="225"
                                    width="225"
                                    src="/portrait.png"
                                    className="aspect-square overflow-hidden"
                                    alt="Portrait of Markus Thielker"/>
                            </div>
                            <div className="flex col-span-2 row-span-1 items-center overflow-hidden">
                                <Image
                                    height="225"
                                    width="225"
                                    src="/portrait.png"
                                    className="aspect-square overflow-hidden"
                                    alt="Portrait of Markus Thielker"/>
                            </div>
                        </Card>

                        { /* GitHub */}
                        <Link href="https://github.com/markusthielker" className="col-span-2 row-span-2 h-full">
                            <Card className="h-full">
                                <CardContent className="pt-4">
                                    <div className="flex flex-row items-center space-x-2">
                                        <Image
                                            height="50"
                                            width="50"
                                            className="rounded-full h-4 w-4"
                                            src="/github-logo.png"
                                            alt="GitHub"/>
                                        <span>GitHub</span>
                                    </div>
                                    <div className="flex flex-col mt-2 space-y-4">
                                        <div className="flex flex-col text-white/80 -space-y-1">
                                            <span className="text-lg">{profile.name}</span>
                                            <span className="text-md">{profile.followers} Followers</span>
                                        </div>
                                        <span className="text-sm text-white/50">{profile.bio}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>

                        { /* age */}
                        <Card className="col-span-1 row-span-1">
                            <CardHeader>
                                <CardDescription>
                                    Age
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col">
                                <span className="text-md text-white/80">23 Jahre</span>
                                <span className="text-sm text-white/80">04. März 2001</span>
                            </CardContent>
                        </Card>

                        { /* employer */}
                        <Card className="col-span-1 row-span-1">
                            <CardHeader>
                                <CardDescription>
                                    Employer
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col">
                                <span className="text-md text-white/80">Looking for employment</span>
                            </CardContent>
                        </Card>

                        { /* TODO */}
                        <Card className="col-span-2 row-span-1">

                        </Card>
                    </div>
                </section>

                { /* search results */}
                <section className="h-full p-4 grid grid-cols-3">
                    <div className="h-full col-span-2 space-y-8">
                        <SearchResult
                            website="LinkedIn"
                            website_icon_uri="/linkedin-logo.png"
                            href="https://linkedin.com/in/markusthielker"
                            title="LinkedIn"
                            description="Als erfahrener Softwareentwickler bin ich stolz darauf, innovative Software Lösungen zu schaffen. Neben meiner beruflichen Tätigkeit engagiere ich mich auch in persönlichen Projekten, insbesondere in den Bereichen Web- und Android Full Stack Entwicklung."/>
                        <SearchResult
                            website="GitHub"
                            website_icon_uri="/github-logo.png"
                            href="https://github.com/markusthielker"
                            title="Markus Thielker"
                            description="Full stack developer of Kotlin and Java backends with experience in Android, React and Angular frontend development."/>
                        <SearchResult
                            website="Bluesky"
                            website_icon_uri="/bluesky-logo.svg"
                            href="https://bsky.app/profile/thielker.dev"
                            title="Markus Thielker @thielker.dev"
                            description="23 | Software Engineer | links-grün versiffter Veganer"/>
                        <SearchResult
                            website="GitHub"
                            website_icon_uri="/github-logo.png"
                            href="https://github.com/markusthielker/next-ory"
                            title="MarkusThielker/next-ory"
                            description="☄️ An easy-to-use starting point to self-host Ory Kratos with OAuth2 and OIDC, NextJS authentication UI and admin dashboard (work in progress) styled with TailwindCSS and shadcn/ui"
                            links={[
                                {
                                    text: 'README.md',
                                    href: 'https://github.com/MarkusThielker/next-ory/blob/development/README.md',
                                },
                                {
                                    text: 'Releases',
                                    href: 'https://github.com/MarkusThielker/next-ory/releases',
                                },
                            ]}/>
                    </div>
                </section>
            </main>

        </div>
    );
}
