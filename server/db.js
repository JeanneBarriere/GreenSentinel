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

async function removeUser(id) {
  const result = await User.deleteOne({_id: id});
  // indicates the number of deleted documents
  console.log("L'utilisateur a été supprimé :"+result);
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
  delete: { type: Boolean, default: false }
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
	published: articleData.published,
  delete: articleData.delete,
	})
	const result = await article.save();
	console.log(result);
};

async function getAllArticles(){
	const allArticles = await Article.find();
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
	.find({title : type}).lean();
	return article;
}

async function getTagsArticles(type){
  const article = await Article.find({  tags :  type  }).lean();
	return article;
}

async function removeArticle(id) {
  const result = await Article.deleteOne({_id: id});
  // indicates the number of deleted documents
  console.log("L'article a été supprimée :"+result);
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
	.find({_id :'5ef4cb75c740645f1c7b29ca'});
	return tags;
};

async function getListTags(){
	const tags = await Tags
	.find().lean();
  console.log(tags);
	return tags;
};

async function updateTags(tagsData){
  tagsData.list=tagsData.list.split('#');
  tagsData.list.shift();
	await Tags.updateOne({_id:'5ef4cb75c740645f1c7b29ca'},{$addToSet:{list:tagsData.list}});
  const result = await getOneTags();
  console.log(result);
};

 mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
 	.then(function() {
		console.log('now connected to mongodb!');
		//removeArticle('5e1b55a1e16f914c6c5e1814');
    //FirtsTags({list:['ecologie','palmier']});
	})
	.catch(function (err) {
		console.log ("Erreur lors de la connection à mongodb : ", err);
 	})

	module.exports = {createUser, getUsers, removeUser, User, createArticle,
                    getArticles, getAllArticles, getOneArticle,  getTagsArticles, getTags, updateTags, getListTags, getOneTags};
