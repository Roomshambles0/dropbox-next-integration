import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";
import DropboxChooser from "./_components/dropbox";

export default async function Home() {
 const session = await getServerSession();
 if(!session)
 {
   redirect("/signin");
 }

 

  return (<div className="flex flex-col">
<div className="text-lg font-mono font-bold text-cyan-950 flex justify-center">hello {session?.user?.name}</div>
 <DropboxChooser />
</div>
  )
}
