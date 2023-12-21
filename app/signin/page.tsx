import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"


const SigninPage = ()=>{
    const router = useRouter();
    return <div>
        <button className="text-3xl font-mono font-bold text-cyan-950 flex justify-center border-lg border-stone-900" onClick={()=>{
  signIn("github", { redirect: false }).then(
    (callback)=>{
      if(callback?.ok){
      console.log("signin ok");
      router.push("/");
    }
    if(callback?.error){
        console.log("not ok");
    }
  }
  )
}}>Signin</button>
    </div>
}

export default SigninPage;