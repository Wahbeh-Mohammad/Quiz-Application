import Cookies from 'universal-cookie';
const cookie = new Cookies();

const verifyToken = async ()=>{ // Verify authenticated status
    try {
        const token = cookie.get('jwt')
        if(token){
            const res = await fetch(`${process.env.REACT_APP_API_URL}auth/verifyJWT`, {
                method:"POST",
                mode:"cors",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ token })
            });
            
            const data = await res.json();
            if(data.status){
                return data;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (e) {
        return { status:false, Error:e };
    }
}

export default verifyToken;