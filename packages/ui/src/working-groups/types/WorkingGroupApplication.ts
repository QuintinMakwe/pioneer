import BN from 'bn.js'

import { asBlock, Block } from '@/common/types'
import { asMember, Member } from '@/memberships/types'

import { WorkingGroupApplicationFieldsFragment, WorkingGroupApplicationMentionFieldsFragment } from '../queries'

import { GroupIdName } from '.'
import { asWorkingGroupName } from './WorkingGroup'

export interface WorkingGroupApplication {
  id: string
  runtimeId: number
  opening: {
    id: string
    type: string
    groupName: string
    groupId: GroupIdName
    rewardPerBlock: BN
  }
  applicant?: Member
  stake: BN
  stakingAccount: string
  status?: string
  createdAtBlock: Block
}

export const asApplication = (fields: WorkingGroupApplicationFieldsFragment): WorkingGroupApplication => ({
  id: fields.id,
  runtimeId: fields.runtimeId,
  opening: {
    id: fields.opening.id,
    type: fields.opening.type,
    groupName: asWorkingGroupName(fields.opening.group.name),
    groupId: fields.opening.group.id as GroupIdName,
    rewardPerBlock: new BN(fields.opening.rewardPerBlock),
  },
  stake: new BN(fields.stake),
  status: fields.status.__typename,
  stakingAccount: fields.stakingAccount,
  createdAtBlock: asBlock(fields.createdInEvent),
})

export interface WorkingGroupApplicationMention {
  id: string
  applicant: Member
  createdAtBlock: Block
  opening: {
    type: string
    shortDescription: string | null | undefined
    description: string | null | undefined
  }
}

export const asWorkingGroupApplicationMention = (
  fields: WorkingGroupApplicationMentionFieldsFragment
): WorkingGroupApplicationMention => ({
  id: fields.id,
  createdAtBlock: asBlock(fields.createdInEvent),
  applicant: asMember(fields.applicant),
  opening: {
    type: fields.opening.type,
    shortDescription: fields.opening.metadata.shortDescription,
    description: fields.opening.metadata.description,
  },
})
