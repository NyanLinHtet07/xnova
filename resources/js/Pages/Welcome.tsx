import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-cyan-100 dark:text-white/50">
               
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                       
                        <main className="mt-6">
                            <div className='flex items-center justify-around mb-20 space-x-3'>
                            <img
                                src='/xnova.png' className='object-cover w-32 '
                            />
                            </div>
                        
                            <div className='flex items-center justify-around space-x-3'>
                           
                            <nav className="">
                                {auth.user ? (
                                    <Link
                                        href={route('admin.dashboard')}
                                        className="rounded-md px-3 py-2 bg-white text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 bg-white text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                                        >
                                            Log in
                                        </Link>
                                        {/* <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 bg-white text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                                        >
                                            Register
                                        </Link> */}
                                    </>
                                )}
                            </nav>
                            </div>
                        </main>

                      
                    </div>
                </div>
            </div>
        </>
    );
}
