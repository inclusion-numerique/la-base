import * as Shapes from '@app/web/components/Shapes'
import { generateBaseAvatarSeed } from '@app/web/components/baseAvatarRandomSeed'
import styles from './BaseAvatar.module.css'

const getRandomShape = (baseId: string) => {
  const keys = Object.keys(Shapes)

  const index = Math.floor(generateBaseAvatarSeed(baseId) * keys.length)
  const key = keys[index]

  return Shapes[key as keyof typeof Shapes]
}

const BaseAvatar = ({ base, size }: { base: { id: string }; size: number }) => {
  const Shape = getRandomShape(base.id)

  return (
    <div className={styles.avatar}>
      <Shape width={size} />
    </div>
  )
}

export default BaseAvatar
