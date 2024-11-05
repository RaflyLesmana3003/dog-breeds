import { Calendar, Database, Home, Inbox, LogOut, Plus, Puzzle, PuzzleIcon, Search, Settings } from 'lucide-react';
import Dog1 from '../../assets/images/dog-1.png';
import PawWhite from '../../assets/images/paw-white.svg';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from './sidebar';
import Meteors from './meteors';
import { getRandomFact } from '../../lib/randomFact';
import { Link, redirect } from '@tanstack/react-router';
import {  signOut } from "firebase/auth";
import { auth } from '../../main';
import { useAuth } from '../../lib/isAuthenticated';

const items = [
  {
    title: "Feed",
    url: "/user",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M6 6C6.55229 6 7 6.44772 7 7V15.2C7 16.0566 7.00078 16.6389 7.03755 17.089C7.07337 17.5274 7.1383 17.7516 7.21799 17.908C7.40973 18.2843 7.7157 18.5903 8.09202 18.782C8.24842 18.8617 8.47262 18.9266 8.91104 18.9624C9.36113 18.9992 9.94342 19 10.8 19H13.2C14.0566 19 14.6389 18.9992 15.089 18.9624C15.5274 18.9266 15.7516 18.8617 15.908 18.782C16.2843 18.5903 16.5903 18.2843 16.782 17.908C16.8617 17.7516 16.9266 17.5274 16.9624 17.089C16.9992 16.6389 17 16.0566 17 15.2V7C17 6.44772 17.4477 6 18 6C18.5523 6 19 6.44772 19 7V15.2413C19 16.0463 19 16.7106 18.9558 17.2518C18.9099 17.8139 18.8113 18.3306 18.564 18.816C18.1805 19.5686 17.5686 20.1805 16.816 20.564C16.3306 20.8113 15.8139 20.9099 15.2518 20.9558C14.7106 21 14.0463 21 13.2413 21H10.7587C9.95374 21 9.28938 21 8.74817 20.9558C8.18608 20.9099 7.66937 20.8113 7.18404 20.564C6.43139 20.1805 5.81947 19.5686 5.43597 18.816C5.18868 18.3306 5.09012 17.8139 5.04419 17.2518C4.99998 16.7106 4.99999 16.0463 5 15.2413L5 7C5 6.44772 5.44772 6 6 6Z" fill="#262626"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 15C11.4477 15 11 15.4477 11 16V19H9V16C9 14.3431 10.3431 13 12 13C13.6569 13 15 14.3431 15 16V19H13V16C13 15.4477 12.5523 15 12 15Z" fill="#171717"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.10555 8.44724C3.35254 8.94122 3.95321 9.14144 4.44719 8.89445L12 5.11806L19.5528 8.89445C20.0467 9.14144 20.6474 8.94122 20.8944 8.44724C21.1414 7.95326 20.9412 7.35259 20.4472 7.1056L12.4472 3.1056C12.1657 2.96484 11.8343 2.96484 11.5528 3.1056L3.55276 7.1056C3.05878 7.35259 2.85856 7.95326 3.10555 8.44724Z" fill="#171717"/>
    </svg>
    ,
  },
  {
    title: "Mistery dog",
    url: "/mistery-dog",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.108 10.9544L19.1644 10.445C19.6466 10.3646 20 9.94746 20 9.45862V7C20 6.44772 19.5523 6 19 6H16.8284L16.7678 6.06066C16.1663 6.66211 15.3506 7 14.5 7C13.6494 7 12.8337 6.66211 12.2322 6.06066L12.1716 6H10C6.68629 6 4 8.68629 4 12C4 15.3137 6.68629 18 10 18C13.1431 18 15.7235 15.5817 15.9791 12.5057L16.108 10.9544ZM13 4L13.6464 4.64645C13.8728 4.87282 14.1799 5 14.5 5C14.8201 5 15.1272 4.87282 15.3536 4.64645L16 4H19C20.6569 4 22 5.34315 22 7V9.45862C22 10.9251 20.9398 12.1767 19.4932 12.4178L17.9722 12.6713C17.6313 16.7754 14.1922 20 10 20C5.58172 20 2 16.4183 2 12C2 7.58172 5.58172 4 10 4H13Z" fill="#262626"/>
    <path d="M12 12C12 13.1046 11.1046 14 10 14C8.89543 14 8 13.1046 8 12C8 10.8954 8.89543 10 10 10C11.1046 10 12 10.8954 12 12Z" fill="#171717"/>
    </svg>
    ,
  },
  {
    title: "Breed guesser",
    url: "/breed-guesser",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.56469 6C6.01347 6 4.71807 7.18258 4.5771 8.72738L4.01208 14.9193C3.86114 16.5734 5.16345 18 6.82448 18C7.50123 18 8.11952 17.7638 8.60706 17.3665C9.34274 16.7668 10.5126 16 12.0002 16C13.4877 16 14.6576 16.7668 15.3933 17.3665C15.8808 17.7638 16.4991 18 17.1759 18C18.8369 18 20.1392 16.5734 19.9883 14.9193L19.4232 8.72738C19.2823 7.18258 17.9869 6 16.4357 6H7.56469ZM7.56469 4C4.97933 4 2.82032 5.97096 2.58538 8.54563L2.02036 14.7375C1.76251 17.5632 3.98712 20 6.82448 20C7.9779 20 9.03905 19.5946 9.87067 18.9167C10.4861 18.4151 11.2062 18 12.0002 18C12.7941 18 13.5143 18.4151 14.1297 18.9167C14.9613 19.5946 16.0224 20 17.1759 20C20.0132 20 22.2378 17.5632 21.98 14.7375L21.415 8.54564C21.18 5.97097 19.021 4 16.4357 4H7.56469Z" fill="#262626"/>
    <path d="M9 8C8.44772 8 8 8.44772 8 9V10H7C6.44772 10 6 10.4477 6 11C6 11.5523 6.44772 12 7 12H8V13C8 13.5523 8.44772 14 9 14C9.55228 14 10 13.5523 10 13V12H11C11.5523 12 12 11.5523 12 11C12 10.4477 11.5523 10 11 10H10V9C10 8.44772 9.55228 8 9 8Z" fill="#171717"/>
    <path d="M16 13C16 13.5523 15.5523 14 15 14C14.4477 14 14 13.5523 14 13C14 12.4477 14.4477 12 15 12C15.5523 12 16 12.4477 16 13Z" fill="#171717"/>
    <path d="M17 10C17.5523 10 18 9.55228 18 9C18 8.44772 17.5523 8 17 8C16.4477 8 16 8.44772 16 9C16 9.55228 16.4477 10 17 10Z" fill="#171717"/>
    </svg>
    ,
  }
];

