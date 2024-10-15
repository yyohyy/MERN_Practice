import { Container,HStack, Icon, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "/store/product";
import { BsStars } from "react-icons/bs";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
	const { fetchProducts, products } = useProductStore();

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);
	console.log("products", products);

	return (
		<Container maxW='container.xl' py={12}>
			<VStack spacing={8}>
				<HStack>
				<Icon as={BsStars} boxSize={6} color='teal.400' /> 
				<Text
					fontSize={"25"}
					fontWeight={"bold"}
					bgGradient={'linear(to-l, blue.300, green.400)'}
					bgClip={"text"}
					textAlign={"center"}
				>
					WishList Picks
				</Text>
				<Icon as={BsStars} boxSize={6} color='teal.400' /> 
				</HStack>
				<SimpleGrid
					columns={{
						base: 1,
						md: 2,
						lg: 3,
					}}
					spacing={10}
					
				>
					{products.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</SimpleGrid>

				{products.length === 0 && (
					<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						No Items in WishList {" "}
						<Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Add an Item
							</Text>
						</Link>
					</Text>
				)}
			</VStack>
		</Container>
	);
};
export default HomePage;