import React, { useRef } from 'react'
import styled from 'styled-components'

import { CountBadge } from '@/common/components/CountBadge'
import { ContentWithSidepanel, MainPanel } from '@/common/components/page/PageContent'
import { SidePanel } from '@/common/components/page/SidePanel'
import { Statistics, TokenValueStat } from '@/common/components/statistics'
import { Label } from '@/common/components/typography'
import { useMember } from '@/memberships/hooks/useMembership'
import { LoadingOpenings } from '@/working-groups/components/OpeningsList'
import { WorkersList } from '@/working-groups/components/WorkersList'
import { useOpenings } from '@/working-groups/hooks/useOpenings'
import { useUpcomingOpenings } from '@/working-groups/hooks/useUpcomingOpenings'
import { useWorkers } from '@/working-groups/hooks/useWorkers'
import { WorkingGroup } from '@/working-groups/types'

interface Props {
  workingGroup: WorkingGroup
}

export const OpeningsTab = ({ workingGroup }: Props) => {
  const { isLoading: isLoadingUpcoming, upcomingOpenings } = useUpcomingOpenings({ groupId: workingGroup.id })
  const { isLoading, openings } = useOpenings({ groupId: workingGroup.id, type: 'open' })
  const { member: leader } = useMember(workingGroup.leaderId)
  const { workers } = useWorkers({ groupId: workingGroup.id ?? '' })
  const sideNeighborRef = useRef<HTMLDivElement>(null)

  return (
    <ContentWithSidepanel>
      <MainPanel ref={sideNeighborRef}>
        <Statistics>
          <TokenValueStat title="Current budget" tooltipText="Lorem ipsum..." value={workingGroup.budget} />
          <TokenValueStat title="Working Group dept" tooltipText="Lorem ipsum..." value={-200} />
          <TokenValueStat title="Avg stake" tooltipText="Lorem ipsum..." value={100_000} />
        </Statistics>

        <OpeningsCategories>
          <OpeningsCategory>
            <Label>
              Upcoming Openings <CountBadge count={upcomingOpenings.length} />
            </Label>
            <LoadingOpenings isLoading={isLoadingUpcoming} openings={upcomingOpenings} />
          </OpeningsCategory>
        </OpeningsCategories>

        <OpeningsCategories>
          <OpeningsCategory>
            <Label>Openings</Label>
            <LoadingOpenings isLoading={isLoading} openings={openings} />
          </OpeningsCategory>
        </OpeningsCategories>
      </MainPanel>
      <SidePanel neighbor={sideNeighborRef}>
        <WorkersList leader={leader} workers={workers} />
      </SidePanel>
    </ContentWithSidepanel>
  )
}

const OpeningsCategories = styled.div`
  display: grid;
  grid-row-gap: 24px;
  width: 100%;
`

const OpeningsCategory = styled.div`
  display: grid;
  grid-row-gap: 16px;
  width: 100%;
`