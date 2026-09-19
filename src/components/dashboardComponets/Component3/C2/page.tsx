import React from 'react'
import C1 from "./C1Todo/page"
import C2 from "./C2RecentMembers/page"
function page() {
  return (
    <div className='space-y-6'>
      <C1/>
      <C2/>
    </div>
  )
}

export default page
