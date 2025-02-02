import React from 'react'

import Text from '../../types/Text'
import { getClassname } from '../../utils/getClassname'

import Image, { Props as ImageProps } from '../../components/common/Image'
import Link, { Props as LinkProps } from '../../components/common/Link'
import Video, { Props as VideoProps } from '../../components/common/Video'

type WrappedComponentPropsType = Text
export type CustomComponentPropsType = ImageProps | LinkProps | VideoProps

interface CustomComponent {
  match: RegExp
  component: React.ComponentType<CustomComponentPropsType>
  transformProps?: (
    props: WrappedComponentPropsType
  ) => CustomComponentPropsType
}

export const customComponents: CustomComponent[] = [
  {
    match: /-\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/,
    // eslint-disable-next-line camelcase
    transformProps: ({ plain_text }) => ({
      title: plain_text.split('-[')[1].split(']')[0],
      src: plain_text.split('(')[1].split(')')[0],
      player: plain_text.indexOf('#') < 0 ? undefined : plain_text.substr(plain_text.indexOf('#')).replace('#', '')
    }),
    component: Video
  },
  {
    match: /!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/,
    // eslint-disable-next-line camelcase
    transformProps: ({ plain_text }) => ({
      alt: plain_text.split('![')[1].split(']')[0],
      src: plain_text.split('(')[1].split(')')[0],
      href: plain_text.indexOf('#') < 0 ? undefined : plain_text.substr(plain_text.indexOf('#')).replace('#', '')
    }),
    component: Image
  },
  {
    match: /[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/,
    // eslint-disable-next-line camelcase
    transformProps: ({ plain_text, annotations }) => ({
      url: plain_text.split('(')[1].split(')')[0],
      children: plain_text.split('[')[1].split(']')[0],
      className: getClassname(annotations)
    }),
    component: Link
  }
]
