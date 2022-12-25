import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Categories, PostPage, PostWidget } from '../../components'
import { getPostBySlug, getPosts } from '../../services'

const Post = ({ post }) => {
  const router = useRouter()
  const { slug } = router.query

  const [categories, setCategories] = useState([])

  useEffect(() => {
      post.categories.map(category => {
          setCategories([...categories, category.slug])
      })
  }, [post])
  
  return (
    <div className='container mx-auto p-4 px-6 border-b mt-20'>
      <div className='flex flex-col md:flex-row space-x-8'>
        <div className="flex flex-col space-y-6 md:w-3/4">
          <PostPage post={post} />
        </div>
        <div className="flex flex-col space-y-6 md:w-1/4 md:fixed md:right-2">
          <PostWidget slug={slug} categories={categories}/>
          <Categories />
        </div>
      </div>
    </div>
  )
}

export default Post


export const getStaticProps = async ({ params }) => {
  const post = (await getPostBySlug(params.slug) || null)
  return {
    props: {
        post
    }
  }
}

export const getStaticPaths = async () => {
  const data = (await getPosts() || [])
  const paths = data.map(post => {
    return {
        params: { slug: post.node.slug }
    }
  })
  return {
    paths,
    fallback: false
  }
}