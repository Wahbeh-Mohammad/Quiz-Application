const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

export const checkPassword = (password) => {
    return passwordRegex.test(password);
}

export const checkUsername = (username) => {
    let status = true;
    
    const symbols = `~!@#$%^&*()-+=<>,.?/:;"'{[]}\|`;
    for(let i = 0; i<symbols.length; i++){
        if(username.includes(symbols[i])){
            status = false;
            break;
        }
    }
    if(status && username.length < 8){
        status = false;
    }
    
    return status;
}

const utils = { checkPassword, checkUsername };

export default utils;