import { Box, Button, Container, Heading, Input, useColorModeValue, useToast,VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
      name: "",
      price: "",
      image: "",
      url: ""
  });
 const { createProduct } = useProductStore()
 const toast = useToast()
  const handleAddProduct = async () =>{
    const { success, message} = await createProduct(newProduct)
    
    if(!success){
      toast({
        title:"Error",
        description:message,
        status:"error",
        isClosable: true
      })
    }
    else{
      toast({
      title:"Success",
        description:message,
        status:"success",
        isClosable: true
      })
    }
    setNewProduct ({name:"",price:"", image:"",url:""});
  }

  return (
    <Container maxh={Container.sm}>
      <VStack spacing={8}>
        <Heading as ={"h1"} size={"2x1"} mt={8}>Add Item to Wishlist</Heading>
        <Box 
        w={"full"} bg={useColorModeValue("white","gray.800")}
        p={6} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>
            <Input 
            placeholder="Product Name"
            name='name'
            value={newProduct.name}
            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            />
            <Input 
            placeholder="Price"
            price='price'
            value={newProduct.price}
            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
            />            
            <Input 
            placeholder="Image"
            image= 'image'
            value={newProduct.image}
            onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
            />   
                        <Input 
            placeholder="Product Link"
            url= 'url'
            value={newProduct.url}
            onChange={(e) => setNewProduct({...newProduct, url: e.target.value})}
            />   
           <Button colorScheme='pink' onClick={handleAddProduct} w='50%'>
            Add Product</Button>          
          </VStack>
        </Box>      
      </VStack>
    </Container>
  )
}

export default CreatePage