'use server'

interface signInProps {
  email: string
  password: string
}

export const signIn = async ({ email, password }: signInProps) => {
  return Promise<null>
}
