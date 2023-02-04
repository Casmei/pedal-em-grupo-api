export type UserToPedalType = {
  id: number;
  subscription_pedal: Date;
  user: SubscriptionUser;
};

export type SubscriptionUser = {
  id: number;
  name: string;
  email: string;
};
