import React from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Input,
  Stack,
  Text,
  VStack,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaBasketballBall } from "react-icons/fa";

const ViewModeData = {
  score: {
    label: "Actual Scores",
    description: "View final game scores",
  },
  diff: {
    label: "Score Difference",
    description: "View final point differentials",
  },
  clutch: {
    label: "Clutch Games",
    description: "View scores based on game excitement",
  },
} as const;

type ViewMode = "score" | "diff" | "clutch";

interface ControlsProps {
  date: string;
  setDate: (date: string) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  getScores: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  date,
  setDate,
  viewMode,
  setViewMode,
  getScores,
}) => {
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Card
      w="full"
      mx="auto"
      boxShadow="lg"
      borderRadius="xl"
      borderColor={borderColor}
      borderWidth="1px"
      bg="gray.50"
      my={8}
    >
      <CardHeader>
        <VStack spacing={2}>
          <Flex align="center" gap={3}>
            <FaBasketballBall size={32} color="#1d428a" />
            <Text fontSize="2xl" fontWeight="bold">
              Game Center
            </Text>
          </Flex>
          <Text fontSize="sm" color="gray.500">
            View NBA game scores
          </Text>
        </VStack>
      </CardHeader>

      <CardBody>
        <VStack spacing={6}>
          {/* Date Selection */}
          <Box w="full">
            <Flex justify="space-between" align="center" mb={2}>
              <Text fontSize="sm" fontWeight="medium">
                Select Date
              </Text>
            </Flex>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              size="md"
              borderRadius="lg"
              borderColor={borderColor}
              _focus={{
                borderColor: "blue.500",
                boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
              }}
            />
          </Box>

          {/* Get Scores Button */}
          <Button
            onClick={getScores}
            colorScheme="blue"
            size="lg"
            w="full"
            borderRadius="lg"
            _hover={{ transform: "translateY(-1px)" }}
            transition="all 0.2s"
          >
            Load Games
          </Button>

          {/* View Mode Selection */}
          <Box w="full">
            <Text fontSize="sm" fontWeight="medium" mb={2}>
              View Mode
            </Text>
            <Stack
              spacing={3}
              direction={{ base: "column", md: "row" }}
              w="full"
            >
              {(Object.keys(ViewModeData) as ViewMode[]).map((mode) => (
                <Tooltip
                  key={mode}
                  label={ViewModeData[mode].description}
                  placement="top"
                >
                  <Button
                    onClick={() => setViewMode(mode)}
                    colorScheme={viewMode === mode ? "blue" : "gray"}
                    variant={viewMode === mode ? "solid" : "outline"}
                    size="md"
                    flex={1}
                    borderRadius="lg"
                    _hover={{
                      transform: "translateY(-1px)",
                      boxShadow: "sm",
                    }}
                    transition="all 0.2s"
                  >
                    <VStack spacing={0}>
                      <Text>{ViewModeData[mode].label}</Text>
                      <Text fontSize="xs" opacity={0.8}>
                        {ViewModeData[mode].description}
                      </Text>
                    </VStack>
                  </Button>
                </Tooltip>
              ))}
            </Stack>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default Controls;
