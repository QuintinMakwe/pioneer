import * as Types from '../../../common/api/queries/__generated__/baseTypes.generated'

import {
  MemberFieldsFragment,
  MemberFieldsFragmentDoc,
} from '../../../memberships/queries/__generated__/members.generated'
import { gql } from '@apollo/client'

import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type ProposalFieldsFragment = {
  __typename: 'Proposal'
  id: string
  title: string
  statusSetAtTime: any
  createdAt: any
  status:
    | { __typename: 'ProposalStatusDeciding' }
    | { __typename: 'ProposalStatusGracing' }
    | { __typename: 'ProposalStatusDormant' }
    | { __typename: 'ProposalStatusVetoed' }
    | { __typename: 'ProposalStatusExecuted' }
    | { __typename: 'ProposalStatusExecutionFailed' }
    | { __typename: 'ProposalStatusSlashed' }
    | { __typename: 'ProposalStatusRejected' }
    | { __typename: 'ProposalStatusExpired' }
    | { __typename: 'ProposalStatusCancelled' }
    | { __typename: 'ProposalStatusCanceledByRuntime' }
  details:
    | { __typename: 'SignalProposalDetails' }
    | { __typename: 'RuntimeUpgradeProposalDetails' }
    | { __typename: 'FundingRequestProposalDetails' }
    | { __typename: 'SetMaxValidatorCountProposalDetails' }
    | { __typename: 'CreateWorkingGroupLeadOpeningProposalDetails' }
    | { __typename: 'FillWorkingGroupLeadOpeningProposalDetails' }
    | { __typename: 'UpdateWorkingGroupBudgetProposalDetails' }
    | { __typename: 'DecreaseWorkingGroupLeadStakeProposalDetails' }
    | { __typename: 'SlashWorkingGroupLeadProposalDetails' }
    | { __typename: 'SetWorkingGroupLeadRewardProposalDetails' }
    | { __typename: 'TerminateWorkingGroupLeadProposalDetails' }
    | { __typename: 'AmendConstitutionProposalDetails' }
    | { __typename: 'CancelWorkingGroupLeadOpeningProposalDetails' }
    | { __typename: 'SetMembershipPriceProposalDetails' }
    | { __typename: 'SetCouncilBudgetIncrementProposalDetails' }
    | { __typename: 'SetCouncilorRewardProposalDetails' }
    | { __typename: 'SetInitialInvitationBalanceProposalDetails' }
    | { __typename: 'SetInitialInvitationCountProposalDetails' }
    | { __typename: 'SetMembershipLeadInvitationQuotaProposalDetails' }
    | { __typename: 'SetReferralCutProposalDetails' }
    | { __typename: 'CreateBlogPostProposalDetails' }
    | { __typename: 'EditBlogPostProposalDetails' }
    | { __typename: 'LockBlogPostProposalDetails' }
    | { __typename: 'UnlockBlogPostProposalDetails' }
    | { __typename: 'VetoProposalDetails' }
  creator: { __typename: 'Membership' } & MemberFieldsFragment
}

export type VoteFieldsFragment = {
  __typename: 'ProposalVotedEvent'
  id: string
  voteKind: Types.ProposalVoteKind
  votingRound: number
  voter: { __typename: 'Membership' } & MemberFieldsFragment
}

export type VoteWithDetailsFieldsFragment = {
  __typename: 'ProposalVotedEvent'
  rationale: string
  inBlock: number
  createdAt: any
  network: Types.Network
  proposalId: string
} & VoteFieldsFragment

