import {PostDetails, Comment, CommentForm} from '../' 

const PostPage = ({post}) => {

  return (
    <div className='flex flex-col px-10 p-4'>
      <PostDetails post={post} />
      <CommentForm />
      {post.comments.map(comment => <Comment comment={comment}/>)}
    </div>
  )
}

export default PostPage