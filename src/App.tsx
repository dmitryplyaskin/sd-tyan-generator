import { Box, Container } from "@chakra-ui/react";
import { Result } from "./generator/result";
import { Generator } from "./generator/generator-ui";

function App() {
  return (
    <Container maxW="full" display="flex">
      <Box flex={"1"} p="2">
        Меню
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
