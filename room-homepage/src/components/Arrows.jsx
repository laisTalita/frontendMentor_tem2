export default function Arrows({setActivePage , activePage,className}) {
    return(
        <div className={className}>
        <button 
        onClick={()=> setActivePage(activePage <= 1? 3 : activePage -1)}>
         <img src="/images/icon-angle-left.svg" alt="icon to left" />
         </button>

         <button 
         onClick={()=> setActivePage(activePage >= 3 ? 1 : activePage +1 )}>
            <img src="/images/icon-angle-right.svg" alt="icon to right" />
         </button>
        </div>
    )
}