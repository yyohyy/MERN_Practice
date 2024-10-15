import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useProductStore } from "/store/product";
import { useState } from "react";
import { Link } from 'react-router-dom';
import {Box, Button, Heading, HStack, IconButton, Image,
		Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter,
		ModalHeader, ModalOverlay, Text, useColorModeValue,	useDisclosure,
		useToast, VStack} from "@chakra-ui/react";

const ProductCard = ({ product }) => {
	const [updatedProduct, setUpdatedProduct] = useState(product);

	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");
	const { deleteProduct, updateProduct } = useProductStore();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleDeleteProduct = async (pid) => {
		const { success, message } = await deleteProduct(pid);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const handleUpdateProduct = async (pid, updatedProduct) => {
        console.log(pid,updatedProduct)
		const { success, message } = await updateProduct(pid, updatedProduct);
		onClose();
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: "Product updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<Box
			shadow='lg'
			rounded='lg'
			overflow='hidden'
			transition='all 0.3s'
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={bg}
		>
			<Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
			<Box p={6}>
				<Heading as='h3' size='md' mb={2}  bgClip="text"
             bgGradient="linear(to-l, blue.400, cyan.500)" color='transparent'>
					{product.name}
				</Heading>

				<Text fontWeight='bold' fontSize='s' color={textColor} mb={4}>
					Rs. {product.price}
				</Text>

				<HStack spacing={5} justifyContent="center">
				<Link to={product.url}>
				<Button colorScheme='orange' variant='outline' _hover={"pink"} >
               Link
             </Button>
			 </Link>
			<IconButton
				icon={<EditIcon />}
				onClick={onOpen}
				border='1px' // Add a border
				bg={bg} 
                borderColor='blue.500'
				color='blue'
			/>
			<IconButton
				icon={<DeleteIcon />}
				onClick={() => handleDeleteProduct(product._id)}
				border='1px' // Add a border
				bg={bg} 
                borderColor='pink.500'
				color='red.500'
			/>
				</HStack>
			</Box>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<ModalHeader>Update Product</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder='Product Name'
								name='name'
								value={updatedProduct.name}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
							/>
							<Input
								placeholder='Price'
								name='price'
								type='number'
								value={updatedProduct.price}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
							/>
							<Input
								placeholder='Image URL'
								name='image'
								value={updatedProduct.image}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
							/>
														<Input
								placeholder='Product Link'
								name='url'
								value={updatedProduct.url}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, url: e.target.value })}
							/>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme='blue'
							mr={3}
							onClick={() => handleUpdateProduct(product._id, updatedProduct)}
						>
							Update
						</Button>
						<Button variant='ghost' onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};
export default ProductCard;