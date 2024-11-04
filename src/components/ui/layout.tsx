import { SidebarProvider, SidebarTrigger } from "./sidebar"
import { AppSidebar } from "./app-sidebar"
import { Navbar } from "./app-navbar"
import Paw from "../../assets/images/paw.svg"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="">
      <AppSidebar />
      <main className="p-2 flex-1">
        <nav className="flex items-center justify-between mb-4">
            <Navbar/>

            <div className="flex items-center gap-2 mr-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <h5>Rafly Lesmana</h5>
                <p>raflylesmana111@gmail.com</p>
              </div>
            </div>
        </nav>
        {children}

        <div className="fixed bottom-[-20px] right-[-0px] rotate-[-34deg] transition-transform hover:rotate-[-38deg] hover:animate-jiggle">
          <img src={Paw} alt="dog breeds" width={150}/>
        </div>
      </main>
    </SidebarProvider>
  )
}
