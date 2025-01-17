import React, { useMemo, useState } from 'react'

import { lockIcon } from '@/accounts/components/AccountLocks'
import { DropDownButton } from '@/common/components/buttons/DropDownToggle'
import { TokenValue } from '@/common/components/typography'
import { Block } from '@/common/types'
import { MemberInfo } from '@/memberships/components'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { Member } from '@/memberships/types'

import { BalanceAmount } from './BalanceAmount'
import { LockDate } from './LockDate'
import { LockRecoveryTime } from './LockRecoveryTime'
import { RecoverButton } from './RecoverButton'
import {
  AccountDetailsWrap,
  ButtonsCell,
  DetailLabel,
  LockWrapper,
  DetailsName,
  LocksButtons,
  StyledDropDown,
  TitleCell,
  ValueCell,
} from './styles'
import { LockDetailsProps } from './types'

interface LockItemProps extends LockDetailsProps {
  createdInEvent?: Block
  recoveryTime?: string | null
  memberInfo?: Member
  linkButtons?: React.ReactNode
}

export const LockItem = ({
  lock,
  address,
  isRecoverable,
  createdInEvent,
  recoveryTime,
  memberInfo,
  linkButtons,
}: LockItemProps) => {
  const {
    helpers: { getMemberIdByBoundAccountAddress },
  } = useMyMemberships()

  const [isDropped, setDropped] = useState(false)

  const memberId = useMemo(() => getMemberIdByBoundAccountAddress(address), [address])

  const recoverButton = useMemo(
    () => <RecoverButton memberId={memberId} lock={lock} address={address} isRecoverable={isRecoverable} />,
    [memberId, lock, address, isRecoverable]
  )

  return (
    <LockWrapper>
      <AccountDetailsWrap onClick={() => setDropped(!isDropped)}>
        <TitleCell>
          {lockIcon(lock.type)}
          <DetailsName>{lock.type ?? 'Unknown lock'}</DetailsName>
        </TitleCell>
        {!isDropped && (
          <ValueCell isRecoverable={isRecoverable}>
            <TokenValue value={lock.amount} />
          </ValueCell>
        )}
        <ButtonsCell>
          {!isDropped && recoverButton}
          <DropDownButton onClick={() => setDropped(!isDropped)} isDropped={isDropped} />
        </ButtonsCell>
      </AccountDetailsWrap>
      <StyledDropDown isDropped={isDropped}>
        <div>
          <DetailLabel>Lock date</DetailLabel>
          <LockDate createdInEvent={createdInEvent} />
        </div>
        <div>{recoveryTime && <LockRecoveryTime value={recoveryTime} />}</div>
        <BalanceAmount amount={lock.amount} isRecoverable={isRecoverable} />
        {memberInfo && (
          <div>
            <DetailLabel>{lock.type === 'Voting' ? 'Voted for' : 'Bound to:'}</DetailLabel>
            <MemberInfo member={memberInfo} onlyTop />
          </div>
        )}
        <LocksButtons>
          {linkButtons}
          {recoverButton}
        </LocksButtons>
      </StyledDropDown>
    </LockWrapper>
  )
}
