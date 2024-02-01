import NavBar from '@/components/NavBar';
import { axiosClient } from '@/constants';
import ProductService from '@/services/product';
import Image from 'next/image'

export default async function Home() {
  try {
    const { data } = await ProductService.getProducts()
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }

  return (
    <main className="">
      <NavBar />
      helloool
    </main>
  )
}
