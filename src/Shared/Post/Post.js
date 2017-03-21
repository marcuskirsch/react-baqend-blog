import { db } from 'baqend';

const PostService = {

  posts: [],

  getPosts: function() {
    if (this.posts.length) {
      return Promise.resolve(this.posts);
    } else {
      return db.ready(() => {
        return db.Post.find()
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
          .singleResult();
      });
  },

  createPost: function(post){
    var post = new db.Post(post);
    return post.insert();
  },

  updatePost: function(post){
    return post
      .update();
  },

  deletePost: function(post) {
    return db.ready(() => {
        return post.delete();
    });
  }
};

export default PostService;
