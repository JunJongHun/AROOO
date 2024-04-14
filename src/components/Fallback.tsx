import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from '@chakra-ui/react';

//TODO: 에러 발생 시, 네트워크 에러, 런타임에러 등을 처리하는 Fallback 고려

type FallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

const Fallback = ({ error, resetErrorBoundary }: FallbackProps) => {
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
};

export default Fallback;
