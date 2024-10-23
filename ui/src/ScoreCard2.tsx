import React from 'react';
import { Heading, Text, Badge, Flex } from '@chakra-ui/react';
import { Tooltip } from './components/Tooltip';
import { Card } from './components/Card';

interface ScoreCardProps {
  homeTeam: string;
  visitorTeam: string;
  homeScore: string | number;
  visitorScore: string | number;
  scoreDiff: string | number;
  viewMode: 'score' | 'diff' | 'clutch';
  status: string;
  isClutch: boolean;
}

const ScoreCard: React.FC<ScoreCardProps> = ({
  homeTeam,
  visitorTeam,
  homeScore,
  visitorScore,
  scoreDiff,
  viewMode,
  status,
  isClutch,
}) => {
  return (
    <Card
      mb={4}
      shadow="md"
      p={4}
      borderRadius="lg"
      border="1px solid"
      borderColor="gray.300"
      bg="gray.50"
      position="relative"
    >
      <Flex direction="column">
        <Heading size="md" color="blue.800" textAlign="center">
          {homeTeam} vs {visitorTeam}
        </Heading>

        {viewMode === 'score' && (
          <Text mt={2} fontSize="lg" fontWeight="bold" textAlign="center">
            Score: {homeScore} - {visitorScore}
          </Text>
        )}
        {viewMode === 'diff' && (
          <Text mt={2} fontSize="lg" fontWeight="bold" textAlign="center">
            Score Difference: {scoreDiff}
          </Text>
        )}
        {viewMode === 'clutch' && isClutch && (
          <Tooltip label="This game ended with a score difference of less than 10 points" bgColor="gray" color="white">
            <Badge
              bg="orangeRed"
              color="white"
              position="absolute"
              top="10px"
              right="10px"
              fontSize="sm"
              px={2}
              py={1}
              cursor="pointer"
            >
              Clutch Game
            </Badge>
          </Tooltip>
        )}

        <Text mt={4} textAlign="center" fontStyle="italic">
          Status: {status}
        </Text>
      </Flex>
    </Card>
  );
};

export default ScoreCard;