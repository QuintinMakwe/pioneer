import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Tabs } from '@/common/components/Tabs'

export type FailedTabsState = 'Bounty' | 'Works' | 'Winners'

interface Props {
  setActive: (active: FailedTabsState) => void
  active: FailedTabsState
}

export const FailedTabs = ({ setActive, active }: Props) => {
  const { t } = useTranslation('bounty')
  const tabs = useMemo(
    () => [
      {
        title: t('tabs.bounty'),
        active: active === 'Bounty',
        onClick: () => setActive('Bounty'),
      },
      {
        title: t('tabs.winners'),
        active: active === 'Winners',
        onClick: () => setActive('Winners'),
      },
      {
        title: t('tabs.works'),
        active: active === 'Works',
        onClick: () => setActive('Works'),
      },
    ],
    [active]
  )

  return <Tabs tabs={tabs} />
}