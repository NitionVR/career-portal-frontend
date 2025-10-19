import { SelectOption } from '../components/custom-select/custom-select.component';

export const GENDER_OPTIONS: SelectOption[] = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
];

export const RACE_OPTIONS: SelectOption[] = [
  { value: 'Asian', label: 'Asian' },
  { value: 'Black', label: 'Black' },
  { value: 'Caucasian', label: 'Caucasian' },
  { value: 'Hispanic', label: 'Hispanic' },
  { value: 'Other', label: 'Other' },
];

export const DISABILITY_OPTIONS: SelectOption[] = [
  { value: 'None', label: 'None' },
  { value: 'Yes', label: 'Yes' },
  { value: 'Prefer not to say', label: 'Prefer not to say' },
];

export const INDUSTRY_OPTIONS: SelectOption[] = [
  { value: 'Technology', label: 'Technology' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Education', label: 'Education' },
  { value: 'Manufacturing', label: 'Manufacturing' },
  { value: 'Retail', label: 'Retail' },
  { value: 'Other', label: 'Other' },
];

export const EXPERIENCE_LEVEL_OPTIONS: SelectOption[] = [
  { value: 'ENTRY_LEVEL', label: 'Entry Level' },
  { value: 'MID_LEVEL', label: 'Mid Level' },
  { value: 'SENIOR_LEVEL', label: 'Senior Level' },
];

export const CONTRACT_TYPE_OPTIONS: SelectOption[] = [
  { value: 'FULL_TIME', label: 'Full-time' },
  { value: 'PART_TIME', label: 'Part-time' },
  { value: 'CONTRACT', label: 'Contract' },
];

export const WORK_TYPE_OPTIONS: SelectOption[] = [
  { value: 'ON_SITE', label: 'On-site' },
  { value: 'HYBRID', label: 'Hybrid' },
  { value: 'REMOTE', label: 'Remote' },
];
