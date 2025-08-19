import { Box, Flex, Heading, HStack, Spacer, Link } from "@chakra-ui/react";


const VerticalDivider = () => (
  <Box h="6" w="1px" bg="gray.600" />
);

export function Header() {
  return (
    <Box bg="gray.800" px={4} py={3} color="white" w={"100%"}>
      <Flex alignItems="center">
        <Link href="/" style={{ textDecoration: 'none', color: 'white' }}>
          <Heading size="md">RestaurantDemo</Heading>
        </Link>
        <Spacer />
        <HStack gap={4}>
          <Link href="/menu">Menu</Link>
          <VerticalDivider />
          <Link href="/booking">Book a table</Link>
          <VerticalDivider />
          <Link href="/contact">Contact</Link>
        </HStack>
      </Flex>
    </Box>
  );
}



export default Header;