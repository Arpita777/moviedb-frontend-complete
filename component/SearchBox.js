import React from 'react'

const SearchBox = ({value,onChange}) => {
  return(
    <input
     name="query"
     type="text"
     className="form-control my-3"
     placeholder="Search..."
     value={value}
     onChange={e=>onChange(e.target.value)} 
    />
  )

}
export default SearchBox