"use client";

import "./style.css";
import { usePathname } from "next/navigation";

// NextJS
import Image from "next/image";
import Link from "next/link";

// Components
import UserComponent from "@/components/User";

// icons
import { House, Archive, Search } from "lucide-react";

const links = [
  { name: "Home", href: "/", icon: House },
  { name: "Archivio", href: "/archive", icon: Archive },
  { name: "Cerca", href: "/search", icon: Search },
];

const classMenuBottom =
  "flex flex-col items-center justify-center gap-1 min-w-[50px] h-[50px]";

export default function Header() {
  const pathname = usePathname();

  const isActiveLink = (href: string) => {
    return pathname === href ? "active-link" : "";
  };

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="w-full flex items-center justify-center md:justify-between px-20 h-[66px] md:h-[83px]">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="w-[70px] md:w-[90px] relative aspect-[128/73] rounded-md"
            >
              <Image src="/img/logo.png" className="p-1" alt="Logo" fill />
            </Link>

            {/* Menu */}
            <div className="hidden md:block ">
              <ul className="flex items-center justify-center gap-0">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className={`flex items-center gap-2 p-3 header-link outline-transparent rounded-lg ${isActiveLink(
                        link.href
                      )}`}
                    >
                      <link.icon size="18" className="mb-[2px]" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <UserComponent />
          </div>
        </div>
      </header>

      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="flex items-center gap-4">
            <ul className="flex items-center justify-between gap-4 w-full">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${classMenuBottom} ${isActiveLink(link.href)}`}
                  >
                    <link.icon size="20" />
                    <span className="leading-none">{link.name}</span>
                  </Link>
                </li>
              ))}
              <div className="w-[50px] h-[45px] flex flex-col justify-center items-center">
                <UserComponent />
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
