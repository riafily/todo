import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function SignIn () {        
    let navigate = useNavigate();
    const [name,setName]=useState();
    const [passw,setPassw]=useState();
    const [showFlag, setShowFlag] = useState(false);
    async function sendName(){
        fetch("http://localhost:5000/user/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({username : name, password : passw}),
        }).then(async function (response) {
            const data = await response.json();
            if (data.length === 0) {
                setShowFlag(!showFlag);
            }
            else{
                localStorage.setItem('auth', true)
                localStorage.setItem("userId", data[0].id);
                console.log(data[0].id);
                navigate("/list");
            }
        });
    }
    return (
        <>  
            <h1>Sign-In</h1>
            <TextField id="uname"  label="Enter Username" variant="outlined" onChange={event=> setName(event.target.value)} />
            <br></br>
            <TextField id="pword" type='password' label="Enter Password" variant="outlined" onChange={event=> setPassw(event.target.value)}/>
            <br></br>
            <Button variant="text" onClick={sendName}>Submit</Button>
            {showFlag && (
                <div>Wrong username or password</div>)}

        </>
    )
}

export default SignIn;