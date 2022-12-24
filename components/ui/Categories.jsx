import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getCategories } from '../../services'

const Categories = () => {

  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories()
      .then((result) => setCategories(result))
  }, [])
  
  return (
    <div className="hidden flex flex-col space-y-6 p-6 border-b rounded md:block">
      <h2 className="max-w-md text-gray-800 text-xl font-bold font-poppins">Categories</h2>
      <ul className="list-none flex flex-row md:flex-col md:space-y-3">
        {categories.map(category => (
          <Link className="font-semibold text-gray-700 text-sm font-sans underline" key={category.slug} href={`/category/${category.slug}`}>
            {category.name}
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default Categories