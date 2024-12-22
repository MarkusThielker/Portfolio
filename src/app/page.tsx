import React from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import { SearchResult } from '@/components/search-result';
import { PublicUser, Repository } from '@/lib/github';

const calculateAge = (birthdate: Date): number => {
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();

    // Adjust age if the birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
        age--;
    }

    return age;
};

const getRepos = async (username: string) => {
    let repos: Repository[] = [];
    let page = 1;
    let hasNextPage = true;

    while (hasNextPage) {
        const response = await fetch(`https://api.github.com/users/${username}/repos?page=${page}&per_page=100`, {
            headers: {
                Accept: 'application/vnd.github+json',
            },
        });
        const data = await response.json();

        if (Array.isArray(data)) {
            repos = repos.concat(data);
            hasNextPage = data.length === 100; // Check if there are more pages
            page++;
        } else {
            hasNextPage = false; // Stop if the response is not an array (likely an error)
        }
    }

    return repos;
};

const getLanguages = async (repo: Repository) => {
    const response = await fetch(repo.languages_url, {
        headers: {
            Accept: 'application/vnd.github+json',
        },
    });
    return await response.json();
};

const accumulateLanguages = async (repos: Repository[]) => {
    const languages: { [key: string]: number } = {};

    for (const repo of repos) {
        const repoLanguages = await getLanguages(repo);
        for (const lang in repoLanguages) {
            languages[lang] = (languages[lang] || 0) + repoLanguages[lang];
        }
    }

    return languages;
};

const accumulateStars = (repos: Repository[]) => {

    let stars = 0;
    for (const repo of repos) {
        stars = stars + repo.stargazers_count;
    }

    return stars;
};

