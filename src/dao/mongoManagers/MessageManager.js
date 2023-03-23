import  {messagesModel}  from "../models/messages.model.js";


export default class MessagesManager {
    async getMessages() {
        try {
            const messages = await messageModel.find()
            return messages
        } catch (error) {
            console.log(error)
        }
    }

    async addMessage(objMessage) {
        try {
            const newMessage = await messagesModel.create(objMessage)
            return newMessage
        } catch (error) {
            console.log(error)
        }
    }
}


