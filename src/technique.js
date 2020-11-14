const defaultInstructionOptions = { bloomTime: 45, coffeeAmount: 30, waterAmount: 500 };
const createInstructions = (options = defaultInstructionOptions) => {
  const baseInstructions = [
    {
      description: "Bloom Phase",
      duration: options.bloomTime * 1000, // 45 seconds default
      instructions: [
        { message: "Gently pour 60g of water" },
        { message: "Swirl gently until all lumps are gone" },
      ],
    },
    {
      description: "Phase 2 - 60% water",
      duration: 30 * 1000,
      instructions: [
        { message: "Pour until you reach 300g." },
      ],
    },
    {
      description: "Phase 3 - 100% water",
      duration: 30 * 1000,
      instructions: [
        { message: "Gently pour until you reach 500g." },
        { message: "Pour slower, but keep the V60 topped up." },
      ],
    },
    {
      description: "Phase 4 - Drawdown",
      duration: 105 * 1000,
      instructions: [
        { message: "With a spoon, stir a couple of times clockwise and anticlockwise." },
        { message: "Give the v60 one final stir once it has drained a little." },
      ],
    },
    {
      description: "Finished!",
      duration: null,
      instructions: [
        { message: "The brew should now be finished." },
      ],
    },
  ];

  // Add a `startTime` field to each instructions which denotes when the instruction should be shown.
  // This is calculated based on the instruction's duration and the time taken by previous instructions.
  const annotatedInstructions = baseInstructions.reduce(
    ([startTime, instructions], instruction) => [
       startTime + instruction.duration,
       [...instructions, { ...instruction, startTime: startTime }]
    ],
    [0, []]
  )[1];

  return annotatedInstructions;
};

export const instructions = createInstructions();