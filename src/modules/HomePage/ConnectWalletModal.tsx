import React, {useState, useEffect} from "react";
import { Button, WalletButton } from "components/Common/Buttons";
import { PhantomImg, SlopeImg, SolflareImg, SolletExImg, SolletImg, TorusImg } from "components/Common/Images";

export const ConnectWalletModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <Button caption="Connect wallet" icon="" bordered={false} onClick={() => setShowModal(true)} />
        {showModal ? (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              onClick={() => {setShowModal(false)}}
            >
              <div className="relative w-auto my-6 mx-auto max-w-[380px]" onClick={(e) => {e.stopPropagation()}}>
                {/*content*/}
                <div className=" rounded-[30px] shadow-lg relative flex flex-col w-full bg-[#141416] outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between pt-5 pl-8 pr-6 rounded-t">
                    <h3 className="text-[20px] text-white font-medium tracking-[0.02em]">
                      Choose your wallet
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent  text-red float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-grey h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-8 flex-auto">
                    <div className="py-3">
                      <WalletButton caption="Phantom" icon={PhantomImg} onClick={null} styles="" />
                    </div>
                    <div className="py-3">
                      <WalletButton caption="Slope" icon={SlopeImg} onClick={null} styles="" />
                    </div>
                    <div className="py-3">
                      <WalletButton caption="Solflare" icon={SolflareImg} onClick={null} styles="" />
                    </div>
                    <div className="py-3">
                      <WalletButton caption="Torus" icon={TorusImg} onClick={null} styles="" />
                    </div>
                    <div className="py-3">
                      <WalletButton caption="Sollet" icon={SolletImg} onClick={null} styles="" />
                    </div>
                    <div className="py-3">
                      <WalletButton caption="Sollet (extension)" icon={SolletExImg} onClick={null} styles="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-black/70 backdrop-blur-sm fixed inset-0 z-40"></div>
          </>
        ) : null}
      </>
    );
};