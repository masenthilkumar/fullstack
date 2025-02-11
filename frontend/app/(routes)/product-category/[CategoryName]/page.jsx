import GlobalApi from '@/app/_utilities/GlobalApi'
import React from 'react'
import TopCategoryList from '../_components/TopCategoryList'

async function ProductCategory({params}) {
    const productList=await GlobalApi.getProductsByCategory(params.CategoryName);
    const categoryList=await GlobalApi.getCategoryList(params.CategoryName)

  return (
    <div>      
      <h2 className='p-4 bg-amber-800 text-yellow-300 font-bold text-3xl text-center'>{params.CategoryName}</h2>
      <TopCategoryList />
    </div>
  )
}

export default ProductCategory
