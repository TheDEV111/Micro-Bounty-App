'use client';

import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Heading,
  Text,
  Badge,
  HStack,
  VStack,
  Button,
  Avatar,
  Box,
  Tooltip,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Clock, DollarSign, User, Star } from 'lucide-react';
import Link from 'next/link';
import { microStxToStx } from '@/lib/stacks';
import { TASK_STATUS_LABELS } from '@/lib/constants';

const MotionCard = motion(Card);

interface TaskCardProps {
  id: number;
  title: string;
  description: string;
  category: string;
  reward: number; // in microSTX
  creator: string;
  status: number;
  deadline?: number;
  workerReputation?: number;
}

export default function TaskCard({
  id,
  title,
  description,
  category,
  reward,
  creator,
  status,
  deadline,
  workerReputation,
}: TaskCardProps) {
  const statusLabel = TASK_STATUS_LABELS[status];
  const rewardInStx = microStxToStx(reward);

  const getStatusColor = () => {
    switch (status) {
      case 0: return 'green';
      case 1: return 'blue';
      case 2: return 'purple';
      case 3: return 'teal';
      case 4: return 'red';
      case 5: return 'orange';
      case 6: return 'gray';
      default: return 'gray';
    }
  };

  return (
    <MotionCard
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      size="sm"
    >
      <CardHeader pb={2}>
        <VStack align="start" spacing={2}>
          <HStack justify="space-between" w="full">
            <Badge colorScheme="pink" fontSize="xs">
              {category}
            </Badge>
            <Badge colorScheme={getStatusColor()} fontSize="xs">
              {statusLabel}
            </Badge>
          </HStack>
          <Link href={`/tasks/${id}`}>
            <Heading
              size="md"
              fontWeight="700"
              cursor="pointer"
              _hover={{ color: 'brand.500' }}
              transition="color 0.3s"
              noOfLines={2}
            >
              {title}
            </Heading>
          </Link>
        </VStack>
      </CardHeader>

      <CardBody py={4}>
        <Text color="gray.600" fontSize="sm" noOfLines={3} mb={4}>
          {description}
        </Text>

        <VStack align="start" spacing={2}>
          <HStack>
            <Box bg="brand.50" p={1.5} borderRadius="md">
              <DollarSign size={14} color="#ff006f" />
            </Box>
            <VStack align="start" spacing={0}>
              <Text fontSize="xs" color="gray.500">Reward</Text>
              <Text fontSize="md" fontWeight="700" color="brand.500">
                {rewardInStx.toFixed(6)} STX
              </Text>
            </VStack>
          </HStack>

          {deadline && (
            <HStack>
              <Box bg="gray.100" p={1.5} borderRadius="md">
                <Clock size={14} color="#6c6f7a" />
              </Box>
              <VStack align="start" spacing={0}>
                <Text fontSize="xs" color="gray.500">Deadline</Text>
                <Text fontSize="sm" fontWeight="600" color="gray.700">
                  Block {deadline}
                </Text>
              </VStack>
            </HStack>
          )}

          <HStack>
            <Avatar size="xs" name={creator} />
            <VStack align="start" spacing={0}>
              <Text fontSize="xs" color="gray.500">Creator</Text>
              <Tooltip label={creator}>
                <Text fontSize="sm" fontWeight="600" color="gray.700">
                  {creator.slice(0, 8)}...{creator.slice(-4)}
                </Text>
              </Tooltip>
            </VStack>
          </HStack>

          {workerReputation !== undefined && (
            <HStack>
              <Box bg="yellow.50" p={1.5} borderRadius="md">
                <Star size={14} fill="#f59e0b" color="#f59e0b" />
              </Box>
              <VStack align="start" spacing={0}>
                <Text fontSize="xs" color="gray.500">Min. Reputation</Text>
                <Text fontSize="sm" fontWeight="600" color="gray.700">
                  {workerReputation}/100
                </Text>
              </VStack>
            </HStack>
          )}
        </VStack>
      </CardBody>

      <CardFooter pt={0}>
        <Link href={`/tasks/${id}`} style={{ width: '100%' }}>
          <Button w="full" size="sm">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </MotionCard>
  );
}
