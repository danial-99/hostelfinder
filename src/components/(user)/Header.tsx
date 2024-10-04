"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "#", label: "Home" },
    { href: "#about-us", label: "About" },
    { href: "#", label: "Contact" },
  ];

  return (
    <header className='sticky top-0 z-50 w-full bg-secondary/95 backdrop-blur supports-[backdrop-filter]:bg-secondary'>
      <div className='container flex h-14 items-center justify-between'>
        <Link href='/' className='flex items-center space-x-2'>
          <Image src={"/logo.png"} alt='logo' width={100} height={40} />
        </Link>

        <nav className='hidden md:flex gap-6'>
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className='text-sm font-medium transition-colors text-white hover:text-primary'
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className='hidden md:flex items-center'>
          <Link href={"/login"}>
            <Button variant='ghost' className='text-white'>
              Login
            </Button>
          </Link>
          <Link href={"/register"}>
          <Button className='ml-2'>Register</Button>
          </Link>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className='md:hidden'>
            <Button variant='ghost' size='icon' className='text-white'>
              <Menu className='h-6 w-6' />
              <span className='sr-only'>Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='right' className='w-[300px] sm:w-[400px]'>
            <nav className='flex flex-col gap-4'>
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className='text-sm font-medium transition-colors hover:text-primary'
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Separator className='my-4' />
              <Button
                variant='ghost'
                className='justify-start'
                onClick={() => setIsOpen(false)}
              >
                Login
              </Button>
              <Button
                className='justify-start'
                onClick={() => setIsOpen(false)}
              >
                Register
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