export function AppSidebar() {
  const {userLoggedIn} = useAuth()

  const handleLogout = () => {
    signOut(auth).then(() => {
      window.location.href = '/login'
    }).catch((error) => {
      // An error happened.
    });
  };

  return (
    <>
    <Sidebar variant="floating">
      <SidebarHeader>
        <div className='flex items-center justify-center gap-2 text-white'>
            <img src={PawWhite} width={35}/>
            <h1 className='text-base'>Dog Breeds</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className='justify-between'>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} >
                  <SidebarMenuButton asChild className='hover:bg-primary-dark [&.active]:bg-white'>
                    <Link to={item.url} className="[&.active]:text-black"
                        activeOptions={{ exact: true }}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userLoggedIn ?
                <SidebarMenuItem key={'logout'}>
                  <SidebarMenuButton asChild className='hover:bg-primary-dark [&.active]:bg-white cursor-pointer' onClick={() => {handleLogout()}}>
                    <div>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11 20C11 19.4477 11.4477 19 12 19L15.2 19C16.0566 19 16.6389 18.9992 17.089 18.9624C17.5274 18.9266 17.7516 18.8617 17.908 18.782C18.2843 18.5903 18.5903 18.2843 18.782 17.908C18.8617 17.7516 18.9266 17.5274 18.9624 17.089C18.9992 16.6389 19 16.0566 19 15.2L19 8.8C19 7.94342 18.9992 7.36113 18.9624 6.91104C18.9266 6.47262 18.8617 6.24842 18.782 6.09202C18.5903 5.71569 18.2843 5.40973 17.908 5.21799C17.7516 5.1383 17.5274 5.07337 17.089 5.03755C16.6389 5.00078 16.0566 5 15.2 5L12 5C11.4477 5 11 4.55228 11 4C11 3.44772 11.4477 3 12 3L15.2413 3C16.0463 2.99999 16.7106 2.99998 17.2518 3.04419C17.8139 3.09012 18.3306 3.18868 18.816 3.43597C19.5686 3.81947 20.1805 4.43139 20.564 5.18404C20.8113 5.66937 20.9099 6.18608 20.9558 6.74817C21 7.28937 21 7.95374 21 8.75872V15.2413C21 16.0463 21 16.7106 20.9558 17.2518C20.9099 17.8139 20.8113 18.3306 20.564 18.816C20.1805 19.5686 19.5686 20.1805 18.816 20.564C18.3306 20.8113 17.8139 20.9099 17.2518 20.9558C16.7106 21 16.0463 21 15.2413 21H12C11.4477 21 11 20.5523 11 20Z" fill="#262626"/>
                        <path d="M7.70711 14.2929C8.09763 14.6834 8.09763 15.3166 7.70711 15.7071C7.31658 16.0976 6.68342 16.0976 6.29289 15.7071L3.29289 12.7071C2.90237 12.3166 2.90237 11.6834 3.29289 11.2929L6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289C8.09763 8.68342 8.09763 9.31658 7.70711 9.70711L6.41421 11H15C15.5523 11 16 11.4477 16 12C16 12.5523 15.5523 13 15 13H6.41421L7.70711 14.2929Z" fill="#171717"/>
                        </svg>
                        <span>Logout</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                :
                <SidebarMenuItem key={'login'}>
                  <SidebarMenuButton asChild className='hover:bg-primary-dark [&.active]:bg-white cursor-pointer'>
                  <Link to={'/login'} className="[&.active]:text-black"
                        activeOptions={{ exact: true }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11 20C11 19.4477 11.4477 19 12 19L15.2 19C16.0566 19 16.6389 18.9992 17.089 18.9624C17.5274 18.9266 17.7516 18.8617 17.908 18.782C18.2843 18.5903 18.5903 18.2843 18.782 17.908C18.8617 17.7516 18.9266 17.5274 18.9624 17.089C18.9992 16.6389 19 16.0566 19 15.2L19 8.8C19 7.94342 18.9992 7.36113 18.9624 6.91104C18.9266 6.47262 18.8617 6.24842 18.782 6.09202C18.5903 5.71569 18.2843 5.40973 17.908 5.21799C17.7516 5.1383 17.5274 5.07337 17.089 5.03755C16.6389 5.00078 16.0566 5 15.2 5L12 5C11.4477 5 11 4.55228 11 4C11 3.44772 11.4477 3 12 3L15.2413 3C16.0463 2.99999 16.7106 2.99998 17.2518 3.04419C17.8139 3.09012 18.3306 3.18868 18.816 3.43597C19.5686 3.81947 20.1805 4.43139 20.564 5.18404C20.8113 5.66937 20.9099 6.18608 20.9558 6.74817C21 7.28937 21 7.95374 21 8.75872V15.2413C21 16.0463 21 16.7106 20.9558 17.2518C20.9099 17.8139 20.8113 18.3306 20.564 18.816C20.1805 19.5686 19.5686 20.1805 18.816 20.564C18.3306 20.8113 17.8139 20.9099 17.2518 20.9558C16.7106 21 16.0463 21 15.2413 21H12C11.4477 21 11 20.5523 11 20Z" fill="#262626"/>
                        <path d="M4 13C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H12.5858L11.2929 9.70711C10.9024 9.31658 10.9024 8.68342 11.2929 8.29289C11.6834 7.90237 12.3166 7.90237 12.7071 8.29289L15.7071 11.2929C16.0976 11.6834 16.0976 12.3166 15.7071 12.7071L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071C10.9024 15.3166 10.9024 14.6834 11.2929 14.2929L12.5858 13H4Z" fill="#171717"/>
                        </svg>

                        <span>Login</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                }
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
      <SidebarFooter>
        <div className="relative flex w-full flex-col py-4 px-2 overflow-hidden rounded-lg bg-background">
            <h1 className='text-xl my-2'>
                Fun fact!
            </h1>
            <p className='mb-36'>{getRandomFact()}</p>
            <Meteors number={75} />
            <img src={Dog1} className='z-10 absolute top-32 left-0'/>
        </div>
      </SidebarFooter>
    </Sidebar>
    </>
  );
}
