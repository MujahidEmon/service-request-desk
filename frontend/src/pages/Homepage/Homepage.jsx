import Image from 'next/image';
import React from 'react';
import supportIcon from '../../../public/support.jpg';
import requesterIcon from '../../../public/requester.jpg';
import { FaInfo } from 'react-icons/fa';
import Link from 'next/link';

const Homepage = () => {
    return (
        <div className='max-w-7xl min-h-screen mx-auto p-4 flex flex-col items-center justify-center md:gap-5 gap-4'>
            <h1 className='font-bold lg:text-5xl text-primary/90 md:text-4xl text-3xl text-center'><span className='lg:text-4xl md:text-3xl text-lg text-black font-semibold'>Welcome to</span> <br /> Service Request Desk!</h1>
            <p className='text-center text-black/70'>Choose how you would like to proceed</p>

            <div className='flex flex-col md:flex-row items-center justify-center gap-4'>
                <div className="card border border-primary/40 bg-base-100 w-96 shadow-sm">
                    <figure className="px-10 pt-10">
                        <Image
                            src={requesterIcon}
                            alt="Requester"
                            height={150}
                            width={150}
                            className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">I'm a Requester</h2>
                        <p className="text-black/70">Create and Track Your Service Requests</p>
                        <div className="card-actions">
                            <Link href="/create-request" className="btn btn-primary">
                                Continue as a Requester
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="card border border-primary/40 bg-base-100 w-96 shadow-sm">
                    <figure className="px-10 pt-10">
                        <Image
                            src={supportIcon}
                            alt="Support"
                            height={150}
                            width={150}
                            className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">I'm a Support Person</h2>
                        <p className="text-black/70">Manage and Resolve Service Requests</p>
                        <div className="card-actions">
                            <Link href={'/provider'} className="btn btn-primary">Continue as a Support</Link>
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
    );
};

export default Homepage;