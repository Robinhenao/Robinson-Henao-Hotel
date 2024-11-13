import React from 'react';
import { Badge } from '@/src/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '@/src/utils/gql/queries/products';
import { Avatar, AvatarImage } from '@/src/components/ui/avatar';
import { Button } from '@/src/components/ui/button';
import { useRouter } from 'next/router';
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
}

export default function Component() {
  const [products, setProducts] = React.useState([]);
  const router = useRouter();
  useQuery(GET_PRODUCTS, {
    onCompleted: (data) => {
      setProducts(data.productss);
    },
  });
  return (
    <Card>
      <CardHeader className='px-7'>
        <div>
          <CardTitle>Products</CardTitle>
          <CardDescription>Products from your store.</CardDescription>
        </div>
        <Button
          onClick={() => router.push('/products/new')}
          className='px-10'
          variant='default'
        >
          Nuevo
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className='hidden sm:table-cell'>Name</TableHead>
              <TableHead className='hidden sm:table-cell'>
                Description
              </TableHead>
              <TableHead className='hidden md:table-cell'>Stock</TableHead>
              <TableHead className='text-right'>Price</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product: Product) => (
              <TableRow key={product.id} className='bg-accent'>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={product.image} />
                  </Avatar>
                </TableCell>
                <TableCell>
                  <div className='font-medium'>{product.name}</div>
                </TableCell>
                <TableCell className='hidden sm:table-cell'>
                  {product.description}
                </TableCell>
                <TableCell className='hidden sm:table-cell'>
                  <Badge className='text-xs' variant='secondary'>
                    {product.stock}
                  </Badge>
                </TableCell>
                <TableCell className='text-right'>${product.price}</TableCell>
                <TableCell className='hidden md:table-cell'>
                  <div className='flex flex-row gap-5'>
                    <Badge
                      onClick={() => router.push(`/products/${product.id}`)}
                      className='text-xs justify-center w-24'
                      variant='default'
                    >
                      Edit
                    </Badge>
                    <Badge
                      className='text-xs justify-center w-24'
                      variant='default'
                    >
                      Delete
                    </Badge>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
