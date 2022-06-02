import React from 'react'
import styled from 'styled-components'

import {
  CustomLinkIcon,
  EmailIcon,
  FacebookIcon,
  IRCIcon,
  MatrixIcon,
  TwitterIcon,
  DiscordIcon,
  WechatIcon,
  WhatsappIcon,
  YoutubeIcon,
  TelegramIcon,
} from '@/common/components/icons/socials'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { BorderRad, Colors } from '@/common/constants'
import { capitalizeFirstLetter } from '@/common/helpers'

type Socials =
  | 'email'
  | 'twitter'
  | 'telegram'
  | 'discord'
  | 'facebook'
  | 'youtube'
  | 'matrix'
  | 'irc'
  | 'wechat'
  | 'whatsapp'
  | 'link'

const socialToIcon: Record<Socials, React.ReactElement> = {
  email: <EmailIcon />,
  twitter: <TwitterIcon />,
  telegram: <TelegramIcon />,
  discord: <DiscordIcon />,
  facebook: <FacebookIcon />,
  youtube: <YoutubeIcon />,
  matrix: <MatrixIcon />,
  irc: <IRCIcon />,
  wechat: <WechatIcon />,
  whatsapp: <WhatsappIcon />,
  link: <CustomLinkIcon />,
}

export const socialMediaList = Object.keys(socialToIcon) as (keyof typeof socialToIcon)[]

interface Props {
  social: Socials
  onClick?: () => void
}

export const SocialMediaTile = ({ social, onClick }: Props) => {
  return (
    <Wrapper onClick={onClick}>
      <RowGapBlock align="center" gap={2}>
        {socialToIcon[social]}
        <TextMedium value>{capitalizeFirstLetter(social)}</TextMedium>
      </RowGapBlock>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  cursor: pointer;
  user-select: none;
  place-items: center;
  height: 92px;
  width: 120px;
  border: 1px solid ${Colors.Black[300]};
  border-radius: ${BorderRad.m};
  text-align: center;

  > div {
  }

  svg {
    path {
      fill: ${Colors.Black[300]};
    }
  }

  :hover {
    border: 1px solid ${Colors.Blue[400]};

    svg {
      path {
        fill: ${Colors.Blue[400]};
      }
    }
  }
`