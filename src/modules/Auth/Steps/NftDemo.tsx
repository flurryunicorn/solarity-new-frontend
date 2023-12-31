import {
    AddressButton,
    BackButton,
    PrimaryButton,
} from 'components/Common/Buttons'
import {
    AddressImg,
    AvatarImg,
    MetamaskImg,
    PhantomImg,
} from 'components/Common/Images'
import Logo from 'components/Common/Logo'
import { UserAvatar } from 'components/Common/Panels'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, Suspense, lazy } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { minifyAddress } from 'utils'
import Model from '../Model'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const ModelComponent = lazy(() => import('../Model'))

const NftDemo = (props) => {
    const { modelRef } = props
    const { userInfo, isMobile } = useSelector((state: RootStateOrAny) => ({
        userInfo: state.auth.userInfo,
        isMobile: state.common.isMobile,
    }))

    return (
        <>
            <Canvas
                className={`${
                    isMobile ? '!h-[250px]' : '!h-[350px]'
                } sm:!w-[600px] sm:!h-[500px] lg:!w-[80vw] lg:!h-[70vh] lg:top-[15vh] xl:!w-[85vw] xl:!h-[80vh] xl:!top-[10vh] custom-2xl:!w-[100vw] custom-2xl:!h-[100vh] lg:!absolute lg:!right-0 m-auto lg:pl-[170px] xl:pl-[270px] custom-2xl:pl-[500px] custom-2xl:!top-0 overflow-visible`}
                camera={{ fov: isMobile ? 30 : 40, position: [0, 0, 20] }}
            >
                <pointLight position={[0, 40, 100]} />
                <pointLight position={[0, 40, -100]} />
                <pointLight
                    position={[-0.83, 1.77, 0.54]}
                    color={userInfo.passportStyle.logo}
                    intensity={0.01}
                    rotation={[0, 0, Math.PI / 2]}
                />
                <ambientLight intensity={0.5} />
                <Suspense fallback={null}>
                    <Model
                        modelRef={modelRef}
                        domain={userInfo.domain}
                        title={userInfo.title}
                        profileImage={
                            userInfo.profileImage
                                ? userInfo.profileImage.link
                                : ''
                        }
                        passportStyle={userInfo.passportStyle}
                        daos={userInfo.daos}
                        badges={userInfo.badges}
                        links={userInfo.links}
                        backgroundImage={userInfo.backgroundImage}
                    />
                    <OrbitControls />
                </Suspense>
            </Canvas>
        </>
    )
}

export default NftDemo