export type ProposalWithDetailsFieldsFragment = {
  __typename: 'Proposal'
  stakingAccount?: Types.Maybe<string>
  description: string
  statusSetAtBlock: number
  votes: Array<{ __typename: 'ProposalVotedEvent' } & VoteFieldsFragment>
  createdInEvent: { __typename: 'ProposalCreatedEvent'; inBlock: number; createdAt: any; network: Types.Network }
  proposalStatusUpdates: Array<{
    __typename: 'ProposalStatusUpdatedEvent'
    inBlock: number
    createdAt: any
    network: Types.Network
    newStatus:
      | { __typename: 'ProposalStatusDeciding' }
      | { __typename: 'ProposalStatusGracing' }
      | { __typename: 'ProposalStatusDormant' }
  }>
  details:
    | { __typename: 'SignalProposalDetails' }
    | {
        __typename: 'RuntimeUpgradeProposalDetails'
        newRuntimeBytecode?: Types.Maybe<{ __typename: 'RuntimeWasmBytecode'; id: string }>
      }
    | {
        __typename: 'FundingRequestProposalDetails'
        destinationsList?: Types.Maybe<{
          __typename: 'FundingRequestDestinationsList'
          destinations: Array<{ __typename: 'FundingRequestDestination'; amount: any; account: string }>
        }>
      }
    | { __typename: 'SetMaxValidatorCountProposalDetails' }
    | {
        __typename: 'CreateWorkingGroupLeadOpeningProposalDetails'
        stakeAmount: any
        unstakingPeriod: number
        rewardPerBlock: any
        metadata?: Types.Maybe<{ __typename: 'WorkingGroupOpeningMetadata'; description?: Types.Maybe<string> }>
        group?: Types.Maybe<{ __typename: 'WorkingGroup'; id: string; name: string }>
      }
    | { __typename: 'FillWorkingGroupLeadOpeningProposalDetails' }
    | { __typename: 'UpdateWorkingGroupBudgetProposalDetails' }
    | {
        __typename: 'DecreaseWorkingGroupLeadStakeProposalDetails'
        amount: any
        lead?: Types.Maybe<{
          __typename: 'Worker'
          createdAt: any
          group: { __typename: 'WorkingGroup'; id: string; name: string }
          membership: { __typename: 'Membership' } & MemberFieldsFragment
        }>
      }
    | {
        __typename: 'SlashWorkingGroupLeadProposalDetails'
        amount: any
        lead?: Types.Maybe<{
          __typename: 'Worker'
          createdAt: any
          group: { __typename: 'WorkingGroup'; id: string; name: string }
          membership: { __typename: 'Membership' } & MemberFieldsFragment
        }>
      }
    | { __typename: 'SetWorkingGroupLeadRewardProposalDetails' }
    | { __typename: 'TerminateWorkingGroupLeadProposalDetails' }
    | { __typename: 'AmendConstitutionProposalDetails' }
    | { __typename: 'CancelWorkingGroupLeadOpeningProposalDetails' }
    | { __typename: 'SetMembershipPriceProposalDetails' }
    | { __typename: 'SetCouncilBudgetIncrementProposalDetails' }
    | { __typename: 'SetCouncilorRewardProposalDetails' }
    | { __typename: 'SetInitialInvitationBalanceProposalDetails' }
    | { __typename: 'SetInitialInvitationCountProposalDetails' }
    | { __typename: 'SetMembershipLeadInvitationQuotaProposalDetails' }
    | { __typename: 'SetReferralCutProposalDetails' }
    | { __typename: 'CreateBlogPostProposalDetails' }
    | { __typename: 'EditBlogPostProposalDetails' }
    | { __typename: 'LockBlogPostProposalDetails' }
    | { __typename: 'UnlockBlogPostProposalDetails' }
    | { __typename: 'VetoProposalDetails' }
  discussionThread: {
    __typename: 'ProposalDiscussionThread'
    discussionPosts: Array<{ __typename: 'ProposalDiscussionPost' } & DiscussionPostFieldsFragment>
    mode: { __typename: 'ProposalDiscussionThreadModeOpen' } | { __typename: 'ProposalDiscussionThreadModeClosed' }
  }
} & ProposalFieldsFragment

export type DiscussionPostFieldsFragment = {
  __typename: 'ProposalDiscussionPost'
  repliesTo?: Types.Maybe<{ __typename: 'ProposalDiscussionPost' } & DiscussionPostWithoutReplyFieldsFragment>
} & DiscussionPostWithoutReplyFieldsFragment

export type DiscussionPostWithoutReplyFieldsFragment = {
  __typename: 'ProposalDiscussionPost'
  id: string
  createdAt: any
  updatedAt?: Types.Maybe<any>
  text: string
  createdInEvent: {
    __typename: 'ProposalDiscussionPostCreatedEvent'
    createdAt: any
    inBlock: number
    network: Types.Network
  }
  author: { __typename: 'Membership' } & MemberFieldsFragment
}

export type GetProposalsQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.ProposalWhereInput>
}>

export type GetProposalsQuery = {
  __typename: 'Query'
  proposals: Array<{ __typename: 'Proposal' } & ProposalFieldsFragment>
}

export type GetProposalQueryVariables = Types.Exact<{
  where: Types.ProposalWhereUniqueInput
}>

export type GetProposalQuery = {
  __typename: 'Query'
  proposal?: Types.Maybe<{ __typename: 'Proposal' } & ProposalWithDetailsFieldsFragment>
}

