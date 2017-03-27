import { db } from 'baqend';

const PostService = {

  posts: [],

  getPosts: function() {
    return db.ready(() => {
      return db.Post.find()
        .equal('active', true)
        .descending('createdAt')
        .resultList()
        .then( result => {
          this.posts = result;
          return this.posts;
        });
    });
  },

  getProtectedPosts: function() {
    if (this.posts.length) {
      return Promise.resolve(this.posts);
    } else {
      return db.ready(() => {
        return db.Post.find()
          .descending('createdAt')
          .resultList()
          .then( result => {
            this.posts = result;
            return this.posts;
          });
      });
    }
  },

  getPost: function(alias) {
    return db.ready(() => {
        return db.Post.find()
          .equal('alias', alias)
          .singleResult();
      });
  },

  getProtectedPost: function(slug) {
    return db.ready(() => {
        return db.Post.find()
          .equal('slug', slug)
          .singleResult()
          .then(result => {
            if (result.images === null) {
              result.images = new db.List();
              return result;
            } else {
              return result;
            }
          });
      });
  },

  createPost: function(post){
    var tempPost = new db.Post(post);
    tempPost.slug = new Date().getTime();
    this.posts.push(tempPost);

    return tempPost.insert({refresh: true});
  },

  updatePost: function(post){
    return post
      .update();
  },

  deletePost: function(post) {
    return db.ready(() => {
      return post.delete().then(() => {
        const index = this.posts.indexOf(post);
        this.posts.splice(index, 1);

        return this.posts;
      });
    });
  }
};

export default PostService;
