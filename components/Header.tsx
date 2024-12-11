import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

const Header = ({ children, className }: HeaderProps) => {
  return (
    <div className={cn("header", className)}>
      <Link href='/' className="md:flex-1">
        {/* <Image 
          src="/assets/icons/logo.svg"
          alt="Logo with name"
          width={120}
          height={32}
          className="hidden md:block"
        /> */}
        <h2 className='font-bold text-2xl sm:text-3xl md:text-4xl bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-500 transition-all duration-300'>
          Collab Pad
        </h2>
        {/* <Image 
          src="/assets/icons/logo-icon.svg"
          alt="Logo"
          width={32}
          height={32}
          className="mr-2 md:hidden"
        /> */}
      </Link>
      {children}
    </div>
  )
}

export default Header