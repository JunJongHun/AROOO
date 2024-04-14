import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

type HitAreaWrapperProps = {
  hitSlop: { top: number; right: number; bottom: number; left: number };
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
};

function HitAreaWrapper({
  hitSlop,
  children,
  onClick,
  disabled = false,
}: HitAreaWrapperProps) {
  return (
    <Flex position={'relative'} justifyContent={'center'} alignItems={'center'}>
      {children}
      <Box
        position={'absolute'}
        top={'50%'}
        left={'50%'}
        transform={'translate(-50%, -50%)'}
        paddingTop={hitSlop.top}
        paddingRight={hitSlop.right}
        paddingBottom={hitSlop.bottom}
        paddingLeft={hitSlop.left}
        onClick={onClick}
        _hover={{ cursor: 'pointer' }}
        aria-disabled={disabled}
      />
    </Flex>
  );
}

export default HitAreaWrapper;
