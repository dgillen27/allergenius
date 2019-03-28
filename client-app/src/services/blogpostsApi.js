let api = require('./apiHelper');


//get blogposts
async function getBlogposts() {
  let resp = await api('/blogposts/');
  return resp.data;
}

//create a blogPost ... make sure you pass user_id and countryId
async function createBlogpost(user_id, countryId, title, content) {
  let resp = await api.post('/blogposts/user/' + user_id, {
    countryId,
    title,
    content
  });
  return resp.data;
}

//get blogposts for a country .. make sure you pass country_id
async function getCountrysBlogposts(country_id) {
  let resp = await api('/blogposts/country/' + country_id);
  return resp.data;
}

//get user's blogposts for a country .. make sure you pass user_id
async function getUsersBlogposts(user_id) {
  let resp = await api('/blogposts/user/' + user_id);
  return resp.data;
}

export {
  getBlogposts,
  getUsersBlogposts,
  getCountrysBlogposts,
  createBlogpost
}