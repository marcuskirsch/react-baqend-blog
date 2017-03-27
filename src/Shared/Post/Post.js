import { db } from 'baqend';

const PostService = {
  imagePath: '/www/images/posts/',
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
  },

  uploadImage: function(post, data) {
    const file = new db.File({
      data: data,
      parent: this.imagePath + post.key
    })

    return file
      .upload()
      .then((file) => {
        //upload succeed successfully
        post.images.push(file)

        return post.save()
      });
  },

  uploadPreviewImage: function(post, data) {
    const file = new db.File({
      data: data,
      parent: this.imagePath + post.key
    })

    return file
      .upload()
      .then((file) => {
        //upload succeed successfully
         post.preview_image = file;

        return post.save()
      });
  },

  deletePreview: function(post) {
    return post
      .preview_image
      .delete()
      .then(() => {
        post.preview_image = null
        return post.save()
      });
  },

  deleteImage: function(post, image) {
    return image
      .delete()
      .then(() => {
        const index = post.images.indexOf(image)
        post.images.splice(index, 1)

        return post.save()
      });
  }
};

export default PostService;
