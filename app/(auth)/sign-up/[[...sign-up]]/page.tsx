import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
  return (
    <main className="auth-page overflow-y-hidden">  
        <SignUp />           
    </main>
  )
}

export default SignUpPage