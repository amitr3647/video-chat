 import { useState } from 'react';
import { useSearchParams, Link} from 'react-router-dom';
 const  LandingPage = ()=> {
    const [searchParams, setSearchParams] = useSearchParams();
    const [name, setName] = useState('');
    return(
        <div>
        <input type="text" placeholder="Enter room name or id...." 
        onChange={(e)=>{
            setName(e.target.value)
        }}
        ></input>
        <button>
        <Link to={`/room/?name=${name}`}> join</Link>

        </button>
        </div>
    )
}
export default LandingPage;