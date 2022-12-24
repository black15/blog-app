const Comment = (props) => {
  return (
    <div className="mb-4">
      <form className="w-full max-w-xl bg-white rounded-lg px-4 pt-2 shadow-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
           <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">Add a comment</h2>
           <div className="w-full md:w-full px-3 mb-2 mt-2">
              <input className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full py-2 px-3 text-gray-800 font-medium placeholder-gray-400 focus:outline-none focus:bg-white" name="name" placeholder='Full Name' required />
           </div>
           <div className="w-full md:w-full px-3 mb-2 mt-2">
              <input className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full py-2 px-3 text-gray-800 font-medium placeholder-gray-400 focus:outline-none focus:bg-white" name="email" placeholder='Email (Secure)' required />
           </div>
           <div className="w-full md:w-full px-3 mb-2 mt-2">
              <textarea className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 text-gray-800 font-medium placeholder-gray-400 focus:outline-none focus:bg-white" name="body" placeholder='Comment ...' required ></textarea>
           </div>
           <div className="w-full md:w-full flex items-start md:w-full px-3">
              <div className="w-1/2 mr-auto">
              </div>
              <div className="mb-4">
                 <input type='submit' className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100" value='Publish' />
              </div>
           </div>
         </div>
      </form>
   </div>
  );
};

export default Comment;