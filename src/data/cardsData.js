export const CARD_ITEMS = [
  {
    type: 'business',
    title: 'Business Professional',
    image: '/cards/SBI__Business.png',
    tag: 'Enterprise'
  },
  {
    type: 'child_plan',
    title: 'Child Plan',
    image: '/cards/SBI__Child Plan.png',
    tag: 'Education'
  },
  {
    type: 'graduation',
    title: 'Graduation Day',
    image: '/cards/SBI__graduation day.png',
    tag: 'Future'
  },
  {
    type: 'happy_family',
    title: 'Happy Family',
    image: '/cards/SBI__Happy Family.png',
    tag: 'Life Cover'
  },
  {
    type: 'new_business',
    title: 'New Business',
    image: '/cards/SBI__New Businessn.png',
    tag: 'Growth'
  },
  {
    type: 'protection',
    title: 'Protection Plan',
    image: '/cards/SBI__Protection Plan.png',
    tag: 'Security'
  },
  {
    type: 'retired_couple',
    title: 'Retired Couple',
    image: '/cards/SBI__Retired Couple.png',
    tag: 'Peace of Mind'
  },
  {
    type: 'retirement',
    title: 'Retirement Plan',
    image: '/cards/SBI__Retirement Plan.png',
    tag: 'Pension'
  },
  {
    type: 'saving',
    title: 'Smart Savings',
    image: '/cards/SBI__Saving.png',
    tag: 'Wealth'
  },
  {
    type: 'wealth',
    title: 'Wealth Plan',
    image: '/cards/SBI__Wealth Plan.png',
    tag: 'Investment'
  }
];

// Helper to generate a shuffled deck of 20 cards (10 pairs)
export function generateDeck() {
  const deck = [];
  CARD_ITEMS.forEach((card) => {
    // Card copy 1
    deck.push({
      id: `${card.type}-1`,
      type: card.type,
      title: card.title,
      image: card.image,
      tag: card.tag,
      isFlipped: false,
      isMatched: false
    });
    // Card copy 2
    deck.push({
      id: `${card.type}-2`,
      type: card.type,
      title: card.title,
      image: card.image,
      tag: card.tag,
      isFlipped: false,
      isMatched: false
    });
  });

  // Fisher-Yates shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}
