import Image from 'next/image';
import React from 'react'
import moment from 'moment';
import Link from 'next/link';
import { getPosts } from '../../services';

const PostCard = ({post}) => {
  
  const limit = (string) => {
    return string.substring(0, 200)
  }

  return (
    <div className='container mx-auto p-4 px-6 border-b'>
      <div className="flex flex-row items-center space-x-6 my-2">
        <Link className='flex flex-row md:items-center space-x-2' href={`/author/${post.author.name}`}>
          <Image
            unoptimized
            className='h-8 w-8 rounded-full'
            src={post.author.image.url}
            alt='Author image'
            width={100}
            height={100}
          />
          <span className="inline text-gray-700 font-semibold">
            {post.author.name}
          </span>
        </Link>
        <small className='max-w-lg text-gray-600'>
          {moment(post.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}
        </small>
      </div>
      <Link className="flex flex-row justify-between space-x-6" href={`/p/${post.slug}`}>
        <div>
          <h1 className="max-w-lg text-xl text-gray-800 font-bold mb-2">
            {post.title}
          </h1>
          <p className="max-w-2xl text-sm text-gray-700">
            {limit(post.excerpt)}...
          </p>
        </div>
        <Image
          unoptimized
          className='rounded'
          src={post.image.url}
          alt='Image'
          width={220}
          height={220}
        />
      </Link>
      <div className="flex flex-row items-center space-x-6">
        {post.categories.map( category => (
          <Link href={`/category/${category.slug}`} className="max-w-lg text-gray-600 text-sm font-semibold rounded underline" key={category.id}>
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default PostCard