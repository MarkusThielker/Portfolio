import React from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export default async function Home() {
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

        </div>
    );
}
