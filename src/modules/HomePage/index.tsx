import React, { useEffect, useMemo, useCallback } from 'react'
import Image from 'next/image'
import { BannerText } from './BannerText'
import { BannerImage } from './BannerImage'
import { BannerLeftImg, BannerRightImg } from 'components/Common/Images'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import { apiCaller } from 'utils/fetcher'
import { useDispatch } from 'react-redux'
import { login } from 'redux/slices/authSlice'
import { useRouter } from 'next/router'
import { startLoadingApp, stopLoadingApp } from 'redux/slices/commonSlice'

export const HomePage = () => {
    const wallet = useWallet()
    const dispatch = useDispatch()
    const router = useRouter()

    const connected = useMemo(() => {
        return wallet.connected
    }, [wallet])

    useEffect(() => {
        if (wallet.connected) {
            let publicKey = wallet.publicKey.toBase58()
            let type = 'solana'
            loginUser(publicKey, type, wallet)
        }
    }, [connected])

    const loginUser = async (address, type, provider) => {
        localStorage.setItem('publickey', address)
        localStorage.setItem('type', type)

        const {
            data: { exist, user },
        } = await apiCaller.post('/auth/userExist', {
            publicKey: address,
            walletType: type,
        })
        let url
        if (!exist) {
            url = '/auth/register'
        } else if (user.registerStep <= 4) {
            url = '/auth/register'
        } else if (user.registerStep > 4) {
            url = `/explore`
        }

        dispatch(startLoadingApp())

        await dispatch(
            login({
                publicKey: address,
                walletType: type,
                provider,
                next: () => {
                    router.push({ pathname: url }).then((res) => {
                        dispatch(stopLoadingApp())
                    })
                },
            })
        )
    }

    return (
        <>
            <div className="block sm:hidden mobile-gradient"></div>
            <div className="block sm:hidden mobile-gradient-2"></div>
            <div className="absolute block sm:hidden -ml-[37px] -mt-[50px] w-[50vw]">
                <Image
                    src={BannerLeftImg}
                    alt="Solarity"
                    layout="responsive"
                    className="custom-animation-bounce banner-image"
                ></Image>
            </div>
            <div className="absolute block sm:hidden right-0 -ml-[20px] -mt-[50px] w-[50vw]">
                <Image
                    src={BannerRightImg}
                    alt="Solarity"
                    layout="responsive"
                    className="custom-animation-bounce banner-image"
                ></Image>
            </div>
            <div className="absolute block sm:hidden">
                <BannerImage isMobile={false} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 mt-[80px] items-baseline px-[10px] ml-[50px] sm:pl-0">
                <div>
                    <BannerText />
                    <div className="flex flex-row justify-start items-center gap-6">
                        <WalletMultiButton />
                        <button
                            className="text-white text-[22px]"
                            onClick={() =>
                                router.push({ pathname: '/explore' })
                            }
                        >
                            Skip
                        </button>
                    </div>
                </div>
            </div>
            <div className="hidden sm:block absolute top-0 right-0 -z-10">
                <BannerImage isMobile={true} />
            </div>
        </>
    )
}
