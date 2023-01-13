import Image from 'next/image'
import React, { useCallback } from 'react'
import { GreenButton } from '../../../../Common/Buttons';
import { CloudIcon } from '../../../../icons/CloudIcon';
import { ViewIcon } from '../../../../icons';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { setGameModalVisibility, setMobileGameModal, setSelectedGame } from 'redux/slices/commonSlice';

export interface PreviewProps {
  avatarUrl: string;
  backUrl: string;
  iframeUrl: string;
  title: string;
  description: string;
  gameBannerVisibility: boolean;
  setGameBannerVisibility: Function;
}

function Preview(props: PreviewProps) {
  const dispatch = useDispatch();

  const { isMobile } = useSelector((state: RootStateOrAny) => ({
    isMobile: state.common.isMobile,
  }))

  const setFullScreenModal = useCallback(() => {
    dispatch(setSelectedGame({
      title: props.title,
      websiteUrl: props.iframeUrl,
      iframeUrl: props.iframeUrl,
    }));
    dispatch(setGameModalVisibility(true));
  }, [])

  // When you click play button on the banner of detailed game page.
  const play = useCallback(() => {
    if(isMobile) {
      dispatch(setMobileGameModal(true));
    } else {
      props.setGameBannerVisibility(true)
    }
  }, [])

  return (
    <div className='relative'>
      {props.gameBannerVisibility ? (
        <div>
          <div className='lg:h-[450px] md:h-[450px] sm:h-[300px] xs:h-[300px] w-full'>
            <iframe src={props.iframeUrl} frameBorder="0" className="w-full h-full"></iframe>
          </div>
          <div className=' absolute right-5 md:right-20 bottom-10'>
            <GreenButton caption='Full Screen' icon={<ViewIcon />} onClick={setFullScreenModal} />
          </div>
        </div>
      ) : (
        <div>
          <div className='lg:h-[450px] md:h-[450px] sm:h-[300px] xs:h-[300px] w-full relative'>
            <Image className='rounded-[25px]' layout="fill" src={props.backUrl} />
            <div className='overlay-bg absolute top-0 left-0 right-0 bottom-0'></div>
          </div>
          <div className=' absolute left-10 lg:left-20 hidden md:block bottom-10'>
            <h2 className='text-[32px] font-semibold text-white flex'>
              <div className='w-10 h-10 mr-3'>
                <Image
                  className='rounded-full'
                  src={props.avatarUrl}
                  width={40}
                  height={40}
                  layout="responsive"
                />
              </div>
              {props.title}
            </h2>
            <p className=' text-lg font-light text-[#CECCCC] custom-2xl:w-[550px] xl:w-[450px] lg:w-[300px] md:w-[270px]'>{props.description}</p>
          </div>
          <div className=' absolute right-5 md:right-20 bottom-10'>
            <GreenButton caption='Play' icon={<CloudIcon />} onClick={play} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Preview