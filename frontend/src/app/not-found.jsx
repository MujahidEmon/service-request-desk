"use client";

import Link from "next/link";
import React from "react";
import { HiOutlineArrowLeft, HiOutlineHome, HiOutlineExclamationTriangle } from "react-icons/hi2";

const NotFound = () => {
    return (
        <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-xl text-center"> 
                {/* Icon */}
                <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50">
                    <HiOutlineExclamationTriangle className="h-10 w-10 text-primary" />
                </div>
                <h1 className="text-8xl font-bold tracking-tight text-slate-900 sm:text-9xl">404</h1>
                <h2 className="mt-5 text-2xl font-bold text-slate-800 sm:text-3xl">Page Not Found</h2>
                <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-500 sm:text-base">Sorry, we couldn't find the page you're looking for. It may have been moved, deleted, or the URL might be incorrect.</p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link
                        href="/"
                        className="srd-primary-button"
                    >
                        <HiOutlineHome className="h-5 w-5" />
                        Back to Dashboard
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="srd-secondary-button"
                    >
                        <HiOutlineArrowLeft className="h-5 w-5" />
                        Go Back
                    </button>

                </div>

                {/* Footer text */}
                <p className="mt-10 text-xs text-primary/80">
                    Service Request Desk
                </p>
            </div>
        </main>
    );
};

export default NotFound;