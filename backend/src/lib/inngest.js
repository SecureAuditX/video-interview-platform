import User from "../models/User.js";
import { connectDB } from "./db.js";
import { Inngest } from 'inngest';


export const inngest = new Inngest({id: "interview-platform"})

// webhook (create new user and alert the db)
const syncUser = inngest.createFunction(
    {id: "sync-user"},
    {event: "clerk/user.created"}, // listen to create event
    async ({event}) => {
        await connectDB()

        const {id, email_addresses, first_name, last_name, image_url} = event.data
        
        // object
        const newUser = {
            clerkId: id,
            email: email_addresses[0]?.email_addresses,
            name: `${first_name || ""} ${last_name || ""}`, //check to make sure it is not NULL value
            profileImage: image_url
        }
        await User.create(newUser)
    }
)

// webhook (Delete user and alert the db)
const deleteUserFromDB = inngest.createFunction(
    {id: "delete-user-from-db"},
    {event: "clerk/user.deleted"}, // listen to delete event
    async ({event}) => {
        await connectDB()

        const {id} = event.data

        await User.deleteOne({clerkId: id})
    }
)

export const functions = [syncUser, deleteUserFromDB]