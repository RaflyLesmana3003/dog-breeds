import { Link } from '@tanstack/react-router';

import { cn } from '../../lib/utils';
import { buttonVariants } from './button';
import { Dock, DockIcon } from './dock';
import { Separator } from './separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';
import { SidebarTrigger } from './sidebar';
import { useAuth } from '../../lib/isAuthenticated';

export type IconProps = React.HTMLAttributes<SVGElement>;
 
const DATA = {
  navbar: [
    { href: "/user", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M6 6C6.55229 6 7 6.44772 7 7V15.2C7 16.0566 7.00078 16.6389 7.03755 17.089C7.07337 17.5274 7.1383 17.7516 7.21799 17.908C7.40973 18.2843 7.7157 18.5903 8.09202 18.782C8.24842 18.8617 8.47262 18.9266 8.91104 18.9624C9.36113 18.9992 9.94342 19 10.8 19H13.2C14.0566 19 14.6389 18.9992 15.089 18.9624C15.5274 18.9266 15.7516 18.8617 15.908 18.782C16.2843 18.5903 16.5903 18.2843 16.782 17.908C16.8617 17.7516 16.9266 17.5274 16.9624 17.089C16.9992 16.6389 17 16.0566 17 15.2V7C17 6.44772 17.4477 6 18 6C18.5523 6 19 6.44772 19 7V15.2413C19 16.0463 19 16.7106 18.9558 17.2518C18.9099 17.8139 18.8113 18.3306 18.564 18.816C18.1805 19.5686 17.5686 20.1805 16.816 20.564C16.3306 20.8113 15.8139 20.9099 15.2518 20.9558C14.7106 21 14.0463 21 13.2413 21H10.7587C9.95374 21 9.28938 21 8.74817 20.9558C8.18608 20.9099 7.66937 20.8113 7.18404 20.564C6.43139 20.1805 5.81947 19.5686 5.43597 18.816C5.18868 18.3306 5.09012 17.8139 5.04419 17.2518C4.99998 16.7106 4.99999 16.0463 5 15.2413L5 7C5 6.44772 5.44772 6 6 6Z" fill="#262626"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 15C11.4477 15 11 15.4477 11 16V19H9V16C9 14.3431 10.3431 13 12 13C13.6569 13 15 14.3431 15 16V19H13V16C13 15.4477 12.5523 15 12 15Z" fill="#171717"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M3.10555 8.44724C3.35254 8.94122 3.95321 9.14144 4.44719 8.89445L12 5.11806L19.5528 8.89445C20.0467 9.14144 20.6474 8.94122 20.8944 8.44724C21.1414 7.95326 20.9412 7.35259 20.4472 7.1056L12.4472 3.1056C12.1657 2.96484 11.8343 2.96484 11.5528 3.1056L3.55276 7.1056C3.05878 7.35259 2.85856 7.95326 3.10555 8.44724Z" fill="#171717"/>
      </svg>
      , label: "Feed" },
    { href: "/user/likes", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7.21187L10.6662 6.01806C9.95717 5.38348 9.02575 5 8 5C5.79086 5 4 6.79086 4 9C4 11.9996 5.33975 14.212 7.03224 15.8501C8.75438 17.5169 10.7798 18.5183 11.8857 18.9794C11.9626 19.0114 12.0374 19.0114 12.1143 18.9794C13.2202 18.5183 15.2456 17.5169 16.9678 15.8501C18.6602 14.2119 20 11.9996 20 9.00004C20 6.7909 18.2091 5 16 5C14.9742 5 14.0428 5.38348 13.3338 6.01806L12 7.21187ZM12 4.52779C10.9385 3.57771 9.53671 3 8 3C4.68629 3 2 5.68629 2 9C2 16.3511 8.67146 19.8061 11.116 20.8254C11.6855 21.0628 12.3145 21.0628 12.884 20.8254C15.3285 19.8061 22 16.3512 22 9.00005C22 5.68634 19.3137 3 16 3C14.4633 3 13.0615 3.57771 12 4.52779Z" fill="#171717"/>
      </svg>
      , label: "Likes" },
    { href: "#", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M4 12H20V17C20 19.2091 18.2091 21 16 21H8C5.79086 21 4 19.2091 4 17V12ZM6 14V17C6 18.1046 6.89543 19 8 19H16C17.1046 19 18 18.1046 18 17V14H6Z" fill="#262626"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M3 10C3 8.34315 4.34315 7 6 7H18C19.6569 7 21 8.34315 21 10V11C21 12.6569 19.6569 14 18 14H6C4.34315 14 3 12.6569 3 11V10ZM6 9C5.44772 9 5 9.44772 5 10V11C5 11.5523 5.44772 12 6 12H18C18.5523 12 19 11.5523 19 11V10C19 9.44772 18.5523 9 18 9H6Z" fill="#171717"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7 6C7 4.34315 8.34315 3 10 3C10.7684 3 11.4692 3.28885 12 3.76389C12.5308 3.28885 13.2316 3 14 3C15.6569 3 17 4.34315 17 6C17 7.65685 15.6569 9 14 9H13V21H11V9H10C8.34315 9 7 7.65685 7 6ZM11 7V6C11 5.44772 10.5523 5 10 5C9.44772 5 9 5.44772 9 6C9 6.55228 9.44772 7 10 7H11ZM13 6V7H14C14.5523 7 15 6.55228 15 6C15 5.44772 14.5523 5 14 5C13.4477 5 13 5.44772 13 6Z" fill="#171717"/>
      </svg>
      , label: "Charity (Coming soon)" },
  ]
};
export function Navbar() {

  const { userLoggedIn, currentUser } = useAuth()
  
  
  return (
    <TooltipProvider>

    <div className='flex items-center justify-between'>
        <Dock direction="middle" className='m-0  border' >
          <DockIcon key={1}>
            <SidebarTrigger/>
          </DockIcon>
          <Separator orientation="vertical" className="h-full" />
          {DATA.navbar.map((item) => (
            <DockIcon key={item.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    aria-label={item.label}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full",
                    )}
                  >
                   {item.icon}
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
        </Dock>

      <div className="flex items-center gap-2 mr-4">
              {userLoggedIn && 
        <>
          <div>
            <h5>{currentUser?.displayName}</h5>
            <p>{currentUser?.email}</p>
          </div>
        </>
        }
      </div>
    </div>
    </TooltipProvider>

  );
}
