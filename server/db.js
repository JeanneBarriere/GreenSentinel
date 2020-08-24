const mongoose = require('mongoose');
const project_name = 'project';
const user_name = 'user_project_';
const __PASSWORD__ = require('../config/pwd.js');
const pwd = encodeURIComponent(__PASSWORD__);
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://JeanneBarriere:"+pwd+"@greenwatch-qhusr.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,  useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

//USER
const userSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	pseudo : String,
	password : String,
	mail : String,
	day : Number,
	month : Number,
  admin : { type: Boolean, default: false }
});
const User = mongoose.model('User', userSchema);

async function createUser(userData) {
	const user = new User({
		firstName : userData.firstName,
		lastName : userData.lastName,
		pseudo : userData.pseudo,
		password : userData.password,
		mail : userData.mail,
		day : userData.day,
		month : userData.month,
	})
	const result = await user.save();
	console.log(result);
};

async function getUsers(){
	const allUsers = await User.find();
  return allUsers;
}

async function removeUser(mail) {
  const result = await User.deleteOne(mail);
  // indicates the number of deleted documents
  console.log("L'utilisateur a été supprimé :"+result);
}

async function pseudo(pseudo){
  var result = await User.findOne(pseudo);
  console.log("test"+result);
  if(result == null)return false;
  return true;
}

async function mail(mail){
  const result = await User.findOne(mail);
  if(result == null)return false;
  return true;
}

// LES ARTICLES
const articleSchema = new mongoose.Schema({
	title: String,
  author: String,
  body: String,
  resume: String,
	date:  { type: Date, default: Date.now },
  tags: [{type: String}],
	published: { type: Boolean, default: true },
});

const Article = mongoose.model('Article', articleSchema);

async function createArticle(articleData) {
  articleData.tags=articleData.tags.split('#');
  articleData.tags.shift();
	const article = new Article({
	title: articleData.title,
  author: articleData.author,
  body: articleData.body,
  resume: articleData.resume,
	tags: articleData.tags,
	})
	const result = await article.save();
	console.log(result);
};

async function title(title){
  const result = await Article.findOne(title);
  if(result == null)return false;
  return true;
}

async function deleteArticle(id) {
  const result = await Article.deleteOne(id);
}

async function getArticlesRecent(){
	const allArticles = await Article.find().sort({"date":-1}).lean();
  return allArticles;
}

async function getArticles(pageNumber, pageSize, type){

	const articles = await Article
	.find({category : type})
	.skip((pageNumber - 1) * pageSize)
	.limit(pageSize)
	return articles;
}

async function getOneArticle(type){
	const article = await Article
	.find({_id : type}).lean();
	return article;
}

async function getTagsArticles(type){
  const article = await Article.find({  tags :  type, published : true  }).lean();
  //console.log(article);
	return article;
}

async function getUserArticles(type){
  const article = await Article.find({  author :  type}).lean();
	return article;
}

async function hideArticle(id){
  console.log(id);
  await Article.updateOne(id,{$set:{published:"false"}});
}

async function visibleArticle(id){
  await Article.updateOne(id,{$set:{published:"true"}});
  const article = await Article.findOne(id).lean();
  console.log(article.tags);
  await Tags.updateOne({_id:'5ef4cb75c740645f1c7b29ca'},{$addToSet:{list:article.tags}});
}

//Tags
const tagsSchema = new mongoose.Schema({
list: [{type: String}],
});

const Tags = mongoose.model('Tags', tagsSchema);

async function createTags(tagsData) {
  tagsData.list=tagsData.list.split('#');
  tagsData.list.shift();
	const tags = new Tags({
	list: tagsData.list
	})
	const result = await tags.save();
	console.log(result);
};

async function FirtsTags(tagsData) {
	const tags = new Tags({
	list: tagsData.list,
	})
	const result = await tags.save();
	console.log(result);
};

async function getTags(){
	const tags = await Tags
	.find()
	return tags;
};

async function getOneTags(){
	const tags = await Tags
	.find({_id :'5ef4cb75c740645f1c7b29ca'}).lean();
	return tags;
};

async function getListTags(){
	const tags = await Tags
	.find().lean();
	return tags;
};

async function updateTags(tagsData){
  tagsData.list=tagsData.list.split('#');
  console.log(tagsData.list);
  tagsData.list.shift();
  console.log(tagsData.list);
	await Tags.updateOne({_id:'5ef4cb75c740645f1c7b29ca'},{$addToSet:{list:tagsData.list}});
  const result = await getOneTags();
  console.log(result);
};

async function deleteTags(){
  const tags = await Tags
	.findOne({_id :'5ef4cb75c740645f1c7b29ca'},{"list":1}).lean();
  tags.list.forEach(async function(tag){
    var articles = await getTagsArticles(tag);
    if(articles==''){
      await Tags.updateOne({_id:'5ef4cb75c740645f1c7b29ca'},{$pull:{list:{$in:[tag]}}});
    }
  });
}

// LES COMMENTAIRES
const commentSchema = new mongoose.Schema({
  author: String,
  body: String,
	date:  { type: Date, default: Date.now },
  article: String,
});

const Comment = mongoose.model('Comment', commentSchema);

async function createComment(commentData) {
	const comment = new Comment({
  author: commentData.author,
  body: commentData.body,
	article: commentData.article,
	})
	const result = await comment.save();
	console.log(result);
};

async function getCommentArticle(type){
  const comments = await Comment.find({  article :  type}).lean().sort({"date":1});
	return comments;
}

 mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
 	.then(function() {
		console.log('now connected to mongodb!');
    deleteTags();
		//removeArticle('5e1b55a1e16f914c6c5e1814');
    //FirtsTags({list:['ecologie','palmier']});
	})
	.catch(function (err) {
		console.log ("Erreur lors de la connection à mongodb : ", err);
 	})

	module.exports = {createUser, getUsers, removeUser, User, pseudo, mail, createArticle, getUserArticles, deleteArticle, hideArticle,
                    visibleArticle, title,
                    getArticlesRecent, getArticles, getOneArticle,  getTagsArticles, getTags, updateTags, getListTags, getOneTags, deleteTags,
                    createComment, getCommentArticle};
