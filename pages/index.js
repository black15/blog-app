import Head from 'next/head'
import {useState, useEffect} from 'react'
import {PostCard, PostWidget, Categories} from '../components'
import {getPosts, getRecentPosts} from '../services'

export default function Home({posts}) {

  const [visible, setVisible] = useState(5)

  return (
    <div className='container mx-auto px-4 my-4 mt-20'>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='flex flex-col md:flex-row space-x-8 mb-16'>
        <div className="flex flex-col space-y-6 items-center md:w-3/4">
          {posts.slice(0, visible).map( (post, index) => <PostCard post={post.node} key={index}/>)}
          <button className='text-gray-700 text-sm font-semibold border bg-gray-200 hover:bg-white duration-300 px-4 p-2 shadow rounded' onClick={() => setVisible(prev => prev + 3)}>LOAD MORE</button>
        </div>
        <div className="flex flex-col space-y-2 md:w-1/4 md:fixed md:right-2">
          <PostWidget />
          <Categories />
        </div>
      </div>

    </div>
   )
}

export const getStaticProps = async (content) => {

  const posts = (await getPosts() || [])

  return {
    props: {
      posts
    },
  }
}