export type GetVoteWithDetailsQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetVoteWithDetailsQuery = {
  __typename: 'Query'
  proposalVotedEventByUniqueInput?: Types.Maybe<{ __typename: 'ProposalVotedEvent' } & VoteWithDetailsFieldsFragment>
}

export type GetRuntimeWasmBytecodeQueryVariables = Types.Exact<{
  where: Types.RuntimeWasmBytecodeWhereUniqueInput
}>

export type GetRuntimeWasmBytecodeQuery = {
  __typename: 'Query'
  runtime?: Types.Maybe<{ __typename: 'RuntimeWasmBytecode'; id: string; bytecode: any }>
}

export const VoteFieldsFragmentDoc = gql`
  fragment VoteFields on ProposalVotedEvent {
    id
    voteKind
    voter {
      ...MemberFields
    }
    votingRound
  }
  ${MemberFieldsFragmentDoc}
`
export const VoteWithDetailsFieldsFragmentDoc = gql`
  fragment VoteWithDetailsFields on ProposalVotedEvent {
    ...VoteFields
    rationale
    inBlock
    createdAt
    network
    proposalId
  }
  ${VoteFieldsFragmentDoc}
`
export const ProposalFieldsFragmentDoc = gql`
  fragment ProposalFields on Proposal {
    id
    title
    status {
      __typename
    }
    statusSetAtTime
    details {
      __typename
    }
    creator {
      ...MemberFields
    }
    createdAt
  }
  ${MemberFieldsFragmentDoc}
`
export const DiscussionPostWithoutReplyFieldsFragmentDoc = gql`
  fragment DiscussionPostWithoutReplyFields on ProposalDiscussionPost {
    id
    createdAt
    createdInEvent {
      createdAt
      inBlock
      network
    }
    updatedAt
    author {
      ...MemberFields
    }
    text
  }
  ${MemberFieldsFragmentDoc}
`
export const DiscussionPostFieldsFragmentDoc = gql`
  fragment DiscussionPostFields on ProposalDiscussionPost {
    ...DiscussionPostWithoutReplyFields
    repliesTo {
      ...DiscussionPostWithoutReplyFields
    }
  }
  ${DiscussionPostWithoutReplyFieldsFragmentDoc}
`
export const ProposalWithDetailsFieldsFragmentDoc = gql`
  fragment ProposalWithDetailsFields on Proposal {
    ...ProposalFields
    stakingAccount
    description
    statusSetAtBlock
    votes {
      ...VoteFields
    }
    createdInEvent {
      inBlock
      createdAt
      network
    }
    proposalStatusUpdates {
      inBlock
      createdAt
      network
      newStatus {
        __typename
      }
    }
    details {
      __typename
      ... on FundingRequestProposalDetails {
        destinationsList {
          destinations {
            amount
            account
          }
        }
      }
      ... on CreateWorkingGroupLeadOpeningProposalDetails {
        metadata {
          description
        }
        stakeAmount
        unstakingPeriod
        rewardPerBlock
        group {
          id
          name
        }
      }
      ... on DecreaseWorkingGroupLeadStakeProposalDetails {
        lead {
          createdAt
          group {
            id
            name
          }
          membership {
            ...MemberFields
          }
        }
        amount
      }
      ... on SlashWorkingGroupLeadProposalDetails {
        lead {
          createdAt
          group {
            id
            name
          }
          membership {
            ...MemberFields
          }
        }
        amount
      }
      ... on RuntimeUpgradeProposalDetails {
        newRuntimeBytecode {
          id
        }
      }
    }
    discussionThread {
      discussionPosts {
        ...DiscussionPostFields
      }
      mode {
        __typename
      }
    }
  }
  ${ProposalFieldsFragmentDoc}
  ${VoteFieldsFragmentDoc}
  ${MemberFieldsFragmentDoc}
  ${DiscussionPostFieldsFragmentDoc}
`
export const GetProposalsDocument = gql`
  query getProposals($where: ProposalWhereInput) {
    proposals(where: $where) {
      ...ProposalFields
    }
  }
  ${ProposalFieldsFragmentDoc}
`

