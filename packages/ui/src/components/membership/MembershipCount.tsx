import React from 'react'
import styled from 'styled-components'
import { Colors } from '../../constants'
import { useMyMemberships } from '../../hooks/useMyMemberships'
import { Badge } from '../typography'

export const MembershipsCount = () => {
  const { count } = useMyMemberships()

  return (
    <Memberships>
      Memberships <MembershipsBadge>{count}</MembershipsBadge>
    </Memberships>
  )
}

export const Memberships = styled.span`
  display: inline-flex;
  position: relative;
  align-items: center;
  width: fit-content;
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  text-transform: uppercase;
  color: ${Colors.Black[400]};
`

const MembershipsBadge = styled(Badge)`
  position: absolute;
  right: -24px;
`
