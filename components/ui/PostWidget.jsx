import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import testIMG from '../../public/img/DotBlog_domain_logo.png'
import { getRecentPosts, getRelatedPosts } from '../../services'

const PostWidget = ({ categories, slug }) => {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    if(slug){
      getRelatedPosts(slug, categories)
        .then( result => setPosts(result))
    }
    else{
      getRecentPosts()
        .then(result => setPosts(result))
    }
  }, [categories, slug])
  
  const limit = (string) => {
    return string.substring(0, 50)
  }
  
  return (
    <div className="flex flex-col p-6 space-y-6 border-b rounded">
      <h2 className="max-w-md text-gray-800 text-xl font-bold">{slug ? 'Related' : 'Recent'} posts</h2>
      <div className='flex flex-col space-y-4'>
        {posts.map(post => (
          <Link className="flex flex-row space-x-6 items-center" key={post.slug} href={`/p/${post.slug}`}>
            {/* <img
              className='rounded'
              src={post.image.url}
              alt='test'
              width={60}
              height={60}
            /> */}
            <div className="flex flex-col">
              <small className='text-gray-800'>{moment(post.createdAt).format('YYYY, MMM DD')}</small>
              <span className='text-gray-700 font-semibold'> {post.title} </span>
              <p className="max-w-md text-sm text-gray-700">{limit(post.excerpt)}...</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default PostWidget