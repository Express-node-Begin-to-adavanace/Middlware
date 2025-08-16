import User from "../infrastructure/schemas/User.js";

export const createUser = async (req,res,next) => {
    try {
        const user = req.body;

    //validate the request data
    if (!user.name || !user.email) {
        res.status(400).send();
        return;
    }

    //Add the user
    await User.create({
        name:user.name,
        email:user.email,
    })

    //return the response
    res.status(201).send();
    return;
    } catch (error) {
      next(error)  
    }
    
}

export const GetAllUsers =async (req,res) => {
    const users = await User.find();
    res.status(200).json(users);
    return;
}