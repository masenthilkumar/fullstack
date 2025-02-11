import React from 'react'

function TopCategoryList({categorylist}) {
  return (
    <div>
      <div>
        
        <div className='m-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-10 gap-5 items-center justify-between'>
          
            {categorylist.map((category, index) => (
                <Link href={'/product-category/'+category.name} key={index} className='flex flex-col items-center rounded-t-full gap-2 group cursor-pointer hover:bg-yellow-300 bg-yellow-100 hover:scale-125 transition-all ease-in-out duration-500'>                  
                    <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + category.icon.url} alt='' width='40' height='40'></Image>
                    <h2 className='flex text-yellow-900 items-center font-semibold'>{category.name}</h2>
                </Link>
            ))}         
            
        </div>
      </div>
    </div>
  )
}

export default TopCategoryList
