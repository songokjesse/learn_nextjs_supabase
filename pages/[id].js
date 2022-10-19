import Image from "next/image";

export const getStaticPaths = async () => {
    const res = await fetch('https://dummyjson.com/products');
    const data = await res.json();
    const paths = data.products.map(elm => {
        return {
            params: { id: elm.id.toString() }
        }
    })
    return {
            paths,
            fallback: false
    }

}

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const response = await fetch('https://dummyjson.com/products/' + id);
    const product = await response.json();
    return {
        props: {
            product
        }
    }
}


const Product = ({product}) =>  {
    return (
        <>
            <div className="flex-1 flex flex-col sm:flex-row">
                <main className="flex-1 bg-indigo-100">
                    <h1>Product</h1>
                    {product.images.map((image) => (
                        // eslint-disable-next-line react/jsx-key
                        <div>
                            <Image src={image}
                                   width={300}
                                   height={300}
                            />
                        </div>
                    ))}
                </main>

                <nav className="order-first sm:w-32 bg-purple-200">Sidebar</nav>

                <aside className="sm:w-32 bg-yellow-100">Right Sidebar</aside>
            </div>

        </>
    )
}

export default Product;