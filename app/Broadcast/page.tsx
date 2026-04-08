'use client'
import { socket } from '../socket'
import gsap from "gsap";
import { ChangeEvent, useRef, useState } from "react";
import { Bricolage_Grotesque } from 'next/font/google'

const Grotesque = Bricolage_Grotesque({
    preload: true,
})


export default function page() {
    let tl: any;
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isConnected, setIsConnected] = useState<Boolean>(socket.connected || false);
    // const [fooEvents, setFooEvents] = useState([]);
    const handleMess = (e: any) => {
        e.preventDefault();
    }

    function onConnect() {
        setIsConnected(true);
    }

    function onDisconnect() {
        setIsConnected(false);
    }

    // function onFooEvent(value) {
    //     setFooEvents(previous => [...previous, value]);
    // }
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    // socket.on('foo', onFooEvent);


    interface userInput {
        message: string | undefined | number | readonly string[],
        uid: null | String,
        displayName: String,
    }


    const [input, setInput] = useState<userInput>({
        message: '',
        uid: null, // null = anonymous
        displayName: '',
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

    return (
        <>
            <div className='absolute top-0 right-0 z-60 text-xl capitalize '>
                <div className={` ${Grotesque.className} ${isConnected ? 'bg-emerald-400' : 'bg-red-300'} ${isConnected ? 'text-emerald-800' : 'text-red-800'} px-3 ps-5 py-1 font-semibold m-3 mt-20 rounded-full flex flex-row flex-wrap items-center justify-evenly gap-1.5`}><div className={`${isConnected ? 'bg-emerald-700' : 'bg-red-700'} w-2 h-2 rounded-full`}>  </div>{isConnected ? 'Connected' : 'Disconnected'}</div>
            </div>
            <form onSubmit={handleMess} className={'absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-row flex-wrap items-center justify-center mb-5'}>
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