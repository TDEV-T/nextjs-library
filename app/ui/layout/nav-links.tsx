"use client";
import { FileAddOutlined, BookOutlined, UserOutlined } from "@ant-design/icons";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { name: "Borrow", href: "/", icon: FileAddOutlined },
    { name: "Books", href: "/manage/books", icon: BookOutlined },
    { name: "Members", href: "/manage/members", icon: UserOutlined }
];

export default function NavLinks() {
    const pathname = usePathname();
    console.log(pathname)
    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium dark:bg-gray-700 dark:hover:text-white dark:hover:bg-blue-700  hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                            {
                                "bg-sky-100 text-blue-600 dark:bg-blue-700 dark:text-white": pathname === link.href,
                            }
                        )}
                    >
                        <LinkIcon className="w-6" />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}