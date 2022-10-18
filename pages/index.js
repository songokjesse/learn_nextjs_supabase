import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useState} from 'react';
import Navbar from "../components/Navbar";
export const getServerSideProps = async () => {
    const CATEGORY_URL = "https://dummyjson.com/products/categories"
    const PRODUCTS_URL = "https://dummyjson.com/products"

    const [ category_res, products_res] = await Promise.all([
        fetch(CATEGORY_URL),
        fetch(PRODUCTS_URL)
    ])
    const [ categories, products] = await Promise.all([
        category_res.json(),
        products_res.json(),
    ])

    return  { props : {
        categories,
        products
    }
    }
}
export default function Home({categories,products}) {
    const items = products.products
    const [query, setQuery] = useState('')
    //Our search filter function
    console.log(query)
    const searchFilter = (array) => {
        if(query=== "all"){
            return items
        }
        return array.filter(
            (el) => el.category.toLowerCase().includes(query)
        )
    }

//Applying our search filter function to our array of countries recieved from the API
    const filtered = searchFilter(items)

    const handleClick = (e) => {
        e.preventDefault();
        setQuery(e.target.innerText)
      }

    return (

      <div>
      <Head>
        <title>Learn Nextjs</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

          <Navbar/>


          <div className="w-full flex flex-col sm:flex-row flex-grow overflow-hidden">
              <div className="sm:w-1/3 md:1/4 w-full flex-shrink flex-grow-0 p-4">
                  <div className="sticky top-0 p-4 w-full">
                      <ul className="menu bg-base-100 w-56">
                          <li><a onClick={handleClick}>all</a></li>
                                  {categories.map(category => (
                                      <li key={Math.random()}><a onClick={handleClick}>{category}</a></li>
                                  ))}
                      </ul>
                  </div>
              </div>
              <main role="main" className="w-full h-full flex-grow p-3 overflow-auto">
                  <div className="grid grid-cols-2 gap-2">
                      {filtered.map(product => (
                          <div key={product.id}>
                              <div className="card card-compact w-96 bg-base-100 shadow-xl">
                                  <figure><img src={product.thumbnail} alt="Shoes" className="scale-40 w-24 h-24" /></figure>
                                  <div className="card-body">
                                      <h2 className="card-title">{product.title}</h2>
                                      <p>{product.description}</p>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>

              </main>
          </div>



      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
