import React from "react";
import { Box, Button, Flex, Input, Stack } from "@chakra-ui/react";

interface ControlsProps {
  date: string;
  setDate: (date: string) => void;
  viewMode: "score" | "diff" | "clutch";
  setViewMode: (mode: "score" | "diff" | "clutch") => void;
  getScores: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  date,
  setDate,
  viewMode,
  setViewMode,
  getScores,
}) => {
  return (
    <Box
      as="section"
      w="100%"
      maxW="600px"
      mx="auto"
      my={5}
      p={4}
      boxShadow="md"
      borderRadius="md"
      bg="gray.50"
    >
      <Stack spacing={4} align="center">
        {/* Date input */}
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          size="md"
          maxW="300px"
          focusBorderColor="blue.500"
          borderRadius="full"
        />

        {/* Get Scores Button */}
        <Button
          onClick={getScores}
          colorScheme="blue"
          size="md"
          w="100%"
          maxW="300px"
          borderRadius="full"
        >
          Get Scores
        </Button>

        {/* View Mode Buttons */}
        <Flex gap={2} justify="center" flexWrap="wrap">
          <Button
            onClick={() => setViewMode("score")}
            colorScheme={viewMode === "score" ? "blue" : "gray"}
            variant={viewMode === "score" ? "solid" : "outline"}
            size="md"
            borderRadius="full"
          >
            Show Actual Scores
          </Button>
          <Button
            onClick={() => setViewMode("diff")}
            colorScheme={viewMode === "diff" ? "blue" : "gray"}
            variant={viewMode === "diff" ? "solid" : "outline"}
            size="md"
            borderRadius="full"
          >
            Show Score Difference
          </Button>
          <Button
            onClick={() => setViewMode("clutch")}
            colorScheme={viewMode === "clutch" ? "blue" : "gray"}
            variant={viewMode === "clutch" ? "solid" : "outline"}
            size="md"
            borderRadius="full"
          >
            Show Clutch Games
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};

export default Controls;
