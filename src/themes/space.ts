// ↓下のコメントアウトでany型のwarning表示を出ないようにしている
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const space: any = ['0px', '8px', '16px', '32px', '64px']

// aliasを設定
space.extraSmall = space[0]
space.small = space[1]
space.medium = space[2]
space.large = space[3]
space.extraLarge = space[4]

export default space
