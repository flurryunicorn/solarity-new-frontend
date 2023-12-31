import React, { useEffect, useState } from 'react'
import { useDispatch, RootStateOrAny, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import axios from 'axios'

import Image from 'next/image'
import Dropzone from 'react-dropzone'
import cloudinary from 'cloudinary/lib/cloudinary'

import {
    AddressButton,
    WalletButton,
    PrimaryButton,
    BackButton,
} from 'components/Common/Buttons'
import { AddressImg, GalleryImg } from 'components/Common/Images'
import { AvatarPanel, NftPanel } from 'components/Common/Panels'
import { minifyAddress } from 'utils'
import { getNfts } from '../../../hooks'

import {
    startLoadingApp,
    stopLoadingApp,
} from '../../../redux/slices/commonSlice'
import { showErrorToast, showSuccessToast } from 'utils'
import { changeInfo, goStep } from 'redux/slices/authSlice'
import { apiCaller } from 'utils/fetcher'
import { StepTitle, WalletAddress } from './Components'

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_API_SECRET,
})

const UserPic = (props) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { userInfo, loading, isMobile } = useSelector(
        (state: RootStateOrAny) => ({
            userInfo: state.auth.userInfo,
            loading: state.common.appLoading,
            isMobile: state.common.isMobile,
        })
    )
    const [nfts, nftLoading, nftError, fetchNFTs] = getNfts(
        userInfo.domain,
        userInfo.solanaAddress,
        true
    )
    const [files, setFiles] = useState<File[]>(null)
    const [loadedImages, setLoadedImages] = useState<any[]>([])
    const [selectStatus, setSelectStatus] = useState(false)

    useEffect(() => {
        fetchNFTs()
    }, [])

    const onImageLoad = async (tempFiles) => {
        setFiles(tempFiles)
        let listImages = []
        await tempFiles.forEach(async (file: File) => {
            const data = new FormData()
            data.append('file', file)
            data.append('upload_preset', process.env.NEXT_PUBLIC_PRESET_NAME)
            data.append('cloud_name', process.env.NEXT_PUBLIC_CLOUD_NAME)
            data.append('folder', 'assets/avatars')
            try {
                const resp = await axios.post(
                    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
                    data
                )
                listImages.push({
                    url: resp.data.url,
                    name: resp.data.original_filename,
                })
                setLoadedImages([...loadedImages, ...listImages])
            } catch (err) {
                console.log('error : ', err)
            }
        })
    }

    const onSelectImage = async (image) => {
        setSelectStatus(true)
        const payload = {
            value: image,
            type: 'profileImage',
        }
        dispatch(changeInfo({ payload: payload }))
    }

    // const deleteImage = async (e) => {
    //   e.preventDefault();
    //   cloudinary.v2.uploader.destroy(imageData.public_id, function (error, result) {
    //     console.log(result, error)
    //   })
    //     .then(resp => console.log(resp))
    //     .catch(_err => console.log("Something went wrong, please try again later."));
    // }

    const onContinue = () => {
        const data = {
            profileImage: userInfo.profileImage,
        }
        const payload = {
            stepNum: 4,
            data,
        }
        dispatch(goStep(payload))
    }

    const onUndo = () => {
        const payload = {
            stepNum: 2,
            data: {
                daos: [],
            },
        }
        dispatch(goStep(payload))
    }

    return (
        <>
            <div className="flex items-center justify-between pt-8 pl-5 pr-5 lg:p-5 lg:pt-8 lg:pb-0 lg:pr-5 rounded-t">
                {!isMobile ? (
                    <h3 className="text-[22px] sm:text-[30px] text-white font-medium tracking-[0.02em]">
                        Choose Profile Picture
                    </h3>
                ) : (
                    <StepTitle caption={'Avatar'} />
                )}
                <WalletAddress />
            </div>
            <div className="relative p-5 pt-0 sm:p-5">
                <Dropzone
                    onDrop={(acceptedFiles) => {
                        onImageLoad(acceptedFiles)
                    }}
                >
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <label className="flex w-full h-24 px-4 transition bg-transparent border-2 border-white/20 border-dashed rounded-md appearance-none cursor-pointer hover:border-white/30 focus:outline-none">
                                <span className="flex items-center space-x-2 mr-3">
                                    <Image src={GalleryImg} />
                                </span>
                                <span className="flex items-center space-x-2 text-[16px] sm:text-[20px]">
                                    {files ? (
                                        <span className="font-medium text-[#f3f3f3]">
                                            <label className="text-primary">
                                                {files.length}
                                            </label>{' '}
                                            file&#40;s&#41; selected
                                            <br></br>
                                            <label className="text-[14px] text-white/30 flex">
                                                Supports&#58; JPEG
                                                <span className="hidden sm:block">
                                                    , JPEG2000, PNG
                                                </span>
                                            </label>
                                        </span>
                                    ) : (
                                        <span className="font-medium text-[#f3f3f3]">
                                            Drop image here or&nbsp;
                                            <label className="text-primary">
                                                browse
                                            </label>
                                            <br></br>
                                            <label className="text-[14px] text-white/30 flex">
                                                Supports&#58; JPEG
                                                <span className="hidden sm:block">
                                                    , JPEG2000, PNG
                                                </span>
                                            </label>
                                        </span>
                                    )}
                                </span>
                            </label>
                        </div>
                    )}
                </Dropzone>
            </div>
            <div className="relative px-5 lg:px-5 flex-auto overflow-scroll max-h-[calc(100vh-509px)] sm:max-h-[476px]">
                <div
                    className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 ${
                        loadedImages.length ? 'mb-3' : ''
                    }`}
                >
                    {loadedImages.map((image, index) => (
                        <AvatarPanel
                            imageUrl={image.url}
                            title={image.name}
                            key={index}
                            onClick={() =>
                                onSelectImage({
                                    link: image.url,
                                    network: '',
                                    contractAddress: '',
                                    tokenId: '',
                                    mintAddress: '',
                                })
                            }
                            // selected={image.url == selectedAvatar}
                        />
                    ))}
                </div>
                {nftLoading ? (
                    <h3 className="text-center text-[24px] lg:text-[26px] text-white font-medium tracking-[0.02em]">
                        Loading NFTs...
                    </h3>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 custom-2xl:grid-cols-3 gap-3">
                        {nfts.map(
                            (
                                {
                                    type,
                                    mintAddress,
                                    contractAddress,
                                    tokenId,
                                    name,
                                    image,
                                    collectionName,
                                },
                                index
                            ) => (
                                <NftPanel
                                    image={
                                        image
                                            ? image
                                            : '/images/nft_placeholder.png'
                                    }
                                    name={name}
                                    collectionName={collectionName}
                                    type={type}
                                    key={index}
                                    onClick={() =>
                                        onSelectImage({
                                            link: image,
                                            network: type,
                                            contractAddress,
                                            tokenId,
                                            mintAddress,
                                        })
                                    }
                                />
                            )
                        )}
                    </div>
                )}
            </div>
            <div className="w-full p-5 lg:p-5 flex-auto flex items-end px-5 py-5 lg:px-5 lg:py-5">
                <div className="inline-block w-[20%] pr-2">
                    <BackButton
                        onClick={() => onUndo()}
                        styles="rounded-[15px]"
                    />
                </div>
                <div className="inline-block w-[80%] pl-2">
                    <PrimaryButton
                        caption="Continue"
                        icon=""
                        bordered={false}
                        onClick={() => onContinue()}
                        disabled={nftLoading || !selectStatus ? true : false}
                        styles="rounded-[15px]"
                    />
                </div>
            </div>
        </>
    )
}

export default UserPic
