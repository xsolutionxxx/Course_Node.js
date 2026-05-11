import Post from "./Post.js";
import fileService from "./fileService.js";

class PostService {
  async create(post, picture) {
    const fileName = await fileService.saveFile(picture);
    const createdPost = await Post.create({ ...post, picture: fileName });
    return createdPost;
  }

  async getAll() {
    const posts = await Post.findAll();
    return posts;
  }

  async getOne(id) {
    if (!id) {
      throw new Error("Unknown ID");
    }
    const post = await Post.findByPk(id);
    return post;
  }
  async update(post) {
    if (!post.id) {
      throw new Error("Unknown ID");
    }
    const existingPost = await Post.findByPk(post.id);

    if (!existingPost) {
      throw new Error("Post not found");
    }

    await existingPost.update(post);
    return existingPost;
  }

  async delete(id) {
    if (!id) {
      throw new Error("Unknown ID");
    }

    const post = await Post.findByPk(id);
    await post.destroy();
    return { message: "Post deleted successfully" };
  }
}

export default new PostService();
