
'use client';

import { useState } from 'react';
import { Bricolage_Grotesque } from 'next/font/google';

const Grotesque = Bricolage_Grotesque({
    preload: true
});

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [registerData, setRegisterData] = useState({
        email: '',
        username: '',
        displayname: '',
        password: '',
        confirmpassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterData(prev => ({ ...prev, [name]: value }));
        // setError('');
    };

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // setLoading(true);
        try {
            if (loginData.username.length >= 6) {
                if (loginData.password.length >= 8) {
                    setLoading(true)
                } else setError('Password must be 8 characters or more')
            } else setError('Username must be 6 characters or more')
        } catch (err) {
            setError('Login failed. Please try again.');
        } finally {
            // setLoading(false);
        }
    };

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // setLoading(true);
        try {

            if (!registerData.email) {
                setError('Please enter a valid Email')
                return;
            }
            if (emailRegex.test(registerData.email) !== true) {
                setError('Please enter a valid Email')
                return;
            }
            if (!registerData.username) {
                setError('Please enter a valid username')
                return;
            }
            if (registerData.password.length < 8) {
                setError('Please enter a valid Password')
                return;
            }
            if (registerData.password !== registerData.confirmpassword) {
                setError('The Passwords must match')
                return;
            }
            setError('')

            if (registerData.displayname == '') registerData.displayname = registerData.username;




        } catch (err) {
            setError('Registration failed. Please try again.');
        } finally {
            // setLoading(false);
        }
    };

    return (
        <div
            className="w-full overflow-x-hidden bg-white flex items-center justify-center px-4 sm:px-6"
            style={{ minHeight: "calc(100vh - 64px)" }}
        >
            <div className="relative w-full max-w-[500px] py-20">
                {/* Heading */}
                <div className="mb-16 duration-300">
                    <h1 className={`${Grotesque.className} text-5xl sm:text-6xl font-bold mb-3`}>
                        Mess
                    </h1>
                    <p className="text-lg text-gray-600 font-light">
                        Connect, broadcast, and chat
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className=" absolute top-1/2 left-0 -rotate-90 -translate-full duration-300 flex gap-6 mb-12 border-b border-gray-200">
                    <button
                        onClick={() => !loading && setIsLogin(true)}
                        className={`pb-4 text-lg font-medium transition-all duration-300 ${isLogin
                            ? 'text-black border-b-2 border-black'
                            : 'text-gray-400 border-b-0 border-black hover:text-gray-600'
                            }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => !loading && setIsLogin(false)}
                        className={`pb-4 text-lg font-medium transition-all duration-300 ${isLogin
                            ? 'text-gray-400 border-b-0 border-black hover:text-gray-600'
                            : 'text-black border-b-2 border-black'
                            }`}
                    >
                        Register
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 px-8 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                        {error}
                    </div>
                )}

                {/* Login Form */}
                {isLogin && (
                    <form onSubmit={handleLoginSubmit} className="">
                        <div className="space-y-6">
                            {/* Username Input */}
                            <div className="space-y-2">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="Enter your username"
                                    value={loginData.username}
                                    onChange={handleLoginChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200 bg-white"
                                />
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={loginData.password}
                                    onChange={handleLoginChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200 bg-white"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 px-4 bg-black text-white font-medium rounded-lg hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-wait duration-200 mt-8 text-base"
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        </div>
                    </form>
                )}

                {/* Register Form */}
                {!isLogin && (
                    <form onSubmit={handleRegisterSubmit} className="">
                        <div className="space-y-6">
                            {/* Email Input */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email" // can use text, but user gets recent email suggestion on this
                                    placeholder="Enter your email"
                                    value={registerData.email}
                                    onChange={handleRegisterChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200 bg-white"
                                />
                            </div>

                            {/* Username Input */}
                            <div className="space-y-2">
                                <label htmlFor="reg-username" className="block text-sm font-medium text-gray-700">
                                    Username
                                </label>
                                <input
                                    id="reg-username"
                                    name="username"
                                    type="text"
                                    placeholder="Choose a username"
                                    value={registerData.username}
                                    onChange={handleRegisterChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200 bg-white"
                                />
                            </div>

                            {/* Display Name Input (Optional) */}
                            <div className="space-y-2">
                                <label htmlFor="displayname" className="block text-sm font-medium text-gray-700">
                                    Display Name <span className="text-gray-400 font-normal">(Optional)</span>
                                </label>
                                <input
                                    id="displayname"
                                    name="displayname"
                                    type="text"
                                    placeholder="Your display name"
                                    value={registerData.displayname}
                                    onChange={handleRegisterChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200 bg-white"
                                />
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    id="reg-password"
                                    name="password"
                                    type="password"
                                    placeholder="Create a strong password"
                                    value={registerData.password}
                                    onChange={handleRegisterChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200 bg-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="conf-password" className="block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <input
                                    id="conf-password"
                                    name="confirmpassword"
                                    type="password"
                                    placeholder="Confirm your password"
                                    value={registerData.confirmpassword}
                                    onChange={handleRegisterChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200 bg-white"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 px-4 bg-black text-white font-medium rounded-lg hover:bg-gray-900 disabled:bg-gray-400 transition-colors duration-200 mt-8 text-base"
                            >
                                {loading ? 'Creating account...' : 'Register'}
                            </button>
                        </div>
                    </form>
                )}

                {/* Footer */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <p className="text-center text-sm text-gray-500">
                        {isLogin ? "Don't have an account? " : 'Already have an account? '}
                        <button
                            onClick={() => {
                                !loading && setIsLogin(!isLogin);
                                !loading && setError('');
                            }}
                            className="text-black font-medium hover:underline transition-all"
                        >
                            {isLogin ? 'Register' : 'Login'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
} 