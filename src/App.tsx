import { Box, Container } from "@chakra-ui/react";
import { Result } from "./generator/result";
import { Generator } from "./generator/generator-ui";
import { Menu } from "./generator/menu";

function App() {
  return (
    <Container maxW="full" display="flex">
      <Box flex={"2"} p="2">
        <Menu />
      </Box>
      <Box flex={"8"} p="2" h="100vh">
        <Generator />
      </Box>
      <Box flex={"3"} p="2">
        <Result />
      </Box>
    </Container>
  );
}

export default App;
