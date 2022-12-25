import moment from 'moment'
import { useEffect } from 'react';

const Comment = ({comment}) => {

  return (
    <div className="flex mb-4">
      <div className="relative grid grid-cols-1 gap-4 p-4 mb-2 border rounded-lg bg-white shadow-lg">
          <div className="relative flex gap-4">
              {/* <img src={post.author.image.url} className="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20" alt="" loading="lazy" /> */}
              <div className="flex flex-col w-full">
                  <div className="flex flex-row justify-between">
                      <p className="relative text-xl whitespace-nowrap text-gray-600 truncate overflow-hidden">{comment.name}</p>
                      <a className="text-gray-500 text-xl" href="#"><i className="fa-solid fa-trash"></i></a>
                  </div>
                  <p className="text-gray-400 text-sm">{moment(comment.createdAt).format('DD MMM YYYY, hh:ss A')}</p>
              </div>
          </div>
          <p className="max-w-4xl text-gray-600">{comment.comment}</p>
      </div>
    </div>
  );
};

export default Comment;