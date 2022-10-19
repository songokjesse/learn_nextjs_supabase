import Image from 'next/image'
import {useState} from 'react';
import Link from "next/link";
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
<>

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

                              <div className="card lg:card-side bg-base-100 shadow-xl">
                                  <figure>
                                      <Image
                                          src={product.thumbnail}
                                          alt="Shoes"
                                          className="scale-40 w-24 h-24"
                                          width={300}
                                          height={300}
                                      />
                                  </figure>
                                  <div className="card-body">
                                      <h2 className="card-title">{product.title}</h2>
                                      <p>{product.description}</p>
                                      <div className="card-actions justify-end">
                                          <Link href={'/' + product.id}>
                                              <a className="btn btn-primary">Show </a>
                                          </Link>
                                      </div>
                                  </div>
                              </div>

                          </div>
                      ))}
                  </div>

              </main>
    </>
  )
}
