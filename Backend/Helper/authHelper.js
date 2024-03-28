import bcrypt from "bcrypt"

// PASSWORD HASHING FUNCTION
export const hashPassword = async (password)=>{
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword;
}

//COMPARE PASSWORD
export const comparePassowrd = async (password, hashedPassword)=>{
    return await bcrypt.compare(password, hashedPassword);
}