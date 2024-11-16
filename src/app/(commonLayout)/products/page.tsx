import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

const AllProducts = () => {
    const products = [
        {
          id: 1,
          image: "https://code-theme.com/html/findhouses/images/shop/shop-1.jpg",
          title: "Product shop",
          rating: 5,
          originalPrice: 69.97,
          salePrice: 49.97,
        },
        {
          id: 2,
          image: "https://code-theme.com/html/findhouses/images/shop/shop-2.jpg",
          title: "Product shop",
          rating: 5,
          originalPrice: 69.97,
          salePrice: 49.97,
        },
        {
          id: 3,
          image: "https://code-theme.com/html/findhouses/images/shop/shop-3.jpg",
          title: "Product shop",
          rating: 5,
          originalPrice: 69.97,
          salePrice: 49.97,
        },
        {
          id: 4,
          image: "https://code-theme.com/html/findhouses/images/shop/shop-5.jpg",
          title: "Product shop",
          rating: 5,
          originalPrice: 69.97,
          salePrice: 49.97,
        },
        {
          id: 5,
          image: "https://code-theme.com/html/findhouses/images/shop/shop-6.jpg",
          title: "Product shop",
          rating: 5,
          originalPrice: 69.97,
          salePrice: 49.97,
        },
        {
          id: 6,
          image: "https://code-theme.com/html/findhouses/images/shop/shop-7.jpg",
          title: "Product shop",
          rating: 5,
          originalPrice: 69.97,
          salePrice: 49.97,
        },
        {
          id: 7,
          image: "https://code-theme.com/html/findhouses/images/shop/shop-8.jpg",
          title: "Product shop",
          rating: 5,
          originalPrice: 69.97,
          salePrice: 49.97,
        },
        {
          id: 8,
          image: "https://code-theme.com/html/findhouses/images/shop/shop-9.jpg",
          title: "Product shop",
          rating: 5,
          originalPrice: 69.97,
          salePrice: 49.97,
        },
        {
          id: 9,
          image: "https://code-theme.com/html/findhouses/images/shop/shop-4.jpg",
          title: "Product shop",
          rating: 5,
          originalPrice: 69.97,
          salePrice: 49.97,
        },
      ]
    
    return (
        <div className="mt-20">
            
            <div className="container flex-col  mx-auto px-4 py-8">
            <nav className="mb-4">
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>Shop List</li>
        </ol>
      </nav>
      
      <h1 className="text-2xl font-bold mb-8">Shop List</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden bg-white shadow-sm">
            <CardContent className="p-0">
              <Image
                src={product.image}
                alt={product.title}
                width={400}
                height={300}
                className="w-full h-[200px] object-cover"
              />
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
                <div className="flex justify-center mb-2" role="img" aria-label={`${product.rating} out of 5 stars`}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <div className="flex justify-center items-center gap-2">
                  <span className="text-gray-400 line-through text-sm">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-red-500 font-bold">
                    ${product.salePrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                Add To Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

    
      <div className="flex justify-start items-center gap-2 mt-8 mb-8">
        <Button variant="outline" size="sm" className="text-sm">
          Previous
        </Button>
        <Button
          variant="default"
          size="sm"
          className="text-sm bg-red-500 hover:bg-red-600 text-white"
        >
          1
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-sm"
        >
          2
        </Button>
        <Button variant="outline" size="sm" className="text-sm">
          3
        </Button>
        <Button variant="outline" size="sm" className="text-sm">
          4
        </Button>
        <Button variant="outline" size="sm" className="text-sm">
          5
        </Button>
        <Button variant="outline" size="sm" className="text-sm">
          Next
        </Button>
      </div>

    </div>
 

        </div>
    );
};

export default AllProducts;
