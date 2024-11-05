import { SidebarProvider, SidebarTrigger } from "./sidebar"
import { AppSidebar } from "./app-sidebar"
import { Navbar } from "./app-navbar"
import Paw from "../../assets/images/paw.svg"

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <SidebarProvider className="">
      <AppSidebar />
      <main className="p-2 flex-1">
        <nav className="w-full">
            <Navbar/>
        </nav>
        {children}

        <div className="fixed bottom-[-20px] right-[-0px] rotate-[-34deg] transition-transform hover:rotate-[-38deg] hover:animate-jiggle">
          <img src={Paw} alt="dog breeds" width={150}/>
        </div>
      </main>
    </SidebarProvider>
  )
}
