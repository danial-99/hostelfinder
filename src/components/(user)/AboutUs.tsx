import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AboutUs() {
  return (
    <section className='py-12' id='about-us'>
      <div className='container'>
        <div className='flex flex-col md:flex-row items-center gap-8'>
          <div className='md:w-1/2'>
            <h2 className='text-3xl font-bold mb-4'>About Us</h2>
            <p className='text-gray-600 mb-4'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className='text-gray-600 mb-4'>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
            <Button>Contact us</Button>
          </div>
          <div className='md:w-1/2'>
            <Image
            unoptimized
              width={0}
              height={0}
              src='/about-us-banner.png'
              alt='About Us'
              className='w-full h-auto rounded-lg shadow-lg'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
