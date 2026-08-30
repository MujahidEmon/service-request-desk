import Image from 'next/image';
import React from 'react';
import supportIcon from '../../../public/support.jpg';
import requesterIcon from '../../../public/requester.jpg';
import Link from 'next/link';

const Homepage = () => {
    return (
        <main className="min-h-screen w-full overflow-x-hidden">
            <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center px-4 py-8 sm:px-6 md:px-8">

                <h1 className="text-center font-bold text-primary/90 text-3xl sm:text-4xl lg:text-5xl">
                    <span className="text-lg font-semibold text-black sm:text-2xl lg:text-4xl">
                        Welcome to
                    </span>
                    <br />
                    Service Request Desk!
                </h1>

                <p className="mt-2 text-center text-sm text-black/70 sm:text-base">
                    Choose how you would like to proceed
                </p>

                <div className="mt-5 flex w-full max-w-4xl flex-col items-stretch justify-center gap-4 md:flex-row">

                    {/* Requester Card */}
                    <div className="card w-full min-w-0 border border-primary/40 bg-base-100 shadow-sm md:w-90 md:shrink-0">
                        <figure className="px-6 pt-6 sm:px-8 sm:pt-8">
                            <Image
                                src={requesterIcon}
                                alt="Requester"
                                width={150}
                                height={150}
                                className="h-32 w-32 rounded-xl object-contain sm:h-37 sm:w-37"
                            />
                        </figure>

                        <div className="card-body items-center px-5 text-center">
                            <h2 className="card-title text-lg">
                                I'm a Requester
                            </h2>

                            <p className="text-sm text-black/70">
                                Create and Track Your Service Requests
                            </p>

                            <div className="card-actions mt-2">
                                <Link
                                    href="/create-request"
                                    className="btn btn-primary btn-sm sm:btn-md"
                                >
                                    Continue as a Requester
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Support Card */}
                    <div className="card w-full min-w-0 border border-primary/40 bg-base-100 shadow-sm md:w-90 md:shrink-0">
                        <figure className="px-6 pt-6 sm:px-8 sm:pt-8">
                            <Image
                                src={supportIcon}
                                alt="Support"
                                width={150}
                                height={150}
                                className="h-32 w-32 rounded-xl object-contain sm:h-37 sm:w-37"
                            />
                        </figure>

                        <div className="card-body items-center px-5 text-center">
                            <h2 className="card-title text-lg">
                                I'm a Support Person
                            </h2>

                            <p className="text-sm text-black/70">
                                Manage and Resolve Service Requests
                            </p>

                            <div className="card-actions mt-2">
                                <Link
                                    href="/provider"
                                    className="btn btn-primary btn-sm sm:btn-md"
                                >
                                    Continue as a Support
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default Homepage;
