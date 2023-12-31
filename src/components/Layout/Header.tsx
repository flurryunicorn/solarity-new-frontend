import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import HeaderMenuItem from '../Common/Layout/HeaderMenuItem'
import { HeaderMenuTitles } from 'data/HeaderMenu'
import SearchBox from 'components/Common/Forms/SearchBox'
import BalanceBox from 'components/Common/Forms/HeaderBalanceBox'
import UserInfoMenu from 'components/Common/Forms/UserInfoMenu'
import LibraryLayout from 'components/LibraryLayout'
import { CloseIcon } from 'components/icons'
import Library from 'modules/Library'
import GameDetail from 'modules/Library/GameDetail'
import { Rnd } from 'react-rnd'
import CreateEventModal from 'components/Library/CreateEventModal'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { ToggleChatBtn } from './Sidebar'
import LogoComp from 'components/Common/Layout/LogoComp'
import { setChatSidebarVisibility, setDMChats } from 'redux/slices/chatSlice'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import { apiCaller } from 'utils/fetcher'
import { login } from 'redux/slices/authSlice'
import { setAlarm } from 'redux/slices/profileSlice'
import { time_ago } from 'utils'

interface HeaderProps {
    searchString?: string
    setSearchString?: any
}

const Header = (props: HeaderProps) => {
    const wallet = useWallet()
    const dispatch = useDispatch()
    const router = useRouter()
    const { asPath } = useRouter()
    const pathSegments = asPath.split('/')
    const currentPath = pathSegments[pathSegments.length - 1]
    const {
        logged,
        profileData,
        chatSidebarVisibility,
        chatLogs,
        sidebarState,
    } = useSelector((state: RootStateOrAny) => ({
        logged: state.auth.logged,
        profileData: state.profile.data,
        chatSidebarVisibility: state.chat.chatSidebarVisibility,
        chatLogs: state.chat.chatLogs,
        sidebarState: state.chat.sidebarState,
    }))

    const enabledResizing = {
        bottom: false,
        bottomLeft: true,
        bottomRight: true,
        left: false,
        right: false,
        top: false,
        topLeft: true,
        topRight: true,
    }

    const [active, setActive] = useState(currentPath)
    const [balanceBoxToggle, setBalanceBoxToggle] = useState(false)
    const [userInfoToggle, setUserInfoToggle] = useState(false)
    const [gameLibraryToggle, setGameLibraryToggle] = useState(false)
    const [gameLibraryPageFlag, setGameLibraryPageFlag] = useState(0)
    const [createEventToggle, setCreateEventToggle] = useState(false)
    const [isIframe, setIsIframe] = useState(false)
    const [selectedGame, setSelectedGame] = useState(null)

    const [status, setStatus] = useState<any>()

    const connected = useMemo(() => {
        return wallet.connected
    }, [wallet])

    useEffect(() => {
        if (connected && !logged) {
            let publicKey = wallet.publicKey.toBase58()
            let type = 'solana'
            loginUser(publicKey, type, wallet)
        }
    }, [connected])

    useEffect(() => {
        const fetchChats = async () => {
            try {
                if (profileData.username == undefined) {
                    return
                }
                var { data } = await apiCaller.get('/chats/fetchChats')
                let tmpChats = []
                var alarm = 0
                data.chats.map((chat, index) => {
                    let person =
                        chat.users[0].username == profileData.username
                            ? chat.users[1]
                            : chat.users[0]
                    alarm += chat.unreadCount ? chat.unreadCount : 0
                    tmpChats.push({
                        _id: chat._id,
                        users: chat.users,
                        url: person.profileImage
                            ? person.profileImage.link
                            : '/images/experience/psuedo_avatars/avatar.png',
                        name: person.username,
                        detail: person.bio,
                        time: time_ago(chat.lastMsg.createdAt),
                        gap: 3,
                        badge: chat.unreadCount,
                    })
                })
                dispatch(setAlarm(alarm))

                dispatch(
                    setDMChats({
                        type: true,
                        data: tmpChats,
                    })
                )
            } catch (error) {
                console.error('Something went wrong.')
            }
        }
        fetchChats()
    }, [profileData, chatLogs, chatLogs.length, sidebarState])

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
        }
        await dispatch(
            login({
                publicKey: address,
                walletType: type,
                provider,
                next: () => router.push({ pathname: url }),
            })
        )
    }

    useEffect(() => {
        const innerWidth = (window as any).innerWidth
        const innerHeight = (window as any).innerHeight

        const defaultStatus = {
            width: (((innerHeight * 85) / 100) * 16) / 9,
            height: (innerHeight * 85) / 100,
            x: (innerWidth - (((innerHeight * 85) / 100) * 16) / 9) / 2,
            y: (innerHeight * (100 - 85)) / 100 / 2,
        }

        setStatus(defaultStatus)
    }, [])

    const openPopup = (i) => {
        setGameLibraryToggle(true)
        setActive(i.toLowerCase())
    }

    const onClose = () => {
        const innerWidth = (window as any).innerWidth
        const innerHeight = (window as any).innerHeight

        const defaultStatus = {
            width: (((innerHeight * 85) / 100) * 16) / 9,
            height: (innerHeight * 85) / 100,
            x: (innerWidth - (((innerHeight * 85) / 100) * 16) / 9) / 2,
            y: (innerHeight * (100 - 85)) / 100 / 2,
        }

        setGameLibraryToggle(false)
        setIsIframe(false)
        setStatus(defaultStatus)
    }

    const toggleChat = () => {
        dispatch(setChatSidebarVisibility(!chatSidebarVisibility))
    }

    return (
        <div className="fixed top-0 left-0 right-0 bg-[#141414] z-[100]">
            <div
                className="sm:flex xs:hidden
                            custom-2xl:px-[56px] xl:px-[25px] lg:px-[56px] md:px-[25px] sm:px-[20px] xs:px-[24px]
                            custom-2xl:flex-row xl:flex-row lg:flex-col md:flex-col sm:flex-col
                            justify-between
                            border-b-[1px] border-semiSplitter
                            custom-2xl:h-[92px] xl:h-[92px] lg:h-[144px] md:h-[144px] sm:h-[144px] xs:h-[92px]
                            w-full"
            >
                <div className="flex">
                    <LogoComp />
                    <div
                        className="flex flex-row h-full
                                    lg:justify-between md:justify-around sm:justify-between xs:justify-between"
                    >
                        {HeaderMenuTitles.map((menu: any, index) => (
                            <HeaderMenuItem
                                key={index}
                                title={menu.name}
                                link={menu.link}
                                active={active === menu.link}
                            />
                        ))}
                    </div>
                </div>
                <div
                    className="flex
                                custom-2xl:flex-row xl:flex-row lg:flex-col md:flex-col sm:flex-col xs:flex-col
                                h-full self-center justify-between 
                                custom-2xl:w-fit xl:w-fit lg:w-full md:w-full sm:w-full"
                >
                    {/* <SearchBox searchString={props.searchString} setSearchString={props.setSearchString} /> */}
                    <div
                        className="flex flex-row items-center
                                    md:justify-end sm:justify-end
                                    "
                    >
                        {logged && profileData ? (
                            <div className="flex">
                                <BalanceBox
                                    openState={balanceBoxToggle}
                                    onEnter={() => setBalanceBoxToggle(true)}
                                    onLeave={() => setBalanceBoxToggle(false)}
                                />
                                <UserInfoMenu
                                    openState={userInfoToggle}
                                    onEnter={() => setUserInfoToggle(true)}
                                    onLeave={() => setUserInfoToggle(false)}
                                />
                            </div>
                        ) : (
                            <WalletMultiButton
                                style={{
                                    fontSize: '18px',
                                    padding: '15px 20px',
                                    borderRadius: '10px',
                                }}
                            />
                        )}
                        <div className="pl-10 flex items-center">
                            <ToggleChatBtn
                                toggle={!chatSidebarVisibility}
                                onClick={toggleChat}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {gameLibraryToggle ? (
                <>
                    <div className="fixed left-0 top-0 right-0 bottom-0 bg-[rgba(12,12,14,0.7)] flex items-center justify-center z-[1001]">
                        <Rnd
                            className="transition-none"
                            size={{
                                width: status.width,
                                height: status.height,
                            }}
                            position={{ x: status.x, y: status.y }}
                            onDragStop={(e, d) => {
                                setStatus({ ...status, x: d.x, y: d.y })
                            }}
                            onResizeStop={(
                                e,
                                direction,
                                ref,
                                delta,
                                position
                            ) => {
                                setStatus({
                                    width: Number(ref.style.width),
                                    height: Number(ref.style.height),
                                    ...position,
                                })
                            }}
                            lockAspectRatio={16 / 9}
                            minHeight={'281'}
                            maxHeight={'90vh'}
                            minWidth={'500'}
                            maxWidth={'90vw'}
                            dragHandleClassName={`${
                                isIframe ? '' : 'handleDraggling'
                            }`}
                            enableResizing={enabledResizing}
                        >
                            <div
                                className={`modal-content w-[100%] h-[100%] flex flex-col relative bg-globalBgColor border-[1px] border-[#1d1f1f] rounded-[25px] resize select-none ${
                                    isIframe
                                        ? ''
                                        : 'px-[10px] pb-[10px] pt-[30px]'
                                }`}
                            >
                                <div
                                    className={`${
                                        isIframe ? '' : 'handleDraggling'
                                    } m-auto right-0 h-[30px] w-[95%] absolute top-0 left-0 z-[10000] rounded-[50px] overflow-hidden cursor-move`}
                                ></div>
                                {isIframe ? (
                                    <div className="w-full h-full overflow-hidden rounded-[25px]">
                                        <iframe
                                            frameBorder="0"
                                            src={selectedGame.iframe}
                                            featurepolicy='{"vr": ["*"]}'
                                            allow="camera;microphone;vr;"
                                            allowfullscreen="true"
                                            scrolling="no"
                                            width="100%"
                                            height="100%"
                                        ></iframe>
                                    </div>
                                ) : (
                                    <LibraryLayout>
                                        {gameLibraryPageFlag === 0 ? (
                                            <Library
                                                setPage={setGameLibraryPageFlag}
                                                selectGame={setSelectedGame}
                                                createEventToggle={
                                                    createEventToggle
                                                }
                                                setCreateEventToggle={
                                                    setCreateEventToggle
                                                }
                                                activePath={active}
                                            />
                                        ) : (
                                            <GameDetail
                                                setPage={setGameLibraryPageFlag}
                                                setIframe={setIsIframe}
                                                selectedGame={selectedGame}
                                                activePath={active}
                                            />
                                        )}
                                    </LibraryLayout>
                                )}
                                <div
                                    className="absolute top-[-27px] right-[-20px] cursor-pointer"
                                    onClick={onClose}
                                >
                                    <CloseIcon />
                                </div>
                            </div>
                        </Rnd>
                    </div>
                    {createEventToggle ? (
                        <CreateEventModal
                            createEventToggle={createEventToggle}
                            setCreateEventToggle={setCreateEventToggle}
                        />
                    ) : null}
                </>
            ) : null}
        </div>
    )
}

export default Header
