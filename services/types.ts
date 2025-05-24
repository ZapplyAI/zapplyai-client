export interface Response {
  success: boolean
  response?: any
}

export interface Session {
  ref: string;
  prompt: string
}

export interface UserProfilePlan {
  id: string;
  name: string;
  monthly_fee: string;
  premium_calls_quota: number;
  overage_rate: string;
  context_window: number;
  team_support: boolean;
  description: string;
}

export interface SubscriptionPlanBuckets {
  gemini: number;
  claude: number;
  gpt: number;
}

export interface SubscriptionPlan {
  type: string;
  monthly_price: string;
  total_credits: number;
  buckets: SubscriptionPlanBuckets;
}

export interface UserProfileSubscription {
  id: string;
  plan: UserProfilePlan;
  status: string;
  start_date: string;
  end_date: string;
  next_billing_date: string;
  trial_expiration_date: string;
}

export interface UserProfile {
  id: string;
  email: string;
  email_verified: boolean;
  subscription_id?: string;
  created_at: string;
  subscription?: UserProfileSubscription;
}
