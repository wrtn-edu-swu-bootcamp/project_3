// lib/types/action.ts
import { ActionItem } from './report';

/** 액션 뱅크 아이템 */
export interface ActionBankItem {
  issue: string;
  recommended: ActionItem;
  alternatives: ActionItem[];
}

/** 액션 뱅크 */
export type ActionBank = Record<string, ActionBankItem>;
