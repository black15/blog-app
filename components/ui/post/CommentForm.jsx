import { useRef, useState, useEffect } from 'react'
import { submitComment } from '../../../services';
import Modal from '../Modal';

const CommentForm = ({slug}) => {

   const [showModal, setShowModal] = useState(false);
   const [error, setError] = useState(null);

   const nameRef = useRef()
   const emailRef = useRef()
   const commentRef = useRef()
   const storeDataRef = useRef()

   useEffect(() => {
      nameRef.current.value = localStorage.getItem('name')
      emailRef.current.value = localStorage.getItem('email')
   },[])

   const handleSubmit = async (e) => {
      e.preventDefault();

      const {value: name} = nameRef.current
      const {value: email} = emailRef.current
      const {value: comment} = commentRef.current
      const {checked: storeNextTime} = storeDataRef.current
      
      if(storeNextTime) {
         localStorage.setItem('name', name)
         localStorage.setItem('email', email)
      } else {
         localStorage.removeItem('name')
         localStorage.removeItem('email')
      }

      if (!comment) {
         setError('Comment can\'t be empty.')
         return
      }

      const commentObject = {name, email, comment, slug}
      
      submitComment(commentObject)
         .then(res => {
            setError(null)
            nameRef.current.value = ''
            emailRef.current.value = ''
            commentRef.current.value = ''
            setShowModal(true)
         })
   }
   
  return (
    <div className="mb-4">
      <Modal commentRef={commentRef}/>
      <form className="w-full max-w-xl bg-white rounded-lg px-4 pt-2 shadow-lg" method='post'>
        <div className="flex flex-wrap -mx-3 mb-6">
           <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">Add a comment</h2>
           <div className="w-full md:w-full px-3 mb-2 mt-2">
              <input ref={nameRef} className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full py-2 px-3 text-gray-800 font-medium placeholder-gray-400 focus:outline-none focus:bg-white" name="name" placeholder='Full Name' required />
           </div>
           <div className="w-full md:w-full px-3 mb-2 mt-2">
              <input ref={emailRef} className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full py-2 px-3 text-gray-800 font-medium placeholder-gray-400 focus:outline-none focus:bg-white" name="email" placeholder='Email (Secure)' required />
           </div>
           <div className="w-full md:w-full px-3 mb-2 mt-2">
              <textarea ref={commentRef} className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 text-gray-800 font-medium placeholder-gray-400 focus:outline-none focus:bg-white" name="comment" placeholder='Comment ...' required ></textarea>
           </div>
           <div className="w-full md:w-full px-3 mb-2 mt-2">
              <input ref={storeDataRef} type='checkbox' name="storeNextTime" />
              <span className='text-sm text-gray-700 mx-2'>Save my name & email for next time !</span>
           </div>
           <div className="w-full md:w-full flex items-start md:w-full px-3">
              <div className="w-1/2 mr-auto">
              </div>
              <div className="mb-4">
                 <input type='submit' className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100" value='Publish' onClick={handleSubmit} />
              </div>
           </div>
           <div className="max-w-xl my-2 mx-4 px-2">
               <span className="text-red-700 text-sm font-semibold">{error && error}</span>
            </div>
         </div>
      </form>
   </div>
  );
};

export default CommentForm;