export default async function Home() {

    const profileResponse = await fetch('https://api.github.com/users/markusthielker');
    const profile = await profileResponse.json() as PublicUser;

    const username = 'markusthielker';
    const repos = await getRepos(username);
    const languages = await accumulateLanguages(repos);
    const stars = accumulateStars(repos);
    const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);

    const languagePercentages = Object.entries(languages)
        .map(([lang, bytes]) => ({
            name: lang,
            percent: (bytes / totalBytes) * 100,
        }))
        .sort((a, b) => b.percent - a.percent)
        .slice(0, 3);

    const age = calculateAge(new Date('2001-03-04'));

    return (
        <div className="flex flex-col min-h-screen">

            { /* search header */}
            <header className="relative p-4 pb-0 lg:p-8 lg:pb-0">

                <div className="hidden lg:block absolute top-10 cursor-pointer text-3xl">
                    <span className="text-blue-500">T</span>
                    <span className="text-yellow-500">L</span>
                    <span className="text-green-500">K</span>
                    <span className="text-red-500">R</span>
                </div>

                { /* header content (centered) */}
                <div className="flex items-center justify-center">
                    <div className="flex flex-col items-center w-full justify-start max-w-6xl">

                        { /* input */}
                        <Input
                            className="w-full bg-neutral-700 p-6 rounded-full"
                            value="Who the fuck is Markus Thielker?"
                            readOnly/>

                        { /* tab navigation */}
                        <div className="flex flex-row w-full mt-6 text-sm text-white/50 cursor-pointer">
                            <span className="font-semibold text-white/90 border-white border-b-2 px-3 pb-2">All</span>
                            <span className="px-3 pb-2">News</span>
                            <span className="px-3 pb-2">Images</span>
                            <span className="px-3 pb-2">Videos</span>
                            <span className="px-3 pb-2">Books</span>
                            <span className="px-3 pb-2">Web</span>
                            <span className="px-3 pb-2">Finances</span>
                        </div>

                    </div>
                </div>

            </header>

            <Separator/>

            { /* personalised content (centered) */}
            <main className="flex flex-col w-full items-center justify-center">
                <div className="max-w-6xl mt-8 mx-4 lg:mx-8 space-y-8">

                    { /* heading */}
                    <section className="w-full overflow-y-scroll">
                        <p className="text-3xl font-regular">Markus Thielker</p>
                        <p className="text-lg font-light text-neutral-500">Software Engineer</p>
                    </section>

                    { /* card grid */}
                    <section className="w-full overflow-y-scroll">
                        <div
                            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 grid-rows-3 lg:grid-rows-2 gap-4 max-h-92 lg:max-h-72">

                            { /* images */}
                            <Card
                                className="col-span-4 row-span-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 grid-rows-1 lg:grid-rows-2 overflow-hidden gap-0.5">
                                <div
                                    className="flex col-span-1 lg:col-span-3 row-span-1 lg:row-span-2 items-center overflow-hidden">
                                    <Image
                                        height="500"
                                        width="500"
                                        src="/portrait-two.png"
                                        className="aspect-square overflow-hidden"
                                        alt="Portrait of Markus Thielker"/>
                                </div>
                                <div className="flex col-span-1 lg:col-span-2 row-span-1 items-center overflow-hidden">
                                    <Image
                                        height="1200"
                                        width="1600"
                                        src="/portrait-one.jpg"
                                        className="overflow-hidden"
                                        alt="Portrait of Markus Thielker"/>
                                </div>
                                <div
                                    className="hidden md:flex col-span-1 lg:col-span-2 row-span-1 items-center overflow-hidden">
                                    <Image
                                        height="500"
                                        width="500"
                                        src="/portrait-three.png"
                                        className="aspect-square overflow-hidden"
                                        alt="Portrait of Markus Thielker"/>
                                </div>
                            </Card>

                            { /* GitHub */}
                            <Link href="https://github.com/markusthielker"
                                  className="col-span-2 row-span-1 lg:row-span-2 h-full">
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
                                                <span className="text-lg">MarkusThielker</span>
                                                {
                                                    stars > 0 ?
                                                        <span className="text-lg">{stars} total stars</span>
                                                        :
                                                        <Skeleton className="w-16"/>
                                                }
                                                {
                                                    profile.followers ?
                                                        <span className="text-lg">{profile.followers} followers</span>
                                                        :
                                                        <Skeleton className="w-12"/>
                                                }
                                            </div>
                                            <span className="text-sm text-white/50">Full stack developer of Kotlin and Java backends with experience in Android, React and Angular frontend development.</span>
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
                                    <span className="text-lg text-white/80">{age} years</span>
                                    <span className="text-sm text-white/80">March 2001</span>
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
                                    <span className="text-lg text-white/80">None</span>
                                    <span className="text-sm text-white/80">Open for work</span>
                                </CardContent>
                            </Card>

                            { /* TODO */}
                            <Card className="hidden lg:block col-span-2 row-span-1">
                                <CardHeader>
                                    <CardDescription>
                                        Languages
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {
                                        languagePercentages ?
                                            <ul>
                                                {Object.entries(languagePercentages).map(([index, language]) => (
                                                    <li key={index} className="text-sm text-white/80">
                                                        {language.name}: {Math.round(language.percent)} %
                                                    </li>
                                                ))}
                                            </ul>
                                            :
                                            <div>

                                            </div>
                                    }
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                    { /* default content (centered) */}
                    <section className="h-full grid grid-cols-1 lg:grid-cols-3 gap-4">

                        { /* search results column */}
                        <div className="h-full col-span-1 lg:col-span-2 space-y-8">

                            <SearchResult
                                website="LinkedIn"
                                website_icon_uri="/linkedin-logo.png"
                                href="https://linkedin.com/in/markusthielker"
                                title="LinkedIn"
                                description="As an experienced software developer, I take pride in crafting innovative software solutions. Beyond my professional role, I'm actively involved in personal projects, especially in the areas of web and Android full stack development."/>

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
                                description="☄️An easy-to-use starting point to self-host the Ory stack with OAuth2 and
                                OIDC, NextJS authentication UI and admin dashboard (work in progress) styled with
                                TailwindCSS and shadcn/ui"
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

                        { /* person info column */}
                        <div className="hidden lg:flex flex-row col-span-1 space-x-4">

                            <Separator orientation="vertical" className="h-52"/>

                            <div className="flex flex-col text-sm space-y-2">
                                <span className="text-xl">Info</span>
                                <span className="text-md text-white/60 leading-5">
                                Markus Thielker is a {age} year old software engineer from Neu-Ulm, Germany.
                                After several years of Android app development, he now develops web-based software.
                                In doing so he primarily uses Next.js and Angular.
                            </span>
                                <div className="flex flex-col">
                                    <span><strong>Degree:</strong> None</span>
                                    <span><strong>Work Experience:</strong> 2.5 years</span>
                                    <span><strong>Pets:</strong> The cutest dog in the world</span>
                                    <span><strong>Favorite Tech:</strong> Next.js & Kotlin</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <footer className="flex items-center justify-center mt-8 h-16 bg-neutral-900">
                <span className="text-white/45">Markus Thielker  &copy;  2024</span>
            </footer>
        </div>
    );
}