/**
 * __useGetProposalsQuery__
 *
 * To run a query within a React component, call `useGetProposalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProposalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProposalsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetProposalsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetProposalsQuery, GetProposalsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetProposalsQuery, GetProposalsQueryVariables>(GetProposalsDocument, options)
}
export function useGetProposalsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetProposalsQuery, GetProposalsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetProposalsQuery, GetProposalsQueryVariables>(GetProposalsDocument, options)
}
export type GetProposalsQueryHookResult = ReturnType<typeof useGetProposalsQuery>
export type GetProposalsLazyQueryHookResult = ReturnType<typeof useGetProposalsLazyQuery>
export type GetProposalsQueryResult = Apollo.QueryResult<GetProposalsQuery, GetProposalsQueryVariables>
export const GetProposalDocument = gql`
  query getProposal($where: ProposalWhereUniqueInput!) {
    proposal: proposalByUniqueInput(where: $where) {
      ...ProposalWithDetailsFields
    }
  }
  ${ProposalWithDetailsFieldsFragmentDoc}
`

/**
 * __useGetProposalQuery__
 *
 * To run a query within a React component, call `useGetProposalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProposalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProposalQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetProposalQuery(baseOptions: Apollo.QueryHookOptions<GetProposalQuery, GetProposalQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetProposalQuery, GetProposalQueryVariables>(GetProposalDocument, options)
}
export function useGetProposalLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetProposalQuery, GetProposalQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetProposalQuery, GetProposalQueryVariables>(GetProposalDocument, options)
}
export type GetProposalQueryHookResult = ReturnType<typeof useGetProposalQuery>
export type GetProposalLazyQueryHookResult = ReturnType<typeof useGetProposalLazyQuery>
export type GetProposalQueryResult = Apollo.QueryResult<GetProposalQuery, GetProposalQueryVariables>
export const GetVoteWithDetailsDocument = gql`
  query GetVoteWithDetails($id: ID!) {
    proposalVotedEventByUniqueInput(where: { id: $id }) {
      ...VoteWithDetailsFields
    }
  }
  ${VoteWithDetailsFieldsFragmentDoc}
`

/**
 * __useGetVoteWithDetailsQuery__
 *
 * To run a query within a React component, call `useGetVoteWithDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVoteWithDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVoteWithDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetVoteWithDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<GetVoteWithDetailsQuery, GetVoteWithDetailsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetVoteWithDetailsQuery, GetVoteWithDetailsQueryVariables>(GetVoteWithDetailsDocument, options)
}
export function useGetVoteWithDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetVoteWithDetailsQuery, GetVoteWithDetailsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetVoteWithDetailsQuery, GetVoteWithDetailsQueryVariables>(
    GetVoteWithDetailsDocument,
    options
  )
}
export type GetVoteWithDetailsQueryHookResult = ReturnType<typeof useGetVoteWithDetailsQuery>
export type GetVoteWithDetailsLazyQueryHookResult = ReturnType<typeof useGetVoteWithDetailsLazyQuery>
export type GetVoteWithDetailsQueryResult = Apollo.QueryResult<
  GetVoteWithDetailsQuery,
  GetVoteWithDetailsQueryVariables
>
export const GetRuntimeWasmBytecodeDocument = gql`
  query GetRuntimeWasmBytecode($where: RuntimeWasmBytecodeWhereUniqueInput!) {
    runtime: runtimeWasmBytecodeByUniqueInput(where: $where) {
      id
      bytecode
    }
  }
`

/**
 * __useGetRuntimeWasmBytecodeQuery__
 *
 * To run a query within a React component, call `useGetRuntimeWasmBytecodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRuntimeWasmBytecodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRuntimeWasmBytecodeQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetRuntimeWasmBytecodeQuery(
  baseOptions: Apollo.QueryHookOptions<GetRuntimeWasmBytecodeQuery, GetRuntimeWasmBytecodeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetRuntimeWasmBytecodeQuery, GetRuntimeWasmBytecodeQueryVariables>(
    GetRuntimeWasmBytecodeDocument,
    options
  )
}
export function useGetRuntimeWasmBytecodeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetRuntimeWasmBytecodeQuery, GetRuntimeWasmBytecodeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetRuntimeWasmBytecodeQuery, GetRuntimeWasmBytecodeQueryVariables>(
    GetRuntimeWasmBytecodeDocument,
    options
  )
}
export type GetRuntimeWasmBytecodeQueryHookResult = ReturnType<typeof useGetRuntimeWasmBytecodeQuery>
export type GetRuntimeWasmBytecodeLazyQueryHookResult = ReturnType<typeof useGetRuntimeWasmBytecodeLazyQuery>
export type GetRuntimeWasmBytecodeQueryResult = Apollo.QueryResult<
  GetRuntimeWasmBytecodeQuery,
  GetRuntimeWasmBytecodeQueryVariables
>