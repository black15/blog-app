import matter from 'gray-matter';
import { marked } from 'marked';
import moment from 'moment';
import React from 'react'
import Image from 'next/image'

const PostDetails = ({post}) => {

  const getContentFrag = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = (<b key={index}>{text}</b>);
      }

      if (obj.italic) {
        modifiedText = (<em key={index}>{text}</em>);
      }

      if (obj.underline) {
        modifiedText = (<u key={index}>{text}</u>);
      }
    }

    switch (type) {
      case 'heading-two':
        return <h3 key={index} className="text-2xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
      case 'heading-three':
        return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
      case 'paragraph':
        return <p key={index} className="mb-3">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
      case 'heading-four':
        return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
      case 'image':
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      default:
        return modifiedText;
    }
  };

  return (
    <>
      <div className="flex flex-row items-center space-x-6">
        <img
            className='h-16 w-16 rounded-full'
            src={post.author.image.url}
            alt='Author image'
          />
        <div className="flex flex-col">
          <span className="inline text-gray-700">
            {post.author.name}
          </span>
          <span className='text-gray-500 text-sm'>Joined {moment(post.author.createdAt).format('MMM DD, YYYY')}</span>
        </div>
      </div>

      <div className="flex flex-col my-8">
        <h1 className="max-w-4xl text-3xl text-gray-800 font-semibold">{post.title}</h1>
        <span className="text-gray-600 text-sm mt-2">Last Update: {moment(post.updatedAt).format('MMM DD, YYYY')}</span>
        <img
          className='w-full mt-6'
          src={post.image.url}
          alt='Post Image'
        />
        <div className='text-gray-800'>
          {post.content.raw.children.map((typeObj, index) => {
            const children = typeObj.children.map((item, itemIndex) => getContentFrag(itemIndex, item.text, item))
            return getContentFrag(index, children, typeObj, typeObj.type)
          })}
        </div>
      </div>

      <div className="text-center mt-20 mb-8 p-12 relative rounded-lg shadow border bg-gray-100">
        <div className="absolute right-[35%] md:right-[45%] -top-12">
          <Image
            unoptimized
            alt={post.author.name}
            height={100}
            width={100}
            className="rounded-full w-24 h-24"
            src={post.author.image.url}
          />
        </div>
        <h3 className="text-gray-800 mt-4 mb-4 text-xl font-bold">{post.author.name}</h3>
        <p className="text-gray-700 text-ls">{post.author.bio}</p>
      </div>

    </>
  );
};

export default PostDetails;