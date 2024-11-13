import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/src/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';
import { Input } from '@/src/components/ui/input';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_PRODUCT_BY_ID } from '@/src/utils/gql/queries/products';
import { UPSERT_PRODUCT } from '@/src/utils/gql/mutations/products';
import ReactLoading from 'react-loading';
import { useToast } from '@/src/hooks/use-toast';

const formSchema = z.object({
  image: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.string(),
  stock: z.string(),
});

export async function getServerSideProps(context: { params: { id: string } }) {
  const id = context.params.id;
  return {
    props: { id },
  };
}

const Index = ({ id }: { id: string }) => {
  const { toast } = useToast();
  const [getProduct, { loading: querieLoading }] = useLazyQuery(
    GET_PRODUCT_BY_ID,
    {
      fetchPolicy: 'network-only',
      onCompleted(data) {
        console.log('data :>> ', data);
        const product = {
          ...data.products,
          price: data.products.price.toString(),
          stock: data.products.stock.toString(),
        };
        form.reset(product);
      },
    }
  );
  const [upsertProduct, { loading: mutationLoading }] =
    useMutation(UPSERT_PRODUCT);

  React.useEffect(() => {
    if (id !== 'new') {
      getProduct({ variables: { productsId: id } });
    }
  }, [id]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: '',
      name: '',
      description: '',
      price: '',
      stock: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    const formData = {
      ...values,
      price: parseInt(values.price),
      stock: parseInt(values.stock),
    };
    const data = {
      create: formData,
      update: formData,
    };
    await upsertProduct({
      variables: {
        where: {
          id: id === 'new' ? '' : id,
        },
        data,
      },
    })
      .then(() => {
        toast({
          variant: 'success',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
        });
      })
      .catch(() => {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
        });
      });
  }

  if (querieLoading || mutationLoading)
    return (
      <ReactLoading type='bars' color='#FFFFF' height={'20%'} width={'20%'} />
    );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='image'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input placeholder='shadcn' {...field} />
              </FormControl>
              <FormDescription>This is your product image.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='shadcn' {...field} />
              </FormControl>
              <FormDescription>This is your product Name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder='shadcn' {...field} />
              </FormControl>
              <FormDescription>
                This is your product description
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type='number' placeholder='shadcn' {...field} />
              </FormControl>
              <FormDescription>This is your product Price</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='stock'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input type='number' placeholder='shadcn' {...field} />
              </FormControl>
              <FormDescription>This is your product Stock</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
};

export default Index;
