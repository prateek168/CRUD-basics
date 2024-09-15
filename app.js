const express  = require('express')
const app = express()
const path = require('path')
const userModel = require ('./models/user')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine" , "ejs")
app.use(express.static(path.join(__dirname,"public")))
port = 4000
app.get('/',(req,res)=>{
  res.render("index")
})
app.get('/read', async(req,res)=>{
 const users = await userModel.find()
  res.render('read',{users})
})
app.post('/create' , async (req,res)=>{
  let { name, email , image} = req.body;
   await userModel.create({
    name,
     email,
     image
  })

 res.redirect('/read');
  
})
app.get('/delete/:id',async (req,res)=>{
  const userId = req.params.id ; 
  await userModel.findOneAndDelete(userId)
 res.redirect('/read')
})
 
app.get('/update/:id', async(req,res)=>{
  editUserId = req.params.id
  const editUser = await userModel.findOne({_id: editUserId})
  const editUsername = editUser.name
  const editUseremail = editUser.email
  const editUserimage = editUser.image
  res.render('update' ,{name : editUsername , email: editUseremail , image : editUserimage ,editUserId})
})
app.post('/update/:id', async (req,res)=>{
  const userId = req.params.id
  const {body , name  , email } = req.body;
 const user = await userModel.findOneAndUpdate({_id:userId}, {name, body, email}, {new:true})
 res.redirect('/read')
})
app.listen(port,()=>{
  console.log("listening...");
})