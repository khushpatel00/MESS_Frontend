// import 
import { Bricolage_Grotesque } from 'next/font/google';
import LocomotiveScroll from './Providers/LocomotiveScroll'
import { Link } from 'next-transition-router';
const Grotesque: any = Bricolage_Grotesque({
  preload: true
})

export default function Home() {
  return (
    <>
      <LocomotiveScroll>
        <div className={'w-full h-[90vh] flex flex-col flex-wrap max-w-[88rem] mx-auto justify-center '}>
          <Link href={'/Broadcast'} className={Grotesque.className + ' text-6xl md:text-9xl duration-200 font-bold cursor-pointer wrap-anywhere ps-5'}>Broadcast</Link>
          <div className='max-w-[145px] flex flex-nowrap flex-col'>
            <div className='linebreak relative mx-auto'>
              OR
            </div>
          </div>
          <Link href={'/DM'} className={'text-4xl font-light ps-6.5 pt-2'}>DM</Link>
        </div>
      </LocomotiveScroll>
    </>
  );
}
