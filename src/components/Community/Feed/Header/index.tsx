import React, { useState } from 'react'
import GameModal from '../../GameModal';
import Description from './Description'
import Preview from './Preview'
import Stats from './Stats'

export interface HeaderProps {
  id: any;
  isPreview: boolean;
  avatarUrl: string;
  backUrl: string;
  title: string;
  type: string;
  description: string;
  websiteUrl: string;
  walletAddress: string;
  icon: any;
}

function Header(props: HeaderProps) {
  const [gameModalVisibility, setGameModalVisibility] = useState(false);

  return (
    <div className='flex flex-col gap-[56px]'>
      {props.isPreview && <Preview avatarUrl={props.avatarUrl} setGameModalVisibility={setGameModalVisibility} backUrl={props.backUrl} title={props.title} description={props.description} />}
      {!props.isPreview && <div className='md:hidden lg:hidden sm:block xs:block'>
        <Preview
          avatarUrl={props.avatarUrl}
          backUrl={props.backUrl}
          title={props.title}
          description={props.description}
          setGameModalVisibility={setGameModalVisibility}
        />
      </div>}

      <div className='grid custom-2xl:grid-cols-5 xl:grid-cols-4 xl:gap-12 gap-0 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 xs:grid-cols-1'>
        <div className='custom-2xl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-1 sm:col-span-1 xs:col-span-1'>
          <Description title={props.title} description={props.description} walletAddress={props.walletAddress} icon={props.icon} />
        </div>
        <div className='custom-2xl:block xl:hidden lg:hidden md:hidden sm:hidden xs:hidden'></div>
        <div className='col-span-2'>
          <Stats id={props.id} type={props.type} />
        </div>
      </div>
      {gameModalVisibility && (
        <GameModal
          closeFunc={() => setGameModalVisibility(false)}
          title={props.title}
          websiteUrl={props.websiteUrl}
        />
      )}
    </div>
  )
}

export default Header