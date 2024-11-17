"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
// import Navbar from '../components/Navbar'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const endpoint = isLogin ? '/api/login' : '/api/signup'
    const payload = isLogin
      ? { email, password }
      : { username, email, phone, gender, password }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (response.ok) {
        console.log(data.message)
        router.push('/home')
      } else {
        setError(data.message || 'An error occurred')
      }
    } catch (err) {
      setError(`An error occurred. ${err} Please try again`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-[#7efa89]">
              {isLogin ? 'Sign in to your account' : 'Create a new account'}
            </h2>
          </div>
          <div className="mt-8 bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="flex">
                  <button
                    onClick={() => setIsLogin(true)}
                    className={`px-4 py-2 text-sm font-medium ${
                      isLogin ? 'text-[#7efa89]' : 'text-gray-400 hover:text-[#7efa89]'
                    } focus:outline-none`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`px-4 py-2 text-sm font-medium ${
                      !isLogin ? 'text-[#7efa89]' : 'text-gray-400 hover:text-[#7efa89]'
                    } focus:outline-none`}
                  >
                    Sign Up
                  </button>
                </div>
                <div
                  className="absolute bottom-0 left-0 h-0.5 bg-[#7efa89] transition-all duration-300 ease-in-out"
                  style={{ width: '50%', transform: `translateX(${isLogin ? '0%' : '100%'})` }}
                ></div>
              </div>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {!isLogin && (
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                    Username
                  </label>
                  <div className="mt-1">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 bg-gray-700 text-white focus:outline-none focus:ring-[#3b47f1] focus:border-[#3b47f1] sm:text-sm"
                    />
                  </div>
                </div>
              )}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 bg-gray-700 text-white focus:outline-none focus:ring-[#3b47f1] focus:border-[#3b47f1] sm:text-sm"
                  />
                </div>
              </div>
              {!isLogin && (
                <>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                      Phone
                    </label>
                    <div className="mt-1">
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 bg-gray-700 text-white focus:outline-none focus:ring-[#3b47f1] focus:border-[#3b47f1] sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-300">
                      Gender
                    </label>
                    <div className="mt-1">
                      <select
                        id="gender"
                        name="gender"
                        required
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 bg-gray-700 text-white focus:outline-none focus:ring-[#3b47f1] focus:border-[#3b47f1] sm:text-sm"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 bg-gray-700 text-white focus:outline-none focus:ring-[#3b47f1] focus:border-[#3b47f1] sm:text-sm"
                  />
                </div>
              </div>
              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3b47f1] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b47f1] disabled:opacity-50"
                >
                  {loading ? 'Processing...' : (isLogin ? 'Sign in' : 'Sign up')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}