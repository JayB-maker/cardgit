'use client'

import { useSession, signOut } from "next-auth/react"

export default function AuthStatus() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "unauthenticated") {
    return <div>Not signed in</div>
  }

  return (
    <div>
      Signed in as {session?.user?.email} <br />
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  )
}

