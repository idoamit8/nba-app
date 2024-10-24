import React from "react";
import { Heading, Text, Flex, Card } from "@chakra-ui/react";

interface ScoreCardProps {
  homeTeam: string;
  visitorTeam: string;
  homeScore: string | number;
  visitorScore: string | number;
  scoreDiff: string | number;
  viewMode: "score" | "diff" | "clutch";
  isClutch: boolean;
  interestScore: number; // New prop for interestScore
}

const ScoreCard2: React.FC<ScoreCardProps> = ({
  homeTeam,
  visitorTeam,
  homeScore,
  visitorScore,
  scoreDiff,
  viewMode,
  isClutch,
  interestScore,
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
    >
      <Flex direction="column" alignItems="center">
        <Heading size="md" color="blue.800" textAlign="center" mb={2}>
          {homeTeam} vs {visitorTeam}
        </Heading>

        {viewMode === "score" && (
          <Text mt={2} fontSize="lg" fontWeight="bold">
            Score: {homeScore} - {visitorScore}
          </Text>
        )}

        {viewMode === "diff" && (
          <Text mt={2} fontSize="lg" fontWeight="bold">
            Score Difference: {scoreDiff}
          </Text>
        )}

        {viewMode === "clutch" && (
          <Text mt={2} fontSize="md" fontWeight="bold" color="gray.700">
            Ido Amit's Must-Watch Score: {interestScore}
          </Text>
        )}
      </Flex>
    </Card>
  );
};

export default ScoreCard2;
