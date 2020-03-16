import React from 'react'
import styled from 'styled-components'

const Image = styled.img`
  border-radius: 50%;
  max-width: 70px;
`;

interface AvatarProps {
  src: string
  alt: string
}

const Avatar: React.FC<AvatarProps> = ({ src, alt }) => {
  return (
    <Image src={src} alt={alt} />
  )
}

export default Avatar

