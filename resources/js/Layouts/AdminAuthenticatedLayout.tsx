import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { IconMenu, IconMenu4, IconMenu2 } from '@tabler/icons-react';
import { PropsWithChildren, ReactNode, useState } from 'react';


export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
        const [showNav, setShowNav] = useState(true);

    return (
        <div className="flex flex-row min-h-screen bg-slate-200">
            <nav
                className={`bg-cyan-900 bg-opacity-95 backdrop-blur-md  w-60 max-w-80 h-full fixed left-0 top-0 z-10 mt-1 transform transition-transform duration-700 ease-in-out rounded-r-xl ${
                    showNav ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="px-4 mx-auto ">
                    <div className="flex-row justify-between ">
          
                            <div className="flex items-center justify-center my-5 shrink-0">
                                <Link href="/">
                                    <ApplicationLogo className="block w-auto text-gray-800 fill-current h-9" />
                                    {/* <img src="/logo2.png" alt="" className=' w-36 drop-shadow-xl' /> */}
                                </Link>
                            </div>
                     

                        <div className="flex flex-col">
                            <div className="justify-start w-full px-2 py-2 mx-auto mb-1 ml-1 transition duration-500 hover:bg-slate-100 hover:text-cyan-950 rounded-xl">
                                
                                <NavLink className='flex-row p-1 text-white hover:text-cyan-950' href={route('admin.dashboard')} active={route().current('admin.dashboard')}>
                                   
                                    <span>Home </span>
                                </NavLink>
                               
                            </div>

                            <div className="justify-start w-full px-2 py-2 mx-auto mb-1 ml-1 transition duration-500 hover:bg-slate-100 hover:text-cyan-950 rounded-xl">
                                
                                <NavLink className='flex-row p-1 text-white hover:text-cyan-950' href={route('admin.category')} active={route().current('admin.category')}>
                                   
                                    <span>Categories </span>
                                </NavLink>
                               
                            </div>

                            <div className="justify-start w-full px-2 py-2 mx-auto mb-1 ml-1 transition duration-500 hover:bg-slate-100 hover:text-cyan-950 rounded-xl">
                                
                                <NavLink className='flex-row p-1 text-white hover:text-cyan-950' href={route('admin.promos.cover')} active={route().current('admin.promos.cover')}>
                                   
                                    <span>Promotion Covers </span>
                                </NavLink>
                               
                            </div>

                            <div className="justify-start w-full px-2 py-2 mx-auto mb-1 ml-1 transition duration-500 hover:bg-slate-100 hover:text-cyan-950 rounded-xl">
                            <NavLink className='flex-row p-1 text-white hover:text-cyan-950' href={route('admin.create-bar')} active={route().current('admin.create-bar')}>
                                   
                                   <span>Create Bar </span>
                               </NavLink>
                            </div>

                            <div className="justify-start w-full px-2 py-2 mx-auto mb-1 ml-1 transition duration-500 hover:bg-slate-100 hover:text-cyan-950 rounded-xl">
                            <NavLink className='flex-row p-1 text-white hover:text-cyan-950' href={route('admin.import-bar')} active={route().current('admin.import-bar')}>
                                   
                                   <span>Import Bar </span>
                               </NavLink>
                            </div>


                            <div className="justify-start w-full px-2 py-2 mx-auto mb-1 ml-1 transition duration-500 hover:bg-slate-100 hover:text-cyan-950 rounded-xl">
                            <NavLink className='flex-row p-1 text-white hover:text-cyan-950' href={route('admin.bars')} active={route().current('admin.bars')}>
                                   
                                   <span>Bars </span>
                               </NavLink>
                            </div>

                            {/* <div className="justify-start w-full px-2 py-2 mx-auto mb-1 ml-1 transition duration-500 hover:bg-slate-100 hover:text-cyan-950 rounded-xl">
                            <NavLink className='flex-row p-1 text-white hover:text-cyan-950' href={route('admin.assign-role')} active={route().current('admin.assign-role')}>
                                   
                                   <span>Assign Role and Permissions </span>
                               </NavLink>
                            </div> */}

                            {/* <div className="justify-start w-full px-2 py-2 mx-auto mb-1 ml-1 transition duration-500 hover:bg-slate-100 hover:text-cyan-950 rounded-xl">
                            <NavLink className='flex-row p-1 text-white hover:text-cyan-950' href={route('admin.user-role')} active={route().current('admin.user-role')}>
                                   
                                   <span>Assign User </span>
                               </NavLink>
                            </div> */}

                    <div className="justify-start w-full px-2 py-2 mx-auto mb-1 ml-1 transition duration-500 hover:bg-slate-100 hover:text-cyan-950 rounded-xl">
                            <NavLink className='flex-row p-1 text-white hover:text-cyan-950' href={route('admin.users')} active={route().current('admin.users')}>
                                   
                                   <span>User List </span>
                               </NavLink>
                            </div>

                            <div className="justify-start w-full px-2 py-2 mx-auto mb-1 ml-1 transition duration-500 hover:bg-slate-100 hover:text-cyan-950 rounded-xl">
                            <NavLink className='flex-row p-1 text-white hover:text-cyan-950' href={route('admin.role-permission')} active={route().current('admin.role-permission')}>
                                   
                                   <span>Role and Permission </span>
                               </NavLink>
                            </div>


                        </div>

                    </div>
                </div>

            </nav>

            <main className={`flex-1 transition-all duration-700 ${showNav ? ' ml-60' : 'ml-0'}`}>
           
           {header && (
               <header className="flex justify-between max-w-full px-4 py-3 mt-1 ml-1 rounded-l-lg shadow bg-slate-100 bg-opacity-95">
                   <div className="flex flex-row ">
                       <span
                           className='ml-2 mr-6 text-gray-700 cursor-pointer' 
                           onClick={() => setShowNav(!showNav)}>
                           {showNav ? <IconMenu4 size={25} className='mt-1'/> : <IconMenu2 size={25} className='mt-1'/>}
                           
                       </span>
                       <div>
                           {/* {header} */}
                           <Link href="/">
                               <ApplicationLogo className="block w-auto text-gray-800 fill-current h-9" />
                           </Link>
                       </div>
                      
                   </div>
                   <div>
                       <Dropdown>
                           <Dropdown.Trigger>
                               <span className="inline-flex rounded-md">
                                   <button
                                       type="button"
                                       className="inline-flex items-center px-3 py-2 font-medium leading-4 transition duration-150 ease-in-out border border-transparent rounded-md text-slate-900 hover:text-gray-700 focus:outline-none"
                                   >
                                       {user.name}

                                       <svg
                                           className="ms-2 -me-0.5 h-4 w-4"
                                           xmlns="http://www.w3.org/2000/svg"
                                           viewBox="0 0 20 20"
                                           fill="currentColor"
                                       >
                                           <path
                                               fillRule="evenodd"
                                               d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                               clipRule="evenodd"
                                           />
                                       </svg>
                                   </button>
                               </span>
                           </Dropdown.Trigger>

                           <Dropdown.Content>
                               <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                               <Dropdown.Link href={route('logout')} method="post" as="button">
                                       Log Out
                               </Dropdown.Link>
                           </Dropdown.Content>
                       </Dropdown>
                   </div>
               </header>
           )}
 
    
   {/** main Children */}
   <div className='overflow-x-auto '>
       {children}
   </div>
 
</main>
           
        </div>
    );
}





