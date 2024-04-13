import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from '@chakra-ui/react';

type FallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Card align="center">
      <CardHeader>
        <Heading size="md">Sorry, Something is wrong..</Heading>
      </CardHeader>
      <CardBody>
        <Text>{error.message}</Text>
      </CardBody>
      <CardFooter>
        <Button colorScheme="blackAlpha" onClick={resetErrorBoundary}>
          Try Again
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Fallback;
