// connect to database
const slugify = require("slugify")
const Blogs = require("../models/blogs")
const {v4: uuidv4} = require('uuid')
//localhost:8080/install-postman


// save the data
exports.create=(req,res)=>{
    const {title, content, author} = req.body
    let slug = slugify(title)

    if(!slug)slug=uuidv4();

    //validate data
    switch(true) {
        case !title:
            return res.status(400).json({error: "plaese insert title"})
            break;
        case !content:
            return res.status(400).json({error:"please insert content"})
    }

    //old
    // res.json({
    //     data: {title, content, author, slug}
    // })


    // save the data
    Blogs.create({title,content,author,slug})
    .then((blog) => {
        res.json(blog)
      })
      .catch((err) => {
        res.status(400).json({error:"title is duplicate"})
      })

}


// show all data
exports.getAllblogs=(req,res) => {
  Blogs.find({}).exec()
  .then((blog) => {
    res.json(blog)
  })
  .catch((err) => {
    res.status(400).json({error:err})
  })
}


// show data refer to the id
exports.singleBlog=(req,res)=>{
  const {slug} = req.params
  Blogs.findOne({slug}).exec()
  .then((blog) => {
    res.json(blog)
  })
  .catch((err) => {
    res.status(400).json({error:err})
  })
}


// delete data
exports.remove=(req,res)=>{
  const {slug} = req.params
  Blogs.findOneAndDelete({slug}).exec()
  .then((blog) => {
    res.json({
      message:"data already delete"
    })
  })
  .catch((err) => {
    res.status(400).json({error:err})
  })
}


//update data
exports.update=(req,res)=>{
  const {slug} = req.params
  // send data
  const {title,content,author}=req.body
  Blogs.findOneAndUpdate({slug},{title,content,author},{new:true}).exec()
  .then((blog) => {
    res.json({
      message:"data already update"
    })
  })
  .catch((err) => {
    res.status(400).json({error:err})
  })
}