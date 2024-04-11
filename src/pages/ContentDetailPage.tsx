import { useState } from 'react';
import { Box, Divider, Flex, Icon, Text } from '@chakra-ui/react';
import { FiHeart } from 'react-icons/fi';

function ContentDetailPage() {
  const [contentDetail, setContentDetail] = useState({
    id: 2,
    title: 'another title',
    likes: 127,
    content:
      '<div class="blog-post">        <p>This is an engaging and informative post related to <em>another title</em>. It has been well-received, garnering <strong>5</strong> likes from our readers. Stay tuned for more insights and updates on this topic.</p>\n    </div>\n\n    <div class="blog-post">\n        <h2>another title</h2>\n        <p>This is an engaging and informative post related to <em>another title</em>. It has been well-received, garnering <strong>5</strong> likes from our readers. Stay tuned for more insights and updates on this topic.</p>\n    </div>\n \n    <div class="blog-post">\n        <h2>another title</h2>\n        <p>This is an engaging and informative post related to <em>another title</em>. It has been well-received, garnering <strong>5</strong> likes from our readers. Stay tuned for more insights and updates on this topic.</p>\n    </div>\n \n    <div class="blog-post">\n        <h2>another title</h2>\n        <p>This is an engaging and informative post related to <em>another title</em>. It has been well-received, garnering <strong>5</strong> likes from our readers. Stay tuned for more insights and updates on this topic.</p>\n    </div>\n \n    <div class="blog-post">\n        <h2>another title</h2>\n        <p>This is an engaging and informative post related to <em>another title</em>. It has been well-received, garnering <strong>5</strong> likes from our readers. Stay tuned for more insights and updates on this topic.</p>\n    </div>\n \n    <div class="blog-post">\n        <h2>another title</h2>\n        <p>This is an engaging and informative post related to <em>another title</em>. It has been well-received, garnering <strong>5</strong> likes from our readers. Stay tuned for more insights and updates on this topic.</p>\n    </div>\n \n    <div class="blog-post">\n        <h2>another title</h2>\n        <p>This is an engaging and informative post related to <em>another title</em>. It has been well-received, garnering <strong>5</strong> likes from our readers. Stay tuned for more insights and updates on this topic.</p>\n    </div>\n \n     ',
  });

  const handleLikeUp = () => {
    setContentDetail((prev) => ({
      ...prev,
      likes: prev.likes + 1,
    }));
  };

  return (
    <Flex h={'100%'} flexDirection={'column'}>
      <Box>
        <Text fontSize={32}>{contentDetail.title}</Text>
      </Box>
      <Box flex={1}>
        <Text
          dangerouslySetInnerHTML={{ __html: contentDetail?.content || '' }}
        ></Text>
      </Box>
      <Divider marginY={4} />
      <Flex
        position={'sticky'}
        bottom={0}
        bg={'white'}
        gap={1}
        padding={4}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Icon
          w={6}
          h={6}
          as={FiHeart}
          onClick={handleLikeUp}
          _hover={{ cursor: 'pointer' }}
        />
        <Text fontSize={24}>{contentDetail?.likes}</Text>
      </Flex>
    </Flex>
  );
}

export default ContentDetailPage;
