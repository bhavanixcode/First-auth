import { ResourceItem } from './resource-item'

export function ResourceList({ resources, user }) {
  if (!user) return null

  return (
    <ul>
      {resources.map((res) => {
        const isLocked =
          user.role === 'Viewer' && res.minRoleRequired !== 'Viewer' ||
          user.role === 'Editor' && res.minRoleRequired === 'Admin'

        return (
          <li key={res.id}>
            <ResourceItem
              resource={res}
              isLocked={isLocked}
            />
          </li>
        )
      })}
    </ul>
  )
}
