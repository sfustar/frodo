export type QuestClaimStatus = 'success' | 'fail';

export type QuestClaimResponse = {
  status: QuestClaimStatus;
  score: number;
};
