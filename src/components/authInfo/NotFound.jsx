import React from 'react'
import { signIn } from "next-auth/react"
import { FaGoogle } from "react-icons/fa";
export default function NotFound() {
  return (
    <div className='authInfo__wrapper'>
      <div className='authInfo__notFound'>
        <h1 className="authInfo__text">Hi there {":)"}<br /> Please log in to access this page.</h1>
        <button className='authInfo__btn' onClick={() => signIn("google", { callbackUrl: `${window.location.origin}/chat` })}>
          <FaGoogle />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  )
}
