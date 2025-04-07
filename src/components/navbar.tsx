import Link from "next/link";

export default function Navbar () {
  return (
    <ol className='pb-2 flex gap-4 justify-center'>
      <Link href='/' className='underline dark:text-green-200 hover:no-underline'>Home</Link>
      <Link href='/future-earnings' className='underline dark:text-green-200 hover:no-underline'>Future Earnings</Link>
    </ol>
  )
}