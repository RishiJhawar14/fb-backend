const router = require("express").Router();
const Conversation = require("../models/Conversation");


router.get(`https://graph.facebook.com/v17.0/:id/conversations`, async (req,res) => {
  try {
    const conversation = await Conversation.findByPk(id)
    console.log(conversation);
    return res.status(201).json({ conversation });
  } catch (error) {
    console.log(e + "Failure in conversation api");
    return res.status(500).json({ success: false }); 
  }
})