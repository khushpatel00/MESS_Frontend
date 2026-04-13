'use client'
import { socket } from '../socket'
import gsap from "gsap";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Bricolage_Grotesque } from 'next/font/google'
import MessageBlock from '../Components/MessageBlock';

const Grotesque = Bricolage_Grotesque({
    preload: true,
})


export default function page() {
    let tl: any; // gsap timeline
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isConnected, setIsConnected] = useState<Boolean>(false);
    const [MessHistory, setMessHistory] = useState<Array<Message>>([])
    // const [fooEvents, setFooEvents] = useState([]);
    const handleMess = (e: any) => {
        e.preventDefault();
        // console.log(input);
        if (input.message) {

            socket.emit('send-message', input);
            let data: Message = {
                message: input.message.toString(), // raw sanitized            
                displayName: '', // just for now
                uid: '', // will be provided by socketid, will be added later, 
                IsSent: true,
            }
            setMessHistory(prev => [...prev, data])
            // console.log(MessHistory, data)
            setInput((prev) => {
                return {
                    ...prev,
                    message: '',
                }
            });
        }
    }

    function onConnect() {
        setIsConnected(true);
    }
    function onDisconnect() {
        setIsConnected(false);
    }
    function renderNewMessage(data: any) {
        console.log('render data: ', data);
        setMessHistory(prev => [...prev, data])
    }
    function userLeft(data: any) {
        console.log('user left: ', data)
    }
    function userJoined(data: any) {
        console.log('user joined: ', data)
    }



    interface userInput {
        message: string | undefined | number | readonly string[],
        uid: null | String,
        displayName: String,
        IsSent: Boolean,
    }

    interface Message {
        message: string | number | readonly string[],
        uid: string | null,
        displayName: string,
        IsSent: Boolean,
    }


    const [input, setInput] = useState<userInput>({
        message: '',
        uid: null, // null = anonymous
        displayName: '',
        IsSent: false,
    });


    const focusInput = () => {
        if (tl) tl.kill();
        tl = gsap.timeline();
        tl.to(inputRef.current, {
            // fontSize: 24,
            scale: 1.25,
            x: '-15',
            ease: 'expo.out',
            duration: 0.5,
            autoRound: false,
        }, 'sync')
        tl.to('.sendicon', {
            // fontSize: 20,
            scale: 1.2,
            x: '-80%',
            ease: 'back.out(1.7)',
            duration: 0.5,
            autoRound: false,
        }, 'sync')
    }
    const blurInput = () => {
        if (tl) tl.kill();
        tl = gsap.timeline();
        tl.to(inputRef.current, {
            // fontSize: 20,
            scale: 1,
            x: 0,
            ease: 'expo.out',
            duration: 0.5,
            autoRound: false,
        }, 'sync')
        tl.to('.sendicon', {
            // fontSize: 20,
            scale: 1,
            x: 0,
            duration: 0.5,
            ease: 'back.out(1)',
            autoRound: false,
        }, 'sync')
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput((prev) => {
            return {
                ...prev,
                message: e.target.value,
            }
        });
    }



    useEffect(() => {


        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('recieve-new-message', renderNewMessage);
        socket.on('user-left', userLeft);
        socket.on('user-connected', userJoined);
        return () => {
            socket.off('user-left');
            socket.off('user-connected');
            socket.off('recieve-new-message');
        }
    }, [])

    return (
        <>
            <div className='absolute top-0 right-0 z-60 text-xl capitalize pointer-events-none'>
                <div className={` ${Grotesque.className} ${isConnected ? 'bg-emerald-400' : 'bg-red-300'} ${isConnected ? 'text-emerald-800' : 'text-red-800'} px-3 ps-5 py-1 font-semibold m-3 mt-20 rounded-full flex flex-row flex-wrap items-center justify-evenly gap-1.5`}><div className={`${isConnected ? 'bg-emerald-700' : 'bg-red-700'} w-2 h-2 rounded-full`}>  </div>{isConnected ? 'Connected' : 'Disconnected'}</div>
            </div>

            <div className='mx-auto max-w-2xl mt-24'>
                {MessHistory.map((MESS, KEY) => {
                    return (
                        <div key={KEY}>
                            <MessageBlock UserID={MESS.uid} Message={MESS.message} IsSent={MESS.IsSent} ></MessageBlock>
                        </div>
                    )
                })}
            </div>

            <form onSubmit={handleMess} className={'fixed bottom-0 left-1/2 -translate-x-1/2 flex flex-row flex-wrap items-center justify-center mb-5'}>
                <input
                    ref={inputRef}
                    onFocus={focusInput}
                    onBlur={blurInput}
                    type="text"
                    className="bg-zinc-200 rounded-full md:max-w-auto max-w-[50vw] text-xl px-5 py-3"
                    value={input.message}
                    onChange={handleChange}
                />
                <div className="text-black max-w-12 ms-2 mx-auto my-auto flex flex-wrap justify-center items-center p-3 bg-zinc-100 rounded-full sendicon" >
                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </form>
        </>
    )
}