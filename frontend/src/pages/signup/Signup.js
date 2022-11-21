import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Link from '@mui/material/Link';

function SignIn () {        
    let navigate = useNavigate();
    const [name,setName]=useState();
    const [passw,setPassw]=useState();
    // const [showFlag, setShowFlag] = useState(false);

    async function sendName(){
        fetch("http://localhost:5000/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({username : name, password : passw}),
        })
          .then((response) => response.json());
          navigate("/signin");
    }
    return (
        <>  
            <h1>Sign-Up</h1>
            <TextField id="uname"  label="Enter Username" variant="outlined" onChange={event=> setName(event.target.value)} />
            <br></br>
            <TextField id="pword" type='password' label="Enter Password" variant="outlined" onChange={event=> setPassw(event.target.value)}/>
            <br></br>
            <Button variant="text" onClick={sendName}>Submit</Button>
            <br></br>

            <Link href={'/signin'} variant="body2">
                  Already have an account? Log In
                </Link>
            
            {/* {showFlag && (
                <div>Wrong username or password</div>)} */}

        </>
    )
}

export default SignIn;