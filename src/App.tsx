import { Box, Container } from "@chakra-ui/react";
import { Result } from "./generator/result";

import { GraphEditor } from "./generator/graph-editor";

function App() {
  return (
    <Container maxW="full" display="flex">
      <Box flex={"10"} p="2" h="100vh">
        <GraphEditor />
      </Box>
      <Box flex={"3"} p="2">
        <Result />
      </Box>
    </Container>
  );
}

export default App;
