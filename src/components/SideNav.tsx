'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { FunctionComponent } from 'react';

import { cn } from '../../lib/utils';
import { sidebarLinks } from '../constants';

const SideNav: FunctionComponent<SidebarProps> = ({ user }) => {
    const pathName = usePathname();
    return (
        <section className="sidebar">
            <nav className="flex flex-col gap-4">
                <Link
                    href="/"
                    className="mb-12 cursor-pointer items-center gap-2 flex"
                >
                    <Image
                        src="/icons/logo.svg"
                        width={34}
                        height={34}
                        alt="tranzekt_logo"
                        className="size-[24px] max-xl:size-14"
                    />
                    <h1 className="sidebar-logo">Tranzekt.AI</h1>
                </Link>
                {sidebarLinks.map((link, index) => {
                    const isActive =
                        pathName === link.route ||
                        pathName.startsWith(`${link.route}/`);

                    return (
                        <Link
                            href={link.route}
                            key={index}
                            className={cn('sidebar-link', {
                                'bg-bankGradient': isActive,
                            })}
                        >
                            <div className="relative size-6">
                                <Image
                                    src={link.imgURL}
                                    alt={link.label}
                                    fill
                                    className={cn({
                                        'brightness-[3] invert-0': isActive,
                                    })}
                                />
                            </div>
                            <p
                                className={cn('sidebar-label', {
                                    '!text-white': isActive,
                                })}
                            >
                                {link.label}
                            </p>
                        </Link>
                    );
                })}
            </nav>
        </section>
    );
};

export default SideNav;
